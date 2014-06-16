function first_entry() {
	localStorage.clear();
	add_dummy_data();
}

function add_entry() {
	add_dummy_data();
}

function add_dummy_data() {
	nextentry = localStorage.length + 1;
	localStorage["data_" + nextentry] = "Entrada número " + nextentry;
}

/* Site update*/
function update_html_data() {
	data_in = ""
	for ( i = 0 ; i <= localStorage.length - 1 ; i++ ){
		var key = localStorage.key(i);
		value = localStorage[localStorage.key(i)];
		if (key.indexOf("data_") > -1) {
			try {
				value_nr = key.split("_")[1];
				var liTag = document.createElement("li");
				liTag.id = "list_entry";
	            //liTag.setAttribute("onclick", 'alert("value: ' + value + '");');
	            liTag.setAttribute("onclick", 'localStorage.removeItem("data_' + value_nr + '");update_list_entries();');
	            liTag.innerHTML = value;
	            document.getElementById('data_allentries_list').appendChild(liTag);
				
			} catch(e) {
				alert("ERROR on update_html_data:" + e + value);
			}
		}
	} 
	//document.getElementById('lvdata').innerHTML = data_in;
}



// THIS WILL BE MOVED TO LOCALSTORAGE JAVASCRIPT LIBRARY!
// function delete_entry(entrylist) { }


