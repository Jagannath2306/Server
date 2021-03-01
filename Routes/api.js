const express = require("express");
const router = express.Router();
// Json web token instance
const jwt = require('jsonwebtoken');

// imported Multer module here
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const User = require("../Models/user");
const Puma = require("../Models/Brands/puma");
const Levis = require("../Models/Brands/levis");
const Easybuy = require("../Models/Brands/easybuy");
const Hm = require("../Models/Brands/hm");
const Trends = require("../Models/Brands/trends");
const Unlimited = require("../Models/Brands/unlimited");



router.get('/', (request, response) => {
    response.send("Response from api router!");
})


/////////////////////////////////////////////
// connecting to mongodb start 
const mongoose = require('mongoose');

const basePath = 'mongodb+srv://Jagannath:Baggage_1@cluster0-w8l56.mongodb.net/Baggage?retryWrites=true&w=majority'

mongoose.connect(basePath, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error) => {
    if (error) {
        console.log('Error! ' + error);
    } else {
        console.log("Connected to Mongodb");
    }
})
// connecting to mongodb end 
//////////////////////////////////////////////


//////////////////////////////////////////////
// verify bearer token start

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {

        return res.status(401).send("Unauthorization Request due to token not present");

    }
    let token = req.headers.authorization.split(" ")[1];

    if (token === "null") {
        return res.status(401).send("Unauthorization Request token is null");
    }

    let payload = jwt.verify(token, 'secretKey');

    if (!payload) {
        return res.status(401).send("Unauthorization Request payload not there");
    }
    req.userId = payload.subject
    next();
}

// verify bearer token end
//////////////////////////////////////////////



// Regestring multer start here

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});


var upload = multer(
    {
        storage: storage
    }
)

router.use('/profileImg', express.static('uploads'))


/////////////////////////////////////////////
// Register an user api start

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((error, registerUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = {
                subject: registerUser._id
            } // this id is an auto generater
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({
                token
            });
        }
    });
});

// Register an user api end
/////////////////////////////////////////////



////////////////////////////////////////////
//  Validate an user start (login) start

router.post('/login', (request, response) => {

    let userData = request.body;

    User.findOne({
        email: userData.email
    }, (error, user) => {

        if (error) {
            console.log(error);
        } else {
            if (!user) {
                response.status(401).send("Invalid Email id");
            } else {
                if (user.password !== userData.password) {
                    response.status(401).send("Invalid Password");
                } else {
                    let payload = {
                        subject: user._id
                    } // this id is an auto generater
                    let token = jwt.sign(payload, 'secretKey')
                    response.status(200).send({
                        token
                    });
                }
            }
        }
    })
});

//  Validate an user start (login) end
///////////////////////////////////////////////


//////////////////////////////////////////////
// Get Single user start
router.get('/singleUser', (req, res) => {
    let userData = req.query.email;
    User.findOne({
        email: userData
    }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send({
                user
            });

        }
    });

})
// Get Single user end
//////////////////////////////////////////////

// Update Single user start
router.put('/singleUserUpdate', (req, res) => {
    let userData = req.body;
    // console.log(userData)
    User.update({
        _id: userData._id
    }, {
        $set:
            userData
    }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send(
                { user }
            );

        }
    })

})

//////////////////////////////////////////////


// Update Single user end

/////////////////////////////////////////////
// Update Single user start

router.post('/uploadphoto', upload.single('profileImg'), (req, res) => {

    console.log(req.file)


    res.json({
        success: 1,
        "profile_url": `http://localhost:4000/profileImg/${req.file.filename}`
    })
    // var userData = req.file;
    // console.log(userData._id)

    // var img = fs.readFileSync(req.file.path);
    // var encode_image = img.toString('base64');

    // defining a json image

    // var finalImage = {
    //     connectType: req.file.mimetype,
    //     path: req.file.path,
    //     image: new Buffer(encode_image, 'base64')

    // }

    // const imagedetails = JSON.stringify(finalImage);
    // console.log(imagedetails)
    // User.update({
    //     _id: userData._id
    // }, {
    //     $set: {
    //         profileImg: imagedetails
    //     }

    // }, (error, user) => {
    //     if (error) {
    //         res.status(403).send(
    //             "Image upload failed"
    //         );
    //     }
    //     else {
    //         res.status(200).send(
    //             "image uploaded successfully"
    //         ).send({ user });

    //     }
    // })
})

// Update Single user end
/////////////////////////////////////////////


// Puma section start

router.post('/registerpuma', (request, response) => {
    let userData = request.body;

    let puma = new Puma(userData);

    puma.save((error) => {
        if (error) {
            console.log(error);
        } else {
            // let payload = {
            //     subject: registerUser._id
            // } // this id is an auto generater
            // let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/pumalist', (request, response) => {

    Puma.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

});
// Puma section end
///////////////////////////////////////////


//////////////////////////////////////////
// Levis section Start

router.post('/registerlevis', (request, response) => {
    let userData = request.body;

    let levis = new Levis(userData);

    levis.save((error) => {
        if (error) {
            console.log(error);
            // } else {
            //     let payload = {subject:registerUser._id} // this id is an auto generater
            //     let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/levislist', (request, response) => {

    Levis.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

})

// Levis section End
/////////////////////////////////////////


////////////////////////////////////////
// Easy buy section Start

router.post('/registereasybuy', (request, response) => {
    let userData = request.body;

    let easybuy = new Easybuy(userData);

    easybuy.save((error) => {
        if (error) {
            console.log(error);
        } else {
            // let payload = {
            //     subject: registerUser._id
            // } // this id is an auto generater
            // let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/easybuylist', (request, response) => {

    Easybuy.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

})

// Easy buy section End
/////////////////////////////////////////////

////////////////////////////////////////
// H & M  section Start

router.post('/registerhm', (request, response) => {
    let userData = request.body;

    let hm = new Hm(userData);

    hm.save((error) => {
        if (error) {
            console.log(error);
        } else {
            // let payload = {
            //     subject: registerUser._id
            // } // this id is an auto generater
            // let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/hmlist', (request, response) => {

    Hm.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

})

// H & M section End
/////////////////////////////////////////////

////////////////////////////////////////
// Trends section Start

router.post('/registertrends', (request, response) => {
    let userData = request.body;

    let trends = new Trends(userData);

    trends.save((error) => {
        if (error) {
            console.log(error);
        } else {
            // let payload = {
            //     subject: registerUser._id
            // } // this id is an auto generater
            // let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/trendslist', (request, response) => {

    Trends.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

})

// Trends section End
/////////////////////////////////////////////


////////////////////////////////////////
// Trends section Start

router.post('/registerunlimited', (request, response) => {
    let userData = request.body;

    let unlimited = new Unlimited(userData);

    unlimited.save((error) => {
        if (error) {
            console.log(error);
        } else {
            // let payload = {
            //     subject: registerUser._id
            // } // this id is an auto generater
            // let token = jwt.sign(payload, 'secretKey')
            response.status(200).send('data sumitted successfully');
        }
    });
});

// get request 

router.get('/unlimitedlist', (request, response) => {

    Unlimited.find((err, res) => {
        if (err) {
            console.log(err);
        } else {

            response.status(200).send(res);

        }
        response.end();

    });

})

// Trends section End
/////////////////////////////////////////////

// For add cart


router.put('/UserCart', (request, response) => {

    let userData = request.body;

   let data = userData[0];
   let self_user = userData[1];
    User.updateOne(
        {"email":self_user.email },{$push: { "cart": data }}, (error, user) => {

        if (error) {
            response.status(200).send("Something want wrong");
        } else {
            response.status(201).send("1 Row created");
        }
        response.end();
    })
});


// For add to cart

// Get Cart item 

router.post('/getUserCart', (request, response) => {

    let userData = request.body;

   // console.log(userData);

    User.find({"email":userData.email },(err, user) => {
        if (err) {
            console.log(err);
        } else {
            response.status(200).send(user);
        }
        response.end();
    });

})
// Get Cart item 

// Delete Cart item 

router.post('/deleteUserCart', (request, response) => {

    let userData = request.body;
    let data = userData[0];
    let self_user = userData[1];
    User.updateOne(
        {"email":self_user.email },{$pull: { cart:  data }}, (error, user) => {

        if (error) {
            response.status(200).send("Something want wrong");
        } else {
            response.status(201).send(user);
        }
        response.end();
    })
});

// Delete Cart item 
///////////////////////////////////////////
// Module ends here
module.exports = router;
