import React from "react";
import { Modal } from "react-bootstrap";
import { Field, Formik } from "formik";
import Axios from "axios";
import { useState, useEffect } from "react";

const EmployeeForm = (props) => {
  // console.log("hello", props.object)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );

  const [initialValues, setInitialValues] = useState({
    full_name: "",
    father_name: "",
    dob: "",
    cnic: "",
    phone: "",
    email: "",
    is_married: "",
    address: "",
    employee_id: "",
    designation: "",
    departments: "",
    work_location: "",
    joining_date: "",
    basic_salary: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_address: "",
    picture: "",
    experience: "",
    current_salary: "",
    expected_salary: "",
    cover_letter: "",
    projects: "",
    cv: "",
  })
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    getAllDepartments();
    getAllDesignations();
    getAllProjects();
  }, []);

  return (
    <>
      {/* Add Employee Modal */}
      <Modal show={props.isShowEmployeeModal} dialogClassName="employee-modal">
        {/* <div id="Employee_Form" className="modal custom-modal fade" role="dialog"> */}
        {/* <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          > */}
        <div className="modal-content text-left">
          <div className="modal-header">
            <h5 className="modal-title text-xl">Employee Record</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                props.setIsShowEmployeeModal(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" style={{ textAlign: "left" }}>
            <Formik
              // onClick={() => {
              //   setInitialValues({
              //     full_name: "",
              //     father_name: "",
              //     dob: "",
              //     cnic: "",
              //     phone: "",
              //     email: "",
              //     is_married: "",
              //     address: "",
              //     employee_id: "",
              //     designation: "",
              //     departments: "",
              //     work_location: "",
              //     joining_date: "",
              //     basic_salary: "",
              //     emergency_name: "",
              //     emergency_phone: "",
              //     emergency_address: "",
              //     picture: "",
              //     experience: "",
              //     current_salary: "",
              //     expected_salary: "",
              //     cover_letter: "",
              //     projects: "",
              //     cv: "",
              //     ...initialValues
              //   })
              // }}
              initialValues={{
                full_name: "",
                father_name: "",
                dob: "",
                cnic: "",
                phone: "",
                email: "",
                is_married: "",
                address: "",
                employee_id: "",
                designation: "",
                departments: "",
                work_location: "",
                joining_date: "",
                basic_salary: "",
                emergency_name: "",
                emergency_phone: "",
                emergency_address: "",
                picture: "",
                experience: "",
                current_salary: "",
                expected_salary: "",
                cover_letter: "",
                projects: "",
                cv: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.full_name) {
                  errors.full_name = "Full Name is required";
                }
                if (!values.father_name) {
                  errors.father_name = "Father Name is required";
                }
                if (!values.cnic) {
                  errors.cnic = "CNIC is required";
                }
                if (!values.basic_salary) {
                  errors.basic_salary = "Basic Salary is required";
                }
                if (!values.designation) {
                  errors.designation = "Designation is required";
                }
                if (!values.is_married) {
                  errors.is_married = "Marital Status is required";
                }
                if (!values.joining_date) {
                  errors.joining_date = "Date of Joining is required";
                }
                if (!values.phone) {
                  errors.phone = "Contact Number is required";
                }
                if (!values.dob) {
                  errors.dob = "DOB is required";
                }
                // if (!values.expected_salary) {
                //   errors.expected_salary = "Expected Salary is required";
                // }
                // if (!values.cover_letter) {
                //   errors.cover_letter = "Cover Letter is required";
                // }
                // if (!values.cv) {
                //   errors.cv = "CV is required";
                // }
                // if (!values.experience) {
                //   errors.experience = "Experience is required";
                // }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = {
                  full_name: values.full_name,
                  father_name: values.father_name,
                  dob: values.dob,
                  cnic: values.cnic,
                  phone: values.phone,
                  email: values.email,
                  maritalStais_marriedtus: values.is_married,
                  address: values.address,
                  employee_id: values.employee_id,
                  designation: values.designation,
                  department: values.departments,
                  work_location: values.work_location,
                  joining_date: values.joining_date,
                  basicSalary: values.basic_salary,
                  emergencyContactName: values.emergency_name,
                  relationship: values.emergency_relation,
                  emergencyContactNumber: values.emergency_phone,
                  emergencyContactAddress: values.emergency_address,
                  status: "active",
                  projectId: values.projects,
                };

                Axios.post(baseApiUrl + "employee/add", formData)
                  .then((res) => {
                    // setApplyModalShow(false);
                    setFormSubmitted(true);
                    props.setIsShowEmployeeModal(false);
                    alert("employee added successfully");
                    // setJobDetails(res.data.job);
                    // console.log(res.data.jobs);
                  })
                  .catch((err) => console.log(err.response.data));
              }}
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
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
                          {...field}
                          value={props.object.firstName}
                          // value={values.full_name}
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
                          value={props.object.lastName}
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
                          value={props.object.phone}
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
                          value={props.object.email}
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
                        {/* <input className="form-control" type="text" /> */}
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
                        {/* <input className="form-control" type="text" /> */}
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
                          value={props.object.interviewDate}

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
                          value={props.object.currentSalary}

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
                          value={props.object.firstName}

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
                          value={props.object.phone}

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
                    <button
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
        {/* </div> */}
        {/* </div> */}
      </Modal>
      {/* /Add Employee Modal */}
    </>
  );
};

export default EmployeeForm;
