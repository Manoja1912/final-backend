const jwt= require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({
            error: "Please Login first"
        });
    }

    const token = header.split(' ')[1];
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch (error) {
        res.status(401).json({
            error:"Invalid or Expired Token"
        });
    }
}