import React, { useEffect, useState } from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserCreationPage = () => {
  const [users, setUsers] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get("http://localhost:8080/api/v1/users", config);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to get users:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    
      await axios.delete(`http://localhost:8080/api/v1/users/user-id/${id}`, config);
      getAllUsers(); 
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (user) => {
    setUpdateFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
    setSelectedUserId(user.id);
    setShowUpdateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
    setSelectedUserId(null);
    setUpdateFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    });
  };

  const handleSaveUpdate = async (userId) => {
    try {
      if (!updateFormData.firstName || !updateFormData.lastName || !updateFormData.email || !updateFormData.role) {
        console.error("Please fill in all fields.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://localhost:8080/api/v1/users/user-id/${userId}`, updateFormData, config);
      
      getAllUsers();
      
      console.log("User updated successfully:", response.data);
      
      setShowUpdateForm(false);
      setSelectedUserId(null);
      setUpdateFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="user-creation-page">
      <h2>User Creation Page</h2>
      <Link to="/AddNewUser">
        <button>Add User</button>
      </Link>

      <div className="user-list">
        <h3>User List</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 && users.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleUpdate(user)}>Update</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
                {showUpdateForm && selectedUserId === user.id && (
                  <tr>
                    <td colSpan="6">
                      <form onSubmit={() => handleSaveUpdate(user.id)}>
                        <label>
                          First Name:
                          <input type="text" name="firstName" value={updateFormData.firstName} onChange={handleInputChange} />
                        </label>
                        <label>
                          Last Name:
                          <input type="text" name="lastName" value={updateFormData.lastName} onChange={handleInputChange} />
                        </label>
                        <label>
                          Email:
                          <input type="email" name="email" value={updateFormData.email} onChange={handleInputChange} />
                        </label>
                        <label>
                          Role:
                          <input type="text" name="role" value={updateFormData.role} onChange={handleInputChange} />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancelUpdate}>Cancel</button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCreationPage;
