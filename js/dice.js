(function() {
	var rollButton = document.getElementById('rollDice'),
		widgetRollButton = document.getElementById('rollDiceWidget');

	if (rollButton !== null)
		rollButton.addEventListener('click', rollDice);
	if (widgetRollButton !== null)
		widgetRollButton.addEventListener('click', widgetRollDice);
	
	function addValues(a, b) {
		return a + b;
	}	
		
	function rollDice() {
		clearRolls('diceResult', 'allRolls');
		var numberOfDice = document.getElementsByClassName('numberDice').value;
		
		if (numberOfDice < 1)
			return;
		
		var diceType = document.getElementsByClassName('diceType').value;
			rolls = getRolls(numberOfDice, diceType),
			modifier = document.getElementById('addToResult').value;
			
		displayTotal('diceResult', rolls + modifier);

		// if (document.getElementById('showAllrolls').checked)
			displayAllRolls('allRolls', rolls);
	}

	function widgetRollDice() {
		clearRolls('diceResultWidget', 'allRollsWidget');
		var numberOfDice = document.getElementById('numberDiceWidget').value;
		
		if (numberOfDice < 1)
			return;
		
		var diceType = document.getElementById('diceTypeWidget').value,
			rolls = getRolls(numberOfDice, diceType),
			modifier = parseInt(document.getElementById('addToResult').value);

		displayTotal('diceResultWidget', parseInt(rolls.reduce(addValues)) + modifier);

		// if (document.getElementById('showAllrollsWidget').checked)
			displayAllRolls('allRollsWidget', rolls);
	}

	function getRolls(numberOfDice, diceType) {
		var rolls = [];
		for (var i = 0; i < numberOfDice; i++) {
			rolls.push(randomNumber(1, diceType));
		}
		return rolls;
	}

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function displayTotal(containerId, value) {
		document.getElementById(containerId).innerHTML = value;
	}

	function displayAllRolls(containerId, values) {
		document.getElementById(containerId).innerHTML = '(' + values.join(', ') + ')';
	}

	function clearRolls(rollContainerId, allRollsContainerId) {
		document.getElementById(rollContainerId).innerHTML = '';
		document.getElementById(allRollsContainerId).innerHTML = '';
	}
})();
