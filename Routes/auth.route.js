const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Router} = require("express");
const {AuthModel} = require("../model/auth.model")

const userController = Router();

userController.post("/signup",(req,res)=>{
    const {name,email,password,phone} = req.body;


    if(!name || !email || !password || !phone){
        res.status(400).send("Please fill all the fields")
    }

    bcrypt.hash(password, 10, async function(err, hash) {
     
        if(err){
            res.status(500).send(err)
        }

        const user = new AuthModel({
            name,
            email,
            password: hash,
            phone,
        })

        try {
            await user.save();
            res.status(201).send("Signup Successfull");
        } catch (error) {
            console.log(error);
            res.status(500).send("Signup Failed")
        }
    });


    userController.post("/login",async (req,res)=>{
        const{email,password}=req.body;

        const user = await AuthModel.findOne({email});

        if(!user){
            res.status(404).send("Invalid Credentials");
            return;
        }

        const hash = user.password;

        bcrypt.compare(password, hash, function(err, result) {
          if(err){
            res.status(500).send(err)
          }

          if(result){
            const token = jwt.sign({userID: user._id }, 'shhhhh');
            res.status(200).send({message: "Login Successful",token: token})
          }
          else{
            res.status(404).send("Invalid credentials")
          }
        }) 
    })
})

module.exports={
    userController
}