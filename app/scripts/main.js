(function () {
	'use strict';

	/* global Konami, YT */
	var $id = document.getElementById.bind(document),
		$class = document.getElementsByClassName.bind(document);

	function loadYTApi() {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	function hideWrapper() {
		$id('embed').style.display = 'none';
		$id('wrapper').style.opacity = 0;
		$class('overlay')[0].style.background = 'transparent';
	}

	function showWrapper() {
		$id('embed').style.display = 'block';
		$id('wrapper').style.opacity = 1;
		$class('overlay')[0].style.background = undefined;
	}

	window.onYouTubeIframeAPIReady = function () {

		function onPlayerStateChange(event) {
			if (event.data === YT.PlayerState.ENDED) {
				$id('skriik').style.display = 'none';
				showWrapper();
				player.seekTo(0);
			}
		}

		// Load Youtube video.
		$id('skriik').style.display = 'none';
		var player = new YT.Player('skriik', {
			videoId: 'DI3PJ1t_sOg',
			playerVars: {
				rel: 0
			},
			events: {
				onStateChange: onPlayerStateChange
			}
		});

		// Setup konami code.
		var easterEgg = new Konami();
		easterEgg.code = function () {
			player.playVideo();
			$id('skriik').style.display = 'block';
			hideWrapper();
		};
		easterEgg.load();

	};

	loadYTApi();
})();