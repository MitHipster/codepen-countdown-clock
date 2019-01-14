(function() {
	const countdown = {
		newYear: {
			container: 'countdown__year',
			main: 'countdown__year-main',
			reflection: 'countdown__year-reflection',
			digit: 'countdown__year-digit'
		},
		timer: {
			container: 'countdown__timer',
			days: 'countdown__timer-days',
			hours: 'countdown__timer-hours',
			minutes: 'countdown__timer-minutes',
			seconds: 'countdown__timer-seconds'
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

		addElement(parent, type, className, html) {
			const el = document.createElement(type);

			el.className = className;
			if (typeof html !== 'undefined') {
				el.innerHTML = html;
			}

			const parentEl =
				typeof parent !== 'string'
					? parent
					: document.getElementsByClassName(parent)[0];
			parentEl.appendChild(el);

			return el;
		},

		createYear(className) {
			const timeline = new TimelineMax(),
				newYearEl = this.addElement(this.newYear.container, 'div', className),
				newYearVal = this.period.year.toString(10);

			newYearVal.split('').forEach(digitVal => {
				const digitEl = this.addElement(
					newYearEl,
					'span',
					this.newYear.digit,
					digitVal
				);

				digitEl.style.top = 0 - digitEl.clientHeight * 2 + 'px';
				timeline.to(digitEl, 0.5, { top: 0, opacity: 1, ease: Bounce.easeOut });
			});

			return newYearEl;
		},

		createTimer(objName) {
			this.addElement(this.newYear.container, 'div', objName.container);
			this.timer.daysEl = this.addElement(
				this.timer.container,
				'div',
				objName.days
			);
			this.timer.hoursEl = this.addElement(
				this.timer.container,
				'div',
				objName.hours
			);
			this.timer.minutesEl = this.addElement(
				this.timer.container,
				'div',
				objName.minutes
			);
			this.timer.secondsEl = this.addElement(
				this.timer.container,
				'div',
				objName.seconds
			);
		},

		init() {
			this.newYear.mainEl = this.createYear(this.newYear.main);
			this.newYear.reflectionEl = this.createYear(this.newYear.reflection);
			this.createTimer(this.timer);
		}
	};
	countdown.init();
	console.log(countdown);
})();
