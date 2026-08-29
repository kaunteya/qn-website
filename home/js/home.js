(function () {
	'use strict';

	// Tell the <head> bootstrap the reveal logic is here, so it leaves the
	// hiding in place rather than falling back to showing everything.
	document.documentElement.classList.add('reveal-ready');

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Header gets a hairline border once the page moves.
	var header = document.getElementById('siteHeader');
	if (header) {
		var onScroll = function () {
			header.classList.toggle('is-scrolled', window.scrollY > 8);
		};
		window.addEventListener('scroll', onScroll, {passive: true});
		onScroll();
	}

	// Reveal sections as they enter the viewport.
	var revealables = document.querySelectorAll('[data-reveal]');
	if (reduceMotion || !('IntersectionObserver' in window)) {
		revealables.forEach(function (el) {
			el.classList.add('is-visible');
		});
	} else {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}
				// Stagger siblings so a grid doesn't pop in all at once.
				var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
				var index = siblings.indexOf(entry.target);
				entry.target.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		}, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});

		revealables.forEach(function (el) {
			observer.observe(el);
		});
	}

	// Gentle pointer tilt on the hero screenshot (fine pointers only).
	var tilt = document.querySelector('[data-tilt]');
	if (tilt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
		var frame = null;
		var reset = function () {
			tilt.style.transform = '';
		};
		window.addEventListener('pointermove', function (event) {
			if (frame) {
				return;
			}
			frame = window.requestAnimationFrame(function () {
				frame = null;
				var x = (event.clientX / window.innerWidth - 0.5) * 2;
				var y = (event.clientY / window.innerHeight - 0.5) * 2;
				tilt.style.transform =
					'perspective(1400px) rotateY(' + (x * 2.2).toFixed(2) + 'deg) rotateX(' +
					(-y * 1.4).toFixed(2) + 'deg) translateY(' + (y * -4).toFixed(2) + 'px)';
			});
		}, {passive: true});
		window.addEventListener('pointerleave', reset);
		window.addEventListener('blur', reset);
	}

	var year = document.getElementById('year');
	if (year) {
		year.textContent = String(new Date().getFullYear());
	}
})();
