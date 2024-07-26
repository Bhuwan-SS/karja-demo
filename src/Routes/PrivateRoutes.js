import React from "react";
import { Route, Switch } from "react-router-dom";
import Error from "../Pages/Error";
import CreateAccountForm from "../Pages/Account/CreateAccountForm";

const PrivateRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={CreateAccountForm} />
        <Route path="*" component={Error} />
      </Switch>
    </>
  );
};

export default PrivateRoutes;
