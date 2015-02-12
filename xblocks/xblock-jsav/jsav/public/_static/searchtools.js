var Stemmer=function(){var h={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"};var e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""};var i="[^aeiou]";var k="[aeiouy]";var a=i+"[^aeiouy]*";var g=k+"[aeiou]*";var f="^("+a+")?"+g+a;var b="^("+a+")?"+g+a+"("+g+")?$";var d="^("+a+")?"+g+a+g+a;var j="^("+a+")?"+k;this.stemWord=function(q){var l;var s;var r;var c=q;if(q.length<3){return q}var t;var o;var n;var m;r=q.substr(0,1);if(r=="y"){q=r.toUpperCase()+q.substr(1)}t=/^(.+?)(ss|i)es$/;o=/^(.+?)([^s])s$/;if(t.test(q)){q=q.replace(t,"$1$2")}else{if(o.test(q)){q=q.replace(o,"$1$2")}}t=/^(.+?)eed$/;o=/^(.+?)(ed|ing)$/;if(t.test(q)){var p=t.exec(q);t=new RegExp(f);if(t.test(p[1])){t=/.$/;q=q.replace(t,"")}}else{if(o.test(q)){var p=o.exec(q);l=p[1];o=new RegExp(j);if(o.test(l)){q=l;o=/(at|bl|iz)$/;n=new RegExp("([^aeiouylsz])\\1$");m=new RegExp("^"+a+k+"[^aeiouwxy]$");if(o.test(q)){q=q+"e"}else{if(n.test(q)){t=/.$/;q=q.replace(t,"")}else{if(m.test(q)){q=q+"e"}}}}}}t=/^(.+?)y$/;if(t.test(q)){var p=t.exec(q);l=p[1];t=new RegExp(j);if(t.test(l)){q=l+"i"}}t=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;if(t.test(q)){var p=t.exec(q);l=p[1];s=p[2];t=new RegExp(f);if(t.test(l)){q=l+h[s]}}t=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;if(t.test(q)){var p=t.exec(q);l=p[1];s=p[2];t=new RegExp(f);if(t.test(l)){q=l+e[s]}}t=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;o=/^(.+?)(s|t)(ion)$/;if(t.test(q)){var p=t.exec(q);l=p[1];t=new RegExp(d);if(t.test(l)){q=l}}else{if(o.test(q)){var p=o.exec(q);l=p[1]+p[2];o=new RegExp(d);if(o.test(l)){q=l}}}t=/^(.+?)e$/;if(t.test(q)){var p=t.exec(q);l=p[1];t=new RegExp(d);o=new RegExp(b);n=new RegExp("^"+a+k+"[^aeiouwxy]$");if(t.test(l)||(o.test(l)&&!(n.test(l)))){q=l}}t=/ll$/;o=new RegExp(d);if(t.test(q)&&o.test(q)){t=/.$/;q=q.replace(t,"")}if(r=="y"){q=r.toLowerCase()+q.substr(1)}return q}};var Scorer={objNameMatch:11,objPartialMatch:6,objPrio:{0:15,1:5,2:-5},objPrioDefault:0,title:15,term:5};var Search={_index:null,_queued_query:null,_pulse_status:-1,init:function(){var b=$.getQueryParameters();if(b.q){var a=b.q[0];$('input[name="q"]')[0].value=a;this.performSearch(a)}},loadIndex:function(a){$.ajax({type:"GET",url:a,data:null,dataType:"script",cache:true,complete:function(c,b){if(b!="success"){document.getElementById("searchindexloader").src=a}}})},setIndex:function(a){var b;this._index=a;if((b=this._queued_query)!==null){this._queued_query=null;Search.query(b)}},hasIndex:function(){return this._index!==null},deferQuery:function(a){this._queued_query=a},stopPulse:function(){this._pulse_status=0},startPulse:function(){if(this._pulse_status>=0){return}function a(){var c;Search._pulse_status=(Search._pulse_status+1)%4;var b="";for(c=0;c<Search._pulse_status;c++){b+="."}Search.dots.text(b);if(Search._pulse_status>-1){window.setTimeout(a,500)}}a()},performSearch:function(a){this.out=$("#search-results");this.title=$("<h2>"+_("Searching")+"</h2>").appendTo(this.out);this.dots=$("<span></span>").appendTo(this.title);this.status=$('<p style="display: none"></p>').appendTo(this.out);this.output=$('<ul class="search"/>').appendTo(this.out);$("#search-progress").text(_("Preparing search..."));this.startPulse();if(this.hasIndex()){this.query(a)}else{this.deferQuery(a)}},query:function(d){var o;var h=["a","and","are","as","at","be","but","by","for","if","in","into","is","it","near","no","not","of","on","or","such","that","the","their","then","there","these","they","this","to","was","will","with"];var k=new Stemmer();var j=[];var g=[];var f=[];var q=d.split(/\s+/);var s=[];for(o=0;o<q.length;o++){if(q[o]!==""){s.push(q[o].toLowerCase())}if($u.indexOf(h,q[o].toLowerCase())!=-1||q[o].match(/^\d+$/)||q[o]===""){continue}var p=k.stemWord(q[o].toLowerCase());var a;if(p[0]=="-"){a=g;p=p.substr(1)}else{a=j;f.push(q[o].toLowerCase())}if(!$u.contains(a,p)){a.push(p)}}var l="?highlight="+$.urlencode(f.join(" "));var e=this._index.terms;var b=this._index.titleterms;var m=[];$("#search-progress").empty();for(o=0;o<s.length;o++){var r=[].concat(s.slice(0,o),s.slice(o+1,s.length));m=m.concat(this.performObjectSearch(s[o],r))}m=m.concat(this.performTermsSearch(j,g,e,Scorer.term)).concat(this.performTermsSearch(j,g,b,Scorer.title));if(Scorer.score){for(o=0;o<m.length;o++){m[o][4]=Scorer.score(m[o])}}m.sort(function(t,i){var v=t[4];var u=i[4];if(v>u){return 1}else{if(v<u){return -1}else{v=t[1].toLowerCase();u=i[1].toLowerCase();return(v>u)?-1:((v<u)?1:0)}}});var n=m.length;function c(){if(m.length){var t=m.pop();var i=$('<li style="display:none"></li>');if(DOCUMENTATION_OPTIONS.FILE_SUFFIX===""){var u=t[0]+"/";if(u.match(/\/index\/$/)){u=u.substring(0,u.length-6)}else{if(u=="index/"){u=""}}i.append($("<a/>").attr("href",DOCUMENTATION_OPTIONS.URL_ROOT+u+l+t[2]).html(t[1]))}else{i.append($("<a/>").attr("href",t[0]+DOCUMENTATION_OPTIONS.FILE_SUFFIX+l+t[2]).html(t[1]))}if(t[3]){i.append($("<span> ("+t[3]+")</span>"));Search.output.append(i);i.slideDown(5,function(){c()})}else{if(DOCUMENTATION_OPTIONS.HAS_SOURCE){$.ajax({url:DOCUMENTATION_OPTIONS.URL_ROOT+"_sources/"+t[0]+".txt",dataType:"text",complete:function(x,v){var w=x.responseText;if(w!==""){i.append(Search.makeSearchSummary(w,j,f))}Search.output.append(i);i.slideDown(5,function(){c()})}})}else{Search.output.append(i);i.slideDown(5,function(){c()})}}}else{Search.stopPulse();Search.title.text(_("Search Results"));if(!n){Search.status.text(_("Your search did not match any documents. Please make sure that all words are spelled correctly and that you've selected enough categories."))}else{Search.status.text(_("Search finished, found %s page(s) matching the search query.").replace("%s",n))}Search.status.fadeIn(500)}}c()},performObjectSearch:function(q,r){var p=this._index.filenames;var a=this._index.objects;var g=this._index.objnames;var t=this._index.titles;var n;var j=[];for(var l in a){for(var u in a[l]){var m=(l?l+".":"")+u;if(m.toLowerCase().indexOf(q)>-1){var o=0;var k=m.split(".");if(m==q||k[k.length-1]==q){o+=Scorer.objNameMatch}else{if(k[k.length-1].indexOf(q)>-1){o+=Scorer.objPartialMatch}}var f=a[l][u];var b=g[f[1]][2];var s=t[f[0]];if(r.length>0){var e=(l+" "+u+" "+b+" "+s).toLowerCase();var c=true;for(n=0;n<r.length;n++){if(e.indexOf(r[n])==-1){c=false;break}}if(!c){continue}}var h=b+_(", in ")+s;var d=f[3];if(d===""){d=m}else{if(d=="-"){d=g[f[1]][1]+"-"+m}}if(Scorer.objPrio.hasOwnProperty(f[2])){o+=Scorer.objPrio[f[2]]}else{o+=Scorer.objPrioDefault}j.push([p[f[0]],m,"#"+d,h,o])}}}return j},performTermsSearch:function(o,n,h,e){var m=this._index.filenames;var l=this._index.titles;var k,f,d,c;var p={};var g=[];for(k=0;k<o.length;k++){var b=o[k];if((c=h[b])===undefined){break}if(c.length===undefined){c=[c]}for(f=0;f<c.length;f++){d=c[f];if(d in p){p[d].push(b)}else{p[d]=[b]}}}for(d in p){var a=true;if(p[d].length!=o.length){continue}for(k=0;k<n.length;k++){if(h[n[k]]==d||$u.contains(h[n[k]]||[],d)){a=false;break}}if(a){g.push([m[d],l[d],"",null,e])}}return g},makeSearchSummary:function(d,b,g){var c=d.toLowerCase();var f=0;$.each(b,function(){var h=c.indexOf(this.toLowerCase());if(h>-1){f=h}});f=Math.max(f-120,0);var a=((f>0)?"...":"")+$.trim(d.substr(f,240))+((f+240-d.length)?"...":"");var e=$('<div class="context"></div>').text(a);$.each(g,function(){e=e.highlightText(this,"highlighted")});return e}};$(document).ready(function(){Search.init()});