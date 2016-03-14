Ktapri.initCollections = function(that, $meteor) {

    that.notes = $meteor.collection(Notes);

    that.learn = $meteor.collection(function () {
        return Notes.find({type: 'learn'});
    });

    that.share = $meteor.collection(function () {
        return Notes.find({type: 'share'});
    });
};

Ktapri.initState = function(that){
    that.note = null;
    that.userId = Meteor.userId();
    that.user = Session.get("user");
    that.fromResponses = false;
};

Ktapri.init = function(that, $meteor){
    Ktapri.initCollections(that, $meteor);
    Ktapri.initState(that);
};