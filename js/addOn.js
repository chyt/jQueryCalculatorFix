function checkLastTwoAndAddOperand(lastTwo, checkValue) {
	// To store the last two variables
	if (lastTwo.length == 1) {
		lastTwo.push(checkValue);
	}
	else if (lastTwo.length == 2) {
		lastTwo[1] = checkValue;
	}
}

function checkLastTwoAndAddOperator(lastTwo, checkValue) {
	// To store the last two variables
	if (lastTwo.length == 0) {
		lastTwo.push(checkValue);
	}
	else if (lastTwo.length > 0) {
		lastTwo[0] = checkValue;
	}
}