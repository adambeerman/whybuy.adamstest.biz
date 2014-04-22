//This is the Javascript for editing the entries in the Income Table

//Goal is to perform an AJAX transfer after each entry is updated


/* ----------------------------
Caption functionality - caption and caption_form toggle on getting clicked
------------------------------- */

$("#caption").click(function() {
    $("#caption").hide();
    $("#caption_form").show();

});


//AJAX setup for updating the table's caption
var options = {
    type: 'POST',
    url: '/tables/edit_caption/',
    beforeSubmit: function() {
        $('#caption').html("updating...");
    },
    success: function(response) {

        // The /tables/add/ function returns the name an id in JSON format.
        var data = $.parseJSON(response);

        $("#caption").html(data['caption']);

        //Hide the status div, and clear the contents of the html
        $('#caption').removeClass("blue_text");
        $('#caption_form').hide();
        $('#caption').show();
        $('#last_modified').html('Last Modified: ' + data['modified']);

    }
};

//Ajax-ify the form
$(document).ready(function() {
    // bind 'myForm' and provide a simple callback functionas   \
    $('#caption_update').ajaxForm(options);
});


/* -------------------
AJAX setup for storing the table entries
 --------------------- */

//Function that is called on successful input change
var updateEntries = function($formName) {

    //Serialize the form for easy AJAX transfer
    var $data = $('#'+$formName).serialize();

    $.ajax({
        type: 'POST',
        url: '/tables/edit_entries/'+$formName+'/',
        beforeSend: function() {},
        data: $data,
        success: function(response) {

            var response = $.parseJSON(response);
            //console.log(response);

            //Determine the sum of the entries - need to use accounting.unformat first!
            var index,
                sum = 0;

            for (index = 0; index < response[$formName].length; ++index) {
                sum += accounting.unformat(response[$formName][index]);
            }

            // Inject the results received from process.php into the results div
            $('#'+$formName+'_sum span:last-child').html(accounting.formatMoney(sum));

            //Update timestamp in the heading
            $('#last_modified').html('Last Modified: ' + response['modified']);
        }

    }); // end ajax setup
};

//Ajax-ify the form
$(document).ready(function() {
    // bind 'myForm' and provide a simple callback functionas   \
    $('#revenue input').change(function() {updateEntries("revenue");});
    $('#cos input').change(function() {updateEntries("cos");});
    $('#opex input').change(function() {updateEntries("opex");});
    $('#otherex input').change(function() {updateEntries("otherex");});

});

/* ---------------------------
Jquery listeners to determine when the "expand" class has been clicked
------------------------------ */

//Functionality for clicking on the "[+]" sign
$('.expand').click(function(){

    //Determine the id of the main div (i.e. find id of parent of parent of parent)
    var myClass = $(this).parent().attr("id");

    //Determine index of the latest entry
    // This is important for indexing the entries for each of the different fields
    var myIndex = $(this).index()-1;

    //Generate the Placeholder values for the section that is expanding a row
    switch(myClass) {
        case "revenue":
            var placeholderLeft = "Revenue Component Name";
            var placeholderRight = "Revenue";
            break;
        case "cos":
            var placeholderLeft = "Cost of Sales Component Name";
            var placeholderRight = "Cost of Sales";
            break;
        case "opex":
            var placeholderLeft = "Op Ex Component Name";
            var placeholderRight = "Operating Expense";
            break;
        case "otherex":
            var placeholderLeft = "Other Expense Component Name";
            var placeholderRight = "Other Expense";
            break;
        default:
            break;
    }

    // New Entry to be in serted upon successful expand click
    $newEntry = '<div class = "entry">' +
                    '<span class = "entry_name pull-left">' +
                        '<input placeholder="' + placeholderLeft+'" name = "'+ myClass+'Name['+myIndex + ']">'+
                    '</span>' +
                    '<span class = "pull-right">'+
                        '<input placeholder="'+placeholderRight+'" class = "accounting" name = "'+myClass+'['+myIndex+']">' +
                    '</span>' +
                '</div>';


    // Insert the new entry before the expandable div
    $($newEntry).insertBefore(this);

    //Initiate the accounting format function to the new cells
    $('.accounting').change(function(){
        //Reformat the entry as currency using an outside accounting JS plugin
        var $moneyPlaceholder = $(this).val();
        $(this).val(accounting.formatMoney($moneyPlaceholder));
    });

    //Initiate the functionality of the updateEntries function
    $('#'+myClass+' input').change(function() {updateEntries(myClass);});

});

// When an "accounting" class has been changed, update the values to accounting format,
// And then sum the contents to the "total", and run the profit calculations if applicable
$('.accounting').change(function(){

    //Reformat the entry as currency using an outside accounting JS plugin
    var $moneyPlaceholder = $(this).val();
    $(this).val(accounting.formatMoney($moneyPlaceholder));

});


// When opening up the page, each entry will be populated with a nonformatted value.
// This function call ensures that each entry is formatted properly

$(document).ready(function(){
    $(".accounting").each(function(){
        if(this.value != 0) {
            $(this).val(accounting.formatMoney(this.value))
            updateEntries('revenue');
            updateEntries('cos');
            updateEntries('opex');
            updateEntries('otherex');
        }
        else {
            $(this).val("");
        }

    });
});
