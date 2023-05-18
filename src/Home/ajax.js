const ajax = (position, callback) => {
	new Promise((resolve, reject) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?appid=dd64b46ea595c4104e0881953cb4e287&lat=${position.latitude}&lon=${position.longitude}&cnt=10&units=metric&lang=ja`;
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				callback(JSON.parse(xhr.response));
			}
			if (xhr.status !== 200) {
				reject();
			}
		};
	}).catch(() => {
		alert('データを取得できませんでした');
	});
};

export default ajax;