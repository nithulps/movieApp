const jwt=require("jsonwebtoken")

const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt middleware fn');
    try {
        const token=req.headers['authorization'].split(" ")[1]
        console.log(token);   
        if(token){
            jwtResponse=jwt.verify(token,process.env.JWT_SECRET)
            console.log(jwtResponse);
            req.payload=jwtResponse.userId
            next()
        }else{
            res.status(401).json("Please Login")
        }
    } catch(err)  {
        res.status(403).json("Invalid token")
    }
    
}

module.exports=jwtMiddleware
// const jwt = require("jsonwebtoken");

// const jwtMiddleware = (req, res, next) => {
//     console.log('Inside JWT middleware function');
//     try {
//         // Extract token from the Authorization header
//         const authHeader = req.headers['authorization'];
//         if (!authHeader) {
//             return res.status(401).json({ error: "Authorization header is missing" });
//         }

//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ error: "Token is missing" });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decoded);

//         // Attach the user ID to the request object
//         req.payload = decoded.userId;
//         next();
//     } catch (err) {
//         console.error("Error verifying token:", err);
//         res.status(403).json({ error: "Invalid or expired token" });
//     }
// };

// module.exports = jwtMiddleware;
