const validateTask = (req,res,next) => {
    const {title,description} = req.body;

    if(!title || !description){
        return res.status(400).send("Title and Description are required")
    }
    next();
}

module.exports  = {
    
    validateTask
} 