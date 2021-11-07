export function loadMap(states) {
    var xhttp = new XMLHttpRequest();
    var mapData = []
    // for (const state of states) {
    //     // console.log(state);
    //     var url = "/covid/" + state[1];
    //     xhttp.open("GET", url);
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             var stateData = getStateData(this.response);
    //             mapData.push([state[0], stateData]);
    //             console.log(mapData);
    //         }
    //     }
    //     xhttp.send();
    //     // xhttp.onreadystatechange = function () {
    //     //     if (this.readyState === 4 && this.status === 200) {
    //     //         var stateData = getStateData(this.response);
    //     //         mapData.push([state[0], stateData]);
    //     //     }
    //     // };
    //     // xhttp.open("GET", "/covid/" + state[1]);
    //     // xhttp.send();
    // }

    var url   = "/covid/",
    proms = states.map(d => fetch(url+d[1]));
    // console.log(proms);
Promise.all(proms)
       .then(ps => Promise.all(ps.map(p => p.json()))) // p.json() also returns a promise
       .then(js => js.forEach((j,i) => (mapData.push([states[i][0],j['caseDensity']]), setupMap(mapData, states))))
       .then(console.log("setupdata"));

    // console.log(mapData);
    // var mapParams = getMapParams(this.response);
    // Plotly.newPlot('mapChart', mapParams.data, mapParams.layout);
}

function getValues(arr){
    var retVal = []
    for(const val in arr){
        retVal.push(arr[val][1])
    }
    return retVal
}

function getState(arr){
    var stat = []
    for(const val in arr){
        console.log(val);
        stat.push(arr[val][0])
    }
    return stat
}

function getPostal(arr){
    var post = []
    for(const val in arr){
        post.push(arr[val][1])
    }
    return post
}

function setupMapData(arr, states) {
    var stat = getState(states);
    var postal = getPostal(states);
    var nums = getValues(arr);
    // console.log(stat);
    // console.log(nums);
    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        text: stat,
        locations: postal,
        z: nums,
        autocolorscale: true
    }];
    // retVal.push(data);
    return data;
}

function setupMapLayout() {

    var layout = {
        title: 'Covid Cases',
            geo:{
                scope: 'usa',
                countrycolor: 'rgb(255, 255, 255)',
                showland: true,
                landcolor: 'rgb(217, 217, 217)',
                showlakes: true,
                lakecolor: 'rgb(255, 255, 255)',
                subunitcolor: 'rgb(255, 255, 255)',
                lonaxis: {},
                lataxis: {}
            }
        };
    return layout;
}


function setupMap(arr, states) {
    // var arr = JSON.parse(str);
    // console.log(arr);
    var data = setupMapData(arr,states);
    var layout = setupMapLayout();
    Plotly.newPlot('mapChart', data, layout);
    Plotly.update('mapChart', data, layout);
    // console.log(data);
    // return retVal;
}