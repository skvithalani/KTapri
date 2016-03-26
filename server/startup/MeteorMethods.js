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
    },

    submitNote : function (note) {
        Notes.insert(note);
    },

    updateNote : function (identifier, set) {
        Notes.update(identifier, {$set : set});
    },

    removeNote : function(note){
        Notes.remove(note);
    },

    addResponse : function (note, response) {
        var responses  = Notes.find({_id : note._id}).fetch()[0].responses;
        responses.push(response);
        Notes.update({_id : note._id}, {$set : {responses : responses}});
    }

});