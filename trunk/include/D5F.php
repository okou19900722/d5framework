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
		var $files;
		
		function D5F($lable=NULL,$template=NULL)
		{
			if(!empty($template)) $this->loop($lable,$template);
		}
		
		/**
		 *	Search context which started by '<!-- lablename' and terminated by 'lablename -->'
		 *	And setup the context to loop.
		 *	$lable - lablename $template - which template will be used
		 */
		function loop($lable='',$template='')
		{
			if($template!='')
			{
				# 取文件
				if(!$fp = fopen($template,"r")) msg("File not exist.");
				$this->files = fread($fp,filesize($template));
				fclose($fp);
				if(empty($lable)) return;
			}else{
				if(empty($this->files)) msg('Please tell D5F which template be needed.');
			}
			$reg = "/\<\!\-\- {$lable}(.*){$lable} \-\-\>/is";
			preg_match($reg,$this->files,$result);
			$this->loopbox = $result[1];
			$this->looper = $this->loopbox;
		}
		
		/**
		 *	Template parse
		 *	
		 *	
		 *	
		 */
		function parse($lable,$value)
		{
			if(empty($this->loopbox)) msg('Please run loop function first to setup the loop templates.');
			$this->looper = str_replace('{$'.$lable.'}',$value,$this->looper);
		}
		
		/**
		 *	Advance template parse
		 *
		 *
		 */
		function p($lable,$value=NULL)
		{
			global $module,$action;
			if(empty($this->loopbox)) msg('Please run loop function first to setup the loop templates.');
			if(is_array($lable) && is_array($value))
			{
				# 自动编译module,action和template系统变量
				array_push($lable,'module');
				array_push($lable,'action');
				array_push($lable,'template');
				
				array_push($value,$module);
				array_push($value,$action);
				array_push($value,$GLOBALS['config']['sys']['template']);
				# 调用模式一：双数组调用
				foreach($lable as $key=>$l)
				{
					$this->parse($l,$value[$key]);
				}
				
			}else if(is_array($lable) && $value==NULL){
				
				# 自动编译module和action
				$lable['module']=$module;
				$lable['action']=$action;
				$lable['template']=$GLOBALS['config']['sys']['template'];
				
				# 调用模式二：单数组调用
				foreach($lable as $key=>$l)
				{
					$this->parse($key,$l);
				}
			
			}else if(!is_array($lable) && !is_array($value)){
				
				# 调用模式三:普通字符串调用
				$this->parse($lable,$value);
			}else{
				msg('Wrong prase mode.Please check your code.');
			}
		}
		
		/**
		 *	
		 *	output
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
			$this->looper = '';
			$this->loopbox = '';
			$this->files = '';
			unset($this->looper);
			unset($this->loopbox);
			unset($this->files);
		}
	}

?>