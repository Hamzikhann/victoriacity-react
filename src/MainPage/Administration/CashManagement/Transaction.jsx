import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { Table } from "antd";
import { Button, Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import moment from "moment";
import ReactSelect from "react-select";
import { SearchOutlined } from "@ant-design/icons";

const Transaction = () => {
	const data = [
		{
			key: "1",
			name: "John Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			isActive: true
		},
		{
			key: "2",
			name: "Joe Black",
			age: 42,
			address: "London No. 1 Lake Park",
			isActive: false
		}
	];
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowSearchModal, setIsShowSearchModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState("payment_plan");
	const [isShowDoubleObjectModal, setIsShowisShowDoubleObjectModal] = useState(false);

	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");

	// const [transactions, setTransactions] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [successAlert, setSuccessAlert] = useState(false);
	const [query, setQuery] = useState("");
	const [transaction, setTransaction] = useState([]);
	const [bkRegCode, setBkRegCode] = useState();
	const [bkDate, setBkDate] = useState();
	const [planTypes, setPlanTypes] = useState([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [page, setPage] = useState(1);
	const [cnic, setCnic] = useState("");

	const [seeMoreData, setSeeMoreData] = useState([]);

	const [transactionInitialValues, setTransactionInitialValues] = useState({
		// id: "",
		memberName: "",
		contact: "",
		email: "",
		relation: "",
		cnic: "",
		fatherName: "",
		userImage: "",
		dob: "",
		address: "",
		permanentAddress: ""
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [searchRegTerm, setSearchRegTerm] = useState("");
	const [filteredRegData, setFilteredRegData] = useState(null);
	const [developmentFiltered, setDevelopmentFiltered] = useState(null);
	const [filteredObjData, setfilteredObjData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [SearchData, setSearchData] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [loading, setloading] = useState(false);
	const [PDF, setPDF] = useState(null);
	const options = [
		{ value: "Father", label: "Father" },
		{ value: "Husband", label: "Husband" },
		{ value: "Mother", label: "Mother" },
		{ value: "Sibiling", label: "Sibiling" },
		{ value: "Nephew", label: "Nephew" },
		{ value: "Neice", label: "Neice" },
		{ value: "Grand Son", label: "Grand Son" },
		{ value: "Grand Daughter", label: "Grand Daughter" },
		{ value: "Grand MOther", label: "Grand MOther" },
		{ value: "Grand Father", label: "Grand Father" },
		{ value: "Uncle", label: "Uncle" },
		{ value: "N/A", label: "N/A" }
	];

	const options1 = [
		{ value: "payment_plan", label: "Payment Plan" },
		{ value: "development_charges", label: "Development Charges" }
	];

	const columns = [
		{
			title: "Actions",
			render: (text, record) => {
				// console.log(
				// 	"iiiiiiiiiiiiiii",
				// 	text?.relation,
				// 	options.find((item) => item?.label === text?.relation)
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
									setPDF("");
									setTimeout(() => {
										TransactionReciept(record.INS_RC_ID);
									}, 2000);
								}}
							>
								<i className="fa fa-download m-r-5" /> Download PDF
							</Link>
							{/*<Link*/}
							{/*to="/"*/}
							{/*className="dropdown-item"*/}
							{/*data-bs-toggle="modal"*/}
							{/*data-bs-target="#delete_member"*/}
							{/*onClick={() => {*/}
							{/*setQuery(text.id)*/}
							{/*}}*/}
							{/*>*/}
							{/*<i className="fa fa-trash-o m-r-5"/> Delete*/}
							{/*</Link>*/}
						</div>
					</div>
				);
			}
		},
		{
			title: "Serial#",
			dataIndex: "INS_RC_ID",
			sorter: (a, b) => a.id - b.id,
			render: (text, record, index) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span>
					</Space>
				);
			}
		},

		{
			title: "Reg Code Display",
			dataIndex: "Booking",
			sorter: (a, b) => a?.Booking?.Reg_Code_Disply - b?.Booking?.Reg_Code_Disply,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.Reg_Code_Disply}</span>
					</Space>
				);
			}
		},

		{
			title: "Due Amount",
			dataIndex: "Installment_Due",
			sorter: (a, b) => a.Installment_Due.length - b.Installment_Due.length
		},
		{
			title: "Amount",
			dataIndex: "Installment_Paid",
			sorter: (a, b) => a.Installment_Paid.length - b.Installment_Paid.length
		},
		{
			title: "Remaining Amount",
			dataIndex: "Remaining_Amount",
			sorter: (a, b) => a.Installment_Paid.length - b.Installment_Paid.length
		},
		{
			title: "Transaction Date",
			dataIndex: "IRC_Date",
			sorter: (a, b) => a.IRC_Date.length - b.IRC_Date.length,
			render: (text) => {
				if (text) {
					const formattedDate = moment(text).format("DD-MMM-YYYY");
					return formattedDate;
				} else {
					return "";
				}
			}
		},
		// {
		//   title: "Payee Name",
		//   dataIndex: "Member",
		//   render: (text, record) => {
		//       // console.log(text," dfgsdfg ",record)
		//       return <span>{text?.BuyerName}</span>;
		//   },
		//   // render: (text, record) => (
		//   //   <Link to="/app/administrator/job-details">{text}</Link>
		//   // ),
		//   sorter: (a, b) => a.memberName.length - b.memberName.length,
		// },
		{
			title: "Payment Mode",
			dataIndex: "Payment_Mode",
			sorter: (a, b) => a.PMID.length - b.PMID.length,
			render: (text, record) => <div>{text?.Description}</div>
		},
		{
			title: "Transaction Type",
			dataIndex: "Installment_Type",
			sorter: (a, b) => a?.Installment_Type?.Name - b?.Installment_Type?.Name,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.Name}</span>
					</Space>
				);
			}
		},
		{
			title: "Due Month",
			dataIndex: "Installment_Month",
			render: (text) => {
				if (text) {
					const formattedDate = moment(text).format("DD-MMM-YYYY");
					return formattedDate;
				} else {
					return "";
				}
			},
			sorter: (a, b) => a.Due_Date.length - b.Due_Date.length
		},
		{
			title: "Instrument No",
			dataIndex: "INSTRUMENT_NO",
			sorter: (a, b) => a.INSTRUMENT_NO.length - b.INSTRUMENT_NO.length
			// render: (text, record) => (
			//     <div >
			//         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
			//     </div>
			// ),
		},
		{
			title: "Installment Code",
			dataIndex: "Installment_Code",
			sorter: (a, b) => a.Installment_Code.length - b.Installment_Code.length
		},
		{
			title: "CNIC",
			dataIndex: "Member",
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.BuyerCNIC}</span>
					</Space>
				);
			},
			sorter: (a, b) => a.Installment_Code.length - b.Installment_Code.length
		},
		{
			title: "BK Reg Code",
			dataIndex: "BK_Reg_Code",
			sorter: (a, b) => a.BK_Reg_Code - b.BK_Reg_Code
		},
		{
			title: "Verified By",
			dataIndex: "User",
			sorter: (a, b) => a?.User?.name.length - b?.User?.name.length,
			render: (text, record) => <div>{text?.name}</div>
		},
		{
			title: "Admin Verification",
			dataIndex: "AdminVarified",
			sorter: (a, b) => a.AdminVarified.length - b.AdminVarified.length,
			render: (text, record) => <div>{text ? "Verified" : "Unverified"}</div>
			// render: (text, record) => (
			//     <div >
			//         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
			//     </div>
			// ),
		}
		// {
		//   title: "Receipt Head",
		//   dataIndex: "contact",
		//   sorter: (a, b) => a.contact.length - b.contact.length,
		// },
	];

	const columnsSearch = [
		{
			title: "Serial#",
			dataIndex: "INS_RC_ID",
			sorter: (a, b) => a.id - b.id,
			render: (text, record, index) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span>
					</Space>
				);
			}
		},
		{
			title: "BK Reg Code",
			dataIndex: "BK_Reg_Code",
			sorter: (a, b) => a.BK_Reg_Code - b.BK_Reg_Code
		},
		{
			title: "Reg Code Display",
			dataIndex: "Reg_Code_Disply",
			sorter: (a, b) => a.Reg_Code_Disply - b.Reg_Code_Disply
			// render: (text, record) => {
			//   return (
			//     <Space
			//       direction="horizontal"
			//       style={{ width: "100%", justifyContent: "center" }}
			//     >
			//       <span>{text?.Reg_Code_Disply}</span>
			//     </Space>
			//   );
			// },
		},
		{
			title: "CNIC",
			dataIndex: "Member",
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.BuyerCNIC}</span>
					</Space>
				);
			},
			sorter: (a, b) => a.Installment_Code.length - b.Installment_Code.length
		},
		{
			title: "Form Code",
			dataIndex: "Form_Code",
			sorter: (a, b) => a.Form_Code.length - b.Form_Code.length
		},
		{
			title: "BK Date",
			dataIndex: "BK_Date",
			render: (text) => {
				if (text) {
					const formattedDate = moment(text).format("DD-MMM-YYYY");
					return formattedDate;
				} else {
					return "";
				}
			},
			sorter: (a, b) => a?.BK_Date - b?.BK_Date
		},
		{
			title: "No Of Installments",
			dataIndex: "No_Of_Installments",

			sorter: (a, b) => a.No_Of_Installments.length - b.No_Of_Installments.length
		}
	];

	const getAllTransactions = (page) => {
		Axios.get(baseApiUrl + "transaction/list?page=" + page).then((res) => {
			setTransaction(res.data.Transactions);
			setTotalPage(res.data.totalPage);
			setTotalRecords(res.data.totalRecords);
		});
		// .catch((err) => );
	};

	const TransactionReciept = (PDF) => {
		Axios.get(baseApiUrl + `transaction/file?id=${PDF}`)
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));

		// setRedirectUrl(null);
	};

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};
	const handleButtonClick = () => {
		if (searchTerm.trim() === "") {
			setFilteredData([]);
			setShowAlert(false);
		} else {
			const results = data.filter((item) => {
				const nameMatch = item.key.toLowerCase().includes(searchTerm.toLowerCase());
				const isActiveMatch = item.isActive.toString().toLowerCase() === searchTerm.toLowerCase();
				return nameMatch || isActiveMatch;
			});
			setFilteredData(results);
			setShowAlert(results.length === 0);
		}
	};

	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);
		getAllTransactions(pagination.current);
	};

	const handleRegInputChange = (event) => {
		setSearchRegTerm(event.target.value);
	};
	const handleRegButtonClick = () => {
		if (searchRegTerm.trim() === "") {
			setFilteredRegData(null);
			setSuccessAlert(false);
			setShowAlert(false);
		} else {
			Axios.get(baseApiUrl + "file/getBookingByCode?code=" + searchRegTerm)
				.then((res) => {
					setSuccessAlert(false);
					setFilteredRegData(res.data.files);
					setDevelopmentFiltered(res.data.dcFiles);
					setPlanTypes(res.data.types);
					setShowAlert(false);
					// toast.success("working");
				})
				.catch((err) => {
					console.log(err.response.data.message);
					setFilteredRegData(null);
					setSuccessAlert(false);
					setShowAlert(true);
					toast.error(err.response.data.message);
				});

			// const results = data.filter((item) => {
			//     const nameMatch = item.key.toLowerCase().includes(searchTerm.toLowerCase());
			//     const isActiveMatch = item.isActive.toString().toLowerCase() === searchTerm.toLowerCase();
			//     return nameMatch || isActiveMatch;
			// });
			// console.log("OOOOOOOOOOOOOOOOOOOOO 2", data, results)
			// setFilteredData(results);
			// setShowAlert(results.length === 0);
		}
	};

	const handleSearchButtonClick = () => {
		if (searchRegTerm.trim() === "") {
			setFilteredRegData(null);
			setSuccessAlert(false);
			setShowAlert(false);
		} else {
			Axios.get(baseApiUrl + "booking/cnic/list?CNIC=" + searchRegTerm)
				.then((res) => {
					// console.log("GGGGGGGGGGGGGGGGGGGG", res.data?.block);
					setSuccessAlert(false);
					setSearchData(res.data?.block);
					setShowAlert(false);
				})
				.catch((err) => {
					// console.log(err.response.data.message)
					setFilteredRegData(null);
					setSuccessAlert(false);
					setShowAlert(true);
				});

			// const results = data.filter((item) => {
			//     const nameMatch = item.key.toLowerCase().includes(searchTerm.toLowerCase());
			//     const isActiveMatch = item.isActive.toString().toLowerCase() === searchTerm.toLowerCase();
			//     return nameMatch || isActiveMatch;
			// });
			// console.log("OOOOOOOOOOOOOOOOOOOOO 2", data, results)
			// setFilteredData(results);
			// setShowAlert(results.length === 0);
		}
	};

	// const getSearchByCnic = (CNIC) => {
	//   // Check and set CNIC
	//   if (typeof CNIC === "undefined" || CNIC === null) {
	//     CNIC = "";
	//   }
	//   if (CNIC.length > 0) {
	//     Axios.get(
	//       baseApiUrl + `booking/cnic/list?CNIC=${CNIC}`
	//     )
	//       .then((res) => {
	//         console.log("YYYYYYYYYYYYYYYYYYYYYYYY",res.data?.blockC)
	//         setFilteredRegData(res.data?.block);
	//         setTotalPage(res?.data?.totalPage);
	//       })

	//       .catch((err) => console.log(err?.response?.data?.message));
	//   } else {
	//     getAllTransactions();
	//   }
	// };

	const getAllTransactionbyBkReg = () => {
		// Check and set CNIC
		let Reg_Code_Disply = bkRegCode;
		if (typeof Reg_Code_Disply === "undefined" || Reg_Code_Disply === null) {
			Reg_Code_Disply = "";
		}
		if (Reg_Code_Disply.length > 0) {
			Axios.get(baseApiUrl + `transaction/BK_Reg_Code/list?Reg_Code_Disply=${Reg_Code_Disply}`)
				.then((res) => {
					setTransaction(res?.data?.Transaction);
					setTotalPage(res?.data?.totalPage);
				})

				.catch((err) => console.log(err?.response?.data?.message));
		} else {
			getAllTransactions();
		}
	};

	const getAllTransactionbyDate = () => {
		// Check and set CNIC
		let bkdate = bkDate;
		if (typeof bkdate === "undefined" || bkdate === null) {
			bkdate = "";
		}
		console.log(bkdate);
		if (bkdate.length > 0) {
			Axios.get(baseApiUrl + `transaction/BK_Reg_Code/date?bkdate=${bkdate}`)
				.then((res) => {
					console.log(res);
					setTransaction(res?.data?.Transaction);
					setTotalPage(res?.data?.Transaction.length);
				})
				.catch((err) => console.log(err?.response?.data?.message));
		} else {
			getAllTransactions();
		}
	};

	const deleteTransactionById = (id) => {
		Axios.delete(baseApiUrl + `member/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					// console.log("Deleted Successfully");
				}
				// console.log({dataIndex: "id"}, "dfnsfknksd")
			})
			.catch((err) => console.log(err.response.data));
		// console.log(member)
	};

	const handleSelectChange = (selected) => {
		setSelectedOption(selected.value);
	};

	useEffect(() => {
		getAllTransactions(1);
	}, []);

	const getSumPaidAmt = (itm) => {
		let sumPaid = 0;

		itm.obj?.map((item) => {
			sumPaid += parseFloat(item.Installment_Paid);
		});

		return sumPaid;
	};

	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	});

	// console.log("aaaaaaaaaaaaaaaacccccccccccccccccccc", developmentFiltered);

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Transaction - Sheranwala</title>
				{/*<meta name="description" content="Login page"/>*/}
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Transaction</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">Transaction</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<Link to="#" className="btn add-btn button" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create Transaction
							</Link>
							<Link
								to="/app/administrator/create-transaction"
								style={{ marginRight: 20 }}
								className="btn add-btn button"
								// onClick={() => setIsShowProjectModal(true)}
							>
								<i className="fa fa-plus" /> Create Bulk Transaction
							</Link>
							<Link
								style={{ marginRight: 20 }}
								className="btn add-btn button"
								onClick={() => setIsShowSearchModal(true)}
							>
								<i className="fa fa-plus" /> Search CNIC
							</Link>
						</div>
					</div>
				</div>
				{/* /Page Header */}

				{/* Search Filter */}
				{/* <div className="row filter-row">
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Transaction Reg Code"
              />
            </div>
          </div> */}
				{/*<div className="col-sm-6 col-md-3">*/}
				{/*    <div className="form-group form-focus">*/}
				{/*        <input type="text" className="form-control floating"/>*/}
				{/*        <label className="focus-label">Employee Name</label>*/}
				{/*    </div>*/}
				{/*</div>*/}
				{/*<div className="col-sm-6 col-md-6">*/}
				{/*    <div className="form-group form-focus select-focus">*/}
				{/*        <select className="select floating">*/}
				{/*            <option>Select Roll</option>*/}
				{/*            <option>Web Developer</option>*/}
				{/*            <option>Web Designer</option>*/}
				{/*            <option>Android Developer</option>*/}
				{/*            <option>Ios Developer</option>*/}
				{/*        </select>*/}
				{/*        <label className="focus-label">Role</label>*/}
				{/*    </div>*/}
				{/*</div>*/}
				{/* <div className="col-sm-2 col-md-2">
            <button
              onClick={handleButtonClick}
              className="btn btn-success btn-block rounded w-100"
            >
              {" "}
              Search
            </button>
          </div>
        </div> */}

				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								style={{ width: "100%" }}
								onChange={(e) => {
									setBkRegCode(e.target.value);
									// getAllTransactionbyBkReg(e.target.value);
								}}
								placeholder="Search By Reg Code Display"
							/>
						</div>
						<div>
							<Button
								type="primary"
								onClick={() => getAllTransactionbyBkReg()}
								// icon={<SearchOutlined />}
								size="small"
								style={{
									width: 90
								}}
							>
								Search
							</Button>
							{/* <SearchOutlined
								style={{
									color: filtered ? "#1890ff" : undefined
								}}
							/> */}
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<input
								className="form-control"
								type="date"
								style={{ width: "100%" }}
								onChange={(e) => {
									setBkDate(e.target.value);
									// getAllTransactionbyBkReg(e.target.value);
								}}
								placeholder="Search By Date"
							/>
						</div>
						<div>
							<Button
								type="primary"
								onClick={() => getAllTransactionbyDate()}
								// icon={<SearchOutlined />}
								size="small"
								style={{
									width: 90
								}}
							>
								Search
							</Button>
							{/* <SearchOutlined
								style={{
									color: filtered ? "#1890ff" : undefined
								}}
							/> */}
						</div>
					</div>
					{/* <div className="form-group">
              <input
                className="form-control"
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setCnic(e.target.value);
                  getSearchByCnic(e.target.value);
                }}
                placeholder="Search By Reg Code Display"
              />
            </div> */}
					{/* <div className="col-sm-1">
            <div className="form-group"> */}
					{/* <button
                className="btn btn-success btn-block w-100 py-2"
                // onClick={() => getAllNomineebyCnic(cnic)}

              >
                <i className="fa fa-search" />
              </button> */}
					{/* </div>
          </div> */}
				</div>

				{/* /Search Filter */}

				<div className="row">
					{/*<div>{filteredData.length > 0 ? (*/}
					{/*    filteredData.map((item) => (*/}
					{/*        <div key={item.key}>*/}
					{/*            <p>Name: {item.name}</p>*/}
					{/*            <p>Age: {item.age}</p>*/}
					{/*            <p>Address: {item.address}</p>*/}
					{/*        </div>*/}
					{/*    ))*/}
					{/*) : (*/}
					{/*    searchTerm.trim() !== '' && <p>No data found</p>*/}
					{/*)}</div>*/}
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
								bordered
								dataSource={transaction}
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
						<h5 className="modal-title">Transaction</h5>
						<button type="button" className="close" onClick={() => setIsShowProjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						{successAlert && (
							<div className="modal-body">
								<Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
									Transaction submitted successfully.{" "}
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
							<div className="col-sm-4">
								<div className="form-group">
									<label>REG No</label>
									<input className="form-control" type="text" value={searchRegTerm} onChange={handleRegInputChange} />
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Select Option</label>
									<Select
										options={options1}
										value={options1.find((el) => el.value == selectedOption)}
										onChange={handleSelectChange}
									/>
								</div>
							</div>
							<div className="col-sm-4 my-auto ">
								<div className="form-group mb-0">
									<button onClick={handleRegButtonClick} className="btn btn-success btn-block w-100 p-2">
										Search
									</button>
								</div>
							</div>
						</div>
					</div>
					{selectedOption === "payment_plan" && filteredRegData && filteredRegData.length > 0 ? (
						<div className="modal-body">
							<b>Select Payment Plan</b>
							<br />
							<br />
							<table className="table table-stripped">
								<tr>
									<th style={{ marginRight: "2px" }}>Action</th>
									<th>SR#</th>

									<th style={{ paddingLeft: "15px" }}>Type</th>
									<th>Due Date</th>
									<th>Amount</th>
									<th>Paid Amount</th>
									<th>Remaining Amount</th>
									<th>Receipt No</th>
									<th>Payment Mode</th>
									<th>Verification</th>
									<th style={{ paddingLeft: "40px" }}>Action</th>
								</tr>

								{filteredRegData.map((itm, ind) => (
									<tr>
										<td>
											{itm.obj.length > 0 && (
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
															// onClick={() =>  TransactionReciept(itm.obj[0].INS_RC_ID)}
															onClick={() => TransactionReciept(itm.obj[0].INS_RC_ID)}
														>
															<i className="fa fa-download m-r-5" /> Download PDF
														</Link>
													</div>
												</div>
											)}
										</td>
										<td>{ind + 1}</td>

										<td>{planTypes && planTypes.find((item) => item?.InsType_ID == itm.data?.InsType_ID)?.Name}</td>
										<td>{itm.data.Due_Date}</td>
										<td>{itm.data.Installment_Due}</td>
										<td>
											{itm.obj.length == 0 ? 0 : ""}

											{itm.obj.length == 1 ? getSumPaidAmt(itm) : ""}

											{itm.obj.length > 1 && (
												<Link
													// className="dropdown-item"
													data-bs-toggle="modal"
													data-bs-target="#edit_member"
													onClick={() => {
														setIsShowisShowDoubleObjectModal(true);
														setfilteredObjData(itm);
													}}
												>
													{getSumPaidAmt(itm)} (Multiple)
												</Link>
											)}
										</td>
										<td>
											{itm.obj.length > 0 ? itm.data.Installment_Due - getSumPaidAmt(itm) : itm.data.Installment_Due}
										</td>
										<td>{itm.obj.length > 0 ? "VCIRC-" + itm.obj[0].IRC_NO : ""}</td>
										<td>{itm.obj.length > 0 ? itm.obj[0].Payment_Mode?.Description : ""}</td>

										<td>
											{itm.obj.length > 0 && itm.obj[0].AdminVarified
												? "Verified"
												: itm.obj.length > 0
												? "Unverified"
												: ""}
										</td>
										<td>
											{itm.data.Status === true &&
												itm.data.InsType_ID &&
												itm.data.Installment_Due - getSumPaidAmt(itm) > 0 && (
													<Link to={"/app/administrator/create-transaction?bki_id=" + itm.data.BKI_DETAIL_ID}>
														<button className="btn add-btn button">Add Payment</button>
													</Link>
												)}
										</td>
									</tr>
								))}
							</table>
						</div>
					) : selectedOption === "development_charges" && developmentFiltered && developmentFiltered.length > 0 ? (
						<div className="modal-body">
							<b>Select Development Charges</b>
							<br />
							<br />
							<table className="table table-stripped">
								<tr>
									<th style={{ marginRight: "2px" }}>Action</th>
									<th>SR#</th>

									<th style={{ paddingLeft: "15px" }}>Type</th>
									<th>Due Date</th>
									<th>Amount</th>
									<th>Paid Amount</th>
									<th>Remaining Amount</th>
									<th>Receipt No</th>
									<th>Payment Mode</th>
									<th>Verification</th>
									<th style={{ paddingLeft: "40px" }}>Action</th>
								</tr>

								{developmentFiltered?.map((itm, ind) => (
									<tr>
										<td>
											{itm.obj.length > 0 && (
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
															// onClick={() =>  TransactionReciept(itm.obj[0].INS_RC_ID)}
															onClick={() => TransactionReciept(itm.obj[0].INS_RC_ID)}
														>
															<i className="fa fa-download m-r-5" /> Download PDF
														</Link>
													</div>
												</div>
											)}
										</td>
										<td>{ind + 1}</td>

										<td>{planTypes && planTypes.find((item) => item?.InsType_ID == itm.data?.InsType_ID)?.Name}</td>
										<td>{itm.data.Due_Date}</td>
										<td>{itm.data.Installment_Due}</td>
										<td>
											{itm.obj.length == 0 ? 0 : ""}

											{itm.obj.length == 1 ? getSumPaidAmt(itm) : ""}

											{itm.obj.length > 1 && (
												<Link
													// className="dropdown-item"
													data-bs-toggle="modal"
													data-bs-target="#edit_member"
													onClick={() => {
														setIsShowisShowDoubleObjectModal(true);
														setfilteredObjData(itm);
													}}
												>
													{getSumPaidAmt(itm)} (Multiple)
												</Link>
											)}
										</td>
										<td>
											{itm.obj.length > 0 ? itm.data.Installment_Due - getSumPaidAmt(itm) : itm.data.Installment_Due}
										</td>
										<td>{itm.obj.length > 0 ? "VCIRC-" + itm.obj[0].IRC_NO : ""}</td>
										<td>{itm.obj.length > 0 ? itm.obj[0].Payment_Mode?.Description : ""}</td>

										<td>
											{itm.obj.length > 0 && itm.obj[0].AdminVarified
												? "Verified"
												: itm.obj.length > 0
												? "Unverified"
												: ""}
										</td>
										<td>
											{itm.data.Status === true &&
												itm.data.InsType_ID &&
												itm.data.Installment_Due - getSumPaidAmt(itm) > 0 && (
													<Link to={"/app/administrator/create-transaction?bki_id=" + itm.data.BKI_DETAIL_ID}>
														<button className="btn add-btn button">Add Payment</button>
													</Link>
												)}
										</td>
									</tr>
								))}
							</table>
						</div>
					) : (
						!successAlert &&
						showAlert && (
							<div className="modal-body">
								<Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
									No Record Found
								</Alert>
							</div>
						)
					)}
				</div>
			</Modal>

			{/* create modal on double object */}

			<Modal show={isShowDoubleObjectModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Transaction</h5>
						<button type="button" className="close" onClick={() => setIsShowisShowDoubleObjectModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>

					{filteredObjData ? (
						<div className="modal-body">
							<b>Select Payment Plan</b>
							<br />
							<br />
							<table className="table table-stripped">
								<tr>
									<th style={{ marginRight: "2px" }}>Action</th>
									<th>SR#</th>

									<th style={{ paddingLeft: "15px" }}>Type</th>
									<th>Due Date</th>
									<th>Amount</th>
									<th>Paid Amount</th>
									<th>Remaining Amount</th>
									<th>Receipt No</th>
									<th>Payment Mode</th>
									<th>Verification</th>
									{/* <th style={{ paddingLeft: "40px" }}>Action</th> */}
								</tr>

								{filteredObjData.obj.length > 0 &&
									filteredObjData.obj?.map((itm, ind) => (
										<tr>
											<td>
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
															onClick={() => TransactionReciept(itm.INS_RC_ID)}
														>
															<i className="fa fa-download m-r-5" /> Download PDF
														</Link>
													</div>
												</div>
											</td>
											<td>{ind + 1}</td>

											<td>
												{planTypes &&
													planTypes.find((item) => item?.InsType_ID == filteredObjData.data?.InsType_ID)?.Name}
											</td>
											<td>{filteredObjData.data?.Due_Date}</td>
											<td>{itm.Installment_Due}</td>
											<td>{itm.Installment_Paid}</td>
											<td>{itm.Installment_Due - itm.Installment_Paid}</td>
											<td>{"VCIRC-" + itm.IRC_NO}</td>
											<td>{itm.Payment_Mode?.Description}</td>

											<td>{itm.AdminVarified ? "Verified" : "Unverified"}</td>

											{/* <td>
                      {filteredObjData.data?.Installment_Due - getSumPaidAmt(filteredObjData) > 0 && (
                        <Link
                          to={
                            "/app/administrator/create-transaction?bki_id=" +
                            filteredObjData.data?.BKI_DETAIL_ID
                          }
                        >
                          <button className="btn add-btn button">
                            Add Payment
                          </button>
                        </Link>
                      )}
                    </td> */}
										</tr>
									))}
							</table>
						</div>
					) : (
						!successAlert &&
						showAlert && (
							<div className="modal-body">
								<Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
									No Record Found
								</Alert>
							</div>
						)
					)}
				</div>
			</Modal>

			{/* create modal on double object */}

			{/* Search by CNIC */}

			<Modal show={isShowSearchModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Search By CNIC</h5>
						<button type="button" className="close" onClick={() => setIsShowSearchModal(false)}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						{/* {successAlert && (
              <div className="modal-body">
                <Alert
                  variant="success"
                  onClose={() => setSuccessAlert(false)}
                  dismissible
                >
                  Transaction submitted successfully.{" "}
                  <a
                    href="#"
                    style={{ textDecoration: "underline", color: "green" }}
                    onClick={FilePdf}
                  >
                    Click here
                  </a>{" "}
                  to download receipt.
                </Alert>
              </div>
            )} */}
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>CNIC</label>
									<input className="form-control" type="text" value={searchRegTerm} onChange={handleRegInputChange} />
								</div>
							</div>
							<div className="col-sm-3 my-auto">
								<div className="form-group mb-0">
									<button onClick={handleSearchButtonClick} className="btn btn-success btn-block w-100 p-2">
										Search
									</button>
								</div>
							</div>
						</div>
					</div>

					<Formik onSubmit={async (values, { setSubmitting }) => {}}>
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
									{SearchData.length > 0 && (
										<Table
											dataSource={SearchData}
											columns={columnsSearch}
											scroll={{ x: "overflowX" }}
											/* Other Table props */
										/>
									)}
								</form>
							);
						}}
					</Formik>
				</div>
			</Modal>

			{/* Search By CNIC */}

			{/* Delete Project Modal */}
			<div className="modal custom-modal fade" id="delete_member" role="dialog">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<div className="form-header">
								<h3>Delete Transaction</h3>
								<p>Are you sure want to delete?</p>
							</div>
							<div className="modal-btn delete-action">
								<div className="row">
									<div className="col-6">
										<button
											className="btn btn-primary w-100 continue-btn"
											data-bs-dismiss="modal"
											type="submit"
											onClick={() => deleteTransactionById(query)}
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
			{/* /Delete Project Modal */}
		</div>
	);
};
export default Transaction;
