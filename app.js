const clock = {
	containerInner: document.querySelector('.container-inner'),

	range(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	period() {
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
	}
};
let time = clock.period();
