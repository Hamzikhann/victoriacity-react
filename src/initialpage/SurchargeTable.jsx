import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table, Input, Tag, Space } from "antd";
import { Helmet } from "react-helmet";

const SurchargeTable = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [surchargeData, setSurchargeData] = useState([]);
	const [totalPage, setTotalPage] = useState(1); // To handle pagination
	const columns = [
		{
			title: "Actions",
			render: (text, record, index) => (
				<div className="dropdown">
					<button
						className="btn btn-light dropdown-toggle"
						type="button"
						id={`dropdownMenuButton-${index}`}
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i className="bi bi-three-dots"></i>
					</button>
					<ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
						<li>
							<button className="dropdown-item" onClick={() => getSurchargePdf(record.SC_ID, record.BK_ID)}>
								<i className="fa fa-download m-r-5"></i> Download PDF
							</button>
						</li>
					</ul>
				</div>
			)
		},
		{
			title: "Serial#",
			render: (text, record, index) => <span>{index + 1}</span>
		},
		{
			title: "Total Surcharges",
			dataIndex: ["Booking", "totalSurcharges"],
			render: (text) => text
		},
		{
			title: "Remaining Surcharges",
			dataIndex: ["Booking", "remainingSurcharges"],
			render: (text) => text
		},
		{
			title: "Paid Surcharges",
			dataIndex: ["Booking", "paidSurcharges"],
			render: (text) => text
		},
		// {
		// 	title: "Surcharge Paid",
		// 	dataIndex: "amount",
		// 	render: (text) => text
		// },
		{
			title: "Wave Off",
			dataIndex: "waveOff",
			render: (text) => text
		},
		{
			title: "Paid At",
			dataIndex: "paidAt",
			render: (text) => (text === null ? "NILL" : text)
		},
		{
			title: "VC_NO",
			dataIndex: ["Booking", "Reg_Code_Disply"],
			render: (text) => text
		},
		// {
		// 	title: "BK_ID",
		// 	dataIndex: "BK_ID",
		// 	render: (text) => text
		// },
		{
			title: "Name",
			dataIndex: ["Booking", "Member", "BuyerName"],
			render: (text) => text
		}
	];

	const fetchSurchargeData = async () => {
		try {
			const response = await axios
				.get(baseApiUrl + "/surcharge/list")
				.then((res) => {
					const formattedData = res.data.data.map((item) => ({
						...item,
						paidAt: item.paidAt.slice(0, 10) // Keep only 'YYYY-MM-DD' format for paidAt
					}));

					setSurchargeData(formattedData);
					setTotalPage(response.data.legth);
				})
				.catch((error) => {
					// res.send({
					// 	message: "Error fetching Surcharge list.",
					// 	data: error
					// });
				});
		} catch (error) {
			// res.send({
			// 	message: "Surcharge List Not Found.",
			// 	data: error
			// });
		}
	};

	const getSurchargePdf = async (scid, bkid) => {
		try {
			const surchargePdf = await axios
				.post(baseApiUrl + "/surcharge/pdf", { scid, bkid })
				.then((res) => {
					if (res) {
						window.open(res.data.file.url, "_blank");
					}
				})
				.catch((error) => {
					res.send({
						message: "Error creating Surcharge PDF.",
						data: error
					});
				});
		} catch (error) {
			res.send({ message: "Surcharge PDF Not Created.", data: error });
		}
	};
	const onShowSizeChange = (current, size) => {
		console.log("Page size changed to: ", size);
	};

	const itemRender = (current, type, originalElement) => {
		if (type === "prev") {
			return <a>Previous</a>;
		}
		if (type === "next") {
			return <a>Next</a>;
		}
		return originalElement;
	};

	const handleTableChange = (pagination, filters, sorter) => {
		console.log("Table changed", pagination, filters, sorter);
		// Handle pagination, filtering, sorting here
	};
	console.log("REsponseeeSurcharge", surchargeData);

	useEffect(() => {
		fetchSurchargeData();
	}, []);

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Surcharge - Sheranwala</title>
				{/*<meta name="description" content="Login page"/>*/}
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Surcharge</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Surcharge</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								style={{ width: "100%" }}
								onChange={(e) => {
									// setBkRegCode(e.target.value);
									// getAllTransactionbyBkReg(e.target.value);
								}}
								placeholder="Search By Reg Code Display"
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									defaultPageSize: 25,
									total: totalPage * 25,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								bordered
								dataSource={surchargeData}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SurchargeTable;
