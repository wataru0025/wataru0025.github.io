# cotton7.me

個人サイトのソースです。Astro で作って GitHub Pages に公開しています。

https://cotton7.me

## 構成

```
src/
  pages/          ページ (index / about / blog / links)
  layouts/        PageLayout — 全ページ共通の外枠
  components/     Head, Header, Footer, PageHero, AtCoderTracker など
  content/blog/   ブログ記事 (Markdown)
  styles/         global.css — デザイントークンと各パーツのCSS
  consts.ts       サイト名、説明文、SNSリンク、AtCoderのハンドル
public/           そのまま配信される画像類
```

## 記事を書く

`src/content/blog/` に Markdown を置くと、`/blog` の一覧とトップの Notes に
自動で載ります。ファイル名がそのまま URL になります。

```markdown
---
title: "記事のタイトル"
description: "一覧に出る短い説明"
date: "2026-08-14"
draft: false
---

本文
```

`draft: true` にすると公開されません。

## 見た目を変える

配色とフォントは [src/styles/global.css](src/styles/global.css) の先頭にある
CSS変数にまとまっています。`:root` がライト、`html.dark` がダークで、
変数名が共通なので片方だけ書き換えればテーマ全体に反映されます。

```css
:root {
  --paper: #f2f2ef;  /* 背景 */
  --ink:   #16181c;  /* 文字 */
  --ai:    #1e3a8f;  /* アクセントの藍 */
}
```

同じ色は `tailwind.config.mjs` にも登録してあるので、`text-ai` や
`border-line` のようなクラスとしても使えます。

## AtCoder のレート

about ページのレートとグラフは、ビルド時に AtCoder から取得しています。
ハンドルは `src/consts.ts` の `ATCODER.HANDLE` を変えるだけです。

## コマンド

| コマンド | 内容 |
| :--- | :--- |
| `npm install` | 依存をインストール |
| `npm run dev` | 開発サーバーを `localhost:4321` で起動 |
| `npm run dev:network` | 同じLAN内の別端末からも見られる状態で起動 |
| `npm run build` | 型チェックしてから `./dist/` にビルド |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint の自動修正 |

## デプロイ

`main` に push すると [GitHub Actions](.github/workflows/astro.yml) が
ビルドして GitHub Pages に公開します。反映まで1分ほどかかります。

AtCoder のレートはビルド時に取得しているため、毎朝8時(JST)にも自動で
ビルドし直して最新の値に更新しています。

## ライセンス

MIT。[Astro Nano](https://github.com/markhorn-dev/astro-nano) をベースに、
デザインと構成を作り直したものです。
