import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import HolidayList from "./components/HolidayList"; 
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />

        
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

        
        <Route path="/holidays" element={<HolidayList />} />
        
      </Routes>
    </Router>
  );
}

export default App;
