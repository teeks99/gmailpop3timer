({
	milliseconds: new Date(),
	interval: 10,
	checking: true,
	ik: null,
	at: null,
	amaposition: 0,
	globals: null,
	account: null,
	request: {
		url: new Array(),
		id: new Array(),
		account: new Array(),
		complete: new Array()
	},
	setting: {
		interval: 10,
		text: true,
		time: true,
		startup: true,
		donationlink: true,
		reporterror: true,
		template: 0
	},
	el: {
		header: null,
		body: document.createElement('span'),
		pop3: document.createElement('a'),
		settingsLink: document.createElement('a'),
		donationPane: document.createElement('span'),
		donationLink: document.createElement('a'),
		settingsPane: document.createElement('span'),
		refreshLink: null
	},
	init: function () {
		o.core.milliseconds = Date.UTC(o.core.milliseconds.getYear(),o.core.milliseconds.getMonth(),o.core.milliseconds.getDate(),o.core.milliseconds.getHours(),o.core.milliseconds.getMinutes(),o.core.milliseconds.getSeconds());
		o.core.el.pop3.setAttribute('title','POP3 Accounts Now');
		o.core.el.settingsLink.setAttribute('title','POP3 Settings');
		o.core.el.settingsLink.style.display = 'none';
		
		/* Google+ with black bar added on 2/11/2012 */
		if ((document.getElementById('gbx3') || document.getElementById('gbx4')) && !document.getElementById('gbgs5')) {
			console.log('Gmail POP3 Checker => Template: Google+ with black bar added on 2/11/2012');
			o.core.setting.template = 5;
			
			var wrapper = document.createElement('div');
			
			o.core.el.header = document.getElementById('gbx4') || document.getElementById('gbx3');
			
			wrapper.style.fontSize = '13px';
			
			wrapper.style.float = 'right';
			wrapper.style.width = 'auto';
			wrapper.style.zIndex = '9999';
			wrapper.style.textAlign = 'right';
			wrapper.style.color = '#FFF';
			
			wrapper.style.marginTop = '-2px';
			wrapper.style.marginRight = '6px';
			wrapper.style.fontWeight = 'bold';
			
			/* TODO: temporary */
			wrapper.style.whiteSpace = 'no-wrap';
			
			/* black Google+ strip has the email in it */
			/*
			if (document.getElementById('gbgs5') && document.getElementById('gb')) {
				if (navigator.userAgent.indexOf('Firefox') != -1) {
					wrapper.style.position = 'absolute';
					wrapper.style.left = '606px';
					o.core.el.body.style.position = 'relative';
					o.core.el.body.style.top = '0';
					o.core.el.body.style.left = '10px';
				}			
				
				o.core.el.body.style.backgroundColor = '#000';
				o.core.el.body.style.border = '1px solid #999';
				o.core.el.body.style.borderRadius = '3px';
				wrapper.style.marginTop = '38px';
				o.core.el.body.style.padding = '6px 8px';
				wrapper.style.marginRight = '17px';
			} else {
			
			}
			*/
			
			wrapper.appendChild(o.core.el.body);
			o.core.el.header.appendChild(wrapper);
			
			o.core.el.settingsLink.style.color = '#FAD163';
			o.core.el.pop3.style.cursor = 'pointer';
			o.core.el.settingsLink.style.textDecoration = 'none';
		/* The "New Gmail" look */
		} else if (document.getElementById('gb') && document.getElementById('gb').tagName === 'HEADER') {
			console.log('Gmail POP3 Checker => Template: Banner top added on 4/25/2018');
			o.core.setting.template = 8;

			o.core.el.header = document.querySelectorAll('#gb > div > div ')[3];
			
			o.core.el.body.style.cursor = 'pointer';
			
			o.core.el.settingsLink.style.textDecoration = 'none';
			o.core.el.settingsLink.style.color = '#d64a38';

			var tempNode = document.createElement('div');
			
			o.core.el.body.style.background = '#f6f7f7';
			o.core.el.body.style.color = '#000';
			o.core.el.body.style.border = '1px solid #CCC';
			o.core.el.body.style.borderRadius = '0.25rem';
			o.core.el.body.style.padding = '7px 14px';
			
			tempNode.style.marginLeft = '1em';
			tempNode.style.verticalAlign = 'middle';
			
			tempNode.appendChild(o.core.el.body);
			o.core.el.header.appendChild(tempNode);
			
			o.core.updateDisplay();
		} else if (document.getElementById('gbwa')) {
			console.log('Gmail POP3 Checker => Template: Banner top added on 10/13/2013');
			o.core.setting.template = 7;
			
			o.core.el.header = document.getElementById('gb').parentNode;
			o.core.el.header = o.core.el.header.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
			o.core.el.header.style.minWidth = '450px';
			
			o.core.el.body.style.cursor = 'pointer';
			
			o.core.el.settingsLink.style.textDecoration = 'none';
			o.core.el.settingsLink.style.color = '#d64a38';
			
			var tempNode = document.createElement('div');
			
			o.core.el.body.style.background = '#FFF';
			o.core.el.body.style.color = '#000';
			o.core.el.body.style.borderRadius = '2px';
			o.core.el.body.style.padding = '7px 14px';
			
			tempNode.style.marginLeft = '1em';
			tempNode.style.verticalAlign = 'middle';
			
			tempNode.appendChild(o.core.el.body);
			o.core.el.header.appendChild(tempNode);
			
			o.core.updateDisplay();
			
		/* Banner top added on 11/30/2011 */
		} else if (document.getElementById('gbqfw') || document.getElementById('gb') && document.getElementById('gb').getAttribute('class') && (document.getElementById('gb').getAttribute('class').match(/gbes/gi) || document.getElementById('gb').getAttribute('class').match(/gbem/gi))) {
			console.log('Gmail POP3 Checker => Template: Banner top added on 11/30/2011');
			o.core.setting.template = 4;
			o.core.el.header = document.getElementById('gb'); /*document.getElementById('gb').parentNode.parentNode.parentNode.parentNode;*/
			o.core.el.settingsLink.style.textDecoration = 'none';
			o.core.el.pop3.style.padding = '0 0 0 6px';
			o.core.el.pop3.style.display = 'inline-block';
			var t1 = document.createElement('li');
			var t2 = document.createElement('a');
			t1.style.display = 'inline-block';
			t1.style.width = '1px';
			t2.style.width = '1px';
			t2.style.display = 'inline-block';
			
			t1.appendChild(t2);
			t2.appendChild(o.core.el.body);
			
			o.core.el.body.style.textAlign = 'right';
			o.core.el.body.style.width = '1px';
			o.core.el.body = t1;
			
			o.core.el.body.style.display = 'inline-block';
			o.core.el.body.style.width = 'auto';
			o.core.el.body.style.position = 'absolute';
			o.core.el.body.style.zIndex = '99999';
			
			/* TODO: temporary */
			o.core.el.body.style.whiteSpace = 'no-wrap';
			
			/* Google+ bar */
			if (document.getElementById('gbi4t')) {
				console.log('Gmail POP3 Checker => Template: Google+ bar');
				document.getElementById('gbi4t').style.marginTop = '-8px';
				o.core.el.body.style.left = 'auto'; /* this simply prevents ghost padding on the left of the counter */
				o.core.el.body.style.right = '166px'; /* this is what actually moves the element to the left of the settings dropdown */
				o.core.el.body.style.top = '24px';
				
			/* Not Google+ */
			} else if (document.getElementById('gbgs4d')) {
				console.log('Gmail POP3 Checker => Template: Not Google+');
				document.getElementById('gbgs4d').style.marginTop = '-8px';
				o.core.el.body.style.top = '24px';
				o.core.el.body.style.left = 'auto'; /* this simply prevents ghost padding on the left of the counter */
				o.core.el.body.style.right = '10px'; /* this is what actually moves the element to the left of the settings dropdown */
				o.core.setting.template = 3;
			/*
			} else {
				console.log('Gmail POP3 Checker => Template: New google banner added 9/20/2013');
				var wrapper = document.getElementById(':hq');
				if (wrapper) {
					o.core.el.header = document.createElement('div');
					wrapper.parentNode.insertBefore(o.core.el.header, wrapper);
					o.core.el.body.style.position = 'static';
					o.core.setting.template = 6;
				}
				*/
			}
			o.core.el.body.style.padding = '0';
			o.core.el.body.style.textAlign = 'right';
			o.core.el.header.appendChild(o.core.el.body);
			o.core.el.donationLink.style.marginLeft = '4px';
		/* new banner top (Google+) */
		} else if (document.getElementById('ogb-settings')) {
			console.log('Gmail POP3 Checker => Template: New banner top (Google+)');
			o.core.setting.template = 2;
			o.core.el.header = document.getElementById('ogb-settings').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			o.core.el.body.setAttribute('class','gbts');
			o.core.el.body.style.display = 'inline-block';
			o.core.el.settingsLink.style.textDecoration = 'none';
			o.core.el.pop3.style.padding = '0 0 0 6px';
			o.core.el.pop3.style.display = 'inline-block';
			var t1 = document.createElement('li');
			var t2 = document.createElement('a');
			t1.setAttribute('class','gbt gbgt');
			t1.style.display = 'inline-block';
			/* t1.style.borderLeft = '1px solid #EEE'; */
			t2.setAttribute('class','gbzt gbgt');
			t2.style.display = 'inline-block';
			t1.appendChild(t2);
			t2.appendChild(o.core.el.body);
			o.core.el.body = t1;
			o.core.el.header.appendChild(o.core.el.body);
			o.core.el.donationLink.style.marginLeft = '4px';
			
			/* TODO: temporary */
			o.core.el.body.style.whiteSpace = 'no-wrap';
		/* old banner top */
		} else {
			console.log('Gmail POP3 Checker => Template: Old banner top');
			o.core.setting.template = 1;
			o.core.el.header = document.body.getElementsByTagName('nobr')[1];
			/* try to find the Settings link based on the href */
			var elA = o.core.el.header.getElementsByTagName('a');
			for (var i=0;i<elA.length;i++) {
				if (elA[i].getAttribute('href') && elA[i].getAttribute('href').match(/#settings/gi)) {
					/* yay! we've found a match for the settings link */
					o.core.el.sibling = elA[i];
					o.core.el.sibling.parentNode.insertBefore(o.core.el.body,o.core.el.sibling.nextSibling);
				}
			}
			if (!o.core.el.sibling) {
				/* not found, eh? just slap it at the end then */
				o.core.el.sibling = o.core.el.header.getElementsByTagName('*');
				o.core.el.sibling = o.core.el.sibling[o.core.el.sibling.length-1];
				o.core.el.sibling.parentNode.insertBefore(o.core.el.body,o.core.el.sibling.previousSibling);
			}
			/* are labs installed? */
			/*
			if (o.core.el.header.innerHTML.match(/labs_bar_icon.png/ig)) {
				o.core.el.body.appendChild(document.createTextNode(' | '));
			}
			*/
			o.core.el.body.appendChild(document.createTextNode(' | '));
			
			/* TODO: temporary */
			o.core.el.body.style.whiteSpace = 'no-wrap';
			
		}
		if (o.version != '2022.09.20' && o.version != '2022.05.13' && o.version != '12/26/2014' && o.version != '12/30/2014' && o.version != '2/17/2015' && o.version != '6/21/2016' && o.version != '6/30/2016' && o.version != '3/30/2020') {
			o.core.el.pop3.appendChild(document.createTextNode('POP3 Update Required'));
			if (o.core.setting.template < 5) {
				o.core.el.pop3.setAttribute('class','e gbgt');
			}
			o.core.updatePrompt = false;
			o.core.el.pop3.addEventListener('click',function() {
				if (!o.core.updatePrompt) {
					o.core.updatePrompt = true;
				}
				return true;
			},true);
			o.core.el.pop3.setAttribute('href','https://www.danielslaughter.com/project/gmailpop3/files/gmailpop3.user.js');
			o.core.el.pop3.style.color = 'red';
			o.core.el.pop3.style.fontWeight = 'bold';
			o.core.el.body.appendChild(o.core.el.pop3);
		} else {
			o.core.el.pop3.appendChild(document.createTextNode('Loading...'));
			o.core.el.body.appendChild(o.core.el.pop3);
			/* are labs not installed? */
			o.core.el.pop3.addEventListener('click',o.core.pop,true);
			var elArrow = document.createElement('small');
			elArrow.appendChild(document.createTextNode('▼'));
			o.core.el.settingsLink.appendChild(document.createTextNode(' '));
			o.core.el.settingsLink.appendChild(elArrow);
			o.core.el.settingsLink.addEventListener('click',function() {
				document.getElementById('pop3-pane').style.display = (document.getElementById('pop3-pane').style.display == 'none'?'inline-block':'none');
				return false;
			},true);
			if (o.core.setting.template < 5) {
				o.core.el.settingsLink.setAttribute('class','gb3 qq gbgt');
			}
			o.core.el.settingsLink.setAttribute('href','#');
			o.core.el.body.appendChild(o.core.el.settingsLink);
			if (o.core.setting.template < 5) {
				o.core.el.settingsLink.style.display = 'inline-block';
				o.core.el.settingsPane.style.display = 'inline-block';
			}
			o.core.el.donationLink.appendChild(document.createTextNode('Donate'));
			o.core.el.donationPane.style.display = 'none';
			o.core.el.donationPane.style.paddingLeft = '6px';
			if (o.core.setting.template < 5) {
				o.core.el.donationLink.setAttribute('class','e gbgt gbgt');
			} else {
				o.core.el.donationPane.style.cursor = 'pointer';
				o.core.el.donationPane.style.color = '#0f6efd';
				o.core.el.donationPane.style.textDecoration = 'underline';
			}
			o.core.el.donationPane.setAttribute('title','Donate to Unlock POP3 Settings');
			o.core.el.donationPane.appendChild(o.core.el.donationLink);
			o.core.el.body.appendChild(o.core.el.donationPane);
			o.core.el.header.appendChild(o.core.el.settingsPane);
			
			o.core.updateDisplay();
			
			o.core.account();
		}
	},
	refresh: function () {
		var isRefreshAvailable = false;
		switch(top.location.hash) {
			case '#mbox':
			case '#inbox':
			case '#all':
			case '#imp':
			case '#trash':
			case '#spam':
			case '#chats':
			case '#starred':
			case '#sent':
				isRefreshAvailable = true;
				break;
			default:
				if (top.location.hash.match(/#label/gi)) {
					isRefreshAvailable = true;
				}
		};
		if (isRefreshAvailable && o.core.el.refreshLink != null) {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('click', true, true);
			o.core.el.refreshLink.dispatchEvent(evt);
		} else {
			/* The refresh link was never found or is not available. */
		}
		
	},
	pop: function () {
		if (!o.core.checking) {
			for (var i=0;i<o.core.request.id.length;i++) {
				o.core.request.complete[i] = false;
			}
			o.core.checking = true;
			if (o.core.setting.template < 5) {
				o.core.el.pop3.setAttribute('class','');
			}
			while (o.core.el.pop3.hasChildNodes()) {
				o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
			};
			o.core.el.pop3.appendChild(document.createTextNode('Fetching...'));
			/* we'll throw a timeout. in the event the POP3s fail we'll trigger a restart. this happens particulary when the computer sleeps, hybernates, or looses internet connectivity. */
			window.setTimeout(function() {
				var isCompleted = true;
				for (var i=0;i<o.core.request.id.length;i++) {
					isCompleted = isCompleted && o.core.request.complete[i];
				}
				if (!isCompleted) {
					while (o.core.el.pop3.hasChildNodes()) {
						o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
					};
					o.core.el.pop3.appendChild(document.createTextNode('Connectivity Lost'));
					window.setTimeout(function(){
						var d = new Date();
						/* set the timer for 3 minutes instead of the designated interval */
						o.core.milliseconds = Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds())-(3*60*1000);
						if (o.core.setting.template < 5) {
							o.core.el.pop3.setAttribute('class','e gbgt');
						}
						if (o.core.setting.text) {
							o.core.el.pop3.appendChild(document.createTextNode('POP3'));
						} else {
							/* empty */
						}
						o.core.checking = false;
						if (o.core.setting.interval > 0) {
							o.core.timer();
						}
					},5000);
				}
			},5000);
			for (var i=0;i<o.core.request.url.length;i++) {
				var responseFunc = function(r) {
					var isCompleted = true;
					/* this is just updating the first one not marked as completed. we should really be marking the one returned, but this type of logic doesn't matter for our check */
					for (var i=0;i<o.core.request.id.length;i++) {
						if (!o.core.request.complete[i]) {
							o.core.request.complete[i] = true;
							break;
						}
					}
					for (var i=0;i<o.core.request.id.length;i++) {
						isCompleted = isCompleted && o.core.request.complete[i];
					}
					if (isCompleted) {
						while (o.core.el.pop3.hasChildNodes()) {
							o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
						};
						var d = new Date();
						if (o.core.setting.refresh) {
							o.core.el.pop3.appendChild(document.createTextNode('Refreshing...'));
							for(var i=0;i<=4;i++) {
								window.setTimeout(o.core.refresh,7500*i);
							};
							window.setTimeout(function() {
								o.core.milliseconds = Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds());
								if (o.core.setting.template < 5) {
									o.core.el.pop3.setAttribute('class','e gbgt');
								}
								if (o.core.setting.text) {
									o.core.el.pop3.appendChild(document.createTextNode('POP3'));
								} else {
									/* empty */
								}
								o.core.checking = false;
								if (o.core.setting.interval > 0) {
									o.core.timer();
								}
								
								o.core.updateDisplay();
								
							},5000);
						} else {
							o.core.milliseconds = Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds());
							if (o.core.setting.template < 5) {
								o.core.el.pop3.setAttribute('class','e gbgt');
							}
							if (o.core.setting.text) {
								o.core.el.pop3.appendChild(document.createTextNode('POP3'));
							} else {
								/* empty */
							}
							o.core.checking = false;
							if (o.core.setting.interval > 0) {
								o.core.timer();
							}
							
							o.core.updateDisplay();
						}
					} else {
						/* all of the pop accounts have not completed yet */
					}
				};
				/* Firefox, or Chrome before version 27.X */
				if (typeof GM_xmlhttpRequest == 'function') {
					o.request(
						o.domain + o.core.request.url[i],
						responseFunc,
						'POST'
					);
				/* Chrome after and including version 27.X */
				} else {
					/* we need to keep these xhr things private to their own block. do I love this solution? no */
					myFunc = function() {
						var xhr = new XMLHttpRequest();
						xhr.onreadystatechange = function(e){
							if (xhr.readyState == this.DONE) {
								window.setTimeout(function() {
									responseFunc(xhr)
								},1);
							}
						};
					
						xhr.open('POST', (o.domain + o.core.request.url[i]), true);
						xhr.send();
					};
					myFunc();
				}
			}
			
			o.core.updateDisplay();
			
		}
	},
	timer: function () {
		/* is it time to POP3 yet? */
		var d = new Date();
		var ms = (Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds())) - o.core.milliseconds;
		if (!o.core.checking && o.core.setting.interval > 0 && o.core.milliseconds < (Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()))-(o.core.setting.interval*60000)) {
			o.core.pop();
		} else if (!o.core.checking) {
			while (o.core.el.pop3.hasChildNodes()) {
				o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
			};
			if (o.core.setting.time) {
				if (o.core.setting.text) {
					o.core.el.pop3.appendChild(document.createTextNode('POP3 ' + (Math.floor((o.core.setting.interval*60000-ms)/60000)>0?Math.floor((o.core.setting.interval*60000-ms)/60000):'0') + ':' + ((Math.floor((o.core.setting.interval*60000-ms)/1000)%60) < 10?'0':'') + Math.floor((o.core.setting.interval*60000-ms)/1000)%60));
				} else {
					o.core.el.pop3.appendChild(document.createTextNode((Math.floor((o.core.setting.interval*60000-ms)/60000)>0?Math.floor((o.core.setting.interval*60000-ms)/60000):'0') + ':' + ((Math.floor((o.core.setting.interval*60000-ms)/1000)%60) < 10?'0':'') + Math.floor((o.core.setting.interval*60000-ms)/1000)%60));
				}
				
				/* Only update the display if the second is 59 (it just switched the minute). This should stop the script from being unresponsive every second. */
				if ((((Math.floor((o.core.setting.interval*60000-ms)/1000)%60) < 10?'0':'') + Math.floor((o.core.setting.interval*60000-ms)/1000)%60) == 59) {
					o.core.updateDisplay();
				}
				
			} else if (o.core.setting.text) {
				o.core.el.pop3.appendChild(document.createTextNode('POP3'));
			} else {
				/* empty */
			}
		}
		/* stupid responsive design */
		/*
		if (document.getElementById('gb') && document.getElementById('gb').getAttribute('class') && (document.getElementById('gb').getAttribute('class').match(/gbes/gi) || document.getElementById('gb').getAttribute('class').match(/gbem/gi))) {
			if (document.getElementById('gb').getAttribute('class').match(/gbem/gi)) {
				o.core.el.body.style.top = '72px';
			} else {
				o.core.el.body.style.top = '66px';
			}
		}
		*/
		
		if (!o.core.checking) {
			window.setTimeout(o.core.timer,1000);
		}
	},
	account: function () {
		var loadedFunc = function() {
			console.log('Gmail POP3 Checker => Accounts: ' + o.core.request.account.join(', '));
			if (!o.core.request.id.length) {
				while (o.core.el.pop3.hasChildNodes()) {
					o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
				};
				if (o.core.setting.template < 5) {
					o.core.el.pop3.setAttribute('class','');
				}
				o.core.el.pop3.appendChild(document.createTextNode('POP3 Accounts Missing'));
				o.core.checking = true;
				window.setTimeout(function() {
					o.core.el.body.parentNode.removeChild(o.core.el.body);
				}, 5000);
			} else {
				while (o.core.el.pop3.hasChildNodes()) {
					o.core.el.pop3.removeChild(o.core.el.pop3.firstChild);
				};
				if (o.core.setting.template < 5) {
					o.core.el.pop3.setAttribute('class','');
				}
				o.core.el.pop3.appendChild(document.createTextNode('Settings...'));
				o.core.checking = false;
			}
			o.core.updateDisplay();
			o.core.settings();
		};
		var responseFunc = function (r) {
			var temp = document.createElement('div');
			temp.innerHTML = r.responseText;
			temp = temp.getElementsByTagName('script');
			for(var i=0;i<temp.length;i++) {
				if (temp[i].innerHTML && temp[i].innerHTML.match(/var GLOBALS/gi)) {
					var count = 0;
					temp = temp[i].innerHTML.substr(temp[i].innerHTML.indexOf('GLOBALS=')+1,temp[i].innerHTML.length);
					/* grab everything until GLOBALS[X] gets set (which should be everything within GLOBALS) */
					temp = temp.substr(0,temp.indexOf('GLOBALS['));
					/* trim */
					temp = temp.replace(/^\s+|\s+$/g,'');
					/* strip off the last character which should be a ';' */
					temp = temp.substr(0,temp.length-1);
					/* evaluate the GLOBALS into our own object */
					o.core.globals = eval(temp);
					/* ik */
					o.core.ik = o.core.globals[9];
					/* account/email */
					o.core.account = o.core.globals[10];
					/* get the GMAIL_AT (aka: AT) from the cookies. It's basically the current session ID which is required to make POP3 requests. */
					temp = document.cookie;
					temp = temp.substr(temp.indexOf('GMAIL_AT=')+9,temp.length);
					o.core.at = temp.substr(0,temp.indexOf(';'));
					/* Template before April 25, 2018 */
					if (o.core.globals[17] !== null) {
						console.log('Gmail POP3 Checker => AMA: v1');
						/* request.account account/email/ama */
						for(var i=0;i<o.core.globals[17].length;i++) {
							if (o.core.globals[17][i][0] && o.core.globals[17][i][0] == 'ama') {
								o.core.amaposition = i;
							}
						}
						for(var j=0;j<o.core.globals[17][o.core.amaposition][3].length;j++) {
							o.core.request.account[j] = o.core.globals[17][o.core.amaposition][3][j][1];
							o.core.request.id[j] = o.core.globals[17][o.core.amaposition][3][j][0];
							o.core.request.url[j] = location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=cma_' + o.core.request.id[j] + '&pcd=1&mb=0&rt=h';
							/* https://mail.google.com/mail/u/0/?ui=2&ik=64e9f3348b&rid=f6a..&at=AF6bupN8dlBRtQFohddzVDUO9IL6BqjbUg&view=up&act=cma_5&_reqid=1552177&pcd=1&mb=0&rt=h&zx=9gvi70xjxb4b */
							/* o.core.request.url[j] = location.pathname + '?ui=1&ik=&view=up&act=cma_' + o.core.request.id[j] + '&at=' + o.core.at; */
						}
						loadedFunc();
					/* Template after April 25, 2018 which moved the "ama" to the end of the page outside of the GLOBALS=[] variable */
					} else {
						/* \u0022 is an escaped " */
						var str = r.responseText.substr(r.responseText.indexOf('[\u0022ama\u0022')).trim();
						var bracketCount = 0;
						var j = 0;
						for (j = 0; j < str.length; j++) {
							if (str.charAt(j) === '[') {
								bracketCount++;
							} else if (str.charAt(j) === ']') {
								bracketCount--;
							}
							if (bracketCount === 0) {
								break;
							}
						}
						str = str.substr(0, j + 1);
						if (str.replace(/^\s+|\s+$/g,'') == '>') {
							/* October 31, 2022 which removed "ama" from the main page */
							console.log('Gmail POP3 Checker => AMA: v4');
							var amaFunc = function(r) {
								if (r.status == '200') {
									if (r.responseText.indexOf('[\u0022ama\u0022') !== -1) {
										var str = r.responseText.substr(r.responseText.indexOf('[\u0022ama\u0022'));
										str = str.substr(0, str.indexOf(',[]],[') + 4);
										str = eval(str)[3];
										if (str.length) {
											for (var j=0;j<str.length;j++) {
												o.core.request.account[j] = str[j][1];
												o.core.request.id[j] = str[j][0];
												o.core.request.url[j] = location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=cma_' + o.core.request.id[j] + '&pcd=1&mb=0&rt=h';
											}
										}
									}
								}
								loadedFunc();
							};
							/* https://mail.google.com/mail/u/0/?ik=' + o.core.ik + '&view=up&act=rap&at=' + o.core.at + '&rt=j */
							/* Firefox, or Chrome before version 27.X */
							if (typeof GM_xmlhttpRequest == 'function') {
								o.request(
									o.domain + location.pathname + '?ik=' + o.core.ik + '&view=up&act=rap&at=' + o.core.at + '&rt=j',
									amaFunc
								);
							/* Chrome after and including version 27.X */
							} else {
								var xhr = new XMLHttpRequest();
								xhr.onreadystatechange = function(e){
									if (xhr.readyState == this.DONE) {
										amaFunc(xhr);
									}
								};
								xhr.open('GET', (o.domain + location.pathname + '?ik=' + o.core.ik + '&view=up&act=rap&at=' + o.core.at + '&rt=j'));
								xhr.send();
							}
						} else {
							str = eval(str)[3];
							if (str.length) {
								console.log('Gmail POP3 Checker => AMA: v2');
								for (var j=0;j<str.length;j++) {
									o.core.request.account[j] = str[j][1];
									o.core.request.id[j] = str[j][0];
									o.core.request.url[j] = location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=cma_' + o.core.request.id[j] + '&pcd=1&mb=0&rt=h';
								}
								loadedFunc();
							} else {
								console.log('Gmail POP3 Checker => AMA: v3');
								/* Last hope for the ama (check the "refresh mail" page) */
								var amaFunc;
								(function() {
									amaFunc = function(r) {
										if (r.status == '200') {
											if (r.responseText.indexOf('D([\u0022ama\u0022') !== -1) {
												var str = r.responseText.substr(r.responseText.indexOf('D([\u0022ama\u0022') + 2);
												str = str.substr(0, str.indexOf(']);') + 1);
												str = eval(str)[3];
												if (str.length) {
													for (var j=0;j<str.length;j++) {
														o.core.request.account[j] = str[j][1];
														o.core.request.id[j] = str[j][0];
														o.core.request.url[j] = location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=cma_' + o.core.request.id[j] + '&pcd=1&mb=0&rt=h';
													}
												}
											}
										}
										loadedFunc();
									};
								})();
								/* Firefox, or Chrome before version 27.X */
								if (typeof GM_xmlhttpRequest == 'function') {
									o.request(
										o.domain + location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=par&rt=h',
										amaFunc
									);
								/* Chrome after and including version 27.X */
								} else {
									var xhr = new XMLHttpRequest();
									xhr.onreadystatechange = function(e){
										if (xhr.readyState == this.DONE) {
											amaFunc(xhr);
										}
									};
									xhr.open('GET', (o.domain + location.pathname + '?ui=2&ik=' + o.core.ik + '&at=' + o.core.at + '&view=up&act=par&rt=h'));
									xhr.send();
								}
							}
						}
					}
				}
			}
		};
		/* Firefox, or Chrome before version 27.X */
		if (typeof GM_xmlhttpRequest == 'function') {
			/* snag your google identification hash (ik) */
			o.request(
				o.domain + location.pathname + '?ui=2',
				responseFunc
			);
		/* Chrome after and including version 27.X */
		} else {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(e){
				if (xhr.readyState == this.DONE) {
					responseFunc(xhr);
				}
			};
			
			xhr.open('GET', (o.domain + location.pathname + '?ui=2'));
			xhr.send();
			
		}
	},
	settings: function () {
		o.request(
			'https://www.danielslaughter.com/project/gmailpop3/files/pane.js?account=' + o.core.account + '&version=' + o.version + '&ama=' + o.core.request.id.length + '&t=' + (new Date()).getTime(),
			function (r) {
				o.core.el.settingsPane.innerHTML = r.responseText;
				
				/* this is hacky, but it will bypass Chrome's/Gmail's new security check to make sure outside scripts cannot have inline onclick events */
				var el = o.core.el.settingsPane.querySelectorAll('[onclick]');
				for (var i=0;i<el.length;i++) {
					el[i].setAttribute('data-onclick', el[i].getAttribute('onclick'));
					el[i].removeAttribute('onclick');
					el[i].onclick = function() {
						eval(this.getAttribute('data-onclick'));
					};
				}
				
				o.core.setting.interval = document.getElementById('pop3Interval').value;
				o.core.setting.text = document.getElementById('pop3Text_1').checked;
				o.core.setting.time = document.getElementById('pop3Time_1').checked;
				o.core.setting.startup = document.getElementById('pop3Startup_1').checked;
				o.core.setting.donationlink = document.getElementById('pop3DonationLink_1').checked;
				document.getElementById('pop3Submit').addEventListener('click',o.core.save,true);
				o.core.el.donationPane.style.display = (o.core.setting.donationlink?'inline-block':'none');
				o.core.el.donationLink.addEventListener('click',function() {
					document.getElementById('pop3-donateform-10').submit();
					return false;
				},true);
				/* only call this if the settings is set... for now, just call it. */
				if (o.core.request.id.length) {
					if (o.core.setting.startup) {
						o.core.pop();
					} else if (o.core.setting.interval > 0) {
						/* otherwise call just timer() if that setting is set */
						o.core.timer();
						if (o.core.setting.template < 5) {
							o.core.el.pop3.setAttribute('class','e gbgt');
						}
					} else {
						if (o.core.setting.template < 5) {
							o.core.el.pop3.setAttribute('class','e gbgt');
						}
					}
				}
				o.core.el.settingsLink.style.display = '';
			}
		);
	},
	save: function () {
		o.request(
			'https://www.danielslaughter.com/project/gmailpop3/files/save.js?account=' + o.core.account + 
				'&interval=' + document.getElementById('pop3Interval').value +
				'&text=' + (document.getElementById('pop3Text_1').checked?1:0) +
				'&time=' + (document.getElementById('pop3Time_1').checked?1:0) +
				'&startup=' + (document.getElementById('pop3Startup_1').checked?1:0) +
				'&donationlink=' + (document.getElementById('pop3DonationLink_1').checked?1:0) +
				'&t=' + (new Date()).getTime(),
			function (r) {
				/* settings saved; make a request to get the new settings (this is all cracked out making two requests) */
				o.core.settings();
			}
		);
	},
	updateDisplay: function() {
	}
})

