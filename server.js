require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const excel = require('exceljs');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Contact form submission route
app.post('/submit-contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    console.log('Received form data:', req.body);

    // Define the path to the Excel file
    const filePath = path.join(__dirname, 'contacts.xlsx');
    const workbook = new excel.Workbook();
    let worksheet;

    try {
        if (fs.existsSync(filePath)) {
            console.log('Excel file exists, reading file...');
            await workbook.xlsx.readFile(filePath);
            worksheet = workbook.getWorksheet('Contacts');
            if (!worksheet) {
                worksheet = workbook.addWorksheet('Contacts');
                worksheet.columns = [
                    { header: 'Name', key: 'name' },
                    { header: 'Email', key: 'email' },
                    { header: 'Message', key: 'message' }
                ];
            }
        } else {
            console.log('Excel file does not exist, creating a new file...');
            worksheet = workbook.addWorksheet('Contacts');
            worksheet.columns = [
                { header: 'Name', key: 'name' },
                { header: 'Email', key: 'email' },
                { header: 'Message', key: 'message' }
            ];
        }

        // Add new data
        worksheet.addRow({ name, email, message });
        console.log('Row added to the worksheet.');

        // Save the file
        await workbook.xlsx.writeFile(filePath);
        console.log('Data saved to Excel file.');

    } catch (error) {
        console.error('Error reading/writing Excel file:', error);
        return res.status(500).send('Error saving data to Excel.');
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Secure email
            pass: process.env.EMAIL_PASS  // Secure password (use App Password if 2FA is enabled)
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'smuthuviknesh@gmail.com',
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
