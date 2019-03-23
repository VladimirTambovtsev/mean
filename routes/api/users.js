import express from 'express'

// Models
import User from '../../models/User'

const router = express.Router()



// @descr: signup
router.post('/signup', async (req, res) => {
    
    // @TODO: validate fields
    let errors = {}

    // Check unique email
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
        errors.email = 'Email have already exists'
        return res.status(400).json(errors)
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    await user.save()
    res.status(200).json(user)
})


// @descr: login
router.post('/login', async (req, res) => {
    const errors = {}
    const { email, password } = req.body

    // Check email
    const user = await User.findOne({ email })
    if (!user) {
        errors.email = 'Invalid Email or Password'
        return res.status(400).json(errors)
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (passwordsMatch) {
        const payload = {
            id: user.id,
            email: user.email
        }

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
            res.json({
                success: true,
                token: `Bearer ${token}`
            })
        })
    } else {
        errors.password = 'Invalid Email or Password'
        return res.status(400).json(errors)
    }

})



export default router;