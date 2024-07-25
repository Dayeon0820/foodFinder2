import Userinfo from "./components/userinfo";
import Mainpage from "./components/mainpage";
import Finder from "./components/finder";
import SumFood from "./components/sum";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Userinfo />}></Route>
          <Route path="/main" element={<Mainpage />}></Route>
          <Route path="/finder" element={<Finder />}></Route>
          <Route path="/sum" element={<SumFood />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
