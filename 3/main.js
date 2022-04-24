var date = new Date();

const END_CLASS_TIMES = [
    [10, 15],
    [11, 05],
    [11, 55],
    [12, 45],
    [14, 15],
    [15, 05],
    [15, 55],
    [16, 45],
    [17, 35]
];

window.onload = function(){
    var table = document.getElementById("main_table");
    var now_dayOfWeek = date.getDay(), cell_index =  now_dayOfWeek, highlight_row = 1, first = true;
    var now_hour = date.getHours(), now_minute = date.getMinutes();
    if(now_dayOfWeek == 0) cell_index = 1;
    else{
        for(var i = table.rows.length - 1; i > 0; i--){
            var cell = table.rows[i].cells[cell_index];
            if(cell != null && cell.innerText != ""){
                var time = END_CLASS_TIMES[i - 1];
                if(now_hour > time[0] || (now_hour == time[0] && now_minute > time[1])){
                    if(first) {
                        highlight_row = 1;
                        cell_index = Math.max(1, (cell_index + 1) % 7);
                    }
                    break;
                }
                highlight_row = i;
                first = false;
            }
        }
    }
    table.rows[highlight_row].cells[cell_index].dataset.highlight_cell="true";
    if(cell_index == 6 && table.rows[i].cells[7] != null) table.rows[highlight_row].cells[7].dataset.highlight_cell="true";
    for(var i = 0; i < table.rows.length; i++){
        var cell = table.rows[i].cells[cell_index];
        if(cell != null){
            cell.dataset.highlight_line = "true";
            cell.innerHTML = "<span>" + cell.innerText + "</span>"
        }
        if(cell_index == 6 && (cell = table.rows[i].cells[7]) != null){
            cell.dataset.highlight_line = "true"
            cell.innerHTML = "<span>" + cell.innerText + "</span>"
        }
    }
}
