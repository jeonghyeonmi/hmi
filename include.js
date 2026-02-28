// include.js
document.addEventListener("DOMContentLoaded", function() {
    // [1] 공통 CSS 주입 (헤더, 네비, 탭, 푸터 스타일)
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --primary-color: #1a3a5f; 
            --bg-color: #f4f7f9; 
            --focus-color: #047857; 
            --logic-color: #b91c1c;
            --speed-color: #d97706;
        }
        header { background: var(--primary-color); color: white; padding: 1.2rem; text-align: center; }
        header h1 { margin: 0; font-size: 1.4rem; font-weight: 800; }
        header h1 a { text-decoration: none; color: inherit; }

        nav.main-nav { 
            background: white; padding: 0.8rem; display: flex; justify-content: center; 
            gap: 1.2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000; 
        }
        nav.main-nav a { text-decoration: none; color: #666; font-weight: bold; font-size: 0.9rem; }
        nav.main-nav a.active { color: var(--primary-color) !important; border-bottom: 2px solid var(--primary-color); }

        .category-tabs { display: flex; background: #fff; border-bottom: 1px solid #eee; justify-content: center; }
        .category-tabs a { 
            min-width: 100px; max-width: 200px; flex: 1; text-align: center; 
            padding: 15px 10px; text-decoration: none; color: #bbb; font-size: 0.9rem; font-weight: bold; 
        }
        .category-tabs a.active { border-bottom: 3px solid currentColor; }

        .game-sub-nav { 
            display: flex; gap: 10px; padding: 15px; justify-content: center; 
            background: #f8f9fa; overflow-x: auto; white-space: nowrap; scrollbar-width: none;
        }
        .game-sub-nav a { 
            padding: 6px 14px; background: white; border: 1px solid #eee; 
            border-radius: 20px; font-size: 0.75rem; text-decoration: none; color: #666; 
        }
        .game-sub-nav a.active { background: #333; color: white !important; }

        footer { text-align: center; padding: 3rem 0; color: #bbb; font-size: 0.75rem; background: #fff; border-top: 1px solid #eee; margin-top: 40px; }
        footer a { color: #bbb; text-decoration: none; margin: 0 5px; }
    `;
    document.head.appendChild(style);

    // [2] HTML 구조 정의
    const headerHTML = `<h1><a href="/">SKZ 두뇌 훈련소</a></h1>`;
    const mainNavHTML = `
        <a href="/" id="nav-home">브레인 분석실</a>
        <a href="dash.html" id="nav-dash">두뇌 훈련센터</a>
        <a href="report.html" id="nav-report">나의 두뇌점수</a>
    `;
    const categoryTabsHTML = `
        <a href="game.html" id="tab-focus">정밀 집중</a>
        <a href="game2.html" id="tab-logic">전략 논리</a>
        <a href="game3.html" id="tab-speed">쾌속 판단</a>
    `;
    const footerHTML = `
        <div style="margin-bottom: 10px;">
            <a href="privacy.html">개인정보처리방침</a> | <a href="terms.html">이용약관</a>
        </div>
        &copy; 2026 SKZ Brain Lab. All rights reserved.
    `;

    // [3] 데이터 주입
    if(document.getElementById('site-header')) document.getElementById('site-header').innerHTML = headerHTML;
    if(document.getElementById('site-nav')) document.getElementById('site-nav').innerHTML = mainNavHTML;
    if(document.getElementById('category-tabs')) document.getElementById('category-tabs').innerHTML = categoryTabsHTML;
    if(document.getElementById('site-footer')) document.getElementById('site-footer').innerHTML = footerHTML;

    // [4] 활성화 로직 (Active 처리)
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // 메인 네비 활성화
    if (currentPath === "index.html" || currentPath === "") document.getElementById('nav-home')?.classList.add('active');
    else if (currentPath === "report.html") document.getElementById('nav-report')?.classList.add('active');
    else if (currentPath === "dash.html" || currentPath.startsWith("game")) document.getElementById('nav-dash')?.classList.add('active');

    // 카테고리 탭 활성화 및 색상 지정
    if(["game.html", "game4.html", "game8.html"].includes(currentPath)) {
        const t = document.getElementById('tab-focus');
        if(t) { t.classList.add('active'); t.style.color = "var(--focus-color)"; }
    } else if(["game2.html", "game7.html"].includes(currentPath)) {
        const t = document.getElementById('tab-logic');
        if(t) { t.classList.add('active'); t.style.color = "var(--logic-color)"; }
    } else if(["game3.html", "game5.html", "game6.html"].includes(currentPath)) {
        const t = document.getElementById('tab-speed');
        if(t) { t.classList.add('active'); t.style.color = "var(--speed-color)"; }
    }

    // 서브 네비 활성화
    const subLinks = document.querySelectorAll('.game-sub-nav a');
    subLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath) link.classList.add('active');
    });
});
