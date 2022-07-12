const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { url } = require("inspector")
const { response } = require("express")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
        // res.send("wow")
})

app.post("/", function(req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    // console.log(firstName, lastName, email)
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us20.api.mailchimp.com/3.0/lists/849cf3e275"
        // const url = " https://usX.api.mailchimp.com/3.0/lists"

    const Option = {
        method: "POST",
        auth: "subhashis:48b1cc5c4bc9df757ca6854f4f1d4c77-us20"
    }

    const request = https.request(url, Option, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

//process.env.PORT ==> this is a dinamic port
app.listen(process.env.PORT || 3000, function() {
    console.log("Server runing on port 3000")
})

// API key 
// 48b1cc5c4bc9df757ca6854f4f1d4c77-us20

// list id or audience id
// 849cf3e275