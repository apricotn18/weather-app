import React from 'react';
import './Loading.css';

type Props = {
	isLoading: boolean;
}

function Loading(props: Props) {
	return (
		<div className={props.isLoading ? 'loading is-active' : 'loading'}>
			<img src={`${process.env.PUBLIC_URL}/img/img_loading.gif`} alt="読み込み中" />
		</div>
	);
}

export default Loading;
