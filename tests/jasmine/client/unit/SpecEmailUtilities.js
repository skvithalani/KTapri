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

        
    });
});