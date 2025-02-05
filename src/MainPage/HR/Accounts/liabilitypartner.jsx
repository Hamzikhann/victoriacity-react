import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input, Tag, Space, Button } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Formik } from "formik";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";

const LiabilityPartner = () => {
	const [totalPage, setTotalPage] = useState(0);
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [isShowViewHistoryModal, setIsShowViewHistoryModal] = useState(false);

	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);
	const [payOffData, setpayOffData] = useState([]);
	const [selectedId, setSelectedId] = useState(data);

	const getLiabilityPartner = () => {
		Axios.get(baseApiUrl + `/liability/userList`)
			.then((res) => {
				setData(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	const deleteLiability = (id) => {
		Axios.delete(baseApiUrl + `liability/delete?id=${id}`)
			.then((res) => {
				if (res.data.status == 200) {
					getLiability();
					toast.success(res.data.Message);
				} else {
					toast.success(res.data.Message);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const getPayOff = (id) => {
		Axios.get(baseApiUrl + `/payOff/liabilityById?id=${id}`)
			.then((res) => {
				setpayOffData(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => console.log(err.response.data));
	};

	useEffect(() => {
		getLiabilityPartner();
	}, []);

	const columns = [
		{
			title: "Serial #",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description.length - b.description.length
		},
		{
			title: "Amount",
			dataIndex: "amount",
			sorter: (a, b) => a.amount.length - b.amount.length
		},
		{
			title: "Balance",
			dataIndex: "balance",
			sorter: (a, b) => a.balance - b.balance
		},
		{
			title: "Action",
			render: (text, record) => {
				return (
					<div className="dropdown dropdown-action text-end">
						<Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="material-icons">more_vert</i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#edit_nominee"
								onClick={() => {
									setIsShowViewHistoryModal(true);
									getPayOff(text.id);
									// setSelectedId(text.id);
									//   setPayOffInitialValues({
									//     amount: "",
									//     liabilityId: selectedId?.id || "",
									//   });
								}}
							>
								<i className="fa fa-eye m-r-5" /> View History
							</Link>
							{/* <Link
                to="/"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete_member"
                onClick={() => {
                  setQuery(text.id);
                }}
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </Link> */}
						</div>
					</div>
				);
			}
		}
	];

	const columns1 = [
		{
			title: "Serial #",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description - b.description
		},
		{
			title: "Amount",
			dataIndex: "amount",
			sorter: (a, b) => a.amount - b.amount
		},
		{
			title: "Date",
			dataIndex: "date",
			sorter: (a, b) => a.date - b.date
		}
	];

	return (
		<>
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<Helmet>
					<title>Liability - HRMS Admin Template</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col " style={{ display: "flex", flexDirection: "column" }}>
								<Link to="/app/main/partner-dashboard">
									<div className="float-start  " style={{ marginTop: "4px", marginLeft: "1px" }}>
										<p href="" className="btn add-btn">
											<i className="fa fa-arrow-left" />
											Back to Partner Dashboard
										</p>
									</div>
								</Link>
								<h3 className="page-title ">Liabilities</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Accounts</li>
								</ul>
							</div>
						</div>
					</div>
					{/* /Page Header */}

					<div className="col-md-12">
						<div className="table-responsive">
							<Table
								className="table-striped"
								pagination={{
									defaultPageSize: 25,
									total: (totalPage - 1) * 25,
									// total: booking?.length,
									showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
									showSizeChanger: true,
									onShowSizeChange: onShowSizeChange,
									itemRender: itemRender
								}}
								style={{ overflowX: "auto" }}
								columns={columns}
								// onChange={handleTableChange}
								size="middle"
								// dataSource={filterTable == null ? booking : filterTable}
								dataSource={data}
								scroll={{ x: "max-content" }}
								rowKey={(record) => record.id}
							/>
						</div>
					</div>
				</div>
				{/* /Page Content */}

				{/* View History Modal */}

				<Modal show={isShowViewHistoryModal} dialogClassName="employee-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">View PayOff History</h5>
							<button
								type="button"
								className="close"
								onClick={() => {
									setIsShowViewHistoryModal(false);
								}}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<Formik>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									setFieldValue,
									isSubmitting,
									isValid
									/* and other goodies */
								}) => {
									return (
										<div className="col-md-12">
											<div className="table-responsive">
												<Table
													className="table-striped"
													pagination={{
														defaultPageSize: 25,
														total: (totalPage - 1) * 25,
														// total: booking?.length,
														showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
														showSizeChanger: true,
														onShowSizeChange: onShowSizeChange,
														itemRender: itemRender
													}}
													style={{ overflowX: "auto" }}
													columns={columns1}
													// onChange={handleTableChange}
													size="middle"
													// dataSource={filterTable == null ? booking : filterTable}
													dataSource={payOffData}
													scroll={{ x: "max-content" }}
													rowKey={(record) => record.id}
												/>
											</div>
										</div>
									);
								}}
							</Formik>
						</div>
					</div>
				</Modal>

				{/* Delete Modal  */}
				<div className="modal custom-modal fade" id="delete_member" role="dialog">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Liability</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<button
												className="btn btn-primary w-100 continue-btn"
												data-bs-dismiss="modal"
												type="submit"
												onClick={() => deleteLiability(query)}
											>
												Delete
											</button>
										</div>
										<div className="col-6">
											<button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100 cancel-btn">
												Cancel
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Delete Modal  */}
			</div>
			{/* /Page Wrapper */}
		</>
	);
};

export default LiabilityPartner;
