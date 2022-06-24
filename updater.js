const axios = require('axios');
const qs = require('qs');

const CLIENT_ID = '' // Your client id from the client you create on OAuth Consent Screen;
const CLIENT_SECRET = ''; // Your client secret from the client you create on OAuth Consent Screen

const API_KEY = ''; // Your Api key that you copy from the Dashboard in cloud.google.com;
const REFRESH_TOKEN = ''; // Your refresh_token;

(async () => {
    // Request for obtaining an access token every 30-60 mins
    let res1 = await axios
    .post(
        'https://oauth2.googleapis.com/token',
        qs.stringify({
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'
        }),
        {
            auth: {
                username: CLIENT_ID,
                password: CLIENT_SECRET
            }
        }
    );

    const token = res1.data.access_token;
    
    // Get the video informations
    let res2 = await axios
    .get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
            params: {
                id: '_tsMcirrjfE',
                part: 'snippet, statistics',
                key: API_KEY
            }
        },
    );

    let data = res2.data.items[0];

    let {categoryId, title, description, tags} = data.snippet;
    let {viewCount} = data.statistics;

    // console.log(data)

    await axios
    .put(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet',
        {
            id:'_tsMcirrjfE',
            snippet:{
                categoryId,
                title: `juAnDeags | This video has ${viewCount} views`,
                description,
                tags,
            }
        },
        {
            headers: {
                authorization: 'Bearer ' + token
            }
        }
    );
})();