import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { verifyTokenThunk } from "./features/auth/authSlice";
import router from "./routes/router";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("access_token");
  const { loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (token) {
      console.log(loading);
      dispatch(verifyTokenThunk());
    }
  }, [token, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
