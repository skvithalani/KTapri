if (Meteor.isClient) {

    Meteor.subscribe("notes");
    Meteor.subscribe("users");

    angular.module('StickyApp', ['angular-meteor']);
    angular.module('StickyApp').controller('StickyController', ['$meteor', function ($meteor) {

        Ktapri.init(this, $meteor);

        this.submitNote = function () {

            var fullName = this.user.name;
            var ownerEmail = this.user.email;
            this.notes.push({
                title: this.titleToAdd,
                content: this.contentToAdd,
                name: fullName,
                createdAt: new Date(),
                updatedAt: new Date(),
                responses: new Array(),
                ownerId: this.userId,
                ownerEmail: ownerEmail,
                type: this.type
            });

            Ktapri.prepareAndSendEmail({
                "firstName": this.user.given_name,
                "title": this.titleToAdd,
                "fullName": fullName,
                "content": this.contentToAdd,
                "to": ownerEmail,
                "purpose": Ktapri.purposes.ADDNOTE,
                "type": this.type
            });

            this.resetForm();
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
            $updateNote = {
                _id: this.noteId,
                title: this.titleToEdit,
                content: this.contentToEdit,
                updatedAt: new Date()
            };
            this.notes.save($updateNote);
        };

        this.deleteNote = function () {
            $deleteNote = {
                _id: this.noteId
            };
            this.notes.remove($deleteNote);
        };

        this.openAddResponseModal = function (note) {
            if (this.userId) {
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
            var respondedByName = this.user.name;
            note.responses.push({
                respondedBy: respondedByName,
                response: this.responseToAdd,
                ownerId: this.userId,
                _id: Random.id(4),
                createdAt: new Date()
            });

            Ktapri.prepareAndSendEmail({
                "firstName": this.user.given_name,
                "title": note.title,
                "fullName": respondedByName,
                "content": this.responseToAdd,
                "to": note.ownerEmail,
                "purpose": Ktapri.purposes.ADDRESPONSE
            });

            this.resetResponseForm();

            this.expand = false;
        };

        this.resetResponseForm = function () {
            this.responseToAdd = '';
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


