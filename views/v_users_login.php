


<h2>Log In</h2>

    <?php if(isset($error)): ?>
        <?php
        switch($error) {
            case 1:
                echo "<div class='error'>";
                echo "Login failed. Please double check your email and password";
                echo "</div>";
                break;
            case 2:
                echo "<div class ='welcome'>";
                echo "Thank you for joining ".APP_NAME."!";
                echo "<br>";
                echo "Please login below";
                echo "</div>";
                break;
            default:
                break;
        }
        ?>

    <?php endif; ?>

<!--Login form start-->
<form id="login" action="/users/p_login" method="post" data-ajax="false">

    <div data-role="fieldcontain" class="ui-field-contain ui-body ui-br">
        <label for="email">Email:</label>
        <input type="email" value="" id="email" name="email" class="ui-input-text ui-body-null ui-corner-all ui-shadow-inset ui-body-c">
    </div>

    <div data-role="fieldcontain" class="ui-field-contain ui-body ui-br">
        <label for="password">Password:</label>
        <input type="password" value="" id="password" name="password" class="ui-input-text ui-body-null ui-corner-all ui-shadow-inset ui-body-c">
    </div>

    <fieldset class="ui-grid-a">
        <div class="ui-block-a"><button data-theme="b" type="submit" class="ui-btn-hidden" aria-disabled="false">Login</button></div>
    </fieldset>

</form>
<!-- /Login form end-->