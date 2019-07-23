import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    const smtp = {
        username: 'novimar.net@gmail.com',
        password: 'XXXXXXXXX',
        server: 'smtp.gmail.com',
        port: 25,
    };

    process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp.username)}: ${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;
});
