/**
 * Created with JetBrains PhpStorm.
 * User: adam
 * Date: 12/20/13
 * Time: 9:34 AM
 * To change this template use File | Settings | File Templates.
 */


//This function is called from the tables_view when it is loaded
// This will only be called once.
var updateEntries = function() {

    // Run the summations for each category
    // Can't access the values from an array
    // But can go through and find all the variables that match criteria

    sum = [0,0,0,0];

    $('.accounting').each(function() {
        switch($(this).parent().parent().attr("id")) {
            case "revenue": sum[0] += parseFloat(this.innerHTML);
                break;
            case "cos": sum[1] += parseFloat(this.innerHTML);
                break;
            case "opex": sum[2] += parseFloat(this.innerHTML);
                break;
            case "otherex": sum[3] += parseFloat(this.innerHTML);
                break;
            default:
                break;
        }
    });

    // Inject the results received from process.php into the results div
    $('#revenue_sum span:last-child').html("<strong>"+accounting.formatMoney(sum[0])+"</strong>");
    $('#cos_sum span:last-child').html("<strong>"+accounting.formatMoney(sum[1])+"</strong>");
    $('#opex_sum span:last-child').html("<strong>"+accounting.formatMoney(sum[2])+"</strong>");
    $('#otherex_sum span:last-child').html("<strong>"+accounting.formatMoney(sum[3])+"</strong>");


    // Run the profit and margin calculations
    // Note that if a user has left an entry blank, then the entry will store the value as "0"
    // These calculations should still work when a user hasn't filled in an entry

    $grossProfit = accounting.formatMoney(sum[0]-sum[1]);
    $grossMargin = accounting.formatNumber(100*accounting.unformat($grossProfit)/accounting.unformat(sum[0]));
    $operatingProfit = accounting.formatMoney(sum[0]-sum[1]-sum[2]);
    $operatingMargin = accounting.formatNumber(100*accounting.unformat($operatingProfit)/accounting.unformat(sum[0]));
    $netProfit = accounting.formatMoney(sum[0]-sum[1]-sum[2]-sum[3]);
    $netMargin = accounting.formatNumber(100*accounting.unformat($netProfit)/accounting.unformat(sum[0]));

    $('#gross_profit').html($grossProfit);
    $('#gross_margin').html($grossMargin+" %");
    $('#operating_profit').html($operatingProfit);
    $('#operating_margin').html($operatingMargin+" %");
    $('#net_profit').html($netProfit);
    $('#net_margin').html($netMargin+" %");

    $('#net_profit').css("border-bottom", "1px double darkgray");
};


//Neatly format the accounting entries on page load

$(document).ready(function(){
    updateEntries();
    $(".accounting").each(function(){
        $(this).html(accounting.formatMoney(this.innerHTML));

    });
});


//Formatting
$('#cos, #opex, #otherex').css("border-bottom", "1px solid darkgray");

