import JWT from "jsonwebtoken";

// Protected routes token based
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        req.user = decode;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized : no token provided.");
        console.log(error);
    }
};

// Student access
export const isStudent = async (req, res, next) => {
    try {
        if (req.user.type !== "Student") {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Student middleware",
        });
    }
};

// Faculty access
export const isFaculty = async (req, res, next) => {
    try {
        if (req.user.type !== "Faculty") {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Faculty middleware",
        });
    }
};

// institute access
export const isInstitute = async (req, res, next) => {
    try {
        if (req.user.type !== "Institute") {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Institute middleware",
        });
    }
};
