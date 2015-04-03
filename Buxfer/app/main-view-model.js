//ntm modules
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var activityIndicatorModule = require("ui/activity-indicator");
var http = require("http");
var settings = require("local-settings");
//configuration file
var config = require("./config");
//the viewModel
var mainViewModel = new observable.Observable();

//reset the text fields
mainViewModel.set("username", "");
mainViewModel.set("password", "");
mainViewModel.set("isLoading", false);
mainViewModel.set("rememberMe", false);


//define the methods
mainViewModel.loginButtonClicked = function () {
    var that = mainViewModel;
    //show the progress bar
    that.set("isLoading", true);  
    //get the username and password
    var username = that.get("username");
    var password = that.get("password");  
    //send an http request and try to login
    var url = config.proxy + "login?userid=" + username + "&password=" + password;
    http.request({ url : url, method: "get" }).then(function(response) {
        var value = response.content.toJSON();
        
        if('error' in value){
            try{
                dialogs.alert(value.error.message);
                that.set("isLoading", false);
                return;
           }catch(e) { dialogs.alert(e); } 
        }
        //store the token for later useage.
        var token = value.response.token;
        settings.setString("token", token);
        //hide the progress bar
        that.set("isLoading", false);
        //navigate to the main menu
    }, function(error) {
        //hide progress bar on error and show error
        that.set("isLoading", false);
        //alert error
        dialogs.alert(error);	
    });
};

exports.mainViewModel = mainViewModel;