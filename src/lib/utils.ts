// 日本語は1分あたりの文字数、英語は単語数で読了時間を見積もる。
// 日本語は単語の間に空白がないので、空白区切りの語数では極端に短く出てしまう
const CJK_CHARS_PER_MINUTE = 500;
const WORDS_PER_MINUTE = 200;

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿ｦ-ﾟ]/g;

export function readingTime(body: string) {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")          // コードブロック
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")     // 画像
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")   // リンクは表示テキストだけ残す
    .replace(/https?:\/\/\S+/g, " ")           // 生のURL
    .replace(/<[^>]+>/g, " ");                 // HTMLタグ

  const cjkCount = (text.match(CJK) ?? []).length;
  const wordCount = text
    .replace(CJK, " ")
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;

  const minutes = cjkCount / CJK_CHARS_PER_MINUTE + wordCount / WORDS_PER_MINUTE;
  return `${Math.max(1, Math.ceil(minutes))} min read`;
}
