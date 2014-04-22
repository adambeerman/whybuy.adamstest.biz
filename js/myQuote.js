var myQuote = {

    yqlURL: "http://query.yahooapis.com/v1/public/yql?q=",
    dataFormat: "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    symbol: "",
    type: "",
    number: "",
    price: "",
    reason: "",
    stockStats: "",

    init: function () {

        //Sumbit click handler:
        $("#submit").click(function () {

            //Get the ticker from the form:
            myQuote.symbol = $("#ticker").val();
            myQuote.type = $("input[name=transact]:checked").val();
            myQuote.number = $('#number').val();
            myQuote.reason = $('#reason').val();

            //Get the stock data from YQL, return a jQuery Deferred:
            var $d = myQuote.getStockData();

            //After retrieving the JSON data, populate the table:
            $d.success(function (json, textStatus, jqXHR) {

                // Build a row for the history table. Find the name, and the current trade price

                myQuote.price = json.query.results.quote.LastTradePriceOnly;

                // Submit the values to the new row builder
                var new_row = myQuote.buildRow(
                    myQuote.symbol, myQuote.type, myQuote.number, myQuote.price, myQuote.reason
                );

                myQuote.populateTable(new_row);

            });

            //Update the database with the user's new transaction.

            $.ajax({
                url: "/index/transact",
                data: {
                    symbol: myQuote.symbol,
                    type: myQuote.type,
                    num_shares: myQuote.number,
                    price: myQuote.price,
                    reason: myQuote.reason
                },
                type: 'post'
                //dataType: 'json'
            }).success(function (response) {

                    console.log(response);
                    alert("Transaction id: " + response);

                }).error(function () {
                    alert('ERROR!');
                });

            });

        // Ticker input change handler

        $('#ticker').blur(function () {

            // Gather the ticker value
            myQuote.symbol = $("#ticker").val();

            if(myQuote.symbol != ""){

                // Round up the stock data
                var $d = myQuote.getStockData();

                $d.success(function(json){
                        $('#stock_price h4').html("Last Price: "+valueOrDefault(json.query.results.quote.LastTradePriceOnly));
                    }
                );
            }
             else {
                if($('#ticker').val() == ""){
                    $('#stock_price h4').html("");
                }
            }


        });


    },

    getStockData: function () {

        //Build the URL to pass to YQL:
        var realtimeQ = myQuote.yqlURL + "select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + myQuote.symbol + "%22)%0A%09%09&" + myQuote.dataFormat;

        //Using a jQuery Deferred object, get the json data:
        var $defer = $.ajax({
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

    buildRow: function (symbol, type, number, price, reason) {

        var new_row = $('<tr />');
        for(arg in arguments) {

            new_row.append("<td>"+arguments[arg]+"</td>");
        }
        return new_row;

    },

    populateTable: function(new_row) {

        if($('#history tr').length < 1){
            var header_row = "<tr><th>Stock</th>"+
                "<th>Trade</th>" +
                "<th># Shares</th>" +
                "<th>Price</th>" +
                "<th>Profit/(Loss)</th></tr>";
            console.log(header_row);

            $("#history table").html(header_row);
        }

        new_row.appendTo($("#history table"));

    }

};	//END: myQuote


//Function to return a blank if a value is null.
function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}

function spider(val, type) {


    return val
}