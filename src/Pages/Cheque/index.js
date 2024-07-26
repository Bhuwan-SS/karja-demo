import { useEffect } from "react";
import ChequeTable from "../../component/ChequeTable";
import { useDispatch } from "react-redux";
import { getCheques } from "../../Redux/Registration/thunk";
import Layout from "../../Layout";

export default function Cheque() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheques());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <ChequeTable />
        hello
      </Layout>
    </>
  );
}
