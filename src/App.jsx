import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/Home/Home";
import HomeHeader from "./components/Home/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
function App() {
  const auth = false;
  return (
    <BrowserRouter>
      {auth ? <HomeHeader /> : <DemoHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
