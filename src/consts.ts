import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Cotton's website",
  EMAIL: "",
  NUM_POSTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "電気通信大学の学生 cotton の個人サイト。競技プログラミングと個人開発、その途中で考えたことを書いています。",
};

export const BLOG: Metadata = {
  TITLE: "Notes",
  DESCRIPTION: "競技プログラミングや個人開発、大学のことなどの記録。",
};

export const ATCODER = {
  // AtCoder のユーザー名（ハンドル）。変えたい場合はここだけ書き換える。
  HANDLE: "monsoon7",
};

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://twitter.com/cotton_tech7",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/wataru0025"
  },
];
