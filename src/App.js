import "./css/style.css";
import "./css/responsive.css";
import "./css/custom.css";
import "./css/font-awesome.css";
import "./css/line-awesome.min.css";
import "./css/animate.min.css";
import "./css/dropify.css";
import "./css/dropify.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "dropify/dist/js/dropify.min.js";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import PrivateRoutes from "./Routes/PrivateRoutes";

function App() {
  return (
    <>
      <PrivateRoutes />
    </>
  );
}

export default App;
