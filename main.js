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

function closeBook() {
    book.style.transform = "translateX(0%)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        papers[currentLocation - 1].classList.add("flipped");
        papers[currentLocation - 1].style.zIndex = currentLocation;
        currentLocation++;

        // Ensure buttons are visible
        prevBtn.style.display = "block";
    }

    if (currentLocation === maxLocation) {
        nextBtn.style.display = "none"; // Hide next button at the last page
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        papers[currentLocation - 1].classList.remove("flipped");
        papers[currentLocation - 1].style.zIndex = maxLocation - currentLocation;

        nextBtn.style.display = "block"; // Ensure next button is visible
    }

    if (currentLocation === 1) {
        prevBtn.style.display = "none"; // Hide previous button on first page
    }
}

function resetToFirstPage() {
    closeBook();
    currentLocation = 1;
    papers.forEach((paper) => {
        paper.classList.remove("flipped");
        paper.style.zIndex = "0";
    });
    papers[0].style.zIndex = 4;

    // Reset button visibility
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
}

// Initialize Book
resetToFirstPage();
