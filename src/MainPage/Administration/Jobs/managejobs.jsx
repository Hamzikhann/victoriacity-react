/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Radio, RadioChangeEvent } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { InputText } from "../../../_components/fields/InputText";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { DatePickerField } from "../../../_components/fields/DatePickerField";
import { DateDropField } from "../../../_components/fields/DateDropField";
import Axios from "axios";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";

const Managedjobs = () => {
	const [show, setShow] = useState(false);
	const [addJobModal, setAddJobModal] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editData, setEditData] = useState();
	const [allJobs, setAllJobs] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [age, setAge] = useState("");
	const [experience, setExperience] = useState("");
	const [salaryFrom, setSalaryFrom] = useState("");
	const [salaryTo, setSalaryTo] = useState("");
	const [department, setDepartment] = useState("");
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");

	const columns = [
		{
			title: "#",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
		},
		{
			title: "Job Title",
			dataIndex: "jobtitle",
			render: (text, record) => <Link to="/app/administrator/job-details">{text}</Link>,
			sorter: (a, b) => a.jobtitle.length - b.jobtitle.length
		},
		{
			title: "Department",
			dataIndex: "department",
			render: (text, record) => <div>{record?.department1?.title}</div>,
			sorter: (a, b) => a.department.length - b.department.length
		},
		{
			title: "Start Date",
			dataIndex: "startdate",
			sorter: (a, b) => a.startdate.length - b.startdate.length,
			render: (text, record) => <span> {format(new Date(text), "dd MMM y")} </span>
		},
		{
			title: "Expiry Date",
			dataIndex: "expirydate",
			sorter: (a, b) => a.expirydate.length - b.expirydate.length,
			render: (text, record) => <span> {format(new Date(text), "dd MMM y")} </span>
		},
		{
			title: "Job Type",
			dataIndex: "jobtype",
			render: (text, record) => (
				<div className="dropdown action-label text-center">
					<a
						className="btn btn-white btn-sm btn-rounded dropdown-toggle1"
						href="#"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i
							className={
								text === "Full Time"
									? "fa fa-dot-circle-o text-info"
									: text === "Part Time"
									? "fa fa-dot-circle-o text-success"
									: text === "Internship"
									? "fa fa-dot-circle-o text-danger"
									: "fa fa-dot-circle-o text-danger"
							}
						/>{" "}
						{text}
					</a>
					{/* <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-info" /> Full Time
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-success" /> Part Time
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-danger" /> Internship
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-warning" /> Temporary
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-warning" /> Other
            </a>
          </div> */}
				</div>
			),
			sorter: (a, b) => a.jobtype.length - b.jobtype.length
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (text, record) => (
				<div className="dropdown action-label text-center">
					<a
						className="btn btn-white btn-sm btn-rounded dropdown-toggle1"
						href=""
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i
							className={
								text === "Open"
									? "fa fa-dot-circle-o text-info"
									: text === "Closed"
									? "fa fa-dot-circle-o text-success"
									: "fa fa-dot-circle-o text-danger"
							}
						/>{" "}
						{text}
					</a>
					{/* <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-info" /> Open
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-success" /> Closed
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-dot-circle-o text-danger" /> Cancelled
            </a>
          </div> */}
				</div>
			),
			sorter: (a, b) => a.status.length - b.status.length
		},
		{
			title: "Applicants",
			dataIndex: "applicants",
			render: (text, record) => (
				<Link to={"/app/administrator/job-applicants/" + record.id} className="btn btn-sm btn-primary">
					Canidates {text}
				</Link>
			),
			sorter: (a, b) => a.applicants.length - b.applicants.length
		},
		{
			title: "Action",
			render: (text, record) => (
				<div className="dropdown dropdown-action text-end">
					<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="material-icons">more_vert</i>
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<a
							href="#"
							className="dropdown-item"
							data-bs-toggle="modal"
							data-bs-target="#edit_job"
							onClick={() => {
								setAddJobModal(true);
								setInitialValues({
									...initialValues,
									id: record.id,
									action: "edit",
									jobTitle: record.jobtitle,
									startDate: record.startdate,
									endDate: record.expirydate,
									status: record.status,
									jobLocation: record.location,
									salaryFrom: record.salaryFrom,
									salaryTo: record.salaryTo,
									isActive: record.isActive,
									experience: record.experience,
									jobType: record.jobtype,
									departments: record.department,
									noOfVacancies: record.vacancies,
									description: record.description,
									age: record.age
								});
							}}
						>
							<i className="fa fa-pencil m-r-5" /> Edit
						</a>
						{/* <a
              href="#"
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#delete_job"
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a> */}
					</div>
				</div>
			)
		}
	];

	const [initialValues, setInitialValues] = useState({
		id: "",
		action: "add",
		jobTitle: "",
		startDate: "",
		endDate: "",
		status: "",
		jobLocation: "",
		salaryFrom: "",
		salaryTo: "",
		isActive: "",
		experience: "",
		jobType: "",
		departments: "",
		noOfVacancies: "",
		description: "",
		age: ""
	});
	// const onChange = (e) => {
	//   console.log('radio checked', e.target.value);
	//   setInitialValues({
	//     ...initialValues,
	//     isActive: e.target.value
	//   });
	// };

	const jobFormValidation = yup.object().shape({
		jobTitle: yup.string().required("Job title is required"),
		startDate: yup.string().required("Start Date is required"),
		endDate: yup.string().required("End Date is required"),
		jobLocation: yup.string().required("Job location is required"),
		jobType: yup.string().required("Job Type is required"),
		departments: yup.string().required("Departments is required"),
		status: yup.string().required("Status is required"),
		noOfVacancies: yup.string().required("No of vacancies is required"),
		description: yup.string().required("Description is required")
	});

	const getAllJobs = () => {
		Axios.get(baseApiUrl + "job/list")
			.then((res) => {
				setAllJobs(res.data.jobs);
				// console.log(res.data.jobs);
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAllDepartments = () => {
		Axios.get(baseApiUrl + "department/active/list")
			.then((res) => {
				setDepartments(res.data.departments);
			})
			.catch((err) => console.log(err.response.data));
	};

	const submit = (value) => {
		// console.log(initialValues);
		const formData = {
			id: value.id,
			action: value.action,
			jobtitle: value.jobTitle,
			department: value.departments,
			location: value.jobLocation,
			vacancies: value.noOfVacancies,
			experience: value.experience,
			age: value.age,
			salaryFrom: value.salaryFrom,
			salaryTo: value.salaryTo,
			jobtype: value.jobType,
			status: value.status,
			startdate: value.startDate,
			expirydate: value.endDate,
			description: value.description,
			isActive: value.isActive
		};

		if (value.action == "edit") {
			Axios.put(baseApiUrl + "job/update", formData)
				.then((res) => {
					setAddJobModal(false);
					setEditModalOpen(false);
					setExperience("");
					setAge("");
					setSalaryTo("");
					setSalaryFrom("");
					setInitialValues({
						id: "",
						action: "add",
						jobTitle: "",
						startDate: "",
						endDate: "",
						status: "",
						jobLocation: "",
						salaryFrom: "",
						salaryTo: "",
						isActive: "",
						experience: "",
						jobType: "",
						departments: "",
						noOfVacancies: "",
						description: "",
						age: ""
					});
					getAllJobs();
				})
				.catch((err) => console.log(err));
		} else if (value.action == "add") {
			Axios.post(baseApiUrl + "job/add", formData)
				.then((res) => {
					setAddJobModal(false);
					setEditModalOpen(false);
					setExperience("");
					setAge("");
					setSalaryTo("");
					setSalaryFrom("");
					setInitialValues({
						id: "",
						action: "add",
						jobTitle: "",
						startDate: "",
						endDate: "",
						status: "",
						jobLocation: "",
						salaryFrom: "",
						salaryTo: "",
						isActive: "",
						experience: "",
						jobType: "",
						departments: "",
						noOfVacancies: "",
						description: "",
						age: ""
					});
					getAllJobs();
				})
				.catch((err) => console.log(err));
		}
	};

	const CustomInputComponent = (props) => <textarea className="my-custom-input" type="text" {...props} />;

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getAllJobs();
		getAllDepartments();
	}, []);

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Jobs - Sheranwala Group</title>
				<meta name="description" content="Jobs page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Jobs</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Jobs</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<a
								href="#"
								className="btn add-btn"
								onClick={() => {
									setAddJobModal(true);
									setInitialValues({
										...initialValues,
										id: "",
										action: "add",
										jobTitle: "",
										startDate: "",
										endDate: "",
										status: "",
										jobLocation: "",
										salaryFrom: "",
										salaryTo: "",
										isActive: "",
										experience: "",
										jobType: "",
										departments: "",
										noOfVacancies: "",
										description: "",
										age: ""
									});
								}}
							>
								<i className="fa fa-plus" /> Add Job
							</a>
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
									total: allJobs.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								// bordered
								dataSource={allJobs}
								rowKey={(record) => record.id}
								// onChange={this.handleTableChange}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* /Page Content */}

			{/* Add Pop-up Form */}
			{/* Add Job Modal */}
			{/*<div id="add_job" className="modal custom-modal fade" role="dialog">*/}
			{show === true ? (
				<Modal show={addJobModal} dialogClassName="custom-modal1 modal-lg">
					{/*<div*/}
					{/*className="modal-dialog modal-dialog-centered modal-lg"*/}
					{/*role="document"*/}
					{/*>*/}
					<div className="modal-content modal-lg">
						<div className="modal-header">
							<h5 className="modal-title">Add Job</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => setAddJobModal(false)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div className="modal-body">
							<Formik validationSchema={jobFormValidation} initialValues={initialValues} onSubmit={submit}>
								{({ handleSubmit, errors, values, isValid, touched }) => {
									// console.log(errors);
									return (
										<form>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Title <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobTitle" component={InputText} />
														{errors.jobTitle && touched.jobTitle && (
															<span className="text-danger text-sm">{errors.jobTitle}</span>
														)}
														{/* </InputText> */}
														{/* <input className="form-control" type="text" /> */}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Department <span className="text-danger">*</span>
														</label>
														<Field
															as="select"
															className="form-control"
															name="departments"
															// value={values.departments}
															// onChange={()=>{
															//   alert('ss');
															// }}
														>
															<option value="">-</option>
															{departments &&
																departments.map((item, i) => (
																	<option value={item.id} key={item + i}>
																		{item.title}
																	</option>
																))}
															{/* <option value="webDevelopment">
                                  Web Development
                                </option>
                                <option value="applicationDevelopment">
                                  Application Development
                                </option>
                                <option value="iTManagement">
                                  IT Management
                                </option>
                                <option value="accountsManagement">
                                  Accounts Management
                                </option>
                                <option value="supportManagement">
                                  Support Management
                                </option>
                                <option value="marketing">Marketing</option> */}
														</Field>
														{errors.departments && touched.departments && (
															<span className="text-danger text-sm">{errors.departments}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Location <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobLocation" component={InputText} />
														{errors.jobLocation && touched.jobLocation && (
															<span className="text-danger text-sm">{errors.jobLocation}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															No of Vacancies <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="noOfVacancies" component={InputText} />
														{errors.noOfVacancies && touched.noOfVacancies && (
															<span className="text-danger text-sm">{errors.noOfVacancies}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Experience</label>
														<input className="form-control" value={experience} type="text" name="experience" />
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Age</label>
														<input className="form-control" value={age} type="text" name="age" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary From</label>
														<input className="form-control" value={salaryFrom} type="text" name="salaryFrom" />
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary To</label>
														<input className="form-control" value={salaryTo} type="text" name="salaryTo" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Type <span className="text-danger">*</span>
														</label>
														<Field as="select" className="select" name="jobType" value={values.jobType}>
															<option value="fullTime">Full Time</option>
															<option value="partTime">Part Time</option>
															<option value="internship">Internship</option>
															<option value="temporary">Temporary</option>
															<option value="remote">Remote</option>
															<option value="others">Others</option>
														</Field>
														{errors.jobType && touched.jobType && (
															<span className="text-danger text-sm">{errors.jobType}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Status <span className="text-danger">*</span>
														</label>
														<Field as="select" className="select" name="status">
															<option value="open">Open</option>
															<option value="closed">Closed</option>
															<option value="cancelled">Cancelled</option>
														</Field>
														{errors.status && touched.status && (
															<span className="text-danger text-sm">{errors.status}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Start Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" value={valueStartDate}
                              onChange={(value) => setValueStartDate(value)} /> */}
														<DatePickerField name="startDate" className="form-control datetimepicker" />
														{errors.startDate && touched.startDate && (
															<span className="text-danger text-sm">{errors.startDate}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Expired Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" /> */}
														<DateDropField name="endDate" className="form-control datetimepicker" />
														{errors.endDate && touched.endDate && (
															<span className="text-danger text-sm">{errors.endDate}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>
															Description <span className="text-danger">*</span>
														</label>
														<Field className="form-control" name="description" as={CustomInputComponent} />
														{errors.description && touched.description && (
															<span className="text-danger text-sm">{errors.description}</span>
														)}
														{/* <textarea className="form-control" defaultValue={""} /> */}
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button onClick={handleSubmit} type="submit" className="btn btn-primary submit-btn">
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
					{/*</div>*/}
				</Modal>
			) : (
				<Modal show={addJobModal} dialogClassName="custom-modal1 modal-lg">
					{/*<div*/}
					{/*className="modal-dialog modal-dialog-centered modal-lg"*/}
					{/*role="document"*/}
					{/*>*/}
					<div className="modal-content modal-lg">
						<div className="modal-header">
							<h5 className="modal-title">{initialValues && initialValues.action == "add" ? "Add" : "Edit"} Job</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => setAddJobModal(false)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div className="modal-body">
							<Formik
								validationSchema={jobFormValidation}
								initialValues={initialValues}
								onSubmit={submit}
								enableReinitialize={true}
							>
								{({ handleSubmit, errors, values, isValid, touched, setFieldValue }) => {
									// console.log(errors);
									return (
										<form>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Title <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobTitle" component={InputText} />
														<Field className="form-control d-none" type="text" name="action" component={InputText} />
														<Field className="form-control d-none" type="text" name="id" component={InputText} />
														{errors.jobTitle && touched.jobTitle && (
															<span className="text-danger text-sm">{errors.jobTitle}</span>
														)}
														{/* </InputText> */}
														{/* <input className="form-control" type="text" /> */}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Department <span className="text-danger">*</span>
														</label>
														{/* d = {values.departments} */}
														{/* <Field name="color"  className="form-control" as="select" onChange={()=>{alert('dd')}}>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                              </Field> */}
														<Field
															as="select"
															className="form-control"
															name="departments"
															style={{ cursor: "pointer" }}
															// value={values.departments}
															// onChange={(e)=>{
															//   setFi
															//   setDepartment(e.target.value)
															//   alert('dd')
															// }}
														>
															<option value="">-</option>
															{departments && departments.map((item) => <option value={item.id}>{item.title}</option>)}
															{/*
                                <option value="webDevelopment">
                                  Web Development
                                </option>
                                <option value="applicationDevelopment">
                                  Application Development
                                </option>
                                <option value="iTManagement">
                                  IT Management
                                </option>
                                <option value="accountsManagement">
                                  Accounts Management
                                </option>
                                <option value="supportManagement">
                                  Support Management
                                </option>
                                <option value="marketing">Marketing</option> */}
														</Field>
														{errors.departments && touched.departments && (
															<span className="text-danger text-sm">{errors.departments}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Location <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobLocation" component={InputText} />
														{errors.jobLocation && touched.jobLocation && (
															<span className="text-danger text-sm">{errors.jobLocation}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															No of Vacancies <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="noOfVacancies" component={InputText} />
														{errors.noOfVacancies && touched.noOfVacancies && (
															<span className="text-danger text-sm">{errors.noOfVacancies}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Experience</label>
														<Field className="form-control" type="text" name="experience" component={InputText} />
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Age</label>
														<Field className="form-control" type="text" name="age" component={InputText} />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary From</label>
														<Field className="form-control" type="text" name="salaryFrom" component={InputText} />
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary To</label>
														<Field className="form-control" type="text" name="salaryTo" component={InputText} />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Type <span className="text-danger">*</span>
														</label>
														<Field
															as="select"
															className="form-control"
															name="jobType"
															component="select"
															// value={initialValues.jobType}
														>
															<option value="">-</option>
															<option value="fullTime">Full Time</option>
															<option value="partTime">Part Time</option>
															<option value="internship" selected>
																Internship
															</option>
															<option value="temporary">Temporary</option>
															<option value="remote">Remote</option>
															<option value="others">Others</option>
														</Field>
														{errors.jobType && touched.jobType && (
															<span className="text-danger text-sm">{errors.jobType}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Status <span className="text-danger">*</span>
														</label>
														<Field as="select" className="form-control" name="status">
															<option value="">-</option>
															<option value="Open">Open</option>
															<option value="Closed">Closed</option>
															<option value="Cancelled">Cancelled</option>
														</Field>
														{errors.status && touched.status && (
															<span className="text-danger text-sm">{errors.status}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Start Date <span className="text-danger">*</span>
														</label>
														<DatePickerField name="startDate" className="form-control datetimepicker" />
														{errors.startDate && touched.startDate && (
															<span className="text-danger text-sm">{errors.startDate}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Expired Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" /> */}
														<DateDropField name="endDate" className="form-control datetimepicker" />
														{errors.endDate && touched.endDate && (
															<span className="text-danger text-sm">{errors.endDate}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Description <span className="text-danger">*</span>
														</label>
														<Field className="form-control" name="description" as={CustomInputComponent} />
														{errors.description && touched.description && (
															<span className="text-danger text-sm">{errors.description}</span>
														)}
														{/* <textarea className="form-control" defaultValue={""} /> */}
													</div>
												</div>

												<div className="col-md-6">
													<div className="form-group">
														<label className="col-form-label">Active Status </label>
														<br />
														<input
															className="form-control1"
															type="radio"
															name="isActive"
															value="0"
															onChange={(e) => {
																if (e.target.checked) {
																	setFieldValue("isActive", "0");
																}
															}}
														/>{" "}
														In Active &nbsp;
														<input
															className="form-control1"
															type="radio"
															name="isActive"
															value="1"
															onChange={(e) => {
																if (e.target.checked) {
																	setFieldValue("isActive", "1");
																}
															}}
														/>{" "}
														Active
														<br />
														{/* <span className="error">
                              {errors.is_married &&
                                touched.is_married &&
                                errors.is_married}
                            </span> */}
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button onClick={handleSubmit} type="submit" className="btn btn-primary submit-btn">
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>

					{/*</div>*/}
				</Modal>
			)}
			{/* /Add Job Modal */}

			{/* Edit Pop-up Form */}
			{/* Edit Job Modal */}
			{show === true ? (
				<Modal show={editModalOpen} dialogClassName="custom-modal1 modal-lg">
					{/*<div*/}
					{/*className="modal-dialog modal-dialog-centered modal-lg"*/}
					{/*role="document"*/}
					{/*>*/}
					<div className="modal-content modal-lg">
						<div className="modal-header">
							<h5 className="modal-title">Edit Job</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => setAddJobModal(false)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div className="modal-body">
							<Formik validationSchema={jobFormValidation} initialValues={initialValues} onSubmit={submit}>
								{({ handleSubmit, errors, values, isValid, touched }) => {
									// console.log(errors);
									return (
										<form>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Title <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobTitle" component={InputText} />
														{errors.jobTitle && touched.jobTitle && (
															<span className="text-danger text-sm">{errors.jobTitle}</span>
														)}
														{/* </InputText> */}
														{/* <input className="form-control" type="text" /> */}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Department <span className="text-danger">*</span>
														</label>

														<Field
															as="select"
															className="form-control"
															name="departments"
															// value={values.departments}
															// onChange={()=>{
															//   alert('ss');
															// }}
														>
															<option value="">-</option>

															{departments && departments.map((item) => <option value={item.id}>{item.title}</option>)}
															{/* <option value="webDevelopment">
                                Web Development
                              </option>
                              <option value="applicationDevelopment">
                                Application Development
                              </option>
                              <option value="iTManagement">
                                IT Management
                              </option>
                              <option value="accountsManagement">
                                Accounts Management
                              </option>
                              <option value="supportManagement">
                                Support Management
                              </option>
                              <option value="marketing">Marketing</option> */}
														</Field>
														{errors.departments && touched.departments && (
															<span className="text-danger text-sm">{errors.departments}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Location <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobLocation" component={InputText} />
														{errors.jobLocation && touched.jobLocation && (
															<span className="text-danger text-sm">{errors.jobLocation}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															No of Vacancies <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="noOfVacancies" component={InputText} />
														{errors.noOfVacancies && touched.noOfVacancies && (
															<span className="text-danger text-sm">{errors.noOfVacancies}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Experience</label>
														<input
															className="form-control"
															value={experience}
															onChange={(e) => setExperience(e.target.value)}
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Age</label>
														<input
															className="form-control"
															value={age}
															onChange={(e) => setAge(e.target.value)}
															type="text"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary From</label>
														<input
															className="form-control"
															value={salaryFrom}
															onChange={(e) => setSalaryFrom(e.target.value)}
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary To</label>
														<input
															className="form-control"
															value={salaryTo}
															onChange={(e) => setSalaryTo(e.target.value)}
															type="text"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Type <span className="text-danger">*</span>
														</label>
														<Field as="select" className="select" name="jobType" value={values.jobType}>
															<option value="fullTime">Full Time</option>
															<option value="partTime">Part Time</option>
															<option value="internship">Internship</option>
															<option value="temporary">Temporary</option>
															<option value="remote">Remote</option>
															<option value="others">Others</option>
														</Field>
														{errors.jobType && touched.jobType && (
															<span className="text-danger text-sm">{errors.jobType}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Status <span className="text-danger">*</span>
														</label>
														<Field as="select" className="select" name="status">
															<option value="open">Open</option>
															<option value="closed">Closed</option>
															<option value="cancelled">Cancelled</option>
														</Field>
														{errors.status && touched.status && (
															<span className="text-danger text-sm">{errors.status}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Start Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" value={valueStartDate}
                            onChange={(value) => setValueStartDate(value)} /> */}
														<DatePickerField name="startDate" className="form-control datetimepicker" />
														{errors.startDate && touched.startDate && (
															<span className="text-danger text-sm">{errors.startDate}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Expired Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" /> */}
														<DateDropField name="endDate" className="form-control datetimepicker" />
														{errors.endDate && touched.endDate && (
															<span className="text-danger text-sm">{errors.endDate}</span>
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>
															Description <span className="text-danger">*</span>
														</label>
														<Field className="form-control" name="description" as={CustomInputComponent} />
														{errors.description && touched.description && (
															<span className="text-danger text-sm">{errors.description}</span>
														)}

														{/* <textarea className="form-control" defaultValue={""} /> */}
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button onClick={handleSubmit} type="submit" className="btn btn-primary submit-btn">
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
					{/*</div>*/}
				</Modal>
			) : (
				<Modal show={editModalOpen} dialogClassName="custom-modal1 modal-lg">
					{/*<div*/}
					{/*className="modal-dialog modal-dialog-centered modal-lg"*/}
					{/*role="document"*/}
					{/*>*/}
					<div className="modal-content modal-lg">
						<div className="modal-header">
							<h5 className="modal-title">Edit Job</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => setEditModalOpen(false)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div className="modal-body">
							<Formik validationSchema={jobFormValidation} initialValues={initialValues} onSubmit={submit}>
								{({ handleSubmit, errors, values, isValid, touched, setFieldValue }) => {
									// console.log(errors);
									return (
										<form>
											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Title <span className="text-danger">*</span>
														</label>
														<Field
															className="form-control"
															type="text"
															name="jobTitle"
															component={InputText}
															value={editData && editData.jobtitle}
															onChange={(e) => {
																setEditData((prevState) => ({
																	...prevState.editData,
																	jobtitle: e.target.value
																}));
															}}
														/>
														{errors.jobTitle && touched.jobTitle && (
															<span className="text-danger text-sm">{errors.jobTitle}</span>
														)}
														{/* </InputText> */}
														{/* <input className="form-control" type="text" /> */}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Department <span className="text-danger">*</span>
														</label>
														<Field
															as="select"
															className="form-control"
															name="departments"
															style={{ cursor: "pointer" }}
															value={values.departments}
															onChange={(e) => {
																setFi;
																setDepartment(e.target.value);
																alert("dd");
															}}
														>
															<option value="">-</option>

															{departments && departments.map((item) => <option value={item.id}>{item.title}</option>)}
															{/*
                              <option value="webDevelopment">
                                Web Development
                              </option>
                              <option value="applicationDevelopment">
                                Application Development
                              </option>
                              <option value="iTManagement">
                                IT Management
                              </option>
                              <option value="accountsManagement">
                                Accounts Management
                              </option>
                              <option value="supportManagement">
                                Support Management
                              </option>
                              <option value="marketing">Marketing</option> */}
														</Field>
														{errors.departments && touched.departments && (
															<span className="text-danger text-sm">{errors.departments}</span>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Location <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="jobLocation" component={InputText} />
														{errors.jobLocation && touched.jobLocation && (
															<span className="text-danger text-sm">{errors.jobLocation}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															No of Vacancies <span className="text-danger">*</span>
														</label>
														<Field className="form-control" type="text" name="noOfVacancies" component={InputText} />
														{errors.noOfVacancies && touched.noOfVacancies && (
															<span className="text-danger text-sm">{errors.noOfVacancies}</span>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Experience</label>
														<input
															className="form-control"
															value={experience}
															onChange={(e) => setExperience(e.target.value)}
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Age</label>
														<input
															className="form-control"
															value={age}
															onChange={(e) => setAge(e.target.value)}
															type="text"
														/>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary From</label>
														<input
															className="form-control"
															value={salaryFrom}
															onChange={(e) => setSalaryFrom(e.target.value)}
															type="text"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>Salary To</label>
														<input
															className="form-control"
															value={salaryTo}
															onChange={(e) => setSalaryTo(e.target.value)}
															type="text"
														/>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Job Type <span className="text-danger">*</span>
														</label>
														<Field as="select" className="form-control" name="jobType" value={values.jobType}>
															<option value="">-</option>
															<option value="fullTime">Full Time</option>
															<option value="partTime">Part Time</option>
															<option value="internship">Internship</option>
															<option value="temporary">Temporary</option>
															<option value="remote">Remote</option>
															<option value="others">Others</option>
														</Field>
														{errors.jobType && touched.jobType && (
															<span className="text-danger text-sm">{errors.jobType}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Status <span className="text-danger">*</span>
														</label>
														<Field as="select" className="form-control" name="status">
															<option value="">-</option>
															<option value="Open">Open</option>
															<option value="Closed">Closed</option>
															<option value="Cancelled">Cancelled</option>
														</Field>
														{errors.status && touched.status && (
															<span className="text-danger text-sm">{errors.status}</span>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Start Date <span className="text-danger">*</span>
														</label>
														<DatePickerField name="startDate" className="form-control datetimepicker" />
														{errors.startDate && touched.startDate && (
															<span className="text-danger text-sm">{errors.startDate}</span>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label>
															Expired Date <span className="text-danger">*</span>
														</label>
														{/* <Field type="date" className="form-control datetimepicker" /> */}
														<DateDropField name="endDate" className="form-control datetimepicker" />
														{errors.endDate && touched.endDate && (
															<span className="text-danger text-sm">{errors.endDate}</span>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>
															Description <span className="text-danger">*</span>
														</label>
														<Field className="form-control" name="description" as={CustomInputComponent} />
														{errors.description && touched.description && (
															<span className="text-danger text-sm">{errors.description}</span>
														)}

														{/* <textarea className="form-control" defaultValue={""} /> */}
													</div>
												</div>
											</div>

											<div className="submit-section">
												<button onClick={handleSubmit} type="submit" className="btn btn-primary submit-btn">
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>

					{/*</div>*/}
				</Modal>
			)}

			{/* Edit Pop-up Form */}
			{/* Edit Job Modal */}

			{/*<div id="edit_job" className="modal custom-modal fade" role="dialog">*/}
			{/*<div id="edit_job" className="modal custom-modal fade" role="dialog">*/}

			{/* /Edit Job Modal */}

			{/* Delete Job Modal */}
			<div className="modal custom-modal fade" id="delete_job" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Job</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<a href="" className="btn btn-primary continue-btn">
											Delete
										</a>
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

			{/* /Delete Job Modal */}
		</div>
	);
};

export default Managedjobs;
