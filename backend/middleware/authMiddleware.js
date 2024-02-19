const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    //protected route authentication

    router.get("/protected", async(req, res) => {
        try{
            const userId = req.user.id;

            const user = await User.findById(userId);
            if(!user){
                return res.status(404).json({error: "User not found"});
            }

            res.status(200).json({user});
        }catch(error){
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    })
}

module.exports = authMiddleware