import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5161/api/User/get-users");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5161/api/User/add-user", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("http://localhost:5161/api/User/get-users");
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

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <button onClick={toggleTable}>{showTable ? 'Hide Table' : 'Show Table'}</button>
            <button onClick={toggleForm}>{showForm ? 'Hide Form' : 'Show Form'}</button>

            {showTable && (
                <div>
                    {error && <div>Error: {error}</div>}
                    <h2>User List</h2>
                    <table className="w-100">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
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
                            <td>{user.role}</td>
                            <td><button>Update</button></td>
                            <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )}

            {showForm && (
                <div>
                    <h2>Add New User</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields */}
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserTable;