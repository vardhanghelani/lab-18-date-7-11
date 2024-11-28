// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");

// Add class "paper" to all paper elements for easier handling
const papers = [paper1, paper2, paper3, paper4, paper5];
papers.forEach((paper) => paper.classList.add("paper"));

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 5; // Total number of pages
let maxLocation = numOfPapers + 1; // Max location (end of the book)

// Functions
function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)"; // Closed to front cover
    } else {
        book.style.transform = "translateX(100%)"; // Closed to back cover
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 5;
                closeBook(false);
                break;
            default:
                throw new Error("Unknown state");
        }
        currentLocation++;
    } else {
        // Reset to the first page when clicking Next on the last page
        resetToFirstPage();
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 5;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 4;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 3;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 2;
                break;
            case 6:
                openBook();
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 1;
                break;
            default:
                throw new Error("Unknown state");
        }
        currentLocation--;
    }
}

// Reset the book to the first page
function resetToFirstPage() {
    closeBook(true); // Close the book to the front cover
    currentLocation = 1; // Reset location
    papers.forEach((paper) => {
        paper.classList.remove("flipped"); // Unflip all pages
        paper.style.zIndex = "0"; // Reset zIndex
    });
    paper1.style.zIndex = 5; // Ensure the front page is on top
}

// Initial Setup: Start with the book closed and all pages unflipped
function initializeBook() {
    resetToFirstPage();
}

// Call the initializeBook function when the script loads
initializeBook();
