import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "../../pages";
import Layout from "../layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
