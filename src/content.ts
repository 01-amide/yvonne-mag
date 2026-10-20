// Everything personal lives here. Edit this file, not the components.

export type StoryItem = {
  type: "image" | "video";
  src: string; // "/cat1.jpg" in /public. "" = placeholder gradient
  caption?: string;
};
export type Story = {
  id: string;
  title: string; // shown under the circle
  emoji: string; // fallback if there's no cover image
  cover: string; // small round cover image, "" = emoji
  items: StoryItem[];
};

export const content = {
  name: "Yvonne",
  // Optional lock-screen wallpaper, e.g. "/wallpaper.jpg" (put the file in /public).
  // Leave "" to use the purple gradient.
  wallpaper: "IMG_1395.JPG",
  // Viewfinder screen. media: a video or image of her in /public (e.g. "/hero.mp4"); "" = gradient.
  camera: {
    media: "blacktop.mov",
    mediaType: "video" as "video" | "image",
    thumb: "thumb.jpg", // small square preview image bottom-left, e.g. "/thumb.jpg" ("" = gradient)
    label: "Birthday Special",
  },
   stories: [
    {
      id: "cats",
      title: "Cats",
      emoji: "🐱",
      cover: "catcover.PNG",
      items: [
        { type: "video", src: "cat1.mov", caption: "Her cat is so cute aww" },
        { type: "image", src: "ripcat.JPG", caption: "RIP her last cat chai" },
        { type: "image", src: "cat2.JPG", caption: "but yay lilah is here now" },
        { type: "video", src: "cat3.mp4", caption: "" },
        { type: "image", src: "catchat.jpg", caption: "she secretly wants me to turn into a cat too" },
      ],
    },
    {
      id: "memories",
      title: "Yvonne that year🤣",
      emoji: "🤍",
      cover: "old2.JPG",
      items: [
        { type: "image", src: "old1.JPG", caption: "These pictures were the best of the best that time🤣" },
        { type: "image", src: "old2.JPG", caption: "And they weren't bad actually" },
        { type: "image", src: "old3.JPG", caption: "" },
        { type: "image", src: "old4.JPG", caption: "" },
        { type: "image", src: "old5.JPG", caption: "" },
        { type: "video", src: "old8.mov", caption: "" },
        { type: "image", src: "old7.JPG", caption: "" },
        { type: "video", src: "old9.MP4", caption: "" },
        { type: "image", src: "old6.JPG", caption: "lovely lovely" },
      ],
    },
    {
      id: "bag",
      title: "US👯",
      emoji: "👯",
      cover: "",
      items: [
        { type: "video", src: "us1.mp4", caption: "" },
        { type: "video", src: "us2.mp4", caption: "" },
        { type: "video", src: "us3.mp4", caption: "" },
        { type: "video", src: "us4.mp4", caption: "" },
        { type: "video", src: "us5.mp4", caption: "" },
        { type: "video", src: "us7.mov", caption: "" },
        { type: "image", src: "us6.JPG", caption: "We really need to take more pictures together chai" },
      ],
    },
    {
      id: "glow",
      title: "BIG 20!🤩",
      emoji: "✨",
      cover: "IMG_2347.jpg",
      items: [
        { type: "video", src: "glasses.mov", caption: "look at her now sheesh😍" },
        { type: "video", src: "flowery.mov", caption: "" },
        { type: "video", src: "modelclip.MOV", caption: "modelling and everything" },
        { type: "video", src: "purple.MP4", caption: "" },
        { type: "image", src: "liberty.jpg", caption: "" },
      ],
    },
  ] as Story[],
  notifications: [
    {
      app: "Messages",
      icon: "💬",
      title: "Me",
      body: "Happy birthday Yvonne🎂 swipe up, there's something for you",
      time: "now",
    },
    {
      app: "Bank",
      icon: "💸",
      title: "Credit Alert",
      body: "Hope say your roster dey active as i no guide😔",  
      time: "now",
    },
    {
      app: "Camera",
      icon: "📸",
      title: "Memory",
      body: "You have a new birthday memory ready to view",
      time: "now",
    },
  ],
};