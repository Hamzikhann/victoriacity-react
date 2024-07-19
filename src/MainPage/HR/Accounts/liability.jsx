import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space, Button } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import { format, isValid } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { clippingParents } from "@popperjs/core";
import { useParams } from "react-router-dom";

const Liability = () => {
	const [loading, setLoading] = useState(false);
	const [totalPage, setTotalPage] = useState(0);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowLiabilityModal, setIsShowLiabilityModal] = useState(false);
	const [isShowPayoffModal, setIsShowPayoffModal] = useState(false);
	const [isShowViewHistoryModal, setIsShowViewHistoryModal] = useState(false);
	const [isShowEditLiabilityModal, setIsShowEditLiabilityModal] = useState(false);
	const [liabilityInitialValues, setLiabilityInitialValuesValues] = useState({
		name: "",
		description: "",
		amount: "",
		balance: ""
	});
	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);
	const [payOffData, setpayOffData] = useState([]);
	const [selectedId, setSelectedId] = useState(data);
	const [payOffInitialValues, setPayOffInitialValues] = useState({
		amount: "",
		liabilityId: selectedId?.id,
		description: "",
		date: ""
	});

	const option1 = [
		{ value: 1, label: "Income", type: "income" },
		{ value: 2, label: "Expense", type: "expense" }
	];

	// console.log("dssavvsddv", selectedId?.id);

	const getLiability = () => {
		Axios.get(baseApiUrl + `/liability/list`)
			.then((res) => {
				setData(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};
	// console.log("1111111111111111111111",data,accountTransaction)

	const getPayOff = (id) => {
		Axios.get(baseApiUrl + `/payOff/liabilityId?id=${id}`)
			.then((res) => {
				setpayOffData(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteLiability = (id) => {
		Axios.delete(baseApiUrl + `liability/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getLiability();
					toast.success(res.data.Message);
				} else {
					toast.success(res.data.Message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	useEffect(() => {
		getLiability();
	}, []);

	const columns = [
		{
			title: "Serial #",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Name",
			dataIndex: "name",
			// render: (text, record) => {
			//   // console.log(text," dfgsdfg ",record)
			//   return <span>{text?.title}</span>;
			// },
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description.length - b.description.length
		},
		{
			title: "Amount",
			dataIndex: "amount",
			sorter: (a, b) => a.amount.length - b.amount.length
		},
		{
			title: "Balance",
			dataIndex: "balance",
			sorter: (a, b) => a.balance - b.balance
			// render: (text, record) => (
			//     <span>{text?.BuyerName}</span>
			// ),
		},
		{
			title: "Action",
			render: (text, record) => {
				return (
					<div className="dropdown dropdown-action text-end">
						<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="material-icons">more_vert</i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#edit_nominee"
								onClick={() => {
									setIsShowPayoffModal(true);
									setSelectedId(text.id);
									//   setPayOffInitialValues({
									//     amount: "",
									//     liabilityId: selectedId?.id || "",
									//   });
								}}
							>
								<i className="fa fa-money m-r-5" /> PayOff
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#edit_nominee"
								onClick={() => {
									setIsShowViewHistoryModal(true);
									getPayOff(text.id);
									// setSelectedId(text.id);
									//   setPayOffInitialValues({
									//     amount: "",
									//     liabilityId: selectedId?.id || "",
									//   });
								}}
							>
								<i className="fa fa-eye m-r-5" /> View History
							</Link>
							{/* <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_member"
                onClick={() => {
                  setQuery(text.id);
                }}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </Link> */}
						</div>
					</div>
				);
			}
		}
	];

	const columns1 = [
		{
			title: "Serial #",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description - b.description
		},
		{
			title: "Amount",
			dataIndex: "amount",
			sorter: (a, b) => a.amount - b.amount
		},
		{
			title: "Date",
			dataIndex: "date",
			sorter: (a, b) => a.date - b.date
		}
	];

	return (
		<>
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<Helmet>
					<title>Liability - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Liabilities</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Accounts</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<p href="#" className="btn add-btn" onClick={() => setIsShowLiabilityModal(true)}>
									<i className="fa fa-plus" />
									Create Liability
								</p>
							</div>
						</div>
					</div>
					{/* /Page Header */}

					<div className="col-md-12">
						<div className="table-responsive">
							<Table
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
								// onChange={handleTableChange}
								size="middle"
								// dataSource={filterTable == null ? booking : filterTable}
								dataSource={data}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
				{/* /Page Content */}

				{/* Create Liability Modal */}
				<Modal show={isShowLiabilityModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Liability</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowLiabilityModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={liabilityInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.amount) {
										errors.amount = "Amount is required";
									}
									if (!values.description) {
										errors.description = "Description is required";
									}
									if (!values.name) {
										errors.name = "Name is required";
									}
									// if (!values.balance) {
									//   errors.balance = "Balance is required";
									// }

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										amount: parseInt(values.amount),
										name: values.name,
										description: values.description,
										balance: values.amount
									};
									try {
										setLoading(true);
										const res = await Axios.post(baseApiUrl + "/liability/add", formData);
										if (res.data.status == 200) {
											getLiability();
											toast.success(res.data.message);
											setLoading(false);
											setIsShowLiabilityModal(false);
										}
									} catch (err) {
										setLoading(false);
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
									isValid
									/* and other goodies */
								}) => {
									return (
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Name
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Name"
															onChange={(e) => {
																setFieldValue("name", e.target.value);
															}}
														/>
														<span className="error">{errors.name && touched.name && errors.name}</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Description
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Description"
															onChange={(e) => {
																setFieldValue("description", e.target.value);
															}}
														/>
														<span className="error">
															{errors.description && touched.description && errors.description}
														</span>
													</div>
												</div>

												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Amount
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Amount"
															onChange={(e) => {
																setFieldValue("amount", e.target.value);
															}}
														/>
														<span className="error">{errors.amount && touched.amount && errors.amount}</span>
													</div>
												</div>
												{/* <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              Balance
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Balance"
                              onChange={(e) => {
                                setFieldValue("balance", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.balance &&
                                touched.balance &&
                                errors.balance}
                            </span>
                          </div>
                        </div> */}
											</div>
											<div className="submit-section">
												{loading ? (
													<button type="submit" disabled={true} className="btn btn-primary submit-btn">
														<div className="spinner-border text-warning" role="status">
															<span className="sr-only">Loading...</span>
														</div>
													</button>
												) : (
													<button type="submit" className="btn btn-primary submit-btn">
														Submit
													</button>
												)}
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</Modal>
				{/* /Edit Modal */}
				<Modal show={isShowEditLiabilityModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Liability</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowEditLiabilityModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={liabilityInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.amount) {
										errors.amount = "Amount is required";
									}
									if (!values.description) {
										errors.description = "Description is required";
									}
									if (!values.name) {
										errors.name = "Name is required";
									}
									if (!values.balance) {
										errors.balance = "Balance is required";
									}

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										amount: parseInt(values.amount),
										name: values.name,
										description: values.description,
										balance: values.balance
									};
									try {
										setLoading(true);
										const res = await Axios.post(baseApiUrl + "liability/add", formData);
										if (res.data.status == 200) {
											getLiability();
											toast.success(res.data.message);
											setLoading(false);
											setIsShowEditLiabilityModal(false);
										}
									} catch (err) {
										setLoading(false);
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
									isValid
									/* and other goodies */
								}) => {
									return (
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Name
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.name}
															placeholder="Name"
															onChange={(e) => {
																setFieldValue("name", e.target.value);
															}}
														/>
														<span className="error">{errors.name && touched.name && errors.name}</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Description
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.description}
															placeholder="Enter Description"
															onChange={(e) => {
																setFieldValue("description", e.target.value);
															}}
														/>
														<span className="error">
															{errors.description && touched.description && errors.description}
														</span>
													</div>
												</div>

												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Amount
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.amount}
															placeholder="Amount"
															onChange={(e) => {
																setFieldValue("amount", e.target.value);
															}}
														/>
														<span className="error">{errors.amount && touched.amount && errors.amount}</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Balance
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.balance}
															placeholder="Enter Balance"
															onChange={(e) => {
																setFieldValue("balance", e.target.value);
															}}
														/>
														<span className="error">{errors.balance && touched.balance && errors.balance}</span>
													</div>
												</div>
											</div>
											<div className="submit-section">
												{loading ? (
													<button type="submit" disabled={true} className="btn btn-primary submit-btn">
														<div className="spinner-border text-warning" role="status">
															<span className="sr-only">Loading...</span>
														</div>
													</button>
												) : (
													<button type="submit" className="btn btn-primary submit-btn">
														Submit
													</button>
												)}
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</Modal>
				{/* /Edit Modal */}

				{/* {Create Payoff Modal} */}
				<Modal show={isShowPayoffModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Create PayOff</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowPayoffModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={payOffInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.amount) {
										errors.amount = "Amount is required";
									}

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										amount: parseInt(values.amount),
										liabilityId: selectedId,
										description: values.description,
										date: values.date
									};
									try {
										setLoading(true);
										const res = await Axios.post(baseApiUrl + `/payOff/add`, formData);
										if (res.data.status == 200) {
											getLiability();
											toast.success(res.data.message);
											setLoading(false);
											setIsShowPayoffModal(false);
										}
									} catch (err) {
										setLoading(false);
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
									isValid
									/* and other goodies */
								}) => {
									return (
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Amount
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Amount"
															onChange={(e) => {
																setFieldValue("amount", e.target.value);
															}}
														/>
														<span className="error">{errors.amount && touched.amount && errors.amount}</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Date
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="date"
															placeholder="Select Date"
															onChange={(e) => {
																setFieldValue("date", e.target.value);
															}}
														/>
														<span className="error">{errors.date && touched.date && errors.date}</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Description
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="textarea"
															placeholder="Enter Description"
															onChange={(e) => {
																setFieldValue("description", e.target.value);
															}}
														/>
														<span className="error">
															{errors.description && touched.description && errors.description}
														</span>
													</div>
												</div>
											</div>
											<div className="submit-section">
												{loading ? (
													<button type="submit" disabled={true} className="btn btn-primary submit-btn">
														<div className="spinner-border text-warning" role="status">
															<span className="sr-only">Loading...</span>
														</div>
													</button>
												) : (
													<button type="submit" className="btn btn-primary submit-btn">
														Submit
													</button>
												)}
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</Modal>

				{/* {Create Payoff Modal} */}

				{/* View History Modal */}

				<Modal show={isShowViewHistoryModal} dialogClassName="employee-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">View PayOff History</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowViewHistoryModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									setFieldValue,
									isSubmitting,
									isValid
									/* and other goodies */
								}) => {
									return (
										<div className="col-md-12">
											<div className="table-responsive">
												<Table
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
													columns={columns1}
													// onChange={handleTableChange}
													size="middle"
													// dataSource={filterTable == null ? booking : filterTable}
													dataSource={payOffData}
													scroll={{ x: "max-content" }}
													rowKey={(record) => record.id}
												/>
											</div>
										</div>
									);
								}}
							</Formik>
						</div>
					</div>
				</Modal>

				{/* Delete Modal  */}
				<div className="modal custom-modal fade" id="delete_member" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Liability</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<button
												className="btn btn-primary w-100 continue-btn"
												data-bs-dismiss="modal"
												type="submit"
												onClick={() => deleteLiability(query)}
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
				{/* Delete Modal  */}
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default Liability;
