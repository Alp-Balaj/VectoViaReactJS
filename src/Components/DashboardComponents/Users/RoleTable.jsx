import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Modal } from '@mui/material';

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
        text-align: center; 
        color: #ffc107; 
        padding: 15px;
        td{
            color: black;
            padding: 15px 10px; /* Increased vertical padding and kept horizontal padding */
            transition: background-color 0.3s; /* Add transition effect */
        } 
    }
`;

const RoleTable = () => {
    const [open, setOpen] = useState(false);
    const [deleteRoleID, setDeleteRoleID] = useState(null);
    
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        roleID: '',
        llojiIRolit: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);

    const handleUpdateClick = (role) => {
        setIsUpdating(true);
        setCurrentRole(role);
        setShowForm(false); 
        setShowTable(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/Role/get-role");
                setRoles(response.data);
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

    const deleteRole = async () => {
        try {
            await axios.delete(`https://localhost:7081/api/Role/delete-role-by-id/${deleteRoleID}`);
            setRoles(roles.filter(role => role.roleID !== deleteRoleID));
            setOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7081/api/Role/add-role", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("https://localhost:7081/api/Role/get-role");
            setRoles(response.data);
            setShowTable(true);
            setShowForm(false);
            // Clear form data after successful submission
            setFormData({
                roleID: '',
                llojiIRolit: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setError(error.message || 'Error adding user');
        }
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/Role/update-role-by-id/${currentRole.roleID}`, currentRole);
            const updatedRoles = roles.map(role => role.roleID === currentRole.roleID ? currentRole : role);
            setRoles(updatedRoles);
            setIsUpdating(false);
            setCurrentRole(null);
            setShowTable(true);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message || 'Error updating user');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentRole(prev => ({
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

    const youSure = (roleID) => {
        setOpen(true);
        setDeleteRoleID(roleID);
    };

    return (
        <Root>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <Box>
                    <h2>Are you sure you want to <span style={{color: 'red'}}>delete</span> this role?</h2>
                    <p>This action cannot be undone.</p>
                    <Buttons>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button onClick={deleteRole}>Delete</Button>
                    </Buttons>
                </Box>
            </Modal>
            <Buttons>
                <Button onClick={toggleTable}>{showTable ? 'Hide Roles' : 'Show Roles'}</Button>
                <Button onClick={toggleForm}>{showForm ? 'Hide Add Roles' : 'Add Roles'}</Button>
            </Buttons>
            {showTable && (
                <div>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{textAlign: 'center'}}>Role List</h2>
                    <FancyTable>
                        <thead>
                            <tr>
                                <th>RoleID</th>
                                <th>Lloji i Rolit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.roleID}</td>
                                    <td>{role.llojiIRolit}</td>
                                    <td style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button onClick={() => handleUpdateClick(role)}>Update</Button>
                                        <Button onClick={() => youSure(role.roleID)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </div>
            )}

            {isUpdating && (
                <AddUsers>
                    <h2>Update Role</h2>
                    <form onSubmit={handleUpdateRole}>
                        <label>
                            RoleID:
                            <input type="text" name="roleID" value={currentRole.roleID} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Lloji i Rolit:
                            <input type="text" name="llojiIRolit" value={currentRole.llojiIRolit} onChange={handleUpdateChange} />
                        </label>
                        <Button type="submit">Update Role</Button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <h2>Add New Role</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            RoleID:
                            <input type="text" name="roleID" value={formData.roleID} onChange={handleChange} />
                        </label>
                        <label>
                            Lloji i Rolit:
                            <input type="text" name="llojiIRolit" value={formData.llojiIRolit} onChange={handleChange} />
                        </label>
                        <Button type="submit">Add Role</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default RoleTable;

