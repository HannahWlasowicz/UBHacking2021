export function loadLine(){
    // Plotly.newPlot({

    // })
    console.log("Loading");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
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


function setupLineData(arr){
    var retVal = []
    var casesArr = []
    var vaccineArr = []
    // var deathArr = []
    for(var i in arr){
        if(i['vaccination'] != null){
            vaccineArr.push(i["vaccination"]*100);
        }
        if(i['caseDensity'] != null){
            casesArr.push(i["caseDensity"]*100);
        }        
    }

    var data = [vaccineArr, casesArr]
    retVal.push(data);
    console.log("Data");
    console.log(data);
    return retVal;
}


function setupLineLayout(){
    var layout = {
        title: {
          text:'COVID-19 Vaccination and Cases',
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
        }
      };
    return layout
}

function getLineParams(str){
    var arr = JSON.parse(str);
    console.log(arr);
    var data = setupLineData(arr);
    var layout = setupLineLayout();
    var retVal = {data, layout}
    console.log(retVal);
    return retVal;
}