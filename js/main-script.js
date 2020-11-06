// main js
// uwu
// code to pull xml data and put it into a table, add a seach function, and a sort function

// load xml file and send requests and stuff
function loadXML() {
    // make new http request, its a js thing
    var xmlhttp = new XMLHttpRequest();

    // GET, file location and name, and some other propertie i forget
    xmlhttp.open("GET", "https://the-repository.000webhostapp.com/entries.xml", true);
    xmlhttp.send();

    // when there is a change in the request's state, itll check all is green and run the table loading function
    xmlhttp.onreadystatechange = function(){
        // all green
        if (this.readyState == 4 && this.status == 200) {
            loadTable(this);
        }
        // cant find the xml
        if(this.status == 404) {
            console.log("couldn't find the xml file")
        }
    }
}

// function that loops through the data and spins it into the html. required the "this" from the request made above
function loadTable(xml) {
    var file = xml.responseXML; // js thingy, its todo with the request
    var table = document.getElementById("repo-table").innerHTML; // the varible that will hold the data with its needed html elements
    var pulledData = file.getElementsByTagName("resource"); // picks out just the resources aka "<resource>"

    // loops through all <resource>'s and addes them to the great table varible
    for (i = 0; i < pulledData.length; i++) {
        // addes the table row html tag, and table cell tag
        // the getElements then addes the each info bit to a coloum so to put it
        // lastly, there are a ending tags added
        table += "<tr><td><a href =\'" +
        pulledData[i].getElementsByTagName("link")[0].childNodes[0].nodeValue +
        "\'>"+
        pulledData[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
        "</a></td><td>" +
        pulledData[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
        "</td><td>" +
        pulledData[i].getElementsByTagName("catagory")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
    // sets the html inside the empty table we made to be the great table varible we just made
    document.getElementById("repo-table").innerHTML = table;
    // by default sort the table by catagory
    sortTable(2);
    sortTable(2);
}

// search function. the search bar searches through name and description
function search() {
    var filter = document.getElementById("searchBar").value.toUpperCase(); // input from search bar set to upper case so the serach is not case-senesative
    var table = document.getElementById("repo-table"); // pulls table from html table
    var tableRow = table.getElementsByTagName("tr"); // pulls all the tablerows

    // theses two varibles will hold the title/description of the row we're running through
    var title, description; 

    // will run throuhg all the rows
    for (i = 0; i < tableRow.length; i++) {
        title = tableRow[i].getElementsByTagName("td")[0].innerText; // pulls first entry (aka the title) of row "i"
        description = tableRow[i].getElementsByTagName("td")[1].innerText; // pulls second entry (aka description) of row "i"

        // checks if the title or description matches the filter (search bar input)
        if (title.toUpperCase().indexOf(filter) > -1 || description.toUpperCase().indexOf(filter) > -1) {
            // if it does, it'll just leave it alone
            tableRow[i].style.display = "";
        }
        else {
            // if it doesnt itll change its display style in css to "none", which basiclly just hides it
            tableRow[i].style.display = "none";
        }
    }
}

// sorting function. will sort either by the name or the catagory. there will be both ascending and descending sorting
// the fuction takes in a value (sortBy). this value index of the thing being sorted in a tablerow, so 0 is name, and 2 is catagory
function sortTable(sortBy) {
    var row = document.getElementById("repo-table").rows; // this pulls all the rows of the table we're sorting
    var rowNum; // well we're running through all the rows, this will hold the number of the row we want to switch
    var order = "asc"; // this hold whether we're sorting in an ascending(asc) or descending(desc) order, we'll set defualt to ascendign
    var switching = true; // this will tell the main while loop weather to keep running through the rows or not
    var shouldSwitch; // this var will hold whether or not a switch between two rows needs to be made in the table
    var switchCount = 0; // this shows the number of switchs made, starts with 0
    var currentRow; // will hold the plain data of the current row compared
    var nextRow; // wil hold the plain  data of the row next to the current one
            
    // since i have to sort the name by a different tag, i need to make a varible that changes based on whats being sorted
    var lookInto;
    if (sortBy == 0) {
        lookInto = "a";
    }
    else {
        lookInto = "td";
    }

    // the while loop will keep running through the rows and seeing if they need switching
    while (switching) {
        // set it that there is no switching done, this may be changed later
        switching = false;
        
        // loop through all the rows in the table (row.length - 1 is needed as if we're at the last row, there is no next row)
        for(rowNum = 0; rowNum < (row.length - 1); rowNum++) {
            // state that there is need for switching at the moment
            shouldSwitch = false;
            // compare the current and next row, and see if they are in the order you're sorting by. the "sortBy" pulls the coloum we're sorting by
            currentRow = row[rowNum].getElementsByTagName(lookInto)[sortBy];
            nextRow = row[rowNum + 1].getElementsByTagName(lookInto)[sortBy];
            // check if the rows compared need to switch places, based on the order (will first put both to upper case)
            if (order == "asc") {   
                if (currentRow.innerHTML.toUpperCase() > nextRow.innerHTML.toUpperCase()) {
                    // if this is true, mark it as a switch and break the loop to move to switching
                    shouldSwitch = true;
                    break;
                }
            }
            else if (order == "desc") {
                if (currentRow.innerHTML.toUpperCase() < nextRow.innerHTML.toUpperCase()) {
                    // if this is true, mark it as a switch and break the loop to move to switching
                    shouldSwitch = true;
                    break;
                }
            }
        }

        // if a switch has been marked, it will change the places of the rows 
        if (shouldSwitch) {
            row[rowNum].parentNode.insertBefore(row[rowNum + 1], row[rowNum]);
            // now mark that switching has been down and increase the switch count by 1
            switching = true;
            switchCount++;
        }
        // on the other hand, if no switching has been done, that meaning we're ordering in the wrong way, and we switch the order
        // this could be more efficient by having a global varible telling if it was asc or desc, but this is more reliable and less messy
        else {
            if (switchCount == 0 && order == "asc") {
                order = "desc";
                switching = true;
            }
        }
    }
}