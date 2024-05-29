import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { ChromePicker  } from 'react-color';

const Box = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
`;

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
    th {
        background-color: #2c3036; 
        color: #ffc107; 
        padding: 15px;
    }
    td {
        color: black;
        padding: 15px 10px;
        transition: background-color 0.3s;
        img{
            width: 150px;
            height: 150px;
        }
    } 
`;

const CBox = styled.div`
    width: 25px;
    height: 25px;
    border: 1px solid black;
`

const KompaniaTaxiTable = () => {
    const [open, setOpen] = useState(false);
    const [deleteCompanyID, setDeleteCompanyID] = useState(null);

    const [companies, setCompanies] = useState([]);
    const [qytetet, setQytetet] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        kompania: '',
        imageUrl: '',
        primaryColour: '',
        secondaryColour: '',
        contactInfo: '',
        sigurimi: '',
        qyteti: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);

    const handleUpdateClick = async (company) => {
        setIsUpdating(true);
        setCurrentCompany(company);
        setShowTable(false);
        setShowForm(false);
        try {
            const QytetiResponse = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
            setQytetet(QytetiResponse.data);
            console.log(QytetiResponse.data);
        } catch (error) {
            console.error('Failed to fetch qytetet:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/KompaniaTaxis/get-kompaniteTaxi");
                const companiesWithQyteti = await Promise.all(response.data.map(async company => {
                    const qytetiResponse = await axios.get(`https://localhost:7081/api/Qyteti/get-qyteti-id/${company.qytetiId}`);
                    return { ...company, qytetiName: qytetiResponse.data.name };
                }));
                setCompanies(companiesWithQyteti);
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

    const deleteCompanies = async () => {
        try {
            await axios.delete(`https://localhost:7081/api/KompaniaTaxis/delete-kompaniaTaxi-by-id/${deleteCompanyID}`);
            setCompanies(companies.filter(company => company.companyID !== deleteCompanyID));
            setOpen(false);
        } catch (error) {
            console.error('Error deleting Kompanine:', error);
            setError(error.message || 'Error deleting Kompanine');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7081/api/KompaniaTaxis/add-KompaniaTaxi", formData);
            const response = await axios.get("https://localhost:7081/api/KompaniaTaxis/get-kompaniteTaxi");
            setCompanies(response.data);
            setFormData({
                kompania: '',
                imageUrl: '',
                primaryColour: '',
                secondaryColour: '',
                contactInfo: '',
                sigurimi: '',
                qyteti: ''
            });
            setShowTable(true);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding company:', error);
            setError(error.message || 'Error adding company');
        }
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/KompaniaTaxis/update-KompaniaTaxi-by-id/${currentCompany.companyID}`, currentCompany);
            const updatedCompanies = companies.map(company => company.companyID === currentCompany.companyID ? currentCompany : company);
            setCompanies(updatedCompanies);
            setIsUpdating(false);
            setCurrentCompany(null);
            setShowTable(true);
        } catch (error) {
            console.error('Error updating Kompanine:', error);
            setError(error.message || 'Error updating Kompanine');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentCompany(prev => ({
            ...prev,
            [name]: name === "roleID" ? parseInt(value, 10) : value
        }));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setIsUpdating(false);
        setShowForm(false); // Hide the form when showing the table
    };

    const youSure = (companyID) => {
        setOpen(true);
        setDeleteCompanyID(companyID);
    };

    const toggleForm = async () => {
        setShowForm(!showForm);
        setIsUpdating(false);
        setShowTable(false); // Hide the table when showing the form
        if (!showForm) { // Fetch qytetet only if the form is about to be shown
            try {
                const QytetiResponse = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
                setQytetet(QytetiResponse.data);
                console.log(QytetiResponse.data);
            } catch (error) {
                console.error('Failed to fetch qytetet:', error);
            }
        }
    };

    const handleOnChangePm = (color) => {
        handleUpdateChange({ target: { name: 'primaryColour', value: color.hex } });
    };

    const handleOnChangeSc = (color) => {
        handleUpdateChange({ target: { name: 'secondaryColour', value: color.hex } });
    };

    const handleChangePm = (color) => {
        handleChange({ target: { name: 'primaryColour', value: color.hex } });
    };

    const handleChangeSc = (color) => {
        handleChange({ target: { name: 'secondaryColour', value: color.hex } });
    };
    

    return (
        <Root>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box>
                    <h2>Are you sure you want to <span style={{ color: 'red' }}>delete</span> this company?</h2>
                    <p>This action cannot be undone.</p>
                    <Buttons>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={deleteCompanies}>Delete</Button>
                    </Buttons>
                </Box>
            </Modal>
            <Buttons>
                <Button onClick={toggleTable}>{showTable ? 'Hide Companies' : 'Show Companies'}</Button>
                <Button onClick={toggleForm}>{showForm ? 'Hide Add Companies' : 'Add Companies'}</Button>
            </Buttons>
            {showTable && (
                <>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{ textAlign: 'center' }}>Kompanite Taxi List</h2>
                    <FancyTable>
                        <thead>
                            <tr>
                                <th>Company ID</th>
                                <th>Company Image</th>
                                <th>Company Name</th>
                                <th>Primary Colour</th>
                                <th>Secondary Colour</th>
                                <th>Contact Info</th>
                                <th>Insurance</th>
                                <th>Qyteti</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.companyID}>
                                    <td>{company.companyID}</td>
                                    <td><img src={company.imageUrl} alt="" /></td>
                                    <td>{company.kompania}</td>
                                    <td><CBox style={{backgroundColor: company.primaryColour}}/>{company.primaryColour}</td>
                                    <td><CBox style={{backgroundColor: company.secondaryColour}}/>{company.primaryColour}</td>
                                    <td>{company.contactInfo}</td>
                                    <td>{company.sigurimi}</td>
                                    <td>{company.qytetiName}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(company)}>Update</Button>
                                        <Button onClick={() => youSure(company.companyID)}>Delete</Button>
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
                            <input type="text" name="kompania" value={currentCompany.kompania} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Company Image:
                            <input type="text" name="imageUrl" value={currentCompany.imageUrl} onChange={handleUpdateChange} />
                        </label>
                        <label style={{display:'flex',flexDirection:'row'}}>
                            Primary Colour:
                            <input type="color" id="color" name="primaryColour" value={currentCompany.primaryColour} onChange={(e) => handleOnChangePm({ hex: e.target.value })}/>
                        </label>
                        <label style={{display:'flex',flexDirection:'row'}}>
                            Secondary Colour:
                            <input type="color" id="color" name="secondaryColour" value={currentCompany.secondaryColour} onChange={(e) => handleOnChangeSc({ hex: e.target.value })}/>
                        </label>
                        <label>
                            Contact Info:
                            <input type="text" name="contactInfo" value={currentCompany.contactInfo} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Sigurimi:
                            <input type="text" name="sigurimi" value={currentCompany.sigurimi} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Qyteti:
                            <select name="qytetiId" value={currentCompany.qytetiId} onChange={handleUpdateChange}>
                                {qytetet.map(qyteti => (
                                    <option key={qyteti.qytetiId} value={qyteti.qytetiId}>
                                        {qyteti.name}
                                    </option>
                                ))}
                            </select>
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
                            Company Name:
                            <input type="text" name="kompania" value={formData.kompania} onChange={handleChange} />
                        </label>
                        <label>
                            Company Image:
                            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                        </label>
                        <label style={{display:'flex',flexDirection:'row'}}>
                            Primary Colour:
                            <input type="color" id="color" name="primaryColour" value={formData.primaryColour} onChange={(e) => handleChangePm({ hex: e.target.value })}/>
                        </label>
                        <label style={{display:'flex',flexDirection:'row'}}>
                            Secondary Colour:
                            <input type="color" id="color" name="secondaryColour" value={formData.secondaryColour} onChange={(e) => handleChangeSc({ hex: e.target.value })}/>
                        </label>
                        <label>
                            Contact Info:
                            <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
                        </label>
                        <label>
                            Sigurimi:
                            <input type="text" name="sigurimi" value={formData.sigurimi} onChange={handleChange} />
                        </label>
                        <label>
                            Qyteti:
                            <select name="qytetiId" value={formData.qyteti} onChange={handleChange}>
                                {qytetet.map(qyteti => (
                                    <option key={qyteti.qytetiId} value={qyteti.qytetiId}>
                                        {qyteti.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Button type="submit">Add Company</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default KompaniaTaxiTable;
