import { useState, useEffect } from "react";
import axios from "axios";

export default function Fib() {
	const [seenIndexes, setSeenIndexes] = useState([]);
	const [values, setValues] = useState({});
	const [index, setIndex] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		fetchValues();
		fetchIndexes();
	}, []);

	const fetchValues = async () => {
		const values = await axios.get("/api/values/current");
		setValues(values.data);
	};

	const fetchIndexes = async () => {
		const previousIndexes = await axios.get("/api/values/all");
		setSeenIndexes(previousIndexes.data);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!index || index > 40 || index < 0) {
			setError("You must enter a number between 0 and 40...");

			return;
		}

		await axios.post("/api/values", {
			index,
		});

		// Temporary expensive operation that needs
		// to be improved in the following commits
		fetchValues();
		fetchIndexes();

		setIndex("");
	};

	const renderSeenIndexes = seenIndexes.map(({ number }) => number).join(", ");
	const renderValues = () => {
		const entries = [];
		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key} I calculated {values[key]}
				</div>
			);
		}

		return entries;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Enter your index</label>
				<input
					type="number"
					value={index}
					onChange={(event) => setIndex(event.target.value)}
				/>
				<button>Submit</button>
				{error && <p className="text-red">{error}</p>}
			</form>

			<h3>Indexes I have seen: </h3>
			{renderSeenIndexes}

			<h3>Calculated values: </h3>
			{renderValues()}
		</div>
	);
}
