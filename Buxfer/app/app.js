var dialogs = require("ui/dialogs");
var application = require("application");
application.mainModule = "app/main-page";
application.start();

application.onUncaughtError = function (error) {
    dialogs.alert("Application error: " + error.name + "; " + error.message + "; " + error.nativeError);
};