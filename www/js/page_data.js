function load_page_data() {
	html_title = 'DATA'
	document.getElementById('data_title').innerHTML = html_title;
	document.getElementById('data_options').innerHTML = LSconfig2html("data");
}

function goto_next(site) {
	site = site + ".html"
	location.replace(site);
}
