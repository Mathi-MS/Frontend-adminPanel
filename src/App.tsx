import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ReactQueryProvider } from "./Hooks/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./Routes/Routes";

function App() {
  return (
    <>
      <ToastContainer limit={2}/>
      <ReactQueryProvider>
        <RouterProvider router={routes} /> 
      </ReactQueryProvider>
    </>
  );
}

export default App;
