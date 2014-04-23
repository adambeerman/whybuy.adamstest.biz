<h2>Sign Up</h2>

<?php if(isset($msg)): ?>
    <div class = 'error' >
        <?php

        //Display different error codes for different login issues
        switch(htmlspecialchars($msg)) {
            case "signup": echo "SIGNUP ISSUE";
                break;
            case 1: echo "Please enter a valid e-mail address";
                break;
            case "email_exists": echo "E-mail address already exists!";
                break;
            case "first_name_needed": echo "We need your first name!";
                break;
            case "password_length": echo "Password needs to be at least 6 characters";
                break;
            default: echo "Login issues. Sorry!";
            break;
        }?>
    </div>
<?php endif; ?>

<form id = "sign_up_form" method='POST' action='/users/p_signup' data-ajax="false">

    <div data-role="fieldcontain">
        <label for="first_name">Name</label>
        <input type="text" name="first_name" id="first_name" data-mini="false" placeholder="name" value=""  />
    </div>

    <div data-role="fieldcontain">
        <label for="email">Email address</label>
        <input type = "email" name = "email" id = "email" data-mini="false" placeholder="e-mail address" />
    </div>

    <div data-role = "fieldcontain">
        <label for="password">Password</label>
        <input type = "password" name = "password" placeholder=" at least 5 digits, please" />
    </div>

    <div data-role = "fieldcontain">
        <label for = "submit"></label>
        <input type='submit' value='Sign up'>
    </div>


</form>