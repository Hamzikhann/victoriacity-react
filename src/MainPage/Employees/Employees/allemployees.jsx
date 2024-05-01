import React, {useEffect, useState, useMemo} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Editemployee from "../../../_components/modelbox/Editemployee";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Axios from "axios";
import Select from "react-select";
import {Field, Formik} from "formik";
import {isValid} from "date-fns";
import InputMask from "react-input-mask";
import {Modal} from "react-bootstrap";
import PasswordInput from "../../../_components/PasswordInput";
import { Table } from "antd";
const AllEmployees = () => {
    const [menu, setMenu] = useState(false);
    const [allEmployee, setAllEmployee] = useState([]);
    const [designation, setDesignation] = useState([{}]);
    const [AllDesignations, setAllDesignations] = useState([{}]);
    const toggleMobileMenu = () => {
        setMenu(!menu);
    };
    const [salaryInitialValues, setSalaryInitialValues] = useState({
        basicSalary: "",
        fullName: ""
    });
    const [isShowEmployeeModal, setIsShowEmployeeModal] = useState(false);
    const [isShowDispatchSalaryModal, setIsShowDispatchSalaryModal] = useState(false);
    const [dispatchSalaries , setDispatchSalaries] = useState([])

    const gender = [
        {value: 'Male', label: 'Male'},
        {value: 'Female', label: 'Female'},
    ];
    const options = [
        {value: 'Father', label: 'Father'},
        {value: 'Husband', label: 'Husband'},
        {value: 'Mother', label: 'Mother'},
        {value: 'Sibiling', label: 'Sibiling'},
        {value: 'Nephew', label: 'Nephew'},
        {value: 'Neice', label: 'Neice'},
        {value: 'Grand Son', label: 'Grand Son'},
        {value: 'Grand Daughter', label: 'Grand Daughter'},
        {value: 'Grand Mother', label: 'Grand Mother'},
        {value: 'Grand Father', label: 'Grand Father'},
        {value: 'Uncle', label: 'Uncle'},
        {value: 'N/A', label: 'N/A'},
    ];

    const [employeeId, setEmployeeId] = useState();
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
    const [departments, setDepartments] = useState([]);
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setloading] = useState(false);

    const getAllDepartments = () => {
        Axios.get(baseApiUrl + "department/active/list")
            .then((res) => {
                res.data.departments.map((item) => {
                    setDepartments((prev) => [...prev, {label: item.title, value: item.id}])
                })
            })
            .catch((err) => console.log(err));
    };
    const getAllProjects = () => {
        Axios.get(baseApiUrl + "project/list").then((res) => {
            // console.log(res.data.project);
            setProjects(res.data.project);
        });
        // .catch((err) => console.log(err.response.data));
    };

    const getAllEmployee = () => {
        Axios.get(baseApiUrl + "employee/list").then((res) => {
            setAllEmployee(res.data.employee);
            // console.log("ffffffffffffffff", res.data.employee);
        });
    };
    const getAllDesignations = () => {
        Axios.get(baseApiUrl + "designation/list")
            .then((res) => {
                res.data.designations.map((item) => {
                    setAllDesignations((prev) => [...prev, {label: item.title, value: item.id}])
                })
            })
            .catch((err) => console.log(err));
    };
    const getActiveDesignations = () => {
        Axios.get(baseApiUrl + "designation/active/list")
            .then((res) => {
                res.data.designations.map((item) => {
                    setDesignation((prev) => [...prev, {label: item.title, value: item.id}])
                })
            })
            .catch((err) => console.log(err));
    };

   
    const deleteEmployeeById = () => {
        Axios.delete(baseApiUrl + `employee/delete?id=${employeeId}`)
            .then((res) => {
                getAllEmployee();
                if (res.data.status == 200) {
                    toast.success(res.data.message);
                    console.log("Deleted Successfully");
                } else {
                    toast.success(res.data.message);
                }
                // console.log({dataIndex: "id"}, "dfnsfknksd");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };
    const getEmployeeSalary = () => {
        Axios.get(baseApiUrl + "employeeSalaryHisory/list")
            .then((res) => {
                res.data.EmployeeSalaryHistory.map((item) => {
                    setEmployeeSalary((prev) => [...prev, {label: item.salary, value: item.id}])
                })
            })
            .catch((err) => console.log(err));
    };

    const addEmployeeSalaryDispatchbyId = (employeeId) => {
        // console.log('hjfgfv',employeeId)
        Axios.post(baseApiUrl + `dispatchSalary/employee/id?employeeId=${employeeId}`)
            .then((res) => {
                getAllEmployee();
                if (res.data.SalaryHistory) {
                    toast.success(res.data.message);
                    console.log("Updated Successfully");
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
        }
        const addDispatchSalary = () => {
            Axios.post(baseApiUrl + "dispatchSalary/employee")
                .then((res) => {
                    getAllEmployee();
                    if (res.data.SalaryHistory) {
                        toast.success(res.data.message);
                        console.log("Updated Successfully");
                    } else {
                        toast.success(res.data.message);
                    }
        
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
            }

            const getDispatchSalary = (employeeId) => {
                Axios.get(baseApiUrl + `dispatchSalary/employee/Id?employeeId=${employeeId}`)
                    .then((res) => {
                        setDispatchSalaries(res.data.DispatchedSalaries)
                    })
                    .catch((err) => console.log(err.res.data.message));
            };

    useEffect(() => {
        getAllDepartments();
        getAllProjects();
        getAllEmployee();
        getAllDesignations();
        getActiveDesignations()
        getEmployeeSalary();
        // getDispatchSalary();
    }, []);

    // Search Part
    const USERS = allEmployee;

    // const [designationList, setDesignationList] = useState([{}]);
    const [selectedDesignationTitle, setSelectedDesignationTitle] = useState();
    // the value of the search field
    const [name, setName] = useState("");
    // the search result
    const [foundUsers, setFoundUsers] = useState(USERS);
    const [designationTitle, setDesignationTitle] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState();
    const [query, setQuery] = useState("");
    const [toggle, setToggle] = useState(true);
    // useEffect(() => {
    //   setDesignationList(designation.label);
    // }, []);
    // console.log(search, " hey i'm search")

    useEffect(() => {
        filter(name, selectedDesignationTitle);
    }, [name, selectedDesignationTitle]);

    const filter = (value1, valeu2) => {
        const reciveName = value1.toLowerCase();
        let results = [];
        if (reciveName) {
            results = USERS.filter((emp) => {
                const name = emp.fullName.toLowerCase();
                if (name.includes(reciveName)) {
                    return emp;
                }
            });
            if (valeu2) {
                results = USERS.filter((emp) => valeu2 === emp.designationAss.title);
            }
            setFoundUsers(results);

            // return emp.fullName.toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
            // });
        }
    };

    const handleSelectedOption = (value) => {
        setDesignationTitle(value);
        if (value) {
            setToggle(false);
        } else {
            setToggle(true);
        }
        // console.log("selected option", value);
        setSelectedEmployees(
            allEmployee.filter((emp) => emp.designation === value)
        );
    };

    // function handleCategoryChange(event) {
    //   console.log('wwwwwwww', event)
    //   setSelectedDesignationTitle(event.target.value);
    //   alert("987")
    // }
    // function getFilteredList() {
    //   if (!selectedDesignationTitle) {
    //     // console.log(designationList, " im from fun()");
    //     return designationList;
    //   }
    //   return designationList.filter((item) => item.title === selectedDesignationTitle);
    // }
    // if (selectedDesignationTitle === designation[3].label) {
    //   console.log("IOS here!!!!");
    // }
    // let filteredList = useMemo(getFilteredList, [selectedDesignationTitle, designationList]);
    // console.log(designation, " designationState");
    // console.log(designation[3], " designationListState");
    // console.log(allEmployee.fullName, " selectedDesignationTitleState");
    // let car = allEmployee.find(employee => employee.designationAss.title === "Web Developer");
    // let car = allEmployee.filter(employee => employee.designationAss.title === selectedDesignationTitle);
    // console.log(car, " I m")

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
          title: "Salary",
          dataIndex: "salary",
          // render: (text, record) => {
          //     // console.log(text," dfgsdfg ",record)
          //     return <span>{text?.type}</span>;
          //   },
          sorter: (a, b) => a.salary.length - b.salary.length,
        },
        {
          title: "Dispatch Date",
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
            render: (text, record) => {
              const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
          
              const monthNumber = parseInt(text); // Assuming text is the month number
              const monthName = monthNames[monthNumber - 1];
          
              return <span>{monthName}</span>;
            },
            sorter: (a, b) => a.month.length - b.month.length,
          },
    
          
          
          
          
          
    
       
      ];
    return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
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
            <Header onMenuClick={(value) => toggleMobileMenu()}/>
            <Sidebar/>
            <div className="page-wrapper">
                <Helmet>
                    <title>Employee - Sheranwala Developer</title>
                    <meta name="description" content="Login page"/>
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Employee</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/app/main/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Employee</li>
                                </ul>
                            </div>
                            <div className="col-auto float-end ml-auto">
                                <Link
                                    to="/"
                                    className="btn add-btn"
                                    data-bs-toggle="modal"
                                    onClick={() => setIsShowEmployeeModal(true)}
                                    data-bs-target="#create_employee"
                                >
                                    <i className="fa fa-plus"/> Add Employee
                                </Link>
                            </div>

                            <div className="col-auto float-end ml-auto">
                                <Link
                                    to="/"
                                    className="btn add-btn"
                                    data-bs-toggle="modal"
                                    onClick={() => addDispatchSalary()}
                                    data-bs-target="#create_employee"
                                >
                                    <i className="fa fa-plus"/> Dispatch Salary
                                </Link>
                            </div>
                            {/* <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a>
                <div className="view-icons">
                  <Link to="/app/employee/allemployees" className="grid-view btn btn-link active"><i className="fa fa-th" /></Link>
                  <Link to="/app/employee/employees-list" className="list-view btn btn-link"><i className="fa fa-bars" /></Link>
                </div>
              </div> */}
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Search Filter */}
                    <div className="row filter-row">
                        {/* <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div> */}
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <input
                                    type="search"
                                    placeholder="Employee Name"
                                    className="form-control"
                                    disabled={toggle}
                                    // value={name}
                                    // onChange={(e) => setName(e.target.value)}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {/* <label className="focus-label">Employee Name</label> */}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <Select
                                    placeholder="Select Designation"
                                    options={AllDesignations}
                                    onChange={(value) => {
                                        handleSelectedOption(value.value);
                                    }}
                                />
                                {/* <select className="select floating" onChange={handleCategoryChange}>
                  <option>Select Designation</option>
                  {designation && designation.map((item, i) => (
                    <option value={item.value} >
                      {item.title}

                    </option>
                  ))}
                </select> */}
                                {/* <label className="focus-label">Designation</label> */}
                            </div>
                        </div>
                        {/* <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block w-100"> Search </a>
            </div> */}
                    </div>
                    {/* Search Filter */}
                    <div className="row staff-grid-row">
                        {designationTitle
                            ? selectedEmployees
                                .filter((employee) => {
                                    if (query === "") {
                                        return employee;
                                    } else if (
                                        employee.fullName
                                            .toLowerCase()
                                            .includes(query.toLowerCase())
                                    ) {
                                        return employee;
                                    }
                                })
                                .map((employee, i) => (
                                    <>
                                        <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                            <div className="profile-widget">
                                                <div className="profile-img">
                                                    <Link
                                                        to={`/app/profile/employee-profile/?id=${employee.id}`}
                                                        key={i + employee.id}
                                                        className="avatar"
                                                    >
                                                        <img src={employee.image} alt=""/>
                                                    </Link>
                                                </div>
                                                <div className="dropdown profile-action">
                                                    <a
                                                        href="#"
                                                        className="action-icon dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"
                                                        >
                                                            <i className="fa fa-pencil m-r-5"/> Edit
                                                        </a>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_employee"
                                                        >
                                                            <i className="fa fa-trash-o m-r-5"/> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                                                    <Link
                                                        to={`/app/profile/employee-profile/?id=${employee.id}`}
                                                        key={i + employee.id}
                                                    >
                                                        {employee && employee.fullName}
                                                    </Link>
                                                </h4>
                                                <div className="small text-muted">
                                                    {employee &&
                                                        employee.designationAss &&
                                                        employee.designationAss.title}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            : allEmployee
                                .filter((employee) => {
                                    if (query === "") {
                                        return employee;
                                    } else if (
                                        employee.fullName
                                            .toLowerCase()
                                            .includes(query.toLowerCase())
                                    ) {
                                        return employee;
                                    }
                                })
                                .map((employee, i) => (
                                    <>
                                    {console.log('jgjfhgv', employee)}
                                        <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                            <div className="profile-widget">
                                                <div className="profile-img">
                                                    <Link
                                                        to={`/app/profile/employee-profile/?id=${employee.id}`}
                                                        key={i + employee.id}
                                                        className="avatar"
                                                    >
                                                        <img
                                                            src={employee.image}
                                                            alt=""
                                                            onError={({currentTarget}) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src =
                                                                    "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
                                                            }}
                                                            className="avatar"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="dropdown profile-action">
                                                    <a
                                                        href="#"
                                                        className="action-icon dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        {/* <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a> */}
                                                        <button
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            // data-bs-target="#delete_employee"
                                                            onClick={() => {
                                                                // console.log("query", employee.id);
                                                                // setEmployeeId(employee.id);
                                                                addEmployeeSalaryDispatchbyId(employee.employeeId)
                                                            }}
                                                        >
                                                            <i className="fa fa-money m-r-5"/> Dispatch Salary
                                                        </button>
                                                        <button
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            // data-bs-target="#delete_employee"
                                                            onClick={() => {
                                                                // console.log("query", employee.id);
                                                                // setEmployeeId(employee.employeeId);
                                                                // updateEmployeeSalaryDispatchbyId(employee.employeeId)
                                                                setIsShowDispatchSalaryModal(true)
                                                                getDispatchSalary(employee.employeeId)
                                                            }}
                                                        >
                                                            <i className="fa fa-eye m-r-5"/> View Dispatched Salary
                                                        </button>
                                                        <button
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_employee"
                                                            onClick={() => {
                                                                // console.log("query", employee.id);
                                                                setEmployeeId(employee.id);
                                                            }}
                                                        >
                                                            <i className="fa fa-trash-o m-r-5"/> Delete
                                                        </button>
                                                       
                                                       
                                                    </div>
                                                </div>
                                                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                                                    <Link
                                                        to={`/app/profile/employee-profile/?id=${employee.id}`}
                                                        key={i + employee.id}
                                                    >
                                                        {employee?.fullName}
                                                    </Link>
                                                </h4>
                                                <div className="small text-muted">
                                                    {employee?.designationAss?.title}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                        {/* </div> */}
                    </div>
                </div>
                {/* /Page Content */}
                {/* Add Employee Modal */}
                {/* <Addemployee /> */}
                <Modal show={isShowEmployeeModal} dialogClassName="employee-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Employee</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setIsShowEmployeeModal(false)}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{textAlign: "left"}}>
                            <Formik
                                initialValues={{
                                    full_name: "",
                                    father_name: "",
                                    gender: "",
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
                                    emergency_relation: "",
                                    picture: "",
                                    experience: "",
                                    current_salary: "",
                                    expected_salary: "",
                                    cover_letter: "",
                                    projects: "",
                                    cv: "",
                                    password:"",
                                    role:""
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = "Email is required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }
                                    if (!values.full_name) {
                                        errors.full_name = "Full Name is required";
                                    }
                                    if (!values.password) {
                                        errors.password = "Password is required";
                                    }
                                    if (!values.father_name) {
                                        errors.father_name = "Father Name is required";
                                    }
                                    if (!values.gender) {
                                        errors.gender = "gender is required";
                                    }
                                    if (!values.cnic) {
                                        errors.cnic = "CNIC is required";
                                    } else if (
                                        !/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i.test(values.cnic)
                                    ) {
                                        errors.cnic = "invalid CNIC number";
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
                                    if (!values.dob) {
                                        errors.dob = "DOB is required";
                                    }
                                    console.log(errors)
                                    return errors;
                                }}
                                onSubmit={async (values, {setSubmitting}) => {
                                    const formData = {
                                        fullName: values.full_name,
                                        fatherName: values.father_name,
                                        gender: values.gender,
                                        dob: values.dob,
                                        cnic: values.cnic,
                                        contact: values.phone,
                                        email: values.email,
                                        maritalStatus: values.is_married,
                                        address: values.address,
                                        employeeId: values.employee_id,
                                        designation: values.designation,
                                        department: values.departments,
                                        branch: values.work_location,
                                        dateOfJoining: values.joining_date,
                                        basicSalary: values.basic_salary,
                                        emergencyContactName: values.emergency_name,
                                        relationship: values.emergency_relation,
                                        emergencyContactNumber: values.emergency_phone,
                                        emergencyContactAddress: values.emergency_address,
                                        status: "active",
                                        image: values.image,
                                        password:values.password,
                                        role:4
                                        // projectId: values.projects,
                                    };
                                    // console.log("formdata", formData);
                                    const header = {
                                        headers: {
                                            "Content-Type": "multipart/form-data",
                                        },
                                    };
                                    try {
                                        setloading(true);
                                        const res = await Axios.post(
                                            baseApiUrl + "employee/add",
                                            formData,
                                            header
                                        );
                                        if (res.data.status == 200) {
                                            setloading(false);
                                            toast.success(res.data.message);
                                            setIsShowEmployeeModal(false);
                                            getAllEmployee();
                                        }
                                    } catch (err) {
                                        setloading(false);
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
                                                    <label className="col-form-label">
                                                        Martial Status{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <br/>
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
                                                    <br/>
                                                    <span className="error">
                            {errors.is_married &&
                                touched.is_married &&
                                errors.is_married}
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 ">
                                                <div className="form-group">
                                                    <label className="col-form-label">
                                                        Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
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
                                                    <label className="col-form-label">
                                                        Father Name <span className="text-danger">*</span>
                                                    </label>
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
                                                        Date of Birth <span className="text-danger">*</span>
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
                                                    <label className="col-form-label">
                                                        CNIC# <span className="text-danger">*</span>
                                                    </label>
                                                    <InputMask
                                                        className="form-control"
                                                        mask="99999-9999999-9"
                                                        maskChar=" "
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
                                                    <label className="col-form-label">
                                                        Email <span className="text-danger">*</span>
                                                    </label>
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
                                                    <label>Password <span className="text-danger">*</span></label>
                                                    {/*<input className="form-control" type="password"*/}
                                                    {/*       placeholder='Password' autoComplete="current-password"*/}
                                                    {/*       onChange={(e) => {*/}
                                                    {/*           setFieldValue("password", e.target.value);*/}
                                                    {/*       }}*/}
                                                    {/*/>*/}
                                                    <PasswordInput placeholder='Password'
                                                                   onChange={(e) => {
                                                                       setFieldValue("password", e.target.value);
                                                                   }}/>
                                                    <span className="error">
                              {errors.password && touched.password && errors.password}
                            </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">
                                                        Contact Number
                                                    </label>
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
                                                    <label className="col-form-label">
                                                        Residential Address
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        onChange={(e) => {
                                                            setFieldValue("address", e.target.value);
                                                        }}
                                                    />
                                                    <span className="error">
                            {errors.address &&
                                touched.address &&
                                errors.address}
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 ">
                                                <div className="form-group">
                                                    <label className="col-form-label">
                                                        Gender <span className="text-danger">*</span>
                                                    </label>
                                                    <Select placeholder="Select Gender" options={gender}
                                                            onChange={(value) => {
                                                                setFieldValue("gender", value.value)

                                                            }}
                                                    />
                                                    <span className="error">
                            {errors.gender && touched.gender && errors.gender}
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>
                                                        Upload Image
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={(e) => {
                                                            // console.log(e.target.files[0], ' img ');
                                                            setFieldValue("image", e.target.files[0]);
                                                        }}
                                                    />
                                                    <span className="error">
                            {errors.image && touched.image && errors.image}
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
                                                        Current Designation{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Select placeholder="Select Designation" options={designation}
                                                            onChange={(value) => {
                                                                setFieldValue("designation", value.value)

                                                            }}
                                                    />
                                                    {/*<Field*/}
                                                    {/*    as="select"*/}
                                                    {/*    className="form-control"*/}
                                                    {/*    name="designation"*/}
                                                    {/*>*/}
                                                    {/*    <option value="">-</option>*/}
                                                    {/*    {designations &&*/}
                                                    {/*        designations.map((item) => (*/}
                                                    {/*            <option value={item.id}>{item.title}</option>*/}
                                                    {/*        ))}*/}
                                                    {/*</Field>*/}

                                                    <span className="error">
                            {errors.designation &&
                                touched.designation &&
                                errors.designation}
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">
                                                        Department <span className="text-danger">*</span>
                                                    </label>
                                                    {/* <input className="form-control" type="text" /> */}
                                                    <Select placeholder="Select Department" options={departments}
                                                            onChange={(value) => {
                                                                setFieldValue("departments", value.value)

                                                            }}
                                                    />
                                                    {/*<Field*/}
                                                    {/*    as="select"*/}
                                                    {/*    className="form-control"*/}
                                                    {/*    name="departments"*/}
                                                    {/*>*/}
                                                    {/*    <option value="">-</option>*/}
                                                    {/*    {departments &&*/}
                                                    {/*        departments.map((item) => (*/}
                                                    {/*            <option value={item.id}>{item.title}</option>*/}
                                                    {/*        ))}*/}
                                                    {/*</Field>*/}
                                                </div>
                                            </div>

                                            {/* <div className="col-sm-6">
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
                        </div> */}

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">
                                                        Work Location
                                                    </label>
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
                                                        Date of Joining{" "}
                                                        <span className="text-danger">*</span>
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
                                                    <label className="col-form-label">
                                                        Basic Salary <span className="text-danger">*</span>
                                                    </label>
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
                                                        onChange={(e) => {
                                                            setFieldValue("emergency_name", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Relationship</label>
                                                    <Select placeholder="Select Designation" options={options}
                                                            onChange={(value) => {
                                                                setFieldValue("emergency_relation", value.value)

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
                                                            setFieldValue(
                                                                "emergency_address",
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
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
                                                        role="status"
                                                    >
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    data-bs-dismiss="modal"
                                                    disabled={!isValid}
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
                    </div>
                </Modal>

                {/* /Add Employee Modal */}

                {/* {______--------------------------------------------------} */}

                       {/* {View Dispatch Salary} */}
                       <Modal show={isShowDispatchSalaryModal} dialogClassName="employee-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View Dispatched Salary </h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setIsShowDispatchSalaryModal(false);
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
               
                onSubmit={async (values, { setSubmitting }) => {
             
                
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
                    <Table
              dataSource={dispatchSalaries}
              columns={columns} 
              /* Other Table props */
            />

                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Modal>
                       {/* {View Dispatch Salary} */}

                {/* Edit Employee Modal */}
                {/* <Editemployee /> */}
                {/* /Edit Employee Modal */}
                {/* Delete Employee Modal */}
                <div
                    className="modal custom-modal fade"
                    id="delete_employee"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-header">
                                    <h3>Delete Employee</h3>
                                    <p>Are you sure want to delete?</p>
                                </div>
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <button
                                                className="btn btn-primary w-100 continue-btn"
                                                data-bs-dismiss="modal"
                                                type="submit"
                                                onClick={() => deleteEmployeeById(employeeId)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <a
                                                href=""
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary cancel-btn"
                                            >
                                                Cancel
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Delete Employee Modal */}
            </div>
        </div>
    );
};

export default AllEmployees;
