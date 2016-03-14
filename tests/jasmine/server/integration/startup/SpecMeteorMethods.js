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

        it("should execute when TO and SUBJECT are defined and HTML is not defined", function () {
           Meteor.call("sendEmail", "TO", "SUBJECT");
            expect(Email.send).toHaveBeenCalled();
        });

        it("should execute when TO, SUBJECT are defined and HTML is defined", function () {
           Meteor.call("sendEmail", "TO", "SUBJECT", "HTML");
            expect(Email.send).toHaveBeenCalled();
        });

        it("should have TO set to TO_VALUE when TO_VALUE is passed as arg 1", function () {
           Meteor.call("sendEmail", "TO_VALUE", "SUBJECT", "HTML");
            expect(Email.send.calls.mostRecent().args[0].to).toBe("TO_VALUE");
        });

        it("should have SUBJECT set to SUBJECT_VALUE when SUBJECT_VALUE is passed as arg 2", function () {
           Meteor.call("sendEmail", "TO", "SUBJECT_VALUE", "HTML");
            expect(Email.send.calls.mostRecent().args[0].subject).toBe("SUBJECT_VALUE");
        });

        it("should have HTML set to HTML_VALUE when HTML_VALUE is passed as arg 3", function () {
           Meteor.call("sendEmail", "TO", "SUBJECT", "HTML_VALUE");
            expect(Email.send.calls.mostRecent().args[0].html).toBe("HTML_VALUE");
        });
    });

});