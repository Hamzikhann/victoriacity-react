import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table, Tag } from "antd";
import Axios from "axios";
import { Formik } from "formik";
import Select from "react-select";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";

const Department = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [loading, setloading] = useState(false);
	const [menu, setMenu] = useState(false);
	const toggleMobileMenu = () => {
		setMenu(!menu);
	};
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [query, setQuery] = useState("");
	const [department, setDepartment] = useState([]);
	const [departmentInitialValues, setDepartmentInitialValues] = useState({
		title: "",
		status: ""
	});
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];
	const columns = [
		{
			title: "Sr No",
			dataIndex: "id"
			// sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Department",
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
			render: (text, record) => (
				<div className="dropdown dropdown-action text-end">
					<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="material-icons">more_vert</i>
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<Link
							to="/"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#edit_department"
							onClick={() => {
								setQuery(text.id);
								setIsShowEditProjectModal(true);
								setDepartmentInitialValues({
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
							data-bs-target="#delete_department"
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

	const getAllDepartment = () => {
		Axios.get(baseApiUrl + "department/list")
			.then((res) => {
				setDepartment(res.data.departments);
				// console.log(res.data.departments)
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteDepartmentById = (id) => {
		Axios.delete(baseApiUrl + `department/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllDepartment();
					toast.success(res.data.message);
				} else {
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};
	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getAllDepartment();
	}, []);
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
					<title>Department - Sheranwala Developer</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Department</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Department</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
									<i className="fa fa-plus" />
									Add Department
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
										total: department?.length,
										showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
										showSizeChanger: true,
										onShowSizeChange: onShowSizeChange,
										itemRender: itemRender
									}}
									style={{ overflowX: "auto" }}
									columns={columns}
									bordered
									dataSource={department}
									rowKey={(record) => record?.id}
									// onChange={console.log("change")}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* /Page Content */}
				{/* Add Department Modal */}
				<Modal show={isShowProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Department</h5>
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
								initialValues={departmentInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.title) {
										errors.title = "Department is required";
									}
									if (!values.status) {
										errors.status = "Status No is required";
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
										const res = await Axios.post(baseApiUrl + "department/add", formData);
										if (res.data.status == 200) {
											getAllDepartment();
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
													Department Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													placeholder="Department Name"
													onChange={(e) => {
														setFieldValue("title", e.target.value);
													}}
												/>
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
				{/* /Add Department Modal */}
				{/* Edit Department Modal */}
				<Modal show={isShowEditProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Department</h5>
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
								initialValues={departmentInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.title) {
										errors.title = "Title is required";
									}
									if (!values.status) {
										errors.status = "Status No is required";
									}
									// console.log("validations required",errors);
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										title: values.title,
										status: values.status.value
									};
									try {
										setloading(true);
										const res = await Axios.put(baseApiUrl + `department/update?id=${query}`, formData);
										if (res.data.status == 200) {
											getAllDepartment();
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
													Department Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													value={values.title}
													type="text"
													placeholder="Department Name"
													onChange={(e) => {
														setFieldValue("title", e.target.value);
													}}
												/>
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
				{/* /Edit Department Modal */}
				{/* Delete Department Modal */}
				<div className="modal custom-modal fade" id="delete_department" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Department</h3>
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
												onClick={() => deleteDepartmentById(query)}
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
				{/* /Delete Department Modal */}
			</div>
		</div>
	);
};

export default Department;
