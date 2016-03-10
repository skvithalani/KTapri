describe('Server startup', function(){
    'use strict';

    it('should call initServer', function(){

        spyOn(Ktapri, 'initServer');

        Meteor.startup(Ktapri.initServer);

        expect(Ktapri.initServer).toHaveBeenCalled();
    });

    it('should publish Notes', function(){

        spyOn(Meteor, 'publish');

        Meteor.startup(Ktapri.initServer);

        expect(Meteor.publish).toHaveBeenCalledWith('notes', findNotes);
    });

    it("should publish Users", function () {

        spyOn(Meteor, 'publish');

        Meteor.startup(Ktapri.initServer);

        expect(Meteor.publish).toHaveBeenCalledWith('users', findUsers);
    });

    describe("Init Server", function(){
        it("should call google Acount", function () {

            spyOn(Ktapri, "googleService");

            Ktapri.initServer();

            expect(Ktapri.googleService).toHaveBeenCalled();
        });

        describe("Google Account", function () {

            //TODO : sequence testing is remaining
            it("should remove existing service and then after insert new login service", function(){

                spyOn(Accounts.loginServiceConfiguration, "remove");
                spyOn(Accounts.loginServiceConfiguration, "insert");

                Ktapri.googleService();

                expect(Accounts.loginServiceConfiguration.remove).toHaveBeenCalled();
                expect(Accounts.loginServiceConfiguration.insert).toHaveBeenCalled();
            });

            it("should remove login service of google", function () {
                spyOn(Accounts.loginServiceConfiguration, "remove");
                spyOn(Accounts.loginServiceConfiguration, "insert");

                Ktapri.googleService();

                expect(Accounts.loginServiceConfiguration.remove).toHaveBeenCalledWith({
                    service : "google"
                });
            });

            it("should insert login service of google", function () {
                spyOn(Accounts.loginServiceConfiguration, "insert");

                Ktapri.googleService();

                expect(Accounts.loginServiceConfiguration.insert).toHaveBeenCalledWith({
                    service: "google",
                    clientId: "831385122179-l14bi8n1b4o373hj9s30f3vtkvf04ugb.apps.googleusercontent.com",
                    secret: "iSM-XeeJA701vgfux83cvk3K"
                });
            });
        });
    });
});

describe('Meteor', function(){

    it("should have MAIL_URL set prior to sending mail", function(){
        expect(process.env['MAIL_URL']).toEqual("smtp://postmaster%40sandboxf349aae2b96c4e78883bc7901159ce09.mailgun.org:48bd6b51eb8d00bc701381d66c53068e@smtp.mailgun.org:587");
    });

    it("should have method named sendEmail", function(){
       spyOn(Email, "send");

       Meteor.call("sendEmail","TO", "SUBJECT");

       expect(Email.send).toHaveBeenCalled();
   });

    describe("sendEmail",function(){

        beforeEach(function () {
            spyOn(Email, "send");
        });

        it("should have FROM set to KnowledgeTapri", function(){
            Meteor.call("sendEmail","TO", "SUBJECT");
            expect(Email.send.calls.mostRecent().args[0].from).toBe("KnowledgeTapri@thoughtworks.com");
        });

        it("should not execute when TO and SUBJECT are undefined", function () {
            Meteor.call("sendEmail");
            expect(Email.send).not.toHaveBeenCalled();
        });

        it("should not execute when TO and SUBJECT are blank", function () {
            Meteor.call("sendEmail", "","");
            expect(Email.send).not.toHaveBeenCalled();
        });

        it("should not execute when TO is Blank and SUBJECT is not blank", function () {
            Meteor.call("sendEmail", "","SUBJECT");
            expect(Email.send).not.toHaveBeenCalled();
        });

        it("should not execute when TO is not blank and SUBJECT is blank", function () {
            Meteor.call("sendEmail", "TO","");
            expect(Email.send).not.toHaveBeenCalled();
        });
    });

});