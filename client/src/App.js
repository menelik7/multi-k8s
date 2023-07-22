import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Header />,
		children: [
			{
				path: "",
				element: <Fib />,
			},
			{
				path: "otherpage",
				element: <OtherPage />,
			},
		],
	},
]);

function App() {
	return (
		<div className="container">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
