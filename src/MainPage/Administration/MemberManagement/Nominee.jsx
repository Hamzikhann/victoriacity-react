import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import Select from "react-select";
import "../../index.css";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";

const Nominee = () => {
	let createNomineeButton = false;
	const [currentUser, setCurrentUser] = useState("");

	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState("");
	const [cnic, setCnic] = useState();
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setloading] = useState(false);
	const [nominee, setNominee] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [page, setPage] = useState(1);
	const [nomineeInitialValues, setNomineeInitialValues] = useState({
		MEMBER_ID: "",
		NomineeName: "",
		NomineeCNIC: "",
		NomineeFatherName: "",
		NomineeRealtion: "",
		RelationToOwner: ""
	});

	const options = [
		{ value: "s/o or d/o", label: "s/o or d/o" },
		{ value: "w/o", label: "w/o" }
	];

	// const options = [
	//     { value: 'Father', label: 'Father' },
	//     { value: 'Husband', label: 'Husband' },
	//     { value: 'Mother', label: 'Mother' },
	//     { value: 'Sibiling', label: 'Sibiling' },
	//     { value: 'Nephew', label: 'Nephew' },
	//     { value: 'Neice', label: 'Neice' },
	//     { value: 'Grand Son', label: 'Grand Son' },
	//     { value: 'Grand Daughter', label: 'Grand Daughter' },
	//     { value: 'Grand MOther', label: 'Grand MOther' },
	//     { value: 'Grand Father', label: 'Grand Father' },
	//     { value: 'Uncle', label: 'Uncle' },
	//     { value: 'N/A', label: 'N/A' },
	// ];
	const columns = [
		{
			title: "Nominee ID",
			dataIndex: "MN_ID",
			sorter: (a, b) => a.MN_ID - b.MN_ID
		},
		{
			title: "Nominee Name",
			dataIndex: "NomineeName",
			sorter: (a, b) => a.NomineeName.length - b.NomineeName.length
		},
		{
			title: "Nominee CNIC",
			dataIndex: "NomineeCNIC",
			sorter: (a, b) => a.NomineeCNIC.length - b.NomineeCNIC.length
		},
		{
			title: "Member Name",
			dataIndex: "Member",
			sorter: (a, b) => a.Member - b.Member,
			render: (text, record) => <span>{text?.BuyerName}</span>
		},
		{
			title: "Option",
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
									setQuery(text.MN_ID);
									setIsShowEditProjectModal(true);
									setNomineeInitialValues({
										NomineeName: "",
										NomineeCNIC: "",
										NomineeFatherName: "",
										RelationToOwner: "",
										...text,
										NomineeRealtion: { label: text.NomineeRealtion, value: text.NomineeRealtion },
										MEMBER_ID: text?.Member ? { label: text.Member.BuyerName, value: text.Member.MEMBER_ID } : ""
									});
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#delete_nominee"
								onClick={() => {
									setQuery(text.MN_ID);
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
	const getAllMembers = () => {
		Axios.get(baseApiUrl + "member/list")
			.then((res) => {
				res.data.member.map((item) => {
					setMemberList((prev) => [...prev, { label: item.BuyerName, value: item.MEMBER_ID }]);
				});
			})
			.catch((err) => console.log(err));
	};
	const getAllNominee = (page) => {
		Axios.get(baseApiUrl + "nominee/list?page=" + page)
			.then((res) => {
				setNominee(res.data.MemNominee);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAllNomineebyCnic = (search) => {
		setPage(page);
		// Check and set CNIC
		if (typeof search === "undefined" || search === null) {
			search = "";
		}
		if (search.length > 0) {
			Axios.get(baseApiUrl + `nominee/cnic/list?search=${search}`)
				.then((res) => {
					setNominee(res?.data?.MemNominees);
					setTotalPage(res?.data?.totalPage);
				})

				.catch((err) => console.log(err?.response?.data?.message));
		} else {
			getAllNominee();
		}
	};

	const deleteNomineeById = (id) => {
		Axios.delete(baseApiUrl + `nominee/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllNominee(1);
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

		getAllMembers();
		getAllNominee(1);
		setCurrentUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		getAllNominee(pagination.current);
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
				<title>Nominee - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Nominee</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Nominee</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p
								href="#"
								className="btn add-btn"
								onClick={() => {
									// if (currentUser.role === "Admin" && createNomineeButton) {
									setIsShowProjectModal(true);
									// } else {
									// toast.error("YOU ARE NOT AUTHORIZED");
									// }
								}}
							>
								<i className="fa fa-plus" /> Create Nominee
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
									getAllNomineebyCnic(e.target.value);
								}}
								placeholder="Search By Nominee Cnic"
							/>
						</div>
					</div>
					<div className="col-sm-1">
						<div className="form-group">
							{/* <button
                className="btn btn-success btn-block w-100 py-2"
                // onClick={() => getAllNomineebyCnic(cnic)}

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
								className="table-striped"
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
								bordered
								dataSource={nominee}
								rowKey={(record) => record.id}
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
						<h5 className="modal-title">Add Nominee</h5>
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
							initialValues={nomineeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NomineeName) {
									errors.NomineeName = "Nominee Name is required";
								}
								if (!values.NomineeFatherName) {
									errors.NomineeFatherName = "Father Name is required";
								}
								if (!values.NomineeCNIC) {
									errors.NomineeCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.NomineeCNIC)) {
									errors.NomineeCNIC = "Invalid CNIC number";
								}
								if (!values.NomineeRealtion) {
									errors.NomineeRealtion = "Relation is required";
								}
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member is required";
								}
								if (!values.RelationToOwner) {
									errors.RelationToOwner = "Relation to owner is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									NomineeName: values.NomineeName,
									NomineeCNIC: values.NomineeCNIC,
									NomineeFatherName: values.NomineeFatherName,
									MEMBER_ID: values.MEMBER_ID.value,
									NomineeRealtion: values.NomineeRealtion.value,
									RelationToOwner: values.RelationToOwner
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "nominee/add", formData);
									if (res.data.status == 200) {
										getAllNominee(1);
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
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Member <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member"
														options={memberList}
														onChange={(value) => {
															setFieldValue("MEMBER_ID", value);
														}}
													/>
													<span className="error">{errors.MEMBER_ID && touched.MEMBER_ID && errors.MEMBER_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Nominee Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Nominee Name"
														onChange={(e) => {
															setFieldValue("NomineeName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeName && touched.NomineeName && errors.NomineeName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														placeholder="Nominee CNIC"
														onChange={(e) => {
															setFieldValue("NomineeCNIC", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeCNIC && touched.NomineeCNIC && errors.NomineeCNIC}
													</span>
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
															setFieldValue("NomineeFatherName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeFatherName && touched.NomineeFatherName && errors.NomineeFatherName}
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
															setFieldValue("NomineeRealtion", value);
														}}
													/>
													<span className="error">
														{errors.NomineeRealtion && touched.NomineeRealtion && errors.NomineeRealtion}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Relation To Owner <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Realtion To Owner"
														onChange={(e) => {
															setFieldValue("RelationToOwner", e.target.value);
														}}
													/>
													<span className="error">
														{errors.RelationToOwner && touched.RelationToOwner && errors.RelationToOwner}
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
			{/* /Create Project Modal */}
			{/* Edit Project Modal */}
			<Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Nominee</h5>
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
							initialValues={nomineeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NomineeName) {
									errors.NomineeName = "Nominee Name is required";
								}
								if (!values.NomineeFatherName) {
									errors.NomineeFatherName = "Father Name is required";
								}
								if (!values.NomineeCNIC) {
									errors.NomineeCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.NomineeCNIC)) {
									errors.NomineeCNIC = "Invalid CNIC number";
								}
								if (!values.NomineeRealtion) {
									errors.NomineeRealtion = "Relation is required";
								}
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member is required";
								}
								if (!values.RelationToOwner) {
									errors.RelationToOwner = "Relation to owner is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									NomineeName: values.NomineeName,
									NomineeCNIC: values.NomineeCNIC,
									NomineeFatherName: values.NomineeFatherName,
									MEMBER_ID: values.MEMBER_ID.value,
									NomineeRealtion: values.NomineeRealtion.value,
									RelationToOwner: values.RelationToOwner
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `nominee/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllNominee(1);
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
														Member <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member"
														options={memberList}
														value={values.MEMBER_ID}
														onChange={(value) => {
															setFieldValue("MEMBER_ID", value);
														}}
													/>
													<span className="error">{errors.MEMBER_ID && touched.MEMBER_ID && errors.MEMBER_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Nominee Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Nominee Name"
														value={values.NomineeName}
														onChange={(e) => {
															setFieldValue("NomineeName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeName && touched.NomineeName && errors.NomineeName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Nominee CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														placeholder="Nominee CNIC"
														value={values.NomineeCNIC}
														onChange={(e) => {
															setFieldValue("NomineeCNIC", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeCNIC && touched.NomineeCNIC && errors.NomineeCNIC}
													</span>
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
														value={values.NomineeFatherName}
														onChange={(e) => {
															setFieldValue("NomineeFatherName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeFatherName && touched.NomineeFatherName && errors.NomineeFatherName}
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
														value={values.NomineeRealtion}
														onChange={(value) => {
															setFieldValue("NomineeRealtion", value);
														}}
													/>
													<span className="error">
														{errors.NomineeRealtion && touched.NomineeRealtion && errors.NomineeRealtion}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Relation To Owner <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Realtion To Owner"
														value={values.RelationToOwner}
														onChange={(e) => {
															setFieldValue("RelationToOwner", e.target.value);
														}}
													/>
													<span className="error">
														{errors.RelationToOwner && touched.RelationToOwner && errors.RelationToOwner}
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
			{/* /Edit Project Modal */}
			{/* Delete Project Modal */}
			<div className="modal custom-modal fade" id="delete_nominee" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Nominee</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteNomineeById(query)}
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

export default Nominee;
