import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
