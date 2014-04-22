<h2>Sign Up</h2>

<form id = "sign_up_form" method='POST' action='/users/p_signup'>

    <?php if(isset($error)): ?>
        <div class = 'error' >
            <?php

            //Display different error codes for different login issues
            switch($error) {
                case "signup": echo "SIGNUP ISSUE";
                    break;
                case 1: echo "Please enter a valid e-mail address";
                    break;
                case 2: echo "E-mail address already exists!";
                    break;
                case 3: echo "We at least need your first name!";
                    break;
                case 4: echo "Password needs to be at least 6 characters";
                    break;
                default: echo "Login issues. We're working on it!";
                break;
            }?>
        </div>
    <?php endif; ?>

    Name<br>
    <input type='text' name='first_name' placeholder="First">
    <input type='text' name='last_name' placeholder="Last">
    <br><br>

    Email<br>
    <input type='text' name='email' placeholder="e-mail address">
    <br><br>

    Password<br>
    <small>(greater than 5 digits, please!)</small><br>
    <input type='password' name='password' placeholder="password">
    <br><br>

    <input type='submit' value='Sign up'>

</form>