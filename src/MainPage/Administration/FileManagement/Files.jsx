import React, { useEffect, useRef } from "react";
import { Table, Input, Space } from "antd";
import Axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import ".//stylefile.css";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Modal, Form } from "react-bootstrap";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const Files = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
	const [filteredFile, setFilteredFile] = useState([]);
	const [file, setFile] = useState([]);
	const [page, setPage] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [fileSearch, setFileSearch] = useState([]);
	const [unitType, setUnitType] = useState([]);
	const [phase, setPhase] = useState([]);
	const [sector, setSector] = useState([]);
	const [block, setBlock] = useState([]);
	const [paymentPlan, setPaymentPlan] = useState([]);
	const [plotSize, setPlotSize] = useState([]);
	const [unitNatureType, setUnitNatureType] = useState([]);
	const [loading, setloading] = useState(false);
	const [query, setQuery] = useState("");
	const [formCode, setFormCode] = useState();
	const [formNo, setFormNo] = useState();
	const [selectedPhaseId, setSelectedPhaseId] = useState(0);

	useEffect(() => {
		if (selectedPhaseId != 0) {
			getAllSectorByPhsId(selectedPhaseId);
		}
	}, [selectedPhaseId]);
	const [fileInitialValues, setFileInitialValues] = useState({
		SR_Prefix: "",
		SR_Start: "",
		SR_End: "",
		Code_Prefix: "",
		Code_Start: "",
		plotType: "",
		UType_ID: "",
		PHS_ID: "",
		SECT_ID: "",
		BK_ID: "",
		PP_ID: "",
		PS_ID: "",
		NType_ID: ""
	});
	const getAllFiles = (page, formNo) => {
		setPage(page);
		if (typeof formNo == "undefined") {
			formNo = "";
		}

		Axios.get(baseApiUrl + `file/list` + "?page=" + page + "&formNo=" + formNo)
			.then((res) => {
				setFile(res.data.file);
				setTotalPage(res.data.totalPage);
				setFileSearch(res.data.file);
				setTotalRecords(res.data.totalRecords);
			})
			.catch((err) => console.log(err.response.data));
	};

	const filter = (page, SRForm_No) => {
		setPage(page);
		if (SRForm_No.length > 0) {
			Axios.get(baseApiUrl + `/file/getFile?code=${SRForm_No}`)
				.then((res) => {
					// console.log("gggggggggggggggg", res?.data?.file);
					setFile([res?.data?.file]);
					setTotalPage(res.data.totalPage);
					setFileSearch(res.data.file);
					setTotalRecords(res.data.totalRecords);
				})
				.catch((err) => console.log(err.response.data));
		} else {
			getAllFiles();
		}
	};

	// const buttonfilter = () => {
	//   filter(1)
	//   getAllFiles(1)
	// }

	const getAllUnitType = () => {
		Axios.get(baseApiUrl + "unitType/list").then((res) => {
			res.data.unitType.map((item) => {
				setUnitType((prev) => [...prev, { label: item.Name, value: item.UType_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllPhase = () => {
		Axios.get(baseApiUrl + "phase/list").then((res) => {
			res.data.Phases.map((item) => {
				setPhase((prev) => [...prev, { label: item.NAME, value: item.PHS_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllSector = () => {
		Axios.get(baseApiUrl + "sector/list").then((res) => {
			res.data.Sectors.map((item) => {
				setSector((prev) => [...prev, { label: item.NAME, value: item.SECT_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllSectorByPhsId = (phsId) => {
		Axios.get(baseApiUrl + "sector/phs/list?id=" + phsId).then((res) => {
			setSector([]);
			res.data.Sectors.map((item) => {
				setSector((prev) => [...prev, { label: item.NAME, value: item.SECT_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllBlock = () => {
		Axios.get(baseApiUrl + "block/list").then((res) => {
			res.data.Blocks.map((item) => {
				setBlock((prev) => [...prev, { label: item.Name, value: item.BK_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllBlockBySectId = (sectId) => {
		Axios.get(baseApiUrl + "block/sect/list?id=" + sectId).then((res) => {
			setBlock([]);
			res.data.Blocks.map((item) => {
				setBlock((prev) => [...prev, { label: item.Name, value: item.BLK_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllPaymentPlan = () => {
		Axios.get(baseApiUrl + "package/list").then((res) => {
			res.data.Packages.map((item) => {
				setPaymentPlan((prev) => [...prev, { label: item.Name, value: item.PP_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllPlotSize = () => {
		Axios.get(baseApiUrl + "plotSize/list").then((res) => {
			res.data.PlotSizes.map((item) => {
				setPlotSize((prev) => [...prev, { label: item.Name, value: item.PS_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};
	const getAllUnitNatureType = () => {
		Axios.get(baseApiUrl + "unitNatureType/list").then((res) => {
			res.data.UnitNatureTypes.map((item) => {
				setUnitNatureType((prev) => [...prev, { label: item.Name, value: item.NType_ID }]);
			});
		});
		// .catch((err) => console.log(err.response.data));
	};

	const deleteFileById = (id) => {
		Axios.delete(baseApiUrl + `file/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllFiles(1);
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	useEffect(() => {
		getAllFiles(1);
		getAllUnitNatureType();
		getAllPaymentPlan();
		getAllPlotSize();
		// getAllSector();

		getAllPhase();
		// getAllBlock();
		getAllUnitType();
	}, []);

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});
	const [filterTable, setFilterTable] = useState(null);
	const onSearch = (value) => {
		getAllFiles(1, value);
	};

	const onSearch1 = (value) => {
		filter(1, value);
	};

	const columns = [
		{
			title: "Serial No#",
			dataIndex: "OF_MaxCode",
			sorter: (a, b) => a.id - b.id,
			render: (text, record, index) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span>
					</Space>
				);
			}
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
			// ...getColumnSearchProps('id'),
		},
		{
			title: "OF Code",
			dataIndex: "OF_MaxCode",
			sorter: (a, b) => a.id - b.id
			// render: (text, record) => (
			//   <span>{record.id}</span>
			// ),
			// ...getColumnSearchProps('id'),
		},

		{
			title: "Serial Name",
			dataIndex: "SR_Name",
			// render: (text, record) => (
			//   <Link to="/app/administrator/job-details">{text}</Link>
			// ),
			sorter: (a, b) => a.SR_Name - b.SR_Name
		},
		{
			title: "Form No",
			dataIndex: "SRForm_No",
			sorter: (a, b) => a.SRForm_No - b.SRForm_No
		},
		{
			title: "Form Code",
			dataIndex: "Form_Code",
			sorter: (a, b) => a.Form_Code - b.Form_Code
		},
		{
			title: "Plot Type",
			dataIndex: "UnitType",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.Name}</span>;
			},
			sorter: (a, b) => a.UType_ID.length - b.UType_ID.length
		},
		{
			title: "Plot Size",
			dataIndex: "PlotSize",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.Name}</span>;
			},
			sorter: (a, b) => a.PS_ID.length - b.PS_ID.length
		},
		{
			title: "Payment Plan",
			dataIndex: "PaymentPlan",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.Name}</span>;
			},
			sorter: (a, b) => a.PaymentPlan.Name.length - b.PaymentPlan.Name.length
		},
		{
			title: "Phase",
			dataIndex: "Phase",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.NAME}</span>;
			},
			sorter: (a, b) => a.SECT_ID.length - b.SECT_ID.length
		},
		{
			title: "Sector",
			dataIndex: "Sector",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.NAME}</span>;
			},
			sorter: (a, b) => a.SECT_ID.length - b.SECT_ID.length
		},
		{
			title: "Unit Nature",
			dataIndex: "UnitNature",
			render: (text, record) => {
				// console.log(text," dfgsdfg ",record)
				return <span>{text?.Name}</span>;
			},
			sorter: (a, b) => a.UnitNature.Name.length - b.UnitNature.Name.length
		},
		{
			title: "Verify Count",
			dataIndex: "Verify_Count",
			sorter: (a, b) => a.Verify_Count.length - b.Verify_Count.length
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			render: (text, record) => <span> {format(new Date(text), "dd MMM y")} </span>,
			sorter: (a, b) => a.createdAt.length - b.createdAt.length
			// render: (text,record)=>(
			// <span>{format(new Date(text), format('dd MM yy' ))}</span>
			// )
		}
		// {
		//     title: "Collected At",
		//     dataIndex: "collectedAt",
		//     sorter: (a, b) => a.collectedAt.length - b.collectedAt.length,
		// },
		// {
		//     title: "Submitted At",
		//     dataIndex: "submittedAt",
		//     sorter: (a, b) => a.submittedAt.length - b.submittedAt.length,
		// },
		// {
		//     title: "Delivery Date",
		//     dataIndex: "deliveryDate",
		//     sorter: (a, b) => a.deliveryDate.length - b.deliveryDate.length,
		// },
		/* {
            title: "Action",
            render: (text, record) => {
                // console.log(
                //   "iiiiiiiiiiiiiii",
                //   text.relation,
                //   options.find((item) => item.label === text.relation)
                // );
                return (
                    <div className="dropdown dropdown-action text-end">
                        <Link
                            to="/"
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="material-icons">more_vert</i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link
                                to="/"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_member"
                                onClick={() => {
                                    setQuery(text.OF_ID);
                                    setIsShowEditProjectModal(true)
                                    setFileInitialValues({
                                        SR_Prefix: "",
                                        SR_Start: "",
                                        SR_End: "",
                                        Code_Prefix: "",
                                        Code_Start: "",
                                        plotType: "",
                                        ...text,
                                        PHS_ID: phase.find(item => item.value === text.PHS_ID),
                                        UType_ID: unitType.find(item => item.value === text.UType_ID),
                                        SECT_ID: sector.find(item => item.value === text.SECT_ID),
                                        BK_ID: block.find(item => item.value === text.BK_ID),
                                        PP_ID: paymentPlan.find(item => item.value === text.PP_ID),
                                        PS_ID: plotSize.find(item => item.value === text.PS_ID),
                                        NType_ID: unitNatureType.find(item => item.value === text.NType_ID),
                                        // relation: options.find(item => item.label === text.relation),
                                    })
                                }}
                            >
                                <i className="fa fa-pencil m-r-5"/> Edit
                            </Link>
                            <Link
                                to="/"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_member"
                                onClick={() => {
                                    setQuery(text.OF_ID);
                                }}
                            >
                                <i className="fa fa-trash-o m-r-5"/> Delete
                            </Link>
                        </div>
                    </div>
                );
            },
        },*/
	];

	const handleTableChange = (pagination, filters, sorter) => {
		getAllFiles(pagination.current);
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
				<title>File - Sheranwala Group</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">File</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Files</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create File
							</p>
						</div>
					</div>
				</div>
				{/* /Page Header */}
				{/* Search Filter */}
				{/* <div className="col-sm-6 col-md-4 d-flex gap-5">
          <div className="form-group">
            <Input.Search
            style={{width: "270px"}}
              size="large"
              placeholder="Search By Form No..."
              enterButton
              onSearch={onSearch}
            />

          </div>
          <div className="form-group">
            <Input.Search
            style={{width: "270px"}}
              size="large"
              placeholder="Search By Form Code..."
              enterButton
              onSearch={onSearch1}
            />

          </div>
          </div> */}
				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => setFormNo(e.target.value)}
								placeholder="Search By Form No"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => setFormCode(e.target.value)}
								placeholder="Search By Form Code"
							/>
						</div>
					</div>
					<div className="col-sm-5">
						<div className="form-group">
							{/* <input
                className="form-control"
                type="text"
                onChange={(e) => setFormCode(e.target.value)}
                placeholder="Search By Form Code"
              /> */}
						</div>
					</div>
					<div className="col-sm-1">
						<div className="form-group">
							<button
								className="btn btn-success btn-block w-100 py-2"
								onClick={() => {
									getAllFiles(1, formNo);
									filter(1, formCode);
								}}
							>
								<i className="fa fa-search" />
							</button>
						</div>
					</div>
				</div>
				{/* /Search Filter */}
				<div className="col-md-12">
					<div className="table-responsive">
						<Table
							className="table-striped"
							pagination={
								file
									? {
											defaultPageSize: 25,
											total: totalRecords,
											showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
											showSizeChanger: true,
											onShowSizeChange: onShowSizeChange,
											itemRender: itemRender
									  }
									: {}
							}
							onChange={handleTableChange}
							style={{ overflowX: "auto" }}
							columns={columns}
							bordered
							dataSource={filterTable == null ? file : filterTable}
							scroll={{ x: "max-content" }}
							rowKey={(record) => record.id}
						/>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* Create File Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create File</h5>
						<button type="button" className="close" onClick={() => setIsShowProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={fileInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.SR_Prefix) {
									errors.SR_Prefix = "Serial Prefix is required";
								}
								if (!values.SR_Start) {
									errors.SR_Start = "Serial Start is required";
								}
								if (!values.SR_End) {
									errors.SR_End = "Serial End is required";
								}
								if (!values.Code_Prefix) {
									errors.Code_Prefix = "Code Prefix is required";
								}
								if (!values.Code_Start) {
									errors.Code_Start = "Code Start is required";
								}
								if (!values.UType_ID) {
									errors.UType_ID = "Unit Type is required";
								}

								if (!values.PHS_ID) {
									errors.PHS_ID = "Phase is required";
								}
								if (!values.SECT_ID) {
									errors.SECT_ID = "Sector is required";
								}
								if (!values.BK_ID) {
									errors.BK_ID = "Block is required";
								}
								if (!values.PP_ID) {
									errors.PP_ID = "Payment Plan is required";
								}
								if (!values.PS_ID) {
									errors.PS_ID = "Plot Size is required";
								}
								if (!values.NType_ID) {
									errors.NType_ID = "Unit Nature Type is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									SR_Prefix: values.SR_Prefix,
									SR_Start: values.SR_Start,
									SR_End: values.SR_End,
									Code_Prefix: values.Code_Prefix,
									Code_Start: values.Code_Start,
									PS_ID: values.PS_ID.value,
									UType_ID: values.UType_ID.value,
									PHS_ID: values.PHS_ID.value,
									SECT_ID: values.SECT_ID.value,
									PP_ID: values.PP_ID.value,
									BK_ID: values.BK_ID.value,
									NType_ID: values.NType_ID.value
								};
								// console.log("FFFFFFFFFFFFFFF", formData);
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + `file/add`, formData);
									if (res.data.status == 200) {
										getAllFiles(1);
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
											<div className="col-sm-6">
												<div className="form-group ">
													<label>
														Serial Prefix
														<span className="text-danger">*</span>
													</label>
													<input
														className="form-control  "
														type="text"
														placeholder="Serial Prefix"
														onChange={(e) => {
															setFieldValue("SR_Prefix", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_Prefix && touched.SR_Prefix && errors.SR_Prefix}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Serial Start <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Serial Start"
														onChange={(e) => {
															setFieldValue("SR_Start", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_Start && touched.SR_Start && errors.SR_Start}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Serial End <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Serial End"
														onChange={(e) => {
															setFieldValue("SR_End", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_End && touched.SR_End && errors.SR_End}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Code Prefix <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Code Prefix"
														onChange={(e) => {
															setFieldValue("Code_Prefix", e.target.value);
														}}
													/>
													<span className="error">
														{errors.Code_Prefix && touched.Code_Prefix && errors.Code_Prefix}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Code Start <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Code Start "
														onChange={(e) => {
															setFieldValue("Code_Start", e.target.value);
														}}
													/>
													<span className="error">{errors.Code_Start && touched.Code_Start && errors.Code_Start}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Unit Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Unit Type"
														options={unitType}
														onChange={(value) => {
															setFieldValue("UType_ID", value);
														}}
													/>
													<span className="error">{errors.UType_ID && touched.UType_ID && errors.UType_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Phase <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Phase"
														options={phase}
														onChange={(value) => {
															setFieldValue("PHS_ID", value);
															setSelectedPhaseId(value.value);
														}}
													/>
													<span className="error">{errors.PHS_ID && touched.PHS_ID && errors.PHS_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Sector <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Sector"
														options={sector}
														onChange={(value) => {
															setFieldValue("SECT_ID", value);
															getAllBlockBySectId(value.value);
														}}
													/>
													<span className="error">{errors.SECT_ID && touched.SECT_ID && errors.SECT_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Block <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Block"
														options={block}
														onChange={(value) => {
															setFieldValue("BK_ID", value);
														}}
													/>
													<span className="error">{errors.BK_ID && touched.BK_ID && errors.BK_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Payment Plan <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Payment Plan"
														options={paymentPlan}
														onChange={(value) => {
															setFieldValue("PP_ID", value);
														}}
													/>
													<span className="error">{errors.PP_ID && touched.PP_ID && errors.PP_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Plot Size <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Plot Size"
														options={plotSize}
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
														Unit Nature Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Unit Nature Type"
														options={unitNatureType}
														onChange={(value) => {
															setFieldValue("NType_ID", value);
														}}
													/>
													<span className="error">{errors.NType_ID && touched.NType_ID && errors.NType_ID}</span>
												</div>
											</div>
										</div>
										<div className="submit-section">
											{loading ? (
												<button
													type="submit"
													data-bs-dismiss="modal"
													disabled={true}
													className="btn btn-primary submit-btn"
												>
													<div class="spinner-border text-warning" role="status">
														<span class="sr-only">Loading...</span>
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
			{/* /Create File Modal */}
			{/* Edit File Modal */}
			<Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit File</h5>
						<button type="button" className="close" onClick={() => setIsShowEditProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={fileInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.SR_Prefix) {
									errors.SR_Prefix = "Serial Prefix is required";
								}
								if (!values.SR_Start) {
									errors.SR_Start = "Serial Start is required";
								}
								if (!values.SR_End) {
									errors.SR_End = "Serial End is required";
								}
								if (!values.Code_Prefix) {
									errors.Code_Prefix = "Code Prefix is required";
								}
								if (!values.Code_Start) {
									errors.Code_Start = "Code Start is required";
								}
								if (!values.UType_ID) {
									errors.UType_ID = "Unit Type is required";
								}

								if (!values.PHS_ID) {
									errors.PHS_ID = "Phase is required";
								}
								if (!values.SECT_ID) {
									errors.SECT_ID = "Sector is required";
								}
								if (!values.BK_ID) {
									errors.BK_ID = "Block is required";
								}
								if (!values.PP_ID) {
									errors.PP_ID = "Payment Plan is required";
								}
								if (!values.PS_ID) {
									errors.PS_ID = "Plot Size is required";
								}
								if (!values.NType_ID) {
									errors.NType_ID = "Unit Nature Type is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									SR_Prefix: values.SR_Prefix,
									SR_Start: values.SR_Start,
									SR_End: values.SR_End,
									Code_Prefix: values.Code_Prefix,
									Code_Start: values.Code_Start,
									PS_ID: values.PS_ID.value,
									UType_ID: values.UType_ID.value,
									PHS_ID: values.PHS_ID.value,
									SECT_ID: values.SECT_ID.value,
									PP_ID: values.PP_ID.value,
									BK_ID: values.BK_ID.value,
									NType_ID: values.NType_ID.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `file/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllFiles(1);
										toast.success(res.data.message);
										setloading(false);
										setIsShowEditProjectModal(false);
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
											<div className="col-sm-6">
												<div className="form-group ">
													<label>
														Serial Prefix
														<span className="text-danger">*</span>
													</label>
													<input
														className="form-control  "
														type="text"
														value={values.SR_Prefix}
														placeholder="Serial Prefix"
														onChange={(e) => {
															setFieldValue("SR_Prefix", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_Prefix && touched.SR_Prefix && errors.SR_Prefix}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Serial Start <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.SR_Start}
														placeholder="Serial Start"
														onChange={(e) => {
															setFieldValue("SR_Start", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_Start && touched.SR_Start && errors.SR_Start}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Serial End <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.SR_End}
														placeholder="Serial End"
														onChange={(e) => {
															setFieldValue("SR_End", e.target.value);
														}}
													/>
													<span className="error">{errors.SR_End && touched.SR_End && errors.SR_End}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Code Prefix <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.Code_Prefix}
														placeholder="Code Prefix"
														onChange={(e) => {
															setFieldValue("Code_Prefix", e.target.value);
														}}
													/>
													<span className="error">
														{errors.Code_Prefix && touched.Code_Prefix && errors.Code_Prefix}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Code Start <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.Code_Start}
														placeholder="Code Start "
														onChange={(e) => {
															setFieldValue("Code_Start", e.target.value);
														}}
													/>
													<span className="error">{errors.Code_Start && touched.Code_Start && errors.Code_Start}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Unit Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Unit Type"
														value={values.UType_ID}
														options={unitType}
														onChange={(value) => {
															setFieldValue("UType_ID", value);
														}}
													/>
													<span className="error">{errors.UType_ID && touched.UType_ID && errors.UType_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														PHS_ID <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="PHS_ID"
														value={values.PHS_ID}
														options={phase}
														onChange={(value) => {
															setFieldValue("PHS_ID", value);
														}}
													/>
													<span className="error">{errors.PHS_ID && touched.PHS_ID && errors.PHS_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														SECT_ID <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="SECT_ID"
														value={values.SECT_ID}
														options={sector}
														onChange={(value) => {
															setFieldValue("SECT_ID", value);
														}}
													/>
													<span className="error">{errors.SECT_ID && touched.SECT_ID && errors.SECT_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														BK_ID <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="BK_ID"
														value={values.BK_ID}
														options={block}
														onChange={(value) => {
															setFieldValue("BK_ID", value);
														}}
													/>
													<span className="error">{errors.BK_ID && touched.BK_ID && errors.BK_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Payment Plan <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Payment Plan"
														value={values.PP_ID}
														options={paymentPlan}
														onChange={(value) => {
															setFieldValue("PP_ID", value);
														}}
													/>
													<span className="error">{errors.PP_ID && touched.PP_ID && errors.PP_ID}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Plot Size <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Plot Size"
														value={values.PS_ID}
														options={plotSize}
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
														Unit Nature Type <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Unit Nature Type"
														value={values.NType_ID}
														options={unitNatureType}
														onChange={(value) => {
															setFieldValue("NType_ID", value);
														}}
													/>
													<span className="error">{errors.NType_ID && touched.NType_ID && errors.NType_ID}</span>
												</div>
											</div>
										</div>
										<div className="submit-section">
											{loading ? (
												<button
													type="submit"
													data-bs-dismiss="modal"
													disabled={true}
													className="btn btn-primary submit-btn"
												>
													<div class="spinner-border text-warning" role="status">
														<span class="sr-only">Loading...</span>
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
			{/* /Edit File Modal */}
			{/* Delete File Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Job</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteFileById(query)}
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
			{/* /Delete File Modal */}
		</div>
	);
};

export default Files;
