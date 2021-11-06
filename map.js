function loadMap(){
    // Plotly.newPlot({

    // })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.newPlot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}


function setupMapData(arr){
    var retVal = []
    var textArr = []
    var stateArr = []
    for(var i in arr){
        textArr.push("test");
        stateArr.push("TX");
    }

    data = {
        type:'choropleth',
        locationmode: 'USA-states',
        text: textArr
    }
    retVal.push(data);
    return retVal;
}


function getMapParams(str){
    var arr = JSON.parse(str);

    var data = setupMapData(arr);
    var layout = setupMapLayout(arr);
    var retVal = {data, layout}
    return retVal;
}