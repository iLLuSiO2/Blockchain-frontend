import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form"; // Import your Form component or other components

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>My Blockchain App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Form />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
