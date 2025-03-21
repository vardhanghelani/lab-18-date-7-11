// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const papers = Array.from(document.querySelectorAll(".paper"));

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage");

// Business Logic
let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

// Functions
function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) openBook();
        if (currentLocation <= numOfPapers) {
            papers[currentLocation - 1].classList.add("flipped");
            papers[currentLocation - 1].style.zIndex = currentLocation;
        }
        currentLocation++;
        if (currentLocation > numOfPapers) closeBook(false);
    } else {
        resetToFirstPage();
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        if (currentLocation - 1 === 1) closeBook(true);
        if (currentLocation - 2 >= 0) {
            papers[currentLocation - 2].classList.remove("flipped");
            papers[currentLocation - 2].style.zIndex = numOfPapers - (currentLocation - 2);
        }
        currentLocation--;
    }
}

function resetToFirstPage() {
    closeBook(true);
    currentLocation = 1;
    papers.forEach((paper, index) => {
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - index;
    });
}

// Initialize the book
resetToFirstPage();
