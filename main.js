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
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 0:
                openBook();
                papers[0].classList.add("flipped");
                papers[0].style.zIndex = 1;
                break;
            default:
                papers[currentLocation].classList.add("flipped");
                papers[currentLocation].style.zIndex = currentLocation;
                break;
        }
        
        currentLocation++;
        updateButtons();
    }
}

function goPrevPage() {
    if(currentLocation > 0) {
        switch(currentLocation) {
            case 1:
                closeBook(true);
                papers[0].classList.remove("flipped");
                papers[0].style.zIndex = numOfPapers;
                break;
            default:
                papers[currentLocation - 1].classList.remove("flipped");
                papers[currentLocation - 1].style.zIndex = numOfPapers - (currentLocation - 1);
                break;
        }
        
        currentLocation--;
        updateButtons();
    }
}

function updateButtons() {
    if(currentLocation === 0) {
        prevBtn.style.visibility = "hidden";
    } else {
        prevBtn.style.visibility = "visible";
    }
    
    if(currentLocation === maxLocation) {
        nextBtn.style.visibility = "hidden";
    } else {
        nextBtn.style.visibility = "visible";
    }
}

// Initialize Book
function init() {
    // Set initial positions and z-index
    book.style.transform = "translateX(0%)";
    
    for(let i = 0; i < numOfPapers; i++) {
        papers[i].style.zIndex = numOfPapers - i;
        papers[i].classList.remove("flipped");
    }
    
    currentLocation = 0;
    updateButtons();
}

// Run initialization
window.addEventListener('load', init);
