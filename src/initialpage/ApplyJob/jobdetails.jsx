import React, { useState,useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {headerlogo,lnEnglish,lnFrench,lnSpanish,lnGerman} from '../../Entryfile/imagepath.jsx'
import Axios from "axios";
import { Formik } from 'formik';
import { Modal, Button, Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image.js";

const Jobdetails = (props) => {
  const [jobslist, setjobslist] = useState([]),
  [loading, setloading] = useState(false),
  [showedit, setshowedit] = useState(false),
  [applyModalShow,setApplyModalShow] = useState(false),
  [formSubmitted,setFormSubmitted] = useState(false),
  [folder_name, setfolder_name] = useState("");
  const [jobDetails,setJobDetails] = useState(null);
  
  const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL+"/api/user/");
  
  const jobId = window.location.href.split('/').pop();

  const getJobDetails = () => {
    console.log(jobId);
    Axios.get(baseApiUrl + "job/details/"+jobId)
    .then((res) => {
      setJobDetails(res.data.job);
      //console.log(res.data.jobs);
    })
    .catch((err) => console.log(err.response.data));
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    getJobDetails();
  },[])

  useEffect(() => {
      window.onpopstate = ()=> {
        if(this._isMounted) {
          localStorage.removeItem("jobview")
          window.location.reload()
          // const { hash } = location;
          // if(hash.indexOf('home')>-1 && this.state.value!==0)
          //   this.setState({value: 0})
          // if(hash.indexOf('users')>-1 && this.state.value!==1)
          //   this.setState({value: 1})
          // if(hash.indexOf('data')>-1 && this.state.value!==2)
          //   this.setState({value: 2})
        }
      }
  });   
      
  return (
          < >
          <Helmet>
                <title>Jobs - Sheranwala Developer</title>
                <meta name="description" content="Login page"/>					
          </Helmet>
          {/* Header */}
          <div className="header">
            {/* Logo */}
            <div className="header-left">
              <Link to="/app/main/dashboard" className="logo">
                <img src={headerlogo} width={40} height={40} alt="" />
              </Link>
            </div>
            {/* /Logo */}
            {/* Header Title */}
            <div className="page-title-box float-start">
              <h3>Sheranwala Developers</h3>
            </div>
            {/* /Header Title */}
            {/* Header Menu */}
            <ul className="nav user-menu">
              {/* Search */}
              <li className="nav-item">
                <div className="top-nav-search">
                  <a href=";" className="responsive-search">
                    <i className="fa fa-search" />
                  </a>
                  <form>
                    <input className="form-control" type="text" placeholder="Search here" />
                    <button className="btn" type="submit"><i className="fa fa-search" /></button>
                  </form>
                </div>
              </li>
              {/* /Search */}
              {/* Flag */}
              {/* <li className="nav-item dropdown has-arrow flag-nav">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
                  <img src={lnEnglish} alt="" height={20} /> <span>English</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a href="" className="dropdown-item">
                    <img src={lnEnglish} alt="" height={16} /> English
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnFrench} alt="" height={16} /> French
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnSpanish} alt="" height={16} /> Spanish
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnGerman} alt="" height={16} /> German
                  </a>
                </div>
              </li> */}
              {/* /Flag */}
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
            {/* /Header Menu */}
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
              </div>
            </div>
            {/* /Mobile Menu */}
          </div>
          {/* /Header */}
          {/* Page Wrapper */}
          <div className="page-wrapper job-wrapper">
            {/* Page Content */}
            <div className="content container">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Jobs</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link  to="/app/main/dashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Jobs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {formSubmitted && <div className="alert alert-success">Your application submitted succesfully</div>}

              {/* /Page Header */}
              <div className="row">
                <div className="col-md-8">
                  <div className="job-info job-widget">
                    <h3 className="job-title">{jobDetails && jobDetails.jobtitle}</h3>
                    <span className="job-dept">{jobDetails && jobDetails.department}</span>
                    <ul className="job-post-det">
                      <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{jobDetails && jobDetails.startdate}</span></li>
                      {/* <li><i className="fa fa-calendar" /> Last Date: <span className="text-blue">May 31, 2019</span></li> */}
                      <li><i className="fa fa-user-o" /> Applications: <span className="text-blue">{jobDetails && jobDetails.applicants}</span></li>
                      {/* <li><i className="fa fa-eye" /> Views: <span className="text-blue">3806</span></li> */}
                    </ul>
                  </div>
                  <div className="job-content job-widget">
                    <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                      <p>{jobDetails && jobDetails.description}</p>
                    </div>
                    {/* <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                      <ul className="square-list">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      </ul>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="job-det-info job-widget">
                    <a className="btn job-btn" onClick={()=>{setApplyModalShow(true)}}>Apply For This Job</a>
                    <div className="info-list">
                      <span><i className="fa fa-bar-chart" /></span>
                      <h5>Job Type</h5>
                      <p> {jobDetails && jobDetails.jobtype}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-money" /></span>
                      <h5>Salary</h5>
                      <p>${jobDetails && jobDetails.salaryFrom} - ${jobDetails && jobDetails.salaryTo}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-suitcase" /></span>
                      <h5>Experience</h5>
                      <p>{jobDetails && jobDetails.experience} Years</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-ticket" /></span>
                      <h5>Vacancy</h5>
                      <p>{jobDetails && jobDetails.vacancies}</p>
                    </div>
                    <div className="info-list">
                      <span><i className="fa fa-map-signs" /></span>
                      <h5>Location</h5>
                      <p>{jobDetails && jobDetails.location}</p>
                    </div>
                    {/* <div className="info-list">
                      <p> 818-978-7102
                        <br /> danielporter@example.com
                        <br /> https://www.example.com
                      </p>
                    </div> */}
                    {/* <div className="info-list text-center">
                      <a className="app-ends" href="#">Application ends in 2d 7h 6m</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="modal custom-modal fade" id="apply_job" role="dialog"> */}
              <Modal show={applyModalShow} className="modal custom-modal" id="apply_job">
              {/* <div className="modal-dialog modal-dialog-centered" role="document" style={{ minWidth: 730 }}> */}
                {/* <div className="modal-content"> */}
                  <div className="modal-header">
                    <h5 className="modal-title">Add Your Details</h5>
                    <button type="button" className="close" onClick={()=>setApplyModalShow(false)}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">

                  <Formik
                    initialValues={{ experience:'',first_name: '',last_name: '',email: '', phone: '',current_salary:'',expected_salary:'',cover_letter:'',cv:'' }}
                    validate={values => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = 'Email is required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = 'Invalid email address';
                      }
                      if(!values.first_name){
                        errors.first_name = 'First Name is required';
                      }
                      if(!values.last_name) {
                        errors.last_name = 'Last Name is required';
                      }
                      if(!values.phone) {
                        errors.phone = 'Phone is required';
                      }
                      if(!values.current_salary) {
                        errors.current_salary = 'Current Salary is required';
                      }
                      if(!values.expected_salary) {
                        errors.expected_salary = 'Expected Salary is required';
                      }
                      if(!values.cover_letter) {
                        errors.cover_letter = 'Cover Letter is required';
                      }
                      if(!values.cv) {
                        errors.cv = 'CV is required';
                      }
                      
                      
                      if(!values.experience) {
                        errors.experience = 'Experience is required';
                      }

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const formData = { 
                        jobId: jobId,
                        experience: values.experience, 
                        firstName: values.first_name, 
                        lastName: values.last_name,
                        email: values.email, 
                        phone: values.phone,
                        currentSalary: values.current_salary,
                        expectedSalary: values.expected_salary,
                        coverLetter: values.cover_letter,
                        resume: values.cv, 
                      };

                      Axios.post(baseApiUrl + "job/candidates/add",formData)
                      .then((res) => {

                        setApplyModalShow(false);
                        setFormSubmitted(true);
                        // alert('done')
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
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>First Name *</label>
                          <input className="form-control" name="first_name" type="text" onChange={(e)=>{
                            setFieldValue('first_name',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.first_name && touched.first_name && errors.first_name}</span>
                        </div>
                        <div className="form-group">
                          <label>Last Name *</label>
                          <input className="form-control" name="last_name" type="text"  onChange={(e)=>{
                            setFieldValue('last_name',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.last_name && touched.last_name && errors.last_name}</span>
                        </div>
                        <div className="form-group">
                          <label>Email Address *</label>
                          <input className="form-control" name="email" type="text"  onChange={(e)=>{
                            setFieldValue('email',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.email && touched.email && errors.email}</span>
                        </div>
                        
                        <div className="form-group">
                          <label>Phone *</label>
                          <input className="form-control" name="phone" type="text"  onChange={(e)=>{
                            setFieldValue('phone',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.phone && touched.phone && errors.phone}</span>
                        </div>


                        <div className="form-group">
                          <label>Experience *</label>
                          <input className="form-control" name="experience" type="text" onChange={(e)=>{
                            setFieldValue('experience',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.experience && touched.experience && errors.experience}</span>
                        </div>
        
                        <div className="form-group">
                          <label>Current Salary *</label>
                          <input className="form-control" name="current_salary" type="text"  onChange={(e)=>{
                            setFieldValue('current_salary',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.current_salary && touched.current_salary && errors.current_salary}</span>
                        </div>
                        
                        
                        <div className="form-group">
                          <label>Expected Salary *</label>
                          <input className="form-control" type="text" name="expected_salary" onChange={(e)=>{
                            setFieldValue('expected_salary',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.expected_salary && touched.expected_salary && errors.expected_salary}</span>
                        </div>

                        <div className="form-group">
                          <label>Cover Letter *</label>
                          <textarea className="form-control" defaultValue={""} rows="7" name="cover_letter" onChange={(e)=>{
                            setFieldValue('cover_letter',e.target.value);
                          }}/>
                          <span style={{color: 'red'}} className="error">{errors.cover_letter && touched.cover_letter && errors.cover_letter}</span>
                        </div>
                        <div className="form-group">
                          <label>Upload your CV *</label>
                          <div className="custom-file">
                            
                            <input type="file" className="custom-file-input" id="cv_upload" onChange = {(evt) => {
                                setFieldValue('cv','');
                                var tgt = evt.target || window.event.srcElement,
                                files = tgt.files;
                                if (FileReader && files && files.length) {
                                    var fr = new FileReader();
                                    fr.onload = function () {
                                        var base64 = fr.result;
                                        setFieldValue('cv',base64);
                                    }
                                    fr.readAsDataURL(files[0]);
                                }
                            }}/>
                            {/* <label className="custom-file-label" htmlFor="cv_upload">Choose file</label> */}
                            <span style={{color: 'red'}} className="error">{errors.cv && touched.cv && errors.cv}</span>
                          </div>
                        </div>
                        <div className="submit-section">
                          <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                      </form>
                    )}
                    </Formik>
                  </div>
                {/* </div> */}
              {/* </div> */}
              </Modal>
            {/* </div> */}
          </div>
        </>
        );
    
       
}

  
export default withRouter(Jobdetails);