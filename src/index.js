import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/reset.css';
import './assets/common.css';
import Home from './Home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className="wrap">
			<Header />
			<Home />
			<Footer />
		</div>
	</React.StrictMode>
);
