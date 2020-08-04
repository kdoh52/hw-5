$(document).ready(function() {

    // HEADING DATE
    var $headingDate = $("#currentDay");
    $headingDate.text(moment().format("dddd, MMMM Do"));

    // FILL PLANNER
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    if (storedPlans !== null) {
        plannerText = storedPlans;
    }
    else {
        plannerText = new Array(9);
    };
    
    // MAIN DIV
    var $mainDiv = $("#plannerContainer");
    for (var hour = 9; hour < 18; hour++) {
        var index = hour - 9;

        var $rowDiv = $("<div>");
        $rowDiv.addClass("row");
        $rowDiv.addClass("plannerRow");
        $rowDiv.attr("hourIndex", hour);
        
        // TIME COLUMN
        var $colTime = $("<div>");
        $colTime.addClass("col-md-2");

        var $timeBlock = $("<span>");
        $timeBlock.attr("class", "timeBlock");

        var displayTime;
        var mer = "";
        if (hour == 12) {
            displayTime = hour;
            mer = "pm";
        }
        else if (hour > 12) {
            displayTime = hour - 12;
            mer = "pm";
        }
        else {
            displayTime = hour;
            mer = "am";
        }
        $timeBlock.text(`${displayTime} ${mer}`);

        $colTime.append($timeBlock);
        $rowDiv.append($colTime);

        // INPUT COLUMN
        var $colInput = $("<div>");
        $colInput.addClass("col-md-8");
        
        var $hrInput = $("<input>");
        $hrInput.attr("type", "text");
        $hrInput.attr("class", "hrInput");
        $hrInput.attr("id", `input-${index}`)
        $hrInput.attr("hourIndex", index);
        $hrInput.val(plannerText[index]);

        $colInput.append($hrInput);
        $rowDiv.append($colInput);

        // SAVE COLUMN
        var $colSave = $("<div>");
        $colSave.addClass("col-md-2");

        var $saveBtn = $("<button>");
        $saveBtn.attr("id", `saveid-${index}`);
        $saveBtn.attr("save-id", index);
        $saveBtn.attr("class", "fas fa-save");

        $colSave.append($saveBtn);
        $rowDiv.append($colSave);

        rowColors($rowDiv, hour);
        $mainDiv.append($rowDiv);
    }

    // ROW COLORS
    function rowColors ($hourRow, hour) {
        if (hour < moment().format("H")) {
            $hourRow.css("background-color", "#d3d3d3")
        }
        else if (hour > moment().format("H")) {
            $hourRow.css("background-color", "#77dd77")
        }
        else {
            $hourRow.css("background-color", "#ff6961")
        }
    };

    // SAVE TO LOCAL STORAGE
    $(document).on("click", "button", function(event) {
        event.preventDefault();

        var $index = $(this).attr("save-id");
        var inputId = "#input-"+$index;
        var $value = $(inputId).val();

        plannerText[$index] = $value;
        localStorage.setItem("storedPlans", JSON.stringify(plannerText));
    });

});