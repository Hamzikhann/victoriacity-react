import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import "react-select-search/style.css";

import SelectSearch from "react-select-search";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast, ToastContainer } from "react-toastify";
import { format, isValid } from "date-fns";

const Groups = () => {
  const [baseApiUrl, setBaseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );

  const [isShowGroups, setIsShowGroups] = useState(false);
  const [isUpdateGroups, setIsUpdateGroups] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Options for the select input
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  const [groupsInitialValues, setGroupsInitialValues] = useState({
    GROUP_NAME: "",
    GROUP_DESCRIPTION: "",
    menus: ""
  });

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const columns = [
    {
      title: "Serial No#",
      dataIndex: "Group_ID",
      sorter: (a, b) => a.Group_ID - b.Group_ID,
      // render: (text, record, index) => {
      //   return (
      //     <Space
      //       direction="horizontal"
      //       style={{ width: "100%", justifyContent: "center" }}
      //     >
      //       {/* <span>{totalRecords + 1 - (index + 1 + (page - 1) * 25)}</span> */}
      //     </Space>
      //   );
      // },
      // render: (text, record) => (
      //   <span>{record.id}</span>
      // ),
      // ...getColumnSearchProps('id'),
    },
    {
      title: "Group Name",
      dataIndex: "GROUP_NAME",
      sorter: (a, b) => a.GROUP_NAME - b.GROUP_NAME,
      // render: (text, record) => (
      //   <span>{record.id}</span>
      // ),
      // ...getColumnSearchProps('id'),
    },

    {
      title: "Group Description",
      dataIndex: "GROUP_DESCRIPTION",
      // render: (text, record) => (
      //   <Link to="/app/administrator/job-details">{text}</Link>
      // ),
      sorter: (a, b) => a.GROUP_DESCRIPTION - b.GROUP_DESCRIPTION,
    },

    {
      title: "Action",
      render: (text, record) => {
        // console.log(
        //   "iiiiiiiiiiiiiii",
        //   text.relation,
        //   options.find((item) => item.label === text.relation)
        // );
        return (
          <div className="dropdown dropdown-action text-end">
            <Link
              to="/"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#edit_member"
                onClick={() => {
                  setQuery(text.Group_ID);
                  setIsUpdateGroups(true);
                  setGroupsInitialValues({
                    GROUP_NAME: "",
                    GROUP_DESCRIPTION: "",
                    ...text,
                    Menu: menu.find(
                      (item) => item.value === text.Menu?.Menu_ID
                    ),
                  });
                }}
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </Link>
              <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_member"
                onClick={() => {
                  setQuery(text.Group_ID);
                }}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  const getAllGroup = () => {
    Axios.get(baseApiUrl + "userGroup/list")
      .then((res) => {
        setGroup(res.data.UserGroup);
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => console.log(err.response.data));
  };
  const getAllMenu = () => {
    Axios.get(baseApiUrl + "menu/list")
      .then((res) => {
        res.data.Menu.map((item) => {
          setMenu((prev) => [
            ...prev,
            { label: item?.Title, value: item?.Menu_ID },
          ]);
        });
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => console.log(err.response.data));
  };

  const deleteGrouprById = (id) => {
    Axios.delete(baseApiUrl + `userGroup/delete?id=${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          getAllGroup();
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getAllGroup();
    getAllMenu();
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
        <title>Groups - Sheranwala</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Groups</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Groups</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <p
                className="btn add-btn button"
                onClick={() => setIsShowGroups(true)}
              >
                <i className="fa fa-plus" /> Create Groups
              </p>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <Input.Search
                  style={{ border: '3px solid red', margin: '0 0 10px 0',padding:'12px' }}
                  className="p-3"
                  size="large"
                  placeholder="Search by Form No..."
                  enterButton
                  onSearch={onSearch}
                />
                <input type="text" value={searchTerm} onChange={handleInputChange}
                      placeholder="Transaction Name"/>
              </div>
            </div> */}

        {/* <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    required
                    className="form-control"
                    type="text"
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="Search By Application Ref "
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search By Owner Name"
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setVCNo(e.target.value)}
                    placeholder="Search By VC NO"
                  />
                </div>
              </div>
              <div className="col-sm-2">
             
              </div>
              <div className="col-sm-1">
                <div className="form-group">
                  <button
                    className="btn btn-success btn-block w-100 py-2"
                    onClick={() => getAllBooking(1, formCode, name, vcNo)}
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  defaultPageSize: 25,
                  total: (totalPage - 1) * 25,
                  // total: booking?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // onChange={handleTableChange}
                bordered
                dataSource={group}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Groups  */}
      <Modal show={isShowGroups}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Groups</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsShowGroups(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={groupsInitialValues}
              validate={(values) => {
                const errors = {};
                if (!values.GROUP_NAME) {
                  errors.GROUP_NAME = "GROUP NAME is required";
                }
                if (!values.GROUP_DESCRIPTION) {
                  errors.GROUP_DESCRIPTION = "GROUP DESCRIPTION is required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const menus = values.menus.map((item)=> item.value)
                const formData = {
                  // Group_ID: values.Group_ID.value,
                  GROUP_NAME: values.GROUP_NAME,
                  GROUP_DESCRIPTION: values.GROUP_DESCRIPTION,
                  menus: menus,
                };
                try {
                  setloading(true);
                  const res = await Axios.post(
                    baseApiUrl + "/userGroup/add",
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllGroup();
                    toast.success(res.data.message);
                    setIsShowGroups(false);
                    setloading(false);
                  }
                } catch (err) {
                  setloading(false);
                  toast.error(err.response.data.message);
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
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Name
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            placeholder="Group Name"
                            onChange={(e) => {
                              setFieldValue("GROUP_NAME", e.target.value);
                            }}
                          />

                          <span className="error">
                            {errors.GROUP_NAME &&
                              touched.GROUP_NAME &&
                              errors.GROUP_NAME}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Description
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            placeholder="Group Description"
                            onChange={(e) => {
                              setFieldValue(
                                "GROUP_DESCRIPTION",
                                e.target.value
                              );
                            }}
                          />

                          <span className="error">
                            {errors.GROUP_DESCRIPTION &&
                              touched.GROUP_DESCRIPTION &&
                              errors.GROUP_DESCRIPTION}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Menu
                            <span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={menu}
                            value={selectedOptions}
                            // onChange={handleSelectChange}
                            onChange={(selectedItems) => {
                              handleSelectChange();
                              // Use setFieldValue to update the menus field
                              setFieldValue("menus", selectedItems);
                            }}
                            isMulti={true} // Enable multi-select
                          />

                          <span className="error">
                            {errors.menus && touched.menus && errors.menus}
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
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
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
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>

      {/* Add Groups */}

      {/* Edit Groups */}

      <Modal show={isUpdateGroups}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Groups</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setIsUpdateGroups(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={groupsInitialValues}
              validate={(values) => {
                const errors = {};

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const menus = values.menus.map((item)=> item.value)
                const formData = {
                  GROUP_NAME: values.GROUP_NAME,
                  GROUP_DESCRIPTION: values.GROUP_DESCRIPTION,
                  menus: menus.value
                };
                try {
                  setloading(true);
                  const res = await Axios.put(
                    baseApiUrl + `userGroup/update?id=${query}`,
                    formData
                  );
                  if (res.data.status == 200) {
                    getAllGroup();
                    toast.success(res.data.message);
                    setIsUpdateGroups(false);
                    setloading(false);
                  }
                } catch (err) {
                  setloading(false);
                  toast.error(err.response.data.message);
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
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Name
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            placeholder="Group Name"
                            type="text"
                            value={values?.GROUP_NAME}
                            onChange={(e) => {
                              setFieldValue("GROUP_NAME", e.target.value);
                            }}
                          />

                          <span className="error">
                            {errors.GROUP_NAME &&
                              touched.GROUP_NAME &&
                              errors.GROUP_NAME}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Description
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Group Description"
                            value={values?.GROUP_DESCRIPTION}
                            onChange={(e) => {
                              setFieldValue(
                                "GROUP_DESCRIPTION",
                                e.target.value
                              );
                            }}
                          />
                          <span className="error">
                            {errors.GROUP_DESCRIPTION &&
                              touched.GROUP_DESCRIPTION &&
                              errors.GROUP_DESCRIPTION}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>
                            Group Menu
                            <span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={menu}
                            value={menu?.find(
                              (item) => item?.value == values?.Menu?.value
                            )}
                            // value={selectedOptions}
                            // onChange={handleSelectChange}
                            onChange={(selectedItems) => {
                              handleSelectChange();
                              // Use setFieldValue to update the menus field
                              setFieldValue("menus", selectedItems);
                            }}
                            isMulti={true} // Enable multi-select
                          />

                          <span className="error">
                            {errors.GROUP_DESCRIPTION &&
                              touched.GROUP_DESCRIPTION &&
                              errors.GROUP_DESCRIPTION}
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
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
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
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>

      {/* Edit Groups */}

      {/* Delete group Modal */}
      <div className="modal custom-modal fade" id="delete_member" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Group</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary w-100 continue-btn"
                      data-bs-dismiss="modal"
                      type="submit"
                      onClick={() => deleteGrouprById(query)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
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
      </div>
      {/* /Delete group Modal */}
    </div>
  );
};

export default Groups;
