import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import Select from 'react-select'; 

const Layout = styled.div`
    display: flex;
`;

const MainContent = styled.div`
    width: 100%;
    height: calc(100vh - 90px);
    padding: 20px;
    background-color: #f8f9fa;
    color: #343a40;
    overflow-y: auto;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: auto;
`;

const AddRent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #343a40;
    h2 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #2c3036;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        label {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            color: #2c3036;
            input, select {
                padding: 10px;
                border: 1px solid #ced4da;
                border-radius: 5px;
                outline: none;
                transition: border-color 0.3s;
                &:focus {
                    border-color: #ffc107;
                }
            }
        }
        button[type="submit"] {
            background-color: #ffc107;
            color: #343a40;
            border: none;
            padding: 12px 25px;
            margin-top: 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            &:hover {
                background-color: #ffca2b;
            }
        }
    }
`;

const TableContainer = styled.div`
    text-align: center;
`;

const FancyTable = styled.table`
    margin: auto;
    border-collapse: collapse;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Th = styled.th`
    background-color: #2c3036; 
    color: #ffc107; 
    padding: 15px; 
`;

const Td = styled.td`
    padding: 15px 10px;
    transition: background-color 0.3s;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={{
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    }}>
        <ModalContent>
            <h2>Are you sure you want to delete this KompaniaRent?</h2>
            <div>
                <Button onClick={() => { onConfirm(); onRequestClose(); }}>Yes</Button>
                <Button onClick={onRequestClose}>No</Button>
            </div>
        </ModalContent>
    </Modal>
);

const KompaniaRent = () => {
    const [pickUpLocations, setPickUpLocations] = useState([]);
    const [kompaniaRents, setKompaniaRents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [formData, setFormData] = useState({
        kompania: '',
        companyLogoUrl: '',
        qyteti: '',
        contactInfo: '',
        sigurimi: '',
        pickUpLocationIDs: []
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteKompaniaRentID, setDeleteKompaniaRentID] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPickUpLocations = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/PickUpLocation/get-pickUpLocation");
                setPickUpLocations(response.data);
            } catch (error) {
                console.error('Error fetching pick-up locations:', error);
            }
        };
        const fetchKompaniaRents = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/KompaniaRent/get-kompaniteRent");
                setKompaniaRents(response.data);
            } catch (error) {
                console.error('Error fetching kompania rents:', error);
                setError(error.message || 'Error fetching kompania rents');
            }
        };
        fetchKompaniaRents();
        fetchPickUpLocations();
    }, []);

    

    const handleChange = (selectedOptions) => {
        setFormData(prevState => ({
            ...prevState,
            PickUpLocationIDs: selectedOptions
        }));
       
      
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await axios.put(`https://localhost:7081/api/KompaniaRent/update-KompaniaRent-by-id/${selectedRecord.companyID}`, formData);
                console.log('Kompania Rent updated successfully.');
                const response = await axios.get("https://localhost:7081/api/KompaniaRent/get-kompaniteRent");
                console.log('Kompania Rent added successfully.');
                setKompaniaRents(response.data);
            } else {
                await axios.post("https://localhost:7081/api/KompaniaRent/add-KompaniaRent", formData);
                const response = await axios.get("https://localhost:7081/api/KompaniaRent/get-kompaniteRent");
                console.log('Kompania Rent added successfully.');
                setKompaniaRents(response.data);
            }
            setFormData({
                kompania: '',
                companyLogoUrl: '',
                qyteti: '',
                contactInfo: '',
                sigurimi: '',
                pickUpLocationIDs: []
            });
            setShowForm(false);
            setShowTable(true);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error saving Kompania Rent:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false);
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setIsEditMode(false)
        setShowForm(false);
    };

    const openModal = (id) => {
        setDeleteKompaniaRentID(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteKompaniaRent = async () => {
        if (!deleteKompaniaRentID) {
            console.error('No KompaniaRent ID to delete');
            return;
        }

        try {
            console.log('Deleting Kompania Rent with ID:', deleteKompaniaRentID);
            const response = await axios.delete(`https://localhost:7081/api/KompaniaRent/delete-kompaniaRent-by-id/${deleteKompaniaRentID}`);
            console.log('Delete response:', response.data);

            const refreshKomp = await axios.get("https://localhost:7081/api/KompaniaRent/get-kompaniteRent");
            setKompaniaRents(refreshKomp.data);
            const refreshLok = await axios.get("https://localhost:7081/api/PickUpLocation/get-pickUpLocation");
            setPickUpLocations(refreshLok.data);
           
            closeModal();
        } catch (error) {
            console.error('Error deleting Kompania Rent:', error.response ? error.response.data : error.message);
            setError(error.message || 'Error deleting Kompania Rent');
        }
    };

    const openEditForm = (record) => {
        setIsEditMode(true);
        setSelectedRecord(record);
        setFormData({
            kompania: record.kompania,
            companyLogoUrl: record.companyLogoUrl,
            qyteti: record.qyteti,
            contactInfo: record.contactInfo,
            sigurimi: record.sigurimi,
            pickUpLocationIDs: record.pickUpLocations.map(loc => loc.pickUpLocationID)
        });
        setShowForm(true);
        setShowTable(false);
    };

    return (        
        <Layout>
            <MainContent>
                {showForm && (
                    <AddRent>
                        <Button onClick={toggleTable}>Go Back</Button>
                        <h2>{isEditMode ? 'Edit Kompania Rent' : 'Add New Kompania Rent'}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Company Name:
                                <input type="text" name="kompania" value={formData.kompania} onChange={(e) => setFormData({ ...formData, kompania: e.target.value })} />
                            </label>
                            <label>
                                Company Logo URL:
                                <input type="text" name="companyLogoUrl" value={formData.companyLogoUrl} onChange={(e) => setFormData({ ...formData, companyLogoUrl: e.target.value })} />
                            </label>
                            <label>
                                City:
                                <input type="text" name="qyteti" value={formData.qyteti} onChange={(e) => setFormData({ ...formData, qyteti: e.target.value })} />
                            </label>
                            <label>
                                Contact Info:
                                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })} />
                            </label>
                            <label>
                                Insurance:
                                <input type="text" name="sigurimi" value={formData.sigurimi} onChange={(e) => setFormData({ ...formData, sigurimi: e.target.value })} />
                            </label>
                            <label>
                                PickUp Location:
                                <Select
                                  isMulti
                                  name="pickUpLocationIDs"
                                  options={pickUpLocations.filter(location => location.companyID === null).map(location => ({ value: location.pickUpLocationID, label: location.locationName }))}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  value={formData.pickUpLocationIDs.map(id => pickUpLocations.find(loc => loc.pickUpLocationID === id)).map(loc => ({ value: loc.pickUpLocationID, label: loc.locationName }))}
                                  onChange={(selectedOptions) => setFormData({ ...formData, pickUpLocationIDs: selectedOptions.map(option => option.value) })}
                              />
                            </label>
                            <button type="submit">{isEditMode ? 'Update Kompania Rent' : 'Add Kompania Rent'}</button>
                        </form>
                    </AddRent>
                )}

                {showTable && (
                    <TableContainer>
                        {error && <div>Error: {error}</div>}
                        <h2>Kompania Rent List</h2>
                        <FancyTable>
                            <thead>
                                <tr>
                                    <Th>ID</Th>
                                    <Th>Company Name</Th>
                                    <Th>Company Logo</Th>
                                    <Th>City</Th>
                                    <Th>Contact Info</Th>
                                    <Th>Insurance</Th>
                                    <Th>PickUp Location</Th>
                                    <Th>Actions<AddIcon style={{ cursor: 'pointer'}} onClick={toggleForm}/></Th>
                                </tr>
                            </thead>
                            <tbody>
                            {kompaniaRents.map((rent) => (
                                <Tr key={rent.companyID}>
                                    <Td>{rent.companyID}</Td>
                                    <Td>{rent.kompania}</Td>
                                    <img src={rent.companyLogoUrl} alt="Company Logo"  className="company-logo" style={{ width: '100px', height: 'auto' }} />
                                    <Td>{rent.qyteti}</Td>
                                    <Td>{rent.contactInfo}</Td>
                                    <Td>{rent.sigurimi}</Td>
                                    <Td>{rent.pickUpLocations?.map(loc => `${loc.locationName}, ${loc.city}`).join(' || ')}</Td>
                                    <Td>
                                        <Button onClick={() => openEditForm(rent)}>Update</Button>
                                        <Button onClick={() => openModal(rent.companyID)}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                            </tbody>
                        </FancyTable>
                    </TableContainer>
                )}

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    onConfirm={handleDeleteKompaniaRent}
                />
            </MainContent>
        </Layout>
    );
};

export default KompaniaRent;
