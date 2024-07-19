import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import { Modal, Form } from "react-bootstrap";
import "../../index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const Phase = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState("");
	const [phase, setPhase] = useState([]);
	const [loading, setloading] = useState(false);
	const [phaseInitialValues, setPhaseInitialValues] = useState({
		NAME: "",
		ABBRE: "",
		IsActive: ""
	});
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];
	const columns = [
		{
			title: "Serial #",
			dataIndex: "PHS_ID"
		},
		{
			title: "Phase Name",
			dataIndex: "NAME"
		},
		{
			title: "Abbreviation",
			dataIndex: "ABBRE"
		},
		{
			title: "Status",
			dataIndex: "IsActive",
			render: (text, record) => {
				// console.log(text, record)
				return (
					<span>
						{text ? (
							<Tag color="green" className="rounded-5">
								Active
							</Tag>
						) : (
							<Tag color="red" className="rounded-5">
								InActive
							</Tag>
						)}
					</span>
				);
			}
		},
		{
			title: "Action",
			render: (text, record) => {
				// console.log(text, record);
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
								data-bs-target="#edit_member"
								onClick={() => {
									setQuery(text.PHS_ID);
									setIsShowEditProjectModal(true);
									setPhaseInitialValues({
										NAME: "",
										ABBRE: "",
										...text,
										IsActive: options.find((item) => item.value === text.IsActive)
									});
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
									setQuery(text.PHS_ID);
								}}
							>
								<i className="fa fa-trash-o m-r-5" /> Delete
							</Link>
						</div>
					</div>
				);
			}
		}
	];

	const getAllPhase = () => {
		Axios.get(baseApiUrl + "phase/list").then((res) => {
			setPhase(res.data.Phases);
			// console.log(res.data.Phase)
		});
	};

	const deletePhaseById = (id) => {
		Axios.delete(baseApiUrl + `phase/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllPhase();
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
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getAllPhase();
	}, []);

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
				<title>Phase - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Phase</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Phase</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create Phase
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
									total: phase?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								bordered
								dataSource={phase}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* Create Project Modal */}
			<Modal show={isShowProjectModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Phase</h5>
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
							initialValues={phaseInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NAME) {
									errors.NAME = "Phase Name is required";
								}
								if (!values.ABBRE) {
									errors.ABBRE = "Abbreviation is required";
								}
								if (!values.IsActive) {
									errors.IsActive = "Status is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									NAME: values.NAME,
									ABBRE: values.ABBRE,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "phase/add", formData);
									if (res.data.status == 200) {
										getAllPhase();
										toast.success(res.data.message);
										setloading(false);
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
														Phase Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Phase Name"
														onChange={(e) => {
															setFieldValue("NAME", e.target.value);
														}}
													/>
													<span className="error">{errors.NAME && touched.NAME && errors.NAME}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Abbreviation
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Abbreviation"
														onChange={(e) => {
															setFieldValue("ABBRE", e.target.value);
														}}
													/>
													<span className="error">{errors.ABBRE && touched.ABBRE && errors.ABBRE}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status
														<span className="text-danger"> *</span>
													</label>
													<Select
														placeholder="Select Status"
														options={options}
														onChange={(value) => {
															setFieldValue("IsActive", value);
														}}
													/>
													<span className="error">{errors.IsActive && touched.IsActive && errors.IsActive}</span>
												</div>
											</div>
										</div>
										<div className="submit-section">
											{loading ? (
												<button type="submit" disabled={true} className="btn btn-primary submit-btn">
													<div className="spinner-border text-warning" role="IsActive">
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
			{/* /Create Project Modal */}
			{/* Edit  block Modal */}
			<Modal show={isShowEditProjectModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Phase</h5>
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
							initialValues={phaseInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NAME) {
									errors.NAME = "Phase Name is required";
								}
								if (!values.ABBRE) {
									errors.ABBRE = "Abbreviation is required";
								}
								if (!values.IsActive) {
									errors.IsActive = "Status is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								// console.log(values,"djkfn")
								const formData = {
									NAME: values.NAME,
									ABBRE: values.ABBRE,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `phase/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllPhase();
										toast.success(res.data.message);
										setloading(false);
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
														Phase Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.NAME}
														placeholder="Phase Name"
														onChange={(e) => {
															setFieldValue("NAME", e.target.value);
														}}
													/>
													<span className="error">{errors.NAME && touched.NAME && errors.NAME}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Abbreviation
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.ABBRE}
														placeholder="Abbreviation"
														onChange={(e) => {
															setFieldValue("ABBRE", e.target.value);
														}}
													/>
													<span className="error">{errors.ABBRE && touched.ABBRE && errors.ABBRE}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status
														<span className="text-danger"> *</span>
													</label>
													<Select
														placeholder="Select IsActive"
														value={values.IsActive}
														options={options}
														onChange={(value) => {
															setFieldValue("IsActive", value);
														}}
													/>
													<span className="error">{errors.IsActive && touched.IsActive && errors.IsActive}</span>
												</div>
											</div>
										</div>
										<div className="submit-section">
											{loading ? (
												<button type="submit" disabled={true} className="btn btn-primary submit-btn">
													<div className="spinner-border text-warning" role="IsActive">
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
			{/* /Edit  block Modal */}
			{/* Delete  block Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Phase</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deletePhaseById(query)}
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
			{/* /Delete  block Modal */}
		</div>
	);
};

export default Phase;
