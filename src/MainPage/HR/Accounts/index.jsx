
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Category from './category';
import Budget from './budget';
import BudgetExpense from './budgetexpense';
import BudgetRevenus from './budgetrevenus';
import SubCategory from './subcategory';
import AccountTransactions from './incometransactions';
import AccountSettings from './accountsettings';
import employeesalaryhistory from './employeesalaryhistory';
import IncomeCategory from './incomecategory';
import ExpenseCategory from './expensecategory';
import AccountProject from './accountsproject';
import IncomeTransactions from './incometransactions';
import ExpenseTransactions from './expensetransactions';
import Liability from './liability';
import LiabilityPartner from './liabilitypartner';
import Withdrawal from './withdrawal';
import WithdrawalPartner from './withdrawpartner';



const AccountsRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/categories`} />
      <Route path={`${match.url}/categories`} component={Category} />
      <Route path={`${match.url}/accountproject`} component={AccountProject} />
      <Route path={`${match.url}/incomecategory/:id`} component={IncomeCategory} />
      <Route path={`${match.url}/incomecategory`} component={AccountProject} />
      <Route path={`${match.url}/expensecategory/:id`} component={ExpenseCategory} />
      <Route path={`${match.url}/expensecategory`} component={AccountProject} />
      <Route path={`${match.url}/sub-category`} component={SubCategory} />
      <Route path={`${match.url}/budgets`} component={Budget} />
      <Route path={`${match.url}/income-transactions/:id`} component={IncomeTransactions} />
      <Route path={`${match.url}/income-transactions`} component={AccountProject} />
      <Route path={`${match.url}/expense-transactions/:id`} component={ExpenseTransactions} />
      <Route path={`${match.url}/expense-transactions`} component={AccountProject} />
      <Route path={`${match.url}/employee-salary`} component={employeesalaryhistory} />
      <Route path={`${match.url}/account-settings`} component={AccountSettings} />
      <Route path={`${match.url}/liability`} component={Liability} />
      <Route path={`${match.url}/liabilitypartner`} component={LiabilityPartner} />
      <Route path={`${match.url}/withdrawalpartner`} component={WithdrawalPartner} />
      <Route path={`${match.url}/withdrawal`} component={Withdrawal} />
      <Route path={`${match.url}/budget-expenses`} component={BudgetExpense} />
      <Route path={`${match.url}/budget-revenues`} component={BudgetRevenus} />
   </Switch>
);

export default AccountsRoute;
