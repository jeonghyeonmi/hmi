// include.js
document.addEventListener("DOMContentLoaded", function() {
    // [1] CSS 주입 (여백 제거 및 디자인)
    const style = document.createElement('style');
    style.textContent = `
        :root { --primary-color: #1a3a5f; --bg-color: #f4f7f9; --focus-color: #047857; --logic-color: #b91c1c; --speed-color: #d97706; }
        body { margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; background-color: var(--bg-color); }
        header { background: var(--primary-color); color: white; padding: 1rem 0; text-align: center; margin: 0; border: none; }
        header h1 { margin: 0; font-size: 1.3rem; }
        header h1 a { text-decoration: none; color: inherit; }
        nav.main-nav { background: white; display: flex; justify-content: center; position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid #eee; margin: 0; padding: 0; }
        nav.main-nav a { text-decoration: none; color: #666; font-weight: bold; font-size: 0.9rem; padding: 1rem; }
        nav.main-nav a.active { color: var(--primary-color) !important; box-shadow: inset 0 -2px 0 var(--primary-color); }
        .category-tabs { display: flex; background: #fff; border-bottom: 1px solid #eee; justify-content: center; margin: 0; padding: 0; }
        .category-tabs a { flex: 1; text-align: center; padding: 12px 0; text-decoration: none; color: #bbb; font-size: 0.85rem; font-weight: bold; }
        .category-tabs a.active { border-bottom: 3px solid currentColor; }
        .game-sub-nav { display: flex; gap: 8px; padding: 12px; justify-content: center; background: #f8f9fa; overflow-x: auto; min-height: 50px; border-bottom: 1px solid #eee; }
        .game-sub-nav a { padding: 6px 14px; background: white; border: 1px solid #eee; border-radius: 20px; font-size: 0.75rem; text-decoration: none; color: #666; white-space: nowrap; }
        .game-sub-nav a.active { background: #333 !important; color: white !important; border-color: #333; }
        footer { text-align: center; padding: 2rem 0; color: #bbb; font-size: 0.75rem; background: #fff; border-top: 1px solid #eee; margin-top: 40px; }
    `;
    document.head.appendChild(style);

    // [2] 실제 게임 데이터 (game8.html이 끝인 리스트)
    const gameGroups = {
        focus: [
            { name: "🎯 카드 짝", url: "game.html" },
            { name: "📍 위치 기억", url: "game4.html" },
            { name: "🛒 시장가면", url: "game8.html" }
        ],
        logic: [
            { name: "🔢 스도쿠", url: "game2.html" },
            { name: "🤖 AI 오목", url: "game7.html" }
        ],
        speed: [
            { name: "🌈 스트룹", url: "game3.html" },
            { name: "🧮 수리 판단", url: "game5.html" },
            { name: "🐾 동물 인지", url: "game6.html" }
        ]
    };

    // [3] 구조 주입 (ID 체크 필수)
    if(document.getElementById('site-header')) document.getElementById('site-header').innerHTML = `<h1><a href="/">SKZ 두뇌 훈련소</a></h1>`;
    if(document.getElementById('site-nav')) document.getElementById('site-nav').innerHTML = `
        <a href="/" id="nav-home">브레인 분석실</a>
        <a href="dash.html" id="nav-dash">두뇌 훈련센터</a>
        <a href="report.html" id="nav-report">나의 두뇌점수</a>
    `;
    if(document.getElementById('category-tabs')) document.getElementById('category-tabs').innerHTML = `
        <a href="game.html" id="tab-focus">정밀 집중</a>
        <a href="game2.html" id="tab-logic">전략 논리</a>
        <a href="game3.html" id="tab-speed">쾌속 판단</a>
    `;
    if(document.getElementById('site-footer')) document.getElementById('site-footer').innerHTML = `&copy; 2026 SKZ Brain Lab. All rights reserved.`;

    // [4] 활성화 로직
    const path = window.location.pathname.split("/").pop() || "index.html";

    // 메인 네비 활성화
    if (path === "index.html" || path === "") document.getElementById('nav-home')?.classList.add('active');
    else if (path === "report.html") document.getElementById('nav-report')?.classList.add('active');
    else if (path === "dash.html" || path.startsWith("game")) document.getElementById('nav-dash')?.classList.add('active');

    // 카테고리 판별 및 3차 메뉴 생성
    let currentCat = "";
    for (const key in gameGroups) {
        if (gameGroups[key].some(g => g.url === path)) {
            currentCat = key;
            break;
        }
    }

    if (currentCat) {
        document.getElementById(`tab-${currentCat}`)?.classList.add('active');
        const subNav = document.getElementById('game-sub-nav');
        if (subNav) {
            subNav.innerHTML = gameGroups[currentCat].map(game => 
                `<a href="${game.url}" class="${path === game.url ? 'active' : ''}">${game.name}</a>`
            ).join('');
        }
    }
});
