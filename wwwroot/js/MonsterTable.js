function Search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    table = document.getElementById("monster-table");
    tr = table.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


let monsterData = []; // Variable to store monster data

async function loadMonsterList() {
    try {
        const response = await fetch('/Encounter/GetMonsterList');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        monsterData = await response.json();
        loadMonsterPage(currentPage); // Load monsters for the initial page
    } catch (error) {
        console.error(error);
    }
}


function displayMonsterList(monsters) {
    const tableRow = document.getElementById("monster-list-body");

    for (const i of monsters) {
        var row = document.createElement('tr');
        row.innerHTML = `<th scope='row'> <a>Add</a> </th><td>${i.name}</td><td>${i.cr}</td><td>${i.type}</td>`

        tableRow.appendChild(row);
    }
}




// JavaScript code for pagination
const monstersPerPage = 10; // Number of monsters per page
let currentPage = 1; // Current page

$(document).ready(function () {
    // Load and display monsters for the initial page
    loadMonsterPage(currentPage);

    // Handle previous page button click
    $('#prev-page').click(function () {
        if (currentPage > 1) {
            currentPage--;
            loadMonsterPage(currentPage);
        }
    });

    // Handle next page button click
    $('#next-page').click(function () {
        if (currentPage < Math.ceil(monsterData.length / monstersPerPage)) {
            currentPage++;
            loadMonsterPage(currentPage);
        }
    });

    // Handle page number click
    $('#pagination-list').on('click', 'li', function () {
        currentPage = parseInt($(this).text());
        loadMonsterPage(currentPage);
    });
});

function loadMonsterPage(page) {
    // Calculate the start and end index for monsters on the current page
    const startIndex = (page - 1) * monstersPerPage;
    const endIndex = startIndex + monstersPerPage;

    // Display monsters on the current page
    const monstersOnPage = monsterData.slice(startIndex, endIndex);
    displayMonsterList(monstersOnPage);

    // Clear the existing content of the monster list
    const tableRow = document.getElementById("monster-list-body");
    tableRow.innerHTML = ''; // Clear the content

    // Append the new monsters to the list
    for (const i of monstersOnPage) {
        var row = document.createElement('tr');
        row.innerHTML = `<th scope='row'> <a>Add</a> </th><td>${i.name}</td><td>${i.cr}</td><td>${i.type}</td>`;
        tableRow.appendChild(row);
    }

    // Update pagination buttons and highlight the current page number
    updatePaginationButtons(page);
}



function updatePaginationButtons(currentPage) {
    const totalPages = Math.ceil(monsterData.length / monstersPerPage);
    const paginationList = $('#pagination-list');
    paginationList.empty();

    const maxPagesToShow = 5; // Maximum number of page numbers to display

    if (totalPages <= maxPagesToShow) {
        // Display all page numbers if there are fewer than or equal to maxPagesToShow
        for (let i = 1; i <= totalPages; i++) {
            addPageNumber(paginationList, currentPage, i);
        }
    } else {
        // Determine the range of page numbers to display
        let startPage, endPage;

        if (currentPage <= maxPagesToShow - 2) {
            // When you are on the first few pages
            startPage = 1;
            endPage = maxPagesToShow - 1;
        } else if (currentPage >= totalPages - maxPagesToShow + 2) {
            // When you are on the last few pages
            startPage = totalPages - maxPagesToShow + 2;
            endPage = totalPages;
        } else {
            // When you are somewhere in the middle
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        // Always add the first page number
        addPageNumber(paginationList, currentPage, 1);

        if (startPage > 2) {
            // Add dots if not starting from the first page
            paginationList.append('<li>...</li>');
        }

        for (let i = startPage; i <= endPage; i++) {
            // Skip adding the first and last page numbers again
            if (i !== 1 && i !== totalPages) {
                addPageNumber(paginationList, currentPage, i);
            }
        }

        if (endPage < totalPages - 1) {
            // Add dots if not ending at the last page
            paginationList.append('<li>...</li>');
        }

        // Always add the last page number
        addPageNumber(paginationList, currentPage, totalPages);
    }

    // Disable/enable previous and next buttons based on the current page
    $('#prev-page').prop('disabled', currentPage === 1);
    $('#next-page').prop('disabled', currentPage === totalPages);
}


function addPageNumber(paginationList, currentPage, pageNumber) {
    const li = $('<li>');
    li.text(pageNumber);

    if (pageNumber === currentPage) {
        li.addClass('active');
    }

    paginationList.append(li);
}

