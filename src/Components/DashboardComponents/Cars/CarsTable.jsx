import React, { useState, useEffect } from 'react';
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

const AddCar = styled.div`
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
            <h2>Are you sure you want to delete this Car?</h2>
            <div>
                <Button onClick={() => { onConfirm(); onRequestClose(); }}>Yes</Button>
                <Button onClick={onRequestClose}>No</Button>
            </div>
        </ModalContent>
    </Modal>
);

const CarsTable = () => {
    const [cars, setCars] = useState([]);
    const [markas, setMarkas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [formData, setFormData] = useState({
        markaID: '',
        modeli: '',
        karburanti: '',
        transmisioni: '',
        vitiProdhimit: '',
        carUrl: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteCarID, setDeleteCarID] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkas = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/Marka/get-Marka");
                setMarkas(response.data);
            } catch (error) {
                console.error('Error fetching markas:', error);
            }
        };

        fetchMarkas();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get("https://localhost:7081/api/Car/get-Cars");
            const carsWithMarka = await Promise.all(response.data.map(async (car) => {
                const markaResponse = await axios.get(`https://localhost:7081/api/Marka/get-Marka-id/${car.markaID}`);
                return { ...car, markaName: markaResponse.data.emriMarkes };
            }));
            setCars(carsWithMarka);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setError(error.message || 'Error fetching cars');
        }
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        console.log('Selected value:', value); 
        const parsedValue = parseInt(value, 10);
        console.log('Parsed markaID:', parsedValue); 
        setFormData(prevState => ({
            ...prevState,
            markaID: isNaN(parsedValue) ? '' : parsedValue
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData };

       
        if (!payload.companyID) {
            delete payload.companyID;
        }

        console.log('Request Payload:', payload); 
        try {
            if (isEditMode) {
                await axios.put(`https://localhost:7081/api/Car/update-Car-by-id/${selectedCar.tabelat}`, payload);
                console.log('Car updated successfully.');
            } else {
                await axios.post("https://localhost:7081/api/Car/add-Car", payload);
                console.log('Car added successfully.');
            }
            setFormData({
                markaID: '',
                modeli: '',
                karburanti: '',
                transmisioni: '',
                vitiProdhimit: '',
                carUrl: ''
            });
            fetchCars();
            setShowForm(false);
            setShowTable(true);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error saving car:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false);
    };

    const toggleTable = () => {
        if (!showTable) fetchCars();
        setShowTable(!showTable);
        setShowForm(false);
    };

    const openModal = (id) => {
        setDeleteCarID(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteCar = async () => {
        if (!deleteCarID) {
            console.error('No Car ID to delete');
            return;
        }

        try {
            console.log('Deleting Car with ID:', deleteCarID);
            const response = await axios.delete(`https://localhost:7081/api/Car/delete-Car-by-id/${deleteCarID}`);
            console.log('Delete response:', response.data);
            fetchCars();
            closeModal();
        } catch (error) {
            console.error('Error deleting car:', error.response ? error.response.data : error.message);
            setError(error.message || 'Error deleting car');
        }
    };

    const openEditForm = (car) => {
        setIsEditMode(true);
        setSelectedCar(car);
        setFormData({
            markaID: car.markaID,
            modeli: car.modeli,
            karburanti: car.karburanti,
            transmisioni: car.transmisioni,
            vitiProdhimit: car.vitiProdhimit,
            carUrl: car.carUrl
        });
        setShowForm(true);
        setShowTable(false);
    };

    return (
        <Layout>
            <MainContent>
                <Buttons>
                    <Button onClick={toggleForm}>{showForm ? 'Hide Car Form' : 'Add Car'}</Button>
                    <Button onClick={toggleTable}>{showTable ? 'Hide Cars' : 'Show Cars'}</Button>
                </Buttons>

                {showForm && (
                    <AddCar>
                        <h2>{isEditMode ? 'Edit Car' : 'Add New Car'}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Marka:
                                <select name="markaID" value={formData.markaId} onChange={handleSelectChange}>
    <option value="">Select Marka</option>
    {markas.map(marka => (
        <option key={marka.markaId} value={marka.markaId}>
            {marka.emriMarkes}
        </option>
    ))}
</select>
                            </label>
                            <label>
                                Model:
                                <input type="text" name="modeli" value={formData.modeli} onChange={handleChange} />
                            </label>
                            <label>
                                Fuel:
                                <input type="text" name="karburanti" value={formData.karburanti} onChange={handleChange} />
                            </label>
                            <label>
                                Transmission:
                                <input type="text" name="transmisioni" value={formData.transmisioni} onChange={handleChange} />
                            </label>
                            <label>
                                Year:
                                <input type="number" name="vitiProdhimit" value={formData.vitiProdhimit} onChange={handleChange} />
                            </label>
                            <label>
                                Car URL:
                                <input type="text" name="carUrl" value={formData.carUrl} onChange={handleChange} />
                            </label>
                            <button type="submit">{isEditMode ? 'Update Car' : 'Add Car'}</button>
                        </form>
                    </AddCar>
                )}

                {showTable && (
                    <TableContainer>
                        {error && <div>Error: {error}</div>}
                        <h2>Car List</h2>
                        <FancyTable>
                            <thead>
                                <tr>
                                    <Th>ID</Th>
                                    <Th>Marka</Th>
                                    <Th>Model</Th>
                                    <Th>Fuel</Th>
                                    <Th>Transmission</Th>
                                    <Th>Year</Th>
                                    <Th>Car URL</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car, index) => (
                                    <Tr key={car.tabelat}>
                                        <Td>{car.tabelat}</Td>
                                        <Td>{car.markaName}</Td>
                                        <Td>{car.modeli}</Td>
                                        <Td>{car.karburanti}</Td>
                                        <Td>{car.transmisioni}</Td>
                                        <Td>{car.vitiProdhimit}</Td>
                                        <Td><img src={car.carUrl} alt="Car" className="car-image" style={{ width: '100px', height: 'auto' }} /></Td>
                                        <Td>
                                            <FaEdit onClick={() => openEditForm(car)} style={{ cursor: 'pointer', marginRight: '8px' }} />
                                            <FaTrash onClick={() => openModal(car.tabelat)} style={{ cursor: 'pointer' }} />
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
                    onConfirm={handleDeleteCar}
                />
            </MainContent>
        </Layout>
    );
};

export default CarsTable;