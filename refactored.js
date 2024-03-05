

class Library {
    constructor() {
        this.books = [];
    }
    //methods
    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    //methods

    toggleRead() {
        this.read = !this.read;
    }

}

class Render {
    constructor(library) { 
        this.library = library;
        this.main = document.querySelector("main"); // selects the main element which will contain our cards. 
        this.modalBox = document.querySelector(".modal"); // selects modal dialog box. 
        this.titleInput = document.querySelector("#title");
        this.authorInput = document.querySelector("#author");
        this.pageInput = document.querySelector("#pages");
        this.readInput = document.querySelector("#read");
    }
    //methods

    displayBooks() {
        this.main.innerHTML = "";
        this.library.books.forEach((book, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<div class="title">${book.title}</div>
                <div class="author">By: ${book.author}</div>
                <div class="pages">Pages: ${book.pages}</div>
                <button id="read" class="${book.read ? "readGreen" : "readRed"}" onclick="render.toggleRed(${index})">
                    ${book.read ? "Read" : "Not Read"} 
                </button>
                <button id= "remove" onclick="render.removeBook(${index})" >Remove</button>`;
            this.main.appendChild(card);
        });
    }

    showModal() {
        this.modalBox.show();
        this.titleInput.focus();
    }

    closeReset() {
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.pageInput.value = "";
        this.readInput.checked = false;
        this.modalBox.close();
    }

    addBookToLibrary () {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
        const pages = this.pageInput.value;
        const read = this.readInput.checked;
        //instantiate a new book. 
        const newBook = new Book(title, author, pages, read);
        this.library.addBook(newBook);
        this.displayBooks();
        this.closeReset();
    }

    removeBook(index) {
        this.library.removeBook(index);
        this.displayBooks();
    }

    toggleRed(index) {
        this.library.books[index].toggleRead();
        this.displayBooks();
    }

}

// Instantiate the Library
const library = new Library();


//Test books
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 365, true);
const braveNewWorld = new Book("Brave New World", "Aldous Huxley", 455, false);
const harryPotter1 = new Book('Harry Potter and the Scorceror\'s Stone', "J.K. Rowling", 455, true);
library.addBook(theHobbit);
library.addBook(braveNewWorld);
library.addBook(harryPotter1);

// Render OBjects
const render = new Render(library);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  render.displayBooks();
});

const addBookBtn = document.querySelector(".add-new-book");
addBookBtn.addEventListener('click', () => {
  render.showModal();
});

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  render.closeReset();
});

const submit = document.querySelector("#submit");
submit.addEventListener('click', (e) => {
  e.preventDefault();
  render.addBookToLibrary();
});
