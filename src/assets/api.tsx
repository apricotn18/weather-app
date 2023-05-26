const fetch = (position, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?appid=dd64b46ea595c4104e0881953cb4e287&lat=${position.latitude}&lon=${position.longitude}&cnt=10&units=metric&lang=ja`;
	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(JSON.parse(xhr.response));
		}
		if (xhr.status !== 200) {
			alert('データを取得できませんでした');
		}
	};
};

const convert = (obj) => {
	const dateTime = new Date(obj.dt * 1000);
	return {
		month: dateTime.getMonth() + 1,
		date: dateTime.getDate(),
		hours: dateTime.getHours(),
		min: String(dateTime.getMinutes()).padStart(2, '0'),
		temperature: Math.round(obj.main.temp),
		description: obj.weather[0].description,
		iconPath: `${process.env.PUBLIC_URL}/img/weather/${obj.weather[0].icon}.svg`,
	}
};

export {fetch, convert};