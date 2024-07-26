import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SignatureTable from "../../component/SignatureTable";
import { getAccountSignatures } from "../../Redux/Registration/thunk";
import Layout from "../../Layout";
const Signature = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountSignatures());
  }, [dispatch]);
  return (
    <Layout>
      <SignatureTable />
    </Layout>
  );
};

export default Signature;
