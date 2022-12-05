/*
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
    const responseJson = await fetch(baseURL + 'api/locations',
        {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        },
    });
    const response = await responseJson.json();
    if (responseJson.ok) {

        const table = $("#locations-table tbody");
        for (const station of response) {
            const newStationTr = document.createElement("tr");
            createElementFromAttribute(station.id, newStationTr);
            createElementFromAttribute(station.name, newStationTr);
            createElementFromAttribute(station.plugType, newStationTr);
            createElementFromAttribute(station.power, newStationTr);
            createPushPin(station.name, station.lng,station.lat)
            createButtons(newStationTr, station);
            table.append(newStationTr).innerHTML;
        }
    } else
        console.log("An error has occured", response);
    }
})*/

let map;
function createPushPin(name,lng,lat,content){
    const position={lng:lng, lat:lat};
    const infowindow = new google.maps.InfoWindow({
        content: content,
    });
    const marker = new google.maps.Marker({
        position: position,
        map,
        title:name,
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
}
function initMap() {
    const center = {lng: 23.82568, lat: 44.29849};
     map = new google.maps.Map(document.getElementById("map"),
        {zoom: 10, center: center,});
}
window.initMap = initMap;