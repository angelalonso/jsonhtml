function load_page_main() {
	html_title = 'MAIN'
	document.getElementById('main_title').innerHTML = html_title;

	main_elements = LSconfig2html("main");
	//alert(main_elements.length);
	var foo = document.getElementById("main_options");
	for (i = 0; i<main_elements.length;i++){
		foo.appendChild(main_elements[i]);
	}
}

function goto_next(site) {
	site = site + ".html"
	location.replace(site);
}