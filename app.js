const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req , res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const LastName = req.body.LName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge: {
                    FNAME: firstName,
                    LNAME: LastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/931b02237b"

    const options = {
        method: "POST",
        auth: "AB_17:3ea02440a9f4fbe35a9bdd29d1541dd3-us17"

    }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        } else {
            res.sendFile(__dirname+"/failure.html")
        }

        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })


    request.write(jsonData);
    request.end()

})

app.post('/failure', function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running on port 3000!")
})



// ApI Key : 931b02237b
// 3ea02440a9f4fbe35a9bdd29d1541dd3-us17