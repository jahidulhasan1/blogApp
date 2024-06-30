import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/Home/Home";
import HomeHeader from "./components/Home/Header/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
import { useBlogContext } from "./context/Context";
import { Slide, ToastContainer } from "react-toastify";
import Profile from "./components/Home/profile/Profile";
import Write from "./components/Home/write/Write";
import SinglePost from "./components/common/posts/SinglePost";
import EditPost from "./components/common/posts/actions/EditPost";

function App() {
  const { currentUser } = useBlogContext();
  return (
    <BrowserRouter>
      {currentUser ? <HomeHeader /> : <DemoHeader />}

      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}
        <Route path="/profile/:userId" element={<Profile />} />

        <Route path="/write" element={<Write />} />

        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
      <ToastContainer transition={Slide} />
    </BrowserRouter>
  );
}

export default App;
