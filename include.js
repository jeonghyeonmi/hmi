// include.js
document.addEventListener("DOMContentLoaded", function() {
    // [1] 공통 CSS 주입 (디자인 통일)
    const style = document.createElement('style');
    style.textContent = `
        :root { --primary-color: #1a3a5f; --bg-color: #f4f7f9; --focus-color: #047857; --logic-color: #b91c1c; --speed-color: #d97706; }
        header { background: var(--primary-color); color: white; padding: 1.2rem; text-align: center; }
        header h1 { margin: 0; font-size: 1.4rem; font-weight: 800; }
        header h1 a { text-decoration: none; color: inherit; }
        nav.main-nav { background: white; padding: 0.8rem; display: flex; justify-content: center; gap: 1.2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000; }
        nav.main-nav a { text-decoration: none; color: #666; font-weight: bold; font-size: 0.9rem; }
        nav.main-nav a.active { color: var(--primary-color) !important; border-bottom: 2px solid var(--primary-color); }
        .category-tabs { display: flex; background: #fff; border-bottom: 1px solid #eee; justify-content: center; }
        .category-tabs a { min-width: 100px; max-width: 200px; flex: 1; text-align: center; padding: 15px 10px; text-decoration: none; color: #bbb; font-size: 0.9rem; font-weight: bold; }
        .category-tabs a.active { border-bottom: 3px solid currentColor; }
        .game-sub-nav { display: flex; gap: 10px; padding: 15px; justify-content: center; background: #f8f9fa; overflow-x: auto; white-space: nowrap; }
        .game-sub-nav a { padding: 6px 14px; background: white; border: 1px solid #eee; border-radius: 20px; font-size: 0.75rem; text-decoration: none; color: #666; }
        .game-sub-nav a.active { background: #333; color: white !important; border-color: #333; }
        footer { text-align: center; padding: 3rem 0; color: #bbb; font-size: 0.75rem; background: #fff; border-top: 1px solid #eee; margin-top: 40px; }
    `;
    document.head.appendChild(style);

    // [2] 게임 데이터 정의 (카테고리별 그룹핑)
    const gameData = {
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

    // [3] HTML 구조 주입
    if(document.getElementById('site-header')) 
        document.getElementById('site-header').innerHTML = `<h1><a href="/">SKZ 두뇌 훈련소</a></h1>`;
    
    if(document.getElementById('site-nav')) 
        document.getElementById('site-nav').innerHTML = `
            <a href="/" id="nav-home">브레인 분석실</a>
            <a href="dash.html" id="nav-dash">두뇌 훈련센터</a>
            <a href="report.html" id="nav-report">나의 두뇌점수</a>
        `;

    if(document.getElementById('category-tabs')) 
        document.getElementById('category-tabs').innerHTML = `
            <a href="game.html" id="tab-focus">정밀 집중</a>
            <a href="game2.html" id="tab-logic">전략 논리</a>
            <a href="game3.html" id="tab-speed">쾌속 판단</a>
        `;

    if(document.getElementById('site-footer')) 
        document.getElementById('site-footer').innerHTML = `&copy; 2026 SKZ Brain Lab. All rights reserved.`;

    // [4] 활성화 및 서브메뉴 필터링 로직
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    // 메인 네비 활성화
    if (currentPath === "index.html" || currentPath === "") document.getElementById('nav-home')?.classList.add('active');
    else if (currentPath === "report.html") document.getElementById('nav-report')?.classList.add('active');
    else if (currentPath === "dash.html" || currentPath.startsWith("game")) document.getElementById('nav-dash')?.classList.add('active');

    // 카테고리 결정 및 서브메뉴 생성
    let activeCategory = "";
    if (["game.html", "game4.html", "game8.html"].includes(currentPath)) activeCategory = "focus";
    else if (["game2.html", "game7.html"].includes(currentPath)) activeCategory = "logic";
    else if (["game3.html", "game5.html", "game6.html"].includes(currentPath)) activeCategory = "speed";

    if (activeCategory) {
        // 탭 강조
        const tab = document.getElementById(`tab-${activeCategory}`);
        if(tab) {
            tab.classList.add('active');
            tab.style.color = `var(--${activeCategory}-color)`;
        }

        // 서브메뉴 생성 (해당 카테고리 게임만)
        const subNav = document.getElementById('game-sub-nav');
        if (subNav) {
            subNav.innerHTML = gameData[activeCategory].map(game => 
                `<a href="${game.url}" class="${currentPath === game.url ? 'active' : ''}">${game.name}</a>`
            ).join('');
        }
    }
});
