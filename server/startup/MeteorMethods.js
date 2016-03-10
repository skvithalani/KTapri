stripToNull = function(str){
    return str === "" ? null : str;
};

Meteor.methods({
    sendEmail: function (to, subject, html) {

        if(stripToNull(to) && stripToNull(subject)){

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