function Search() {
    var input, filter, table, tr, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    table = document.getElementById("monster-table");
    tr = table.getElementsByTagName('tr');

    // Loop through monster list, hide non matches
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


let monsterData = []; 

async function loadMonsterList() {
    try {
        const response = await fetch('/Encounter/GetMonsterList');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        monsterData = await response.json();
        loadMonsterPage(currentPage); 
    } catch (error) {
        console.error(error);
    }
}


const monstersPerPage = 10; 
let currentPage = 1;

$(document).ready(function () {
    
    loadMonsterPage(currentPage);

    
    $('#prev-page').click(function () {
        if (currentPage > 1) {
            currentPage--;
            loadMonsterPage(currentPage);
        }
    });

    
    $('#next-page').click(function () {
        if (currentPage < Math.ceil(monsterData.length / monstersPerPage)) {
            currentPage++;
            loadMonsterPage(currentPage);
        }
    });

    
    $('#pagination-list').on('click', 'li', function () {
        currentPage = parseInt($(this).text());
        loadMonsterPage(currentPage);
    });
});

function loadMonsterPage(page, filters = []) {
    const startIndex = (page - 1) * monstersPerPage;
    const endIndex = startIndex + monstersPerPage;

    const filteredMonsters = applyFilters(monsterData, filters);


    const monstersOnPage = filteredMonsters.slice(startIndex, endIndex);
    

    const table = document.getElementById("monster-list-body");
    table.innerHTML = ''; 

    for (const i of monstersOnPage) {
        var row = document.createElement('tr');
        row.innerHTML = `<th scope='row'> <a class="add-monster" onclick="AddMonsterToEncounter('${i.name}')">Add</a> </th><td>${i.name}</td><td>${i.cr}</td><td>${i.type}</td>`

      
        
        table.appendChild(row);
    }

    updatePaginationButtons(page);
}

function applyFilters(data, filters) {
    if (filters.length === 0) {
        return data; 
    }

    return data.filter(monster => {
        return filters.includes(monster.size); 
    });
}

function updatePaginationButtons(currentPage) {
    const totalPages = Math.ceil(monsterData.length / monstersPerPage);
    const paginationList = $('#pagination-list');
    paginationList.empty();

    const maxPagesToShow = 5; 

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            addPageNumber(paginationList, currentPage, i);
        }
    } else {
        let startPage, endPage;

        if (currentPage <= maxPagesToShow - 2) {
            startPage = 1;
            endPage = maxPagesToShow - 1;
        } else if (currentPage >= totalPages - maxPagesToShow + 2) {
            startPage = totalPages - maxPagesToShow + 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        addPageNumber(paginationList, currentPage, 1);

        if (startPage > 2) {
            paginationList.append('<li>...</li>');
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) {
                addPageNumber(paginationList, currentPage, i);
            }
        }

        if (endPage < totalPages - 1) {
            paginationList.append('<li>...</li>');
        }

        addPageNumber(paginationList, currentPage, totalPages);
    }

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


function AddMonsterToEncounter(monsterToAdd) {
    console.log(monsterToAdd);
    let monster = monsterData.find(m => m.name == monsterToAdd);
    monster = capitalizeKeys(m);
    console.log(m);
    let monsterList = document.getElementsByClassName("monster-list");
    
    let monsterRow = `<div class="monster">
                                <div class="monster-details">
                                    <h6 class="monster-name">${monster.name}</h6>
                                    <p class="monster-type">${monster.size} ${monster.name}</p>
                                </div>
                                <div class="monster-info">
                                    <p class="monster-cr-exp">CR: <span id="monster-cr">${monster.cr}</span> | Exp: <span id="monster-exp">100</span></p>
                                    <div class="monster-quantity">
                                        <button class="quantity-increase">+</button>
                                        <input type="number" class="quantity-input" value="1" >
                                        <button class="quantity-decrease">-</button>
                                    </div>
                                </div>
                            </div>`

    monsterList.innerHTML += monsterRow;

    //$.ajax({
    //    url: '/Encounter/AddMonster', 
    //    type: 'POST',
    //    contentType: 'application/json',
    //    data: JSON.stringify({ monster: m }),
    //    success: function (result) {
            
    //    },
    //    error: function (error) {
            
    //    }
    //});


}


function capitalizeKeys(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        acc[capitalizedKey] = obj[key];
        return acc;
    }, {});
}