let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let isAnimating = false;

function showSlide(n, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;
    
    // 現在のスライドからactiveを削除
    slides[currentSlide].classList.remove('active', 'slide-in-right', 'slide-in-left');
    dots[currentSlide].classList.remove('active');
    
    // 新しいスライドを設定
    currentSlide = n;
    
    // まずactiveクラスを追加（display: flexにする）
    slides[currentSlide].classList.add('active');
    
    // 次のフレームでアニメーションクラスを追加
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const animationClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            slides[currentSlide].classList.add(animationClass);
        });
    });
    
    dots[currentSlide].classList.add('active');
    
    // カウンター更新
    document.getElementById('current').textContent = currentSlide + 1;
    
    // ボタンの状態更新
    document.querySelector('.prev').disabled = currentSlide === 0;
    document.querySelector('.next').disabled = currentSlide === totalSlides - 1;
    
    // アニメーション終了後にクラスを削除
    setTimeout(() => {
        slides[currentSlide].classList.remove('slide-in-right', 'slide-in-left');
        isAnimating = false;
    }, 600);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1 && !isAnimating) {
        showSlide(currentSlide + 1, 'next');
    }
}

function prevSlide() {
    if (currentSlide > 0 && !isAnimating) {
        showSlide(currentSlide - 1, 'prev');
    }
}

function goToSlide(n) {
    if (!isAnimating && n !== currentSlide) {
        const direction = n > currentSlide ? 'next' : 'prev';
        showSlide(n, direction);
    }
}

// キーボード操作
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});