import './Loading.css';

function Loading(props) {
	return (
		<div className={props.isLoading ? 'loading is-active' : 'loading'}>
			<img src={`${process.env.PUBLIC_URL}/img/img_loading.gif`} alt="読み込み中" />
		</div>
	);
}

export default Loading;
