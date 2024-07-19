import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Formik } from "formik";
import Select from "react-select";
import { Modal } from "react-bootstrap";

const Policies = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState(null);
	const [policy, setPolicy] = useState([]);
	const [redirectUrl, setRedirectUrl] = useState(null);
	const [policyPDF, setPolicyPDF] = useState(null);
	const [loading, setloading] = useState(false);
	const [policyInitialValues, setPolicyInitialValues] = useState({
		title: "",
		description: "",
		startDate: "",
		endDate: ""
	});
	const getAllPolicy = () => {
		Axios.get(baseApiUrl + "policy/list").then((res) => {
			setPolicy(res.data.policies);
		});
	};
	const getPolicyPDF = (id) => {
		Axios.get(baseApiUrl + `policies/download?id=${id}`)
			.then((res) => {
				getAllPolicy();
				if (res.data.status == 200) {
					setRedirectUrl(res.data.file.url);
				}
			})
			.catch((err) => console.log(err.response.data));
		window.open(redirectUrl);
		setRedirectUrl(null);
	};

	const deletePolicyById = (id) => {
		Axios.delete(baseApiUrl + `policy/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllPolicy();
					toast.success(res.data.message);
					// console.log("Deleted Successfully");
				} else {
					toast.success(res.data.message);
				}
				// console.log({ dataIndex: "id" }, "dfnsfknksd");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
		// console.log(block)
	};
	useEffect(() => {
		getAllPolicy();
		// getAllPhase();
	}, []);
	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});

	const columns = [
		{
			title: "#",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Policy Name",
			dataIndex: "title",
			sorter: (a, b) => a.policyname.length - b.policyname.length
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description.length - b.description.length
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			render: (text, record) => <span> {format(new Date(text), "dd MMM y")} </span>,
			sorter: (a, b) => a.creatat.length - b.creatat.length
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			render: (text, record) => <span> {format(new Date(text), "dd MMM y")} </span>,
			sorter: (a, b) => a.creatat.length - b.creatat.length
		},
		{
			title: "Action",
			render: (text, record) => (
				<div className="dropdown dropdown-action text-end">
					<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="material-icons">more_vert</i>
					</Link>
					<div className="dropdown-menu dropdown-menu-right">
						<Link
							to="/"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#delete_member"
							onClick={() => {
								getPolicyPDF(text.id);
							}}
						>
							<i className="fa fa-trash-o m-r-5" /> Download
						</Link>
						<Link
							to="/"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#edit_member"
							onClick={() => {
								setQuery(text.id);
								setIsShowEditProjectModal(true);
								setPolicyInitialValues({
									title: "",
									description: "",
									startDate: "",
									endDate: "",
									...text
								});
								// console.log( phaseList.find(item => item.value === text.PHS_ID),"function")
							}}
						>
							<i className="fa fa-pencil m-r-5" /> Edit
						</Link>
						<Link
							to="/"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#delete_member"
							onClick={() => {
								setQuery(text.id);
							}}
						>
							<i className="fa fa-trash-o m-r-5" /> Delete
						</Link>
					</div>
				</div>
			)
		}
	];
	return (
		<div className="page-wrapper">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Helmet>
				<title>Policies - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Policies</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Policies</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Add Policy
							</p>
						</div>
					</div>
				</div>
				{/* /Page Header */}
				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									total: policy?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								// bordered
								dataSource={policy}
								rowKey={(record) => record?.id}
								// onChange={this.handleTableChange}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}
			{/* Add Policy Modal */}
			<Modal show={isShowProjectModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Policy</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowProjectModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={policyInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = "Policy Name is required";
								}
								if (!values.description) {
									errors.description = "Description is required";
								}
								if (!values.startDate) {
									errors.startDate = "Start Date is required";
								}
								if (!values.endDate) {
									errors.endDate = "End Date is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									title: values.title,
									description: values.description,
									startDate: values.startDate,
									endDate: values.endDate
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "policy/create", formData);
									if (res.data.status == 200) {
										getAllPolicy();
										setloading(false);
										toast.success(res.data.message);
										setIsShowProjectModal(false);
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
								isValid
								/* and other goodies */
							}) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Policy Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Policy Name"
														onChange={(e) => {
															setFieldValue("title", e.target.value);
														}}
													/>
													<span className="error">{errors.title && touched.title && errors.title}</span>
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
														placeholder="Description"
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
														Start Date
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="date"
														placeholder="Start Date"
														onChange={(e) => {
															setFieldValue("startDate", e.target.value);
														}}
													/>
													<span className="error">{errors.startDate && touched.startDate && errors.startDate}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														End Date
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="date"
														placeholder="End Date"
														onChange={(e) => {
															setFieldValue("endDate", e.target.value);
														}}
													/>
													<span className="error">{errors.endDate && touched.endDate && errors.endDate}</span>
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
			{/* /Add Policy Modal */}
			{/* Edit Policy Modal */}
			<Modal show={isShowEditProjectModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Policy</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowEditProjectModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={policyInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = "Policy Name is required";
								}
								if (!values.description) {
									errors.description = "Description is required";
								}
								if (!values.startDate) {
									errors.startDate = "Start Date is required";
								}
								if (!values.endDate) {
									errors.endDate = "End Date is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									title: values.title,
									description: values.description,
									startDate: values.startDate,
									endDate: values.endDate
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `policy/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllPolicy();
										setloading(false);
										toast.success(res.data.message);
										setIsShowEditProjectModal(false);
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
								isValid
								/* and other goodies */
							}) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Policy Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Policy Name"
														value={values.title}
														onChange={(e) => {
															setFieldValue("title", e.target.value);
														}}
													/>
													<span className="error">{errors.title && touched.title && errors.title}</span>
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
														placeholder="Description"
														value={values.description}
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
														Start Date
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="date"
														placeholder="Start Date"
														value={values.startDate}
														onChange={(e) => {
															setFieldValue("startDate", e.target.value);
														}}
													/>
													<span className="error">{errors.startDate && touched.startDate && errors.startDate}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														End Date
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="date"
														placeholder="End Date"
														value={values.endDate}
														onChange={(e) => {
															setFieldValue("endDate", e.target.value);
														}}
													/>
													<span className="error">{errors.endDate && touched.endDate && errors.endDate}</span>
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
			{/* /Edit Policy Modal */}
			{/* Delete Policy Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Policy</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deletePolicyById(query)}
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
			{/* /Delete Policy Modal */}
		</div>
	);
};

export default Policies;
