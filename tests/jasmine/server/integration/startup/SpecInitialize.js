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
});

describe("Init Server", function(){
    it("should call google Acount", function () {

        spyOn(Ktapri, "googleService");

        Ktapri.initServer();

        expect(Ktapri.googleService).toHaveBeenCalled();
    });
});