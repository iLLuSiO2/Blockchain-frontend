import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App"; // Import your main App component

const root = createRoot(document.getElementById("root"));
root.render(<App />);
