import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RentCarCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/KompaniaRent/get-kompaniteRent');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching the companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const togglePickUpLocations = (index) => {
    setCompanies(companies.map((company, i) => i === index ? { ...company, showPickUpLocations: !company.showPickUpLocations } : company));
  };

  return (
    <div className="company-container">
      {companies.map((company, index) => (
        <div key={company.companyID} className="company-card">
          <h2>{company.kompania}</h2>
          <img src={company.companyLogoUrl} alt={`${company.kompania} logo`} className="company-logo" />
          <p><strong>City:</strong> {company.qyteti}</p>
          <p><strong>Contact Info:</strong> {company.contactInfo}</p>
          <button onClick={() => togglePickUpLocations(index)}>
            {company.showPickUpLocations ? 'Hide PickUpLocations' : 'Show PickUpLocations'}
          </button>
          {company.showPickUpLocations && (
            <div className="pickup-locations">
              {company.pickUpLocations.map((location, locationIndex) => (
                <React.Fragment key={location.pickUpLocationID}>
                  {locationIndex > 0 && <hr />}
                  <div className="pickup-location">
                    <p><strong>Location:</strong> {location.locationName}</p>
                    <p><strong>Address:</strong> {location.address}</p>
                    <p><strong>City:</strong> {location.city}</p>
                    <p><strong>Zip Code:</strong> {location.zipCode}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RentCarCompanies;
