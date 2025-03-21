import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState([]);
	useEffect(() => {
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
				placeholder="Cerca il prodotto"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div>
				{query.map((product) => (
					<div key={product.id}>
						<h1>{product.name}</h1>
						<p>{product.price}</p>
						<p>{product.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
