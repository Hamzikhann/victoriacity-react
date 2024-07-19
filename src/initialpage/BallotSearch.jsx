import React, { useState } from "react";
import axios from "axios";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { result } from "lodash";

const BallotSearch = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSearch = async () => {
		if (!query) return;

		setLoading(true);
		setError("");

		try {
			// Replace with your API endpoint and update accordingly
			const payload = {
				cnic: query
			};
			const response = await axios.post(`http://localhost:8000/api/ballot`, payload);
			console.log(response);
			setResults(response.data.data);
		} catch (err) {
			setError("An error occurred while fetching data.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={styles.container}>
			<div className="account-logo">
				<img src={Applogo} alt="Dreamguy's Technologies" />
			</div>
			<div style={styles.formGroup}>
				{/* <label htmlFor="floatingInput" style={styles.label}>
					Search
				</label> */}
				<input
					type="text"
					className="form-control"
					id="floatingInput"
					placeholder="Search By Entering CNIC #"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					style={styles.input}
				/>
			</div>
			<span style={{ color: "red", fontWeight: "bold", marginTop: "10px", marginBottom: "10px", display: "block" }}>
				Note: please enter the CNIC number properly with the dashes otherwise you will not see your result
			</span>
			<button className="btn btn-primary" onClick={handleSearch} style={styles.button}>
				Search
			</button>

			{loading && <p style={styles.message}>Loading...</p>}
			{error && <p style={styles.message}>{error}</p>}
			<div style={styles.results}>
				{results.length > 0 ? (
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Client Name</th>
								<th scope="col">CNIC #</th>
								<th scope="col">VC #</th>
								<th scope="col">Unit Type</th>
								<th scope="col">Plot Size</th>
								<th scope="col">Phase</th>
								<th scope="col">Sector</th>
								<th scope="col">Plot_No</th>
								<th scope="col">Block</th>
								<th scope="col">Location</th>
							</tr>
						</thead>

						<tbody>
							{results.map((result, index) => (
								<tr>
									<th scope="row">{index + 1}</th>
									<td>{result.Member.BuyerName}</td>
									<td>{result.Member.BuyerCNIC}</td>
									<td>{result.Reg_Code_Disply}</td>
									<td>{result.UnitType.Name}</td>
									<td>{result.PlotSize.Name}</td>
									<td>{result.Phase.NAME}</td>
									<td>{result.Sector.NAME}</td>
									<td>{result.Unit ? result.Unit.Plot_No : ""}</td>
									<td>{result.Unit ? result.Unit.Block.Name : ""}</td>
									<td>{result.Location ? result.Location.Plot_Location : ""}</td>
								</tr>
							))}
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

export default BallotSearch;
