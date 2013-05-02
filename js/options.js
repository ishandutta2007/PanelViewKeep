var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
	
	/** REFER **/
	
	var queryString = document.location.search;
	queryString = queryString.substring(queryString.indexOf('?') + 1, queryString.length);
	
	var reqParms = queryString.split('&');
	for (var i = 0; i < reqParms.length; i++) {
		var parm = reqParms[i].split('=');
		if (parm[0] == 'refer' && parm[1] == 'keep') {
			$('#close, #keep_link').toggleClass('hide');
		}
	}
	
	document.location.search.substring(1, document.location.search.length).split('=');
	
	/** LOAD STUFF **/
	
	chrome.storage.local.get([ 'windowType', 'windowWidth', 'windowHeight', 'disableMenus' ], function(items) {
		if (items.windowType && items.windowType.length > 0) {
			$('#windowType').val(items.windowType);
		} else {
			$('#windowType').val(chrome.extension.getBackgroundPage().KEEP_WINDOW_TYPE);
		}
		if ($('#windowType').val() == 'panel') {
			$('#windowType').tooltip({
				placement: 'right',
				trigger: 'manual',
				title: 'The "panel" option will show as a popup until you enable panels in <a href="chrome://flags/" target="_blank">chrome://flags/</a>.'
			}).tooltip('show');
		}
		if ($('#windowType').val() == 'normal') {
			$('#windowWidth, #windowHeight').attr('disabled', 'true');
		} else {
			$('#windowWidth, #windowHeight').removeAttr('disabled');
		}
		
		if (items.windowWidth && items.windowWidth > 0) {
			$('#windowWidth').val(items.windowWidth);
		} else {
			$('#windowWidth').val(chrome.extension.getBackgroundPage().KEEP_WINDOW_WIDTH);
		}
		
		if (items.windowHeight && items.windowHeight > 0) {
			$('#windowHeight').val(items.windowHeight);
		} else {
			$('#windowHeight').val(chrome.extension.getBackgroundPage().KEEP_WINDOW_HEIGHT);
		}
		
		console.log(items);
		
		if (items.disableMenus && items.disableMenus == 'true') {
			console.log(items.disableMenus);
			$('#disableMenus').attr('checked', true);
		}
	});
	
	/** CLICK HANDLERS **/
	
	$('#close').bind('click', function() {
		window.close();
	});
	
	$('#windowType').bind('change blur', function() {
		chrome.storage.local.set({ 'windowType': $('#windowType').val() }, function() {});
		
		if ($('#windowType').val() == 'panel') {
			$('#windowType').tooltip({
				placement: 'right',
				trigger: 'manual',
				title: 'The "panel" option will show as a popup until you enable panels in <a href="chrome://flags/" target="_blank">chrome://flags/</a>.'
			}).tooltip('show');
		} else {
			$('#windowType').tooltip('hide');
		}
		
		if ($('#windowType').val() == 'normal') {
			$('#windowWidth, #windowHeight').attr('disabled', 'true');
		} else {
			$('#windowWidth, #windowHeight').removeAttr('disabled');
		}
	});
	
	$('#windowWidth').bind('change blur', function() {
		if (!isNaN(parseInt($('#windowWidth').val()))) {
			chrome.storage.local.set({ 'windowWidth': parseInt($('#windowWidth').val()) }, function() {});
		} else {
			$('#windowWidth').val(chrome.extension.getBackgroundPage().KEEP_WINDOW_WIDTH);
			$('#windowWidth').tooltip({
				placement: 'right',
				trigger: 'manual',
				title: 'This value must be a number.'
			}).tooltip('show');
		}
	});
	
	$('#windowHeight').bind('change blur', function() {
		if (!isNaN(parseInt($('#windowHeight').val()))) {
			chrome.storage.local.set({ 'windowHeight': parseInt($('#windowHeight').val()) }, function() {});
		} else {
			$('#windowHeight').val(chrome.extension.getBackgroundPage().KEEP_WINDOW_HEIGHT);
			$('#windowHeight').tooltip({
				placement: 'right',
				trigger: 'manual',
				title: 'This value must be a number.'
			}).tooltip('show');
		}
	});
	
	$('#disableMenus').bind('click', function() {
		if ($('#disableMenus').attr('checked') == undefined) {
			chrome.storage.local.set({ 'disableMenus': 'false' }, function() {});
		} else {
			chrome.storage.local.set({ 'disableMenus': 'true' }, function() {});
		}
		$('#disableMenusText').tooltip({
			placement: 'right',
			trigger: 'manual',
			title: 'Restart Chrome for this to take effect.'
		}).tooltip('show');
	});
});
