// 1. calls renderer (should return DOM node) for each item in arr
// 2. appends all the DOM nodes to parent
function renderMultiple(arr, renderer, parent) {
	var renderedEls = [].map.call(arr, renderer); // 1
	var docFrag = document.createDocumentFragment();
	for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
	parent.appendChild(docFrag); // 2
}


function searchYT(query) {
	$.getJSON('https://www.googleapis.com/youtube/v3/search', {
		q: query,
		part: 'snippet',
		key: 'AIzaSyAHFmDVyINh6FDY4o9LVt13O2pSMI9JLdI'
	}, function(data) {
		var results = data.items;
		renderVideos(results);
	});
}

var renderVideos = (function() {
	var parent = $('#video-results')[0];

	return function(results) {
		$(parent).empty();
		renderMultiple(results, renderVideo, parent);
	};
})();

function renderVideo(videoData) {
	// video info
	var pageURL = 'https://youtu.be/' + videoData.id.videoId;
	var thumbnailURL = videoData.snippet.thumbnails.medium.url;
	var title = videoData.snippet.title;

	// <li>
	var $li = $('<li>');
		// <a>
		var $a = $('<a>');
		$a.attr('href', pageURL);
			// <h3>
			var $title = $('<h3>');
			$title.text(title);
			// <img>
			var $img = $('<img>');
			$img.attr('src', thumbnailURL);

	// put elements together
	$a.append($title);
	$a.append($img);
	$li.append($a);

	return $li[0];
}



$('#video-search-form').on('submit', function(event) {
	event.preventDefault();
	searchYT(this.query.value);
	this.query.value = '';
});