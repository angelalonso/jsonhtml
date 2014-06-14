function load_page_main() {
	html_title = 'MAIN'
	document.getElementById('main_title').innerHTML = html_title;

	document.getElementById('main_options').innerHTML = LSconfig2html("main");
}

function goto_next(site) {
	site = site + ".html"
	location.replace(site);
}