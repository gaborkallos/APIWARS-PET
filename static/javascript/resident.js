function reply_click(clickedID) {
    let residents = clickedID.split(",");
    for (let i = 0; i < residents.length; i++) {
        getResident(residents[i]);
    }
}

function getResident(residents) {
    $.getJSON(residents, function (response) {
        let resident = response;
        let allResident = document.getElementById('residentmodal');
        let newResident = document.getElementById('residentmodal').innerHTML;
        newResident = newResident.replace('@Name@', resident['name']);
        allResident.closest('.modal-table').innerHTML += newResident;
    });
}

let closeModal = document.getElementById("modalclose");
closeModal.addEventListener('click', function () {

    var countPlanets = document.getElementById("planet-table").childElementCount;

    console.log(countPlanets);

    let modalList = document.getElementsByTagName('tbody')[countPlanets];
    console.log(modalList);

    modalList.innerHTML = "";

});



