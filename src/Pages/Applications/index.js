import { useEffect} from "react";
import Table from "../../component/Table";
import { useDispatch } from "react-redux";
import { getApplications } from "../../Redux/Registration/thunk";
import Layout from "../../Layout";
export default function Applications() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);
  return (
    <>
      <Layout >
        <Table />
      </Layout>
    </>
  );
}
