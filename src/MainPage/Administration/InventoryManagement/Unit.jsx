import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Axios from "axios";
import { Formik } from "formik";
import Select from "react-select";
import "../../index.css";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";

const Unit = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [isShowVCModal, setIsShowVCModal] = useState(false);
	const [isShowPlotUnitModal, setIsShowPlotUnitModal] = useState(false);
	const [query, setQuery] = useState("");
	const [loading, setloading] = useState(false);
	const [unit, setUnit] = useState([]);
	const [plotUnit, setPlotUnit] = useState([]);
	const [pSize, setPSize] = useState("");
	const [plotNo, setPlotNo] = useState("");
	const [unitType, setUnitType] = useState("");
	const [block, setBlock] = useState("");
	const [unitInitialValues, setUnitInitialValues] = useState({
		NameAddress: "",
		AreaMeasure: "",
		MeterRef_No: "",
		BK_ID: "",
		ST_ID: "",
		UType_ID: "",
		PS_ID: "",
		MEMBER_ID: "",
		MN_ID: "",
		IsActive: "",
		IsPossession: ""
	});
	const [vCInitialValues, setvCInitialValues] = useState({
		VC_NO: "",
		Unit_ID: ""
	});

	const [blockName, setBlockName] = useState([]);
	const [streetName, setStreetName] = useState([]);
	const [floorName, setFloorName] = useState([]);
	const [unitCategoryName, setUnitCategoryName] = useState([]);
	const [unitTypeName, setUnitTypeName] = useState([]);
	const [plotSize, setPlotSize] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [memberNomineeList, setMemberNomineeList] = useState([]);
	const statusList = [
		{ value: true, label: "Active" },
		{ value: false, label: "InActive" }
	];
	const status = [
		{ value: true, label: "Yes" },
		{ value: false, label: "No" }
	];

	const columns = [
		{
			title: "Serial #",
			dataIndex: "ID"
		},
		{
			title: "Unit Code",
			dataIndex: "Unit_Code",
			render: (text, record) => {
				return <span>{text}</span>;
			}
		},
		{
			title: "Plot No",
			dataIndex: "Plot_No",
			render: (text, record) => {
				return <span>{text}</span>;
			}
		},
		{
			title: "Owner Name",
			dataIndex: "MemNominee",
			render: (text, record) => {
				return <span>{text?.NomineeName}</span>;
			}
		},
		{
			title: "Unit Name",
			dataIndex: "NameAddress"
		},
		{
			title: "Block Name",
			dataIndex: "Block",
			render: (text, record) => {
				return <span>{text?.Name}</span>;
			}
		},
		{
			title: "Plot Size",
			dataIndex: "PlotSize",
			render: (text, record) => {
				return <span>{text?.Name}</span>;
			}
		},
		{
			title: "Floor Name",
			dataIndex: "FL_ID",
			render: (text, record) => {
				return <span>{text?.Name}</span>;
			}
		},
		{
			title: "Unit Type Name",
			dataIndex: "UnitType",
			render: (text, record) => {
				return <span>{text?.Name}</span>;
			}
		},
		{
			title: "Category Name",
			dataIndex: "CAT_ID",
			render: (text, record) => {
				return <span>{text?.CAT_Name}</span>;
			}
		},
		{
			title: "Area Measure",
			dataIndex: "AreaMeasure"
		},
		{
			title: "Meter Ref No",
			dataIndex: "MeterRef_No"
		},
		// {
		//     title: "Availability Status",
		//     dataIndex: "IsAvailable",
		//     render: (text, record) => {
		//         return (
		//             <span>
		//                 {text ? <Tag color="green" className="rounded-5">Yes</Tag> :
		//                     <Tag color="red" className="rounded-5">No</Tag>}
		//             </span>
		//         )
		//     },
		// },
		{
			title: "Possession Status",
			dataIndex: "IsPossession",
			render: (text, record) => {
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
			title: "Status",
			dataIndex: "IsActive",
			render: (text, record) => {
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
			title: "Option",
			render: (text, record) => {
				// console.log(text.blockId, blockName.find(item => item.label === text.blockId))
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
									setQuery(text.ID);
									setIsShowVCModal(true);
									setUnitInitialValues({
										VC_NO: ""
									});
								}}
							>
								<i className="fa fa-pencil m-r-5" /> Assign VcNo
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#edit_member"
								onClick={() => {
									// console.log('LLLLLLLLLLLLLLLLLLLLLLLL', text.IsActive, statusList.find((item)=> text.IsActive == item.value))
									setQuery(text.ID);
									setIsShowEditProjectModal(true);
									setUnitInitialValues({
										NameAddress: "",
										AreaMeasure: "",
										MeterRef_No: "",
										...text,
										IsActive: statusList.find((item) => text.IsActive == item.value),
										IsPossession: statusList.find((item) => text.IsPossession == item.value),
										IsAvailable: status.find((item) => text.IsAvailable == item.value),
										FL_ID: text?.Block ? { label: text.Block.Name, value: text.Block.FL_ID } : "",
										CAT_ID: text?.Street ? { label: text.Street.Name, value: text.Street.CAT_ID } : "",
										BK_ID: text?.Block ? { label: text.Block.Name, value: text.Block.BK_ID } : "",
										ST_ID: text?.Street ? { label: text.Street.Name, value: text.Street.ST_ID } : "",
										UType_ID: text?.UnitType
											? {
													label: text.UnitType.Name,
													value: text.UnitType.UType_ID
											  }
											: "",
										PS_ID: text?.PlotSize
											? {
													label: text.PlotSize.Name,
													value: text.PlotSize.PS_ID
											  }
											: "",
										MEMBER_ID: text?.Member
											? {
													label: text.Member.BuyerName,
													value: text.Member.MEMBER_ID
											  }
											: "",
										MN_ID: text?.MemNominee
											? {
													label: text.MemNominee.NomineeName,
													value: text.MemNominee.MN_ID
											  }
											: ""
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
									setQuery(text.ID);
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

	const getAllUnit = () => {
		Axios.get(baseApiUrl + "unit/list")
			.then((res) => {
				setUnit(res.data.Units);
				// console.log(res.data.Units)
			})
			.catch((err) => console.log(err.response.data));
	};
	const deleteUnitById = (id) => {
		Axios.delete(baseApiUrl + `unit/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllUnit();
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};
	const getBlockName = () => {
		Axios.get(baseApiUrl + "block/list")
			.then((res) => {
				res.data.Blocks.map((item) => {
					setBlockName((prev) => [...prev, { label: item.Name, value: item.BLK_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getStreetName = () => {
		Axios.get(baseApiUrl + "street/list")
			.then((res) => {
				res.data.Street.map((item) => {
					setStreetName((prev) => [...prev, { label: item.Name, value: item.ST_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getFloorName = () => {
		Axios.get(baseApiUrl + "floor/list")
			.then((res) => {
				res.data.floors.map((item) => {
					setFloorName((prev) => [...prev, { label: item.Name, value: item.FL_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getUnitCategoryName = () => {
		Axios.get(baseApiUrl + "unitCategory/list")
			.then((res) => {
				res.data.UnitCategorys.map((item) => {
					setUnitCategoryName((prev) => [...prev, { label: item.CAT_Name, value: item.CAT_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getUnitName = () => {
		Axios.get(baseApiUrl + "unitType/list")
			.then((res) => {
				res.data.unitType.map((item) => {
					setUnitTypeName((prev) => [...prev, { label: item.Name, value: item.UType_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getPlotSize = () => {
		Axios.get(baseApiUrl + "plotSize/list")
			.then((res) => {
				res.data.PlotSizes.map((item) => {
					setPlotSize((prev) => [...prev, { label: item.Name, value: item.PS_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getMembersName = () => {
		Axios.get(baseApiUrl + "member/list")
			.then((res) => {
				res.data.member.map((item) => {
					setMemberList((prev) => [...prev, { label: item.BuyerName, value: item.MEMBER_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};
	const getMemberNominee = () => {
		Axios.get(baseApiUrl + "nominee/list")
			.then((res) => {
				res.data.MemNominee.map((item) => {
					setMemberNomineeList((prev) => [...prev, { label: item.NomineeName, value: item.MN_ID }]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};

	const getFilterUnit = (PS_ID, UType_ID, BLK_ID) => {
		// setPage(page);
		if (typeof PS_ID === "undefined" || PS_ID === null) {
			PS_ID = "";
		}
		if (typeof UType_ID === "undefined" || UType_ID === null) {
			UType_ID = "";
		}
		if (typeof BLK_ID === "undefined" || BLK_ID === null) {
			BLK_ID = "";
		}
		Axios.get(baseApiUrl + `/unit/filter?PS_ID=${PS_ID}&UType_ID=${UType_ID}&BLK_ID=${BLK_ID}`).then((res) => {
			setUnit(res?.data?.data);
			//   setTotalPage(res.data.totalPage);
			//   setTotalRecords(res.data.totalRecords);
		});
		// .catch((err) => console.log(err.response.data));
	};

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
		getAllUnit();
		getBlockName();
		getStreetName();
		getFloorName();
		getUnitName();
		getUnitCategoryName();
		getPlotSize();
		getMembersName();
		getMemberNominee();
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		getAllUnit(pagination.current);
	};

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
				<title>Unit - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Unit </h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Unit </li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create Unit
							</p>
						</div>
						{/* <div className="col-auto float-end ml-auto">
              <p
                href="#"
                className="btn add-btn"
                onClick={() => setIsShowPlotUnitModal(true)}
              >
                <i className="fa fa-plus" /> Create Plot Unit
              </p>
            </div> */}
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<Select placeholder="Select Plot Size" options={plotSize} onChange={(value) => setPSize(value.value)} />
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<Select placeholder="Select Block" options={blockName} onChange={(value) => setBlock(value.value)} />
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<Select
								options={unitTypeName}
								onChange={(value) => setUnitType(value.value)}
								placeholder="Search By Unit Type"
							/>
						</div>
					</div>

					<div className="col-sm-1">
						<div className="form-group">
							<button
								className="btn btn-success btn-block w-100 py-2"
								onClick={() => getFilterUnit(pSize, unitType, block)}
							>
								<i className="fa fa-search" />
							</button>
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
									total: unit?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								bordered
								dataSource={unit}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* Create Project Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Unit </h5>
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
							initialValues={unitInitialValues}
							validate={(values) => {
								let errors = {};
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member Name is required";
								}
								if (!values.MN_ID) {
									errors.MN_ID = "Nominee Name is required";
								}
								if (!values.BK_ID) {
									errors.BK_ID = "Block Name is required";
								}
								if (!values.PS_ID) {
									errors.PS_ID = "Plot Size Name is required";
								}
								if (!values.UType_ID) {
									errors.UType_ID = "Unit Type Name is required";
								}
								if (!values.ST_ID) {
									errors.ST_ID = "Street Name is required";
								}
								// if (!values.CAT_ID) {
								//     errors.CAT_ID = "Unit Category is required";
								// }
								// if (!values.FL_ID) {
								//     errors.FL_ID = "Floor Name is required";
								// }
								if (!values.NameAddress) {
									errors.NameAddress = "Unit Name is required";
								}
								// if (!values.IsAvailable) {
								//     errors.IsAvailable = "Availability Status is required";
								// }
								if (!values.IsActive) {
									errors.IsActive = "Status is required";
								}
								if (!values.AreaMeasure) {
									errors.AreaMeasure = "Total Area is required";
								}
								if (!values.MeterRef_No) {
									errors.MeterRef_No = "Meter Ref No is required";
								}
								if (!values.IsPossession) {
									errors.IsPossession = "Possession is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									NameAddress: values.NameAddress,
									MEMBER_ID: values.MEMBER_ID,
									MN_ID: values.MN_ID,
									BK_ID: values.BK_ID,
									ST_ID: values.ST_ID,
									// FL_ID: values.FL_ID,
									// CAT_ID: values.CAT_ID,
									UType_ID: values.UType_ID,
									PS_ID: values.PS_ID,
									AreaMeasure: values.AreaMeasure,
									MeterRef_No: values.MeterRef_No,
									IsPossession: values.IsPossession.value,
									// IsAvailable: values.IsAvailable.value,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "unit/add", formData);
									if (res.data.status == 200) {
										getAllUnit();
										toast.success(res.data.message);
										setloading(false);
										setIsShowProjectModal(false);
									}
								} catch (err) {
									setloading(false);
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
								/* and other goodies */
							}) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Unit Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Unit Name"
														onChange={(e) => {
															setFieldValue("NameAddress", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NameAddress && touched.NameAddress && errors.NameAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Block <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Block"
														options={blockName}
														onChange={(value) => {
															setFieldValue("BK_ID", value.value);
														}}
													/>
													<span className="error">{errors.BK_ID && touched.BK_ID && errors.BK_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Street <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Street"
														options={streetName}
														onChange={(value) => {
															setFieldValue("ST_ID", value.value);
														}}
													/>
													<span className="error">{errors.ST_ID && touched.ST_ID && errors.ST_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Unit Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Unit Type"
														options={unitTypeName}
														onChange={(value) => {
															setFieldValue("UType_ID", value.value);
														}}
													/>
													<span className="error">{errors.UType_ID && touched.UType_ID && errors.UType_ID}</span>
												</div>
											</div>
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Unit Category <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Unit Category" options={unitCategoryName}*/}
											{/*            onChange={(value) => {*/}
											{/*                setFieldValue("CAT_ID", value.value)*/}
											{/*            }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.CAT_ID && touched.CAT_ID && errors.CAT_ID}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Floor <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Floor" options={floorName}*/}
											{/*                onChange={(value) => {*/}
											{/*                    setFieldValue("FL_ID", value.value)*/}
											{/*                }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.FL_ID && touched.FL_ID && errors.FL_ID}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Plot Size <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Plot Size"
														options={plotSize}
														onChange={(value) => {
															setFieldValue("PS_ID", value.value);
														}}
													/>
													<span className="error">{errors.PS_ID && touched.PS_ID && errors.PS_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Total Area <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Total Area"
														onChange={(e) => {
															setFieldValue("AreaMeasure", e.target.value);
														}}
													/>
													<span className="error">
														{errors.AreaMeasure && touched.AreaMeasure && errors.AreaMeasure}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Meter Ref No <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Meter Ref No"
														onChange={(e) => {
															setFieldValue("MeterRef_No", e.target.value);
														}}
													/>
													<span className="error">
														{errors.MeterRef_No && touched.MeterRef_No && errors.MeterRef_No}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Member <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member"
														options={memberList}
														onChange={(value) => {
															setFieldValue("MEMBER_ID", value.value);
														}}
													/>
													<span className="error">{errors.MEMBER_ID && touched.MEMBER_ID && errors.MEMBER_ID}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Member Nominee <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member Nominee"
														options={memberNomineeList}
														onChange={(value) => {
															setFieldValue("MN_ID", value.value);
														}}
													/>
													<span className="error">{errors.MN_ID && touched.MN_ID && errors.MN_ID}</span>
												</div>
											</div>
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Available <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Availablitiy" options={status}*/}
											{/*            onChange={(value) => {*/}
											{/*                setFieldValue("IsAvailable", value)*/}
											{/*            }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.IsAvailable && touched.IsAvailable && errors.IsAvailable}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Possession Active <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Possession Status"
														options={statusList}
														onChange={(value) => {
															setFieldValue("IsPossession", value);
														}}
													/>
													<span className="error">
														{errors.IsPossession && touched.IsPossession && errors.IsPossession}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														options={statusList}
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
			{/* /Create Project Modal */}

			{/* Edit Unit  Modal */}
			<Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Unit </h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowEditProjectModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={unitInitialValues}
							validate={(values) => {
								let errors = {};
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member Name is required";
								}
								if (!values.MN_ID) {
									errors.MN_ID = "Nominee Name is required";
								}
								if (!values.BK_ID) {
									errors.BK_ID = "Block Name is required";
								}
								if (!values.PS_ID) {
									errors.PS_ID = "Plot Size Name is required";
								}
								if (!values.UType_ID) {
									errors.UType_ID = "Unit Type Name is required";
								}
								if (!values.ST_ID) {
									errors.ST_ID = "Street Name is required";
								}
								// if (!values.CAT_ID) {
								//     errors.CAT_ID = "Unit Category is required";
								// }
								// if (!values.FL_ID) {
								//     errors.FL_ID = "Floor Name is required";
								// }
								if (!values.NameAddress) {
									errors.NameAddress = "Unit Name is required";
								}
								// if (!values.IsAvailable) {
								//     errors.IsAvailable = "Availability Status is required";
								// }
								if (!values.IsActive) {
									errors.IsActive = "Status is required";
								}
								if (!values.AreaMeasure) {
									errors.AreaMeasure = "Total Area is required";
								}
								if (!values.MeterRef_No) {
									errors.MeterRef_No = "Meter Ref No is required";
								}
								if (!values.IsPossession) {
									errors.IsPossession = "Possession is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									NameAddress: values.NameAddress,
									MEMBER_ID: values.MEMBER_ID.value,
									MN_ID: values.MN_ID.value,
									BK_ID: values.BK_ID.value,
									ST_ID: values.ST_ID.value,
									// FL_ID: values.FL_ID.value,
									// CAT_ID: values.CAT_ID.value,
									UType_ID: values.UType_ID.value,
									PS_ID: values.PS_ID.value,
									AreaMeasure: values.AreaMeasure,
									MeterRef_No: values.MeterRef_No,
									IsPossession: values.IsPossession.value,
									// IsAvailable: values.IsAvailable.value,
									IsActive: values.IsActive.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `unit/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllUnit();
										toast.success(res.data.message);
										setloading(false);
										setIsShowEditProjectModal(false);
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
														Unit Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Unit Name"
														value={values.NameAddress}
														onChange={(e) => {
															setFieldValue("NameAddress", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NameAddress && touched.NameAddress && errors.NameAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Block <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Block"
														options={blockName}
														value={values.BK_ID}
														onChange={(value) => {
															setFieldValue("BK_ID", value.value);
														}}
													/>
													<span className="error">{errors.BK_ID && touched.BK_ID && errors.BK_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Street <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Street"
														options={streetName}
														value={values.ST_ID}
														onChange={(value) => {
															setFieldValue("ST_ID", value);
														}}
													/>
													<span className="error">{errors.ST_ID && touched.ST_ID && errors.ST_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Unit Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Unit Type"
														options={unitTypeName}
														value={values.UType_ID}
														onChange={(value) => {
															setFieldValue("UType_ID", value);
														}}
													/>
													<span className="error">{errors.UType_ID && touched.UType_ID && errors.UType_ID}</span>
												</div>
											</div>
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Unit Category <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Unit Category" value={values.CAT_ID} options={unitCategoryName}*/}
											{/*                onChange={(value) => {*/}
											{/*                    setFieldValue("CAT_ID", value)*/}
											{/*                }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.CAT_ID && touched.CAT_ID && errors.CAT_ID}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Floor <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Floor" value={values.FL_ID} options={floorName}*/}
											{/*                onChange={(value) => {*/}
											{/*                    setFieldValue("FL_ID", value)*/}
											{/*                }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.FL_ID && touched.FL_ID && errors.FL_ID}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Plot Size <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Plot Size"
														options={plotSize}
														value={values.PS_ID}
														onChange={(value) => {
															setFieldValue("PS_ID", value);
														}}
													/>
													<span className="error">{errors.PS_ID && touched.PS_ID && errors.PS_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Total Area <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Total Area"
														value={values.AreaMeasure}
														onChange={(e) => {
															setFieldValue("AreaMeasure", e.target.value);
														}}
													/>
													<span className="error">
														{errors.AreaMeasure && touched.AreaMeasure && errors.AreaMeasure}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Meter Ref No <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Meter Ref No"
														value={values.MeterRef_No}
														onChange={(e) => {
															setFieldValue("MeterRef_No", e.target.value);
														}}
													/>
													<span className="error">
														{errors.MeterRef_No && touched.MeterRef_No && errors.MeterRef_No}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Member <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member"
														options={memberList}
														value={values.MEMBER_ID}
														onChange={(value) => {
															setFieldValue("MEMBER_ID", value);
														}}
													/>
													<span className="error">{errors.MEMBER_ID && touched.MEMBER_ID && errors.MEMBER_ID}</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Member Nominee <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Member Nominee"
														options={memberNomineeList}
														value={values.MN_ID}
														onChange={(value) => {
															setFieldValue("MN_ID", value);
														}}
													/>
													<span className="error">{errors.MN_ID && touched.MN_ID && errors.MN_ID}</span>
												</div>
											</div>
											{/*<div className="col-sm-6">*/}
											{/*    <div className="form-group">*/}
											{/*        <label>Available <span className="text-danger">*</span></label>*/}
											{/*        <Select placeholder="Select Availablitiy" value={values.IsAvailable} options={status}*/}
											{/*                onChange={(value) => {*/}
											{/*                    setFieldValue("IsAvailable", value)*/}
											{/*                }}*/}
											{/*        />*/}
											{/*        <span className="error">*/}
											{/*            {errors.IsAvailable && touched.IsAvailable && errors.IsAvailable}*/}
											{/*        </span>*/}
											{/*    </div>*/}
											{/*</div>*/}
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Possession Active <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														options={statusList}
														value={values.IsPossession}
														onChange={(value) => {
															setFieldValue("IsPossession", value);
														}}
													/>
													<span className="error">
														{errors.IsPossession && touched.IsPossession && errors.IsPossession}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Status <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Status"
														options={statusList}
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
			{/* /Edit Unit  Modal */}

			{/* {Create PlotUnit Modal} */}
			{/* <Modal show={isShowPlotUnitModal} dialogClassName="employee-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Plot Unit </h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsShowPlotUnitModal(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={plotUnitInitialValues}
              validate={(values) => {
                let errors = {};
                if (!values.BLK_ID) {
                  errors.BLK_ID = "Block Name is required";
                }
                if (!values.PS_ID) {
                  errors.PS_ID = "Plot Size Name is required";
                }
                if (!values.UType_ID) {
                  errors.UType_ID = "Unit Type Name is required";
                }
                if (!values.Plot_No) {
                  errors.Plot_No = " Plot No is required";
                }
                if (!values.unitName) {
                  errors.unitName = "Unit Name is required";
                }
                console.log("errors", errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  unitName: values.unitName,
                  BLK_ID: values.BLK_ID,
                  Plot_No: values.Plot_No,
                  UType_ID: values.UType_ID,
                  PS_ID: values.PS_ID,
                };
                try {
                  setloading(true);
                  const res = await Axios.post(
                    baseApiUrl + "unit/unitForPlot",
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllUnit();
                    toast.success(res.data.message);
                    setloading(false);
                    setIsShowPlotUnitModal(false);
                  }
                } catch (err) {
                  setloading(false);
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
                isValid,

              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Unit Name <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Unit Name"
                            onChange={(e) => {
                              setFieldValue("unitName", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.unitName &&
                              touched.unitName &&
                              errors.unitName}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Plot No <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Plot No"
                            onChange={(e) => {
                              setFieldValue("Plot_No", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Plot_No &&
                              touched.Plot_No &&
                              errors.Plot_No}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Block <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Block"
                            options={blockName}
                            onChange={(value) => {
                              setFieldValue("BLK_ID", value.value);
                            }}
                          />
                          <span className="error">
                            {errors.BLK_ID && touched.BLK_ID && errors.BLK_ID}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Unit Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Unit Type"
                            options={unitTypeName}
                            onChange={(value) => {
                              setFieldValue("UType_ID", value.value);
                            }}
                          />
                          <span className="error">
                            {errors.UType_ID &&
                              touched.UType_ID &&
                              errors.UType_ID}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Plot Size <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Plot Size"
                            options={plotSize}
                            onChange={(value) => {
                              setFieldValue("PS_ID", value.value);
                            }}
                          />
                          <span className="error">
                            {errors.PS_ID && touched.PS_ID && errors.PS_ID}
                          </span>
                        </div>
                      </div>
                    </div>
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
      </Modal> */}

			{/* {Create PlotUnit Modal} */}

			{/* Assign Plot No */}
			<Modal show={isShowVCModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Assign Plot No</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowVCModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={vCInitialValues}
							validate={(values) => {
								const errors = {};

								if (!values.VC_NO) {
									errors.VC_NO = "vcNo is required";
								}
								// console.log("Ffffffffff",errors)
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									VC_NO: values.VC_NO,
									Unit_ID: query
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `/unit/update/vcno?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllUnit(1);
										toast.success(res.data.message);
										setIsShowVCModal(false);
										setloading(false);
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
														VC No
														{/* <span className="text-danger"> *</span> */}
													</label>
													<input
														className="form-control"
														name="VC_NO"
														type="text"
														placeholder="VC No"
														value={values.VC_NO}
														onChange={(e) => {
															setFieldValue("VC_NO", e.target.value);
														}}
													/>

													<span className="error">{errors.VC_NO && touched.VC_NO && errors.VC_NO}</span>
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
			{/* /Assign Plot No */}

			{/* Delete Unit  Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Unit</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteUnitById(query)}
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
			{/* /Delete Unit  Modal */}
		</div>
	);
};

export default Unit;
