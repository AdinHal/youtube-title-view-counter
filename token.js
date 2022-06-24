const {google} = require('googleapis');
// 
(async()=>{
    const client = new google.auth.OAuth2(
        // console.cloud.google.com -> Youtube Data API V3
        '', // OAuth Client ID
        '', // OAuth Client Secret
        'http://localhost' // Custom URI you put when creating new OAuth Client
    );

    const url = client.generateAuthUrl({
        access_type:'offline',
        scope:['https://www.googleapis.com/auth/youtube']
    });

    console.log(url)

    const {tokens} = await client.getToken(''); // part after localhost?code = YOUR_CODE_IS_HERE_TILL_&scope IN URL!!!

    console.log(tokens);
})();