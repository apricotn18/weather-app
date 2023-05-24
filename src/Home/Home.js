import {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import './Home.css';
import * as api from './api';
import areaList from './area.json';

function Home() {
	// 現在の天気
	const [current, setCurrent] = useState({});
	// 今後の天気リスト
	const [list, setList] = useState([]);
	// 都市名
	const [city, setCity] = useState('');
	// ローディングの表示制御
	const [isLoading, setLoading] = useState(true);
	// 都道府県リストの表示制御
	const [isOverflow, setOverflow] = useState(false);

	const setItem = (item) => {
		const result = [];
		item.list.map((item, index) => {
			if (index === 0) {
				setCurrent(api.convert(item));
			}
			result.push(api.convert(item));
		});
		setList(result);
	};

	const changeArea = (e) => {
		setLoading(true);
		const coord = e.target.dataset.coord.split(',');
		const city = e.target.textContent;

		api.fetch({
			latitude: coord[0],
			longitude: coord[1]
		}, (res) => {
			setItem(res);
			setCity(city);
			setLoading(false);
		});
	};

	const changeActiveOverflow = () => {
		setOverflow(!isOverflow);
		document.body.style.overflow = isOverflow ? '' : 'hidden';
	};

	useEffect(() => {
		// 現在地の位置情報の許可
		navigator.geolocation.getCurrentPosition(
			(pos) => { // 成功
				api.fetch({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}, (res) => setItem(res))
			},
			() => { // 失敗（東京都で取得）
				api.fetch({
					latitude: 35.68944,
					longitude: 139.69167,
				}, (res) => {
					setItem(res);
					setCity(res.city.name);
					setLoading(false);
				});
			},
			() => {
				api.fetch({
					latitude: 35.68036537,
					longitude: 139.77166874,
				}, (res) => {
					setItem(res);
					setCity(res.city.name);
					setLoading(false);
				});
			},
		);
	}, []);

	return (
		<main>
			<div className="place">
				<button className="popup" onClick={changeActiveOverflow}><span>都道府県を変更する</span></button>
				<h2 className="city">{city}</h2>
			</div>
			<div className="info">
				<div>
					現在の天気：{current.description || ''}
					<span className="temp">{current.temperature || ''}</span>°C
				</div>
				<div className="icon"><img src={current.iconPath || ''} alt="天気" /></div>
			</div>
			<table>
				<tbody>
					{list.map((item, i) => {
						return (
							<tr key={i}>
								<td className="info">
									{item.month}/{item.date}<br />
									{item.hours}:{item.min}
								</td>
								<td className="icon"><img src={item.iconPath} alt="天気" /></td>
								<td><span className="description">{item.description}</span></td>
								<td><span className="temp">{item.temperature}°C</span></td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<div className={isOverflow ? 'overflow is-active' : 'overflow'}>
				<div className="overflow_wrap" onClick={changeActiveOverflow}>
					<div className="overflow_inner">
						<div className="overflow_title">
							都道府県を選択してください
							<button type="button" className="overflow_close" onClick={changeActiveOverflow}></button>
						</div>
						<ul className="area">
							{areaList.map((item, i) => {
								return (
									<li key={i}>
										<buttun type="button" className="area_button" data-coord={item.coord} onClick={changeArea}>{item.area}</buttun>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>

			<Loading isLoading={isLoading}></Loading>
		</main>
	);
}

export default Home;
