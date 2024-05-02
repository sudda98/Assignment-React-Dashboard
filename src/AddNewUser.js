import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function AddNewUser() {
  const navigate = useNavigate();

  const addUser = async (firstName, lastName, email, role) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: "12345",
        userType: "ADMIN"
      });
      console.log("User added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'User',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(userData.firstName, userData.lastName, userData.email, userData.role);
  };

  const handleCancel = () => {
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'User',
    });
    setShowForm(false);
    navigate('/dashboard'); 
  };

  return (
    <div>
      <div className="popup-form">
        <h3>{userData.id ? 'Update User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{userData.id ? 'Update' : 'Save'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewUser;
