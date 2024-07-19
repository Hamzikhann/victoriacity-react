import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import { Modal, Form } from "react-bootstrap";
import "../../index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const NdcCharges = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowNdcChargesModal, setIsShowNdcChargesModal] = useState(false);
	const [isShowEditNdcChargesModal, setIsShowEditNdcChargesModal] = useState(false);
	const [ndcCharges, setNdcCharges] = useState([]);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setloading] = useState(false);
	const [ndcChargesInitialValues, setNdcChargesInitialValues] = useState({
		Name: "",
		Fee_Amt: "",
		IsActive: ""
	});
	const options = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];

	const columns = [
		{
			title: "Serial No#",
			dataIndex: "NDC_ID",
			sorter: (a, b) => a.NDC_ID - b.NDC_ID
			// render: (text, record, index) => {
			//   return (
			//     <Space
			//       direction="horizontal"
			//       style={{ width: "100%", justifyContent: "center" }}
			//     >
			//       {/* <span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span> */}
			//     </Space>
			//   );
			// },
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
			// ...getColumnSearchProps('id'),
		},
		{
			title: " Name",
			dataIndex: "Name",
			sorter: (a, b) => a.Name - b.Name
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
			// ...getColumnSearchProps('id'),
		},

		{
			title: "Fee Amount",
			dataIndex: "Fee_Amt",
			// render: (text, record) => (
			//   <Link to="/app/administrator/job-details">{text}</Link>
			// ),
			sorter: (a, b) => a.Fee_Amt - b.Fee_Amt
		},
		{
			title: "Status",
			dataIndex: "IsActive",
			render: (text, record) => {
				// console.log(text, record)
				return (
					<span>
						{text ? (
							<Tag color="green" className="rounded-5">
								Active
							</Tag>
						) : (
							<Tag color="red" className="rounded-5">
								InActive
							</Tag>
						)}
					</span>
				);
			}
		},

		{
			title: "Action",
			render: (text, record) => {
				// console.log(
				//   "iiiiiiiiiiiiiii",
				//   text.relation,
				//   options.find((item) => item.label === text.relation)
				// );
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
								data-bs-target="#edit_member"
								onClick={() => {
									setQuery(text.NDC_ID);
									setIsShowEditNdcChargesModal(true);
									setNdcChargesInitialValues({
										Name: "",
										Fee_Amt: "",
										...text,
										IsActive: options.find((item) => item.value === text.IsActive)
									});
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#delete_member"
								onClick={() => {
									setQuery(text.NDC_ID);
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

	const getAllNdcCharges = () => {
		Axios.get(baseApiUrl + "ndcCharges/list")
			.then((res) => {
				setNdcCharges(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteNdcChargesById = (NDC_ID) => {
		Axios.delete(baseApiUrl + `ndcCharges/delete?id=${NDC_ID}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllNdcCharges();
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	useEffect(() => {
		getAllNdcCharges();
	}, []);

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
				<title>NDC Charges - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">NDC Charges</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">NDC Charges</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowNdcChargesModal(true)}>
								<i className="fa fa-plus" /> Create NDC Charges
							</p>
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
									// total: block?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								bordered
								dataSource={ndcCharges}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Create NdcCharges Modal */}
			<Modal show={isShowNdcChargesModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create NDC Charges</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowNdcChargesModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={ndcChargesInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.Name) {
									errors.Name = " Name is required";
								}
								if (!values.Fee_Amt) {
									errors.Fee_Amt = "Fee_Amt is required";
								}
								if (!values.IsActive) {
									errors.IsActive = "IsActive is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									Name: values.Name,
									Fee_Amt: values.Fee_Amt,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "ndcCharges/add", formData);
									if (res.data.status == 200) {
										getAllNdcCharges();
										toast.success(res.data.message);
										setloading(false);
										setIsShowNdcChargesModal(false);
									}
									// else {
									//     toast.success(res.data.message);
									// }
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
														{" "}
														Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder=" Name"
														onChange={(e) => {
															setFieldValue("Name", e.target.value);
														}}
													/>
													<span className="error">{errors.Name && touched.Name && errors.Name}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Fee Amount
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Fee Amount"
														onChange={(e) => {
															setFieldValue("Fee_Amt", e.target.value);
														}}
													/>
													<span className="error">{errors.Fee_Amt && touched.Fee_Amt && errors.Fee_Amt}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status
														<span className="text-danger"> *</span>
													</label>
													<Select
														placeholder="Select Status"
														options={options}
														onChange={(value) => {
															setFieldValue("IsActive", value);
														}}
													/>
													<span className="error">{errors.IsActive && touched.IsActive && errors.IsActive}</span>
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
			{/* /Create NdcCharges Modal */}
			{/* Edit  NdcCharges Modal */}
			<Modal show={isShowEditNdcChargesModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit NDC Charges</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowEditNdcChargesModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={ndcChargesInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.Name) {
									errors.Name = " Name is required";
								}
								if (!values.Fee_Amt) {
									errors.Fee_Amt = "Fee_Amt is required";
								}
								if (!values.IsActive) {
									errors.IsActive = "IsActive is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									Name: values.Name,
									Fee_Amt: values.Fee_Amt,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `ndcCharges/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllNdcCharges();
										toast.success(res.data.message);
										setloading(false);
										setIsShowEditNdcChargesModal(false);
									}
									// else {
									//     toast.success(res.data.message);
									// }
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
														{" "}
														Name
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder=" Name"
														value={values.Name}
														onChange={(e) => {
															setFieldValue("Name", e.target.value);
														}}
													/>
													<span className="error">{errors.Name && touched.Name && errors.Name}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Fee Amount
														<span className="text-danger"> *</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Fee Amount"
														value={values.Fee_Amt}
														onChange={(e) => {
															setFieldValue("Fee_Amt", e.target.value);
														}}
													/>
													<span className="error">{errors.Fee_Amt && touched.Fee_Amt && errors.Fee_Amt}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Status
														<span className="text-danger"> *</span>
													</label>
													<Select
														placeholder="Select Status"
														options={options}
														value={values.IsActive}
														onChange={(value) => {
															setFieldValue("IsActive", value);
														}}
													/>
													<span className="error">{errors.IsActive && touched.IsActive && errors.IsActive}</span>
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
			{/* /Edit  NdcCharges Modal */}
			{/* Delete  NdcCharges Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete NDC Charges</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteNdcChargesById(query)}
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
			{/* /Delete  NdcCharges Modal */}
		</div>
	);
};

export default NdcCharges;
