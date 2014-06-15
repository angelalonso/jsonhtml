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
	//localStorage["test_data"] = '{"type": "div","content": {"button_001": [ {"type":"button","id":"data_btn_2main","text":"Push Me for Main!","link":"index"} ] }, "button_002": [ {"type":"button","id":"data_btn_2goog","text":"Don\'t Push Me!","link":"aux.html"} ] }';
	//localStorage["test_main"] = '{"type": "div","content": {"button_001": [ {"type":"button","id":"data_btn_2data","text":"Push Me for Data!","link":"data"} ] }, "button_002": [ {"type":"button","id":"data_btn_2goog","text":"Don\'t Push Me!","link":"aux.html"} ] '};
	localStorage["test_main"] = '{"type": "div","content": [{"type": "button","id": "data_btn_2data","text": "Push Me for Data!","link": "data"},{"type": "button","id": "data_btn_2foo","text": "Push Me for Foo!","link": "foo"} ] }';
	localStorage["test_data"] = '{"type": "div","content": [{"type": "button","id": "data_btn_2main","text": "Push Me for Main!","link": "index"},{"type": "button","id": "data_btn_2foo","text": "Push Me for Foo!","link": "foo"} ] }';
}

function LSconfig2html(site) {
	configentry = JSON.parse(localStorage["test_" + site]);
	html_in = [];
	for (entry in configentry.content) {
		//html_in = html_in + JSON2html(configentry.content[entry]);
		html_in.push(JSON2html(configentry.content[entry]));
	}
	return html_in;
}

function JSON2html(htmlobject){
	//http://www.ezineasp.net/post/Javascript-Create-New-Div-HTML-Element-Dynamically.aspx

	switch (htmlobject.type) {
	case "button":
			var btnTag = document.createElement("button");
            btnTag.type = "submit";
            btnTag.id = htmlobject.id;
            //btnTag.onclick = goto_next(htmlobject.link);
            btnTag.setAttribute("onclick", 'goto_next("' + htmlobject.link + '");');
            btnTag.innerHTML = htmlobject.text;
            return btnTag;
			//html_result = html_result + '<button type=submit id="' + htmlobject.id + '" onclick="goto_next(\''+htmlobject.link+'\');">' + htmlobject.text + '</button>';
	break;
	default: 
		alert("ERROR: No pre-defined site was indicated! - ");
	}
}