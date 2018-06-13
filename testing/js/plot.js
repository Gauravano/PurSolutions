//          Constants
var plotCanvas = document.getElementById("plot");
var ctx = plotCanvas.getContext("2d");

var slider_wrapper = document.getElementById("slider-wrapper");
var slider_input = document.getElementById("slider-input");
var slider_label = document.getElementById("slider-label");
var canvas_plot = document.getElementById("canvas_plot");

var formCanvas = document.getElementById("formula");
var kLabel = document.getElementById("k-label");
var LLabel = document.getElementById("L-label");
var x0Label = document.getElementById("x0-label");

// Minimum width for any given area
var minColumnWidth = 800; // if the columns's widths are under this value, switch to one column

// Plot constants
var lineWidth = 5;
var numOfPts = 100;
                  
// This is for 1.4, 2.0 and 5.0 mg/mL
con3Pts = [1.4, 2.0, 5];
conPt1X = [100, 10, 2];
conPt1Y = [0.15, 0.15, 0.15];
conPt2X = [100, 24, 8.5];
conPt2Y = [0.15, 0.582, 0.797];

resizeCanvas()
window.addEventListener('resize', resizeCanvas, false);

slider_input.oninput = function() {
  readSlider();
}

//          Functions
function resizeCanvas() {
    // This will dynamically allow us to scale our canvas
    var w = window.innerWidth;
    var h = window.innerHeight;

    if (w < minColumnWidth) {
        resizeOneColumn();
        columnWidth = w*0.95
    } else {
        resizeTwoColumn();
        columnWidth = w*0.47
    }
    
    // Size the canvas to be square and the formula image to fill out the page
    plotWidth = columnWidth*0.7
    plotCanvas.setAttribute("style","height:"+plotWidth+"px; width:"+plotWidth+"px; background: url(img/Axis.png); background-size: 100% 100%;");
    plotCanvas.width = plotWidth
    plotCanvas.height = plotWidth
    
    // Size the formula in correspondence 
    var formWidth = columnWidth*0.25
    var formHeight = formWidth*0.3
    formCanvas.setAttribute("style", "width:"+formWidth+"px; height:"+formHeight+"px; background: url(img/formula.png); background-size: 100% 100%;");

    // Values to dictate the size of the plot canvas and where to place the pixels
    //   Mins and maxs of the plot
    xMin = 0.0;
    yMin = 0.0;
    xMax = 30.0;
    yMax = 1.0;
    
    //   Mins and maxs of where the plot starts relative to the canvas
    cWMin = (50/440)*plotWidth;
    cHMin = (45/440)*plotWidth;
    cWMax = plotWidth;
    cHMax = plotWidth;
    readSlider();
}

function resizeOneColumn() {
    document.getElementById('left-column').setAttribute("style", "width: 100%");
    document.getElementById('right-column').setAttribute("style", "width: 100%");
}

function resizeTwoColumn() {
    document.getElementById('left-column').setAttribute("style", "width: 47%");
    document.getElementById('right-column').setAttribute("style", "width: 47%");
}

function readSlider() {
    // This is essentially the function that runs the whole deal
    var concentration = slider_input.value;
    slider_label.innerHTML=concentration+" mg/ml"

    var infPts = getInflectPts(concentration);
    
    // The formula driving this equation is f(x) = (h / (1 + e^(-k(x-x0))))+y0
    //   assume y0 is 0.15
    var y0 = precisionRound(infPts[0][1], 3);
    var x0 = precisionRound((infPts[0][0]+infPts[1][0])/2, 3);
    var h = precisionRound(infPts[1][1]-y0, 3);
    var k = precisionRound(((infPts[1][1]-infPts[0][1])/(infPts[1][0]-infPts[0][0]))*8, 3);

    x0Label.innerHTML = "x0: " + x0;
    LLabel.innerHTML = "L: " + h;
    kLabel.innerHTML = "k: " + k;
    
    clearCanvas();
    ctx.beginPath();
    var x = xMin;
    
    ctx.moveTo(convertToPixelsX(x), convertToPixelsY(h/(1+Math.pow(Math.E,(-1*k*(x-x0))))+y0));
    for (var i=1; i<numOfPts; i++) {
        x = (((xMax-xMin)*i)/numOfPts)+xMin;
        ctx.lineTo(convertToPixelsX(x), convertToPixelsY(h/(1+Math.pow(Math.E,(-1*k*(x-x0))))+y0));
    }

    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function getInflectPts(con) {
    if (con<=con3Pts[0]) {
        return [[10000, 0.15], [10001, 0.16]];
    } else {
        // We need to infer the two inflection points based off our 3 known points
        //    so if c(1.4)=inf, c(1.5)=5 and c(5)=2 we can create a function from 3 points
        //    c(con)=inflectX = a/(con-c) + b

        // assume con0 is the first point
        var cx1 = con3Pts[0];
        var ax1 = (conPt1X[1]-conPt1X[2])/((1/(con3Pts[1]-cx1))-(1/(con3Pts[2]-cx1)));
        var bx1 = conPt1X[2]-(ax1/(con3Pts[2]-cx1));
        var inflect1X = ax1 /(con-cx1) + bx1;
        
        var inflect1Y = conPt1Y[0];
        
        // assume con0 is the first point
        var cx2 = con3Pts[0];
        var ax2 = (conPt2X[1]-conPt2X[2])/((1/(con3Pts[1]-cx2))-(1/(con3Pts[2]-cx2)));
        var bx2 = conPt2X[2]-(ax2/(con3Pts[2]-cx2));
        var inflect2X = ax2 /(con-cx2) + bx2;
        
        // I think this would be dictated by a sqrt formula, but that is a bear, let's make it easier by linearizing it
        if (con<con3Pts[1]) {
            var inflect2Y = ((con-con3Pts[0])*(conPt2Y[1]-conPt2Y[0])/(con3Pts[1]-con3Pts[0]))+conPt2Y[0];
        } else {
            var inflect2Y = ((con-con3Pts[2])*(conPt2Y[1]-conPt2Y[2])/(con3Pts[1]-con3Pts[2]))+conPt2Y[2];
        }
        
        return [[inflect1X, inflect1Y], [inflect2X, inflect2Y]];
    }
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function clearCanvas() {
    ctx.clearRect(0, 0, cWMax, cHMax);
}

function convertToPixelsX(value) {
    return parseInt(((cWMax-cWMin)*(value-xMin)/(xMax-xMin))+cWMin);
}

function convertToPixelsY(value) {
    return cHMax-parseInt(((cHMax-cHMin)*(value-yMin)/(yMax-yMin))+cHMin);
}
