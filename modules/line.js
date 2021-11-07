export function loadLine() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var lineParams = getLineParams(this.response);
            Plotly.newPlot('lineChart', lineParams.data, lineParams.layout);
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


function setupLineData(arr) {
    var retVal = []
    var casesArr = []
    var vaccineArr = []
    var datesArr = []
    var prevVal = 0;
    for(const val of arr) {
        if(val["vaccination"] <=0){
            vaccineArr.push(prevVal);
        }
        else{
            vaccineArr.push(val["vaccination"]*100);
            prevVal = val["vaccination"]*100;
        }
        casesArr.push(val["caseDensity"]);
     
       
        datesArr.push(val["date"])
    }

    var d1 = {x: datesArr, y:vaccineArr,  mode: 'lines', hovertemplate:"Vaccination: %{y}, Date: %{x}", name: "Vaccine"};
    var d2 = {x: datesArr, y:casesArr,  mode: 'lines',hovertemplate:"COVID Cases: %{y}, Date: %{x}", name: "COVID-19 Cases"};
    var data = [d1, d2];
    retVal.push(data);
    return data;
}


function setupLineLayout() {
    var layout = {
        title: {
            text: 'COVID-19 Vaccination and Cases',
            font: {
                family: 'Courier New, monospace',
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: {
                text: 'Date',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
        },
        yaxis: {
            title: {
                text: 'Vaccination and COVID Cases',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        },
        hovermode: 'closest'
    };
    return layout
}

function getLineParams(str) {
    var arr = JSON.parse(str);
    var data = setupLineData(arr);
    var layout = setupLineLayout();
    var retVal = { data, layout }
    console.log(retVal);
    return retVal;
}