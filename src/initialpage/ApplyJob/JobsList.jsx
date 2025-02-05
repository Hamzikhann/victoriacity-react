import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman } from "../../Entryfile/imagepath.jsx";
import Axios from "axios";

const JobsList = () => {
	const [jobs, setJobs] = useState([]);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const getJobs = () => {
		Axios.get(baseApiUrl + "job/active/list")
			.then((res) => {
				setJobs(res.data.jobs);
				// console.log(res.data.jobs);
			})
			.catch((err) => console.log(err.response.data));
	};

	useEffect(() => {
		getJobs();
		// Anything in here is fired on component mount.
		localStorage.removeItem("jobview");
	}, []);

	return (
		<>
			<Helmet>
				<title>Jobs - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Header */}
			<div className="header">
				{/* Logo */}
				<div className="header-left">
					<Link to="/app/main/dashboard" className="logo">
						<img src={headerlogo} width={40} height={40} alt="" />
					</Link>
				</div>
				{/* /Logo */}
				{/* Header Title */}
				<div className="page-title-box float-start">
					<h3>Sheranwala Group</h3>
				</div>
				{/* /Header Title */}
				{/* Header Menu */}
				<ul className="nav user-menu">
					{/* Search */}
					<li className="nav-item">
						<div className="top-nav-search">
							<a to="" className="responsive-search">
								<i className="fa fa-search" />
							</a>
							<form>
								<input className="form-control" type="text" placeholder="Search here" />
								<button className="btn" type="submit">
									<i className="fa fa-search" />
								</button>
							</form>
						</div>
					</li>
					{/* /Search */}
					{/* Flag */}
					<li className="nav-item dropdown has-arrow flag-nav">
						<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
							<img src={lnEnglish} alt="" height={20} /> <span>English</span>
						</a>
						<div className="dropdown-menu dropdown-menu-right">
							<a href="" className="dropdown-item">
								<img src={lnEnglish} alt="" height={16} /> English
							</a>
							<a href="" className="dropdown-item">
								<img src={lnFrench} alt="" height={16} /> French
							</a>
							<a href="" className="dropdown-item">
								<img src={lnSpanish} alt="" height={16} /> Spanish
							</a>
							<a href="" className="dropdown-item">
								<img src={lnGerman} alt="" height={16} /> German
							</a>
						</div>
					</li>
					{/* /Flag */}
					<li className="nav-item">
						<Link className="nav-link" to="/login">
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register">
							Register
						</Link>
					</li>
				</ul>
				{/* /Header Menu */}
				{/* Mobile Menu */}
				<div className="dropdown mobile-user-menu">
					<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fa fa-ellipsis-v" />
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<Link className="dropdown-item" to="/login">
							Login
						</Link>
						<Link className="dropdown-item" to="/register">
							Register
						</Link>
					</div>
				</div>
				{/* /Mobile Menu */}
			</div>
			{/* /Header */}
			{/* Page Wrapper */}
			<div className="page-wrapper job-wrapper">
				{/* Page Content */}
				<div className="content container">
					{/* Page Header */}
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">Jobs</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Jobs</li>
								</ul>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					<div className="row">
						{/* jl {jobs.length} */}
						{jobs &&
							jobs.map((item) => (
								<div className="col-md-6">
									<Link className="job-list" to={"/applyjob/jobdetail/" + item.id}>
										<div className="job-list-det">
											<div className="job-list-desc">
												<h3 className="job-list-title">{item.jobtitle}</h3>
												<h4 className="job-department">{item.department}</h4>
											</div>
											<div className="job-type-info">
												<span className="job-types">{item.jobtype}</span>
											</div>
										</div>
										<div className="job-list-footer">
											<ul>
												<li>
													<i className="fa fa-map-signs" /> {item.location}
												</li>
												<li>
													<i className="fa fa-money" /> ${item.salaryFrom} - ${item.salaryTo}
												</li>
												<li>
													<i className="fa fa-clock-o" /> 2 days ago
												</li>
											</ul>
										</div>
									</Link>
								</div>
							))}
					</div>
				</div>
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default JobsList;
