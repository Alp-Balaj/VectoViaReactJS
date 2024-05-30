import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';




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

const UpdateModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure the modal appears above other content */
`;

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalButton = styled.button`
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

const AddLocation = styled.div`
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

            input {
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
            <h2>Are you sure you want to delete this location?</h2>
            <div>
                <ModalButton onClick={onConfirm}>Yes</ModalButton>
                <ModalButton onClick={onRequestClose}>No</ModalButton>
            </div>
        </ModalContent>
    </Modal>
);

const PickUpLocations = () => {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        locationName: '',
        address: '',
        city: '',
        zipCode: '',
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [deleteLocationID, setDeleteLocationID] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleUpdateClick = (location) => {
        setIsUpdating(true);
        setCurrentLocation(location);
    };

  const openUpdateModal = (location) => {
        setCurrentLocation(location);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setCurrentLocation(null);
    };

 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/PickUpLocation/get-pickUpLocation");
                setLocations(response.data);
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
            await axios.post("https://localhost:7081/api/PickUpLocation/add-PickUpLocation", formData);
            const response = await axios.get("https://localhost:7081/api/PickUpLocation/get-pickUpLocation");
            setLocations(response.data);
            setFormData({
                locationName: '',
                address: '',
                city: '',
                zipCode: '',
            });
          
        } catch (error) {
            console.error('Error adding location:', error);
            setError(error.message || 'Error adding location');
        }
    };

    const handleUpdateLocation = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/PickUpLocation/update-PickUpLocation-by-id/${currentLocation.pickUpLocationID}`, currentLocation);
            const updatedLocations = locations.map(location => location.pickUpLocationID === currentLocation.pickUpLocationID ? currentLocation : location);
            setLocations(updatedLocations);
            setIsUpdating(false);
            setCurrentLocation(null);
        } catch (error) {
            console.error('Error updating location:', error);
            setError(error.message || 'Error updating location');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentLocation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setShowForm(false);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false);
    };

    const openModal = (id) => {
        setDeleteLocationID(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteLocation = async () => {
        try {
            await axios.delete(`https://localhost:7081/api/PickUpLocation/delete-PickUpLocation-by-id/${deleteLocationID}`);
            setLocations(locations.filter(location => location.pickUpLocationID !== deleteLocationID));
            closeModal();
        } catch (error) {
            console.error('Error deleting location:', error);
            setError(error.message || 'Error deleting location');
        }
    };

    return (
        <Layout>
            <div style={{ width: '80vw' }}>
                <MainContent>
                    <Buttons>
                        <Button onClick={toggleTable}>{showTable ? 'Hide PickUp Locations' : 'Show PickUp Locations'}</Button>
                        <Button onClick={toggleForm}>{showForm ? 'Hide  PickUpLocation' : 'Add PickUp Location'}</Button>
                    </Buttons>

                    {showTable && (
                        <TableContainer>
                            {error && <div>Error: {error}</div>}
                            <h2>PickUp Location List</h2>
                            <FancyTable>
                                <thead>
                                    <tr>
                                        <Th>ID</Th>
                                        <Th>Name</Th>
                                        <Th>Address</Th>
                                        <Th>City</Th>
                                        <Th>Zip Code</Th>
                                        <Th>Actions</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.map((location, index) => (
                                        <Tr key={location.pickUpLocationID} className={index === locations.length - 1 && 'show'}>
                                            <Td>{location.pickUpLocationID}</Td>
                                            <Td>{location.locationName}</Td>
                                            <Td>{location.address}</Td>
                                            <Td>{location.city}</Td>
                                            <Td>{location.zipCode}</Td>
                                            <Td>
                                                <FaEdit onClick={() => handleUpdateClick(location)} style={{ cursor: 'pointer', marginRight: '8px' }} />
                                                <FaTrash onClick={() => openModal(location.pickUpLocationID)} style={{ cursor: 'pointer' }} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </tbody>
                            </FancyTable>
                        </TableContainer>

                        
                    )}

{currentLocation && (
                <UpdateModal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal}>
                    <h2>Update Location</h2>
                    <UpdateForm onSubmit={handleUpdateLocation}>
                        
                    </UpdateForm>
                </UpdateModal>
            )}

                    {isUpdating && (
                        <AddLocation>
                            <h2>Update Location</h2>
                            <form onSubmit={handleUpdateLocation}>
                                <label>
                                    Name:
                                    <input type="text" name="locationName" value={currentLocation.locationName} onChange={handleUpdateChange} />
                                </label>
                                <label>
                                    Address:
                                    <input type="text" name="address" value={currentLocation.address} onChange={handleUpdateChange} />
                                </label>
                                <label>
                                    City:
                                    <input type="text" name="city" value={currentLocation.city} onChange={handleUpdateChange} />
                                </label>
                                <label>
                                    Zip Code:
                                    <input type="text" name="zipCode" value={currentLocation.zipCode} onChange={handleUpdateChange} />
                                </label>
                                <Button type="submit">Update Location</Button>
                            </form>
                        </AddLocation>
                    )}

                    {showForm && (
                        <AddLocation>
                            <h2>Add New Location</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Name:
                                    <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} />
                                </label>
                                <label>
                                    Address:
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                                </label>
                                <label>
                                    City:
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                                </label>
                                <label>
                                    Zip Code:
                                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                </label>
                                <Button type="submit">Add Location</Button>
                            </form>
            
                            
                        </AddLocation>
                   ) };

                   


                    <ConfirmationModal 
                        isOpen={isModalOpen} 
                        onRequestClose={closeModal} 
                        onConfirm={handleDeleteLocation} 
                    />
                </MainContent>
            </div>
        </Layout>
    );
};

export default PickUpLocations;
