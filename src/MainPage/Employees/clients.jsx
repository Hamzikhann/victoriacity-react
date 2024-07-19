import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Field, Formik } from "formik";
import { Modal } from "react-bootstrap";
import { InputText } from "../../_components/fields/InputText";
import { Link } from "react-router-dom";
import {
	Avatar_19,
	Avatar_29,
	Avatar_07,
	Avatar_06,
	Avatar_14,
	Avatar_18,
	Avatar_28,
	Avatar_13
} from "../../Entryfile/imagepath";
import Editclient from "../../_components/modelbox/Editclient";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import InputMask from "react-input-mask";

const Clients = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [customers, setcustomers] = useState([]);
	const [customerDelete, setCustomerDelete] = useState(null);
	const [forEdit, setForEdit] = useState({});
	const [designations, setDesignation] = useState([]);
	const [projects, setProjects] = useState([]);
	const [loading, setloading] = useState(false);
	const [isShowClientModal, setIsShowClientModal] = useState(false);
	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const genderOptions = [
		{ value: "1", label: "Male" },
		{ value: "2", label: "Female" }
	];
	const getAllCustomers = () => {
		Axios.get(baseApiUrl + "customer/list")
			.then((res) => {
				setcustomers(res.data.customers);
			})
			.catch((err) => console.log(err.response.data));
	};
	const getAllDesignations = () => {
		Axios.get(baseApiUrl + "designation/active/list")
			.then((res) => {
				setDesignation(res.data.designations);
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAllProjects = () => {
		Axios.get(baseApiUrl + "project/list")
			.then((res) => {
				setProjects(res.data.project);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteClient = (id) => {
		Axios.delete(baseApiUrl + `customer/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllCustomers();
					toast.success(res.data.message);
				}
			})
			.catch((err) => toast.error(err.response.data.message));
	};
	const [initialValues, setInitialValues] = useState({
		fullName: "",
		fatherName: "",
		companyName: "",
		dob: "",
		cnic: "",
		contact: "",
		email: "",
		customerId: "",
		designation: "",
		emergencyContactNumber: "",
		address: "",
		emergencyContactAddress: "",
		gender: ""
		// projectId: "",
	});

	useEffect(() => {
		getAllCustomers();
		getAllDesignations();
		getAllProjects();
	}, []);

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});
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
				<title>Clients - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Clients</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Clients</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<a
								href="#"
								className="btn add-btn"
								data-bs-toggle="modal"
								data-bs-target="#add_client"
								onClick={() => setIsShowClientModal(true)}
							>
								<i className="fa fa-plus" /> Add Client
							</a>
							{/* <div className="view-icons">
                <Link
                  to="/app/employees/clients"
                  className="grid-view btn btn-link active"
                >
                  <i className="fa fa-th" />
                </Link>
                <Link
                  to="/app/employees/clients-list"
                  className="list-view btn btn-link"
                >
                  <i className="fa fa-bars" />
                </Link>
              </div> */}
						</div>
					</div>
				</div>
				{/* /Page Header */}
				{/* Search Filter */}
				<div className="row filter-row">
					{/* <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Client ID</label>
            </div>
          </div> */}
					<div className="col-sm-6 col-md-6">
						<div className="form-group">
							<input type="text" placeholder="Client Name" className="form-control" />
							{/* <label className="focus-label">Client Name</label> */}
						</div>
					</div>
					<div className="col-sm-6 col-md-6">
						<div className="form-group">
							<select className="select floating">
								<option>Select Company</option>
								<option>Global Technologies</option>
								<option>Delta Infotech</option>
							</select>
							{/* <label className="focus-label">Company</label> */}
						</div>
					</div>
					{/* <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block w-100">
              Search
            </a>
          </div> */}
				</div>
				{/* Search Filter */}
				{/* clients list */}

				<div className="row staff-grid-row">
					{customers?.map((cust, i) => (
						<>
							<div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
								<div className="profile-widget">
									<div className="profile-img">
										<Link to={`/app/profile/client-profile/${cust.id}`} className="avatar">
											<img
												alt=""
												src={cust.image}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null; // prevents looping
													currentTarget.src =
														"https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
												}}
												className="avatar"
											/>
										</Link>
									</div>
									<div className="dropdown profile-action">
										<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
											<i className="material-icons">more_vert</i>
										</a>
										<div className="dropdown-menu dropdown-menu-right">
											<a
												className="dropdown-item"
												href="#"
												data-bs-toggle="modal"
												data-bs-target="#edit_client"
												onClick={() => {
													setIsShowEditModal(true);
													setForEdit(cust);
												}}
											>
												<i className="fa fa-pencil m-r-5" /> Edit
											</a>
											<a
												className="dropdown-item"
												href="#"
												data-bs-toggle="modal"
												data-bs-target="#delete_client"
												onClick={() => {
													// console.log("query", employee.id);
													setCustomerDelete(cust.id);
												}}
											>
												<i className="fa fa-trash-o m-r-5" /> Delete
											</a>
										</div>
									</div>
									<h4 className="user-name m-t-10 mb-0 text-ellipsis">
										<Link to={`/app/profile/client-profile/${cust?.id}`}>{cust?.companyName}</Link>
									</h4>
									<h5 className="user-name m-t-10 mb-0 text-ellipsis">
										<Link to={`/app/profile/client-profile/${cust?.id}`}>{cust?.fullName}</Link>
									</h5>
									<div className="small text-muted">{cust?.designationDetail?.title}</div>
									{/*<Link*/}
									{/*  onClick={() => localStorage.setItem("minheight", "true")}*/}
									{/*  to="/conversation/chat"*/}
									{/*  className="btn btn-white btn-sm m-t-10 mr-1"*/}
									{/*>*/}
									{/*  Message*/}
									{/*</Link>*/}
									<Link to={`/app/profile/client-profile/${cust?.id}`} className="btn btn-white btn-sm m-t-10">
										View Profile
									</Link>
								</div>
							</div>
							{/* Delete Client Modal */}
							<div className="modal custom-modal fade" id="delete_client" role="dialog">
								<div className="modal-dialog modal-dialog-centered">
									<div className="modal-content">
										<div className="modal-body">
											<div className="form-header">
												<h3>Delete Client</h3>
												<p>Are you sure want to delete?</p>
											</div>
											<div className="modal-btn delete-action">
												<div className="row">
													<div className="col-6">
														<p
															className="btn btn-primary continue-btn"
															data-bs-toggle="modal"
															data-bs-target="#delete_client"
															onClick={() => deleteClient(customerDelete)}
														>
															Delete
														</p>
													</div>
													<div className="col-6">
														<a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">
															Cancel
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* /Delete Client Modal */}

							{/* Edit Client Modal */}
							<Editclient
								cust={cust}
								setIsShowEditModal={setIsShowEditModal}
								isShowEditModal={isShowEditModal}
								getAllCustomers={getAllCustomers}
								forEdit={forEdit}
							/>
							{/* /Edit Client Modal */}
						</>
					))}
				</div>
			</div>
			{/* /Page Content */}

			{/* Add Client Modal */}
			<Modal show={isShowClientModal} dialogClassName="employee-modal">
				<div className="modal-header">
					<h5 className="modal-title">Add Client</h5>
					<button
						type="button"
						className="close"
						onClick={() => {
							setIsShowClientModal(false);
						}}
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>

				<div className="modal-body">
					<Formik
						initialValues={initialValues}
						validate={(values) => {
							const errors = {};
							if (!values.email) {
								errors.email = "Email is required";
							} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = "Invalid email address";
							}
							if (!values.fullName) {
								errors.fullName = "Full Name is required";
							}
							if (!values.fatherName) {
								errors.fatherName = "Father Name is required";
							}
							if (!values.companyName) {
								errors.companyName = "Company Name is required";
							}
							if (!values.cnic) {
								errors.cnic = "CNIC is required";
							} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.cnic)) {
								errors.cnic = "Invalid CNIC number";
							}
							if (!values.designation) {
								errors.designation = "Designation is required";
							}
							// if (!values.projectId) {
							//   errors.projectId = "Project is required";
							// }
							// if (!values.customerId) {
							//   errors.customerId = "Customer Id is required";
							// }
							// if (!values.contact) {
							//   errors.contact = "Contact Number is required";
							// }
							if (!values.dob) {
								errors.dob = "DOB is required";
							}
							return errors;
						}}
						onSubmit={async (values, { setSubmitting }) => {
							const formData = {
								fullName: values.fullName,
								fatherName: values.fatherName,
								companyName: values.companyName,
								dob: values.dob,
								cnic: values.cnic,
								gender: values.gender,
								contact: values.contact,
								email: values.email,
								customerId: values.customerId,
								designation: values.designation,
								image: values.image,
								address: values.address,
								emergencyContactAddress: values.emergencyContactAddress,
								emergencyContactNumber: values.emergencyContactNumber
							};
							const header = {
								headers: {
									"Content-Type": "multipart/form-data"
								}
							};
							try {
								setloading(true);
								const res = await Axios.post(baseApiUrl + "customer/add", formData, header);
								if (res.data.status == 200) {
									getAllCustomers();
									toast.success(res.data.message);
									setIsShowClientModal(false);
									setloading(false);
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
							isSubmitting
							/* and other goodies */
						}) => {
							return (
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													First Name <span className="text-danger">*</span>
												</label>
												<Field
													className="form-control"
													type="text"
													component={InputText}
													value={values.fullName}
													onChange={(e) => {
														setFieldValue("fullName", e.target.value);
													}}
												/>
												<span className="error">{errors.fullName && touched.fullName && errors.fullName}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Last Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("fatherName", e.target.value);
													}}
												/>
												<span className="error">{errors.fatherName && touched.fatherName && errors.fatherName}</span>
											</div>
										</div>

										<div className="col-sm-6">
											<div className="form-group">
												<label className="col-form-label">
													Gender <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Gender"
													isSearchable={false}
													options={genderOptions}
													onChange={(value) => {
														setFieldValue("gender", value.value);
													}}
												/>
												<span className="error">{errors.gender && touched.gender && errors.gender}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Designation <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Designation"
													options={designations?.map((item) => {
														return {
															value: item.id,
															label: item.title
														};
													})}
													onChange={(value) => {
														setFieldValue("designation", value.value);
													}}
												/>
												<span className="error">{errors.designation && touched.designation && errors.designation}</span>
											</div>
										</div>

										{/* <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Project <span className="text-danger">*</span>
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          name="projectId"
                        >
                          <option value="">-</option>
                          {projects &&
                            projects.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                        </Field>

                        <span className="error">
                          {errors.projectId &&
                            touched.projectId &&
                            errors.projectId}
                        </span>
                      </div>
                    </div> */}

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Company Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("companyName", e.target.value);
													}}
												/>
												<span className="error">{errors.companyName && touched.companyName && errors.companyName}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													CNIC <span className="text-danger">*</span>
												</label>
												<InputMask
													className="form-control"
													mask="99999-9999999-9"
													maskChar=" "
													onChange={(e) => {
														setFieldValue("cnic", e.target.value);
													}}
												/>
												<span className="error">{errors.cnic && touched.cnic && errors.cnic}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Date of Birth <span className="text-danger">*</span>
												</label>
												<div>
													<input
														className="form-control datetimepicker"
														type="date"
														onChange={(e) => {
															setFieldValue("dob", e.target.value);
														}}
													/>
													<span className="error">{errors.dob && touched.dob && errors.dob}</span>
												</div>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Email <span className="text-danger">*</span>
												</label>
												<input
													className="form-control floating"
													type="email"
													onChange={(e) => {
														setFieldValue("email", e.target.value);
													}}
												/>
												<span className="error">{errors.email && touched.email && errors.email}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Address </label>
												<input
													className="form-control floating"
													type="text"
													onChange={(e) => {
														setFieldValue("address", e.target.value);
													}}
												/>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Client ID</label>
												<input
													className="form-control floating"
													type="text"
													onChange={(e) => {
														setFieldValue("customerId", e.target.value);
													}}
												/>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Phone</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("contact", e.target.value);
													}}
												/>
												{/*<span className="error">*/}
												{/*  {errors.contact && touched.contact && errors.contact}*/}
												{/*</span>*/}
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Emergency Contact Number</label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("emergencyContactNumber", e.target.value);
													}}
												/>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Emergency Contact Address </label>
												<input
													className="form-control"
													type="text"
													onChange={(e) => {
														setFieldValue("emergencyContactAddress", e.target.value);
													}}
												/>
											</div>
										</div>
										<div className="form-group">
											<label>Upload Image</label>
											<input
												className="form-control"
												type="file"
												onChange={(e) => {
													// console.log(e.target.files[0], " img ");
													setFieldValue("image", e.target.files[0]);
												}}
											/>
											{/* <span className="error">
                              {errors.userImage && touched.userImage && errors.userImage}
                            </span> */}
										</div>
									</div>

									{/* <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Chat</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Estimates</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Invoices</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}

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
			</Modal>
			{/* /Add Client Modal */}
		</div>
	);
};

export default Clients;
