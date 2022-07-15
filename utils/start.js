const User = require("../models/User")
const bcrypt = require("bcryptjs")

// Utlility that creates the admin user for the first time when system database is created.
module.exports.configDB = async function(){
    let admin=await User.findOne({email:"admin"}).lean().exec()
    if(!admin){
        let hashedPassword = await bcrypt.hash("admin",parseInt(process.env.BCRYPT_SALT))
        await User.create({email:"admin",password:hashedPassword, role:"admin"})
    }
    return
};