import { Router} from 'express'
import { createUser, findUser } from "../services/user.service.js"
import md5 from "md5";

const router = Router()


router.post('/register', async (req, res) =>{
    
    const { username, password, firstName, lastName, age } = req.body

    const existUser = await findUser(username)

    if(existUser){
        res.status(400).json({
            message: `User with username ${username} already exists`
        })
    }else{

        const token = md5(username + ":" + password)

        const newUser = await createUser(username, password, firstName, lastName, age, token)

        res.status(201).json({
            message: 'User Created.',
            user: {
                username,
                token
            }
        })
    }
})







router.post('/login', async (req, res) =>{

    const { username, password } = req.body
    const existUser = await findUser(username)

    if(!existUser){
        res.status(400).json({
            message: `User with username ${username} not found.`
        })
    }else if(existUser.password !== password){
        res.status(400).json({
            message: 'Wrong username or password'
        })
    }else{
        res.status(201).json({
            message: 'Successful logged in',
            user: {
                username: existUser.username,
                token: existUser.token
            }
        })
    }
})

export default router