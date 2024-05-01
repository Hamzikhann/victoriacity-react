/**
 * Crm Routes
 */
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Admindashboard from "./admindashboard";
import Employeedashboard from "./employeedashboard";
import CollectorDashboard from "./collectordashboard";
import AccountsDashboard from "./accountsdashboard";
import CashierDashboard from "./cashierdashboard";
import ColonelDashboard from "./coloneldashboard";
import partnerdashboard from "./partnerdashboard";
import AccountDashboard from "./accountdashboard";


const DashboardRoute = ({ match }) => {
  const [userRole, setuserRole] = useState();

  useEffect(() => {
    setTimeout(() => {
      const user = localStorage.getItem("user");
      const user1 = JSON.parse(user);
      setuserRole(user1?.role);
    }, 1000);
  }, []);
  return (
    <>
      {userRole && userRole != "HR" && (
        <Switch>
          <Redirect
            exact
            from={`${match.url}/`}
            to={`${match.url}/dashboard`}
          />
          <Route path={`${match.url}/dashboard`} component={Admindashboard} />
          <Route
            path={`${match.url}/employee-dashboard`}
            component={Employeedashboard}
          />
          <Route
              path={`${match.url}/collector-dashboard`}
              component={CollectorDashboard}
          />
          <Route
              path={`${match.url}/accounts-dashboard`}
              component={AccountsDashboard}
          />
           <Route
              path={`${match.url}/account-dashboard`}
              component={AccountDashboard}
          />
          <Route
              path={`${match.url}/cashier-dashboard`}
              component={CashierDashboard}
          />
           <Route
              path={`${match.url}/colonel-dashboard`}
              component={ColonelDashboard}
          />
          <Route
              path={`${match.url}/partner-dashboard`}
              component={partnerdashboard}
          />
        </Switch>
      )}
    </>
  );
};

export default DashboardRoute;
