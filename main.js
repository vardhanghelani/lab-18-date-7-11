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
let currentLocation = 0; // Start at first double-page spread
let maxLocation = papers.length; // Total number of pages

// Functions
function updateButtons() {
    prevBtn.style.display = currentLocation === 0 ? "none" : "block";
    nextBtn.style.display = currentLocation >= maxLocation ? "none" : "block";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        papers[currentLocation].classList.add("flipped");
        papers[currentLocation].style.zIndex = currentLocation + 1;
        currentLocation++;

        if (currentLocation % 2 === 0) {
            book.classList.add("open");
        }

        updateButtons();
    }
}

function goPrevPage() {
    if (currentLocation > 0) {
        currentLocation--;
        papers[currentLocation].classList.remove("flipped");
        papers[currentLocation].style.zIndex = maxLocation - currentLocation;

        if (currentLocation % 2 === 1) {
            book.classList.add("open");
        } else {
            book.classList.remove("open");
        }

        updateButtons();
    }
}

// Initialize Book
book.classList.add("open"); // Ensure book is always open
updateButtons();
