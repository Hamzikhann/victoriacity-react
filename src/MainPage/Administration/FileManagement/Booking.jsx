import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import "react-select-search/style.css";

import SelectSearch from "react-select-search";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast, ToastContainer } from "react-toastify";
import { format, isValid } from "date-fns";

const Booking = () => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [isShowProjectModal, setIsShowProjectModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowUpdateStatusModal, setIsShowUpdateStatusModal] = useState(false);
  const [isShowPlotNo, setIsShowPlotNo] = useState(false);
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );
  const [query, setQuery] = useState("");
  const [booking, setBooking] = useState([]);
  const [developmentId, setDevelopmentId] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [unitType, setUnitType] = useState([]);
  const [unit, setUnit] = useState([]);
  const [paymentPlan, setPaymentPlan] = useState([]);
  const [plotSize, setPlotSize] = useState([]);
  const [unitNatureType, setUnitNatureType] = useState([]);
  const [member, setMember] = useState([]);
  const [secondMember, setSecondMember] = useState([]);
  const [memberAddress, setMemberAddress] = useState([]);
  const [PDF, setPDF] = useState(null);
  const [AckId, setAckId] = useState(null);
  const [nominee, setNominee] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [name, setName] = useState();
  const [vcNo, setVCNo] = useState("");
  const [category, setCategory] = useState("");
  const [searchplotSize, setSearchPlotSize] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [isShowDevelopmentCharges, setIsShowDevelopmentCharges] =
    useState(false);
    const [developmentName, setDevelopmentName] = useState([]);
  const [formCode, setFormCode] = useState();
  const [selectedMember, setSelectedMember] = useState(null);
  const [merged, setMerged] = useState("");
  const [selectedSecondMember, setSelectedSecondMember] = useState(null);

  const [alertMsg, setAlertMsg] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  //   const [user, setUser] = useState([]);
  const [bookingInitialValues, setBookingInitialValues] = useState({
    BK_Reg_Code: "",
    BK_Date: "",
    SRForm_No: "",
    Form_Code: "",
    MEMBER_ID: "",
    MN_ID: "",
    UType_ID: "",
    PS_ID: "",
    PP_ID: "",
    BKType_ID: "",
    Dealer_ID: "",
    CommissionAgentID: "",
    PMID: "",
    CHQUE_DATE: "",
    CHEQUE_NO: "",
    INSTRUMENT_NO: "",
    Total_Amt: "",
    Advance_Amt: "",
    Rebate_Amt: "",
    TotalRemainNet_Amt: "",
    Discount_Amt: "",
    Total_Payable_Net_Amt: "",
    Ballot_Amt: "",
    Possession_Amt: "",
    ByAnnual_Charges: "",
    ByAnnual_TimePeriod: "",
    InstallmentAmount: "",
    No_Of_Installments: "",
    Plan_Years: "",
    IsCompPaid: "",
    AdminVarified: "",
    USER_ID: "",
    Unit_ID: "",
    IsDeleted: "",
    Reg_Code_Disply: "",
    Sec_MEM_ID: "",
    NType_ID: "",
    Discount_PerAge: "",
    status: "",
    Blocked: "",
    VC_NO: "",
  });
  //   const [bookingStatusInitialValues, setBookingStatusInitialValues] = useState({
  //     Status: "",
  // })

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setloading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  // const [selectedMember, setSelectedMember] = useState(null);
  const [showClearButton, setShowClearButton] = useState(false);


  const options = [
    { value: "", label: "None" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
    { value: "Blocked", label: "Blocked" },
    { value: "Merged", label: "Merged" },
  ];
  const optionCategory = [
    { value: "", label: "None" },
    { value: "Residential", label: "Residential" },
    { value: "Commercial", label: "Commercial" },

  ];

  const optionSize = [
    {value: "" , label: "None"},
    {value: "2" , label: "2-Marla"},
    {value: "3" , label: "3-Marla"},
    {value: "5" , label: "5-Marla"},
    {value: "10" , label: "10-Marla"},
    {value: "20" , label: "20-Marla"},
    // {value: "" , label: "None"},
  ]

  const optionMonth = [
    {value: "" , label: "None"},
    {value: "1" , label: "1-"},
    {value: "2" , label: "2-"},
    {value: "3" , label: "3-"},
    {value: "4" , label: "4-"},
    {value: "5" , label: "5-"},
    {value: "6" , label: "6-"},
    {value: "7" , label: "7-"},
    {value: "8" , label: "8-"},
    {value: "9" , label: "9-"},
    {value: "10" , label: "10-"},
    {value: "11" , label: "11-"},
    {value: "12" , label: "12-"},
    {value: "13" , label: "13-"},
    {value: "14" , label: "14-"},
    {value: "15" , label: "15-"},
    {value: "16" , label: "16-"},
    {value: "17" , label: "17-"},
    {value: "18" , label: "18-"},
    {value: "19" , label: "19-"},
    {value: "20" , label: "20-"},
    {value: "21" , label: "21-"},
    {value: "22" , label: "22-"},
    {value: "23" , label: "23-"},
    {value: "24" , label: "24-"},
    {value: "25" , label: "25-"},
    {value: "26" , label: "26-"},
    {value: "27" , label: "27-"},
    {value: "28" , label: "28-"},
    {value: "29" , label: "29-"},
    {value: "30" , label: "30-"},
    {value: "31" , label: "31-"},
    {value: "32" , label: "32-"},
    {value: "33" , label: "33-"},
    {value: "34" , label: "34-"},
    {value: "35" , label: "35-"},
    {value: "36" , label: "36-"},
    {value: "37" , label: "37-"},
    {value: "38" , label: "38-"},
    {value: "39" , label: "39-"},
    {value: "40" , label: "40-"},
    {value: "41" , label: "41-"},
    {value: "42" , label: "42-"},
    {value: "43" , label: "43-"},
    {value: "44" , label: "44-"},
    {value: "45" , label: "45-"},
    {value: "46" , label: "46-"},
    {value: "47" , label: "47-"},
    {value: "48" , label: "48-"},
];



  const columns = [
    {
      title: "Actions",
      render: (text, record) => {
        console.log("tyutytyyutt",text,record)
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
              {/*<Link*/}
              {/*to="/"*/}
              {/*className="dropdown-item"*/}
              {/*data-bs-toggle="modal"*/}
              {/*data-bs-target="#edit_member"*/}
              {/*onClick={() => {*/}
              {/*setQuery(text.BK_ID);*/}
              {/*setIsShowUpdateModal(true);*/}
              {/*setBookingInitialValues({*/}
              {/*BK_Reg_Code: "",*/}
              {/*BK_Date: "",*/}
              {/*SRForm_No: "",*/}
              {/*Form_Code: "",*/}
              {/*BKType_ID: "",*/}
              {/*Dealer_ID: "",*/}
              {/*CommissionAgentID: "",*/}
              {/*PMID: "",*/}
              {/*CHQUE_DATE: "",*/}
              {/*CHEQUE_NO: "",*/}
              {/*INSTRUMENT_NO: "",*/}
              {/*Total_Amt: "",*/}
              {/*Advance_Amt: "",*/}
              {/*Rebate_Amt: "",*/}
              {/*TotalRemainNet_Amt: "",*/}
              {/*Discount_Amt: "",*/}
              {/*Total_Payable_Net_Amt: "",*/}
              {/*Ballot_Amt: "",*/}
              {/*Possession_Amt: "",*/}
              {/*ByAnnual_Charges: "",*/}
              {/*ByAnnual_TimePeriod: "",*/}
              {/*InstallmentAmount: "",*/}
              {/*No_Of_Installments: "",*/}
              {/*Plan_Years: "",*/}
              {/*IsCompPaid: "",*/}
              {/*AdminVarified: "",*/}
              {/*USER_ID: "",*/}
              {/*IsDeleted: "",*/}
              {/*Reg_Code_Disply: "",*/}
              {/*Sec_MEM_ID: "",*/}
              {/*Discount_PerAge: "",*/}
              {/*...text,*/}
              {/*MEMBER_ID: member.find(*/}
              {/*(item) => item.value === text.MEMBER_ID*/}
              {/*),*/}
              {/*MN_ID: nominee.find((item) => item.value === text.MN_ID),*/}
              {/*UType_ID: unitType.find(*/}
              {/*(item) => item.value === text.UType_ID*/}
              {/*),*/}
              {/*PS_ID: plotSize.find((item) => item.value === text.PS_ID),*/}
              {/*PP_ID: paymentPlan.find(*/}
              {/*(item) => item.value === text.PP_ID*/}
              {/*),*/}
              {/*NType_ID: unitNatureType.find(*/}
              {/*(item) => item.value === text.NType_ID*/}
              {/*),*/}

              {/*// IsActive: options.find(item => item.value === text.IsActive)*/}
              {/*});*/}
              {/*}}*/}
              {/*>*/}
              {/*<i className="fa fa-pencil m-r-5" /> Edit*/}
              {/*</Link>*/}
              {/* <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_member"
                onClick={() => {
                  setQuery(text.BK_ID);
                }}
              >
                <i className="fa fa-trash-o m-r-5" /> Status
              </Link> */}
              {currentUser.role === "Admin" && (
                <>
                  <Link
                    to="/"
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_member"
                    onClick={() => {
                      setQuery(text.BK_ID);
                      setIsShowUpdateStatusModal(true);
                      setBookingInitialValues({
                        MERGED_VCNO: "",
                        ...record,
                        status: options.find(
                          (item) => item.value === text.Status
                        ),
                      });
                    }}
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit Status
                  </Link>
                  <Link
                    to="/"
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_member"
                    onClick={() => {
                      setQuery(text.BK_ID);
                      setIsShowPlotNo(true);
                      setBookingInitialValues({
                        ...text,
                         Unit_ID: {value:  text?.Unit_ID || '' , label: text?.Unit?.Plot_No || ""}, 
                      });
                     
                    }}
                  >
                    <i className="fa fa-pencil m-r-5" /> Assign Plot No
                  </Link>
                </>
              )}
              
              <Link
                to="#"
                className="dropdown-item"
                // data-bs-toggle="modal"
                // data-bs-target="#delete_member"
                onClick={() => {
                  setPDF(record.BK_ID);
                  setTimeout(() => {
                    AckLetterPdf(record.BK_ID);
                  }, 2000);
                  // setQuery(text.BK_ID);
                }}
              >
                <i className="fa fa-download m-r-5" /> Acknowlegment Letter
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                // data-bs-toggle="modal"
                // data-bs-target="#delete_member"
                onClick={() => {
                  // setQuery(text.BK_ID);
                  setPDF(record.BK_ID);
                  setTimeout(() => {
                    PaymentPlanPdf(record.BK_ID);
                  }, 2000);
                }}
              >
                <i className="fa fa-download m-r-5" /> Payment Plan
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                // data-bs-toggle="modal"
                // data-bs-target="#delete_member"
                onClick={() => {
                  // setQuery(text.BK_ID);
                  setPDF(record.BK_ID);
                  setTimeout(() => {
                    StatementPdf(record.BK_ID);
                  }, 2000);
                }}
              >
                <i className="fa fa-download m-r-5" /> Statement
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => {
        let tagColor, tagText;

        if (text === "Blocked") {
          tagColor = "gray";
          tagText = "Blocked";
        } else if (text === "Active") {
          tagColor = "green";
          tagText = "Active";
        } else if (text === "InActive") {
          tagColor = "red";
          tagText = "InActive";
        } else if (text === "Merged") {
          tagColor = "green";
          tagText = "Merged";
        }

        return (
          <span>
            <Tag color={tagColor} className="rounded-5">
              {tagText}
            </Tag>
          </span>
        );
      },
    },

    {
      title: "Serial No#",
      dataIndex: "BK_ID",
      sorter: (a, b) => a.BK_ID.length - b.BK_ID.length,
      render: (text, record, index) => {
        return (
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span>
          </Space>
        );
      },
    },

    {
      title: "Application Ref No",
      dataIndex: "Form_Code",
      sorter: (a, b) => a.Form_Code.length - b.Form_Code.length,
      // render: (text, record) => (
      //   <span>{record.id}</span>
      // ),
      // ...getColumnSearchProps('id'),
    },
    {
      title: "BK Reg Code",
      dataIndex: "BK_Reg_Code",
      sorter: (a, b) => a.BK_Reg_Code.length - b.BK_Reg_Code.length,
      render: (text, record) => <span>VC{text}</span>,
      // ...getColumnSearchProps('id'),
    },
    {
      title: "RegCodeDisplay",
      dataIndex: "Reg_Code_Disply",
      sorter: (a, b) => a.Reg_Code_Disply.length - b.Reg_Code_Disply.length,
      // render: (text, record) => (
      //   <span>VC{text}</span>
      // ),
      // ...getColumnSearchProps('id'),
    },
    
    {
      title: "Owner Name",
      dataIndex: "Member",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.BuyerName}</span>;
      },
      sorter: (a, b) => a.MEMBER_ID.length - b.MEMBER_ID.length,
    },
    {
      title: "Second Owner",
      dataIndex: "SecondMember",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.BuyerName}</span>;
      },
      sorter: (a, b) =>
        a?.SecondMember?.BuyerName.length - b?.SecondMember?.BuyerName.length,
    },
    {
      title: "Unit Plot No",
      dataIndex: "Unit_ID",
      sorter: (a, b) => a.Unit_ID.length - b.Unit_ID.length,
      render: (text, record) => {
        const plotNo = text
        ? unit.find((item) => item.Unit_ID === text)?.value
        : "";
        return <span>{plotNo}</span>;
      },
      // ...getColumnSearchProps('id'),
    },
    {
      title: "Phase",
      dataIndex: "PHASE",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{record?.Phase?.NAME}</span>;
      },
      sorter: (a, b) => a.MN_ID.length - b.MN_ID.length,
    },
    {
      title: "Sector",
      dataIndex: "SECTOR",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{record?.Sector?.NAME}</span>;
      },
      sorter: (a, b) => a.MN_ID.length - b.MN_ID.length,
    },
    {
      title: "Booking Date",
      dataIndex: "BK_Date",
      // render: (text, record) => (
      //   <Link to="/app/administrator/job-details">{text}</Link>
      // ),
      sorter: (a, b) => a.BK_Date.length - b.BK_Date.length,
    },
    // {
    //   title: "Form No",
    //   dataIndex: "SRForm_No",
    //   sorter: (a, b) => a.SRForm_No.length - b.SRForm_No.length,
    // },
    // {
    //   title: "Form Code",
    //   dataIndex: "Form_Code",
    //   sorter: (a, b) => a.Form_Code.length - b.Form_Code.length,
    // },

    {
      title: "Unit Type",
      dataIndex: "UnitType",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.UType_ID.length - b.UType_ID.length,
    },
    // {
    //   title: "Booking Type",
    //   dataIndex: "BKType_ID",
    //   //   render: (text, record) => {
    //   //     // console.log(text," dfgsdfg ",record)
    //   //     return (
    //   //         <span>{text?.Name}</span>
    //   //     )
    //   // },
    //   sorter: (a, b) => a.BKType_ID.length - b.BKType_ID.length,
    // },
    {
      title: "Size",
      dataIndex: "PlotSize",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.PS_ID.length - b.PS_ID.length,
    },

    {
      title: "Payment Plan",
      dataIndex: "PaymentPlan",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.PP_ID.length - b.PP_ID.length,
      // render: (text,record)=>(
      // <span>{format(new Date(text), format('dd MM yy' ))}</span>
      // )
    },
    {
      title: "UnitNature Type",
      dataIndex: "UnitNature",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.NType_ID.length - b.NType_ID.length,
    },
    // {
    //   title: "Dealer_ID",
    //   dataIndex: "Dealer_ID",
    //   sorter: (a, b) => a.Dealer_ID.length - b.Dealer_ID.length,
    // },
    //
    // {
    //   title: "Commission Agent ID",
    //   dataIndex: "CommissionAgentID",
    //   sorter: (a, b) => a.CommissionAgentID.length - b.CommissionAgentID.length,
    // },
    // {
    //   title: "PM ID",
    //   dataIndex: "PMID",
    //   sorter: (a, b) => a.PMID.length - b.PMID.length,
    // },
    // {
    //   title: "Cheque Date",
    //   dataIndex: "CHQUE_DATE",
    //   render: (text, record) =>
    //     (<span> {format(new Date(text), 'dd MMM y')} </span>),
    //   sorter: (a, b) => a.CHQUE_DATE.length - b.CHQUE_DATE.length,
    // },
    // {
    //   title: "Cheque No",
    //   dataIndex: "CHEQUE_NO",
    //   sorter: (a, b) => a.CHEQUE_NO.length - b.CHEQUE_NO.length,
    // },
    {
      title: "Total Amount",
      dataIndex: "Total_Amt",
      sorter: (a, b) => a.Total_Amt.length - b.Total_Amt.length,
    },
    {
      title: "Annual Charges",
      dataIndex: "ByAnnual_Charges",
      sorter: (a, b) => a.ByAnnual_Charges.length - b.ByAnnual_Charges.length,
    },
    // {
    //   title: "INSTRUMENT NO",
    //   dataIndex: "INSTRUMENT_NO",
    //   sorter: (a, b) => a.INSTRUMENT_NO.length - b.INSTRUMENT_NO.length,
    // },

    // {
    //   title: "Rebate Amount",
    //   dataIndex: "Rebate_Amt",
    //   sorter: (a, b) => a.Rebate_Amt.length - b.Rebate_Amt.length,
    // },
    {
      title: "Advance Amount",
      dataIndex: "Advance_Amt",
      sorter: (a, b) => a.Advance_Amt.length - b.Advance_Amt.length,
    },
    {
      title: "Total RemainNet Amount",
      dataIndex: "TotalRemainNet_Amt",
      sorter: (a, b) =>
        a.TotalRemainNet_Amt.length - b.TotalRemainNet_Amt.length,
    },
    {
      title: "Discount Amount",
      dataIndex: "Discount_Amt",
      sorter: (a, b) => a.Discount_Amt.length - b.Discount_Amt.length,
    },
    {
      title: "Total Payable Net Amount",
      dataIndex: "Total_Payable_Net_Amt",
      sorter: (a, b) =>
        a.Total_Payable_Net_Amt.length - b.Total_Payable_Net_Amt.length,
    },
    {
      title: "Ballot Amount",
      dataIndex: "Ballot_Amt",
      sorter: (a, b) => a.Ballot_Amt.length - b.Ballot_Amt.length,
    },
    {
      title: "Possession Amount",
      dataIndex: "Possession_Amt",
      sorter: (a, b) => a.Possession_Amt.length - b.Possession_Amt.length,
    },

    {
      title: "Annual Time Period",
      dataIndex: "ByAnnual_TimePeriod",
      sorter: (a, b) =>
        a.ByAnnual_TimePeriod.length - b.ByAnnual_TimePeriod.length,
    },
    {
      title: "Installment Amount",
      dataIndex: "InstallmentAmount",
      sorter: (a, b) => a.InstallmentAmount.length - b.InstallmentAmount.length,
    },
    {
      title: "No Of Installments",
      dataIndex: "No_Of_Installments",
      sorter: (a, b) =>
        a.No_Of_Installments.length - b.No_Of_Installments.length,
    },
    {
      title: "Plan Years",
      dataIndex: "Plan_Years",
      sorter: (a, b) => a.Plan_Years.length - b.Plan_Years.length,
    },

    {
      title: "User Name",
      dataIndex: "USER_ID",
      sorter: (a, b) => a.USER_ID.length - b.USER_ID.length,
    },
    // {
    //   title: "Reg Code Disply",
    //   dataIndex: "Reg_Code_Disply",
    //   sorter: (a, b) => a.Reg_Code_Disply.length - b.Reg_Code_Disply.length,
    // },
    // {
    //   title: "Sec MEM ID",
    //   dataIndex: "Sec_MEM_ID",
    //   sorter: (a, b) => a.Sec_MEM_ID.length - b.Sec_MEM_ID.length,
    // },

    // {
    //   title: "Discount PerAge",
    //   dataIndex: "Discount_PerAge",
    //   sorter: (a, b) => a.Discount_PerAge.length - b.Discount_PerAge.length,
    // },
    // {
    //   title: "Deleted",
    //   dataIndex: "IsDeleted",
    //   sorter: (a, b) => a.IsDeleted.length - b.IsDeleted.length,
    //   render: (text, record) => {
    //     // console.log(text, record)
    //     return (
    //       <span>
    //         {text ? (
    //           <Tag color="green" className="rounded-5">
    //             Active
    //           </Tag>
    //         ) : (
    //           <Tag color="red" className="rounded-5">
    //             InActive
    //           </Tag>
    //         )}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "CompPaid",
    //   dataIndex: "IsCompPaid",
    //   sorter: (a, b) => a.IsCompPaid.length - b.IsCompPaid.length,
    //   render: (text, record) => {
    //     // console.log(text, record)
    //     return (
    //       <span>
    //         {text ? (
    //           <Tag color="green" className="rounded-5">
    //             Active
    //           </Tag>
    //         ) : (
    //           <Tag color="red" className="rounded-5">
    //             InActive
    //           </Tag>
    //         )}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "Admin Varified",
    //   dataIndex: "AdminVarified",
    //   sorter: (a, b) => a.AdminVarified.length - b.AdminVarified.length,
    //   render: (text, record) => {
    //     // console.log(text, record)
    //     return (
    //       <span>
    //         {text ? (
    //           <Tag color="green" className="rounded-5">
    //             Active
    //           </Tag>
    //         ) : (
    //           <Tag color="red" className="rounded-5">
    //             InActive
    //           </Tag>
    //         )}
    //       </span>
    //     );
    //   },
    // },
  ];
  // console.log(PDF,"pdf");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleButtonClick = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(null);
      setSuccessAlert(false);
      setShowAlert(false);
    } else {
      Axios.get(baseApiUrl + "fileSubDel/getFile?code=" + searchTerm)
        .then((res) => {
          setFilteredData({
            ...res.data.file,
            ...res.data.file.FileSubmission,
            ...res.data.file.OpenFile,
            ...res.data.file.OpenFile.PaymentPlan,
            maxRegCode: res.data.maxRegCode,
          });
          setShowAlert(false);
          setSuccessAlert(false);
        })
        .catch((err) => {
          setAlertMsg(err?.response?.data?.message);
          setFilteredData(null);
          setSuccessAlert(false);
          setShowAlert(true);
        });

      // const results = data.filter((item) => {
      //   const nameMatch = item.key
      //     .toLowerCase()
      //     .includes(searchTerm.toLowerCase());
      //   const isActiveMatch =
      //     item.isActive.toString().toLowerCase() === searchTerm.toLowerCase();
      //   return nameMatch || isActiveMatch;
      // });
      // setFilteredData(results);
      // setShowAlert(results.length === 0);
    }
  };


  // const handleButtonClick = () => {
  //   if (searchTerm.trim() === "") {
  //     setFilteredData(null);
  //     setSuccessAlert(false);
  //     setShowAlert(false);
  //   } else {
  //     Axios.get(baseApiUrl + "fileSubDel/getFile?code=" + searchTerm)
  //       .then((res) => {
  //         if (res.data.file.isBooked) {
  //           // File is already booked, show an error message
  //           setAlertMsg("File is already booked");
  //           setFilteredData(null);
  //           setSuccessAlert(false);
  //           setShowAlert(true);
  //         } else {
  //           // File is not booked, proceed with your logic
  //           setFilteredData({
  //             ...res.data.file,
  //             ...res.data.file.FileSubmission,
  //             ...res.data.file.OpenFile,
  //             ...res.data.file.OpenFile.PaymentPlan,
  //             maxRegCode: res.data.maxRegCode,
  //           });
  //           setShowAlert(false);
  //           setSuccessAlert(false);
  //         }
  //       })
  //       .catch((err) => {
  //         setAlertMsg(err?.response?.data?.message);
  //         setFilteredData(null);
  //         setSuccessAlert(false);
  //         setShowAlert(true);
  //       });
  //   }
  // };
  

  const getAllUnitType = () => {
    Axios.get(baseApiUrl + "unitType/list").then((res) => {
      res.data.unitType.map((item) => {
        setUnitType((prev) => [
          ...prev,
          { label: item.Name, value: item.UType_ID },
        ]);
      });
    });

    // .catch((err) => console.log(err.response.data));
  };
  const getAllUnit = () => {
    Axios.get(baseApiUrl + "unit/all/list").then((res) => {
      res.data.Units.map((item) => {
        // console.log('aaaaaaaaaaaaaaaaaaa', item)
        setUnit((prev) => [...prev, { label: item.Plot_No, value: item.ID, Unit_ID: item.ID }]);
      });
    });

    // .catch((err) => console.log(err.response.data));
  };
  const getAllPaymentPlan = () => {
    Axios.get(baseApiUrl + "package/list").then((res) => {
      res.data.Packages.map((item) => {
        setPaymentPlan((prev) => [
          ...prev,
          { label: item.Name, value: item.PP_ID },
        ]);
      });
    });
    // .catch((err) => console.log(err.response.data));
  };
  const getAllPlotSize = () => {
    Axios.get(baseApiUrl + "plotSize/list").then((res) => {
      res.data.PlotSizes.map((item) => {
        setPlotSize((prev) => [
          ...prev,
          { label: item.Name, value: item.PS_ID },
        ]);
      });
    });
    // .catch((err) => console.log(err.response.data));
  };
  const getAllUnitNatureType = () => {
    Axios.get(baseApiUrl + "unitNatureType/list").then((res) => {
      res.data.UnitNatureTypes.map((item) => {
        setUnitNatureType((prev) => [
          ...prev,
          { label: item.Name, value: item.NType_ID },
        ]);
      });
    });
    // .catch((err) => console.log(err.response.data));
  };

  const setMemberAddressHandle = (memberId) => {
    // setMemberAddress(member.m)
    // console.log("first",member)
    // console.log("mmmmmmmmmmmmmmmmm",member.map(item=>item.MEMBER_ID==memberId))
  };

  const getAllDevelopmentCharges = () => {
    Axios.get(baseApiUrl + "charges/list").then((res) => {
      res.data.data.map((item) => {
        setDevelopmentName((prev) => [
          ...prev,
          {label: item.Name , value: item.DC_ID}
        ])
      })
      // console.log(res.data.Blocks)
    });
  };

  const getAllMember = () => {
    Axios.get(baseApiUrl + "member/list").then((res) => {
      res.data.member.map((item) => {
        setMember((prev) => [
          ...prev,
          { label: item.BuyerName, value: item.MEMBER_ID },
        ]);
        // setMember([]);

        // setMemberAddress((prev) => [
        //   ...prev,
        //   { label: item?.Member_Adress?.memberAddress, value: item.Member_Adress },
        // ]);
      });
    });
    // .catch((err) => console.log(err.response.data));
  };

  // const cancelTokenSource = Axios.CancelToken.source();

  let requestInProgress = null;
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
          newMembers.push({ label: `${item.BuyerName} (${item.BuyerCNIC})`, value: item.MEMBER_ID });
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
          newMembers.push({ label: `${item.BuyerName} (${item.BuyerCNIC})`, value: item.MEMBER_ID });
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
        newNominees.push({ label: `${item.NomineeName} (${item.NomineeCNIC})` , value: item.MN_ID });
      });

      setNominee(newNominees);
    });
    // }
    // .catch((err) => console.log(err.response.data));
  };
  // const getAllPm = () => {
  //     Axios.get(baseApiUrl + "member/list")
  //         .then((res) => {
  //             res.data.member.map((item) => {
  //                 setMember((prev) => [...prev, {label: item.Name, value: item.MEMBER_ID}])
  //             })
  //         })
  //     // .catch((err) => console.log(err.response.data));
  // };

  const deleteBookingById = (BK_ID) => {
    Axios.delete(baseApiUrl + `booking/delete?id=${BK_ID}`)
      .then((res) => {
        if (res.data.status == 200) {
          // console.log("Deleted Successfully");
          getAllBooking(1);
          toast.success(res.data.message);
        } else {
          toast.success(res.data.message);
        }

        // console.log({ dataIndex: "id" }, "dfnsfknksd");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    // console.log(member)
  };

  const getAllBooking = (page, Form_Code, Name, vcNo,category,plotSize,status) => {
    // console.log('hkvhkvj', Form_Code, Name)
    setPage(page);
    if (typeof Form_Code === "undefined" || Form_Code === null) {
      Form_Code = "";
    }

    // Check and set Name
    if (typeof Name === "undefined" || Name === null) {
      Name = "";
    }

    // Check and set Name
    if (typeof vcNo === "undefined" || vcNo === null) {
      vcNo = "";
    }

    if (typeof category === "undefined" || category === null) {
      category = "";
    }

    if (typeof plotSize === "undefined" || plotSize === null) {
      plotSize = "";
    }

    if (typeof status === "undefined" || status === null) {
      status = "";
    }

    Axios.get(
      baseApiUrl +
        `booking/list?page=${page}&Form_Code=${Form_Code}&Name=${Name}&vcNo=${vcNo}&category=${category}&status=${status}&plotSize=${plotSize}`
    ).then((res) => {
      setBooking(res?.data?.Blocks);
      setTotalPage(res.data.totalPage);
      setTotalRecords(res.data.totalRecords);
    });
    // .catch((err) => console.log(err.response.data));
  };

  const AckLetterPdf = (value) => {
    let pdfId = PDF;

    if (typeof value != "undefined" && typeof value != "object") {
      pdfId = value;
    }

    Axios.get(baseApiUrl + `booking/id/getFile?id=${pdfId}`)
      .then((res) => {
        // getAllBooking(1);
        if (res.data.status == 200) {
          // setRedirectUrl(res.data.file.url);
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

    Axios.get(baseApiUrl + `booking/id/getPPFile?id=${pdfId}`)
      .then((res) => {
        // getAllBooking(1);
        if (res.data.status == 200) {
          // setRedirectUrl();
          window.open(res.data.file.url, "_blank");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const StatementPdf = (value) => {
    let pdfId = PDF;

    if (typeof value != "undefined" && typeof value != "object") {
      pdfId = value;
    }

    Axios.get(baseApiUrl + `booking/id/getStatementFile?id=${pdfId}`)
      .then((res) => {
        // getAllBooking(1);
        if (res.data.status == 200) {
          // setRedirectUrl();
          window.open(res.data.file.url, "_blank");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  // const FilterName = (page) => {
  //   setPage(page);
  //   if(code.length > 0){
  //     Axios.get(baseApiUrl + `/file/getBookingByCode?code=${code}`  )
  //     .then((res) => {

  //       console.log('jfjyhfvjhvjhvjhv', res?.data.bkObj)
  //       setBooking([res?.data?.bkObj]);
  //       setTotalPage(res?.data?.totalPage);
  //       setTotalRecords(res?.data?.totalRecords);
  //     })
  //     .catch((err) => console.log(err?.response?.data));
  //   } else {
  //     getAllBooking()
  //   }

  // }

  useEffect(() => {
    getAllBooking(1);
    getAllUnitType();
    getAllUnit();
    // getAllMember();
    getAllPlotSize();
    getAllUnitNatureType();
    getAllPaymentPlan();
    getAllDevelopmentCharges();
    // getMemberNominee();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const onSearch = (value) => {
    getAllBooking(1, value);
  };

  const [filterTable, setFilterTable] = useState(null);
  // const onSearch = (value) => {
  //   const filterData = booking.filter((item) =>
  //     item.Form_Code.toString().toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilterTable(filterData);
  // };
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const handleTableChange = (pagination, filters, sorter) => {
    getAllBooking(pagination.current);
  };

  const handleMemberSelect = (value) => {
    // setSelectedMember(value);
    setMember([value]);
    setShowClearButton(true);
    // setFieldValue("MEMBER_ID", value);
    getMemberNomineeByMemId(value.value);
  };

  const handleClearButtonClick = (value) => {
    setSelectedMember(null);
    // setFieldValue("MEMBER_ID", "");
  };

  const handleClearButtonSecondMember = (value) => {
    setSelectedSecondMember(null);
    // setFieldValue("Sec_MEM_ID", "");
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
        <title>Booking - Sheranwala</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Booking</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Booking</li>
              </ul>
            </div>
            {/* <div className="col-auto float-end ml-auto">
              <p
                className="btn add-btn button"
                onClick={() => setIsShowProjectModal(true)}
              >
                <i className="fa fa-download m-r-5" /> CSV
              </p>
            </div> */}
            <div className="col-auto float-end ml-auto">
              <p
                className="btn add-btn button"
                onClick={() => setIsShowProjectModal(true)}
              >
                <i className="fa fa-plus" /> Create Booking
              </p>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <Input.Search
              style={{ border: '3px solid red', margin: '0 0 10px 0',padding:'12px' }}
              className="p-3"
              size="large"
              placeholder="Search by Form No..."
              enterButton
              onSearch={onSearch}
            />
            <input type="text" value={searchTerm} onChange={handleInputChange}
                  placeholder="Transaction Name"/>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-3">
            <div className="form-group">
              <input
                required
                className="form-control"
                type="text"
                onChange={(e) => setFormCode(e.target.value)}
                placeholder="Search By Application Ref "
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Search By Owner Name"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setVCNo(e.target.value)}
                placeholder="Search By VC NO"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <Select
                // className="form-control"
                // type="text"
                options={optionCategory}
                onChange={(value) => setCategory(value.value)}
                placeholder="Search By Category"
              />
            </div>
          </div>
          {/* <div className="col-sm-2"> */}
          <div className="col-sm-3">
            <div className="form-group">
              <Select
                // className="form-control"
                // type="text"
                options={options}
                onChange={(value) => setStatus(value.value)}
                placeholder="Search By Status"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <Select
               options={optionSize}
                // type="text"
                onChange={(value) => setSearchPlotSize(value.value)}
                placeholder="Search By Size"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <Select
               options={optionMonth}
                // type="text"
                onChange={(value) => setMonth(value.value)}
                placeholder="Search By Month"
              />
            </div>
          </div>
          {/* </div> */}
          <div className="col-sm-1">
            <div className="form-group">
              <button
                className="btn btn-success btn-block w-100 py-2"
                onClick={() => getAllBooking(1, formCode, name, month, vcNo,category,searchplotSize,status)}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>

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
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                onChange={handleTableChange}
                size="middle"
                // dataSource={filterTable == null ? booking : filterTable}
                dataSource={booking}
                // scroll={{ x: "max-content" }}
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
            <h5 className="modal-title">Booking Process</h5>
            <button
              type="button"
              className="close"
              onClick={() => setIsShowProjectModal(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {successAlert && (
              <div className="modal-body">
                <Alert
                  variant="success"
                  onClose={() => setSuccessAlert(false)}
                  dismissible
                >
                  File submitted successfully.{" "}
                  <a
                    href="#"
                    style={{ textDecoration: "underline", color: "green" }}
                    onClick={AckLetterPdf}
                  >
                    Click here
                  </a>{" "}
                  to download Acknowledgment Letter.{" "}
                  <a
                    href="#"
                    style={{ textDecoration: "underline", color: "green" }}
                    onClick={PaymentPlanPdf}
                  >
                    Click here
                  </a>{" "}
                  to download Payment Plan.
                </Alert>
              </div>
            )}
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Form Code</label>
                  <input
                    className="form-control"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-3 my-auto">
                <div className="form-group mb-0">
                  <button
                    onClick={handleButtonClick}
                    className="btn btn-success btn-block w-100 p-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {filteredData ? (
            <div className="modal-body">
              <Formik
                initialValues={{
                  SRForm_No: "",
                  Form_Code: "",
                  MEMBER_ID: "",
                  MN_ID: "",
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
                  Reg_Code_Disply: filteredData?.maxRegCode,
                  Sec_MEM_ID: "",
                  BK_Date: format(new Date(), "yyyy-MM-dd"),
                  ...filteredData,
                  UType_ID: filteredData?.UnitType
                    ? {
                        label: filteredData?.UnitType.Name,
                        value: filteredData?.UnitType.UType_ID,
                      }
                    : "",
                  PS_ID: filteredData?.PlotSize
                    ? {
                        label: filteredData?.PlotSize.Name,
                        value: filteredData?.PlotSize.PS_ID,
                      }
                    : "",
                  PP_ID: filteredData?.PaymentPlan
                    ? {
                        label: filteredData?.PaymentPlan.Name,
                        value: filteredData?.PaymentPlan.PP_ID,
                      }
                    : "",
                  NType_ID: filteredData?.UnitNature
                    ? {
                        label: filteredData?.UnitNature.Name,
                        value: filteredData?.UnitNature.NType_ID,
                      }
                    : "",
                  PHASE_ID: filteredData?.PHS_ID,
                  SECTOR_ID: filteredData?.SECT_ID,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.MEMBER_ID) {
                    errors.MEMBER_ID = "Member is required";
                  }
                  if (!values.MN_ID) {
                    errors.MN_ID = "Nominee is required";
                  }
                  // console.log("errors", errors);
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  // console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', filteredData)
                  const formData = {
                    BK_Date: values.BK_Date,
                    SRForm_No: values.SRForm_No,
                    Form_Code: values.Form_Code,
                    MEMBER_ID: values.MEMBER_ID.value,
                    MN_ID: values.MN_ID.value,
                    UType_ID: values.UType_ID.value,
                    PS_ID: values.PS_ID.value,
                    PP_ID: values.PP_ID.value,
                    BKType_ID: values.BKType_ID,
                    Total_Amt: values.Total_Amt,
                    Advance_Amt: values.Advance_Amt,
                    Rebate_Amt: values.Rebate_Amt,
                    TotalRemainNet_Amt: values.TotalRemainNet_Amt,
                    Ballot_Amt: values.Ballot_Amt,
                    Possession_Amt: values.Possession_Amt,
                    ByAnnual_Charges: values.ByAnnual_Charges,
                    ByAnnual_TimePeriod: values.ByAnnual_TimePeriod,
                    InstallmentAmount: values.InstallmentAmount,
                    No_Of_Installments: values.No_Of_Installments,
                    Plan_Years: values.Plan_Years,
                    USER_ID: values.USER_ID,
                    Reg_Code_Disply: values.Reg_Code_Disply,
                    Sec_MEM_ID: values.Sec_MEM_ID.value,
                    NType_ID: values.NType_ID.value,
                    PHASE_ID: values.PHASE_ID,
                    SECTOR_ID: values.SECTOR_ID,
                  };
                  // console.log("FF", formData);
                  try {
                    setloading(true);
                    const res = await Axios.post(
                      baseApiUrl + `booking/add`,
                      formData
                    );
                    // console.log("ffffffff",res)
                    if (res.data.status == 200) {
                      setPDF(res.data.Booking.BK_ID);
                      getAllBooking(1);
                      toast.success(res.data.message);
                      setSuccessAlert(true);
                      setFilteredData(false);
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
                  dirty,
                  isValid,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
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
                          <input
                            className="form-control"
                            type="date"
                            value={values.BK_Date}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Serial Form No</label>
                          <input
                            className="form-control"
                            type="text"
                            value={values.SRForm_No}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Form Code</label>
                          <input
                            className="form-control"
                            type="text"
                            value={values.Form_Code}
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Unit Type</label>
                          <Select
                            options={unitType}
                            type="text"
                            value={values.UType_ID}
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Plot Size</label>
                          <Select
                            options={plotSize}
                            value={values.PS_ID}
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Payment Plan</label>
                          <Select
                            options={paymentPlan}
                            value={values.PP_ID}
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
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
                      </div>
                      <div className="col-sm-6">
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
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>No Of Installments</label>
                          <input
                            className="form-control"
                            type="Text"
                            value={values.No_Of_Installments}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
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
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Unit Nature Type</label>
                          <Select
                            options={unitNatureType}
                            value={values.NType_ID}
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
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
                          {/*{JSON.stringify(member)}*/}
                          {/*{JSON.stringify(selectedMember)}*/}
                          <Select
                            options={member}
                            onInputChange={getAllMemberBySearch}
                            // type="text"
                            value={selectedMember}
                            onChange={(value) => {
                              // console.log('value',value)
                              setMember([value]);
                              setSelectedMember(value);
                              setFieldValue("MEMBER_ID", value);
                              getMemberNomineeByMemId(value.value);
                            }}
                          />
                          {/* {selectedMember && (
                            <button onClick={handleClearButtonClick}>
                              Clear
                            </button>
                          )} */}
                          <span className="error">
                            {errors.MEMBER_ID &&
                              touched.MEMBER_ID &&
                              errors.MEMBER_ID}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Member Nominee{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={nominee}
                            // onInputChange={getMemberNominee}
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
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <div className="justify-content-between d-flex">
                            <label>
                              Select Second Member{" "}
                              <span className="text-danger">*</span>
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
                            value={selectedSecondMember}
                            onChange={(value) => {
                              setSecondMember([value]);
                              setSelectedSecondMember(value);
                              setFieldValue("Sec_MEM_ID", value);
                              // getMemberNomineeByMemId(value.value);
                            }}
                          />
                          <span className="error">
                            {errors.Sec_MEM_ID &&
                              touched.Sec_MEM_ID &&
                              errors.Sec_MEM_ID}
                          </span>
                        </div>
                      </div>
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Select Member Address
                          </label>
                          <Select
                            options={memberAddress}
                            type="text"
                            onChange={(value) => {
                              setFieldValue("Member_Adress", value.value);
                            }}
                          />
                          <span className="error">
                            {errors.Member_Adress &&
                              touched.Member_Adress &&
                              errors.Member_Adress}
                          </span>
                        </div>
                      </div> */}

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Rebate Amount</label>
                          <input
                            value={values.Rebate_Amt}
                            className="form-control"
                            type="Text"
                            onChange={(e) => {
                              setFieldValue("Rebate_Amt", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Rebate_Amt &&
                              touched.Rebate_Amt &&
                              errors.Rebate_Amt}
                          </span>
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
                              role="IsActive"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            onClick={handleSubmit}
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
          ) : (
            !successAlert &&
            showAlert && (
              <div className="modal-body">
                <Alert
                  variant="warning"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {alertMsg}
                </Alert>
              </div>
            )
          )}
        </div>
      </Modal>
      {/* /Create Project Modal */}
      {/* Edit Project Modal */}
      <Modal show={isShowUpdateModal} dialogClassName="employee-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Booking</h5>
            <button
              type="button"
              className="close"
              onClick={() => setIsShowUpdateModal(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">
            <Formik
              initialValues={bookingInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.BK_Reg_Code) {
                  errors.BK_Reg_Code = " Code is required";
                }
                if (!values.SRForm_No) {
                  errors.SRForm_No = "SRForm_No is required";
                }
                if (!values.BK_Date) {
                  errors.BK_Date = "Booking Date is required";
                }

                if (!values.Form_Code) {
                  errors.Form_Code = "Form_Code is required";
                }
                if (!values.MEMBER_ID) {
                  errors.MEMBER_ID = "MEMBER_ID  is required";
                }
                if (!values.MN_ID) {
                  errors.MN_ID = "Member Nominee Id is required";
                }
                if (!values.UType_ID) {
                  errors.UType_ID = "Unit Type is required";
                }
                if (!values.PS_ID) {
                  errors.PS_ID = "Plot Size is required";
                }
                if (!values.PP_ID) {
                  errors.PP_ID = "Payment Plan is required";
                }
                //   if (!values.BKType_ID) {
                //     errors.BKType_ID = "Booking Type is required";
                //   }
                //   if (!values.Dealer_ID) {
                //     errors.Dealer_ID = "Dealer_ID is required";
                //   }
                //   if (!values.CommissionAgentID) {
                //     errors.CommissionAgentID = "CommissionAgentID is required";
                //   }
                //   if (!values.PMID) {
                //     errors.PMID = "PMID is required";
                //   }
                //   if (!values.CHQUE_DATE) {
                //     errors.CHQUE_DATE = "CHQUE_DATE is required";
                //   }
                //   if (!values.CHEQUE_NO) {
                //     errors.CHEQUE_NO = "CHEQUE_NO is required";
                //   }
                //   if (!values.INSTRUMENT_NO) {
                //     errors.INSTRUMENT_NO = "INSTRUMENT_NO is required";
                //   }
                if (!values.Total_Amt) {
                  errors.Total_Amt = "Total_Amt is required";
                }
                if (!values.Advance_Amt) {
                  errors.Advance_Amt = "Advance_Amt is required";
                }
                //   if (!values.Rebate_Amt) {
                //     errors.Rebate_Amt = "Rebate_Amt is required";
                //   }
                if (!values.TotalRemainNet_Amt) {
                  errors.TotalRemainNet_Amt = "TotalRemainNet_Amt is required";
                }
                if (!values.Discount_Amt) {
                  errors.Discount_Amt = "Discount_Amt is required";
                }
                if (!values.Total_Payable_Net_Amt) {
                  errors.Total_Payable_Net_Amt =
                    "Total_Payable_Net_Amt is required";
                }
                if (!values.Ballot_Amt) {
                  errors.Ballot_Amt = "Ballot_Amt is required";
                }
                if (!values.Possession_Amt) {
                  errors.Possession_Amt = "Possession_Amt is required";
                }
                if (!values.ByAnnual_Charges) {
                  errors.ByAnnual_Charges = "ByAnnual_Charges is required";
                }
                if (!values.ByAnnual_TimePeriod) {
                  errors.ByAnnual_TimePeriod =
                    "ByAnnual_TimePeriod is required";
                }
                if (!values.InstallmentAmount) {
                  errors.InstallmentAmount = "InstallmentAmount is required";
                }
                if (!values.No_Of_Installments) {
                  errors.No_Of_Installments = "No_Of_Installments is required";
                }
                if (!values.Plan_Years) {
                  errors.Plan_Years = "Plan_Years is required";
                }
                if (!values.IsCompPaid) {
                  errors.IsCompPaid = "IsCompPaid is required";
                }
                if (!values.AdminVarified) {
                  errors.AdminVarified = "AdminVarified is required";
                }
                if (!values.USER_ID) {
                  errors.USER_ID = "USER_ID is required";
                }
                if (!values.IsDeleted) {
                  errors.IsDeleted = "IsDeleted is required";
                }
                if (!values.Reg_Code_Disply) {
                  errors.Reg_Code_Disply = "Reg_Code_Disply is required";
                }
                //   if (!values.Sec_MEM_ID) {
                //     errors.Sec_MEM_ID = "Sec_MEM_ID is required";
                //   }
                if (!values.NType_ID) {
                  errors.NType_ID = "UnitNature Type is required";
                }
                //   if (!values.Discount_PerAge) {
                //     errors.Discount_PerAge = "Discount_PerAge is required";
                //   }

                console.log("errors", errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  BK_Reg_Code: values.BK_Reg_Code,
                  BK_Date: values.BK_Date,
                  SRForm_No: values.SRForm_No,
                  Form_Code: values.Form_Code,
                  MEMBER_ID: values.MEMBER_ID.value,
                  MN_ID: values.MN_ID.value,
                  UType_ID: values.UType_ID.value,
                  PS_ID: values.PS_ID.value,
                  PP_ID: values.PP_ID.value,
                  BKType_ID: values.BKType_ID,
                  Dealer_ID: values.Dealer_ID,
                  CommissionAgentID: values.CommissionAgentID,
                  PMID: values.PMID,
                  CHQUE_DATE: values.CHQUE_DATE,
                  CHEQUE_NO: values.CHEQUE_NO,
                  INSTRUMENT_NO: values.INSTRUMENT_NO,
                  Total_Amt: values.Total_Amt,
                  Advance_Amt: values.Advance_Amt,
                  Rebate_Amt: values.Rebate_Amt,
                  TotalRemainNet_Amt: values.TotalRemainNet_Amt,
                  Discount_Amt: values.Discount_Amt,
                  Total_Payable_Net_Amt: values.Total_Payable_Net_Amt,
                  Ballot_Amt: values.Ballot_Amt,
                  Possession_Amt: values.Possession_Amt,
                  ByAnnual_Charges: values.ByAnnual_Charges,
                  ByAnnual_TimePeriod: values.ByAnnual_TimePeriod,
                  InstallmentAmount: values.InstallmentAmount,
                  No_Of_Installments: values.No_Of_Installments,
                  Plan_Years: values.Plan_Years,
                  IsCompPaid: values.IsCompPaid,
                  AdminVarified: values.AdminVarified,
                  USER_ID: values.USER_ID,
                  // TIME_STAMP: values.timestamp,
                  // LAST_UPDATE: values.lastupdate,
                  IsDeleted: values.IsDeleted,
                  Reg_Code_Disply: values.Reg_Code_Disply,
                  Sec_MEM_ID: values.Sec_MEM_ID,
                  NType_ID: values.NType_ID.value,
                  Discount_PerAge: values.Discount_PerAge,
                  // IsActive: values.IsActive,
                };
                //   console.log("FF", formData);

                try {
                  setloading(true);
                  //   console.log("fffffffffffff");
                  const res = await Axios.put(
                    baseApiUrl + `booking/update?id=${query}`,

                    formData
                  );
                  if (res.data.status == 200) {
                    getAllBooking(1);
                    setIsShowUpdateModal(false);
                    setloading(false);
                    toast.success(res.data.message);
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
                dirty,
                isValid,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Booking Code <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.BK_Reg_Code}
                          className="form-control"
                          type="text"
                          // disabled={!dirty}
                          onChange={(e) => {
                            setFieldValue("BK_Reg_Code", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.BK_Reg_Code &&
                            touched.BK_Reg_Code &&
                            errors.BK_Reg_Code}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Booking Date <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.BK_Date}
                          className="form-control"
                          type="date"
                          onChange={(e) => {
                            setFieldValue("BK_Date", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.BK_Date && touched.BK_Date && errors.BK_Date}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          SerialForm No<span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.SRForm_No}
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            setFieldValue("SRForm_No", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.SRForm_No &&
                            touched.SRForm_No &&
                            errors.SRForm_No}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Form Code <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Form_Code}
                          className="form-control"
                          type="text"
                          // disabled={!dirty}
                          onChange={(e) => {
                            setFieldValue("Form_Code", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Form_Code &&
                            touched.Form_Code &&
                            errors.Form_Code}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Member Name <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.MEMBER_ID}
                          options={member}
                          type="text"
                          // disabled={!dirty}
                          onChange={(value) => {
                            setFieldValue("MEMBER_ID", value);
                          }}
                        />
                        <span className="error">
                          {errors.MEMBER_ID &&
                            touched.MEMBER_ID &&
                            errors.MEMBER_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Member Nominee <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.MN_ID}
                          options={nominee}
                          type="text"
                          onChange={(value) => {
                            setFieldValue("MN_ID", value);
                          }}
                        />
                        <span className="error">
                          {errors.MN_ID && touched.MN_ID && errors.MN_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Unit Type <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.UType_ID}
                          options={unitType}
                          onChange={(value) => {
                            setFieldValue("UType_ID", value);
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
                          value={values.PS_ID}
                          options={plotSize}
                          onChange={(value) => {
                            setFieldValue("PS_ID", value);
                          }}
                        />
                        <span className="error">
                          {errors.PS_ID && touched.PS_ID && errors.PS_ID}
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Payment Plan <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.PP_ID}
                          options={paymentPlan}
                          onChange={(value) => {
                            setFieldValue("PP_ID", value);
                          }}
                        />
                        <span className="error">
                          {errors.PP_ID && touched.PP_ID && errors.PP_ID}
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Booking Type <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.BKType_ID}
                          type="text"
                          className="form-control"
                          // options={BKType_ID}
                          onChange={(e) => {
                            setFieldValue("BKType_ID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.BKType_ID &&
                            touched.BKType_ID &&
                            errors.BKType_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          CommissionAgentID{" "}
                          <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.CommissionAgentID}
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            setFieldValue("CommissionAgentID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.CommissionAgentID &&
                            touched.CommissionAgentID &&
                            errors.CommissionAgentID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          PMID <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.PMID}
                          type="text"
                          className="form-control"
                          // options={PMID}
                          onChange={(e) => {
                            setFieldValue("PMID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.PMID && touched.PMID && errors.PMID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Cheque Date <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.CHQUE_DATE}
                          className="form-control"
                          type="date"
                          onChange={(e) => {
                            setFieldValue("CHQUE_DATE", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.CHQUE_DATE &&
                            touched.CHQUE_DATE &&
                            errors.CHQUE_DATE}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Cheque No <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.CHEQUE_NO}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("CHEQUE_NO", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.CHEQUE_NO &&
                            touched.CHEQUE_NO &&
                            errors.CHEQUE_NO}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          INSTRUMENT NO <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.INSTRUMENT_NO}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("INSTRUMENT_NO", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.INSTRUMENT_NO &&
                            touched.INSTRUMENT_NO &&
                            errors.INSTRUMENT_NO}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Total Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Total_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Total_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Total_Amt &&
                            touched.Total_Amt &&
                            errors.Total_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Advance Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Advance_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Advance_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Advance_Amt &&
                            touched.Advance_Amt &&
                            errors.Advance_Amt}
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          TotalRemainNet Amount{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.TotalRemainNet_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("TotalRemainNet_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.TotalRemainNet_Amt &&
                            touched.TotalRemainNet_Amt &&
                            errors.TotalRemainNet_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Discount Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Discount_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Discount_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Discount_Amt &&
                            touched.Discount_Amt &&
                            errors.Discount_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Total Payable Net Amount{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Total_Payable_Net_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue(
                              "Total_Payable_Net_Amt",
                              e.target.value
                            );
                          }}
                        />
                        <span className="error">
                          {errors.Total_Payable_Net_Amt &&
                            touched.Total_Payable_Net_Amt &&
                            errors.Total_Payable_Net_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Ballot Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Ballot_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Ballot_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Ballot_Amt &&
                            touched.Ballot_Amt &&
                            errors.Ballot_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Possession Amount{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Possession_Amt}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Possession_Amt", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Possession_Amt &&
                            touched.Possession_Amt &&
                            errors.Possession_Amt}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Annual Charges <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.ByAnnual_Charges}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("ByAnnual_Charges", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.ByAnnual_Charges &&
                            touched.ByAnnual_Charges &&
                            errors.ByAnnual_Charges}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Annual TimePeriod{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.ByAnnual_TimePeriod}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue(
                              "ByAnnual_TimePeriod",
                              e.target.value
                            );
                          }}
                        />
                        <span className="error">
                          {errors.ByAnnual_TimePeriod &&
                            touched.ByAnnual_TimePeriod &&
                            errors.ByAnnual_TimePeriod}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Installment Amount{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.InstallmentAmount}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("InstallmentAmount", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.InstallmentAmount &&
                            touched.InstallmentAmount &&
                            errors.InstallmentAmount}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Dealer ID <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.Dealer_ID}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Dealer_ID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Dealer_ID &&
                            touched.Dealer_ID &&
                            errors.Dealer_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          No Of Installments{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.No_Of_Installments}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("No_Of_Installments", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.No_Of_Installments &&
                            touched.No_Of_Installments &&
                            errors.No_Of_Installments}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Plan Years <span className="text-danger">*</span>
                        </label>
                        <input
                          placeholder="Plan_Years"
                          value={values.Plan_Years}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Plan_Years", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Plan_Years &&
                            touched.Plan_Years &&
                            errors.Plan_Years}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          CompPaid <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.IsCompPaid}
                          placeholder="Select IsActive"
                          options={options}
                          onChange={(value) => {
                            setFieldValue("IsCompPaid", value);
                          }}
                        />
                        <span className="error">
                          {errors.IsCompPaid &&
                            touched.IsCompPaid &&
                            errors.IsCompPaid}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Deleted <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.IsDeleted}
                          placeholder="Select IsActive"
                          options={options}
                          onChange={(value) => {
                            setFieldValue("IsDeleted", value);
                          }}
                        />
                        <span className="error">
                          {errors.IsDeleted &&
                            touched.IsDeleted &&
                            errors.IsDeleted}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Admin Varified <span className="text-danger">*</span>
                        </label>
                        <Select
                          placeholder="Select IsActive"
                          value={values.AdminVarified}
                          options={options}
                          onChange={(value) => {
                            setFieldValue("AdminVarified", value);
                          }}
                        />
                        <span className="error">
                          {errors.AdminVarified &&
                            touched.AdminVarified &&
                            errors.AdminVarified}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Discount PerAge <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Discount_PerAge}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Discount_PerAge", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Discount_PerAge &&
                            touched.Discount_PerAge &&
                            errors.Discount_PerAge}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          USER <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.USER_ID}
                          type="text"
                          className="form-control"
                          //    options={USER_ID}
                          onChange={(e) => {
                            setFieldValue("USER_ID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.USER_ID && touched.USER_ID && errors.USER_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Reg Code Disply <span className="text-danger">*</span>
                        </label>
                        <input
                          value={values.Reg_Code_Disply}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Reg_Code_Disply", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Reg_Code_Disply &&
                            touched.Reg_Code_Disply &&
                            errors.Reg_Code_Disply}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Sec MEM ID <span className="text-danger"></span>
                        </label>
                        <input
                          value={values.Sec_MEM_ID}
                          className="form-control"
                          type="Text"
                          onChange={(e) => {
                            setFieldValue("Sec_MEM_ID", e.target.value);
                          }}
                        />
                        <span className="error">
                          {errors.Sec_MEM_ID &&
                            touched.Sec_MEM_ID &&
                            errors.Sec_MEM_ID}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          UnitNature Type <span className="text-danger">*</span>
                        </label>
                        <Select
                          value={values.NType_ID}
                          options={unitNatureType}
                          onChange={(value) => {
                            setFieldValue("NType_ID", value);
                          }}
                        />
                        <span className="error">
                          {errors.NType_ID &&
                            touched.NType_ID &&
                            errors.NType_ID}
                        </span>
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
                            role="IsActive"
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
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
      {/* /Edit Project Modal */}

      {/* Edit Status */}
      <Modal show={isShowUpdateStatusModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Status</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsShowUpdateStatusModal(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={bookingInitialValues}
              validate={(values) => {
                const errors = {};

                // if (!values.status) {
                //     errors.status = "Status is required";
                // }
                // console.log("Ffffffffff",errors)
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  status: values.status.value,
                  VC_NO:values.MERGED_VCNO,
                };
                try {
                  setloading(true);
                  const res = await Axios.put(
                    baseApiUrl + `booking/update/status?id=${query}`,
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllBooking(1);
                    setPage(page);
                    toast.success(res.data.message);
                    setIsShowUpdateStatusModal(false);
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
                isValid,
                /* and other goodies */
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Status
                            {/* <span className="text-danger"> *</span> */}
                          </label>
                          <Select
                            placeholder="Select Status"
                            value={values.status}
                            options={options}
                            onChange={(value) => {
                              setFieldValue("status", value);
                            }}
                          />
                          <span className="error">
                            {errors.status && touched.status && errors.status}
                          </span>
                        </div>
                      </div>
                      {values.status.value === "Merged" && (
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            VC NO
                            {/* <span className="text-danger"> *</span> */}
                          </label>
                          <input
                            className="form-control"
                            placeholder="Enter VC No"
                            value={values.MERGED_VCNO}
                            type="text"
                            onChange={(e) => {
                              setFieldValue("MERGED_VCNO", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.MERGED_VCNO && touched.MERGED_VCNO && errors.MERGED_VCNO}
                          </span>
                        </div>
                      </div>
                      )}
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
      </Modal>
      {/* /Edit  Status */}

      {/* Assign Plot No */}
      <Modal show={isShowPlotNo}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign Plot No</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsShowPlotNo(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={bookingInitialValues}
              validate={(values) => {
                const errors = {};

                // if (!values.status) {
                //     errors.status = "Status is required";
                // }
                // console.log("Ffffffffff",errors)
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  Unit_ID: values.Unit_ID,
                };
                try {
                  setloading(true);
                  const res = await Axios.put(
                    baseApiUrl + `booking/update/status?id=${query}`,
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllBooking(1);
                    setPage(page);
                    toast.success(res.data.message);
                    setIsShowUpdateStatusModal(false);
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
                isValid,
                /* and other goodies */
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Plot No
                            {/* <span className="text-danger"> *</span> */}
                          </label>
                          <Select
                            placeholder="Plot No"
                            value={values.Unit_ID}
                            options={unit}
                            onChange={(value) => {
                              setFieldValue("Unit_ID", value);
                            }}
                          />

                          <span className="error">
                            {errors.status && touched.status && errors.status}
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
      </Modal>
      {/* /Assign Plot No */}

  {/* {Development Charges} */}


      {/* Delete Project Modal */}
      <div className="modal custom-modal fade" id="delete_member" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Booking</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary w-100 continue-btn"
                      data-bs-dismiss="modal"
                      type="submit"
                      onClick={() => deleteBookingById(query)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary w-100 cancel-btn"
                    >
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
export default Booking;
