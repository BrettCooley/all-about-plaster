const beforeAndAfterTrack = document.querySelector(".beforeAndAfterTrack");
const beforeAndAfterCards = document.querySelectorAll(".beforeAndAfterCards");

const beforeAndAfterPrev = document.querySelector(".beforeAndAfterPrev");
const beforeAndAfterNext = document.querySelector(".beforeAndAfterNext");
const beforeAndAfterProgressBar = document.querySelector(".progressBar");

let currentslide = 0
let autoSlideChange;


const updateCarousel = () => {
    beforeAndAfterTrack.style.transform =
    translateX'(-${currentslide * 100}%)';
    
