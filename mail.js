const nodemailer= require('nodemailer')
const mailgun= require('nodemailer-mailgun-transport')

const auth={
    auth:{
        api_key: 'dfghklkjhgf',//key
        domain:'nmmnbvc'//dominio .org
    }
}
const transporter= nodemailer.createTransport(mailgun(auth));

const sendmail=(email,subject,text)=>{
    const mailOptions={
        from: email,
        to: 'kjhgfd',//correo
        subject: subject,
        text:text
    }
    transporter.sendMail(mailOptions, (err,data)=>{
        if (err) {
            res.send(err,null)
        } else {
            res.send(null,data)
        }
    })
}
module.exports =sendmail;