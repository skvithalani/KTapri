Ktapri.init = function(that, $meteor){
    that.notes = $meteor.collection(Notes);
    that.note = null;
    that.userId = Meteor.userId();
    that.user = Session.get("user");
    that.fromResponses = false;
    that.type = "learn";
};