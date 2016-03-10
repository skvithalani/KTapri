Ktapri.googleService = function() {

    Accounts.loginServiceConfiguration.remove({
        service: "google"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "831385122179-l14bi8n1b4o373hj9s30f3vtkvf04ugb.apps.googleusercontent.com",
        secret: "iSM-XeeJA701vgfux83cvk3K"
    });
};