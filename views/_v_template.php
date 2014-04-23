<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">

    <!-- INCLUDE SPECIAL FONT, MAIN.CSS, AND BOOTSTRAP.CSS -->

    <link href='http://fonts.googleapis.com/css?family=Sansita+One' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/css/bootstrap.min.css" type = "text/css">
    <link rel="stylesheet" href="/css/jquery.mobile-1.4.2.css" type = "text/css">
    <link rel="stylesheet" href="/css/stock2.css" type="text/css">


	<!-- Controller Specific JS/CSS -->

    <script src="/js/jquery-2.0.2.js"></script>
    <script src="/js/jquery.mobile-1.4.2.js"></script>
    <script src="/js/myQuote.js"></script>

    <script type="text/javascript">
        $(function() {
            myQuote.init();
        });
    </script>

	<?php if(isset($client_files_head)) echo $client_files_head; ?>



</head>

<body>

<div data-role = "page">


    <!-- placeholder to be able to capitalize the app name on the home page -->


    <div data-role = "header" data-fullscreen = "true" data-theme = "b">
        <?php if(!$user): ?>
            <a href="/users/signup" data-mini="true">Signup</a>
            <a href = "/users/login" data-mini="true">Login</a>
        <?php else: ?>
            <a href ="/users/logout" data-mini = "true" data-ajax = "false">Logout</a>
            <a href="/users/settings" data-icon="gear" data-mini="true">Settings</a>
        <?php endif; ?>

        <h1><a href = "/" data-ajax = "false"><?=APP_NAME?></a></h1>
    </div>

    <div id = "content" data-role = "content" data-theme = "a">
        <?php if(isset($content)) echo $content; ?>
        <?php if(isset($client_files_body)) echo $client_files_body; ?>
    </div>

</div>



<!-- <script src="/js/main.js"></script> -->


</body>
</html>