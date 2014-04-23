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

        myQuote.profit_calcs();

        //Sumbit click handler:
        $("#stock_submit").click(function () {

            var currentDate = new Date();


            //Get the ticker from the form:
            myQuote.symbol = $("#ticker").val().toUpperCase();
            myQuote.date = currentDate.getMonth()+1+"/"+currentDate.getDate();
            myQuote.type = $("input[name=transact]:checked").val();
            myQuote.number = $('#number').val();
            myQuote.reason = $('#reason').val();

            //Get the stock data from YQL via AJAX:
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
            myQuote.profit_calcs();


            });


        // Populate with current value when a user blurs from the stock selection input

        $('#ticker').blur(function () {

            // Gather the ticker value and convert to uppercase
            myQuote.symbol = $("#ticker").val().toUpperCase();
            $('#ticker').val(myQuote.symbol);

            if(myQuote.symbol != ""){

                // Gather the last stock price
                var $d = myQuote.getCurrentPrice(myQuote.symbol);
                $('#stock_price span').html(myQuote.symbol + " - last price: $"+$d);

            }
             else {
                if($('#ticker').val() == ""){
                    $('#stock_price h4').html("");
                }
            }
        });
    },

    getCurrentPrice: function($symbol) {

        //Build the URL to pass to YQL:
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

        //Build the URL to pass to YQL:
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

    profit_calcs: function() {

    //Loop through each row on the history table

        var total_profit = 0;

        $('#history tr td:last-child').each(function() {

            myQuote.symbol = $(this).parent().children()[0].innerHTML;
            myQuote.number = $(this).parent().children()[2].innerHTML.replace("(","-").replace(")","");
            myQuote.purchasePrice = $(this).parent().children()[3].innerHTML;

            var current_price = myQuote.getCurrentPrice(myQuote.symbol);
            var profit = myQuote.number * (current_price - myQuote.purchasePrice);
            $(this).html(Math.round(profit*100)/100);

            total_profit += profit;
        });

        total_profit = Math.round(total_profit*100)/100;

        if(total_profit >= 0){
            $('#total_profit').html("<span class = 'gain'>TOTAL PROFIT: $"+total_profit+"</span>");
        }
        else {

            $('#total_profit').html("<span class = 'loss'>TOTAL LOSS: $"+total_profit*(-1)+"</span>");
        }

    }
};	//END: myQuote


//Function to return a blank if a value is null.
function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}




