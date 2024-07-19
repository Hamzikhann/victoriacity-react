import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import {itemRender, onShowSizeChange} from "../../paginationfunction";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import Select from "react-select";
import { DownOutlined } from "@ant-design/icons";
import { Tree, TreeSelect } from "antd";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
// import { TreeSelect } from 'primereact/treeselect';

const BudgetExpense = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [query, setQuery] = useState("");
	const [expense, setExpense] = useState([]);
	const [phaseList, setPhaseList] = useState([]);
	const [loading, setloading] = useState(false);
	const [expenseInitialValues, setExpenseInitialValues] = useState({
		type: "",
		title: "",
		parentId: null
	});
	const options = [
		{ value: "Expense", label: "Expense" },
		{ value: "Revenue", label: "Revenue" }
	];
	const [treeData, setTreeData] = useState([]);
	const [selectedNode, setSelectedNode] = useState(null);
	const fetchData = () => {
		Axios.get(baseApiUrl + "accountCategory/list")
			.then((res) => {
				const formattedData = formatTreeData(res.data.data);
				setTreeData(formattedData);
			})
			.catch((error) => {
				console.error("Error fetching tree data:", error);
			});
	};

	const formatTreeData = (data) => {
		return data.map((item) => ({
			value: item.id,
			label: item.title,
			children: item.children.length > 0 ? formatTreeData(item.children) : undefined
		}));
	};
	const onChange = (currentNode, selectedNodes) => {
		// console.log("onChange::", currentNode, selectedNodes);
	};
	const onAction = (node, action) => {
		// console.log("onAction::", action, node);
	};
	const onNodeToggle = (currentNode) => {
		// console.log("onNodeToggle::", currentNode);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			{/* Page Wrapper */}
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
					<title>Budgets Expenses - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Budgets Expenses</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Accounts</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
									<i className="fa fa-plus" /> Add Expenses
								</p>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					<div className="row">
						<div className="col-md-12">
							<div className="table-responsive"></div>
						</div>
					</div>
				</div>
				{/* /Page Content */}
				{/* Add Modal */}
				<Modal show={isShowProjectModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Expense</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowProjectModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={expenseInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.amount) {
										errors.amount = "Amount is required";
									}
									if (!values.categoryId) {
										errors.categoryId = "Type is required";
									}
									console.log(errors, " sdfsdsdfghjkgf");
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										amount: parseInt(values.amount),
										// type: values.type.value,
										categoryId: values.categoryId
									};
									try {
										setloading(true);
										const res = await Axios.post(baseApiUrl + "accountTransaction/add", formData);
										if (res.data.status == 200) {
											fetchData();
											setloading(false);
											toast.success(res.data.message);
											setIsShowProjectModal(false);
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
															Select Parent
															<span className="text-danger"> *</span>
														</label>
														<DropdownTreeSelect
															data={treeData}
															onAction={onAction}
															onNodeToggle={onNodeToggle}
															className="w-100"
															onChange={(currentNode) => {
																// console.log("dssssssssssssssssssssssssss", currentNode?.value);
																setFieldValue("categoryId", currentNode?.value);
															}}
														/>
														<span className="error">
															{errors.categoryId && touched.categoryId && errors.categoryId}
														</span>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>
															Amount
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Amount"
															onChange={(e) => {
																setFieldValue("amount", e.target.value);
															}}
														/>
														<span className="error">{errors.amount && touched.amount && errors.amount}</span>
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
				{/* /Add Modal */}
				{/* Edit Modal */}
				<div className="modal custom-modal fade" id="edit_categories" role="dialog">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit Expenses</h5>
								<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group form-row">
									<label className="col-lg-12 control-label">
										Amount <span className="text-danger">*</span>
									</label>
									<div className="col-lg-6">
										<input type="text" className="form-control" placeholder={800.0} name="amount" />
									</div>
									<div className="col-lg-6">
										<select name="currency_symbol" className="form-control">
											<option value="$ - AUD">$ - Australian Dollar</option>
											<option value="Bs. - VEF">Bs. - Bolívar Fuerte</option>
											<option value="R$ - BRL">R$ - Brazilian Real</option>
											<option value="£ - GBP">£ - British Pound</option>
											<option value="$ - CAD">$ - Canadian Dollar</option>
										</select>
									</div>
								</div>
								<div className="form-group form-row">
									<label className="col-lg-12 control-label">
										Notes <span className="text-danger">*</span>
									</label>
									<div className="col-lg-12">
										<textarea className="form-control ta" name="notes" defaultValue={""} />
									</div>
								</div>
								<div className="form-group form-row">
									<label className="col-lg-12 control-label">
										Expense Date <span className="text-danger">*</span>
									</label>
									<div className="col-lg-12">
										<input
											className="datepicker-input form-control"
											type="text"
											defaultValue="07-05-2021"
											name="expense_date"
											data-date-format="dd-mm-yyyy"
										/>
									</div>
								</div>
								<div className="form-group form-row">
									<label className="col-lg-12 control-label">
										Category <span className="text-danger">*</span>
									</label>
									<div className="col-lg-12">
										<select name="category" className="form-control m-b" id="main_category1">
											<option value disabled>
												Choose Category
											</option>
											<option value={1}>project1</option>
											<option value={3}>test category</option>
											<option value={4}>Hardware</option>
											<option value={5}>Material</option>
											<option value={6}>Vehicle</option>
											<option value={8}>TestctrE</option>
											<option value={9}>Twocatr</option>
											<option value={10}>fesferwf</option>
										</select>
									</div>
								</div>
								<div className="form-group form-row">
									<label className="col-lg-12 control-label">
										Sub Category <span className="text-danger">*</span>
									</label>
									<div className="col-lg-12">
										<select name="sub_category" className="form-control m-b" id="sub_category1">
											<option value>Choose Sub-Category</option>
										</select>
									</div>
								</div>
								<div className="form-group form-row  position-relative">
									<label className="col-lg-12 control-label">Attach File</label>
									<div className="col-lg-12">
										<input
											type="file"
											className="form-control"
											data-buttontext="Choose File"
											data-icon="false"
											data-classbutton="btn btn-default"
											data-classinput="form-control inline input-s"
											name="receipt"
										/>
									</div>
								</div>
								<div className="submit-section">
									<button className="btn btn-primary submit-btn">Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Edit Modal */}
				{/* Delete Holiday Modal */}
				<div className="modal custom-modal fade" id="delete" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete </h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<a className="btn btn-primary continue-btn">Delete</a>
										</div>
										<div className="col-6">
											<a data-bs-dismiss="modal" className="btn btn-primary cancel-btn">
												Cancel
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Delete Holiday Modal */}
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default BudgetExpense;
