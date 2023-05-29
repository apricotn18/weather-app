type Coords = {
	latitude: string;
	longitude: string;
}

type ConvertedItem = undefined | {
	month: number;
	date: number;
	hours: number;
	min: string;
	temperature: number;
	description: string;
	iconPath: string;
};

type Weather = {
	description: string;
	icon: string;
}

type WeatherItem = {
	dt: number;
	main: {
		temp: number;
	}
	weather: Weather[];
}

type WeatherAPI = {
	city: {
		name: string,
	};
	list: WeatherItem[];
}

const fetch = (
	coords: Coords,
	callback: (response: WeatherAPI) => void
): void => {
	let url = 'https://api.openweathermap.org/data/2.5/forecast?';
	const params = [];
	params.push(`appid=${process.env.REACT_APP_API_KEY}`);
	params.push(`lat=${coords.latitude}`);
	params.push(`lon=${coords.longitude}`);
	params.push('cnt=10');
	params.push('units=metric');
	params.push('lang=ja');
	url += params.join('&');

	const xhr = new XMLHttpRequest();
	xhr.open('POST', url);
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

const convert = (obj: WeatherItem): ConvertedItem => {
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

export {fetch, convert, Coords, ConvertedItem, WeatherAPI};