/* Student organizations section. Reads window.ORGS (written by tools/import-orgs.mjs). */
(function(){
  var orgs=window.ORGS||[],PER=24,shown=PER;
  var grid=document.getElementById("orggrid"),qEl=document.getElementById("orgq"),catEl=document.getElementById("orgcat"),stat=document.getElementById("orgstat"),clr=document.getElementById("orgclear");
  if(!grid)return;
  function e(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  var LABEL={instagram:"Instagram",x:"X",facebook:"Facebook",tiktok:"TikTok",youtube:"YouTube",linkedin:"LinkedIn",linktree:"Linktree",discord:"Discord",groupme:"GroupMe"};
  function link(u,t){return '<a href="'+e(u)+'" target="_blank" rel="noopener noreferrer">'+e(t)+'</a>'}
  function row(t,v,mark){return '<div><dt>'+t+'</dt><dd'+(v?'':' class="none"')+'>'+(v?e(v):'Not listed')+'</dd></div>'}
  function card(o){
    var links=[];
    if(o.url)links.push(link(o.url,"TechConnect page"));
    if(o.website)links.push(link(o.website,"Website"));
    Object.keys(o.social||{}).forEach(function(k){links.push(link(o.social[k],LABEL[k]||k))});
    return '<article class="card"><div class="meta"><span class="cat">'+e((o.categories&&o.categories[0])||"Student organization")+'</span></div><h3>'+e(o.name)+'</h3><p>'+e(o.summary||"No description listed.")+'</p><dl class="rows">'+row("How to join",o.join)+row("Dues",o.dues)+row("Opportunities",o.opportunities)+(o.email?'<div><dt>Contact</dt><dd>'+e(o.email)+'</dd></div>':'')+'</dl><div class="soc-links">'+links.join("")+'</div></article>';
  }
  var cats=[];orgs.forEach(function(o){(o.categories||[]).forEach(function(c){if(cats.indexOf(c)<0)cats.push(c)})});cats.sort();
  catEl.innerHTML='<option value="">All categories</option>'+cats.map(function(c){return '<option>'+e(c)+'</option>'}).join("");
  function hay(o){return (o.name+" "+(o.categories||[]).join(" ")+" "+(o.summary||"")+" "+(o.about||"")).toLowerCase()}
  orgs.forEach(function(o){o._h=hay(o);o._n=o.name.toLowerCase()});
  function expand(toks){
    /* use the site's concept words so "fitness" also finds orgs that say "workout" or "lifting" */
    var extra=[];
    if(typeof CONCEPTS!=="undefined")Object.keys(CONCEPTS).forEach(function(k){var w=CONCEPTS[k].split(/\s+/);if(toks.some(function(t){return t.length>2&&w.indexOf(t)>-1}))extra=extra.concat(w.filter(function(x){return x.length>3}))});
    return extra;
  }
  function run(){
    var q=qEl.value.trim().toLowerCase(),cat=catEl.value;clr.hidden=!q;
    var toks=q.split(/[^a-z0-9]+/).filter(function(t){return t.length>1});
    var extra=toks.length?expand(toks):[];
    var list=orgs.filter(function(o){return !cat||(o.categories||[]).indexOf(cat)>-1}).map(function(o){
      var s=0;
      if(!toks.length)return {o:o,s:1};
      toks.forEach(function(t){if(o._n.indexOf(t)>-1)s+=5;else if(o._h.indexOf(t)>-1)s+=2});
      extra.forEach(function(t){if(o._h.indexOf(t)>-1)s+=.5});
      return {o:o,s:s};
    }).filter(function(x){return x.s>0});
    if(toks.length)list.sort(function(a,b){return b.s-a.s});
    return list.map(function(x){return x.o});
  }
  function render(){
    if(!orgs.length){
      stat.textContent="";
      grid.innerHTML='<div class="empty setup"><b>The organization list has not been imported yet.</b><br>Run <code>node tools/import-orgs.mjs</code> from the project folder, then refresh this page. It pulls every organization from TechConnect, including what each one does, and any joining, dues and opportunity details and social links its page lists. Until then, <a href="https://ttu.campuslabs.com/engage/organizations" target="_blank" rel="noopener noreferrer">browse the organizations on TechConnect</a>.</div>';
      return;
    }
    var list=run();
    stat.innerHTML='<b>'+list.length+'</b> of '+orgs.length+' organizations'+(window.ORGS_UPDATED?' &middot; imported '+e(window.ORGS_UPDATED):'');
    var html=list.slice(0,shown).map(card).join("");
    grid.innerHTML=html||'<div class="empty">No organizations matched. Try a broader word like service, engineering or faith.</div>';
    var old=document.getElementById("orgmore");if(old)old.remove();
    if(list.length>shown){var b=document.createElement("button");b.id="orgmore";b.type="button";b.className="more";b.textContent="Show more ("+(list.length-shown)+" left)";b.onclick=function(){shown+=PER;render()};grid.after(b)}
  }
  qEl.addEventListener("input",function(){shown=PER;render()});
  catEl.addEventListener("change",function(){shown=PER;render()});
  clr.addEventListener("click",function(){qEl.value="";shown=PER;render();qEl.focus()});
  document.getElementById("orgform").addEventListener("submit",function(ev){ev.preventDefault()});
  render();
})();
