// include.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통 헤더
    const headerHTML = `<h1><a href="/">SKZ 두뇌 훈련소</a></h1>`;

    // 2. 메인 네비게이션 (ID 추가)
    const mainNavHTML = `
        <a href="/" id="nav-home">브레인 분석실</a>
        <a href="dash.html" id="nav-dash">두뇌 훈련센터</a>
        <a href="report.html" id="nav-report">나의 두뇌점수</a>
    `;

    // 3. 게임 카테고리 탭
    const categoryTabsHTML = `
        <a href="game.html" id="tab-focus">정밀 집중</a>
        <a href="game2.html" id="tab-logic">전략 논리</a>
        <a href="game3.html" id="tab-speed">쾌속 판단</a>
    `;

    // 4. 세부 게임 서브 네비
    const gameSubNavHTML = `
        <a href="game.html">🎯 카드 짝</a>
        <a href="game4.html">📍 위치 기억</a>
        <a href="game8.html">🛒 시장가면</a>
        <a href="game7.html">🌀 패턴추론</a>
    `;

    // 5. 공통 푸터
    const footerHTML = `
        <div style="margin-bottom: 10px;">
            <a href="privacy.html">개인정보처리방침</a> | <a href="terms.html">이용약관</a>
        </div>
        &copy; 2026 SKZ Brain Lab. All rights reserved.
    `;

    // 데이터 주입
    if(document.getElementById('site-header')) document.getElementById('site-header').innerHTML = headerHTML;
    if(document.getElementById('site-nav')) document.getElementById('site-nav').innerHTML = mainNavHTML;
    if(document.getElementById('category-tabs')) document.getElementById('category-tabs').innerHTML = categoryTabsHTML;
    if(document.getElementById('game-sub-nav')) document.getElementById('game-sub-nav').innerHTML = gameSubNavHTML;
    if(document.getElementById('site-footer')) document.getElementById('site-footer').innerHTML = footerHTML;

    // --- [핵심] 페이지별 활성화(Active) 로직 ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // A. 메인 네비게이션 활성화
    if (currentPath === "index.html" || currentPath === "") {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (currentPath === "report.html") {
        document.getElementById('nav-report')?.classList.add('active');
    } else if (currentPath === "dash.html" || currentPath.startsWith("game")) {
        // dash.html 이거나 game으로 시작하는 모든 페이지는 '두뇌 훈련센터' 활성화
        document.getElementById('nav-dash')?.classList.add('active');
    }

    // B. 카테고리 탭 및 서브 네비 활성화 (기존 로직 유지)
    const subLinks = document.querySelectorAll('.game-sub-nav a');
    subLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    if(["game.html", "game4.html", "game8.html"].includes(currentPath)) {
        document.getElementById('tab-focus')?.classList.add('active');
    } else if(["game2.html", "game7.html"].includes(currentPath)) {
        document.getElementById('tab-logic')?.classList.add('active');
    } else if(["game3.html", "game5.html", "game6.html"].includes(currentPath)) {
        document.getElementById('tab-speed')?.classList.add('active');
    }
});
