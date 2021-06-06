// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {

}

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
}

// Event Listeners
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

  console.log(ui);

  // Add book to list
  ui.addBookToList(book);

  ui.clearFields();
});