function CheckAndDoOperation(operand1, operation, operand2) {
	var result = "error";
	var operator = "";
	try {
		switch (operation) {
			case "+":
				result = parseFloat(operand1) + parseFloat(operand2);
				operator = "plus";
				break;
			case "-":
				result = parseFloat(operand1) - parseFloat(operand2);
				operator = "minus";
				break;
			case "*":
				result = parseFloat(operand1) * parseFloat(operand2);
				operator = "multiply";
				break;
			case "/":
				result = parseFloat(operand1) / parseFloat(operand2);
				operator = "divide";
				break;
			default:
				operator = "[_]";
				break;
		}
	}
	catch(err) {
		result = "error: " + err.message;
	}
	
	return result;
}

function RecursiveEvaluator(sequence) {
	
	var evaluation = "error";
	
	try {
		// check if the operation went through
		var operation = CheckAndDoOperation(sequence[0], sequence[1], sequence[2]);
		if (operation == "error") {
			return operation;
		}
		else {
			// new array with just the first evaluation
			var newSequence = [ operation ];
			for (var i = 3; i < sequence.length; i++) {
				newSequence.push(sequence[i]);
			}
			if (newSequence.length == 1) {
				evaluation = newSequence[0];
			}
			else {
				return RecursiveEvaluator(newSequence);
			}
		}
	}
	catch(err) {
		evaluation = "Error: " + err.message;
	}
	
	return evaluation;
}