import './Loading.css';
import img_loading from './img_loading.gif';

function Loading(props) {
	return (
		<div className={props.isLoading ? 'loading is-active' : 'loading'}>
			<img src={img_loading} alt="読み込み中" />
		</div>
	);
}

export default Loading;
