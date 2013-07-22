$(document).ready(function() {
	
	// build overlay and options dialog
	var dialogs = '';
	
	$.ajax({
		url: chrome.extension.getURL('/html/dialogs.html'),
		success: function(data, xhr, status) {
			$('body').append(data);
			
			$('.modal-dialog-title-close, .modal-dialog-buttons button.goog-buttonset-action').click(function() {
				$('.glass').addClass('hide');
				$(this).closest('.modal-dialog').addClass('hide');
			});
			$('.modal-dialog-buttons button.donate').click(function() {
				window.open('http://bit.ly/paneldonate');
			});
			chrome.storage.local.get([ 'contextMenu' ], function(items) {
				if (items.contextMenu && items.contextMenu == true) {
					$('#options_contextMenu').attr('checked', true);
				}
			});
			$('#options_contextMenu').click(function() {
				if ($('#options_contextMenu').attr('checked') == undefined) {
					chrome.storage.local.set({ 'contextMenu': false }, function() {});
				} else {
					chrome.storage.local.set({ 'contextMenu': true }, function() {});
				}
			});
		}
	});
	
	// add send to tab/panel link to black bar
	var windowType = '';
	chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
		windowType = response.farewell;
		
		var sendLink = '';
		if (windowType == 'normal') {
			sendLink = '<li class="gbt"><a class="gbgt gbtc_send" href="#" data-type="panel" data-tooltip="Send to panel"><span></span></a></li>';
		} else {
			sendLink = '<li class="gbt"><a class="gbgt gbtc_send" href="#" data-type="normal" data-tooltip="Send to tab"><span></span></a></li>';
		}
		
		$('#gbg > ol.gbtc').append('<li class="gbt gbtb" style=""><span class="gbts"></span></li>' + sendLink);
	});
	
	// send to tab/panel click
	$('ol.gbtc').on('click', '.gbtc_send', function() {
		var url = location.href;
		var type = $(this).attr('data-type');
		
		chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {
		});
	});
	
	// add options link to gear menu
	$('#gbom').append(
		'<li class="gbmtc"><div class="gbmt gbmh"></div></li>' +
		'<li class="gbe gbmtc"><a class="gbmt keep_ext" href="#" data-open="options">Settings</a></li>'
	);
	
	// options click
	$('#gbom a.keep_ext').click(function(e) {
		e.preventDefault();
		var openAttr = $(this).attr('data-open');
		$('.glass, #' + openAttr + '-dialog').removeClass('hide');
	});
	
	// save location on page load (so that switching accounts triggers a url save)
	chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
	});
	
	// save url on going to and from archived notes
	$('.notes-container').on('click', '.yePe5c, .LgbsSe-Bz112c-a4fUwd', function() {
		chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
		});
	});
	
	/*
	
	// list/grid view click
	
	$('.INgbqf-docTNd-Bz112c').each(function() {
		$(this).parent().click(function() {
			chrome.storage.local.set({ 'view': 'list' }, function() {});
		});
	});
	$('.INgbqf-qwsjo-Bz112c').each(function() {
		$(this).parent().click(function() {
			chrome.storage.local.set({ 'view': 'grid' }, function() {});
		});
	});
	
	// set grid view
	chrome.storage.local.get([ 'view' ], function(items) {
		if (items.view && items.view == 'grid') {
			$('.INgbqf-qwsjo-Bz112c').each(function() {
				console.log($(this));
				$(this).click();
			});
		}
	});
	
	*/
	
	console.log(
		$('[data-tooltip="New note"]').click()
	);
	
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// can't use this in a panel, because sendMessage needs a tab id
});
