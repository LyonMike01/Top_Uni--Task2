const express = require("express");
const morgan = require("morgan");
const {data} = require("./data");
const fs = require("fs");

const PORT = 3000;
const app = express();



app.use(morgan("dev")); //request for debugging
app.use(express.json()); // parse json bodies

app.use(express.urlencoded({extended:true}));


// ROUTES


// Getting all Data

app.get("/data" , function (req, res) {

    
    console.log("getting all data");

    // get all data from database

    res.json(data);
});


// GET Reuest

app.get("/data/:id" , function (req, res) {

    // Get ID from the params

    const theId = req.params.id;

    // Data that belomgs to the ID

    // const singleData = data.find(function ({id}) { id == theId});

    const singleData = data.find(({id}) => id == theId)
    
    // Check if data exist and rerurn data

    if(!singleData){

        console.log("Data not found");

        res.send("Data does not exist");
    } else{

        // console.log(singleData);

        res.json(singleData);
    
    }
});

// POST Request

app.post("/data", function (req, res) {


    const body = req.body;

    // Add body to database

    data.push(body);

    console.log(data);

    // send the all data to user

    res.json(data);

});

// Delete Request

app.delete("/data/:id", function (req, res) {


    // Get ID from the parameter

    const theId = req.params.id;

    // Check and Get Data if Data exist

    // const deleteData = data.find(function ({id}) {id == theId});

    const deleteData = data.find(({id}) => id == theId)


    if(!deleteData){

        console.log("Data not found");

        res.send("Data does not exist");

        return
    }

    // const dataDelete = data.filter(function (content) {content.id != theId});

    const dataDelete = data.filter(content => content.id != theId)


    //Return data to user

    res.json(dataDelete);
});


// PUT Request

app.put("/data/:id", function (req, res) {

    const body = req.body;

    // Get the data ID from params

    const theId = req.params.id;

    //Check if it exist and  get Data from Database 

    // const editData = data.find(function ({id}) { id == theId});

    const editData = data.find(({id}) => id == theId)


    if(!editData){

        console.log("Data not found");

        res.send("Data does not exist");
    } else{

        // Editing

        const dataCopy = [...data];

        // find index of item to be Edited

        // const targetData = data.findIndex(function (d) { d.id == theId});

        const targetData = data.findIndex(d => d.id == theId)


        console.log(targetData);

        // replace the array with request body

        data[targetData] = body;

        // return data to user

        res.json(data[targetData]);

    }

});




// ERROR

app.use(function (req, res)  {

    res.status(404).send("Error 404 Page Not Found");

        // console.log("Error 404"),

});

    //Listening Port


app.listen(PORT, function (){

//See the server has started

     console.log(`server running on port: ${PORT}`);

});