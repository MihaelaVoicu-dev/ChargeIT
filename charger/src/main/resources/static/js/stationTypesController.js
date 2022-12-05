function createElementFromAttribute(attribute, parent) {
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p>${attribute}</p>`;
    parent.appendChild(openCell);
}

function createButtons(parent, data) {
    const buttonsDel = document.createElement("td");
    buttonsDel.innerHTML = `<button type="button" class="btn btn-prymary btn-big" onclick="deleteMethod(${data.id})" >Delete station types!</button>`;
    parent.appendChild(buttonsDel);
    const buttonsUp = document.createElement("td");
    buttonsUp.innerHTML = `<button type="button" class="btn btn-prymary btn-big" onclick="showDialog(${data.id})" >Update station types!</button>`;
    parent.appendChild(buttonsUp);
}

const baseURL = 'http://localhost:8090/';
$(document).ready(async function () {
    const responseJson = await fetch(baseURL + 'api/stationTypes',
        {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        });
    const response = await responseJson.json();
    if (responseJson.ok) {

        const table = $("#stationTypes-table tbody");
        for (const stationTypes of response) {
            const newStationTr = document.createElement("tr");
            createElementFromAttribute(stationTypes.id, newStationTr);
            createElementFromAttribute(stationTypes.name, newStationTr);
            createElementFromAttribute(stationTypes.plugType, newStationTr);
            createElementFromAttribute(stationTypes.power, newStationTr);
            createButtons(newStationTr, stationTypes);
            table.append(newStationTr).innerHTML;
        }
    } else {
        console.log("An error has occured", response);
    }
})
function deleteMethod(id){
    const responseJson = fetch(
        baseURL + 'api/stationTypes/'+id,
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
async function updateStationType(){
    const data = {
        id: $('#bookingIdDialogUpdate').val(),
        name: $('#name').val(),
        startDateTime: $('#plugType').val(),
        duration: $('#power').val(),
    };


    const responseJson = await fetch(
        baseURL + 'api/stationTypes/'+data.id,
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
async function showDialog(id) {

    const responseJson = await fetch(
        baseURL + 'api/stationTypes/find/' + id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
       const response=responseJson.json();
    console.log(response);
        $("#id").val(response.id);
        $("#name").val(response.name);
        $("#plugType").val(response.plugType);
        $("#power").val(response.power);
        const myModalEl = document.getElementById('createUpdateStationType');
        const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
        modal.show();

}