import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoList from "./components/TodoList";
import '@fortawesome/fontawesome-free/js/all.js';
import "./scss/all.css"


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
