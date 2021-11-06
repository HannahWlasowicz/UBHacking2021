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
    var casesArr = []
    var vaccineArr = []
    var deathArr = []
    for(var i in arr){
        vaccineArr.push("test");
        casesArr.push("TX");
        deathArr.push("test");
    }

    data = [vaccineArr, casesArr,deathArr]
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