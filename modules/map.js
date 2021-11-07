export function loadMap(states) {
    var xhttp = new XMLHttpRequest();
    var mapData = []
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var mapParams = getMapParams(this.response, states);
            Plotly.newPlot('mapChart', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/covid/states");
    xhttp.send();
}


function getState(arr){
    var stat = []
    for(const val in arr){
        stat.push(arr[val][0])
    }
    return stat
}

function setupMapData(arr,states) {
    var stateArr = getState(states)
    var postArr = []
    var valsArr = []
    for(const val of arr) {
        postArr.push(val["state"]);
        valsArr.push(val["caseDensity"]);
    }

    // console.log(stateArr);

    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: postArr,
        z: valsArr,
        hovertemplate: '%{locations}: %{z}',
        colorscale: [
            [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
            [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
            [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],     
        autocolorscale: false
    }];
    return data;
}


function setupMapLayout() {

    var layout = {
        title: 'Current Covid Cases',
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
            },
        hovermode: 'closest'
        };
    return layout;
}


function getMapParams(str, states) {
    var arr = JSON.parse(str);
    var data = setupMapData(arr,states);
    var layout = setupMapLayout();
    var retVal = {data,layout};
    return retVal;
}
