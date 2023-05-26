import './Header.css';

function Header() {
	return (
		<header>
			<h1>天気予報</h1>
			<img src={`${process.env.PUBLIC_URL}/img/img_nyan.png`} alt="にゃんこ" />
		</header>
	);
}

export default Header;
