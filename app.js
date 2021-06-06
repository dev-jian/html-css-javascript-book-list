// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// add book to list method
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector("#book-list");

  // create tr element
  const row = document.createElement("tr");
  
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// clear fields method
UI.prototype.clearFields = function () {
  // clear fields
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// show alerts method
UI.prototype.showAlert = function (msg, className) {
  // create div element
  const div = document.createElement("div");
  
  // add classes
  div.className = `alert ${className}`;

  // add text
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");

  // get form
  const form = document.querySelector("#book-form");

  // insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  target.parentElement.parentElement.remove();
};

// Store
function Store() {}

Store.getBooks = function () {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  return books;
};

Store.displayBooks = function () {
  const books = Store.getBooks();

  // instanciate UI
  const ui = new UI();

  books.forEach((book) => {
    ui.addBookToList(book);
  });
}

Store.addBook = function (book) {
  const books = Store.getBooks();

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
}

Store.removeBook = function (isbn) {
  const books = Store.getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem("books", JSON.stringify(books));
}

document.addEventListener("DOMContentLoaded", function () {
  Store.displayBooks();
});

// event Listener for add book
document.querySelector("#book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // get form values
  const title = document.querySelector("#title").value, 
        author = document.querySelector("#author").value, 
        isbn = document.querySelector("#isbn").value;

  // instanciate book
  const book = new Book(title, author, isbn);

  // instanciate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    Store.addBook(book);

    ui.addBookToList(book);

    ui.clearFields();

    ui.showAlert("Book Added!", "success");
  }
});

// event listener for delete book
document.querySelector("#book-list").addEventListener("click", function (e) {
  e.preventDefault();

  
  if (e.target.className === "delete") {
    const ui = new UI();
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.deleteBook(e.target);

    ui.showAlert("Book Removed!", "success");
  }
});