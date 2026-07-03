# 天気予報アプリ

現在地（または選択した都道府県）の天気予報を表示するReact製アプリです。

https://apricotn18.github.io/weather-app/

## 使用技術

- React 18 / TypeScript
- react-scripts (Create React App)
- OpenWeatherMap API

## セットアップ

```
npm i
```

天気データの取得には [OpenWeatherMap](https://openweathermap.org/api) のAPIキーが必要です。
プロジェクトルートに `.env` を作成し、以下を設定してください。

```
REACT_APP_API_KEY=あなたのAPIキー
```

## 開発サーバー起動

```
npm start
```

http://localhost:3000 で確認できます。位置情報の利用を許可すると現在地の天気が表示されます。
許可しなかった場合は東京の座標にフォールバックします。

## ビルド

```
npm run build
```
