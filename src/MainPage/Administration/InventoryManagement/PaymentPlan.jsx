import React, { useEffect, useRef } from "react";
import { Table, Input, Space, Tag } from "antd";
import Axios from "axios";
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

const PaymentPlan = () => {
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );

  // const [isShowFileModal, setIsShowFileModal] = useState(false);
  const [isShowProjectModal, setIsShowProjectModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [plotSize, setPlotSize] = useState([]);
  const [unitType, setUnitType] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState("");
  const options = [
    { value: true, label: "Active" },
    { value: false, label: "InActive" },
  ];
  const options2 = [
    { value: "DC", label: "Development Charges" },
    { value: "PP", label: "Payment Plan" },
  ];
  const [packageInitialValues, setPackageInitialValues] = useState({
    Name: "",
    Auto_Name: "",
    INS_Start_Date: "",
    PS_ID: "",
    UType_ID: "",
    Total_Amt: "",
    Advance_Amt: "",
    TotalRemainNet_Amt: "",
    ByAnnual_Charges: "",
    Ballot_Amt: "",
    Possession_Amt: "",
    ByAnnual_TimePeriod: "",
    InstallmentAmount: "",
    No_Of_Installments: "",
    DC_START_DATE: "",
    DC_NO_OF_INSTALLMENT: "",
    DC_INSTALLMENT_AMOUNT: "",
    DC_TOTAL_AMOUNT: "",
    Plan_Years: "",
    // USER_ID: "",
    IsActive: "",
  });
  const getAllPackages = () => {
    Axios.get(baseApiUrl + "package/list")
      .then((res) => {
        setPackages(res.data.Packages);
        // console.log(res.data.Packages);
      })
      .catch((err) => console.log(err.response.data));
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
  const deletePackageById = (id) => {
    Axios.delete(baseApiUrl + `package/delete?id=${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          getAllPackages();
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllPackages();
    getAllPlotSize();
    getAllUnitType();
  }, []);
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const columns = [
    {
      title: "Serial #",
      dataIndex: "PP_ID",
      sorter: (a, b) => a.PP_ID.length - b.PP_ID.length,
    },
    {
      title: "Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Auto Name",
      dataIndex: "Auto_Name",
      sorter: (a, b) => a.Auto_Name.length - b.Auto_Name.length,
    },
    {
      title: "Installment Start Date",
      dataIndex: "INS_Start_Date",
      sorter: (a, b) => a.INS_Start_Date.length - b.INS_Start_Date.length,
    },
    {
      title: "DC Start Date",
      dataIndex: "DC_START_DATE",
      sorter: (a, b) => a.DC_START_DATE.length - b.DC_START_DATE.length,
    },
    {
      title: "Plot Size",
      dataIndex: "PlotSize",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.PS_ID.length - b.PS_ID.length,
    },
    {
      title: "Unit Type",
      dataIndex: "UnitType",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.Name}</span>;
      },
      sorter: (a, b) => a.UType_ID.length - b.UType_ID.length,
    },
    {
      title: "Total Amount",
      dataIndex: "Total_Amt",
      sorter: (a, b) => a.Total_Amt.length - b.Total_Amt.length,
    },
    {
      title: "DC Total Amount",
      dataIndex: "DC_TOTAL_AMOUNT",
      sorter: (a, b) => a.DC_TOTAL_AMOUNT.length - b.DC_TOTAL_AMOUNT.length,
    },
    {
      title: "Advance Amount",
      dataIndex: "Advance_Amt",
      sorter: (a, b) => a.Advance_Amt.length - b.Advance_Amt.length,
    },
    {
      title: "Total Remaining Net Amount",
      dataIndex: "TotalRemainNet_Amt",
      sorter: (a, b) =>
        a.TotalRemainNet_Amt.length - b.TotalRemainNet_Amt.length,
    },
    {
      title: "Annual Charges",
      dataIndex: "ByAnnual_Charges",
      sorter: (a, b) => a.ByAnnual_Charges.length - b.ByAnnual_Charges.length,
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
      title: "No of Installment",
      dataIndex: "No_Of_Installments",
      sorter: (a, b) =>
        a.No_Of_Installments.length - b.No_Of_Installments.length,
    },
    {
      title: "DC No of Installment",
      dataIndex: "DC_NO_OF_INSTALLMENT",
      sorter: (a, b) =>
        a.DC_NO_OF_INSTALLMENT.length - b.DC_NO_OF_INSTALLMENT.length,
    },
    {
      title: "Installment Amount",
      dataIndex: "InstallmentAmount",
      sorter: (a, b) => a.InstallmentAmount.length - b.InstallmentAmount.length,
    },
    {
      title: "DC Installment Amount",
      dataIndex: "DC_INSTALLMENT_AMOUNT",
      sorter: (a, b) => a.DC_INSTALLMENT_AMOUNT.length - b.DC_INSTALLMENT_AMOUNT.length,
    },
    {
      title: "Plan Years",
      dataIndex: "Plan_Years",
      sorter: (a, b) => a.Plan_Years.length - b.Plan_Years.length,
    },
    {
      title: "Status",
      dataIndex: "IsActive",
      render: (text, record) => {
        // console.log(text, record)
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
      },
      sorter: (a, b) => a.IsActive.length - b.IsActive.length,
    },
    {
      title: "Action",
      render: (text, record) => {
        console.log(text,"sdddddddddddddddddddd", record)
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
                  setQuery(text.PP_ID);
                  setIsShowUpdateModal(true);
                  setPackageInitialValues({
                    // PP_Code: "",
                    Name: "",
                    Auto_Name: "",
                    INS_Start_Date: "",
                    Total_Amt: "",
                    Advance_Amt: "",
                    TotalRemainNet_Amt: "",
                    ByAnnual_Charges: "",
                    Ballot_Amt: "",
                    Possession_Amt: "",
                    ByAnnual_TimePeriod: "",
                    InstallmentAmount: "",
                    No_Of_Installments: "",
                    Plan_Years: "",
                    DC_INSTALLMENT_AMOUNT: "",
                    DC_NO_OF_INSTALLMENT: "",
                    DC_TOTAL_AMOUNT: "",
                    DC_START_DATE: "",
                    ...text,
                    PS_ID: plotSize.find((item) => item.value === text.PS_ID),
                    UType_ID: unitType.find(
                      (item) => item.value === text.UType_ID
                    ),
                    IsActive: options.find(
                      (item) => item.value === text.IsActive
                    ),
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
                  setQuery(text.PP_ID);
                }}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

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
        <title>Administration - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Payment Plan</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Payment Plan</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <p
                href="#"
                className="btn add-btn"
                onClick={() => setIsShowProjectModal(true)}
              >
                <i className="fa fa-plus" /> Create Payment Plan
              </p>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        {/* Search Filter */}

        {/* /Search Filter */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: packages?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                scroll={{ x: "max-content" }}
                columns={columns}
                bordered
                dataSource={packages}
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
            <h5 className="modal-title">Create Payment Plan</h5>
            <button
              type="button"
              className="close"
              onClick={() => setIsShowProjectModal(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={packageInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.Name) {
                  errors.Name = "Name is required";
                }
                if (!values.Auto_Name) {
                  errors.Auto_Name = "Auto Name is required";
                }
                if (!values.INS_Start_Date) {
                  errors.INS_Start_Date = "Installment Start Date is required";
                }
                if (!values.PS_ID) {
                  errors.PS_ID = "Plot Size is required";
                }
                if (!values.UType_ID) {
                  errors.UType_ID = "Unit Type is required";
                }

                if (!values.Total_Amt) {
                  errors.Total_Amt = "Total Amount is required";
                }

                if (!values.Advance_Amt) {
                  errors.Advance_Amt = "Advance Amount is required";
                }
                if (!values.TotalRemainNet_Amt) {
                  errors.TotalRemainNet_Amt =
                    "Total Remaining Net Amount is required";
                }
                if (!values.ByAnnual_Charges) {
                  errors.ByAnnual_Charges = "Annual Charges is required";
                }
                if (!values.DC_START_DATE) {
                  errors.DC_START_DATE = "DC START DATE is required";
                }
                if (!values.DC_NO_OF_INSTALLMENT) {
                  errors.DC_NO_OF_INSTALLMENT = "DC NO OF INSTALLMENT is required";
                }
                if (!values.DC_INSTALLMENT_AMOUNT) {
                  errors.DC_INSTALLMENT_AMOUNT = "DC INSTALLMENT AMOUNT is required";
                }
                if (!values.DC_TOTAL_AMOUNT) {
                  errors.DC_TOTAL_AMOUNT = "DC TOTAL AMOUNT is required";
                }
                if (!values.Ballot_Amt) {
                  errors.Ballot_Amt = "Ballot Amount is required";
                }
                if (!values.Possession_Amt) {
                  errors.Possession_Amt = "Possession Amount is required";
                }
                if (!values.ByAnnual_TimePeriod) {
                  errors.ByAnnual_TimePeriod = "Annual Time Period is required";
                }
                if (!values.InstallmentAmount) {
                  errors.InstallmentAmount = "Installment Amount is required";
                }
                if (!values.No_Of_Installments) {
                  errors.No_Of_Installments = "No of Installments is required";
                }
                if (!values.Plan_Years) {
                  errors.Plan_Years = "Plan Years is required";
                }
                if (!values.IsActive) {
                  errors.IsActive = "Status is required";
                }
                console.log("nnnnnnnnnnn", errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  // PP_Code: values.PP_Code,
                  Name: values.Name,
                  Auto_Name: values.Auto_Name,
                  INS_Start_Date: values.INS_Start_Date,
                  PS_ID: values.PS_ID.value,
                  UType_ID: values.UType_ID.value,
                  Total_Amt: values.Total_Amt,
                  Advance_Amt: values.Advance_Amt,
                  DC_START_DATE: values.DC_START_DATE,
                  DC_NO_OF_INSTALLMENT: values.DC_NO_OF_INSTALLMENT,
                  DC_INSTALLMENT_AMOUNT: values.DC_INSTALLMENT_AMOUNT,
                  DC_TOTAL_AMOUNT: values.DC_TOTAL_AMOUNT,
                  TotalRemainNet_Amt: values.TotalRemainNet_Amt,
                  ByAnnual_Charges: values.ByAnnual_Charges,
                  Ballot_Amt: values.Ballot_Amt,
                  Possession_Amt: values.Possession_Amt,
                  ByAnnual_TimePeriod: values.ByAnnual_TimePeriod,
                  InstallmentAmount: values.InstallmentAmount,
                  No_Of_Installments: values.No_Of_Installments,
                  Plan_Years: values.Plan_Years,
                  IsActive: values.IsActive.value,
                  USER_ID: 1,
                };
                const res = await Axios.post(
                  baseApiUrl + "package/add",
                  formData
                );
                try {
                  setloading(true);
                  if (res.data.status == 200) {
                    getAllPackages();
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
                isValid,
                /* and other goodies */
              }) => {
                return (
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
                            placeholder="Name"
                            onChange={(e) => {
                              setFieldValue("Name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Name && touched.Name && errors.Name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Auto Name <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Auto Name"
                            onChange={(e) => {
                              setFieldValue("Auto_Name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Auto_Name &&
                              touched.Auto_Name &&
                              errors.Auto_Name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Installment Start Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            placeholder="INS_Start_Date"
                            onChange={(e) => {
                              setFieldValue("INS_Start_Date", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.INS_Start_Date &&
                              touched.INS_Start_Date &&
                              errors.INS_Start_Date}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                          DC START DATE{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            placeholder="DC_START_DATE"
                            onChange={(e) => {
                              setFieldValue("DC_START_DATE", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.DC_START_DATE &&
                              touched.DC_START_DATE &&
                              errors.DC_START_DATE}
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
                            Unit Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Unit Type"
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
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                             Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Type"
                            options={options2}
                            onChange={(value) => {
                              setFieldValue("Type", value);
                            }}
                          />
                          <span className="error">
                            {errors.Type &&
                              touched.Type &&
                              errors.Type}
                          </span>
                        </div>
                      </div> */}

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Total Amount"
                            className="form-control"
                            type="text"
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
                            DC Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="DC Total Amount"
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("DC_TOTAL_AMOUNT", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.DC_TOTAL_AMOUNT &&
                              touched.DC_TOTAL_AMOUNT &&
                              errors.DC_TOTAL_AMOUNT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Advance Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Advance Amount"
                            className="form-control"
                            type="text"
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
                            Total Remaining Net Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Total Remaining Net Amount"
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue(
                                "TotalRemainNet_Amt",
                                e.target.value
                              );
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
                            Annual Charges{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Annual Charges"
                            className="form-control"
                            type="text"
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
                            Ballot Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            placeholder="Ballot Amount"
                            className="form-control"
                            type="text"
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
                            placeholder="Possession Amount"
                            className="form-control"
                            type="text"
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
                            Annual Time Period{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="Annual Time Period"
                            className="form-control"
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
                            placeholder="Installment Amount"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue(
                                "InstallmentAmount",
                                e.target.value
                              );
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
                          DC Installment Amount{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="DC Installment Amount"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue(
                                "DC_INSTALLMENT_AMOUNT",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.DC_INSTALLMENT_AMOUNT &&
                              touched.DC_INSTALLMENT_AMOUNT &&
                              errors.DC_INSTALLMENT_AMOUNT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            No of Installment{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="No of Installment"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue(
                                "No_Of_Installments",
                                e.target.value
                              );
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
                          DC No Of installment{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="DC No of Installment"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue(
                                "DC_NO_OF_INSTALLMENT",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.DC_NO_OF_INSTALLMENT &&
                              touched.DC_NO_OF_INSTALLMENT &&
                              errors.DC_NO_OF_INSTALLMENT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Plan Years <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="Plan Years"
                            className="form-control"
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
                            Status <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Status"
                            options={options}
                            onChange={(value) => {
                              setFieldValue("IsActive", value);
                            }}
                          />
                          <span className="error">
                            {errors.IsActive &&
                              touched.IsActive &&
                              errors.IsActive}
                          </span>
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
                          <div
                            class="spinner-border text-warning"
                            role="ByAnnual_TimePeriod"
                          >
                            <span class="sr-only">Loading...</span>
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
      {/* /Create PaymentPlan Modal */}
      {/* Edit PaymentPlan Modal */}
      <Modal show={isShowUpdateModal} dialogClassName="employee-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Payment Plan</h5>
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
              initialValues={packageInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.Name) {
                  errors.Name = "Name is required";
                }
                if (!values.Auto_Name) {
                  errors.Auto_Name = "Auto Name is required";
                }
                if (!values.INS_Start_Date) {
                  errors.INS_Start_Date = "Installment Start Date is required";
                }
                if (!values.PS_ID) {
                  errors.PS_ID = "Plot Size is required";
                }
                if (!values.UType_ID) {
                  errors.UType_ID = "Unit Type is required";
                }
                if (!values.DC_START_DATE) {
                  errors.DC_START_DATE = "DC START DATE is required";
                }
                if (!values.DC_NO_OF_INSTALLMENT) {
                  errors.DC_NO_OF_INSTALLMENT = "DC NO OF INSTALLMENT is required";
                }
                if (!values.DC_INSTALLMENT_AMOUNT) {
                  errors.DC_INSTALLMENT_AMOUNT = "DC INSTALLMENT AMOUNT is required";
                }
                if (!values.DC_TOTAL_AMOUNT) {
                  errors.DC_TOTAL_AMOUNT = "DC TOTAL AMOUNT is required";
                }

                if (!values.Total_Amt) {
                  errors.Total_Amt = "Total Amount is required";
                }

                if (!values.Advance_Amt) {
                  errors.Advance_Amt = "Advance Amount is required";
                }
                if (!values.TotalRemainNet_Amt) {
                  errors.TotalRemainNet_Amt =
                    "Total Remaining Net Amount is required";
                }
                if (!values.ByAnnual_Charges) {
                  errors.ByAnnual_Charges = "Annual Charges is required";
                }
                if (!values.Ballot_Amt) {
                  errors.Ballot_Amt = "Ballot Amount is required";
                }
                if (!values.Possession_Amt) {
                  errors.Possession_Amt = "Possession Amount is required";
                }
                if (!values.ByAnnual_TimePeriod) {
                  errors.ByAnnual_TimePeriod = "Annual Time Period is required";
                }
                if (!values.InstallmentAmount) {
                  errors.InstallmentAmount = "Installment Amount is required";
                }
                if (!values.No_Of_Installments) {
                  errors.No_Of_Installments = "No of Installments is required";
                }
                if (!values.Plan_Years) {
                  errors.Plan_Years = "Plan Years is required";
                }
                if (!values.IsActive) {
                  errors.IsActive = "Status is required";
                }
                console.log("nnnnnnnnnnn", errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  Name: values.Name,
                  Auto_Name: values.Auto_Name,
                  INS_Start_Date: values.INS_Start_Date,
                  PS_ID: values.PS_ID.value,
                  UType_ID: values.UType_ID.value,
                  Total_Amt: values.Total_Amt,
                  Advance_Amt: values.Advance_Amt,
                  DC_START_DATE: values.DC_START_DATE,
                  DC_NO_OF_INSTALLMENT: values.DC_NO_OF_INSTALLMENT,
                  DC_INSTALLMENT_AMOUNT: values.DC_INSTALLMENT_AMOUNT,
                  DC_TOTAL_AMOUNT: values.DC_TOTAL_AMOUNT,
                  TotalRemainNet_Amt: values.TotalRemainNet_Amt,
                  ByAnnual_Charges: values.ByAnnual_Charges,
                  Ballot_Amt: values.Ballot_Amt,
                  Possession_Amt: values.Possession_Amt,
                  ByAnnual_TimePeriod: values.ByAnnual_TimePeriod,
                  InstallmentAmount: values.InstallmentAmount,
                  No_Of_Installments: values.No_Of_Installments,
                  Plan_Years: values.Plan_Years,
                  IsActive: values.IsActive.value,
                  USER_ID: 1,
                };
                try {
                  setloading(true);
                  const res = await Axios.put(
                    baseApiUrl + `package/update?id=${query}`,
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllPackages();
                    toast.success(res.data.message);
                    setloading(false);
                    setIsShowUpdateModal(false);
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
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.Name}
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => {
                              setFieldValue("Name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Name && touched.Name && errors.Name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Auto Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.Auto_Name}
                            className="form-control"
                            type="text"
                            placeholder="Auto Name"
                            onChange={(e) => {
                              setFieldValue("Auto_Name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.Auto_Name &&
                              touched.Auto_Name &&
                              errors.Auto_Name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Installment Start Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.INS_Start_Date}
                            className="form-control"
                            type="date"
                            placeholder="Installment Start Date"
                            onChange={(e) => {
                              setFieldValue("INS_Start_Date", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.INS_Start_Date &&
                              touched.INS_Start_Date &&
                              errors.INS_Start_Date}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            DC Start Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.DC_START_DATE}
                            className="form-control"
                            type="date"
                            placeholder="DC Start Date"
                            onChange={(e) => {
                              setFieldValue("DC_START_DATE", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.DC_START_DATE &&
                              touched.DC_START_DATE &&
                              errors.DC_START_DATE}
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
                            Unit Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Unit Type"
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
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                             Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Type"
                            value={values.Type}
                            options={options2}
                            onChange={(value) => {
                              setFieldValue("Type", value);
                            }}
                          />
                          <span className="error">
                            {errors.Type &&
                              touched.Type &&
                              errors.Type}
                          </span>
                        </div>
                      </div> */}

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.Total_Amt}
                            placeholder="Total Amount"
                            className="form-control"
                            type="text"
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
                           DC Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.DC_TOTAL_AMOUNT}
                            placeholder="DC Total Amount"
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("DC_TOTAL_AMOUNT", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.DC_TOTAL_AMOUNT &&
                              touched.DC_TOTAL_AMOUNT &&
                              errors.DC_TOTAL_AMOUNT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Advance Total Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.Advance_Amt}
                            placeholder="Advance Total Amount"
                            className="form-control"
                            type="text"
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
                            Total Remaining Net Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.TotalRemainNet_Amt}
                            placeholder="Total Remaining Net Amount"
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue(
                                "TotalRemainNet_Amt",
                                e.target.value
                              );
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
                            Annual Charges{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.ByAnnual_Charges}
                            placeholder="Annual Charges"
                            className="form-control"
                            type="text"
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
                            Ballot Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            value={values.Ballot_Amt}
                            placeholder="Ballot Amount"
                            className="form-control"
                            type="text"
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
                            placeholder="Possession Amount"
                            className="form-control"
                            type="text"
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
                            Annual Time Period{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="Annual Time Period"
                            className="form-control"
                            value={values.ByAnnual_TimePeriod}
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
                            placeholder="Installment Amount"
                            className="form-control"
                            value={values.InstallmentAmount}
                            onChange={(e) => {
                              setFieldValue(
                                "InstallmentAmount",
                                e.target.value
                              );
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
                            DC Installment Amount{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="DC Installment Amount"
                            className="form-control"
                            value={values.DC_INSTALLMENT_AMOUNT}
                            onChange={(e) => {
                              setFieldValue(
                                "DC_INSTALLMENT_AMOUNT",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.DC_INSTALLMENT_AMOUNT &&
                              touched.DC_INSTALLMENT_AMOUNT &&
                              errors.DC_INSTALLMENT_AMOUNT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            No of Installment{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="No of Installment"
                            className="form-control"
                            value={values.No_Of_Installments}
                            onChange={(e) => {
                              setFieldValue(
                                "No_Of_Installments",
                                e.target.value
                              );
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
                            DC No of Installment{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="DC No of Installment"
                            className="form-control"
                            value={values.DC_NO_OF_INSTALLMENT}
                            onChange={(e) => {
                              setFieldValue(
                                "DC_NO_OF_INSTALLMENT",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.DC_NO_OF_INSTALLMENT &&
                              touched.DC_NO_OF_INSTALLMENT &&
                              errors.DC_NO_OF_INSTALLMENT}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Plan Years <span className="text-danger">*</span>
                          </label>

                          <input
                            placeholder="Plan Years"
                            className="form-control"
                            value={values.Plan_Years}
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
                            Status <span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Status"
                            options={options}
                            value={values.IsActive}
                            onChange={(value) => {
                              setFieldValue("IsActive", value);
                            }}
                          />
                          <span className="error">
                            {errors.IsActive &&
                              touched.IsActive &&
                              errors.IsActive}
                          </span>
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
                          <div
                            class="spinner-border text-warning"
                            role="ByAnnual_TimePeriod"
                          >
                            <span class="sr-only">Loading...</span>
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
      {/* /Edit Payment Plan Modal */}
      {/* Delete Payment Plan Modal */}
      <div className="modal custom-modal fade" id="delete_member" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Payment Plan</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary w-100 continue-btn"
                      data-bs-dismiss="modal"
                      type="submit"
                      onClick={() => deletePackageById(query)}
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
      {/* /Delete Payment Plan Modal */}
    </div>
  );
};

export default PaymentPlan;
