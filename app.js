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

		confetti: {
			container: 'countdown__confetti',
			shapes: 'countdown__confetti-shapes'
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

		addElement(parent, type, className, text) {
			const el = document.createElement(type);

			el.className = className;
			if (typeof text !== 'undefined') {
				el.textContent = text;
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
			const duration = 0.5;
			let counter = 0;

			for (const segment in timer) {
				if (timer.hasOwnProperty(segment)) {
					if (segment === 'container') {
						this.elements[segment] = this.addElement(
							this.year.container,
							'div',
							timer[segment]
						);
					} else {
						const timeline = new TimelineMax();
						this.elements[segment] = this.addElement(
							this.timer.container,
							'div',
							timer[segment]
						);

						timeline.to(
							this.elements[segment],
							duration,
							{ top: 0, opacity: 1 },
							duration * counter
						);
						counter++;
					}
				}
			}

			return setInterval(this.updateTimer.bind(this), 250);
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

		createConfetti(className) {
			const fullTimeline = new TimelineMax(),
				confettiContainer = this.addElement(this.year.new, 'div', className),
				confettiShapes = [];
			let confettiContainerWidth = 0;

			for (let i = 1; i <= 50; i++) {
				const time = this.range(0, 100) / 100,
					duration = 0.5,
					direction = this.range(1, 2) === 1 ? -1 : 1,
					timeline = new TimelineMax({ repeat: -1 }),
					confettiShape = this.addElement(
						confettiContainer,
						'div',
						this.confetti.shapes
					);

				confettiShape.style.top = '-50px';
				timeline
					.set(confettiShape, { scale: this.range(10, 20) / 10 }, time)
					.to(confettiShape, duration, { opacity: 1 }, time)
					.to(
						confettiShape,
						duration * 2,
						{
							top: '200%',
							rotationZ: this.range(180, 360) * direction,
							rotationX: this.range(180, 360) * direction
						},
						time
					)
					.to(confettiShape, duration, { opacity: 0 }, time + duration);

				fullTimeline.add(timeline, 0);
				confettiShapes.push(confettiShape);
			}

			function checkWidth() {
				let newWidth = this.elements.year.clientWidth;

				if (Math.abs(confettiContainerWidth - newWidth) > 1) {
					for (let i = 0; i < confettiShapes.length; i++) {
						confettiShapes[i].style.left = -5 + this.range(0, newWidth) + 'px';
					}
					confettiContainerWidth = newWidth;
				}
			}

			// Delay function call to get final width of container
			setTimeout(checkWidth.bind(this), 250);

			return new TimelineMax()
				.set(confettiContainer, { opacity: 1 }, 3)
				.add(fullTimeline, 3);
		},

		init() {
			this.elements.year = this.createYear(this.year.new);
			this.elements.reflection = this.createYear(this.year.reflection);
			this.interval = this.createTimer(this.timer);
			this.createConfetti(this.confetti.container);
		}
	};

	countdown.init();
})();
