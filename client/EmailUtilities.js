Ktapri.purposes = {
    "ADDNOTE": "ADDNOTE",
    "ADDRESPONSE": "ADDRESPONSE"
};

Ktapri.content = function(fullName, content) {
    if(Ktapri.stripToNull(content) && Ktapri.stripToNull(fullName))
        return "<p><strong>" + fullName + "</strong> says " + content + "</p>";
    return null;
};

Ktapri.subject = function(contentValue, properties) {
    if (Ktapri.purposes.ADDNOTE == properties.purpose)
        return properties.firstName + " wants to " + properties.type + " - " + properties.title;
    return properties.firstName +" has responded to your note - " + properties.title + (contentValue ? "" : " <EOM>");
};

Ktapri.prepareAndSendEmail = function (properties) {
    var contentValue = Ktapri.content(properties.fullName, properties.content);
    Meteor.call('sendEmail', properties.to, Ktapri.subject(contentValue, properties), contentValue);
};