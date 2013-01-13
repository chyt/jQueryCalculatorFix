$(window).load(function() {
	CheckAndSetLogger();
	
	BindCloseLogger();
	BindOpenLogger();
	
	var oldDemoHTML = $("#demo").html();
	$("#demo").parent().html("<div id=\"demo\">" + oldDemoHTML + "</div>")
	
	if (!allowLogger) {
		$("#openLogger").hide();
	}
	
	// Clear Logger
	$("#hoverLogReset").hover(
		function() {
			$(this).children("span").css("visibility", "visible");
			$(this).stop().animate({
				right: '12px',
				opacity: 0.9
			});
		}, 
		function() {		
			$(this).stop().animate({
				right: '-71px',
				opacity: 0.3
			}, function() {
				$(this).children("span").css("visibility", "hidden");
			});
		}
	).click(function() {
		$("#logger").html("<h1>Logger:</h1>");
	});
	
	
	// Links image hover
	$(".linkDiv img").hover(
		function() {
			$("#links").stop().fadeTo("normal", 0.9)
			$(this).next("span").css("opacity", "1");
			$(this).next("span").stop().fadeIn();
			
			$(this).parent("a, div#demo").parent("div.linkDiv").stop().animate({
				top: '-15px'
			});
		},
		function() {
			$("#links").stop().fadeTo("normal", 0.3)
			$(this).next("span").stop().fadeOut();
			$(this).parent("a, div#demo").parent("div.linkDiv").stop().animate({
				top: '0'
			});
		}
	);
	
	// For the demo:
	$("#demo").parent().click(function() {
		window.open("release/index.html", "Calculator", "width=300,height=370");
	});
});

function BindOpenLogger() {
	//Open Logger
	$("#openLogger").hover(
		function() {
			$(this).stop().animate({
				opacity: 0.9
			});
		}, 
		function() {		
			$(this).stop().animate({
				opacity: 0.3
			});
		}
	).click(function() {
		$(this).unbind('mouseenter mouseleave');
		$("#wrapper").fadeOut(function() {
			loggerOn = true;
			CheckAndSetLogger();
		});
	});
}

function BindCloseLogger() {
	// Close Logger
	$("#closeLogger").hover(
		function() {
			$(this).stop().animate({
				opacity: 0.9
			});
		}, 
		function() {		
			$(this).stop().animate({
				opacity: 0.3
			});
		}
	).click(function() {
		$(this).unbind('mouseenter mouseleave');
		$("#wrapper").fadeOut(function() {
			loggerOn = false;
			CheckAndSetLogger();
		});
	});
}

function CheckAndSetLogger() {
	if (loggerOn && allowLogger) {
		//$("#wrapper").stop().animate({
		//	right: '350px'
		//}, function() {
		centerCalc();
			$("#wrapper").css("margin", "0");
			$("#wrapper").css("position", "absolute");
			
			$("#wrapper").fadeIn();
		//});
		
		$("#openLogger").fadeOut();
		$("#logWrap").fadeIn();
		BindCloseLogger();
	}
	else {
		$("#wrapper").stop().animate({
			right: '0'
		}, function() {			
			$("#wrapper").css("margin", "0 auto");
			$("#wrapper").css("position", "static");

			$("#wrapper").fadeIn();
		});
		
		$("#openLogger").fadeIn();
		$("#logWrap").fadeOut();
		BindOpenLogger();
	}
}

$(window).resize(function() {
	if (loggerOn) {
		centerCalc();
	}
});

function centerCalc() {
	var width = document.documentElement.clientWidth;
	var logWidth = 350;
	var calcWidth = 300;
	var leftPos = width - logWidth - calcWidth;
	leftPos /= 2;
	
	$("#wrapper").stop().animate({
		left: leftPos
	});
}