import nodemailer from 'nodemailer';
import { template } from './emailTemplate.js';

export const sendMail = async (name, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Reachoutpro.ai@gmail.com',
      pass: 'nksguyptztdywcti',
    },
  });

  const mailOptions = {
    from: 'Reachoutpro.ai@gmail.com',
    to: email,
    subject: `${name} - Confirmation of Borrow Request Approval`,
    html: template,
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (error) {
    console.log('Something went wrong while sending mail', error);
  }
};
