$(document).ready(function() {
	
	// build overlay and options dialog
	var overlay = '<div class="glass hide"></div>';
	var options = '' +
			'<div id="options-dialog" class="modal-dialog hide">' +
				'<div class="modal-dialog-title">' +
					'<span class="modal-dialog-title-text">Options</span>' +
					'<span class="modal-dialog-title-close"></span>' +
				'</div>' +
				'<div class="modal-dialog-content">' +
					'<label data-tooltip="Please restart Chrome for this change to take effect."><input type="checkbox" id="options_contextMenu" /> Enable context menus</label>' +
				'</div>' +
				'<div class="modal-dialog-buttons">' +
					'<button>Okay</button>' +
				'</div>' +
			'</div>';
	
	$('body').append(overlay + options);
	$('.modal-dialog-title-close, .modal-dialog-buttons button').click(function() {
		$('.glass').addClass('hide');
		$(this).closest('.modal-dialog').addClass('hide');
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
	$('#gbom').append('<li class="gbe gbmtc"><a id="gbom_options" class="gbmt" href="#">Options</a></li>');
	
	// options click
	$('#gbom_options').click(function(e) {
		e.preventDefault();
		$('.glass, #options-dialog').removeClass('hide');
	});
	
	// save location on page load (so that switching accounts triggers a url save)
	chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
	});
	
	// save url on going to and from archived notes
	$('.notes-container').on('click', '.yePe5c, .LgbsSe-Bz112c-a4fUwd', function() {
		chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
		});
	});
	
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// can't use this in a panel, because sendMessage needs a tab id
});
