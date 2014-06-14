function firstload(site) {

	switch (site) {
	case "main":
		if (localStorage["site_main"] == "undefined"){
			alert("nothing found for this site!, Loading defaults...");
			localStorage["site_main"] = '<button type=submit id="main_btn_send" onclick="goto_next_main();"><strong>Send It In!</strong></button>';
			} 
		break;
	case "data": 
		if (localStorage["site_data"] == "undefined"){
			alert("nothing found for this site!, Loading defaults...");
			localStorage["site_data"] = '<button type=submit id="data_btn_send" onclick="goto_next_data();"><strong>Send It In!</strong></button>';
			localStorage["test_data"] = '{"result":true,"count":1}';
			} 
		break;
	default: 
		alert("ERROR: No pre-defined site was indicated! - " + site);
	}
	//http://jsonlint.com/
	localStorage["test_main"] = '{"type": "div","content": {"button_001": [ {"type":"button","id":"data_btn_2data","text":"Push Me for Data!","link":"data"} ] }, "button_002": [ {"type":"button","id":"data_btn_2goog","text":"Don\'t Push Me!","link":"aux.html"} ] }';
	localStorage["test_data"] = '{"type": "div","content": {"button_001": [ {"type":"button","id":"data_btn_2main","text":"Push Me for Main!","link":"index"} ] }, "button_002": [ {"type":"button","id":"data_btn_2goog","text":"Don\'t Push Me!","link":"aux.html"} ] }';
}

function LSconfig2html(site) {
	configentry = JSON.parse(localStorage["test_" + site]);
	html_in = "";
	for (var entry in configentry.content) {
		html_in = html_in + JSON2html(configentry.content[entry][0]);
	}

	return html_in;
}

function JSON2html(htmlobject){
	var html_result = "";
	switch (htmlobject.type) {
	case "button":
			html_result = html_result + '<button type=submit id="' + htmlobject.id + '" onclick="goto_next(\''+htmlobject.link+'\');"><strong>' + htmlobject.text + '</strong></button>';
	break;
	default: 
		alert("ERROR: No pre-defined site was indicated! - ");
	}
	return html_result;
}