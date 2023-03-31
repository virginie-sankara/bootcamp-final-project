import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selection" element={<Form />} />
          <Route path="/:resultid" element={<Suggestion />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
