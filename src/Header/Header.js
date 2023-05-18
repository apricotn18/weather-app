import './Header.css';
import img_nyan from './img_nyan.png';

function Header() {
	return (
		<header>
			<h1>天気予報</h1>
			<img src={img_nyan} alt="にゃんこ" />
		</header>
	);
}

export default Header;
