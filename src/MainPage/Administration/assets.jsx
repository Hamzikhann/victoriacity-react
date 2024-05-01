import React, {useState, useEffect, useRef} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import Axios from "axios";
import {itemRender, onShowSizeChange} from "../paginationfunction"
import "../antdstyle.css"
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import * as yup from "yup";
import {Field, Formik} from 'formik';
import {DatePickerField} from '../../_components/fields/DatePickerField';
import {DateDropField} from '../../_components/fields/DateDropField';
import {InputText} from '../../_components/fields/InputText';
import {Modal} from "react-bootstrap";

import Select from 'react-select'
import {toast, ToastContainer} from "react-toastify";

const Assets = () => {


    //States to store Valuable Information
    const [isShowProjectModal, setIsShowProjectModal] = useState(false);
    const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false);
    const [query, setQuery] = useState("");
    const [loading, setloading] = useState(false);
    const [allAssets, setAllAssets] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/user/");
    const [initialValues, setInitialValues] = useState({
        id: '',
        name: '',
        addedDate: '',
        expiryDate: '',
        brand: '',
        model: '',
        quantity: '',
        assetType: '',
        description: '',
    })

    //Validations of Assets
    const assetFormValidation = yup.object().shape({
        name: yup.string().required("Asset Name is required"),
        assetType: yup.string().required("Asset Type is required"),
        expiryDate: yup.string().required("Expiry Date is required"),
        model: yup.string().required("Model is required"),
        quantity: yup.string().required("Job Type is required"),
        type: yup.string().required("Asset Type is required"),
        addedDate: yup.string().required("Added Date is required"),
        brand: yup.string().required("Brand is required"),
        description: yup.string().required("Description is required"),
    });

    //Apis Integration of assets CRUD
    const getAllAssetsType = () => {
        Axios.get(baseApiUrl + "assetType/list")
            .then((res) => {
                // setAssetType(res.data.AssetType);
                res.data.AssetType.map((item) => {
                    setOptionList((prev) => [...prev, {label: item.name, value: item.id}])
                    // console.log("ssssssssssssssssss",item.name);
                })
                // console.log(res.data.AssetType);
            })
            .catch((err) => console.log(err.response.data));
    };
    const getAllAssets = () => {
        Axios.get(baseApiUrl + "asset/list")
            .then((res) => {
                setAllAssets(res.data.Asset);
                // console.log(allAssets);
            })
            .catch((err) => console.log(err.response.data));
    };
    const editAssetsById = (value) => {
        const formData = {
            id: value.id,
            action: value.action,
            name: value.name,
            type: value.type,
            model: value.model,
            brand: value.brand,
            quantity: value.quantity,
            addedDate: value.addedDate,
            expiryDate: value.expiryDate,
            description: value.description,
        };
        Axios.put(baseApiUrl + `asset/update?id=${query}`, formData)
            .then((res) => {
                    getAllAssets();
                    if (res.data.status == 200) {
                        setInitialValues({
                            name: '',
                            type: '',
                            model: '',
                            description: '',
                            expiryDate: '',
                            quantity: '',
                            addedDate: '',
                            brand: '',
                        });
                    }
                }
            )
            .catch((err) => console.log(err.response.data));
    };
    const deleteAssetsById = (id) => {
        Axios.delete(baseApiUrl + `asset/delete?id=${id}`)
            .then((res) => {
                if (res.data.status == 200) {
                    getAllAssets();
                    toast.success(res.data.message);
                }
                // console.log({ dataIndex: "id" }, "dfnsfknksd")
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    //Fetch stored assets
    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
        getAllAssets();
        getAllAssetsType();
    }, []);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Asset Name',
            dataIndex: 'name',
            // render: (text, record) => (
            //     <strong>{text?.name}</strong>
            // ),
            // ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Model',
            dataIndex: 'model',
            ...getColumnSearchProps('model'),
            // sorter: (a, b) => a.model.lenght - b.model.length,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            ...getColumnSearchProps('brand'),
            // sorter: (a, b) => a.brand.length - b.brand.length,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            ...getColumnSearchProps('quantity'),
            // sorter: (a, b) => a.quantity.length - b.quantity.length,
        },
        {
            title: 'Asset type',
            dataIndex: 'AssetType',
            sorter: (a, b) => a.assetType.length - b.assetType.length,
            render: (text, record) => {
                // console.log(record, "pop")
                return (
                    <span>{text?.name}</span>
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            // sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: 'AddedDate',
            dataIndex: 'addedDate',
            // sorter: (a, b) => a.addedDate.length - b.addedDate.length,
        },
        {
            title: 'ExpiryDate',
            dataIndex: 'expiryDate',
            // sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
        },
        {
            title: "Option",
            render: (text, record) => {
                // console.log(text, record)
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
                                data-bs-target="#edit_asset"
                                onClick={() => {
                                    setQuery(text.id);
                                    setIsShowEditProjectModal(true);
                                    setInitialValues({
                                        name: '',
                                        addedDate: '',
                                        expiryDate: '',
                                        brand: '',
                                        model: '',
                                        quantity: '',
                                        description: '',
                                        ...text,
                                        type: optionList.find(item => item.value === text.type),
                                    })
                                }}
                            >
                                <i className="fa fa-pencil m-r-5"/> Edit
                            </Link>
                            <Link
                                to="/"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_assets"
                                onClick={() => {
                                    setQuery(text.id)
                                }}
                            >
                                <i className="fa fa-trash-o m-r-5"/> Delete
                            </Link>
                        </div>
                    </div>
                )
            },
        },
    ]
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
                <title>Assets - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Assets</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Assets</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ml-auto">
                            <p
                                href="#"
                                className="btn add-btn"
                                onClick={() => setIsShowProjectModal(true)}
                            >
                                <i className="fa fa-plus"/>Add Assets
                            </p>
                        </div>
                    </div>
                </div>

                {/* /Search bar & Selector */}

                {/* /Page Header */}
                {/* Search Filter */}
                {/* <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option value> -- Select -- </option>
                <option value={0}> Pending </option>
                <option value={1}> Approved </option>
                <option value={2}> Returned </option>
              </select>
              <label className="focus-label">Status</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="form-group form-focus select-focus">
                  <div>
                    <input className="form-control floating datetimepicker" type="date" />
                  </div>
                  <label className="focus-label">From</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group form-focus select-focus">
                  <div>
                    <input className="form-control floating datetimepicker" type="date" />
                  </div>
                  <label className="focus-label">To</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-2">
            <a href="#" className="btn btn-success btn-block w-100"> Search </a>
          </div>
        </div> */}
                {/* /Search Filter */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Table className="table-striped"
                                   pagination={{
                                       total: allAssets.length,
                                       showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                       showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                   }}
                                   style={{overflowX: 'auto'}}
                                   columns={columns}
                                   bordered
                                   dataSource={allAssets}
                                   rowKey={record => record.id}
                                // onChange={this.handleTableChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Asset Modal */}

            <Modal show={isShowProjectModal} dialogClassName="employee-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Asset</h5>
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
                            initialValues={initialValues}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = " Asset Name is required";
                                }
                                if (!values.expiryDate) {
                                    errors.expiryDate = "Expiry Date is required";
                                }
                                if (!values.addedDate) {
                                    errors.addedDate = "Added Date is required";
                                }
                                if (!values.model) {
                                    errors.model = "Model is required";
                                }
                                if (!values.type) {
                                    errors.type = "Asset Type is required";
                                }
                                if (!values.quantity) {
                                    errors.quantity = "Quantity is required";
                                }
                                if (!values.brand) {
                                    errors.brand = "Brand is required";
                                }
                                if (!values.description) {
                                    errors.description = "Description is required";
                                }
                                console.log(errors)
                                return errors;
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                const formData = {
                                    action: values.action,
                                    name: values.name,
                                    type: values.type,
                                    model: values.model,
                                    brand: values.brand,
                                    quantity: values.quantity,
                                    addedDate: values.addedDate,
                                    expiryDate: values.expiryDate,
                                    description: values.description,
                                };
                                try {
                                    setloading(true);
                                    const res = await Axios.post(
                                        baseApiUrl + "asset/add",
                                        formData
                                    );
                                    if (res.data.status == 200) {
                                        getAllAssets();
                                        toast.success(res.data.message);
                                        setloading(false);
                                        setIsShowProjectModal(false);
                                    }
                                } catch (err) {
                                    setloading(false);
                                    toast.error(err.response.data.message);
                                    // console.log(err.response.data);
                                }
                            }}
                        >
                            {({handleSubmit, errors, values, isValid, touched, setFieldValue}) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Asset Name <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="name"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("name", e.target.value);
                                                        }}
                                                    />
                                                    {errors.name && touched.name && (
                                                        <span className="text-danger text-sm">
                                {errors.name}
                              </span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Asset Type{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Select placeholder="Select Asset" options={optionList}
                                                            onChange={(value) => {
                                                                // console.log("saaaaaaaaaaaaaaaaa",value,optionList)
                                                                setFieldValue("type", value.value)
                                                            }}/>

                                                    {errors.type &&
                                                        touched.type && (
                                                            <span className="text-danger text-sm">
                                  {errors.type}
                                </span>
                                                        )}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Model{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="model"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("model", e.target.value);
                                                        }}
                                                    />
                                                    {errors.model && touched.model && (
                                                        <span className="text-danger text-sm">
                                {errors.model}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Brand{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="brand"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("brand", e.target.value);
                                                        }}
                                                    />

                                                    {errors.brand &&
                                                        touched.brand && (
                                                            <span className="text-danger text-sm">
                                  {errors.brand}
                                </span>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Added Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        onChange={(e) => {
                                                            setFieldValue("addedDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.addedDate && touched.addedDate && (
                                                        <span className="text-danger text-sm">
                                {errors.addedDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Expired Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            setFieldValue("expiryDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.expiryDate && touched.expiryDate && (
                                                        <span className="text-danger text-sm">
                                {errors.expiryDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <label>Quantity <span className="text-danger">*</span></label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="quantity"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("quantity", e.target.value);
                                                        }}
                                                    />
                                                    {errors.quantity && touched.quantity && (
                                                        <span className="text-danger text-sm">
                                {errors.quantity}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Description <span className="text-danger">*</span></label>
                                                    <textarea className="form-control h-50" rows={5} onChange={(e) => {
                                                        setFieldValue("description", e.target.value);
                                                    }}>
                            </textarea>
                                                    {errors.description && touched.description && (
                                                        <span className="text-danger text-sm">
                                {errors.description}
                              </span>
                                                    )}
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
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>


            {/* Edit Pop-up Form */}
            {/* Edit Job Modal */}
            <Modal show={isShowEditProjectModal} dialogClassName="employee-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Asset</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                                setIsShowEditProjectModal(false)
                            }}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={initialValues}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = " Asset Name is required";
                                }
                                if (!values.expiryDate) {
                                    errors.expiryDate = "Expiry Date is required";
                                }
                                if (!values.addedDate) {
                                    errors.addedDate = "Added Date is required";
                                }
                                if (!values.model) {
                                    errors.model = "Model is required";
                                }
                                if (!values.type) {
                                    errors.type = "Asset Type is required";
                                }
                                if (!values.quantity) {
                                    errors.quantity = "Quantity is required";
                                }
                                if (!values.brand) {
                                    errors.brand = "Brand is required";
                                }
                                if (!values.description) {
                                    errors.description = "Description is required";
                                }
                                return errors;
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                const formData = {
                                    action: values.action,
                                    name: values.name,
                                    type: values.type,
                                    model: values.model,
                                    brand: values.brand,
                                    quantity: values.quantity,
                                    addedDate: values.addedDate,
                                    expiryDate: values.expiryDate,
                                    description: values.description,
                                };
                                try {
                                    setloading(true);
                                    const res = await Axios.put(
                                        baseApiUrl + `asset/update?id=${query}`, formData);
                                    if (res.data.status == 200) {
                                        getAllAssets();
                                        toast.success(res.data.message);
                                        setloading(false);
                                        setIsShowEditProjectModal(false);
                                    }
                                } catch (err) {
                                    setloading(false);
                                    toast.error(err.response.data.message);
                                    // console.log(err.response.data);
                                }
                            }}
                        >
                            {({handleSubmit, errors, values, isValid, touched, setFieldValue}) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Asset Name <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        value={values.name}
                                                        type="text"
                                                        name="name"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("name", e.target.value);
                                                        }}
                                                    />
                                                    {errors.name && touched.name && (
                                                        <span className="text-danger text-sm">
                                {errors.name}
                              </span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Asset Type{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Select placeholder="Select Asset" value={values.type}
                                                            options={optionList}

                                                            name="type"
                                                            onChange={(value) => {
                                                                setFieldValue("type", value.value)
                                                            }}/>

                                                    {errors.type &&
                                                        touched.type && (
                                                            <span className="text-danger text-sm">
                                  {errors.type}
                                </span>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Model{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="model"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("model", e.target.value);
                                                        }}
                                                    />
                                                    {errors.model && touched.model && (
                                                        <span className="text-danger text-sm">
                                {errors.model}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Brand{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="brand"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("brand", e.target.value);
                                                        }}
                                                    />

                                                    {errors.brand &&
                                                        touched.brand && (
                                                            <span className="text-danger text-sm">
                                  {errors.brand}
                                </span>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Added Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={values.addedDate}
                                                        onChange={(e) => {
                                                            setFieldValue("addedDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.addedDate && touched.addedDate && (
                                                        <span className="text-danger text-sm">
                                {errors.addedDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>
                                                        Expired Date{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={values.expiryDate}
                                                        onChange={(e) => {
                                                            setFieldValue("expiryDate", e.target.value);
                                                        }}
                                                    />
                                                    {errors.expiryDate && touched.expiryDate && (
                                                        <span className="text-danger text-sm">
                                {errors.expiryDate}
                              </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Quantity <span className="text-danger">*</span></label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="quantity"
                                                        component={InputText}
                                                        onChange={(e) => {
                                                            setFieldValue("quantity", e.target.value);
                                                        }}
                                                    />
                                                    {errors.quantity && touched.quantity && (
                                                        <span className="text-danger text-sm">
                                {errors.quantity}
                              </span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Description <span className="text-danger">*</span></label>
                                                    <textarea
                                                        className="form-control h-50"
                                                        rows={5}
                                                        value={values.description}
                                                        onChange={(e) => {
                                                            setFieldValue("description", e.target.value);
                                                        }}
                                                    >
                                                    </textarea>
                                                    {errors.description && touched.description && (
                                                        <span className="text-danger text-sm">
                                {errors.description}
                              </span>
                                                    )}
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
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>


    <div className="modal custom-modal fade" id="delete_assets" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="form-header">
                        <h3>Delete Asset</h3>
                        <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-primary w-100 continue-btn" data-bs-dismiss="modal"
                                        type='submit' onClick={() => deleteAssetsById(query)}>
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
    </div>

</div>

)
    ;
}

export default Assets;