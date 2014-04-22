<?php

class index_controller extends base_controller {
	
	/*-------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------*/
	public function __construct() {
		parent::__construct();
	} 
		
	/*-------------------------------------------------------------------------------------------------
	Accessed via http://localhost/index/index/
	-------------------------------------------------------------------------------------------------*/
	public function index() {

		# Any method that loads a view will commonly start with this
		# First, set the content of the template with a view file
			$this->template->content = View::instance('v_index_index');
			
		# Now set the <title> tag
			$this->template->title = APP_NAME;
	
		# CSS/JS includes
			/*
			$client_files_head = Array("");
	    	$this->template->client_files_head = Utils::load_client_files($client_files);
	    	
	    	$client_files_body = Array("");
	    	$this->template->client_files_body = Utils::load_client_files($client_files_body);   
	    	*/
	      					     		
		# Render the view
			echo $this->template;

	} # End of method

    public function transact() {

        $_POST['created'] = Time::now();

        //echo $_POST['type'];

        switch($_POST['type']) {
            case "buy":
                $_POST['type'] = 1;
                break;
            case "sell":
                $_POST['type'] = 1;
                break;
            default:
                $_POST['type'] = 9;
                break;
        }

        // Temporarily using a dummy user
        $_POST['user_id'] = 0;

        $transact_id = DB::instance(DB_NAME)->insert('transactions', $_POST);

        echo $_POST['type'];

    } # end of method transact
	
} # End of class
