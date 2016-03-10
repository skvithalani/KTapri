findNotes = function () {
    return Notes.find();
};

findUsers = function () {
    return Meteor.users.find();
};

Ktapri.initServer = function () {
    process.env['MAIL_URL'] = "smtp://postmaster%40sandboxf349aae2b96c4e78883bc7901159ce09.mailgun.org:48bd6b51eb8d00bc701381d66c53068e@smtp.mailgun.org:587";
    Meteor.publish('notes', findNotes);
    Meteor.publish('users', findUsers);
    Ktapri.googleService();
};


Meteor.startup(Ktapri.initServer);
