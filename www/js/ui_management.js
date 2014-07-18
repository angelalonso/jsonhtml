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

function savePopup(popup_div) {
    switch (popup_div)
    {
    	case 'popup_box':
    		subject = "";
    		start_date = document.getElementById('popup_date_in_day').innerHTML+"/"+document.getElementById('popup_date_in_month').innerHTML+"/"+document.getElementById('popup_date_in_year').innerHTML;
    		start_time = "21:00";
    		end_date = start_date;
    		end_time = "";
    		all_day_event = "False";
    		description = "";
    		alert(start_date);
    		LS_add_entry(subject,start_date,start_time,end_date,end_time,all_day_event,description);
    	break;
    }
	closePopup(popup_div);
}

// CALENDAR

function showCalChart(cal_table,action) {
	// get current date shown in the header
	date_array = [];
	date_array.push(document.getElementById(cal_table + '_day').innerHTML);
	date_array.push(document.getElementById(cal_table + '_month').innerHTML);
	date_array.push(document.getElementById(cal_table + '_year').innerHTML);
	table_titles = document.getElementById(cal_table + "_week");
	table = document.getElementById(cal_table + "_chart");
	table_months = document.getElementById(cal_table + "_months");
	
	switch (action)
	{
		case 'chart':
			buildCalTable(table,table_titles,table_months,date_array);
		break;
		case 'previous':
			date_array = prepare_date(date_array,-1,'day');
			document.getElementById(cal_table + '_day').innerHTML = date_array[0];
			document.getElementById(cal_table + '_month').innerHTML = date_array[1];
			document.getElementById(cal_table + '_year').innerHTML = date_array[2];
			buildCalTable(table,table_titles,table_months,date_array);
			buildCalTable(table,table_titles,table_months,date_array);
		break;
		case 'next':
			date_array = prepare_date(date_array,1,'day');
			document.getElementById(cal_table + '_day').innerHTML = date_array[0];
			document.getElementById(cal_table + '_month').innerHTML = date_array[1];
			document.getElementById(cal_table + '_year').innerHTML = date_array[2];
			buildCalTable(table,table_titles,table_months,date_array);
			buildCalTable(table,table_titles,table_months,date_array);
		break;
		case 'prev_month':
			date_array = prepare_date(date_array,-1,'month');
			document.getElementById(cal_table + '_day').innerHTML = date_array[0];
			document.getElementById(cal_table + '_month').innerHTML = date_array[1];
			document.getElementById(cal_table + '_year').innerHTML = date_array[2];
			buildCalTable(table,table_titles,table_months,date_array);
			buildCalTable(table,table_titles,table_months,date_array);
		break;
		case 'next_month':
			date_array = prepare_date(date_array,1,'month');
			document.getElementById(cal_table + '_day').innerHTML = date_array[0];
			document.getElementById(cal_table + '_month').innerHTML = date_array[1];
			document.getElementById(cal_table + '_year').innerHTML = date_array[2];
			buildCalTable(table,table_titles,table_months,date_array);
			buildCalTable(table,table_titles,table_months,date_array);
		break;
	}
}

function updateCalHeader(calendar_element,date_array) {
	document.getElementById(calendar_element + '_day').innerHTML = date_array[0];
	document.getElementById(calendar_element + '_month').innerHTML = date_array[1];
	document.getElementById(calendar_element + '_year').innerHTML = date_array[2];
}

function buildCalTable(cal_table,week_days,month_change,date_array) {
	open_chart = cal_table.getElementsByTagName('tr').length;
	if (open_chart <= 0) {
		daysofweek = ['Su','Mo','Tu','We','Th','Fr','Sa'];
		var week_row = week_days.insertRow(week_days.rows.length);
		for (i = 0; i< 7; i++) {
			var newcell = week_row.insertCell(i);
			var newText = document.createTextNode(daysofweek[i]);
			newcell.appendChild(newText);
		}

		months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		document.getElementById(month_change.id + '_name').innerHTML = months[parseInt(date_array[1]-1)];
		month_change.style.display = "";

		first_day_month = new Date(date_array[2], date_array[1] -1, 1);
		last_day_month = parseInt(new Date(date_array[2], date_array[1], 0).getDate());
		empty_cells = first_day_month.getDay();
		var row = cal_table.insertRow(cal_table.rows.length);
		
		for (i = 1; i<= last_day_month+empty_cells; i++) {
			col = (i-1) % 7;
			if (col == 0){
				var row = cal_table.insertRow(cal_table.rows.length);
			}
			var newcell = row.insertCell(col);
			if (i > empty_cells) {
				var daybutton = document.createElement("input");
				daybutton.type = "button";
				daybutton.value = i - empty_cells;
				daybutton.id = cal_table.id + "_" + daybutton.value;
				daybutton.onclick = function(){
					naming = this.id.split("_");
					day_shower = this.id.replace('_'+naming[naming.length-2]+'_'+naming[naming.length-1],'');
					document.getElementById(day_shower + '_day').innerHTML = this.value;
					week_days = document.getElementById(day_shower + '_week');
					while(week_days.hasChildNodes()) {
					   week_days.removeChild(week_days.firstChild);
					}
					cal_table = document.getElementById(day_shower + '_chart');
					while(cal_table.hasChildNodes()) {
					   cal_table.removeChild(cal_table.firstChild);
					}
					month_change = document.getElementById(day_shower + '_months');
					if (month_change.style.display!="none") {
						month_change.style.display="none";
					}
				}
				//context.appendChild(button);
				//var newText  = document.createTextNode(i - empty_cells);
				newcell.appendChild(daybutton);
			}
		}
	} else {
		while(week_days.hasChildNodes()) {
		   week_days.removeChild(week_days.firstChild);
		}
		while(cal_table.hasChildNodes()) {
		   cal_table.removeChild(cal_table.firstChild);
		}
		if (month_change.style.display!="none") {
			month_change.style.display="none";
		}
	}
}

function prepare_date(day_array,operation,field) {
	switch (field)
	{
		case 'day':
			new_day = new Date(parseInt(day_array[2]), parseInt(day_array[1]) -1, parseInt(day_array[0]) + operation);
		break;
		case 'month':
			new_day = new Date(parseInt(day_array[2]), parseInt(day_array[1]) -1 + operation, parseInt(day_array[0]));
		break;
		case 'year':
			new_day = new Date(parseInt(day_array[2]) + operation, parseInt(day_array[1]) -1, parseInt(day_array[0]));
		break;
	}
	return day_GUIarray(new_day);
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