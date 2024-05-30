import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';


const Box = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
`

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
            padding: 15px 10px;
        } 
    }
`;

const AddButton = styled.div`
    width: 25px;
    height: 25px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:  15px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #909397;
`


const UserTable = () => {
    const [open, setOpen] = useState(false);
    const [deleteUserID, setDeleteUserID] = useState(null);

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(true);
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
    
    
    const handleUpdateClick = async (user) => {
        setIsUpdating(true);
        setCurrentUser(user);
        setShowTable(false);
        setShowForm(false); // Show the form for updating
        try {
            const Roleresponse = await axios.get("https://localhost:7081/api/Role/get-role");
            setRoles(Roleresponse.data);
            console.log(Roleresponse.data);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/User/get-users");
                const usersWithRoles = await Promise.all(response.data.map(async user => {
                    const roleResponse = await axios.get(`https://localhost:7081/api/Role/get-role-id/${user.roleID}`);
                    console.log(roleResponse);
                    return { ...user, roleName: roleResponse.data.llojiIRolit };
                }));
                setUsers(usersWithRoles);
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

    const deleteUser = async () => {
        try {
            await axios.delete(`https://localhost:7081/api/User/delete-user-by-id/${deleteUserID}`);
            setUsers(users.filter(user => user.id !== deleteUserID));
            setOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post("https://localhost:7081/api/User/add-user", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("https://localhost:7081/api/User/get-users");
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
            setShowForm(false);
            setShowTable(true);
        } catch (error) {
            console.error('Error adding user:', error);
            setError(error.message || 'Error adding user');
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/User/update-user-by-id/${currentUser.id}`, currentUser);
            const updatedUsers = users.map(user => user.id === currentUser.id ? currentUser : user);
            setUsers(updatedUsers);
            setIsUpdating(false);
            setCurrentUser(null);
            setShowTable(true);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message || 'Error updating user');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: name === "roleID" ? parseInt(value, 10) : value
        }));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setIsUpdating(false);
        setShowForm(false); // Hide the form when showing the table
    };

    const youSure = (userID) => {
        setOpen(true);
        setDeleteUserID(userID);
    };

    const toggleForm = async () => {
    setShowTable(false); // Hide the table when showing the form
    setShowForm(!showForm);
    setIsUpdating(false);
    if (!showForm) { // Fetch roles only if the form is about to be shown
        try {
            const Roleresponse = await axios.get("https://localhost:7081/api/Role/get-role");
            setRoles(Roleresponse.data);
            console.log(Roleresponse.data);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    }
};
    return (
        <Root>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <Box>
                    <h2>Are you sure you want to <span style={{color: 'red'}}>delete</span> this user?</h2>
                    <p>This action cannot be undone.</p>
                    <Buttons>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button onClick={deleteUser}>Delete</Button>
                    </Buttons>
                </Box>
            </Modal>
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
                                <th style={{display:"flex",justifyContent:"space-between"}}>Actions<AddIcon style={{ cursor: 'pointer' }} onClick={toggleForm}/></th>
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
                                    <td>{user.roleName}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(user)}>Update</Button>
                                        <Button onClick={() => youSure(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </>
            )}

            {isUpdating && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
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
                            <select name="roleID" value={currentUser.roleID} onChange={handleUpdateChange}>
                                {roles.map(role => (
                                    <option key={role.roleID} value={role.roleID}>
                                        {role.llojiIRolit}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Button type="submit">Update User</Button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
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
                            <select name="roleID" value={formData.roleID} onChange={handleChange}>
                                {roles.map(role => (
                                    <option key={role.roleID} value={role.roleID}>
                                        {role.llojiIRolit}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Button type="submit">Add User</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default UserTable;

