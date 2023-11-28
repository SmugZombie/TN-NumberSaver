const axios = require('axios');
const fs = require('fs');
//let cookieJar = {}; // Initialize an empty object to store cookies.

async function getPassword(){
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://dinopass.com/password/strong',
        headers: { }
      };
      
      return axios.request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return "Hello World";
      });
}

// Function to save cookies to a file.
function saveCookiesToFile() {
    const cookiesJSON = JSON.stringify(cookieJar);
    fs.writeFileSync('cookies.json', cookiesJSON);
  }
  
  // Function to load cookies from a file.
function loadCookiesFromFile() {
    try {
        const cookiesJSON = fs.readFileSync('cookies.json', 'utf8');
        return JSON.parse(cookiesJSON);
    } catch (error) {
        return {};
    }
}

async function authenticate(){
    cookieJar = loadCookiesFromFile(); // Load cookies from the file.
    let data = JSON.stringify({
    "remember": true,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "disable_session": true
    });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.textnow.com/api/sessions',
    headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0', 
        'Content-Type': 'application/json', 
    },
    data : data
    };

    await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      // Check if there are Set-Cookie headers in the response.
      const setCookieHeaders = response.headers['set-cookie'];
      if (setCookieHeaders) {
        // Parse and store the cookies in the cookieJar object.
        setCookieHeaders.forEach((cookieHeader) => {
          const parts = cookieHeader.split(';')[0].split('=');
          if (parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            cookieJar[key] = value;
          }
        });
        saveCookiesToFile();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function makeRequest() {
  cookieJar = loadCookiesFromFile(); // Load cookies from the file.
  const event = new Date();

  let data = JSON.stringify({
    "from_name": process.env.FROMNAME,
    "has_video": false,
    "contact_value": "+14803594815",
    "contact_type": 2,
    "message": getPassword(),
    "read": 1,
    "message_direction": 2,
    "message_type": 1,
    "new": true,
    "date": event.toISOString()
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.textnow.com/api/users/' + process.env.APIUSERNAME + '/messages',
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0', 
      'Content-Type': 'application/json', 
      // Construct the Cookie header using the cookies in the cookieJar.
      'Cookie': Object.entries(cookieJar).map(([key, value]) => `${key}=${value}`).join('; ')
    },
    data: data
  };

  await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      // Check if there are Set-Cookie headers in the response.
      const setCookieHeaders = response.headers['set-cookie'];
      if (setCookieHeaders) {
        // Parse and store the cookies in the cookieJar object.
        setCookieHeaders.forEach((cookieHeader) => {
          const parts = cookieHeader.split(';')[0].split('=');
          if (parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            cookieJar[key] = value;
          }
        });
        saveCookiesToFile();
      }
    })
    .catch(async (error) => {
      console.log(error);
      await authenticate();
      main();
    });
}


async function main(){
    // Start the chain of requests.
    //await authenticate();
    await makeRequest();
}

main();
