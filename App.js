import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppProduct from "./src/components/AppProduct";

export default function App() {
  return (
    <Provider store={store}>
      <AppProduct />
    </Provider>
  );
}
