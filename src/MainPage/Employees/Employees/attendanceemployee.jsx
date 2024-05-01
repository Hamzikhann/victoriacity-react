import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {itemRender, onShowSizeChange} from "../../paginationfunction";
import Axios from "axios";
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import {Table} from "antd";
import {toast, ToastContainer} from "react-toastify";
function calculateTimeDifference(startTime, endTime) {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const timeDifferenceInMilliseconds = end - start;

    // Convert milliseconds to hours
    const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if(timeDifferenceInHours.toFixed(2)=="NaN")
    {
        return 0;
    }
    else{
        return timeDifferenceInHours.toFixed(2);
    }
}
const AttendanceEmployee = () => {

    const [menu, setMenu] = useState(false);
    const [attendance, setAttendance] = useState();
    const [visibility, setVisibility] = useState(false);
    let object = JSON.parse(localStorage.getItem('user'));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let [date, setDate] = useState(new Date());
    let DAY = date.getDay(), DATE = date.getDate(), MONTH = date.getMonth(), YEAR = date.getFullYear();
    const toggleMobileMenu = () => {
        setMenu(!menu)
    }
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
    const getAttendanceByEmpID = () => {
        Axios.get(baseApiUrl + `attendance/employeeId?employeeId=${object.employee.id}&date=${DATE}&year=${YEAR}&month=${MONTH + 1}`)
            .then((res) => {
                if (res.data.status == 200) {
                    setAttendance(res.data.Attendance);
                    if (res.data.Attendance.punch_in !== '') {
                        // console.log("jksdafhdsjlasdfjk")
                        setVisibility(true);
                    }
                }
            })
            .catch((err) => console.log(err.response.data));
    };
    const [toggle, setToggle] = useState(false);
    const punchIn = () => {
        // console.log(YEAR," jkk")
        const formData = {
            employeeId: object.employee.id,
            year: YEAR,
            month: MONTH + 1,
            date: DATE
        };
        Axios.post(baseApiUrl + "attendance/punch_in", formData)
            .then((res) => {

                    if (res.data.status == 200) {
                        // getAllFloor();
                        getAttendanceByEmpID();
                        toast.success(res.data.message);
                        setToggle(true);
                    }
                }
            )
            .catch((err) => toast.error(err.response.data.message));
    }
    const punchOut = () => {

        const formData = {
            employeeId: object.employee.id,
            year: YEAR,
            month: MONTH + 1,
            date: DATE
        };
        Axios.post(baseApiUrl + "attendance/punch_out", formData)
            .then((res) => {
                    if (res.data.status == 200) {
                        // getAllFloor();
                        getAttendanceByEmpID();
                        toast.success(res.data.message);
                        setToggle(false);
                    }
                }
            )
            .catch((err) => toast.error(err.response.data.message));
    }
    const startTime = attendance?.punch_in.slice(-8 ,-3)
    const endTime = attendance?.punch_out.slice(-8 ,-3);
    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
        getAttendanceByEmpID();
        let timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);
    return (

        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
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
                    <title>Attendance - Sheranwala Developer</title>
                    <meta name="description" content="Login page"/>
                </Helmet>
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Attendance</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Attendance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card punch-status">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Timesheet <small
                                        className="text-muted">{DATE + ` ` + monthNames[MONTH] + ` ` + YEAR}</small>
                                    </h5>
                                    {visibility && (
                                        <div className="punch-det">
                                            <h6>Punch In at</h6>
                                            <p>{attendance?.punch_in}</p>
                                            {/*Wed, 11th Mar 2019 10.00 AM*/}
                                        </div>
                                    )}
                                    <div className="punch-info">
                                        <div className="punch-hours">
                                            <span>{calculateTimeDifference(startTime, endTime)} hrs</span>
                                        </div>
                                    </div>
                                    <div className="punch-btn-section">
                                        <button type="button"
                                                className={`btn btn-primary punch-btn ${toggle ? 'd-none' : ' '}`}
                                                onClick={punchIn}>Punch In
                                        </button>
                                        <button type="button"
                                                className={`btn btn-primary punch-btn ${!toggle ? 'd-none' : ' '}`}
                                                onClick={punchOut}>Punch Out
                                        </button>
                                    </div>
                                    {/*<div className="statistics">*/}
                                    {/*  <div className="row">*/}
                                    {/*    <div className="col-md-6 col-6 text-center">*/}
                                    {/*      <div className="stats-box">*/}
                                    {/*        <p>Break</p>*/}
                                    {/*        <h6>1.21 hrs</h6>*/}
                                    {/*      </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-md-6 col-6 text-center">*/}
                                    {/*      <div className="stats-box">*/}
                                    {/*        <p>Overtime</p>*/}
                                    {/*        <h6>3 hrs</h6>*/}
                                    {/*      </div>*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        {/*// <div className="col-md-4">*/}
                        {/*//   <div className="card att-statistics">*/}
                        {/*//     <div className="card-body">*/}
                        {/*      <h5 className="card-title">Statistics</h5>*/}
                        {/*      <div className="stats-list">*/}
                        {/*        <div className="stats-info">*/}
                        {/*          <p>Today <strong>3.45 <small>/ 8 hrs</small></strong></p>*/}
                        {/*          <div className="progress">*/}
                        {/*            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '31%' }} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />*/}
                        {/*//           </div>*/}
                        {/*//         </div>*/}
                        {/*//         <div className="stats-info">*/}
                        {/*          <p>This Week <strong>28 <small>/ 40 hrs</small></strong></p>*/}
                        {/*          <div className="progress">*/}
                        {/*            <div className="progress-bar bg-warning" role="progressbar" style={{ width: '31%' }} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />*/}
                        {/*          </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="stats-info">*/}
                        {/*          <p>This Month <strong>90 <small>/ 160 hrs</small></strong></p>*/}
                        {/*          <div className="progress">*/}
                        {/*//             <div className="progress-bar bg-success" role="progressbar" style={{ width: '62%' }} aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} />*/}
                        {/*//           </div>*/}
                        {/*//         </div>*/}
                        {/*        <div className="stats-info">*/}
                        {/*          <p>Remaining <strong>90 <small>/ 160 hrs</small></strong></p>*/}
                        {/*          <div className="progress">*/}
                        {/*            <div className="progress-bar bg-danger" role="progressbar" style={{ width: '62%' }} aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} />*/}
                        {/*          </div>*/}
                        {/*//         </div>*/}
                        {/*//         <div className="stats-info">*/}
                        {/*//           <p>Overtime <strong>4</strong></p>*/}
                        {/*//           <div className="progress">*/}
                        {/*            <div className="progress-bar bg-info" role="progressbar" style={{ width: '22%' }} aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} />*/}
                        {/*          </div>*/}
                        {/*        </div>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div className="col-md-4">
                            <div className="card recent-activity">
                                <div className="card-body">
                                    <h5 className="card-title">Today Activity</h5>
                                    {visibility && (
                                        <ul className="res-activity-list">
                                            <li>
                                                <p className="mb-0">Punch In at</p>
                                                <p className="res-activity-time">
                                                    <i className="fa fa-clock-o"/>
                                                    {attendance?.punch_in}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-0">Punch Out at</p>
                                                <p className="res-activity-time">
                                                    <i className="fa fa-clock-o"/>
                                                    {attendance?.punch_out}
                                                </p>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Search Filter */}
                    {/* <div className="row filter-row">
              <div className="col-sm-3">  
                <div className="form-group form-focus select-focus">
                  <div>
                    <input type="date" className="form-control floating datetimepicker" />
                  </div>
                  <label className="focus-label">Date</label>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="form-group form-focus select-focus">
                  <select className="select floating"> 
                    <option>-</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                  </select>
                  <label className="focus-label">Select Month</label>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="form-group form-focus select-focus">
                  <select className="select floating"> 
                    <option>-</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                  </select>
                  <label className="focus-label">Select Year</label>
                </div>
              </div>
              <div className="col-sm-3">  
                <a href="#" className="btn btn-success btn-block w-100"> Search </a>  
              </div>     
            </div> */}
                    {/* /Search Filter */}
                    {/*<div className="row">*/}
                    {/*  <div className="col-md-12">*/}
                    {/*    <div className="table-responsive">*/}
                    {/*      <Table*/}
                    {/*//         className="table-striped"*/}
                    {/*//         pagination={{*/}
                    {/*//           total: employeeAttendance?.length,*/}
                    {/*//           showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,*/}
                    {/*//           showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender*/}
                    {/*//         }}*/}
                    {/*//         style={{ overflowX: "auto" }}*/}
                    {/*        columns={columns}*/}
                    {/*        bordered*/}
                    {/*        dataSource={employeeAttendance}*/}
                    {/*        rowKey={(record) => record?.id}*/}
                    {/*      />*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                </div>
                {/* /Page Content */}
            </div>
        </div>
    );
}

export default AttendanceEmployee;
