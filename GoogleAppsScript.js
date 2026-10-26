// 填入你剛剛複製的 Google Apps Script 部署網址
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziqJNyNzwARm1bj0_Ae-v9DVLJveKmYnCvY4jj4alfhf0jqq67QSYYhwIELSBa5Ww/exec";

// 1. 讀取並顯示龍虎榜
async function loadLeaderboard() {
  try {
    const response = await fetch(SCRIPT_URL, { redirect: "follow" });
    const data = await response.json();
    
    renderLeaderboardUI(data);
  } catch (error) {
    console.error("讀取龍虎榜失敗：", error);
  }
}

// 2. 玩家遊戲結束後，送出新分數
async function submitScore(playerName, playerScore) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8" // 避免 CORS 預檢失敗
      },
      body: JSON.stringify({ name: playerName, score: playerScore })
    });
    
    const result = await response.json();
    if (result.status === "success") {
      console.log("分數上傳成功！");
      loadLeaderboard(); // 上傳後立刻重新整理排行榜
    }
  } catch (error) {
    console.error("送出分數失敗：", error);
  }
}

// 3. 渲染畫面的小範例（請對應你網頁上的 HTML 容器）
function renderLeaderboardUI(list) {
  const container = document.getElementById("leaderboard-list");
  if (!container) return;
  
  container.innerHTML = "";
  
  // 取前 10 名
  list.slice(0, 10).forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>第 ${index + 1} 名：${item.name}</span> <span>${item.score}分</span>`;
    container.appendChild(li);
  });
}

// 網頁載入時自動讀取一次排行榜
window.addEventListener("DOMContentLoaded", loadLeaderboard);