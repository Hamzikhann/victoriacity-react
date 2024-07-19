import React, { useState } from "react";
import { Field, Formik } from "formik";
import { Modal } from "react-bootstrap";
import Axios from "axios";

const Editclient = ({ cust, isShowEditModal, setIsShowEditModal, getAllCustomers, forEdit }) => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	// console.log('suceess edit', forEdit)

	return (
		<>
			{/* Edit Client Modal */}
			<Modal show={isShowEditModal} dialogClassName="employee-modal">
				{/*  <div*/}
				{/*  className="modal-dialog modal-dialog-centered w-75 modal-xl "*/}
				{/*  role="document"*/}
				{/*>*/}
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Client</h5>
						<button
							type="button"
							className="close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => setIsShowEditModal(false)}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={forEdit}
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
								}
								if (!values.designation) {
									errors.designation = "Designation is required";
								}
								if (!values.customerId) {
									errors.customerId = "Customer Id is required";
								}
								// if (!values.contact) {
								//   errors.contact = "Contact Number is required";
								// }
								if (!values.dob) {
									errors.dob = "DOB is required";
								}
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								const formData = {
									id: forEdit.id,
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
									address: values.address
								};

								Axios.put(baseApiUrl + "customer/update", formData)
									.then((res) => {
										if (res.data.status == 200) {
											setIsShowEditModal(false);
											getAllCustomers();
										}
									})
									.catch((err) => console.log(err.response.data));
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
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													First Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
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
													value={values.fatherName}
													type="text"
													onChange={(e) => {
														setFieldValue("fatherName", e.target.value);
													}}
												/>
												<span className="error">{errors.fatherName && touched.fatherName && errors.fatherName}</span>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group d-flex justify-content-around ">
												<div className=" pt-4">
													<input
														type="radio"
														id="css"
														name="fav_language"
														onChange={(e) => setFieldValue("gender", 1)}
													/>
													<label for="css">Male</label>
												</div>
												<div className=" pt-4">
													<input
														type="radio"
														id="javascript"
														name="fav_language"
														onChange={(e) => setFieldValue("gender", 2)}
													/>
													<label for="javascript">Female</label>
												</div>
												<span className="error">{errors.fatherName && touched.fatherName && errors.fatherName}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													designation <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													value={values.designation}
													type="text"
													onChange={(e) => {
														setFieldValue("designation", e.target.value);
													}}
												/>
												<span className="error">{errors.designation && touched.designation && errors.designation}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Company Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													value={values.companyName}
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
													Cnic <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													value={values.cnic}
													type="text"
													onChange={(e) => {
														setFieldValue("cnic", e.target.value);
													}}
												/>
												<span className="error">{errors.cnic && touched.cnic && errors.cnic}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Date of Birth *</label>
												<div>
													<input
														className="form-control datetimepicker"
														value={values.dob}
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
													value={values.email}
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
													value={values.address}
													type="text"
													onChange={(e) => {
														setFieldValue("address", e.target.value);
													}}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">
													Client ID <span className="text-danger">*</span>
												</label>
												<input
													className="form-control floating"
													value={values.customerId}
													type="text"
													onChange={(e) => {
														setFieldValue("customerId", e.target.value);
													}}
												/>
												<span className="error">{errors.customerId && touched.customerId && errors.customerId}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="col-form-label">Phone</label>
												<input
													className="form-control"
													value={values.contact}
													type="text"
													onChange={(e) => {
														setFieldValue("contact", e.target.value);
													}}
												/>
												{/*<span className="error">*/}
												{/*  {errors.contact &&*/}
												{/*    touched.contact &&*/}
												{/*    errors.contact}*/}
												{/*</span>*/}
											</div>
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
										<button type="submit" className="btn btn-primary submit-btn">
											Save
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
				{/*</div>*/}
			</Modal>
			{/* /Edit Client Modal */}
		</>
	);
};

export default Editclient;
