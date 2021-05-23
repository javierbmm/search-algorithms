import * as data from './nodes.js'
import { findASearchPath } from './a_search.js'

loadCities();
addActiveClass();

function loadCities() {
    //Setting the city buttons to be able to choose
    //the starting point and the destination
    for(let i=0; i< data.cities.length; i++)
    {
        let city = data.cities[i];
        let cityButton = document.createElement("button");
        let cityButtonText;
        cityButton.value = city.name;
        cityButton.name = city.name;
        if(i==0) {
            cityButton.className = "city-btn city-btn-active";
        }else{
            cityButton.className = "city-btn";
        }
        cityButtonText = document.createTextNode(city.name);
        cityButton.appendChild(cityButtonText)
        document.getElementById("from-city").appendChild(cityButton);

        let cityButton2 = document.createElement("button");
        let cityButtonText2;
        cityButton2.value = city.name;
        cityButton2.name = city.name;
        if(i==0) {
            cityButton2.className = "city-btn city-btn-active";
        }else{
            cityButton2.className = "city-btn";
        }
        cityButtonText2 = document.createTextNode(city.name);
        cityButton2.appendChild(cityButtonText2)

        document.getElementById("to-city").appendChild(cityButton2);
    }
}

function addActiveClass(){
    let header = document.getElementById("from-city");
    let buttons = header.getElementsByClassName("city-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            let current = header.getElementsByClassName("city-btn-active");
            current[0].className = current[0].className.replace(" city-btn-active", "");
            this.className += " city-btn-active";
        });
    }

    let header2 = document.getElementById("to-city");
    let buttons2 = header2.getElementsByClassName("city-btn");
    for (let i = 0; i < buttons2.length; i++) {
        buttons2[i].addEventListener("click", function() {
            let current2 = header2.getElementsByClassName("city-btn-active");
            current2[0].className = current2[0].className.replace(" city-btn-active", "");
            this.className += " city-btn-active";
        });
    }

    //Setting the search-btn event listener
    document.getElementById("search-btn").addEventListener("click", findPath);
}

function findPath(){
    //Firstly check if the cities are the same
    let fromCityHeader = document.getElementById("from-city");
    let fromCity = fromCityHeader.getElementsByClassName("city-btn city-btn-active")[0];
    let toCityHeader = document.getElementById("to-city");
    let toCity = toCityHeader.getElementsByClassName("city-btn city-btn-active")[0];

    if(fromCity.value === toCity.value){
        alert("Cannot calculate the route to the same city");
    }else {
        //Find the json objects of toCity and fromCity in the cities array
        data.cities.forEach(city => {
            if(city.name == fromCity.value){
                fromCity = city;
            }else if(city.name == toCity.value){
                toCity = city;
            }
        })

        let header = document.getElementById("algorithm-options");
        let algorithms = header.getElementsByClassName("algorithm-btn");

        for (let i = 0; i < algorithms.length; i++) {
            if (algorithms[i].id == "a_search") {
                findASearchPath(fromCity, toCity);
            }
        }
    }
}

