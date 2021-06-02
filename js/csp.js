import { cities, connections } from "./nodes.js";

let citiesCopy = [];
const getSumOfAllPaths = _ => {
    let total = 0;
    connections.forEach(connection => {
        total += connection.distance;
    });

    return total;
}

export function findCSPSearchPath(from, to){
    // static variable totalPaths attached to this function
    if(typeof findCSPSearchPath.totalPaths == 'undefined')
        findCSPSearchPath.totalPaths = getSumOfAllPaths();

    let isSameFrom = (findCSPSearchPath.from !== undefined && from.name === findCSPSearchPath.from.name);
    let isSameTo = (findCSPSearchPath.from !== undefined && to.name === findCSPSearchPath.to.name);
    if(!isSameFrom || !isSameTo)
        findCSPSearchPath.totalPaths = getSumOfAllPaths();

    citiesCopy = JSON.parse(JSON.stringify(cities)); //
    citiesCopy = toDictionary(citiesCopy, 'name');
    to = citiesCopy[to.name];
    from = citiesCopy[from.name];

    let problem = {}, solution = {};
    solution.distanceTraveled = 0;
    solution.path = [];
    solution.getLast = _ => solution.path[solution.path.length-1];
    solution.isSolved = _ => solution.getLast().name === solution.goal.name;
    solution.goal = to;

    problem.init = citiesCopy[from.name];
    problem.goal = to;
    problem.domain = connections;
    problem.heuristics = {
        lessThanTotal : function(solution) { return solution.distanceTraveled < findCSPSearchPath.totalPaths},
        notPreviouslySelected : function(solution) {
            let last = solution.getLast();
            return last.checked === undefined || last.checked === false;
        }
    };

    solution.path.push(from);
    solution.getLast().checked = true;

    let timeBegin = performance.now();
    // if solved:
    if(backtrack(problem, solution) === true) {
        removePrevPath();
        displayFinalPath(solution.path);
        // Saving best
        findCSPSearchPath.totalPaths = solution.distanceTraveled;
        let timeFinal = performance.now();
        displayTotalAlgorithmExec((timeFinal-timeBegin).toFixed(3), solution.distanceTraveled)
    }

    // Saving previous
    findCSPSearchPath.to = to;
    findCSPSearchPath.from = from;

    return solution;
}

// backtracking
function backtrack(problem, solution) {
    if(solution.isSolved())
        return true;

    let current = solution.getLast();
    for(let i=0; i<problem.domain.length; i++) {
        let connection = problem.domain[i];
        if(connection.from === current.name) {
            let connectionTo = citiesCopy[connection.to];
            solution.path.push(connectionTo);
            solution.distanceTraveled += connection.distance;
            // Heuristics evaluation
            if (problem.heuristics.lessThanTotal(solution) && problem.heuristics.notPreviouslySelected(solution) ) {
                connectionTo.checked = true;
                if (solution.isSolved()) return true;
                else if(backtrack(problem, solution)) return true;
            }
            solution.path.pop(); // prune
            solution.distanceTraveled -= connection.distance;
        }
    }

    return false;
}

function toDictionary(array, keyProp){
    let dict = {};

    array.forEach(item => {
      let key = item[keyProp];
      dict[key] = item;
    })

    return dict;
}

function displayFinalPath(path){
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


function removePrevPath(){
    let header = document.getElementById("final-path");
    header.textContent = ''
}
