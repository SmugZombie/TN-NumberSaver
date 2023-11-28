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
        'Cookie': '_cfuvid=CUiaMckmj5rf3dkTDdRwzzQINRxyLvps_Tu7e7knl9k-1701206438980-0-604800000; _ga=GA1.1.73100176.1699298950; _ga_F10BQ5D103=GS1.1.1701204881.3.1.1701206292.37.0.0; _gcl_au=1.1.1190544429.1699298955; _px3=a6e588c417d56c7d951572f1cbe50aa13358c594c3b75c78354b3108579868db:VWvdNWoxLIg6m8S9A0+7mRX64y3yqArZkK1MOe8l4/Fg47Zy7GdhMNdxdGhSufcY6wtSO6It7snOGKTelJYFbQ==:1000:HC9KSag6hdZ3JDzpPlwfKfCM5FirIMvsKAD0zQxX98a7VcqMBduIv7EcGpDFWAsUeAfd9hTSnBwTUIlMHXb4fq8L455MO+lzKMnbKdGHRci/CD8+s0hLAMtcMJqhUHVmzSioRonmcHdRjgBjXgN8rWYV4vCFVcpTdkzp9Kqw8RudUuipv+NUfVTAiL8Fgpb+ixxkBysKmVii3Zu+fjKG/zNZrfF4gjCfbqDdYCD65gs=; _pxTestCookie=1; _pxde=f0a64afb56b3ec0a0e6492fb8e2e186c5d64bbc7fc96327b477b949450606679:eyJ0aW1lc3RhbXAiOjE3MDEyMDYzNjk2NjF9; _pxvid=d3750a21-7cd6-11ee-8c53-dfbb3db600df; _schn1=el3j; _scid=4c147aaa-d492-41eb-85d0-fffebd7dd14b; _scid_r=4c147aaa-d492-41eb-85d0-fffebd7dd14b; _sctr=1%7C1701154800000; _tt_enable_cookie=1; _ttp=Tl9irbvMlmia1itFoldgkYCwxMf; pxcts=5a9a53e2-8e30-11ee-9d00-98ed68cbc326; t-ip=1; tatari-session-cookie=aa7beb97-f0f3-a40a-6f12-9135eafbc10b; testTLD=test; FirehoseSession-messaging=true; PermissionPriming=1; XSRF-TOKEN=dQtU6CYM-eJocwYkhtttMTSDl5C6WXMxwa2s; __stripe_mid=3b0a6868-0a1a-4ea9-9f75-5e40138933e2f4466e; __stripe_sid=d40eb2c7-9448-4497-9614-16769e97bbeb0cc5bb; _csrf=s%3AgE9Gs3UwJsTVC5vABcAo64Y9.1tli%2Fda7n0YPIz9IDZ2HSkFCU8CucldHEb2YZmfNyUU; _dd=6a30337b-36a5-47d1-a7f5-5c4f62c1c989; _dd_l=1; _dd_s=id=6a30337b-36a5-47d1-a7f5-5c4f62c1c989&logs=1&expire=1701207311135&rum=0; _pxhd=Z0fl65zuTbzhgifG9J021gQcs3S8GtdYJHAuDR3veexVntipF16PYKu7Rum9PB8PKYEx7rkQoWyIWQl1WFXREw==:6l15n4auLLLG-mWjWSlPOf78-EHI0tKC3-8kIOeohf9/vIhh20wi9zNxp/ZEgWbbpS4CIzja4v6Vt9uJrgQapnKGksrEmv6GD5zcFEO-xqc=; connect.sid=s%3A1zB0rI-7MSk5eQOlMDISkExFBPZKWHE0.hV123Xtip6otIn8%2BRXI0COpVukVLcvTfT%2Byi4sh55zo; dd_cookie_test_653b441a-b7e8-4d65-95a6-241cf026e075=test; dd_cookie_test_78674790-aae1-43f2-9299-3a996c966a65=test; dd_cookie_test_a3292814-bb00-4561-b4ef-d8b49e7f1345=test; ff-account-limiting_globally-enabled-ronegli=60; ff-group-message-limit_max-recipients-ronegli=60; ff-text-now-pro_globally-enabled-ronegli=14; ff-text-now-pro_support-email-address-ronegli=32; ff-tmp_cancellation-updates_20230816-ronegli=31; g_state={"i_l":0}; language=en; nativeBannerHidden=true; puntCookie=true; tatari-cookie-test=26053206'
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
    url: 'https://www.textnow.com/api/users/ronegli/messages',
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
