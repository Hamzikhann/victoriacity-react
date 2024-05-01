/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Field, Formik } from "formik";
import { Table } from 'antd';
import * as yup from "yup";
import Select from 'react-select'
import { InputText } from '../../../_components/fields/InputText';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css";
import Axios from "axios";
import { format } from 'date-fns'
// import EmployeeForm from '../../../_components/modelbox/EmployeeForm';
import ActionForm from '../../../_components/modelbox/ActionForm'
import { DateDropField } from '../../../_components/fields/DateDropField';

const AppliedCandidate = () => {
  const [data, setData] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [baseApiUrl, setBaseApiUrl] = useState(baseApiUrl + "/api/user/");
  const [selectedCandId, setSelectedCandId] = useState(0);
  const [selectedType, setSelectedType] = useState('Interview Called');
  const [interviewDate, setInterviewDate] = useState('');
  const [offerSalary, setOffer] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewDesc, setInterviewDesc] = useState('');
  const [isStatusModalShow, setIsStatusModalShow] = useState(false);
  const [isShowEmployeeModal, setIsShowEmployeeModal] = useState(false);
  const [isActionStatusModalShow, setIsActionStatusModalShow] = useState(false);
  const [object, setObject] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    cnic: "",
    phone: "",
    email: "",
    maritalStatus: "",
    address: "",
    employeeId: "",
    designation: "",
    departments: "",
    work_location: "",
    dateOfJoining: "",
    basicSalary: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactAddress: "",
    gender: "",
    picture: "",
    experience: "",
    current_salary: "",
    expected_salary: "",
    cover_letter: "",
    projects: "",
    cv: "",
    branch: "",
  })
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [projects, setProjects] = useState([]);

  const FormValidation = yup.object().shape({
    fullName: yup.string().required("fullName is required"),
    fatherName: yup.string().required("fatherName is required"),
    dob: yup.string().required("dob is required"),
    cnic: yup.string().required("cnic is required"),
    // phone: yup.string().required("phone Type is required"),
    email: yup.string().required("email is required"),
    // maritalStatus: yup.string().required("maritalStatus is required"),
    // employeeId: yup.string().required("employeeId is required"),
    // designation: yup.string().required("designation is required"),
    // departments: yup.string().required("departments is required"),
    // work_location: yup.string().required("work_location is required"),
    // dateOfJoining: yup.string().required("dateOfJoining is required"),
    // basicSalary: yup.string().required("basicSalary is required"),
    // emergencyContactName: yup.string().required("emergencyContactName is required"),
    // emergencyContactNumber: yup.string().required("emergencyContactNumber is required"),
    // emergencyContactAddress: yup.string().required("emergencyContactAddress is required"),
    // gender: yup.string().required("gender is required"),
    // picture: yup.string().required("picture is required"),
    // work_location: yup.string().required("work_location is required"),
    // dateOfJoining: yup.string().required("dateOfJoining is required"),
    // basicSalary: yup.string().required("basicSalary  is required"),
    // experience: yup.string().required("experience is required"),
    // current_salary: yup.string().required("current_salary is required"),
    // expected_salary: yup.string().required("expected_salary is required"),
    // branch: yup.string().required("branch is required"),
  });

  const getAllDepartments = () => {
    Axios.get(baseApiUrl + "department/active/list").then((res) => {
      setDepartments(res.data.departments);
    });
    // .catch((err) => console.log(err.response.data));
  };

  const getAllDesignations = () => {
    Axios.get(baseApiUrl + "designation/active/list").then((res) => {
      setDesignations(res.data.designations);
    });
    // .catch((err) => console.log(err.response.data));
  };

  const getAllProjects = () => {
    Axios.get(baseApiUrl + "project/list").then((res) => {
      // console.log(res.data.project);
      setProjects(res.data.project);
    });
    // .catch((err) => console.log(err.response.data));
  };
  const jobId = window.location.href.split('/').pop();

  const getAllJobCandidates = () => {
    Axios.get(baseApiUrl + "job/candidates/job/list?jobId=" + jobId)
      .then(async (res) => {
        setData(res.data.job_candidates);
        // console.log("JOID",data)
        setObject(res.data.job_candidates[0])
        console.log("data ", res.data.job_candidates[0].id);
      })

  };

  const statusChange = (statusVal) => {
    const formData = { jobId: jobId, status: statusVal, candId: selectedCandId, offerSalary: offerSalary };
    Axios.put(baseApiUrl + "/job/candidates/status/called/update", formData)
      .then((res) => {
        setIsStatusModalShow(false);
        getAllJobCandidates();
        // setData(res.data.job_candidates);
        // console.log(res.data.job_candidates);
      })

  };

  const statusChangeInterviewSchedule = (statusVal) => {
    const formData = { jobId: jobId, status: statusVal, interviewDate: interviewDate, interviewTime: interviewTime, interviewDesc: interviewDesc, candId: selectedCandId, offerSalary: offerSalary };
    Axios.put(baseApiUrl + "/job/candidates/status/update", formData)
      .then((res) => {
        setIsActionStatusModalShow(false);
        getAllJobCandidates();
        // setData(res.data.job_candidates);
        // console.log(res.data.job_candidates);
      })

    Axios.put(baseApiUrl + "/job/candidates/status/called/update", formData)
      .then((res) => {
        setIsStatusModalShow(false);
        getAllJobCandidates();
        // setData(res.data.job_candidates);
        // console.log(res.data.job_candidates);
      })

  };
  const addEmployee = (value) => {
    const formData = {
      fullName: value.fullName,
      fatherName: value.fatherName,
      dob: value.dob,
      cnic: value.cnic,
      contact: value.contact,
      email: value.email,
      maritalStatus: value.maritalStatus,
      address: value.address,
      employeeId: value.employeeId,
      designation: value.designation,
      department: value.departments,
      work_location: value.work_location,
      dateOfJoining: value.dateOfJoining,
      basicSalary: value.basicSalary,
      emergencyContactName: value.emergencyContactName,
      relationship: value.relationship,
      emergencyContactNumber: value.emergencyContactNumber,
      emergencyContactAddress: value.emergencyContactNumber,
      gender: value.gender,
      status: "active",
      leaveId: "1",
      candidateId: "1",
      branch: value.branch,

      projects: value.projects,

    };
    Axios.post(baseApiUrl + "employee/add", formData)
      .then((res) => {

        setApplyModalShow(false);
        setFormSubmitted(true);
        setIsShowEmployeeModal(false);

        setInitialValues({
          fullName: "",
          fatherName: "",
          dob: "",
          cnic: "",
          contact: "",
          email: "",
          maritalStatus: "",
          address: "",
          employeeId: "",
          designation: "",
          departments: "",
          work_location: "",
          dateOfJoining: "",
          basicSalary: "",
          emergencyContactName: "",
          emergencyContactNumber: "",
          emergencyContactAddress: "",
          picture: "",
          experience: "",
          current_salary: "",
          expected_salary: "",
          cover_letter: "",
          projects: "",
          cv: "",
          gender: "",
          branch: ""
        })


      })
      .catch((err) => console.log(err.response.data));


  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      // render: (text, record) => (
      //   <span>{record.id.length}</span>
      // ),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: 'Apply Date',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.applydate.length - b.applydate.length,
      render: (text, record) =>
        (<span> {format(new Date(text), 'dd MMM y')} </span>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="dropdown action-label">
          <a className="btn btn-white btn-sm btn-rounded dropdown-toggle1" href="" data-bs-toggle="dropdown" aria-expanded="false">
            <i className={text === "New" ? "fa fa-dot-circle-o text-info" : text === "Hired" ?
              "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"} /> {text}
          </a>
          {/* <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> New</a>
              <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Hired</a>
              <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Rejected</a>
              <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Interviewed</a>
            </div> */}
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Resume',
      dataIndex: 'resume',
      render: (text, record) => (
        <a href={process.env.REACT_APP_API_URL + '/uploads/' + text} target="_blank" className="btn btn-sm btn-primary" download="download"><i className="fa fa-download" /> Download</a>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-item" style={{ display: "flex", flexDirection: "column", background: "#ffffff", }}>

              {record && record.status == 'New' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Interview Called');
                setIsStatusModalShow(true);
              }}>
                <i className="fa fa-clock-o m-r-5" > Mark as Interview Called</i>
              </a>}

              {record && record.status == 'Interview Called' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Interview Scheduled');
                setIsActionStatusModalShow(true)
              }} >
                <i className="fa fa-clock-o m-r-5" > Schedule Interview</i>
              </a>}

              {record && record.status == 'Interview Scheduled' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Short Listed');
                setIsStatusModalShow(true);
              }}>
                <i className="fa fa-clock-o m-r-5"  > Mark as Short List</i>
              </a>}

              {record && record.status == 'Short Listed' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Called For Offer');
                setIsStatusModalShow(true);
              }}>
                <i className="fa fa-clock-o m-r-5" > Mark as Offer Called</i>
              </a>}

              {record && record.status == 'Called For Offer' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Offer Sent');
                setIsActionStatusModalShow(true);
              }}>
                <i className="fa fa-clock-o m-r-5" > Send Offer</i>
              </a>}

              {record && record.status == 'Offer Sent' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Offer Accepted');
                setIsStatusModalShow(true);
              }}>
                <i className="fa fa-clock-o m-r-5" > Accept Offer</i>
              </a>}

              {record && record.status == 'Offer Accepted' && <a onClick={() => {
                setSelectedCandId(record.id);
                setSelectedType('Hired');
                setIsShowEmployeeModal(true)
              }}>
                <Link
                  to="/"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#employee_add_modal"
                  onClick={() => {
                    setInitialValues({
                      fullName: "",
                      father_name: "",
                      dob: "",
                      cnic: "",
                      contact: "",
                      email: "",
                      maritalStatus: "",
                      address: "",
                      employeeId: "",
                      designation: "",
                      departments: "",
                      work_location: "",
                      joining_date: "",
                      basicSalary: "",
                      emergencyContactName: "",
                      emergencyContactNumber: "",
                      emergencyContactAddress: "",
                      picture: "",
                      experience: "",
                      current_salary: "",
                      expected_salary: "",
                      cover_letter: "",
                      projects: "",
                      cv: "",
                      gender: "",
                      branch: "",
                      ...initialValues,
                    })
                  }}>
                  <i className="fa fa-clock-o m-r-5" > Create Employee Record</i>
                </Link>

              </a>}

              {/* <a>
                <i className="fa fa-clock-o m-r-5" data-bs-toggle="modal"
                  data-bs-target='#Employee_Form'>Employee Record</i>
              </a> */}
            </div>

            {/* <EmployeeForm /> */}
          </div>
          <ActionForm submitForm={statusChangeInterviewSchedule}
            isStatusModalShow={isStatusModalShow}
            setIsStatusModalShow={setIsStatusModalShow}
            setIsActionStatusModalShow={setIsActionStatusModalShow}
            isActionStatusModalShow={isActionStatusModalShow}
            confirmYes={statusChange} setInterviewDate={setInterviewDate}
            setOffer={setOffer}
            selectedType={selectedType}
            setInterviewTime={setInterviewTime} setInterviewDesc={setInterviewDesc}
          />
          {/* <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-item" style={{ display: "flex", flexDirection: "column", background: "#ffffff", }}>
              <Link to="/">
                <i className="fa fa-clock-o m-r-5" data-bs-toggle="modal"
                  data-bs-target="#employee_add_modal"  > Employee Record </i>
              </Link>
            </div>
          </div> */}
          {/* <EmployeeForm isShowEmployeeModal={isShowEmployeeModal} object={object} setIsShowEmployeeModal={setIsShowEmployeeModal} /> */}
        </div>
      ),
    }

  ]

  useEffect(() => {
    getAllJobCandidates();
    getAllDepartments();
    getAllDesignations();
    getAllProjects();
  }, []);

  return (

    <div className="page-wrapper">
      <Helmet>
        <title>Jobs Applicants - Sheranwala Developers</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Job Applicants</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Job Applicants</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table className="table-striped"
                pagination={{
                  total: data.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={record => record.id}
              // onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      <div id="employee_add_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                validationSchema={FormValidation}
                initialValues={initialValues}

                onSubmit={addEmployee}
                enableReinitialize={true}
              >
                {({ handleSubmit, errors, values, isValid, touched, setFieldValue }) => {
                  return (
                    <form >
                      <div className="row">
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <span className="text-lg border-bottom border-2 border-dark mb-3">
                              Personal Information:{" "}
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label> Upload Photo </label>
                            <input
                              className="form-control"
                              accept="image/*"
                              type="file"
                              name="picture"
                              onChange={(evt) => {
                                setFieldValue("picture", "");
                                var tgt = evt.target || window.event.srcElement,
                                  files = tgt.files;
                                if (FileReader && files && files.length) {
                                  var fr = new FileReader();
                                  fr.onload = function () {
                                    var base64 = fr.result;
                                    setFieldValue("picture", base64);
                                  };
                                  fr.readAsDataURL(files[0]);
                                }
                              }}
                            />
                          </div>

                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Branch *</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("branch", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.branch &&
                                touched.branch &&
                                errors.branch}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Gender *</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("gender", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.gender &&
                                touched.gender &&
                                errors.gender}
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label className="col-form-label">Full Name *</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("fullName", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.fullName &&
                                touched.fullName &&
                                errors.fullName}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Father Name *</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("fatherName", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.fatherName &&
                                touched.fatherName &&
                                errors.fatherName}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Date of Birth *
                            </label>
                            <div>
                              <input
                                className="form-control datetimepicker"
                                type="date"
                                onChange={(e) => {
                                  setFieldValue("dob", e.target.value);
                                }}
                              />
                              <span className="error">
                                {errors.dob && touched.dob && errors.dob}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">CNIC# *</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("cnic", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.cnic && touched.cnic && errors.cnic}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Contact Number</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("contact", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.contact && touched.contact && errors.contact}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Email *</label>
                            <input
                              className="form-control"
                              type="email"
                              onChange={(e) => {
                                setFieldValue("email", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.email && touched.email && errors.email}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Martial Status *
                            </label>
                            <br />
                            <input
                              className="form-control1"
                              type="radio"
                              name="maritalStatus"
                              value="y"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("maritalStatus", "Y");
                                }
                              }}
                            />{" "}
                            Married &nbsp;
                            <input
                              className="form-control1"
                              type="radio"
                              name="maritalStatus"
                              value="n"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("maritalStatus", "N");
                                }
                              }}
                            />{" "}
                            Single
                            <br />
                            <span className="error">
                              {errors.maritalStatus &&
                                touched.maritalStatus &&
                                errors.maritalStatus}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Residential Address
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue(
                                  "address",
                                  e.target.value
                                );
                              }}
                            />
                            <span className="error">
                              {errors.address &&
                                touched.address &&
                                errors.address}
                            </span>
                          </div>
                        </div>
                        <span className="text-lg border-bottom border-2 border-dark mb-3">
                          Employee Job Details:{" "}
                        </span>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Employee ID:</label>
                            <input
                              className="form-control"
                              type="text"
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
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Current Designation *
                            </label>

                            <Field
                              as="select"
                              className="form-control"
                              name="designation"
                            >
                              <option value="">-</option>
                              {designations &&
                                designations.map((item) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                            </Field>

                            <span className="error">
                              {errors.designation &&
                                touched.designation &&
                                errors.designation}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Department *</label>
                            <Field
                              as="select"
                              className="form-control"
                              name="departments"
                            >
                              <option value="">-</option>
                              {departments &&
                                departments.map((item) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                            </Field>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Work Location</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("work_location", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Date of Joining *
                            </label>
                            <input
                              className="form-control datetimepicker"
                              type="date"

                              onChange={(e) => {
                                setFieldValue("dateOfJoining", e.target.value);
                              }}
                            />

                            <span className="error">
                              {errors.dateOfJoining &&
                                touched.dateOfJoining &&
                                errors.dateOfJoining}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Basic Salary *</label>
                            <input
                              className="form-control"
                              type="text"

                              onChange={(e) => {
                                setFieldValue("basicSalary", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.basicSalary &&
                                touched.basicSalary &&
                                errors.basicSalary}
                            </span>
                          </div>
                        </div>
                        <span className="text-lg border-bottom border-2 border-dark mb-3">
                          Emergency Contact Information:{" "}
                        </span>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Name</label>
                            <input
                              className="form-control"
                              type="text"
                              // value={props.object.firstName}

                              onChange={(e) => {
                                setFieldValue("emergencyContactName", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Relationship</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("relationship", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Cell Number</label>
                            <input
                              className="form-control"
                              type="text"

                              onChange={(e) => {
                                setFieldValue("emergencyContactNumber", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Address</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setFieldValue("emergencyContactAddress", e.target.value);
                              }}
                            />
                          </div>
                        </div>

                      </div>
                      <div className="submit-section">
                        <button onClick={handleSubmit}
                          data-bs-dismiss="modal"
                          disabled={!isValid}
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>


      {/* <div id="employee_add_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Employee Record</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">

              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  const errors = {};
                //   if (!values.email) {
                //     errors.email = "Email is required";
                //   } else if (
                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //   ) {
                //     errors.email = "Invalid email address";
                //   }
                //   if (!values.full_name) {
                //     errors.full_name = "Full Name is required";
                //   }
                //   if (!values.father_name) {
                //     errors.father_name = "Father Name is required";
                //   }
                //   if (!values.cnic) {
                //     errors.cnic = "CNIC is required";
                //   }
                //   if (!values.basic_salary) {
                //     errors.basic_salary = "Basic Salary is required";
                //   }
                //   if (!values.designation) {
                //     errors.designation = "Designation is required";
                //   }
                //   if (!values.is_married) {
                //     errors.is_married = "Marital Status is required";
                //   }
                //   if (!values.joining_date) {
                //     errors.joining_date = "Date of Joining is required";
                //   }
                //   if (!values.phone) {
                //     errors.phone = "Contact Number is required";
                //   }
                //   if (!values.dob) {
                //     errors.dob = "DOB is required";
                //   }
                //   if (!values.expected_salary) {
                //     errors.expected_salary = "Expected Salary is required";
                //   }
                //   if (!values.cover_letter) {
                //     errors.cover_letter = "Cover Letter is required";
                //   }
                //   if (!values.cv) {
                //     errors.cv = "CV is required";
                //   }
                //   if (!values.experience) {
                //     errors.experience = "Experience is required";
                //   }

                  //   return errors;
                }}
                onSubmit={addEmployee}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  field,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <form >
                    <div className="row">
                      <div className="col-sm-6 ">
                        <div className="form-group">
                          <span className="text-lg border-bottom border-2 border-dark mb-3">
                            Personal Information:{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label> Upload Photo </label>
                          <input
                            className="form-control"
                            accept="image/*"
                            type="file"
                            name="picture"
                            onChange={(evt) => {
                              setFieldValue("picture", "");
                              var tgt = evt.target || window.event.srcElement,
                                files = tgt.files;
                              if (FileReader && files && files.length) {
                                var fr = new FileReader();
                                fr.onload = function () {
                                  var base64 = fr.result;
                                  setFieldValue("picture", base64);
                                };
                                fr.readAsDataURL(files[0]);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-group">
                          <label className="col-form-label">Full Name *</label>
                          <input
                            className="form-control"
                            type="text"
                            value={values.full_name}
                            onChange={(e) => {
                              setFieldValue("full_name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.full_name &&
                              touched.full_name &&
                              errors.full_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Father Name *</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("father_name", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.father_name &&
                              touched.father_name &&
                              errors.father_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date of Birth *
                          </label>
                          <div>
                            <input
                              className="form-control datetimepicker"
                              type="date"
                              onChange={(e) => {
                                setFieldValue("dob", e.target.value);
                              }}
                            />
                            <span className="error">
                              {errors.dob && touched.dob && errors.dob}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">CNIC# *</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("cnic", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.cnic && touched.cnic && errors.cnic}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Contact Number</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("phone", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.phone && touched.phone && errors.phone}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Email *</label>
                          <input
                            className="form-control"
                            type="email"
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Martial Status *
                          </label>
                          <br />
                          <input
                            className="form-control1"
                            type="radio"
                            name="is_married"
                            value="y"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("is_married", "Y");
                              }
                            }}
                          />{" "}
                          Married &nbsp;
                          <input
                            className="form-control1"
                            type="radio"
                            name="is_married"
                            value="n"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("is_married", "N");
                              }
                            }}
                          />{" "}
                          Single
                          <br />
                          <span className="error">
                            {errors.is_married &&
                              touched.is_married &&
                              errors.is_married}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Residential Address
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue(
                                "address",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg border-bottom border-2 border-dark mb-3">
                        Employee Job Details:{" "}
                      </span>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Employee ID:</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("employee_id", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.employee_id &&
                              touched.employee_id &&
                              errors.employee_id}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Current Designation *
                          </label>

                          <Field
                            as="select"
                            className="form-control"
                            name="designation"
                          >
                            <option value="">-</option>
                            {designations &&
                              designations.map((item) => (
                                <option value={item.id}>{item.title}</option>
                              ))}
                          </Field>

                          <span className="error">
                            {errors.designation &&
                              touched.designation &&
                              errors.designation}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Department *</label>
                          <Field
                            as="select"
                            className="form-control"
                            name="departments"
                          >
                            <option value="">-</option>
                            {departments &&
                              departments.map((item) => (
                                <option value={item.id}>{item.title}</option>
                              ))}
                          </Field>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Projects *</label>
                          <input className="form-control" type="text" />
                          <Field
                            as="select"
                            className="form-control"
                            name="projects"
                          >
                            <option value="">-</option>
                            {projects &&
                              projects.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                          </Field>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Work Location</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("work_location", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date of Joining *
                          </label>
                          <input
                            className="form-control datetimepicker"
                            type="date"

                            onChange={(e) => {
                              setFieldValue("joining_date", e.target.value);
                            }}
                          />

                          <span className="error">
                            {errors.joining_date &&
                              touched.joining_date &&
                              errors.joining_date}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Basic Salary *</label>
                          <input
                            className="form-control"
                            type="text"

                            onChange={(e) => {
                              setFieldValue("basic_salary", e.target.value);
                            }}
                          />
                          <span className="error">
                            {errors.basic_salary &&
                              touched.basic_salary &&
                              errors.basic_salary}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg border-bottom border-2 border-dark mb-3">
                        Emergency Contact Information:{" "}
                      </span>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Name</label>
                          <input
                            className="form-control"
                            type="text"
                            // value={props.object.firstName}

                            onChange={(e) => {
                              setFieldValue("emergency_name", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Relationship</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("emergency_relation", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Cell Number</label>
                          <input
                            className="form-control"
                            type="text"

                            onChange={(e) => {
                              setFieldValue("emergency_phone", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Address</label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                              setFieldValue("emergency_address", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="submit-section">
                      <button onClick={handleSubmit}
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AppliedCandidate;
