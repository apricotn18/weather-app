import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/reset.css';
import './assets/common.css';
import Home from './Home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<div className="wrap">
		<Header />
		<Home />
		<Footer />
	</div>
);
