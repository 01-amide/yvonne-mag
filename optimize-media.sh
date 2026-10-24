#!/usr/bin/env bash
# Shrinks new photos/videos for the web. Needs ffmpeg installed.
# Usage:  bash optimize-media.sh  input-folder  output-folder
# Videos -> .mp4 (H.264, no sound, streams instantly) + a "-poster.jpg" still. Photos -> .webp.
set -u
SRC="${1:?input folder}"; OUT="${2:?output folder}"
mkdir -p "$OUT"; cd "$SRC"
for f in *; do
  [ -f "$f" ] || continue
  base="${f%.*}"; lext="$(echo "${f##*.}" | tr 'A-Z' 'a-z')"
  case "$lext" in
    mov|mp4)
      w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f" | tr -d ',')
      h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$f" | tr -d ',')
      if [ "$w" -gt "$h" ]; then vf="scale='min(960,iw)':-2"; else vf="scale='min(540,iw)':-2"; fi
      ffmpeg -v error -y -i "$f" -vf "$vf" -c:v libx264 -preset slow -crf 27 -maxrate 1800k -bufsize 3600k \
        -pix_fmt yuv420p -profile:v high -level 4.0 -an -movflags +faststart "$OUT/$base.mp4"
      ffmpeg -v error -y -ss 0.4 -i "$f" -frames:v 1 -vf "scale='min(480,iw)':-2" -q:v 4 "$OUT/$base-poster.jpg"
      echo "video: $f"
      ;;
    jpg|jpeg|png|jfif|heic)
      ffmpeg -v error -y -i "$f" -vf "scale='if(gt(iw,ih),min(1440,iw),-2)':'if(gt(iw,ih),-2,min(1440,ih))'" -c:v libwebp -quality 78 "$OUT/$base.webp"
      echo "photo: $f"
      ;;
  esac
done
