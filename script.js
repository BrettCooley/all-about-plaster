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

/*----------------------------REVIEW CAROUSEL----------------------------*/

const reviewArrowLeft = document.querySelector(".reviewPrevButton");
const reviewArrowRight = document.querySelector(".reviewNextButton");

const reviewCards = document.querySelectorAll(".reviewCard");
const reviewDots = document.querySelectorAll(".reviewDots span");
const reviewWindow = document.querySelector(".reviewWindow");

let currentReview = 0;
let autoPlayReview;

/* Updates dots and card opacity */

const updateReviewActiveStates = () => {
    reviewDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentReview);
    });

    reviewCards.forEach((card, index) => {
        card.classList.toggle("active", index === currentReview);
    });
};


/* Dot controls */

reviewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentReview = index;
        updateReviewCarousel();
        startReviewAutoPlay();
    });
});

/* Scrolls to the selected card */

const updateReviewCarousel = () => {
    const selectedCard = reviewCards[currentReview];

    const scrollPosition =
        selectedCard.offsetLeft -
        (reviewWindow.clientWidth - selectedCard.offsetWidth) / 2;

    reviewWindow.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
    });

    updateReviewActiveStates();
};

/* Next review */

const updateNextReview = () => {
    currentReview++;

    if (currentReview >= reviewCards.length) {
        currentReview = 0;
    }

    updateReviewCarousel();
};

/* Previous review */

const updatePrevReview = () => {
    currentReview--;

    if (currentReview < 0) {
        currentReview = reviewCards.length - 1;
    }

    updateReviewCarousel();
};

/* Autoplay */

const startReviewAutoPlay = () => {
    clearInterval(autoPlayReview);

    autoPlayReview = setInterval(() => {
        updateNextReview();
    }, 5000);
};

/* Detect manual finger scrolling */

reviewWindow.addEventListener("scroll", () => {
    const reviewWindowCentre =
        reviewWindow.scrollLeft + reviewWindow.clientWidth / 2;

    let closestReview = 0;
    let closestDistance = Infinity;

    reviewCards.forEach((card, index) => {
        const cardCentre =
            card.offsetLeft + card.offsetWidth / 2;

        const distance =
            Math.abs(reviewWindowCentre - cardCentre);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestReview = index;
        }
    });

    currentReview = closestReview;

    updateReviewActiveStates();
});

/* Initial setup */

updateReviewActiveStates();
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