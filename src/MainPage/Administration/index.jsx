/**
 * Tables Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Users from "./users";
import Groups from "./Groups";
import Activities from "./activities";
import Assets from "./assets";
import knowledgebase from "./knowledgebase";
import knowledgebaseview from "./knowledgebase-view";
import Managedjobs from "./Jobs/managejobs";
import AppliedCandidate from "./Jobs/appliedcandidate";
import jobdetails from "./Jobs/jobdetails";
import AptituedeResults from "./Jobs/aptituderesults";
import CandidateList from "./Jobs/candidatelist";
import Experiencelevel from "./Jobs/experiencelevel";
import Interviewquestion from "./Jobs/interviewquestion";
import JobsDashboard from "./Jobs/jobs_dashboard";
import ManageResumes from "./Jobs/manageresumes";
import Offerapproval from "./Jobs/offerapproval";
import ScheduleTimings from "./Jobs/scheduletiming";
import ShortlistCandidate from "./Jobs/shortlistcandidates";
import UserDashboard from "./Jobs/user_dashboard";
import Useralljobs from "./Jobs/user_all_jobs";
import Savedjobs from "./Jobs/saved_jobs";
import Appliedjobs from "./Jobs/applied_jobs";
import Interviewing from "./Jobs/interviewing";
import OfferedJobs from "./Jobs/offered_jobs";
import Visitedjobs from "./Jobs/visited_jobs";
import Archivedjobs from "./Jobs/archived_jobs";
import Jobapptitude from "./Jobs/job_aptitude";
import Questions from "./Jobs/questions";
import Files from "./FileManagement/Files";
import Booking from "./FileManagement/Booking";
import Create from "./FileManagement/create";
import Members from "./MemberManagement/Members";
import Nominee from "./MemberManagement/Nominee";
import Unit from "./InventoryManagement/Unit";
import Floor from "./InventoryManagement/Floor";
import UnitType from "./InventoryManagement/UnitType";
import Category from "./InventoryManagement/Category";
import Block from "./InventoryManagement/Block";
import PlotSize from "./InventoryManagement/PlotSize";
import PaymentPlan from "./InventoryManagement/PaymentPlan";
import Phase from "./InventoryManagement/Phase";
import Sector from "./InventoryManagement/Sector";
import UnitNatureType from "./InventoryManagement/UnitNatureType";
import NdcCharges from "./InventoryManagement/NdcCharges";
import Transaction from "./CashManagement/Transaction";
import InverifiedTransaction from "./CashManagement/invarifiedTransaction";
import CreateTransaction from "./CashManagement/CreateTransaction";
// import FileCollect from "./FileManagement/FileCollect";
import FileSubmission from "./FileManagement/FileSubmission";
import Street from "./InventoryManagement/Street";
import PaymentMode from "./InventoryManagement/PaymentMode";
import InstallmentType from "./InventoryManagement/InstallmentType";
import Report from "./CashManagement/Report";
import Ndcfee from "./CashManagement/ndcfee";
import Transfer from "./TransferManagement/Transfer";
import CategoryTransfer from "./TransferManagement/CategoryTransfer";
import PartnerBooking from "./FileManagement/partnerBooking";
import PartnerNdcfee from "./CashManagement/partnerNdc";
import PartnerFileSubmission from "./FileManagement/partnerSubmission";
import PartnerFiles from "./FileManagement/partnerFiles";
import Restorationfee from "./CashManagement/Restorationfee";

const Uiinterfaceroute = ({ match }) => (
	<Switch>
		<Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
		<Route path={`${match.url}/users`} component={Users} />
		<Route path={`${match.url}/groups`} component={Groups} />
		<Route path={`${match.url}/activities`} component={Activities} />
		<Route path={`${match.url}/files`} component={Files} />
		<Route path={`${match.url}/partnerfiles`} component={PartnerFiles} />
		<Route path={`${match.url}/booking`} component={Booking} />
		<Route path={`${match.url}/partnerbooking`} component={PartnerBooking} />
		<Route path={`${match.url}/create`} component={Create} />

		<Route path={`${match.url}/assets`} component={Assets} />
		<Route path={`${match.url}/knowledgebase`} component={knowledgebase} />
		<Route path={`${match.url}/knowledgebase-view`} component={knowledgebaseview} />
		<Route path={`${match.url}/user-dashboard`} component={UserDashboard} />
		<Route path={`${match.url}/user-all-jobs`} component={Useralljobs} />
		<Route path={`${match.url}/saved-jobs`} component={Savedjobs} />
		<Route path={`${match.url}/applied-jobs`} component={Appliedjobs} />
		<Route path={`${match.url}/interviewing`} component={Interviewing} />
		<Route path={`${match.url}/offered-jobs`} component={OfferedJobs} />
		<Route path={`${match.url}/visited-jobs`} component={Visitedjobs} />
		<Route path={`${match.url}/archived-jobs`} component={Archivedjobs} />
		<Route path={`${match.url}/jobs-dashboard`} component={JobsDashboard} />
		<Route path={`${match.url}/jobs`} component={Managedjobs} />
		<Route path={`${match.url}/manage-resumes`} component={ManageResumes} />
		<Route path={`${match.url}/shortlist-candidates`} component={ShortlistCandidate} />
		{/* <Route path={`${match.url}/interview-questions`} component={Interviewquestion} /> */}
		<Route path={`${match.url}/job-details`} component={jobdetails} />
		<Route path={`${match.url}/job-applicants/:jobId`} component={AppliedCandidate} />
		<Route path={`${match.url}/offer_approvals`} component={Offerapproval} />
		{/* <Route path={`${match.url}/experiance-level`} component={Experiencelevel} /> */}
		<Route path={`${match.url}/candidates`} component={CandidateList} />
		{/* <Route path={`${match.url}/schedule-timing`} component={ScheduleTimings} /> */}
		{/* <Route path={`${match.url}/apptitude-result`} component={AptituedeResults} /> */}
		<Route path={`${match.url}/job-aptitude`} component={Jobapptitude} />
		<Route path={`${match.url}/questions`} component={Questions} />
		<Route path={`${match.url}/members`} component={Members} />
		<Route path={`${match.url}/nominee`} component={Nominee} />
		<Route path={`${match.url}/unit`} component={Unit} />
		<Route path={`${match.url}/floor`} component={Floor} />
		<Route path={`${match.url}/unitType`} component={UnitType} />
		<Route path={`${match.url}/category`} component={Category} />
		<Route path={`${match.url}/block`} component={Block} />
		<Route path={`${match.url}/paymentMode`} component={PaymentMode} />
		<Route path={`${match.url}/installmentType`} component={InstallmentType} />
		<Route path={`${match.url}/plot`} component={PlotSize} />
		<Route path={`${match.url}/NdcCharges`} component={NdcCharges} />
		<Route path={`${match.url}/paymentPlan`} component={PaymentPlan} />
		<Route path={`${match.url}/phase`} component={Phase} />
		<Route path={`${match.url}/sector`} component={Sector} />
		<Route path={`${match.url}/unitNatureType`} component={UnitNatureType} />
		<Route path={`${match.url}/transaction`} component={Transaction} />
		<Route path={`${match.url}/report`} component={Report} />
		<Route path={`${match.url}/ndcfee`} component={Ndcfee} />
		<Route path={`${match.url}/partnerndcfee`} component={PartnerNdcfee} />
		<Route path={`${match.url}/unverifiedtransaction`} component={InverifiedTransaction} />
		{/*<Route path={`${match.url}/fileCollect`} component={FileCollect}/>*/}
		<Route path={`${match.url}/fileSubmission`} component={FileSubmission} />
		<Route path={`${match.url}/partnerfileSubmission`} component={PartnerFileSubmission} />
		<Route path={`${match.url}/street`} component={Street} />
		<Route path={`${match.url}/create-transaction`} component={CreateTransaction} />
		<Route path={`${match.url}/transfer`} component={Transfer} />
		<Route path={`${match.url}/categoryTransfer`} component={CategoryTransfer} />
		<Route path={`${match.url}/restoration`} component={Restorationfee} />
	</Switch>
);

export default Uiinterfaceroute;
