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


// POPUP

function displayPopup(popup_div,calendar_1) {
	todayArray = day_GUIarray(new Date());
	updateCalHeader(calendar_1,todayArray);    
    var div2display = document.getElementById(popup_div);
    div2display.style.display="block";


}
 
function closePopup(popup_div) {
    var div2close = document.getElementById(popup_div);
    if (div2close.style.display=="block") {
        div2close.style.display="none";
    }
}


// CALENDAR

function showCalChart(cal_table,action) {
	// get current date shown in the header
	date_array = [];
	date_array.push(document.getElementById(cal_table + '_day').innerHTML);
	date_array.push(document.getElementById(cal_table + '_month').innerHTML);
	date_array.push(document.getElementById(cal_table + '_year').innerHTML);
	
	switch (action)
	{
		case 'chart':
			//table.deleteRow(0);

			table_titles = document.getElementById(cal_table + "_week");
			table = document.getElementById(cal_table + "_chart");
			buildCalTable(table,table_titles,date_array);
		break;
		case 'previous':
			alert("previous!");
		break;
		case 'next':
			alert("next!");
		break;
	}
}

function updateCalHeader(element,date_array) {
	document.getElementById(element + '_day').innerHTML = date_array[0];
	document.getElementById(element + '_month').innerHTML = date_array[1];
	document.getElementById(element + '_year').innerHTML = date_array[2];
}

function buildCalTable(table,week_days,date_array) {
	open_chart = table.getElementsByTagName('tr').length;
	if (open_chart <= 0) {
		weekdays = ['Su','Mo','Tu','We','Th','Fr','Sa'];
		var week_row = week_days.insertRow(week_days.rows.length);
		for (i = 0; i< 7; i++) {
			var newcell = week_row.insertCell(i);
			var newText = document.createTextNode(weekdays[i]);
			newcell.appendChild(newText);
		}

		test = new Date(date_array[2], date_array[1], 1);
		//alert(test.getDay());
		var newrows = []
		var row = table.insertRow(table.rows.length);
		for (i = 1; i<= 31; i++) {
			col = (i-1) % 7;
			if (col == 0){
				var row = table.insertRow(table.rows.length);
			}
			var newcell = row.insertCell(col);
			var newText  = document.createTextNode(i);
			newcell.appendChild(newText);

		}
	} else {
		while(week_days.hasChildNodes()) {
		   week_days.removeChild(week_days.firstChild);
		}
		while(table.hasChildNodes()) {
		   table.removeChild(table.firstChild);
		}
	}
}

function day_GUIarray(thisday) {
	// get current date
	date_array = [];
	var dd = thisday.getDate();
	var mm = thisday.getMonth()+1; //January is 0!
	var yyyy = thisday.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 
	date_array.push(dd);
	date_array.push(mm);
	date_array.push(yyyy);

	return date_array;
}