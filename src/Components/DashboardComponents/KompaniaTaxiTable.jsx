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

const KompaniaTaxiTable = () => {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        Kompania: '',
        Location: '',
        ContactInfo: '',
        Sigurimi: '',
        QytetiId: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const handleUpdateClick = (company) => {
        setIsUpdating(true);
        setCurrentCompany(company);
        setShowTable(false);
        setShowForm(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/User/get-users");
                setCompanies(response.data);
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

    const deleteCompanies = async (companyID) => {
        try {
            await axios.delete(`https://localhost:7081/api/User/delete-user-by-id/${companyID}`);
            setCompanies(companies.filter(company => company.CompanyID !== companyID));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7081/api/User/add-user", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("https://localhost:7081/api/User/get-users");
            setCompanies(response.data);
            // Clear form data after successful submission
            setFormData({
                Kompania: '',
                Location: '',
                ContactInfo: '',
                Sigurimi: '',
                QytetiId: ''
            });
        } catch (error) {
            console.error('Error adding company:', error);
            setError(error.message || 'Error adding company');
        }
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/User/update-user-by-id/${currentCompany.CompanyID}`, currentCompany);
            const updatedCompanies = companies.map(company => company.CompanyID === currentCompany.CompanyID ? currentCompany : company);
            setCompanies(updatedCompanies);
            setIsUpdating(false);
            setCurrentCompany(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message || 'Error updating user');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentCompany(prev => ({
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
                <Button onClick={toggleTable}>{showTable ? 'Hide Companies' : 'Show Companies'}</Button>
                <Button onClick={toggleForm}>{showForm ? 'Hide Add Companies' : 'Add Companies'}</Button>
            </Buttons>
            {showTable && (
                <>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{textAlign: 'center'}}>Kompanite Taxi List</h2>
                    <FancyTable>
                        <thead>
                            <tr>
                                <th>Company ID</th>
                                <th>Company Name</th>
                                <th>Location</th>
                                <th>Contact Info</th>
                                <th>Insurance</th>
                                <th>City ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.CompanyID}>
                                    <td>{company.CompanyID}</td>
                                    <td>{company.Kompania}</td>
                                    <td>{company.Location}</td>
                                    <td>{company.ContactInfo}</td>
                                    <td>{company.Sigurimi}</td>
                                    <td>{company.QytetiId}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(company)}>Update</Button>
                                        <Button onClick={() => deleteCompanies(company.CompanyID)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </>
            )}

            {isUpdating && (
                <AddUsers>
                    <h2>Update Company</h2>
                    <form onSubmit={handleUpdateCompany}>
                        <label>
                            Company Name:
                            <input type="text" name="Kompania" value={currentCompany.Kompania} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Location:
                            <input type="text" name="Location" value={currentCompany.Location} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            ContactInfo:
                            <input type="text" name="ContactInfo" value={currentCompany.ContactInfo} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Sigurimi:
                            <input type="text" name="Sigurimi" value={currentCompany.Sigurimi} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            QytetiId:
                            <input type="number" name="QytetiId" value={currentCompany.QytetiId} onChange={handleUpdateChange} />
                        </label>
                        <Button type="submit">Update Company</Button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <h2>Add New Company</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Kompania:
                            <input type="text" name="Kompania" value={formData.Kompania} onChange={handleChange} />
                        </label>
                        <label>
                            Location:
                            <input type="text" name="Location" value={formData.Location} onChange={handleChange} />
                        </label>
                        <label>
                            ContactInfo:
                            <input type="text" name="ContactInfo" value={formData.ContactInfo} onChange={handleChange} />
                        </label>
                        <label>
                            Sigurimi:
                            <input type="text" name="Sigurimi" value={formData.Sigurimi} onChange={handleChange} />
                        </label>
                        <label>
                            QytetiId:
                            <input type="number" name="QytetiId" value={formData.QytetiId} onChange={handleChange} />
                        </label>
                        <Button type="submit">Add Company</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default KompaniaTaxiTable;

