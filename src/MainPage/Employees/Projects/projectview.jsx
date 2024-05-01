import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {Link, useParams, useLocation} from "react-router-dom";
import {
    Avatar_16,
    Avatar_02,
    Avatar_05,
    Avatar_09,
    Avatar_10,
    Avatar_11,
    Avatar_01,
    PlaceHolder,
} from "../../../Entryfile/imagepath";
import Axios from "axios";
import Editproject from "../../../_components/modelbox/Editproject";
import {toast, ToastContainer} from "react-toastify";
import {Formik} from "formik";
import Select from "react-select";
import {Modal} from "react-bootstrap";

// import {IDE} from "../../Pages/Profile/projectprofile"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProjectView = () => {
    const query = useQuery();
    const [isShowProjectModal, setIsShowProjectModal] = useState(false);
    const [project, setProject] = useState();
    const [image, setImage] = useState();
    const [loading, setloading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
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
    const getprojectById = () => {
        Axios.get(baseApiUrl + `project/id/list?id=${query.get("id")}`).then(
            (res) => {
                setProject(res.data.project[0]);
                // console.log(query.get("id"), 'asdasdasd')
                setImage(
                    process.env.REACT_APP_API_URL +
                    "/uploads/" +
                    res.data.project[0].image
                );
                // console.log(res.data.project[0].image, " image..................")
            }
        );
    };
    const getAllTasks = () => {
        Axios.get(baseApiUrl + `projectTask/list`).then((res) => {
            setTasks(res.data.ProjectTask);
            // res.data.ProjectTask.map((item) => {
            //     setEmployeeList((prev) => [...prev, { label: item?.employee?.fullName, value: item?.employee?.id }])
            // });
        });
    };
    const getAllEmployees = () => {
        Axios.get(baseApiUrl + `employee/list`).then((res) => {
            // setTasks(res.data.ProjectTask);
            res.data.employee.map((item) => {
                setEmployeeList((prev) => [...prev, { label: item?.fullName, value: item?.id }])
            });
        });
    };

    useEffect(() => {
        if ($(".select").length > 0) {
            $(".select").select2({
                minimumResultsForSearch: -1,
                width: "100%",
            });
        }
        getprojectById();
        getAllTasks();
        getAllEmployees();
    }, []);

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
                <title>Projects - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Hospital Admin</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/app/main/dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Project</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ml-auto">
                            <a
                                href="#"
                                className="btn add-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_project"
                                onClick={() => setIsShowEditProjectModal(true)}
                            >
                                <i className="fa fa-plus"/> Edit Project
                            </a>
                            {/*<Link*/}
                            {/*  to="/app/projects/task-board"*/}
                            {/*  className="btn btn-white float-end m-r-10"*/}
                            {/*  data-bs-toggle="tooltip"*/}
                            {/*  title="Task Board"*/}
                            {/*>*/}
                            {/*  <i className="fa fa-bars" />*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="card">
                            <div className="card-body">
                                <div className="project-title">
                                    <h5 className="card-title">{project?.name}</h5>
                                    {/* <small className="block text-ellipsis m-b-15"><span className="text-xs">2</span> <span className="text-muted">open tasks, </span><span className="text-xs">5</span> <span className="text-muted">tasks completed</span></small> */}
                                </div>
                                <p>{project?.description}</p>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at. </p> */}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title m-b-20">Uploaded image files</h5>
                                <div className="row">
                                    <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                                        <div className="uploaded-box">
                                            <div className="uploaded-img">
                                                <img
                                                    src={image}
                                                    className="img-fluid"
                                                    alt=""
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src =
                                                            "https://static.wikia.nocookie.net/7aea1f6e-3dc9-4774-96ba-fb84cb3ed528/scale-to-width/755";
                                                    }}
                                                />
                                            </div>
                                            {/*<div className="uploaded-img-name">*/}
                                            {/*    demo.png*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={PlaceHolder} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={PlaceHolder} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={PlaceHolder} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div> */}
                                </div>
                            </div>
                        </div>
                        {/*Project Tasks*/}
                        <div className="card">
                            <div className="card-body">
                                <div className="card-body">
                                    <h5 className="card-title m-b-20 d-inline">Project Task</h5>
                                    <button
                                        type="button"
                                        className="float-end btn btn-primary btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#assign_leader"
                                        onClick={() => setIsShowProjectModal(true)}
                                    >
                                        <i className="fa fa-plus"/> Add
                                    </button>
                                </div>
                                <div className="card-body tab-content pt-0">
                                    <div className="tab-pane show active" id="all_tasks">
                                        <div className="task-wrapper p-0">
                                            <div className="task-list-container">
                                                <div className="task-list-body">
                                                    <ul id="task-list">
                                                        {tasks?.map((task, index) => {
                                                            return (
                                                                <li className="task" key={index}>
                                                                    <div className="task-container">
                                                                        <Link to={`/tasks/tasks?id=` + task.id}>
                                      <span
                                          className="task-label block"
                                          role="button"
                                      >
                                        {task?.name}
                                      </span>
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Project Tasks*/}
                            </div>
                        </div>
                        {/* <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Uploaded files</h5>
                <ul className="files-list">
                  <li>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis"><a href="#">AHA Selfcare Mobile Application Test-Cases.xls</a></span>
                        <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        <div className="file-size">Size: 14.8Mb</div>
                      </div>
                      <ul className="files-action">
                        <li className="dropdown dropdown-action">
                          <a href="" className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="">Download</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            <a className="dropdown-item" href="">Delete</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis"><a href="#">AHA Selfcare Mobile Application Test-Cases.xls</a></span>
                        <span className="file-author"><a href="#">Richard Miles</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        <div className="file-size">Size: 14.8Mb</div>
                      </div>
                      <ul className="files-action">
                        <li className="dropdown dropdown-action">
                          <a href="" className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="">Download</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            <a className="dropdown-item" href="">Delete</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
                        {/* <div className="project-task">
              <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                <li className="nav-item"><a className="nav-link active" href="#all_tasks" data-bs-toggle="tab" aria-expanded="true">All Tasks</a></li>
                <li className="nav-item"><a className="nav-link" href="#pending_tasks" data-bs-toggle="tab" aria-expanded="false">Pending Tasks</a></li>
                <li className="nav-item"><a className="nav-link" href="#completed_tasks" data-bs-toggle="tab" aria-expanded="false">Completed Tasks</a></li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane show active" id="all_tasks">
                  <div className="task-wrapper">
                    <div className="task-list-container">
                      <div className="task-list-body">
                        <ul id="task-list">
                          <li className="task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label" contentEditable="true" suppressContentEditableWarning={true}>Patient appointment booking</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                          <li className="task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label" contentEditable="true" suppressContentEditableWarning={true}>Appointment booking with payment gateway</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                          <li className="completed task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label">Doctor available module</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                          <li className="task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label" contentEditable="true" suppressContentEditableWarning={true}>Patient and Doctor video conferencing</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                          <li className="task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label" contentEditable="true" suppressContentEditableWarning={true}>Private chat module</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                          <li className="task">
                            <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span className="action-circle large complete-btn" title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label" contentEditable="true" suppressContentEditableWarning={true}>Patient Profile add</span>
                              <span className="task-action-btn task-btn-right">
                                <span className="action-circle large" title="Assign">
                                  <i className="material-icons">person_add</i>
                                </span>
                                <span className="action-circle large delete-btn" title="Delete Task">
                                  <i className="material-icons">delete</i>
                                </span>
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="task-list-footer">
                        <div className="new-task-wrapper">
                          <textarea id="new-task" placeholder="Enter new task here. . ." defaultValue={""} />
                          <span className="error-message hidden">You need to enter a task first</span>
                          <span className="add-new-task-btn btn" id="add-task">Add Task</span>
                          <span className="btn" id="close-task-panel">Close</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="pending_tasks" />
                <div className="tab-pane" id="completed_tasks" />
              </div>
            </div> */}
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title m-b-15">Project details</h6>
                                <table className="table table-striped table-border">
                                    <tbody>
                                    {/* <tr>
                      <td>Cost:</td>
                      <td className="text-end">$1200</td>
                    </tr>
                    <tr>
                      <td>Total Hours:</td>
                      <td className="text-end">100 Hours</td>
                    </tr> */}
                                    <tr>
                                        <td>Created:</td>
                                        <td className="text-end">{project?.startDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Deadline:</td>
                                        <td className="text-end">{project?.endDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Priority:</td>
                                        <td className="text-end">
                                            <div className="btn-group">
                                                <a href="#" className="badge badge-success">
                                                    {project?.priority}{" "}
                                                </a>
                                                {/* <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Highest priority</a>
                            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> High priority</a>
                            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-primary" /> Normal priority</a>
                            <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Low priority</a>
                          </div> */}
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                      <td>Created by:</td>
                      <td className="text-end"><Link to="/app/profile/employee-profile">Barry Cuda</Link></td>
                    </tr> */}
                                    <tr>
                                        <td>Status:</td>
                                        <td className="text-end">{project?.status}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                {/* <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p> */}
                                {/* <div className="progress progress-xs mb-0">
                  <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{ width: '40%' }} />
                </div> */}
                            </div>
                        </div>

                        {/* <div className="card project-user">
              <div className="card-body">
                <h6 className="card-title m-b-20">
                  Assigned users
                  <button type="button" className="float-end btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#assign_user"><i className="fa fa-plus" /> Add</button>
                </h6>
                <ul className="list-box">
                  <li>
                    <Link to="/app/profile/employee-profile">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar"><img alt="" src={Avatar_02} /></span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">John Doe</span>
                          <div className="clearfix" />
                          <span className="message-content">Web Designer</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/app/profile/employee-profile">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar"><img alt="" src={Avatar_09} /></span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles</span>
                          <div className="clearfix" />
                          <span className="message-content">Web Developer</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Assign Leader Modal */}
            <Modal show={isShowProjectModal} >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
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
                            initialValues={taskInitialValues}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = "Name is required";
                                }
                                if (!values.description) {
                                    errors.description = "Description is required";
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
                                    projectId: query.get("id"),
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
                                        setIsShowProjectModal(false);
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
            {/*<div id="assign_leader" className="modal custom-modal fade" role="dialog">*/}
            {/*    <div className="modal-dialog modal-dialog-centered" role="document">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title">Assign Leader to this project</h5>*/}
            {/*                <button*/}
            {/*                    type="button"*/}
            {/*                    className="close"*/}
            {/*                    data-bs-dismiss="modal"*/}
            {/*                    aria-label="Close"*/}
            {/*                >*/}
            {/*                    <span aria-hidden="true">×</span>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">*/}
            {/*                <div className="input-group m-b-30">*/}
            {/*                    <input*/}
            {/*                        placeholder="Search to add a leader"*/}
            {/*                        className="form-control search-input"*/}
            {/*                        type="text"*/}
            {/*                    />*/}
            {/*                    <span className="input-group-append">*/}
            {/*      <button className="btn btn-primary w-100">Search</button>*/}
            {/*    </span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <ul className="chat-user-list">*/}
            {/*                        <li>*/}
            {/*                            <a href="#">*/}
            {/*                                <div className="media">*/}
            {/*            <span className="avatar">*/}
            {/*              <img alt="" src={Avatar_09}/>*/}
            {/*            </span>*/}
            {/*                                    <div className="media-body align-self-center text-nowrap">*/}
            {/*                                        <div className="user-name">Richard Miles</div>*/}
            {/*                                        <span className="designation">Web Developer</span>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li>*/}
            {/*                            <a href="#">*/}
            {/*                                <div className="media">*/}
            {/*            <span className="avatar">*/}
            {/*              <img alt="" src={Avatar_10}/>*/}
            {/*            </span>*/}
            {/*                                    <div className="media-body align-self-center text-nowrap">*/}
            {/*                                        <div className="user-name">John Smith</div>*/}
            {/*                                        <span className="designation">Android Developer</span>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li>*/}
            {/*                            <a href="#">*/}
            {/*                                <div className="media">*/}
            {/*            <span className="avatar">*/}
            {/*              <img alt="" src={Avatar_16}/>*/}
            {/*            </span>*/}
            {/*                                    <div className="media-body align-self-center text-nowrap">*/}
            {/*                                        <div className="user-name">Jeffery Lalor</div>*/}
            {/*                                        <span className="designation">Team Leader</span>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </div>*/}
            {/*                <div className="submit-section">*/}
            {/*                    <button className="btn btn-primary submit-btn">Submit</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* /Assign Leader Modal */}
            {/* Assign User Modal */}
            <div id="assign_user" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Assign the user to this project</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-b-30">
                                <input
                                    placeholder="Search a user to assign"
                                    className="form-control search-input"
                                    type="text"
                                />
                                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
                            </div>
                            <div>
                                <ul className="chat-user-list">
                                    <li>
                                        <a href="#">
                                            <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_09}/>
                        </span>
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
                        <span className="avatar">
                          <img alt="" src={Avatar_10}/>
                        </span>
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
                          <img alt="" src={Avatar_16}/>
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
                                <button className="btn btn-primary submit-btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Assign User Modal */}
            {/* Edit Project Modal */}
            <Editproject
                project={project}
                isShowEditProjectModal={isShowEditProjectModal}
                getprojectById={getprojectById}
                setIsShowEditProjectModal={setIsShowEditProjectModal}
            />
            {/* /Edit Project Modal */}
        </div>
    );
};

export default ProjectView;
