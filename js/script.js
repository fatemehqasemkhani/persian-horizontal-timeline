
"use strict";

(function () {


	// VARIABLES
	var timeline = document.querySelector(".timeline ol"),
		elH = document.querySelectorAll(".timeline li > div"),
		arrows = document.querySelectorAll(".timeline .arrows .arrow"),
		arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
		arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
		firstItem = document.querySelector(".timeline li:first-child"),
		lastItem = document.querySelector(".timeline li:last-child"),
		xScrolling = 280,
		disabledClass = "disabled";

	// START
	window.addEventListener("load", init);

	function init() {

		setEqualHeights(elH);
		animateTl(xScrolling, arrows, timeline);
		setSwipeFn(timeline, arrowPrev, arrowNext);
		setKeyboardFn(arrowPrev, arrowNext);
	}

	// SET EQUAL HEIGHTS
	function setEqualHeights(el) {
		var counter = 0;
		for (var i = 0; i < el.length; i++) {
			var singleHeight = el[i].offsetHeight;

			if (counter < singleHeight) {
				counter = singleHeight;
			}
		}

		for (var i = 0; i < el.length; i++) {
			el[i].style.height = counter + "px";
		}

	}

	// CHECK IF AN ELEMENT IS IN VIEWPORT
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		console.log( rect.top + ' >= 0 ,' + rect.left + ' >= 0 , ' + rect.bottom + ' <= ' + (window.innerHeight || document.documentElement.clientHeight)
		+ ' , ' + rect.right + ' <= ' + (window.innerWidth || document.documentElement.clientWidth));

		if(window.innerWidth > 1400)
		var result =
			rect.top >= 0 &&
			rect.left >=  400 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right - 400 <= (document.getElementById("container1").offsetWidth);
		if(window.innerWidth <= 1400 && window.innerWidth >= 700)
			var result =
				rect.top >= 0 &&
				rect.left >=  200 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right - 200 <= (document.getElementById("container1").offsetWidth);
		if(window.innerWidth <= 700 && window.innerWidth >= 598)
			var result =
				rect.top >= 0 &&
				rect.left >=  100 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right - 100 <= (document.getElementById("container1").offsetWidth);
		return result;
	}

	// SET STATE OF PREV/NEXT ARROWS
	function setBtnState(el) {
		var flag = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		if (flag) {
			el.classList.add(disabledClass);
		} else {
			if (el.classList.contains(disabledClass)) {
				el.classList.remove(disabledClass);
			}
			el.disabled = false;
		}
	}

	// ANIMATE TIMELINE
	function animateTl(scrolling, el, tl) {
		var counter = 0;
		for (var i = 0; i < el.length; i++) {
			el[i].addEventListener("click", function () {
				if (!arrowPrev.disabled) {
					arrowPrev.disabled = true;
				}
				if (!arrowNext.disabled) {
					arrowNext.disabled = true;
				}

				var sign = this.classList.contains("arrow__prev") ? "-" : "";

				if (counter === 0) {
					tl.style.transform = "translateX(" + scrolling + "px)";
				} else {
					var tlStyle = getComputedStyle(tl);
					// add more browser prefixes if needed here
					var tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
					var values = parseInt(tlTransform.split(",")[4]) + parseInt("" + sign + scrolling);
					tl.style.transform = "translateX(" + values + "px)";
				}

				console.log(sign);
				setTimeout(function () {
					isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
					isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
				}, 1000);

				counter++;
			});
		}
	}

	// ADD SWIPE SUPPORT FOR TOUCH DEVICES
	function setSwipeFn(tl, prev, next) {
		var hammer = new Hammer(tl);
		hammer.on("swipeleft", function () {
			return next.click();
		});
		hammer.on("swiperight", function () {
			return prev.click();
		});
	}

	// ADD BASIC KEYBOARD FUNCTIONALITY
	function setKeyboardFn(prev, next) {
		document.addEventListener("keydown", function (e) {
			if (e.which === 37 || e.which === 39) {
				var timelineOfTop = timeline.offsetTop;
				var y = window.pageYOffset;
				if (timelineOfTop !== y) {
					window.scrollTo(0, timelineOfTop);
				}
				if (e.which === 37) {
					prev.click();
				} else if (e.which === 39) {
					next.click();
				}
			}
		});
	}
})();