export function loadLine(){
    // Plotly.newPlot({

    // })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var lineParams = getLineParams(this.response);
            Plotly.newPlot('line', lineParams.data, lineParams.layout);
        }
    };
    xhttp.open("GET", "/covid/total");
    xhttp.send();
}

// function makeTrace(i) {
//     return {
//         y: Array.apply(null, Array(10)).map(() => Math.random()),
//         line: {
//             shape: 'spline' ,
//             color: 'red'
//         },
//         visible: i === 0,
//         name: 'Data set ' + i,
//     };
// }


function setupLineData(arr){
    var retVal = []
    var casesArr = []
    var vaccineArr = []
    // var deathArr = []
    for(var i in arr){
        vaccineArr.push(i["vaccination"]);
        casesArr.push(i["caseDensity"]);
    }

    data = [vaccineArr, casesArr]
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