function show_list_entries(list_2show) {
	if (localStorage.length == 0) {
		var liTag = document.createElement("li");
		liTag.id = "list_entry_noentries";
        liTag.setAttribute("onclick", 'update_list_entries(' + list_2show + ');');
        liTag.innerHTML = "No entries found";
        document.getElementById(list_2show).appendChild(liTag);
	} else {
		for ( i = 0 ; i <= localStorage.length - 1 ; i++ ){
			var key = localStorage.key(i);
			value = localStorage[localStorage.key(i)];
			if (key.indexOf("data_") > -1) {
				try {
					value_nr = key.split("_")[1];
					var liTag = document.createElement("li");
					liTag.id = "list_entry";
		            liTag.setAttribute("onclick", 'localStorage.removeItem("data_' + value_nr + '");update_list_entries("' + list_2show + '");');
		            liTag.innerHTML = value;
		            document.getElementById(list_2show).appendChild(liTag);
					
				} catch(e) {
					alert("ERROR on show_list_entries:" + e + value);
				}
			}
		} 
		//document.getElementById('lvdata').innerHTML = data_in;
	}
}

function clear_list_entries(list_2clear) {
	container = document.getElementById(list_2clear);
	li_entries = container.getElementsByTagName("li");
	li_entries_nr = li_entries.length;
	for (i=li_entries_nr-1;i>=0;i--) {
		container.removeChild(li_entries[i]);
	}
}

function update_list_entries(list_2update) {
	clear_list_entries(list_2update);
	show_list_entries(list_2update);
}

function manage_entrylist(list_2manage) {
	container = document.getElementById(list_2manage);
	li_entries = container.getElementsByTagName("li");
	li_entries_nr = li_entries.length;
	if (li_entries_nr == 0) {
		show_list_entries(list_2manage);
	} else {
		clear_list_entries(list_2manage);
	}
}

function show_entry_panel()
{
var newsletter_panel = document.getElementById('newsletter_panel');
// w is a width of the newsletter panel
w = 300;
// h is a height of the newsletter panel
h = 300;
// get the x and y coordinates to center the newsletter panel
xc = Math.round((document.body.clientWidth/2)-(w/2))
yc = Math.round((document.body.clientHeight/2)-(h/2))
// show the newsletter panel
newsletter_panel.style.left = xc + "px";
newsletter_panel.style.top = yc + "px";
newsletter_panel.style.display = 'block';
} 