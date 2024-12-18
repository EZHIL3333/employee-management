import React, { useState } from "react";
import axios from "axios";
import './employee.css'
const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "",
        dateOfJoining: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/add-employee", formData);
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="employeeId" placeholder="Employee ID" maxLength="10" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" maxLength="10" onChange={handleChange} required />
                <select name="department" onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input type="date" name="dateOfJoining" onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setFormData({})}>Reset</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEmployee;
