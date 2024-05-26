import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Root = styled.div`
    background-color: white;
    height: 100%;
    overflow-y: auto;
`;

const AddUsers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #343a40;
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        label {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
        }
        button {
            margin-top: 20px;
        }
    }
`;


const Button = styled.button`
    background-color: #2c3036;
    color: #ffc107;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #ffc107;
        color: #343a40;
    }
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FancyTable = styled.table`
    overflow-y: auto;
    margin: auto;
    border-collapse: collapse;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    th{
        background-color: #2c3036; 
        color: #ffc107; 
        padding: 15px;
        td{
            color: black;
            padding: 15px 10px; /* Increased vertical padding and kept horizontal padding */
            transition: background-color 0.3s; /* Add transition effect */
        } 
    }
`;

const Window = styled.div`
    height: 820px;
    overflow-y: auto;
`

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
        setShowTable(false);
        setShowForm(false);
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
        setIsUpdating(false);
        setShowForm(false); // Hide the form when showing the table
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setIsUpdating(false);
        setShowTable(false); // Hide the table when showing the form
    };
    return (
        <Root>
            <Buttons>
                <Button onClick={toggleTable}>{showTable ? 'Hide Users' : 'Show Users'}</Button>
                <Button onClick={toggleForm}>{showForm ? 'Hide Add Users' : 'Add Users'}</Button>
            </Buttons>
            {showTable && (
                <>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{textAlign: 'center'}}>User List</h2>
                    <FancyTable>
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
                                    <td>{user.roleID    }</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(user)}>Update</Button>
                                        <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </>
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
                            <input type="text" name="role" value={currentUser.roleID} onChange={handleUpdateChange} />
                        </label>
                        <Button type="submit">Update User</Button>
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
                            <input type="text" name="role" value={formData.roleID} onChange={handleChange} />
                        </label>
                        <Button type="submit">Add User</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default UserTable;

