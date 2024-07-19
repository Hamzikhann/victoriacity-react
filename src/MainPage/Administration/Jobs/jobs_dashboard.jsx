/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import { dateCalculate } from "../../../../helper/helper";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const JobsDashboard = () => {
	const [jobsData, setjobsData] = useState(null);
	const [employeeData, setEmployeeData] = useState(null);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [baseApiUrlRoot, setBaseApiUrlRoot] = useState(process.env.REACT_APP_API_URL);

	const getjobsData = () => {
		Axios.get(baseApiUrl + "job/dashboard")
			.then((res) => {
				setjobsData(res.data);
				// console.log(res.data, "nnnnjjjlll");
			})
			.catch((err) => console.log(err.response.data));
	};

	const getEmployeeData = () => {
		Axios.get(baseApiUrl + "employee/list")
			.then((res) => {
				setEmployeeData(res.data);
				// console.log(res.data, "nnnnjjjlll");
			})
			.catch((err) => console.log(err.response.data));
	};

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getjobsData();
		getEmployeeData();
		// console.log(jobsData);
	}, []);

	return (
		<>
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<Helmet>
					<title>Job Dashboard - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">Job Dashboard</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item">Jobs</li>
									<li className="breadcrumb-item active">Job Dashboard</li>
								</ul>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					<div className="row">
						<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-briefcase" />
									</span>
									<div className="dash-widget-info">
										<h3>{jobsData && jobsData.totalJob.count}</h3>
										<span>Jobs</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-users" />
									</span>
									<div className="dash-widget-info">
										<h3>{jobsData && jobsData.totalJobCanidate.count}</h3>
										<span>Job Seekers</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-user" />
									</span>
									<div className="dash-widget-info">
										<h3>{employeeData && employeeData.employee.length}</h3>
										<span>Employees</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-clipboard" />
									</span>
									<div className="dash-widget-info">
										<h3>{jobsData && jobsData.totalJobCanidate.count}</h3>
										<span>Applications</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								{/* <div className="col-md-6 text-center d-flex">
                     <div className="card flex-fill">
                       <div className="card-body">
                         <h3 className="card-title">Overview</h3>
                         <Line data={data} />
                       </div>
                     </div>
                   </div> */}
								<div className="col-md-6 d-flex">
									<div className="card flex-fill">
										<div className="card-body">
											<h3 className="card-title text-center">Latest Jobs</h3>
											<ul className="list-group">
												{jobsData &&
													jobsData.jobs.map((item, i) => (
														<li className="list-group-item list-group-item-action" key={item + i}>
															{item.jobtitle}{" "}
															<span className="float-end text-sm text-muted">
																{dateCalculate(item.createdAt, Date.now())} Days ago
															</span>
														</li>
													))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="card card-table">
								<div className="card-header">
									<h3 className="card-title mb-0">Applicants List</h3>
								</div>
								<div className="card-body">
									<div className="table-responsive">
										<table className="table table-nowrap custom-table mb-0">
											<thead>
												<tr>
													<th>#</th>
													<th>Name</th>
													<th>Job Title</th>
													<th>Departments</th>
													<th className="text-center">Job Types</th>
													<th className="text-center">Status</th>
													<th className="text-center">Resume</th>
													{/* <th className="text-center">Actions</th> */}
												</tr>
											</thead>
											<tbody>
												{jobsData &&
													jobsData.JobCanidate.map((item, i) => (
														<tr key={item + i}>
															<td>{item.id}</td>
															<td>
																<h2 className="table-avatar">
																	{/* <Link to="/app/profile/employee-profile/profile" className="avatar"><img src={Avatar_02} /></Link> */}
																	<Link to="/app/profile/employee-profile/profile">
																		{item.firstName} {item.lastname}{" "}
																	</Link>
																</h2>
															</td>
															<td>
																<Link to={`/app/administrator/job-details?id=${item.id}`}>{item.jobs.jobtitle}</Link>
															</td>
															<td>{item?.jobs?.department1?.title}</td>
															<td className="text-center">
																<div className="dropdown action-label">
																	<a
																		className="btn btn-white btn-sm btn-rounded dropdown-toggle"
																		href="#"
																		data-bs-toggle="dropdown"
																		aria-expanded="false"
																	>
																		<i className="fa fa-dot-circle-o text-danger" /> {item.jobs.jobtype}
																	</a>
																</div>
															</td>
															<td className="text-center">
																<div className="dropdown action-label">
																	<a
																		className="btn btn-white btn-sm btn-rounded dropdown-toggle"
																		href="#"
																		data-bs-toggle="dropdown"
																		aria-expanded="false"
																	>
																		<i className="fa fa-dot-circle-o text-danger" /> {item.status}
																	</a>
																</div>
															</td>
															<td className="text-center">
																<a
																	href={process.env.REACT_APP_API_URL + "/uploads/" + item.resume}
																	className="btn btn-sm btn-primary"
																>
																	<i className="fa fa-download mr-1" /> Download
																</a>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="card card-table">
								<div className="card-header">
									<h3 className="card-title mb-0">Shortlist Candidates</h3>
								</div>
								<div className="card-body">
									<div className="table-responsive">
										<table className="table table-nowrap custom-table mb-0">
											<thead>
												<tr>
													<th>#</th>
													<th>Name</th>
													<th>Job Title</th>
													<th>Departments</th>
													<th className="text-center">Status</th>
												</tr>
											</thead>
											<tbody>
												{jobsData &&
													jobsData.shortListCanidates.map((item, i) => (
														<tr key={item + i}>
															<td>{item.id}</td>
															<td>
																<h2 className="table-avatar">
																	{/* <Link to="/app/profile/employee-profile/profile" className="avatar"><img src={Avatar_02} /></Link> */}
																	<Link to="/app/profile/employee-profile/profile">
																		{item.firstName} {item.lastname}{" "}
																	</Link>
																</h2>
															</td>
															<td>
																<Link to={`/app/administrator/job-details?id=${item.id}`}>{item.jobs.jobtitle}</Link>
															</td>
															<td>{item.jobs.department1.title}</td>
															<td className="text-center">
																<div className="dropdown action-label">
																	<a
																		className="btn btn-white btn-sm btn-rounded dropdown-toggle"
																		href="#"
																		data-bs-toggle="dropdown"
																		aria-expanded="false"
																	>
																		<i className="fa fa-dot-circle-o text-danger" /> {item.status}
																	</a>
																</div>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Page Content */}
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default JobsDashboard;
