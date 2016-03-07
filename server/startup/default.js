Meteor.publish('notes', function () {
    return Notes.find();
});

Meteor.publish('learnNotes', function () {
    return Notes.find({type : 'learn'});
});

Meteor.publish('shareNotes', function () {
    return Notes.find({type : 'share'});
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.startup(function () {
    process.env['MAIL_URL'] = "smtp://postmaster%40sandboxf349aae2b96c4e78883bc7901159ce09.mailgun.org:48bd6b51eb8d00bc701381d66c53068e@smtp.mailgun.org:587";
    var FROM = "KnowledgeTapri@thoughtworks.com";
    var googleClientId = "831385122179-l14bi8n1b4o373hj9s30f3vtkvf04ugb.apps.googleusercontent.com";
    var googleSecretId = "iSM-XeeJA701vgfux83cvk3K";

    Accounts.loginServiceConfiguration.remove({
        service: "google"
    });

    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: googleClientId,
        secret: googleSecretId,
    });

    Meteor.methods({
        sendEmail: function (to, subject, html) {
            Email.send({
                to: to,
                from: FROM,
                subject: subject,
                html: html
            });
            console.log("mail sent");
        }
    });
});