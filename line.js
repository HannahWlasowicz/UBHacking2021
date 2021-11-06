function loadLine(){
    // Plotly.newPlot({

    // })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var lineParams = getLineParams(this.response);
            Plotly.newPlot('line', lineParams.data.map(makeTrace),{
                updatemenus: [{
                    y: 1,
                    yanchor: 'top',
                    buttons: [{
                        method: 'restyle',
                        args: ['visible', [true, false, false, false]],
                        label: 'NY'
                    }, {
                        method: 'restyle',
                        args: ['visible', [false, true, false, false]],
                        label: 'TX'
                    }, {
                        method: 'restyle',
                        args: ['visible', [false, false, true, false]],
                        label: 'Data set 2'
                    }, {
                        method: 'restyle',
                        args: ['visible', [false, false, false, true]],
                        label: 'Data set 3'
                    }]
                }],
            }, lineParams.layout);
        }
    };
    xhttp.open("GET", "/covid/total");
    xhttp.send();
}

function makeTrace(i) {
    return {
        y: Array.apply(null, Array(10)).map(() => Math.random()),
        line: {
            shape: 'spline' ,
            color: 'red'
        },
        visible: i === 0,
        name: 'Data set ' + i,
    };
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