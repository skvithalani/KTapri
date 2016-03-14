var isDefined = function (content, fullName) {
    return Ktapri.stripToNull(content) && Ktapri.stripToNull(fullName);
};

var isPurposeAddNote = function (purpose) {
    return Ktapri.purposes.ADDNOTE == purpose;
};

var subjectToAddNote = function(properties) {
    return properties.firstName + " wants to " + properties.type + " - " + properties.title;
};

var EOM = function (contentValue) {
    return (!contentValue ? " <EOM>" : "");
};

var subjectToAddResponse = function (properties, contentValue) {
    return properties.firstName + " has responded to your note - " + properties.title + EOM(contentValue);
};

Ktapri.purposes = {
    "ADDNOTE": "ADDNOTE",
    "ADDRESPONSE": "ADDRESPONSE"
};

Ktapri.content = function(fullName, content) {
    if(isDefined(content, fullName))
        return "<p><strong>" + fullName + "</strong> says " + content + "</p>";
    return null;
};

Ktapri.subject = function(properties, contentValue) {
    if (isPurposeAddNote(properties.purpose))
        return subjectToAddNote(properties);
    return subjectToAddResponse(properties, contentValue);
};

Ktapri.prepareAndSendEmail = function (properties) {
    var contentValue = Ktapri.content(properties.fullName, properties.content);
    Meteor.call('sendEmail',
                properties.to,
                Ktapri.subject(properties, contentValue),
                contentValue);
};