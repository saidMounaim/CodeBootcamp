import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
const SendEmail = async (options) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.SMTP_USERNAME, // generated ethereal user
			pass: process.env.SMTP_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"${process.env.FROM_EMAIL} " <${process.env.FROM_NAME}>`, // sender address
		to: options.email, // list of receivers
		subject: options.subject, // Subject line
		html: options.message, // plain text body
	});

	console.log('Message sent: %s', info.messageId);
};

export default SendEmail;
