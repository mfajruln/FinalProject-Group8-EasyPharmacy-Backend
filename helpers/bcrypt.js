const bcrypt = require('bcrypt');

function hashPassword(userPassword) {
    const saltRounds = +process.env.SALT_ROUND;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

function comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}