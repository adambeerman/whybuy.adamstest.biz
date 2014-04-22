<div id = "stock_bucket">
    <div data-role = "content" class = "stock_pick">

        <form id = "stock_pick">
            <div data-role="fieldcontain">
                <label for="ticker">Choose stock:</label>
                <input type="search" name="ticker" id="ticker" data-mini="false" placeholder="Enter ticker" value=""  />

                <div id = "stock_price"><h4><span style = "color: gray"></span></h4></div>
            </div>



            <fieldset data-role="controlgroup" data-type="horizontal" >

                <input type="radio" name="transact" id="buy" value="Buy" checked="checked" />
                <label for="buy">Buy</label>

                <input type="radio" name="transact" id="sell" value="Sell"  />
                <label for="sell">Sell</label>

            </fieldset>

            <div data-role="fieldcontain">
                <label for="number">Number of shares:</label>
                <input type="range" name="number" id="number" value="50" min="0" max="100" />
            </div>


            <!--
            <div data-role="fieldcontain">
                <label for="reason">Why?</label>
                <textarea name="reason" id="reason"></textarea>
            </div>

            <div data-role="fieldcontain">
                <label for="question">Do you think the stock will go up 5% within 6 months?</label>
                <fieldset data-role="controlgroup" data-type="horizontal" >

                    <input type="radio" name="question" id="yes" value="yes" />
                    <label for="yes">yes</label>

                    <input type="radio" name="question" id="no" value="no"  />
                    <label for="no">no</label>

                </fieldset>

            </div>
            -->

            <a href="#" id="submit" data-role="button" data-theme="f" data-mini="true">Submit</a>
        </form>

        <div id="history">
            <table>

            </table>
        </div>
    </div>
</div>