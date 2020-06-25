const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        // console.log("Error in running the server : ", err);
        // alternative to the above code
        console.log(`Error in running the server : ${err}`);
        return;
    }
    else{
        console.log(`Server is running on port : ${port}`);
    }
});