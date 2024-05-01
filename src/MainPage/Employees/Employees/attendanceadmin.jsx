import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {
    Avatar_01,
    Avatar_04,
    Avatar_05,
    Avatar_09,
    Avatar_10,
    Avatar_11,
    Avatar_12,
    Avatar_13,
    Avatar_16
} from "../../../Entryfile/imagepath"
import Tableavatar from "../../../_components/tableavatar/tableavatar"
import {Table, Radio, Form, Select, Button} from "antd";
import {itemRender, onShowSizeChange} from "../../paginationfunction";
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar'
import Axios from "axios";
import {Formik} from "formik";
// import Select from 'react-select'
import {values} from "lodash/object";
import Alert from "react-bootstrap/Alert";
import {toast, ToastContainer} from "react-toastify";

const AttendanceAdmin = () => {

    const [menu, setMenu] = useState(false);
    const [dayValue, setDayValue] = useState(null);
    const [monthValue, setMonthValue] = useState(null);
    const [yearValue, setYearValue] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setloading] = useState(false);
    const [attendance, setAttendance] = useState(null);
    const [allEmployee, setAllEmployee] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState(null);
    const [selectedValues, setSelectedValues] = useState({});
    const toggleMobileMenu = () => {
        setMenu(!menu)
    }
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
    const [initialValues, setInitialValues] = useState({
        date: "",
        month: "",
        year: "",
        employeeId: "",
    });
    let dateOptions = []
    let monthOptions = []
    let yearOptions = []
    let y = 2015;
    for (let i = 0; i < 31; i++) {
        dateOptions.push({value: i + 1, label: i + 1})
        // const arrDate = new Date(new Date().setFullYear(new Date().getFullYear() + i)).getFullYear()
        yearOptions.push({value: i + y, label: i + y})
    }
    for (let i = 0; i < 12; i++) {
        const date = new Date(new Date().setMonth(new Date().getMonth() + i));
        const monthValue = date.getMonth();
        const monthLabel = date.toLocaleString('default', {month: 'short'});
        monthOptions.push({value: monthValue + 1, label: monthLabel});
    }
    // console.log(dateOptions)
    // console.log(monthOptions)
    // console.log(yearOptions)
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    const getSpecificEmployee = () => {
        Axios.post(baseApiUrl + "attendance/date", {
            date: dayValue,
            month: monthValue,
            year: yearValue
        }).then((res) => {
            if (res.data.status == 200) {
                // console.log(res.data, "data found");
                setAttendance(res.data.data);
                setloading(false);
                setShowAlert(false);
                toast.success(res.data.message);
            }
        }).catch((err) => {
            setloading(false);
            // toast.error(err.response.data.message);
            setShowAlert(true);
        });
    };
    const columns = [
        {
            title: "Employee Name",
            dataIndex: "employee",
            // sorter: (a, b) => a.id - b.id,

            render: (text, record) => {
                // console.log(text," 999999999999999999990000000000000",record,text)
                return (
                    <h2 className="table-avatar">
                        {/* <Link to="/app/profile/employee-profile" className="avatar"></Link> */}
                        <img alt="img" src={text?.image} className="avatar" onError={({currentTarget}) => {
                      
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                                "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png";
                        }}/>
                        <div>{text?.fullName}</div>
                        {/* <Link to="/app/profile/employee-profile"> <span>{record.role}</span></Link> */}
                    </h2>
                )
            },
        },
        // {
        //   title: "Present",
        //   dataIndex: "employeeId",
        //   render: (text, record) => (
        //     <input
        //       className="form-control1"
        //       type="radio"
        //       name={`employeeId-${record.id}`}
        //       value="p"
        //     // onChange={(e) => {
        //     //   if (e.target.checked) {
        //     //     setFieldValue("employeeId", "p");
        //     //   }
        //     // }}
        //     />
        //   ),
        //   // sorter: (a, b) => a.memberName.length - b.memberName.length,
        // },
        // {
        //   title: "Absent",
        //   dataIndex: "employeeId",
        //   render: (text, record) => (
        //     <input
        //       className="form-control1"
        //       type="radio"
        //       name={`employeeId-${record.id}`}
        //       value="a"
        //     // onChange={(e) => {
        //     //   if (e.target.checked) {
        //     //     setFieldValue("employeeId", "a");
        //     //   }
        //     // }}
        //     />
        //   ),
        // },
        {
            title: "Status",
            dataIndex: "attendance",
            render: (text, record) => {
                console.log(text, "kkkkk", record)
                return (
                    <Form.Item name={`attendance`}>
                        <Radio.Group
                            defaultValue={record.attendance.attendance + `-` + record?.employee?.employeeId}
                            value={record.attendance.attendance + `-` + record?.employee?.employeeId}
                            // defaultValue={'p'}
                            onChange={(e) => {
                                setSelectEmployee({employeeId: record?.employee?.employeeId})
                                console.log("dddddddddddddsssssss",record?.employee?.employeeId)
                                form.setFieldsValue({attendance: e.target.value});
                                // form.getFieldsValue(true);
                                form.submit();
                            }
                            }

                            // value={'a'}
                            // defaultValue={record.attendance.attendance === 'a'? true: false}
                        >
                            {/* {console.log('fjfy', record.attendance.attendance)} */}
                            {/* {console.log('jhfyyf',record.attendance.attendance, record.attendance.attendance === 'a')} */}
                            <Radio value={`p-${record?.employee?.employeeId}`} key={`p-${record?.employee?.employeeId}`}>Present</Radio>
                            <Radio value={`a-${record?.employee?.employeeId}`} key={`a-${record?.employee?.employeeId}`}>Absent</Radio>
                            <Radio value={`l-${record?.employee?.employeeId}`} key={`l-${record?.employee?.employeeId}`}>Leave</Radio>
                            {/* {console.log("sdddddddddddddddddddddddddddddddddd",record?.employee?.id)} */}
                        </Radio.Group>
                    </Form.Item>
                )
            },
        },
    ];
    const getAllEmployee = () => {
        Axios.get(baseApiUrl + "employee/list").then((res) =>
            setAllEmployee(res.data.employee)
        );
    };


    const getAttendance = (values) => {
        // console.log('yyyyyyyyyyyyyyyyyyyyyyyy',selectEmployee, values)
        // const { date, month, year } = values;
        const formData = {
            date: values.date,
            month: values.month,
            year: values.year,
            employeeId: selectEmployee.employeeId,
            attendance: {
                punch_in: "",
                punch_out: "",
                attendance: values.attendance,
                punch_in_note: "",
                punch_out_note: "",
                attendance_note: "",
                holiday_note: "",
                holiday: false
            },
        };
        Axios.post(baseApiUrl + "attendance/add", formData)
            .then((res) => {
                    if (res.data.status == 200) {
                        getSpecificEmployee();
                        toast.success(res.data.message);
                        setSelectEmployee(null);
                    }
                }
            )
            .catch((err) => console.log(err.response.data));
    };

    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
        // getSpecificEmployee();
    }, []);
    // console.log(dayValue, "This is day");
    // console.log(monthValue, "This is month");
    // console.log(yearValue, "This is year");
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
                                    <li className="breadcrumb-item"><Link
                                        to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Attendance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Form */}
                    <div>

                        <Form form={form} onFinish={getAttendance || getSpecificEmployee}>
                            <div className="row filter-row">
                                <div className="col-sm-6 col-md-3">
                                    <div className="form-group">
                                        <label>Select Date</label>
                                        <Form.Item name="date" id="name"
                                                   rules={[{
                                                       required: true,
                                                       message: 'Please Select Date!'
                                                   }]}>
                                            <Select placeholder="Select Date" onChange={(value) => {
                                                setDayValue(value)
                                            }}>
                                                {dateOptions.map((option) => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            {/*<Select placeholder="Select Date" options={dateOptions}*/}
                                            {/*  onChange={(value) => {*/}
                                            {/*    form.setFieldValue("date", value.value)*/}
                                            {/*  }}*/}
                                            {/*/>*/}
                                        </Form.Item>

                                        {/*<span className="error">*/}
                                        {/*  {errors.date && touched.date && errors.date}*/}
                                        {/*</span>*/}
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <div className="form-group">
                                        <label>Select Month</label>
                                        <Form.Item name="month" id="month"
                                                   rules={[{
                                                       required: true,
                                                       message: 'Please Select Month!'
                                                   }]}>
                                            <Select placeholder="Select Month" onChange={(value) => {
                                                setMonthValue(value)
                                            }}>
                                                {monthOptions.map((option) => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {/*<Select placeholder="Select Month" options={monthOptions}*/}
                                        {/*  onChange={(value) => {*/}
                                        {/*    form.setFieldValue("month", value.value)*/}
                                        {/*  }}*/}
                                        {/*/>*/}
                                        {/*<span className="error">*/}
                                        {/*  {errors.month && touched.month && errors.month}*/}
                                        {/*</span>*/}
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <div className="form-group">
                                        <label>Select Year</label>
                                        <Form.Item name="year" id="=year"
                                                   rules={[{
                                                       required: true,
                                                       message: 'Please select year!'
                                                   }]}>
                                            <Select placeholder="Select Year" onChange={(value) => {
                                                setYearValue(value)
                                            }}>
                                                {yearOptions.map((option) => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {/*{option.label}*/}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {/*<Select placeholder="Select Year" options={yearOptions}*/}
                                        {/*  onChange={(value) => {*/}
                                        {/*    form.setFieldValue("year", value.value)*/}
                                        {/*  }}*/}
                                        {/*/>*/}
                                        {/*<span className="error">*/}
                                        {/*  {errors.year && touched.year && errors.year}*/}
                                        {/*</span>*/}
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <div className="form-group">
                                        <label>Search</label>
                                        <Button className="text-bg-success text-light" block
                                                onClick={getSpecificEmployee}>
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {attendance ? (
                                <Table
                                    className="table-striped"
                                    pagination={{
                                        total: attendance?.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true,
                                        onShowSizeChange: onShowSizeChange,
                                        itemRender: itemRender
                                    }}
                                    style={{overflowX: "auto"}}
                                    columns={columns}
                                    bordered
                                    dataSource={attendance}
                                    rowKey={(record) => record.id}
                                />) : (showAlert && (
                                <div className="modal-body">
                                    <Alert
                                        variant="warning"
                                        onClose={() => setShowAlert(false)}
                                        dismissible
                                    >
                                        No Record Found
                                    </Alert>
                                </div>
                            ))}
                        </Form>
                    </div>
                    {/* /Form */}
                    {/* <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                      <th>7</th>
                      <th>8</th>
                      <th>9</th>
                      <th>10</th>
                      <th>11</th>
                      <th>12</th>
                      <th>13</th>
                      <th>14</th>
                      <th>15</th>
                      <th>16</th>
                      <th>17</th>
                      <th>18</th>
                      <th>19</th>
                      <th>20</th>
                      <th>22</th>
                      <th>23</th>
                      <th>24</th>
                      <th>25</th>
                      <th>26</th>
                      <th>27</th>
                      <th>28</th>
                      <th>29</th>
                      <th>30</th>
                      <th>31</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Tableavatar />
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}

                </div>
                {/* /Page Content */}
                {/* Attendance Modal */}
                {/* <div className="modal custom-modal fade" id="attendance_info" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Info</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card punch-status">
                      <div className="card-body">
                        <h5 className="card-title">Timesheet <small className="text-muted">11 Mar 2019</small></h5>
                        <div className="punch-det">
                          <h6>Punch In at</h6>
                          <p>Wed, 11th Mar 2019 10.00 AM</p>
                        </div>
                        <div className="punch-info">
                          <div className="punch-hours">
                            <span>3.45 hrs</span>
                          </div>
                        </div>
                        <div className="punch-det">
                          <h6>Punch Out at</h6>
                          <p>Wed, 20th Feb 2019 9.00 PM</p>
                        </div>
                        <div className="statistics">
                          <div className="row">
                            <div className="col-md-6 col-6 text-center">
                              <div className="stats-box">
                                <p>Break</p>
                                <h6>1.21 hrs</h6>
                              </div>
                            </div>
                            <div className="col-md-6 col-6 text-center">
                              <div className="stats-box">
                                <p>Overtime</p>
                                <h6>3 hrs</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card recent-activity">
                      <div className="card-body">
                        <h5 className="card-title">Activity</h5>
                        <ul className="res-activity-list">
                          <li>
                            <p className="mb-0">Punch In at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              10.00 AM.
                            </p>
                          </li>
                          <li>
                            <p className="mb-0">Punch Out at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              11.00 AM.
                            </p>
                          </li>
                          <li>
                            <p className="mb-0">Punch In at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              11.15 AM.
                            </p>
                          </li>
                          <li>
                            <p className="mb-0">Punch Out at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              1.30 PM.
                            </p>
                          </li>
                          <li>
                            <p className="mb-0">Punch In at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              2.00 PM.
                            </p>
                          </li>
                          <li>
                            <p className="mb-0">Punch Out at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o" />
                              7.30 PM.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
                {/* /Attendance Modal */}
            </div>
        </div>
    );
}

export default AttendanceAdmin;
