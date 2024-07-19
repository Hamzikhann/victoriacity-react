import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { toast } from "react-toastify";

const InverifiedTransaction = () => {
	const [totalPage, setTotalPage] = useState(1);
	const [installmentReceipts, setInstallmentReceipts] = useState([]);
	const [updatedReceipts, setUpdatedReceipts] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	// console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", selectedRowKeys);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [loading, setloading] = useState(false);
	const [PDF, setPDF] = useState(null);

	const options = [
		{ value: "Father", label: "Father" },
		{ value: "Husband", label: "Husband" },
		{ value: "Mother", label: "Mother" },
		{ value: "Sibiling", label: "Sibiling" },
		{ value: "Nephew", label: "Nephew" },
		{ value: "Neice", label: "Neice" },
		{ value: "Grand Son", label: "Grand Son" },
		{ value: "Grand Daughter", label: "Grand Daughter" },
		{ value: "Grand MOther", label: "Grand MOther" },
		{ value: "Grand Father", label: "Grand Father" },
		{ value: "Uncle", label: "Uncle" },
		{ value: "N/A", label: "N/A" }
	];

	const columns = [
		{
			title: (
				<input
					type="checkbox"
					checked={selectedRowKeys?.length == installmentReceipts?.map((item) => item.INS_RC_ID)?.length}
					onChange={(e) => {
						const isChecked = e.target.checked;
						setSelectedRowKeys(() => {
							if (isChecked) {
								return installmentReceipts.map((item) => item.INS_RC_ID);
							} else {
								return setSelectedRowKeys([]);
							}
						});
					}}
				/>
			),
			dataIndex: "select",
			render: (_, record) => (
				<input
					type="checkbox"
					id="mycheckbox"
					checked={selectedRowKeys.includes(record.INS_RC_ID)}
					onChange={(event) => {
						const isChecked = event.target.checked;
						setSelectedRowKeys((prevSelectedRowKeys) => {
							if (isChecked) {
								return [...prevSelectedRowKeys, record.INS_RC_ID];
							} else {
								return prevSelectedRowKeys.filter((key) => key !== record.INS_RC_ID);
							}
						});
					}}
				/>
			)
		},

		{
			title: "Transaction ID",
			dataIndex: "INS_RC_ID",
			sorter: (a, b) => a.id - b.id
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
		},
		{
			title: "Transaction Date",
			dataIndex: "IRC_Date",
			sorter: (a, b) => a.IRC_Date.length - b.IRC_Date.length
			// render: (text, record) => (
			//     <div >
			//         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
			//     </div>
			// ),
		},
		{
			title: "Payee Name",
			dataIndex: "Member",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.BuyerName}</span>;
			},
			sorter: (a, b) => a.MEMBER_ID.length - b.MEMBER_ID.length
		},
		{
			title: "Booking Reg No",
			dataIndex: "BK_Reg_Code",
			sorter: (a, b) => a.BK_Reg_Code.length - b.BK_Reg_Code.length
		},

		{
			title: "Payment Mode",
			dataIndex: "Payment_Mode",
			sorter: (a, b) => a.Payment_Mode?.length - b.Payment_Mode?.length,
			render: (text, record) => <div>{text?.Description || ""}</div>
		},
		{
			title: "Amount",
			dataIndex: "Installment_Paid",
			sorter: (a, b) => a.Installment_Paid.length - b.Installment_Paid.length
		},
		{
			title: "Instrument No",
			dataIndex: "INSTRUMENT_NO",
			sorter: (a, b) => a.INSTRUMENT_NO.length - b.INSTRUMENT_NO.length
			// render: (text, record) => (
			//     <div >
			//         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
			//     </div>
			// ),
		},
		{
			title: "Receipt Head",
			dataIndex: "RECEIPT_HEAD",
			sorter: (a, b) => a.contact.length - b.contact.length
		},
		{
			title: "Option",
			render: (text, record) => {
				// console.log(
				//   "iiiiiiiiiiiiiii",
				//   text.relation,
				//   options.find((item) => item.label === text.relation)
				// );
				return (
					<div className="dropdown dropdown-action text-end">
						<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="material-icons">more_vert</i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							{/*<Link*/}
							{/*to="/"*/}
							{/*className="dropdown-item"*/}
							{/*data-bs-toggle="modal"*/}
							{/*data-bs-target="#edit_member"*/}
							{/*onClick={() => {*/}
							{/*setPDF(record.INS_RC_ID);*/}
							{/*setTimeout(() => {*/}
							{/*UnverifiedTransactionReciept();*/}
							{/*}, 2000);*/}
							{/*// setQuery(text.BK_ID);*/}
							{/*}}*/}
							{/*>*/}
							{/*<i className="fa fa-download m-r-5" /> Download Receipt*/}
							{/*</Link>*/}
							{/*<Link*/}
							{/*to="/"*/}
							{/*className="dropdown-item"*/}
							{/*data-bs-toggle="modal"*/}
							{/*data-bs-target="#delete_member"*/}
							{/*onClick={() => {*/}
							{/*setQuery(text.id)*/}
							{/*}}*/}
							{/*>*/}
							{/*<i className="fa fa-trash-o m-r-5"/> Delete*/}
							{/*</Link>*/}
						</div>
					</div>
				);
			}
		}
	];

	const getAllInvarifiedTransactions = (page) => {
		Axios.get(baseApiUrl + "installmentReceipts/unVarified/list?page=" + page)
			.then((res) => {
				setInstallmentReceipts(res.data.InstallmentReceipts);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const UnverifiedTransactionReciept = () => {
		Axios.put(baseApiUrl + `/installmentReceipts/unVarified/pdf`, {
			checkedIds: selectedRowKeys
		})
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					// setRedirectUrl(res.data.file.url);
					// console.log("XXDDDDDD",res.data)
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));

		// setRedirectUrl(null);
	};

	const UnverifiedTransactionByUsers = () => {
		Axios.put(baseApiUrl + `installmentReceipts/unVarifiedByUsers/pdf`, {
			checkedIds: selectedRowKeys
		})
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					// setRedirectUrl(res.data.file.url);
					// console.log("XXDDDDDD",res.data)
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));

		// setRedirectUrl(null);
	};

	useEffect(() => {
		getAllInvarifiedTransactions();
		// UnverifiedTransactionSection();
		setCurrentUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		getAllInvarifiedTransactions(pagination.current);
	};

	function handleSubmitVerify(e) {
		e.preventDefault();

		if (confirm("Are you sure you want to verify?")) {
			setloading(true);
			if (selectedRowKeys.length === 0) {
				setloading(false);
				return toast.error("Please select a row to verify");
			}

			Axios.put(baseApiUrl + "/installmentReceipts/unVarified/update", {
				checkedIds: selectedRowKeys
			})
				.then((res) => {
					setloading(false);
					getAllInvarifiedTransactions();
					setSelectedRowKeys([]);
					toast.success(res.data.message);
				})

				.catch((err) => {
					setloading(false);
					toast.error(err.response.data.message);
				});
		}
	}
	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Unverified Installments - Sheranwala</title>
				{/* <meta name="description" content="Login page" /> */}
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Un-Verify Installments</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Un-Verify Installments</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							{loading ? (
								<button type="submit" disabled={true} className="btn btn-primary submit-btn">
									<div className="spinner-border text-warning" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</button>
							) : (
								<>
									{currentUser && currentUser.role === "Admin" && (
										<button
											type="button"
											className="btn add-btn button"
											disabled={selectedRowKeys.length == 0 ? true : false}
											onClick={handleSubmitVerify}
										>
											<i className="" /> Verify
										</button>
									)}

									<button
										type="button"
										disabled={selectedRowKeys.length == 0 ? true : false}
										className="btn add-btn button"
										style={{ marginRight: 10 }}
										onClick={() => {
											setPDF("");
											setTimeout(() => {
												UnverifiedTransactionReciept();
											}, 2000);
										}}
									>
										<i className="fa fa-download m-r-5" /> Download PDF
									</button>
									<button
										type="button"
										className="btn add-btn button"
										style={{ marginRight: 10 }}
										onClick={() => {
											setPDF("");
											setTimeout(() => {
												UnverifiedTransactionByUsers();
											}, 2000);
										}}
									>
										<i className="fa fa-download m-r-5" /> Download Payment Wise PDF
									</button>
								</>
							)}
						</div>
					</div>
				</div>
				{/* /Page Header */}

				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								// rowSelection={{
								//   selectedRowKeys,
								//   onChange: (selectedRowKeys) => {
								//     console.log("XXXXXX",selectedRowKeys)
								//     setSelectedRowKeys(selectedRowKeys);
								//   },
								//   type: "checkbox", // This ensures only one checkbox can be selected
								// }}

								className="table-striped"
								pagination={{
									defaultPageSize: 25,
									total: (totalPage - 1) * 25,
									// total: booking?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								bordered
								dataSource={installmentReceipts}

								// rowKey={(record) => console.log("fffffffffffffffd44444",record.INS_RC_ID)}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Page Content */}
		</div>
	);
};

export default InverifiedTransaction;
