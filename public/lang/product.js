var menus=
[
{ name: '/qs/simple.asp', title: 'Quick Setup', id: '빠른 설정' }, // 0
{ name: '/wizard/welcome.asp', title: 'Setup Wizard', id: '마법사'  }, // 1
{ name: '/internet/wan.asp', title: 'Internet Settings', id: '인터넷 설정' }, // 2 wan
{ name: '/wireless/basic.asp', title: 'Wireless Settings', id: '무선 설정' }, // 3 lan
{ name: '/firewall/port_filtering.asp', title: 'Firewall Settings', id: '방화벽 설정' }, // 4 nat
{ name: '/adm/management.asp', title: 'Administration', id: '관리자' }, // 5
{ name: '/home.asp', title: 'Status', id: '상태정보' } // 6 status
];
var pages=
[
{ name: 'simple.asp', title: 'Quick Setup', id: '빠른 설정', gid: 0 },

{ name: 'welcome.asp', title: 'Setup Wizard', id: '마법사', flags: 1  , gid: 1 }, 
{ name: 'opmode.asp', title: 'Setup Wizard', id: '마법사', flags: 2 , gid: 1, hidden: 1  },
{ name: 'wzwan.asp', title: 'Setup Wizard', id: '마법사', flags: 3 , gid: 1, hidden: 1  },
{ name: 'wireless.asp', title: 'Setup Wizard', id: '마법사', flags: 4 , gid: 1, hidden: 1  },
{ name: 'apcli.asp', title: 'Setup Wizard', id: '마법사', flags: 5 , gid: 1, hidden: 1  },
{ name: 'summary.asp', title: 'Setup Wizard', id: '마법사', flags: 6 , gid: 1, hidden: 1  },

{ name: 'wan.asp', title: 'WAN', id: 'WAN', gid: 2 },
{ name: 'lan.asp', title: 'LAN', id: 'LAN', gid: 2 },
{ name: 'dhcpcliinfo.asp', title: 'DHCP Clients', id: 'DHCP 클라이언트', gid: 2 },
{ name: 'vpnpass.asp', title: 'VPN Pass', id: 'VPN', gid: 2 },
{ name: 'routing.asp', title: 'Routing', id: '라우팅', gid: 2 },
{ name: 'ddns.asp', title: 'DDNS', id: 'DDNS', gid: 2 },

{ name: 'basic.asp', title: 'Basic', id: '기본설정', gid: 3  },
{ name: 'advanced.asp', title: 'Advanced', id: '고급설정', gid: 3  },
{ name: 'security.asp', title: 'Security', id: '보안', gid: 3  },
{ name: 'access_control.asp', title: 'Access Control', id: '접속 제어', gid: 3  },
{ name: 'wds.asp', title: 'WDS', id: 'WDS', gid: 3  },
{ name: 'wps.asp', title: 'WPS', id: 'WPS', gid: 3  },
{ name: 'stainfo.asp', title: 'Station List', id: '클라이언트 리스트', gid: 3  },

{ name: 'port_filtering.asp', title: 'Basic Filtering', id: '필터링', gid: 4  },
{ name: 'port_forward.asp', title: 'Virtual Server', id: '가상 서버', gid: 4  },
{ name: 'DMZ.asp', title: 'DMZ', id: 'DMZ', gid: 4  },
{ name: 'system_firewall.asp', title: 'Security', id: '보안', gid: 4  },
{ name: 'content_filtering.asp', title: 'Advanced Filtering', id: '고급 필터링', gid: 4  },

{ name: 'management.asp', title: 'Management' , id: '관리', gid: 5 },
{ name: 'upload_firmware.asp', title: 'Firmware' , id: '펌웨어', gid: 5 },
{ name: 'settings.asp', title: 'Settings' , id: '설정', gid: 5 },
{ name: 'reboot.asp', title: 'Reboot' , id: '재시작', gid: 5 },
//{ name: 'status.asp', title: 'Status' , id: '상태 정보', gid: 5 },
{ name: 'statistic.asp', title: 'Statistics', id: '통계' , gid: 5 },
{ name: 'wol.asp', title: 'WOL', id: '원격 웨이크업' , gid: 5 },
{ name: 'syslog.asp', title: 'Syslog' , id: '시스템 로그', gid: 5 },
{ name: 'session_connection.asp', title: 'Session', id: '세션' , gid: 5 },

/*
{ name: 'dhcpc.htm', title: 'DHCP Mode', flags: 1 , gid: 2, hidden: 1  },
{ name: 'fixip.htm', title: 'Static IP Mode', gid: 2, hidden: 1  },
{ name: 'pppoe.htm', title: 'PPPOE Mode', gid: 2, hidden: 1  },
{ name: 'dhcps.htm', title: 'LAN Settings', gid: 3  },
*/

{ name: 'home.asp', title: 'Status' , id: '상태 정보', gid: 6 }
];

function goUrl(url)
{
	window.location.href = url;
}

function findPage(name)
{
	for (var i=0; i< pages.length; i++)
	{
		if (pages[i].name==name)
			return pages[i];
	}
	return 0;
}

function findGroup(name)
{
	var p=findPage(name);
	if (p)
		return menus[p.gid];
	return 0;
}
function header()
{

	var cg,cp;
	cg=findGroup(thisPage);
	cp=findPage(thisPage);
        //checkKeycode(ee);
        //addEvent(document, "keydown", checkKeycode);


//var m=
//'<div id=resultbg style="display:none;" class=black_overlay><iframe src="" style="position:absolute;visibility:inherit; top:0px; left:0px; width:1024px; height:768px; z-index:-1;opacity:.0;filter: alpha( opacity=0 ); -moz-opacity: 0;"></iframe></div>'+
//'<div id=result class=white_content></div>'+
var m='<div id=wrapper><div id=content>'+
'<div id=header>'+
'<div id=logo onclick=goUrl("http://www.ez-net.co.kr")> </div>'+
'<div id=menu>'+
'<div id=menuMain><ul id=menuMainList>';

	if (document.cookie.length > 0) {
		var s = document.cookie.indexOf("language=");
		var e = document.cookie.indexOf(";", s);
		var lang = "en";
		var i;

		if (s != -1) {
			if (e == -1)
				lang = document.cookie.substring(s+9);
			else
				lang = document.cookie.substring(s+9, e);
		}
	}

	for (var i=0; i< menus.length; i++) //main
	{
		if (menus[i].title != cg.title) // not current 
			if (lang == "en")
				{
					m+='<li><a indepth=true href='+menus[i].name+'>'+msg(menus[i].title)+'</a>'; // title to id
				}
			else
				{
					m+='<li><a indepth=true href='+menus[i].name+'>'+msg(menus[i].id)+'</a>'; // title to id
				}
		else
		{
			if (lang == "en")
				{
					m+='<li class=current><span>'+msg(menus[i].title)+'</span>'; // title to id
				}
			else
				{
					m+='<li class=current><span>'+msg(menus[i].id)+'</span>'; // title to id
				}
			
			m+='<div id=menuSub>'
				+'<ul id=menuSubList>';
			for (var j=0; j < pages.length; j++)
			{
				if (i!=pages[j].gid)
					continue;
				if (pages[j].hidden)
					continue;
				//current group
				if (pages[j].name==thisPage)
					if (lang == "en")
						{
							m+='<li><span>'+msg(pages[j].title)+'</span></li>';// title to id
						}
					else
						{
							m+='<li><span>'+msg(pages[j].id)+'</span></li>';// title to id
						}
				else
					if (lang == "en")
						{
							m+='<li><a indepth=true href='+pages[j].name+'>'+msg(pages[j].title)+'</a></li>'; // title to id
						}
					else
						{
							m+='<li><a indepth=true href='+pages[j].name+'>'+msg(pages[j].id)+'</a></li>'; // title to id
						}
			}
			m+='</ul></div>';
		}
		m+='</li>';
	}
m+='</ul></div>';
m+='</div>'+
'</div>'+
'<div id=mainf>'+
'<div id=contents>';
	puts(m);
}

function footer(nodef,help)
{
	//var cp=findPage(thisPage);
	var m='</td></tr></table></div>';//<!--/contents-->
if(!nodef)
{	
m+='<!--'//<!--div class=submitFooter id=button>
	+'<input title="Apply settings" class=button name=apply_button value="'+msg('OK')+'" type=button onclick=apply()>'
	+'<input title="Cancel changes" class=button name=reset_button value="'+msg('Cancel')+'" type=button onclick=cancel()>'
 +'</div>';
}
//m+='</form>'
 m+='</div>';
//m+='<!--/main--><!--div id=helpContainer-->'
	/*m+='<br><div id=help>'
		+'<div><h2> Help</h2></div>'
		+'<iframe width=200 height=90% align=top frameborder=0 scrolling=no src="/help.asp#'+help+'"></iframe>'
	+'</div>';*/
//  +'<!--/div-->';
m+='<div id=floatKiller></div>';
+'</div></div>-->';//<!--/Wrapper-->
	puts(m);
}
function cancel()
{
	init();
}

