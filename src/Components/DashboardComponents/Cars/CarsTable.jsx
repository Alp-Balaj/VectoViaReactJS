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
        color: #ffc107; 
        padding: 15px;
        td{
            color: black;
            padding: 15px 10px; /* Increased vertical padding and kept horizontal padding */
            transition: background-color 0.3s; /* Add transition effect */
        } 
    }
`;


const CarsTable = () => {
    const [open, setOpen] = useState(false);
    const [deleteCarsID, setDeleteCarID] = useState(null);

    const [cars, setCars] = useState([]);
    const [marka, setMarka] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        markaId: '',
        modeli: '',
        karburanti: '',
        transmisioni: '',
        vitiProdhimit: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    
    
    const handleUpdateClick = async (car) => {
        setIsUpdating(true);
        setCurrentCar(car);
        setShowTable(false);
        setShowForm(false); // Show the form for updating
        try {
            const MarkaResponse = await axios.get("https://localhost:7081/api/Marka/get-Marka");
            setMarka(MarkaResponse.data);
            console.log(MarkaResponse.data);
        } catch (error) {
            console.error('Failed to fetch Markas:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7081/api/Car/get-Cars");
                const CarsWithMarka = await Promise.all(response.data.map(async car => {
                    const markaResponse = await axios.get(`https://localhost:7081/api/Marka/get-Marka-id/${car.markaID}`);
                    console.log(markaResponse.data);
                    return { ...car, markaName: markaResponse.data.emriMarkes };
                }));
                setCars(CarsWithMarka);
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
        setFormData(prev => ({
            ...prev,
            [name]: name === "markaId" ? parseInt(value, 10) : value
        }));
    };

    const deleteCar = async () => {
        try {
            await axios.delete(`https://localhost:7081/api/Car/delete-Car-by-id/${deleteCarsID}`);
            setCars(cars.filter(car => car.targat !== deleteCarsID));
            setOpen(false);
        } catch (error) {
            console.error('Error deleting Car:', error);
            setError(error.message || 'Error deleting Cars');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Marka:', marka);
        try {
            await axios.post("https://localhost:7081/api/Car/add-Car", formData);
            // Fetch users again after adding a new user
            const response = await axios.get("https://localhost:7081/api/Car/get-Cars");
            setCars(response.data);
            // Clear form data after successful submission
            setFormData({
                markaId: '',
                modeli: '',
                karburanti: '',
                transmisioni: '',
                vitiProdhimit: ''
            });
            setShowForm(false);
            setShowTable(true);
        } catch (error) {
            console.error('Error adding car:', error);
            setError(error.message || 'Error adding Car');
        }
    };

    const handleUpdateCar = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7081/api/Car/update-Car-by-id/${currentCar.tabelat}`, currentCar);
            const updatedCars = cars.map(car => car.tabelat === currentCar.tabelat ? currentCar : car);
            setCars(updatedCars);
            setIsUpdating(false);
            setCurrentCar(null);
            setShowTable(true);
        } catch (error) {
            console.error('Error updating car:', error);
            setError(error.message || 'Error updating car');
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setCurrentCar(prev => ({
            ...prev,
            [name]: name === "markaId" ? parseInt(value, 10) : value
        }));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
        setIsUpdating(false);
        setShowForm(false); // Hide the form when showing the table
    };

    const youSure = (carID) => {
        setOpen(true);
        setDeleteCarID(carID);
    };

    const toggleForm = async () => {
    setShowTable(false); // Hide the table when showing the form
    setShowForm(!showForm);
    setIsUpdating(false);
    if (!showForm) { // Fetch roles only if the form is about to be shown
        try {
            const MarkaResponse = await axios.get("https://localhost:7081/api/Marka/get-Marka");
            setMarka(MarkaResponse.data);
            console.log(MarkaResponse.data);
        } catch (error) {
            console.error('Failed to fetch marka:', error);
        }
    }
};
    return (
        <Root>
            <Modal open={open} onClose={()=>setOpen(false)}>
                <Box>
                    <h2>Are you sure you want to <span style={{color: 'red'}}>delete</span> this user?</h2>
                    <p>This action cannot be undone.</p>
                    <Buttons>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button onClick={deleteCar}>Delete</Button>
                    </Buttons>
                </Box>
            </Modal>
            {showTable && (
                <>
                    {error && <div>Error: {error}</div>}
                    <h2 style={{textAlign: 'center'}}>Car List</h2>
                    <FancyTable>
                        <thead>
                            <tr>
                                <th>Tabelat</th>
                                <th>Marka</th>
                                <th>Modeli</th>
                                <th>Karburanti</th>
                                <th>Transmisioni</th>
                                <th>Viti i Prodhimit</th>
                                <th>Actions<AddIcon style={{ cursor: 'pointer'}} onClick={toggleForm}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(car => (
                                <tr key={car.tabelat}>
                                    <td>{car.tabelat}</td>
                                    <td>{car.markaName}</td>
                                    <td>{car.modeli}</td>
                                    <td>{car.karburanti}</td>
                                    <td>{car.transmisioni}</td>
                                    <td>{car.vitiProdhimit}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateClick(car)}>Update</Button>
                                        <Button onClick={() => youSure(car.tabelat)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </FancyTable>
                </>
            )}

            {isUpdating && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
                    <h2>Update Cars</h2>
                    <form onSubmit={handleUpdateCar}>
                        <label>
                            Marka:
                            <select name="markaId" value={currentCar.markaId} onChange={handleUpdateChange}>
                                {marka.map(marka => (
                                    <option key={marka.markaId} value={marka.markaId}>
                                        {marka.emriMarkes}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Modeli:
                            <input type="text" name="modeli" value={currentCar.modeli} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Karburanti:
                            <input type="text" name="karburanti" value={currentCar.karburanti} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Transmisioni:
                            <input type="text" name="transmisioni" value={currentCar.transmisioni} onChange={handleUpdateChange} />
                        </label>
                        <label>
                            Viti i Prodhimit:
                            <input type="text" name="vitiProdhimit" value={currentCar.vitiProdhimit} onChange={handleUpdateChange} />
                        </label>
                        <Button type="submit">Update Car</Button>
                    </form>
                </AddUsers>
            )}

            {showForm && (
                <AddUsers>
                    <Button onClick={toggleTable}>Go Back</Button>
                    <h2>Add New Car</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Marka:
                            <select name="markaId" value={formData.markaId} onChange={handleChange}>
                                <option value="none"></option>
                                {marka.map(marka => (
                                    <option key={marka.markaId} value={marka.markaId}>
                                        {marka.emriMarkes}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Modeli:
                            <input type="text" name="modeli" value={formData.modeli} onChange={handleChange} />
                        </label>
                        <label>
                            Karburanti:
                            <input type="text" name="karburanti" value={formData.karburanti} onChange={handleChange} />
                        </label>
                        <label>
                            Transmisioni:
                            <input type="text" name="transmisioni" value={formData.transmisioni} onChange={handleChange} />
                        </label>
                        <label>
                            Viti i Prodhimit:
                            <input type="int" name="vitiProdhimit" value={formData.vitiProdhimit} onChange={handleChange} />
                        </label>
                        <Button type="submit">Add Car</Button>
                    </form>
                </AddUsers>
            )}
        </Root>
    );
};

export default CarsTable;

