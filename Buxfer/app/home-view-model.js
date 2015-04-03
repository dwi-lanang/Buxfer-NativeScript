//ntm modules
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var http = require("http");
var settings = require("local-settings");
//configuration file
var config = require("./config");
//the viewModel
var viewModel = new observable.Observable();



exports.viewModel = viewModel;