# 品質系統文件管理 — 設計文件

## Overview

本專案為純靜態單頁應用程式，以純 HTML／CSS／JavaScript 實作，無需任何建置工具或後端服務。頁面呈現四個功能區塊：近期更新文件、稽核缺失修改、版本更新差異、考題，所有資料均以模擬資料（mock data）直接定義於 `app.js`。網站部署於 GitHub Pages，從 `docs/` 資料夾提供服務。

---

## Architecture

本應用採用最簡化的單頁靜態架構：

```
瀏覽器
  └─ docs/index.html       ← 進入點，載入 CSS 與 JS
       ├─ docs/styles.css  ← 全域樣式、格線布局、響應式規則
       └─ docs/app.js      ← 模擬資料常數 + DOM 渲染函式 + 事件綁定
```

資料流：
1. 瀏覽器開啟 `index.html`
2. `app.js` 於 `DOMContentLoaded` 後執行
3. 各 `render*()` 函式讀取頂端常數，產生 `<li>` 並注入對應 `<ul>`
4. 點擊事件切換 `.open` class，CSS 控制詳細內容顯示／隱藏

無路由、無狀態管理框架、無 API 呼叫，所有邏輯限縮於單一 JS 檔案。

---

## Components and Interfaces

### 頁面結構（index.html）

```
<body>
  <header>          ← 標題列：「品質系統文件管理」
  <main>
    <div class="grid">
      <section id="recent-docs">    ← 近期更新文件
      <section id="audit-issues">   ← 稽核缺失修改
      <section id="version-diff">   ← 版本更新差異
      <section id="quiz">           ← 考題
    </div>
  </main>
</body>
```

### 渲染函式介面（app.js）

| 函式 | 輸入資料 | 目標元素 |
|------|----------|----------|
| `renderRecentDocs()` | `recentDocs[]` | `#recent-docs ul` |
| `renderAuditIssues()` | `auditIssues[]` | `#audit-issues ul` |
| `renderVersionDiffs()` | `versionDiffs[]` | `#version-diff ul` |
| `renderQuiz()` | `quizItems[]` | `#quiz ul` |

每個函式：
- 接受頂端常數陣列作為資料來源
- 產生對應的 `<li>` 結構（含 `.detail` 子元素）
- 為每筆 `<li>` 綁定 `click` 事件，切換 `open` class

### 卡片結構

每個 `<section>` 為一張卡片：
- 卡片標題（`<h2>`）
- 清單容器（`<ul>`），每筆為 `<li>`
- 每筆 `<li>` 點擊後展開 `<div class="detail">` 顯示詳細資訊
- 展開／收合以 CSS class `open` 切換，不需動畫

---

## Data Models

所有資料為 JavaScript 常數，硬寫於 `app.js` 頂端。

### 近期更新文件

```js
const recentDocs = [
  { name: '製程管制程序書', version: 'v3.2', date: '2026-08-20', summary: '更新第4.2節取樣頻率規定' },
  // ... 共 5 筆
];
```

| 欄位 | 型別 | 說明 |
|------|------|------|
| `name` | string | 文件名稱 |
| `version` | string | 版本號 |
| `date` | string (YYYY-MM-DD) | 更新日期 |
| `summary` | string | 更新摘要 |

### 稽核缺失修改

```js
const auditIssues = [
  { id: 'NC-2026-001', desc: '量測設備校正記錄不完整', status: '處理中', owner: '王小明', dueDate: '2026-09-15' },
  // ... 共 5 筆
];
```

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | string | 缺失編號 |
| `desc` | string | 缺失描述 |
| `status` | `'處理中'` \| `'已結案'` | 處理狀態 |
| `owner` | string | 負責人 |
| `dueDate` | string (YYYY-MM-DD) | 預計完成日 |

### 版本更新差異

```js
const versionDiffs = [
  { name: '供應商評鑑準則', oldVer: 'v1.0', newVer: 'v2.0', diff: '新增環境面評分項目，佔比調整為 20%' },
  // ... 共 5 筆
];
```

| 欄位 | 型別 | 說明 |
|------|------|------|
| `name` | string | 文件名稱 |
| `oldVer` | string | 舊版本號 |
| `newVer` | string | 新版本號 |
| `diff` | string | 差異說明 |

### 考題

```js
const quizItems = [
  {
    question: '依製程管制程序書，取樣頻率為何？',
    docName: '製程管制程序書',
    options: ['每小時', '每2小時', '每班次', '每日'],
    answer: '每2小時'
  },
  // ... 共 5 筆
];
```

| 欄位 | 型別 | 說明 |
|------|------|------|
| `question` | string | 題目 |
| `docName` | string | 來源文件 |
| `options` | string[] | 選項（4 個） |
| `answer` | string | 正確答案（對應 options 其中一項） |

---

## 版面設計（styles.css）

### 響應式斷點

| 裝置 | 寬度 | 格線 |
|------|------|------|
| 桌機 | ≥ 1024px | 2 欄 × 2 列（`grid-template-columns: 1fr 1fr`） |
| 平板 | 768px – 1023px | 2 欄 × 2 列（同上，縮小字體與間距） |
| 手機 | < 768px | 單欄（`grid-template-columns: 1fr`） |

### 狀態色塊（稽核缺失）

- 處理中：背景 `#f97316`（橙色），白色文字
- 已結案：背景 `#22c55e`（綠色），白色文字

---

## 互動邏輯（app.js）

1. 頁面載入後，依序呼叫 `render()` 將四組資料注入對應的 `<ul>`
2. 每筆 `<li>` 綁定 `click` 事件，切換 `open` class
3. CSS 以 `display: none` / `display: block` 控制 `.detail` 的顯示

整體不超過 150 行 JS，無 class、無模組、無 build step。

---

## Correctness Properties

### Property 1: 資料完整性

四組模擬資料各含恰好 5 筆，渲染後 DOM 中對應 `<ul>` 的 `<li>` 數量須等於資料筆數。

**Validates: Requirements 1.2, 2.2, 3.2, 4.2**

### Property 2: 展開唯一性

同一時間每張卡片允許多筆展開（toggle 行為），但 `.detail` 的顯示狀態須與 `open` class 一致。

**Validates: Requirements 1.4, 2.4, 3.3, 4.3**

### Property 3: 稽核狀態對應

`status === '處理中'` 的項目必須套用橙色樣式，`status === '已結案'` 套用綠色樣式，不得混用。

**Validates: Requirements 2.3**

### Property 4: 考題答案驗證

`answer` 值必須是對應 `options` 陣列中的其中一個元素。

**Validates: Requirements 4.3**

### Property 5: 響應式不斷裂

在所有定義斷點下，格線不得溢出視窗或產生水平捲軸。

**Validates: Requirements 5.2, 5.5**

---

## Error Handling

由於本專案不涉及非同步操作或外部 API，錯誤情境有限，處理策略如下：

| 情境 | 處理方式 |
|------|----------|
| 模擬資料陣列為空 | `render*()` 函式不寫入任何 `<li>`，卡片呈現空白清單，頁面不崩潰 |
| `<ul>` 目標元素不存在 | 在 `render*()` 開頭以 `if (!el) return` 防衛，避免 `null` 錯誤 |
| 考題 `options` 與 `answer` 不符 | 視為模擬資料錯誤，不在執行期做額外驗證，由人工審查資料修正 |
| 瀏覽器不支援 CSS Grid | 降級為 block 排版，功能仍可使用，僅視覺排版不同 |

---

## Testing Strategy

本專案採用目視驗證（manual visual testing），無自動化測試框架，符合「純靜態、無 build step」的技術限制。

### 驗證流程

以瀏覽器直接開啟 `docs/index.html`（`File > Open`），逐條對照 `requirements.md` 驗收條件：

1. **資料渲染**：確認四個區塊各顯示 5 筆資料
2. **展開互動**：點擊每筆項目，確認詳細資訊正確顯示與收合
3. **稽核狀態色彩**：確認「處理中」為橙色，「已結案」為綠色
4. **響應式排版**：
   - 使用瀏覽器 DevTools 切換至手機（< 768px）、平板（768–1023px）、桌機（≥ 1024px）
   - 確認各斷點格線符合規格
5. **考題顯示**：確認選項與答案正確對應來源文件

### 檔案結構驗證

確認 `docs/` 下僅包含 `index.html`、`styles.css`、`app.js`，無引用外部 CDN 或外部字型。
