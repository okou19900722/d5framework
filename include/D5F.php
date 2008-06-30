<?php
	
	/**
	 *	
	 *	D5Power Studio D5Framework Main class
	 *	ver 1.0
	 *	Build for loop html in specile template
	 *	
	 *	example: 	$d5f = new D5F();
	 *				$d5f->loop("loopUserinfo",makeTemp("looptest"));
	 *				$loopUserinfo.=$d5f->parse("userdate","Howard D5power");
	 *
	 *
	 *	html:		<!-- loopUserinfo
	 *				<div>{$userdate}</div>
	 *				loopUserinfo -->
	 */
	
	
	class D5F
	{
		var $template;
		var $lable;
		var $looper;
		
		function D5F()
		{
			
		}
		
		/**
		 *	Search context which started by '<!-- lablename' and terminated by 'lablename -->'
		 *	And setup the context to loop.
		 *	$lable - lablename $template - which template will be used
		 */
		function loop($lable,$template)
		{
			// 取文件
			if(!$fp = fopen($template,"r")) msg("File not exist.");
			$files = fread($fp,filesize($template));
			
			$reg = "/\<\!\-\- {$lable}(.*){$lable} \-\-\>/is";
			preg_match($reg,$files,$result);
			$this->looper = $result[1];
		}
		
		/**
		 *	
		 *	
		 *	
		 *	
		 */
		function parse($lable,$value)
		{
			if(empty($this->looper)) msg('Please run loop function first to setup the loop templates.');
			//$reg = "/\{\".$lable."\}/i";
			//$result = preg_replace($reg,$value,$this->looper);
			$result = str_replace("{\$".$lable."}",$value,$this->looper);
			return $result;
		}
	}

?>