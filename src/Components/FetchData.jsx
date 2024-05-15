import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:your_port/your_endpoint');
    console.log(response.data); // handle the response data here
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();