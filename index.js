
$(document).on('mousemove', function(e){
  $('#cursor').css({
    left:  e.pageX,
    top:   e.pageY
  });
});

var btn = document.getElementById("myBtn");

function plotting(){
	var x1 = document.getElementById("graphForm").elements[0].value;
	var y1 = document.getElementById("graphForm").elements[1].value;
	var x2 = document.getElementById("graphForm").elements[2].value;
	var y2 = document.getElementById("graphForm").elements[3].value;
	var x3 = document.getElementById("graphForm").elements[4].value;
	var y3 = document.getElementById("graphForm").elements[5].value;	
	
	console.log("Inside plotting");

	var trace1 = {
	  x: [x1, x2, x3], 
	  y: [y1, y2, y3], 
	  type: 'scatter',
	  mode: 'lines',
	  name: 'Red',
  
	  	line: {
	    	color: 'rgb(219, 64, 82)',
	    	width: 3
	  	}
	};
	
	var layout = {
	  width: 700,
	  height: 500
	};
	
	var data = [trace1];
	Plotly.newPlot('myDiv', data,layout);

	$('#myDiv').css({
	display: 'block'
});

}


var button2 = document.getElementById("hoverClass");

$(document).ready(function() {
      $(window).on('scroll', function() {
        if (Math.round($(window).scrollTop()) > 100) {
          $('.navbar').addClass('scrolled');
        } else {
          $('.navbar').removeClass('scrolled');
        }
      });
    });


 $(document).ready(function () {
        $('#topNav a').hover(function () {
            $(this).addClass('topNavActive');
        }, function () {
            $(this).removeClass('topNavActive');
        });
    });

$(document).ready(function () {
        // $('#giffy').click(fadeOutIntro());
    });


function fadeOutIntro(){
	console.log("Inside fadeOutIntro ");

$('.intro').animate({height:0, opacity:0},"slow", function() {
});


 setTimeout(fadeInPage,1000)

}

function fadeInPage(){
	$(this).remove();
	$("#page").slideDown("slow");

}

function fadeOutPage(){
	console.log("Inside fadeOutPage ");

$('#page').animate({height:0, opacity:0},"slow", function() {
});

 setTimeout(fadeInPage2,1000)

}

function fadeInPage2(){
	$(this).remove();
	$("#page2").slideDown("slow");

}

function fadeOutPage2(){
	console.log("Inside fadeOutPage2 ");

$('#page2').animate({height:0, opacity:0},"slow", function() {
});

 setTimeout(fadeInIntro,1000)

}

function fadeInIntro(){
	$(this).remove();
	$(".intro").slideDown("slow");

}

function fadeForIntro(){
	console.log("Inside fadeForIntro ");

$('#page').animate({height:0, opacity:0},"slow", function() {
});

 setTimeout(fadeInIntro,1000)

}
