import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {Table} from 'antd';
import 'antd/dist/antd.css';
import {itemRender, onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import * as yup from "yup";
import Axios from "axios";
import {Field, Formik} from 'formik';
import {InputText} from '../../../_components/fields/InputText';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from "react-bootstrap";

const LeaveEmployee = () => {
    const [isShowProjectModal, setIsShowProjectModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [activeUser, setActiveUser] = useState([]);
    const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/user/");
    let object = JSON.parse(localStorage.getItem('user'));
    // console.log(object)
    const [initialValues, setInitialValues] = useState({
        employeeId: '',
        status: 'new',
        reason: '',
        startDate: '',
        endDate: '',
    });
    const [optionList, setOptionList] = useState([]);
    const leaveFormValidation = yup.object().shape({
        reason: yup.string().required("Reason is required"),
        startDate: yup.string().required("Start Date is required"),
        endDate: yup.string().required("End Date is required"),
    });
    const getActiveEmployee = () => {
        Axios.get(baseApiUrl + `leave/employee/id?id=${object.employee.id}`)
            .then((res) => {
                setActiveUser(res.data.leave);
                // console.log(res.data.Sector)
            });
    };
    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
        getActiveEmployee();
    }, []);


    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'employeeId',
            render: (text, record) => {
                // console.log(record, "8z8888888888888888888")
                return (
                    <span>{record.employee ? record.employee.fullName : "No Name"}</span>
                )
            },
            // sorter: (a, b) => a.employeeId.length - b.employeeId.length,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            // sorter: (a, b) => a.reason.length - b.reason.length,
        },
        {
            title: 'Comment',
            dataIndex: 'adminComment',
            render: (text, record) => {
                // console.log(text, record);
                return (
                    <span>{text ? text : record.hrComment}</span>
                )
            },
            // sorter: (a, b) => a.reason.length - b.reason.length,
        },
        {
            title: 'Updated By',
            dataIndex: 'user',
            render: (text, record) => (
                <span>{text?.name}</span>
            ),
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            // sorter: (a, b) => a.startDate.length - b.startDate.length,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            // sorter: (a, b) => a.endDate.length - b.endDate.length,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            // sorter: (a, b) => a.status.length - b.status.length,
            render: (text, record) => (
                <div className="action-label text-center">
                    <a className="btn btn-white btn-sm btn-rounded">
                        <i className={text === "New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
                            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success"
                                : "fa fa-dot-circle-o text-danger"}/> {text}
                    </a>
                </div>
            ),
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
                <title>Leaves - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">

                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Leaves</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Leaves</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ml-auto">
                            <p
                                href="#"
                                className="btn add-btn"
                                onClick={() => setIsShowProjectModal(true)}
                            >
                                <i className="fa fa-plus"/>Add Leave
                            </p>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                {/* Leave Statistics */}
                {/* <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Annual Leave</h6>
              <h4>12</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Medical Leave</h6>
              <h4>3</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Other Leave</h6>
              <h4>4</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Remaining Leave</h6>
              <h4>5</h4>
            </div>
          </div>
        </div> */}
                {/* /Leave Statistics */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Table className="table-striped"
                                   pagination={{
                                       total: activeUser?.length,
                                       showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                       showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                   }}
                                   style={{overflowX: 'auto'}}
                                   columns={columns}
                                // bordered
                                   dataSource={activeUser}
                                   rowKey={record => record?.id}
                                // onChange={console.log("change")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Leave Modal */}
            <Modal show={isShowProjectModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Leave</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                                setIsShowProjectModal(false)
                            }}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <Formik
                            validationSchema={leaveFormValidation}
                            initialValues={initialValues}
                            // onSubmit={addLeaves}
                            // enableReinitialize
                            onSubmit={async (values, {setSubmitting}) => {
                                const formData = {
                                    employeeId: object.employee.id,
                                    status: "new",
                                    reason: values.reason,
                                    startDate: values.startDate,
                                    endDate: values.endDate,
                                };
                                try {
                                    setloading(true);
                                    const res = await Axios.post(
                                        baseApiUrl + "leave/add", formData
                                    );
                                    if (res.data.status == 200) {
                                        getActiveEmployee();
                                        setloading(false);
                                        toast.success(res.data.message);
                                        setIsShowProjectModal(false);
                                    }
                                } catch (err) {
                                    setloading(false);
                                    toast.error(err.response.data.message);
                                    // console.log(err.response.data);
                                }
                            }}
                        >
                            {({handleSubmit, errors, values, isValid, touched, setFieldValue}) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Start Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        onChange={(e) => {
                                                            setFieldValue("startDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.startDate && touched.startDate && (
                                                        <span className="text-danger text-sm">
                                {errors.startDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        End Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        onChange={(e) => {
                                                            setFieldValue("endDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.endDate && touched.endDate && (
                                                        <span className="text-danger text-sm">
                                {errors.endDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>
                                                        Reason <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control h-50" rows="5"
                                                        onChange={(e) => {
                                                            setFieldValue("reason", e.target.value);
                                                        }}
                                                    ></textarea>
                                                    {errors.reason && touched.reason && (
                                                        <span className="text-danger text-sm">
                                {errors.reason}
                              </span>
                                                    )}
                                                </div>
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
                                                    <div className="spinner-border text-warning" role="status">
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

        </div>
    );
}

export default LeaveEmployee;
