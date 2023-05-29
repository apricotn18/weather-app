import React, {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import './Home.css';
import * as api from '../assets/api';
import AREA_LIST from '../assets/area.json';

type Coords = api.Coords;
type ConvertedItem = api.ConvertedItem;
type WeatherAPI = api.WeatherAPI;

function Home() {
	const initCoords = {
		latitude: '35.68944',
		longitude: '139.69167',
	};
	const [coords, setCoords] = useState<Coords>(initCoords); // 座標
	const [city, setCity] = useState<string>('東京都'); // 都市名
	const [current, setCurrent] = useState<ConvertedItem>(); // 現在の天気
	const [list, setList]= useState<ConvertedItem[]>([]); // 今後の天気リスト
	const [isLoading, setLoading] = useState<boolean>(true); // ローディングの表示制御
	const [isOverflow, setOverflow] = useState<boolean>(false); // 都道府県リストの表示制御

	const changeArea = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		setLoading(true);

		const newCoords: string[] | null = e.currentTarget.dataset.coord ? e.currentTarget.dataset.coord.split(',') : null;
		const coord: Coords = newCoords ? {
			latitude: newCoords[0],
			longitude: newCoords[1]
		} : coords;
		const newCity: string = e.currentTarget.textContent || city;
		setCity(newCity);
		setCoords(coord);
	};

	const changeActiveOverflow = (): void => {
		setOverflow(!isOverflow);
		document.body.style.overflow = isOverflow ? '' : 'hidden';
	};

	useEffect(() => {
		// 現在地の位置情報の許可
		navigator.geolocation.getCurrentPosition(
			(pos) => { // 成功
				setCoords({
					latitude: String(pos.coords.latitude),
					longitude: String(pos.coords.longitude)
				});
			},
			() => { // 失敗
				setCoords(initCoords);
			}
		);
	}, []);

	useEffect(() => {
		api.fetch({
			latitude: coords.latitude,
			longitude: coords.longitude
		}, (res: WeatherAPI) => {
			const result: ConvertedItem[] = [];
			res.list.map((item, index) => {
				if (index === 0) {
					setCurrent(api.convert(item));
				}
				result.push(api.convert(item));
			});
			setList(result);
			setLoading(false);
		});
	}, [coords]);

	return (
		<main>
			<div className="place">
				<button className="popup" onClick={changeActiveOverflow}><span>都道府県を変更する</span></button>
				<h2 className="city">{city}</h2>
			</div>
			<div className="info">
				<div>
					現在の天気：{current ? current.description : ''}
					<span className="temp">{current ? current.temperature : ''}</span>°C
				</div>
				<div className="icon"><img src={current ? current.iconPath : ''} alt="天気" /></div>
			</div>
			<table>
				<tbody>
					{list.map((item, i) => {
						return(
							<tr key={i}>
								<td className="info">
									{item ? item.month : ''}/{item ? item.date : ''}<br />
									{item ? item.hours : ''}:{item ? item.min : ''}
								</td>
								<td className="icon"><img src={item ? item.iconPath : ''} alt="天気" /></td>
								<td><span className="description">{item ? item.description : ''}</span></td>
								<td><span className="temp">{item ? item.temperature : ''}°C</span></td>
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
							{AREA_LIST.map((item, i) => {
								return(
									<li key={i}>
										<button type="button" data-coord={item ? item.coord : ''} onClick={changeArea}>{item ? item.area : ''}</button>
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
