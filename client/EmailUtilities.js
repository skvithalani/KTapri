var isDefined = function (argsArray) {
    var result = true;
    argsArray.forEach(function (arg) {
        if(!Ktapri.stripToNull(arg)) {
            result = false;
            return;
        }
    });

    return result;
};
var isPurposeAddNote = function (purpose) {
    return Ktapri.purposes.ADDNOTE == purpose;
};

var EOM = function (contentValue) {
    return (!contentValue ? " <EOM>" : "");
};

var subjectToAddNote = function(properties) {
    if(!isDefined([properties.firstName, properties.type, properties.title]))
        return null;
    return properties.firstName + " wants to " + properties.type + " - " + properties.title;
};

var subjectToAddResponse = function (properties, contentValue) {
    if(!isDefined([properties.firstName, properties.title]))
        return null;
    return properties.firstName + " has responded to your note - " + properties.title + EOM(contentValue);
};

Ktapri.purposes = {
    "ADDNOTE": "ADDNOTE",
    "ADDRESPONSE": "ADDRESPONSE"
};

Ktapri.content = function(fullName, content) {
    if(isDefined([fullName, content]))
        return "<p><strong>" + fullName + "</strong> says " + content + "</p>";
    return null;
};

Ktapri.subject = function(properties, contentValue) {
    if (isPurposeAddNote(properties.purpose))
        return subjectToAddNote(properties);
    return subjectToAddResponse(properties, contentValue);
};

Ktapri.prepareAndSendEmail = function (properties) {
    if(properties){
        var contentValue = Ktapri.content(properties.fullName, properties.content);
        Meteor.call('sendEmail',
                    properties.to,
                    Ktapri.subject(properties, contentValue),
                    contentValue);
    }
};