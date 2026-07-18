// AtCoder のレート履歴をビルド時に取得するユーティリティ。
// 公式エンドポイント https://atcoder.jp/users/<handle>/history/json を叩く。
// Node（astro build）上で実行されるため CORS の制約は受けない。

export interface RatingPoint {
  rating: number;
  date: string; // ISO8601
  contest: string;
}

export interface AtCoderData {
  handle: string;
  current: number;
  max: number;
  points: RatingPoint[];
}

export interface RatingColor {
  name: string; // 灰/茶/緑/水/青/黄/橙/赤
  hex: string;
}

// AtCoder の色分け（下限で判定）
export function ratingColor(r: number): RatingColor {
  if (r < 400) return { name: "灰", hex: "#808080" };
  if (r < 800) return { name: "茶", hex: "#804000" };
  if (r < 1200) return { name: "緑", hex: "#008000" };
  if (r < 1600) return { name: "水", hex: "#00c0c0" };
  if (r < 2000) return { name: "青", hex: "#0000ff" };
  if (r < 2400) return { name: "黄", hex: "#c0c000" };
  if (r < 2800) return { name: "橙", hex: "#ff8000" };
  return { name: "赤", hex: "#ff0000" };
}

interface RawEntry {
  IsRated: boolean;
  NewRating: number;
  EndTime: string;
  ContestName: string;
}

// 取得失敗時は null を返し、ビルド自体は落とさない。
export async function fetchAtCoder(handle: string): Promise<AtCoderData | null> {
  try {
    const res = await fetch(`https://atcoder.jp/users/${handle}/history/json`);
    if (!res.ok) return null;
    const raw = (await res.json()) as RawEntry[];
    const rated = raw.filter((x) => x.IsRated);
    if (rated.length === 0) return null;

    const points: RatingPoint[] = rated.map((x) => ({
      rating: x.NewRating,
      date: x.EndTime,
      contest: x.ContestName,
    }));

    return {
      handle,
      current: points[points.length - 1].rating,
      max: Math.max(...points.map((p) => p.rating)),
      points,
    };
  } catch {
    return null;
  }
}
