const https = require('https');

var options = {
    "method": "GET",
    "hostname": "https://fastfood-bcdf.restdb.io",
    "path": "/rest/historicopedidos",
    "port": 443,
    "headers": {
      "Content-Type": "application/json",
      "x-apikey": "0c2f01f333e839d11899d3992927f98df0a84",
      "Cache-Control": "no-cache"
    }
};

https.get(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON
            console.log(json);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});