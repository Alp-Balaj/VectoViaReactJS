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

const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
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

    const deleteRole = async (roleID) => {
        try {
            await axios.delete(`https://localhost:7081/api/Role/delete-role-by-id/${roleID}`);
            setRoles(roles.filter(role => role.id !== roleID));
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
            await axios.put(`https://localhost:7081/api/Role/update-role-by-id/${currentRole.id}`, currentRole);
            const updatedRoles = roles.map(role => role.id === currentRole.id ? currentRole : role);
            setRoles(updatedRoles);
            setIsUpdating(false);
            setCurrentRole(null);
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
        setShowForm(false); // Hide the form when showing the table
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false); // Hide the table when showing the form
    };
    return (
        <Root>
            <button onClick={toggleTable}>{showTable ? 'Hide Roles' : 'Show Roles'}</button>
            <button onClick={toggleForm}>{showForm ? 'Hide Add Roles' : 'Add Roles'}</button>

            {showTable && (
                <div>
                    {error && <div>Error: {error}</div>}
                    <h2>User List</h2>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>RoleID</th>
                                <th>Lloji i Rolit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.roleID}</td>
                                    <td>{role.llojiIRolit}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(role)}>Update</button>
                                        <button onClick={() => deleteRole(role.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        <button type="submit">Update Role</button>
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
                        <button type="submit">Add Role</button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default RoleTable;

