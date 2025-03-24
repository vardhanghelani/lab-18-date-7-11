// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 0; // Start at cover (0 means book is closed showing the cover)
let numOfPapers = papers.length;
let maxLocation = numOfPapers;

// Functions
function openBook() {
    book.classList.add("open");
    book.classList.remove("close");
}

function closeBook() {
    book.classList.remove("open");
    book.classList.add("close");
}

function updateButtons() {
    // Hide prev button when at the beginning
    prevBtn.style.display = currentLocation === 0 ? "none" : "block";
    
    // Hide next button when at the end
    nextBtn.style.display = currentLocation >= maxLocation ? "none" : "block";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        // If at the cover, open the book
        if (currentLocation === 0) {
            openBook();
        }
        
        // Flip the current page
        papers[currentLocation].classList.add("flipped");
        papers[currentLocation].style.zIndex = currentLocation;
        
        // Move to the next page
        currentLocation++;
        
        // If at the last page, adjust view
        if (currentLocation === maxLocation) {
            papers[currentLocation - 1].style.zIndex = numOfPapers;
        }
        
        updateButtons();
    }
}

function goPrevPage() {
    if (currentLocation > 0) {
        // Flip back the page
        papers[currentLocation - 1].classList.remove("flipped");
        papers[currentLocation - 1].style.zIndex = numOfPapers - (currentLocation - 1);
        
        // Move to the previous page
        currentLocation--;
        
        // If back at the cover, close the book
        if (currentLocation === 0) {
            closeBook();
        }
        
        updateButtons();
    }
}

// Initialize Book
function init() {
    // Reset all pages - make sure no page is flipped at start
    papers.forEach(paper => {
        paper.classList.remove("flipped");
    });
    
    // Set z-index for proper stacking
    for (let i = 0; i < numOfPapers; i++) {
        papers[i].style.zIndex = numOfPapers - i;
    }
    
    // Start with closed book
    currentLocation = 0;
    closeBook();
    
    // Initial button state
    updateButtons();
}

// Run initialization
init();
