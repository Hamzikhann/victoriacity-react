import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import "../../index.css";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

const UnitType = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState("");
	const [loading, setloading] = useState(false);
	const [unitType, setUnitType] = useState([]);
	const [unitTypeInitialValues, setUnitTypeInitialValues] = useState({
		Name: "",
		Abbrev: "",
		Status: ""
	});
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];
	const columns = [
		{
			title: "Serial #",
			dataIndex: "UType_ID"
		},
		{
			title: "Unit Type",
			dataIndex: "Name"
		},
		{
			title: "Abbreviation",
			dataIndex: "Abbrev"
		},
		{
			title: "Status",
			dataIndex: "Status",
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
				// console.log(text, record)
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
									setQuery(text.UType_ID);
									setIsShowEditProjectModal(true);
									setUnitTypeInitialValues({
										Name: "",
										Abbrev: "",
										...text,
										Status: options.find((item) => item.value === text.Status)
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
									setQuery(text.UType_ID);
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

	const getAllUnitType = () => {
		Axios.get(baseApiUrl + "unitType/list")
			.then((res) => {
				setUnitType(res.data.unitType);
				// console.log(res.data.UnitTypes)
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteUnitTypeById = (id) => {
		Axios.delete(baseApiUrl + `unitType/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllUnitType();
					toast.success(res.data.message);
					// console.log("Deleted Successfully");
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
		getAllUnitType();
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
				<title>Unit Type - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Unit Type</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Unit Type</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create Unit Type
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
									total: unitType?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								bordered
								dataSource={unitType}
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
						<h5 className="modal-title">Add Unit Type</h5>
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
							initialValues={unitTypeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.Name) {
									errors.Name = "Unit Type is required";
								}
								if (!values.Abbrev) {
									errors.Abbrev = "Abbreviation is required";
								}
								if (!values.Status) {
									errors.Status = "Status is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									Name: values.Name,
									Abbrev: values.Abbrev,
									Status: values.Status.value
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "unitType/add", formData);
									if (res.data.status == 200) {
										getAllUnitType();
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
														Unit Type <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Unit Type"
														onChange={(e) => {
															setFieldValue("Name", e.target.value);
														}}
													/>
													<span className="error">{errors.Name && touched.Name && errors.Name}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Abbreviation <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Abbreviation"
														onChange={(e) => {
															setFieldValue("Abbrev", e.target.value);
														}}
													/>
													<span className="error">{errors.Abbrev && touched.Abbrev && errors.Abbrev}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														options={options}
														onChange={(value) => {
															setFieldValue("Status", value);
														}}
													/>
													<span className="error">{errors.Status && touched.Status && errors.Status}</span>
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
			{/* /Create Project Modal */}
			{/* Edit  block Modal */}
			<Modal show={isShowEditProjectModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Unit Type</h5>
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
							initialValues={unitTypeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.Name) {
									errors.Name = "Unit Type is required";
								}
								if (!values.Abbrev) {
									errors.Abbrev = "Abbreviation is required";
								}
								if (!values.Status) {
									errors.Status = "Status is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									Name: values.Name,
									Abbrev: values.Abbrev,
									Status: values.Status.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `unitType/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllUnitType();
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
														Unit Type <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.Name}
														placeholder="Unit Type"
														onChange={(e) => {
															setFieldValue("Name", e.target.value);
														}}
													/>
													<span className="error">{errors.Name && touched.Name && errors.Name}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Abbreviation <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.Abbrev}
														placeholder="Abbreviation"
														onChange={(e) => {
															setFieldValue("Abbrev", e.target.value);
														}}
													/>
													<span className="error">{errors.Abbrev && touched.Abbrev && errors.Abbrev}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														value={values.Status}
														options={options}
														onChange={(value) => {
															setFieldValue("Status", value);
														}}
													/>
													<span className="error">{errors.Status && touched.Status && errors.Status}</span>
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
			{/* /Edit  block Modal */}
			{/* Delete Unit Type Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Unit Type</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteUnitTypeById(query)}
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
			{/* /Delete Unit Type Modal */}
		</div>
	);
};

export default UnitType;
