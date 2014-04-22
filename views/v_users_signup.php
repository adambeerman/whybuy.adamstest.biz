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
        <input type = "password" name = "password" placeholder="> 5 digits, please" />
    </div>

    <div data-role = "fieldcontain">
        <label for = "submit"></label>
        <input type='submit' value='Sign up'>
    </div>


</form>