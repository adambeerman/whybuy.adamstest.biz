<?php if(!$user): ?>

    <div data-role = "fieldcontain">
        <h2>
            Why buy
        </h2>
        <h3>
            Developed by Adam Beerman
        </h3>
        <p>
            This is a tool for making rapid stock decisions. Can you compete against the market average?
        </p>
    </div>

<?php else: ?>

<div id = "stock_bucket">
    <div data-role = "content" class = "stock_pick">

        <form id = "stock_pick">
            <div data-role="fieldcontain">
                <label for="ticker">Choose stock:</label>
                <input type="search" name="ticker" id="ticker" data-mini="false" placeholder="Enter ticker" value=""  />

                <ul id="suggestions" data-role="listview" data-inset="true"></ul>
                <div id = "stock_price"><span style = "color: gray"></span></div>
            </div>


            <div class = "center-buttons">
                <fieldset data-role="controlgroup" data-type="horizontal" data-theme = "c">

                    <input type="radio" name="transact" id="buy" value="buy" checked="checked" />
                    <label for="buy">Buy</label>

                    <input type="radio" name="transact" id="sell" value="sell"  />
                    <label for="sell">Sell</label>

                </fieldset>
            </div>


            <div data-role="fieldcontain" data-theme = "c">
                <label for="number">Number of shares:</label>
                <input type="range" name="number" id="number" value="50" min="0" max="100" />
            </div>


            <div data-role="fieldcontain">
                <label for="reason">Why?</label>
                <textarea name="reason" id="reason"></textarea>
            </div>

            <a href="#" id="stock_submit" data-role="button" data-theme="b" data-mini="true">Submit</a>
        </form>

        <!-- Build history if already exists -->

        <br />
        <div id = "total_profit"></div>
        <div id = "spider_profit"></div>

        <div id="history" data-role = "fieldcontain">
            <table>

                <?php if(isset($existing)) {

                    echo "<tr>";
                    echo "<th>Stock</th>";
                    echo "<th>Date</th>";
                    echo "<th>Shares</th>";
                    echo "<th>Price</th>";
                    echo "<th>Profit</th>";
                    echo "</tr>";

                    foreach($existing as $entry) {
                        echo "<tr>";
                        echo "<td>".$entry['symbol']."</td>";
                        echo "<td>".date('n/d',$entry['created'])."</td>";

                        if($entry['type'] == 2){
                            echo "<td>(".$entry['num_shares'].")</td>";
                        }
                        elseif($entry['type'] == 1) {
                            echo "<td>".$entry['num_shares']."</td>";
                        }
                        else {
                            echo "<td>?</td>";
                        }

                        echo "<td>".$entry['price']."</td>";
                        echo "<td>".$entry['profit']."</td>";
                        echo "</tr>";
                    }
                }
                ?>
            </table>
        </div>
    </div>
</div>

<?php endif; ?>