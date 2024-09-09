import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import { BsFillPencilFill } from "react-icons/bs";
import InputMask from "react-input-mask";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CreateTransaction = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const history = useHistory();

	const [successAlert, setSuccessAlert] = useState(false);
	const [filteredData, setFilteredData] = useState(null);
	const [plans, setPlans] = useState([]);
	const [developmentCharges, setDevelopmentCharges] = useState([]);
	const [planTypes, setPlanTypes] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [transaction, setTransaction] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setloading] = useState(false);
	const [detailId, setDetailId] = useState("");
	const [detailIds, setDetailIds] = useState([]);
	const [amount, setAmount] = useState(0);
	const [waveOffNo, setWaveOffNo] = useState(0);

	const [BKObj, setBKObj] = useState(null);
	const [paymentMode, setPaymentMode] = useState([]);
	const [ndcFee, setNdcFee] = useState([]);
	const [taxPayee, setTaxPayee] = useState([]);
	const [taxTag, setTaxTag] = useState([]);
	const [transferFee, setTransferFee] = useState([]);

	const [instrumentDetails, setInstrumentDetails] = useState(false);
	const [ndcCash, setNdcCash] = useState(false);
	const [selectedReceiptHead, setSelectedReceiptHead] = useState(null);
	const [showNdcFeeSelect, setShowNdcFeeSelect] = useState(false); // New state for the NDC Fee select
	const [showProcessingFeeSelect, setShowProcessingFeeSelect] = useState(false); // New state for the NDC Fee select
	const [showWaveOffNo, setShowWaveOffNo] = useState(false);

	let { ndcfee = 0 } = useQuery();

	const options = [
		{ value: "cash", label: "Cash" },
		{ value: "payorder", label: "Pay Order" }
	];
	//waveoff% /input field
	const receipt_options = [
		{ value: "installments", label: "Installments" },
		{ value: "development_charges", label: "Development Charges" },
		{ value: "processing_fee", label: "File Processing Fee" },
		{ value: "transfer_fee", label: "File Transfer Fee" },
		{ value: "transfer_tax", label: "File Transfer Tax" },
		{ value: "ndc_fee", label: "NDC Fee" },
		{ value: "surCharges", label: "Sur Charges" },
		{ value: "other_misc", label: "Other/MISC" }
	];

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const getAllpaymentMode = () => {
		Axios.get(baseApiUrl + "paymentMode/list")
			.then((res) => {
				setPaymentMode([]);
				res.data.PaymentMode.map((item) => {
					setPaymentMode((prev) => [...prev, { label: item.Description, value: item.PMID }]);
				});
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const getAllNdcFee = () => {
		Axios.get(baseApiUrl + "ndcCharges/list")
			.then((res) => {
				setNdcFee([]);
				res.data?.data
					.filter((item) => item.IsActive !== false) // Filter out inactive items
					.map((item) => {
						setNdcFee((prev) => [...prev, { label: item.Name, value: item.NDC_ID, amount: item.Fee_Amt }]);
					});
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const getAllTaxPayee = () => {
		Axios.get(baseApiUrl + "taxPayee/list")
			.then((res) => {
				res.data?.TaxPayeeCategorys.map((item) => {
					setTaxPayee((prev) => [...prev, { label: item.Name, value: item.TPC_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const getAllTaxTag = () => {
		Axios.get(baseApiUrl + "taxTag/list")
			.then((res) => {
				res.data?.TaxTags.map((item) => {
					setTaxTag((prev) => [...prev, { label: item.Name, value: item.TT_ID, Amount: item.Amount }]);
				});
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const getAllTransferFee = () => {
		Axios.get(baseApiUrl + "transferFee/list")
			.then((res) => {
				if (res.data.status == 200) {
					setTransferFee(res.data.transferFee);
				}
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const handleSearch = (event) => {
		// setDetailId(searchTerm);

		Axios.get(baseApiUrl + "file/getBookingByCode?code=" + searchTerm)
			.then((res) => {
				setFilteredData(res.data);
				setAmount(res.data?.bkDetailObj?.Installment_Due);
				setPlans(res.data.files);
				setDevelopmentCharges(res.data.dcFiles);
				setSuccessAlert(false);
				setPlanTypes(res.data.types);
				setShowAlert(false);
			})
			.catch((err) => {
				// console.log(err.response.data.message)
				setFilteredData(null);
				setSuccessAlert(false);
				setShowAlert(true);
			});
		// setSearchTerm(event.target.value);
	};

	useEffect(() => {
		getAllpaymentMode();
		let url = window.location.href;

		if (url && url.split("=") && url.split("=")[1]) {
			setDetailId(url.split("=")[1]);

			Axios.get(baseApiUrl + "file/getBookingByCode?id=" + url.split("=")[1])
				.then((res) => {
					if (res.data?.bkDetailObj) {
						// console.log("sdfdf");
						setAmount(res.data?.bkDetailObj?.Installment_Due);
					} else {
						// console.log('res123',res.data.file.find(item => item.BKI_DETAIL_ID == (url.split('=')[1])));
						let findDetailObj = res.data.files.find((item) => item.data.BKI_DETAIL_ID == url.split("=")[1]);

						let RemainingAmt =
							parseFloat(findDetailObj?.data.Installment_Due) - parseFloat(getSumPaidAmt(findDetailObj));
						// console.log('(findDetailObj?.id)',(url.split('=')[1]));
						// console.log('(findDetailObj?.Installment_Due)',(findDetailObj.Installment_Due));
						// console.log('(RemainingAmt)',(RemainingAmt));
						// console.log('(findDetailObj)',(findDetailObj));
						// console.log('getSumPaidAmt(findDetailObj)',getSumPaidAmt(findDetailObj));
						setAmount(RemainingAmt);
					}

					// console.log('sd',res.data.file);
					setFilteredData(res.data);
					setPlans(res.data.files);
					setDevelopmentCharges(res.data.dcFiles);

					setSuccessAlert(false);
					setPlanTypes(res.data.types);
					setShowAlert(false);
				})
				.catch((err) => {
					setFilteredData(null);
					setSuccessAlert(false);
					setShowAlert(true);
				});
		}
	}, []);

	const deleteTransactionById = (id) => {
		Axios.delete(baseApiUrl + `member/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					// console.log("Deleted Successfully");
				}
				console.log({ dataIndex: "id" }, "dfnsfknksd");
			})
			.catch((err) => console.log(err.response.data));
		// console.log(member)
	};

	const handleChangePackage = (event, value, setFieldValueO) => {
		if (event.target.checked) {
			let dueAmt = parseFloat(value.data.Installment_Due) - parseFloat(getSumPaidAmt(value));

			if (typeof amount != "undefined") {
				dueAmt = parseFloat(amount) + parseFloat(dueAmt);
			} else {
				dueAmt = parseFloat(dueAmt);
			}

			setAmount(dueAmt);
			setFieldValueO("amount", dueAmt);

			// setDetailIds(...[event.target.id]);
			setDetailIds((prevItems) => [...prevItems, event.target.id]);
		} else {
			let dueAmt = parseFloat(value.data.Installment_Due) - parseFloat(getSumPaidAmt(value));
			setAmount(amount - dueAmt);
			setFieldValueO("amount", amount - dueAmt);
			setDetailIds(detailIds.filter((it) => it != event.target.id));
		}
		// console.log('handleChangePackageID', event.target.id);
		// console.log('handleChangePackage', event.target.value);
		// console.log('handleChangePackage', event.target.checked);
		// console.log('handleChangePackageValue', value);
	};

	useEffect(() => {
		getAllNdcFee();
		getAllTaxPayee();
		getAllTaxTag();
		getAllTransferFee();
	}, []);

	const getSumPaidAmt = (itm) => {
		let sumPaid = 0;

		itm?.obj?.map((item) => {
			sumPaid += parseFloat(item.Installment_Paid);
		});

		return sumPaid;
	};

	// const handleNdcChange = (value) => {
	//   setSelectedNdc(value);

	//   // Check if the selected NDC is "General"
	//   if (value === 'General') {
	//     // Set the amount to a specific value for "General"
	//     setFieldValue('amount', 'General Amount');
	//     // Disable the Amount field
	//     setAmountDisabled(true);
	//   } else {
	//     // Clear the amount and enable the field for other options
	//     setFieldValue('amount', '');
	//     setAmountDisabled(false);
	//   }
	// };

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Transaction - Sheranwala</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Create Transaction</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Transaction</li>
							</ul>
						</div>
					</div>
				</div>
				{/* /Page Header */}

				{!detailId && (
					<div className="row filter-row">
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									value={searchTerm}
									onChange={handleInputChange}
									placeholder="Booking Reg Code"
								/>
							</div>
						</div>

						<div className="col-sm-2 col-md-2">
							<button
								onClick={handleSearch}
								className="btn btn-success btn-block rounded w-100 btn-sm"
								style={{ minHeight: "unset" }}
							>
								{" "}
								Search
							</button>
						</div>
					</div>
				)}

				{/*p = {pPlans && JSON.stringify(pPlans)}*/}
				{/*{filteredData ? JSON.stringify(filteredData):'hello'}*/}
				{filteredData && (
					<Formik
						initialValues={{
							Payee_Name: filteredData?.bkObj?.Member?.BuyerName,
							payment_mode: "",
							receipt_head: "",
							instrument_no: "",
							instrument_details: "",
							instrument_date: "",
							description: "",
							TT_ID: "",
							TPC_ID: "",
							NDC_ID: "",
							buyer_name: "",
							Cnic: "",
							Address: "",
							amount: amount,
							BKI_DETAIL_IDS: detailId ? [detailId] : detailIds,
							BK_ID: filteredData?.bkObj?.BK_ID ? filteredData?.bkObj?.BK_ID : "",
							...filteredData
						}}
						validate={(values) => {
							const errors = {};
							if (!values.amount) {
								errors.CNIC = "Amount is required";
							}

							return errors;
						}}
						onSubmit={async (values, { setSubmitting }) => {
							const formData = {
								BKI_DETAIL_IDS: values.BKI_DETAIL_IDS.length > 0 ? values.BKI_DETAIL_IDS : detailIds,
								BK_ID: values.BK_ID,
								instrument_no: values.instrument_no,
								instrument_details: values.instrument_details,
								instrument_date: values.instrument_date,
								description: values.description,
								amount: values.amount,
								NDC_ID: values.NDC_ID,
								TPC_ID: values.TPC_ID,
								TT_ID: values.TT_ID,
								receipt_head: values.receipt_head,
								payment_mode: values.payment_mode,
								Member_id: filteredData?.bkObj?.Member?.MEMBER_ID,
								buyer_name: values.buyer_name,
								Cnic: values.Cnic,
								Address: values.Address
							};

							const surChargePayload = {
								vcno: searchTerm,
								amount: amount,
								waveOffNo: waveOffNo
							};

							try {
								setloading(true);
								// if recipt sur charges  then this api
								if (values.receipt_head === "surCharges") {
									const res = await Axios.post(baseApiUrl + "pay/surcharges", surChargePayload);
									console.log(res);
									if (res.status == 200) {
										// setPDF(res.data.data.FSRC_ID);
										// getAllFileSubmission();
										setloading(false);
										if (typeof res.data.message == "string" && res.data.message.toLowerCase().includes("not")) {
											toast.error(res.data.message);
										} else if (typeof res.data.message == "string" && res.data.message.toLowerCase().includes("!")) {
											toast.warning(res.data.message);
										} else {
											history.push("/app/administrator/transaction");
											setFilteredData(false);
											setSuccessAlert(true);
											setSubmitting(true);
											toast.success(res.data.message);
											window.open(res.data.file.url, "_blank");
										}
										// setIsShowProjectModal(false);
										// console.log("I'm Try");
									}
									console.log("SurCharge APi Called", surChargePayload);
								} else {
									console.log("SurCharge API Failed");
									const res = await Axios.post(baseApiUrl + "bookingTransaction/add", formData);
									if (res.data.status == 200) {
										// setPDF(res.data.data.FSRC_ID);
										// getAllFileSubmission();
										setloading(false);
										if (typeof res.data.message == "string" && res.data.message.toLowerCase().includes("not")) {
											toast.error(res.data.message);
										} else if (typeof res.data.message == "string" && res.data.message.toLowerCase().includes("!")) {
											toast.warning(res.data.message);
										} else {
											history.push("/app/administrator/transaction");
											setFilteredData(false);
											setSuccessAlert(true);
											setSubmitting(true);
											toast.success(res.data.message);
										}
										// setIsShowProjectModal(false);
										// console.log("I'm Try");
									}
								}
							} catch (err) {
								setloading(false);
								toast.error(err.response.data.message);
							}
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							isSubmitting,
							dirty
							/* and other goodies */
						}) => (
							<form onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label>Payee Name</label>
											<input className="form-control" type="text" disabled={true} value={values.Payee_Name} />
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Payment Mode </label>
											<Select
												placeholder="Select Payment Mode"
												// options={paymentMode}
												options={selectedReceiptHead === "ndc_fee" ? [{ value: "cash", label: "Cash" }] : paymentMode}
												onChange={(value) => {
													setInstrumentDetails(value.label === "Cash" ? true : false);
													setFieldValue("payment_mode", value);
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Instrument No</label>
											<input
												disabled={instrumentDetails}
												className="form-control"
												type="text"
												value={values.instrument_no}
												onChange={(e) => {
													setFieldValue("instrument_no", e.target.value);
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Instrument Details</label>
											<textarea
												disabled={instrumentDetails}
												className="form-control"
												value={values.instrument_details}
												onChange={(e) => {
													setFieldValue("instrument_details", e.target.value);
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Instrument Date</label>
											<input
												disabled={instrumentDetails}
												type="date"
												className="form-control"
												value={values.instrument_date}
												onChange={(e) => {
													setFieldValue("instrument_date", e.target.value);
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Receipt Head</label>
											<Select
												placeholder="Select Receipt Head"
												options={receipt_options}
												onChange={(value) => {
													setAmount(0);
													setFieldValue("amount", 0);
													setFieldValue("receipt_head", value.value);
													setSelectedReceiptHead(value.value);
													setShowNdcFeeSelect(false);

													// Check if the selected option is "ndc_fee" and set the state to show/hide the NDC Fee select
													if (value.value === "ndc_fee") {
														setShowNdcFeeSelect(true);
														setShowProcessingFeeSelect(false); // Hide Processing Fee select
													} else if (value.value === "transfer_tax") {
														setShowProcessingFeeSelect(true);
														setShowNdcFeeSelect(false); // Hide NDC Fee select
													} else if (value.value === "surCharges") {
														setShowWaveOffNo(true);
													} else if (value.value === "transfer_fee") {
														setShowProcessingFeeSelect(false);
														setShowNdcFeeSelect(false); // Hide NDC Fee select
														const psId = filteredData.bkObj.PS_ID;
														const uTypeId = filteredData.bkObj.UType_ID;

														const findFee = transferFee.find((item) => item.PS_ID == psId && item.UType_ID == uTypeId);
														const fee = findFee?.Amount || 0;
														setAmount(fee);
														setFieldValue("amount", fee);
													} else {
														setShowNdcFeeSelect(false);
														setShowProcessingFeeSelect(false);
													}
												}}
											/>
										</div>
									</div>
									{/*{showNdcFeeSelect?'1':'0'}*/}
									{showNdcFeeSelect && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>NDC Fee</label>
												<Select
													placeholder="Select NDC Fee"
													options={ndcFee}
													onChange={(value) => {
														setFieldValue("amount", value.amount);
														setFieldValue("NDC_ID", value.value);
													}}
												/>
											</div>
										</div>
									)}
									{/*{showProcessingFeeSelect && (*/}
									{/*<div className="col-sm-6">*/}
									{/*<div className="form-group">*/}
									{/*<label>NDC Fee</label>*/}
									{/*<Select*/}
									{/*placeholder="Select NDC Fee"*/}
									{/*options={ndcFee}*/}
									{/*onChange={(value) => {*/}
									{/*// setAmount(value.value);*/}
									{/*setFieldValue("NDC_ID", value.value);*/}
									{/*}}*/}
									{/*/>*/}
									{/*</div>*/}
									{/*</div>*/}
									{/*)}*/}

									{showProcessingFeeSelect && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>Tax Tag</label>
												<Select
													placeholder="Select Tax Tag"
													options={taxTag}
													onChange={(value) => {
														// console.log('value',value);
														setFieldValue("amount", value.Amount);
														setAmount(value.Amount);
														setFieldValue("TT_ID", value.value);
													}}
												/>
											</div>
										</div>
									)}
									{showProcessingFeeSelect && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>Tax Payee Category</label>
												<Select
													placeholder="Select Tax Payee"
													options={taxPayee}
													onChange={(value) => {
														// setAmount(value.value);
														setFieldValue("TPC_ID", value.value);
													}}
												/>
											</div>
										</div>
									)}
									{values.TPC_ID == 2 && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>Buyer Name</label>
												<input
													type="text"
													className="form-control"
													// value={values.instrument_date}
													onChange={(e) => {
														setFieldValue("buyer_name", e.target.value);
													}}
												/>
											</div>
										</div>
									)}

									{values.TPC_ID == 2 && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>CNIC</label>
												<InputMask
													className="form-control"
													mask="99999-9999999-9"
													maskChar=" "
													type="text"
													// value={values.instrument_date}
													onChange={(e) => {
														setFieldValue("Cnic", e.target.value);
													}}
												/>
											</div>
										</div>
									)}

									{values.TPC_ID == 2 && (
										<div className="col-sm-12">
											<div className="form-group">
												<label>Address</label>
												<textarea
													type="text"
													className="form-control"
													// value={values.instrument_date}
													onChange={(e) => {
														setFieldValue("Address", e.target.value);
													}}
												/>
											</div>
										</div>
									)}
									<div className="col-sm-6">
										<div className="form-group">
											<label>Description</label>

											<textarea
												className="form-control"
												value={values.description}
												onChange={(e) => {
													setFieldValue("description", e.target.value);
												}}
											/>
										</div>
									</div>

									{values.receipt_head === "installments" && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>Payment Plan</label>

												<div style={{ maxHeight: 200, overflowY: "scroll" }}>
													<table className="table table-bordered">
														<tr>
															<th>Action</th>
															<th>SR#</th>
															<th>Type</th>
															<th>Amount</th>
															<th>Due Date</th>
															<th>Paid Amount</th>
														</tr>

														{/*len = {plans.length}*/}
														{plans &&
															plans.length > 0 &&
															plans.map((it, idx) => (
																<tr>
																	<td>
																		{it.data.InsType_ID != 10 && (
																			<>
																				{typeof window.location.href.split("=")[1] != "undefined" ? (
																					<input
																						type="checkbox"
																						checked={it.data.BKI_DETAIL_ID == detailId ? true : false}
																					/>
																				) : (
																					<input
																						id={it.data.BKI_DETAIL_ID}
																						type="checkbox"
																						name="detailIds[]"
																						onChange={(e) => handleChangePackage(e, it, setFieldValue)}
																						disabled={
																							parseFloat(it.data.Installment_Due) - parseFloat(getSumPaidAmt(it)) <= 0
																								? true
																								: false
																						}
																					/>
																				)}
																			</>
																		)}
																	</td>

																	<td>{idx + 1}</td>
																	<td>
																		{planTypes && planTypes.find((item) => item.InsType_ID == it.data.InsType_ID)?.Name}
																	</td>
																	<td>{it.data.Installment_Due}</td>
																	<td>{it.data.Due_Date}</td>
																	<td>{getSumPaidAmt(it)}</td>
																</tr>
															))}
													</table>
												</div>
											</div>
										</div>
									)}

									{values.receipt_head === "development_charges" && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>Development Charges</label>

												<div style={{ maxHeight: 200, overflowY: "scroll" }}>
													<table className="table table-bordered">
														<tr>
															<th>Action</th>
															<th>SR#</th>
															<th>Type</th>
															<th>Amount</th>
															<th>Due Date</th>
															<th>Paid Amount</th>
														</tr>

														{/*len = {plans.length}*/}
														{developmentCharges &&
															developmentCharges.length > 0 &&
															developmentCharges.map((it, idx) => (
																<tr>
																	<td>
																		{it.data.InsType_ID != 3 && (
																			<>
																				{typeof window.location.href.split("=")[1] != "undefined" ? (
																					<input
																						type="checkbox"
																						checked={it.data.BKI_DETAIL_ID == detailId ? true : false}
																					/>
																				) : (
																					<input
																						id={it.data.BKI_DETAIL_ID}
																						type="checkbox"
																						name="detailIds[]"
																						onChange={(e) => handleChangePackage(e, it, setFieldValue)}
																						disabled={
																							parseFloat(it.data.Installment_Due) - parseFloat(getSumPaidAmt(it)) <= 0
																								? true
																								: false
																						}
																					/>
																				)}
																			</>
																		)}
																	</td>

																	<td>{idx + 1}</td>
																	<td>
																		{/* {planTypes &&
                                      planTypes.find(
                                        (item) =>
                                          item.InsType_ID == it.data.InsType_ID
                                      )?.Name} */}
																		Development Charges
																	</td>
																	<td>{it.data.Installment_Due}</td>
																	<td>{it.data.Due_Date}</td>
																	<td>{getSumPaidAmt(it)}</td>
																</tr>
															))}
													</table>
												</div>
											</div>
										</div>
									)}

									<div className="col-sm-6">
										<div className="form-group">
											<label>Amount</label>
											<input
												className="form-control"
												type="number"
												step="any"
												readOnly={
													detailIds.length > 0 ||
													values.receipt_head == "ndc_fee" ||
													values.receipt_head == "transfer_tax" ||
													values.receipt_head == "transfer_fee"
														? true
														: false
												}
												value={values.amount}
												onChange={(e) => {
													setAmount(e.target.value);
													setFieldValue("amount", e.target.value);
												}}
											/>
										</div>
									</div>
									{showWaveOffNo && (
										<div className="col-sm-6">
											<div className="form-group">
												<label>WaveOff Percent</label>
												<input
													className="form-control"
													type="number"
													step="any"
													readOnly={
														detailIds.length > 0 ||
														values.receipt_head == "ndc_fee" ||
														values.receipt_head == "transfer_tax" ||
														values.receipt_head == "transfer_fee"
															? true
															: false
													}
													value={values.waveOffNo}
													onChange={(e) => {
														setWaveOffNo(e.target.value);
														setFieldValue("waveOffNo", e.target.value);
													}}
												/>
											</div>
										</div>
									)}
								</div>
								<div className="submit-section">
									{loading ? (
										<button type="submit" disabled={true} className="btn btn-primary submit-btn">
											<div className="spinner-border text-warning" role="status">
												<span className="sr-only">Loading...</span>
											</div>
										</button>
									) : (
										<button
											type="submit"
											// onClick={handleSubmit}
											className="btn btn-primary submit-btn"
										>
											Submit
										</button>
									)}
								</div>
							</form>
						)}
					</Formik>
				)}
			</div>
			{/* /Page Content */}

			{/* Create Project Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create Transaction</h5>
						<button type="button" className="close" onClick={() => setIsShowProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>

					<div className="modal-body">
						<Formik
							initialValues={{
								name: "",
								description: "",
								status: "",
								startDate: "",
								endDate: "",
								priority: "",
								customerId: ""
							}}
							validate={(values) => {
								const errors = {};
								if (!values.name) {
									errors.name = " Name is required";
								}
								if (!values.description) {
									errors.description = "Description is required";
								}
								if (!values.startDate) {
									errors.startDate = "Start Date is required";
								}
								if (!values.status) {
									errors.status = "Status is required";
								}
								if (!values.endDate) {
									errors.endDate = "End Date is required";
								}
								if (!values.customerId) {
									errors.customerId = "Customer Id is required";
								}
								if (!values.priority) {
									errors.priority = "Priority is required";
								}
								console.log("errors", errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									name: values.name,
									description: values.description,
									status: values.status,
									startDate: values.startDate,
									endDate: values.endDate,
									priority: values.priority,
									customerId: values.customerId,
									image: values.image
								};
								// console.log("FF", formData);
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};

								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "/project/add", formData, header);
									if (res.data.status == 200) {
										getAllProjects();
										setIsShowProjectModal(false);
										setloading(false);
										toast.success(res.data.message);
									}
								} catch (err) {
									setloading(false);
									toast.error(err.response.data.message);
									// console.log(err.response.data);
								}
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								setFieldValue,
								isSubmitting,
								dirty
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Payee Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("name", e.target.value);
													}}
												/>
												<span className="error">{errors.name && touched.name && errors.name}</span>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Payment Mode <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Payment Mode"
													options={options}
													onChange={(value) => {
														setInstrumentDetails(value.label === "Cash" ? true : false);
														setFieldValue("status", value.value);
													}}
												/>
												<span className="error">{errors.status && touched.status && errors.status}</span>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Instrument No <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("name", e.target.value);
													}}
												/>
												<span className="error">{errors.name && touched.name && errors.name}</span>
											</div>
										</div>
										<Form.Group className="col-sm-6" controlId="exampleForm.ControlTextarea1">
											<div className="form-group">
												<Form.Label className="mb-0">
													Instrument No Details <span className="text-danger">*</span>
												</Form.Label>
												<Form.Control
													disabled={instrumentDetails}
													as="textarea"
													style={{ height: "45px" }}
													rows={3}
													onChange={(e) => {
														setFieldValue("description", e.target.value);
													}}
												/>
												<span className="error">{errors.description && touched.description && errors.description}</span>
											</div>
										</Form.Group>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Receipt Head <span className="text-danger">*</span>
												</label>
												{/* <Select
                          placeholder="Select Receipt Head"
                          options={options}
                          onChange={(value) => {
                            setFieldValue("receiptHead", value.value);
                          }}
                        /> */}

												<input
													className="form-control"
													type="number"
													placeholder="Select Receipt Head"
													disabled={true}
													value={"Receipt Head"}
													onChange={(e) => {
														setFieldValue("receiptHead", e.target.value);
													}}
												/>
												<span className="error">{errors.status && touched.status && errors.status}</span>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Amount <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="number"
													disabled={true}
													value={"0000"}
													onChange={(e) => {
														setFieldValue("name", e.target.value);
													}}
												/>
												<span className="error">{errors.name && touched.name && errors.name}</span>
											</div>
										</div>
										<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
											<Form.Label>
												Description <span className="text-danger">*</span>
											</Form.Label>
											<Form.Control
												as="textarea"
												style={{ height: "200px" }}
												rows={3}
												onChange={(e) => {
													setFieldValue("description", e.target.value);
												}}
											/>
											<span className="error">{errors.description && touched.description && errors.description}</span>
										</Form.Group>
									</div>
									<div className="submit-section">
										{loading ? (
											<button type="submit" disabled={true} className="btn btn-primary submit-btn">
												<div className="spinner-border text-warning" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											</button>
										) : (
											<button
												type="submit"
												// onClick={handleSubmit}
												className="btn btn-primary submit-btn"
											>
												Submit
											</button>
										)}
									</div>
								</form>
							)}
						</Formik>
					</div>

					{/* showAlert && (
              <div className="modal-body">
                <Alert
                  variant="warning"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  No Record Found
                </Alert>
              </div>
            ) */}
				</div>
			</Modal>
			{/* /Create Project Modal */}
			{/* Edit Project Modal */}

			{/* /Edit Project Modal */}
			{/* Delete Project Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Transaction</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteTransactionById(query)}
										>
											Delete
										</button>
									</div>
									<div className="col-6">
										<button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100 cancel-btn">
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Delete Project Modal */}
		</div>
	);
};
export default CreateTransaction;
