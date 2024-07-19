import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";

import Delete from "../../../_components/modelbox/Delete";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Axios from "axios";
import Select from "react-select";
import { Field, Formik } from "formik";
import { DateDropField } from "../../../_components/fields/DateDropField";
import { InputText } from "../../../_components/fields/InputText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";

const LeaveAdmin = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [loading, setloading] = useState(false);
	const [menu, setMenu] = useState(false);
	const [allLeaves, setAllLeaves] = useState([]);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [value, setValue] = useState("");
	const [query, setQuery] = useState("");
	const [select, setSelected] = useState("");
	let object = JSON.parse(localStorage.getItem("user"));
	const options = [
		{ value: "pending", label: "Pending" },
		{ value: "approved", label: "Approved" },
		{ value: "rejected", label: "Rejected" }
	];
	const [optionList, setOptionList] = useState([]);
	const [initialValues, setInitialValues] = useState({
		employeeId: "",
		status: "new",
		comment: "",
		updatedBy: "",
		reason: "",
		startDate: "",
		endDate: ""
	});
	const leaveFormValidation = yup.object().shape({
		employeeId: yup.string().required("Employee Id is required"),
		// status: yup.string().required("Status is required"),
		reason: yup.string().required("Reason is required"),
		startDate: yup.string().required("Start Date is required"),
		endDate: yup.string().required("End Date is required")
	});
	const handleChange = (e) => {
		// console.log("value", e.target.value);
		setValue(e.target.value);
	};
	const toggleMobileMenu = () => {
		setMenu(!menu);
	};
	const getAllLeave = () => {
		Axios.get(baseApiUrl + "leave/list")
			.then((res) => {
				// setOptionList(res.data.Leaves)
				setAllLeaves(res.data.Leaves);
				const users = res.data;
				dispatch(loginSuccess(users));
				localStorage.setItem("jwt", users.auth_token);
				localStorage.setItem("user", JSON.stringify(users));
				// console.log('users', users);
				// console.log("res.data.Leaves", res.data.Leaves[0]);
			})
			.catch((err) => console.log(err.response.data));
	};
	const getAllEmployees = () => {
		Axios.get(baseApiUrl + "employee/list")
			.then((res) => {
				// console.log(res.data.employee)
				res.data.employee.map((item) => {
					setOptionList((prev) => [...prev, { label: item.fullName, value: item.id }]);
					// console.log(item.fullName);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	// console.log(object.id,"current object")
	const deleteLeaveById = (id) => {
		Axios.delete(baseApiUrl + `/leave/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllLeave();
					toast.success(res.data.message);
					// console.log("Deleted Successfully")
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
		getAllLeave();
		getAllEmployees();
	}, []);

	const columns = [
		{
			title: "Employee Name",
			dataIndex: "employee",
			// sorter: (a, b) => a.employeeId.length - b.employeeId.length,
			render: (text, record) => {
				// console.log(record, "8z8888888888888888888")
				return <span>{record.employee ? record.employee.fullName : "No Name"}</span>;
			}
		},
		{
			title: "Reason",
			dataIndex: "reason"
			// sorter: (a, b) => a.reason.length - b.reason.length,
		},
		{
			title: "Comment",
			dataIndex: "adminComment"
		},
		{
			title: "Updated By",
			dataIndex: "user",
			render: (text, record) => {
				// console.log(text, " khfdhf", record);
				return <span>{text?.name}</span>;
			}
		},
		{
			title: "Start Date",
			dataIndex: "startDate"
			// sorter: (a, b) => a.startDate.length - b.startDate.length,
		},
		{
			title: "End Date",
			dataIndex: "endDate"
			// sorter: (a, b) => a.endDate.length - b.endDate.length,
		},
		{
			title: "Status",
			dataIndex: "status",
			// sorter: (a, b) => a.status.length - b.status.length,
			render: (text, record) => (
				<div className="action-label text-center">
					<a className="btn btn-white btn-sm btn-rounded">
						<i
							className={
								text === "New"
									? "fa fa-dot-circle-o text-purple"
									: text === "Pending"
									? "fa fa-dot-circle-o text-info"
									: text === "Approved"
									? "fa fa-dot-circle-o text-success"
									: "fa fa-dot-circle-o text-danger"
							}
						/>{" "}
						{text}
					</a>
				</div>
			)
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
							data-bs-target="#edit_leave"
							onClick={() => {
								// console.log(text, "uuuuuuuuuuuuuuuuuuu")
								setQuery(text.id);
								setIsShowEditProjectModal(true);
								setInitialValues({
									// status: '',
									comment: "",
									...text,
									status: options.find((item) => item.label === text.status)
								});
							}}
						>
							<i className="fa fa-pencil m-r-5" /> Edit
						</Link>
						<Link
							to="/"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#delete_leaves"
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
					<title>Leaves - Sheranwala Developer</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Leaves</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Leaves</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
									<i className="fa fa-plus" />
									Add Leave
								</p>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					{/* Leave Statistics */}
					{/* <div className="row">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Today Presents</h6>
                <h4>12 / 60</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Planned Leaves</h6>
                <h4>8 <span>Today</span></h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Unplanned Leaves</h6>
                <h4>0 <span>Today</span></h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Pending Requests</h6>
                <h4>12</h4>
              </div>
            </div>
          </div> */}
					{/* /Leave Statistics */}
					{/* Search Filter */}
					{/* <div className="row filter-row">
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option> -- Select -- </option>
                  <option>Casual Leave</option>
                  <option>Medical Leave</option>
                  <option>Loss of Pay</option>
                </select>
                <label className="focus-label">Leave Type</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option> -- Select -- </option>
                  <option> Pending </option>
                  <option> Approved </option>
                  <option> Rejected </option>
                </select>
                <label className="focus-label">Leave Status</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date" />
                <label className="focus-label">From</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <input className="form-control floating" type="date" />
                <label className="focus-label">To</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <a href="#" className="btn btn-success btn-block w-100"> Search </a>
            </div>
          </div> */}
					{/* /Search Filter */}
					<div className="row">
						<div className="col-md-12">
							<div className="table-responsive">
								<Table
									className="table-striped"
									pagination={{
										total: allLeaves?.length,
										showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
										showSizeChanger: true,
										onShowSizeChange: onShowSizeChange,
										itemRender: itemRender
									}}
									style={{ overflowX: "auto" }}
									columns={columns}
									// bordered
									dataSource={allLeaves}
									rowKey={(record) => record?.id}
									// onChange={console.log("chnage")}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* /Page Content */}
				{/* Add Leave Modal */}
				<Modal show={isShowProjectModal} dialogClassName="employee-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Leave</h5>
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
								validationSchema={leaveFormValidation}
								initialValues={initialValues}
								// onSubmit={addLeaves}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										employeeId: values.employeeId,
										status: "new",
										reason: values.reason,
										startDate: values.startDate,
										endDate: values.endDate
									};
									try {
										setloading(true);
										const res = await Axios.post(baseApiUrl + "leave/add", formData);
										if (res.data.status == 200) {
											getAllLeave();
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
								// enableReinitialize
							>
								{({ handleSubmit, errors, values, isValid, touched, setFieldValue }) => {
									return (
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Employee Name <span className="text-danger">*</span>
														</label>
														<div className="form-group">
															{/* <Select options={optionList.id}/> */}
															<Select
																placeholder="Select Employee"
																options={optionList}
																onChange={(value) => {
																	setFieldValue("employeeId", value.value);
																}}
															/>
														</div>
														{errors.employeeId && touched.employeeId && (
															<span className="text-danger text-sm">{errors.employeeId}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Start Date <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="date"
															onChange={(e) => {
																setFieldValue("startDate", e.target.value);
															}}
														/>
														{errors.startDate && touched.startDate && (
															<span className="text-danger text-sm">{errors.startDate}</span>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															End Date <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="date"
															onChange={(e) => {
																setFieldValue("endDate", e.target.value);
															}}
														/>
														{errors.endDate && touched.endDate && (
															<span className="text-danger text-sm">{errors.endDate}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Reason <span className="text-danger">*</span>
														</label>
														<Field
															className="form-control"
															type="text"
															name="reason"
															component={InputText}
															onChange={(e) => {
																setFieldValue("reason", e.target.value);
															}}
														/>
														{errors.reason && touched.reason && (
															<span className="text-danger text-sm">{errors.reason}</span>
														)}
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
				{/* /Add Leave Modal */}
				{/* Edit Leave Modal */}
				<Modal show={isShowEditProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Leave</h5>
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
								validate={(values) => {
									const errors = {};
									if (!values.comment) {
										errors.comment = "Comment is required";
									}
									if (!values.status) {
										errors.status = "Status is required";
									}
									// console.log(errors);
									return errors;
								}}
								initialValues={initialValues}
								// onSubmit={updateLeaveById}
								onSubmit={async (values, { setSubmitting }) => {
									// console.log(values.status.value,"status")
									// console.log(values.comment,"comment")
									// console.log(object.id,"id")
									const formData = {
										status: values.status.value,
										comment: values.comment,
										updatedBy: object.id
									};
									try {
										setloading(true);
										const res = await Axios.put(baseApiUrl + `leave/status/update?id=${query}`, formData);
										if (res.data.status == 200) {
											getAllLeave();
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
								// enableReinitialize
							>
								{({ handleSubmit, errors, values, isValid, touched, setFieldValue }) => {
									return (
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>
															Status <span className="text-danger">*</span>
														</label>
														<Select
															placeholder="Select Status"
															value={values.status}
															options={options}
															onChange={(value) => {
																setFieldValue("status", value);
															}}
														/>
														{errors.status && touched.status && (
															<span className="text-danger text-sm">{errors.status}</span>
														)}
													</div>
													<div className="form-group">
														<label>
															Comment <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.comment}
															placeholder="Comment"
															onChange={(e) => {
																setFieldValue("comment", e.target.value);
															}}
														/>
														{errors.comment && touched.comment && (
															<span className="text-danger text-sm">{errors.comment}</span>
														)}
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
				{/* /Edit Leave Modal */}
				{/* Approve Leave Modal */}
				{/* <div className="modal custom-modal fade" id="approve_leave" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Leave Approve</h3>
                  <p>Are you sure want to approve for this leave?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link to="/" className="btn btn-primary continue-btn">Approve</Link>
                    </div>
                    <div className="col-6">
                      <Link to="/" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Decline</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
				{/* /Approve Leave Modal */}
				{/* Delete Leave Modal */}
				<div className="modal custom-modal fade" id="delete_leaves" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Leave</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<button
												className="btn btn-primary w-100 continue-btn"
												data-bs-dismiss="modal"
												type="submit"
												onClick={() => deleteLeaveById(query)}
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
				{/* /Delete Leave Modal */}
			</div>
		</div>
	);
};

export default LeaveAdmin;
