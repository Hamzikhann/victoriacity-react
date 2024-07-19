import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space, Button } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import DropdownTreeSelect from "react-dropdown-tree-select";

const ExpenseTransactions = () => {
	let { id } = useParams();
	const [expenseTransaction, setExpenseTransaction] = useState(id);
	// const [categoryName, setCategoryName] = useState();
	const [settings, setSettings] = useState([]);
	const [settingList, setSettingList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPage, setTotalPage] = useState(0);
	const [expensecategoryList, setExpenseCategoryList] = useState([]);
	const [data, setData] = useState([]);
	const [userRole, setuserRole] = useState();
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowAccountTransactionModal, setIsShowAccountTransactionModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [accountTransactionInitialValues, setAccountTransactionInitialValues] = useState({
		amount: "",
		categoryId: "",
		projectId: "",
		type: "Expense",
		date: "",
		description: "",
		// balance: "",
		ledgerNo: ""
	});

	const [treeData, setTreeData] = useState([]);

	const option1 = [
		{ value: 1, label: "Income", type: "income" },
		{ value: 2, label: "Expense", type: "expense" }
	];

	const getExpenseTransaction = (projectId, page) => {
		Axios.get(baseApiUrl + `accountTransaction/projectId?projectId=${projectId}&type=expense&page=${page}`)
			.then((res) => {
				setData(res.data.Transaction);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const handleTableChange = (pagination, filters, sorter) => {
		getExpenseTransaction(expenseTransaction, pagination.current);
	};

	//   const getAllSetting = () => {
	//     Axios.get(baseApiUrl +  "settings/getIncomeCategories")
	//         .then((res) => {
	//             res.data.Settings.map((item) => {
	//               setSettingList((prev) => [...prev, { label: item.title, value: item.PHS_ID }])
	//             })
	//         })
	//         // .catch((err) => console.log(err.response.data));
	// };

	const getExpenseCategoryid = (id) => {
		Axios.get(baseApiUrl + `expenseCategory/projectId?id=${id}`)
			.then((res) => {
				if (res.data?.data) {
					res.data?.data.map((item) => {
						setExpenseCategoryList((prev) => [...prev, { label: item?.title, value: item?.id }]);
					});
					const formattedData = formatTreeData(res.data.data);
					setTreeData(formattedData);
					toast.success(res.data.Message);
				} else {
					setExpenseCategoryList([]);
					toast.success(res.data.Message);
				}
			})
			.catch((err) => toast.error(err.response.data.message));
	};

	const handleTreeChange = (data, id) => {
		// console.log("handleTreeChange", data, id);
		return data.map((item) => ({
			...item,
			checked: id == item.value ? true : false,
			children: item?.children && item.children.length > 0 ? handleTreeChange(item.children, id) : undefined
		}));
	};

	const formatTreeData = (data) => {
		return data.map((item) => ({
			value: item.id,
			label: item.title,
			children: item.children.length > 0 ? formatTreeData(item.children) : undefined
		}));
	};

	useEffect(() => {
		getExpenseTransaction(expenseTransaction);
		// getAllSetting();
		// getAllIncomeSetting()
		getExpenseCategoryid(expenseTransaction);
		const user = localStorage.getItem("user");
		// console.log("Use Effect", user);

		const user1 = JSON.parse(user);
		setuserRole(user1?.roles);
	}, []);

	const columns = [
		{
			title: "SR No",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Date",
			dataIndex: "date",
			sorter: (a, b) => a.date - b.date
			// render: (text, record) => (
			//     <span>{text?.BuyerName}</span>
			// ),
		},
		{
			title: "Folio",
			dataIndex: "ledgerNo",
			sorter: (a, b) => a.ledgerNo - b.ledgerNo
		},
		// {
		//   title: "Category ID",
		//   dataIndex: "categoryId",
		//   sorter: (a, b) => a.categoryId - b.categoryId,
		//   // render: (text, record) => (
		//   //     <span>{text?.BuyerName}</span>
		//   // ),
		// },
		{
			title: "Category",
			dataIndex: "categoryExpense",
			render: (record) => {
				return <span>{record?.title}</span>;
			},
			sorter: (a, b) => a.categoryId.length - b.categoryId.length
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description - b.description
		},
		{
			title: "Amount",
			dataIndex: "amount",
			sorter: (a, b) => a.amount.length - b.amount.length
		},

		{
			title: "Balance",
			dataIndex: "balance",
			sorter: (a, b) => a.balance - b.balance
			// render: (text, record) => (
			//     <span>{text?.salary}</span>
			// ),
		},

		{
			title: "Action",
			render: (text, record) => {
				return (
					<div className="dropdown dropdown-action text-end">
						<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="material-icons">more_vert</i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							{/* <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#edit_nominee"
                onClick={() => {
                  // setQuery(text.MN_ID);
                  // setIsShowAccountTransactionModal(true);
                  setAccountTransactionInitialValues({
                    Amount: "",
                    CategoryId: "",
                    // NomineeFatherName: "",
                    // RelationToOwner: "",
                    // ...text,
                    // NomineeRealtion: { label: text.NomineeRealtion, value: text.NomineeRealtion },
                    // MEMBER_ID: text?.Member ? { label: text.Member.BuyerName, value: text.Member.MEMBER_ID } : ""
                  });
                }}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </Link> */}
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#delete_nominee"
								// onClick={() => {
								//   setQuery(text.MN_ID);
								// }}
							>
								<i className="fa fa-trash-o m-r-5" /> Delete
							</Link>
						</div>
					</div>
				);
			}
		}
	];

	const onChange = (currentNode, selectedNodes) => {
		// console.log("onChange::", currentNode, selectedNodes);
	};
	const onAction = (node, action) => {
		// console.log("onAction::", action, node);
	};
	const onNodeToggle = (currentNode) => {
		// console.log("onNodeToggle::", currentNode);
	};

	return (
		<>
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<Helmet>
					<title>Account Transactions - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Expense Transactions</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">HR</Link>
									</li>
									<li className="breadcrumb-item active">Accounts</li>
								</ul>
							</div>
							{/* <div className="col-auto float-end ml-auto">
                <p
                  href="#"
                  className="btn add-btn"
                  // onClick={() => setIsShowAccountTransactionModal(true)}
                >
                  <i className="fa fa-arrow-up" />
                 Export
                </p>
              </div> */}
							{(userRole?.name === "Admin" || userRole?.slug === "accountTransaction") && (
								<div className="col-auto float-end ml-auto">
									<p href="#" className="btn add-btn" onClick={() => setIsShowAccountTransactionModal(true)}>
										<i className="fa fa-plus" />
										Create Expense Transaction
									</p>
								</div>
							)}
						</div>
					</div>
					{/* /Page Header */}
					{/* <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Transaction No</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Employee Salary History</th>
                        <th>Type</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Tender</td>
                        <td>Project</td>
                        <td>01 Jan 2021</td>
                        <td>31 Dec 2021</td>
                        <td>2500000</td>
                        <td className="text-end">
                          <div className="dropdown dropdown-action">
                            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_categories"><i className="fa fa-pencil m-r-5" /> Edit</a>
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
					{/* {data.length > 0 &&
            data?.map((item) => (
              <CategoryDisplay

                categoryList={categoryList}
              />
            ))} */}

					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									defaultPageSize: 25,
									total: (totalPage - 1) * 25,
									// total: booking?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								size="middle"
								// dataSource={filterTable == null ? booking : filterTable}
								dataSource={data}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
				{/* /Page Content */}
				{/* Add Modal */}
				{/* <div className="modal custom-modal fade" id="add_categories" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Budget</h5>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Budget Title</label>
                      <input className="form-control" type="text" name="budget_title" placeholder="Budgets Title" />
                    </div>
                    <label>Choose Budget Respect Type</label>
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input BudgetType" type="radio" name="budget_type" id="project2" defaultValue="project" />
                        <label className="form-check-label" htmlFor="project2">Project</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input BudgetType" type="radio" name="budget_type" id="category1" defaultValue="category" />
                        <label className="form-check-label" htmlFor="category1">Category</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <div><input className="form-control datetimepicker" type="date" name="budget_start_date" placeholder="Start Date" data-date-format="dd-mm-yyyy" /></div>
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <div><input className="form-control datetimepicker" type="date" name="budget_end_date" placeholder="End Date" data-date-format="dd-mm-yyyy" /></div>
                    </div>
                    <div className="form-group">
                      <label>Expected Revenues</label>
                    </div>
                    <div className="AllRevenuesClass">
                      <div className="row AlLRevenues">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Revenue Title <span className="text-danger">*</span></label>
                            <input type="text" className="form-control RevenuETitle" defaultValue placeholder="Revenue Title" name="revenue_title[]" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="form-group">
                            <label>Revenue Amount <span className="text-danger">*</span></label>
                            <input type="text" name="revenue_amount[]" placeholder="Amount" defaultValue className="form-control RevenuEAmount" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-1">
                          <div className="add-more">
                            <a className="add_more_revenue" title="Add Revenue" style={{cursor: 'pointer'}}><i className="fa fa-plus-circle" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Overall Revenues <span className="text-danger">(A)</span></label>
                      <input className="form-control" type="text" name="overall_revenues" id="overall_revenues1" placeholder="Overall Revenues" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Expected Expenses</label>
                    </div>
                    <div className="AllExpensesClass">
                      <div className="row AlLExpenses">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Expenses Title <span className="text-danger">*</span></label>
                            <input type="text" className="form-control EXpensesTItle" defaultValue placeholder="Expenses Title" name="expenses_title[]" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="form-group">
                            <label>Expenses Amount <span className="text-danger">*</span></label>
                            <input type="text" name="expenses_amount[]" placeholder="Amount" defaultValue className="form-control EXpensesAmount" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-1">
                          <div className="add-more">
                            <a className="add_more_expenses" title="Add Expenses" style={{cursor: 'pointer'}}><i className="fa fa-plus-circle" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Overall Expense <span className="text-danger">(B)</span></label>
                      <input className="form-control" type="text" name="overall_expenses" id="overall_expenses1" placeholder="Overall Expenses" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Expected Profit <span className="text-danger">( C = A - B )</span> </label>
                      <input className="form-control" type="text" name="expected_profit" id="expected_profit1" placeholder="Expected Profit" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Tax <span className="text-danger">(D)</span></label>
                      <input className="form-control" type="text" name="tax_amount" id="tax_amount1" placeholder="Tax Amount" />
                    </div>
                    <div className="form-group">
                      <label>Budget Amount <span className="text-danger">( E = C - D )</span> </label>
                      <input className="form-control" type="text" name="budget_amount" id="budget_amount1" placeholder="Budget Amount" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className=" submit-section">
                      <button className="btn btn-primary submit-btn">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
				{/* Create Account Transaction Modal */}
				<Modal show={isShowAccountTransactionModal} dialogClassName="employee-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Expense Transaction</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowAccountTransactionModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={accountTransactionInitialValues}
								validate={(values) => {
									const errors = {};
									if (!values.amount) {
										errors.amount = "Amount is required";
									}
									if (!values.description) {
										errors.description = "Description is required";
									}
									if (!values.categoryId) {
										errors.categoryId = "CategoryId is required";
									}
									// if (!values.balance) {
									//   errors.balance = "Balance is required";
									// }
									if (!values.date) {
										errors.date = "Date is required";
									}
									if (!values.ledgerNo) {
										errors.ledgerNo = "Ledger No is required";
									}

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const formData = {
										amount: parseInt(values.amount),
										type: "Expense",
										categoryId: values.categoryId,
										projectId: expenseTransaction,
										balance: values.amount,
										date: values.date,
										ledgerNo: values.ledgerNo,
										description: values.description
									};
									try {
										setLoading(true);
										const res = await Axios.post(baseApiUrl + "accountTransaction/add", formData);
										if (res.data.status == 200) {
											getExpenseTransaction(expenseTransaction);
											toast.success(res.data.message);
											setLoading(false);
											setIsShowAccountTransactionModal(false);
										}
										// else {
										//     toast.success(res.data.message);
										// }
									} catch (err) {
										setLoading(false);
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
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Folio
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Folio No"
															onChange={(e) => {
																setFieldValue("ledgerNo", e.target.value);
															}}
														/>
														<span className="error">{errors.ledgerNo && touched.ledgerNo && errors.ledgerNo}</span>
													</div>
												</div>
												<div className="col-sm-6">
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
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>
                              Balance
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Balance"
                              onChange={(e) => {
                                setFieldValue("balance", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.balance && touched.balance && errors.balance}
                            </span>
                          </div>
                        </div> */}
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Date
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="date"
															placeholder="Select Date"
															onChange={(e) => {
																setFieldValue("date", e.target.value);
															}}
														/>
														<span className="error">{errors.date && touched.date && errors.date}</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Category
															<span className="text-danger"> *</span>
														</label>
														<DropdownTreeSelect
															value={values.categoryId}
															data={treeData}
															onAction={onAction}
															onNodeToggle={onNodeToggle}
															className="w-100"
															onChange={(currentNode) => {
																if (currentNode.checked) {
																	setFieldValue("categoryId", currentNode.value);
																	const data = handleTreeChange(treeData, currentNode.value);
																	setTreeData(data);
																} else {
																	setFieldValue("categoryId", null);
																	const data = handleTreeChange(treeData, null);
																	setTreeData(data);
																}
															}}
														/>
														<span className="error">
															{errors.categoryId && touched.categoryId && errors.categoryId}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Description
															<span className="text-danger"> *</span>
														</label>
														<input
															className="form-control"
															type="text"
															placeholder="Enter Description"
															onChange={(e) => {
																setFieldValue("description", e.target.value);
															}}
														/>
														<span className="error">
															{errors.description && touched.description && errors.description}
														</span>
													</div>
												</div>
												{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Type
                            <span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={option1}
                            placeholder="Select Type"
                            onChange={(e) => {
                              // console.log("hkvjgvjh", e);
                              setAccType(e.type);

                              setFieldValue("type", e.value);
                            }}
                          />
                          <span className="error">
                            {errors.type && touched.type && errors.type}
                          </span>
                        </div>
                      </div> */}
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

				{/* /Create Project Modal */}
				{/* /Add Modal */}
				{/* Edit Modal */}
				{/* <div className="modal custom-modal fade" id="edit_categories" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Budget</h5>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Budget Title</label>
                      <input className="form-control" type="text" name="budget_title" placeholder="Budgets Title" />
                    </div>
                    <label>Choose Budget Respect Type</label>
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input BudgetType" type="radio" name="budget_type" id="project1" defaultValue="project" />
                        <label className="form-check-label" htmlFor="project1">Project</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input BudgetType" type="radio" name="budget_type" id="category" defaultValue="category" />
                        <label className="form-check-label" htmlFor="category">Category</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <div><input className="form-control datetimepicker" type="date" name="budget_start_date" placeholder="Start Date" data-date-format="dd-mm-yyyy" /></div>
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <div><input className="form-control datetimepicker" type="date" name="budget_end_date" placeholder="End Date" data-date-format="dd-mm-yyyy" /></div>
                    </div>
                    <div className="form-group">
                      <label>Expected Revenues</label>
                    </div>
                    <div className="AllRevenuesClass">
                      <div className="row AlLRevenues">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Revenue Title <span className="text-danger">*</span></label>
                            <input type="text" className="form-control RevenuETitle" defaultValue placeholder="Revenue Title" name="revenue_title[]" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="form-group">
                            <label>Revenue Amount <span className="text-danger">*</span></label>
                            <input type="text" name="revenue_amount[]" placeholder="Amount" defaultValue className="form-control RevenuEAmount" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-1">
                          <div className="add-more">
                            <a className="add_more_revenue" title="Add Revenue" style={{cursor: 'pointer'}}><i className="fa fa-plus-circle" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Overall Revenues <span className="text-danger">(A)</span></label>
                      <input className="form-control" type="text" name="overall_revenues" id="overall_revenues" placeholder="Overall Revenues" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Expected Expenses</label>
                    </div>
                    <div className="AllExpensesClass">
                      <div className="row AlLExpenses">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Expenses Title <span className="text-danger">*</span></label>
                            <input type="text" className="form-control EXpensesTItle" defaultValue placeholder="Expenses Title" name="expenses_title[]" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="form-group">
                            <label>Expenses Amount <span className="text-danger">*</span></label>
                            <input type="text" name="expenses_amount[]" placeholder="Amount" defaultValue className="form-control EXpensesAmount" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-1">
                          <div className="add-more">
                            <a className="add_more_expenses" title="Add Expenses" style={{cursor: 'pointer'}}><i className="fa fa-plus-circle" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Overall Expense <span className="text-danger">(B)</span></label>
                      <input className="form-control" type="text" name="overall_expenses" id="overall_expenses" placeholder="Overall Expenses" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Expected Profit <span className="text-danger">( C = A - B )</span> </label>
                      <input className="form-control" type="text" name="expected_profit" id="expected_profit" placeholder="Expected Profit" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="form-group">
                      <label>Tax <span className="text-danger">(D)</span></label>
                      <input className="form-control" type="text" name="tax_amount" id="tax_amount" placeholder="Tax Amount" />
                    </div>
                    <div className="form-group">
                      <label>Budget Amount <span className="text-danger">( E = C - D )</span> </label>
                      <input className="form-control" type="text" name="budget_amount" id="budget_amount" placeholder="Budget Amount" readOnly style={{cursor: 'not-allowed'}} />
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
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

export default ExpenseTransactions;
