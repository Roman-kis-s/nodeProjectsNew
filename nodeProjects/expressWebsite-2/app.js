const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('get root');
    res.render('index', {title : 'Computer don`t working?'});
});
app.get('/about', (req, res) => {
    res.render('about.jade');
});
app.get('/contact', (req, res) => {
    res.render('contact.jade');
});
app.post('/contact/send', (req, res) => {
    const transporter = nodeMailer.createTransport({
        service : 'Gmail',
        auth : {
            user : 'morientesjob@gmail.com',
            pass : '***'
        }
    });
    const mailOptions = {
        from : 'Roman Kis <morientesjob@gmail.com>',
        to : 'roman.kis.main@gmail.com',
        subject : 'Website submission',
        text : 'You have submission with the following details... Name: ' +
                                        req.body.name + 'Email: ' +
                                        req.body.email +
                                        req.body.message,
        html : '<p>You have submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' +req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.redirect('/');
        }else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

