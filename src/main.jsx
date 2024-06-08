import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Context from "./context/Context.jsx";
import 'react-tagsinput/react-tagsinput.css'
import 'react-quill/dist/quill.bubble.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <App />
  </Context>
);
