import { Button } from "antd";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";

const Create = () => {
	const [isShowProjectModal, setIsShowProjectModal] = useState(false);

	// const columns = [
	//   {
	//     title: "Serial #",
	//     dataIndex: "id",
	//     sorter: (a, b) => a.id - b.id,
	//     // render: (text, record) => (
	//     //   <span>{record.id}</span>
	//     // ),
	//     // ...getColumnSearchProps('id'),
	//   },

	//   {
	//     title: "Application Reg no",
	//     dataIndex: "applicationRegno",
	//     // render: (text, record) => (
	//     //   <Link to="/app/administrator/job-details">{text}</Link>
	//     // ),
	//     sorter: (a, b) => a.applicationRegno.length - b.applicationRegno.length,
	//   },
	//   {
	//     title: "Reg no",
	//     dataIndex: "regno",
	//     sorter: (a, b) => a.regno.length - b.regno.length,
	//   },
	//   {
	//     title: "Owner",
	//     dataIndex: "owner",
	//     sorter: (a, b) => a.owner.length - b.owner.length,
	//   },
	//   {
	//     title: "Second Owner",
	//     dataIndex: "secondOwner",
	//     sorter: (a, b) => a.secondOwner.length - b.secondOwner.length,
	//   },
	//   {
	//       title: "Phase",
	//       dataIndex: "phase",
	//       sorter: (a, b) => a.phase.length - b.phase.length,
	//     },
	//     {
	//       title: "Sector",
	//       dataIndex: "sector",
	//       sorter: (a, b) => a.sector.length - b.sector.length,
	//     },{
	//       title: "Unit Type",
	//       dataIndex: "unitType",
	//       sorter: (a, b) => a.unitType.length - b.unitType.length,
	//     },
	//     {
	//       title: "PlotSize Size",
	//       dataIndex: "plotSize",
	//       sorter: (a, b) => a.plotSize.length - b.plotSize.length,
	//     },
	//     {
	//       title: "Unit Nature",
	//       dataIndex: "unitNature",
	//       sorter: (a, b) => a.unitNature.length - b.unitNature.length,
	//     },
	//   {
	//     title: "PaymentPlan Plan",
	//     dataIndex: "packagePlan",
	//     sorter: (a, b) => a.packagePlan.length - b.packagePlan.length,
	//     // render: (text,record)=>(
	//     // <span>{format(new Date(text), format('dd MM yy' ))}</span>
	//     // )
	//   },
	//   {
	//     title: "Total Amount",
	//     dataIndex: "totalAmount",
	//     sorter: (a, b) => a.totalAmount.length - b.totalAmount.length,
	//   },

	//   {
	//     title: "Advance",
	//     dataIndex: "advance",
	//     sorter: (a, b) => a.advance.length - b.advance.length,
	//   },
	//   {
	//     title: "Remaining",
	//     dataIndex: "remaining",
	//     sorter: (a, b) => a.remaining.length - b.remaining.length,
	//   },
	//   {
	//       title: "Ballot",
	//       dataIndex: "ballot",
	//       sorter: (a, b) => a.ballot.length - b.ballot.length,
	//   },
	//     {
	//       title: "Possession",
	//       dataIndex: "possession",
	//       sorter: (a, b) => a.possession.length - b.possession.length,
	//     },
	//     {
	//       title: "By Annual Charges",
	//       dataIndex: "byAnnualCharges",
	//       sorter: (a, b) => a.byAnnualCharges.length - b.byAnnualCharges.length,
	//     },
	//     {
	//       title: "By Annual After Month",
	//       dataIndex: "byAnnualAfterMonth",
	//       sorter: (a, b) => a.byAnnualAfterMonth.length - b.byAnnualAfterMonth.length,
	//     },
	//     {
	//       title: "Num Installments",
	//       dataIndex: "numInstallments",
	//       sorter: (a, b) => a.numInstallments.length - b.numInstallments.length,
	//     },
	//     {
	//       title: "Created at",
	//       dataIndex: "createdat",
	//       sorter: (a, b) => a.createdat.length - b.createdat.length,
	//     },
	//     {
	//       title: "Updated at",
	//       dataIndex: "updatedat",
	//       sorter: (a, b) => a.updatedat.length - b.updatedat.length,
	//     },
	//   {
	//     title: "Action",
	//     render: (text, record) => {
	//       // console.log(
	//       //   "iiiiiiiiiiiiiii",
	//       //   text.relation,
	//       //   options.find((item) => item.label === text.relation)
	//       // );

	//       return (
	//         <div className="dropdown dropdown-action text-end">
	//           <Link
	//             to="/"
	//             className="action-icon dropdown-toggle"
	//             data-bs-toggle="dropdown"
	//             aria-expanded="false"
	//           >
	//             <i className="material-icons">more_vert</i>
	//           </Link>
	//           <div className="dropdown-menu dropdown-menu-right">
	//             <Link
	//               to="/"
	//               className="dropdown-item"
	//               data-bs-toggle="modal"
	//               data-bs-target="#edit_member"
	//               // onClick={() => {
	//               //   setQuery(text.id);
	//               //   setMemberInitialValues({
	//               //     memberName: "",
	//               //     contact: "",
	//               //     email: "",
	//               //     cnic: "",
	//               //     fatherName: "",
	//               //     userImage: "",
	//               //     dob: "",
	//               //     address: "",
	//               //     permanentAddress: "",
	//               //     ...text,
	//               //     relation: options.find(item => item.label === text.relation),
	//               //   })
	//               // }}
	//             >
	//               <i className="fa fa-pencil m-r-5" /> Edit
	//             </Link>
	//             <Link
	//               to="/"
	//               className="dropdown-item"
	//               data-bs-toggle="modal"
	//               data-bs-target="#delete_member"
	//               onClick={() => {
	//                 setQuery(text.id);
	//               }}
	//             >
	//               <i className="fa fa-trash-o m-r-5" /> Delete
	//             </Link>
	//           </div>
	//         </div>
	//       );
	//     },
	//   },
	// ];

	return (
		<div className="page-wrapper">
			<Helmet>
				<title>Administration - HRMS Admin Template</title>
				<meta name="description" content="Login page" />
			</Helmet>

			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row align-items-center">
						<div className="col">
							<h3 className="page-title">Booking Process</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/app/main/dashboard">Administration</Link>
								</li>
								<li className="breadcrumb-item active">Booking Process</li>
							</ul>
						</div>
						<div className="col-auto float-end ml-auto">
							<p href="#" className="btn add-btn" onClick={() => setIsShowProjectModal(true)}>
								<i className="fa fa-plus" /> Create Booking
							</p>
							{/* <div className="view-icons">
                <Link
                  to="/app/projects/project_dashboard"
                  className="grid-view btn btn-link active"
                >
                  <i className="fa fa-th" />
                </Link>
                <Link
                  to="/app/projects/projects-list"
                  className="list-view btn btn-link"
                >
                  <i className="fa fa-bars" />
                </Link>
              </div> */}
						</div>
					</div>
				</div>
				{/* /Page Header */}

				{/* Search Filter */}
				{/* <div className="row filter-row ">
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <lable style={{text:"bold"}}> Form No</lable>
              <input
                type="text"
                // placeholder="Serial #"
                className="form-control"
                onChange={(event) => setQuery(event.target.value)}
              />

            </div>
          </div>
          </div> */}
				<div className="col-sm-6 col-md-4">
					<lable style={{}}> Form No</lable>
					<br></br>
					<br></br>
					<input style={{ width: "270px", height: "46px" }} type="text" />

					<div className="submit-section">
						<button
							style={{ float: "left" }}
							type="submit"
							data-bs-dismiss="modal"
							// disabled={!isValid}
							className="btn btn-primary submit-btn"
							// onClick={handleSubmit}
						>
							Search
						</button>
					</div>
				</div>
				{/* <div className="row">
          {filteredFile &&
            filteredFile
              .filter((item) => {
                if (query === "") {
                  return item;
                } else if (
                  item.id.toLowerCase().includes(query.toLowerCase())
                ) {
                  return item;
                }
              })}
              </div> */}

				{/* <div className="row filter-row">
        <div className="col-sm-6 col-md-6">
          <div className="form-group form-focus">
            <input type="text" className="form-control floating" />
            <label className="focus-label">Member Name</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus">
            <input type="text" className="form-control floating" />
            <label className="focus-label">Employee Name</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group form-focus select-focus">
            <select className="select floating">
              <option>Select Roll</option>
              <option>Web Developer</option>
              <option>Web Designer</option>
              <option>Android Developer</option>
              <option>Ios Developer</option>
            </select>
            <label className="focus-label">Role</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <Link to="/" className="btn btn-success btn-block w-100"> Search </Link>
        </div>
      </div> */}
				{/* /Search Filter */}

				{/* <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            pagination={{
            //   total: booking.length,
              // showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              // showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
            }}
            style={{ overflowX: "auto" }}

            // columns={columns}
            bordered
            // dataSource={booking}
            // rowKey={(record) => record.id}
          />
        </div>
      </div> */}
			</div>
			{/* /Page Content */}

			{/* Create File Modal */}
			{/* <Modal show={isShowProjectModal} dialogClassName="employee-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create File</h5>
            <button
              type="button"
              className="close"
              onClick={() => setIsShowProjectModal(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={fileInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.serialPrefix) {
                  errors.serialPrefix = "SerialPrefix is required";
                }
                if (!values.serialStart) {
                  errors.serialStart = "SerialStart is required";
                }
                if (!values.serialEnd) {
                  errors.serialEnd = "SerialEnd is required";
                }
                if (!values.codePrefix) {
                  errors.codePrefix = "CodePrefix is required";
                }
                if (!values.codeStart) {
                  errors.codeStart = "CodeStart is required";
                }
                if (!values.plotType) {
                  errors.plotType = "plotType is required";
                }

                if (!values.unitType) {
                  errors.unitType = "unitType is required";
                }

                if (!values.phase) {
                  errors.phase = "Phase is required";
                }
                if (!values.sector) {
                  errors.sector = "Sector is required";
                }
                if (!values.block) {
                  errors.block = "Block is required";
                }
                if (!values.paymentPlan) {
                  errors.paymentPlan = "PaymentPlan is required";
                }

                if (!values.plotSize) {
                  errors.plotSize = "plotSize is required";
                }
                if (!values.unitNatureType) {
                  errors.unitNatureType = "unitNatureType is required";
                }

                return errors;
              }}

              onSubmit={async (values, {setSubmitting}) => {
                  console.log("sdfannsdfnhamamamammama")
                const formData = {
                  serialPrefix: values.serialPrefix,
                  serialStart: values.serialStart,
                  serialEnd: values.serialEnd,
                  codePrefix: values.codePrefix,
                  codeStart: values.codeStart,
                  plotType: values.plotType,
                  unitType: values.unitType,
                  phase: values.phase,
                  sector: values.sector,
                  block: values.block,
                  paymentPlan: values.paymentPlan,
                  plotSize: values.plotSize,
                  unitNatureType: values.unitNatureType
                };
                  console.log("sdfannsdfnhamamamammama",formData)

                try {
                  setloading(true);
                  const res = await Axios.post(
                      baseApiUrl + `file/add`,
                      formData
                  );
                  if (res.data.status == 200) {
                    getAllFiles();
                    toast.success(res.data.message);
                    setIsShowProjectModal(false);
                  }
                } catch (err) {
                  setloading(false);
                  toast.error(err.response.data.message);
                  console.log(err.response.data);
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

              }) => {
                return (
                  <form onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group ">
                                <label>
                                    Serial Prefix
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control  "
                                    type="text"
                                    placeholder="Serial Prefix"
                                    onChange={(e) => {
                                        setFieldValue("serialPrefix", e.target.value);
                                    }}
                                />
                                <span className="error">
                              {errors.serialPrefix && touched.serialPrefix && errors.serialPrefix}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Serial Start <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Serial Start"
                                    onChange={(e) => {
                                        setFieldValue("SerialStart", e.target.value);
                                    }}
                                />
                                <span className="error">
                              {errors.serialPrefix && touched.serialPrefix && errors.serialPrefix}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Serial End <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Serial End"
                                    onChange={(e) => {
                                        setFieldValue("serialEnd", e.target.value);
                                    }}
                                />
                                <span className="error">
                              {errors.serialEnd && touched.serialEnd && errors.serialEnd}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Code Prefix <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Code Prefix"
                                    onChange={(e) => {
                                        setFieldValue("codePrefix", e.target.value);
                                    }}
                                />
                                <span className="error">
                              {errors.codePrefix && touched.codePrefix && errors.codePrefix}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Code Start <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Code Start "
                                    onChange={(e) => {
                                        setFieldValue("codeStart", e.target.value);
                                    }}
                                />
                                <span className="error">
                              {errors.codeStart && touched.codeStart && errors.codeStart}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    PlotSize Type <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="PlotSize Type"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("plotType", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.plotType && touched.plotType && errors.plotType}
                            </span>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Unit Type <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Unit Type"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("unitType", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.unitType && touched.unitType && errors.unitType}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Phase <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Phase"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("phase", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.phase && touched.phase && errors.phase}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Sector <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Sector"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("sector", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.sector && touched.sector && errors.sector}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Block <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Block"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("block", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.block && touched.block && errors.block}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Payment Plan <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Payment Plan"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("paymentPlan", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.paymentPlan && touched.paymentPlan && errors.paymentPlan}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    PlotSize Size <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="PlotSize Size"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("plotSize", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.plotSize && touched.plotSize && errors.plotSize}
                            </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    Unit Nature Type <span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Unit Nature Type"
                                    options={options}
                                    onChange={(value) => {
                                        setFieldValue("unitNatureType", value.value);
                                    }}
                                />
                                <span className="error">
                              {errors.unitNatureType && touched.unitNatureType && errors.unitNatureType}
                            </span>
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
                            // disabled={!isValid}
                            className="btn btn-primary submit-btn"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal> */}
			{/* /Create File Modal */}
			{/* Edit File Modal */}

			{/* /Edit File Modal */}
			{/* Delete File Modal */}
			{/* <div className="modal custom-modal fade" id="delete_member" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              <h3>Delete Job</h3>
              <p>Are you sure want to delete?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <button className="btn btn-primary w-100 continue-btn" data-bs-dismiss="modal" type='submit' onClick={() => deleteBookingById(query)}>
                    Delete
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type='submit'
                    data-bs-dismiss="modal"
                    className="btn btn-primary w-100 cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
			{/* /Delete File Modal */}
		</div>
	);
};

export default Create;
