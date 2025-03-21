// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const papers = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3"),
    document.querySelector("#p4"),
    document.querySelector("#p5")
];

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let maxLocation = papers.length + 1;

// Functions
function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        papers[currentLocation - 1].classList.add("flipped");
        papers[currentLocation - 1].style.zIndex = currentLocation;
        currentLocation++;
    } else {
        resetToFirstPage();
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        papers[currentLocation - 1].classList.remove("flipped");
        papers[currentLocation - 1].style.zIndex = maxLocation - currentLocation;
    }
}

function resetToFirstPage() {
    closeBook(true);
    currentLocation = 1;
    papers.forEach((paper) => {
        paper.classList.remove("flipped");
        paper.style.zIndex = "0";
    });
    papers[0].style.zIndex = 4;
}

// Initialize Book
resetToFirstPage();
