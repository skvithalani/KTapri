Meteor.methods({
    sendEmail: function (to, subject, html) {

        if(Ktapri.stripToNull(to) && Ktapri.stripToNull(subject)){

            Email.send({
                to: to,
                from: "KnowledgeTapri@thoughtworks.com",
                subject: subject,
                html: html
            });

            console.log("mail sent for " + subject);
        }
    }
});