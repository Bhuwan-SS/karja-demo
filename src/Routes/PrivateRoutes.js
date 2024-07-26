import React from "react";
import { Route, Switch } from "react-router-dom";
import Applications from "../Pages/Applications";
import User from "../Pages/User";
import Statement from "../Pages/Statement";
import Cheque from "../Pages/Cheque";
import UserListing from "../Pages/User/UserListing";
import Signature from "../Pages/Signature";
import Error from "../Pages/Error";
import ProtectedRoute from "./ProtectedRoutes";
import SidebarEdit from "../component/Sidebar/SidebarEdit";
import BimCapture from "../component/Sidebar/BimCapture";
import Landing from "../Pages/Home/Landing";
import Gsv from "../Pages/GSV";
import Verify from "../Pages/GSV/Verify";
import CreateAccount from "../Pages/Account/CreateAccount";
import CreateAccountForm from "../Pages/Account/CreateAccountForm";
import Accounts from "../Pages/Account/Accounts";
import KYCUpdate from "../Pages/Account/KYCUpdate";
import VideoKYC from "../Pages/Account/VideoKYC";
import ChequeRequest from "../Pages/ChequeRequest";
import StatementRequest from "../Pages/StatementRequest";
const PrivateRoutes = () => {
  return (
    <>
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/" component={CreateAccountForm} />
        {/* <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/kyc-update" component={KYCUpdate} />
        <Route exact path="/video-kyc" component={VideoKYC} />
        <Route exact path="/gsv" component={Gsv} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/create-user" component={BimCapture} />
        <Route exact path="/cheque" component={Cheque} />
        <Route exact path="/cheque-request" component={ChequeRequest} />
        <Route exact path="/statement-request" component={StatementRequest} />
        <Route exact path="/statement" component={Statement} />
        <Route exact path="/user" component={UserListing} />
        <Route exact path="/signature" component={Signature} /> */}
        <Route path="*" component={Error} />
      </Switch>
    </>
  );
};

export default PrivateRoutes;
