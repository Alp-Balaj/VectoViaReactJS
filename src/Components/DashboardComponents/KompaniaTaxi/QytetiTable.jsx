import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Modal } from '@mui/material';
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

const QytetiTable = () => {
    const [open, setOpen] = useState(false);
    const [deleteQytetiID, setDeleteQytetiID] = useState(null);

    const [qytetet, setQytetet] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentQyteti, setCurrentQyteti] = useState(null);

    const handleUpdateClick = (qyteti) => {

        setIsUpdating(true);
        setCurrentQyteti(qyteti);
        setShowForm(false); 
        setShowTable(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
                setQytetet(response.data);
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

    const deleteQyteti = async (qytetiID) => {
        try {
            await axios.delete(`https://localhost:7081/api/Qyteti/delete-Qyteti-by-id/${qytetiID}`);
            setQytetet(qytetet.filter(qyteti => qyteti.qytetiId !== qytetiID));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7081/api/Qyteti/add-qyteti", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
            setQytetet(response.data);
            setShowTable(true);
            setShowForm(false);
            // Clear form data after successful submission
            setFormData({
                name: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setError(error.message || 'Error adding user');
        }
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/Qyteti/update-user-by-id/${currentQyteti.qytetiId}`, currentQyteti);
            const updatedQytetet = qytetet.map(qyteti => qyteti.qytetiId === currentQyteti.qytetiId ? currentQyteti : qyteti);
            setQytetet(updatedQytetet);
            setIsUpdating(false);
            setShowTable(true);
            setCurrentQyteti(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message || 'Error updating user');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentQyteti(prev => ({
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

    const youSure = (qytetiID) => {
        setOpen(true);
        setDeleteQytetiID(qytetiID);
    };

    return (
        <Root>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <Box>
                    <h2>Are you sure you want to <span style={{color: 'red'}}>delete</span> this Qytet?</h2>
                    <p>This action cannot be undone.</p>
                    <Buttons>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button onClick={deleteQyteti}>Delete</Button>
                    </Buttons>
                </Box>
            </Modal>
            {showTable && (
                <div>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{textAlign: 'center'}}>Qyteti List</h2>
                    <FancyTable>
                        <thead>
                            <tr>
                                <th>QytetiID</th>
                                <th>Emri i Qytetit</th>
                                <th>Actions<AddIcon style={{ cursor: 'pointer'}} onClick={toggleForm}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {qytetet.map(qyteti => (
                                <tr key={qyteti.qytetiId}>
                                    <td>{qyteti.qytetiId}</td>
                                    <td>{qyteti.name}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(qyteti)}>Update</Button>
                                        <Button onClick={() => youSure(qyteti.qytetiId)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </div>
            )}

            {isUpdating && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
                    <h2>Update Qyteti</h2>
                    <form onSubmit={handleUpdateRole}>
                        <label>
                            Name:
                            <input type="text" name="name" value={currentQyteti.name} onChange={handleUpdateChange} />
                        </label>
                        <Button type="submit">Update Qyteti</Button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
                    <h2>Add New Qyteti</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <Button type="submit">Add Qyteti</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default QytetiTable;

