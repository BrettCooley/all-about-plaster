const beforeAfterWindow = document.querySelector(".beforeAndAfterWindow");
const beforeAndAfterCards = document.querySelectorAll(".beforeAndAfterCards");

const beforeAndAfterPrev = document.querySelector(".beforeAndAfterPrev");
const beforeAndAfterNext = document.querySelector(".beforeAndAfterNext");
const beforeAndAfterProgressBar = document.querySelector(".progressBar");

let currentslide = 0
let autoSlideChange;


const CardWidth = beforeAndAfterCards[0].offsetwidth;
const gap = 20

beforeAndAfteWindow.scrollto({
    left: currentslide * (CardWidth, gap),
    behavior = "smooth"
});


beforeAndAfterProgressBar.style.width =
