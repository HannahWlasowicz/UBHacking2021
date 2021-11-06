import {loadLine} from './line.js'
import {loadMap} from './map.js'
function loadData(){
    console.log("Poggers");
    // loadMap();
    loadLine();
}
console.log("Tester");
document.getElementById("body").onload = function() {loadData()};
// loadData();
