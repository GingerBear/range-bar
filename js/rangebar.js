(function() {

	var body = document.body;
	var barDiv = document.querySelector('.range-bar');
	var labelList = barDiv.querySelector('ul');
	var labelListItems = barDiv.querySelectorAll('li');
	var labelNum = labelListItems.length;
	var barEl = document.createElement('ul');
	var tempEl = "";
	var isDragging = false;
	var barOffsetLeft= barDiv.offsetLeft;
	var draggingEl = null;
	var draggingIndex = null;
	var result = [];
	var resultEl = document.querySelector('.result');
	var baseNumEl = document.querySelector('.range-bar input');

	// set up label class
	labelList.className = "bar-label";

	// insert bar element 
	for (var i = 0; i < labelNum; i++) {
		tempEl += ("<li data-color='"+
			labelListItems[i].dataset.color + 
			"'><span class='bar-slider'></span><span class='bar-label'>" + 
			labelListItems[i].innerHTML + 
			"<br><span class='bar-perc'>" + 
			(1 / labelNum) * 100 + 
			"%</span></span><span class='bar-value'>" + 
			Math.round((1 / labelNum) * baseNumEl.value) + 
			"</span></li>");
	}

	barEl.innerHTML = tempEl;
	barEl.className = "bar-slot";
	barDiv.appendChild(barEl);	
	var barListItems = document.querySelectorAll('.bar-slot li');
	var barListSlider = document.querySelectorAll('.bar-slot .bar-slider');
	var barWidth = barEl.offsetWidth;
	var leftElWidth = 0;
	var rightElWidth = 0;

	var reset = function() {
		// initiate range by average
		var avgWidth = (1 / labelNum);
		for (var i = 0; i < labelNum; i++) {
			result.push(avgWidth);
			barListItems[i].style.width = ( avgWidth * 100 * (labelNum - i) ) + '%';
			barListItems[i].style.backgroundColor = barListItems[i].dataset.color;
		}
	}

	var caculateRange = function() {
		var logEl = "";
		for (var i = 0; i < result.length; i++) {
			if (i === result.length - 1) {
				result[i] = barListItems[i].offsetWidth / barWidth;
			} else {				
				result[i] = (barListItems[i].offsetWidth - barListItems[i+1].offsetWidth) / barWidth;
			}
			barListItems[i].querySelector('.bar-perc').innerHTML = Math.round(result[i] * 100) + "%";
			barListItems[i].querySelector('.bar-value').innerHTML = Math.round(baseNumEl.value * result[i]);
			logEl += barListItems[i].dataset.color + ": " + Math.round(baseNumEl.value * result[i]) + "<br>";
		}

		resultEl.innerHTML = logEl;
	}

	// bind mousedown event to each slider
	for (var i = 0; i < labelNum; i++) {
		barListSlider[i].onmousedown = (function(i) {
			return function() {
				isDragging = true;
				draggingEl = barListItems[i];
				draggingIndex = i;
				body.className += body.className ? ' dragging' : 'dragging';

				// setup the bround of current slider
				leftElWidth = barListItems[draggingIndex-1].offsetWidth;
				rightElWidth = draggingIndex === labelNum - 1 ? 0 : barListItems[draggingIndex+1].offsetWidth;
			}
		})(i);
	}

	// bind mousemove event to document for dragging
	document.onmousemove = function(e) {
		if (isDragging) {			
			// prevent dragging out of range
			var width = 1 - (e.pageX - barOffsetLeft) / barWidth;

			if (width * barWidth >= leftElWidth) {
				draggingEl.style.width = (leftElWidth / barWidth * 100) + "%";
			} else if (width * barWidth <= rightElWidth) {
				draggingEl.style.width = (rightElWidth / barWidth * 100) + "%";
			} else {
				draggingEl.style.width = (width * 100) + "%";
			}
			caculateRange();
		}
	}

	// stop dragging status
	document.onmouseup = function(e) {
		isDragging = false;
		draggingEl = null;
		draggingIndex = null;
		body.className = body.className.split('dragging')[0];
	}

	// recaculate range if base number change
	baseNumEl.onchange = function(e) {
		caculateRange();
	}

	reset();
	caculateRange();

})();