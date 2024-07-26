import { useEffect } from "react";
import StatementTable from "../../component/StatementTable";
import { useDispatch } from "react-redux";
import { getStatements } from "../../Redux/Registration/thunk";
import Layout from "../../Layout";
export default function Statement() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatements());
  }, [dispatch]);
  return (
    <>
      <Layout>
        <StatementTable />
      </Layout>
    </>
  );
}
