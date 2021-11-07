import {loadLine} from './line.js'
import {loadMap} from './map.js'

var states = [
    ['United States', 'USA'],
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
];
function loadData(){
    console.log("Loading");
    dropdown();
    loadLine();
    loadMap(states.slice(1));
}

 function dropdown() {
    document.getElementById("selection").style.height = "50px";
   
    console.log("test");
    var select = document.createElement('select');
    select.name = 'states';
    select.id = 'states'
 
    for (var val of states)
    {
        console.log(val);
        var option = document.createElement('option');
        option.value = states[1];
        option.text = states[0];
        select.appendChild(option);
    } 
    document.getElementById('selection').appendChild(select);
}

document.getElementById('body').onload = function() {loadData()};