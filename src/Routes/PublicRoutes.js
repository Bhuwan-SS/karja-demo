import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../Pages/Home/Landing";
import Account from "../Pages/Account";
import AccountCreated from "../Pages/Account/AccountCreated";
import Error from "../Pages/Error";
import Khata from "../Pages/Khata";
import Gsv from "../Pages/GSV";
import Verify from "../Pages/GSV/Verify";
import SignatureExtraction from "../Pages/GSV/SignatureExtraction";
const PublicRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/create-account" component={Account} />
        <Route exact path="/account-info" component={Khata} />
        <Route exact path="/success" component={AccountCreated} />
        <Route exact path="/gsv" component={Gsv} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/extraction" component={SignatureExtraction} />
        <Route exact component={Error} />
      </Switch>
    </>
  );
};

export default PublicRoutes;
