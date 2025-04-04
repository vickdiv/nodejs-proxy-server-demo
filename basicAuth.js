import axios from 'axios';
import qs from 'qs';
 
const clientId = '43222342';
const clientSecret = '43453543';
const tokenUrl = 'https://your-auth-server.com/oauth/token'; // Replace with your token endpoint
const scope = 'read';
 
// Encode client credentials in base64 (client_id:client_secret)
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
 
// Prepare request data
const data = qs.stringify({
  grant_type: 'client_credentials',
  scope: scope
});
 
// Make the POST request
axios.post(tokenUrl, data, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${basicAuth}`
  }
})
.then(response => {
  console.log('Access Token:', response.data.access_token);
})
.catch(error => {
  console.error('Error fetching token:', error.response?.data || error.message);
});
