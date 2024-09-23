const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 
exports.login = async (req, res) => { 
     
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '1h' };
      
        // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        // }); 
     
        jwt.sign(payload, secret, options, (err, jwtToken) => {
            if (err) throw err;
            res.json({
                jwtToken,
                loginStatus: 'success'
            });
        }); 
   
        // const jwtToken = jwt.sign(payload, secret, options);
        // res.json({
        //     JwtToken: jwtToken,
        //     loginStatus: 'success' 
        // }); 


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 
exports.getuser =  async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.logoutuser = async (req, res) => {
  const userId = req.user.id; 
  const token = req.header('x-auth-token');

  if (token) {
    const jwttoken =  token.split(' ')[1];   
    let allTokens = []
    const tokenIndex = allTokens.indexOf(jwttoken)

    if(tokenIndex !== -1 ){
        allTokens.splice(tokenIndex, 1)
        res.status(200).json('Logout Succesfully !');
    } else {
        res.status(400).json('Error !');
    }
 }
} 
 


  
exports.deleteuser = async (req, res) => {
    const userId = req.params.id;
    // const userId = req.user.id;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            error: 'JWT_SECRET environment variable is not defined',
            loginStatus: 'failed'
        });
    }

    try {
        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete( req.params.id )
     //   const deletedUser = await User.findOneAndDelete({ id: userId }); 

        if (!deletedUser) {
            return res.status(404).json({
                error: 'User not found', 
                loginStatus: 'failed'
            });
        }

        // Define payload for JWT
        const payload = {
            message: 'User deleted successfully'
        };

        // Generate JWT token
        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, jwtToken) => {
            if (err) {
                console.error('Error generating JWT:', err);
                return res.status(500).json({
                    error: 'Failed to generate token',
                    loginStatus: 'failed'
                });
            }
            res.json({
                jwtToken,
                loginStatus: 'success'
            });
        });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({
            error: 'Internal server error',
            loginStatus: 'failed'
        });
    }
};
  