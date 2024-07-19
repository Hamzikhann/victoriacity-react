import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { Table } from "antd";
import { Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import moment from "moment";
import { format, isValid } from "date-fns";
import Webcam from "react-webcam";
// import { Formik } from "formik";

// import { Formik } from "formik";
// import useNavigate from 'react-router-dom';

const PartnerNdcfee = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);
	const [isShowDoubleObjectModal, setIsShowisShowDoubleObjectModal] = useState(false);
	const [isShowMemberModal, setIsShowMemberModal] = useState(false);
	const [isShowEditMemberModal, setIsShowEditMemberModal] = useState(false);
	const [isShowAssignUserModal, setIsShowAssignUserModal] = useState(false);
	const [showMemberText, setShowMemberText] = useState("");
	const [isShowMemberNomineeModal, setIsShowMemberNomineeModal] = useState(false);
	const [isShowEditMemberNomineeModal, setIsShowEditMemberNomineeModal] = useState(false);

	const handleClearButtonSecondMember = (value) => {
		setSelectedSecondMember(null);
		setFieldValue("Sec_MEM_ID", "");
	};
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [totalPage, setTotalPage] = useState(1);
	const [successAlert, setSuccessAlert] = useState(false);
	const [query, setQuery] = useState("");
	const [transaction, setTransaction] = useState([]);
	const [bkRegCode, setBkRegCode] = useState();
	const [planTypes, setPlanTypes] = useState([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchRegTerm, setSearchRegTerm] = useState("");
	const [filteredRegData, setFilteredRegData] = useState(null);
	const [filteredObjData, setfilteredObjData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [loading, setloading] = useState(false);
	const [PDF, setPDF] = useState(null);
	const [nominee, setNominee] = useState([]);
	const webcamRef = useRef(null);
	const [imageSrc, setImageSrc] = useState("");
	const [imageSrc1, setImageSrc1] = useState("");
	const [imageSrc2, setImageSrc2] = useState("");
	const [userRole, setuserRole] = useState();
	const [user, setuser] = useState();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isConfirmationOpen1, setIsConfirmationOpen1] = useState(false);
	const [isConfirmationOpen2, setIsConfirmationOpen2] = useState(false);
	const [paymentPlan, setPaymentPlan] = useState([]);
	const [unitType, setUnitType] = useState([]);
	const [plotSize, setPlotSize] = useState([]);
	const [unitNatureType, setUnitNatureType] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [memberType, setMemberType] = useState(null);
	const [isMemberAdded, setIsMemberAdded] = useState(false);
	const [memberInitialValues, setMemberInitialValues] = useState({
		BuyerName: "",
		BuyerContact: "",
		BuyerSecondContact: "",
		Email: "",
		Relation: "",
		BuyerCNIC: "",
		FathersName: "",
		Image: "",
		DOB: "",
		BuyerAddress: "",
		PermanantAddress: "",
		Status: true,
		Mem_Reg_Code: "n/a",
		Rmarks: "n/a"
	});
	const [sMemberInitialValues, setSMemberInitialValues] = useState({
		BuyerName: "",
		BuyerContact: "",
		BuyerSecondContact: "",
		Email: "",
		Relation: "",
		BuyerCNIC: "",
		FathersName: "",
		Image: "",
		DOB: "",
		BuyerAddress: "",
		PermanantAddress: "",
		Status: true,
		Mem_Reg_Code: "n/a",
		Rmarks: "n/a"
	});
	const [nomineeInitialValues, setNomineeInitialValues] = useState({
		MEMBER_ID: "",
		NomineeName: "",
		NomineeCNIC: "",
		NomineeFatherName: "",
		NomineeRealtion: "",
		RelationToOwner: ""
	});

	const options1 = [
		{ value: "s/o or d/o", label: "s/o or d/o" },
		{ value: "w/o", label: "w/o" }
	];

	const options = [
		{ value: "s/o", label: "s/o " },
		{ value: "d/o", label: "d/o" },
		{ value: "w/o", label: "w/o" }
	];

	const handleClearButtonClick = (value) => {
		setSelectedMember(null);
		setFieldValue("MEMBER_ID", "");
	};

	const columns = [
		{
			title: "Serial#",
			dataIndex: "TRSR_ID",
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
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => a.id - b.id,
			render: (text, record, index) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>
							{text == 1 ? "Pending" : ""}
							{text == 2 ? "Depatched with Accounts" : ""}
							{text == 3 ? "Accounts Done" : ""}
							{text == 4 ? "Transfer Done" : ""}
							{text == 5 ? "Transfer Done & Verified" : ""}
						</span>
					</Space>
				);
			}
		},
		// {
		//   title: "BK ID",
		//   dataIndex: "BK_ID",
		//   sorter: (a, b) => a.NDC_ID.length - b.NDC_ID.length,
		// },
		{
			title: "NDC PAYEE NAME",
			dataIndex: "Booking",
			sorter: (a, b) => a?.PAYEE_NAME?.Name - b?.PAYEE_NAME?.Name,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{record?.VoucherSellerTaxId?.PAYEE_NAME}</span>
					</Space>
				);
			}
		},

		// record.VoucherBuyerTaxId.PAYEE_NAME
		{
			title: "BK Reg Code",
			dataIndex: "BK_Reg_Code",
			sorter: (a, b) => a.BK_Reg_Code - b.BK_Reg_Code
		},
		{
			title: "Display Reg Code",
			dataIndex: "Reg_Code_Disply",
			sorter: (a, b) => a.Reg_Code_Disply - b.Reg_Code_Disply
		},
		{
			title: "Date",
			dataIndex: "TRSR_DATE",
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
		{
			title: "Expiry Date",
			dataIndex: "Expire_Date",
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
		{
			title: "Tax Buyer PAYEE NAME",
			dataIndex: "Booking",
			sorter: (a, b) => a?.PAYEE_NAME?.Name - b?.PAYEE_NAME?.Name,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{record?.VoucherBuyerTaxId?.PAYEE_NAME}</span>
					</Space>
				);
			}
		},
		{
			title: "Tax Seller PAYEE NAME",
			dataIndex: "Booking",
			sorter: (a, b) => a?.PAYEE_NAME?.Name - b?.PAYEE_NAME?.Name,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{record?.VoucherSellerTaxId?.PAYEE_NAME}</span>
					</Space>
				);
			}
		},

		// {
		//   title: "VOUCHER ID",
		//   dataIndex: "VOUCHER_ID",
		//   sorter: (a, b) => a.VOUCHER_ID - b.VOUCHER_ID,
		// },
		{
			title: "Tax Buyer PAYEE CNIC",
			dataIndex: "VoucherBuyerTaxId",
			sorter: (a, b) => a?.Cnic - b?.Cnic,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.Cnic}</span>
					</Space>
				);
			}
		},
		{
			title: "Tax Buyer PAYEE Address",
			dataIndex: "VoucherBuyerTaxId",
			sorter: (a, b) => a?.Address - b?.Address,
			render: (text, record) => {
				return (
					<Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
						<span>{text?.Address}</span>
					</Space>
				);
			}
		},
		// {
		//   title: "BK Reg Code",
		//   dataIndex: "BK_Reg_Code",
		//   sorter: (a, b) => a.BK_Reg_Code.length - b.BK_Reg_Code.length,
		// },
		// {
		//   title: "DEBIT",
		//   dataIndex: "DEBIT",
		//   sorter: (a, b) => a.DEBIT.length - b.DEBIT.length,
		// },
		// {
		//   title: "CREDIT",
		//   dataIndex: "CREDIT",
		//   sorter: (a, b) => a.CREDIT.length - b.CREDIT.length,
		// },
		// {
		//   title: "COMPANY ID",
		//   dataIndex: "COMPANY_ID",
		//   sorter: (a, b) => a.COMPANY_ID.length - b.COMPANY_ID.length,
		// },
		// {
		//   title: "PR ID",
		//   dataIndex: "PR_ID",
		//   sorter: (a, b) => a.PR_ID.length - b.PR_ID.length,
		// },
		// {
		//   title: "FISCAL YEAR ID",
		//   dataIndex: "FISCAL_YEAR_ID",
		//   sorter: (a, b) => a.FISCAL_YEAR_ID.length - b.FISCAL_YEAR_ID.length,
		// },
		{
			title: "Description",
			dataIndex: "Descrip",
			sorter: (a, b) => a.Descrip.length - b.Descrip.length
		},

		// {
		//   title: "CHQUE DATE",
		//   dataIndex: "CHQUE_DATE",
		//   sorter: (a, b) => a.CHQUE_DATE.length - b.CHQUE_DATE.length,
		//   render: (text) => {
		//     if (text) {
		//       const formattedDate = moment(text).format("DD-MMM-YYYY");
		//       return formattedDate;
		//     } else {
		//       return "";
		//     }
		//   },
		// },
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
		// {
		//   title: "Payment Mode",
		//   dataIndex: "Payment_Mode",
		//   sorter: (a, b) => a.PMID.length - b.PMID.length,
		//   render: (text, record) => <div>{text?.Description}</div>,
		// },

		// {
		//   title: "Instrument No",
		//   dataIndex: "INSTRUMENT_NO",
		//   sorter: (a, b) => a.INSTRUMENT_NO.length - b.INSTRUMENT_NO.length,
		//   // render: (text, record) => (
		//   //     <div >
		//   //         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
		//   //     </div>
		//   // ),
		// },
		// {
		//   title: "CHEQUE NO",
		//   dataIndex: "CHEQUE_NO",
		//   sorter: (a, b) => a.CHEQUE_NO.length - b.CHEQUE_NO.length,
		// },
		// {
		//   title: "Is Deleted",
		//   dataIndex: "IsDeleted",
		//   sorter: (a, b) => a?.User?.IsDeleted.length - b?.User?.IsDeleted.length,
		//   // render: (text, record) => <div>{text?.name}</div>,
		// },
		{
			title: "Verified By",
			dataIndex: "User",
			sorter: (a, b) => a.USER_ID.length - b.USER_ID.length,
			render: (text, record) => <div>{text?.name || ""}</div>
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

	const getAllMembers = () => {
		Axios.get(baseApiUrl + "member/list")
			.then((res) => {
				res.data.member.map((item) => {
					setMemberList((prev) => [
						...prev,
						{
							label: `${item.BuyerName} (${item.BuyerCNIC})`,
							value: item.MEMBER_ID,
							id: item.MEMBER_ID,
							values: item
						}
					]);
				});
			})
			.catch((err) => console.log(err));
	};

	const getAllMembersbyId = (id) => {
		setMemberInitialValues({
			BuyerName: "",
			BuyerContact: "",
			BuyerSecondContact: "",
			Email: "",
			Relation: "",
			BuyerCNIC: "",
			FathersName: "",
			Image: "",
			DOB: "",
			BuyerAddress: "",
			PermanantAddress: "",
			Status: true,
			Mem_Reg_Code: "n/a",
			Rmarks: "n/a"
		});

		Axios.get(baseApiUrl + `/member/id/list?id=${id}`)
			.then((res) => {
				setMemberInitialValues({
					...res.data.Member,
					Relation: options.find((item) => item.value == res.data.Member.Relation)
				});

				// return res.data.Member
			})
			.catch((err) => console.log(err));
	};

	const getSecondMembersbyId = (id) => {
		setSMemberInitialValues({
			BuyerName: "",
			BuyerContact: "",
			BuyerSecondContact: "",
			Email: "",
			Relation: "",
			BuyerCNIC: "",
			FathersName: "",
			Image: "",
			DOB: "",
			BuyerAddress: "",
			PermanantAddress: "",
			Status: true,
			Mem_Reg_Code: "n/a",
			Rmarks: "n/a"
		});

		Axios.get(baseApiUrl + `/member/id/list?id=${id}`)
			.then((res) => {
				setSMemberInitialValues({
					...res.data.Member,
					Relation: options.find((item) => item.value == res.data.Member.Relation)
				});

				// return res.data.Member
			})
			.catch((err) => console.log(err));
	};

	const getAllUsers = () => {
		Axios.get(baseApiUrl + "/user/cashier")
			.then((res) => {
				res.data.user.map((item) => {
					setUserList((prev) => [
						...prev,
						{
							label: `${item?.name} ( ${item?.lastName} )`,
							value: item.id,
							id: item.id
						}
					]);
				});
			})
			.catch((err) => console.log(err));
	};

	const getAllNominee = (page) => {
		Axios.get(baseApiUrl + "nominee/list?page=" + page)
			.then((res) => {
				res.data.MemNominee.map((item) => {
					setNominee((prev) => [
						...prev,
						{
							label: `${item.NomineeName} (${item.NomineeCNIC})`,
							value: item.MN_ID,
							id: item.MN_ID,
							values: item
						}
					]);
				});
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAllNomineebyId = (id) => {
		setNomineeInitialValues({
			MEMBER_ID: "",
			NomineeName: "",
			NomineeCNIC: "",
			NomineeFatherName: "",
			NomineeRealtion: "",
			RelationToOwner: ""
		});
		Axios.get(baseApiUrl + `/nominee/id/list?id=${id}`)
			.then((res) => {
				setNomineeInitialValues({
					...res.data.MemNominee,
					NomineeRealtion: options1.find((item) => item.value == res.data?.MemNominee?.NomineeRealtion),
					MEMBER_ID: {
						value: res.data.MemNominee.Member.MEMBER_ID,
						label: `${res.data.MemNominee.Member.BuyerName} (${res.data.MemNominee.Member.BuyerCNIC})`
					}
				});
			})
			.catch((err) => console.log(err.response.data));
	};

	const getAllNDCRequests = (page) => {
		const user = JSON.parse(localStorage.getItem("user"));
		Axios.get(baseApiUrl + "ndc/requests/all?page=" + page).then((res) => {
			// if(user?.role === "Admin"){
			setTransaction(res.data.allRequests);
			// }else{
			//   const records = res.data.allRequests.filter((item)=> item.userId == user.id)
			//   setTransaction(records);
			// }
			setTotalPage(res.data.totalPage);
			setTotalRecords(res.data.totalRecords);
		});
		// .catch((err) => );
	};

	useEffect(() => {
		getAllNDCRequests(1);
		getAllMembers();
		getAllNominee(1);
		getAllUsers();
		const user = localStorage.getItem("user");
		// console.log("Use Effect", user);

		const user1 = JSON.parse(user);
		setuser(user1);
		setuserRole(user1?.roles);
	}, []);

	const [selectedId, setSelectedId] = useState(null);
	const [isShowModal, setIsShowModal] = useState(false);
	const [member, setMember] = useState([]);
	const [secondMember, setSecondMember] = useState([]);
	const [IsShowFileTransferModal, setIsShowFileTransferModal] = useState(false);

	const [selectedMember, setSelectedMember] = useState(null);
	const [selectedSecondMember, setSelectedSecondMember] = useState(null);
	const [showClearButton, setShowClearButton] = useState(false);
	const getAllMemberBySearch = (q) => {
		// console.log("fffffffffffff", q);

		if (q.length >= 3) {
			setMember([]);
			setSelectedMember(null);
			setShowClearButton(false);

			Axios.get(baseApiUrl + "member/list?search=" + q).then((res) => {
				// setMember([]);
				let newMembers = [];
				res.data.member.map((item) => {
					newMembers.push({
						label: `${item.BuyerName} (${item.BuyerCNIC})`,
						value: item.MEMBER_ID
					});
					// setMember((prev) => [
					//     ...prev,
					//     {label: item.BuyerName, value: item.MEMBER_ID},
					// ]);

					// setMemberAddress((prev) => [
					//   ...prev,
					//   { label: item?.Member_Adress?.memberAddress, value: item.Member_Adress },
					// ]);
				});

				setMember(newMembers);
			});
		} else {
			setMember([]);
		}
		// .catch((err) => console.log(err.response.data));
	};

	const getAllSecondMemberBySearch = (q) => {
		// console.log("fffffffffffff", q);

		if (q.length >= 3) {
			// setSelectedMember([]);
			setSelectedSecondMember(null);
			setShowClearButton(false);

			Axios.get(baseApiUrl + "member/list?search=" + q).then((res) => {
				// setMember([]);
				let newMembers = [];
				res.data.member.map((item) => {
					newMembers.push({
						label: `${item.BuyerName} (${item.BuyerCNIC})`,
						value: item.MEMBER_ID
					});
				});

				setSecondMember(newMembers);
			});
		} else {
			setSecondMember([]);
		}
		// .catch((err) => console.log(err.response.data));
	};

	const getMemberNominee = (q) => {
		setNominee([]);
		if (q.length >= 3) {
			Axios.get(baseApiUrl + "nominee/name/list?search=" + q).then((res) => {
				let newNominees = [];
				res.data.MemNominees.map((item) => {
					// setNominee((prev) => [
					//   ...prev,
					//   { label: item.NomineeName, value: item.MN_ID },
					// ]);
					newNominees.push({ label: item.NomineeName, value: item.MN_ID });
				});

				setNominee(newNominees);
			});
		}
		// .catch((err) => console.log(err.response.data));
	};

	const getMemberNomineeByMemId = (memId) => {
		setNominee([]);
		// if(q.length>= 3) {
		Axios.get(baseApiUrl + "nominees/memId/list?id=" + memId).then((res) => {
			let newNominees = [];
			res.data.map((item) => {
				// setNominee((prev) => [
				//   ...prev,
				//   { label: item.NomineeName, value: item.MN_ID },
				// ]);
				newNominees.push({
					label: `${item.NomineeName} (${item.NomineeCNIC})`,
					value: item.MN_ID
				});
			});

			setNominee(newNominees);
		});
		// }
		// .catch((err) => console.log(err.response.data));
	};

	const handleRegInputChange = (event) => {
		setSearchRegTerm(event.target.value);
	};

	const handleRegButtonClick = (searchRegTerm) => {
		if (searchRegTerm.trim() === "") {
			setFilteredData(null);
			setSuccessAlert(false);
			setShowAlert(false);
		} else {
			Axios.get(baseApiUrl + "file/getBookingByCode?code=" + searchRegTerm)
				.then((res) => {
					setSuccessAlert(false);
					setFilteredData(res.data.bkObj);
					setShowAlert(false);
					setSearchRegTerm(searchRegTerm);
				})
				.catch((err) => {
					// console.log(err.response.data.message);
					setFilteredData(null);
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

	const NdcRecipt = (BK_ID, trsr_id, receipt_Head) => {
		Axios.get(baseApiUrl + `transaction/file?BK_ID=${BK_ID}&RECEIPT_HEAD=${receipt_Head}&TRSR_ID=${trsr_id}`)
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));

		// setRedirectUrl(null);
	};

	const transferLetter = (TRSR_ID) => {
		Axios.get(baseApiUrl + `/booking/transferLetter?id=${TRSR_ID}`)
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));

		// setRedirectUrl(null);
	};

	const PaymentPlanPdf = (value) => {
		let pdfId = PDF;

		if (typeof value != "undefined" && typeof value != "object") {
			pdfId = value;
		}

		Axios.get(baseApiUrl + `booking/id/getPPFile?id=${pdfId}&transfer=true&receipt_head='ndc_fee'`)
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					// setRedirectUrl();
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));
	};

	const transferEventPdf = (value) => {
		let pdfId = PDF;

		if (typeof value != "undefined" && typeof value != "object") {
			pdfId = value;
		}

		Axios.get(baseApiUrl + `transferEvent/pdf?id=${pdfId}`)
			.then((res) => {
				// getAllBooking(1);
				if (res.data.status == 200) {
					// setRedirectUrl();
					window.open(res.data.file.url, "_blank");
				}
			})
			.catch((err) => console.log(err.response.data));
	};

	const handleTableChange = (pagination, filters, sorter) => {
		getAllNDCRequests(pagination.current);
	};
	const [IsShowImageOpenModal, setIsShowImageOpenModal] = useState(false);
	const [isWebcamOpen, setIsWebcamOpen] = useState(false);
	const [isWebcamOpen1, setIsWebcamOpen1] = useState(false);
	const [isWebcamOpen2, setIsWebcamOpen2] = useState(false);

	const capture = React.useCallback(async () => {
		const imagesSrc = webcamRef.current.getScreenshot();
		setImageSrc(imagesSrc);
		setIsConfirmationOpen(true);
	}, [webcamRef]);

	const capture1 = React.useCallback(async () => {
		const imagesSrc1 = webcamRef.current.getScreenshot();
		setImageSrc1(imagesSrc1);
		setIsConfirmationOpen1(true);
	}, [webcamRef]);

	const capture2 = React.useCallback(async () => {
		const imagesSrc2 = webcamRef.current.getScreenshot();
		setImageSrc2(imagesSrc2);
		setIsConfirmationOpen2(true);
	}, [webcamRef]);

	const confirmImage = () => {
		setIsConfirmationOpen(false);
		setIsConfirmationOpen1(false); // Close the confirmation modal
		setIsConfirmationOpen2(false);
		setIsShowImageOpenModal(false);

		toast.success("Image confirmed");
		// Here, you can set the imageSrc to your form or perform any other action.
	};

	const cancelCapture = () => {
		setImageSrc(""); // Clear the imageSrc
		setIsConfirmationOpen(false); // Close the confirmation modal
		setIsWebcamOpen(true); // Reopen the webcam
	};
	const cancelCapture1 = () => {
		setImageSrc1(""); // Clear the imageSrc
		setIsConfirmationOpen1(false); // Close the confirmation modal
		setIsWebcamOpen1(true); // Reopen the webcam
	};
	const cancelCapture2 = () => {
		setImageSrc2(""); // Clear the imageSrc
		setIsConfirmationOpen2(false); // Close the confirmation modal
		setIsWebcamOpen2(true); // Reopen the webcam
	};
	const handleInputFocus = () => {
		if (!isConfirmationOpen) {
			setIsWebcamOpen(true);
		} else {
			// Show a toast message when the camera icon is clicked after confirming
			toast.warning("Already clicked!");
		}
	};

	const handleInputFocus1 = () => {
		if (!isConfirmationOpen1) {
			setIsWebcamOpen1(true);
		} else {
			// Show a toast message when the camera icon is clicked after confirming
			toast.warning("Already clicked!");
		}
	};
	const handleInputFocus2 = () => {
		if (!isConfirmationOpen) {
			setIsWebcamOpen2(true);
		} else {
			// Show a toast message when the camera icon is clicked after confirming
			toast.warning("Already clicked!");
		}
	};

	// console.log("WWWWWWWWWWWWWWWWWWWWWWWWWW", userList);

	return (
		<div className="page-wrapper">
			{/* Show Modal */}
			<Modal show={isShowModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Dispatch To CSR</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={{
								TRSR_ID: selectedId,
								MEMBER_ID: memberList.find((item) => item.id == selectedId?.BUYER_MEMBER_ID),
								MN_ID: nominee.find((item) => item.id == selectedId?.BUYER_MEMBER_NOMINEE_ID),
								Sec_MEM_ID: memberList.find((item) => item.id == selectedId?.BUYER_SECOND_MEMBER_ID)
							}}
							validate={(values) => {
								const errors = {};
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member Name is required";
								}
								if (!values.MN_ID) {
									errors.MN_ID = "Member Nominee is required";
								}
								// console.log("Ffffffffff", errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									status: 3,
									memberId: values?.MEMBER_ID?.value,
									secondMemberId: values.Sec_MEM_ID?.value,
									nominee: values.MN_ID?.value
								};
								const res = await Axios.put(
									baseApiUrl + `ndc/update/status?id=${selectedId.TRSR_ID}`,
									formData,
									setloading(true)
								);
								if (res.data.status == 200) {
									getAllNDCRequests(1);
									setPage(1);
									toast.success("Updated Successfully");
									setIsShowModal(false);
									setloading(false);
								}
								// const formData = {
								//   Unit_ID: values.Unit_ID.value,
								// };
								// try {
								//   setloading(true);
								//   const res = await Axios.put(
								//     baseApiUrl + `booking/update/status?id=${query}`,
								//     formData
								//   );
								//   if (res.data.status == 200) {
								//     getAllBooking(1);
								//     setPage(page);
								//     toast.success(res.data.message);
								//     setIsShowUpdateStatusModal(false);
								//     setloading(false);
								//   }
								// } catch (err) {
								//   setloading(false);
								//   toast.error(err.response.data.message);
								//   // console.log(err.response.data);
								// }
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
														Member
														<span className="text-danger"> *</span>
													</label>
													<Select
														options={member}
														onInputChange={getAllMemberBySearch}
														// type="text"
														value={values.MEMBER_ID}
														// value={selectedMember}
														onChange={(value) => {
															// console.log('value',value)
															setMember([value]);
															setSelectedMember(value);
															setFieldValue("MEMBER_ID", value);
															getMemberNomineeByMemId(value.value);
														}}
													/>

													{/* {console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGG", values.Booking?.Member?.BuyerName, member)} */}
													<span className="error">{errors.status && touched.status && errors.status}</span>
												</div>

												<div className="form-group">
													<label>
														Member Nominee
														<span className="text-danger"> *</span>
													</label>

													<Select
														options={nominee}
														// onInputChange={getMemberNominee}
														type="text"
														value={values.MN_ID}
														onChange={(value) => {
															setNominee([value]);
															setFieldValue("MN_ID", value);
														}}
													/>
													<span className="error">{errors.MN_ID && touched.MN_ID && errors.MN_ID}</span>
												</div>

												<div className="form-group">
													<div className="justify-content-between d-flex">
														<label>Select Second Member {/* <span className="text-danger">*</span> */}</label>
														<div>
															<a onClick={handleClearButtonSecondMember} style={{ color: "blue", fontSize: "12px" }}>
																Clear
															</a>
														</div>
													</div>
													<Select
														options={secondMember}
														onInputChange={getAllSecondMemberBySearch}
														// type="text"
														value={values.Sec_MEM_ID}
														// value={selectedSecondMember}
														onChange={(value) => {
															setSecondMember([value]);
															setSelectedSecondMember(value);
															setFieldValue("Sec_MEM_ID", value);
															// getMemberNomineeByMemId(value.value);
														}}
													/>
													<span className="error">{errors.Sec_MEM_ID && touched.Sec_MEM_ID && errors.Sec_MEM_ID}</span>
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

			{/* Create File Transfer Modal */}

			<Modal show={IsShowFileTransferModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Create File Transfer</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowFileTransferModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					{/* <div className="modal-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>REG No</label>
                  <input
                    className="form-control"
                    type="text"
                    value={searchRegTerm}
                    onChange={handleRegInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-3 my-auto">
                <div className="form-group mb-0">
                  <button
                    onClick={handleRegButtonClick}
                    className="btn btn-success btn-block w-100 p-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div> */}
					{/* {console.log("RRRRRRRRRRRRRRRRRRRRRRRR", filteredData)} */}
					{filteredData && filteredData.length != 0 ? (
						<div className="modal-body">
							<Formik
								enableReinitialize={true}
								initialValues={{
									SellerImage: "",
									CombineImage: "",
									BuyerImage: "",
									Booking_Temp: {},
									SRForm_No: "",
									Form_Code: "",
									BKType_ID: "1",
									Total_Amt: "",
									Advance_Amt: "",
									Rebate_Amt: "",
									TotalRemainNet_Amt: "",
									Ballot_Amt: "",
									Possession_Amt: "",
									ByAnnual_Charges: "",
									ByAnnual_TimePeriod: "",
									InstallmentAmount: "",
									No_Of_Installments: "",
									Plan_Years: "",
									USER_ID: "",
									BuyerName: memberInitialValues.BuyerName,
									BuyerContact: memberInitialValues.BuyerContact,
									BuyerCNIC: memberInitialValues.BuyerCNIC,
									BuyerAddress: memberInitialValues.BuyerAddress,
									NomineeName: nomineeInitialValues.NomineeName,
									NomineeCNIC: nomineeInitialValues.NomineeCNIC,
									RelationToOwner: nomineeInitialValues.RelationToOwner,
									SBuyerName: sMemberInitialValues.BuyerName,
									SBuyerContact: sMemberInitialValues.BuyerContact,
									SBuyerCNIC: sMemberInitialValues.BuyerCNIC,
									SBuyerAddress: sMemberInitialValues.BuyerAddress,
									Reg_Code_Disply: filteredData.maxRegCode,
									BK_Date: format(new Date(), "yyyy-MM-dd"),
									BK_ID: filteredData.BK_ID,
									...filteredData,
									MEMBER_ID: filteredData?.Member
										? {
												value: filteredData.Member.MEMBER_ID,
												label: filteredData.Member.BuyerName
										  }
										: "",
									MN_ID: filteredData?.MemNominee
										? {
												value: filteredData.MemNominee.MN_ID,
												label: filteredData.MemNominee.NomineeName
										  }
										: "",
									Sec_MEM_ID: "",
									UType_ID: filteredData?.UnitType
										? {
												label: filteredData?.UnitType.Name,
												value: filteredData?.UnitType.UType_ID
										  }
										: "",
									PS_ID: filteredData?.PlotSize
										? {
												label: filteredData?.PlotSize.Name,
												value: filteredData?.PlotSize.PS_ID
										  }
										: "",
									PP_ID: filteredData?.PaymentPlan
										? {
												label: filteredData?.PaymentPlan.Name,
												value: filteredData?.PaymentPlan.PP_ID
										  }
										: "",
									NType_ID: filteredData?.UnitNature
										? {
												label: filteredData?.UnitNature.Name,
												value: filteredData?.UnitNature.NType_ID
										  }
										: ""

									// PHASE_ID: filteredData?.PHS_ID,
									// SECTOR_ID: filteredData?.SECT_ID,
								}}
								validate={(values) => {
									const errors = {};
									// console.log("FFFFFFFFFFFFFFFFFFFFFF", imageSrc);
									if (!imageSrc) {
										errors.SellerImage = " Seller Image is required";
									}
									if (!imageSrc1) {
										errors.BuyerImage = " Buyer Image is required";
									}
									if (!imageSrc2) {
										errors.CombineImage = " Seller and Buyer Image is required";
									}

									console.log("errors", errors);
									return errors;
								}}
								onSubmit={async (values, { setSubmitting, setErrors }) => {
									const myFormData = new FormData();
									// values.Booking_Temp = {
									//   img1: imageSrc,
									//   img2: imageSrc1,
									//   img3: imageSrc2,
									//   mn_id: values.MN_ID.value,
									//   member_id: values.MEMBER_ID.value,
									//   sec_mem_id: values.Sec_MEM_ID.value,
									// };

									myFormData.append("Seller_Image", imageSrc);
									myFormData.append("Buyer_Image", imageSrc1);
									myFormData.append("Combine_Image", imageSrc2);
									myFormData.append("BK_ID", values.BK_ID);
									myFormData.append("BUYER_MEMBER_ID", selectedId.BUYER_MEMBER_ID);
									myFormData.append("BUYER_MEMBER_NOMINEE_ID", selectedId.BUYER_MEMBER_NOMINEE_ID);
									// myFormData.append("BK_Date", values.BK_Date);
									myFormData.append("Booking_Temp", searchRegTerm);
									myFormData.append("Unit_Temp", JSON.stringify(values.Unit_Temp));
									// myFormData.append("SRForm_No", values.SRForm_No);
									myFormData.append("MEMBER_ID", values.MEMBER_ID.value);
									myFormData.append("MN_ID", values.MN_ID.value);
									// myFormData.append("UType_ID", values.UType_ID.value);
									// myFormData.append("PS_ID", values.PS_ID.value);
									// myFormData.append("PP_ID", values.PP_ID.value);
									// myFormData.append("BKType_ID", values.BKType_ID);
									// myFormData.append("Total_Amt", values.Total_Amt);
									// myFormData.append("Advance_Amt", values.Advance_Amt);
									// myFormData.append("Rebate_Amt", values.Rebate_Amt);
									// myFormData.append(
									//   "TotalRemainNet_Amt",
									//   values.TotalRemainNet_Amt
									// );
									// myFormData.append("Ballot_Amt", values.Ballot_Amt);
									// myFormData.append("Possession_Amt", values.Possession_Amt);
									// myFormData.append(
									//   "ByAnnual_Charges",
									//   values.ByAnnual_Charges
									// );
									// myFormData.append(
									//   "No_Of_Installments",
									//   values.No_Of_Installments
									// );
									// myFormData.append(
									//   "ByAnnual_TimePeriod",
									//   values.ByAnnual_TimePeriod
									// );
									// myFormData.append(
									//   "InstallmentAmount",
									//   values.InstallmentAmount
									// );
									// myFormData.append("Plan_Years", values.Plan_Years);
									myFormData.append("USER_ID", values.USER_ID);
									// myFormData.append("Reg_Code_Disply", values.Reg_Code_Disply);
									myFormData.append("Secondary_Member_ID", selectedId.Sec_MEM_ID);

									myFormData.append("TRSR_ID", selectedId.TRSR_ID);
									// myFormData.append("NType_ID", values.NType_ID.value);
									// myFormData.append("NType_ID", values.NType_ID.value);
									// myFormData.append('PHASE_ID', values.PHASE_ID)
									// myFormData.append('SECTOR_ID', values.SECTOR_ID)

									// const formData = {
									//   // OwnerImage: imageSrc,
									//   // ClientImage: imageSrc1,
									//   // BuyerImage: imageSrc2,
									//   BK_Date: values.BK_Date,
									//   SRForm_No: values.SRForm_No,
									//   Form_Code: values.Form_Code,
									//   MEMBER_ID: values.MEMBER_ID.value,
									//   MN_ID: values.MN_ID.value,
									//   UType_ID: values.UType_ID.value,
									//   PS_ID: values.PS_ID.value,
									//   PP_ID: values.PP_ID.value,
									//   BKType_ID: values.BKType_ID,
									//   Total_Amt: values.Total_Amt,
									//   Advance_Amt: values.Advance_Amt,
									//   Rebate_Amt: values.Rebate_Amt,
									//   TotalRemainNet_Amt: values.TotalRemainNet_Amt,
									//   Ballot_Amt: values.Ballot_Amt,
									//   Possession_Amt: values.Possession_Amt,
									//   ByAnnual_Charges: values.ByAnnual_Charges,
									//   ByAnnual_TimePeriod: values.ByAnnual_TimePeriod,
									//   InstallmentAmount: values.InstallmentAmount,
									//   No_Of_Installments: values.No_Of_Installments,
									//   Plan_Years: values.Plan_Years,
									//   USER_ID: values.USER_ID,
									//   Reg_Code_Disply: values.Reg_Code_Disply,
									//   Sec_MEM_ID: values.Sec_MEM_ID.value,
									//   NType_ID: values.NType_ID.value,
									//   PHASE_ID: values.PHASE_ID,
									//   SECTOR_ID: values.SECTOR_ID,
									// };
									const header = {
										headers: {
											"Content-Type": "multipart/form-data"
										}
									};
									try {
										setloading(true);
										const res = await Axios.post(
											baseApiUrl + "fileTransfer/add",
											// formData,
											myFormData,
											header
										);
										if (res.data.status == 200) {
											getAllNDCRequests(1);
											toast.success(res.data.message);
											setloading(false);
											setImageSrc("");
											setImageSrc1("");
											setImageSrc2("");
											setIsShowFileTransferModal(false);
										}
										// else {
										//     toast.success(res.data.message);
										// }
									} catch (err) {
										setImageSrc("");
										setImageSrc1("");
										setImageSrc2("");
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
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Owner Name <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.BuyerName}
															isDisabled={true}
															placeholder="Owner Name"
															onChange={(e) => {
																setFieldValue("BuyerName", e.target.value);
															}}
														/>
														<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Owner Contact <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.BuyerContact}
															isDisabled={true}
															placeholder="Owner Contact"
															onChange={(e) => {
																setFieldValue("BuyerContact", e.target.value);
															}}
														/>
														<span className="error">
															{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Owner CNIC <span className="text-danger">*</span>
														</label>
														<InputMask
															className="form-control"
															mask="99999-9999999-9"
															maskChar=" "
															value={values.BuyerCNIC}
															isDisabled={true}
															placeholder="Owner CNIC"
															onChange={(e) => {
																setFieldValue("BuyerCNIC", e.target.value);
															}}
														/>
														<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Mailing Address <span className="text-danger">*</span>
														</label>
														<textarea
															className="form-control"
															id="exampleFormControlTextarea1"
															rows="4"
															value={values.BuyerAddress}
															isDisabled={true}
															placeholder="Mailing Address"
															onChange={(e) => {
																setFieldValue("BuyerAddress", e.target.value);
															}}
														></textarea>
														<span className="error">
															{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
														</span>
													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Nominee Name <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.NomineeName}
															isDisabled={true}
															placeholder="Nominee Name"
															onChange={(e) => {
																setFieldValue("NomineeName", e.target.value);
															}}
														/>
														<span className="error">
															{errors.NomineeName && touched.NomineeName && errors.NomineeName}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Nominee CNIC <span className="text-danger">*</span>
														</label>
														<InputMask
															className="form-control"
															mask="99999-9999999-9"
															maskChar=" "
															value={values.NomineeCNIC}
															isDisabled={true}
															placeholder="Nominee CNIC"
															onChange={(e) => {
																setFieldValue("NomineeCNIC", e.target.value);
															}}
														/>
														<span className="error">
															{errors.NomineeCNIC && touched.NomineeCNIC && errors.NomineeCNIC}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>
															Relation To Owner <span className="text-danger">*</span>
														</label>
														<input
															className="form-control"
															type="text"
															value={values.RelationToOwner}
															isDisabled={true}
															placeholder="Realtion To Owner"
															onChange={(e) => {
																setFieldValue("RelationToOwner", e.target.value);
															}}
														/>
														<span className="error">
															{errors.RelationToOwner && touched.RelationToOwner && errors.RelationToOwner}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Second Owner Name {/* <span className="text-danger">*</span> */}</label>
														<input
															className="form-control"
															type="text"
															value={values.SBuyerName}
															isDisabled={true}
															placeholder="Owner Name"
															onChange={(e) => {
																setFieldValue("SBuyerName", e.target.value);
															}}
														/>
														<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-group">
														<label>Second Owner Contact {/* <span className="text-danger">*</span> */}</label>
														<input
															className="form-control"
															type="text"
															value={values.SBuyerContact}
															isDisabled={true}
															placeholder="Owner Contact"
															onChange={(e) => {
																setFieldValue("SBuyerContact", e.target.value);
															}}
														/>
														<span className="error">
															{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Second Owner CNIC {/* <span className="text-danger">*</span> */}</label>
														<InputMask
															className="form-control"
															mask="99999-9999999-9"
															maskChar=" "
															value={values.SBuyerCNIC}
															isDisabled={true}
															placeholder="Owner CNIC"
															onChange={(e) => {
																setFieldValue("SBuyerCNIC", e.target.value);
															}}
														/>
														<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Second Owner Mailing Address {/* <span className="text-danger">*</span> */}</label>
														<textarea
															className="form-control"
															id="exampleFormControlTextarea1"
															rows="4"
															value={values.SBuyerAddress}
															isDisabled={true}
															placeholder="Mailing Address"
															onChange={(e) => {
																setFieldValue("SBuyerAddress", e.target.value);
															}}
														></textarea>
														<span className="error">
															{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Booking Reg No</label>
														<input
															className="form-control"
															type="text"
															value={values.Reg_Code_Disply}
															disabled={true}
														/>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Booking Date {/* {values.BK_Date}*/}</label>
														<input className="form-control" type="date" value={values.BK_Date} disabled={true} />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Serial Form No</label>
														<input className="form-control" type="text" value={values.SRForm_No} disabled={true} />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Form Code</label>
														<input className="form-control" type="text" value={values.Form_Code} disabled={true} />
													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-group">
														<label>Unit Type</label>
														<Select options={unitType} type="text" value={values.UType_ID} isDisabled={true} />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Plot Size</label>
														<Select options={plotSize} value={values.PS_ID} isDisabled={true} />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Payment Plan</label>
														<Select options={paymentPlan} value={values.PP_ID} isDisabled={true} />
													</div>
												</div>
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Total Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.Total_Amt}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Advance Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.Advance_Amt}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>TotalRemainNet Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.TotalRemainNet_Amt}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Ballot Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.Ballot_Amt}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Possession Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.Possession_Amt}
                              disabled={true}
                            />
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Annual Charges</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.ByAnnual_Charges}
                              disabled={true}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Installment Amount</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.InstallmentAmount}
                              disabled={true}
                            />
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>No Of Installments</label>
                            <input
                              className="form-control"
                              type="Text"
                              value={values.No_Of_Installments}
                              disabled={true}
                            />
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Plan Years</label>
                            <input
                              // placeholder="Plan_Years"
                              className="form-control"
                              type="Text"
                              value={values.Plan_Years}
                              disabled={true}
                            />
                          </div>
                        </div> */}

												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Unit Nature Type</label>
                            <Select
                              options={unitNatureType}
                              value={values.NType_ID}
                              isDisabled={true}
                            />
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group ">
                            <div className="justify-content-between d-flex">
                              <label>
                                Select Member{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div>
                                <a
                                  onClick={handleClearButtonClick}
                                  style={{ color: "blue", fontSize: "12px" }}
                                >
                                  Clear
                                </a>
                              </div>
                            </div>

                            <Select

                              options={member}
                              onInputChange={getAllMemberBySearch}
                              // type="text"
                              value={values.MEMBER_ID}
                              onChange={(value) => {

                                setMember([value]);
                                setSelectedMember(value);
                                setFieldValue("MEMBER_ID", value);
                                getMemberNomineeByMemId(value.value);
                              }}
                            />

                            <span className="error">
                              {errors.MEMBER_ID &&
                                touched.MEMBER_ID &&
                                errors.MEMBER_ID}
                            </span>
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>
                              Member Nominee{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select

                              options={nominee}

                              value={values.MN_ID}
                              type="text"
                              onChange={(value) => {
                                setNominee([value]);
                                setFieldValue("MN_ID", value);
                              }}
                            />
                            <span className="error">
                              {errors.MN_ID && touched.MN_ID && errors.MN_ID}
                            </span>
                          </div>
                        </div> */}
												{/* <div className="col-sm-6">
                          <div className="form-group">
                            <div className="justify-content-between d-flex">
                              <label>
                                Select Second Member{" "}

                              </label>
                              <div>
                                <a
                                  onClick={handleClearButtonSecondMember}
                                  style={{ color: "blue", fontSize: "12px" }}
                                >
                                  Clear
                                </a>
                              </div>
                            </div>
                            <Select
                              options={secondMember}
                              onInputChange={getAllSecondMemberBySearch}
                              // type="text"
                              value={values.Sec_MEM_ID}
                              onChange={(value) => {
                                setSecondMember([value]);
                                setSelectedSecondMember(value);
                                setFieldValue("Sec_MEM_ID", value);
                                // getMemberNomineeByMemId(value.value);
                              }}
                            />
                          </div>
                        </div> */}
												<div className="col-sm-6">
													<div className="form-group">
														<label>Seller Image</label>
														<br></br>

														{/* <input
                            className="form-control"
                            type="text"
                            placeholder="Select Owner Image"
                            // value={values.Reg_Code_Disply}
                            // onFocus={handleInputFocus} // Open webcam when input is focused
                            onChange={(e) => {
                              setFieldValue("imageSrc",e.target.value)
                            }}
                          /> */}
														{/* <span
                            className="input-group-addon"
                            onClick={() => {
                              handleInputFocus();
                              setIsShowImageOpenModal(true);
                            }}
                          >
                            <i className="fa fa-camera" ></i>
                            <span>
                                {' '}Preview:{" "}
                              {imageSrc && (
                                <img
                                  src={imageSrc}
                                  alt="Captured Image"
                                  style={{ height: "50px", width:"50px" }}
                                />
                              )}
                            </span>

                          </span> */}

														<span className="input-group-addon">
															{imageSrc ? (
																// If imageSrc is not empty, show the preview
																<span>
																	{/* <i className="fa fa-camera"></i> */}
																	<span>
																		{" "}
																		{/* Preview:{" "} */}
																		{imageSrc && (
																			<img
																				src={imageSrc}
																				alt="Captured Image"
																				style={{
																					height: "60px",
																					width: "70px",
																					borderRadius: "45px"
																				}}
																			/>
																		)}
																	</span>
																</span>
															) : (
																// If imageSrc is empty and not confirmed, show the camera icon
																!isConfirmationOpen && (
																	<i
																		className="fa fa-camera"
																		onClick={() => {
																			handleInputFocus();
																			setIsShowImageOpenModal(true);
																		}}
																	></i>
																)
															)}
														</span>
														<br></br>

														<span className="error">
															{errors.SellerImage && touched.SellerImage && errors.SellerImage}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Buyer Image</label>
														<br></br>
														{/* <input
                            className="form-control"
                            type="text"
                            placeholder="Select Owner Image"
                            // value={values.Reg_Code_Disply}
                            // onFocus={handleInputFocus} // Open webcam when input is focused
                            onChange={(e) => {
                              setFieldValue("imageSrc1",e.target.value)
                            }}
                          /> */}
														{/* <span
                            className="input-group-addon"
                            onClick={() => {
                              handleInputFocus1();
                              setIsShowImageOpenModal(true);
                            }}
                          >
                            <i className="fa fa-camera"></i>
                            <span>
                              {" "}
                              Preview:{" "}
                              {imageSrc1 && (
                                <img
                                  src={imageSrc1}
                                  alt="Captured Image"
                                  style={{ height: "50px", width: "50px" }}
                                />
                              )}
                            </span>

                          </span> */}
														<span className="input-group-addon">
															{imageSrc1 ? (
																// If imageSrc is not empty, show the preview
																<span>
																	{/* <i className="fa fa-camera"></i> */}
																	<span>
																		{" "}
																		{/* Preview:{" "} */}
																		{imageSrc1 && (
																			<img
																				src={imageSrc1}
																				alt="Captured Image"
																				style={{
																					height: "60px",
																					width: "70px",
																					borderRadius: "45px"
																				}}
																			/>
																		)}
																	</span>
																</span>
															) : (
																// If imageSrc is empty and not confirmed, show the camera icon
																!isConfirmationOpen && (
																	<i
																		className="fa fa-camera"
																		onClick={() => {
																			handleInputFocus1();
																			setIsShowImageOpenModal(true);
																		}}
																	></i>
																)
															)}
														</span>
														<br></br>

														<span className="error">
															{errors.BuyerImage && touched.BuyerImage && errors.BuyerImage}
														</span>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Seller and Buyer Image</label>
														<br></br>
														{/* <input
                            className="form-control"
                            type="text"
                            placeholder="Select Owner Image"
                            // value={values.Reg_Code_Disply}
                            // onFocus={handleInputFocus} // Open webcam when input is focused
                            onChange={(e) => {
                              setFieldValue("imageSrc2",e.target.value)
                            }}
                          /> */}
														{/* <span
                            className="input-group-addon"
                            onClick={() => {
                              handleInputFocus2();
                              setIsShowImageOpenModal(true);
                            }}
                          >
                            <i className="fa fa-camera"></i>
                            <span>
                              {" "}
                              Preview:{" "}
                              {imageSrc2 && (
                                <img
                                  src={imageSrc2}
                                  alt="Captured Image"
                                  style={{ height: "50px", width: "50px" }}
                                />
                              )}
                            </span>

                          </span> */}
														<span className="input-group-addon">
															{imageSrc2 ? (
																// If imageSrc is not empty, show the preview
																<span>
																	{/* <i className="fa fa-camera"></i> */}
																	<span>
																		{" "}
																		{/* Preview:{" "} */}
																		{imageSrc2 && (
																			<img
																				src={imageSrc2}
																				alt="Captured Image"
																				style={{
																					height: "60px",
																					width: "70px",
																					borderRadius: "45px"
																				}}
																			/>
																		)}
																	</span>
																</span>
															) : (
																// If imageSrc is empty and not confirmed, show the camera icon
																!isConfirmationOpen && (
																	<i
																		className="fa fa-camera"
																		onClick={() => {
																			handleInputFocus2();
																			setIsShowImageOpenModal(true);
																		}}
																	></i>
																)
															)}
														</span>
														<br></br>

														<span className="error">
															{errors.CombineImage && touched.CombineImage && errors.CombineImage}
														</span>
													</div>
												</div>

												<div className="submit-section">
													{loading ? (
														<button type="submit" disabled={true} className="btn btn-primary submit-btn">
															<div className="spinner-border text-warning" role="IsActive">
																<span className="sr-only">Loading...</span>
															</div>
														</button>
													) : (
														<button type="submit" className="btn btn-primary submit-btn" onClick={handleSubmit}>
															Submit
														</button>
													)}
												</div>
											</div>
										</form>
									);
								}}
							</Formik>
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
			{/* /Create File Transfer Modal */}

			{/* Image Modal */}
			<Modal show={IsShowImageOpenModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Click Image</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowImageOpenModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<Formik initialValues={{}}>
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
											{isWebcamOpen && imageSrc === "" && (
												<div className="form-group">
													<Webcam
														audio={false}
														height={400}
														ref={webcamRef}
														width={500}
														screenshotFormat="image/png"
														style={{ marginLeft: "200px" }}
													/>
													<div style={{ marginLeft: "200px" }}>
														<button onClick={capture} className="btn btn-primary">
															Click
														</button>
													</div>
												</div>
											)}
											{isConfirmationOpen && (
												<div className="form-group">
													{imageSrc && <img src={imageSrc} alt="Captured Image" style={{ marginLeft: "200px" }} />}

													<div className="flex my-5 " style={{ marginLeft: "180px" }}>
														<button onClick={confirmImage} className="btn btn-primary" style={{ marginLeft: "20px" }}>
															Confirm
														</button>
														<button
															onClick={cancelCapture}
															className="btn btn-secondary"
															style={{ marginLeft: "20px" }}
														>
															Cancel
														</button>
													</div>
												</div>
											)}
										</div>
										{isWebcamOpen1 && imageSrc1 === "" && (
											<div className="form-group">
												<Webcam
													audio={false}
													height={400}
													ref={webcamRef}
													width={500}
													screenshotFormat="image/png"
													style={{ marginLeft: "200px" }}
												/>
												<div style={{ marginLeft: "200px" }}>
													<button onClick={capture1} className="btn btn-primary">
														Click
													</button>
												</div>
											</div>
										)}

										{isConfirmationOpen1 && (
											<div className="form-group">
												<img src={imageSrc1} alt="Captured Image" style={{ marginLeft: "200px" }} />
												<div className="flex my-5 " style={{ marginLeft: "180px" }}>
													<button onClick={confirmImage} className="btn btn-primary" style={{ marginLeft: "20px" }}>
														Confirm
													</button>
													<button onClick={cancelCapture1} className="btn btn-secondary" style={{ marginLeft: "20px" }}>
														Cancel
													</button>
												</div>
											</div>
										)}
										{isWebcamOpen2 && imageSrc2 === "" && (
											<div className="form-group">
												<Webcam
													audio={false}
													height={400}
													ref={webcamRef}
													width={500}
													screenshotFormat="image/png"
													style={{ marginLeft: "200px" }}
												/>
												<div style={{ marginLeft: "200px" }}>
													<button onClick={capture2} className="btn btn-primary">
														Click
													</button>
												</div>
											</div>
										)}
										{isConfirmationOpen2 && (
											<div className="form-group">
												<img src={imageSrc2} alt="Captured Image" style={{ marginLeft: "200px" }} />
												<div className="flex my-5 " style={{ marginLeft: "180px" }}>
													<button onClick={confirmImage} className="btn btn-primary" style={{ marginLeft: "20px" }}>
														Confirm
													</button>
													<button onClick={cancelCapture2} className="btn btn-secondary" style={{ marginLeft: "20px" }}>
														Cancel
													</button>
												</div>
											</div>
										)}
									</div>
								</form>
							);
						}}
					</Formik>
				</div>
			</Modal>
			{/* Image Modal */}

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
							<h3 className="page-title">Transfer NDC / Requests</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">NDC / Transfer Requests</li>
							</ul>
						</div>
						{/* <div className="col-auto float-end ml-auto">
              <Link
                to="/app/administrator/create-transaction"
                className="btn add-btn button"
              >
                <i className="fa fa-plus" /> Create NDC Fee
              </Link>
              <Link
              to="/app/administrator/create-transaction"
              style={{ marginRight: 20 }}
              className="btn add-btn button"
              // onClick={() => setIsShowProjectModal(true)}
            >
              <i className="fa fa-plus" /> Create Bulk Transaction
            </Link>
            </div> */}
					</div>
				</div>
				{/* /Page Header */}

				{/* Search Filter */}

				{/* <div className="row">
        <div className="col-sm-3">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => {
                setBkRegCode(e.target.value);
                getAllTransactionbyBkReg(e.target.value);
              }}
              placeholder="Search By Reg Code Display"
            />
          </div>
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
				{/* </div> */}

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
									// total: transaction?.length,
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
								//   dataSource={transaction}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}

			{/* {Assign To User} */}
			<Modal show={isShowAssignUserModal}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Assign To User</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowAssignUserModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={{
								USER_ID: ""
							}}
							// validate={(values) => {
							//   const errors = {};
							//   // if (!values.MEMBER_ID) {
							//   //     errors.MEMBER_ID = "Member Name is required";
							//   // }
							//   // if (!values.MN_ID) {
							//   //     errors.MN_ID = "Member Nominee is required";
							//   // }
							//   // console.log("Ffffffffff",errors)
							//   return errors;
							// }}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									userId: values.USER_ID,
									TRSR_ID: selectedId?.TRSR_ID
								};
								// console.log("EEEEEEEEEEEEEEEEEEEEEEE",selectedId?.VOUCHER_ID)
								const res = await Axios.put(baseApiUrl + `/booking/updateUser`, formData, setloading(true));
								// console.log("TTTTTTTTTTTTTTTTTTTTTT",selectedId?.VOUCHER_ID)
								if (res.data.status == 200) {
									getAllNDCRequests(1);
									getAllUsers();
									setPage(1);
									toast.success("Updated Successfully");
									setIsShowAssignUserModal(false);
									setloading(false);
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
														Users
														{/* <span className="text-danger"> *</span> */}
													</label>
													<Select
														options={userList}
														// onInputChange={getAllMemberBySearch}
														// type="text"
														// value={values.MEMBER_ID}
														// value={selectedMember}
														onChange={(value) => {
															{
																// console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR", value);
															}
															setFieldValue("USER_ID", value.value);
														}}
													/>
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
													Assign
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

			{/* {Assign To User} */}

			{/* Create Member Modal */}
			<Modal show={isShowMemberModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{showMemberText}</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowMemberModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							initialValues={memberInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.BuyerName) {
									errors.BuyerName = "Owner name is required";
								}
								if (!values.BuyerContact) {
									errors.BuyerContact = "Owner Contact No is required";
								}
								if (!values.FathersName) {
									errors.FathersName = "Father Name is required";
								}
								if (!values.BuyerCNIC) {
									errors.BuyerCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.BuyerCNIC)) {
									errors.BuyerCNIC = "Invalid CNIC number";
								}
								if (!values.DOB) {
									errors.DOB = "Date of Birth is required";
								}

								if (!values.Relation) {
									errors.Relation = "Relation is required";
								}

								if (!values.BuyerAddress) {
									errors.BuyerAddress = "Mailing Address is required";
								}
								if (!values.PermanantAddress) {
									errors.PermanantAddress = "Permanent Address is required";
								}

								console.log(errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									TRSR_ID: selectedId,
									BuyerName: values.BuyerName,
									BuyerContact: values.BuyerContact,
									BuyerSecondContact: values.BuyerSecondContact,
									Relation: values.Relation.value,
									BuyerCNIC: values.BuyerCNIC,
									FathersName: values.FathersName,
									Image: values.Image,
									DOB: values.DOB,
									Email: values.Email,
									BuyerAddress: values.BuyerAddress,
									PermanantAddress: values.PermanantAddress,
									Rmarks: values.Rmarks,
									IsActive: values.Status,
									Mem_Reg_Code: values.Mem_Reg_Code,
									memberType: memberType
								};
								const header = {
									headers: {
										"Content-Type": "multipart/form-data"
									}
								};
								// console.log("fFFFFFFFFFFFFFFFFFFFFFFFFFF", formData);
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "member/add", formData, header);
									if (res.data.status == 200) {
										getAllNDCRequests(1);
										getAllNominee();
										getAllMembers();
										toast.success(res.data.message);
										setIsShowMemberModal(false);
										setloading(false);
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
												<div className="form-group">
													<label>
														Owner Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Name"
														onChange={(e) => {
															setFieldValue("BuyerName", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Father Name"
														onChange={(e) => {
															setFieldValue("FathersName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.FathersName && touched.FathersName && errors.FathersName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options}
														onChange={(value) => {
															setFieldValue("Relation", value);
														}}
													/>
													<span className="error">{errors.Relation && touched.Relation && errors.Relation}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Email</label>
													<input
														className="form-control"
														type="email"
														placeholder="Email"
														onChange={(e) => {
															setFieldValue("Email", e.target.value);
														}}
													/>
													<span className="error">{errors.Email && touched.Email && errors.Email}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner Contact <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Contact"
														onChange={(e) => {
															setFieldValue("BuyerContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Owner Second Contact</label>
													<input
														className="form-control"
														type="text"
														placeholder="Owner Second Contact"
														onChange={(e) => {
															setFieldValue("BuyerSecondContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerSecondContact && touched.BuyerSecondContact && errors.BuyerSecondContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														placeholder="Owner CNIC"
														onChange={(e) => {
															setFieldValue("BuyerCNIC", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														DOB <span className="text-danger">*</span>
													</label>
													<div>
														<input
															className="form-control datetimepicker"
															type="date"
															onChange={(e) => {
																setFieldValue("DOB", e.target.value);
															}}
														/>
														<span className="error">{errors.DOB && touched.DOB && errors.DOB}</span>
													</div>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Mailing Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Mailing Address"
														onChange={(e) => {
															setFieldValue("BuyerAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Permanent Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														placeholder="Permanent Address"
														onChange={(e) => {
															setFieldValue("PermanantAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.PermanantAddress && touched.PermanantAddress && errors.PermanantAddress}
													</span>
												</div>
											</div>
											{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>Upload Image</label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={(e) => {
                              // console.log(e.target.files[0], ' img ');
                              setFieldValue("Image", e.target.files[0]);
                            }}
                          />
                          <span className="error">
                            {errors.Image && touched.Image && errors.Image}
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
			{/* /Create Member Modal */}

			{/* Edit Member Modal */}
			<Modal show={isShowEditMemberModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Member</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowEditMemberModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							enableReinitialize={true}
							initialValues={memberInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.BuyerName) {
									errors.BuyerName = "Owner name is required";
								}
								if (!values.BuyerContact) {
									errors.BuyerContact = "Owner Contact No is required";
								}
								if (!values.FathersName) {
									errors.FathersName = "Father Name is required";
								}
								if (!values.BuyerCNIC) {
									errors.BuyerCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.BuyerCNIC)) {
									errors.BuyerCNIC = "Invalid CNIC number";
								}
								if (!values.DOB) {
									errors.DOB = "Date of Birth is required";
								}

								if (!values.Relation) {
									errors.Relation = "Relation is required";
								}

								if (!values.BuyerAddress) {
									errors.BuyerAddress = "Mailing Address is required";
								}
								if (!values.PermanantAddress) {
									errors.PermanantAddress = "Permanent Address is required";
								}

								console.log(errors);
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									TRSR_ID: selectedId,
									BuyerName: values.BuyerName,
									BuyerContact: values.BuyerContact,
									BuyerSecondContact: values.BuyerSecondContact,
									Relation: values.Relation.value,
									BuyerCNIC: values.BuyerCNIC,
									FathersName: values.FathersName,
									DOB: values.DOB,
									Email: values.Email,
									BuyerAddress: values.BuyerAddress,
									PermanantAddress: values.PermanantAddress,
									Rmarks: values.Rmarks,
									IsActive: values.Status,
									Mem_Reg_Code: values.Mem_Reg_Code
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `member/update?id=${values.MEMBER_ID}`, formData);
									if (res.data.status == 200) {
										getAllNDCRequests(1);
										getAllNominee();
										getAllMembers();
										toast.success(res.data.message);
										setIsShowEditMemberModal(false);
										setloading(false);
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
												<div className="form-group">
													<label>
														Owner Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.BuyerName}
														placeholder="Owner Name"
														onChange={(e) => {
															setFieldValue("BuyerName", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerName && touched.BuyerName && errors.BuyerName}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.FathersName}
														placeholder="Father Name"
														onChange={(e) => {
															setFieldValue("FathersName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.FathersName && touched.FathersName && errors.FathersName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options}
														value={values.Relation}
														onChange={(value) => {
															setFieldValue("Relation", value);
														}}
													/>
													{/* {console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZA11", values.Relation)} */}
													<span className="error">{errors.Relation && touched.Relation && errors.Relation}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Email</label>
													<input
														className="form-control"
														type="email"
														value={values.Email}
														placeholder="Email"
														onChange={(e) => {
															setFieldValue("Email", e.target.value);
														}}
													/>
													<span className="error">{errors.Email && touched.Email && errors.Email}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner Contact <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.BuyerContact}
														placeholder="Owner Contact"
														onChange={(e) => {
															setFieldValue("BuyerContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerContact && touched.BuyerContact && errors.BuyerContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Owner Second Contact</label>
													<input
														className="form-control"
														type="text"
														value={values.BuyerSecondContact}
														placeholder="Owner Second Contact"
														onChange={(e) => {
															setFieldValue("BuyerSecondContact", e.target.value);
														}}
													/>
													<span className="error">
														{errors.BuyerSecondContact && touched.BuyerSecondContact && errors.BuyerSecondContact}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Owner CNIC <span className="text-danger">*</span>
													</label>
													<InputMask
														className="form-control"
														mask="99999-9999999-9"
														maskChar=" "
														value={values.BuyerCNIC}
														placeholder="Owner CNIC"
														onChange={(e) => {
															setFieldValue("BuyerCNIC", e.target.value);
														}}
													/>
													<span className="error">{errors.BuyerCNIC && touched.BuyerCNIC && errors.BuyerCNIC}</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														DOB <span className="text-danger">*</span>
													</label>
													<div>
														<input
															className="form-control datetimepicker"
															type="date"
															value={values.DOB}
															onChange={(e) => {
																setFieldValue("DOB", e.target.value);
															}}
														/>
														<span className="error">{errors.DOB && touched.DOB && errors.DOB}</span>
													</div>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Mailing Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														value={values.BuyerAddress}
														placeholder="Mailing Address"
														onChange={(e) => {
															setFieldValue("BuyerAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.BuyerAddress && touched.BuyerAddress && errors.BuyerAddress}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Permanent Address <span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="exampleFormControlTextarea1"
														rows="4"
														value={values.PermanantAddress}
														placeholder="Permanent Address"
														onChange={(e) => {
															setFieldValue("PermanantAddress", e.target.value);
														}}
													></textarea>
													<span className="error">
														{errors.PermanantAddress && touched.PermanantAddress && errors.PermanantAddress}
													</span>
												</div>
											</div>
											{/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>Upload Image</label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={(e) => {
                              // console.log(e.target.files[0], ' img ');
                              setFieldValue("Image", e.target.files[0]);
                            }}
                          />
                          <span className="error">
                            {errors.Image && touched.Image && errors.Image}
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
			{/* /Edit Member Modal */}

			{/* Create MemberNominee Modal */}
			<Modal show={isShowMemberNomineeModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Nominee</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowMemberNomineeModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<Formik
							enableReinitialize={true}
							initialValues={nomineeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NomineeName) {
									errors.NomineeName = "Nominee Name is required";
								}
								if (!values.NomineeFatherName) {
									errors.NomineeFatherName = "Father Name is required";
								}
								if (!values.NomineeCNIC) {
									errors.NomineeCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.NomineeCNIC)) {
									errors.NomineeCNIC = "Invalid CNIC number";
								}
								if (!values.NomineeRealtion) {
									errors.NomineeRealtion = "Relation is required";
								}
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member is required";
								}
								if (!values.RelationToOwner) {
									errors.RelationToOwner = "Relation to owner is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									TRSR_ID: selectedId.TRSR_ID,
									NomineeName: values.NomineeName,
									NomineeCNIC: values.NomineeCNIC,
									NomineeFatherName: values.NomineeFatherName,
									MEMBER_ID: values.MEMBER_ID.value,
									NomineeRealtion: values.NomineeRealtion.value,
									RelationToOwner: values.RelationToOwner
								};
								try {
									setloading(true);
									const res = await Axios.post(baseApiUrl + "nominee/add", formData);
									if (res.data.status == 200) {
										getAllNDCRequests(1);
										getAllNominee(1);
										toast.success(res.data.message);
										setloading(false);
										setIsShowMemberNomineeModal(false);
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
														Member <span className="text-danger">*</span>
													</label>
													{/* {console.log("FFFFFFFFFFFFFFFFFFFFF", values.MEMBER_ID)} */}
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
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Nominee Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Nominee Name"
														onChange={(e) => {
															setFieldValue("NomineeName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeName && touched.NomineeName && errors.NomineeName}
													</span>
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
														placeholder="Nominee CNIC"
														onChange={(e) => {
															setFieldValue("NomineeCNIC", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeCNIC && touched.NomineeCNIC && errors.NomineeCNIC}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Father Name"
														onChange={(e) => {
															setFieldValue("NomineeFatherName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeFatherName && touched.NomineeFatherName && errors.NomineeFatherName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options1}
														onChange={(value) => {
															setFieldValue("NomineeRealtion", value);
														}}
													/>
													<span className="error">
														{errors.NomineeRealtion && touched.NomineeRealtion && errors.NomineeRealtion}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Relation To Owner <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														placeholder="Realtion To Owner"
														onChange={(e) => {
															setFieldValue("RelationToOwner", e.target.value);
														}}
													/>
													<span className="error">
														{errors.RelationToOwner && touched.RelationToOwner && errors.RelationToOwner}
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
			{/* /Create MemberNominee Modal */}

			{/* Edit MemberNominee Modal */}
			<Modal show={isShowEditMemberNomineeModal} dialogClassName="employee-modal">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Nominee</h5>
						<button
							type="button"
							className="close"
							onClick={() => {
								setIsShowEditMemberNomineeModal(false);
							}}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						{/* {console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIII", nomineeInitialValues)} */}
						<Formik
							enableReinitialize={true}
							initialValues={nomineeInitialValues}
							validate={(values) => {
								const errors = {};
								if (!values.NomineeName) {
									errors.NomineeName = "Nominee Name is required";
								}
								if (!values.NomineeFatherName) {
									errors.NomineeFatherName = "Father Name is required";
								}
								if (!values.NomineeCNIC) {
									errors.NomineeCNIC = "CNIC is required";
								} else if (!/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.NomineeCNIC)) {
									errors.NomineeCNIC = "Invalid CNIC number";
								}
								if (!values.NomineeRealtion) {
									errors.NomineeRealtion = "Relation is required";
								}
								if (!values.MEMBER_ID) {
									errors.MEMBER_ID = "Member is required";
								}
								if (!values.RelationToOwner) {
									errors.RelationToOwner = "Relation to owner is required";
								}
								return errors;
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const formData = {
									TRSR_ID: selectedId,
									NomineeName: values.NomineeName,
									NomineeCNIC: values.NomineeCNIC,
									NomineeFatherName: values.NomineeFatherName,
									MEMBER_ID: values.MEMBER_ID.value,
									NomineeRealtion: values.NomineeRealtion.value,
									RelationToOwner: values.RelationToOwner
								};
								try {
									setloading(true);
									const res = await Axios.put(baseApiUrl + `nominee/update?id=${values.MN_ID}`, formData);
									if (res.data.status == 200) {
										getAllNDCRequests(1);
										getAllNominee(1);
										toast.success(res.data.message);
										setloading(false);
										setIsShowEditMemberNomineeModal(false);
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
														Member <span className="text-danger">*</span>
													</label>
													{/* {console.log("FFFFFFFFFFFFFFFFFFFFF", values.MEMBER_ID)} */}
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
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Nominee Name <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.NomineeName}
														placeholder="Nominee Name"
														onChange={(e) => {
															setFieldValue("NomineeName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeName && touched.NomineeName && errors.NomineeName}
													</span>
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
														value={values.NomineeCNIC}
														placeholder="Nominee CNIC"
														onChange={(e) => {
															setFieldValue("NomineeCNIC", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeCNIC && touched.NomineeCNIC && errors.NomineeCNIC}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														S/O, D/O, W/O <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.NomineeFatherName}
														placeholder="Father Name"
														onChange={(e) => {
															setFieldValue("NomineeFatherName", e.target.value);
														}}
													/>
													<span className="error">
														{errors.NomineeFatherName && touched.NomineeFatherName && errors.NomineeFatherName}
													</span>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Select Relation <span className="text-danger">*</span>
													</label>
													<Select
														placeholder="Select Relation"
														options={options1}
														value={values.NomineeRealtion}
														onChange={(value) => {
															setFieldValue("NomineeRealtion", value);
														}}
													/>
													<span className="error">
														{errors.NomineeRealtion && touched.NomineeRealtion && errors.NomineeRealtion}
													</span>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<label>
														Relation To Owner <span className="text-danger">*</span>
													</label>
													<input
														className="form-control"
														type="text"
														value={values.RelationToOwner}
														placeholder="Realtion To Owner"
														onChange={(e) => {
															setFieldValue("RelationToOwner", e.target.value);
														}}
													/>
													<span className="error">
														{errors.RelationToOwner && touched.RelationToOwner && errors.RelationToOwner}
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
			{/* /Edit MemberNominee Modal */}
		</div>
	);
};

export default PartnerNdcfee;
