import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import "react-select-search/style.css";

import SelectSearch from "react-select-search";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast, ToastContainer } from "react-toastify";
import { format, isValid } from "date-fns";


const CategoryTransfer = () => {




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
            <title>CategoryTransfer - Sheranwala</title>
            <meta name="description" content="Login page" />
          </Helmet>
    
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Category Transfer</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Category Transfer</li>
                  </ul>
                </div>
                {/* <div className="col-auto float-end ml-auto">
                  <p
                    className="btn add-btn button"
                    onClick={() => setIsShowProjectModal(true)}
                  >
                    <i className="fa fa-plus" /> Create Booking
                  </p>
                </div> */}
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
              {/*<div>{filteredData.length > 0 ? (*/}
              {/*    filteredData.map((item) => (*/}
              {/*        <div key={item.key}>*/}
              {/*            <p>Name: {item.name}</p>*/}
              {/*            <p>Age: {item.age}</p>*/}
              {/*            <p>Address: {item.address}</p>*/}
              {/*        </div>*/}
              {/*    ))*/}
              {/*) : (*/}
              {/*    searchTerm.trim() !== '' && <p>No data found</p>*/}
              {/*)}</div>*/}
              {/* <div className="col-md-12">
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
                    onChange={handleTableChange}
                    size="middle"
                    // dataSource={filterTable == null ? booking : filterTable}
                    dataSource={booking}
                    // scroll={{ x: "max-content" }}
                    rowKey={(record) => record.id}
                  />
                </div>
              </div> */}
            </div>
          </div>
          </div>
      )
}

export default CategoryTransfer