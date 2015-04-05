//tns modules
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var activityIndicatorModule = require("ui/activity-indicator");
var http = require("http");
var settings = require("local-settings");
var frameModule = require("ui/frame");

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
    //keep a reference to the viewModel.
    var that = mainViewModel;
    //check if already clicked
    if(that.get("isLoading"))
        return;
    //get the username and password
    var username = that.get("username").trim();
    var password = that.get("password").trim();  
    //validate the username and password
    if(username === "" || password === ""){
        dialogs.alert("Kindly add your username and password");
        return;
    }
   
    //show the progress bar
    that.set("isLoading", true);  
    
    //send an http request and try to login
    var url = config.proxy + "login?userid=" + username + "&password=" + password;
    http.request({ url : url, method: "get" }).then(function(response) {
        var value = response.content.toJSON();
        
        if ('error' in value) {
            //login error
            dialogs.alert(value.error.message);
            //hide loading
            that.set("isLoading", false);
            //exit
            return;
        }
        //store the token for later useage.
        var token = value.response.token;
        settings.setString("token", token);
        //hide the progress bar
        that.set("isLoading", false);
        //navigate to the main menu
        frameModule.topmost().navigate("app/home-page");
    }, function(error) {
        //hide progress bar on error and show error
        that.set("isLoading", false);
        //alert error
        dialogs.alert("No available Internet Please check your connectivity!");	
    });
};

exports.mainViewModel = mainViewModel;
