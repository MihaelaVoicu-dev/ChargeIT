function createElementFromAttribute(attribute, parent) {
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p>${attribute}</p>`;
    parent.appendChild(openCell);
}

function createButtons(parent, data) {
    const buttonsTd = document.createElement("td");
    buttonsTd.innerHTML = `<button type="button" class="btn btn-primary btn-big" onclick="showDialog(${data.id})" >Book now!</button>`;
    parent.appendChild(buttonsTd);
    const buttonsDel = document.createElement("td");
    buttonsDel.innerHTML = `<button type="button" class="btn btn-prymary btn-big" onclick="deleteMethod(${data.id})" >Delete station!</button>`;
    parent.appendChild(buttonsDel);
    const buttonsUp = document.createElement("td");
    buttonsUp.innerHTML = `<button type="button" class="btn btn-prymary btn-big" onclick="showDialogUpdate(${data.id})" >Update station!</button>`;
    parent.appendChild(buttonsUp);
}

const baseURL = 'http://localhost:8090/';
$(document).ready(async function () {
    const responseJson = await fetch(baseURL + 'api/stations', {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        },
    });
    const response = await responseJson.json();
    if (responseJson.ok) {

        const table = $("#stations-table tbody");
        for (const station of response) {
            const newStationTr = document.createElement("tr");
            createElementFromAttribute(station.id, newStationTr);
            createElementFromAttribute(station.name, newStationTr);
            createElementFromAttribute(station.open, newStationTr);
            createElementFromAttribute(station.location.city, newStationTr);
            createElementFromAttribute(station.stationType.plugType, newStationTr);
            createButtons(newStationTr, station);
            createPushPin(station.name, station.location.longitude,station.location.latitude,`<div>${station.name}</div>`);
            table.append(newStationTr).innerHTML;
        }
    } else {
        console.log("An error has occured", response);
    }
})

async function saveBooking() {

    const data = {
        name: $('#name').val(),
        startDateTime: $('#start_date_time').val(),
        duration: $('#duration').val(),
        license: $('#car_License').val(),
        stationId: $('#bookingStationIdDialog').val()
    };
    console.log(data);
    const responseJson = await fetch(baseURL + 'api/bookings', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    });
    const response = await responseJson.json();
    console.log(response);
    if (responseJson.ok) {
    } else {
        alert("That s not ok! The station is not available at this moment");
    }
}

async function showDialog(stationId) {

    const responseJson = await fetch(
        baseURL + 'api/stations/find/' + stationId,
        {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await responseJson.json();
    if (response.open == false) {
        alert("You can not programming a charge at this station,because it is closed.Try another one!");
    } else {

        $("#bookingStationIdDialog").val(stationId);
        // $("#locationDialog").val(location);
        const myModalEl = document.getElementById('createBookingDialog');
        const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
        modal.show();
    }
}

function deleteMethod(id) {
    const responseJson = fetch(baseURL + 'api/stations' + "/" + id, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json'
        }
    });
    refreshPage();
}

function refreshPage() {
    window.location.reload();
}

async function updateStation() {
    const data = {
        id: $('#bookingStationIdDialogUpdate').val(),
        name: $('#nameUpdated').val(),
        locationId: $('#location').val(),
        stationTypeId: $('#stationType').val(),
        open: $('#open').val()
    };
    console.log(data);
    data.open = $('#open').prop('checked');
    console.log(data);
    const responseJson = await fetch(baseURL + 'api/stations/' + data.id, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    });

    refreshPage();
}

async function getLocations() {
    const responseJson = await fetch(baseURL + 'api/locations', {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        },
    });
    let elementsArray = [];
    elementsArray = await responseJson.json();
    var select = document.getElementById("location");
    for (var i = 0; i < elementsArray.length; i++) {
        var option = document.createElement("option"),
            txt = document.createTextNode(elementsArray[i].city + " ," + elementsArray[i].longitude + "," + elementsArray[i].latitude);
        option.appendChild(txt);
        option.setAttribute("value", elementsArray[i].id);
        select.insertBefore(option, select.lastChild);

    }
}

async function getStationType() {
    const responseJson = await fetch(baseURL + 'api/stationTypes', {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        },
    });
    let elementsArray = [];
    elementsArray = await responseJson.json();
    var select = document.getElementById("stationTypes");
    for (var i = 0; i < elementsArray.length; i++) {
        var option = document.createElement("option"),
            txt = document.createTextNode(elementsArray[i].name + " ," + elementsArray[i].plugType + "," + elementsArray[i].power);
        option.appendChild(txt);
        option.setAttribute("value", elementsArray[i].id);
        select.insertBefore(option, select.lastChild);

    }
}

async function showDialogUpdate(id) {
    const responseJson = await fetch(baseURL + 'api/stations/find/' + id, {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        }
    });
    const station = await responseJson.json();
    $("#bookingStationIdDialogUpdate").val(station.id);
    $("#nameUpdated").val(station.name);
    $("#open").val(station.open);
    const responseJsonLocation = await fetch(baseURL + 'api/locations/find/' + station.locationId, {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        }
    });
    const location = await responseJsonLocation.json();
    $("#location").val(location.id);
    const responseJsonStationTypes = await fetch(baseURL + 'api/stationTypes/find/' + station.stationTypeId, {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        }
    });
    const stationTypes = responseJsonStationTypes.json();
    $("#stationType").val(station.stationTypeId);
    const myModalEl = document.getElementById('createUpdateDialog');
    const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();
}


th = document.getElementsByTagName('th');

for (let c = 0; c < th.length; c++) {

    th[c].addEventListener('click', item(c))
    th[c].addEventListener('dblclick', itemInv(c))
}

function item(c) {

    return function () {
        console.log(c)
        sortTable(c)
    }

    function sortTable(c) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("stations-table");
        switching = true;

        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[c];
                y = rows[i + 1].getElementsByTagName("td")[c];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}
async function searchStation(){
    const name_field = $(search).val();
    const responseJson = await fetch(
        baseURL + "/api/stations/name/"+ name_field,
        {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });
    const response = await responseJson.json();
    console.log(response);
    if(responseJson.ok){
        console.log(response);
        const table = $("#stations-table tbody");
        console.log(table);
      //  $("#stations-table").find("tr:gt(0)").remove();
        table.empty();
        for(const station of response){
            //table.
            const newStationTr = document.createElement("tr");
            createElementFromAttribute(station.id, newStationTr);
            createElementFromAttribute(station.name, newStationTr);
            createElementFromAttribute(station.location.city,newStationTr);
            createElementFromAttribute(station.open,newStationTr);
            createElementFromAttribute(station.stationType.plugType,newStationTr);
            createButtons(newStationTr,station);
            table.append(newStationTr);
        }
    }
    else{
        console.log("An error has occured", response);
    }
}

function itemInv(c) {

    return function () {
        console.log(c)
        sortTableInv(c)
    }

    function sortTableInv(c) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("stations-table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[c];
                y = rows[i + 1].getElementsByTagName("td")[c];
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}
