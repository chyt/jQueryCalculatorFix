var calculatorObject = {
	defaultValue : '0.00',
	stringResult : '',
	operators : ['+', '-', '*', '/'],
	sequence : [],
	lastTwo: [],
	cycleFinished : false,
	isNumber : function(value){
		return typeof value !== 'undefined' && !isNaN(parseFloat(value)) && isFinite(value);
	},
	calculate : function() {
		var answer = "error";
		// Only attempt to shove the sequence into the evaluator if there is a sequence...
		if (calculatorObject.sequence.length > 1) {
			answer = RecursiveEvaluator(calculatorObject.sequence);
		}
		else if (calculatorObject.sequence.length == 1) {
			answer = RecursiveEvaluator([calculatorObject.sequence[0], calculatorObject.lastTwo[0], calculatorObject.lastTwo[1]])
		}
		else {
			answer = (calculatorObject.sequence[0]);
		}
		calculatorObject.sequence = [];
		$('#calculatorResult').html(answer);	
	},
	trigger : function(obj) {
		if (obj.length > 0) {
			obj.find('ul li').live('click', function() {
			
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
				
				var thisItem = $(this).attr('data-value');
				
				var thisValue = $('#calculatorResult').text();
				
				switch(thisItem) {
					
					case '=':
					
					if (calculatorObject.isNumber(thisValue)) {
						calculatorObject.sequence.push(thisValue);
						
						if (calculatorObject.sequence.length > 1) {
							// To store the last two variables
							checkLastTwoAndAddOperand(calculatorObject.lastTwo, thisValue);
						}
					}
					else if (!calculatorObject.isNumber(calculatorObject.sequence[calculatorObject.sequence.length-1])) {
						calculatorObject.sequence.pop();
					}
					
					// Next time only use what is inputted... (we have residual input)
					calculatorObject.cycleFinished = true;
					
					calculatorObject.calculate();
					
					break;
					
					case 'c':
					
					calculatorObject.sequence = [];
					calculatorObject.lastTwo = [];
					$('#calculatorResult').html(calculatorObject.defaultValue);
					
					break;
					
					case calculatorObject.operators[0]:
					case calculatorObject.operators[1]:
					case calculatorObject.operators[2]:
					case calculatorObject.operators[3]:
					
					// if after clicking equal symbol we've clicked the operator
					// then simply set the cycleFinished to false
					// to allow further calculation of the result
					if (calculatorObject.cycleFinished) {
						if (calculatorObject.isNumber(thisValue)) {
							calculatorObject.cycleFinished = false;
						}
						else {
							break;
						}
					}
					
					// add value from the field to array - suppose to be integer
					// if not will be overwritten by the following statement
					if (calculatorObject.isNumber(thisValue)) {
						calculatorObject.sequence.push(thisValue);
						
						// To store the last two variables
						checkLastTwoAndAddOperand(calculatorObject.lastTwo, thisValue);
					}
					
					if (calculatorObject.sequence.length > 0) {
						
						// if the last element in array is integer it's all good
						// add operator to array
						if (calculatorObject.isNumber(calculatorObject.sequence[calculatorObject.sequence.length-1])) {
							calculatorObject.sequence.push(thisItem);
							
							// To store the last two variables
							checkLastTwoAndAddOperator(calculatorObject.lastTwo, thisItem);
						// otherwise overwrite the last item
						} else {
							calculatorObject.sequence[calculatorObject.sequence.length-1] = thisItem;
							
							// To store the last two variables
							checkLastTwoAndAddOperator(calculatorObject.lastTwo, thisItem);
						}
					
					} else {
					
						calculatorObject.sequence.push(calculatorObject.defaultValue);
						calculatorObject.sequence.push(thisItem);
						
						// To store the last two variables
						checkLastTwoAndAddOperator(calculatorObject.lastTwo, thisItem);
						checkLastTwoAndAddOperand(calculatorObject.lastTwo, calculatorObject.defaultValue);
						
					}
					
					$('#calculatorResult').html(thisItem);
					
					break;
					
					default:
					
					// if current value is not an operator
					if (jQuery.inArray(thisValue, calculatorObject.operators) === -1) {
						if (thisValue !== calculatorObject.defaultValue) {
							// Don't keep the residual input if either we told it to, or if it's a symbol
							if (calculatorObject.cycleFinished || !calculatorObject.isNumber(thisValue)) {
								calculatorObject.cycleFinished = false;
								$('#calculatorResult').html(thisItem);
							} else {
								$('#calculatorResult').html(thisValue + thisItem);
							}
						} else {
							$('#calculatorResult').html(thisItem);
						}
					// otherwise - if it is
					} else {
						$('#calculatorResult').html(thisItem);
					}
					
				}
						
				
			});
		}
	}
};
$(function() {

	calculatorObject.trigger($('#calculator'));

});