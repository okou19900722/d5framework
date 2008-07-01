<?php
	
	/**
	 *	
	 *	D5Power Studio D5Framework Main class
	 *	ver 1.0
	 *	Build for loop html in specile template
	 *	
	 *	example: 	$d5f = new D5F();
	 *				$d5f->loop("loopUserinfo",makeTemp("looptest"));
	 *				$d5f->parse("userdate","Howard D5power");
	 *				$loopUserinfo.=$d5f->out();
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
		var $loopbox;
		
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
			fclose($fp);
			
			$reg = "/\<\!\-\- {$lable}(.*){$lable} \-\-\>/is";
			preg_match($reg,$files,$result);
			$this->loopbox = $result[1];
			$this->looper = $this->loopbox;
		}
		
		/**
		 *	
		 *	
		 *	
		 *	
		 */
		function parse($lable,$value)
		{
			if(empty($this->loopbox)) msg('Please run loop function first to setup the loop templates.');
			$this->looper = str_replace("{\$".$lable."}",$value,$this->looper);
		}
		
		/**
		 *	
		 *	
		 *	
		 *	
		 */
		function out()
		{
			$result=$this->looper;
			$this->looper=$this->loopbox;
			return $result;
		}
		/**
		 *
		 *
		 *
		 *
		 *
		 */
		function clear()
		{
			$this->looper = "";
			$this->loopbox = "";
		}
	}

?>