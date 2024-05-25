import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SideNav from './SideNav';
import TopNav from './TopNav';
import { FaEdit, FaTrash } from 'react-icons/fa';


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
    form {
        display: flex;
        flex-direction: column;
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

const BlurBackground = styled.div`
    filter: ${({ blur }) => blur ? 'blur(5px)' : 'none'};
`;


const Th = styled.th`
    background-color: #2c3036; 
    color: #ffc107; 
    padding: 15px; 
`;

const Td = styled.td`
    padding: 15px 10px; /* Increased vertical padding and kept horizontal padding */
    transition: background-color 0.3s; /* Add transition effect */
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2; /* Alternate row background color */
    }
`;

const ConfirmDeletePopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 9999;
`;

const PickUpLocations = () => {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        locationName: '',
        address: '',
        city: '',
        zipCode: '',
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLocationID, setDeleteLocationID] = useState(null);

    const handleUpdateClick = (location) => {
        setIsUpdating(true);
        setCurrentLocation(location);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5108/api/PickUpLocation/get-pickUpLocation");
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
            await axios.post("http://localhost:5108/api/PickUpLocation/add-PickUpLocation", formData);
            // Fetch locations again after adding a new location
            const response = await axios.get("http://localhost:5108/api/PickUpLocation/get-pickUpLocation");
            setLocations(response.data);
            // Clear form data after successful submission
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
            await axios.put(`http://localhost:5108/api/Location/update-location-by-id/${currentLocation.pickUpLocationID}`, currentLocation);
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

    const popupRef = useRef(null);

    useEffect(() => {
        if (confirmDelete) {
            popupRef.current.focus();
        }
    }, [confirmDelete]);

    const toggleTable = () => {
        setShowTable(!showTable);
        setShowForm(false); // Hide the form when showing the table
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false); // Hide the table when showing the form
    };

    const showConfirmation = (locationID) => {
        setDeleteLocationID(locationID);
        setConfirmDelete(true);
    };

    const handleDeleteLocation = async () => {
        try {
            await axios.delete(`http://localhost:5108/api/Location/delete-location-by-id/${deleteLocationID}`);
            setLocations(locations.filter(location => location.pickUpLocationID !== deleteLocationID));
            setConfirmDelete(false); 
        } catch (error) {
            console.error('Error deleting location:', error);
            setError(error.message || 'Error deleting location');
        }
    };

    const cancelDelete = () => {
        setConfirmDelete(false);
    };

    return (
        <Layout>
        <SideNav />
        <div style={{ width: '80vw' }}>
            <TopNav />
            <BlurBackground blur={confirmDelete}>
            <MainContent   blur={confirmDelete} className={confirmDelete ? 'blur-background' : ''} >
                <Button onClick={toggleTable}>{showTable ? 'Hide PickUp Locations' : 'Show PickUp Locations'}</Button>
                <Button onClick={toggleForm}>{showForm ? 'Hide Add Location' : 'Add Location'}</Button>

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
                                            <FaTrash onClick={() => showConfirmation(location.pickUpLocationID)} style={{ cursor: 'pointer' }} />
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </FancyTable>
                    </TableContainer>
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
                )}
                {confirmDelete && (
                    <ConfirmDeletePopup ref={popupRef} tabIndex={0}>
                        <p>Are you sure you want to delete this location?</p>
                        <Button onClick={handleDeleteLocation}>Yes</Button>
                        <Button onClick={cancelDelete}>No</Button>
                    </ConfirmDeletePopup>
                   
                )}
            </MainContent>
            </BlurBackground>
        </div>
    </Layout>
);

};

export default PickUpLocations;

