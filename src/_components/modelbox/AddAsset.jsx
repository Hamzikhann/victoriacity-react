  
  import { Field, Formik } from 'formik';
import React from 'react';
import { DateDropField } from '../fields/DateDropField';
import { DatePickerField } from '../fields/DatePickerField';
import * as yup from "yup";
import { useState } from 'react';
import { InputText } from '../fields/InputText';

  const AddAsset = () => {
    const jobFormValidation = yup.object().shape({
      jobTitle: yup.string().required("Job title is required"),
      startDate: yup.string().required("Start Date is required"),
      endDate: yup.string().required("End Date is required"),
      jobLocation: yup.string().required("Job location is required"),
      jobType: yup.string().required("Job Type is required"),
      departments: yup.string().required("Departments is required"),
      status: yup.string().required("Status is required"),
      noOfVacancies: yup.string().required("No of vacancies is required"),
      description: yup.string().required("Description is required"),
    });

    const [initialValues, setInitialValues] = useState({
      id: '',
      action: 'add',
      jobTitle: '',
      startDate: '',
      endDate: '',
      status: '',
      jobLocation: '',
      salaryFrom: '',
      salaryTo: '',
      isActive: '',
      experience: '',
      jobType: '',
      departments: '',
      noOfVacancies: '',
      description: '',
      age: '',
  
    })

    const submit = (value) => {
      // console.log(initialValues);
      const formData = {
        id: value.id,
        action: value.action,
        jobtitle: value.jobTitle,
        department: value.departments,
        location: value.jobLocation,
        vacancies: value.noOfVacancies,
        experience: value.experience,
        age: value.age,
        salaryFrom: value.salaryFrom,
        salaryTo: value.salaryTo,
        jobtype: value.jobType,
        status: value.status,
        startdate: value.startDate,
        expirydate: value.endDate,
        description: value.description,
        isActive: value.isActive
      };
  
      if (value.action == 'edit') {
        Axios.put(baseApiUrl + "job/update", formData)
          .then((res) => {
            setAddJobModal(false);
            setEditModalOpen(false);
            setExperience("");
            setAge("");
            setSalaryTo("");
            setSalaryFrom("");
            setInitialValues({
              id: '',
              action: 'add',
              jobTitle: '',
              startDate: '',
              endDate: '',
              status: '',
              jobLocation: '',
              salaryFrom: '',
              salaryTo: '',
              isActive: '',
              experience: '',
              jobType: '',
              departments: '',
              noOfVacancies: '',
              description: '',
              age: '',
  
            });
            getAllJobs();
          })
          .catch((err) => console.log(err));
      } else if (value.action == 'add') {
        Axios.post(baseApiUrl + "job/add", formData)
          .then((res) => {
            setAddJobModal(false);
            setEditModalOpen(false);
            setExperience("");
            setAge("");
            setSalaryTo("");
            setSalaryFrom("");
            setInitialValues({
              id: '',
              action: 'add',
              jobTitle: '',
              startDate: '',
              endDate: '',
              status: '',
              jobLocation: '',
              salaryFrom: '',
              salaryTo: '',
              isActive: '',
              experience: '',
              jobType: '',
              departments: '',
              noOfVacancies: '',
              description: '',
              age: '',
  
            });
            getAllJobs();
          })
          .catch((err) => console.log(err));
      }
  
  
    };

    const CustomInputComponent = (props) => (
      <textarea className="my-custom-input" type="text" {...props} />
    );
    return ( 
  <>
  {/* Add Asset Modal */}
  <div id="add_asset" className="modal custom-modal fade" role="dialog">
  <div className="modal-dialog modal-md" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add Asset</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">

      <Formik
                validationSchema={jobFormValidation}
                initialValues={initialValues}
                onSubmit={submit}
              >
                {({ handleSubmit, errors, values, isValid, touched }) => {
                  // console.log(errors);
                  return (
                   <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Asset Name</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Asset Id</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Purchase Date</label>
                <input className="form-control datetimepicker" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Purchase From</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Manufacturer</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Model</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Serial Number</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Supplier</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Condition</label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Warranty</label>
                <input className="form-control" type="text" placeholder="In Months" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Value</label>
                <input placeholder="$1800" className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Asset User</label>
                <select className="select">
                  <option>John Doe</option>
                  <option>Richard Miles</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" defaultValue={""} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Status</label>
                <select className="select">
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Deployed</option>
                  <option>Damaged</option>
                </select>
              </div>
            </div>
          </div>
          <div className="submit-section">
            <button className="btn btn-primary submit-btn">Submit</button>
          </div>
        </form> 
                  );
                }}
              </Formik>
    
      </div>
    </div>
  </div>
</div>
{/* /Add Asset Modal */}
</>
)
}

export default AddAsset