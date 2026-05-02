import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/pages/Login";
import Orders from "../src/pages/Orders";
import CreateOrder from "../src/pages/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/create-order" element={<CreateOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;