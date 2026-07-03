import React, {useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import './Home.css';
import * as api from '../assets/api';
import AREA_LIST from '../assets/area.json';

type Coords = api.Coords;
type ConvertedItem = api.ConvertedItem;
type WeatherAPI = api.WeatherAPI;

function Home() {
	// 座標
	const [coords, setCoords] = useState<Coords>({
		latitude: '',
		longitude: '',
	});
	// 都市名
	const [city, setCity] = useState<string>('');
	// 現在の天気
	const [current, setCurrent] = useState<ConvertedItem>();
	// 今後の天気リスト
	const [list, setList]= useState<ConvertedItem[]>([]);
	// ローディングの表示制御
	const [isLoading, setLoading] = useState<boolean>(true);
	// 都道府県リストの表示制御
	const [isOverflow, setOverflow] = useState<boolean>(false);
	// 初期表示の制御
	const [isInit, setInit] = useState<boolean>(true);

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
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setCoords({
					latitude: String(pos.coords.latitude),
					longitude: String(pos.coords.longitude)
				});
			},
			() => {
				setCoords({
					latitude: '35.68944',
					longitude: '139.69167',
				});
			}
		);
		setInit(false);
	}, []);

	useEffect(() => {
		if (isInit) return;

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
			setCity(res.city.name);
			setList(result);
			setLoading(false);
		}, () => {
			setLoading(false);
		});
	}, [coords]);

	return (
		<main>
			<div className="place">
				<h2 className="city">{city}</h2>
				<button className="popup" onClick={changeActiveOverflow}><span>都道府県を変更する</span></button>
			</div>
			<div className="now">
				<div className="now_main">
					<p className="now_description">{current ? current.description : ''}</p>
					<p className="now_temp">{current ? current.temperature : ''}<span>°C</span></p>
				</div>
				<div className="now_icon"><img src={current ? current.iconPath : ''} alt="天気" /></div>
			</div>
			<ul className="forecast">
				{list.map((item, i) => {
					return(
						<li key={i}>
							<span className="forecast_date">
								{item ? item.month : ''}/{item ? item.date : ''}<br />
								{item ? item.hours : ''}:{item ? item.min : ''}
							</span>
							<span className="forecast_icon"><img src={item ? item.iconPath : ''} alt="天気" /></span>
							<span className="forecast_description">{item ? item.description : ''}</span>
							<span className="forecast_temp">{item ? item.temperature : ''}°C</span>
						</li>
					)
				})}
			</ul>

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
