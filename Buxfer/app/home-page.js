var home = require("./home-view-model");
var view = require("ui/core/view");

exports.pageLoaded = function(args) {
    //the page argument
    var page = args.object;
    //set the viewModel
    page.bindingContext = home.viewModel;
    //get the tabs
    var tabView1 = view.getViewById(page, "tabView1");
    //set the index
    tabView1.selectedIndex = 0;
};