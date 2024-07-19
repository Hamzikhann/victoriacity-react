/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_01, Avatar_02, Avatar_03 } from "../../../Entryfile/imagepath";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import axios from "axios";
import "../../antdstyle.css";

const ShortlistCandidate = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL);
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get(baseApiUrl + "/api/job/candidates/job/short-list/list").then((res) => setData(res.data.job_candidates));
	}, []);

	const columns = [
		{
			title: "#",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
			// render: (text, record) => (
			//   <span>{record.id.length}</span>
			// ),
		},
		{
			title: "Name",
			dataIndex: "firstName",
			// render: (text, record) => (
			//   <h2 className="table-avatar">
			//     <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
			//     <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
			//   </h2>
			// ),
			sorter: (a, b) => a.name.length - b.name.length,
			render: (text, record) => <span>{record.firstName + " " + record.lastName}</span>
		},
		{
			title: "Job Title",
			dataIndex: "jobtitle",
			// render: (text, record) => (
			//   <Link to="/app/administrator/job-details">{text}</Link>
			// ),
			sorter: (a, b) => a.jobtitle.length - b.jobtitle.length,
			render: (text, record) => <span>{record.jobs.jobtitle}</span>
		},

		{
			title: "Department",
			dataIndex: "department",
			sorter: (a, b) => a.department.length - b.department.length,
			render: (text, record) => <span>{record?.jobs?.department1?.title}</span>
		},
		{
			title: "Status",
			dataIndex: "status",
			// render: (text, record) => (
			//   <div className="action-label">
			//     <a className="btn btn-white btn-sm btn-rounded" href="#">
			//       <i className="fa fa-dot-circle-o text-danger" /> Offered
			//     </a>
			//   </div>
			// ),
			sorter: (a, b) => a.status.length - b.status.length
		}
	];
	// useEffect(() => {
	//   getAllData();
	// }, []);
	return (
		<>
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<Helmet>
					<title>Shortlist Candidates - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col-12">
								<h3 className="page-title">Shortlist Candidates</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item">Jobs</li>
									<li className="breadcrumb-item active">Shortlist Candidates</li>
								</ul>
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
										total: data.length,
										showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
										showSizeChanger: true,
										onShowSizeChange: onShowSizeChange,
										itemRender: itemRender
									}}
									style={{ overflowX: "auto" }}
									columns={columns}
									// bordered
									dataSource={data}
									rowKey={(record) => record.id}
									// onChange={this.handleTableChange}
								/>
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

export default ShortlistCandidate;
