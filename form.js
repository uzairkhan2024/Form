var editingRow = null;



// Function to save table data to local storage
function saveTableDataToLocalStorage() {
    var tableData = [];
    var tableRows = document.querySelectorAll("#dataTable tbody tr");

    tableRows.forEach(function(row) {
        var rowData = {
            firstName: row.cells[0].textContent,
            lastName: row.cells[1].textContent,
            email: row.cells[2].textContent,
            numbers: row.cells[3].textContent,
            subject: row.cells[4].textContent
        };

        tableData.push(rowData);
    });

    localStorage.setItem("tableData", JSON.stringify(tableData));
}

// Function to load table data from local storage
function loadTableDataFromLocalStorage() {
    var tableData = localStorage.getItem("tableData");

    if (tableData) {
        tableData = JSON.parse(tableData);

        tableData.forEach(function(rowData) {
            addToTable(rowData.firstName, rowData.lastName, rowData.email, rowData.numbers, rowData.subject);
    });
    }
}

// Call the function to load table data when the page loads
window.onload = function() {
    loadTableDataFromLocalStorage();
    
};

// Function to remove specific data object from local storage
function removeSpecificDataFromLocalStorage() {
    // Load existing data from local storage
    var tableData = localStorage.getItem("tableData");

    if (tableData) {
        // Parse the existing data
        tableData = JSON.parse(tableData);

        // Check if the specific data object exists
        var newData = tableData.filter(function(rowData) {
            return !(
                rowData.firstName === "First name" &&
                rowData.lastName === "Last name" &&
                rowData.email === "Email" &&
                rowData.numbers === "Numbers" &&
                rowData.subject === "Subject"
            );
        });

        // Save the updated array back to local storage
        localStorage.setItem("tableData", JSON.stringify(newData));
    }
}

// Call the function to remove specific data from local storage
removeSpecificDataFromLocalStorage();


// Call the function to save table data when the form is submitted
function submitForm() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    var number3 = document.getElementById("number3").value;
    var subject = document.getElementById("subject").value;

    if (fname === '' || lname === '' || email === '' || number1 === '' || number2 === '' || number3 === '' || subject === '') {
        alert('Please fill in all necessary fields.');
        return false;
    }

    alert("Form submitted!\nFirst name:   " + fname + "\nLast name:     " + lname + "\nE-mail:           " + email + "\nNumber:       " + number1 + " " + number2 + " " + number3 + "\nSubject:         " + subject);

    if (editingRow) {
        editingRow.cells[0].textContent = fname;
        editingRow.cells[1].textContent = lname;
        editingRow.cells[2].textContent = email;
        editingRow.cells[3].textContent = number1 + " " + number2 + " " + number3;
        editingRow.cells[4].textContent = subject;
        editingRow = null;
    } else {
        addToTable(fname, lname, email, number1 + " " + number2 + " " + number3, subject);
    }

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("number3").value = "";
    document.getElementById("subject").value = "";

    saveTableDataToLocalStorage(); // Save table data after form submission
}

function addToTable(fname, lname, email, numbers, subject) {
    var table = document.getElementById("dataTable");
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = fname;
    cell2.innerHTML = lname;
    cell3.innerHTML = email;
    cell4.innerHTML = numbers;
    cell5.innerHTML = subject;
    
      // Create a div container for the buttons
      var buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
  

    // Add edit button with icon to the new row
    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa fa-edit"></i>'; // Font Awesome edit icon
    editButton.className = "edit-button";
    editButton.classList.add("edit-icon"); // Added class for styling
    editButton.onclick = function() {
        editingRow = newRow;
        editRow(newRow);
    };

    buttonContainer.appendChild(editButton);


    // Add delete button with icon to the new row
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; // Font Awesome trash icon
    deleteButton.className = "delete-button";
    deleteButton.classList.add("delete-icon"); // Added class for styling
    deleteButton.onclick = function() {
        deleteRow(newRow);
    };

    buttonContainer.appendChild(deleteButton);

    // Append the button container to cell6
    cell6.appendChild(buttonContainer);

    showTotalRows();
}

function editRow(row) {
  var cells = row.getElementsByTagName("td");
  document.getElementById("fname").value = cells[0].innerHTML;
  document.getElementById("lname").value = cells[1].innerHTML;
  document.getElementById("email").value = cells[2].innerHTML;
  var numbers = cells[3].innerHTML.split(" ");
  document.getElementById("number1").value = numbers[0];
  document.getElementById("number2").value = numbers[1];
  document.getElementById("number3").value = numbers[2];
  document.getElementById("subject").value = cells[4].innerHTML;

}



function deleteRow(row) {
    var modal = document.getElementById("id01");
    modal.style.display = "block";

    var cancelButton = modal.querySelector(".cancelbtn");
    var deleteButton = modal.querySelector(".deletebtn");

    // Event listener for cancel button
    cancelButton.onclick = function() {
        modal.style.display = "none";
    };

    // Event listener for delete button
    deleteButton.onclick = function() {
        row.parentNode.removeChild(row);
        modal.style.display = "none";
        updateLocalStorage();
        showTotalRows();
    };
}





function updateLocalStorage() {
    var tableData = [];
    var tableRows = document.querySelectorAll("#dataTable tbody tr");

    tableRows.forEach(function(row) {
        var rowData = {
            firstName: row.cells[0].textContent,
            lastName: row.cells[1].textContent,
            email: row.cells[2].textContent,
            numbers: row.cells[3].textContent,
            subject: row.cells[4].textContent
        };

        tableData.push(rowData);
    });

    // Update localStorage with the remaining data
    localStorage.setItem("tableData", JSON.stringify(tableData));
}
// serach field
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        var found = false; 
        for (var j = 0; j < 5; j++) { 
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true; 
                }
            }
        }
        
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
function openNav() {
    document.getElementById("mysidebar").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mysidebar").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
  }


  


  

 // Define global variables for pagination
var currentPage = 1;
var rowsPerPage = 5;

// Function to display the rows for the current page
function displayRows() {
    var tableRows = document.querySelectorAll(" tbody tr");
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    // Loop through all rows and show/hide based on pagination
    tableRows.forEach(function(row, index) {
        if (index >= startIndex && index < endIndex) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}

// Function to handle pagination buttons
function setupPagination() {
    var tableRows = document.querySelectorAll("#dataTable tbody tr");
    var totalPages = Math.ceil(tableRows.length / rowsPerPage);

    if (totalPages > 1) {
        document.querySelector(".pagination").style.display = "visible";
    } else {
        document.querySelector(".pagination").style.display = "none";
    }

    var prevButton = document.getElementById("prev");
    var nextButton = document.getElementById("next");
    var pageLinks = document.querySelectorAll(".page-link");

    // Previous button functionality
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayRows();
        }
    });

    // Next button functionality
    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows();
        }
    });

    // Page links functionality
    pageLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            currentPage = parseInt(this.getAttribute("data-page"));
            displayRows();
        });
    });
}

// Call setupPagination() when the page loads
window.onload = function() {
    loadTableDataFromLocalStorage();
    displayRows();
    setupPagination();
};
  


function showTotalRows() {
    var totalRows = document.querySelectorAll("#dataTable tbody tr").length-1;
    document.getElementById("totalRows").textContent = "Total Rows: " + totalRows;
}