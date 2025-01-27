const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const excel = require('exceljs');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Contact form submission route
app.post('/submit-contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Define the path to the Excel file
    const filePath = path.join(__dirname, 'contacts.xlsx');
    const workbook = new excel.Workbook();

    // Ensure the file exists and read/write appropriately
    try {
        if (fs.existsSync(filePath)) {
            console.log('Excel file exists, reading file...');
            await workbook.xlsx.readFile(filePath);
            const worksheet = workbook.getWorksheet('Contacts');
            console.log('Worksheet loaded successfully.');
        } else {
            console.log('Excel file does not exist, creating a new file...');
            const worksheet = workbook.addWorksheet('Contacts');
            worksheet.columns = [
                { header: 'Name', key: 'name' },
                { header: 'Email', key: 'email' },
                { header: 'Message', key: 'message' }
            ];
        }

        // Add the new row to the worksheet
        workbook.getWorksheet('Contacts').addRow([name, email, message]);
        console.log('Row added to the worksheet.');

        // Save the file
        await workbook.xlsx.writeFile(filePath);
        console.log('Data saved to Excel file.');

    } catch (error) {
        console.error('Error reading/writing Excel file:', error);
        return res.status(500).send('Error saving data to Excel.');
    }

    // Send email notification to your email (aitester2005@gmail.com)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smuthuviknesh2@gmail.com',
            pass: 'uhgm dsgh fxrx spwm ' // Use app password if 2FA is enabled
        }
    });

    const mailOptions = {
        from: 'smuthuviknesh2@gmail.com',
        to: 'smuthuviknesh@gmail.com', // Send email to your address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.send('Your message has been received!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
