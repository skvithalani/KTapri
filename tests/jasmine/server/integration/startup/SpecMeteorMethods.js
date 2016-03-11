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