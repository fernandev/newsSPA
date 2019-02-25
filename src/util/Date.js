export default class DateUtil {
	static differenceBetweenDates (date1, date2) {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
			console.warn('Comparison must happen between two Date objects');
			return;
		}

		const [date1MS, date2MS] = [date1.getTime(), date2.getTime()];
		const secondsDifference = Math.floor((date1MS - date2MS) / 1000);
		const minutesDifference = Math.floor(secondsDifference / 60);
		const hoursDifference = Math.floor(minutesDifference / 60);
		const daysDifference = Math.floor(hoursDifference / 24);
		const weeksDifference = Math.floor(daysDifference / 7);
		const monthsDifference = (date2.getMonth() - date2.getMonth());
		const yearsDifference = Math.floor(monthsDifference / 12);

		return new Map([
			['seconds', Math.abs(secondsDifference)],
			['minutes', Math.abs(minutesDifference)],
			['hours', Math.abs(hoursDifference)],
			['days', Math.abs(daysDifference)],
			['weeks', Math.abs(weeksDifference)],
			['months', Math.abs(monthsDifference)],
			['years', Math.abs(yearsDifference)]
		]);
	}
}