var myMetric = {

    profit: "",
    irr: "",


    init: function() {

    },

    profit_calcs: function() {

        //Loop through each row on the history table

        // Counter for total profit
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

        // For now, conditionally update the database if profit != 0
        if(total_profit != 0) {
            myMetric.update_user_metrics(total_profit);
        }


        // Display profit or loss, depending on sign of profit
        if(total_profit > 0){
            $('#total_profit').html("<span class = 'gain'>TOTAL PROFIT: $"+total_profit+"</span>");
        }
        else {

            $('#total_profit').html("<span class = 'loss'>TOTAL LOSS: $"+total_profit*(-1)+"</span>");
        }

    },

    update_user_metrics: function($profit) {


        $.ajax({
            async: false,
            url: "/users/update_metrics",
            data: {
                metric_profit: $profit
            },
            type: 'post'
        }).success(function (response) {

                console.log('database net profit: '+response);
            }).error(function () {
                alert('ERROR here?!');
            });

    }

}
