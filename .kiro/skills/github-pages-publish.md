---
name: github-pages-publish
description: 本專案使用 GitHub Pages 從 main 分支的 docs/ 資料夾發布靜態網站的完整操作指引
---

# GitHub Pages 發布指引

資料來源：[GitHub Docs — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

---

## 本專案的發布設定

| 項目 | 設定值 |
|------|--------|
| 發布方式 | Deploy from a branch（從分支發布） |
| 來源分支 | `main` |
| 來源資料夾 | `/docs` |
| 觸發時機 | 每次 push 到 `main` 分支時自動發布 |

---

## 首次設定步驟

1. 確認 `docs/` 資料夾已存在於 `main` 分支中，且包含 `index.html`
2. 將程式碼 push 到 GitHub 遠端倉庫的 `main` 分支
3. 在 GitHub 倉庫頁面點選 **Settings**
4. 左側側欄選擇 **Pages**
5. 在 **Build and deployment → Source** 下拉選單選擇 **Deploy from a branch**
6. **Branch** 選 `main`，**Folder** 選 `/docs`
7. 點選 **Save**

設定後 GitHub 會自動部署，網址格式為：
`https://<username>.github.io/<repository-name>/`

---

## 日常發布流程

每次更新網站內容後，只需：

```powershell
# 在 wemed/ 根目錄執行
git add docs/
git commit -m "更新網站內容"
git push origin main
```

push 成功後 GitHub 會自動觸發部署，約 1–2 分鐘後生效。

---

## 注意事項

- `docs/` 資料夾必須一直存在於 `main` 分支；若刪除會導致建置失敗
- 無需 `.nojekyll` 檔案（靜態 HTML 不需要 Jekyll 處理）；但若想確保 GitHub 不套用 Jekyll，可在 `docs/` 內加入空白的 `.nojekyll` 檔
- GitHub Pages 公開倉庫免費使用；私有倉庫需 GitHub Pro 以上方案
- 不需要 GitHub Actions workflow，純靜態分支發布即可

---

## 可驗證標準

- [ ] `docs/index.html` 存在於 `main` 分支
- [ ] GitHub 倉庫 Settings → Pages 顯示 Source 為 `main / docs`
- [ ] 瀏覽 `https://<username>.github.io/<repo>/` 可看到正確頁面
- [ ] push 新 commit 後約 2 分鐘內頁面更新
