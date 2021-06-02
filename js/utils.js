// Containers
const finalPath = document.getElementById("final-path");
const execTime = document.getElementById("exec-time");

/*
    Displaying the final path in html
 */
export function displayFinalPath(path){
    for(let i=0; i<path.length; i++){
        let city = path[i];
        let pathItem = document.createElement("p");
        let cityText = document.createTextNode(city.name);
        pathItem.appendChild(cityText)
        pathItem.title = city.name;
        finalPath.appendChild(pathItem)
    }
}
/*
    Deleting the previous path from html
 */
export function removePrevPath(){
    finalPath.textContent = ''
}

/*
    Deleting the previous execution time from html
 */
export function removeExecTime(){
    execTime.textContent = ''
}

/*
    Displaying total time of the algorithm execution
 */

export function displayTotalAlgorithmExec(time){
    let execItem = document.createElement("p");
    let text = document.createTextNode("The algorithm took " + time + " milliseconds to be executed");
    execItem.appendChild(text);

    execTime.appendChild(execItem)
}


/*
    Displaying total distance of the path
 */

export function displayTotaldistance(totalDistance){
    let distItem = document.createElement("p");
    let text = document.createTextNode("Total distance = " + totalDistance + "m");
    distItem.appendChild(text);

    finalPath.appendChild(distItem)
}