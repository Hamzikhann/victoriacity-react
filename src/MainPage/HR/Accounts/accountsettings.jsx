import { Helmet } from "react-helmet";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space, Button } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import { format, isValid } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

const AccountSettings = () => {
	const [categoryList, setCategoryList] = useState([]);
	//   const [settingList, setSettingList] = useState([]);
	const [settings, setSettings] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [accType, setAccType] = useState();

	const [inComeDropdown, setInComeDropdown] = useState([]);
	const [expenseDropdown, setExpenseDropdown] = useState([]);

	const [categoryName, setCategoryName] = useState();
	const [parentCategory, setParentCategory] = useState(null);

	const [editCategoryName, setEditCategoryName] = useState();
	const [editOptions, setEditOptions] = useState();
	const [editParentCategory, setEditParentCategory] = useState(null);

	// const [categoryName, setCategoryName] = useState();
	//   const [editCategoryName, setEditCategoryName] = useState();
	//   const [editParentCategory, setEditParentCategory] = useState(null);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowAccountSettingModal, setIsShowAccountSettingModal] = useState(false);
	const [isEditAccountSettingModal, setIsEditAccountSettingModal] = useState(false);

	const [accountSettingInitialValues, setAccountSettingInitialValues] = useState({
		incomeCategoryId: "",
		expenseCategoryId: ""
	});

	let serial = 0;

	const option1 = [
		{ value: 1, label: "incomeCategory", type: "income" },
		{ value: 2, label: "expenseSalaryCategory", type: "expense" }
	];
	const option2 = [
		{ value: 1, label: "category1" },
		{ value: 2, label: "category2" }
	];

	const getCategory = () => {
		Axios.get(baseApiUrl + "accountCategory/all/list")
			.then((res) => {
				if (res.data?.data) {
					setCategoryList(res.data?.data);
					// res.data?.data?.map((item) => {
					//   setCategoryList((prev) => [
					//     ...prev,
					//     { label: item.title, value: item.id },
					//   ]);
					// });
					// console.log("hjvhvkhvhk", res.data?.data);
					toast.success(res.data.Message);
				} else {
					setCategoryList([]);
					toast.success(res.data.Message);
				}
			})
			.catch((err) => toast.error(err.response.data.message));
	};

	const getAllSetting = () => {
		Axios.get(baseApiUrl + "settings/list")
			.then((res) => {
				if (res.data?.Settings) {
					setSettings(res.data?.Settings);
					setTotalPage(res.data.totalPage);

					const option = [];

					res.data?.Settings.map((item) => {
						if (item.Category.type == "Revenue") {
							option.push(item);
						}
					});
					setInComeDropdown(option);

					// console.log("hjvhvkhvhk", res.data?.Settings);
					toast.success(res.data.Message);
				}
				if (res.data?.Settings) {
					setSettings(res.data?.Settings);
					setTotalPage(res.data.totalPage);

					const option2 = [];

					res.data?.Settings.map((item) => {
						if (item.Category.type == "Expense") {
							option2.push(item);
						}
					});
					setExpenseDropdown(option2);

					// console.log("hjvhvkhvhk", res.data?.Settings);
					toast.success(res.data.Message);
				} else {
					setSettings([]);
					toast.success(res.data.Message);
				}
			})
			.catch((err) => toast.error(err.response.data.message));
	};

	const addAccountSetting = (e) => {
		e.preventDefault();
		setLoading(true);

		Axios.post(baseApiUrl + "settings/add")
			.then((res) => {
				getAllSetting();
				setLoading(false);
				toast.success(res.data.Message);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data.message);
			});
	};

	const deleteAccountSettingById = (id) => {
		Axios.delete(baseApiUrl + `settings/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllSetting();
					toast.success(res.data.message);
					// console.log("Deleted Successfully");
				} else {
					toast.success(res.data.message);
				}
				// console.log({ dataIndex: "id" }, "dfnsfknksd");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
		// console.log(block)
	};

	useEffect(() => {
		getCategory();
		getAllSetting();
	}, []);

	const columns = [
		{
			title: "Serial #",
			dataIndex: "id"
			// render: () => ++serial,
		},
		{
			title: "Income Category",
			dataIndex: "incomeCategory",
			render: (text, record) => {
				// console.log(text, text.title);
				return <span>{text?.title}</span>;
			},
			sorter: (a, b) => a.incomeCategoryId.length - b.incomeCategoryId.length
		},
		{
			title: "Expense Category",
			dataIndex: "expenseCategory",
			render: (text, record) => {
				// console.log(text, text.title);
				return <span>{text?.title}</span>;
			},
			sorter: (a, b) => a.expenseCategoryId.length - b.expenseCategoryId.length
		}
		// {
		//   title: "Income Category",
		//   dataIndex: "incomeCategory",
		//   render: (text, record) => {
		//     // console.log(text, text.title);
		//     return <span>{text?.type}</span>;
		//   },
		//   sorter: (a, b) => a.incomeCategoryId.length - b.incomeCategoryId.length,
		// },
		// {
		//   title: "Expense Category",
		//   dataIndex: "expenseCategory",
		//   render: (text, record) => {
		//     // console.log(text, text.title);
		//     return <span>{text?.type}</span>;
		//   },
		//   sorter: (a, b) => a.expenseCategoryId.length - b.expenseCategoryId.length,
		// },

		// {
		//   title: "Action",
		//   render: (text, record) => {
		//     // console.log("ggggggggggggggggggg",text)
		//     return (
		//       <div className="dropdown dropdown-action text-end">
		//         <Link
		//           to="/"
		//           className="action-icon dropdown-toggle"
		//           data-bs-toggle="dropdown"
		//           aria-expanded="false"
		//         >
		//           <i className="material-icons">more_vert</i>
		//         </Link>
		//         <div className="dropdown-menu dropdown-menu-right">
		//           <Link
		//             to="/"
		//             className="dropdown-item"
		//             data-bs-toggle="modal"
		//             data-bs-target="#edit_member"
		//             onClick={() => {
		//               setQuery(text.id);
		//               setIsEditAccountSettingModal(true);
		//               setAccountSettingInitialValues({
		//                 incomeCategoryId: "",
		//                 expenseCategoryId: "",
		//                 ...text,
		//                 // categoryId:  categoryId.find(item => item.label === text?.Category?.title),
		//                 // categoryId: categoryList.find(item => item.value === text?.title)
		//                 // categoryId: settings.find(
		//                 //   (item) => item.label === text?.title
		//                 // ),
		//                 // type: option1.find((item) => item.label === text?.type),
		//               });

		//               // console.log("function Status",settings.find(
		//               //     (item) => item.label === text?.title
		//               //   ))
		//             }}
		//           >
		//             <i className="fa fa-pencil m-r-5" /> Edit
		//           </Link>
		//           <Link
		//             to="/"
		//             className="dropdown-item"
		//             data-bs-toggle="modal"
		//             data-bs-target="#delete_member"
		//             onClick={() => {
		//               setQuery(text.id);
		//             }}
		//           >
		//             <i className="fa fa-trash-o m-r-5" /> Delete
		//           </Link>
		//         </div>
		//       </div>
		//     );
		//   },
		// },
	];

	const [treeData, setTreeData] = useState([]);
	const [incometreeData, setIncomeTreeData] = useState([]);

	const [selectedNode, setSelectedNode] = useState(null);

	const fetchData = () => {
		Axios.get(baseApiUrl + "expenseCategory/list")
			.then((res) => {
				const formattedData = formatTreeData(res.data.data);
				setTreeData(formattedData);
			})
			.catch((error) => {
				console.error("Error fetching tree data:", error);
			});
	};

	const incomefetchData = () => {
		Axios.get(baseApiUrl + "incomeCategory/list")
			.then((res) => {
				const formattedData = formatTreeData(res.data.data);
				setIncomeTreeData(formattedData);
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
		console.log("onChange::", currentNode, selectedNodes);
	};
	const onAction = (node, action) => {
		console.log("onAction::", action, node);
	};
	const onNodeToggle = (currentNode) => {
		console.log("onNodeToggle::", currentNode);
	};
	useEffect(() => {
		fetchData();
		incomefetchData();
	}, []);

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Settings - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* <div className="row"> */}
				{/* <div className="col-md-8 offset-md-2"> */}
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Account Settings</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Accounts</li>
							</ul>
						</div>
						{/* <div className="col-auto float-end ml-auto">
              <p
                href="#"
                className="btn add-btn"
                onClick={() => setIsShowAccountSettingModal(true)}
              >
                <i className="fa fa-plus" />
                Create Account Setting
              </p>
            </div> */}
					</div>
				</div>

				<Formik
					initialValues={accountSettingInitialValues}
					validate={(values) => {
						// console.log('vbgvgv', values)
						const errors = {};
						if (!values.incomeCategoryId) {
							errors.incomeCategoryId = " Income Category is required";
						}
						if (!values.expenseCategoryId) {
							errors.expenseCategoryId = "Expense Category is required";
						}

						return errors;
					}}
					onSubmit={async (values, { setSubmitting }) => {
						const formData = {
							incomeCategoryId: values.incomeCategoryId,
							expenseCategoryId: values.expenseCategoryId
						};
						try {
							setLoading(true);
							const res = await Axios.post(baseApiUrl + "settings/add", formData);
							if (res.data.status == 200) {
								getAllSetting();
								toast.success(res.data.message);
								setLoading(false);
								setIsShowAccountSettingModal(false);
							}
						} catch (err) {
							setLoading(false);
							toast.error(err.response.data.message);
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
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-sm-4">
										<div className="form-group">
											<label>
												Select Income Category
												<span className="text-danger"> *</span>
											</label>
											<DropdownTreeSelect
												value={values.incomeCategoryId}
												data={incometreeData}
												onAction={onAction}
												onNodeToggle={onNodeToggle}
												className="w-100"
												onChange={(currentNode) => {
													// setParentCategory(currentNode.value);
													// console.log("kbhjvgj", currentNode.value);
													setFieldValue("incomeCategoryId", currentNode.value);
												}}
											/>

											{errors.incomeCategoryId && touched.incomeCategoryId && (
												<div className="text-danger">{errors.incomeCategoryId}</div>
											)}
										</div>
									</div>

									<div className="col-sm-5">
										<div className="form-group">
											<label>
												Select Expense Category
												<span className="text-danger"> *</span>
											</label>
											<DropdownTreeSelect
												value={values.expenseCategoryId}
												data={treeData}
												onAction={onAction}
												onNodeToggle={onNodeToggle}
												className="w-100"
												onChange={(currentNode) => {
													setFieldValue("expenseCategoryId", currentNode.value);
												}}
											/>
											{errors.expenseCategoryId && touched.expenseCategoryId && (
												<div className="text-danger">{errors.expenseCategoryId}</div>
											)}
										</div>
									</div>

									<div className="col-sm-3 pt-3">
										{loading ? (
											<button type="submit" disabled={true} className="btn btn-primary submit-btn">
												<div className="spinner-border text-warning" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											</button>
										) : (
											<button type="submit" className="btn btn-primary submit-btn">
												Save
											</button>
										)}
									</div>
								</div>
							</form>
						);
					}}
				</Formik>

				{/* <div className="row">
                      <div className="col-sm-4">
                      <div className="form-group">
                    <label>
                    Select Income Category
                      <span className="text-danger"> *</span>
                    </label>
                    <DropdownTreeSelect
                      value={parentCategory}
                      data={incometreeData}
                      onAction={onAction}
                      onNodeToggle={onNodeToggle}
                      className="w-100"
                      onChange={(currentNode) => {
                        console.log('hbhnhj', currentNode)
                        setParentCategory(currentNode.value)
                        // setFieldValue('incomeCategoryId', currentNode.value)
                        }
                        }
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                      <div className="form-group">
                    <label>
                      Select Expense Category
                      <span className="text-danger"> *</span>
                    </label>
                    <DropdownTreeSelect
                      value={parentCategory}
                      data={treeData}
                      onAction={onAction}
                      onNodeToggle={onNodeToggle}
                      className="w-100"
                      onChange={(currentNode) =>{
                        setParentCategory(currentNode.value)
                        // setFieldValue('expenseCategoryId', currentNode.value)

                      }}

                    />
                  </div>
                    </div>

                    <div className="col-sm-4">

            <div className="submit-section">
                      {loading ? (
                        <button
                          type="submit"
                          disabled={true}
                          className="btn btn-primary submit-btn"
                        >
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                         onClick={addAccountSetting}
                        >
                          Submit
                        </button>
                      )}
                    </div>
          </div>

                    </div> */}
				{/* /Page Header */}

				<div className="col-md-12">
					<div className="table-responsive">
						<Table
							className="table-striped"
							// pagination={{
							//   defaultPageSize: 25,
							//   // total: (totalPage - 1) * 25,
							//   // total: booking?.length,
							//   showTotal: (total, range) =>
							//     `Showing ${range[0]} to ${range[1]} of ${total} entries`,
							//   showSizeChanger: true,
							//   onShowSizeChange: onShowSizeChange,
							//   itemRender: itemRender,
							// }}
							style={{ overflowX: "auto" }}
							columns={columns}
							// onChange={handleTableChange}
							size="middle"
							// dataSource={filterTable == null ? booking : filterTable}
							dataSource={settings}
							// scroll={{ x: "max-content" }}
							rowKey={(record) => record.id}
						/>
					</div>
				</div>
			</div>
			{/* {create accountsetting modal} */}
			<Modal show={isShowAccountSettingModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Account Setting</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowAccountSettingModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={accountSettingInitialValues}
							validate={(values) => {
								// console.log("vbgvgv", values);
								const errors = {};
								if (!values.incomeCategoryId) {
									errors.incomeCategoryId = "incomeCategoryId is required";
								}
								if (!values.expenseCategoryId) {
									errors.expenseCategoryId = "expenseCategoryId is required";
								}

								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									incomeCategoryId: values.incomeCategoryId,
									expenseCategoryId: values.expenseCategoryId
								};
								try {
									setLoading(true);
									const res = await Axios.post(baseApiUrl + "settings/add", formData);
									if (res.data.status == 200) {
										getAllSetting();
										toast.success(res.data.message);
										setLoading(false);
										setIsShowAccountSettingModal(false);
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

											<div className="form-group">
												<label>
													Select Income Category
													<span className="text-danger"> *</span>
												</label>
												<DropdownTreeSelect
													value={parentCategory}
													data={incometreeData}
													onAction={onAction}
													onNodeToggle={onNodeToggle}
													className="w-100"
													onChange={(currentNode) => {
														// console.log("hbhnhj", currentNode);
														// setParentCategory('incomeCategoryId', currentNode.value)}}
														// setFieldValue('incomeCategoryId', currentNode.value)
													}}
												/>
											</div>

											{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Category
                            <span className="text-danger"> *</span>
                          </label>

                          <Select
                            type="text"
                            placeholder="Select Category"
                            options={
                              accType == "income"
                                ? [
                                    { label: "None", value: null },
                                    ...(inComeDropdown &&
                                      inComeDropdown?.map((item) => {

                                        return {
                                          label: item.Category.title,
                                          value: item.Category.id,
                                        };
                                      })),
                                  ]
                                : accType == "expense"
                                ? [
                                    { label: "None", value: null },
                                    ...(expenseDropdown &&
                                      expenseDropdown?.map((item) => {
                                        return {
                                          label: item.Category.title,
                                          value: item.Category.id,
                                        };
                                      })),
                                  ]
                                : ""
                            }
                            onChange={(e) => {
                              console.log("value: ", e, e.target, e.value);
                              setFieldValue("categoryId", e.value);
                            }}
                          />
                          <span className="error">
                            {errors.categoryId &&
                              touched.categoryId &&
                              errors.categoryId}
                          </span>
                        </div>
                      </div> */}
											<div className="form-group">
												<label>
													Select Expense Category
													<span className="text-danger"> *</span>
												</label>
												<DropdownTreeSelect
													value={parentCategory}
													data={treeData}
													onAction={onAction}
													onNodeToggle={onNodeToggle}
													className="w-100"
													onChange={(currentNode) => {
														//  setParentCategory(currentNode)
														// setFieldValue('expenseCategoryId', currentNode.value)
													}}
												/>
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
												<button
													type="submit"
													className="btn btn-primary submit-btn"
													//  onClick={addAccountSetting}
												>
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
			{/* {create accountsetting modal} */}

			{/* {Edit accountsetting Modal} */}

			<Modal show={isEditAccountSettingModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Account Setting</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsEditAccountSettingModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={accountSettingInitialValues}
							validate={(values) => {
								// console.log("vbgvgv", values);
								const errors = {};
								if (!values.incomeCategoryId) {
									errors.incomeCategoryId = "incomeCategoryId is required";
								}
								if (!values.expenseCategoryId) {
									errors.expenseCategoryId = "expenseCategoryId is required";
								}

								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									incomeCategoryId: values.incomeCategoryId.value,
									expenseCategoryId: values.expenseCategoryId.value
								};
								try {
									setLoading(true);
									const res = await Axios.post(baseApiUrl + `settings/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllSetting();
										toast.success(res.data.message);
										setLoading(false);
										setIsShowAccountSettingModal(false);
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
											<div className="form-group">
												<label>
													Select Income Category
													<span className="text-danger"> *</span>
												</label>
												<DropdownTreeSelect
													value={parentCategory}
													data={incometreeData}
													onAction={onAction}
													onNodeToggle={onNodeToggle}
													className="w-100"
													onChange={(currentNode) => {
														// console.log("hbhnhj", currentNode);
														// setParentCategory('incomeCategoryId', currentNode.value)}}
														setFieldValue("incomeCategoryId", currentNode.value);
													}}
												/>
											</div>

											<div className="form-group">
												<label>
													Select Expense Category
													<span className="text-danger"> *</span>
												</label>
												<DropdownTreeSelect
													value={parentCategory}
													data={treeData}
													onAction={onAction}
													onNodeToggle={onNodeToggle}
													className="w-100"
													onChange={(currentNode) => {
														//  setParentCategory(currentNode)
														setFieldValue("expenseCategoryId", currentNode.value);
													}}
												/>
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
												<button
													type="submit"
													className="btn btn-primary submit-btn"
													//  onClick={addAccountSetting}
												>
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
			{/* {Edit accountsetting Modal} */}

			{/* Delete  block Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Account Setting</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteAccountSettingById(query)}
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
			{/* /Delete  block Modal */}
		</div>
	);
};

export default AccountSettings;
