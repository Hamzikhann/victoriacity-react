import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
import ReactSummernote from "react-summernote";
import { Field, Formik } from "formik";
import { Modal, Form } from "react-bootstrap";
import Select from "react-select";
import "react-summernote/dist/react-summernote.css"; // import styles
import "../../index.css";
import useItems from "antd/lib/menu/hooks/useItems";
import { toast, ToastContainer } from "react-toastify";
import DropdownTreeSelect from "react-dropdown-tree-select";

const AcoountProject = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [customers, setcustomers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowIncomeModal, setIsShowIncomeModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [editproject, setEditproject] = useState(null);
	const [deleteElementId, setDeleteElementId] = useState(true);
	const [query, setQuery] = useState("");
	const [loading, setloading] = useState(false);
	const [treeData, setTreeData] = useState([]);
	const location = useLocation();
	// console.log("TTTTTTTTTTTTTTTTTT", location.pathname.split("/accounts/")[1]);

	const priorityOptions = [
		{ value: "0", label: "None" },
		{ value: "high", label: "High" },
		{ value: "medium", label: "Medium" },
		{ value: "low", label: "Low" }
	];

	const statusOptions = [
		{ value: "0", label: "None" },
		{ value: "Active", label: "Active" },
		{ value: "InActive", label: "InActive" }
	];
	const pOptions = [
		{ value: "high", label: "High" },
		{ value: "medium", label: "Medium" },
		{ value: "low", label: "Low" }
	];

	const sOptions = [
		{ value: "Active", label: "Active" },
		{ value: "InActive", label: "InActive" }
	];

	const handlePriorityChange = (event) => {
		if (event.value === "high") {
			setFilteredProjects(projects.filter((item) => item.priority === "high"));
		} else if (event.value === "medium") {
			setFilteredProjects(projects.filter((item) => item.priority === "medium"));
		} else if (event.value === "low") {
			setFilteredProjects(projects.filter((item) => item.priority === "low"));
		} else {
			setFilteredProjects(projects);
		}
	};
	// console.log(projects);

	const handleStatusChange = (event) => {
		if (event.value === "Active") {
			setFilteredProjects(projects.filter((item) => item.status === "active"));
		} else if (event.value === "InActive") {
			setFilteredProjects(projects.filter((item) => item.status === "InActive"));
		} else {
			setFilteredProjects(projects);
		}
	};

	const getAllCustomers = () => {
		Axios.get(baseApiUrl + "customer/list")
			.then((res) => {
				setcustomers(res.data.customers);
			})
			.catch((err) => console.log(err.response?.data));
	};

	const deleteProject = () => {
		// console.log("XXXXXXXXXXXXXX", deleteElementId);
		Axios.delete(baseApiUrl + `project/delete?id=${deleteElementId}`)
			.then((res) => {
				getAllProjects();
				if (res.status == 200) {
					toast.success(res.data.message);
				}
			})
			.catch((err) => toast.error(err.response?.data?.message));
	};

	const getAllProjects = () => {
		Axios.get(baseApiUrl + "/project/list")
			.then((res) => {
				setProjects(res.data.project);
				setFilteredProjects(res.data.project);
			})
			.catch((err) => console.log(err.response?.data));
	};

	useEffect(() => {
		getAllCustomers();
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
	const onImageUpload = (fileList) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			ReactSummernote.insertImage(reader.result);
		};
		reader.readAsDataURL(fileList[0]);
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
				<title>Projects - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Account Project</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard </Link>
								</li>
								<li className="breadcrumb-item active">Account Project</li>
							</ul>
						</div>
						{/* <div className="col-auto float-end ml-auto">
              <p
                href="#"
                className="btn add-btn"
                onClick={() => setIsShowProjectModal(true)}
              >
                <i className="fa fa-plus" /> Create Project
              </p>

            </div> */}
					</div>
				</div>
				{/* /Page Header */}
				{/* Search Filter */}
				{/* <div className="row filter-row ">
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Name"
                className="form-control"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <Select
                placeholder="Priority"
                options={priorityOptions}
                onChange={(event) => handlePriorityChange(event)}
              />
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <Select
                placeholder="Status"
                options={statusOptions}
                onChange={(event) => handleStatusChange(event)}
              />
            </div>
          </div>

        </div> */}
				{/* Search Filter */}
				<div className="row">
					{filteredProjects &&
						filteredProjects
							.filter((item) => {
								if (query === "") {
									return item;
								} else if (item.name.toLowerCase().includes(query.toLowerCase())) {
									return item;
								}
							})
							.map((project, i) => (
								<>
									<div className="col-lg-4 col-sm-6 col-md-4 col-xl-4">
										<div className="card">
											<div className="card-body">
												{/* <div className="dropdown dropdown-action profile-action">
                          <a
                            href="#"
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="material-icons">more_vert</i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <p
                            className="dropdown-item"
                            onClick={() => {
                              setIsShowEditProjectModal(true);
                              setEditproject(project);
                            }}
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </p>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_project"
                              onClick={() => setDeleteElementId(project.id)}
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div> */}

												<h4 className="project-title" style={{ textAlign: "center" }}>
													<Link to={`/app/accounts/${location.pathname.split("/accounts/")[1]}/${project.id}`}>
														<span className="curson-pointer" style={{ fontSize: "20px" }}>
															{project.name}
														</span>
													</Link>
												</h4>

												{/* <small className="block text-ellipsis m-b-15">
                        <span className="text-xs">1</span>{" "}
                        <span className="text-muted">open tasks, </span>
                        <span className="text-xs">9</span>{" "}
                        <span className="text-muted">tasks completed</span>
                      </small> */}
												{/* <p className="text-muted">{project?.description}</p>
                        <div className="pro-deadline m-b-15">
                          <div className="sub-title">Deadline:</div>
                          <div className="text-muted">
                            {project.startDate + " - " + project.endDate}
                          </div>
                        </div> */}
												{/* <div className="project-members m-b-15">
                        <div>Project Leader :</div>
                        <ul className="team-members">
                          <li>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Jeffery Lalor"
                            >
                              <img alt="" src={Avatar_16} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Team :</div>
                        <ul className="team-members">
                          <li>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="John Doe"
                            >
                              <img alt="" src={Avatar_02} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Richard Miles"
                            >
                              <img alt="" src={Avatar_09} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="John Smith"
                            >
                              <img alt="" src={Avatar_10} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Mike Litorus"
                            >
                              <img alt="" src={Avatar_05} />
                            </a>
                          </li>
                          <li className="dropdown avatar-dropdown">
                            <a
                              href="#"
                              className="all-users dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              +15
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <div className="avatar-group">
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_02} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_09} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_10} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_05} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_11} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_12} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_13} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_01} />
                                </a>
                                <a className="avatar avatar-xs" href="#">
                                  <img alt="" src={Avatar_16} />
                                </a>
                              </div>
                              <div className="avatar-pagination">
                                <ul className="pagination">
                                  <li className="page-item">
                                    <a
                                      className="page-link"
                                      href="#"
                                      aria-label="Previous"
                                    >
                                      <span aria-hidden="true">«</span>
                                      <span className="sr-only">Previous</span>
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      2
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      className="page-link"
                                      href="#"
                                      aria-label="Next"
                                    >
                                      <span aria-hidden="true">»</span>
                                      <span className="sr-only">Next</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <p className="m-b-5">
                        Progress{" "}
                        <span className="text-success float-end">40%</span>
                      </p>
                      <div className="progress progress-xs mb-0">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          data-bs-toggle="tooltip"
                          title="40%"
                          style={{ width: "40%" }}
                        />
                      </div> */}
											</div>
										</div>
									</div>
								</>
							))}
				</div>
			</div>

			{/* Delete Project Modal */}
			{deleteElementId && (
				<div className="modal custom-modal fade" id="delete_project" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Project</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<p
												className="btn btn-primary continue-btn"
												data-bs-toggle="modal"
												data-bs-target="#delete_project"
												onClick={() => deleteProject()}
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
			)}
			{/* /Delete Project Modal */}

			{/* Edit Project Modal */}
			{/* {editproject && (
        <Editproject
          project={editproject}
          isShowEditProjectModal={isShowEditProjectModal}
          setIsShowEditProjectModal={setIsShowEditProjectModal}
        />
      )} */}
			{/* /Edit Project Modal */}
			{/* /Page Content */}

			{/* Create Project Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create Project</h5>
						<button type="button" className="close" onClick={() => setIsShowProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={{
								name: "",
								description: "",
								status: "",
								startDate: "",
								endDate: "",
								priority: "",
								customerId: ""
							}}
							validate={(values) => {
								const errors = {};
								if (!values.name) {
									errors.name = " Name is required";
								}
								if (!values.description) {
									errors.description = "Description is required";
								}
								if (!values.startDate) {
									errors.startDate = "Start Date is required";
								}

								if (!values.status) {
									errors.status = "Status is required";
								}
								if (!values.endDate) {
									errors.endDate = "End Date is required";
								}
								if (!values.customerId) {
									errors.customerId = "Customer Id is required";
								}
								if (!values.priority) {
									errors.priority = "Priority is required";
								}
								console.log("errors", errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								// console.log("klsdjaklasdj", formData)
								const formData = {
									name: values.name,
									description: values.description,
									status: values.status,
									startDate: values.startDate,
									endDate: values.endDate,
									priority: values.priority,
									customerId: values.customerId,
									image: values.image
								};
								// console.log("FF", formData);
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};

								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "/project/add", formData, header);
									if (res.data.status == 200) {
										getAllProjects();
										setIsShowProjectModal(false);
										setloading(false);
										toast.success(res.data.message);
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
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Project Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
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
													Client <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Client"
													options={customers?.map((item) => {
														return {
															value: item.id,
															label: `${item.fullName} - ${item.companyName}`
														};
													})}
													onChange={(value) => {
														setFieldValue("customerId", value.value);
													}}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Start Date <span className="text-danger">*</span>
												</label>
												<div>
													<input
														className="form-control datetimepicker"
														type="date"
														onChange={(e) => {
															setFieldValue("startDate", e.target.value);
														}}
													/>
													<span className="error">{errors.startDate && touched.startDate && errors.startDate}</span>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													End Date <span className="text-danger">*</span>
												</label>
												<div>
													<input
														className="form-control datetimepicker"
														type="date"
														onChange={(e) => {
															setFieldValue("endDate", e.target.value);
														}}
													/>
													<span className="error">{errors.endDate && touched.endDate && errors.endDate}</span>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Priority <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Priority"
													options={pOptions}
													onChange={(value) => {
														setFieldValue("priority", value.value);
													}}
												/>
												<span className="error">{errors.priority && touched.priority && errors.priority}</span>
											</div>
										</div>

										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Status <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Status"
													options={sOptions}
													onChange={(value) => {
														setFieldValue("status", value.value);
													}}
												/>
												<span className="error">{errors.status && touched.status && errors.status}</span>
											</div>
										</div>
									</div>

									{/* <label></label> */}
									{/* <ReactSummernote
                        value="Default value"
                        options={{
                          lang: "ru-RU",
                          height: 350,
                          dialogsInBody: true,
                          toolbar: [
                            ["style", ["style"]],
                            ["font", ["bold", "underline", "clear"]],
                            ["fontname", ["fontname"]],
                            ["para", ["ul", "ol", "paragraph"]],
                            ["table", ["table"]],
                            ["insert", ["link", "picture", "video"]],
                            ["view", ["fullscreen", "codeview"]],
                          ],
                        }}
                        // onChange={this.onChange}
                        onImageUpload={onImageUpload}
                      /> */}

									<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
										<Form.Label>
											Description <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											as="textarea"
											style={{ height: "200px" }}
											rows={3}
											onChange={(e) => {
												setFieldValue("description", e.target.value);
											}}
										/>
										<span className="error">{errors.description && touched.description && errors.description}</span>
									</Form.Group>
									<div className="form-group">
										<label>Upload Files</label>
										<input
											className="form-control"
											type="file"
											onChange={(e) => {
												console.log(e.target.files[0], " img ");
												setFieldValue("image", e.target.files[0]);
											}}
										/>
										{/* <span className="error">
                              {errors.userImage && touched.userImage && errors.userImage}
                            </span> */}
									</div>
									<div className="submit-section">
										{loading ? (
											<button type="submit" disabled={true} className="btn btn-primary submit-btn">
												<div class="spinner-border text-warning" role="status">
													<span class="sr-only">Loading...</span>
												</div>
											</button>
										) : (
											<button
												type="submit"
												// onClick={handleSubmit}
												className="btn btn-primary submit-btn"
											>
												Submit
											</button>
										)}
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>
			{/* /Create Project Modal */}
		</div>
	);
};

export default AcoountProject;
