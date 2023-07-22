import logo from "./logo.svg";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Get your Fib</h1>
				<Link to="/">home</Link>
				<Link to="/otherpage">Other Page</Link>
			</header>
			<Outlet />
		</div>
	);
}
