// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import NotFound from "./Pages/NotFound";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import HomeLayout from "./Layouts/HomeLayout";
// import Demo from "./Pages/Demo/Demo";
// import PlayGround from "./Pages/PlayGround/PlayGround";

import Login from "./Pages/Login";

function App() {
  return (
    <>
      {/* <Routes>
        <Route exact path="/" element={<HomeLayout />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/playground" element={<PlayGround />} />
      </Routes> */}
      <Login />
    </>
  );
}

export default App;
