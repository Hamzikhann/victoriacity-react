import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Table, Tag } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import Select from "react-select";
import "../../index.css";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import InputMask from "react-input-mask";
import "antd/dist/antd.css";
const Members = () => {
	let createMemberButton = false;
	const [currentUser, setCurrentUser] = useState("");

	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [isShowVieMemberModal, setIsShowVieMemberModal] = useState(false);
	const [cnic, setCnic] = useState();
	const [query, setQuery] = useState("");
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setloading] = useState(false);
	const [member, setMember] = useState([]);
	const [page, setPage] = useState(1);
	const [memberInitialValues, setMemberInitialValues] = useState({
		BuyerName: "",
		BuyerContact: "",
		BuyerSecondContact: "",
		Email: "",
		Relation: "",
		BuyerCNIC: "",
		FathersName: "",
		Image: "",
		DOB: "",
		BuyerAddress: "",
		PermanantAddress: "",
		Status: true,
		Mem_Reg_Code: "n/a",
		Rmarks: "n/a"
	});

	const options = [
		{ value: "s/o", label: "s/o " },
		{ value: "d/o", label: "d/o" },
		{ value: "w/o", label: "w/o" }
	];

	const statusOptions = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];

	const columns = [
		// {
		//     title: "Member ID",
		//     dataIndex: "MEMBER_ID",
		//     sorter: (a, b) => a.id - b.id,
		// },
		// {
		//     title: "Member Reg Code",
		//     dataIndex: "Mem_Reg_Code",
		//     sorter: (a, b) => a.Mem_Reg_Code.length - b.Mem_Reg_Code.length,
		// },
		{
			title: "Owner Name",
			dataIndex: "BuyerName",
			render: (text, record) => {
				// console.log(record);
				return (
					<h2 className="table-avatar">
						<img
							alt="img"
							src={record.Image}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
							}}
							className="avatar"
						/>
						<div className="d-flex">
							<p className="m-auto">{record.BuyerName} </p>
						</div>
					</h2>
				);
			},
			width: "150%",
			sorter: (a, b) => a.BuyerName.length - b.BuyerName.length
			// sortOrder: sortedInfo.columnKey === 'BuyerName' && sortedInfo.order,
		},
		{
			title: "Fathers Name",
			dataIndex: "FathersName",
			sorter: (a, b) => a.FathersName.length - b.FathersName.length
		},
		{
			title: "Relation",
			dataIndex: "Relation",
			align: "left",
			sorter: (a, b) => a.Relation.length - b.Relation.length
		},
		{
			title: "Owner CNIC",
			dataIndex: "BuyerCNIC",
			sorter: (a, b) => a.BuyerCNIC.length - b.BuyerCNIC.length
		},
		{
			title: "Owner Contact",
			dataIndex: "BuyerContact",
			sorter: (a, b) => a.BuyerContact.length - b.BuyerContact.length
		},
		{
			title: "DOB",
			dataIndex: "DOB",
			sorter: (a, b) => a.DOB.length - b.DOB.length
		},
		{
			title: "Owner Address",
			dataIndex: "BuyerAddress",
			sorter: (a, b) => a.BuyerAddress.length - b.BuyerAddress.length
		},
		{
			title: "Permanent Address",
			dataIndex: "PermanantAddress",
			sorter: (a, b) => a.PermanantAddress.length - b.PermanantAddress.length
		},
		// {
		//     title: "Image",
		//     dataIndex: "Image",
		//     sorter: (a, b) => a.Image.length - b.Image.length,
		//     render: (text, record) => (
		//         <div>
		//             <img src={text} alt="img" style={{width: '100px', height: '75px'}}
		//                  className="img-fluid img-thumbnail rounded-circle"/>
		//         </div>
		//     ),
		// },
		{
			title: "Email",
			dataIndex: "Email",
			sorter: (a, b) => a.Email.length - b.Email.length
		},
		{
			title: "Remarks",
			dataIndex: "Rmarks",
			sorter: (a, b) => a.Rmarks.length - b.Rmarks.length
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
			},
			sorter: (a, b) => a.IsActive.length - b.IsActive.length
		},
		{
			title: "Option",
			render: (text, record) => {
				// console.log('iiiiiiiiiiiiiii', text.Relation, options.find(item => item.label === text.Relation))
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
									setQuery(text.MEMBER_ID);
									setIsShowEditProjectModal(true);
									setMemberInitialValues({
										BuyerName: "",
										BuyerContact: "",
										BuyerSecondContact: "",
										Email: "",
										BuyerCNIC: "",
										FathersName: "",
										Image: "",
										DOB: "",
										BuyerAddress: "",
										PermanantAddress: "",
										...text,
										IsActive: statusOptions.find((item) => item.value === text.IsActive),
										Relation: options.find((item) => item.value === text.Relation)
									});
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								// data-bs-target="#delete_member"
								onClick={() => {
									setQuery(text.MEMBER_ID);
									setIsShowVieMemberModal(true);
								}}
							>
								<i className="fa fa-eye m-r-5" /> View Members
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#delete_member"
								onClick={() => {
									setQuery(text.MEMBER_ID);
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

	const getAllMembersbyCnic = (search) => {
		setPage(page);
		// Check and set CNIC
		if (typeof search === "undefined" || search === null) {
			search = "";
		}
		// console.log("ffffffffffffffffffffffff", search);
		if (search.length > 0) {
			Axios.get(baseApiUrl + `member/cnic/list?search=${search}`)
				.then((res) => {
					// console.log("gggggggggggggggggggg", res?.data?.blocks);
					setMember(res?.data?.blocks);
					setTotalPage(res?.data?.totalPage);
				})

				.catch((err) => console.log(err?.response?.data?.message));
		} else {
			getAllMembers();
		}
	};

	const getAllMembers = (page) => {
		Axios.get(baseApiUrl + "member/list?page=" + page)
			.then((res) => {
				setMember(res.data.member);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteMemberById = (id) => {
		Axios.delete(baseApiUrl + `member/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllMembers(1);
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
		getAllMembers(1);
		setCurrentUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		getAllMembers(pagination.current);
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
				<title>Member - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Member</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Member</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p
								href="#"
								className="btn add-btn"
								onClick={() => {
									if (currentUser.role === "Admin" && createMemberButton) {
										setIsShowProjectModal(true);
									} else {
										toast.error("YOU ARE NOT AUTHORIZED");
									}
								}}
							>
								<i className="fa fa-plus" /> Create Member
							</p>
						</div>
					</div>
				</div>
				{/* /Page Header */}

				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => {
									setCnic(e.target.value);
									getAllMembersbyCnic(e.target.value);
								}}
								placeholder="Search By Owner Cnic"
							/>
						</div>
					</div>
					<div className="col-sm-1">
						<div className="form-group">
							{/* <button
                className="btn btn-success btn-block w-100 py-2"
                onClick={() => getAllMembersbyCnic(cnic)}

              >
                <i className="fa fa-search" />
              </button> */}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								pagination={{
									defaultPageSize: 25,
									total: (totalPage - 1) * 25,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								dataSource={member}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
								bordered
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* Create Project Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Member</h5>
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
							initialValues={memberInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.BuyerName) {
									errors.BuyerName = "Owner name is required";
								}
								if (!values.BuyerContact) {
									errors.BuyerContact = "Owner Contact No is required";
								}
								if (!values.FathersName) {
									errors.FathersName = "Father Name is required";
								}
								if (!values.BuyerCNIC) {
									errors.BuyerCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.BuyerCNIC)) {
									errors.BuyerCNIC = "Invalid CNIC number";
								}
								if (!values.DOB) {
									errors.DOB = "Date of Birth is required";
								}
								// if (!values.Email) {
								//   errors.Email = "Email is required";
								// }
								if (!values.Relation) {
									errors.Relation = "Relation is required";
								}
								// if (!values.Image) {
								//     errors.Image = "Image is required";
								// }
								if (!values.BuyerAddress) {
									errors.BuyerAddress = "Mailing Address is required";
								}
								if (!values.PermanantAddress) {
									errors.PermanantAddress = "Permanent Address is required";
								}
								// if (!values.Mem_Reg_Code) {
								//     errors.Mem_Reg_Code = "Member Registration Code is required";
								// }
								// if (!values.Rmarks) {
								//     errors.Rmarks = "Remarks is required";
								// }
								// if (!values.IsActive) {
								//     errors.IsActive = "Status is required";
								// }
								console.log(errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									BuyerName: values.BuyerName,
									BuyerContact: values.BuyerContact,
									BuyerSecondContact: values.BuyerSecondContact,
									Relation: values.Relation.value,
									BuyerCNIC: values.BuyerCNIC,
									FathersName: values.FathersName,
									Image: values.Image,
									DOB: values.DOB,
									Email: values.Email,
									BuyerAddress: values.BuyerAddress,
									PermanantAddress: values.PermanantAddress,
									Rmarks: values.Rmarks,
									IsActive: values.Status,
									Mem_Reg_Code: values.Mem_Reg_Code
								};
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "member/add", formData, header);
									if (res.data.status == 200) {
										getAllMembers(1);
										toast.success(res.data.message);
										setIsShowProjectModal(false);
										setloading(false);
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
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Name"
														onChange={(e) => {
															setFieldValue("BuyerName", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Father Name"
														onChange={(e) => {
															setFieldValue("FathersName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.FathersName && touched.FathersName && errors.FathersName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options}
														onChange={(value) => {
															setFieldValue("Relation", value);
														}}
													/>
													<span className="error">{errors.Relation && touched.Relation && errors.Relation}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Email</label>
													<input
														className="form-control"
														type="email"
														placeholder="Email"
														onChange={(e) => {
															setFieldValue("Email", e.target.value);
														}}
													/>
													<span className="error">{errors.Email && touched.Email && errors.Email}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner Contact <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Contact"
														onChange={(e) => {
															setFieldValue("BuyerContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Owner Second Contact</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Second Contact"
														onChange={(e) => {
															setFieldValue("BuyerSecondContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerSecondContact && touched.BuyerSecondContact && errors.BuyerSecondContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														placeholder="Owner CNIC"
														onChange={(e) => {
															setFieldValue("BuyerCNIC", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														DOB <span className="text-danger">*</span>
													</label>
													<div>
														<input
															className="form-control datetimepicker"
															type="date"
															onChange={(e) => {
																setFieldValue("DOB", e.target.value);
															}}
														/>
														<span className="error">{errors.DOB && touched.DOB && errors.DOB}</span>
													</div>
												</div>
											</div>

											{/* <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Remarks <span className="text-danger">*</span></label>
                                                    <input className="form-control"
                                                           placeholder='Remarks'
                                                           onChange={(e) => {
                                                               setFieldValue("Rmarks", e.target.value);
                                                           }}/>
                                                    <span className="error">
                              {errors.Rmarks && touched.Rmarks && errors.Rmarks}
                            </span>
                                                </div>
                                            </div> */}
											{/* <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Member Reg Code <span className="text-danger">*</span></label>
                                                    <input className="form-control"
                                                           placeholder='Member Reg Code'
                                                           onChange={(e) => {
                                                               setFieldValue("Mem_Reg_Code", e.target.value);
                                                           }}/>
                                                    <span className="error">
                              {errors.Mem_Reg_Code && touched.Mem_Reg_Code && errors.Mem_Reg_Code}
                            </span>
                                                </div>
                                            </div> */}
											{/* <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>
                                                        Status <span className="text-danger">*</span>
                                                    </label>

                                                    <Select
                                                        placeholder="Select Status"
                                                        options={statusOptions}
                                                        onChange={(value) => {
                                                            setFieldValue("IsActive", value)
                                                        }}
                                                    />
                                                    <span className="error">
                            {errors.IsActive && touched.IsActive && errors.IsActive}
                          </span>
                                                </div>
                                            </div> */}
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Mailing Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Mailing Address"
														onChange={(e) => {
															setFieldValue("BuyerAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Permanent Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Permanent Address"
														onChange={(e) => {
															setFieldValue("PermanantAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.PermanantAddress && touched.PermanantAddress && errors.PermanantAddress}
													</span>
												</div>
											</div>
											{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>Upload Image</label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={(e) => {
                              // console.log(e.target.files[0], ' img ');
                              setFieldValue("Image", e.target.files[0]);
                            }}
                          />
                          <span className="error">
                            {errors.Image && touched.Image && errors.Image}
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
			{/* /Create Project Modal */}
			{/* Edit Project Modal */}
			<Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Member</h5>
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
							initialValues={memberInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.BuyerName) {
									errors.BuyerName = "Buyer name is required";
								}
								if (!values.BuyerContact) {
									errors.BuyerContact = "Buyer Contact No is required";
								}
								if (!values.FathersName) {
									errors.FathersName = "Father Name is required";
								}
								if (!values.BuyerCNIC) {
									errors.BuyerCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.BuyerCNIC)) {
									errors.BuyerCNIC = "Invalid CNIC number";
								}
								if (!values.DOB) {
									errors.DOB = "Date of Birth is required";
								}
								// if (!values.Email) {
								//   errors.Email = "Email is required";
								// }
								if (!values.Relation) {
									errors.Relation = "Relation is required";
								}
								// if (!values.Image) {
								//     errors.Image = "Image is required";
								// }
								if (!values.BuyerAddress) {
									errors.BuyerAddress = "Buyer Address is required";
								}
								if (!values.PermanantAddress) {
									errors.PermanantAddress = "Permanent Address is required";
								}
								// if (!values.Mem_Reg_Code) {
								//     errors.Mem_Reg_Code = "Member Registration Code is required";
								// }
								// if (!values.Rmarks) {
								//     errors.Rmarks = "Remarks is required";
								// }
								// if (!values.IsActive) {
								//     errors.IsActive = "Status is required";
								// }
								console.log(errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								// console.log(formData);
								const formData = {
									BuyerName: values.BuyerName,
									BuyerContact: values.BuyerContact,
									BuyerSecondContact: values.BuyerSecondContact,
									Relation: values.Relation.value,
									BuyerCNIC: values.BuyerCNIC,
									FathersName: values.FathersName,
									Image: values.Image,
									DOB: values.DOB,
									Email: values.Email,
									BuyerAddress: values.BuyerAddress,
									PermanantAddress: values.PermanantAddress,
									Rmarks: values.Rmarks,
									IsActive: values.Status,
									Mem_Reg_Code: values.Mem_Reg_Code
								};
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `member/update?id=${query}`, formData, header);
									if (res.data.status == 200) {
										getAllMembers(1);
										toast.success(res.data.message);
										setIsShowEditProjectModal(false);
										setloading(false);
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
								// console.log('llllllllllllllllllll', options)
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Buyer Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Buyer Name"
														value={values.BuyerName}
														onChange={(e) => {
															setFieldValue("BuyerName", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Father Name"
														value={values.FathersName}
														onChange={(e) => {
															setFieldValue("FathersName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.FathersName && touched.FathersName && errors.FathersName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options}
														value={values.Relation}
														onChange={(value) => {
															setFieldValue("Relation", value);
														}}
													/>
													<span className="error">{errors.Relation && touched.Relation && errors.Relation}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Email</label>
													<input
														className="form-control"
														type="email"
														placeholder="Email"
														value={values.Email}
														onChange={(e) => {
															setFieldValue("Email", e.target.value);
														}}
													/>
													<span className="error">{errors.Email && touched.Email && errors.Email}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Buyer Contact <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Buyer Contact"
														value={values.BuyerContact}
														onChange={(e) => {
															setFieldValue("BuyerContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Buyer Second Contact </label>
													<input
														className="form-control"
														type="text"
														placeholder="Buyer Second Contact"
														value={values.BuyerSecondContact}
														onChange={(e) => {
															setFieldValue("BuyerSecondContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerSecondContact && touched.BuyerSecondContact && errors.BuyerSecondContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Buyer CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														placeholder="Buyer CNIC"
														value={values.BuyerCNIC}
														onChange={(e) => {
															setFieldValue("BuyerCNIC", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														DOB <span className="text-danger">*</span>
													</label>
													<div>
														<input
															className="form-control datetimepicker"
															type="date"
															value={values.DOB}
															onChange={(e) => {
																setFieldValue("DOB", e.target.value);
															}}
														/>
														<span className="error">{errors.DOB && touched.DOB && errors.DOB}</span>
													</div>
												</div>
											</div>

											{/* <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Remarks <span className="text-danger">*</span></label>
                                                    <input className="form-control"
                                                           placeholder='Remarks'
                                                           value={values.Rmarks}
                                                           onChange={(e) => {
                                                               setFieldValue("Rmarks", e.target.value);
                                                           }}/>
                                                    <span className="error">
                              {errors.Rmarks && touched.Rmarks && errors.Rmarks}
                            </span>
                                                </div>
                                            </div> */}
											{/* <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Member Reg Code <span className="text-danger">*</span></label>
                                                    <input className="form-control"
                                                           placeholder='Member Reg Code'
                                                           value={values.Mem_Reg_Code}
                                                           onChange={(e) => {
                                                               setFieldValue("Mem_Reg_Code", e.target.value);
                                                           }}/>
                                                    <span className="error">
                              {errors.Mem_Reg_Code && touched.Mem_Reg_Code && errors.Mem_Reg_Code}
                            </span>
                                                </div>
                                            </div> */}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														value={values.IsActive}
														options={statusOptions}
														onChange={(value) => {
															setFieldValue("IsActive", value);
														}}
													/>

													<span className="error">{errors.IsActive && touched.IsActive && errors.IsActive}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Mailing Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Buyer Address"
														value={values.BuyerAddress}
														onChange={(e) => {
															setFieldValue("BuyerAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Permanent Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Permanent Address"
														value={values.PermanantAddress}
														onChange={(e) => {
															setFieldValue("PermanantAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.PermanantAddress && touched.PermanantAddress && errors.PermanantAddress}
													</span>
												</div>
											</div>
											{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>Upload Image</label>

                          <input
                            className="form-control"
                            type="file"
                            onChange={(e) => {
                              // console.log(e.target.files[0], ' img ');
                              setFieldValue("Image", e.target.files[0]);
                            }}
                          />
                          <span className="error">
                            {errors.Image && touched.Image && errors.Image}
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
			{/* /Edit Project Modal */}

			{/* {View Member} */}
			<Modal show={isShowVieMemberModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">View All Members </h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowVieMemberModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik onSubmit={async (values, { setSubmitting }) => {}}>
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
										<Table
											dataSource={member}
											columns={columns}
											scroll={{ x: "overflowX" }}
											/* Other Table props */
										/>
									</form>
								);
							}}
						</Formik>
					</div>
				</div>
			</Modal>
			{/* {View Members} */}

			{/* Delete Project Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Member</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteMemberById(query)}
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

export default Members;
