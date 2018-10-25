var pagenumber = 1;
let url = 'https://swapi.co/api/planets/?page=' + pagenumber.toString();
displayPlanets(url);


let next = document.getElementById('next');
next.addEventListener('click', function () {
    if (pagenumber < 7) {
        pagenumber += 1;
        tbodyList = document.getElementsByTagName("tbody");
        for (let i = 1; i < tbodyList.length; i++) {
            tbodyList[i].innerHTML = "";
        }
        let nextUrl = 'https://swapi.co/api/planets/?page=' + pagenumber.toString();
        displayPlanets(nextUrl);
    }
});

let previuos = document.getElementById('previuos');
previuos.addEventListener('click', function () {
    if (pagenumber > 1) {
        pagenumber -= 1;
        tbodyList = document.getElementsByTagName("tbody");
        for (let i = 1; i < tbodyList.length; i++) {
            tbodyList[i].innerHTML = "";
        }
        let nextUrl = 'https://swapi.co/api/planets/?page=' + pagenumber.toString();
        displayPlanets(nextUrl);
    }
});

function displayPlanets(apiUrl) {
    $.getJSON(apiUrl, function (response) {
        let results = response['results'];
        for (let i = 0; i < results.length; i++) {
            let planet = results[i];
            let allPlanet = document.getElementById('board');
            let newPlanet = document.getElementById('board').innerHTML;
            newPlanet = newPlanet.replace('name', planet['name']);
            newPlanet = newPlanet.replace('diameter', Intl.NumberFormat().format(planet['diameter']) + ' km');
            newPlanet = newPlanet.replace('climate', planet['climate']);
            newPlanet = newPlanet.replace('terrain', planet['terrain']);
            newPlanet = newPlanet.replace('residents', 'None');
            if (planet['population'] === 'unknown') {
                newPlanet = newPlanet.replace('population', planet['population'])
            } else {
                newPlanet = newPlanet.replace('population', Intl.NumberFormat().format(planet['population']) + ' people')
            }
            if (planet['surface_water'] === 'unknown') {
                newPlanet = newPlanet.replace('surface', planet['surface_water'])
            } else {
                newPlanet = newPlanet.replace('surface', planet['surface_water'] + '%')
            }
            allPlanet.closest('.table').innerHTML += newPlanet;
        }

    });
}

// let votebtn = document.getElementsByClassName('vote');
// votebtn.addEventListener('click', function(){
//     console.log('hello');
// });