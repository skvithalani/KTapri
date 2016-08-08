if (Meteor.isClient) {

    Meteor.subscribe("notes");
    Meteor.subscribe("users");

    var app = angular.module('StickyApp', ['angular-meteor']);
    app.controller('StickyController', ['$meteor', function ($meteor) {

        Ktapri.init(this, $meteor);

        this.validateUser = function() {
            var that = this;
            if (!(Meteor.user() && that.userId)) {
                if(!that.isRedirectedTohome){
                    that.isRedirectedTohome = true;
                    window.location.reload("http://localhost:3000");
                }
            }
            else{
                that.isRedirectedTohome = false;
            }
        };

        this.submitNote = function () {
                this.validateUser();
                Meteor.call("submitNote", {
                    title: this.titleToAdd,
                    content: this.contentToAdd,
                    name: this.user.name,
                    ownerId: this.userId,
                    ownerEmail: this.user.email,
                    type: this.type,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    responses: new Array(),
                });

                Ktapri.prepareAndSendEmail({
                    "firstName": this.user.given_name,
                    "title": this.titleToAdd,
                    "fullName": this.user.name,
                    "content": this.contentToAdd,
                    "to": this.user.email,
                    "purpose": Ktapri.purposes.ADDNOTE,
                    "type": this.type
                });

                $('#addModal').modal('hide');
        };

        this.resetForm = function () {
            this.validateUser();
            this.titleToAdd = '';
            this.contentToAdd = '';
        };

        this.editNote = function (note) {
            this.validateUser();
            if (!this.fromResponses && Meteor.user() && this.userId && this.userId === note.ownerId) {
                this.titleToEdit = note.title;
                this.contentToEdit = note.content;
                this.noteId = note._id;
                $('#editModal').modal('show');
            }
            this.fromResponses = false;
        };

        this.saveNote = function () {
            this.validateUser();
            Meteor.call("updateNote",
                        {_id: this.noteId},
                        {
                            title: this.titleToEdit,
                            content: this.contentToEdit,
                            updatedAt: new Date()
                    });
        };

        this.deleteNote = function () {
            this.validateUser();
            Meteor.call("removeNote", {_id: this.noteId});
        };

        this.openAddResponseModal = function (note) {
            this.validateUser();
            this.responseToAdd = '';
            this.note = note;
            $('#addResponseModal').modal('show');
            this.fromResponses = true;
        };

        this.submitResponse = function (note) {
            this.validateUser();
            note = note || this.note;
            if (note.responses == null) {
                note.responses = new Array();
            }
            Meteor.call("addResponse", note, {
                respondedBy: this.user.name,
                response: this.responseToAdd,
                ownerId: this.userId,
                _id: Random.id(4),
                createdAt: new Date()
            });

            Ktapri.prepareAndSendEmail({
                "firstName": this.user.given_name,
                "title": note.title,
                "fullName": this.user.name,
                "content": this.responseToAdd,
                "to": note.ownerEmail,
                "purpose": Ktapri.purposes.ADDRESPONSE
            });

            this.expand = false;
        };

        this.editResponse = function (currentResponse) {
            this.validateUser();
            if (Meteor.user() && this.userId && this.userId === currentResponse.ownerId) {
                $('#Text_' + currentResponse._id).text(currentResponse.response);
                $('#Response_' + currentResponse._id).addClass('hide');
                $('#Edit_' + currentResponse._id).removeClass('hide');
                $('#Save_' + currentResponse._id).removeClass('hide');
                $('#Pencil_' + currentResponse._id).addClass('hide');
            }
        };

        this.saveResponse = function (currentResponse) {
            this.validateUser();
            currentResponse.response = $('#Text_' + currentResponse._id).val();
            currentResponse.updatedAt = new Date();
            displayResponses(currentResponse);
        };

        this.deleteResponse = function (note, currentResponse) {
            this.validateUser();
            if (Meteor.user() && this.userId && this.userId === currentResponse.ownerId) {
                var $indexOf = note.responses.indexOf(currentResponse);
                note.responses.splice($indexOf, 1);
            }
        };

        var displayResponses = function (currentResponse) {
            this.validateUser();
            $('#Response_' + currentResponse._id).removeClass('hide');
            $('#Edit_' + currentResponse._id).addClass('hide');
            $('#Save_' + currentResponse._id).addClass('hide');
            $('#Pencil_' + currentResponse._id).removeClass('hide');
        };

        this.seeResponses = function (note) {
            this.validateUser();
            var noteId = note._id;
            this.expand = false;
            this.responseToAdd = '';
            for(i = 0; i < note.responses.length; i++){
                displayResponses(note.responses[i]);
            }
            $('#response_for_' + noteId).modal('show');
            this.fromResponses = true;
        };

        this.addResponse = function () {
            this.validateUser();
            this.responseToAdd = '';
            this.expand = true
        };

        this.handleLogin = function (e, tmpl) {
            var that = this;
            var checkEmail = function () {
                var domain = new RegExp("@thoughtworks.com");
                var isThoughtworker = domain.test(Meteor.user().services.google.email);

                if (isThoughtworker) {
                    that.userId = Meteor.userId();
                    that.user = Meteor.user().services.google;
                    Session.setPersistent("user", that.user);
                }
                else {
                    alert("Please login with Thoughtworks account");
                }
            };

            Meteor.loginWithGoogle({
                requestPermissions: ['email', 'profile']
            }, function (err) {
                if (err) {
                    throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
                } else {
                    checkEmail();
                }
            });
        };

        this.handleLogout = function () {
            var that = this;
            Meteor.logout(function (err) {
                if (err) {
                    alert('Error while logging in');
                }
                else {
                    that.userId = null;
                    Session.setPersistent("user", null);
                }
            })
        };
    }]);
}
if(Meteor.isServer){

}


