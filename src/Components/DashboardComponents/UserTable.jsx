import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Root = styled.div`
    border-left: 3px solid yellow;
    background-color: black;
    color: white;
    height: calc( 100vh - 90px);
`;

const AddUsers = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    color: white;
    form{
        display: flex;
        flex-direction: column;
        width: 300px;
        label{
            display: flex;
            flex-direction: column;
        }
        button{
            margin-top: 20px;
        }
    }
`;

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        emri: '',
        mbiemri: '',
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const handleUpdateClick = (user) => {
        setIsUpdating(true);
        setCurrentUser(user);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5108/api/User/get-users");
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'Error fetching data');
            }
        };

        if (showTable) {
            fetchData();
        }
    }, [showTable]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const deleteUser = async (userID) => {
        try {
            await axios.delete(`http://localhost:5108/api/User/delete-user-by-id/${userID}`);
            setUsers(users.filter(user => user.id !== userID));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5108/api/User/add-user", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("http://localhost:5108/api/User/get-users");
            setUsers(response.data);
            // Clear form data after successful submission
            setFormData({
                emri: '',
                mbiemri: '',
                username: '',
                email: '',
                password: '',
                role: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setError(error.message || 'Error adding user');
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5108/api/User/update-user-by-id/${currentUser.id}`, currentUser);
            const updatedUsers = users.map(user => user.id === currentUser.id ? currentUser : user);
            setUsers(updatedUsers);
            setIsUpdating(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message || 'Error updating user');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setShowForm(false); // Hide the form when showing the table
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false); // Hide the table when showing the form
    };
    return (
        <Root>
            <button onClick={toggleTable}>{showTable ? 'Hide Users' : 'Show Users'}</button>
            <button onClick={toggleForm}>{showForm ? 'Hide Add Users' : 'Add Users'}</button>

            {showTable && (
                <div>
                    {error && <div>Error: {error}</div>}
                    <h2>User List</h2>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.emri}</td>
                                    <td>{user.mbiemri}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(user)}>Update</button>
                                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isUpdating && (
                <AddUsers>
                    <h2>Update User</h2>
                    <form onSubmit={handleUpdateUser}>
                        <label>
                            First Name:
                            <input type="text" name="emri" value={currentUser.emri} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="mbiemri" value={currentUser.mbiemri} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Username:
                            <input type="text" name="username" value={currentUser.username} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={currentUser.email} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" value={currentUser.password} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Role:
                            <input type="text" name="role" value={currentUser.role} onChange={handleUpdateChange} />
                        </label>
                        <button type="submit">Update User</button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <h2>Add New User</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            First Name:
                            <input type="text" name="emri" value={formData.emri} onChange={handleChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="mbiemri" value={formData.mbiemri} onChange={handleChange} />
                        </label>
                        <label>
                            Username:
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </label>
                        <label>
                            Role:
                            <input type="text" name="role" value={formData.role} onChange={handleChange} />
                        </label>
                        <button type="submit">Add User</button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default UserTable;

