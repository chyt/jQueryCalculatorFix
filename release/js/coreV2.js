var CONST_NAN = "NaN";
var CONST_INF = "Infinity";

var calculatorObject = {
	defaultValue : '0.00',
	operators : ['+', '-', '*', '/'],
	sequence : [],
	lastTwo: [],
	sLength: function() {
		return this.sequence.length;
	},
	empty: function() {
		return (this.sLength() == 0);
	},
	isNumber: function(value) {
		return typeof value != 'undefined' && !isNaN(parseFloat(value)) && isFinite(value);
	},
	isOperator: function(value) {
		return (jQuery.inArray(value, this.operators) != -1);
	},
	isNaNOrInf: function(value) {
		return (value == CONST_NAN || value == CONST_INF);
	},
	push: function(value) {
		this.sequence.push(value);
	},
	pop: function() {
		this.sequence.pop();
	},
	checkEmptyAndForceValue: function (lastValue) {
		// If there is nothing in the sequence, need to add a number 
		if (this.empty()) {
			// Push the last value into the sequence if it's a number
			if (this.isNumber(lastValue)) {
				this.push(lastValue);
			}
			// If this is a special character...
			else if (this.isNaNOrInf(lastValue)) {
				// TODO: Check if we need to do something here?
			}
			// Otherwise, put in the default value
			else {
				this.push(this.defaultValue);
			}
		}
	},
	calculate : function() {
	
		var answer = "error";
		
		// Only attempt to shove the sequence into the evaluator if there is a sequence
		if (this.sLength() >= 3) {
			answer = RecursiveEvaluator(this.sequence);
		}
		// Special case where we have a single number and the last evaluation half is stored
		else if (this.sLength() == 1 && this.lastTwo.length == 2) {
			var customSequence = [this.sequence[0], this.lastTwo[0], this.lastTwo[1]];
			answer = RecursiveEvaluator(customSequence);
		}
		// If we only have one value and nothing else, don't calculate
		else if (this.sLength() == 1 && this.lastTwo.length != 2) {
			answer = (this.sequence[0]);
		}
		// If the sequence has nothing, not even a default value, do nothing
		else if (this.empty()) {
			return;
		}
		
		this.sequence = [];
		
		$('#calculatorResult').html(answer);	
		
	},
	trigger : function(calcElement) {
		if (calcElement.length > 0) {
			calcElement.find('ul li').on('click', function() {
			
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
				
				var currValue = $(this).attr('data-value');
				//if (currValue == ".") {
				//	currValue.isNumber == TRUE;
				//}
				var lastValue = $('#calculatorResult').text();
				
				switch(currValue) {
					
					// Operate!
					case '=':						
						
						calculatorObject.checkEmptyAndForceValue(lastValue);
						
						// If the last item in the sequence is an operation, remove it
						if (calculatorObject.isOperator(calculatorObject.sequence[calculatorObject.sLength() - 1])) {
							calculatorObject.pop();
							// TODO: use -- to update length of sequence?
						}
						
						// Store last operation and value:
						// If we have at least three items (meaning we have an operation and 2ndary value)
						if (calculatorObject.sLength() >= 3) {
							calculatorObject.lastTwo[0] = calculatorObject.sequence[calculatorObject.sLength() - 2];
							calculatorObject.lastTwo[1] = calculatorObject.sequence[calculatorObject.sLength() - 1];
						}
						
						calculatorObject.calculate();
						
						break;
					
					// Clear
					case 'c':
					
						// Empty sequences, and reset value on the result
						calculatorObject.sequence = [];
						calculatorObject.lastTwo = [];
						$('#calculatorResult').html(calculatorObject.defaultValue);
					
						break;
					
					// Operator
					case calculatorObject.operators[0]:
					case calculatorObject.operators[1]:
					case calculatorObject.operators[2]:
					case calculatorObject.operators[3]:
						
						// Check if sequence is empty
						calculatorObject.checkEmptyAndForceValue(lastValue);
						
						// If last value was an operation, we must replace that
						if (calculatorObject.isOperator(lastValue)) {
							calculatorObject.sequence[calculatorObject.sLength() - 1] = currValue;
						}
						// Otherwise it was probably a number TODO: check this case, might be bad input
						else {
							calculatorObject.sequence.push(currValue);
						}
						
						// Print
						$('#calculatorResult').html(currValue);
					
					break;
					
					default:
						
						var builder = "";
						
						// if this is a number
						if (calculatorObject.isNumber(currValue) || currValue == ".") {
							// and there is nothing in the sequence just add it in
							if (calculatorObject.empty()) {
								builder = currValue;
								calculatorObject.sequence.push(builder);
							}
							// And the last input was a number, add it on!
							else if (calculatorObject.isNumber(lastValue)) {
								builder = lastValue + currValue;
								calculatorObject.sequence[calculatorObject.sLength() - 1] = builder;
							}
							// If the last input wasn't a number, then push it to the sequence as a new number
							else {
								builder = currValue;
								calculatorObject.sequence.push(builder);
							}
						}
						
						// Print
						$('#calculatorResult').html(builder);
						
						// Otherwise, this is an input we want to ignore
					
				}
						
				
			});
		}
	}
};

$(function() {

	calculatorObject.trigger($('#calculator'));

});