import React, { useEffect, useRef } from "react";

import Axios from "axios";
import { Table, Input, Space } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Modal, Form } from "react-bootstrap";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import InputMask from "react-input-mask";
import Alert from "react-bootstrap/Alert";
import moment from "moment";

const FileSubmission = () => {
	let fileSubmissionButton = false;

	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [page, setPage] = useState(1);
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
	const [fsrcCode, setFsrcCode] = useState();
	const [name, setName] = useState();
	const [cnic, setCnic] = useState();
	const [fileSubmission, setFileSubmission] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [loading, setloading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(null);
	const [fileSubmissionhit, setFileSubmissionHit] = useState([]);

	const [showAlert, setShowAlert] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);
	const [PDF, setPDF] = useState(null);
	const [redirectUrl, setRedirectUrl] = useState(null);
	const [firstSubmit, setFirstSubmit] = useState(false);
	const [query, setQuery] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [filesubmissionInitialValues, setFileSubmissionInitialValues] = useState({
		Form_Code: "",
		SRForm_No: "",
		Name: "",
		// OF_ID: filteredData?.OF_ID ? filteredData?.OF_ID : "",
		CNIC: "",
		Mobile: "",
		Is_APProved: 1,
		Doc_Delivery_Date: "",
		USER_ID: filteredData?.USER_ID ? filteredData?.USER_ID : "",
		...filteredData,
		PS_ID: filteredData?.PlotSize
			? {
					label: filteredData?.PlotSize.Name,
					value: filteredData?.PlotSize.PS_ID
			  }
			: "",
		UType_ID: filteredData?.UnitType
			? {
					label: filteredData?.UnitType.Name,
					value: filteredData?.UnitType.UType_ID
			  }
			: ""
	});

	// const filter = () => {

	//   Axios.get(
	//     baseApiUrl +
	//       `fileSub/filterFile?Name=${name}&CNIC=${cnic}&SRForm_No=${formNumber}`
	//   )
	//     .then((res) => {
	//       // console.log(
	//       //   "dddddddddddddddddd",
	//       //   res?.data?.file.map((item) => item.FileSubmission)
	//       // );
	//       setFileSubmission(res?.data?.file?.map((item) => item?.FileSubmission));
	//       // setTotalPage(res?.data?.totalPage);
	//     })
	//     .catch((err) => console.log(err?.response?.data?.message));
	// };

	const approvalStatus = [
		{ value: true, label: "Approved" },
		{ value: false, label: "Rejected" }
	];
	// const onSearch = (value) => {
	//   console.log("SSSSSSSSSSSSSSSSSss", value);
	//   getAllFileSubmission(1, value);
	// };

	const getAllFileSubmission = (page, FSRC_Code, Name, CNIC) => {
		setPage(page);
		if (typeof FSRC_Code === "undefined" || FSRC_Code === null) {
			FSRC_Code = "";
		}

		// Check and set Name
		if (typeof Name === "undefined" || Name === null) {
			Name = "";
		}

		// Check and set CNIC
		if (typeof CNIC === "undefined" || CNIC === null) {
			CNIC = "";
		}
		// console.log("ffffffffffffffffffffffff",FSRC_Code)
		Axios.get(baseApiUrl + `fileSub/list?page=${page}&FSRC_Code=${FSRC_Code}&Name=${Name}&CNIC=${CNIC}`)
			.then((res) => {
				// console.log("gggggggggggggggggggg", res?.data?.file);
				setFileSubmission(res?.data?.file);
				setTotalPage(res?.data?.totalPage);
				setTotalRecords(res?.data?.totalRecords);
			})
			.catch((err) => console.log(err?.response?.data?.message));
	};
	const deleteFileSubById = (id) => {
		Axios.delete(baseApiUrl + `fileSub/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getAllFileSubmission(1);
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};
	const [filterTable, setFilterTable] = useState(null);
	// const onSearch = (value) => {
	//   const filterData = booking.filter((item) =>
	//     item.id.toString().toLowerCase().includes(value.toLowerCase())
	//   );
	//   setFilterTable(filterData);
	// };

	const FilePdf = (value) => {
		let pdfId = PDF;
		if (typeof value != "object" && typeof value != "undefined") {
			pdfId = value;
		}

		Axios.get(baseApiUrl + `fileSub/getPdf?id=${pdfId}`)
			.then((res) => {
				// getAllFileSubmission(1);
				if (res.data?.status == 200) {
					// setRedirectUrl(res.data.file.url);
					setTimeout(function () {
						window.open(res.data?.file?.url, "_blank");
					}, 1000);

					// setRedirectUrl(null);
				}
			})
			.catch((err) => console.log(err.response.data));
	};
	useEffect(() => {
		getAllFileSubmission(1);
		// getAllPlotSize();
		// getAllUnitType();
	}, []);

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};
	const handleButtonClick = () => {
		if (searchTerm.trim() === "") {
			setFilteredData(null);
			setFileSubmissionHit([]);
			setSuccessAlert(false);
			setShowAlert(false);
		} else if (fileSubmissionhit.length < 5) {
			Axios.get(baseApiUrl + "file/getFile?formNo=" + searchTerm)
				.then((res) => {
					const item = res.data?.file;
					setSuccessAlert(false);

					const isFSRCDuplicate = fileSubmissionhit.some((submission) => submission.formCode === item.Form_Code);

					if (isFSRCDuplicate) {
						// Show a toast notification for duplicate FSRC Code
						toast.error("FSRC Code already added to the table.");
					} else {
						setFileSubmissionHit((prevSubmissions) => [
							...prevSubmissions,
							{
								plotSizeId: item.PlotSize?.PS_ID,
								plotSize: item.PlotSize?.Name,
								unitType: item.UnitType?.Name,
								UType_ID: item.UnitType?.UType_ID,
								formCode: item.Form_Code,
								formNo: item.SRForm_No,
								OF_ID: item?.OF_ID ? item?.OF_ID : ""
							}
						]);
					}

					setFilteredData(item);
					setShowAlert(false);
				})
				.catch((err) => {
					if (err.response && err.response.data && err.response.data.Message) {
						// Display error message using a toast or an alert
						// setAlertMsg(err.response.data.Message);
						toast.error(err.response.data.Message);
						setFilteredData(res.data?.file);
					}
					setShowAlert(true);

					setFilteredData(null);
					setSuccessAlert(false);
				});

			// const results = data.filter((item) => {
			//     const nameMatch = item.key.toLowerCase().includes(searchTerm.toLowerCase());
			//     const isActiveMatch = item.isActive.toString().toLowerCase() === searchTerm.toLowerCase();
			//     return nameMatch || isActiveMatch;
			// });
			// console.log("OOOOOOOOOOOOOOOOOOOOO 2", data, results)
			// setFilteredData(results);
			// setShowAlert(results.length === 0);
		} else {
			// Show a toast notification for exceeding submission limit
			toast.error("Limit Exceed per FSRC Code.");
		}
	};

	const handleRemoveSubmission = (index) => {
		setFileSubmissionHit((prevSubmissions) => prevSubmissions.filter((_, i) => i !== index));
	};

	const columns = [
		{
			title: "Action",
			render: (text, record) => {
				// console.log(text, record)
				return (
					<div className="dropdown dropdown-action text-end">
						<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="material-icons">more_vert</i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							{/*<Link*/}
							{/*to="/"*/}
							{/*className="dropdown-item"*/}
							{/*data-bs-toggle="modal"*/}
							{/*data-bs-target="#edit_member"*/}
							{/*onClick={() => {*/}
							{/*setQuery(text.FSRC_ID);*/}
							{/*setIsShowUpdateModal(true);*/}
							{/*setFileSubmissionInitialValues({*/}
							{/*Name: "",*/}
							{/*CNIC: "",*/}
							{/*Mobile: "",*/}
							{/*...text,*/}
							{/*Is_APProved: approvalStatus.find(item => item.value === text.Is_APProved)*/}
							{/*});*/}
							{/*}}*/}
							{/*>*/}
							{/*<i className="fa fa-pencil m-r-5"/> Edit*/}
							{/*</Link>*/}
							{/*<Link*/}
							{/*to="/"*/}
							{/*className="dropdown-item"*/}
							{/*data-bs-toggle="modal"*/}
							{/*data-bs-target="#delete_member"*/}
							{/*onClick={() => {*/}
							{/*setQuery(text.FSRC_ID);*/}
							{/*}}*/}
							{/*>*/}
							{/*<i className="fa fa-trash-o m-r-5"/> Delete*/}
							{/*</Link>*/}
							<Link
								to="#"
								className="dropdown-item"
								// data-bs-toggle="modal"
								// data-bs-target="#delete_member"
								onClick={() => {
									setPDF(record?.FSRC_ID);
									setTimeout(() => {
										FilePdf(record?.FSRC_ID);
									}, 2000);

									// setQuery(text.FSRC_ID);
								}}
							>
								<i className="fa fa-download m-r-5" /> Receipt
							</Link>
						</div>
					</div>
				);
			}
		},
		{
			title: "Serial #",
			dataIndex: "FSRC_ID",
			render: (text, record, index) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span>
					</Space>
				);
			},
			sorter: (a, b) => a.FSRC_ID.length - b.FSRC_ID.length
		},
		{
			title: "FSRC Code",
			dataIndex: "FSRC_Code",
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text}</span>
					</Space>
				);
			},
			sorter: (a, b) => a.FSRC_Code.length - b.FSRC_Code.length
		},

		{
			title: "Receipt Date",
			dataIndex: "TIME_STAMP",
			sorter: (a, b) => a.Name.length - b.Name.length,
			render: (text) => {
				if (text) {
					const formattedDate = moment(text).format("DD-MMM-YYYY");
					return formattedDate;
				} else {
					return "";
				}
			}
		},
		{
			title: "Doc Delivery Date",
			dataIndex: "Doc_Delivery_Date",
			render: (text) => {
				if (text) {
					const formattedDate = moment(text).format("DD-MMM-YYYY");
					return formattedDate;
				} else {
					return "";
				}
			},
			sorter: (a, b) => a.Doc_Delivery_Date.length - b.Doc_Delivery_Date.length
		},
		{
			title: "Doc Delivery Time",
			dataIndex: "DD_Time",
			sorter: (a, b) => a.DD_Time.length - b.DD_Time.length
		},
		{
			title: "Name",
			dataIndex: "Name",
			sorter: (a, b) => a.Name.length - b.Name.length
		},
		{
			title: "Father Name",
			dataIndex: "FatherName",
			sorter: (a, b) => a.FatherName.length - b.FatherName.length
		},
		{
			title: "Second Name",
			dataIndex: "SecondName",
			sorter: (a, b) => a.SecondName.length - b.SecondName.length
		},
		{
			title: "Second Father Name",
			dataIndex: "SecondFatherName",
			sorter: (a, b) => a.SecondFatherName.length - b.SecondFatherName.length
		},
		{
			title: "CNIC",
			dataIndex: "CNIC",

			sorter: (a, b) => a.CNIC.length - b.CNIC.length
		},
		{
			title: "Mobile No",
			dataIndex: "Mobile",

			sorter: (a, b) => a.Mobile.length - b.Mobile.length
		},
		{
			title: "Remarks",
			dataIndex: "Remarks",
			render: (text) => {
				return text !== null ? text : "";
			},
			sorter: (a, b) => a.Remarks.length - b.Remarks.length
		},
		{
			title: "FileSubFeeAmount",
			dataIndex: "FileSub_Fee_Amt",
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text}</span>
					</Space>
				);
			},
			sorter: (a, b) => a.FileSub_Fee_Amt.length - b.FileSub_Fee_Amt.length
		}
		//
		// {
		//     title: "User Name",
		//     dataIndex: "User",
		//     sorter: (a, b) => a.USER_ID.length - b.USER_ID.length,
		//     render: (text, record) => {
		//         // console.log('IIIIIIIIIIIIIIIIIII', text, record)
		//         return (
		//             <div>
		//                 {text ? `${text.name} ${text.lastName}` : ''}
		//             </div>
		//         )
		//     },
		// },
		//
		// {
		//     title: "TIME STAMP",
		//     dataIndex: "TIME_STAMP",
		//     render: (text, record) =>
		//         (<span> {format(new Date(text), 'dd MMM y')} </span>),
		//     sorter: (a, b) => a.TIME_STAMP.length - b.TIME_STAMP.length,
		// },

		// {
		//     title: "Last Update",
		//     dataIndex: "LAST_UPDATE",
		//     render: (text, record) =>
		//         (<span> {format(new Date(text), 'dd MMM y')} </span>),
		//     sorter: (a, b) => a.LAST_UPDATE.length - b.LAST_UPDATE.length,
		// },
		// {
		//     title: "Approved",
		//     dataIndex: "Is_APProved",
		//     sorter: (a, b) => a.Is_APProved.length - b.Is_APProved.length,
		//     render: (text, record) => {
		//         // console.log(text, record)
		//         return (
		//             <span>
		//                 {text ? <Tag color="green" className="rounded-5">Approved</Tag> :
		//                     <Tag color="red" className="rounded-5">Rejected</Tag>}
		//             </span>
		//         )
		//     },
		// },
		// {
		//     title: "Status",
		//     dataIndex: "IsDeleted",
		//     sorter: (a, b) =>
		//         a.IsDeleted.length - b.IsDeleted.length,
		//     render: (text, record) => {
		//         // console.log(text, record)
		//         return (
		//             <span>
		//                 {!text ? <Tag color="green" className="rounded-5">Active</Tag> :
		//                     <Tag color="red" className="rounded-5">InActive</Tag>}
		//             </span>
		//         )
		//     },
		//
		// },
	];

	const handleTableChange = (pagination, filters, sorter) => {
		getAllFileSubmission(pagination.current);
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
				<title>File Submission - Sheranwala</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">File Submission</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">File Submission</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p
								href="#"
								className="btn add-btn"
								onClick={() => {
									if (fileSubmissionButton) {
										setIsShowProjectModal(true);
									} else {
										toast.error("YOU ARE NOT AUTHORIZED");
									}
								}}
							>
								<i className="fa fa-plus" /> Create File Submission
							</p>
						</div>
					</div>
				</div>
				{/* /Page Header */}

				{/* Search Filter */}
				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => setFsrcCode(e.target.value)}
								placeholder="Search By FSRC Code"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => setName(e.target.value)}
								placeholder="Search By Name"
							/>
						</div>
					</div>
					<div className="col-sm-5">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								onChange={(e) => setCnic(e.target.value)}
								placeholder="Search By CNIC"
							/>
						</div>
					</div>
					<div className="col-sm-1">
						<div className="form-group">
							<button
								className="btn btn-success btn-block w-100 py-2"
								onClick={() => getAllFileSubmission(1, fsrcCode, name, cnic)}
							>
								<i className="fa fa-search" />
							</button>
						</div>
					</div>
				</div>

				{/* <div className="col-sm-6 col-md-4 d-flex gap-5">
          <div className="form-group w-100">
            <Input.Search
              size="large"
              style={{ width: "270px" }}
              placeholder="Search By FSRC Code..."
              enterButton
              onSearch={onSearch}
            />
          </div>
          <div className="form-group">
            <Input.Search
              style={{ width: "270px" }}
              size="large"
              placeholder="Search By Name..."
              enterButton
              onSearch={onSearch}
            />
          </div>
          <div className="form-group">
            <Input.Search
              style={{ width: "270px" }}
              size="large"
              placeholder="Search By CNIC..."
              enterButton
              onSearch={onSearch}
            />
          </div>
          <div />
        </div> */}
				{/* /Search Filter */}

				{/* /Search Filter */}

				<div className="row">
					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									defaultPageSize: 25,
									total: (totalPage - 1) * 25,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								onChange={handleTableChange}
								bordered
								dataSource={fileSubmission}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* Create PaymentPlan Modal */}
			<Modal show={isShowProjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">File Submission</h5>
						<button type="button" className="close" onClick={() => setIsShowProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						{successAlert && (
							<div className="modal-body">
								<Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
									File submitted successfully.{" "}
									<a href="#" style={{ textDecoration: "underline", color: "green" }} onClick={FilePdf}>
										Click here
									</a>{" "}
									to download receipt.
								</Alert>
							</div>
						)}
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>Form Code</label>
									<input className="form-control" type="text" value={searchTerm} onChange={handleInputChange} />
								</div>
							</div>
							<div className="col-sm-3 my-auto">
								<div className="form-group mb-0">
									<button onClick={handleButtonClick} className="btn btn-success btn-block w-100 p-2">
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					{filteredData ? (
						<div className="modal-body">
							<Formik
								initialValues={{
									Form_Code: "",
									SRForm_No: "",
									Name: "",
									SecondName: "",
									OF_ID: filteredData?.OF_ID ? filteredData?.OF_ID : "",
									CNIC: "",
									Mobile: "",
									Is_APProved: 1,
									Doc_Delivery_Date: "",
									USER_ID: filteredData?.USER_ID ? filteredData?.USER_ID : "",
									...filteredData,
									PS_ID: filteredData?.PlotSize
										? {
												label: filteredData?.PlotSize.Name,
												value: filteredData?.PlotSize.PS_ID
										  }
										: "",
									UType_ID: filteredData?.UnitType
										? {
												label: filteredData?.UnitType.Name,
												value: filteredData?.UnitType.UType_ID
										  }
										: ""
								}}
								validate={(values) => {
									const errors = {};
									if (!values.Name) {
										errors.Name = " Name is required";
									}
									// if (!values.SecondName) {
									//   errors.SecondName = " Second Name is required";
									// }
									if (!values.CNIC) {
										errors.CNIC = "CNIC is required";
									} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.CNIC)) {
										errors.CNIC = "invalid CNIC number";
									}
									if (!values.Mobile) {
										errors.Mobile = "Mobile is required";
									}
									if (!values.Doc_Delivery_Date) {
										errors.Doc_Delivery_Date = " Doc Delivery Date is required";
									}
									// console.log("errors", errors)
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									if (confirmed) {
										// console.log('DDDDDDDDDDDDDDDDDDDDDDDDD', values, filteredData)

										// const header = {
										//     headers: {
										//         "Content-Type": "multipart/form-data",
										//     },
										// };

										try {
											setloading(true);
											const formData = {
												Form_Code: values.Form_Code,
												Form_Codes: fileSubmissionhit,
												SRForm_No: values.SRForm_No,
												Name: `${values.Name}`,
												FatherName: `${values.fatherName}`,
												SecondName: `${values.SecondName}`,
												SecondFatherName: `${values.SecondFatherName}`,
												PS_ID: values.PS_ID.value,
												UType_ID: values.UType_ID.value,
												OF_ID: values.OF_ID,
												CNIC: values.CNIC,
												Mobile: values.Mobile,
												Is_APProved: values.Is_APProved,
												Doc_Delivery_Date: values.Doc_Delivery_Date,
												USER_ID: 1
											};

											const res = await Axios.post(baseApiUrl + "fileSub/add", formData);

											if (res.data.status == 200) {
												setPDF(res.data.data.FSRC_ID);
												getAllFileSubmission(1);
												setloading(false);
												toast.success(res.data.message);
												setFileSubmissionHit([]);
												setFilteredData(false);
												setSuccessAlert(true);
											}
										} catch (err) {
											setloading(false);
											toast.error(err.response.data.message);
										}
									} else {
										toast.warning("Make sure your data is correct.");
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
									dirty
									/* and other goodies */
								}) => (
									<form onSubmit={handleSubmit}>
										<div className="row">
											{/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Form Code</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={true}
                            value={values.Form_Code}
                          />
                        </div>
                      </div> */}
											{/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Unit Type </label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={true}
                            value={values.UType_ID.label}
                          />
                        </div>
                      </div> */}
											{/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Plot Size</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={true}
                            value={values.PS_ID.label}
                          />
                        </div>
                      </div> */}
											{/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Form No</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={true}
                            value={values.SRForm_No}
                          />
                        </div>
                      </div> */}
											<div className="col-sm-12">
												<div className="form-group">
													<div
														style={{
															maxHeight: 200,
															overflowY: "scroll"
														}}
													>
														<table className="table table-bordered">
															<thead>
																<tr>
																	<th>Form Code</th>
																	<th>Form No</th>
																	<th>Plot Size</th>
																	<th>Unit Type</th>
																	<th>Actions</th>
																</tr>
															</thead>
															<tbody>
																{fileSubmissionhit?.map((submission, index) => (
																	<tr key={index}>
																		<td>{submission.formCode}</td>
																		<td>{submission.formNo}</td>
																		<td>{submission.plotSize}</td>
																		<td>{submission.unitType}</td>
																		<td>
																			<button className="btn btn-danger" onClick={() => handleRemoveSubmission(index)}>
																				Remove
																			</button>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														onChange={(e) => {
															setFieldValue("Name", e.target.value);
														}}
													/>
													<span className="error">{errors.Name && touched.Name && errors.Name}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Father Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														onChange={(e) => {
															setFieldValue("fatherName", e.target.value);
														}}
													/>
													<span className="error">{errors.fatherName && touched.fatherName && errors.fatherName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Second Name</label>
													<input
														className="form-control"
														type="text"
														onChange={(e) => {
															setFieldValue("SecondName", e.target.value);
														}}
													/>
													<span className="error">{errors.SecondName && touched.SecondName && errors.SecondName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Second Member Father Name </label>
													<input
														className="form-control"
														type="text"
														onChange={(e) => {
															setFieldValue("SecondFatherName", e.target.value);
														}}
													/>
													<span className="error">{errors.fatherName && touched.fatherName && errors.fatherName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														onChange={(e) => {
															setFieldValue("CNIC", e.target.value);
														}}
													/>
													<span className="error">{errors.CNIC && touched.CNIC && errors.CNIC}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Mobile No <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														onChange={(e) => {
															setFieldValue("Mobile", e.target.value);
														}}
													/>
													<span className="error">{errors.Mobile && touched.Mobile && errors.Mobile}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Delivery Date
														<span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="datetime-local"
														onChange={(e) => {
															setFieldValue("Doc_Delivery_Date", e.target.value);
														}}
													/>

													<span className="error">
														{errors.Doc_Delivery_Date && touched.Doc_Delivery_Date && errors.Doc_Delivery_Date}
													</span>
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
												<button
													type="submit"
													onClick={() => {
														if (!firstSubmit) {
															setFirstSubmit(true);
														} else {
															setConfirmed(true); // Proceed to submit data
														}
													}}
													className="btn btn-primary submit-btn"
												>
													Submit
												</button>
											)}
										</div>
									</form>
								)}
							</Formik>
						</div>
					) : (
						!successAlert &&
						showAlert && (
							<div className="modal-body">
								<Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
									{alertMsg}
								</Alert>
							</div>
						)
					)}
				</div>
			</Modal>
			{/* /Create PaymentPlan Modal */}
			{/* Edit PaymentPlan Modal */}
			<Modal show={isShowUpdateModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Package</h5>
						<button type="button" className="close" onClick={() => setIsShowUpdateModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={filesubmissionInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.Name) {
									errors.Name = " Name is required";
								}
								if (!values.CNIC) {
									errors.CNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.CNIC)) {
									errors.CNIC = "invalid CNIC number";
								}
								if (!values.Mobile) {
									errors.Mobile = "Mobile is required";
								}
								if (!values.Is_APProved) {
									errors.Is_APProved = " Approval Status is required";
								}
								// console.log("errors", errors)
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								// console.log('DDDDDDDDDDDDDDDDDDDDDDDDD',values, filteredData)
								const formData = {
									Name: values.Name,
									CNIC: values.CNIC,
									Mobile: values.Mobile,
									Is_APProved: values.Is_APProved.value
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `fileSub/update?id=${query}`, formData);
									if (res.data.status == 200) {
										getAllFileSubmission();
										setloading(false);
										toast.success(res.data.message);
										setIsShowUpdateModal(false);
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
								dirty
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Name <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													value={values.Name}
													onChange={(e) => {
														setFieldValue("Name", e.target.value);
													}}
												/>
												<span className="error">{errors.Name && touched.Name && errors.Name}</span>
											</div>
										</div>

										<div className="col-sm-6">
											<div className="form-group">
												<label>
													CNIC <span className="text-danger">*</span>
												</label>
												<InputMask
													className="form-control"
													mask="99999-9999999-9"
													maskChar=" "
													value={values.CNIC}
													onChange={(e) => {
														setFieldValue("CNIC", e.target.value);
													}}
												/>
												<span className="error">{errors.CNIC && touched.CNIC && errors.CNIC}</span>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Mobile No <span className="text-danger">*</span>
												</label>
												<input
													className="form-control"
													type="text"
													value={values.Mobile}
													onChange={(e) => {
														setFieldValue("Mobile", e.target.value);
													}}
												/>
												<span className="error">{errors.Mobile && touched.Mobile && errors.Mobile}</span>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>Approval Status</label>
												<Select
													placeholder="Select Status"
													value={values.Is_APProved}
													options={approvalStatus}
													onChange={(value) => {
														setFieldValue("Is_APProved", value);
													}}
												/>
												<span className="error">{errors.id && touched.id && errors.id}</span>
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
													// onClick={handleSubmit}
													className="btn btn-primary submit-btn"
												>
													Submit
												</button>
											)}
										</div>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>
			{/* /Edit package Modal */}
			{/* Delete package Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete File Submission</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteFileSubById(query)}
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
			{/* /Delete package Modal */}
		</div>
	);
};

export default FileSubmission;
