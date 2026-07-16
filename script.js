document.addEventListener('DOMContentLoaded', function () {
  
  // 1. ハンバーガーメニューの開閉
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".header-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // クリックイベントの伝播を防ぐ
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // メニューを開いた状態でリンクをクリックしたら自動的にメニューを閉じる
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  // 2. スプライド (メインビジュアル)
  if (document.querySelector('.splide')) {
    var splide = new Splide('.splide', {
      type: 'fade',
      rewind: true,
      autoplay: true,
      interval: 6000, // 6秒ごとに切り替え
      speed: 2500,    // フェードにかける時間は2.5秒
      pauseOnHover: false,
    });
    splide.mount();
  }

  // 3. スクロールフェード (AOS)
  if (typeof AOS !== 'undefined') {
    // スマホ時はオフセットを下げてアニメーション詰まりを防ぐ
    const isMobile = window.innerWidth <= 480;
    AOS.init({
      offset: isMobile ? 80 : 300,
      duration: 1200,
      once: true
    });
  }

  // 4. 慣性スクロール (Lenis) ＋ スムーズスクロールアニメーションの実装
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2, // スクロールのアニメーション時間（秒）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 気持ちいい加減速
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🌟 HTML内のすべてのページ内リンク（#からはじまるリンク）にスムーズスクロールを適用
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 通常の瞬時移動をキャンセル
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Lenisのスクロールメソッドを使ってターゲットまで滑らかに移動
          lenis.scrollTo(targetElement, {
            offset: -20, // ヘッダー等に被らないように少し調整（必要に応じて数値を変更してください）
            immediate: false,
          });
        }
      });
    });
  }

});