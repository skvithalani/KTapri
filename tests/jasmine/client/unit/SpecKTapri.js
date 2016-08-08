describe("KTapri", function(){
   beforeEach(module("StickyApp"));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        stickyCtrl = $controller('StickyController');
    }));

    it("should have notes defined", function(){
        expect(stickyCtrl.notes).toBeDefined();
    });

    it("should have note to be initalized as null", function () {
        expect(stickyCtrl.note).toBeNull();
    });

    it("should have userId initialized with Meteor's userId", function () {
        expect(stickyCtrl.userId).toBe(Meteor.userId());
    });

    it("should have user initialized with Session's user", function () {
        expect(stickyCtrl.user).toBe(Session.get("user"));
    });

    it("should have fromResponses initialized with False", function () {
        expect(stickyCtrl.fromResponses).toBe(false);
    });

    it("should have type initialized with learn", function () {
        expect(stickyCtrl.type).toBe("learn");
    });

    //describe("submitNote", function(){
    //    beforeEach(function () {
    //        stickyCtrl.user = {
    //            accessToken: "ya29.oQKBmiLcxhRN_Tc6LhDGx8ix6MMfLDb0IzrkiJl96x-WHVH2UfYwmRTlUup8ZgmYHQX2mQ",
    //            idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlY2U0NzZiYzdlMDdmYj…oJWDZmj6dHw_f9TKDkDpbvdstaoboAfB04p2lODX3P6eB38dA",
    //            expiresAt: 1457601935577,
    //            scope: Array[2],
    //            id: "112231583882692317429",
    //            email:"saloniv@thoughtworks.com",
    //            family_name:"Vithalani",
    //            given_name:"Saloni",
    //            locale:"en",
    //            name:"Saloni Vithalani",
    //            picture:"https://lh6.googleusercontent.com/-giOgvZeGN6s/AAAAAAAAAAI/AAAAAAAAABc/6xCzt-qNdeY/photo.jpg"
    //        };
    //        stickyCtrl.userId = stickyCtrl.user.id;
    //        stickyCtrl.titleToAdd = "title to add";
    //        stickyCtrl.contentToAdd = "content to add";
    //        stickyCtrl.type = "learn";
    //    });
    //
    //    it("should have pushed the note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push).toHaveBeenCalled();
    //    });
    //
    //    it("should have 'titleToAdd' of controller as title in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].title).toBe("title to add");
    //    });
    //
    //    it("should have 'contentToAdd' of controller as content in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].content).toBe("content to add");
    //    });
    //
    //    it("should have user's name as name in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].name).toBe(stickyCtrl.user.name);
    //    });
    //
    //    it("should have 'userId' of controller as ownerId in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].ownerId).toBe(stickyCtrl.userId);
    //    });
    //
    //    it("should have user's email as ownerEmail in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].ownerEmail).toBe(stickyCtrl.user.email);
    //    });
    //
    //    it("should have 'type' of controller as type in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].type).toBe(stickyCtrl.type);
    //    });
    //
    //    it("should have new Date as createdAt in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].createdAt).toEqual(jasmine.any(Date));
    //    });
    //
    //    it("should have new Date as updatedAt in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].updatedAt).toEqual(jasmine.any(Date));
    //    });
    //
    //    it("should have new Array as responses in submitting note", function () {
    //        spyOn(stickyCtrl.notes, "push");
    //        stickyCtrl.submitNote();
    //        expect(stickyCtrl.notes.push.calls.mostRecent().args[0].responses).toEqual(jasmine.any(Array));
    //    });
    //
    //    it("should have prepareAndSendEmail called while submitting note", function () {
    //        spyOn(Ktapri, "prepareAndSendEmail");
    //        stickyCtrl.submitNote();
    //        expect(Ktapri.prepareAndSendEmail).toHaveBeenCalled();
    //    });
    //
    //    describe("prepareAndSendEmail", function () {
    //       it("should have properties set", function () {
    //           spyOn(Ktapri, "prepareAndSendEmail");
    //           stickyCtrl.submitNote();
    //           var properties = Ktapri.prepareAndSendEmail.calls.mostRecent().args[0];
    //           expect(properties.firstName).toBe(stickyCtrl.user.given_name);
    //           expect(properties.title).toBe("title to add");
    //           expect(properties.fullName).toBe(stickyCtrl.user.name);
    //           expect(properties.content).toBe("content to add");
    //           expect(properties.to).toBe(stickyCtrl.user.email);
    //           expect(properties.purpose).toBe(Ktapri.purposes.ADDNOTE);
    //           expect(properties.type).toBe(stickyCtrl.type);
    //       }) ;
    //    });
    //
    //    describe("reset form", function () {
    //        it("should have reset the title and content of the form", function () {
    //            stickyCtrl.resetForm();
    //            expect(stickyCtrl.titleToAdd).toBe("");
    //            expect(stickyCtrl.contentToAdd).toBe("");
    //        });
    //    });
    //
    //});
    //describe("saveNote", function () {
    //
    //    beforeEach(function () {
    //        stickyCtrl.notes.find({title : "title to add"})
    //    });
    //
    //   it("should save the note", function () {
    //
    //   });
    //});
});