import { useRoutes } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      {useRoutes(router)}
    </div>
  );
}

export default App;
