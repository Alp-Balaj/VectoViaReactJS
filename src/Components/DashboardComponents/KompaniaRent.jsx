import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import MultiSelectDropdown from './MultiSelect';

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
    const [showTable, setShowTable] = useState(false);
    const [formData, setFormData] = useState({
        Kompania: '',
        Qyteti: '',
        ContactInfo: '',
        Sigurimi: '',
        PickUpLocationIDs: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteKompaniaRentID, setDeleteKompaniaRentID] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPickUpLocations = async () => {
            try {
                const response = await axios.get("http://localhost:5108/api/PickUpLocation/get-pickUpLocation");
                setPickUpLocations(response.data);
            } catch (error) {
                console.error('Error fetching pick-up locations:', error);
            }
        };

        fetchPickUpLocations();
    }, []);

    const fetchKompaniaRents = async () => {
        try {
            const response = await axios.get("http://localhost:5108/api/KompaniaRent/get-kompaniteRent");
            setKompaniaRents(response.data);
        } catch (error) {
            console.error('Error fetching kompania rents:', error);
            setError(error.message || 'Error fetching kompania rents');
        }
    };

    const handleChange = (selectedOptions) => {
        setFormData(prevState => ({
            ...prevState,
            PickUpLocationIDs: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5108/api/KompaniaRent/add-KompaniaRent", formData);
            console.log('Kompania Rent added successfully.');
            setFormData({
                Kompania: '',
                Qyteti: '',
                ContactInfo: '',
                Sigurimi: '',
                PickUpLocationIDs: []
            });
            fetchKompaniaRents(); 
        } catch (error) {
            console.error('Error adding Kompania Rent:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false);
    };

    const toggleTable = () => {
        if (!showTable) fetchKompaniaRents();
        setShowTable(!showTable);
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
            const response = await axios.delete(`http://localhost:5108/api/KompaniaRent/delete-kompaniaRent-by-id//${deleteKompaniaRentID}`);
            console.log('Delete response:', response.data);
    
            
            const updatedKompaniaRents = kompaniaRents.filter(rent => rent.kompaniaRentID !== deleteKompaniaRentID);
            console.log('Updated Kompania Rents:', updatedKompaniaRents);
            setKompaniaRents(updatedKompaniaRents);
            closeModal();
        } catch (error) {
            console.error('Error deleting Kompania Rent:', error.response ? error.response.data : error.message);
            setError(error.message || 'Error deleting Kompania Rent');
        }
    };

    return (        <Layout>
        <MainContent>
            <Buttons>
                <Button onClick={toggleForm}>{showForm ? 'Hide Kompania Rent Form' : 'Add Kompania Rent'}</Button>
                <Button onClick={toggleTable}>{showTable ? 'Hide Kompania Rents' : 'Show KompaniaRents'}</Button>
            </Buttons>

            {showForm && (
                <AddRent>
                    <h2>Add New Kompania Rent</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Company Name:
                            <input type="text" name="Kompania" value={formData.Kompania} onChange={(e) => setFormData({ ...formData, Kompania: e.target.value })} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="Qyteti" value={formData.Qyteti} onChange={(e) => setFormData({ ...formData, Qyteti: e.target.value })} />
                        </label>
                        <label>
                            Contact Info:
                            <input type="text" name="ContactInfo" value={formData.ContactInfo} onChange={(e) => setFormData({ ...formData, ContactInfo: e.target.value })} />
                        </label>
                        <label>
                            Insurance:
                            <input type="text" name="Sigurimi" value={formData.Sigurimi} onChange={(e) => setFormData({ ...formData, Sigurimi: e.target.value })} />
                        </label>
                        <label>
                            PickUp Location:
                            <MultiSelectDropdown
                                options={pickUpLocations}
                                selectedOptions={formData.PickUpLocationIDs}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit">Add Kompania Rent</button>
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
                                <Th>City</Th>
                                <Th>Contact Info</Th>
                                <Th>Insurance</Th>
                                <Th>PickUp Location</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                        {kompaniaRents.map((rent, index) => (
                            <Tr key={rent.kompaniaRentID}>
                                <Td>{rent.kompaniaRentID}</Td>
                                <Td>{rent.kompania}</Td>
                                <Td>{rent.qyteti}</Td>
                                <Td>{rent.contactInfo}</Td>
                                <Td>{rent.sigurimi}</Td>
                                <Td>{rent.pickUpLocations?.map(loc => `${loc.locationName}, ${loc.city}`).join(' || ')}</Td>
                                <Td>
                                    <FaEdit style={{ cursor: 'pointer', marginRight: '8px' }} />
                                    <FaTrash onClick={() => openModal(rent.kompaniaRentID)} style={{ cursor: 'pointer' }} />
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
