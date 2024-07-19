/**
 * Signin Firebase
 */

import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { Formik } from "formik";
import Select from "react-select";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import PasswordInput from "../../_components/PasswordInput";

const Users = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	// const[warnpassword,setwarnpassword]=useState(false);
	const [password, setPasswordValue] = React.useState("password");
	const [passwordInput, setPasswordInput] = React.useState("");
	const onPasswordChange = (e) => {
		setPasswordInput(e.target.value);
	};
	const toggle = () => {
		if (password === "password") {
			setPasswordValue("text");
			return;
		}
		setPasswordValue("password");
	};
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState("");
	const [loading, setloading] = useState(false);
	const [user, setUser] = useState([]);
	const [group, setGroup] = useState([]);
	const [role, setRole] = useState([]);
	const [filteredUser, setFilteredUser] = useState([]);
	const [userInitialValues, setUserInitialValues] = useState({
		name: "",
		lastName: "",
		email: "",
		mobileNo: "",
		password: "",
		image: "",
		status: "",
		role: "",
		user_group: ""
	});
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];

	const getAllUsers = () => {
		Axios.get(baseApiUrl + "user/list")
			.then((res) => {
				setUser(res.data.user);
				// setUser(res.data.user.filter(row => row.roles.name !== 'Super Admin'));
				setFilteredUser(res.data.user.filter((item) => item?.roles?.name !== "Super Admin"));
				// console.log(res.data.user.filter(item => item.role.name !== 'Super Admin'));
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
			});
	};
	const getRole = () => {
		Axios.get(baseApiUrl + "userRole/list")
			.then((res) => {
				res.data.UserRoles.filter((item) => item.name !== "Super Admin" && item.name !== "Employee").map((item) => {
					setRole((prev) => [...prev, { label: item.name, value: item.id }]);
					// console.log(item.name)
				});
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
			});
	};

	const getAllGroup = () => {
		Axios.get(baseApiUrl + "userGroup/list")
			.then((res) => {
				res.data.UserGroup.map((item) => {
					setGroup((prev) => [...prev, { label: item.GROUP_NAME, value: item.Group_ID }]);
				});
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteUserById = (id) => {
		Axios.delete(baseApiUrl + `user/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllUsers();
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	//  Filter State Of User
	// const [userRole, setUserRole] = useState();
	// const [userStatus, setUserStatus] = useState();

	// End Filter State Of User

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getAllUsers();
		getRole();
		getAllGroup();
	}, []);

	let columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text, record) => {
				// console.log("EWWWWWWWWWWWWWWWWWWW",record);
				return (
					<h2 className="table-avatar">
						{/* <Link to="/app/profile/employee-profile" className="avatar"></Link> */}
						<img
							alt="img"
							src={record?.image}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
							}}
							className="avatar"
						/>
						<div>{record?.name + " " + record?.lastName}</div>
						{/* <Link to="/app/profile/employee-profile"> <span>{record.role}</span></Link> */}
					</h2>
				);
			},
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: (a, b) => a.email.length - b.email.length
		},

		{
			title: "Contact Number",
			dataIndex: "mobileNo",
			sorter: (a, b) => a.mobileNo.length - b.mobileNo.length
		},
		{
			title: "Group Name",
			dataIndex: "User_Group",
			render: (text, record) => {
				return <span>{text?.GROUP_NAME}</span>;
			},
			sorter: (a, b) => a.User_Group.length - b.User_Group.length
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
			},
			sorter: (a, b) => a.status.length - b.status.length
		},
		{
			title: "Role",
			dataIndex: "roles",
			render: (text, record) => {
				// console.log("ffeeefefefefe",text,record)
				return (
					// <span className={text === "Admin" ? "badge bg-inverse-danger" : "badge bg-inverse-success"}
					// >{text}</span>
					<span>{text?.name}</span>
				);
			},
			sorter: (a, b) => a.role.length - b.role.length
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
								className="dropdown-item"
								to="/"
								data-bs-toggle="modal"
								data-bs-target="#edit_user"
								onClick={() => {
									setQuery(text.id);
									setIsShowEditProjectModal(true);
									setUserInitialValues({
										name: "",
										lastName: "",
										email: "",
										mobileNo: "",
										// password: "",
										image: "",
										// user_group: "",
										...text,
										role: roles.find((item) => item?.label === text?.roles?.name),
										user_group: group.find((item) => item.value === text?.User_Group?.Group_ID),
										status: options.find((item) => item.label === text?.status)
										// ...user,
										// ...options,
									});
									// console.log("GHJGJSGJGSA", text?.User_Group?.GROUP_NAME);
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</Link>
							<Link
								className="dropdown-item"
								to="/"
								data-bs-toggle="modal"
								data-bs-target="#delete_user"
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

	// console.log('rrrrrrrrrrrrrrrrrrrrrr', columns)
	// const [querys, setQuerys] = useState('')

	const status = [
		{ value: "0", label: "None" },
		{ value: "Active", label: "Active" },
		{ value: "InActive", label: "InActive" }
	];
	const roles = [
		{ value: "0", label: "None" },
		{ value: "1", label: "Super Admin" },
		{ value: "2", label: "Admin" },
		{ value: "3", label: "HR" },
		{ value: "4", label: "Accounts" },
		{ value: "5", label: "Cashier" },
		{ value: "6", label: "File Collector" }
	];
	const handleStatusChange = (event) => {
		if (event.value === true) {
			setFilteredUser(
				user.filter((item) => {
					item.status = "Active";
				})
			);
		} else if (event.value === false) {
			setFilteredUser(
				user.filter((item) => {
					item.status = "InActive";
				})
			);
		} else {
			setFilteredUser(user);
		}
		// console.log("ddddddddddddd", user)
	};

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
				<title>Users - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Users</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Users</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create User
							</p>
						</div>
					</div>
				</div>
				{/* /Page Header */}
				{/* Search Filter */}
				<div className="row filter-row">
					<div className="col-sm-6 col-md-6">
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Username"
								onChange={(event) => setQuery(event.target.value)}
							/>
							{/*<label className="focus-label">User Name</label>*/}
						</div>
					</div>
					<div className="col-sm-3 col-md-3">
						<div className="form-group">
							<Select placeholder="Select Status" options={status} onChange={(event) => handleStatusChange(event)} />
						</div>
					</div>
					<div className="col-sm-3 col-md-3">
						<div className="form-group ">
							<Select placeholder="Select Role" options={roles} />
						</div>
					</div>
				</div>
				{/* /Search Filter */}
				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									total: filteredUser?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								bordered
								rowKey={(record) => record?.id}
								columns={columns}
								dataSource={filteredUser}
								// dataSource={filteredUser.filter((item) => {
								//     if (query == '') {
								//         return item
								//     } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
								//         return item
								//     }
								// })}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}
			{/* Add User Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add User </h5>
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
							initialValues={userInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.name) {
									errors.name = "Name is required";
								}
								if (!values.lastName) {
									errors.lastName = "Last Name is required";
								}
								if (!values.email) {
									errors.email = "Email is required";
								}
								if (!values.mobileNo) {
									errors.mobileNo = "Contact is required";
								}
								if (!values.password) {
									errors.password = "Password is required";
								}
								if (!values.user_group) {
									errors.user_group = "user group is required";
								}
								if (!values.role) {
									errors.role = "Role No is required";
								}
								if (!values.status) {
									errors.status = "Status is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									name: values.name,
									lastName: values.lastName,
									email: values.email,
									mobileNo: values.mobileNo,
									password: values.password,
									image: values.image,
									status: values.status,
									role: values.role,
									user_group: values.user_group
								};
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "user/add", formData, header);
									if (res.data.status == 200) {
										getAllUsers();
										toast.success(res.data.message);
										setloading(false);
										setIsShowProjectModal(false);
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
								isValid
								/* and other goodies */
							}) => {
								{
									/* console.log('kkkkkkkkkkkkkkkkkk', isValid, isSubmitting, errors) */
								}
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														First Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="First Name"
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
														Last Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Last Name"
														onChange={(e) => {
															setFieldValue("lastName", e.target.value);
														}}
													/>
													<span className="error">{errors.lastName && touched.lastName && errors.lastName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Email <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Email"
														onChange={(e) => {
															setFieldValue("email", e.target.value);
														}}
													/>
													<span className="error">{errors.email && touched.email && errors.email}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Password <span className="text-danger">*</span>
													</label>
													{/*<input className="form-control" type="password"*/}
													{/*       placeholder='Password' autoComplete="current-password"*/}
													{/*       onChange={(e) => {*/}
													{/*           setFieldValue("password", e.target.value);*/}
													{/*       }}*/}
													{/*/>*/}
													<PasswordInput
														placeholder="Password"
														onChange={(e) => {
															setFieldValue("password", e.target.value);
														}}
													/>
													<span className="error">{errors.password && touched.password && errors.password}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Role <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Role"
														options={role}
														onChange={(value) => {
															setFieldValue("role", value.value);
														}}
													/>
													<span className="error">{errors.role && touched.role && errors.role}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<div>
														<Select
															placeholder="Select Status"
															options={options}
															onChange={(value) => {
																setFieldValue("status", value.value);
															}}
														/>
														<span className="error">{errors.status && touched.status && errors.status}</span>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Contact No <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="mobileNo"
														placeholder="Contact No"
														onChange={(e) => {
															setFieldValue("mobileNo", e.target.value);
														}}
													/>
													<span className="error">{errors.mobileNo && touched.mobileNo && errors.mobileNo}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Groups <span className="text-danger">*</span>
													</label>
													<div>
														<Select
															placeholder="Select Groups"
															options={group}
															onChange={(value) => {
																setFieldValue("user_group", value.value);
															}}
														/>
														<span className="error">
															{errors.user_group && touched.user_group && errors.user_group}
														</span>
													</div>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>Upload Image</label>
													<input
														className="form-control"
														type="file"
														onChange={(e) => {
															// console.log(e.target.files[0], ' img ');
															setFieldValue("image", e.target.files[0]);
														}}
													/>
													<span className="error">{errors.image && touched.image && errors.image}</span>
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
			{/* /Add User Modal */}
			{/* Edit User Modal */}
			<Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit User</h5>
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
							initialValues={userInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.name) {
									errors.name = "Name is required";
								}
								if (!values.lastName) {
									errors.lastName = "Last Name is required";
								}
								if (!values.email) {
									errors.email = "Email is required";
								}
								if (!values.mobileNo) {
									errors.mobileNo = "Contact is required";
								}
								if (!values.user_group) {
									errors.user_group = "User group is required";
								}
								if (!values.role) {
									errors.role = "Role No is required";
								}
								if (!values.status) {
									errors.status = "Role No is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								// console.log(formData,"FormData");
								const formData = {
									name: values.name,
									lastName: values.lastName,
									email: values.email,
									mobileNo: values.mobileNo,
									// password: values.password,
									image: values.image,
									status: values.status.value,
									role: values.role,
									user_group: values.user_group
								};
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `user/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllUsers();
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
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														First Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														value={values.name}
														type="text"
														placeholder="First Name"
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
														Last Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														value={values.lastName}
														type="text"
														placeholder="Last Name"
														onChange={(e) => {
															setFieldValue("lastName", e.target.value);
														}}
													/>
													<span className="error">{errors.lastName && touched.lastName && errors.lastName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Email <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														value={values.email}
														type="text"
														placeholder="Email"
														onChange={(e) => {
															setFieldValue("email", e.target.value);
														}}
													/>
													<span className="error">{errors.email && touched.email && errors.email}</span>
												</div>
											</div>
											{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" value={values.password} type="password" placeholder='password'
                              onChange={(e) => {
                                setFieldValue("password", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.password && touched.password && errors.password}
                            </span>
                          </div>
                        </div> */}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Contact No <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														value={values.mobileNo}
														type="mobileNo"
														placeholder="Contact No"
														onChange={(e) => {
															setFieldValue("mobileNo", e.target.value);
														}}
													/>
													<span className="error">{errors.mobileNo && touched.mobileNo && errors.mobileNo}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Role <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Role"
														value={role?.find((item) => item?.label === values?.role?.label)}
														options={role}
														onChange={(value) => {
															setFieldValue("role", value.value);
														}}
													/>

													<span className="error">{errors.role && touched.role && errors.role}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<div>
														<Select
															placeholder="Select Status"
															value={values.status}
															options={options}
															onChange={(value) => {
																setFieldValue("status", value);
															}}
														/>

														<span className="error">{errors.status && touched.status && errors.status}</span>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Groups <span className="text-danger">*</span>
													</label>
													<div>
														<Select
															placeholder="Select Groups"
															value={group?.find((item) => item?.value == values?.user_group?.value)}
															// value={values.group}
															options={group}
															onChange={(value) => {
																// console.log("55555555555555555555", value);
																setFieldValue("user_group", value.value);
															}}
														/>
														<span className="error">
															{errors.user_group && touched.user_group && errors.user_group}
														</span>
													</div>
												</div>
											</div>

											<div className="col-sm-12">
												<div className="form-group">
													<label>Upload Image </label>
													<input
														className="form-control"
														type="file"
														onChange={(e) => {
															// console.log(e.target.files[0], ' img ');
															setFieldValue("image", e.target.files[0]);
														}}
													/>
													<span className="error">{errors.image && touched.image && errors.image}</span>
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
			{/* /Edit User Modal */}
			{/* Delete User Modal */}
			<div className="modal custom-modal fade" id="delete_user" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete User</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteUserById(query)}
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
			{/* /Delete User Modal */}
		</div>
	);
};

export default Users;
