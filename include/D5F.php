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
		
		function D5F($lable=NULL,$template=NULL)
		{
			if($lable!='' && $template!='')
			{
				$this->loop($lable,$template);
				return;
			}
			if(!empty($lable) || !empty($template)) msg("You lost a data in D5F build process.");
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
		 */
		function p($lable,$value=NULL)
		{
			if(empty($this->loopbox)) msg('Please run loop function first to setup the loop templates.');
			if(is_array($lable) && is_array($value))
			{
				// 调用模式一：双数组调用
				foreach($lable as $key=>$l)
				{
					$this->parse($l,$value[$key]);
				}
				
			}else if(is_array($lable) && $value==NULL){
				
				// 调用模式二：单数组调用
				foreach($lable as $key=>$l)
				{
					$this->parse($key,$l);
				}
			
			}else if(!is_array($lable) && !is_array($value)){
				
				// 调用模式三:普通字符串调用
				$this->parse($lable,$value);
			}else{
				msg('Wrong prase mode.Please check your code.');
			}
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
			unset($this->looper);
			unset($this->loopbox);
		}
	}

?>