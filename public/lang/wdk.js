/* 
	WEB SDK functions
*/
var cliSplit='ZZ'+String(Math.random()).substr(3,3);
if(location.protocol=="file:")
	cliSplit='AAA';

function goUrl(url)
{
	window.location.href = url;
}

function showHide(id, en) {
	var bl=getById(id);
	bl.style.display=((en!=0)? 'block' : 'none');
}

function findInput(t)
{
	var x=t.getElementsByTagName('input');
	var s=t.getElementsByTagName('select');
	var y=[];
	for (var i=0; i<x.length; i++) y.push(x[i]);
	for (var i=0; i<s.length; i++) y.push(s[i]);
	return y;
}
function findGroupElem(e,t)
{
	var y=[];
	for (var i=0; i< e.length; i++)
	{
		if (e[i]!=t) continue;
		y.push(e[i]);
		for (i++; i < e.length; i++)
		{
			if (e[i].name!=t.name) break;
			y.push(e[i]);
		}
		if (y.length>1)
			return y;
		return t;
	}
	return t;
}


var thisPage=window.location.toString().replace(/.*\//,'').replace(/\?.*/,'');;
var resut_ret;


function showResult(t,m,b)
{
	var msg='<input class=button name=apply_button value=계속 type=button onclick=javascript:onClick=goUrl(thisPage)>';;
	getById("contents").innerHTML='<center><b>'+m+'</b></center><br>';
	getById("button").innerHTML= msg;
}

function showloading(ltime)
{
	//document.body.style.overflow = 'hidden'; 
	getById("resultbg").style.display='block';
	getById("result").style.display='block';
	m = '<img src="images/load.gif"/>';
	getById("result").innerHTML='<center><b>'+m+'</b></center>';
	timer=setInterval('showResult1()',ltime);
}

function showResult1()
{
	getById("resultbg").style.display='block';
	getById("result").style.display='block';
	m = cgiCode(resut_ret)+'<br><br><input class=button name=apply_button value=계속 type=button onclick=javascript:onClick=goThisPage()>';
	getById("result").innerHTML='<center><b>'+m+'</b></center><br>';
}

function showStatus(m)
{
	if (!m)
		m ='<form name=resultfrm><img src="images/load.gif"/><br>'+
'<p><input type=text name=percent size=46 disabled style="color:black; text-align:center; border-style:none;"></p></form>';
	showHide('resultbg',1);
	showHide('result',1);
	getById('result').innerHTML = m;
}

function showFileBrowser()
{
  puts('<input type=file name=files id=files size=20 class=ifile onchange="this.form.upfile.value=this.value.substr(this.value.lastIndexOf(\'\\\\\')+1);">');
  puts('<input type=text name=upfile size=20>');
  puts('<input type=button value="'+ msg("Browser...") + '" onclick="this.form.files.click();">');
}

function goThisPage()
{
	try
	{
		goUrl(thisPage);
	}
	catch (e)
	{
		alert("계속 버튼을 클릭 하십시오.!");
	}
}

function getById(id)
{
	return document.getElementById(id);
}

function getByName(all,name)
{
	var elem=[];
	for (var i=0; i<all.length; i++)
	{
		if (all[i].name!=name) continue;
		elem.push(all[i])
	}
	if (elem.length==1)
		return elem[0];
	return elem;
}

function write(m)
{
	return document.write(m);
}

function getHTTPObject() {
	var xmlHttp=0;
	if(location.protocol!="file:"){
		try{ xmlHttp=new XMLHttpRequest(); }catch(e){xmlHttp=false;}
	}
	if(!xmlHttp)try{ xmlHttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlHttp=false;}
	if(!xmlHttp)try{ xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlHttp=false;}
	if(!xmlHttp)try{ xmlHttp=new XMLHttpRequest(); }catch(e){xmlHttp=false;}
	if(!xmlHttp) { alert("현재 사용하는 브라우저는 지원하지 않습니다.!"); }
	return xmlHttp;
} 

function httpReq(url,parm)
{
	var http=getHTTPObject();
	http.open( ((parm=='')? 'GET' : 'POST'),url,false);
	http.send(parm);
	if ( ( http.readyState == 4) || ( http.readyState == 0))
	{
		return http.responseText;
	}
//	else
//		alert('http.readyState='+http.readyState);
	return '';
}

function ashttpReq(url,parm)
{
	var http=getHTTPObject();
	http.open( ((parm=='')? 'GET' : 'POST'),url,true);
	http.send(parm);
	{
		http.onreadystatechange=
		function getresp(){

		}
	}
	return '';
}


function puts(s)
{
	document.write(s);
}


function countList(id,max)
{
	for (var i=0; i<max; i++)
		if (''==cdbVal(id+(i+1))) break;
	return i;
}

function includeJS(url) 
{
	var head = document.getElementsByTagName("head")[0];         
	var scr = document.createElement('script');
	scr.type = 'text/javascript';
	scr.src = url;
	head.appendChild(scr);
}
var _msgTable=[];
var _msg_file='';
var _help_file='';


function msg(key)
{
try {
	var m=_msgTable[key];
	if (!m)
	{
/*WSIM*/ //	alert('MSG:['+key+'] not mapping, check file:['+_msg_file+']');
		return key;
	}
	return m;
}
catch (e) {
	return key;
}
}

function putmsg(key)
{
	document.write(msg(key));
}
/*
function lang_trans()
{
	var e=document.getElementsByTagName('div');
	for (var i=0; i<e.length; i++)
	{
		if (e[i].attributes && e[i].attributes['msg'])
		{
			e[i].visibility="visible";
			var m=e[i].innerHTML;
			e[i].innerHTML=msg(m);
		}
	}
}
*/

