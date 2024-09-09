/**
 * App Header
 */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const Sidebar = (props) => {
	const [userRole, setuserRole] = useState();
	const [user, setuser] = useState();

	const [isSideMenu, setSideMenu] = useState("");
	const [level2Menu, setLevel2Menu] = useState("");
	const [level3Menu, setLevel3Menu] = useState("");

	const toggleSidebar = (value) => {
		// console.log(value);
		setSideMenu(value);
	};

	const toggleLvelTwo = (value) => {
		setLevel2Menu(value);
	};
	const toggleLevelThree = (value) => {
		setLevel3Menu(value);
	};

	useEffect(() => {
		setTimeout(() => {
			// console.log("Use Effect");
			const user = localStorage.getItem("user");
			// console.log("Use Effect", user);

			const user1 = JSON.parse(user);
			setuser(user1);
			setuserRole(user1?.role);
			// console.log("vvvvvvvvvvvvvvv", user1?.role);
		}, 1000);
	}, []);
	//   console.log(userRole, "role");

	let pathname = props.location.pathname;

	// console.log("first222222", userRole, isSideMenu);
	return (
		<div className="sidebar" id="sidebar">
			<Scrollbars
				autoHide
				autoHideTimeout={1000}
				autoHideDuration={200}
				autoHeight
				autoHeightMin={0}
				autoHeightMax="95vh"
				thumbMinSize={30}
				universal={false}
				hideTracksWhenNotNeeded={true}
			>
				<div className="sidebar-inner slimscroll">
					<div id="sidebar-menu" className="sidebar-menu">
						<ul>
							{/*Super Admin*/}
							<>
								{userRole && userRole === "Super Admin" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to={isSideMenu == "dashboard" ? "/app/main/dashboard" : "/app/main/employee-dashboard"}
													className={isSideMenu == "dashboard" ? "" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
												</Link>
											</li>

											{/*<li className="submenu">
                <a href="#" className={isSideMenu == "apps" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="apps" ? "": "apps")} ><i className="la la-cube" /> <span> Apps</span> <span className="menu-arrow" /></a>
                { isSideMenu == "apps" ?
                <ul>
                  <li><Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">Chat</Link></li>
                  <li className="submenu">
                    <a href="#" className={level2Menu == "calls" ? "subdrop" : ""} onClick={()=> toggleLvelTwo(level2Menu =="calls" ? "": "calls")}><span> Calls</span> <span className="menu-arrow" /></a>
                    { level2Menu == "calls" ?
                    <ul>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/voice-call">Voice Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/video-call">Video Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/outgoing-call">Outgoing Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/incoming-call">Incoming Call</Link></li>
                    </ul>
                    :""
                  }
                  </li>
                  <li><Link className={pathname.includes('apps/calendar') ?"active" :""} to="/app/apps/calendar">Calendar</Link></li>
                  <li><Link onClick={()=>localStorage.setItem("minheight","true")} className={pathname.includes('contacts') ?"active" :""} to="/app/apps/contacts">Contacts</Link></li>
                  <li><Link to = "/email/inbox">Email</Link></li>
                  <li><Link className={pathname.includes('file-manager') ?"active" :""} to="/app/apps/file-manager">File Manager</Link></li>
                </ul>
                	:""
                }
              </li>    */}
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "employee" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}
												>
													<i className="la la-user" /> <span> Employees</span>
													<span className="menu-arrow" />{" "}
												</a>
												{isSideMenu == "employee" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("allemployees")
																		? "active"
																		: pathname.includes("employees-list")
																		? "active"
																		: ""
																}
																to="/app/employee/allemployees"
															>
																All Employees
															</Link>
														</li>
														{/* <li><Link className={pathname.includes('holidays') ? "active" : ""} to="/app/employee/holidays">Holidays</Link></li> */}
														<li>
															<Link
																className={pathname.includes("es-admin") ? "active" : ""}
																to="/app/employee/leaves-admin"
															>
																Leaves (Admin){" "}
															</Link>
														</li>
														{/* <span className="badge badge-pill bg-primary float-end">1</span> */}
														<li>
															<Link
																className={pathname.includes("ves-employee") ? "active" : ""}
																to="/app/employee/leaves-employee"
															>
																Leaves (Employee)
															</Link>
														</li>
														{/* <li>
                          <Link
                            className={
                              pathname.includes("e-settings") ? "active" : ""
                            }
                            to="/app/employee/leave-settings"
                          >
                            Leave Settings
                          </Link>
                        </li> */}
														<li>
															<Link
																className={pathname.includes("nce-admin") ? "active" : ""}
																to="/app/employee/attendance-admin"
															>
																Attendance (Admin)
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("ce-employee") ? "active" : ""}
																to="/app/employee/attendance-employee"
															>
																Attendance (Employee)
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("departments") ? "active" : ""}
																to="/app/employee/departments"
															>
																Departments
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("designations") ? "active" : ""}
																to="/app/employee/designations"
															>
																Designations
															</Link>
														</li>
														{/* <li><Link className={pathname.includes('timesheet') ? "active" : ""} to="/app/employee/timesheet">Timesheet</Link></li> */}
														{/* <li><Link className={pathname.includes('shift-scheduling') || pathname.includes('shift-list') ? "active" : ""}
                      to="/app/employee/shift-scheduling">Shift &amp; Schedule</Link></li>
                    <li><Link className={pathname.includes('overtime') ? "active" : ""} to="/app/employee/overtime">Overtime</Link></li> */}
													</ul>
												) : (
													""
												)}
											</li>
											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/employees/clients">
													<i className="la la-users" /> <span>Clients</span>
												</Link>
											</li>
											{/* <li className={pathname.includes('members') ? "active" : ""}>
                <Link to="/app/employees/members"><i className="la la-users" /> <span>Members</span></Link>
              </li> */}
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "projects" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "projects" ? "" : "projects")}
												>
													<i className="la la-rocket" /> <span> Projects</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "projects" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("projects-list")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/projects/project_dashboard"
															>
																Projects
															</Link>
														</li>
														{/*<li>*/}
														{/*    <Link*/}
														{/*        onClick={() => localStorage.setItem("minheight", "true")}*/}
														{/*        to="/tasks/tasks"*/}
														{/*    >*/}
														{/*        Tasks*/}
														{/*    </Link>*/}
														{/*</li>*/}
														{/*<li>*/}
														{/*  <Link*/}
														{/*    className={*/}
														{/*      pathname.includes("task-board") ? "active" : ""*/}
														{/*    }*/}
														{/*    to="/app/projects/task-board"*/}
														{/*  >*/}
														{/*    Task Board*/}
														{/*  </Link>*/}
														{/*</li>*/}
													</ul>
												) : (
													""
												)}
											</li>

											{/* <li className={pathname.includes('leads') ? "active" : ""}>
                <Link to="/app/employees/leads"><i className="la la-user-secret" /> <span>Leads</span></Link>
              </li> */}
											{/* <li className={pathname.includes('tickets') ? "active" : pathname.includes('ticket-view') ? "active" : ""}>
                <Link to="/app/employees/tickets"><i className="la la-ticket" /> <span>Tickets</span></Link>
              </li> */}
										</>
										<li className="menu-title">
											<span>HR</span>
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "jobs" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "jobs" ? "" : "jobs")}
											>
												<i className="la la-briefcase" /> <span> Jobs </span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "jobs" ? (
												<ul>
													{/* <li><Link className={pathname.includes('user-dashboard') || pathname.includes('user-all-jobs') || pathname.includes('saved-jobs')
                      || pathname.includes('applied-jobs') || pathname.includes('interviewing') || pathname.includes('offered-jobs') ||
                      pathname.includes('visited-jobs') || pathname.includes('archived-jobs')
                      || pathname.includes('job-aptitude') || pathname.includes('questions') ? "active" : ""}
                      to="/app/administrator/user-dashboard"> User Dasboard </Link></li> */}
													<li>
														<Link
															className={pathname.includes("jobs-dashboard") ? "active" : ""}
															to="/app/administrator/jobs-dashboard"
														>
															{" "}
															Jobs Dasboard{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname === "/app/administrator/jobs" ? "active" : ""}
															to="/app/administrator/jobs"
														>
															{" "}
															Manage Jobs{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("manage-resumes") ? "active" : ""}
															to="/app/administrator/manage-resumes"
														>
															{" "}
															Manage Resumes{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("shortlist-candidates") ? "active" : ""}
															to="/app/administrator/shortlist-candidates"
														>
															{" "}
															Shortlist Candidates{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname === ('/app/administrator/interview-questions') ?"active" :""} to="/app/administrator/interview-questions"> Interview Questions </Link></li> */}
													<li>
														<Link
															className={pathname.includes("offer_approvals") ? "active" : ""}
															to="/app/administrator/offer_approvals"
														>
															{" "}
															Offer Approvals{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname.includes('experiance-level') ?"active" :""} to="/app/administrator/experiance-level"> Experience Level </Link></li> */}
													<li>
														<Link
															className={pathname === "/app/administrator/candidates" ? "active" : ""}
															to="/app/administrator/candidates"
														>
															{" "}
															Candidates List{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname.includes('schedule-timing') ?"active" :""} to="/app/administrator/schedule-timing"> Schedule timing </Link></li> */}
													{/* <li><Link className={pathname.includes('apptitude-result') ?"active" :""} to="/app/administrator/apptitude-result"> Aptitude Results </Link></li> */}
												</ul>
											) : (
												""
											)}
										</li>
										{/* <li className="submenu">
                <a href="#" className={isSideMenu == "sales" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "sales" ? "" : "sales")}><i className="la la-files-o" /> <span> Sales </span> <span className="menu-arrow" /></a>
                {isSideMenu == "sales" ?
                  <ul>
                    <li><Link className={pathname.includes('estimates') ? "active" : ""} to="/app/sales/estimates">Estimates</Link></li>
                    <li><Link className={pathname.includes('invoices') ? "active" : ""} to="/app/sales/invoices">Invoices</Link></li>
                    <li><Link className={pathname.includes('payments') ? "active" : ""} to="/app/sales/payments">Payments</Link></li>
                    <li><Link className={pathname.includes('expenses') ? "active" : ""} to="/app/sales/expenses">Expenses</Link></li>
                    <li><Link className={pathname.includes('provident-fund') ? "active" : ""} to="/app/sales/provident-fund">Provident Fund</Link></li>
                    <li><Link className={pathname.includes('taxes') ? "active" : ""} to="/app/sales/taxes">Taxes</Link></li>
                  </ul>
                  : ""
                }
              </li> */}
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "accounting" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
											>
												<i className="la la-files-o" /> <span> Accounting </span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "accounting" ? (
												<ul>
													{/* <li>
                            <Link
                              className={
                                pathname.includes("categories") ||
                                pathname.includes("sub-category")
                                  ? "active"
                                  : ""
                              }
                              to="/app/accounts/accountproject"
                            >
                              Account Project
                            </Link>
                          </li> */}
													<li>
														<Link
															className={
																pathname.includes("categories") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/categories"
														>
															Categories
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("incomecategory") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/incomecategory"
														>
															Income Category
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("expensecategory") || pathname.includes("sub-category")
																	? "active"
																	: ""
															}
															to="/app/accounts/expensecategory"
														>
															Expense Category
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("income-transactions") ? "active" : ""}
															to="/app/accounts/income-transactions"
														>
															Income Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("expense-transactions") ? "active" : ""}
															to="/app/accounts/expense-transactions"
														>
															Expense Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("liability") ? "active" : ""}
															to="/app/accounts/liability"
														>
															Liabilities
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("withdrawal") ? "active" : ""}
															to="/app/accounts/withdrawal"
														>
															Partner
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("employee-salary") ? "active" : ""}
															to="/app/accounts/employee-salary"
														>
															Employee Salary History
														</Link>
													</li>
													<li>
														<Link className={pathname.includes("budgets") ? "active" : ""} to="/app/accounts/budgets">
															Budgets
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-expenses") ? "active" : ""}
															to="/app/accounts/budget-expenses"
														>
															Budget Expenses
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-revenues") ? "active" : ""}
															to="/app/accounts/budget-revenues"
														>
															Budget Revenues
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("account-settings") ? "active" : ""}
															to="/app/accounts/account-settings"
														>
															Account Settings
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										{/* <li className="submenu">
                <a href="#" className={isSideMenu == "payroll" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "payroll" ? "" : "payroll")}><i className="la la-money" /> <span> Payroll </span> <span className="menu-arrow" /></a>
                {isSideMenu == "payroll" ?
                  <ul>
                    <li><Link className={pathname.includes('_salary') ? "active" : ""} to="/app/payroll/_salary"> Employee Salary </Link></li>
                    <li><Link className={pathname.includes('y-view') ? "active" : ""} to="/app/payroll/salary-view"> Payslip </Link></li>
                    <li><Link className={pathname.includes('payroll-items') ? "active" : ""} to="/app/payroll/payroll-items"> Payroll Items </Link></li>
                  </ul>
                  : ""
                }
              </li> */}
										<li className={pathname.includes("policies") ? "active" : ""}>
											<Link to="/app/hr/policies">
												<i className="la la-file-pdf-o" /> <span>Policies</span>
											</Link>
										</li>
										{/* <li className="submenu">
                <a href="#" className={isSideMenu == "reports" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "reports" ? "" : "reports")}><i className="la la-pie-chart" /> <span> Reports </span> <span className="menu-arrow" /></a>
                {isSideMenu == "reports" ?
                  <ul>
                    <li><Link className={pathname.includes('expense-') ? "active" : ""} to="/app/reports/expense-reports"> Expense Report </Link></li>
                    <li><Link className={pathname.includes('invoice-') ? "active" : ""} to="/app/reports/invoice-reports"> Invoice Report </Link></li>
                    <li><Link className={pathname.includes('payments-') ? "active" : ""} to="/app/reports/payments-reports"> Payments Report </Link></li>
                    <li><Link className={pathname.includes('project-') ? "active" : ""} to="/app/reports/project-reports"> Project Report </Link></li>
                    <li><Link className={pathname.includes('task-') ? "active" : ""} to="/app/reports/task-reports"> Task Report </Link></li>
                    <li><Link className={pathname.includes('user-') ? "active" : ""} to="/app/reports/user-reports"> User Report </Link></li>
                    <li><Link className={pathname.includes('employee-') ? "active" : ""} to="/app/reports/employee-reports"> Employee Report </Link></li>
                    <li><Link className={pathname.includes('payslip-') ? "active" : ""} to="/app/reports/payslip-reports"> Payslip Report </Link></li>
                    <li><Link className={pathname.includes('attendance-') ? "active" : ""} to="/app/reports/attendance-reports"> Attendance Report </Link></li>
                    <li><Link className={pathname.includes('leave-') ? "active" : ""} to="/app/reports/leave-reports"> Leave Report </Link></li>
                    <li><Link className={pathname.includes('daily-') ? "active" : ""} to="/app/reports/daily-reports"> Daily Report </Link></li>
                  </ul>
                  : ""
                }
              </li> */}
										{/*<li className="menu-title">
                <span>Performance</span>
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "performance" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="performance" ? "": "performance")}><i className="la la-graduation-cap" /> <span> Performance </span> <span className="menu-arrow" /></a>
                { isSideMenu == "performance" ?
                <ul>
                  <li><Link className={pathname.includes('-indicator') ?"active" :""} to="/app/performances/performance-indicator"> Performance Indicator </Link></li>
                  <li><Link className={pathname.includes('-review') ?"active" :""} to="/app/performances/performance-review"> Performance Review </Link></li>
                  <li><Link className={pathname.includes('-appraisal') ?"active" :""} to="/app/performances/performance-appraisal"> Performance Appraisal </Link></li>
                </ul>
                :""
              }
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "goals" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="goals" ? "": "goals")}><i className="la la-crosshairs" /> <span> Goals </span> <span className="menu-arrow" /></a>
                { isSideMenu == "goals" ?
                <ul>
                  <li><Link className={pathname.includes('-tracking') ?"active" :""} to="/app/goals/goal-tracking"> Goal List </Link></li>
                  <li><Link className={pathname.includes('l-type') ?"active" :""} to="/app/goals/goal-type"> Goal Type </Link></li>
                </ul>
                :""
              }
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "training" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="training" ? "": "training")}><i className="la la-edit" /> <span> Training </span> <span className="menu-arrow" /></a>
                { isSideMenu == "training" ?
                <ul>
                  <li><Link className={pathname.includes('training-list') ?"active" :""} to="/app/training/training-list"> Training List </Link></li>
                  <li><Link className={pathname.includes('trainer') ?"active" :""} to="/app/training/trainer"> Trainers</Link></li>
                  <li><Link className={pathname.includes('training-type') ?"active" :""} to="/app/training/training-type"> Training Type </Link></li>
                </ul>
                :""
              }
              </li>
              <li className={pathname.includes('promotion') ?"active" :""}><Link to = "/app/performance/promotion"><i className="la la-bullhorn" /> <span>Promotion</span></Link></li>
              <li className={pathname.includes('resignation') ?"active" :""}><Link to = "/app/performance/resignation"><i className="la la-external-link-square" /> <span>Resignation</span></Link></li>
              <li className={pathname.includes('termination') ?"active" :""}><Link to = "/app/performance/termination"><i className="la la-times-circle" /> <span>Termination</span></Link></li>
              */}
										<>
											<li className="menu-title">
												<span>Administration</span>
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "memberManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "memberManagement" ? "" : "memberManagement")}
												>
													<i className="la la-user" /> <span> Member Management</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "memberManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Members")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/members"
															>
																Member
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Nominee")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/nominee"
															>
																Nominee
															</Link>
														</li>
														{/* <li><Link onClick={() => localStorage.setItem("minheight", "true")} to=""></Link></li> */}
													</ul>
												) : (
													""
												)}
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "fileManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "fileManagement" ? "" : "fileManagement")}
												>
													<i className="la la-user" /> <span> File Management</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "fileManagement" ? (
													<ul>
														<li className={pathname.includes("Files") ? "active" : ""}>
															<Link to="/app/administrator/files">
																<i className="la la-object-ungroup" /> <span>Files</span>
															</Link>
														</li>
														<li className={pathname.includes("FileSubmission") ? "active" : ""}>
															<Link to="/app/administrator/fileSubmission">
																<i className="la la-object-ungroup" />
																<span>File Submission</span>
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className={pathname.includes("Booking") ? "active" : ""}>
												<Link to="/app/administrator/booking">
													<i className="la la-object-ungroup" /> <span>Booking</span>
												</Link>
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "inventoryManagement" ? "subdrop" : ""}
													onClick={() =>
														toggleSidebar(isSideMenu == "inventoryManagement" ? "" : "inventoryManagement")
													}
												>
													<i className="la la-ticket" /> <span> Inventory Management</span>{" "}
													<span className="menu-arrow" />
												</a>
												{isSideMenu == "inventoryManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Unit")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unit"
															>
																Unit
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Block")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/block"
															>
																Block
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Plot")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/plot"
															>
																Plot
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("PaymentPlan")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/paymentPlan"
															>
																Payment Plan
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("PaymentMode")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/paymentMode"
															>
																Payment Mode
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("InstallmentType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/installmentType"
															>
																Installment Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Phase")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/phase"
															>
																Phase
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Sector")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/sector"
															>
																Sector
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("UnitNatureType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unitNatureType"
															>
																Unit Nature Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Floor")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/floor"
															>
																Floor
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("UnitType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unitType"
															>
																Unit Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Street")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/street"
															>
																Street
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Category")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/category"
															>
																Category
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className={pathname.includes("transaction") ? "active" : ""}>
												<Link to="/app/administrator/transaction">
													<i className="las la-wallet" /> <span>Transactions</span>
												</Link>
											</li>
											<li className={pathname.includes("unverifiedtransaction") ? "active" : ""}>
												<Link to="/app/administrator/unverifiedtransaction">
													<i className="las la-wallet" /> <span>Un-Verify Installments</span>
												</Link>
											</li>
											<li className={pathname.includes("assets") ? "active" : ""}>
												<Link to="/app/administrator/assets">
													<i className="la la-object-ungroup" /> <span>Assets</span>
												</Link>
											</li>

											{/* <li className={pathname.includes('knowledgebase') ? "active" : ""}>
                <Link to="/app/administrator/knowledgebase"><i className="la la-question" /> <span>Knowledgebase</span></Link>
              </li> */}
											{/* <li className={pathname.includes('activities') ? "active" : ""}>
                <Link to="/app/administrator/activities"><i className="la la-bell" /> <span>Activities</span></Link>
              </li> */}
											<li className={pathname.includes("administrator/users") ? "active" : ""}>
												<Link to="/app/administrator/users">
													<i className="la la-user-plus" /> <span>Users</span>
												</Link>
											</li>
											<li>
												<Link to="/settings/companysetting">
													<i className="la la-cog" /> <span>Settings</span>
												</Link>
											</li>
										</>

										{/*<li className="menu-title"> */}
										{/*<span>Pages</span>*/}
										{/*<;/li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "profile" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="profile" ? "": "profile")}><i className="la la-user" /> <span> Profile </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "profile" ? */}
										{/*<ul>*/}
										{/* <li><Link className={pathname.includes('profile/employee-') ? "active" : ""} to="/app/profile/employee-profile"> Employee Profile </Link></li> */}
										{/*<li><Link className={pathname.includes('client-') ?"active" :""} to="/app/profile/client-profile"> Client Profile </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "authentication" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="authentication" ? "": "authentication")} ><i className="la la-key" /> <span> Authentication </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "authentication" ? */}
										{/*<ul>*/}
										{/*<li><Link to = "/login"> Login </Link></li>*/}
										{/*<li><Link to = "/register"> Register </Link></li>*/}
										{/*<li><Link to = "/forgotpassword"> Forgot Password </Link></li>*/}
										{/*<li><Link to = "/otp"> OTP </Link></li>*/}
										{/*<li><Link to = "/lockscreen"> Lock Screen </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "error pages" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="error pages" ? "": "error pages")}><i className="la la-exclamation-triangle" /> <span> Error Pages </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "error pages" ? */}
										{/*<ul>*/}
										{/*<li><Link to = "/error-404">404 Error </Link></li>*/}
										{/*<li><Link to = "/error-500">500 Error </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "subscriptions" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="subscriptions" ? "": "subscriptions")}><i className="la la-hand-o-up" /> <span> Subscriptions </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "subscriptions" ?*/}
										{/*<ul>*/}
										{/*<li><Link className={pathname.includes('subscriptionadmin') ?"active" :""} to="/app/subscription/subscriptionadmin"> */}
										{/*Subscriptions (Admin) </Link></li>*/}
										{/*<li><Link className={pathname.includes('subscriptioncompany') ?"active" :""} to="/app/subscription/subscriptioncompany">*/}
										{/*Subscriptions (Company) </Link></li>*/}
										{/*<li><Link className={pathname.includes('subscribedcompanies') ?"active" :""} to="/app/subscription/subscribedcompanies">*/}
										{/*Subscribed Companies</Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "pages" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="pages" ? "": "pages")}><i className="la la-columns" /> <span> Pages </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "pages" ?*/}
										{/*<ul>*/}
										{/*<li><Link className={pathname.includes('pages/search') ?"active" :""} to="/app/pages/search"> Search </Link></li>*/}
										{/*<li><Link className={pathname.includes('pages/faq') ?"active" :""} to="/app/pages/faq"> FAQ </Link></li>*/}
										{/*<li><Link className={pathname.includes('pages/terms') ?"active" :""} to="/app/pages/terms"> Terms </Link></li>*/}
										{/*<li><Link className={pathname.includes('privacypolicy') ?"active" :""} to="/app/pages/privacypolicy"> Privacy Policy </Link></li>*/}
										{/*<li><Link className={pathname.includes('pages/blank') ?"active" :""} to="/app/pages/blank"> Blank Page </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="menu-title"> */}
										{/*<span>UI Interface</span>*/}
										{/*</li>*/}
										{/*<li> */}
										{/*<Link to = "/ui-components"><i className="la la-puzzle-piece" /> <span>Components</span></Link>*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "forms" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="forms" ? "": "forms")}><i className="la la-object-group" /> <span> Forms </span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "forms" ?*/}
										{/*<ul>*/}
										{/*<li><Link className={pathname.includes('basicinputs') ?"active" :""}*/}
										{/*to="/app/ui-interface/forms/basicinputs">Basic Inputs </Link></li>*/}
										{/*<li><Link className={pathname.includes('inputgroups') ?"active" :""} */}
										{/*to="/app/ui-interface/forms/inputgroups">Input Groups </Link></li>*/}
										{/*<li><Link className={pathname.includes('horizontalform') ?"active" :""}*/}
										{/*to="/app/ui-interface/forms/horizontalform">Horizontal Form </Link></li>*/}
										{/*<li><Link className={pathname.includes('verticalform') ?"active" :""} */}
										{/*to="/app/ui-interface/forms/verticalform"> Vertical Form </Link></li>*/}
										{/*<li><Link className={pathname.includes('formmask') ?"active" :""}*/}
										{/*to="/app/ui-interface/forms/formmask"> Form Mask </Link></li>*/}
										{/*<li><Link className={pathname.includes('formvalidation') ?"active" :""}*/}
										{/*to="/app/ui-interface/forms/formvalidation"> Form Validation </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<Link to = "/app/ui-interface/tables/basic" className={isSideMenu == "tables" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="tables" ? "": "tables")}><i className="la la-table" /> <span> Tables </span> <span className="menu-arrow" /></Link>*/}
										{/*{ isSideMenu == "tables" ?*/}
										{/*<ul>*/}
										{/*<li><Link className={pathname.includes('tables/basic') ?"active" :""} to="/app/ui-interface/tables/basic">Basic Tables </Link></li>*/}
										{/*<li><Link className={pathname.includes('tables/data-table') ?"active" :""} to="/app/ui-interface/tables/data-table">Data Table </Link></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li className="menu-title"> */}
										{/*<span>Extras</span>*/}
										{/*</li>*/}
										{/*<li> */}
										{/*<a href="#"><i className="la la-file-text" /> <span>Documentation</span></a>*/}
										{/*</li>*/}
										{/*<li> */}
										{/*<a href=""><i className="la la-info" /> <span>Change Log</span> <span className="badge badge-primary ml-auto">v3.4</span></a>*/}
										{/*</li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={isSideMenu == "multi Level" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="multi Level" ? "": "multi Level")}><i className="la la-share-alt" /> <span>Multi Level</span> <span className="menu-arrow" /></a>*/}
										{/*{ isSideMenu == "multi Level" ?*/}
										{/*<ul>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={level2Menu == "level 1" ? "subdrop" : ""} onClick={()=> toggleLvelTwo(level2Menu =="level 1" ? "": "level 1")}> <span>Level 1</span> <span className="menu-arrow" /></a>*/}
										{/*{ level2Menu == "level 1" ?*/}
										{/*<ul>*/}
										{/*<li><a href="#" ><span>Level 2</span></a></li>*/}
										{/*<li className="submenu">*/}
										{/*<a href="#" className={level3Menu == "level 2" ? "subdrop" : ""} onClick={()=> toggleLevelThree( level3Menu =="level 2" ? "": "level 2")}> <span> Level 2</span> <span className="menu-arrow" /></a>*/}
										{/*{level3Menu == "level 2" ?*/}
										{/*<ul>*/}
										{/*<li><a href="">Level 3</a></li>*/}
										{/*<li><a href="">Level 3</a></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li><a href=""> <span>Level 2</span></a></li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
										{/*<li>*/}
										{/*<a href=""> <span>Level 1</span></a>*/}
										{/*</li>*/}
										{/*</ul>*/}
										{/*:"" */}
										{/*}*/}
										{/*</li>*/}
									</>
								)}
							</>
							{/*Admin*/}
							<>
								{userRole && userRole === "Admin" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/dashboard"
													className={isSideMenu == "dashboard" ? "subdrop" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> {/*<span className="menu-arrow"/>*/}
												</Link>
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "employee" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}
												>
													<i className="la la-user" /> <span> Employee Management</span>
													<span className="menu-arrow" />{" "}
												</a>
												{isSideMenu == "employee" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("allemployees")
																		? "active"
																		: pathname.includes("employees-list")
																		? "active"
																		: ""
																}
																to="/app/employee/allemployees"
															>
																All Employees
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("es-admin") ? "active" : ""}
																to="/app/employee/leaves-admin"
															>
																Leaves
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("nce-admin") ? "active" : ""}
																to="/app/employee/attendance-admin"
															>
																Attendance
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("departments") ? "active" : ""}
																to="/app/employee/departments"
															>
																Departments
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("designations") ? "active" : ""}
																to="/app/employee/designations"
															>
																Designations
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "projectManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "projectManagement" ? "" : "projectManagement")}
												>
													<i className="la la-procedures" /> <span> Project Management</span>
													<span className="menu-arrow" />{" "}
												</a>
												{isSideMenu == "projectManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("allemployees")
																		? "active"
																		: pathname.includes("employees-list")
																		? "active"
																		: ""
																}
																to="/app/employees/clients"
															>
																Clients
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("es-admin") ? "active" : ""}
																to="/app/projects/project_dashboard"
															>
																Projects
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
										</>

										<>
											<li className="menu-title">
												<span>Administration</span>
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "systemManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "systemManagement" ? "" : "systemManagement")}
												>
													<i className="la la-user-plus" /> <span>System Management</span>{" "}
													<span className="menu-arrow" />
												</a>

												{isSideMenu == "systemManagement" ? (
													<ul>
														<li>
															<Link to="/app/administrator/users">Users</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "memberManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "memberManagement" ? "" : "memberManagement")}
												>
													<i className="la la-user" /> <span> Member Management</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "memberManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Members")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/members"
															>
																Member
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Nominee")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/nominee"
															>
																Nominee
															</Link>
														</li>
														{/* <li><Link onClick={() => localStorage.setItem("minheight", "true")} to=""></Link></li> */}
													</ul>
												) : (
													""
												)}
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "inventoryManagement" ? "subdrop" : ""}
													onClick={() =>
														toggleSidebar(isSideMenu == "inventoryManagement" ? "" : "inventoryManagement")
													}
												>
													<i className="la la-ticket" /> <span> Inventory Management</span>{" "}
													<span className="menu-arrow" />
												</a>
												{isSideMenu == "inventoryManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Unit")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unit"
															>
																Unit
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Block")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/block"
															>
																Block
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Plot")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/plot"
															>
																Plot
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("PaymentPlan")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/paymentPlan"
															>
																Payment Plan
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("PaymentMode")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/paymentMode"
															>
																Payment Mode
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("InstallmentType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/installmentType"
															>
																Installment Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Phase")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/phase"
															>
																Phase
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Sector")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/sector"
															>
																Sector
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("UnitNatureType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unitNatureType"
															>
																Unit Nature Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Floor")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/floor"
															>
																Floor
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("UnitType")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/unitType"
															>
																Unit Type
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Street")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/street"
															>
																Street
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Category")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/category"
															>
																Category
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "fileManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "fileManagement" ? "" : "fileManagement")}
												>
													<i className="la la-file" /> <span> File Management</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "fileManagement" ? (
													<ul>
														<li className={pathname.includes("Files") ? "active" : ""}>
															<Link to="/app/administrator/files">Files</Link>
														</li>
														<li className={pathname.includes("FileSubmission") ? "active" : ""}>
															<Link to="/app/administrator/fileSubmission">File Submission</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "bookingManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "bookingManagement" ? "" : "bookingManagement")}
												>
													<i className="la la-book-open" /> <span> Booking Management</span>{" "}
													<span className="menu-arrow" />
												</a>

												{isSideMenu == "bookingManagement" ? (
													<ul>
														<li>
															<Link to="/app/administrator/booking">Booking</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "cashManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "cashManagement" ? "" : "cashManagement")}
												>
													<i className="las la-wallet" /> <span>Cash Management</span> <span className="menu-arrow" />
												</a>

												{isSideMenu == "cashManagement" ? (
													<ul>
														<li>
															<Link to="/app/administrator/transaction">Transactions</Link>
														</li>
														<li>
															<Link to="/app/administrator/report">Report</Link>
														</li>
														<li>
															<Link to="/app/administrator/ndcfee">NDC Fee</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "transferManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "transferManagement" ? "" : "transferManagement")}
												>
													<i className="las la-file-alt" /> <span>Transfer Management</span>{" "}
													<span className="menu-arrow" />
												</a>

												{isSideMenu == "transferManagement" ? (
													<ul>
														<li>
															<Link to="/app/administrator/transfer">File Transfer</Link>
														</li>
														{/* <li>
                                                <Link to="/app/administrator/report">
                                                    Report
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/app/administrator/ndcfee">
                                                    NDC Fee
                                                </Link>
                                            </li> */}
													</ul>
												) : (
													""
												)}
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "verificationManagement" ? "subdrop" : ""}
													onClick={() =>
														toggleSidebar(isSideMenu == "verificationManagement" ? "" : "verificationManagement")
													}
												>
													<i className="las la-money-bill" /> <span>Verification Management</span>{" "}
													<span className="menu-arrow" />
												</a>

												{isSideMenu == "verificationManagement" ? (
													<ul>
														<li>
															<Link to="/app/administrator/unverifiedtransaction">Un-Verify Installments</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>

											<li className={pathname.includes("assets") ? "active" : ""}>
												<Link to="/app/administrator/assets">
													<i className="la la-object-ungroup" /> <span>Assets Management</span>
												</Link>
											</li>

											<li>
												<Link to="/settings/companysetting">
													<i className="la la-cog" /> <span>Settings</span>
												</Link>
											</li>
										</>

										<li className="menu-title">
											<span>HR</span>
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "jobs" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "jobs" ? "" : "jobs")}
											>
												<i className="la la-briefcase" /> <span> Jobs Management</span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "jobs" ? (
												<ul>
													<li>
														<Link
															className={pathname.includes("jobs-dashboard") ? "active" : ""}
															to="/app/administrator/jobs-dashboard"
														>
															{" "}
															Jobs Dashboard{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname === "/app/administrator/jobs" ? "active" : ""}
															to="/app/administrator/jobs"
														>
															{" "}
															Manage Jobs{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("manage-resumes") ? "active" : ""}
															to="/app/administrator/manage-resumes"
														>
															{" "}
															Manage Resumes{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("shortlist-candidates") ? "active" : ""}
															to="/app/administrator/shortlist-candidates"
														>
															{" "}
															Shortlist Candidates{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("offer_approvals") ? "active" : ""}
															to="/app/administrator/offer_approvals"
														>
															{" "}
															Offer Approvals{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname === "/app/administrator/candidates" ? "active" : ""}
															to="/app/administrator/candidates"
														>
															{" "}
															Candidates List{" "}
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "accounting" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
											>
												<i className="la la-files-o" /> <span> Account Management</span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "accounting" ? (
												<ul>
													{/* <li>
                            <Link
                              className={
                                pathname.includes("categories") ||
                                pathname.includes("sub-category")
                                  ? "active"
                                  : ""
                              }
                              to="/app/accounts/accountproject"
                            >
                              Account Project
                            </Link>
                          </li> */}
													<li>
														<Link
															className={
																pathname.includes("categories") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/categories"
														>
															Categories
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("incomecategory") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/incomecategory"
														>
															Income Category
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("expensecategory") || pathname.includes("sub-category")
																	? "active"
																	: ""
															}
															to="/app/accounts/expensecategory"
														>
															Expense Category
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("income-transactions") ? "active" : ""}
															to="/app/accounts/income-transactions"
														>
															Income Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("expense-transactions") ? "active" : ""}
															to="/app/accounts/expense-transactions"
														>
															Expense Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("liability") ? "active" : ""}
															to="/app/accounts/liability"
														>
															Liabilities
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("withdrawal") ? "active" : ""}
															to="/app/accounts/withdrawal"
														>
															Partner
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("employee-salary") ? "active" : ""}
															to="/app/accounts/employee-salary"
														>
															Employee Salary History
														</Link>
													</li>
													<li>
														<Link className={pathname.includes("budgets") ? "active" : ""} to="/app/accounts/budgets">
															Budgets
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-expenses") ? "active" : ""}
															to="/app/accounts/budget-expenses"
														>
															Budget Expenses
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-revenues") ? "active" : ""}
															to="/app/accounts/budget-revenues"
														>
															Budget Revenues
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("account-settings") ? "active" : ""}
															to="/app/accounts/account-settings"
														>
															Account Settings
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className={pathname.includes("policies") ? "active" : ""}>
											<Link to="/app/hr/policies">
												<i className="la la-file-pdf-o" /> <span>Policies</span>
											</Link>
										</li>
										<li className={""}>
											<Link to="#"></Link>
										</li>
										<li className={""}>
											<Link to="#"></Link>
										</li>
									</>
								)}
							</>
							{/*Employee*/}
							<>
								{userRole && userRole === "Employee" && (
									<>
										<li className="menu-title">
											<span>Main</span>
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "dashboard" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
											>
												<i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "dashboard" ? (
												<ul>
													<li>
														<Link
															className={pathname.includes("main/employee-") ? "active" : ""}
															to="/app/main/employee-dashboard"
														>
															Employee Dashboard
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "employee" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}
											>
												<i className="la la-user" /> <span> Employees</span>
												<span className="menu-arrow" />{" "}
											</a>
											{isSideMenu == "employee" ? (
												<ul>
													<li>
														<Link
															className={pathname.includes("ce-employee") ? "active" : ""}
															to="/app/employee/attendance-employee"
														>
															Attendance
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("ves-employee") ? "active" : ""}
															to="/app/employee/leaves-employee"
														>
															Leaves
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "tasks" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "tasks" ? "" : "tasks")}
											>
												<i className="la la-rocket" /> <span> Tasks</span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "tasks" ? (
												<ul>
													<li>
														<Link onClick={() => localStorage.setItem("minheight", "true")} to="/tasks/tasks">
															Tasks
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
									</>
								)}
							</>

							{/* HR */}
							<>
								{userRole && userRole === "HR" && (
									<>
										<li className="menu-title">
											<span>HR</span>
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "jobs" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "jobs" ? "" : "jobs")}
											>
												<i className="la la-briefcase" /> <span> Jobs </span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "jobs" ? (
												<ul>
													{/* <li><Link className={pathname.includes('user-dashboard') || pathname.includes('user-all-jobs') || pathname.includes('saved-jobs')
                      || pathname.includes('applied-jobs') || pathname.includes('interviewing') || pathname.includes('offered-jobs') ||
                      pathname.includes('visited-jobs') || pathname.includes('archived-jobs')
                      || pathname.includes('job-aptitude') || pathname.includes('questions') ? "active" : ""}
                      to="/app/administrator/user-dashboard"> User Dasboard </Link></li> */}
													<li>
														<Link
															className={pathname.includes("jobs-dashboard") ? "active" : ""}
															to="/app/administrator/jobs-dashboard"
														>
															{" "}
															Jobs Dashboard{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname === "/app/administrator/jobs" ? "active" : ""}
															to="/app/administrator/jobs"
														>
															{" "}
															Manage Jobs{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("manage-resumes") ? "active" : ""}
															to="/app/administrator/manage-resumes"
														>
															{" "}
															Manage Resumes{" "}
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("shortlist-candidates") ? "active" : ""}
															to="/app/administrator/shortlist-candidates"
														>
															{" "}
															Shortlist Candidates{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname === ('/app/administrator/interview-questions') ?"active" :""} to="/app/administrator/interview-questions"> Interview Questions </Link></li> */}
													<li>
														<Link
															className={pathname.includes("offer_approvals") ? "active" : ""}
															to="/app/administrator/offer_approvals"
														>
															{" "}
															Offer Approvals{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname.includes('experiance-level') ?"active" :""} to="/app/administrator/experiance-level"> Experience Level </Link></li> */}
													<li>
														<Link
															className={pathname === "/app/administrator/candidates" ? "active" : ""}
															to="/app/administrator/candidates"
														>
															{" "}
															Candidates List{" "}
														</Link>
													</li>
													{/* <li><Link className={pathname.includes('schedule-timing') ?"active" :""} to="/app/administrator/schedule-timing"> Schedule timing </Link></li> */}
													{/* <li><Link className={pathname.includes('apptitude-result') ?"active" :""} to="/app/administrator/apptitude-result"> Aptitude Results </Link></li> */}
												</ul>
											) : (
												""
											)}
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "employee" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "employee" ? "" : "employee")}
											>
												<i className="la la-user" /> <span> Employees</span>
												<span className="menu-arrow" />{" "}
											</a>
											{isSideMenu == "employee" ? (
												<ul>
													<li>
														<Link
															className={
																pathname.includes("allemployees")
																	? "active"
																	: pathname.includes("employees-list")
																	? "active"
																	: ""
															}
															to="/app/employee/allemployees"
														>
															All Employees
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("es-admin") ? "active" : ""}
															to="/app/employee/leaves-admin"
														>
															Leaves
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("nce-admin") ? "active" : ""}
															to="/app/employee/attendance-admin"
														>
															Attendance
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "accounting" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
											>
												<i className="la la-files-o" /> <span> Accounting </span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "accounting" ? (
												<ul>
													<li>
														<Link
															className={
																pathname.includes("categories") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/categories"
														>
															Categories
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("incomecategory") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/incomecategory"
														>
															Income Category
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("expensecategory") || pathname.includes("sub-category")
																	? "active"
																	: ""
															}
															to="/app/accounts/expensecategory"
														>
															Expense Category
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("income-transactions") ? "active" : ""}
															to="/app/accounts/income-transactions"
														>
															Income Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("expense-transactions") ? "active" : ""}
															to="/app/accounts/expense-transactions"
														>
															Expense Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("employee-salary") ? "active" : ""}
															to="/app/accounts/employee-salary"
														>
															Employee Salary History
														</Link>
													</li>
													<li>
														<Link className={pathname.includes("budgets") ? "active" : ""} to="/app/accounts/budgets">
															Budgets
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-expenses") ? "active" : ""}
															to="/app/accounts/budget-expenses"
														>
															Budget Expenses
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-revenues") ? "active" : ""}
															to="/app/accounts/budget-revenues"
														>
															Budget Revenues
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("account-settings") ? "active" : ""}
															to="/app/accounts/account-settings"
														>
															Account Settings
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className={pathname.includes("policies") ? "active" : ""}>
											<Link to="/app/hr/policies">
												<i className="la la-file-pdf-o" /> <span>Policies</span>
											</Link>
										</li>
									</>
								)}
							</>

							{/*CSR MANAGER*/}
							<>
								{userRole && userRole === "CSR Manger" && (
									<>
										<li className="menu-title">
											<span>Accounts</span>
										</li>

										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "accounting" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
											>
												<i className="la la-files-o" /> <span> Accounting </span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "accounting" ? (
												<ul>
													<li>
														<Link
															className={
																pathname.includes("categories") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/categories"
														>
															Categories
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("incomecategory") || pathname.includes("sub-category") ? "active" : ""
															}
															to="/app/accounts/incomecategory"
														>
															Income Category
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("expensecategory") || pathname.includes("sub-category")
																	? "active"
																	: ""
															}
															to="/app/accounts/expensecategory"
														>
															Expense Category
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("account-transactions") ? "active" : ""}
															to="/app/accounts/account-transactions"
														>
															Account Transactions
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("employee-salary") ? "active" : ""}
															to="/app/accounts/employee-salary"
														>
															Employee Salary History
														</Link>
													</li>
													<li>
														<Link className={pathname.includes("budgets") ? "active" : ""} to="/app/accounts/budgets">
															Budgets
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-expenses") ? "active" : ""}
															to="/app/accounts/budget-expenses"
														>
															Budget Expenses
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("budget-revenues") ? "active" : ""}
															to="/app/accounts/budget-revenues"
														>
															Budget Revenues
														</Link>
													</li>
													<li>
														<Link
															className={pathname.includes("account-settings") ? "active" : ""}
															to="/app/accounts/account-settings"
														>
															Account Settings
														</Link>
													</li>
												</ul>
											) : (
												""
											)}
										</li>
										<li className={pathname.includes("Booking") ? "active" : ""}>
											<Link to="/app/administrator/booking">
												<i className="la la-object-ungroup" /> <span>Booking</span>
											</Link>
										</li>
										<li className="submenu">
											<a
												href="#"
												className={isSideMenu == "memberManagement" ? "subdrop" : ""}
												onClick={() => toggleSidebar(isSideMenu == "memberManagement" ? "" : "memberManagement")}
											>
												<i className="la la-user" /> <span> Member Management</span> <span className="menu-arrow" />
											</a>
											{isSideMenu == "memberManagement" ? (
												<ul>
													<li>
														<Link
															className={
																pathname.includes("t_dashboard")
																	? "active"
																	: pathname.includes("Members")
																	? "active"
																	: pathname.includes("cts-view")
																	? "active"
																	: ""
															}
															to="/app/administrator/members"
														>
															Member
														</Link>
													</li>
													<li>
														<Link
															className={
																pathname.includes("t_dashboard")
																	? "active"
																	: pathname.includes("Nominee")
																	? "active"
																	: pathname.includes("cts-view")
																	? "active"
																	: ""
															}
															to="/app/administrator/nominee"
														>
															Nominee
														</Link>
													</li>
													{/* <li><Link onClick={() => localStorage.setItem("minheight", "true")} to=""></Link></li> */}
												</ul>
											) : (
												""
											)}
										</li>
										<li>
											<Link to="/app/administrator/report">
												<i className="la la-file-pdf-o" /> <span>Report</span>
											</Link>
										</li>
										<li>
											<Link to="/app/administrator/ndcfee">
												<i className="la la-object-ungroup" /> <span>NDC Fee/Transfer</span>
											</Link>
										</li>
									</>
								)}
							</>

							{/*COLONEL*/}
							<>
								{userRole && userRole === "colonel" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/colonel-dashboard"
													className={isSideMenu == "dashboard" ? "" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> {/*<span className="menu-arrow"/>*/}
												</Link>
											</li>

											{/* <li className={pathname.includes("clients") ? "active" : ""}>
                                        <Link to="/app/administrator/fileSubmission">
                                            <i className="la la-users" /> <span>Files</span>
                                        </Link>
                                    </li>
                                   <li>
                                        <Link to="/app/administrator/report">
                                            <i className="la la-file-pdf-o" />  <span>Report</span>
                                        </Link>
                                    </li> */}
											<li>
												<Link to="/app/administrator/ndcfee">
													<i className="la la-object-ungroup" /> <span>NDC Fee/Transfer</span>
												</Link>
											</li>
										</>
									</>
								)}
							</>

							{/* {PARTNER DASHBOARD} */}
							<>
								{userRole && userRole === "Partner" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/partner-dashboard"
													className={isSideMenu == "dashboard" ? "" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span>Main Dashboard</span>{" "}
													{/*<span className="menu-arrow"/>*/}
												</Link>
											</li>
											<ul>
												<li>
													<Link to="/app/administrator/partnerbooking">Booking</Link>
												</li>
											</ul>
											<ul>
												<li>
													<Link to="/app/administrator/partnerfiles">Files</Link>
												</li>
												<li>
													<Link to="/app/administrator/partnerfileSubmission">File Submission</Link>
												</li>
											</ul>
											<ul>
												<li>
													<Link to="/app/administrator/partnerndcfee">Transfer</Link>
												</li>
											</ul>
										</>
									</>
								)}
							</>

							{/* {Account Transaction} */}
							<>
								{userRole && userRole === "Account Transaction" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/account-dashboard"
													className={isSideMenu == "dashboard" ? "subdrop" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> {/*<span className="menu-arrow"/>*/}
												</Link>
											</li>
											<li className="menu-title">
												<span>Accounts</span>
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "accounting" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
												>
													<i className="la la-files-o" /> <span> Accounting </span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "accounting" ? (
													<ul>
														<li>
															<Link
																className={pathname.includes("income-transactions") ? "active" : ""}
																to="/app/accounts/income-transactions"
															>
																Income Transactions
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("expense-transactions") ? "active" : ""}
																to="/app/accounts/expense-transactions"
															>
																Expense Transactions
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
										</>
									</>
								)}
							</>

							{/*File COllector*/}
							<>
								{userRole && userRole === "File Collector" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/collector-dashboard"
													className={isSideMenu == "dashboard" ? "" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> {/*<span className="menu-arrow"/>*/}
												</Link>
											</li>

											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/administrator/fileSubmission">
													<i className="la la-users" /> <span>Files</span>
												</Link>
											</li>
											{user && (user.id == 19 || user.id == 16 || user.id == 8) && (
												<li>
													<Link to="/app/administrator/report">
														<i className="la la-file-pdf-o" /> <span>Report</span>
													</Link>
												</li>
											)}
											<li>
												<Link to="/app/administrator/ndcfee">
													<i className="la la-object-ungroup" /> <span>NDC Fee/Transfer</span>
												</Link>
											</li>
										</>
									</>
								)}
							</>

							{/*Accounts*/}
							<>
								{userRole && userRole === "Accounts" && (
									<>
										<>
											<li className="menu-title">
												<span>Accounts</span>
											</li>

											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "accounting" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "accounting" ? "" : "accounting")}
												>
													<i className="la la-files-o" /> <span> Accounting </span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "accounting" ? (
													<ul>
														{/* <li>
                            <Link
                              className={
                                pathname.includes("categories") ||
                                pathname.includes("sub-category")
                                  ? "active"
                                  : ""
                              }
                              to="/app/accounts/accountProject"
                            >
                              Account Project
                            </Link>
                          </li> */}

														<li>
															<Link
																className={pathname.includes("income-transactions") ? "active" : ""}
																to="/app/accounts/income-transactions"
															>
																Income Transactions
															</Link>
														</li>
														<li>
															<Link
																className={pathname.includes("expense-transactions") ? "active" : ""}
																to="/app/accounts/expense-transactions"
															>
																Expense Transactions
															</Link>
														</li>
													</ul>
												) : (
													""
												)}
											</li>
											<li className={pathname.includes("Booking") ? "active" : ""}>
												<Link to="/app/administrator/booking">
													<i className="la la-object-ungroup" /> <span>Booking</span>
												</Link>
											</li>
											<li className="submenu">
												<a
													href="#"
													className={isSideMenu == "memberManagement" ? "subdrop" : ""}
													onClick={() => toggleSidebar(isSideMenu == "memberManagement" ? "" : "memberManagement")}
												>
													<i className="la la-user" /> <span> Member Management</span> <span className="menu-arrow" />
												</a>
												{isSideMenu == "memberManagement" ? (
													<ul>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Members")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/members"
															>
																Member
															</Link>
														</li>
														<li>
															<Link
																className={
																	pathname.includes("t_dashboard")
																		? "active"
																		: pathname.includes("Nominee")
																		? "active"
																		: pathname.includes("cts-view")
																		? "active"
																		: ""
																}
																to="/app/administrator/nominee"
															>
																Nominee
															</Link>
														</li>
														{/* <li><Link onClick={() => localStorage.setItem("minheight", "true")} to=""></Link></li> */}
													</ul>
												) : (
													""
												)}
											</li>

											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/administrator/report">
													<i className="la la-users" /> <span>Report</span>
												</Link>
											</li>
											<li>
												<Link to="/app/administrator/ndcfee">
													<i className="la la-object-ungroup" /> <span>NDC Fee/Transfer</span>
												</Link>
											</li>
										</>
									</>
								)}
							</>

							{/*Cashier*/}
							<>
								{userRole && userRole === "Cashier" && (
									<>
										<>
											<li className="menu-title">
												<span>Main</span>
											</li>
											<li className="submenu">
												<Link
													to="/app/main/cashier-dashboard"
													className={isSideMenu == "dashboard" ? "" : ""}
													// onClick={() => toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")}
												>
													<i className="la la-dashboard" /> <span> Dashboard</span> {/*<span className="menu-arrow"/>*/}
												</Link>
											</li>

											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/administrator/transaction">
													<i className="la la-users" /> <span>Transactions</span>
												</Link>
											</li>
											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/administrator/report">
													<i className="la la-users" /> <span>Report</span>
												</Link>
											</li>
											<li className={pathname.includes("clients") ? "active" : ""}>
												<Link to="/app/main/surcharges">
													<i className="la la-users" /> <span>Surcharge Report</span>
												</Link>
											</li>
											{(user.id === 13 || user.id === 18) && (
												<li className={pathname.includes("unverifiedtransaction") ? "active" : ""}>
													<Link to="/app/administrator/unverifiedtransaction">
														<i className="las la-wallet" /> <span>Un-Verify Installments</span>
													</Link>
												</li>
											)}
											{user.id === 18 && (
												<li>
													<Link to="/app/administrator/ndcfee">
														<i className="la la-object-ungroup" /> <span>NDC Fee/Transfer</span>
													</Link>
												</li>
											)}
											{/* <li className={pathname.includes("invarifiedTransaction") ? "active" : ""}>
                                        <Link to="/app/administrator/inverifiedtransaction">
                                            <i className="las la-user"/> <span>Invarified Transaction</span>
                                        </Link>
                                    </li> */}
										</>
									</>
								)}
							</>
						</ul>
					</div>
				</div>
			</Scrollbars>
		</div>
	);
};

export default withRouter(Sidebar);
