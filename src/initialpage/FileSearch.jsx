import React, { useState } from "react";
import axios from "axios";
import { LogoGroup } from "../Entryfile/imagepath.jsx";

const FileSearch = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSearch = async () => {
		if (!query) return;

		setLoading(true);
		setError("");

		try {
			// Replace with your API endpoint and update accordingly
			const payload = {
				card_no: query
			};
			const response = await axios.post(`https://victoriacityportal.com/api/search/file`, payload);
			console.log(response);
			setResults(response.data);
		} catch (err) {
			setError("An error occurred while fetching data.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={styles.container}>
			<div className="account-logo">
				<img src={LogoGroup} alt="Dreamguy's Technologies" />
			</div>
			<div style={styles.formGroup}>
				{/* <label htmlFor="floatingInput" style={styles.label}>
					Search
				</label> */}
				<input
					type="text"
					className="form-control"
					id="floatingInput"
					placeholder="Search By Entering Card #"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					style={styles.input}
				/>
			</div>
			<span style={{ color: "red", fontWeight: "bold", marginTop: "10px", marginBottom: "10px", display: "block" }}>
				Note: please enter the Card# number properly to see your result
			</span>
			<button className="btn btn-primary" onClick={handleSearch} style={styles.button}>
				Search
			</button>

			{loading && <p style={styles.message}>Loading...</p>}
			{error && <p style={styles.message}>{error}</p>}
			<div style={styles.results}>
				{results ? (
					<table className="table ">
						<thead>
							<tr>
								<th scope="col">Sr#</th>
								<th scope="col">Note No</th>
								<th scope="col">Code No</th>
								<th scope="col">Card No</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<th scope="row">{results.Sr}</th>
								<td>{results.Note_No}</td>
								<td>{results.Code_No}</td>
								<td>{results.Card_No}</td>
							</tr>
						</tbody>
					</table>
				) : (
					!loading && <p style={styles.message}>No results found</p>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f5f5f5",
		// margin-top: "20px"
		marginTop: "20px"
	},
	formGroup: {
		marginBottom: "1rem",
		width: "100%",
		maxWidth: "400px"
	},
	input: {
		width: "100%",
		padding: "0.5rem",
		borderRadius: "4px",
		border: "1px solid #ccc"
	},
	label: {
		display: "block",
		marginBottom: "0.5rem"
	},
	button: {
		padding: "0.5rem 1rem",
		borderRadius: "4px"
	},
	results: {
		marginTop: "1rem",
		width: "100%",
		maxWidth: "80%",
		backgroundColor: "#fff",
		borderRadius: "4px",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
		padding: "3rem"
	},
	list: {
		listStyleType: "none",
		padding: 0
	},
	listItem: {
		padding: "0.5rem 0",
		borderBottom: "1px solid #ccc"
	},
	message: {
		marginTop: "1rem",
		color: "#333"
	}
};

export default FileSearch;
