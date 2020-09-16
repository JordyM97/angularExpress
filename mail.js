const nodemailer= require('nodemailer')
const mailgun= require('nodemailer-mailgun-transport')

const auth={
    auth:{
        api_key: '6e9691955f3404e5e599c6605b597c15-d5e69b0b-9730f622',
        domain:'sandbox2fce781d82604e588e1b02fcf95fbea9.mailgun.org'
    }
}
const transporter= nodemailer.createTransport(mailgun(auth));

const sendmail=(email,subject,text)=>{
    const mailOptions={
        from: email,
        to: 'Poplays2697@gmail.com',
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