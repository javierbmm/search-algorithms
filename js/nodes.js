//import * as data from "../resources/spain_routes.json"

let json = {};

const request = async () => {
    const response = await fetch('./resources/spain_routes.json');
    json = await response.json();
}

await request();
export const {cities, connections} = json;
