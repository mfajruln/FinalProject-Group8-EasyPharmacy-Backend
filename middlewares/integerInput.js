function checkInteger(inputInt) {
    if (!inputInt || inputInt < 1 || !Number.isInteger(inputInt)) {
        const result = {
            status: 400,
            errMessage: "Bad Request."
        }

        return result;
    }

    // try {


    //     if (req.get("token")) {
    //         const token = req.get("token");
    //         const dataDecrypt = verifyToken(token)

    //         const data = await User.findOne({
    //             where: {
    //                 id: dataDecrypt.id
    //             }
    //         });

    //         if (data.roleUser === "user") {
    //             return next()
    //         } else {
    //             throw {
    //                 name: "403",
    //                 errMessage: "User are not unauthorized"
    //             }
    //         }
    //     } else {
    //         throw {
    //             name: "500",
    //             errMessage: "Server Error."
    //         }
    //     }
    // } catch(error) {
    //     if (error.name === "403") {
    //         res.status(403).json({
    //             message: error.errMessage
    //         })
    //     } else {
    //         res.status(500).json({
    //             //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
    //             // message: error.errMessage
    //         })
    //     }
    // }
}

module.exports = checkInteger