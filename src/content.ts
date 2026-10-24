// Everything personal lives here. Edit this file, not the components.

export type StoryItem = {
  type: "image" | "video";
  src: string; // "/cat1.webp" in /public. "" = placeholder gradient
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
  src: string; // "/post1.webp" in /public. "" = placeholder gradient with the emoji
  emoji: string; // placeholder emoji
  caption: string;
  likes: number;
  comments: Comment[];
};

export type BankTx = { title: string; note: string; amount: string; kind: "in" | "out" };

export type CatInfo = {
  name: string;
  emoji: string; // used when there's no photo
  photo: string; // "/mochi.webp" in /public, "" = emoji
  video?: string;
  pitch: number; // voice: 0.7 deep, 1 normal, 1.3 squeaky
  x: number; // position in the play area, % from left
  y: number; // % from top
};
 
export const content = {
  name: "Yvonne",
  // Optional lock-screen wallpaper, e.g. "/wallpaper.webp" (put the file in /public).
  // Leave "" to use the purple gradient.
  wallpaper: "/IMG_1395.webp",
  // Viewfinder screen. media: a video or image of her in /public (e.g. "/hero.mp4"); "" = gradient.
  camera: {
    media: "/blacktop.mp4",
    mediaType: "video" as "video" | "image",
    thumb: "/thumb.webp", // small square preview image bottom-left, e.g. "/thumb.webp" ("" = gradient)
    label: "Birthday Special",
  },
  // Final screen: voice note -> fake upload -> artwork reveal. Put the files in /public.
 final: {
    salutation: "Hii Yvonne😛,",
    paragraphs: [
      "Really hope you like the website. tbh I'd say the creative direction was way harder to output compared to the coding (Claude did a lot of it)🙏😭.\nWanted to make it as special as I could and fine-tuned to you cause you deserve nothing less.",
      "Please also act like ts is a surprise and you didn't ask me to do it, make you dey feel sentimental and shi ehen 🤣🤣",
      "Omo everybody don dey old oo 🤣\nWdym you're already 20? Shi small thing, I go get nephew or niece from you soon, make I dey do cool uncle.",
      "But jokes aside, happy birthday fr.\nReally appreciate you being in my life, it has been super interesting to say the least.",
      "Ugh saying ts is making me remember the beefs we had when we were younger omo.\nPlus the school drama.\nPlus your man drama sef, but that one still dey happen.\nOmo everybody really dey anyhow.",
      "But besides that, the strolls, the talks.\nVery proper gists fr, I still need to learn how to narrate stories from you fr.\nChai I just dey miss that estate.\nAnd I'm saying that shi as if it's not basically only you I used to talk to there 🤣",
      "So glad we've kept contact.\nSaying that, I might as well apologize for being so bad at contacting. Bad habit of mine, just chilling till you text thinking everything's aiit. Sorry about that.\nBut yeah we don try frfr.",
      "Definitely glad I have so many pictures of you from years ago, they're so cute 🤣\nBeen fucking cringing at how I looked tho, I dey really see life 🤣",
      "Everybody don jazz up.\nFawk, make I dey tell people say my friend na model nbl.\nThank you for the spams nbl, I def don't secretly go to our saved in chat from time to time… definitely.\nGuyy you'll soon come and give me one cat oh, I don dey like that species nbl, they're cool.",
      "Also freaking watch the shows I recommend for you like freaking 2 years now or something 🤣\nNah I'm playing sha guy, it's so crazy like this we don turn adults.\nI legit can't remember the last anime or series I watched, mehn I'm even struggling with movies, it's crazy.",
      "Please once you get your new roster tell them to give us Benz abeg, make we dey drive ajeh.",
      "But yeah I think that's about it.\nHope you have a lovely day.\nI'm lowkey gonna get some chocolate cake for myself but yk definitely I'd be eating it with you in mind, yk on some spiritual shi or something 🤣\nBig 20 nblllll",
      "There's also one last piece of media that I've left at the end, make sure you see it, hope you like it.\nFirst to see it ofc, before I post that shi on ig and glaze myself, ts took weeks 🤣",
    ],
    signoff: "Happy birthdayyyy 🫶🎉🎉",
    buttonLabel: "one more thing →",
    collage: "yvonne.png",
    caption: "first to see it ❤️",
    captionUser: "",
    artworkAlt: "A collage of drawings of Yvonne",
    closing: "Happy birthday, Yvonne. Big 20! ❤️",
    shareToast: "not yet. I get to post first 🤣",
  },
 
   // Background music. Put the file in /public. src: "" turns music off entirely.
  // volume only works on desktop/Android. iPhones ignore it, so make the file itself quiet.
  music: { src: "music.mp3", volume: 0.35 },

  // Optional real meow recording in /public (e.g. "/meow.mp3"). "" = built-in synthesized meow.
  catSound: "",
 
  // Cat Corner screen
  cats: [
    { name: "Mochi", emoji: "🐱", photo: "/download.webp", video:"/scuba.mp4", pitch: 1.0, x: 22, y: 22 },
    { name: "Luna", emoji: "🐈‍⬛", photo: "/chad.webp", video:"", pitch: 0.8, x: 70, y: 18 },
    { name: "Biscuit", emoji: "😺", photo: "", video:"/clapcat.mp4", pitch: 1.25, x: 74, y: 52 },
    { name: "Cleo", emoji: "🐈", photo: "/moneycat.webp", pitch: 0.95, x: 20, y: 70 },
    { name: "jeff", emoji: "🐈", photo: "/thinkingcat.webp", pitch: 0.95, x: 42, y: 45 },
  ] as CatInfo[],
 
  // Birthday Bank screen
  bank: {
    currency: "₦",
    amount: 1000000000, // the balance counts up to this
    alert: "Credit Alert: +1 year of blessings",
    transactions: [
      { title: "Birthday Blessings", note: "from: that guy", amount: "+∞", kind: "in" },
      { title: "One year older", note: "from: Time", amount: "+1 yr", kind: "in" },
      { title: "Cat treats", note: "auto-pay", amount: "−₦20000", kind: "out" },
    ] as BankTx[],
  },

    // Her birthday (used by Calendar). month is 0-11: 0 = January ... 10 = November
  birthday: { year: 2026, month: 9, day: 25 },
    // Profile screen
  profile: {
    handle: "Her.",
    avatar: "", // "/avatar.webp", "" = first letter of her name
    bio: ["Model 📸", "Cat mom 🐱", "Money magnet 💸", "Birthday girl today 🎂"],
    followers: 19019, // counts up when the screen opens
    following: 1 ,
  },
  posts: [
    { id: "p1", type: "image", src: "/IMG_2346.webp", emoji: "🐱", caption: "love love my eyes", likes: 1900,
      comments: [{ user: "bestie", text: "wait this is lowkey me still" }, { user: "me", text: "Na me be your no1 fan sha" }] },
    { id: "p2", type: "image", src: "/orangedress.webp", emoji: "📸", caption: "The sun is my apprentice or sumn", likes: 1243,
      comments: [{ user: "eliezer", text: "guys hol'on my caption lowkey hard" }] },
    { id: "p3", type: "video", src: "/home.mp4", emoji: "✨", caption: "", likes: 3021,
      comments: [{ user: "me", text: "wish i could put stickers on here (im too lazy to design that)" }] },
    { id: "p4", type: "image", src: "/orangestill.webp", emoji: "💸", caption: "eliezer ran out of cool captions😔", likes: 876,
      comments: [] },
    { id: "p5", type: "video", src: "/redshirt.mp4", emoji: "🎀", caption: "", likes: 2210,
      comments: [{ user: "jix", text: "The one person she's follwing is me btw incase you that wasnt obvious" }] },
    { id: "p6", type: "video", src: "/bluetrad.mp4", emoji: "🤍", caption: "Super bad in blue", likes: 1530,
      comments: [{user: "jix", text: "fawkk come i go like make we dey together fytb"}, {user: "rando", text: "come let me spoil you bbg"}, {user: "jix", text: "eww bruh"}] },
    { id: "p7", type: "video", src: "/bluedress.mp4", emoji: "🌸", caption: "", likes: 990,
      comments: [] },
    { id: "p8", type: "video", src: "/braids.mp4", emoji: "🎂", caption: "", likes: 4100,
      comments: [{ }] },
  ] as Post[],
   stories: [
    {
      id: "cats",
      title: "Cats",
      emoji: "🐱",
      cover: "/catcover.webp",
      items: [
        { type: "video", src: "/cat1.mp4", caption: "Her cat is so cute aww" },
        { type: "image", src: "/ripcat.webp", caption: "RIP her last cat chai💔" },
        { type: "image", src: "/cat2.webp", caption: "but yay lilah is here now!!" },
        { type: "video", src: "/cat3.mp4", caption: "" },
        { type: "image", src: "/catchat.webp", caption: "she secretly wants me to turn into a cat too😔" },
      ],
    },
    {
      id: "memories",
      title: "Yvonne that year🤣",
      emoji: "🤍",
      cover: "/old2.webp",
      items: [
        { type: "image", src: "/old1.webp", caption: "These pictures were the best of the best that time🤣" },
        { type: "image", src: "/old2.webp", caption: "" },
        { type: "image", src: "/old3.webp", caption: "omo😭" },
        { type: "image", src: "/old4.webp", caption: "" },
        { type: "image", src: "/old5.webp", caption: "" },
        { type: "video", src: "/old8.mp4", caption: "" },
        { type: "image", src: "/old7.webp", caption: "" },
        { type: "video", src: "/old9.mp4", caption: "omds i literally forgot you had this markey piercing sef🤣" },
        { type: "image", src: "/old6.webp", caption: "cute cute" },
      ],
    },
    {
      id: "bag",
      title: "US👯",
      emoji: "👯",
      cover: "",
      items: [
        { type: "video", src: "/us1.mp4", caption: "" },
        { type: "video", src: "/us2.mp4", caption: "" },
        { type: "video", src: "/us3.mp4", caption: "" },
        { type: "video", src: "/us4.mp4", caption: "all media of me in 100lvl are getting annihalated after this😪" },
        { type: "video", src: "/us5.mp4", caption: "😭😭😭" },
        { type: "video", src: "/us7.mp4", caption: "" },
        { type: "image", src: "/us6.webp", caption: "We really need to take more pictures together chai" },
      ],
    },
    {
      id: "glow",
      title: "BIG 20!🤩",
      emoji: "✨",
      cover: "/IMG_2347.webp",
      items: [
        { type: "video", src: "/glasses.mp4", caption: "look at her now sheesh😍" },
        { type: "video", src: "/flowery.mp4", caption: "" },
        { type: "video", src: "/modelclip.mp4", caption: "modelling and everything" },
        { type: "video", src: "/purple.mp4", caption: "" },
        { type: "image", src: "/liberty.webp", caption: "damnnn i really got to draw this " },
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