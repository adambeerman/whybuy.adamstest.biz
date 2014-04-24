<?php
/**
 * Created by JetBrains PhpStorm.
 * User: adam
 * Date: 4/24/14
 * Time: 9:17 AM
 * To change this template use File | Settings | File Templates.
 */

class Metric {

    public static function irr($cashFlows = null, $finalCashFlow = null, $tol = 0.1){

        // Calculating the internal rate of return if you are cashing out right now
        // today is time 0, and the past is negative time.

        $irr_guess = 0.1;
        $currentTime = time();

        do {

        //for($i = 1; $i < 100; $i++) {
            $npv = doubleval($finalCashFlow['metric_value']);
            foreach($cashFlows as $cashFlow) {

                if($cashFlow['cash_flow'] != 0) {

                    $time_diff = $cashFlow['created'] - $currentTime;
                    $period = $time_diff/(60*60*24*365);
                    $denom = pow((1+$irr_guess),$period);
                    $npv = $npv + doubleval($cashFlow['cash_flow']/$denom);
                }
            }

            if($npv < 0) {
                $irr_guess -= 0.01;
            }
            else {
                $irr_guess += 0.01;
            }
        //}

        } while (abs($npv) > 3);


        return $irr_guess;



    }

}