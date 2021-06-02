import { cities, connections } from "./nodes.js";

let citiesCopy = [];
let path = [];
let totalDistance = 0;
/*
    fromCity and toCity are json city objects from the cities array
 */
export function findASearchPath(fromCity, toCity){
    path.splice(0, path.length);
    removePrevPath();

    // console.log("fromCity", fromCity)
    citiesCopy = JSON.parse(JSON.stringify(cities)); //
    console.log(citiesCopy);
    //From the starting point, calculate the total cost of the route for each child on the way
    //If the child was already checked, set the 'checked' attribute to true
    let timeBegin = performance.now()

    calculateHeuristicValueForEachCity(toCity);
    // console.log(citiesCopy)
    // console.log(cities)
    //Setting the checked value to true of the first from city, using the findCityInObj array
    findCityObjInTheArray(fromCity.name);
    // console.log("path", path);
    path.push(fromCity)

    let child = findBestChild(fromCity, toCity);
    path.push(child.city);
    // console.log(toCity.name)
    totalDistance = 0;
    while(child.city.name !== toCity.name){
        child = findBestChild(child.city, toCity);
        if(child != null) {
            // console.log("child: ", child)
            path.push(child.city);
            totalDistance += child.city.distance;
            // console.log("path: ", path);
        }else{
            break;
        }
    }

    let timeFinal = performance.now();

    //console.log("It took " + (timeFinal - timeBegin ) + " miliseconds");
    displayFinalPath();
    displayTotalAlgorithmExec((timeFinal-timeBegin).toFixed(3), totalDistance)
    console.log("Final path", path)
    console.log(totalDistance);
    // Emptying arrays:
    citiesCopy.splice(0, citiesCopy.length);
    // console.log("citiesCopy", citiesCopy)
}

/*
    Displaying the final path in html
 */
function displayFinalPath(){
    let header = document.getElementById("final-path");

    for(let i=0; i<path.length; i++){
        let city = path[i];
        let pathItem = document.createElement("p");
        let cityText = document.createTextNode(city.name);
        pathItem.appendChild(cityText)
        pathItem.title = city.name;
        header.appendChild(pathItem)
    }
}
/*
    Deleting the previous path from html
 */
function removePrevPath(){
    let header = document.getElementById("final-path");
    header.textContent = ''
}

/*
    Displaying total time of the algorithm execution
 */

function displayTotalAlgorithmExec(time, totalDistance){
    let header = document.getElementById("final-path");
    let execItem = document.createElement("p");
    let distItem = document.createElement("p");
    let text = document.createTextNode("The algorithm took " + time + " milliseconds to be executed");
    let text2 = document.createTextNode("Total distance = " + totalDistance + "m");
    execItem.appendChild(text);
    distItem.appendChild(text2);

    header.appendChild(execItem)
    header.appendChild(distItem)
}

/*
    This function assigns heuristic values for each city before finding the best path
 */
function calculateHeuristicValueForEachCity(toCity){
    citiesCopy.forEach(city => {
        city.heuristic = heuristicDistance(
            city.latitude,
            city.longitude,
            toCity.latitude,
            toCity.longitude
        )
    })
}

/*
    Finding the fastest path of the city children
*/
function findBestChild(city, toCity){
    let children = [];
    connections.forEach(connection => {
        if(connection.from == city.name){
            let cityObj = findCityObjInTheArray(connection.to)
            if(cityObj != null) {
                let child = {
                    "city": {...cityObj, "distance": connection.distance },
                    "cost": calculateTotalCost(cityObj.heuristic, connection.distance)
                }
                children.push(child);
            }
        }
    })
    //console.log(children)

    return children.length != 0 ? findMinCostChild(children, toCity) : null;
}

/*
    Finding the city in the array, this function is used to find children of the city
    It is also setting the checked value to true, so that we don't loop in the graph
 */
export function findCityObjInTheArray(cityName){
    let filteredCity = citiesCopy.filter(city => {
        if(!city.checked) {
            if (city.name == cityName) {
                city.checked = true;
                return city;
            }
        }
    });

    return filteredCity ? filteredCity[0] : null;
}

function calculateTotalCost(heuristic, distance){
    return heuristic != 0? heuristic + distance: 0;
}

function findMinCostChild(children, toCity){
    let min = children[0].cost;
    let child = children[0];

    for (let i = 1; i < children.length; i++) {
        if(children[i].cost < min){
            min = children[i].cost;
            child = children[i]
        }
    }
    return child;
}

function heuristicDistance(lat1, lon1, lat2, lon2){
    let R = 6371; // km
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

function toRad(Value) {
    return Value * Math.PI / 180;
}