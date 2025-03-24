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
        
        // Set z-index to create proper stacking when turning pages
        // Current paper needs to be above all others when flipping
        for (let i = 0; i < numOfPapers; i++) {
            if (i < currentLocation) {
                // Already flipped pages should stay behind
                papers[i].style.zIndex = 1;
            } else if (i === currentLocation) {
                // Current page being flipped needs highest z-index
                papers[i].style.zIndex = numOfPapers + 1;
            } else {
                // Unflipped pages need to be stacked in order
                papers[i].style.zIndex = numOfPapers - i;
            }
        }
        
        // Move to the next page
        currentLocation++;
        
        updateButtons();
    }
}

function goPrevPage() {
    if (currentLocation > 0) {
        // Flip back the page
        papers[currentLocation - 1].classList.remove("flipped");
        
        // Reset z-index for proper stacking
        for (let i = 0; i < numOfPapers; i++) {
            if (i < currentLocation - 1) {
                // Already flipped pages stay behind
                papers[i].style.zIndex = 1;
            } else if (i === currentLocation - 1) {
                // Current page being unflipped needs highest z-index
                papers[i].style.zIndex = numOfPapers + 1;
            } else {
                // Unflipped pages need to be stacked in order
                papers[i].style.zIndex = numOfPapers - i;
            }
        }
        
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
