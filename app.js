(function() {
	const countdown = {
		els: {
			container: document.querySelector('.container__inner'),
			newYearMain: 'countdown__year countdown__year-main',
			newYearReflection: document.querySelector('.countdown__year-reflection'),
			newYearDigit: 'countdown__year-digit'
		},

		range(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		get period() {
			// Sets target date to Jan 1st of the following year
			const currentDate = new Date();
			const targetDate = new Date(currentDate.getFullYear() + 1, 0, 1);
			let seconds = Math.floor((targetDate - currentDate) / 1000);

			// Calculate whole units and subtract equivalent # of seconds
			const days = Math.floor(seconds / (24 * 60 * 60));
			seconds -= days * (24 * 60 * 60);

			const hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * (60 * 60);

			const minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60;

			return {
				year: targetDate.getFullYear(),
				days,
				hours,
				minutes,
				seconds
			};
		},

		element(parent, type, className, html) {
			const el = document.createElement(type);

			el.className = className;
			if (typeof html !== undefined) {
				el.innerHTML = html;
			}
			parent.appendChild(el);

			return el;
		},

		year(className) {
			const timeline = new TimelineMax(),
				newYearEl = countdown.element(this.els.container, 'div', className, ''),
				newYearVal = countdown.period.year.toString(10);

			newYearVal.split('').forEach(digitVal => {
				const digitEl = countdown.element(
					newYearEl,
					'span',
					this.els.newYearDigit,
					digitVal
				);

				digitEl.style.top = 0 - digitEl.clientHeight * 2 + 'px';
				timeline.to(digitEl, 0.5, { top: 0, opacity: 1, ease: Bounce.easeOut });
			});
		},

		init() {
			countdown.year(this.els.newYearMain);
		}
	};
	countdown.init();
})();
