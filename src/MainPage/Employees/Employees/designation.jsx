import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table, Tag } from "antd";
import Axios from "axios";
import { Formik } from "formik";
import "antd/dist/antd.css";
import Select from "react-select";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";

const Designations = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [loading, setloading] = useState(false);
	const [menu, setMenu] = useState(false);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [query, setQuery] = useState("");
	const [designation, setDesignation] = useState([]);
	const [designationInitialValues, setDesignationInitialValues] = useState({
		title: "",
		status: ""
	});
	const toggleMobileMenu = () => {
		setMenu(!menu);
	};
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];
	const getAllDesignation = () => {
		Axios.get(baseApiUrl + "designation/list")
			.then((res) => {
				setDesignation(res?.data?.designations);
				// console.log(res.data.designations)
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteDesignationById = (id) => {
		Axios.delete(baseApiUrl + `designation/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllDesignation();
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
		getAllDesignation();
	}, []);

	const columns = [
		{
			title: "Sr No",
			dataIndex: "id"
			// sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Designation",
			dataIndex: "title"
			// sorter: (a, b) => a.title.length - b.title.length,
		},
		{
			title: "Status",
			dataIndex: "status",
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
			// sorter: (a, b) => a.status.length - b.status.length,
		},
		{
			title: "Action",
			render: (text, record) => {
				// console.log("90909090909",text.status)
				// console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', options.find(item => item.value === text.status))
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
								data-bs-target="#edit_designation"
								onClick={() => {
									setQuery(text.id);
									setIsShowEditProjectModal(true);
									setDesignationInitialValues({
										title: "",
										status: "",
										...text
									});
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#delete_designation"
								onClick={() => {
									setQuery(text.id);
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
	return (
		<div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
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
			<Header onMenuClick={(value) => toggleMobileMenu()} />
			<Sidebar />
			<div className="page-wrapper">
				<Helmet>
					<title>Designations - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Designations</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Designations</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
									<i className="fa fa-plus" />
									Add Designation
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
										total: designation?.length,
										showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
										showSizeChanger: true,
										onShowSizeChange: onShowSizeChange,
										itemRender: itemRender
									}}
									style={{ overflowX: "auto" }}
									columns={columns}
									bordered
									dataSource={designation}
									rowKey={(record) => record?.id}
									// onChange={console.log("change")}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* /Page Content */}
				{/* Add Designation Modal */}
				<Modal show={isShowProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Designation</h5>
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
								initialValues={designationInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.title) {
										errors.title = "Designation is required";
									}
									if (!values.status) {
										errors.status = "Status is required";
									}
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										title: values.title,
										status: values.status.value
									};
									try {
										setloading(true);
										const res = await Axios.post(baseApiUrl + "designation/add", formData);
										if (res.data.status == 200) {
											getAllDesignation();
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
											<div className="form-group">
												<label>
													Designation <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													placeholder="Designation Name"
													onChange={(e) => {
														setFieldValue("title", e.target.value);
													}}
												/>
												<span className="error">{errors.title && touched.title && errors.title}</span>
											</div>
											<div className="form-group">
												<label>
													Status <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Status"
													options={options}
													onChange={(value) => {
														setFieldValue("status", value);
													}}
												/>
												<span className="error">{errors.status && touched.status && errors.status}</span>
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
				{/* /Add Designation Modal */}
				{/* Edit Designation Modal */}
				<Modal show={isShowEditProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Designation</h5>
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
								initialValues={designationInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.title) {
										errors.title = "Designation is required";
									}
									if (!values.status) {
										errors.status = "Status is required";
									}
									// console.log("validations required",errors);
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									// console.log("nowenitwrnewoitneroingioern",values.status)
									const formData = {
										title: values.title,
										status: values.status.value
									};
									try {
										setloading(true);
										const res = await Axios.put(baseApiUrl + `designation/update?id=${query}`, formData);
										if (res.data.status == 200) {
											getAllDesignation();
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
											<div className="form-group">
												<label>
													Designation <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													value={values.title}
													type="text"
													placeholder="Designation Name"
													onChange={(e) => {
														setFieldValue("title", e.target.value);
													}}
												/>
												<span className="error">{errors.title && touched.title && errors.title}</span>
											</div>
											<div className="form-group">
												<label>
													Status <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Status"
													value={options.find((item) => item.value === values.status)}
													options={options}
													onChange={(value) => {
														setFieldValue("status", value);
													}}
												/>
												<span className="error">{errors.status && touched.status && errors.status}</span>
											</div>
											{/*<div className="form-group">*/}
											{/*    <label>Status {values.status}<span*/}
											{/*        className="text-danger">*</span></label>*/}
											{/*    <Select placeholder="Select Status"*/}
											{/*            value={options.find(item => item.value === values.status)}*/}
											{/*            options={options}*/}
											{/*            onChange={(value) => {*/}
											{/*                setFieldValue("status", value)*/}
											{/*                // console.log("dsfsddssd",value)*/}
											{/*            }}*/}
											{/*    />*/}
											{/*   */}
											{/*</div>*/}
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
				{/* /Edit Designation Modal */}
				{/* Delete Designation Modal */}
				<div className="modal custom-modal fade" id="delete_designation" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Designation</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<Link
												to="/"
												className="btn btn-primary continue-btn"
												data-bs-dismiss="modal"
												type="submit"
												onClick={() => deleteDesignationById(query)}
											>
												Delete
											</Link>
										</div>
										<div className="col-6">
											<Link to="/" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">
												Cancel
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Delete Designation Modal */}
			</div>
		</div>
	);
};

export default Designations;
