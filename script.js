let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pageInput = document.querySelector("#pages");
let readInput = document.querySelector("#read");
// All of your book objects are stored in this array
const myLibrary = [];

document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.querySelector(".modal");
    if (dialog.showModal) {
        dialog.close();
    }

    // Add event listeners here
});

// book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRed = function () {
    this.read = !this.read;
  };

// Test books instantiated

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 365, true);
const braveNewWorld = new Book("Brave New World", "Aldous Huxley", 455, false);
const harryPotter1 = new Book('Harry Potter and the Scorceror\'s Stone', "J.K. Rowling", 455, true);
myLibrary.push(theHobbit);
myLibrary.push(braveNewWorld);
myLibrary.push(harryPotter1);

displayBooks();

// function that adds a book to the library
function addBooktToLibrary () {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    // creates new book and appends to library div
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const main = document.querySelector("main");
    main.innerHTML = ""; // delete all rendered cards. 
        for(let i = 0; i < myLibrary.length; i++){
            const card = document.createElement("div");
            card.classList.add("card");
            let book = myLibrary[i];
            card.innerHTML = `<div class="title">${book.title}</div>
                <div class="author">By: ${book.author}</div>
                <div class="pages">Pages: ${book.pages}</div>
                <button id= "read" class= "${book.read ? "readGreen" : "readRed"}" onclick="toggleRed(${i})">
                    ${book.read ? "Read" : "Not Read"} 
                </button>
                <button id= "remove" onclick="removeBook(${i})" >Remove</button>
            `;
            main.appendChild(card);
        }
        
    
}

// select the dialoge box
const modalBox = document.querySelector(".modal");
modalBox.close();

// event listener for add-book btn
const addBookBtn = document.querySelector(".add-new-book");
addBookBtn.addEventListener('click', ()=>{
    modalBox.show();
    document.querySelector('#title').focus(); 
});

// event listener for close modal buttn
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeReset();
});

//event listener for when submit button is clicked. 
const submit = document.querySelector("#submit");
submit.addEventListener('click', (e) =>{
    e.preventDefault();
    addBooktToLibrary();
    closeReset();
});

function closeReset() {
    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    readInput.checked = false;
    modalBox.close();
}

function removeBook(index){
    myLibrary.splice(index,1);
    displayBooks();
}

function toggleRed(index) {
    myLibrary[index].toggleRed();
    displayBooks();
  }
