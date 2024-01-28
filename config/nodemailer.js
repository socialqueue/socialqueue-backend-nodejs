import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    // secure: true,
    auth: {
        user: "bc582d0cae8480",
        pass: "64a5d713e9b698"
    },
});


export default transporter