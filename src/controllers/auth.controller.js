var axios = require('axios');
const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, role, phone, address } = req.body;

    const user = new User(firstname.trim(), lastname.trim(), role, phone, address);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error message",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { phoneNumber, userRole } = req.body;
   
    User.findByEmail(phoneNumber.trim(), userRole, (err, data) => {
 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phone: data.phone,
                        address: data.address,
                    }
                });
                return;
            }
    }
    );

}

exports.sendOtp = async(req, res) => {
    const { phoneNumber } = req.body;

    var data = JSON.stringify({
        "identity": {
          "type": "number",
          "endpoint": `+91${phoneNumber}`
        },
        "method": "sms"
      });
      
      var config = {
        method: 'post',
        url: 'https://verification.api.sinch.com/verification/v1/verifications',
        headers: { 
          'Authorization': 'Basic N2VjMjg1N2UtYzhiNy00NTEwLWIzNjUtMzEyNzI3MmQ2ZDBlOnU1QlZUYkZoazBDSEkwK1JOc3JRSEE9PQ==', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);
      });
}