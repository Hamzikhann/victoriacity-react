/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Jobdetails = () => {
  const [jobDetails, setJobDetails] = useState(null);

  const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/user/");
  const jobId = window.location.href.split('/').pop();
  const query = useQuery();
  const getJobDetails = () => {
    console.log(jobId);
    Axios.get(baseApiUrl + `job?id=${query.get("id")}`)
      .then((res) => {
        setJobDetails(res.data.Jobs[0]);
        // console.log(res.data.Jobs[0].jobtitle, "UHNJ");
        console.log(res.data.Jobs[0], "UHNJ");


      })
      .catch((err) => console.log(err.response.data));
  };

  // function getBase64(file) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     console.log(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // }

  useEffect(() => {
    getJobDetails();
  }, [])

      return ( 
       <div className="page-wrapper">
        <Helmet>
            <title>Jobs - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet>
       {/* Page Content */}
       <div className="content container-fluid">
         {/* Page Header */}
         <div className="page-header">
           <div className="row">
             <div className="col-sm-12">
                  <h3 className="page-title">Job </h3>
               <ul className="breadcrumb">
                 <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                 <li className="breadcrumb-item active">Job Details</li>
               </ul>
             </div>
           </div>
         </div>
         {/* /Page Header */}
         <div className="row">
           <div className="col-md-8">
             <div className="job-info job-widget">
                  <h3 className="job-title">{jobDetails && jobDetails.jobtitle}</h3>
                  <span className="job-dept">{jobDetails && jobDetails.department}</span>
               <ul className="job-post-det">
                    <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{jobDetails && jobDetails.startdate}</span></li>
                    <li><i className="fa fa-user-o" /> Applications: <span className="text-blue">{jobDetails && jobDetails.applicants}</span></li>
               </ul>
             </div>
             <div className="job-content job-widget">
               <div className="job-desc-title"><h4>Job Description</h4></div>
               <div className="job-description">
                    {jobDetails && jobDetails.description}
                  </div>

             </div>
           </div>
           <div className="col-md-4">
             <div className="job-det-info job-widget">
                  {/* <a className="btn job-btn" href="#" data-bs-toggle="modal" data-bs-target="#edit_job">Edit</a> */}
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
                    <p>{jobDetails && jobDetails.experience}</p>
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
                 <p className="text-truncate"> 818-978-7102
                   <br /> <a href="mailto:danielporter@example.com" title="danielporter@example.com">danielporter@example.com</a>
                   <br /> <a href="https://www.example.com" target="_blank" title="https://www.example.com">https://www.example.com</a>
                 </p>
               </div>
               <div className="info-list text-center">
                 <a className="app-ends" href="#">Application ends in 2d 7h 6m</a>
               </div> */}
             </div>
           </div>
         </div>
       </div>
       {/* /Page Content */}
       {/* Edit Job Modal */}
       <div id="edit_job" className="modal custom-modal fade" role="dialog">
         <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
           <button type="button" className="close" data-bs-dismiss="modal">×</button>
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title">Edit Job</h5>
               <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">×</span>
               </button>
             </div>
             <div className="modal-body">
               <form>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Job Title</label>
                       <input className="form-control" type="text" defaultValue="Web Developer" />
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Department</label>
                       <select className="select">
                         <option>-</option>
                         <option >Web Development</option>
                         <option>Application Development</option>
                         <option>IT Management</option>
                         <option>Accounts Management</option>
                         <option>Support Management</option>
                         <option>Marketing</option>
                       </select>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Job Location</label>
                       <input className="form-control" type="text" defaultValue="California" />
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>No of Vacancies</label>
                       <input className="form-control" type="text" defaultValue={5} />
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Experience</label>
                       <input className="form-control" type="text" defaultValue="2 Years" />
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Age</label>
                       <input className="form-control" type="text" defaultValue="-" />
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Salary From</label>
                       <input type="text" className="form-control" defaultValue="32k" />
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Salary To</label>
                       <input type="text" className="form-control" defaultValue="38k" />
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Job Type</label>
                       <select className="select">
                         <option >Full Time</option>
                         <option>Part Time</option>
                         <option>Internship</option>
                         <option>Temporary</option>
                         <option>Remote</option>
                         <option>Others</option>
                       </select>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Status</label>
                       <select className="select">
                         <option >Open</option>
                         <option>Closed</option>
                         <option>Cancelled</option>
                       </select>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Start Date</label>
                       <input type="text" className="form-control datetimepicker" defaultValue="3 Mar 2019" />
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Expired Date</label>
                       <input type="text" className="form-control datetimepicker" defaultValue="31 May 2019" />
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-12">
                     <div className="form-group">
                       <label>Description</label>
                       <textarea className="form-control" defaultValue={""} />
                     </div>
                   </div>
                 </div>
                 <div className="submit-section">
                   <button className="btn btn-primary submit-btn">Save</button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
       {/* /Edit Job Modal */}
     </div>
      );
}

export default Jobdetails;
