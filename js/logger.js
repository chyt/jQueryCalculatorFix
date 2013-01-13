function log(message) {
	if (loggerOn && allowLogger) {
		$("#logger").append(message);
		scrollBottomLogger();
	}
}

function scrollBottomLogger() {
	var scrollPosition = $("#logger").prop("scrollHeight");
	$("#logger").stop().animate({ scrollTop: scrollPosition }, 1000);
}