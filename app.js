(function() {
	const countdown = {
		year: {
			container: 'countdown__year',
			new: 'countdown__year-new',
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

		elements: {},

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
				// FIXME: Change innerHTML to textContent
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
				yearEl = this.addElement(this.year.container, 'div', className),
				yearVal = this.period.year.toString(10);

			yearVal.split('').forEach(digitVal => {
				const digitEl = this.addElement(
					yearEl,
					'span',
					this.year.digit,
					digitVal
				);

				digitEl.style.top = 0 - digitEl.clientHeight * 2 + 'px';
				timeline.to(digitEl, 0.5, { top: 0, opacity: 1, ease: Bounce.easeOut });
			});

			return yearEl;
		},

		createTimer(timer) {
			for (const segment in timer) {
				if (timer.hasOwnProperty(segment)) {
					if (segment === 'container') {
						this.elements[segment] = this.addElement(
							this.year.container,
							'div',
							timer[segment]
						);
					} else {
						this.elements[segment] = this.addElement(
							this.timer.container,
							'div',
							timer[segment]
						);
					}
				}
			}

			this.updateTimer();
		},

		updateTimer() {
			const period = this.period,
				timer = this.elements;

			function addLabel(number, segment) {
				let value = number <= 9 ? '0' + number : '' + number;
				let label = value + ' ' + segment;

				return number === 1 ? label : label + 's';
			}

			// Add / change content from most frequently updated to least
			timer.seconds.textContent = addLabel(period.seconds, 'second');
			timer.minutes.textContent = addLabel(period.minutes, 'minute');
			timer.hours.textContent = addLabel(period.hours, 'hour');
			timer.days.textContent = addLabel(period.days, 'day');
		},

		init() {
			this.elements.year = this.createYear(this.year.new);
			this.elements.reflection = this.createYear(this.year.reflection);
			this.createTimer(this.timer);
		}
	};
	countdown.init();
	console.log(countdown);
})();
