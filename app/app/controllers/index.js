var widgets = require("ti.widget");

$.index.open();

function onClickUpdate(e) {
	showLoading();
	require("/widget").updateData(updatePreview);
}

var MINUTES = 60 * 30 * 1000;
var intent = Titanium.Android.createServiceIntent({
	url: 'service.js'
});
intent.putExtra('interval', MINUTES);
Titanium.Android.startService(intent);

function updatePreview() {

	var widgetData = Ti.App.Properties.getObject("widgetData", {
		value1: "-",
		value2: "-"
	})

	$.lbl_preview1.text = Ti.App.Properties.getString("town1", "Baden") + ": " + widgetData.value1;
	$.lbl_preview2.text = Ti.App.Properties.getString("town2", "Bern") + ": " + widgetData.value2;
	hideLoading()
}

function showLoading(){
	$.view_loading.show();
	$.activity.show();
}
function hideLoading(){
	$.view_loading.hide();
	$.activity.hide();
}

function onOpen(e) {
	if (Ti.App.Properties.getBool("firstStart", true)) {
		// set values for first start
		Ti.App.Properties.setString("town1", "Baden");
		Ti.App.Properties.setString("town2", "Bern");
		Ti.App.Properties.setString("lat2", "47.475361");
		Ti.App.Properties.setString("lon2", "8.306372");
		Ti.App.Properties.setString("lat2", "46.947456");
		Ti.App.Properties.setString("lon2", "7.451123");
		Ti.App.Properties.setBool("firstStart", false);
		Ti.App.Properties.setString("icon", "🦠");
	}

	$.tf_lat1.value = Ti.App.Properties.getString("lat1", "47.475361");
	$.tf_lon1.value = Ti.App.Properties.getString("lon1", "8.306372");
	$.tf_lat2.value = Ti.App.Properties.getString("lat2", "46.947456");
	$.tf_lon2.value = Ti.App.Properties.getString("lon2", "7.451123");
	$.tf_town1.value = Ti.App.Properties.getString("town1", "Baden");
	$.tf_town2.value = Ti.App.Properties.getString("town2", "Bern");
	$.tf_icon.value = Ti.App.Properties.getString("icon", "🦠");

	showLoading();
	require("/widget").updateData(updatePreview);
}

function onClickSave(e) {
	showLoading();
	if ($.tf_town1.value != "") Ti.App.Properties.setString("town1", $.tf_town1.value);
	if ($.tf_town2.value != "") Ti.App.Properties.setString("town2", $.tf_town2.value);

	if ($.tf_lat1.value != "") Ti.App.Properties.setString("lat1", $.tf_lat1.value);
	if ($.tf_lon1.value != "") Ti.App.Properties.setString("lon1", $.tf_lon1.value);

	if ($.tf_lat2.value != "") Ti.App.Properties.setString("lat2", $.tf_lat2.value);
	if ($.tf_lon2.value != "") Ti.App.Properties.setString("lon2", $.tf_lon2.value);

	Ti.App.Properties.setString("icon", $.tf_icon.value);
	require("/widget").updateData(updatePreview);
}
