//import * as data from "../resources/spain_routes.json"

let json = {};
const jsonFile = 'spain_routes.json';

const request = async () => {
    const response = await fetch(`./resources/${jsonFile}`);
    json = await response.json();
}

await request();
export const {cities, connections} = json;
