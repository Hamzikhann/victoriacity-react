/**
 * TermsCondition Page
 */
import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Field, Formik } from "formik";
import { Avatar_02 } from "../../../Entryfile/imagepath";
import Axios from "axios";
import Select from "react-select";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const EmployeeProfile = () => {
	const options = [
		{ value: "Father", label: "Father" },
		{ value: "Husband", label: "Husband" },
		{ value: "Mother", label: "Mother" },
		{ value: "Sibiling", label: "Sibiling" },
		{ value: "Nephew", label: "Nephew" },
		{ value: "Neice", label: "Neice" },
		{ value: "Grand Son", label: "Grand Son" },
		{ value: "Grand Daughter", label: "Grand Daughter" },
		{ value: "Grand MOther", label: "Grand MOther" },
		{ value: "Grand Father", label: "Grand Father" },
		{ value: "Uncle", label: "Uncle" },
		{ value: "N/A", label: "N/A" }
	];
	const query = useQuery();
	// const [show, setShow] = useState(false);
	const [employee, setEmployee] = useState();
	const [employeeRelation, setEmployeeRelation] = useState();
	const [projectId, setProjectById] = useState();
	const [assets, setAssets] = useState([]);
	const [optionList, setOptionList] = useState([]);

	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [initialValues, setInitialValues] = useState({
		employeeId: "",
		name: "",
		relation: "",
		dob: "",
		contact: ""
	});

	const [employeesInitialValues, setEmployeesInitialValues] = useState({
		// employeeId: "",
		// fullName: "",
		// fatherName: "",
		// relationship: "",
		contact: "",
		email: "",
		dob: "",
		// cnic: "",
		// designation: "",
		// department: "",
		// branch: "",
		address: "",
		emergencyContactName: "",
		emergencyContactNumber: "",
		// emergencyContactAddress: "",
		maritalStatus: "",
		// status: "",
		// address: "",
		// projectId: "",
		relationship: "",
		gender: ""
	});

	const [assetsInitialValues, setAssetsInitialValues] = useState({
		employeeId: query.get("id"),
		assetId: ""
	});

	// Employee API's
	const getAllEmployee = () => {
		Axios.get(baseApiUrl + "employee/list")
			.then((res) => {
				// console.log(res, 'all employee');
				setEmployee(res.data.employee[0]);
				// console.log(res.data.employee[0]);
			})
			.catch((err) => console.log(err.response.data));
	};
	const getEmployeeById = () => {
		Axios.get(baseApiUrl + `employee/id/list?id=${query.get("id")}`).then((res) => {
			// console.log(res, 'employee');
			setEmployee(res.data.Employee[0]);
		});
	};
	const editEmployeeById = (value) => {
		const formData = {
			// employeeId: query.get("id"),
			// fullName: value.fullName,
			// fatherName: value.fatherName,
			contact: value.contact,
			email: value.email,
			dob: value.dob,
			gender: value.gender,
			// cnic: value.cnic,
			maritalStatus: value.maritalStatus,
			address: value.address,
			// emergencyContactAddress: value.emergencyContactAddress,
			emergencyContactName: value.emergencyContactName,
			relationship: value.relationship,
			emergencyContactNumber: value.emergencyContactNumber
			// designation: value.designation,
			// department: value.department,
			// branch: value.branch,
			// dateOfJoining: value.dateOfJoining,
			// basicSalary: value.basicSalary,
			// status: value.status,
			// projectId: value.projectId,
		};
		Axios.put(baseApiUrl + `employee/update?id=${query.get("id")}`, formData)
			.then((res) => {
				getAllEmployee();
				getAllEmployeeRelation();
				getAllAssets();
				if (res.data.status == 200) {
					setEmployee({
						// employeeId: "",
						// fullName: "",
						// fatherName: "",
						// relationship: "",
						contact: "",
						email: "",
						dob: "",
						// cnic: "",
						// designation: "",
						// department: "",
						// branch: "",
						address: "",
						emergencyContactName: "",
						emergencyContactNumber: "",
						// emergencyContactAddress: "",
						maritalStatus: "",
						// status: "",
						// address: "",
						// projectId: "",
						relationship: "",
						gender: "",
						...employeesInitialValues
					});
				}
			})
			.catch((err) => console.log(err.response.data));
	};

	// Employee-Relation API's
	// const getAllEmployeeRelation = () => {
	//   Axios.get(baseApiUrl + "employee-relation/list")
	//     .then((res) => {
	//       setEmployeeRelation(res.data.employeeRelation[0]);
	//       console.log(res, 'employee relation');
	//     })
	// .catch((err) => console.log(err.response.data));
	// };
	// const getEmployeeRelationById = () => {
	//   Axios.get(baseApiUrl + `employee-relation/id/list?id=${query.get("id")}`).then((res) => {
	//     setEmployeeRelation(res.data.employeeRelation[0]);
	//     // console.log(query.get("id"), 'asdasdasd')
	//   });
	// };
	const addEmployeeRelation = (value) => {
		const formData = {
			employeeId: query.get("id"),
			name: value.name,
			relation: value.relation,
			dob: value.dob,
			contact: value.contact
		};
		Axios.post(baseApiUrl + "employee-relation/add", formData)
			.then((res) => {
				if (res.data.status == 200) {
					getAllEmployee();
					getAllEmployeeRelation();
					getAllAssets();
					setInitialValues({
						employeeId: "",
						name: "",
						relation: "",
						dob: "",
						contact: ""
					});
				}
			})
			.catch((err) => console.log(err.response.data));
	};
	const editEmployeeRelationById = (value) => {
		const formEditData = {
			employeeId: query.get("id"),
			name: value.name,
			relation: value.relation,
			dob: value.dob,
			contact: value.contact
		};
		// console.log("edit");
		Axios.put(baseApiUrl + `employee-relation/update?id=${query.get("id")}`, formEditData)
			.then((res) => {
				getAllEmployee();
				getAllEmployeeRelation();
				getAllAssets();
				if (res.data.status == 200) {
					setInitialValues({
						employeeId: "",
						name: "",
						relation: "",
						dob: "",
						contact: ""
					});
					// console.log("sucess");
				}
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteEmployeeRelationById = (id) => {
		Axios.delete(baseApiUrl + `employee-relation/delete?id=${id}`)
			.then((res) => {
				getAllEmployee();
				getAllEmployeeRelation();
				getAllAssets();
				if (res.data.status == 200) {
					// getAllEmployeeRelation();
					// console.log("Deleted Successfully");
				}
			})
			.catch((err) => console.log(err.response.data));
	};

	// Project API's
	const getProjectById = () => {
		Axios.get(baseApiUrl + `project/id/list?id=${query.get("id")}`).then((res) => {
			if (res.data.message === "No project Found against id") {
				setProjectById("No Project");
			} else {
				setProjectById(res.data.project[0]);
			}
		});
	};

	// Assets API's
	// const getAllAssets = () => {
	//   Axios.get(baseApiUrl + "asset/list")
	//     .then((res) => {
	//       setAssets(res.data.Asset[0]);
	//       console.log(res.data.Asset[0]);
	//     })
	//     .catch((err) => console.log(err.response.data));
	// };

	// Umer added
	const getAllAssets = () => {
		Axios.get(baseApiUrl + "asset/list")
			.then((res) => {
				res.data.Asset.map((item) => {
					setOptionList((prev) => [...prev, { label: item.name, value: item.id }]);
					// console.log(item.name);
				});
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAssetsById = () => {
		Axios.get(baseApiUrl + `employeeAsset/id/list?id=${query.get("id")}`)
			.then((res) => {
				setAssets(res.data.Employee);
				// console.log(res.data.Asset[0]);
			})
			.catch((err) => console.log(err.response.data));
	};
	const addAssets = (value) => {
		const formData = {
			employeeId: parseInt(query.get("id")),
			assetId: value.assetId
		};
		Axios.post(baseApiUrl + "employee/asset", formData)
			.then((res) => {
				if (res.data.status == 200) {
					getAllEmployee();
					// getAllEmployeeRelation();
					getAllAssets();
					setAssetsInitialValues({
						employeeId: parseInt(query.get("id")),
						assetId: ""
					});
				}
			})
			.catch((err) => console.log(err.response.data));
	};
	const editAssetsById = (value) => {
		const formData = {
			id: query.get("id"),
			name: value.name,
			type: value.type,
			model: value.model,
			brand: value.brand,
			description: value.description,
			quantity: value.quantity,
			addedDate: value.addedDate,
			expiryDate: value.expiryDate
		};
		Axios.put(baseApiUrl + `asset/update?id=${query.get("id")}`, formData)
			.then((res) => {
				getAllEmployee();
				getAllEmployeeRelation();
				getAllAssets();
				if (res.data.status == 200) {
					setAssetsInitialValues({
						id: query.get("id"),
						name: "",
						// type: "",
						// model: "",
						// brand: "",
						// description: "",
						// quantity: "",
						// addedDate: "",
						// expiryDate: "",
						...setAssetsInitialValues
					});
				}
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteAssetsById = (id) => {
		Axios.delete(baseApiUrl + `asset/delete?id=${id}`)
			.then((res) => {
				getAllEmployee();
				getAllEmployeeRelation();
				getAllAssets();
				if (res.data.status == 200) {
					// getAllEmployeeRelation();
					// console.log("Deleted Successfully");
				}
			})
			.catch((err) => console.log(err.response.data));
	};

	// console.log("Init val ", initialValues);
	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		// getEmployeeById();
		getProjectById();
		// getEmployeeRelationById();
		// getAllEmployeeRelation();
		getAssetsById();
		getAllAssets();
		// deleteAssetsById();
		getEmployeeById();
	}, []);
	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Employee Profile - HRMS admin Template</title>
				<meta name="description" content="Reactify Blank Page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row">
						<div className="col-sm-12">
							<h3 className="page-title">Profile</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Profile</li>
							</ul>
						</div>
					</div>
				</div>
				{/* /Page Header */}
				<div className="card mb-0">
					<div className="card-body">
						<div className="row">
							<div className="col-md-12">
								<div className="profile-view">
									<div className="profile-img-wrap">
										<div className="profile-img">
											<a href="#">
												<img
													className="w-100 h-100 avatar"
													alt=""
													src={employee?.image}
													onError={({ currentTarget }) => {
														currentTarget.onerror = null; // prevents looping
														currentTarget.src =
															"https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
													}}
												/>
											</a>
										</div>
									</div>
									<div className="profile-basic">
										<div className="row">
											<div className="col-md-5">
												<div className="profile-info-left">
													<h3 className="user-name m-t-0 mb-0">{employee?.fullName}</h3>
													{/* <h6 className="text-muted">UI/UX Design Team</h6> */}
													<small className="text-muted">Web Designer</small>
													<div className="staff-id">Employee ID : {employee?.employeeId}</div>
													{/*<div className="small doj text-muted">Date of Join : {format(new Date(employee?.createdAt), 'dd MMM y')}</div>*/}
													<div className="small doj text-muted">Date of Join : {employee?.createdAt}</div>
													{/* <div className="staff-msg"><Link onClick={() => localStorage.setItem("minheight", "true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
												</div>
											</div>
											<div className="col-md-7">
												<ul className="personal-info">
													<li>
														<div className="title">Phone:</div>
														<div className="text">
															<a href="">{employee?.contact}</a>
														</div>
													</li>
													<li>
														<div className="title">Email:</div>
														<div className="text">
															<a href="">{employee?.email}</a>
														</div>
													</li>
													<li>
														<div className="title">Birthday:</div>
														<div className="text">{employee?.dob}</div>
													</li>
													<li>
														<div className="title">Address:</div>
														<div className="text">{employee?.address}</div>
													</li>
													<li>
														<div className="title">Gender:</div>
														<div className="text">{employee?.gender}</div>
													</li>
													<li>
														<div className="title">Marital status</div>
														<div className="text">{employee && employee.maritalStatus}</div>
													</li>
													{/* <li>
                            <div className="title">Reports to:</div>
                            <div className="text">
                              <div className="avatar-box">
                                <div className="avatar avatar-xs">
                                  <img src={Avatar_16} alt="" />
                                </div>
                              </div>
                              <Link to="/app/profile/employee-profile">
                                Jeffery Lalor
                              </Link>
                            </div>
                          </li> */}
												</ul>
											</div>
										</div>
									</div>
									<div className="pro-edit">
										<a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#">
											<i className="fa fa-pencil" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card tab-box">
					<div className="row user-tabs">
						<div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
							<ul className="nav nav-tabs nav-tabs-bottom">
								<li className="nav-item">
									<a href="#emp_profile" data-bs-toggle="tab" className="nav-link active">
										Profile
									</a>
								</li>
								<li className="nav-item">
									<a href="#emp_projects" data-bs-toggle="tab" className="nav-link">
										Projects
									</a>
								</li>
								{/* <li className="nav-item"><a href="#bank_statutory" data-bs-toggle="tab" className="nav-link">Bank &amp; Statutory <small className="text-danger">(Admin Only)</small></a></li> */}
							</ul>
						</div>
					</div>
				</div>
				<div className="tab-content">
					{/* Profile Info Tab */}
					<div id="emp_profile" className="pro-overview tab-pane fade show active">
						{/*<div className="row">*/}
						{/*  <div className="col-md-6 d-flex">*/}
						{/*    <div className="card profile-box flex-fill">*/}
						{/*      <div className="card-body">*/}
						{/*        <h3 className="card-title">Personal Informations</h3>*/}
						{/*        /!* <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#personal_info_modal"><i className="fa fa-pencil" /></a> *!/*/}
						{/*        <ul className="personal-info">*/}
						{/*          /!* <li>*/}
						{/*            <div className="title">Passport No.</div>*/}
						{/*            <div className="text">9876543210</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Passport Exp Date.</div>*/}
						{/*            <div className="text">9876543210</div>*/}
						{/*          </li> *!/*/}
						{/*          <li>*/}
						{/*            <div className="title">Tel</div>*/}
						{/*            <div className="text"><a href="">{employee && employee.contact}</a></div>*/}
						{/*          </li>*/}
						{/*          /!* <li>*/}
						{/*            <div className="title">Nationality</div>*/}
						{/*            <div className="text">Indian</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Religion</div>*/}
						{/*            <div className="text">Christian</div>*/}
						{/*          </li> *!/*/}
						{/*          <li>*/}
						{/*            <div className="title">Marital status</div>*/}
						{/*            <div className="text">{employee && employee.maritalStatus}</div>*/}
						{/*          </li>*/}
						{/*          /!* <li>*/}
						{/*            <div className="title">Employment of spouse</div>*/}
						{/*            <div className="text">No</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">No. of children</div>*/}
						{/*            <div className="text">2</div>*/}
						{/*          </li> *!/*/}
						{/*        </ul>*/}
						{/*      </div>*/}
						{/*    </div>*/}
						{/*  </div>*/}
						{/*  <div className="col-md-6 d-flex">*/}
						{/*    <div className="card profile-box flex-fill">*/}
						{/*      <div className="card-body">*/}
						{/*        <h3 className="card-title">Emergency Contact </h3>*/}
						{/*        /!* <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#emergency_contact_modal"><i className="fa fa-pencil" /></a> *!/*/}
						{/*        /!* <h5 className="section-title">Primary</h5> *!/*/}
						{/*        <ul className="personal-info">*/}
						{/*          <li>*/}
						{/*            <div className="title">Name</div>*/}
						{/*            <div className="text">{employee && employee.emergencyContactName}</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Relationship</div>*/}
						{/*            <div className="text">{employee && employee.relationship}</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Phone </div>*/}
						{/*            <div className="text">{employee && employee.emergencyContactNumber}</div>*/}
						{/*          </li>*/}
						{/*        </ul>*/}
						{/*        /!* <hr /> *!/*/}
						{/*        /!* <h5 className="section-title">Secondary</h5>*/}
						{/*        <ul className="personal-info">*/}
						{/*          <li>*/}
						{/*            <div className="title">Name</div>*/}
						{/*            <div className="text">Karen Wills</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Relationship</div>*/}
						{/*            <div className="text">Brother</div>*/}
						{/*          </li>*/}
						{/*          <li>*/}
						{/*            <div className="title">Phone </div>*/}
						{/*            <div className="text">9876543210, 9876543210</div>*/}
						{/*          </li>*/}
						{/*        </ul> *!/*/}
						{/*      </div>*/}
						{/*    </div>*/}
						{/*  </div>*/}
						{/*</div>*/}
						<div className="row">
							{/* <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Bank information</h3>
                    <ul className="personal-info">
                      <li>
                        <div className="title">Bank name</div>
                        <div className="text">ICICI Bank</div>
                      </li>
                      <li>
                        <div className="title">Bank account No.</div>
                        <div className="text">159843014641</div>
                      </li>
                      <li>
                        <div className="title">IFSC Code</div>
                        <div className="text">ICI24504</div>
                      </li>
                      <li>
                        <div className="title">PAN No</div>
                        <div className="text">TC000Y56</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
							{/*<div className="col-md-6 d-flex">*/}
							{/*  <div className="card profile-box flex-fill">*/}
							{/*    <div className="card-body">*/}
							{/*      <h3 className="card-title">Family Informations*/}
							{/*        <a href="#"*/}
							{/*          className="edit-icon"*/}
							{/*          data-bs-toggle="modal"*/}
							{/*          data-bs-target="#family_info_add_modal"*/}
							{/*          onClick={() => {*/}
							{/*            setAddFamilyInfoModal(true);*/}
							{/*          }}*/}
							{/*        ><i className="fa fa-pencil" /></a></h3>*/}
							{/*      <div className="table-responsive">*/}
							{/*        <table className="table table-nowrap">*/}
							{/*          <thead>*/}
							{/*            <tr>*/}
							{/*              <th>Name</th>*/}
							{/*              <th>Relationship</th>*/}
							{/*              <th>Date of Birth</th>*/}
							{/*              <th>Phone</th>*/}
							{/*              <th />*/}
							{/*            </tr>*/}
							{/*          </thead>*/}
							{/*          <tbody>*/}
							{/*            <tr>*/}
							{/*              <td>{employeeRelation && employeeRelation.name}</td>*/}
							{/*              <td>{employeeRelation && employeeRelation.relation}</td>*/}
							{/*              <td>{employeeRelation && employeeRelation.dob}</td>*/}
							{/*              <td>{employeeRelation && employeeRelation.contact}</td>*/}
							{/*              <td className="text-end">*/}
							{/*                <div className="dropdown dropdown-action">*/}
							{/*                  <Link to="/" aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></Link>*/}
							{/*                  <div className="dropdown-menu dropdown-menu-right">*/}
							{/* <img src="a83639fcf36345a6008d1306ce6355a2" alt="" /> */}
							{/*                    <Link*/}
							{/*                      to="/"*/}
							{/*                      className="dropdown-item"*/}
							{/*                      data-bs-toggle="modal"*/}
							{/*                      data-bs-target="#family_info_edit_modal"*/}
							{/*                      onClick={() => setInitialValues({*/}
							{/*                        employeeId: "",*/}
							{/*                        name: "",*/}
							{/*                        relation: "",*/}
							{/*                        dob: "",*/}
							{/*                        contact: "",*/}
							{/*                        ...employeeRelation*/}
							{/*                      })}*/}
							{/*                    ><i className="fa fa-pencil m-r-5" /> Edit</Link>*/}
							{/*                    <Link to="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#family_info_delete_modal"><i className="fa fa-trash-o m-r-5" /> Delete</Link>*/}
							{/*                  </div>*/}
							{/*                </div>*/}
							{/*              </td>*/}
							{/*            </tr>*/}
							{/*          </tbody>*/}
							{/*        </table>*/}
							{/*      </div>*/}
							{/*    </div>*/}
							{/*  </div>*/}
							{/*</div>*/}
							<div className="col-md-6 d-flex">
								<div className="card profile-box flex-fill">
									<div className="card-body">
										<h3 className="card-title">
											Assets{" "}
											<a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#add_assets_modal">
												<i className="fa fa-pencil" />
											</a>
										</h3>
										<div className="table-responsive">
											<table className="table table-nowrap">
												<thead>
													<tr>
														<th>Name</th>
														<th>Type</th>
														<th>Model</th>
														<th>Brand</th>
														<th>Description</th>
														<th>Quantity</th>
														<th>Added Date</th>
														<th>Expiry Date</th>
														<th />
													</tr>
												</thead>
												<tbody>
													{assets?.map((asset, i) => (
														<tr>
															<td>{asset?.Asset?.name}</td>
															<td>{asset?.Asset?.type}</td>
															<td>{asset?.Asset?.model}</td>
															<td>{asset?.Asset?.brand}</td>
															<td>{asset?.Asset?.description}</td>
															<td>{asset?.Asset?.quantity}</td>
															<td>{asset?.Asset?.addedDate}</td>
															<td>{asset?.Asset?.expiryDate}</td>
															{/*<td className="text-end">*/}
															{/*<div className="dropdown dropdown-action">*/}
															{/*  <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>*/}
															{/*  <div className="dropdown-menu dropdown-menu-right">*/}
															{/*    /!*<a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit_assets_modal"><i className="fa fa-pencil m-r-5" /> Edit</a>*!/*/}
															{/*    <a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_assets_modal"><i className="fa fa-trash-o m-r-5" /> Delete</a>*/}
															{/*  </div>*/}
															{/*</div>*/}
															{/*</td>*/}
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6 d-flex">
								<div className="card profile-box flex-fill">
									<div className="card-body">
										<h3 className="card-title">Emergency Contact </h3>
										{/* <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#emergency_contact_modal"><i className="fa fa-pencil" /></a> */}
										{/* <h5 className="section-title">Primary</h5> */}
										<ul className="personal-info">
											<li>
												<div className="title">Name</div>
												<div className="text">{employee && employee.emergencyContactName}</div>
											</li>
											<li>
												<div className="title">Relationship</div>
												<div className="text">{employee && employee.relationship}</div>
											</li>
											<li>
												<div className="title">Phone </div>
												<div className="text">{employee && employee.emergencyContactNumber}</div>
											</li>
										</ul>
										{/* <hr /> */}
										{/* <h5 className="section-title">Secondary</h5>
                    <ul className="personal-info">
                      <li>
                        <div className="title">Name</div>
                        <div className="text">Karen Wills</div>
                      </li>
                      <li>
                        <div className="title">Relationship</div>
                        <div className="text">Brother</div>
                      </li>
                      <li>
                        <div className="title">Phone </div>
                        <div className="text">9876543210, 9876543210</div>
                      </li>
                    </ul> */}
									</div>
								</div>
							</div>
						</div>
						{/* <div className="row">
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Education Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#education_info"><i className="fa fa-pencil" /></a></h3>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">International College of Arts and Science (UG)</a>
                              <div>Bsc Computer Science</div>
                              <span className="time">2000 - 2003</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">International College of Arts and Science (PG)</a>
                              <div>Msc Computer Science</div>
                              <span className="time">2000 - 2003</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Experience <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#experience_info"><i className="fa fa-pencil" /></a></h3>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Zen Corporation</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Ron-tech</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Dalt Technology</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
					</div>
					{/* /Profile Info Tab */}
					{/* Projects Tab */}
					<div className="tab-pane fade" id="emp_projects">
						<div className="row">
							<div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
								<div className="card">
									<div className="card-body">
										{/* <div className="dropdown profile-action">
                      <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div> */}
										<h4 className="project-title">
											<Link to={`/app/projects/projects-view?id=${query.get("id")}`}>
												{projectId && projectId.name}
											</Link>
										</h4>
										{/* <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">9</span> <span className="text-muted">tasks completed</span>
                    </small> */}
										<p className="text-muted">{projectId && projectId.description}</p>
										{/* <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div> */}
									</div>
								</div>
							</div>
							<>
								{/* <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Project Management</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">5</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Video Calling App</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">3</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Hospital Administration</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">4</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div> */}
							</>
						</div>
					</div>
					{/* /Projects Tab */}
					{/* Bank Statutory Tab */}
					{/* <div */}
					{/* /Bank Statutory Tab */}
				</div>
			</div>
			{/* /Page Content */}
			{/* Profile Modal */}
			<div id="profile_info" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Profile Information</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={employeesInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.contact) {
										errors.contact = "Phone Number is required";
									}
									if (!values.email) {
										errors.email = "Email is required";
									}
									if (!values.dob) {
										errors.dob = "Date of Birth is required";
									}
									if (!values.emergencyContactName) {
										errors.emergencyContactName = "Emergency Contact Name is required";
									}
									if (!values.emergencyContactNumber) {
										errors.emergencyContactNumber = "Emergency Contact Number is required";
									}
									if (!values.maritalStatus) {
										errors.maritalStatus = "Marital Status is required";
									}
									if (!values.relationship) {
										errors.relationship = "Relationship is required";
									}
									if (!values.gender) {
										errors.gender = "Gender is required";
									}
									if (!values.address) {
										errors.address = "Address is required";
									}
								}}
								onSubmit={editEmployeeById}
								enableReinitialize
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
										<form>
											<div className="row">
												<div className="col-md-12">
													<div className="profile-img-wrap edit-img">
														<img className="inline-block" src={Avatar_02} alt="user" />
														<div className="fileupload btn">
															<span className="btn-text">edit</span>
															<input className="upload" type="file" />
														</div>
													</div>
													<div className="row">
														<div className="col-md-6">
															<div className="form-group">
																<label>Phone</label>
																<input
																	className="form-control"
																	value={values.contact}
																	type="text"
																	placeholder="Phone Number"
																	onChange={(e) => {
																		setFieldValue("contact", e.target.value);
																	}}
																/>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Email</label>
																<div>
																	<input
																		className="form-control"
																		value={values.email}
																		type="email"
																		onChange={(e) => {
																			setFieldValue("email", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Birth Date</label>
																<div>
																	<input
																		className="form-control datetimepicker"
																		value={values.dob}
																		type="date"
																		onChange={(e) => {
																			setFieldValue("dob", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Address</label>
																<input
																	type="text"
																	value={values.address}
																	className="form-control"
																	placeholder="Address"
																	onChange={(e) => {
																		setFieldValue("address", e.target.value);
																	}}
																/>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Gender</label>
																<div>
																	<input
																		className="form-control"
																		value={values.gender}
																		type="text"
																		placeholder="Gender"
																		onChange={(e) => {
																			setFieldValue("gender", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>

														<div className="col-md-6">
															<div className="form-group">
																<label>Marital Status</label>
																<div>
																	<input
																		className="form-control"
																		value={values.maritalStatus}
																		type="text"
																		placeholder="Marital Status"
																		onChange={(e) => {
																			setFieldValue("maritalStatus", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Emergency Contact Name</label>
																<div>
																	<input
																		className="form-control"
																		value={values.emergencyContactName}
																		type="text"
																		placeholder="Emergency Contact Name"
																		onChange={(e) => {
																			setFieldValue("emergencyContactName", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Emergency Contact Number</label>
																<div>
																	<input
																		className="form-control"
																		value={values.emergencyContactNumber}
																		type="text"
																		placeholder="Emergency Contact Number"
																		onChange={(e) => {
																			setFieldValue("emergencyContactNumber", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<label>Relationship</label>
																<div>
																	<input
																		className="form-control"
																		value={values.relationship}
																		type="text"
																		placeholder="Relationship"
																		onChange={(e) => {
																			setFieldValue("relationship", e.target.value);
																		}}
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button
													className="btn btn-primary submit-btn"
													type="submit"
													data-bs-dismiss="modal"
													onClick={handleSubmit}
													disabled={!isValid}
												>
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>

			<>
				{/* /Profile Modal */}
				{/* Personal Info Modal */}
				{/* <div id="personal_info_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport No</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport Expiry Date</label>
                      <div>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tel</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nationality <span className="text-danger">*</span></label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Religion</label>
                      <div>
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Marital status <span className="text-danger">*</span></label>
                      <select className="select form-control">
                        <option>-</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Employment of spouse</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No. of children </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
				{/* /Personal Info Modal */}
			</>

			{/* Family Info Modal */}
			{/* Add Family Info Modal */}
			<div id="family_info_add_modal" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title"> Family Informations</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={initialValues}
								validate={(values) => {
									const errors = {};
									if (!values.name) {
										errors.name = "Name is required";
									}
									if (!values.relation) {
										errors.relation = "Relationship is required";
									}
									if (!values.contact) {
										errors.contact = "Contact No is required";
									}
									if (!values.dob) {
										errors.dob = "Date of Birth is required";
									}
									return errors;
								}}
								onSubmit={addEmployeeRelation}
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
										<form>
											<div className="form-scroll">
												<div className="card">
													<div className="card-body">
														<h3 className="card-title">Family Member</h3>
														<div className="row">
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Name <span className="text-danger">*</span>
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
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Relationship <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("relation", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.relation && touched.relation && errors.relation}
																	</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Date of birth <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="date"
																		onChange={(e) => {
																			setFieldValue("dob", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.dob && touched.dob && errors.dob}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Phone <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("contact", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.contact && touched.contact && errors.contact}</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												{/* <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Relationship <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date of birth <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div> */}
											</div>
											<div className="submit-section">
												<button
													className="btn btn-primary submit-btn"
													type="submit"
													data-bs-dismiss="modal"
													onClick={handleSubmit}
												>
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			{/* Add Family Info Modal */}
			{/* Update Family Info Modal*/}
			<div id="family_info_edit_modal" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title"> Family Informations</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={initialValues}
								validate={(values) => {
									const errors = {};
									if (!values.name) {
										errors.name = "Name is required";
									}
									if (!values.relation) {
										errors.relation = "Relationship is required";
									}
									if (!values.contact) {
										errors.contact = "Contact No is required";
									}
									if (!values.dob) {
										errors.dob = "Date of Birth is required";
									}
									return errors;
								}}
								onSubmit={editEmployeeRelationById}
								enableReinitialize
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
										<form>
											<div className="form-scroll">
												<div className="card">
													<div className="card-body">
														<h3 className="card-title">Family Member</h3>
														<div className="row">
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Name <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		value={values.name}
																		type="text"
																		onChange={(e) => {
																			setFieldValue("name", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.name && touched.name && errors.name}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Relationship <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		value={values.relation}
																		onChange={(e) => {
																			setFieldValue("relation", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.relation && touched.relation && errors.relation}
																	</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Date of birth <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		value={values.dob}
																		onChange={(e) => {
																			setFieldValue("dob", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.dob && touched.dob && errors.dob}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Phone <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		value={values.contact}
																		onChange={(e) => {
																			setFieldValue("contact", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.contact && touched.contact && errors.contact}</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button
													className="btn btn-primary submit-btn"
													type="submit"
													data-bs-dismiss="modal"
													disabled={!isValid}
													onClick={handleSubmit}
												>
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			{/* Update Family Info Modal*/}
			{/* Delete Family Info Modal */}
			<div className="modal custom-modal fade" id="family_info_delete_modal" role="dialog">
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
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteEmployeeRelationById(query.get("id"))}
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
			{/* Delete Family Info Modal */}
			{/* Family Info Modal */}

			{/* Assets Modal */}
			{/* Add Assets Modal */}
			<div id="add_assets_modal" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title"> Add Assets</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={assetsInitialValues}
								// validate={(values) => {
								//   const errors = {};
								//   if (!values.name) {
								//     errors.name = "Name is required";
								//   }
								//   if (!values.type) {
								//     errors.type = "Type is required";
								//   }
								//   if (!values.model) {
								//     errors.model = "Model No is required";
								//   }
								//   if (!values.brand) {
								//     errors.brand = "Brand is required";
								//   }
								//   if (!values.description) {
								//     errors.description = "Description is required";
								//   }
								//   if (!values.quantity) {
								//     errors.quantity = "Quantity No is required";
								//   }
								//   if (!values.addedDate) {
								//     errors.addedDate = "Added Date is required";
								//   }
								//   if (!values.expiryDate) {
								//     errors.expiryDate = "Expiry Date is required";
								//   }
								//   return errors;
								// }}
								onSubmit={addAssets}
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
										<form>
											<div className="form-group">
												<label>
													Select Asset <span className="text-danger">*</span>
												</label>
												<Select
													placeholder="Select Asset"
													options={optionList}
													onChange={(value) => {
														setFieldValue("assetId", value.value);
													}}
												/>
											</div>

											<div className="submit-section">
												<button
													className="btn btn-primary submit-btn"
													type="submit"
													data-bs-dismiss="modal"
													onClick={handleSubmit}
												>
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			{/* Add Assets Modal */}
			{/* Update Assets Modal*/}
			<div id="edit_assets_modal" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title"> Edit</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={assetsInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.name) {
										errors.name = "Name is required";
									}
									if (!values.type) {
										errors.type = "Type is required";
									}
									if (!values.model) {
										errors.model = "Model No is required";
									}
									if (!values.brand) {
										errors.brand = "Brand is required";
									}
									if (!values.description) {
										errors.description = "Description is required";
									}
									if (!values.quantity) {
										errors.quantity = "Quantity No is required";
									}
									if (!values.addedDate) {
										errors.addedDate = "Added Date is required";
									}
									if (!values.expiryDate) {
										errors.expiryDate = "Expiry Date is required";
									}
									return errors;
								}}
								onSubmit={editAssetsById}
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
										<form>
											<div className="form-scroll">
												<div className="card">
													<div className="card-body">
														<h3 className="card-title">Assets</h3>
														<div className="row">
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Name <span className="text-danger">*</span>
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
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Type <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("type", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.type && touched.type && errors.type}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Model <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("model", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.model && touched.model && errors.model}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Brand <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("brand", e.target.value);
																		}}
																	/>
																	<span className="error">{errors.brand && touched.brand && errors.brand}</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Description <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("description", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.description && touched.description && errors.description}
																	</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Quantity <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("quantity", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.quantity && touched.quantity && errors.quantity}
																	</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Added Date <span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("addedDate", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.addedDate && touched.addedDate && errors.addedDate}
																	</span>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<label>
																		Expiry Date<span className="text-danger">*</span>
																	</label>
																	<input
																		className="form-control"
																		type="text"
																		onChange={(e) => {
																			setFieldValue("expiryDate", e.target.value);
																		}}
																	/>
																	<span className="error">
																		{errors.expiryDate && touched.expiryDate && errors.expiryDate}
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="submit-section">
												<button
													className="btn btn-primary submit-btn"
													type="submit"
													// disabled={isValid}
													data-bs-dismiss="modal"
													onClick={handleSubmit}
												>
													Submit
												</button>
											</div>
										</form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			{/* Update Assets Modal*/}
			{/* Delete Assets Modal */}
			<div id="delete_assets_modal" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Assets</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteAssetsById(query.get("id"))}
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
			{/* Delete Asset Modal */}
			{/* Assets Modal */}

			<div>
				{/* Emergency Contact Modal */}
				{/* <div id="emergency_contact_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Relationship <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Relationship <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
				{/* /Emergency Contact Modal */}
				{/* Education Modal */}
				{/* <div id="education_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Informations</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
				{/* /Education Modal */}
				{/* Experience Modal */}
				{/* <div id="experience_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Experience Informations</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Experience Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Digital Devlopment Inc" />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="United States" />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Web Developer" />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="01/07/2007" />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="08/06/2018" />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Experience Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Digital Devlopment Inc" />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="United States" />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Web Developer" />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="01/07/2007" />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="08/06/2018" />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
				{/* /Experience Modal */}
			</div>
		</div>
	);
};
export default EmployeeProfile;
