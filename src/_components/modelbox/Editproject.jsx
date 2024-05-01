import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Modal, Form} from "react-bootstrap";
import {Field, Formik} from "formik";
import Select from "react-select";
import {toast} from "react-toastify";

const Editproject = ({
                         project,
                         isShowEditProjectModal,
                         setIsShowEditProjectModal,
                         getprojectById,
                     }) => {
    const [baseApiUrl, setBaseApiUrl] = useState(
        process.env.REACT_APP_API_URL + "/api/user/"
    );
    const [customers, setcustomers] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [loading, setloading] = useState(false);
    const pOptions = [
        {value: "High", label: "High"},
        {value: "Medium", label: "Medium"},
        {value: "Low", label: "Low"},
    ];
    const statusOptions = [
        {value: true, label: "Active"},
        {value: false, label: "InActive"},
    ];
    const getAllCustomers = () => {
        Axios.get(baseApiUrl + "customer/list")
            .then((res) => {
                setcustomers(res.data.customers);
                setCurrentCustomer(
                    res.data.customers.find((item) => {
                        console.log(res.data.customers, "1234567890")
                        return item?.customerId == project?.customerId;
                    })
                );
            })
            .catch((err) => console.log(err.response.data));
    };
    console.log("%%%%%%%%%%%%%%%%", project);

    useEffect(() => {
        getAllCustomers();
    }, [project]);

    return (
        <>
            {/* Edit Project Modal */}

            {project && (
                <Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Project</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setIsShowEditProjectModal(false)}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    id: project.id,
                                    name: project.name,
                                    description: project.description,
                                    status: project.status,
                                    startDate: project.startDate,
                                    endDate: project.endDate,
                                    priority: project.priority,
                                    customerId: project.customerId,
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = " Name is required";
                                    }
                                    if (!values.description) {
                                        errors.description = "description is required";
                                    }
                                    if (!values.startDate) {
                                        errors.startDate = "start Date is required";
                                    }
                                    if (!values.status) {
                                        errors.status = "status is required";
                                    }
                                    if (!values.endDate) {
                                        errors.endDate = "End Date is required";
                                    }
                                    if (!values.customerId) {
                                        errors.customerId = "Customer Id is required";
                                    }
                                    if (!values.priority) {
                                        errors.priority = "priority is required";
                                    }
                                    console.log(errors)
                                    return errors;
                                }}
                                onSubmit={async (values, {setSubmitting}) => {
                                    const formData = {
                                        name: values.name,
                                        description: values.description,
                                        status: values.status,
                                        startDate: values.startDate,
                                        endDate: values.endDate,
                                        priority: values.priority,
                                        customerId: values.customerId,
                                        image: values.image,
                                    };
                                    try {
                                        setloading(true);
                                        const res = await Axios.put(
                                            baseApiUrl + `/project/update?id=${values.id}`,
                                            formData
                                        )
                                        if (res.data.status == 200) {
                                            console.log("SSSSSSS", res.data);
                                            toast.success(res.data.message);
                                            setloading(false);
                                            getprojectById();
                                            setIsShowEditProjectModal(false);
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
                                      /* and other goodies */
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Project Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={values.name}
                                                        onChange={(e) => {
                                                            setFieldValue("name", e.target.value);
                                                        }}
                                                    />
                                                    <span className="error">
                            {errors.name && touched.name && errors.name}
                          </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Client</label>
                                                    <Select
                                                        defaultValue={{
                                                            label: `${currentCustomer?.fullName} - ${currentCustomer?.companyName}`,
                                                            value: `${currentCustomer?.id}`,
                                                        }}
                                                        placeholder="Select Client"
                                                        options={customers?.map((item) => {
                                                            return {
                                                                value: item.id,
                                                                label: `${item.fullName} - ${item.companyName}`,
                                                            };
                                                        })}
                                                        onChange={(value) => {
                                                            setFieldValue("CustomerId", value.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Start Date</label>
                                                    <div>
                                                        <input
                                                            className="form-control datetimepicker"
                                                            type="date"
                                                            value={values.startDate}
                                                            onChange={(e) => {
                                                                setFieldValue("startDate", e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <div>
                                                        <input
                                                            className="form-control datetimepicker"
                                                            type="date"
                                                            value={values.endDate}
                                                            onChange={(e) => {
                                                                setFieldValue("endDate", e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Priority</label>
                                                    <Select
                                                        defaultValue={{
                                                            label: `${values.priority}`,
                                                            value: `${values.priority}`,
                                                        }}
                                                        placeholder="Select Priority"
                                                        options={pOptions}
                                                        onChange={(value) => {
                                                            setFieldValue("priority", value.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>status</label>
                                                    <Select
                                                        defaultValue={{
                                                            label: `${values.status}`,
                                                            value: `${values.status}`,
                                                        }}
                                                        placeholder="Select Status"
                                                        options={statusOptions}
                                                        onChange={(value) => {
                                                            setFieldValue("status", value.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <label></label> */}
                                        {/* <ReactSummernote
                       value="Default value"
                       options={{
                         lang: "ru-RU",
                         height: 350,
                         dialogsInBody: true,
                         toolbar: [
                           ["style", ["style"]],
                           ["font", ["bold", "underline", "clear"]],
                           ["fontname", ["fontname"]],
                           ["para", ["ul", "ol", "paragraph"]],
                           ["table", ["table"]],
                           ["insert", ["link", "picture", "video"]],
                           ["view", ["fullscreen", "codeview"]],
                         ],
                       }}
                       // onChange={this.onChange}
                       onImageUpload={onImageUpload}
                     /> */}

                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                style={{height: "200px"}}
                                                rows={3}
                                                value={values.description}
                                                onChange={(e) => {
                                                    setFieldValue("description", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                        <div className="form-group">
                                            <label>Upload Files</label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                onChange={(e) => {
                                                    console.log(e.target.files[0], " img ");
                                                    setFieldValue("image", e.target.files[0]);
                                                }}
                                            />
                                        </div>
                                        <div className="submit-section">
                                            {loading ? (
                                                <button
                                                    type="submit"
                                                    disabled={true}
                                                    className="btn btn-primary submit-btn"
                                                >
                                                    <div className="spinner-border text-warning" role="IsActive">
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
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal>
            )}
            {/* /Edit Project Modal */}
        </>
    );
};

export default Editproject;
