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

    it("should have learn defined", function(){
        expect(stickyCtrl.learn).toBeDefined();
    });

    it("should have share defined", function(){
        expect(stickyCtrl.share).toBeDefined();
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
});