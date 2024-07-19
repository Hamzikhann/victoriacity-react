/**
 * Signin Firebase
 */
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
// import {User,Avatar_19,Avatar_07,Avatar_06,Avatar_14} from '../../../Entryfile/imagepath.jsx'

// import {BarChart,Bar, Cell,ResponsiveContainer,
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
// import Header from '../../../initialpage/Sidebar/header'
// import Sidebar from '../../../initialpage/Sidebar/sidebar'
// import "../../index.css"
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';
// /dashboard/data
const barchartdata = [
	{ y: "2006", "Total Income": 100, "Total Outcome": 90 },
	{ y: "2007", "Total Income": 75, "Total Outcome": 65 },
	{ y: "2008", "Total Income": 50, "Total Outcome": 40 },
	{ y: "2009", "Total Income": 75, "Total Outcome": 65 },
	{ y: "2010", "Total Income": 50, "Total Outcome": 40 },
	{ y: "2011", "Total Income": 75, "Total Outcome": 65 },
	{ y: "2012", "Total Income": 100, "Total Outcome": 90 }
];
const linechartdata = [
	{ y: "2006", "Total Sales": 50, "Total Revenue": 90 },
	{ y: "2007", "Total Sales": 75, "Total Revenue": 65 },
	{ y: "2008", "Total Sales": 50, "Total Revenue": 40 },
	{ y: "2009", "Total Sales": 75, "Total Revenue": 65 },
	{ y: "2010", "Total Sales": 50, "Total Revenue": 40 },
	{ y: "2011", "Total Sales": 75, "Total Revenue": 65 },
	{ y: "2012", "Total Sales": 100, "Total Revenue": 50 }
];
const PartnerDashboard = () => {
	const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
	const [dashboard, setDashboard] = useState([{}]);
	const [liability, setLiability] = useState([{}]);

	const getDashboardData = () => {
		Axios.get(baseApiUrl + `/accountTransaction/partnerData`)
			.then((res) => {
				setDashboard(res.data.data);
			})
			.catch((err) => console.log(err?.response?.data));
	};
	const getALlLiability = () => {
		Axios.get(baseApiUrl + `/liability/totalAmount`)
			.then((res) => {
				setLiability(res.data.data);
			})
			.catch((err) => console.log(err?.response?.data));
	};

	useEffect(() => {
		getDashboardData();
		getALlLiability();
	}, []);

	// const [menu, setMenu] = useState(false)

	// 	const toggleMobileMenu = () => {
	// 		setMenu(!menu)
	// 	  }

	//   useEffect( ()=>{
	//     let firstload = localStorage.getItem("firstload")
	//     if(firstload === "true"){
	//         setTimeout(function() {
	//           window.location.reload(1)
	//           localStorage.removeItem("firstload")
	//         },1000)
	//     }
	//  });
	useEffect(() => {
		if ($(".select").length > 0) {
			$(".select").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			});
		}
	}, []);

	return (
		// <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}>

		// <Header onMenuClick={(value) => toggleMobileMenu()} />
		// <Sidebar />
		<div className="page-wrapper">
			<Helmet>
				<title>Dashboard - Sheranwala Developer</title>
				<meta name="description" content="Dashboard" />
			</Helmet>
			{/* Page Content */}
			<div className="content container-fluid">
				{/* Page Header */}
				<div className="page-header">
					<div className="row">
						<div className="col-sm-12">
							<h3 className="page-title">Main Dashboard</h3>
							{/* <ul className="breadcrumb"> */}

							{/* </ul> */}
						</div>
					</div>
				</div>

				{/* /Page Header */}
				<div className="row">
					{dashboard[0]?.projectData?.map((project, index) => (
						<>
							<h4 className="mt-3">{project.projectName}</h4>
							<div key={index} className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
								<Link to={`/app/accounts/income-transactions/${project.projectId}`}>
									<div className="card dash-widget">
										<div className="card-body">
											<span className="dash-widget-icon">
												<i className="fa fa-cubes" />
											</span>
											<div className="dash-widget-info">
												<h3>{project.totalIncome}</h3>
												<span>Income</span>
											</div>
										</div>
									</div>
								</Link>
							</div>
							<div key={index} className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
								<Link to={`/app/accounts/expense-transactions/${project.projectId}`}>
									<div className="card dash-widget">
										<div className="card-body">
											<span className="dash-widget-icon">
												<i className="fa fa-usd" />
											</span>
											<div className="dash-widget-info">
												<h3>{project.totalExpense}</h3>
												<span>Expense</span>
											</div>
										</div>
									</div>
								</Link>
							</div>
							<div key={index} className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
								<div className="card dash-widget">
									<div className="card-body">
										<span className="dash-widget-icon">
											<i className="fa fa-diamond" />
										</span>
										<div className="dash-widget-info">
											<h3>{project.profit}</h3>
											<span>Profit </span>
										</div>
									</div>
								</div>
							</div>
						</>
					))}

					<h4 className="mt-3">Liabilities</h4>
					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
						<Link to={`/app/accounts/liabilitypartner`}>
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-usd" />
									</span>
									<div className="dash-widget-info">
										<h3>{liability ? liability?.totalBalance : 0}</h3>
										<span>Liability Balance</span>
									</div>
								</div>
							</div>
						</Link>
					</div>

					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
						<Link to={`/app/accounts/withdrawalpartner`}>
							<div className="card dash-widget">
								<div className="card-body">
									<span className="dash-widget-icon">
										<i className="fa fa-usd" />
									</span>
									<div className="dash-widget-info">
										<h3>{dashboard ? dashboard[0]?.totalWithdrawalBalance : 0}</h3>
										<span>Withdrawal Balance</span>
									</div>
								</div>
							</div>
						</Link>
					</div>

					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
						<div className="card dash-widget">
							<div className="card-body">
								<span className="dash-widget-icon">
									<i className="fa fa-usd" />
								</span>
								<div className="dash-widget-info">
									<h3>{dashboard ? dashboard[0]?.totalProfit : 0}</h3>
									<span>Total Profit</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
						<div className="card dash-widget">
							<div className="card-body">
								<span className="dash-widget-icon">
									<i className="fa fa-usd" />
								</span>
								<div className="dash-widget-info">
									<h3>{dashboard ? dashboard[0]?.spotClosing : 0}</h3>
									<span>Spot Closing</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Page Content */}
		</div>
	);
};

export default PartnerDashboard;
