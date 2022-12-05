function createElementFromAttribute(attribute, parent) {
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p>${attribute}</p>`;
    parent.appendChild(openCell);
}

function createButtons(parent, data) {
    const buttonsTd = document.createElement("td");
    const buttonsDel=document.createElement("td");
    buttonsDel.innerHTML=`<button type="button" class="btn btn-prymary btn-big" onclick="deleteMethod(${data.id})">Delete booking!</button>`;
    parent.appendChild(buttonsDel);
    const buttonsUp=document.createElement("td");
    buttonsUp.innerHTML=`<button type="button" class="btn btn-prymary btn-big" onclick="showDialogUpdate(${data.id})">Update booking!</button>`;
    parent.appendChild(buttonsUp);
}
const baseURL = 'http://localhost:8090/';
$(document).ready(async function(){
    const responseJson = await fetch(
        baseURL + 'api/bookings',
        {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });
    const response = await responseJson.json();
    if(responseJson.ok) {

        const table = $("#booking-table tbody");
        for (const booking of response) {
            const newBookingTr = document.createElement("tr");
            createElementFromAttribute(booking.id, newBookingTr);
            createElementFromAttribute(booking.carLicense, newBookingTr);
            createElementFromAttribute(booking.startDateTime, newBookingTr);
            createElementFromAttribute(booking.name, newBookingTr);
            createElementFromAttribute(booking.endDateTime, newBookingTr);
            createElementFromAttribute(booking.station.name, newBookingTr);
            createButtons(newBookingTr,booking);
            table.append(newBookingTr).innerHTML;
        }
    }
    else{
        console.log("An error has occured", response);
    }
})
async function updateBooking(){
    const data = {
        id: $('#bookingIdDialogUpdate').val(),
        name: $('#nameUpdated').val(),
        startDateTime: $('#startDateTime').val(),
        duration: $('#duration').val(),
        carLicense:$('#carLicense').val(),
        stationId: $('#station').val()
    };
    console.log(data.duration);
    const responseJsonForStation = await fetch(
        baseURL + 'api/stations/find/'+data.stationId,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });
    const station=await responseJsonForStation.json();
    data.stationId=station.id;
    console.log(data.duration);
    const responseJson = await fetch(
        baseURL + 'api/bookings/'+data.id,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });
    console.log(data);
    refreshPage();
}
async function getStation() {
    const responseJson=  await fetch(
        baseURL + 'api/stations',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    let elementsArray = [];
    elementsArray = await responseJson.json();
    console.log(elementsArray);
    var select = document.getElementById("station");
        for (var i = 0; i < elementsArray.length; i++) {
            var option = document.createElement("option"),
                txt = document.createTextNode(  elementsArray[i].name+ " " +elementsArray[i].location.city+",Longitude"+elementsArray[i].location.longitude+",Latitude"+elementsArray[i].location.latitude);
            option.appendChild(txt);
            option.setAttribute("value", elementsArray[i].id);
            select.insertBefore(option, select.lastChild);

        }
}
function deleteMethod(id){
    const responseJson = fetch(
        baseURL + 'api/bookings/'+id,
        {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });
    refreshPage();
}
function refreshPage() {
    window.location.reload();
}
async function showDialogUpdate(id) {
 responseJson = await fetch(
        baseURL + 'api/bookings/find/' +id,
        {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    const booking= await responseJson.json();
    $("#bookingIdDialogUpdate").val(booking.id);
    $("#nameUpdated").val(booking.name);
    $("#startDateTime").val(booking.startDateTime);
    $("#duration").val(booking.duration);
    $("#carLicense").val(booking.carLicense);
    const responseJsonSt = await fetch(
        baseURL + 'api/stations/find/' +booking.stationId,
        {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    const station= await responseJsonSt.json();
    $("#station").val(station.id);
    const myModalEl = document.getElementById('createUpdateDialog');
    const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

}

th = document.getElementsByTagName('th');

for(let c=0; c < th.length; c++){

    th[c].addEventListener('click',item(c))
    th[c].addEventListener('dblclick',itemInv(c))
}

function item(c){

    return function(){
        console.log(c)
        sortTable(c)
    }
    function sortTable(c) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("booking-table");
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
function itemInv(c){

    return function(){
        console.log(c)
        sortTableInv(c)
    }
    function sortTableInv(c) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("booking-table");
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
    }}
