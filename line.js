function loadLine(){
    // Plotly.newPlot({

    // })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var lineParams = getLineParams(this.response);
            Plotly.plot('line', lineParams.data, lineParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}


function setupLineData(arr){
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
        locations: stateArr,
        text: textArr
    }
    retVal.push(data);
    return retVal;
}


function getLineParams(str){
    var arr = JSON.parse(str);

    var data = setupLineData(arr);
    var layout = setupLineLayout(arr);
    var retVal = {data, layout}
    return retVal;
}