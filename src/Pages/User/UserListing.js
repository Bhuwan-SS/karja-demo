import { useEffect } from "react";
import UserTable from "../../component/UserTable";
import { useDispatch } from "react-redux";
import { getUsers } from "../../Redux/User/thunk";
import Layout from "../../Layout";
export default function UserListing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <Layout>
        <UserTable />
      </Layout>
    </>
  );
}
