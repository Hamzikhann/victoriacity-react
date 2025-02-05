import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { BsFillCaretDownFill, BsFillCaretRightFill, BsFillCaretUpFill } from "react-icons/bs";
import Axios from "axios";
import { useParams } from "react-router-dom";

const CategoryDisplay = (props) => {
	const [isActive, setIsActive] = useState(false);
	const [dropdown2, setDropdown2] = useState();
	const toggleActive = () => {
		setIsActive(!isActive);
	};

	const selectStyles = {
		control: (provided) => ({
			...provided,
			width: 250 // Set the desired width here
		})
	};

	return (
		<div>
			{props.data && (
				<div className="row " key={props.data?.id}>
					<div className="col-lg-12">
						<div className="accordion ">
							<div className="accordion-item border-0">
								<div className="accordion-title d-flex justify-content-between align-items-center px-4 py-1">
									<div
										className="d-flex  align-items-center gap-2"
										style={{ cursor: "pointer" }}
										onClick={toggleActive}
									>
										<div>
											{isActive ? (
												<BsFillCaretDownFill style={{ color: "#FF9B44" }} size={18} />
											) : (
												<BsFillCaretRightFill style={{ color: "#FF9B44" }} size={18} />
											)}
										</div>
										<div>
											<span className=" fw-semibold">
												{props.data?.title} ({props.data?.children?.length})
											</span>
										</div>
									</div>
									{/* //Transaction id */}
									{/* <div className="dropdown dropdown-action mt-2 ">
                          <div className="form-group d-flex align-items-center gap-3">
                            <label>Transactions :</label>

                            <Select
                              isDisabled={false}
                              styles={selectStyles}
                              options={props?.data?.transactions.map((item) => {
                                return {
                                  label:
                                    "id:" +
                                    item.id +

                                    " - " +
                                    item.date,
                                  ...item,
                                };
                              })}
                              onChange={(item) =>
                                setDropdown2(item.EmployeeSalaryHistory)
                              }
                            />
                          </div>
                        </div> */}
									{/* Employee Salary ID */}
									{/* <div className="dropdown dropdown-action mt-2">
                          <div className="form-group d-flex align-items-center gap-3">
                            <label>EmployeeSalary :</label>
                            <Select
                            value={{
                                  label: dropdown2
                                    ? dropdown2.salary
                                    : "",
                                  value: dropdown2?.salary,
                                }}
                              isDisabled
                              styles={selectStyles}
                              options={[
                                {
                                  label: dropdown2
                                    ? dropdown2?.salary
                                    : "No Employee History Present",
                                  value: dropdown2?.salary,
                                },
                              ]}
                            />
                          </div>
                        </div> */}
									{/* Edit and Delete dropdown */}
									<div className="dropdown dropdown-action mt-2">
										<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
											<i className="material-icons">more_vert</i>
										</a>
										<div className="dropdown-menu dropdown-menu-right">
											<a
												onClick={() => {
													props.setEditCategoryName(props.data?.title);
													props.setEditParentCategory(
														props?.categoryList
															?.filter((elem) => {
																if (elem.id === props.data?.parentId) {
																	return true;
																}
																return false;
															})
															.map((elem) => ({
																label: elem.title,
																value: elem.id
															}))[0]
													);

													props.setEditOptions({
														label: `${props?.data?.type}`
													});
													props.setUpdateId(props.data?.id);
													props.setIsShowEditCategoryModal(true);
												}}
												className="dropdown-item"
												href="#"
												//  data-bs-toggle="modal"
												//  data-bs-target="#edit_categories"
											>
												<i className="fa fa-pencil m-r-5" /> Edit
											</a>
											<a
												onClick={() => {
													props.setQuery(props.data?.id);
												}}
												className="dropdown-item"
												href="#"
												data-bs-toggle="modal"
												data-bs-target="#delete"
											>
												<i className="fa fa-trash-o m-r-5" /> Delete
											</a>
										</div>
									</div>
								</div>
								{isActive && (
									<div className="px-4 p-1accordion-content">
										{props.data?.children?.length > 0 &&
											props.data?.children?.map((item) => (
												<CategoryDisplay
													data={item}
													setIsShowEditCategoryModal={props.setIsShowEditCategoryModal}
													setEditParentCategory={props.setEditParentCategory}
													setEditCategoryName={props.setEditCategoryName}
													setUpdateId={props.setUpdateId}
													setEditOptions={props.setEditOptions}
													categoryList={props.categoryList}
													setQuery={props.setQuery}
												/>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Edit Categories Modal */}

			{/* Edit Categories Modal */}
		</div>
	);
	return (
		<div>
			{props.data && (
				<div className="row " key={props.data?.id}>
					<div className="col-lg-12">
						<div className="accordion ">
							<div className="accordion-item border-0">
								<div className="accordion-title d-flex justify-content-between align-items-center px-4 py-1">
									<div
										className="d-flex  align-items-center gap-2"
										style={{ cursor: "pointer" }}
										onClick={toggleActive}
									>
										<div>
											{isActive ? (
												<BsFillCaretDownFill style={{ color: "#FF9B44" }} size={18} />
											) : (
												<BsFillCaretRightFill style={{ color: "#FF9B44" }} size={18} />
											)}
										</div>
										<div>
											<span className=" fw-semibold">
												{props.data?.title} ({props.data?.children?.length})
											</span>
										</div>
									</div>
									{/* //Transaction id */}
									{/* <div className="dropdown dropdown-action mt-2 ">
                            <div className="form-group d-flex align-items-center gap-3">
                              <label>Transactions :</label>

                              <Select
                                isDisabled={false}
                                styles={selectStyles}
                                options={props?.data?.transactions.map((item) => {
                                  return {
                                    label:
                                      "id:" +
                                      item.id +

                                      " - " +
                                      item.date,
                                    ...item,
                                  };
                                })}
                                onChange={(item) =>
                                  setDropdown2(item.EmployeeSalaryHistory)
                                }
                              />
                            </div>
                          </div> */}
									{/* Employee Salary ID */}
									{/* <div className="dropdown dropdown-action mt-2">
                            <div className="form-group d-flex align-items-center gap-3">
                              <label>EmployeeSalary :</label>
                              <Select
                              value={{
                                    label: dropdown2
                                      ? dropdown2.salary
                                      : "",
                                    value: dropdown2?.salary,
                                  }}
                                isDisabled
                                styles={selectStyles}
                                options={[
                                  {
                                    label: dropdown2
                                      ? dropdown2?.salary
                                      : "No Employee History Present",
                                    value: dropdown2?.salary,
                                  },
                                ]}
                              />
                            </div>
                          </div> */}
									{/* Edit and Delete dropdown */}
									<div className="dropdown dropdown-action mt-2">
										<a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
											<i className="material-icons">more_vert</i>
										</a>
										<div className="dropdown-menu dropdown-menu-right">
											<a
												onClick={() => {
													props.setEditCategoryName(props.data?.title);
													props.setEditParentCategory(
														props?.categoryList
															?.filter((elem) => {
																if (elem.id === props.data?.parentId) {
																	return true;
																}
																return false;
															})
															.map((elem) => ({
																label: elem.title,
																value: elem.id
															}))[0]
													);

													props.setEditOptions({
														label: `${props?.data?.type}`
													});
													props.setUpdateId(props.data?.id);
													props.setIsShowEditCategoryModal(true);
												}}
												className="dropdown-item"
												href="#"
												//  data-bs-toggle="modal"
												//  data-bs-target="#edit_categories"
											>
												<i className="fa fa-pencil m-r-5" /> Edit
											</a>
											<a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete">
												<i className="fa fa-trash-o m-r-5" /> Delete
											</a>
										</div>
									</div>
								</div>
								{isActive && (
									<div className="px-4 p-1accordion-content">
										{props.data?.children?.length > 0 &&
											props.data?.children?.map((item) => (
												<CategoryDisplay
													data={item}
													setIsShowEditCategoryModal={props.setIsShowEditCategoryModal}
													setEditParentCategory={props.setEditParentCategory}
													setEditCategoryName={props.setEditCategoryName}
													setUpdateId={props.setUpdateId}
													setEditOptions={props.setEditOptions}
													categoryList={props.categoryList}
													setQuery={props.setQuery}
												/>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Edit Categories Modal */}

			{/* Edit Categories Modal */}
		</div>
	);
};

const IncomeCategory = () => {
	let { id } = useParams();
	const [categoryName, setCategoryName] = useState();
	const [parentCategory, setParentCategory] = useState(null);
	const [projectId, setProjectId] = useState(id);
	const [options, setOptions] = useState();

	const [data, setData] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowCategoryModal, setIsShowCategoryModal] = useState(false);

	const [loading, setloading] = useState(false);
	const [isShowEditCategoryModal, setIsShowEditCategoryModal] = useState(false);

	const [updateId, setUpdateId] = useState();
	const [editCategoryName, setEditCategoryName] = useState();
	const [editOptions, setEditOptions] = useState();
	const [editParentCategory, setEditParentCategory] = useState(null);
	const [query, setQuery] = useState("");

	const option1 = [
		{ value: 1, label: "Revenue", type: "income" },
		{ value: 2, label: "Expense", type: "expense" }
	];

	// const getCategory = () => {
	//   Axios.get(baseApiUrl + "incomeCategory/list")
	//     .then((res) => {
	//       setData(res.data?.data);
	//     })
	//     .catch((err) => console.log(err.response.data));

	//   Axios.get(baseApiUrl + `expenseCategory/income?id=${id}`)
	//     .then((res) => {
	//       if (res.data?.data) {
	//         setCategoryList(res.data?.data);

	//         toast.success(res.data.Message);
	//       } else {
	//         setCategoryList([]);
	//         toast.success(res.data.Message);
	//       }
	//     })
	//     .catch((err) => toast.error(err.response.data.message));
	// };

	const getIncomeCategory = (id) => {
		// Axios.get(baseApiUrl + "incomeCategory/list")
		//     .then((res) => {
		//       setData(res.data?.data);
		//     })
		//     .catch((err) => console.log(err.response.data));

		Axios.get(baseApiUrl + `incomeCategory/projectId?id=${id}`)
			.then((res) => {
				if (res.data?.data) {
					setData(res.data?.data);
					const formattedData = formatTreeData(res.data.data);
					setTreeData(formattedData);
					toast.success(res.data.Message);
				} else {
					setData([]);
					toast.success(res.data.Message);
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		// getCategory();
		getIncomeCategory(projectId);
	}, []);

	const addCategoryHandle = (e) => {
		e.preventDefault();
		setloading(true);
		const formData = {
			type: options?.label,
			title: categoryName,
			parentId: parentCategory?.value,
			projectId: id
		};
		Axios.post(baseApiUrl + "incomeCategory/add", formData)
			.then((res) => {
				getIncomeCategory(projectId);
				setProjectId(id);
				setCategoryName("");
				setParentCategory(null);
				setloading(false);
				setIsShowCategoryModal(false);
				toast.success(res.data.Message);
			})
			.catch((err) => {
				setloading(false);
				toast.error(err.response.data.message);
			});
	};

	const updateCategoryHandle = (e) => {
		e.preventDefault();
		setloading(true);
		const formData = {
			// type: editOptions?.label,
			projectId: id,
			title: editCategoryName,
			parentId: editParentCategory?.value || null
		};
		Axios.put(baseApiUrl + `incomeCategory/update?id=${updateId}`, formData)
			.then((res) => {
				getIncomeCategory(projectId);
				setEditCategoryName("");
				setEditParentCategory(null);
				setloading(false);
				setIsShowEditCategoryModal(false);
				toast.success(res.data.message);
			})
			.catch((err) => {
				setloading(false);
				toast.error(err.response.data.message);
			});
	};
	// console.log("hsjhjskhkjshjs",formData)

	const deleteIncomeCategoryById = (id) => {
		Axios.delete(baseApiUrl + `incomeCategory/delete?id=${id}`)
			.then((res) => {
				getIncomeCategory(projectId);
				toast.success(res.data.Message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const [treeData, setTreeData] = useState([]);
	const [selectedNode, setSelectedNode] = useState(null);
	const fetchData = () => {
		Axios.get(baseApiUrl + "incomeCategory/list")
			.then((res) => {
				const formattedData = formatTreeData(res.data.data);
				setTreeData(formattedData);
			})
			.catch((error) => {
				console.error("Error fetching tree data:", error);
			});
	};

	const formatTreeData = (data) => {
		// console.log(
		// 	"YYYYYYYYYYYYYYYYYYYYY",
		// 	data.map((item) => ({
		// 		value: item.id,
		// 		label: item.title,
		// 		children: item.children.length > 0 ? formatTreeData(item.children) : undefined
		// 	}))
		// );
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
		// fetchData();
	}, []);

	const handleTreeChange = (data, id) => {
		// console.log("handleTreeChange", data, id);
		return data.map((item) => ({
			...item,
			checked: id == item.value ? true : false,
			children: item?.children && item.children.length > 0 ? handleTreeChange(item.children, id) : undefined
		}));
	};

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
					<title>Categories - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Income Category</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Accounts</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<a
									onClick={() => setIsShowCategoryModal(true)}
									href="#"
									className="btn add-btn"
									data-bs-toggle="modal"
									data-bs-target="#add_categories"
								>
									<i className="fa fa-plus" /> Add Income Category
								</a>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					{/* <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table className="table-striped"
                        pagination={{
                          total: data.length,
                          showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }}
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        // bordered
                        dataSource={data}
                        rowKey={record => record.id}
                      // onChange={this.handleTableChange}
                      />
                    </div>
                  </div>
                </div> */}
					{data.length > 0 &&
						data?.map((item) => (
							<CategoryDisplay
								data={item}
								setIsShowEditCategoryModal={setIsShowEditCategoryModal}
								setEditParentCategory={setEditParentCategory}
								setEditCategoryName={setEditCategoryName}
								setUpdateId={setUpdateId}
								setEditOptions={setEditOptions}
								categoryList={categoryList}
								setQuery={setQuery}
							/>
						))}

					<Modal show={isShowEditCategoryModal}>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit Income Category</h5>
								<button
									type="button"
									className="close"
									onClick={() => {
										setIsShowEditCategoryModal(false);
									}}
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label>
											Income Category Name <span className="text-danger">*</span>
										</label>
										<input
											className="form-control"
											type="text"
											value={editCategoryName}
											onChange={(e) => {
												setEditCategoryName(e.target.value);
											}}
										/>
									</div>
									{/* <div className="form-group">
                    <label>Parent Category </label>
                    <Select
                      placeholder="Select Categories"
                      value={editParentCategory}
                      options={[
                        { label: "None", value: null },
                        ...(categoryList &&
                          categoryList?.map((item) => {
                            return {
                              label: item.title,
                              value: item.id,
                            };
                          })),
                      ]}
                      onChange={(e) => setEditParentCategory(e)}
                    />
                  </div> */}
									<div className="col-sm-12">
										<div className="form-group">
											<label>
												Select Parent
												<span className="text-danger"> *</span>
											</label>
											<DropdownTreeSelect
												value={editParentCategory}
												data={treeData}
												onAction={onAction}
												onNodeToggle={onNodeToggle}
												className="w-100"
												onChange={(currentNode) => {
													if (currentNode.checked) {
														setEditParentCategory(currentNode);
														const data = handleTreeChange(treeData, currentNode.value);
														setTreeData(data);
													} else {
														setEditParentCategory(currentNode);
														const data = handleTreeChange(treeData, null);
														setTreeData(data);
													}
												}}
											/>
										</div>
									</div>
									{/* <div className="form-group">
                        <label> Type </label>
                        <Select
                          placeholder="Select Type"
                          value={editOptions}
                          // options={categoryList?.map((item) => {
                          //   return {
                          //     label: item.type,
                          //     value: item.id,
                          //   };
                          // })}
                          options={[
                            { label: "None", value: null },
                            ...(option1?.map((item) => {
                              return {
                                label: item.label
                              };
                            })),
                          ]}

                          onChange={(value) => setEditOptions(value)}
                        />
                      </div> */}
									<div className="submit-section">
										{loading ? (
											<button type="submit" disabled={true} className="btn btn-primary submit-btn">
												<div className="spinner-border text-warning" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											</button>
										) : (
											<button type="submit" className="btn btn-primary submit-btn" onClick={updateCategoryHandle}>
												Submit
											</button>
										)}
									</div>
								</form>
							</div>
						</div>
					</Modal>
				</div>
				{/* /Page Content */}
				{/* Add Categories Modal */}
				<Modal show={isShowCategoryModal}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Income Category</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowCategoryModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label>
										Income Category Name <span className="text-danger">*</span>
									</label>
									<input
										className="form-control"
										type="text"
										placeholder="Enter Income Category Name"
										onChange={(e) => {
											setCategoryName(e.target.value);
										}}
									/>
								</div>
								{/* <div className="form-group">
                  <label>Project Id </label>
                  <input
                   className="form-control"
                    placeholder="Enter project Id"
                    type="text"
                    // options={categoryList?.map((item) => {
                    //   return {
                    //     label: item.title,
                    //     value: item.id,
                    //   };
                    // })}
                    onChange={(e) => {
                      setProjectId(e.target.value);
                    }}
                  />
                </div> */}
								<div className="col-sm-12">
									<div className="form-group">
										<label>
											Select Parent
											<span className="text-danger"> *</span>
										</label>
										<DropdownTreeSelect
											value={parentCategory ? null : projectId}
											data={treeData}
											onAction={onAction}
											onNodeToggle={onNodeToggle}
											className="w-100"
											onChange={(currentNode) => {
												if (currentNode.checked) {
													setParentCategory(currentNode);
													const data = handleTreeChange(treeData, currentNode.value);
													setTreeData(data);
												} else {
													setParentCategory(currentNode);
													const data = handleTreeChange(treeData, null);
													setTreeData(data);
												}
											}}
										/>
									</div>
								</div>

								{/* <div className="form-group">
                        <label> Type </label>
                        <Select
                          placeholder="Select Type"
                          value={options}
                          // options={categoryList?.map((item) => {
                          //   return {
                          //     label: item.type,
                          //     value: item.id,
                          //   };
                          // })}
                          options={option1}

                          onChange={(e) => setOptions(e)}
                        />
                      </div> */}
								<div className="submit-section">
									{loading ? (
										<button type="submit" disabled={true} className="btn btn-primary submit-btn">
											<div className="spinner-border text-warning" role="status">
												<span className="sr-only">Loading...</span>
											</div>
										</button>
									) : (
										<button type="submit" className="btn btn-primary submit-btn" onClick={addCategoryHandle}>
											Submit
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</Modal>
				{/* /Add Categories Modal */}

				{/* Delete Modal  */}
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
											<button
												className="btn btn-primary w-100 continue-btn"
												data-bs-dismiss="modal"
												type="submit"
												onClick={() => deleteIncomeCategoryById(query)}
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
				{/* Delete Modal  */}
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default IncomeCategory;
