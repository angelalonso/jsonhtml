function load_page_data() {
	html_title = 'DATA'
	document.getElementById('data_title').innerHTML = html_title;

	data_elements = LSconfig2html("data");
	//alert(main_elements.length);
	var foo = document.getElementById("data_options");
	for (i = 0; i<data_elements.length;i++){
		foo.appendChild(data_elements[i]);
	}
}

function goto_next(site) {
	site = site + ".html"
	location.replace(site);
}
