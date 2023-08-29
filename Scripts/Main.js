$(document).ready(function (){
	var result,
		resultString,
		myResult = 0,
		timer,
		timerInterval,
		score = 0,
		attempts = -1,
		whichMathValue,
		inputResult = $('input[name=result]'),
		pauseButton,
		allElementsExceptPauseButton = $('.main > *:not(.pause)');

	function StartTimer() {
		timer = parseInt($('#timer').text())
		timerInterval = setInterval(Timer, 1000);
		$('.attempts').text(++attempts);
	}

	function ResetTimer() {		
		$('#timer').text(10);
		clearInterval(timerInterval);
		StartTimer();
	}

	function PauseTimer() {
		clearInterval(timerInterval);
		allElementsExceptPauseButton.animate({'opacity': '0'});
	}

	function Timer() {
		if (timer > 0){
			$('#timer').text(--timer);
		}
		else{
			ResetTimer();
			alert('Time out');
			ChangeLabelValues();
		}
	}

	function GenerateRandomNumber() {
		return Math.floor(Math.random() * (101 - 1) + 0)
	}

	function CalculateResult(thisResult) {
		resultString = (thisResult).toString();
		for (var i = 0; i < resultString.length; i++) {
			myResult += parseInt(resultString[i]);
		}
		result = myResult;
		myResult = 0;
	}

	function ChangeLabelValues() {
		$('.input1').text(GenerateRandomNumber());
		$('.input2').text(GenerateRandomNumber());

		result = parseInt($('.input1').text()) + parseInt($('.input2').text());

		whichMathValue = SwitchMath();

		if (whichMathValue == 'My') {
			while(result > 9) {
				CalculateResult(result);
			}
		}
	}

	function SwitchMath() {
		switch(Math.floor(Math.random() * (2 - 0) + 0))		//Math.floor(Math.random() * (max - min) + min))
		{
			case 0:
				whichMathValue = 'My';
			break;

			case 1:
				whichMathValue = 'Normal';
			break;
		}
		$('.whichMath').text(whichMathValue);
		return whichMathValue;
	}

	StartTimer();
	ChangeLabelValues();
	inputResult.focus();

	inputResult.keydown(function (e){
		if (e.keyCode == 13) {
			if ($(this).val() == result) {
				alert('Well Done');
				ChangeLabelValues();
				$('.score').text(++score);
			}
			else{
				alert('Try Again');
				ChangeLabelValues();
			}
			ResetTimer();
			$(this).val('');
		}
	});

	$('.pause').on('click', function(){
		pauseButton = $(this);
		if (pauseButton.html() == 'Pause'){
			PauseTimer();
			pauseButton.html('Continue');
		}
		else if (pauseButton.html() == 'Continue'){
			allElementsExceptPauseButton.animate({'opacity': '1'});
			StartTimer();
			pauseButton.html('Pause');
		}
	});
});