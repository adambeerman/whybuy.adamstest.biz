var myMetric = {

    profit: "",
    irr: "",

    profit_calcs: function() {


        // Counter for total value and total profit
        var total_value = 0;
        var total_profit = 0;

        // Loop through each row on the history table to update individual profits
        $('#history tr td:last-child').each(function() {

            myQuote.symbol = $(this).parent().children()[0].innerHTML;

            console.log(myQuote.symbol);

            myQuote.number = $(this).parent().children()[2].innerHTML.replace("(","-").replace(")","");
            myQuote.purchasePrice = $(this).parent().children()[3].innerHTML;

            var current_price = myQuote.getCurrentPrice(myQuote.symbol);

            console.log(current_price);

            var profit = myQuote.number * (current_price - myQuote.purchasePrice);

            console.log("profit should be updating now: " + profit);
            $(this).html(Math.round(profit*100)/100);

            total_value += current_price * myQuote.number;
            total_profit += profit;
        });

        // Round the value and profit figures
        total_value = Math.round(total_value*100)/100;
        total_profit = Math.round(total_profit*100)/100;

        // Conditionally update the database if profit != 0
        if(total_profit != 0) {
            myMetric.update_user_profit(total_value, total_profit);
        }

        // Display profit or loss, depending on sign of profit
        if(total_profit > 0){
            $('#total_profit').html("<span class = 'gain'>TOTAL PROFIT: $"+total_profit+"</span>");
        }
        else {

            $('#total_profit').html("<span class = 'loss'>TOTAL LOSS: $"+total_profit*(-1)+"</span>");
        }

    },

    update_user_profit: function($value, $profit) {

        $.ajax({
            async: false,
            url: "/users/update_profit",
            data: {
                metric_value: $value,
                metric_profit: $profit
            },
            type: 'post'
        }).success(function (response) {
            }).error(function () {
                alert('ERROR here?!');
            });

    }

}
