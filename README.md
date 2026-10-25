# 小二數學：一位數乘一位數互動遊戲

## 功能
- 乘法概念教學與生活例子
- 14 道基礎、乘法計算及生活應用題
- 分組圓點圖像題、範疇篩選
- 即時核對、答案解釋、進度條
- 60 秒限時挑戰，每答對一題加 10 分
- 本機學習紀錄、正確率及最高分
- 適合 iPad、iPhone、Windows 的響應式排版

## 檔案
`index.html` 網頁結構；`style.css` 視覺；`config.js` 課程設定；`questions.js` 題庫；`script.js` 互動邏輯。

## 修改
在 `config.js` 更改標題、教學提示及概念卡。在 `questions.js` 加題：每題需有 `id`、`level`（basic/facts/story）、`topic`、`question`、`options`、`answer`、`explanation`。`answer` 必須與選項完全相同。圖像題可加入 `visual:{groups:2,each:3}`。正式教學前請核對題目及答案。

## 本機測試
解壓縮後開啟 `index.html`。需要本機伺服器時可用 VS Code Live Server，或在資料夾執行 `python -m http.server 8000`，再開 `http://localhost:8000`。

## GitHub Pages
1. 在 GitHub 建立 repository。
2. 將五個檔案上載至根目錄。
3. Settings → Pages → Deploy from a branch。
4. 選擇 `main` 及 `/ (root)`，儲存並等待部署。

## Netlify
登入 Netlify，建立網站並拖放整個解壓縮資料夾，或連接 GitHub repository。本專案不需 build command，發布目錄為根目錄。

## 測試清單
- [ ] 四個模組可切換
- [ ] 教學卡片顯示正常
- [ ] 題目篩選與圖像題正常
- [ ] 未選答案有提示
- [ ] 答案判斷及解釋正確
- [ ] 下一題及進度條正常
- [ ] 倒數、加分、挑戰結束正常
- [ ] 最高分與本機紀錄保存正常
- [ ] iPhone、iPad、Windows 排版正常

紀錄只存在目前瀏覽器 localStorage，不會跨裝置同步。Google Fonts 為外部字體，離線時可移除 CSS 第一行的 @import。
