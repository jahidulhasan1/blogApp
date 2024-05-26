import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/Home/Home";
import HomeHeader from "./components/Home/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
import { useBlogContext } from "./context/Context";
function App() {
  const  {currentUser}  = useBlogContext()
  return (
    <BrowserRouter>
      {currentUser ? <HomeHeader /> : <DemoHeader />}

      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}

        <Route path="*" element= {<Navigate to={!currentUser ? "demo" : "/"} />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
