/*
范例代码
HTML：
-------
<input name="startTime" type="text" id="startTime" class="inputer" style="width:80px" readonly onclick="firstRun();showcalendar(event, this);if(this.value=='0000-00-00')this.value=''"/>

JAVASCRIPT：
---------------
var _firstRun = true;
function firstRun()
{
	if(!_firstRun) return;
	loadcalendar();
	_firstRun = false;
}

CSS：
------
.header {font: 12px Arial, Tahoma !important;font-weight: bold !important;font: 11px Arial, Tahoma;font-weight: bold;color: #154BA0;background:#C2DEED;height: 25px;padding-left: 10px;
}
.header td {padding-left: 10px;}
.header a {color: #154BA0;}
.header input {background:none;vertical-align: middle;height: 16px;}
.category {font: 12px Arial, Tahoma !important;font: 11px Arial, Tahoma;color: #92A05A;height:20px;background-color: #FFFFD9;}
.category td {border-bottom: 1px solid #DEDEB8;}
.expire, .expire a:link, .expire a:visited {color: #999999;}
.default, .default a:link, .default a:visited {color: #000000;}
.checked, .checked a:link, .checked a:visited {color: #FF0000;}
.today, .today a:link, .today a:visited {color: #00BB00;}
#calendar_year {display: none;line-height: 130%;background: #FFFFFF;position: absolute;z-index: 10;}
#calendar_year .col {float: left;background: #FFFFFF;margin-left: 1px;border: 1px solid #86B9D6;padding: 4px;}
#calendar_month {display: none;background: #FFFFFF;line-height: 130%;border: 1px solid #86B9D6;padding: 4px;position: absolute;z-index: 11;}
.tableborder {background: white;border: 1px solid #86B9D6;}
#year,#month{padding-right:10px;}

*/


var Calendar_ie =navigator.appName=="Microsoft Internet Explorer"?true:false;

var Calendar_controlid = null;
var Calendar_currdate = null;
var Calendar_startdate = null;
var Calendar_startdate  = null;
var Calendar_yy = null;
var Calendar_mm = null;
var Calendar_hh = null;
var Calendar_ii = null;
var Calendar_currday = null;
var Calendar_addtime = false;
var Calendar_today = new Date();
var Calendar_lastcheckedyear = false;
var Calendar_lastcheckedmonth = false;
function _cancelBubble(event) {
e = event ? event : window.event ;
if(Calendar_ie) {
	e.cancelBubble = true;
} else {
	e.stopPropagation();
}
}
function getposition(obj) {
	var r = new Array();
	r['x'] = obj.offsetLeft;
	r['y'] = obj.offsetTop;
	while(obj = obj.offsetParent) {
	r['x'] += obj.offsetLeft;
	r['y'] += obj.offsetTop;
	}
	return r;
}
function loadcalendar() {
	
s = '';
s += '<div id="calendar" style="display:none; position:absolute; z-index:9;" onclick="_cancelBubble(event)">';
if (Calendar_ie)
{
s += '<iframe width="200" height="160" src="about:blank" style="position: absolute;z-index:-1;"></iframe>';
}
s += '<div style="width: 200px;"><table class="tableborder" cellspacing="0" cellpadding="0" width="100%" style="text-align: center">';
s += '<tr align="center" class="header"><td class="header"><a href="#" onclick="refreshcalendar(Calendar_yy, Calendar_mm-1);return false" title="上一月"><<</a></td><td colspan="5" style="text-align: center" class="header"><a href="#" onclick="showdiv(\'year\');_cancelBubble(event);return false" title="点击选择年份" id="year"></a>  -  <a id="month" title="点击选择月份" href="#" onclick="showdiv(\'month\');_cancelBubble(event);return false"></a></td><td class="header"><A href="#" onclick="refreshcalendar(Calendar_yy, Calendar_mm+1);return false" title="下一月">>></A></td></tr>';
s += '<tr class="category"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';
for(var i = 0; i < 6; i++) {
s += '<tr class="altbg2">';
for(var j = 1; j <= 7; j++)
s += "<td id=d" + (i * 7 + j) + " height=\"19\">0</td>";
s += "</tr>";
}
s += '<tr id="hourminute"><td colspan="7" align="center"><input type="text" size="1" value="" id="hour" onKeyUp=\'this.value=this.value > 23 ? 23 : zerofill(this.value);Calendar_controlid.value=Calendar_controlid.value.replace(/\\d+(\:\\d+)/ig, this.value+"$1")\'> 点 <input type="text" size="1" value="" id="minute" onKeyUp=\'this.value=this.value > 59 ? 59 : zerofill(this.value);Calendar_controlid.value=Calendar_controlid.value.replace(/(\\d+\:)\\d+/ig, "$1"+this.value)\'> 分</td></tr>';
s += '</table></div></div>';//http://www.codefans.net
s += '<div id="calendar_year" onclick="_cancelBubble(event)"><div class="col">';
for(var k = 1930; k <= 2019; k++) {
s += k != 1930 && k % 10 == 0 ? '</div><div class="col">' : '';
s += '<a href="#" onclick="refreshcalendar(' + k + ', Calendar_mm);getid(\'calendar_year\').style.display=\'none\';return false"><span' + (Calendar_today.getFullYear() == k ? ' class="Calendar_today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
}
s += '</div></div>';
s += '<div id="calendar_month" onclick="_cancelBubble(event)">';
for(var k = 1; k <= 12; k++) {
s += '<a href="#" onclick="refreshcalendar(Calendar_yy, ' + (k - 1) + ');getid(\'calendar_month\').style.display=\'none\';return false"><span' + (Calendar_today.getMonth()+1 == k ? ' class="Calendar_today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? ' ' : '') + ' 月</span></a><br />';
}
s += '</div>';
var nElement = document.createElement("div");
nElement.innerHTML=s;
document.getElementsByTagName("body")[0].appendChild(nElement);
//document.write(s);
document.onclick = function(event) {
getid('calendar').style.display = 'none';
getid('calendar_year').style.display = 'none';
getid('calendar_month').style.display = 'none';
}
getid('calendar').onclick = function(event) {
_cancelBubble(event);
getid('calendar_year').style.display = 'none';
getid('calendar_month').style.display = 'none';
}
}
function parsedate(s) {
/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : Calendar_today.getFullYear();
var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : Calendar_today.getMonth() + 1;
var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : Calendar_today.getDate();
var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
return new Date(m1, m2 - 1, m3, m4, m5);
}
function settime(d) {
getid('calendar').style.display = 'none';
Calendar_controlid.value = Calendar_yy + "-" + zerofill(Calendar_mm + 1) + "-" + zerofill(d) + (Calendar_addtime ? ' ' + zerofill(getid('hour').value) + ':' + zerofill(getid('minute').value) : '');
}
function showcalendar(event, Calendar_controlid1, Calendar_addtime1, Calendar_startdate1, Calendar_startdate1) {
Calendar_controlid = Calendar_controlid1;
Calendar_addtime = Calendar_addtime1;
Calendar_startdate = Calendar_startdate1 ? parsedate(Calendar_startdate1) : false;
Calendar_startdate = Calendar_startdate1 ? parsedate(Calendar_startdate1) : false;
Calendar_currday = Calendar_controlid.value ? parsedate(Calendar_controlid.value) : Calendar_today;
Calendar_hh = Calendar_currday.getHours();
Calendar_ii = Calendar_currday.getMinutes();
var p = getposition(Calendar_controlid);
getid('calendar').style.display = 'block';
getid('calendar').style.left = p['x']+'px';
getid('calendar').style.top	= (p['y'] + 20)+'px';
_cancelBubble(event);
refreshcalendar(Calendar_currday.getFullYear(), Calendar_currday.getMonth());
if(Calendar_lastcheckedyear != false) {
getid('calendar_year_' + Calendar_lastcheckedyear).className = 'default';
getid('calendar_year_' + Calendar_today.getFullYear()).className = 'Calendar_today';
}
if(Calendar_lastcheckedmonth != false) {
getid('calendar_month_' + Calendar_lastcheckedmonth).className = 'default';
getid('calendar_month_' + (Calendar_today.getMonth() + 1)).className = 'Calendar_today';
}
getid('calendar_year_' + Calendar_currday.getFullYear()).className = 'checked';
getid('calendar_month_' + (Calendar_currday.getMonth() + 1)).className = 'checked';
getid('hourminute').style.display = Calendar_addtime ? '' : 'none';
Calendar_lastcheckedyear = Calendar_currday.getFullYear();
Calendar_lastcheckedmonth = Calendar_currday.getMonth() + 1;
}
function refreshcalendar(y, m) {
var x = new Date(y, m, 1);
var mv = x.getDay();
var d = x.getDate();
var dd = null;
Calendar_yy = x.getFullYear();
Calendar_mm = x.getMonth();
getid("year").innerHTML = Calendar_yy;
getid("month").innerHTML = Calendar_mm + 1 > 9  ? (Calendar_mm + 1) : '0' + (Calendar_mm + 1);
for(var i = 1; i <= mv; i++) {
	dd = getid("d" + i);
	dd.innerHTML = " ";
	dd.className = "";
}
while(x.getMonth() == Calendar_mm) {
	dd = getid("d" + (d + mv));
	dd.innerHTML = '<a href="###" onclick="settime(' + d + ');return false">' + d + '</a>';
	if(x.getTime() < Calendar_today.getTime() || (Calendar_startdate && x.getTime() > Calendar_startdate.getTime()) || (Calendar_startdate && x.getTime() < Calendar_startdate.getTime())) {
	dd.className = 'expire';
} else {
	dd.className = 'default';
}
if(x.getFullYear() == Calendar_today.getFullYear() && x.getMonth() == Calendar_today.getMonth() && x.getDate() == Calendar_today.getDate()) {
	dd.className = 'Calendar_today';
	dd.firstChild.title = '今天';
}
if(x.getFullYear() == Calendar_currday.getFullYear() && x.getMonth() == Calendar_currday.getMonth() && x.getDate() == Calendar_currday.getDate()) {
dd.className = 'checked';
}
x.setDate(++d);
}
while(d + mv <= 42) {
	dd = getid("d" + (d + mv));
	dd.innerHTML = " ";
	d++;
}
if(Calendar_addtime) {
getid('hour').value = zerofill(Calendar_hh);
getid('minute').value = zerofill(Calendar_ii);
}
}
function showdiv(id) {
var p = getposition(getid(id));
getid('calendar_' + id).style.left = p['x']+'px';
getid('calendar_' + id).style.top = (p['y'] + 16)+'px';
getid('calendar_' + id).style.display = 'block';
}
function zerofill(s) {
var s = parseFloat(s.toString().replace(/(^[\s0]+)|(\s+$)/g, ''));
s = isNaN(s) ? 0 : s;
return (s < 10 ? '0' : '') + s.toString();
}