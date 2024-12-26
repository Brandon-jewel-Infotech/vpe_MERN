const nodemailer = require('nodemailer');

const message = (`
    <h1>Welcome to Brandon Info Tech </h1>    
    `
)

const sendMail = async ()=>{
    // const transporter = nodemailer.createTransport({
    //     service:'smtp',
    //     auth:{
    //         user:'demo@brandon.co.in',
    //         pass:'qBa2Z#ff@s4G'
    //     }
    //     // auth:{
    //     //     user:'dummymail.vijay@gmail.com',
    //     //     pass:'mnivrnkemcewqzrh'
    //     // }
    // })

    const transporter = nodemailer.createTransport({
        service:'gmail',
        // host: "mail.brandon.co.in",
        // host: "dummymail.vijay@gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'demo@brandon.co.in',
          pass: 'qBa2Z#ff@s4G'
        }
      });

    const mailOptions = {
        // from:'demo@brandon.co.in',
        from:'dummymail.vijay@gmail.com',
        // to:'hr@brandon.co.in',
        // to:'hagoid04@gmail.com',
        // to:'dummymail.vijay@gmail.com',
        to:'vijaypmaurya786@gmail.com',
        subject: 'Welcome to VPE',
        text:'This is an email using nodemailer in nodejs',
        html: message,
    }

    try {
        const result  = await transporter.sendMail(mailOptions);
        console.log("Email send successfully");
    } catch (error) {
        console.log("Email send failed with error: " + error);
    }
    // console.log("Message sent: %s", info.messageId);

}

sendMail();