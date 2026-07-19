// import jwt from 'jsonwebtoken'

// const protect = async (req, res, next) => {
//     console.log("=== AUTH MIDDLEWARE ===")
//     console.log("Headers:", req.headers)
//     console.log("Authorization:", req.headers.authorization)
//     console.log("JWT_SECRET:", process.env.JWT_SECRET)
    
//     const token = req.headers.authorization;
//     if(!token) {
//         return res.status(401).json({message: "Unauthorized, no token provided"})
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.userId = decoded.userId;
//         next();
//     }catch (error) {
//           return res.status(401).json({message: "Unauthorized, no token provided"})
//     }
// }

// export default protect;

import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {


    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, no token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //console.log("Decoded Token:", decoded);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error("JWT ERROR:", error);

        return res.status(401).json({
            message: error.message,
        });
    }
};

export default protect;