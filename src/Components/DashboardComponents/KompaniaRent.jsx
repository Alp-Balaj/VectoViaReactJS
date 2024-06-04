import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import Select from "react-select";

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
      input,
      select {
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
  padding: 5px 10px; /* Smaller padding */
  margin: 5px; /* Smaller margin */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ffc107;
    color: #343a40;
  }
`;

const CarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const CarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false}
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    }}
  >
    <ModalContent>
      <h2>Are you sure you want to delete this KompaniaRent?</h2>
      <div>
        <Button
          onClick={() => {
            onConfirm();
            onRequestClose();
          }}
        >
          Yes
        </Button>
        <Button onClick={onRequestClose}>No</Button>
      </div>
    </ModalContent>
  </Modal>
);

const KompaniaRent = () => {
  const [qytetet, setQytetet] = useState([]);
  const [pickUpLocations, setPickUpLocations] = useState([]);
  const [kompaniaRents, setKompaniaRents] = useState([]);
  const [availableCars, setAvailableCars] = useState([]); // New state for available cars
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [formData, setFormData] = useState({
    kompania: "",
    companyLogoUrl: "",
    qytetiId: "",
    contactInfo: "",
    sigurimi: "",
    pickUpLocationIDs: [],
    carIDs: [], 
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteKompaniaRentID, setDeleteKompaniaRentID] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]); 
  const [error, setError] = useState(null);

  const fetchAvailableCars = async () => {
    try {
        const response = await axios.get("https://localhost:7081/api/Car/get-Cars");
        const carsWithMarka = await Promise.all(response.data.map(async car => {
            const markaResponse = await axios.get(`https://localhost:7081/api/Marka/get-Marka-id/${car.markaID}`);
            return { ...car, markaName: markaResponse.data.emriMarkes };
        }));
        setAvailableCars(carsWithMarka);
    } catch (error) {
        console.error('Error fetching available cars:', error);
    }
};

  useEffect(() => {
    const fetchPickUpLocations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7081/api/PickUpLocation/get-pickUpLocation"
        );
        const qytetiRes = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
        setQytetet(qytetiRes.data);
        setPickUpLocations(response.data);
      } catch (error) {
        console.error("Error fetching pick-up locations:", error);
      }
    };
    fetchPickUpLocations();
    fetchAvailableCars();
  }, []);

  const fetchKompaniaRents = async () => {
    try {
        const response = await axios.get("https://localhost:7081/api/KompaniaRent/get-kompaniteRent");
        const kompaniaRentsWithMarka = await Promise.all(response.data.map(async rent => {
            const carsWithMarka = await Promise.all((rent.cars || []).map(async car => {
                const markaResponse = await axios.get(`https://localhost:7081/api/Marka/get-Marka-id/${car.markaID}`);
                return { ...car, markaName: markaResponse.data.emriMarkes };
            }));
            return { ...rent, cars: carsWithMarka };
        }));
        setKompaniaRents(kompaniaRentsWithMarka);
        const kompaniaRentsWithQyteti = await Promise.all(response.data.map(async rent => {
          const qytetiResponse = await axios.get(`https://localhost:7081/api/Qyteti/get-qyteti-id/${rent.qytetiId}`);
          return { ...rent, qytetiName: qytetiResponse.data.name };
        }));
        setKompaniaRents(kompaniaRentsWithQyteti)
    } catch (error) {
        console.error('Error fetching kompania rents:', error);
        setError(error.message || 'Error fetching kompania rents');
    }
};

  const handleChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      pickUpLocationIDs: selectedOptions,
    }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    console.log('Selected value:', value); 
    const parsedValue = parseInt(value, 10);
    console.log('Parsed qytetiId:', parsedValue); 
    setFormData(prevState => ({
        ...prevState,
        qytetiId: isNaN(parsedValue) ? '' : parsedValue
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        kompania: formData.kompania,
        companyLogoUrl: formData.companyLogoUrl,
        qytetiId: formData.qytetiId,
        contactInfo: formData.contactInfo,
        sigurimi: formData.sigurimi,
        pickUpLocationIDs: formData.pickUpLocationIDs,
        carIDs: formData.carIDs, // Include car IDs
      };

      if (isEditMode) {
        await axios.put(
          `https://localhost:7081/api/KompaniaRent/update-KompaniaRent-by-id/${selectedRecord.companyID}`,
          payload
        );
        console.log("Kompania Rent updated successfully.");
      } else {
        await axios.post(
          "https://localhost:7081/api/KompaniaRent/add-KompaniaRent",
          payload
        );
        console.log("Kompania Rent added successfully.");
      }

      setFormData({
        kompania: "",
        companyLogoUrl: "",
        qytetiId: "",
        contactInfo: "",
        sigurimi: "",
        pickUpLocationIDs: [],
        carIDs: [], // Reset car IDs
      });
      fetchKompaniaRents();
      fetchAvailableCars(); // Refresh available cars
      setShowForm(false);
      setShowTable(true);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving Kompania Rent:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowTable(false);
    if (!showForm) { 
      setIsEditMode(false);
      setSelectedRecord(null);
      setFormData({
        kompania: "",
        companyLogoUrl: "",
        qytetiId: "",
        contactInfo: "",
        sigurimi: "",
        pickUpLocationIDs: [],
        carIDs: [], 
      });
      fetchAvailableCars(); 
    }
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
      console.error("No KompaniaRent ID to delete");
      return;
    }

    try {
      console.log("Deleting Kompania Rent with ID:", deleteKompaniaRentID);
      const response = await axios.delete(
        `https://localhost:7081/api/KompaniaRent/delete-kompaniaRent-by-id/${deleteKompaniaRentID}`
      );
      console.log("Delete response:", response.data);

      fetchKompaniaRents();
      fetchAvailableCars(); // Refresh available cars
      closeModal();
    } catch (error) {
      console.error(
        "Error deleting Kompania Rent:",
        error.response ? error.response.data : error.message
      );
      setError(error.message || "Error deleting Kompania Rent");
    }
  };

  const openEditForm = (record) => {
    setIsEditMode(true);
    setSelectedRecord(record);
    const carsWithMarka = (record.cars || []).map(car => {
        const marka = availableCars.find(m => m.tabelat === car.tabelat);
        return { ...car, markaName: marka?.markaName || 'Unknown' };
    });
    setFormData({
        kompania: record.kompania,
        companyLogoUrl: record.companyLogoUrl,
        qytetiId: record.qytetiId,
        contactInfo: record.contactInfo,
        sigurimi: record.sigurimi,
        pickUpLocationIDs: record.pickUpLocations.map(loc => loc.pickUpLocationID),
        carIDs: carsWithMarka.map(car => car.tabelat)
    });
    setShowForm(true);
    setShowTable(false);
};

  const toggleRow = (id) => {
    setExpandedRows((prevState) =>
      prevState.includes(id)
        ? prevState.filter((rowId) => rowId !== id)
        : [...prevState, id]
    );
  };

  const handleRemoveCar = (carID) => {
    setFormData((prevState) => ({
      ...prevState,
      carIDs: prevState.carIDs.filter((id) => id !== carID),
    }));
  };

  const availableCarsForSelect = availableCars.filter(
    (car) =>
      car.companyID === null || (isEditMode && car.companyID === selectedRecord?.companyID)
  );


  

  return (
    <Layout>
      <MainContent>
        <Buttons>
          <Button onClick={toggleForm}>
            {showForm ? "Hide Kompania Rent Form" : "Add Kompania Rent"}
          </Button>
          <Button onClick={toggleTable}>
            {showTable ? "Hide Kompania Rents" : "Show Kompania Rents"}
          </Button>
        </Buttons>

        {showForm && (
          <AddRent>
            <h2>
              {isEditMode ? "Edit Kompania Rent" : "Add New Kompania Rent"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label>
                Company Name:
                <input
                  type="text"
                  name="kompania"
                  value={formData.kompania}
                  onChange={(e) =>
                    setFormData({ ...formData, kompania: e.target.value })
                  }
                />
              </label>
              <label>
                Company Logo URL:
                <input
                  type="text"
                  name="companyLogoUrl"
                  value={formData.companyLogoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, companyLogoUrl: e.target.value })
                  }
                />
              </label>
              <label>
                  Qyteti:
                  <select name="qytetiId" value={formData.qyteti} onChange={handleSelectChange}>
                      <option value="none"></option>
                      {qytetet.map(qyteti => (
                          <option key={qyteti.qytetiId} value={qyteti.qytetiId}>
                              {qyteti.name}
                          </option>
                      ))}
                  </select>
              </label>
              <label>
                Contact Info:
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, contactInfo: e.target.value })
                  }
                />
              </label>
              <label>
                Insurance:
                <input
                  type="text"
                  name="sigurimi"
                  value={formData.sigurimi}
                  onChange={(e) =>
                    setFormData({ ...formData, sigurimi: e.target.value })
                  }
                />
              </label>
              <label>
                PickUp Location:
                <Select
                  isMulti
                  name="pickUpLocationIDs"
                  options={pickUpLocations
                    .filter((location) => location.companyID === null)
                    .map((location) => ({
                      value: location.pickUpLocationID,
                      label: location.locationName,
                    }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.pickUpLocationIDs
                    .map((id) =>
                      pickUpLocations.find((loc) => loc.pickUpLocationID === id)
                    )
                    .map((loc) => ({
                      value: loc.pickUpLocationID,
                      label: loc.locationName,
                    }))}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      pickUpLocationIDs: selectedOptions.map(
                        (option) => option.value
                      ),
                    })
                  }
                />
              </label>
              <label>
                Cars:
                <Select
                  isMulti
                  name="carIDs"
                  options={availableCarsForSelect.map((car) => ({
                    value: car.tabelat,
                    label: `${car.tabelat} ${car.modeli}`,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.carIDs
                    .map((id) =>
                      availableCarsForSelect.find((car) => car.tabelat === id)
                    )
                    .map((car) => ({
                      value: car.tabelat,
                      label: `${car.markaName} ${car.modeli}`,
                    }))}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      carIDs: selectedOptions.map((option) => option.value),
                    })
                  }
                />
              </label>
              <button type="submit">
                {isEditMode ? "Update Kompania Rent" : "Add Kompania Rent"}
              </button>
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
                  <Th>Cars</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {kompaniaRents.map((rent, index) => (
                  <>
                    <Tr key={rent.companyID}>
                      <Td>{rent.companyID}</Td>
                      <Td>{rent.kompania}</Td>
                      <img
                        src={rent.companyLogoUrl}
                        alt="Company Logo"
                        className="company-logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <Td>{rent.qytetiName}</Td>
                      <Td>{rent.contactInfo}</Td>
                      <Td>{rent.sigurimi}</Td>
                      <Td>
                        {rent.pickUpLocations
                          ?.map((loc) => `${loc.locationName}, ${loc.city}`)
                          .join(" || ")}
                      </Td>
                      <Td>
                        <Button onClick={() => toggleRow(rent.companyID)}>
                          {expandedRows.includes(rent.companyID)
                            ? "Hide"
                            : "Show"}
                        </Button>
                      </Td>
                      <Td>
                        <FaEdit
                          onClick={() => openEditForm(rent)}
                          style={{ cursor: "pointer", marginRight: "8px" }}
                        />
                        <FaTrash
                          onClick={() => openModal(rent.companyID)}
                          style={{ cursor: "pointer" }}
                        />
                      </Td>
                    </Tr>
                    {expandedRows.includes(rent.companyID) && (
    <Tr>
        <Td colSpan="9">
            <CarContainer>
                {(rent.cars || []).map(car => (
                    car && (
                        <CarItem key={car.tabelat}>
                            <img src={car.carUrl} alt={car.modeli} style={{ width: '100px', height: 'auto' }} />
                            <p>{car.markaName} {car.modeli}</p>
                           
                        </CarItem>
                    )
                ))}
            </CarContainer>
        </Td>
    </Tr>
)}
                  </>
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
