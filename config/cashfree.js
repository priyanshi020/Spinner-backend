// const axios = require('axios');
// require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, BASE_URL } = process.env;

// // Function to get auth token
// const getAuthToken = async () => {
//     try {
//         const response = await axios.post(
//             `${BASE_URL}/payout/v1/authorize`,
//             // Body data can be left empty or adjusted according to the API
//             {},
//             {
//               headers: {
//                 "accept": "application/json",
//                 "x-client-id": CLIENT_ID,
//                 "x-client-secret": CLIENT_SECRET
//               }
//             }
//           );
          
  
//       console.log('Full API Response:', response.data); // Log full response
  
//       return response.data.data.token; // This may need to be adjusted based on the response structure
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response from Cashfree:', error.response.data);
//         throw new Error('Error fetching token: ' + error.response?.data?.message || 'Unknown error');
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//         throw new Error('Error fetching token: No response from Cashfree API');
//       } else {
//         console.error('Error setting up request:', error.message);
//         throw new Error('Error fetching token: ' + error.message);
//       }
//     }
//   };
  

// const testAuthToken = async () => {
//     try {
//       const token = await getAuthToken();
//       console.log('Fetched Token:', token);
//     } catch (error) {
//       console.error('Error fetching token:', error.message);
//     }
//   };
  
//   testAuthToken();
module.exports = {  BASE_URL };
