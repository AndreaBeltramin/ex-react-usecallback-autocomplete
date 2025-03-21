import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState([]);
	useEffect(() => {
		if (!search.trim()) {
			setQuery([]);
			return;
		}
		fetch(
			`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return setQuery(data);
			})
			.catch((error) => console.error(error));
	}, [search]);

	return (
		<div>
			<h1>Ricerca il prodotto:</h1>
			<input
				type="text"
				placeholder="Cerca un prodotto..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="container">
				{query.length > 0 && (
					<ul>
						{query.map((product) => (
							<li key={product.id}>{product.name}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
