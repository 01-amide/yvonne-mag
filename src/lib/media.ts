// Helpers for loading media quickly.

// "/home.mp4" -> "/home-poster.jpg" (a tiny still of the first frame, made at optimize time)
export const posterOf = (src: string) => src.replace(/\.[^./]+$/, "-poster.jpg");

const keep = new Set<HTMLElement | HTMLImageElement>(); // hold references so the browser doesn't drop the downloads

export function preloadImage(src?: string) {
  if (!src) return;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  keep.add(img);
}

export function preloadVideo(src?: string) {
  if (!src) return;
  const v = document.createElement("video");
  v.preload = "auto";
  v.muted = true;
  v.playsInline = true;
  v.src = src;
  v.load();
  keep.add(v);
}

// Warm up a story/post item: photos fully, videos just their poster plus the file itself
export function warmItem(item?: { type: "image" | "video"; src: string }) {
  if (!item?.src) return;
  if (item.type === "image") preloadImage(item.src);
  else {
    preloadImage(posterOf(item.src));
    preloadVideo(item.src);
  }
}
