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