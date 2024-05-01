/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients';
import ClientsList from './clientslist';
import Leades from './leades';
import Tickets from './tickets';
import TicketView from './ticketview';
import Members from '../Administration/MemberManagement/Members';
import Nominee from '../Administration/MemberManagement/Nominee';
import Unit from '../Administration/InventoryManagement/Unit';
import Floor from '../Administration/InventoryManagement/Floor';
import UnitType from '../Administration/InventoryManagement/UnitType';
import Category from '../Administration/InventoryManagement/Category';
// import MembersList from './MembersList';

const EmployeeRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/clients`} component={Clients} />
      <Route path={`${match.url}/clients-list`} component={ClientsList} />
      <Route path={`${match.url}/leads`} component={Leades} />
      <Route path={`${match.url}/tickets`} component={Tickets} />
      <Route path={`${match.url}/ticket-view`} component={TicketView} />
      {/* <Route path={`${match.url}/members-list`} component={MembersList} /> */}
   </Switch>
);

export default EmployeeRoute;
