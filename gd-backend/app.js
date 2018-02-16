var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
const crypto = require('crypto')
var sequelize = require('sequelize');
const Op = sequelize.Op
const fs = require('fs');



var app = express();

var Tag = require('./models').Tag
var User = require('./models').User;
var Activity = require('./models').Activity;
var Tags = require('./models').Tag;
var ActivityTag = require('./models').ActivityTag;
var Location = require('./models').Location;

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,}));
app.use(validator());
app.use(cors());

// authorization token
const authorization = (req, res, next) => {
    const token = req.query.authToken || req.body.authToken;
    if (token) {
        User.findOne({
            where: {
                authToken: token
            }
        }).then((user) => {
            if (user) {
                req.currentUser = user
                next()
            } else {
                res.status(401)
                res.json({message: 'Authorization Token Invalid'})
            }
        })
    } else {
        res.status(401)
        res.json({message: 'Authorization Token Required'})
    }
}
// homepage
app.get('/', (req, res) => {
    res.json({message: 'API example app'});
});

// displays respective route  w/ raw json from database onto page
app.get('/activities', (req, res) => {
    Activity.findAll().then(activities => {
        res.json({activities: activities});
    });
});

app.get('/tags', (req, res) => {
    Tags.findAll().then((tags) => {
        res.json({tags: tags})
    })
})

app.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json({users: users})
    })
})

app.get('/locations', (req, res) => {
    Location.findAll().then(locations => {
        res.json({locations: locations})
    })
})

// displays specific activity by ID
app.get('/activities/:id', (req, res) => {
    let id = parseInt(req.params.id);

    Activity.findById(id).then(activity => {
        res.json({activity: activity});
    });
});


// logic for browse page generation ALL ACTIVITY IDs BY TAG
app.post('/', (req, res) => {
  tags = req.body.tags
  let tagArr = []
  for (var property in tags) {

      tags[property] === true
          ? tagArr.push(parseInt(property))
          : ''
  }
  // console.log('tagArr',tagArr);


  Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId"  WHERE "TagId" IN (${tagArr});`, {type: sequelize.QueryTypes.SELECT})
  .then(shuffle => {
    let browseTags = []
    for (var i = 0; i < shuffle.length; i++) {
      browseTags.push(shuffle[i].id)
    }
    // console.log(browseTags);
    res.json({browseTags: browseTags})
  })
  // .then(activity => {
  //   console.log("activity",activity);
  // })
});

// logic for random generator
app.post('/', (req, res) => {
  tags = req.body.tags
  let tagArr = []
  for (var property in tags) {

      tags[property] === true
          ? tagArr.push(parseInt(property))
          : ''
  }


  Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId"  WHERE "TagId" IN (${tagArr});`, {type: sequelize.QueryTypes.SELECT})
  .then(shuffle => {
    // console.log(shuffle[0]);
    // console.log('id',shuffle[0].id);
    let randomTag = shuffle[Math.floor(Math.random() * shuffle.length)].id
    // console.log('random',randomTag);
    res.status(201)
    res.json({randomTag: randomTag})
  })
});


//







//})
//
// Random App Generator
// app.post('/shuffle', (req, res) => {
//   Tags.findAll().then(tags => {
//     res.json({tags:tags})
//   }).then((tags)=> {
//     console.log(tags);
//   })
// })
//
//   //
//   // console.log(tags);
//   //
//   for (var property in tags) {
//       let val = {
//           property
//       }
//       // Checks if a tag is checked or not
//       tags[property] === true
//           ? tagArr.push(val)
//           : ''
//   }
//   Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId"  WHERE "TagId"= 1;`, {type: sequelize.QueryTypes.SELECT})
//
//   .then(activityTags => {
//       res.status(201);
//       //Returns ONE random activity that has the tags selected
      // random = Math.floor(Math.random() * activityTags.length)
      // console.log(random);
      // res.json({activityTags: activityTags[random]})
//   })
// })
//
//     TAG CHECK BOX LOGIC
//
//
//
//     Run loop that runs query for each tag selected which will be ${} in the query
//
//     console.log(tags);
//
//     SQL Logic for finding all tags that have selected tags


//Creating New User   (Need Kevin and Dan to comment)

app.post('/users', (req, res) => {

    req.checkBody('firstName', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult().then(valErrors => {
        if (valErrors.isEmpty()) {
            User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password}).then(user => {
                res.json({message: 'success', user: user})
            })
        } else {
            // console.log(validationErrors.array())
            res.status(400)
            res.json({
                errors: {
                    validations: valErrors.array()
                }
            })
        }
    })
})

// post route for creating activities
app.post('/activities', (req, res) => {

    //sets up validation checks on all submit fields
    req.checkBody('title', 'is required').notEmpty()
    req.checkBody('description', 'is required').notEmpty()
    req.checkBody('location', 'is required').notEmpty()
    req.checkBody('cost', 'is required').notEmpty()
    // req.checkBody('tag','is required').notEmpty() --------               Need to
    // req.checkBody('imageFiles', 'is required').notEmpty() ---------   Figure these out

    // if there are no errors logged, then it allows the activity to be created
    req.getValidationResult().then((validationErrors) => {
        if (validationErrors.isEmpty()) {
            let fileContent = req.body.imageFiles[0]

            // hashing the image name to store with the activity (to avoid duplicate name problem)
            let hashedImageContent = crypto.createHash('md5').update(fileContent).digest('hex');
            console.log(hashedImageContent);
            //converting base64 string back into an image and saving to /user-uploads/ folder
            let images = req.body.imageFiles.map((image) => {

                const base64ToImage = require('base64-to-image');

                var path = './public/user-uploads/'
                var optionalObj = {
                    'fileName': hashedImageContent
                };

                base64ToImage(image, path, optionalObj)
            })

            Activity.create({
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                cost: req.body.cost,
                imageName: hashedImageContent,
            }).then((activity) => {
                res.status(201)
                res.json({activity: activity})
                //Takes the tag checkbox from our form
                tags = req.body.tags
                let tagArr = []
                //Pushes Id of newly made activity and any tag selected to an array to use for our ActivityTag Table
                for (var property in tags) {
                    let val = {
                        ActivityId: activity.id,
                        TagId: property,
                    }
                    // Checks if a tag is checked or not
                    tags[property] === true
                        ? tagArr.push(val)
                        : ''
                }
                // Takes the array with new ActivityId and selected TagId and pushes them to our join table (ActivityTag)
                ActivityTag.bulkCreate(tagArr).then(() => {
                    return ActivityTag.findAll();
                })
            })
        } else {
            res.status(400)
            res.json({
                errors: {
                    validations: validationErrors.array()
                }
            })
        }
    })
})



// login form
app.post('/sessions/new', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // console.log(req.body)

    if (email && password) {
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                let check = user.veryifyPassword(password)
                if (check) {
                    res.json({message: 'login success'})
                    // user.setAuthToken()
                } else {
                    res.json({message: 'Password Invalid'})
                }
            } else {
                res.status(401)
                res.json({message: 'Password Invalid'})
            }
        })
    } else {
        res.status(401)
        res.json({message: 'Email/Password Required'})
    }
})

// app.get('/activitysearch', (req, res) => {
//   let term = req.query.term
//   let location = req.query.location
//     client.search({
//       term: term,
//       location: location
//     }).then(res => {
//     res.jsonBody.businesses[0].name
//     })
// })

// put route for editing activities

// has this been worked on at all really? -JD 2/15/2018
app.put('/activities/edit/:id', (req, res) => {

    const {name, content} = req.params;
    let id = parseInt(req.params.id);

    Activity.findById(id).then(page => {
        Activity.update({
            title: title,
            description: description,
            location: location,
            cost: cost,
            tags: tags
        }, {
            where: {
                id: id
            }
        }).then(activity => {
            res.status(201);
            res.json({activity: activity});
        });
    });
});

// runs authorization check, responds with JSON to current user
app.get('/login', authorization, function(req, res) {
    res.json({user: request.currentUser})
})


module.exports = app
