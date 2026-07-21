/*---------BURGER------------*/

const burger = document.querySelector(".burger")
const nav = document.querySelector(".navbar_buttons")

burger.addEventListener("click", () => {
burger.classList.toggle("show");
nav.classList.toggle("show");

});


/*-----------------------BEFOREAFTERCAROUSEL--------------------------*/

const beforeAfterTrack = document.querySelector(".beforeAndAfterTrack");
const beforeAfterSlides = document.querySelectorAll(".beforeAndAfterCards");

const beforeAfterPrevButton = document.querySelector(
    ".beforeAndAfterPrevArrow"
);

const beforeAfterNextButton = document.querySelector(
    ".beforeAndAfterNextArrow"
);

const beforeAfterProgress = document.querySelector(".progress");

let currentSlide = 0;
let autoPlayInterval;

function updateBeforeAfterCarousel() {
    beforeAfterTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    beforeAfterSlides.forEach((slide,index) => {
        slide.classList.toggle("active", index === currentSlide);
    });


    const progressWidth =
        ((currentSlide + 1) / beforeAfterSlides.length) * 100;

    beforeAfterProgress.style.width = `${progressWidth}%`;
}

function showNextSlide() {
    currentSlide++;

    if (currentSlide >= beforeAfterSlides.length) {
        currentSlide = 0;
    }

    updateBeforeAfterCarousel();
}

function showPreviousSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = beforeAfterSlides.length - 1;
    }

    updateBeforeAfterCarousel();
}

function startAutoPlay() {
    clearInterval(autoPlayInterval);

    autoPlayInterval = setInterval(() => {
        showNextSlide();
    }, 5000);
}

beforeAfterNextButton.addEventListener("click", () => {
    showNextSlide();
    startAutoPlay();
});

beforeAfterPrevButton.addEventListener("click", () => {
    showPreviousSlide();
    startAutoPlay();
});

/* Mobile swipe */

let touchStartX = 0;
let touchEndX = 0;

beforeAfterTrack.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
});

beforeAfterTrack.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;

    if (swipeDistance > minimumSwipeDistance) {
        showNextSlide();
        startAutoPlay();
    }

    if (swipeDistance < -minimumSwipeDistance) {
        showPreviousSlide();
        startAutoPlay();
    }
});

/* Initial setup */

updateBeforeAfterCarousel();
startAutoPlay();



/*----------------------------REVIEWCAROUSEL-------------------------------------------*/

const reviewArrowLeft = document.querySelector(".reviewPrevButton");
const reviewArrowRight = document.querySelector(".reviewNextButton");

const reviewTracker = document.querySelector(".reviewTracker");
const reviewCards = document.querySelectorAll(".reviewCard");
const reviewDots = document.querySelectorAll(".reviewDots span");
const reviewWindow = document.querySelector(".reviewWindow");

let currentReview = 0;
let autoPlayReview;

const updateReviewCarousel = () => {
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = 20;

    reviewWindow.scrollTo({
        left: currentReview * (cardWidth + gap),
        behavior: "smooth"
    });

    reviewDots.forEach((dot,index) => {
        dot.classList.toggle("active", index === currentReview);
    });

    reviewCards.forEach((card,index) => {
        card.classList.toggle("active", index === currentReview);
    });
}

const updateNextReview = () => {
    currentReview ++;

    if(currentReview >= reviewCards.length) {
        currentReview = 0;

    }
    updateReviewCarousel();
}

const updatePrevReview = () => {
    currentReview --;
    if(currentReview < 0 ) {
        currentReview = reviewCards.length - 1;
    }

    updateReviewCarousel ();
}

const startReviewAutoPlay = () => {
    clearInterval(autoPlayReview);

    autoPlayReview = setInterval(() => {
        updateNextReview();
    }, 5000);
    
}

reviewCards[0].classList.add("active");
reviewDots[0].classList.add("active");

startReviewAutoPlay();

/* Arrow controls */

reviewArrowRight.addEventListener("click", () => {
    updateNextReview();
    startReviewAutoPlay();
});

reviewArrowLeft.addEventListener("click", () => {
    updatePrevReview();
    startReviewAutoPlay();
});
