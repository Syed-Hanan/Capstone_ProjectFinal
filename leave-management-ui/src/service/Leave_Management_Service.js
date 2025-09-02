import axios from "axios";

const BASE_URI      = "http://localhost:8383/leavemanagement";
const EMPLOYEE_URI  = `${BASE_URI}/employees`;
const HOLIDAY_URI   = `${BASE_URI}/holidays`;
const LEAVE_URI     = `${BASE_URI}/leaves`;

function Leave_Management_Service() {
    
    const addEmployee = (employee) => axios.post(`${EMPLOYEE_URI}/add`, employee);
    const getEmployeeById = (id) => axios.get(`${EMPLOYEE_URI}/${id}`);
    const getAllEmployees = () => axios.get(EMPLOYEE_URI);

   
    const getEmployeesByManager = (managerId) => axios.get(`${EMPLOYEE_URI}/manager/${managerId}`);

   
    const addHoliday = (holiday) => axios.post(HOLIDAY_URI, holiday);
    const getHolidays = () => axios.get(HOLIDAY_URI);

   
    const applyLeave = (leaveRequest) => axios.post(`${LEAVE_URI}/apply`, leaveRequest);
    const viewLeaveHistory = (empId) => axios.get(`${LEAVE_URI}/history/${empId}`);
    const withdrawLeave = (leaveId, empId) =>
        axios.put(`${LEAVE_URI}/withdraw/${leaveId}?empId=${empId}`);
    const cancelLeave = (leaveId, empId) =>
        axios.put(`${LEAVE_URI}/cancel/${leaveId}?empId=${empId}`);
    const approveLeave = (leaveId, managerId, remarks) =>
        axios.put(`${LEAVE_URI}/approve/${leaveId}?managerId=${managerId}&remarks=${remarks}`);
    const rejectLeave = (leaveId, managerId, remarks) =>
        axios.put(`${LEAVE_URI}/reject/${leaveId}?managerId=${managerId}&remarks=${remarks}`);
    const getManagerLeaves = (managerId) => axios.get(`${LEAVE_URI}/manager/${managerId}`);

    return Object.freeze({
        addEmployee,
        getEmployeeById,
        getAllEmployees,
        getEmployeesByManager,   
        addHoliday,
        getHolidays,
        applyLeave,
        viewLeaveHistory,
        withdrawLeave,
        cancelLeave,
        approveLeave,
        rejectLeave,
        getManagerLeaves
    });
}

export default Leave_Management_Service;
