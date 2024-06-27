import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const FilterForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
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
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #ffc107;
  }
`;

const Button = styled.button`
  background-color: #2c3036;
  color: #ffc107;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ffc107;
    color: #343a40;
  }
`;

const CompanyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  justify-items: center;
  width: 100%;
`;

const CompanyCard = styled.div`
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 15px;
  padding: 30px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const CompanyLogo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 15px;
`;

const PickupLocation = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ModalContent = styled.div`
  background-color: #2c2c2c;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarCard = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const CarLogo = styled.img`
  max-width: 80%;
  max-height: 80%;
  margin-bottom: 10px;
`;

const SearchForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const H3 = styled.div`
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 4rem;
  --bs-text-opacity: 1;
  color: #6c757d !important;
`

const RentCarCompanies = () => {
  const [qytetet, setQytetet] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filter, setFilter] = useState({
    kompania: '',
    qytetiId: '',
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carFilter, setCarFilter] = useState({
    modeli: '',
    vitiProdhimit: '',
    karburanti: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/KompaniaRent/get-kompaniteRent');
        setCompanies(response.data);
        const qytetiRes = await axios.get("https://localhost:7081/api/Qyteti/get-qyteti");
        setQytetet(qytetiRes.data);
        const companiesWithQyteti = await Promise.all(response.data.map(async company => {
          const qytetiResponse = await axios.get(`https://localhost:7081/api/Qyteti/get-qyteti-id/${company.qytetiId}`);
          return { ...company, qytetiName: qytetiResponse.data.name };
      }));
        setFilteredCompanies(companiesWithQyteti); // Initialize filtered companies
      } catch (error) {
        console.error('Error fetching the companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleCarFilterChange = (e) => {
    const { name, value } = e.target;
    setCarFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setFilteredCompanies(
        companies.filter((company) => {
            const matchesKompania = company.kompania.toLowerCase().includes(filter.kompania.toLowerCase());
            const matchesQytetiId = company.qytetiId == filter.qytetiId || filter.qytetiId === 'none';
        
            return matchesKompania && matchesQytetiId;
        })
    );
    console.log(filteredCompanies);
}

  const fetchCars = async (companyID) => {
    try {
      const response = await axios.get(`https://localhost:7081/api/KompaniaRent/get-all-cars-by-companyID/${companyID}`);
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error fetching the cars:', error);
    }
  };

  const handleCarSearch = () => {
    setFilteredCars(
      cars.filter((car) =>
        car.modeli.toLowerCase().includes(carFilter.modeli.toLowerCase()) &&
        car.vitiProdhimit.toString().includes(carFilter.vitiProdhimit) &&
        car.karburanti.toLowerCase().includes(carFilter.karburanti.toLowerCase())
      )
    );
  };

  return (
    <Container>
      <div className="container">
        <div className="text-center">
          <h2 data-aos="fade-up" className="section-heading text-uppercase">
            All our Rent companies!
          </h2>
          <H3 data-aos="fade-up">
            Best cars in town.
          </H3>
        </div>
      </div>
      <FilterForm>
        <Input
          type="text"
          name="kompania"
          placeholder="Company Name"
          value={filter.kompania}
          onChange={handleFilterChange}
        />
        <select name="qytetiId" value={filter.qytetiId} onChange={handleFilterChange}>
            <option value="none"></option>
            {qytetet.map(qyteti => (
                <option key={qyteti.qytetiId} value={qyteti.qytetiId}>
                    {qyteti.name}
                </option>
            ))}
        </select>
        <Button onClick={handleSearch}>Search</Button>
      </FilterForm>
      <CompanyContainer>
        {filteredCompanies.map((company, index) => (
          <CompanyCard key={company.companyID}>
            <h2>{company.kompania}</h2>
            <CompanyLogo src={company.companyLogoUrl} alt={`${company.kompania} logo`} />
            <p><strong>City:</strong> {company.qytetiName}</p>
            <p><strong>Contact Info:</strong> {company.contactInfo}</p>
            <Button style={{ marginBottom: '10px' }} onClick={() => { setSelectedCompany({ company, showCars: false }); }}>
              Show PickUpLocations
            </Button>
            <Button onClick={() => { setSelectedCompany({ company, showCars: true }); fetchCars(company.companyID); }}>
              Show Cars
            </Button>
          </CompanyCard>
        ))}
      </CompanyContainer>
      {selectedCompany && selectedCompany.showCars && (
        <ModalOverlay onClick={() => { setSelectedCompany(null); setCars([]); }}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCompany.company.kompania} - Cars</h2>
            <SearchForm>
              <Input
                type="text"
                name="modeli"
                placeholder="Model"
                value={carFilter.modeli}
                onChange={handleCarFilterChange}
              />
              <Input
                type="text"
                name="vitiProdhimit"
                placeholder="Year"
                value={carFilter.vitiProdhimit}
                onChange={handleCarFilterChange}
              />
              <Input
                type="text"
                name="karburanti"
                placeholder="Fuel"
                value={carFilter.karburanti}
                onChange={handleCarFilterChange}
              />
              <Button onClick={handleCarSearch}>Search</Button>
            </SearchForm>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', width: '100%' }}>
              {filteredCars.map((car) => (
                <CarCard key={car.markaID}>
                  <CarLogo src={car.carUrl} alt={`${car.modeli} logo`} />
                  <h3>{car.modeli}</h3>
                  <p><strong>Year:</strong> {car.vitiProdhimit}</p>
                  <p><strong>Fuel:</strong> {car.karburanti}</p>
                  <p><strong>Transmission:</strong> {car.transmisioni}</p>
                </CarCard>
              ))}
            </div>
            <Button onClick={() => setSelectedCompany(null)}>Go Back</Button>
          </ModalContent>
        </ModalOverlay>
      )}
      {selectedCompany && !selectedCompany.showCars && (
        <ModalOverlay onClick={() => setSelectedCompany(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCompany.company.kompania} - PickUp Locations</h2>
            {selectedCompany.company.pickUpLocations.map((location, index) => (
              <React.Fragment key={location.pickUpLocationID}>
                {index > 0 && <hr />}
                <PickupLocation>
                  <p><strong>Location:</strong> {location.locationName}</p>
                  <p><strong>Address:</strong> {location.address}</p>
                  <p><strong>City:</strong> {location.city}</p>
                  <p><strong>Zip Code:</strong> {location.zipCode}</p>
                </PickupLocation>
              </React.Fragment>
            ))}
            <Button onClick={() => setSelectedCompany(null)}>Go Back</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RentCarCompanies;
