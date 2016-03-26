if (Meteor.isClient) {

    Meteor.subscribe("notes");
    Meteor.subscribe("users");

    var app = angular.module('StickyApp', ['angular-meteor']);
    app.controller('StickyController', ['$meteor', function ($meteor) {

        Ktapri.init(this, $meteor);

        this.submitNote = function () {

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
            this.titleToAdd = '';
            this.contentToAdd = '';
        };

        this.editNote = function (note) {
            if (!this.fromResponses && this.userId && this.userId === note.ownerId) {
                this.titleToEdit = note.title;
                this.contentToEdit = note.content;
                this.noteId = note._id;
                $('#editModal').modal('show');
            }
            this.fromResponses = false;
        };

        this.saveNote = function () {
            Meteor.call("updateNote",
                        {_id: this.noteId},
                        {
                            title: this.titleToEdit,
                            content: this.contentToEdit,
                            updatedAt: new Date()
                    });
        };

        this.deleteNote = function () {
            Meteor.call("removeNote", {_id: this.noteId});
        };

        this.openAddResponseModal = function (note) {
            if (this.userId) {
                this.responseToAdd = '';
                this.note = note;
                $('#addResponseModal').modal('show');
                this.fromResponses = true;
            }
        };

        this.submitResponse = function (note) {
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
            if (this.userId && this.userId === currentResponse.ownerId) {
                $('#Text_' + currentResponse._id).text(currentResponse.response);
                $('#Response_' + currentResponse._id).addClass('hide');
                $('#Edit_' + currentResponse._id).removeClass('hide');
                $('#Save_' + currentResponse._id).removeClass('hide');
                $('#Pencil_' + currentResponse._id).addClass('hide');
            }
        };

        this.saveResponse = function (currentResponse) {
            currentResponse.response = $('#Text_' + currentResponse._id).val();
            currentResponse.updatedAt = new Date();
            $('#Response_' + currentResponse._id).removeClass('hide');
            $('#Edit_' + currentResponse._id).addClass('hide');
            $('#Save_' + currentResponse._id).addClass('hide');
            $('#Pencil_' + currentResponse._id).removeClass('hide')
        };

        this.deleteResponse = function (note, currentResponse) {
            if (this.userId && this.userId === currentResponse.ownerId) {
                var $indexOf = note.responses.indexOf(currentResponse);
                note.responses.splice($indexOf, 1);
            }
        };

        this.seeResponses = function (noteId) {
            this.expand = false;
            this.responseToAdd = '';
            $('#response_for_' + noteId).modal('show');
            this.fromResponses = true;
        };

        this.addResponse = function () {
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


