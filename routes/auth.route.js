const { Router } = require("express");
const router = Router();
const User = require("../models/User")
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post("/registration", 

 [ 
  check('email', 'Uncorrect email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({min: 6}),
],

async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid email or password.'
      })
    }

    const { email, password } = req.body;

    const isUsed = await User.findOne({ email })

    if(isUsed) {
        return res.status(300).json({ message: "Email already used."})
    }

    const hashedPassword = await bcrypt.hash(password,12)

    const user = new User({email,password, hashedPassword})

    await user.save()

    res.status(201).json({ message: "Registration successful"}) 

  } catch (err) {
    console.error(err);
  }
});
module.exports = router;


router.post("/login", 

 [ 
  check('email', 'Uncorrect email').isEmail(),
  check('password', 'Password must be at least 6 characters long').exists(),
],

async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid email or password.'
      })
    }

    const { email, password } = req.body;

    const user = await  User.findOne({ email: email })

    if (!user) { 
      return res.status(400).json({message: ' There is no such Email'})
    }

    const isMatch = bcrypt.compare(password,user.hashedPassword)

    if(!isMatch) {
      return res.status(400).json({message: ' Wrong password'})
    }

    const jwtSecret = 'g4ghjehrehrehrehrehrg3kjh545329802fjgkdlghfjkghj3wke'

    const token = jwt.sign(
     {userId: user.id}, 
      jwtSecret,
      {expiresIn: '1h'}
    )

    res.json({token,userId: user.id})



  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
