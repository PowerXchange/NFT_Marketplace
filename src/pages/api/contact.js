import nodemailer from "nodemailer";

export default async (req, res) => {
    const { name, email, reportedNFT, reportMessage } = req.body;
    console.log("-----------------------------");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // TODO: check this
        auth: {
            user: "humans.reporter@gmail.com",
            pass: "jsasbmshvelepzsv",
        },
    });

    const mailDetails = {
        from: email,
        to: "support@humans.ai",
        subject: `[NFT Marketplace] Item report from ${name}`,
        html: `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p><br>
    <p><strong>Reported NFT:</strong> ${reportedNFT}</p>
    <p><strong>Report message:</strong> ${reportMessage}</p>`,
    };

    try {
        const emailResponse = await transporter.sendMail(mailDetails);
        // eslint-disable-next-line no-console
        console.log("Report sent", emailResponse.messageId);
        res.status(200).json(req.body);
        // eslint-disable-next-line no-console
        console.log("email sent: ", req.body);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
    // eslint-disable-next-line max-len
    // transporter.sendMail(mailDetails, function (error, info) { // this works but not on vercel/netlify
    //     if (error) {
    //         console.log(error);
    //     }
    //     else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })
};
