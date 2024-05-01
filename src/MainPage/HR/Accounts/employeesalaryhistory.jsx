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

const employeesalaryhistory = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [
    isShowEmployeeSalaryHistoryModal,
    setIsShowEmployeeSalaryHistoryModal,
  ] = useState(false);
  const [
    isEditEmployeeSalaryHistoryModal,
    setIsEditEmployeeSalaryHistoryModal,
  ] = useState(false);
  const [query, setQuery] = useState("");
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );
  const [
    employeeSalaryHistoryInitialValues,
    setEmployeeSalaryHistoryInitialValues,
  ] = useState({
    employeeId: "",
    salary: "",
    fullName: "",
  });

  const getAllEmployeeSalary = () => {
    Axios.get(baseApiUrl + "employeeSalaryHisory/list")
      .then((res) => {
        if (res.data?.EmployeeSalaryHistory) {
          setEmployeeSalary(res.data?.EmployeeSalaryHistory);
          setTotalPage(res.data.totalPage);
          // res.data?.data?.map((item) => {
          //   setCategoryList((prev) => [
          //     ...prev,
          //     { label: item.title, value: item.id },
          //   ]);
          // });
          // console.log("hjvhvkhvhk", res.data?.data);
          toast.success(res.data.Message);
        } else {
          setEmployeeSalary([]);
          toast.success(res.data.Message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const deleteEmployeeSalaryHistoryById = (id) => {
    Axios.delete(baseApiUrl + `employeeSalaryHisory/delete?id=${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          getAllEmployeeSalary();
          toast.success(res.data.Message);
        } else {
          toast.success(res.data.Message);
        }

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

  };

  useEffect(() => {
    getAllEmployeeSalary();
    // getAllSetting();
  }, []);

  const columns = [
    {
      title: "Serial #",
      dataIndex: "id",
      // render: () => ++serial,
    },
    {
      title: "Employee Id",
      dataIndex: "employeeId",
      
    },
    {
      title: "Employee Name",
      dataIndex: "Employee",
      render: (text, record) => {
        // console.log(text," dfgsdfg ",record)
        return <span>{text?.fullName}</span>;
      },
      sorter: (a, b) => a.Employee.length - b.Employee.length,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      // render: (text, record) => {
      //     // console.log(text," dfgsdfg ",record)
      //     return <span>{text?.type}</span>;
      //   },
      sorter: (a, b) => a.salary.length - b.salary.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      //   render: (text, record) => {
      //     // console.log(text, text.title);
      //     return <span>{text?.title}</span>;
      //   },
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Month",
      dataIndex: "month",
      //   render: (text, record) => {
      //     // console.log(text, text.title);
      //     return <span>{text?.title}</span>;
      //   },
      sorter: (a, b) => a.month.length - b.month.length,
    },

    {
      title: "Action",
      render: (text, record) => {
        // console.log("ggggggggggggggggggg",text)
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
                  setQuery(text.id);
                  setIsEditEmployeeSalaryHistoryModal(true);
                  setEmployeeSalaryHistoryInitialValues({
                    employeeId: "",
                    salary: "",

                    ...text,
                   
                    // categoryId:  categoryId.find(item => item.label === text?.Category?.title),
                    // categoryId: categoryList.find(item => item.value === text?.title)
                    // employeeId: settings.find(
                    //   (item) => item.label === text?.title
                    // ),
                    // salary: option1.find((item) => item.label === text?.salary),
                  });

                  // console.log("function Status",employeeSalary.find((item) => item.label === text?.fullName)
                  //   )
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
                  setQuery(text.id);
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
              <h3 className="page-title">Employee Salary History</h3>
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
                onClick={() => setIsShowEmployeeSalaryHistoryModal(true)}
              >
                <i className="fa fa-plus" />
                Create Account Setting
              </p>
            </div> */}
          </div>
        </div>
        {/* /Page Header */}
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
              // onChange={handleTableChange}
              size="middle"
              // dataSource={filterTable == null ? booking : filterTable}
              dataSource={employeeSalary}
              scroll={{ x: "max-content" }}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>

      {/* {create Eployee Salary} */}
      <Modal show={isShowEmployeeSalaryHistoryModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Employee Salary History</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsShowEmployeeSalaryHistoryModal(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={employeeSalaryHistoryInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.employeeId) {
                  errors.employeeId = "EmployeeId is required";
                }
                if (!values.salary) {
                  errors.salary = "Salary is required";
                }
                

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  employeeId: values.employeeId,
                  salary: values.salary,
      
                };
                try {
                  setLoading(true);
                  const res = await Axios.post(
                    baseApiUrl + "employeeSalaryHisory/add",
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllEmployeeSalary();
                    toast.success(res.data.message);
                    setLoading(false);
                    setIsShowEmployeeSalaryHistoryModal(false);
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
                isValid,
              
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Employee Id
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            onChange={(e) => {
                              setFieldValue("employeeId", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.employeeId &&
                              touched.employeeId &&
                              errors.employeeId}
                          </span>
                        </div>
                      </div>
                     
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Salary
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Salary"
                            onChange={(e) => {
                              setFieldValue("salary", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.salary && touched.salary && errors.salary}
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
      {/* {Create Employee Salary} */}

      {/* {Edit Employee Salary} */}

      <Modal show={isEditEmployeeSalaryHistoryModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee Salary History</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsEditEmployeeSalaryHistoryModal(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={employeeSalaryHistoryInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.employeeId) {
                  errors.employeeId = "EmployeeId is required";
                }
                if (!values.salary) {
                  errors.salary = "Salary is required";
                }
                 

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = {
                  employeeId: values.employeeId,
                  salary: values.salary,
               
                };
                try {
                  setLoading(true);
                  const res = await Axios.put(
                    baseApiUrl + `employeeSalaryHisory/update?id=${query}`,
                    formData
                  );

                  getAllEmployeeSalary();
                  toast.success(res.data.message);
                  setIsEditEmployeeSalaryHistoryModal(false);
                  setLoading(false);
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
                isValid,
                /* and other goodies */
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Employee Id
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            value={values.employeeId}
                            type="text"
                            placeholder="Employee ID"
                            onChange={(e) => {
                              setFieldValue("employeeId", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.employeeId &&
                              touched.employeeId &&
                              errors.employeeId}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Salary
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            value={values.salary}
                            className="form-control"
                            type="text"
                            placeholder="Enter Salary"
                            onChange={(e) => {
                              setFieldValue("salary", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.salary && touched.salary && errors.salary}
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

      {/* {Edit Employee Salary} */}

      {/* Delete  block Modal */}
      <div className="modal custom-modal fade" id="delete_member" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Employee Salary History</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary w-100 continue-btn"
                      data-bs-dismiss="modal"
                      type="submit"
                      onClick={() => deleteEmployeeSalaryHistoryById(query)}
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
      {/* /Delete  block Modal */}
    </div>
  );
};

export default employeesalaryhistory;
