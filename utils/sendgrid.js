const sendgridMail = require("@sendgrid/mail")
const ejs = require("ejs")


// Utility function that uses the Sendgrid API to send emails to the user based on use case
// NOT IN USE requires API key

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async(emailInfo) =>{
    if (emailInfo){
        console.log("Initiated send mail")
        let html = await ejs.renderFile("../views/mail/verificationMail")
    
        const msg ={
            to: emailInfo.recipientEmail,
            from: 'it2@excelresidential.com',
            subject: 'Welcome to Excel Application Portal!',
            text : 'Lorem ipsum',
            html
        }

        try{
            await sendgridMail.send(msg)
            return true
        }catch(error){
            // Throw app error
            return false
        }
    
    }else{
        return next(new AppError("Email details not found"))
    }
}