import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
import "../../../index.css"
import {
    Avatar_16,
    Avatar_02,
    Avatar_05,
    Avatar_09,
    Avatar_10,
    Attachment,
    User,
    Avatar_08,
    Avatar_26
} from "../../../../Entryfile/imagepath"
import Axios from "axios";
import {Formik} from "formik";
import Select from "react-select";
import {Modal} from "react-bootstrap";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Tasks = () => {
    const queryURL = useQuery();
    const [query, setQuery] = useState(queryURL.get("id"));
    const [selected, setSelected] = useState(queryURL.get("id"));
    const [task, settask] = useState(true);
    const [addtask, setaddtask] = useState(true);
    const [loading, setloading] = useState(false);
    const [taskText, setTaskText] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [toastMessage, setToastMessage] = useState('');
    const [tasks, setTasks] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [taskById, setTaskById] = useState([]);
    const [checked, setChecked] = useState(false);
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
    const handleClick = (value) => {
        setSelected(value)
    }
    const ontaskClick = () => {
        settask(!task)
    }
    const addMark = () => {
        setToastMessage(!toastMessage)
    }

    // console.log("taskList", taskList)
    const options = [
        {value: 'Active', label: 'Active'},
        {value: 'Pending', label: 'Pending'},
        {value: 'Completed', label: 'Completed'}
    ];
    const [taskInitialValues, setTaskInitialValues] = useState({
        projectId: "",
        name: "",
        description: "",
        assignedTo: "",
        status: "",
        dueDate: "",
    });

    const [text, setText] = useState('')
    const [modal, setModal] = useState(false);
    const [fields, setFields] = useState([
        { value: 'Patient appointment booking' },
        { value: 'Appointment booking with payment gateway' },
        { value: 'Patient and Doctor video conferencing' },
        { value: 'Patient appointment booking' },
        { value: 'Private chat module' },
        { value: 'Doctor available module' },

    ])

    function onChangeTask(event) {
        setText(event.target.value);
        setToastMessage(event.target.value)
    }

    function handleAdd() {
        setTaskText(!taskText)
        const values = [...fields];
        if (text != "") {
            values.push({ value: text });
            console.log("notifivaton", values)
            setFields(values);

        }
        setTimeout(() => {
            setTaskText(true)
        }, 3000)
    }

    const taskRemove = (id) => {
        Axios.delete(baseApiUrl + `/projectTask/delete?id=${id}`)
            .then((res) => {
                if (res.data.status == 200) {
                    getAllTasks();
                    toast.success(res.data.message);
                    // console.log("Deleted Successfully");
                } else {
                    toast.success(res.data.message);
                }
                // console.log({ dataIndex: "id" }, "dfnsfknksd");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }
    // function handleRemove(i, value) {
    //     setTaskText(false)
    //     setToastMessage(value)
    //     const values = [...fields];
    //     values.splice(i, 1);
    //     setFields(values);
    //     setTimeout(() => {
    //         setTaskText(true)
    //     }, 3000)
    // }

    // const onImageUpload = (fileList) => {
    //
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         ReactSummernote.insertImage(reader.result);
    //     }
    //     reader.readAsDataURL(fileList[0]);
    //
    // }

    const getAllTasks = () => {
        Axios.get(baseApiUrl + `projectTask/list`)
            .then((res) => {
                setTasks(res.data.ProjectTask);
                // res.data.ProjectTask.map((item) => {
                //     // console.log("12345678900986531   ",{ label: item?.employee?.fullName, value: item?.employee?.id });
                //     setEmployeeList((prev) => [...prev, { label: item?.employee?.fullName, value: item?.employee?.id }])
                // });
            })
    }
    const getAllEmployees = () => {
        Axios.get(baseApiUrl + `employee/list`).then((res) => {
            // setTasks(res.data.ProjectTask);
            res.data.employee.map((item) => {
                setEmployeeList((prev) => [...prev, { label: item?.fullName, value: item?.id }])
            });
        });
    };
    // console.log(query, "   query")
    const getAllTaskById = () => {
        Axios.get(baseApiUrl + `projectTask/id/list?id=${query}`)
            .then((res) => {
                setTaskById(res.data.ProjectTask[0]);
                // console.log(res.data.ProjectTask[0].project.name, "klngkfdgjksdfngjnsdfjkgnjk")
            })
        // getAllTasks();
    }
    // const getTaskById = (id) => {
    //     Axios.get(baseApiUrl + `projectTask/id/list?id=${id}`)
    //         .then((res) => {
    //             setTaskById(res.data.ProjectTask[0]);
    //             // console.log(res.data.ProjectTask[0].project.name, "klngkfdgjksdfngjnsdfjkgnjk")
    //         })
    // }

    const updateDes = (id) => {
        setQuery(id);
        getAllTaskById();
    }
    useEffect(() => {
        getAllTasks();
        getAllTaskById();
        getAllEmployees();
    }, []);
    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
    });
// console.log(taskById,"qweryuioppohjklk")
//     const getProjectTaskById = () => {
//         Axios.get(baseApiUrl + `projectTask/project/id?id=${taskById.projectId}`)
//             .then((res) => {
//                 setTaskById(res.data.ProjectTask[0]);
//                 // console.log(res.data.ProjectTask[0].project.name, "klngkfdgjksdfngjnsdfjkgnjk")
//             })
//     }
    return (
        <div className="page-wrapper min-vh-100">
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
                <title>Tasks - HRMS Admin Template</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <div className="chat-main-row">
                <div className="chat-main-wrapper">
                    <div className="col-lg-7 message-view task-view task-left-sidebar">
                        <div className="chat-window">
                            <div className="fixed-header">
                                <div className="navbar">
                                    <div className="float-start me-auto">
                                        <div className="add-task-btn-wrapper">
                                            <span  onClick={() => setModal(true)}
                                                className={`" ${task ? "add-task-btn btn btn-white btn-sm" : "add-task-btn btn btn-white btn-sm visible"}`}>
                                                Add Task
                                            </span>
                                        </div>
                                    </div>
                                    {/*<a className="task-chat profile-rightbar float-end" id="task_chat"*/}
                                    {/*    href="#task_window"><i className="fa fa fa-comment" /></a>*/}
                                    {/*<ul className="nav float-end custom-menu">*/}
                                    {/*    <li className="nav-item dropdown dropdown-action">*/}
                                    {/*        <a href="" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
                                    {/*            aria-expanded="false"><i className="fa fa-cog" /></a>*/}
                                    {/*        <div className="dropdown-menu dropdown-menu-right">*/}
                                    {/*            <a className="dropdown-item" href="">Pending Tasks</a>*/}
                                    {/*            <a className="dropdown-item" href="">Completed Tasks</a>*/}
                                    {/*            <a className="dropdown-item" href="">All Tasks</a>*/}
                                    {/*        </div>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                            </div>
                            <div className="chat-contents">
                                <div className="chat-content-wrap">
                                    <div className="chat-wrap-inner">
                                        <div className="chat-box">
                                            <div className="task-wrapper">
                                                <div className="task-list-container">
                                                    <div className="task-list-body">
                                                        <ul id="task-list">
                                                            {tasks &&
                                                                tasks.map((task, index) => {
                                                                    return (
                                                                        <li className="task" key={index}>
                                                                            <div className="task-container">
                                                                                <span
                                                                                    className="task-action-btn task-check">
                                                                                    <span className={`action-circle large complete-btn  ${task?.id === selected?.id ? "bg-success" : " "}`}>
                                                                                        <i className={`material-icons ${task?.id === selected?.id ? "text-light" : " "}`}
                                                                                            onClick={() => handleClick(task)}
                                                                                        >check</i>
                                                                                    </span>
                                                                                </span>
                                                                                    <span className="task-label"
                                                                                        role="button"
                                                                                          onClick={() => {
                                                                                              setQuery(task.id);
                                                                                              getAllTaskById();
                                                                                              handleClick(task);
                                                                                              // getTaskById(task.id);
                                                                                              // getProjectTaskById();
                                                                                          }}
                                                                                    >
                                                                                        {task?.name}</span>
                                                                                <span
                                                                                    className="task-action-btn task-btn-right">
                                                                                    {/*<span className="action-circle large" title="Assign">*/}
                                                                                    {/*  <i className="material-icons">person_add</i>*/}
                                                                                    {/*</span>*/}
                                                                                    <span
                                                                                        className="action-circle large delete-btn"
                                                                                        title="Delete Task">
                                                                                        <i className="material-icons"
                                                                                            onClick={() => taskRemove(task.id)}>delete</i>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                    </div>

                                                    <div className="task-list-footer">

                                                        <div
                                                            className={` ${task ? "new-task-wrapper" : "new-task-wrapper visible"}`}>
                                                            <textarea id="new-task"
                                                                placeholder="Enter new task here. . ."
                                                                defaultValue={""}
                                                                onChange={(e) => onChangeTask(e)} />
                                                            <span className="error-message hidden">You need to enter a task first</span>
                                                            <span href="#" className="add-new-task-btn btn" id="add-task" onClick={() => setModal(true)}>Add Task</span>
                                                            <span id="close-task-panel" onClick={ontaskClick}
                                                                className={` btn"${task ? "add-task-btn btn btn-white btn-sm" : "add-task-btn btn btn-white btn-sm visible"}`}>Close</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div
                                                className={taskText ? "notification-popup hide" : "notification-popup"}>
                                                <p>
                                                    <span className="task" />
                                                    <span className="notification-text">{toastMessage}</span>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 message-view task-chat-view task-right-sidebar" id="task_window">
                        <div className="chat-window">
                            <div className="fixed-header">
                                <div className="navbar">
                                    <div className="task-assign">
                                        <a className="task-complete-btn" id="task_complete" href="">
                                            <i className="material-icons">check</i> Mark Complete
                                        </a>
                                    </div>
                                    <ul className="nav float-end custom-menu">
                                        <li className="dropdown dropdown-action">
                                            <a href="" className="dropdown-toggle" data-bs-toggle="dropdown"
                                                aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="">Delete Task</a>
                                                <a className="dropdown-item" href="">Settings</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="chat-contents task-chat-contents">
                                <div className="chat-content-wrap">
                                    <div className="chat-wrap-inner">
                                        <div className="chat-box">
                                            <div className="chats">
                                                <h4>{taskById?.project?.name}</h4>
                                                <div className="task-header">
                                                    <div className="assignee-info">
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#assi  kgnee">
                                                            <div className="avatar">
                                                                <img alt="" src={taskById?.employee?.image}
                                                                    onError={({ currentTarget }) => {
                                                                        currentTarget.onerror = null; // prevents looping
                                                                        currentTarget.src = "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
                                                                    }} className="avatar" />
                                                            </div>
                                                            <div className="assigned-info">
                                                                <div className="task-head-title">Assigned To</div>
                                                                <div
                                                                    className="task-assignee">{taskById?.employee?.fullName}</div>
                                                            </div>
                                                        </a>
                                                        {/*<span className="remove-icon">*/}
                                                        {/*    <i className="fa fa-close" />*/}
                                                        {/*</span>*/}
                                                    </div>
                                                    <div className="task-due-date">
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#assi  kgnee">
                                                            <div className="due-icon">
                                                                <span>
                                                                    <i className="material-icons">date_range</i>
                                                                </span>
                                                            </div>
                                                            <div className="due-info">
                                                                <div className="task-head-title">Due Date</div>
                                                                <div
                                                                    className="due-date">{taskById?.dueDate}</div>
                                                            </div>
                                                        </a>
                                                        {/*<span className="remove-icon">*/}
                                                        {/*    <i className="fa fa-close" />*/}
                                                        {/*</span>*/}
                                                    </div>
                                                </div>
                                                <hr className="task-line" />
                                                <div className="task-desc">
                                                    <div className="task-desc-icon mt-0">
                                                        <i className="material-icons">subject</i>
                                                    </div>
                                                    <div className="assigned-info w-100">
                                                        <div className="task-head-title mb-1">Description</div>
                                                        <div
                                                            className="form-control h-auto">{taskById?.description}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Create Project Modal */}
            <div id="create_project" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Project</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Project Name</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Client</label>
                                            <select className="select">
                                                <option>Global Technologies</option>
                                                <option>Delta Infotech</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <div>
                                                <input className="form-control datetimepicker" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <div>
                                                <input className="form-control datetimepicker" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Rate</label>
                                            <input placeholder="$50" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>&nbsp;</label>
                                            <select className="select">
                                                <option>Hourly</option>
                                                <option>Fixed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Priority</label>
                                            <select className="select">
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Add Project Leader</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Team Leader</label>
                                            <div className="project-members">
                                                <a className="avatar" href="#" data-bs-toggle="tooltip"
                                                    title="Jeffery Lalor">
                                                    <img alt="" src={Avatar_16} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Add Team</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Team Members</label>
                                            <div className="project-members">
                                                <a className="avatar" href="#" data-bs-toggle="tooltip"
                                                    title="John Doe">
                                                    <img alt="" src={Avatar_02} />
                                                </a>
                                                <a className="avatar" href="#" data-bs-toggle="tooltip"
                                                    title="Richard Miles">
                                                    <img alt="" src={Avatar_09} />
                                                </a>
                                                <a className="avatar" href="#" data-bs-toggle="tooltip"
                                                    title="John Smith">
                                                    <img alt="" src={Avatar_10} />
                                                </a>
                                                <a className="avatar" href="#" data-bs-toggle="tooltip"
                                                    title="Mike Litorus">
                                                    <img alt="" src={Avatar_05} />
                                                </a>
                                                <span className="all-team">+2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                </div>
                                <div className="form-group">
                                    <label>Upload Files</label>
                                    <input className="form-control" type="file" />
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Create Project Modal */}
            {/* Assignee Modal */}
            <Modal show={modal} >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                                setModal(false)
                            }}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={taskInitialValues}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = "Name is required";
                                }
                                if (!values.description) {
                                    errors.description = "description Name is required";
                                }
                                if (!values.assignedTo) {
                                    errors.assignedTo = "Assigning is required";
                                }
                                if (!values.status) {
                                    errors.status = "Status is required";
                                }
                                if (!values.dueDate) {
                                    errors.dueDate = "Due Date is required";
                                }
                                return errors;
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                const formData = {
                                    projectId: taskById.projectId,
                                    name:values.name,
                                    description: values.description,
                                    assignedTo: values.assignedTo,
                                    status:values.status,
                                    dueDate: values.dueDate,
                                };
                                try {
                                    setloading(true);
                                    const res = await Axios.post(
                                        baseApiUrl + "projectTask/add",
                                        formData
                                    );
                                    if (res.data.status == 200) {
                                        getAllTasks();
                                        setloading(false);
                                        toast.success(res.data.message);
                                        setModal(false);
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
                                  isValid
                                  /* and other goodies */
                              }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Task Name
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <input className="form-control" type="text" placeholder='Task Name'
                                                           onChange={(e) => {
                                                               setFieldValue("name", e.target.value);
                                                           }}
                                                    />
                                                    <span className="error">
                                                            {errors.name && touched.name && errors.name}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Due Date
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <input className="form-control" type="date" placeholder='Due Date'
                                                           onChange={(e) => {
                                                               setFieldValue("dueDate", e.target.value);
                                                           }}
                                                    />
                                                    <span className="error">
                                                            {errors.dueDate && touched.dueDate && errors.dueDate}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Assign To
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <Select placeholder="Assigning" options={employeeList}
                                                            onChange={(value) => {
                                                                setFieldValue("assignedTo", value.value)

                                                            }}
                                                    />
                                                    {/*<input className="form-control" type="text" placeholder='Phase Name'*/}
                                                    {/*       onChange={(e) => {*/}
                                                    {/*           setFieldValue("PHS_ID", e.target.value);*/}
                                                    {/*       }}*/}
                                                    {/*/>*/}
                                                    <span className="error">
                                                            {errors.assignedTo && touched.assignedTo && errors.assignedTo}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Status
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <Select placeholder="Select Status" options={options}
                                                            onChange={(value) => {
                                                                setFieldValue("status", value.value)

                                                            }}
                                                    />
                                                    <span className="error">
                                                            {errors.status && touched.status && errors.status}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Description
                                                        <span className="text-danger"> *</span>
                                                    </label>
                                                    <textarea className="form-control h-50" rows={5} placeholder='Description'
                                                              onChange={(e) => {
                                                                  setFieldValue("description", e.target.value);
                                                              }}
                                                    ></textarea>
                                                    <span className="error">
                                                            {errors.description && touched.description && errors.description}
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
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>
            <div id="assignee" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Assign to this task</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-b-30">
                                <input placeholder="Search to add" className="form-control search-input" type="text" />
                                <span className="input-group-append">
                                    <button className="btn btn-primary">Search</button>
                                </span>
                            </div>
                            <div>
                                <ul className="chat-user-list">
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar"><img alt="" src={Avatar_09} /></span>
                                                <div className="media-body align-self-center text-nowrap">
                                                    <div className="user-name">Richard Miles</div>
                                                    <span className="designation">Web Developer</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar"><img alt="" src={Avatar_10} /></span>
                                                <div className="media-body align-self-center text-nowrap">
                                                    <div className="user-name">John Smith</div>
                                                    <span className="designation">Android Developer</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar">
                                                    <img alt="" src={Avatar_16} />
                                                </span>
                                                <div className="media-body align-self-center text-nowrap">
                                                    <div className="user-name">Jeffery Lalor</div>
                                                    <span className="designation">Team Leader</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Assign</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Assignee Modal */}
            {/* Task Followers Modal */}
            <div id="task_followers" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add followers to this task</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-b-30">
                                <input placeholder="Search to add" className="form-control search-input" type="text" />
                                <span className="input-group-append">
                                    <button className="btn btn-primary">Search</button>
                                </span>
                            </div>
                            <div>
                                <ul className="chat-user-list">
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar"><img alt="" src={Avatar_16} /></span>
                                                <div className="media-body media-middle text-nowrap">
                                                    <div className="user-name">Jeffery Lalor</div>
                                                    <span className="designation">Team Leader</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar"><img alt="" src={Avatar_08} /></span>
                                                <div className="media-body media-middle text-nowrap">
                                                    <div className="user-name">Catherine Manseau</div>
                                                    <span className="designation">Android Developer</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar"><img alt="" src={Avatar_26} /></span>
                                                <div className="media-body media-middle text-nowrap">
                                                    <div className="user-name">Wilmer Deluna</div>
                                                    <span className="designation">Team Leader</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Add to Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Task Followers Modal */}
        </div>
    );
}

export default Tasks;
