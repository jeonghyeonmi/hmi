// include.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통 헤더
    const headerHTML = `<h1><a href="/">SKZ 두뇌 훈련소</a></h1>`;

    // 2. 메인 네비게이션
    const mainNavHTML = `
        <a href="/">브레인 분석실</a>
        <a href="dash.html">두뇌 훈련센터</a>
        <a href="report.html">나의 두뇌점수</a>
    `;

    // 3. 게임 카테고리 탭 (모든 게임 공통)
    const categoryTabsHTML = `
        <a href="game.html" id="tab-focus">정밀 집중</a>
        <a href="game2.html" id="tab-logic">전략 논리</a>
        <a href="game3.html" id="tab-speed">쾌속 판단</a>
    `;

    // 4. 세부 게임 서브 네비 (집중력 영역 예시)
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

    // ID 위치에 데이터 주입
    if(document.getElementById('site-header')) document.getElementById('site-header').innerHTML = headerHTML;
    if(document.getElementById('site-nav')) document.getElementById('site-nav').innerHTML = mainNavHTML;
    if(document.getElementById('category-tabs')) document.getElementById('category-tabs').innerHTML = categoryTabsHTML;
    if(document.getElementById('game-sub-nav')) document.getElementById('game-sub-nav').innerHTML = gameSubNavHTML;
    if(document.getElementById('site-footer')) document.getElementById('site-footer').innerHTML = footerHTML;

    // 현재 페이지 활성화 표시 (Active 처리)
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    // 서브네비 활성화
    const subLinks = document.querySelectorAll('.game-sub-nav a');
    subLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // 카테고리 탭 활성화 로직
    if(["game.html", "game4.html", "game8.html"].includes(currentPath)) {
        document.getElementById('tab-focus')?.classList.add('active');
    } else if(["game2.html", "game7.html"].includes(currentPath)) {
        document.getElementById('tab-logic')?.classList.add('active');
    } else if(["game3.html", "game5.html", "game6.html"].includes(currentPath)) {
        document.getElementById('tab-speed')?.classList.add('active');
    }
});
