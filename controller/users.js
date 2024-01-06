const bcrypt = require('bcrypt');
const User = require('../models/user');
const userRouter = require('express').Router();
userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    try {

        const users = await User.findOne({ username: username});

        if (users){
         return res.json({message: 'User already exists'})
        } 
       
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await user.save();

        res.json(savedUser);
    } catch (error) {

        console.error('Error in user registration:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// userRouter.get('/', async (req, res) => {
//     const{username, password} = req.body;

//       try {
//         const user = await User.findOne({ username, password});
//          res.json(user);
//       } catch (err) {
//         console.error('Error in user registration:', err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
// })


module.exports=userRouter;

