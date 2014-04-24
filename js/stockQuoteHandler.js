var myQuote = {

    yqlURL: "http://query.yahooapis.com/v1/public/yql?q=",
    dataFormat: "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    symbol: "",
    date: "",
    type: "",
    number: "",
    price: "",
    purchasePrice: "",
    reason: "",
    stockStats: "",

    init: function () {


        myMetric.profit_calcs();

        // Submit click handler:
        $("#stock_submit").click(function () {

            // Find today's date
            var currentDate = new Date();

            //Get the ticker from the form:
            myQuote.symbol = $("#ticker").val().toUpperCase();
            myQuote.date = currentDate.getMonth()+1+"/"+currentDate.getDate();
            myQuote.type = $("input[name=transact]:checked").val();
            myQuote.number = $('#number').val();
            myQuote.reason = $('#reason').val();

            //Get the stock data from YQL via AJAX
            var $d = myQuote.getStockData();

            //After retrieving the JSON data, populate the table (nested AJAX call to populate database):
            $d.success(function (json, textStatus, jqXHR) {

                // Build a row for the history table. Find the name, and the current trade price
                myQuote.price = json.query.results.quote.LastTradePriceOnly;

                // Update the WhyBuy database, and populate the table on success of this
                $.ajax({
                    async: false,
                    url: "/index/transact",
                    data: {
                        symbol: myQuote.symbol,
                        type: myQuote.type,
                        num_shares: myQuote.number,
                        price: myQuote.price,
                        reason: myQuote.reason
                    },
                    type: 'post'
                }).success(function (response) {

                        //If selling shares, parentheses around number
                        if (myQuote.type == "sell") {
                            myQuote.number = "("+myQuote.number+")";
                        }

                        // Submit the values to the new row builder
                        var new_row = myQuote.buildRow(
                            myQuote.symbol, myQuote.date, myQuote.number, myQuote.price, "0.00"
                        );

                        // Populate the table on bottom of screen with the new information
                        myQuote.populateTable(new_row);

                        // Clear the inputs
                        $('#ticker').val("");
                        $('#number').val(50);
                        $('#reason').val("");
                        $('#stock_price h4').html('');
                    })
                    .error(function () {
                        alert('ERROR!');
                    });
                });

            // Update the profit calculations
            myMetric.profit_calcs();

            });


        // Populate with current value of stock when a user blurs from the stock selection input
        $('#ticker').blur(function () {

            // Gather the ticker value and convert to uppercase
            myQuote.symbol = $("#ticker").val().toUpperCase();
            $('#ticker').val(myQuote.symbol);

            if(myQuote.symbol != ""){

                // Gather the last stock price
                $('#stock_price span').html(myQuote.symbol+" - price: $"+myQuote.getCurrentPrice(myQuote.symbol));
            }
             else {
                // Keep the stock price field blank
                if($('#ticker').val() == ""){
                    $('#stock_price span').html("");
                }
            }
        });
    },

    getCurrentPrice: function($symbol) {

        //Build the URL to pass to YQL, selecting LastTradePriceOnly
        var currentPrice = myQuote.yqlURL + "select%20LastTradePriceOnly%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + $symbol + "%22)%0A%09%09&" + myQuote.dataFormat;

        $.ajax({
            async: false,
            url: currentPrice,
            data: '{}',
            dataType: 'json'
        }).success(function(json, textStatus, jqXHR) {

                myQuote.price = json.query.results.quote.LastTradePriceOnly;

            }).error(function() {
                alert('error');
            });

        return myQuote.price;
    },

    getStockData: function () {

        //Build the URL to pass to YQL. Gather all values:
        var realtimeQ = myQuote.yqlURL + "select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + myQuote.symbol + "%22)%0A%09%09&" + myQuote.dataFormat;

        //Using a jQuery Deferred object, get the json data:
        var $defer = $.ajax({
            async: false,
            url: realtimeQ,
            data: '{}',
            dataType: 'json'
        }).success(function (json, textStatus, jqXHR) {
            }).error(function () {
                alert('ERROR!');
            });

        //Return the jQuery deferred obj:
        return $defer;
    },

    buildRow: function (symbol, type, number, price) {

        var new_row = $('<tr />');
        for(arg in arguments) {

            new_row.append("<td>"+arguments[arg]+"</td>");
        }
        return new_row;

    },

    populateTable: function(new_row) {

        $("#history tr:first").after(new_row);

    },




};	//END: myQuote


//Function to return a blank if a value is null.
function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}




