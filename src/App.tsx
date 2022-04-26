import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Homepage } from "./pages/homepage/Homepage";
import { fetchCurrencies } from "./redux/features/currencies/currenciesSlice";
import { useAppDispatch } from "./redux/hooks";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  return (
    <div>
      <ToastContainer />
      <Homepage />
    </div>
  );
};
