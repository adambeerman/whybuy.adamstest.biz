<div id = "stock_bucket">
    <div data-role = "content" class = "stock_pick">

        <form id = "stock_pick">
            <div data-role="fieldcontain">
                <label for="ticker">Choose stock:</label>
                <input type="search" name="ticker" id="ticker" data-mini="false" placeholder="Enter ticker" value=""  />

                <div id = "stock_price"><h4><span style = "color: gray"></span></h4></div>
            </div>



            <fieldset data-role="controlgroup" data-type="horizontal" data-theme = "c">

                <input type="radio" name="transact" id="buy" value="buy" checked="checked" />
                <label for="buy">Buy</label>

                <input type="radio" name="transact" id="sell" value="sell"  />
                <label for="sell">Sell</label>

            </fieldset>

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

        <div id="history" data-role = "fieldcontain">
            <table>

            </table>
        </div>
    </div>
</div>