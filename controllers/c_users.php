<?php
class users_controller extends base_controller {

    public function __construct() {
        parent::__construct();

        // Prove to myself tha the __construct() function was called
        // echo "users_controller construct called<br><br>";
    }

    public function index() {

    } # End of Method

    public function signup($error = NULL) {

        # Setup view
        $this->template->content = View::instance('v_users_signup');
        $this->template->title   = "Sign Up";

        # Pass data to the view
        $this->template->content->error = $error;

        # Render template
        echo $this->template;

    } # End of Method

    public function p_signup() {

        # Check for duplicate emails via JS / Ajax, but double check here
        /*if( !$this->confirm_unique_email($_POST['email'])){
            echo "not a unique e-mail";
            //return Router::redirect('/users/login/$error=signup');
        }*/


        ## Validate that the user has entered a valid login name
        $at_sign = strpos($_POST['email'], '@');

        # Error code 1 indicates invalid login name
        if($at_sign === false) {
            Router::redirect('/users/signup/$error=signup');
        }

        ## if the email has already been created, then alert the person signing up
        $email = $_POST['email'];
        $q = "SELECT created FROM users WHERE email = '".$email."'";
        $emailexists = DB::instance(DB_NAME)->select_field($q);

        # Error code 2 indicates that user already exists
        if(isset($emailexists)){
            Router::redirect('/users/signup/2');
        }

        ## Ensure that the user has entered a first name

        # Error code 3 indicates that user needs a first name
        if(strlen($_POST['first_name'])<1){
            Router::redirect('/users/signup/3');
        }

        ## Ensure password is greater than 5 characters
        # Error code 4 indicates that password is too short
        if(strlen($_POST['password'])<6) {
            Router::redirect('/users/signup/4');
        }

        # Give user the default avatar and profile photo
        $_POST['avatar'] = "example.gif";
        $_POST['photo'] = "p_example.gif";


        # Store time stamp data from user
        $_POST['created']  = Time::now();
        $_POST['modified'] = Time::now();

        # Encrypt the password
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Create an encrypted token via their email address and a random string
        $_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());

        # Insert this user into the database
        $user_id = DB::instance(DB_NAME)->insert('users', $_POST);

        # Redirect to the login page, and inform them that they have signed up
        # Currently using $error = 2 as the indication that they have signed up
        Router::redirect('/users/login/2');

    } # End of Method

    public function login($error = NULL) {

        # Setup view
        $this->template->content = View::instance('v_users_login');
        $this->template->title   = "Login";

        # Pass data to the view
        $this->template->content->error = $error;

        # Render template
        echo $this->template;

    } # End of Method

    public function p_login() {

        # Sanitize the user entered data
        $_POST = DB::instance(DB_NAME)->sanitize($_POST);

        # Hash submitted password so we can compare it against one in the db
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Search the db for this email and password
        # Retrieve the token if it's available

        $q = 'SELECT token
            FROM users
            WHERE email = "'.$_POST['email'].'"
            AND password = "'.$_POST['password'].'"';

        $token = DB::instance(DB_NAME)->select_field($q);

        # If we didn't find a matching token in the database, it means login failed
        if(!$token) {

            # Send them back to the login page
            # Error code 1 indicates that they have incorrect login credentials
            Router::redirect("/users/login/1");

        }
        # But if we did, login succeeded!
        else {

            # Store this token in a cookie using setcookie()
            setcookie("token", $token, strtotime('+1 year'), '/', false);

            # Send them to the main page
            Router::redirect('/tables/index');
        }
    } # End of Method

    public function logout() {
        # Generate and save a new token for next login
        $new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());

        # Create the data array we'll use with the update method
        # In this case, we're only updating one field, so our array only has one entry
        $data = Array("token" => $new_token);

        # Do the update
        DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");

        # Delete their token cookie by setting it to a date in the past - effectively logging them out
        setcookie("token", "", strtotime('-1 year'), '/');

        # Send them back to the main index.
        Router::redirect("/");

    } # End of Method

	
} # eoc
