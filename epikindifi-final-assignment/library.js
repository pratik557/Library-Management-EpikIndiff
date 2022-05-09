//Part-1
const tableInfo = [
  {
    id: 1,
    title: "Book1",
    author: "Author1",
    lender: "UserC",
    borrower: "UserB",
    action: "-",
  },
  {
    id: 2,
    title: "Book2",
    author: "Author2",
    lender: "UserC",
    borrower: "-",
    action: "-",
  },
  {
    id: 3,
    title: "Book3",
    author: "Author3",
    lender: "UserD",
    borrower: "UserC",
    action: "-",
  },
  {
    id: 4,
    title: "Book4",
    author: "Author4",
    lender: "UserA",
    borrower: "-",
    action: "-",
  },
  {
    id: 5,
    title: "Book5",
    author: "Author5",
    lender: "UserA",
    borrower: "-",
    action: "-",
  },

  {
    id: 6,
    title: "Book6",
    author: "Author6",
    lender: "UserB",
    borrower: "UserA",
    action: "-",
  },
];

let userRef = null;
document.getElementById("logged-in-user-name").innerHTML = "No User Logged In";

function table() {
  let StoreBooksData = "";
  for (let i = 0; i < tableInfo.length; i++) {
    StoreBooksData += `
    <tr id="row_${i + 1}">
        <td>${tableInfo[i].id}</td>
        <td>${tableInfo[i].title}</td>
        <td>${tableInfo[i].author}</td>
        <td>${tableInfo[i].lender}</td>
        <td>${tableInfo[i].borrower}</td>
        <td id="Button_action_${i + 1}">${
      userRef === null
        ? "-"
        : userRef === tableInfo[i].borrower
        ? `<button onClick="returnBook(${tableInfo[i].id})">Return</button>`
        : tableInfo[i].borrower === "-" && tableInfo[i].lender !== userRef
        ? `<button onClick="borrowBook(${tableInfo[i].id})">Borrow</button>`
        : "-"
    }</td>
        `;
  }
  if (userRef) {
    StoreBooksData += `
        <tr id="row_${tableInfo.length + 1}">
            <td>${tableInfo.length + 1}</td>
            <td>
                <input type="text"  id="title_input" placeholder="title">
                </td>
                <td>
                <input type="text"  id="author_input" placeholder="author">
            </td>
            <td>${userRef}</td>
            <td>_</td>
            <td><button onClick="addBook()">Add Book</button></td>
            </tr>
        `;
  }
  document.getElementById("tableInfo").innerHTML = StoreBooksData;
}
table();


//Part-2
let UserID = ["UserA", "UserB", "UserC", "UserD"];
function changeLoggedInUser() {
  let user = document.getElementById("logged-user");
  let holder = document.getElementById("logged-in-user-name");
  if(user.value===""){
    alert("Please pass userId !!!");
  }
  else if (UserID.includes(user.value)) {
    holder.innerText = "Logged in User: " + user.value;
    userRef = user.value;
    table();
  } else {
    holder.innerText = "No user logged in";
    alert("Enter a valid UserId !!!")
  }
}
//Option List for Default User.
function autoUserOption(value) {
  for (let i = 0; i < UserID; i++) {
    if (tags[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {
      let node = document.createElement("option");
      let val = document.createTextNode(tags[i]);
      node.appendChild(val);
    }
  }
}


//Part-3
//Add Book
function addBook() {
  let title_data = document.getElementById("title_input");
  let author_data = document.getElementById("author_input");
  if(title_data.value.length===0 || author_data.value.length===0) {
    alert("Enter both Title & author data !!!");
  }
  else{
  let newAuthorDetail = {
    id: tableInfo.length + 1,
    title: title_data.value,
    author: author_data.value,
    lender: userRef,
    borrower: "-",
    action: "-",
  };
  tableInfo.push(newAuthorDetail);
}
  table();
}


//Part-4
//Book Borrow Function
function borrowBook(id) {
  tableInfo[id-1].borrower = userRef;
  table();
  let button_holder = document.getElementById(`Button_action_${id}`);
  button_holder.innerHTML = `<button onClick="returnBook(${id})">Return</button>`
}


//Part-5
//Book Return Function
function returnBook(id) {
  tableInfo[id-1].borrower ="-";
  table();
  let button_holder = document.getElementById(`Button_action_${id}`);
  button_holder.innerHTML = `<button onClick="borrowBook(${id})">Borrow</button>`
}
