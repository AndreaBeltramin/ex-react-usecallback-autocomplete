import { useState, useEffect, useCallback } from "react";
import "./App.css";

// funzione debounce generica definita fuori dal componente
function debounce(callback, delay) {
	let timer;
	return (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(value);
		}, delay);
	};
}

function App() {
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState([]);

	const fetchApi = useCallback(
		debounce((search) => {
			if (!search.trim()) {
				setQuery([]);
				return;
			}
			fetch(
				`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log("Api call");
					return setQuery(data);
				})
				.catch((error) => console.error(error));
		}, 1000),
		[]
	);

	useEffect(() => {
		fetchApi(search);
	}, [search]);

	return (
		<div>
			<h1>Ricerca un prodotto:</h1>
			<input
				className="input"
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
