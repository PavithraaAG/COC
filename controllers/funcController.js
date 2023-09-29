const UserDetailsModel = require("../models/UserDetailsModel")
const jwt = require("jsonwebtoken");
const secretKey = "some random string";


exports.reg = (req, res) => {
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const fullname = req.body.full_name
    const age = req.body.age
    const dob = req.body.dob
    const address = req.body.address
    const username = req.body.username
    const password = req.body.password
    const confirmedPassword = req.body.confirmedPassword
    UserDetailsModel
        .find({ username: username, password: password })
        .then((data) => {
            if (data.length > 0) {
                res.send("Already Registered")
            }
            else {
                if (password === confirmedPassword) {
                    UserDetailsModel.create({ first_name: firstname, last_name: lastname, full_name: fullname, address: address, age: age, dob: dob, username: username, password: password, confirm_Password: confirmedPassword })
                        .then((data) => {
                            console.log("inserted data: " + JSON.stringify(data));
                            res.send("Successfully Registered");
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    res.send("Invalid Confirmedpassword")
                }
            }
        })

}
exports.login = (req, res) => {
    const username = req.body.username;
    console.log(username)
    UserDetailsModel
        .find({ username })
        .then((data) => {
            if (data.length > 0) {
                console.log(data[0].id);
                const token = jwt.sign({ userId: data[0].id }, secretKey)
                res.json({ token })
            }
            else {
                res.status(401).json({ message: "Invalid username or password" })
            }
        })

}
exports.userDetails = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        const decodedToken = jwt.verify(token, secretKey)
        //   console.log(decodedToken)
        const userId = decodedToken.userId;
        UserDetailsModel
            .find({ _id: userId })
            .then((data) => {
                res.json({ data });
            })
    } else {
        res.status(401).json({ message: "Invalid username or password" })
    }
}


