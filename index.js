
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

function fadeOutIntro(){
	console.log("Inside fadeOutIntro ");

	// $("#moveDown").click(function(){
 //        $(".content").fadeOut()
 //        $("#giffy").fadeOut()
 //    });
 //    $(".btn2").click(function(){
 //        $("p").fadeIn();
 //    });
// $('.content').animate({height:0, opacity:0},"slow", function() {
//     $(this).remove();
// });

// $('#giffy').animate({height:0, opacity:0}, 'slow', function() {
//     $(this).remove();
// });

$('.intro').animate({height:0, opacity:0},"slow", function() {
});


 setTimeout(fadeInPage, 3000)

}

function fadeInPage(){
	$(this).remove();
	$("#page").slideDown("slow");

}