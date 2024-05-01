import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { Table } from "antd";
import { Table, Input, Tag, Space } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Select from "react-select";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const Report = () => {
  const [searchRegTerm, setSearchRegTerm] = useState("");
  const [baseApiUrl] = useState(
    process.env.REACT_APP_API_URL + "/api/user/"
  );

  const TransactionReciept = (PDF) => {
    Axios.get(baseApiUrl + `booking/id/getStatementFile?vcNo=${PDF}`)
      .then((res) => {
        // getAllBooking(1);
        if (res.data.status == 200) {
          window.open(res.data.file.url, "_blank");
        }
      })
      .catch((err) => console.log(err.response.data));

    // setRedirectUrl(null);
  };

  const handleRegInputChange = (event) => {
    setSearchRegTerm(event.target.value);
  };
  const handleRegButtonClick = () => {
    if (searchRegTerm.trim() === "") {
      setFilteredRegData(null);
      setSuccessAlert(false);
      setShowAlert(false);
    } else {
      // if (searchRegTerm.toLowerCase().includes("vc")) {
        const code = searchRegTerm;//.toLowerCase().replace("vc", "");
        TransactionReciept(code);
      // }
    }
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Transaction - Sheranwala</title>
        {/*<meta name="description" content="Login page"/>*/}
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Report</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Report</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>REG No</label>
              <input
                className="form-control"
                type="text"
                value={searchRegTerm}
                onChange={handleRegInputChange}
              />
            </div>
          </div>
          <div className="col-sm-3 my-auto">
            <div className="form-group mb-0">
              <button
                onClick={handleRegButtonClick}
                className="btn btn-success btn-block w-100 p-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};
export default Report;
