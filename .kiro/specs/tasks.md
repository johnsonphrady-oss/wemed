# Implementation Plan: 品質系統文件管理

## Overview

本實作計劃將品質系統文件管理網站拆分為四個獨立任務，依序執行。每個 Task 可獨立開發、驗證與 Commit，後項依賴前項產出的檔案骨架。

## Tasks

- [x] 1. 建立 HTML 結構

  **目標**：建立 `docs/index.html`，包含完整的頁面骨架與四個卡片區塊。

  **工作項目**
  - 建立 `docs/` 資料夾
  - 建立 `docs/index.html`，包含：
    - `<head>`：`charset`、`viewport`、`<title>品質系統文件管理</title>`、`<link>` 指向 `styles.css`
    - `<header>`：標題「品質系統文件管理」
    - `<main>`：`<div class="grid">` 內含四個 `<section>`
      - `#recent-docs`：近期更新文件
      - `#audit-issues`：稽核缺失修改
      - `#version-diff`：版本更新差異
      - `#quiz`：考題
    - 每個 `<section>` 含 `<h2>` 標題與空白 `<ul>`
    - `<body>` 底部 `<script src="app.js"></script>`

  **驗收條件**
  - [x] 1.1 瀏覽器開啟 `docs/index.html` 無報錯
  - [x] 1.2 頁面顯示標題列與四個卡片標題（繁體中文）
  - [x] 1.3 HTML 驗證：無缺少 `alt`、無未閉合標籤

  **Commit 訊息**：`feat: 建立 index.html 頁面骨架`

- [x] 2. 建立 CSS 版面

  **目標**：建立 `docs/styles.css`，完成響應式 2×2 格線與卡片樣式。

  **工作項目**
  - 建立 `docs/styles.css`，包含：
    - CSS Reset（`box-sizing`、`margin`、`padding`）
    - `header`：背景色、白色文字、置中標題
    - `.grid`：`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`
    - `section`（卡片）：白色背景、圓角、陰影、內距
    - `ul`、`li`：移除預設樣式，`li` 加上底線分隔與 `cursor: pointer`
    - `.detail`：`display: none`，`li.open .detail`：`display: block`
    - `.badge`（狀態色塊）：`.badge.processing`（橙色）、`.badge.closed`（綠色）
    - Media query `@media (max-width: 767px)`：`grid-template-columns: 1fr`

  **驗收條件**
  - [x] 2.1 桌機（≥1024px）：四個卡片 2×2 排列
  - [x] 2.2 手機（<768px）：四個卡片單欄排列
  - [x] 2.3 卡片有明顯邊界與間距，標題可辨讀
  - [x] 2.4 無引入任何外部字型或 CDN

  **Commit 訊息**：`feat: 建立 styles.css 響應式版面`

- [ ] 3. 建立模擬資料與渲染邏輯

  **目標**：建立 `docs/app.js`，定義四組模擬資料並渲染至對應卡片。

  **工作項目**
  - 建立 `docs/app.js`，包含：
    - 四個資料常數（各 5 筆）：`recentDocs`、`auditIssues`、`versionDiffs`、`quizItems`
    - 四個 `render*()` 函式，各自產生 `<li>` 並注入對應 `<ul>`
    - 每筆 `<li>` 包含摘要列與隱藏的 `.detail` 區塊
    - `<li>` 點擊事件：切換 `open` class（展開／收合）
    - 稽核缺失的狀態欄位套用 `.badge.processing` 或 `.badge.closed`
    - 頁面底部呼叫四個 `render*()` 函式

  **驗收條件**
  - [ ] 3.1 四個卡片各顯示 5 筆資料
  - [ ] 3.2 點擊任一筆，`.detail` 展開；再點擊，收合
  - [ ] 3.3 稽核缺失的「處理中」顯示橙色色塊，「已結案」顯示綠色色塊
  - [ ] 3.4 瀏覽器 Console 無任何錯誤
  - [ ] 3.5 `app.js` 不超過 150 行，無 `import`／`require`

  **Commit 訊息**：`feat: 建立 app.js 模擬資料與渲染邏輯`

- [ ] 4. 整合檢查

  **目標**：對照 requirements.md 所有驗收條件，逐一確認並修正不符項目。

  **工作項目**
  - 以瀏覽器開啟 `docs/index.html`，逐條勾選 requirements.md 的驗收條件
  - 調整桌機 / 平板 / 手機三種視窗寬度，確認版面正確
  - 確認無任何外部網路請求（開啟 DevTools → Network，重整後應為空）
  - 修正所有未通過的條件
  - 更新 requirements.md，將已通過的 `[ ]` 改為 `[x]`

  **驗收條件**
  - [ ] 4.1 requirements.md 所有 `[ ]` 已全數改為 `[x]`
  - [ ] 4.2 DevTools Network 面板重整後無外部請求
  - [ ] 4.3 頁面標題、卡片標題、資料內容全為繁體中文
  - [ ] 4.4 三種裝置寬度下版面無破版

  **Commit 訊息**：`chore: 整合檢查，完成所有驗收條件`

## Task Dependency Graph

```
Task 1 (HTML 結構)
    └── Task 2 (CSS 版面)
            └── Task 3 (模擬資料與渲染)
                        └── Task 4 (整合檢查)
```

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": [1],
      "description": "建立 HTML 結構，產出 docs/index.html 頁面骨架"
    },
    {
      "wave": 2,
      "tasks": [2],
      "description": "建立 CSS 版面，依賴 Task 1 產出的 docs/index.html",
      "dependsOn": [1]
    },
    {
      "wave": 3,
      "tasks": [3],
      "description": "建立模擬資料與渲染邏輯，依賴 Task 1、Task 2 產出的 HTML 結構與 CSS 類別定義",
      "dependsOn": [1, 2]
    },
    {
      "wave": 4,
      "tasks": [4],
      "description": "整合檢查，依賴 Task 1–3 全部完成，進行整合驗收",
      "dependsOn": [1, 2, 3]
    }
  ]
}
```

- Task 2 依賴 Task 1 產出的 `docs/index.html`
- Task 3 依賴 Task 1、Task 2 產出的 HTML 結構與 CSS 類別定義
- Task 4 依賴 Task 1–3 全部完成，進行整合驗收

## Notes

- 所有檔案統一放在 `docs/` 資料夾下，以符合 GitHub Pages 發布設定
- 不使用任何框架、外部 CDN 或後端服務，純靜態實作
- 介面文字一律使用繁體中文
- 每個 Task 完成後應立即 Commit，保持版本記錄清晰
