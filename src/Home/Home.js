import {useState, useEffect} from 'react';
import './Home.css';
import ajax from './ajax';
import areaList from './area.json';
import img_loading from './img_loading.gif';

function Home() {
	const [list, setList] = useState([]);
	const [city, setCity] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isOpened, setIsOpened] = useState(false);

	const callback = (res) => {
		setList(res.list);
		setCity(res.city.name);
		setIsLoading(false);
	};

	useEffect(() => {
		// 現在地の位置情報の許可
		navigator.geolocation.getCurrentPosition(
			(pos) => { // 成功
				ajax({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}, (res) => callback(res))
			},
			() => { // 失敗（東京都千代田区丸の内で取得）
				ajax({
					latitude: 35.68036537,
					longitude: 139.77166874,
				}, (res) => callback(res))
			}
		);
	}, []);

	return (
		<main>
			<div className="place">
				<p className="change"><span>都道府県別の天気予報に変更</span></p>
				<h2 className="city">{city}</h2>
			</div>
			{/* <div className="info">
				<p>
					現在の天気：{list[0].description}
					<span className="temp">{list[0].temperature}</span>°C
				</p>
				<div className="icon"><img src={`${process.env.PUBLIC_URL}/weather/${list.weather[0].icon}.svg`} alt="天気" /></div>
			</div> */}
			<table>
				<tbody>
					{list.map((item, i) => {
						if (i !== 0) {
							const dateTime = new Date(item.dt * 1000);
							const obj = {
								month: dateTime.getMonth() + 1,
								date: dateTime.getDate(),
								hours: dateTime.getHours(),
								min: String(dateTime.getMinutes()).padStart(2, '0'),
								temperature: Math.round(item.main.temp),
								description: item.weather[0].description,
								iconPath: `${process.env.PUBLIC_URL}/weather/${item.weather[0].icon}.svg`,
							}
							return (
								<tr key={i}>
									<td className="info">
										{obj.month}/{obj.date}<br />
										{obj.hours}:{obj.min}
									</td>
									<td className="icon"><img src={obj.iconPath} alt="天気" /></td>
									<td><span className="description">{obj.description}</span></td>
									<td><span className="temp">{obj.temperature}°C</span></td>
								</tr>
							)
						}
					})}
				</tbody>
			</table>

			<div className={isOpened ? 'overflow' : 'overflow is-hidden'}>
				<div className="overflow_wrap"></div>
				<div className="overflow_inner">
					<h3>
						都道府県を選択してください
						<button type="button" className="overflow_close"></button>
					</h3>
					<ul className="area">
						{areaList.map((item, i) => {
							return (
								<li key={i} data-coord={item.coord}>{item.area}</li>
							)
						})}
					</ul>
				</div>
			</div>

			<div className={isLoading ? 'loading' : 'loading is-hidden'}>
				<img src={img_loading} alt="読み込み中" />
			</div>
		</main>
	);
}

export default Home;
