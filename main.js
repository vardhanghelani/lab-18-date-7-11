// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1; // Start at first page (the cover is already flipped)
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1; // +1 because we're counting positions, not just papers

// Functions
function openBook() {
    book.classList.add("open");
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.classList.remove("open");
    } else {
        book.classList.add("close");
        book.classList.remove("open");
    }
}

function updateButtons() {
    // Hide prev button when at the beginning
    prevBtn.style.display = currentLocation === 1 ? "none" : "block";
    
    // Hide next button when at the end
    nextBtn.style.display = currentLocation >= maxLocation ? "none" : "block";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        // If at the beginning, open the book first
        if (currentLocation === 1) {
            openBook();
        }
        
        // Flip the current page
        papers[currentLocation - 1].classList.add("flipped");
        papers[currentLocation - 1].style.zIndex = currentLocation;
        
        // Move to the next page
        currentLocation++;
        
        // If at the end, close the book
        if (currentLocation === maxLocation) {
            closeBook(false);
        }
        
        updateButtons();
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        // If at the end, open the book
        if (currentLocation === maxLocation) {
            openBook();
        }
        
        // Move to the previous page
        currentLocation--;
        
        // Flip back the page
        papers[currentLocation - 1].classList.remove("flipped");
        
        // Update z-index for proper stacking
        for (let i = 0; i < numOfPapers; i++) {
            if (i < currentLocation - 1) {
                papers[i].style.zIndex = i + 1;
            } else {
                papers[i].style.zIndex = numOfPapers - i;
            }
        }
        
        // If at the beginning, close the book
        if (currentLocation === 1) {
            closeBook(true);
        }
        
        updateButtons();
    }
}

// Initialize Book
// Check if first page is meant to be flipped at start
if (papers[0].classList.contains("flipped")) {
    openBook();
} else {
    closeBook(true);
}

// Set initial z-index values
for (let i = 0; i < numOfPapers; i++) {
    papers[i].style.zIndex = numOfPapers - i;
}

// Initial button state
updateButtons();
