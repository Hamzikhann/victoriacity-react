import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar_07 } from "../../Entryfile/imagepath";
import Editclient from "../../_components/modelbox/Editclient";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";

const Clients = () => {
	const [data, setData] = useState([
		{
			id: 1,
			image: Avatar_07,
			name: "John Doe",
			client_id: "CLT-0001",
			contactperson: "Barry Cuda",
			email: "barrycuda@example.com",
			mobile: "9876543210",
			status: "Active"
		}
	]);
	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text, record) => (
				<h2 className="table-avatar">
					<Link to="/app/profile/employee-profile" className="avatar">
						<img alt="" src={record.image} />
					</Link>
					<Link to="/app/profile/employee-profile">{text}</Link>
				</h2>
			),
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: "Client ID",
			dataIndex: "client_id",
			sorter: (a, b) => a.employee_id.length - b.employee_id.length
		},

		{
			title: "Contact Person",
			dataIndex: "contactperson",
			sorter: (a, b) => a.contactperson.length - b.contactperson.length
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: (a, b) => a.email.length - b.email.length
		},

		{
			title: "Mobile",
			dataIndex: "mobile",
			sorter: (a, b) => a.mobile.length - b.mobile.length
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (text, record) => (
				<div className="dropdown">
					<a
						href="#"
						className="btn btn-white btn-sm btn-rounded dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i className={text === "Active" ? "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"} />{" "}
						{text}{" "}
					</a>
					<div className="dropdown-menu">
						<a className="dropdown-item" href="#">
							<i className="fa fa-dot-circle-o text-success" /> Active
						</a>
						<a className="dropdown-item" href="#">
							<i className="fa fa-dot-circle-o text-danger" /> Inactive
						</a>
					</div>
				</div>
			)
		},
		{
			title: "Action",
			render: (text, record) => (
				<div className="dropdown dropdown-action text-end">
					<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="material-icons">more_vert</i>
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_client">
							<i className="fa fa-pencil m-r-5" /> Edit
						</a>
						<a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_client">
							<i className="fa fa-trash-o m-r-5" /> Delete
						</a>
					</div>
				</div>
			)
		}
	];

	return (
		<div className="page-wrapper">
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
							<a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_client">
								<i className="fa fa-plus" /> Add Client
							</a>
							<div className="view-icons">
								<Link to="/app/employees/clients" className="grid-view btn btn-link">
									<i className="fa fa-th" />
								</Link>
								<Link to="/app/employees/clients-list" className="list-view btn btn-link active">
									<i className="fa fa-bars" />
								</Link>
							</div>
						</div>
					</div>
				</div>
				{/* /Page Header */}
				{/* Search Filter */}
				<div className="row filter-row">
					<div className="col-sm-6 col-md-3">
						<div className="form-group form-focus">
							<input type="text" className="form-control floating" />
							<label className="focus-label">Client ID</label>
						</div>
					</div>
					<div className="col-sm-6 col-md-3">
						<div className="form-group form-focus">
							<input type="text" className="form-control floating" />
							<label className="focus-label">Client Name</label>
						</div>
					</div>
					<div className="col-sm-6 col-md-3">
						<div className="form-group form-focus select-focus">
							<select className="select floating">
								<option>Select Company</option>
								<option>Global Technologies</option>
								<option>Delta Infotech</option>
							</select>
							<label className="focus-label">Company</label>
						</div>
					</div>
					<div className="col-sm-6 col-md-3">
						<a href="#" className="btn btn-success btn-block w-100">
							{" "}
							Search{" "}
						</a>
					</div>
				</div>
				{/* Search Filter */}
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
								onChange={console.log("change")}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}
			{/* Add Client Modal */}
			<div id="add_client" className="modal custom-modal fade" role="dialog">
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Client</h5>
							<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={{ email: "", password: "" }}
								validate={(values) => {
									const errors = {};
									if (!values.email) {
										errors.email = "Required";
									} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
										errors.email = "Invalid email address";
									}
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										alert(JSON.stringify(values, null, 2));
										setSubmitting(false);
									}, 400);
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting
									/* and other goodies */
								}) => (
									<form>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">
														First Name <span className="text-danger">*</span>
													</label>
													<input className="form-control" type="text" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">Last Name</label>
													<input className="form-control" type="text" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">
														Username <span className="text-danger">*</span>
													</label>
													<input className="form-control" type="text" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">
														Email <span className="text-danger">*</span>
													</label>
													<input className="form-control floating" type="email" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">Password</label>
													<input className="form-control" type="password" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">Confirm Password</label>
													<input className="form-control" type="password" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">
														Client ID s <span className="text-danger">*</span>
													</label>
													<input className="form-control floating" type="text" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">Phone </label>
													<input className="form-control" type="text" />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="col-form-label">Company Name</label>
													<input className="form-control" type="text" />
												</div>
											</div>
										</div>

										<div className="submit-section">
											<button className="btn btn-primary submit-btn">Submit</button>
										</div>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			{/* /Add Client Modal */}
			{/* Edit Client Modal */}
			<Editclient />
			{/* /Edit Client Modal */}
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
			{/* /Delete Client Modal */}
		</div>
	);
};

export default Clients;
