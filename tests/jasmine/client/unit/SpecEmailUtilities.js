describe("Email Utilities", function () {

    it("should have purposes defined", function(){
        expect(Ktapri.purposes).toBeDefined();
    });

    it("should have purposes.ADDNOTE equal to ADDNOTE string", function () {
        expect(Ktapri.purposes.ADDNOTE).toEqual("ADDNOTE");
    });

    it("should have purposes.ADDRESPONSE equal to ADDRESPONSE string", function () {
        expect(Ktapri.purposes.ADDRESPONSE).toEqual("ADDRESPONSE");
    });

    describe("content", function(){

        it("should return null when content is null", function(){
            expect(Ktapri.content()).toBeNull();
        });

        it("should return null when content is blank", function(){
            expect(Ktapri.content(null,"")).toBeNull();
        });

        it("should return null when firstName is null and content is defined", function(){
            expect(Ktapri.content(null, "content")).toBeNull();
        });

        it("should return null when firstName is blank and content is defined", function(){
            expect(Ktapri.content("", "content")).toBeNull();
        });

        it("should return content string when content and firstname are defined", function(){
           expect(Ktapri.content("Saloni Vithalani", "RTO Pune"))
               .toEqual("<p><strong>Saloni Vithalani</strong> says RTO Pune</p>");
        });
    });

    describe("subject", function () {
        it("should be null when purpose is passed null", function(){
           expect(Ktapri.subject({
               "purpose" : null
           })).toBeNull();
        });

        it("should be null when purpose is passed null", function(){
            expect(Ktapri.subject({
                "purpose" : null
            })).toBeNull();
        });

        it("should be null when firstName is passed null", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDNOTE,
                "firstName": null
            })).toBeNull();
        });

        it("should be null when firstName, type or title is passed null", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDNOTE,
                "firstName": null,
                "type": null,
                "title" : null
            })).toBeNull();
        });

        it("should be null when firstName or title is passed null and purpose is ADDRESPONSE", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDRESPONSE,
                "firstName": null,
                "title" : null
            })).toBeNull();
        });

        it("should be 'Saloni wants to learn - Spanish' when purpose is ADDRESPONSE, type is learn, firstName is Saloni and title is Spanish", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDNOTE,
                "firstName": "Saloni",
                "title" : "Spanish",
                "type" : "learn"
            })).toBe("Saloni wants to learn - Spanish");
        });

        it("should be 'Saloni wants to share - recipe' when purpose is ADDRESPONSE, type is share, firstName is Saloni and title is recipe", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDNOTE,
                "firstName": "Saloni",
                "title" : "recipe",
                "type" : "share"
            })).toBe("Saloni wants to share - recipe");
        });

        it("should be 'Saloni has reponded to your note - recipe <EOM>' when firstName is Saloni, title is recipe, purpose is ADDRESPONSE and contentValue as null", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDRESPONSE,
                "firstName": "Saloni",
                "title" : "recipe",
            })).toBe("Saloni has responded to your note - recipe <EOM>");
        });

        it("should be 'Saloni has reponded to your note - recipe' when firstName is Saloni, title is recipe, purpose is ADDRESPONSE and contentValue as content", function(){
            expect(Ktapri.subject({
                "purpose" : Ktapri.purposes.ADDRESPONSE,
                "firstName": "Saloni",
                "title" : "recipe",
            }, "content")).toBe("Saloni has responded to your note - recipe");
        });
    });

    describe("prepareAndSendEmail", function () {

        beforeEach(function () {
            spyOn(Meteor, "call");
        });

        it("should not call sendEmail when properties is undefined",function(){
            Ktapri.prepareAndSendEmail();
            expect(Meteor.call).not.toHaveBeenCalled();
        });

        it("should call sendEmail when properties is defined",function(){
            Ktapri.prepareAndSendEmail({});
            expect(Meteor.call).toHaveBeenCalledWith("sendEmail", undefined, null, null);
        });

        it("should call sendEmail with properties TO, subject and contentValue when proprties is passed", function () {

            var properties = {
                "firstName": "Saloni",
                "title": "recipe",
                "fullName": "Saloni Vithalani",
                "content": "content",
                "to": "TO",
                "purpose": Ktapri.purposes.ADDNOTE,
                "type": "learn"
            };

            var contentValue = Ktapri.content(properties.fullName, properties.content);
            var subject = Ktapri.subject(properties, contentValue);

            Ktapri.prepareAndSendEmail(properties);
            expect(Meteor.call).toHaveBeenCalledWith("sendEmail", properties.to, subject, contentValue);
        });
    });
});