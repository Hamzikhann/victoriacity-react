import React, { useState, useEffect, useRef } from "react";
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
import Webcam from "react-webcam";

const Transfer = () => {
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );
  const [fileTransfer, setFileTransfer] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [searchRegTerm, setSearchRegTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [IsShowFileTransferModal, setIsShowFileTransferModal] = useState(false);
  const [IsShowImageOpenModal, setIsShowImageOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setloading] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc1, setImageSrc1] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [nominee, setNominee] = useState([]);
  const [unitType, setUnitType] = useState([]);
  const [unit, setUnit] = useState([]);
  const [paymentPlan, setPaymentPlan] = useState([]);
  const [plotSize, setPlotSize] = useState([]);
  const [unitNatureType, setUnitNatureType] = useState([]);
  const [member, setMember] = useState([]);
  const [secondMember, setSecondMember] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedSecondMember, setSelectedSecondMember] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isWebcamOpen1, setIsWebcamOpen1] = useState(false);
  const [isWebcamOpen2, setIsWebcamOpen2] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationOpen1, setIsConfirmationOpen1] = useState(false);
  const [isConfirmationOpen2, setIsConfirmationOpen2] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const columns = [
    {
      title: "Serial#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // render: (text, record, index) => {
      //   return (
      //     <Space
      //       direction="horizontal"
      //       style={{ width: "100%", justifyContent: "center" }}
      //     >
      //       {/* <span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span> */}
      //     </Space>
      //   );
      // },
    },
    // {
    //   title: "BK ID",
    //   dataIndex: "BK_ID",
    //   sorter: (a, b) => a.NDC_ID.length - b.NDC_ID.length,
    // },
    {
      title: "User ID",
      dataIndex: "User_ID",
      sorter: (a, b) => a?.User_ID - b?.User_ID,
      // render: (text, record) => {
      //   return (
      //     <Space
      //       direction="horizontal"
      //       style={{ width: "100%", justifyContent: "center" }}
      //     >
      //       {/* <span>{text?.Member?.BuyerName}</span> */}
      //     </Space>
      //   );
      // },
    },
    {
      title: "Nominee ID",
      dataIndex: "Nominee_ID",
      sorter: (a, b) => a.Nominee_ID - b.Nominee_ID,
    },
    {
      title: "Member ID",
      dataIndex: "Member_ID",
      sorter: (a, b) => a.Member_ID - b.Member_ID,
    },
    // {
    //   title: "Date",
    //   dataIndex: "BK_Date",
    //   sorter: (a, b) => a.BK_Date.length - b.BK_Date.length,
    //   render: (text) => {
    //       if (text) {
    //           const formattedDate = moment(text).format("DD-MMM-YYYY");
    //           return formattedDate;
    //       } else {
    //           return "";
    //       }
    //   },
    // },
    {
      title: "Secondary Member ID",
      dataIndex: "Secondary_Member_ID",
      sorter: (a, b) =>
        a.Secondary_Member_ID.length - b.Secondary_Member_ID.length,
      // render: (text) => {
      //      <span>{text?.Name}</span>
      // },
    },

    {
      title: "Booking Temp",
      dataIndex: "Booking_Temp",
      sorter: (a, b) => a.Booking_Temp.length - b.Booking_Temp.length,
    },

    {
      title: "Unit Temp",
      dataIndex: "Unit_Temp",
      sorter: (a, b) => a.Unit_Temp.length - b.Unit_Temp.length,
      // render: (text, record) => (
      //     <div>
      //         {text?.Name}
      //     </div>
      // ),
    },
    {
      title: "Admin Verification",
      dataIndex: "AdminVarified",
      sorter: (a, b) => a.AdminVarified.length - b.AdminVarified.length,
      render: (text, record) => <div>{text ? "Verified" : "Unverified"}</div>,
      // render: (text, record) => (
      //     <div >
      //         <img src={text} alt="img" style={{ width: '100px', height: '75px' }} className="img-fluid img-thumbnail rounded-circle" />
      //     </div>
      // ),
    },
  ];

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

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  const getAllFileTransfer = () => {
    Axios.get(baseApiUrl + "fileTransfer/list")
      .then((res) => {
        setFileTransfer(res.data.Data);
      })
      .catch((err) => console.log(err.response.data.message));
    // .catch((err) => console.log(err.response.data));
  };

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
    Axios.get(baseApiUrl + "unit/list").then((res) => {
      res.data.Units.map((item) => {
        // console.log('aaaaaaaaaaaaaaaaaaa', item)
        setUnit((prev) => [
          ...prev,
          { label: item.Plot_No, value: item.ID, Unit_ID: item.ID },
        ]);
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

  // const getALLMember = () => {
  //   Axios.get(baseApiUrl + "member/list").then((res) => {
  //     res.data.member.map((item) => {
  //       setMember((prev) => [
  //         ...prev,
  //         { label: `${item.BuyerName} (${item.BuyerCNIC})`, value: item.MEMBER_ID , cnic: item.BuyerCNIC },
  //       ]);
  //     });
  //   });
  //   // .catch((err) => console.log(err.response.data));
  // };
  const getALLMemberNominee = () => {
    Axios.get(baseApiUrl + "nominee/list").then((res) => {
      res.data.MemNominee.map((item) => {
        setNominee((prev) => [
          ...prev,
          { label: `${item.NomineeName} (${item.NomineeCNIC})`, value: item.MN_ID , cnic: item.NomineeCNIC },
        ]);
      });
    });
    // .catch((err) => console.log(err.response.data));
  };

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
        newNominees.push({ label: `${item.NomineeName} (${item.NomineeCNIC})`, value: item.MN_ID });
      });

      setNominee(newNominees);
    });
    // }
    // .catch((err) => console.log(err.response.data));
  };

  const handleClearButtonClick = (value) => {
    setSelectedMember(null);
    setFieldValue("MEMBER_ID", "");
  };

  const handleClearButtonSecondMember = (value) => {
    setSelectedSecondMember(null);
    setFieldValue("Sec_MEM_ID", "");
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

  const handleRegInputChange = (event) => {
    setSearchRegTerm(event.target.value);
  };
  const handleRegButtonClick = () => {
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
        })
        .catch((err) => {
          console.log(err.response.data.message);
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

  useEffect(() => {
    getAllUnitType();
    getAllUnit();
    // getAllMemberBySearch();
    // getALLMember();
    getAllFileTransfer();
    getAllPlotSize();
    getAllUnitNatureType();
    getAllPaymentPlan();
    // getALLMemberNominee();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    getAllBooking(pagination.current);
  };

  console.log("HGGGGGGGGGGGG", filteredData);
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
        <title>Transfer - Sheranwala</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">File Transfer</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">File Transfer</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <p
                className="btn add-btn button"
                onClick={() => setIsShowFileTransferModal(true)}
              >
                <i className="fa fa-plus" /> Create File Transfer
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

        {/* <div className="row">
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
          <div className="col-sm-2">
         
          </div>
          <div className="col-sm-1">
            <div className="form-group">
              <button
                className="btn btn-success btn-block w-100 py-2"
                onClick={() => getAllBooking(1, formCode, name, vcNo)}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div> */}

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
                  // total: (totalPage - 1) * 25,
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
                bordered
                dataSource={fileTransfer}
                //   dataSource={transaction}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>

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
          <div className="modal-body">
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
          </div>
          {filteredData ? (
            <div className="modal-body">
              <Formik
                initialValues={{
                  SellerImage: "",
                  CombineImage: "",
                  BuyerImage: "",
                  Booking_Temp: {},
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
                    MEMBER_ID: filteredData?.Member
                    ? {
                        label: filteredData?.Member.BuyerName,
                        value: filteredData?.Member.MEMBER_ID,
                        cnic:filteredData?.Member.BuyerCNIC
                      }
                    : "",
                  // PHASE_ID: filteredData?.PHS_ID,
                  // SECTOR_ID: filteredData?.SECT_ID,
                }}
                validate={(values) => {
                  const errors = {};

                  return errors;
              
                }}
                onSubmit={async (values, { setSubmitting }) => {
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
                  myFormData.append("Combine_Image", imageSrc1);
                  myFormData.append("Buyer_Image", imageSrc2);
                  // myFormData.append("BK_Date", values.BK_Date);
                  myFormData.append(
                    "Booking_Temp",
                    JSON.stringify(values.Booking_Temp)
                  );
                  myFormData.append(
                    "Unit_Temp",
                    JSON.stringify(values.Unit_Temp)
                  );
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
                  myFormData.append(
                    "Secondary_Member_ID",
                    values.Sec_MEM_ID.value
                  );
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
                      "Content-Type": "multipart/form-data",
                    },
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
                      getAllFileTransfer();
                      toast.success(res.data.message);
                      setloading(false);
                      setIsShowFileTransferModal(false);
                    }
                    // else {
                    //     toast.success(res.data.message);
                    // }
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
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Owner Image</label>
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
                                          borderRadius: "45px",
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
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Client Image</label>
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
                                          borderRadius: "45px",
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
                                          borderRadius: "45px",
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
                              // value={values.MEMBER_ID}
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
                         {console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYY",values.MEMBER_ID)}
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
                  );
                }}
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
              isValid,
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
                            <button
                              onClick={capture}
                              className="btn btn-primary"
                            >
                              Click
                            </button>
                          </div>
                        </div>
                      )}
                      {isConfirmationOpen && (
                        <div className="form-group">
                          {imageSrc && (
                            <img
                              src={imageSrc}
                              alt="Captured Image"
                              style={{ marginLeft: "200px" }}
                            />
                          )}

                          <div
                            className="flex my-5 "
                            style={{ marginLeft: "180px" }}
                          >
                            <button
                              onClick={confirmImage}
                              className="btn btn-primary"
                              style={{ marginLeft: "20px" }}
                            >
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
                          <button
                            onClick={capture1}
                            className="btn btn-primary"
                          >
                            Click
                          </button>
                        </div>
                      </div>
                    )}

                    {isConfirmationOpen1 && (
                      <div className="form-group">
                        <img
                          src={imageSrc1}
                          alt="Captured Image"
                          style={{ marginLeft: "200px" }}
                        />
                        <div
                          className="flex my-5 "
                          style={{ marginLeft: "180px" }}
                        >
                          <button
                            onClick={confirmImage}
                            className="btn btn-primary"
                            style={{ marginLeft: "20px" }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={cancelCapture1}
                            className="btn btn-secondary"
                            style={{ marginLeft: "20px" }}
                          >
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
                          <button
                            onClick={capture2}
                            className="btn btn-primary"
                          >
                            Click
                          </button>
                        </div>
                      </div>
                    )}
                    {isConfirmationOpen2 && (
                      <div className="form-group">
                        <img
                          src={imageSrc2}
                          alt="Captured Image"
                          style={{ marginLeft: "200px" }}
                        />
                        <div
                          className="flex my-5 "
                          style={{ marginLeft: "180px" }}
                        >
                          <button
                            onClick={confirmImage}
                            className="btn btn-primary"
                            style={{ marginLeft: "20px" }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={cancelCapture2}
                            className="btn btn-secondary"
                            style={{ marginLeft: "20px" }}
                          >
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
    </div>
  );
};

export default Transfer;
