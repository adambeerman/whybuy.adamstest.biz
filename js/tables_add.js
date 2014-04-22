/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 12/12/13
 * Time: 11:59 PM
 * To change this template use File | Settings | File Templates.
 */

/* ------------------------
Functionality for adding a new table
---------------------------- */
// Set up the options for ajax
var options = {
    type: 'POST',
    url: '/tables/add/',
    beforeSubmit: function() {
        $('#new_table').hide();
        $('#new_table_status').css("visibility", "visible");
        $('#new_table_status').html("adding table...");
    },
    success: function(response) {

        // The /tables/add/ function returns the name an id in JSON format.
        var data = $.parseJSON(response);

        //parse the data to insert into the user's tables
        var $insert = data['name'] + " - " +
            "<a href = '/tables/view/"+ data['id'] +"'>View</a> | " +
            "<a href = '/tables/edit/"+ data['id'] +"'>Edit</a> | " +
            "<a href = '/tables/delete/"+ data['id'] +"'>Delete</a>" +
            "<br><small>&nbsp;&nbsp;&nbsp;&nbsp;" +
            "Just created!</small>";

        $("#user_table_index ul").append('<li>' + $insert + '</li>');


        //Hide the status div, and clear the contents of the html
        $('#new_table_status').css("visibility", "hidden");
        $('#new_table_status').html();

        //Show the original form again, and clear the entry in the first input
        $('#new_table').show();
        $('#new_table input:first-child').val("");
    }
};

//Ajax-ify the form
$(document).ready(function() {
    // bind 'myForm' and provide a simple callback functionas   \
    $('form').ajaxForm(options);
});
