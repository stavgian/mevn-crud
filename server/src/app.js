const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MEVN-crud');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Post = require("../models/post");
app.get('/posts', (req, res) => {
    Post.find({}, 'title short_title description', function (error, posts) {
        if (error) { console.error(error); }
        res.send({
              posts: posts
          })
      }).sort({_id:-1})
  })

  app.post('/posts', (req, res) => {
	let new_post = new Post({
		title: req.body.title,
		short_title : req.body.short_title,
		description: req.body.description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title short_title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.short_title = req.body.short_title
	  post.save(function (error) {
			if (error) {
				console.log(error)
            }
            
            console.log(post)
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title short_title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})


const User = require('../models/User.js');

  // register a user
  app.post('/users/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        name,
        email,
        password,
      });
      User.createUser(newUser, (error, user) => {
        if (error) { console.log(error); }
        res.send({ user });
      });
	});
	

	// login a user
  app.post('/users/login', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      User.getUserByEmail(email, (err, user) => {
        if (!user) {
          res.status(404).json({ message: 'The user does not exist!' });
        } else {
          User.comparePassword(password, user.password, (error, isMatch) =>
{
            if (error) throw error;
            if (isMatch) {
              const payload = { id: user.id };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ message: 'ok', token });
            } else {
              res.status(401).json({ message: 'The password is incorrect!'
});
            }
          });
        }
      });
    }
  });
  
  app.listen(process.env.PORT || 8081)
  