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
export type Comment = { user: string; text: string };
export type Post = {
  id: string;
  type: "image" | "video";
  src: string; // "/post1.jpg" in /public. "" = placeholder gradient with the emoji
  emoji: string; // placeholder emoji
  caption: string;
  likes: number;
  comments: Comment[];
};

export type BankTx = { title: string; note: string; amount: string; kind: "in" | "out" };

export type CatInfo = {
  name: string;
  emoji: string; // used when there's no photo
  photo: string; // "/mochi.jpg" in /public, "" = emoji
  video?: string;
  pitch: number; // voice: 0.7 deep, 1 normal, 1.3 squeaky
  x: number; // position in the play area, % from left
  y: number; // % from top
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
  // Final screen: voice note -> fake upload -> artwork reveal. Put the files in /public.
  final: {
    voiceNote: "/voicenote.mp3",
    collage: "/collage.png",
    heading: "one more thing", // shown as "one more thing, <name>"
    hint: "press play. it ends with a surprise",
    skipLabel: "skip to the drawing",
    captionUser: "you", // bold name at the start of the caption
    caption: "first to see it 💜",
    artworkAlt: "A collage of drawings of Yvonne",
    closing: "Happy birthday, Yvonne. Stay filming. 💜",
    shareToast: "not yet. I get to post first 🤣",
  },
 
   // Optional real meow recording in /public (e.g. "/meow.mp3"). "" = built-in synthesized meow.
  catSound: "",
 
  // Cat Corner screen
  cats: [
    { name: "Mochi", emoji: "🐱", photo: "download.jfif", video:"scuba.mp4", pitch: 1.0, x: 22, y: 22 },
    { name: "Luna", emoji: "🐈‍⬛", photo: "chad.jpg", video:"", pitch: 0.8, x: 70, y: 18 },
    { name: "Biscuit", emoji: "😺", photo: "", video:"clapcat.mp4", pitch: 1.25, x: 74, y: 52 },
    { name: "Cleo", emoji: "🐈", photo: "moneycat.jpg", pitch: 0.95, x: 20, y: 70 },
    { name: "Cleo", emoji: "🐈", photo: "thinkingcat.jpg", pitch: 0.95, x: 42, y: 45 },
  ] as CatInfo[],
 
  // Birthday Bank screen
  bank: {
    currency: "₦",
    amount: 1000000000, // the balance counts up to this
    alert: "Credit Alert: +1 year of blessings",
    transactions: [
      { title: "Birthday Blessings", note: "from: God", amount: "+∞", kind: "in" },
      { title: "One year older", note: "from: Time", amount: "+1 yr", kind: "in" },
      { title: "Stress", note: "declined", amount: "−0", kind: "out" },
      { title: "Cat treats", note: "auto-pay", amount: "−₦500", kind: "out" },
    ] as BankTx[],
  },

    // Her birthday (used by Calendar). month is 0-11: 0 = January ... 10 = November
  birthday: { year: 2026, month: 9, day: 25 },
    // Profile screen
  profile: {
    handle: "Her.",
    avatar: "", // "/avatar.jpg", "" = first letter of her name
    bio: ["Model 📸", "Cat mom 🐱", "Money magnet 💸", "Birthday girl today 🎂"],
    followers: 19019, // counts up when the screen opens
    following: 1 ,
  },
  posts: [
    { id: "p1", type: "image", src: "IMG_2346.JPG", emoji: "🐱", caption: "love love my eyes", likes: 1900,
      comments: [{ user: "bestie", text: "wait this is lowkey me still" }, { user: "me", text: "Na me be your no1 fan sha" }] },
    { id: "p2", type: "image", src: "orangedress.JPG", emoji: "📸", caption: "The sun is my apprentice or sumn", likes: 1243,
      comments: [{ user: "eliezer", text: "guys hol'on my caption lowkey hard" }] },
    { id: "p3", type: "video", src: "home.mov", emoji: "✨", caption: "", likes: 3021,
      comments: [{ user: "me", text: "wish i could put stickers on here (im too lazy to design that)" }] },
    { id: "p4", type: "image", src: "orangestill.JPG", emoji: "💸", caption: "eliezer ran out of cool captions😔", likes: 876,
      comments: [] },
    { id: "p5", type: "video", src: "redshirt.mov", emoji: "🎀", caption: "", likes: 2210,
      comments: [{ user: "jix", text: "The one person she's follwing is me btw incase you that wasnt obvious" }] },
    { id: "p6", type: "video", src: "bluetrad.mov", emoji: "🤍", caption: "caption goes here", likes: 1530,
      comments: [{user: "jix", text: "fawkk come i go like make we dey together fytb"}, {user: "rando", text: "come let me spoil you bbg"}, {user: "jix", text: "eww bruh"}] },
    { id: "p7", type: "video", src: "bluedress.mov", emoji: "🌸", caption: "", likes: 990,
      comments: [] },
    { id: "p8", type: "video", src: "braids.mov", emoji: "🎂", caption: "", likes: 4100,
      comments: [{ user: "me", text: "comment goes here" }] },
  ] as Post[],
   stories: [
    {
      id: "cats",
      title: "Cats",
      emoji: "🐱",
      cover: "catcover.PNG",
      items: [
        { type: "video", src: "cat1.mov", caption: "Her cat is so cute aww" },
        { type: "image", src: "ripcat.JPG", caption: "RIP her last cat chai💔" },
        { type: "image", src: "cat2.JPG", caption: "but yay lilah is here now!!" },
        { type: "video", src: "cat3.mp4", caption: "" },
        { type: "image", src: "catchat.jpg", caption: "she secretly wants me to turn into a cat too😔" },
      ],
    },
    {
      id: "memories",
      title: "Yvonne that year🤣",
      emoji: "🤍",
      cover: "old2.JPG",
      items: [
        { type: "image", src: "old1.JPG", caption: "These pictures were the best of the best that time🤣" },
        { type: "image", src: "old2.JPG", caption: "" },
        { type: "image", src: "old3.JPG", caption: "omo😭" },
        { type: "image", src: "old4.JPG", caption: "" },
        { type: "image", src: "old5.JPG", caption: "" },
        { type: "video", src: "old8.mov", caption: "" },
        { type: "image", src: "old7.JPG", caption: "" },
        { type: "video", src: "old9.MP4", caption: "omds i literally forgot you had this markey piercing sef🤣" },
        { type: "image", src: "old6.JPG", caption: "cute cute" },
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
        { type: "video", src: "us4.mp4", caption: "all media of me in 100lvl are getting annihalated after this😪" },
        { type: "video", src: "us5.mp4", caption: "😭😭😭" },
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
        { type: "image", src: "liberty.jpg", caption: "damnnn i really got to draw this " },
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