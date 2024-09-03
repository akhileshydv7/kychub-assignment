import { Provider } from "react-redux";
import appStore from "./assets/redux/appStore.tsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompareProducts from "./pages/CompareProducts.tsx";
import AppLayout from "./components/AppLayout.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<ProductDetails />} />
            <Route path="compare" element={<CompareProducts />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;