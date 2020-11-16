# CodeDebugging

Code debugging built with NodeJs

1. Pertama-tama memperbaiki dibagian package.json dengan mengganti script `"start": "nodemon app.js"`. Untuk code kali ini saya menambahkan library nodemon agar untuk debuging menjadi lebih cepat.
2. Format file pada file yang sebelumnya yaitu `env` dirubah menjadi `.env`.
3. Memperbaiki folder config dengan index.js sebagai file menjadi:
```index.js
require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = {
    port: process.env.PORT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    oauthUrl: process.env.OAUTH_URL,
    apiUrl: process.env.API_URL,
}
// const envFound = dotenv.config();
console.log(config)

// if (envFound.error) {
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }t

module.exports = { config };
```
4. Memperbaiki file app.js menjadi: 
```app.js
const express = require("express");
const { redirectUri } = require("./src/services/authService");
const AuthCallbackService = require("./src/services/authCallbackService");

const { config } = require("./src/config/index");

const app = express();

app.get("/", (req, res) => {
  const auth = redirectUri();
  res.redirect(auth);
});

app.get("/oauth-github-callback", (req, res) => {
  return AuthCallbackService.callback(req, res);
});

app.listen(config.port);
console.log(`App listening on http://localhost:${config.port}`);
```
5. Memperbaiki file authService.js yang typo pada bagian `module.export` yang dirubah menjadi `module.exports` sehingga nanti file dapat diexports ke file app.js.
6. Memperbaiki file authCallbackService.js yang typo pada bagian `resp.data` menjadi `res.data` kemudian merubah baris tersebut ke arrow function yang benar karena sebelumnya salah menjadi: 
```authCallbackService.js
.then((res) => {
      console.log(res)
       return res.data["accessToken"]
  })
  ```
 7. Memperbaiki file UserFileService.js yang typo pada `module.export` yang dirubah menjadi `module.exports` sehingga nanti file dapat diexports ke file app.js.
 8. Aplikasi sudah diperbaiki dari error dan dapat berjalan akan tetapi tidak dapat dijalankan karena pada file .env tidak disertakan `CLIENT_ID,CLIENT_SECRET,OAUTH_URL,API_URL` sehingga tidak dapat mengambil data dari data tersebut.
