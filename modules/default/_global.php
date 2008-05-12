<?php

	/***********************************************
	 *
	 *		D5Framework
	 *
	 *		author:Benmouse		date:2007-11-12
	 *
	 *
	 **********************************************/
	 
	require_once("{$config['sys']['module_home']}/{$module}/_config.php");
	
	$module_css="";
	$module_js="";
	
	if($action!="submit") require_once(makeTemp("GLOBAL_HEAD"));
?>