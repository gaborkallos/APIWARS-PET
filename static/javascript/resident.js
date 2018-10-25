function reply_click(clickedID) {
    let residents = clickedID.split(",");
    for (let i = 0; i < residents.length; i++) {
        getResidents(residents[i])
    }
    let tbodys = document.querySelectorAll(".modal-body tbody");
    for (let currentTbody of tbodys){
        console.log(currentTbody);
        currentTbady.remove();
    }
}


function getResidents(url) {
    $.getJSON(url, function (response) {
        let resident = response;
        let allResident = document.getElementById('modal-board');
        let newResident = document.getElementById('modal-board').innerHTML;
        newResident = newResident.replace('@name@', resident['name']);
        newResident = newResident.replace('@height@', resident['height']);
        newResident = newResident.replace('@mass@', resident['mass']);
        newResident = newResident.replace('@skin_color@', resident['skin_color']);
        newResident = newResident.replace('@hair_color@', resident['hair_color']);
        newResident = newResident.replace('@eye_color@', resident['eye_color'])
        newResident = newResident.replace('@birth_year@', resident['birth_year']);
        newResident = newResident.replace('@gender@', resident['gender']);
        allResident.closest('.table').innerHTML += newResident;
    })
}


