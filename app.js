/* ---------- Rendering ---------- */
var grid=document.getElementById("grid"),chipsEl=document.getElementById("chips"),statusEl=document.getElementById("status"),spot=document.getElementById("spotlight"),qEl=document.getElementById("q"),clearBtn=document.getElementById("clear");
var CATS=[];R.forEach(function(r){if(CATS.indexOf(r.cat)<0)CATS.push(r.cat)});
var activeCat="All";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function card(r,badge){
  return '<article class="card'+(badge?' pick':'')+'"><div class="meta"><span class="cat">'+esc(r.cat)+'</span>'+(badge?'<span class="badge">'+esc(badge)+'</span>':'')+'</div><h3>'+esc(r.n)+'</h3><p>'+esc(r.d)+'</p>'+
  (r._why&&r._why.length?'<div class="why">Matched: '+r._why.map(function(c){return CONCEPT_LABEL[c]||c}).join(", ")+'</div>':'')+
  '<a class="go" href="'+esc(r.u)+'" target="_blank" rel="noopener noreferrer">'+esc(r.cta||"Learn more")+' &rarr;</a></article>';
}
function renderChips(list){
  var counts={All:list.length};list.forEach(function(r){counts[r.cat]=(counts[r.cat]||0)+1});
  var names=["All"].concat(CATS.filter(function(c){return counts[c]}));
  if(names.indexOf(activeCat)<0)activeCat="All";
  chipsEl.innerHTML=names.map(function(c){return '<button type="button" class="pill" data-c="'+esc(c)+'" aria-pressed="'+(c===activeCat)+'">'+esc(c)+' ('+counts[c]+')</button>'}).join("");
}
function render(){
  var q=qEl.value.trim();clearBtn.hidden=!q;
  var out=search(q),list=out.list;
  renderChips(list);
  var shown=activeCat==="All"?list:list.filter(function(r){return r.cat===activeCat});
  var sp=out.qc.cardio&&q;
  var picks=sp?R.filter(function(r){return r.c.indexOf("cardio")>-1&&r.cat==="Fitness & Rec"&&r.pick}):[];
  if(sp){
    spot.innerHTML='<div class="spot"><div class="eyebrow">Cardio at the Rec</div><h2>Get your heart rate up</h2><p>The Rec offers free and paid fitness classes, and there is a cardio kickboxing class every week. F45 adds high-intensity circuit workouts, and the Rec gyms have space to run, row and ride on your own. If you want to learn more or sign up, use these links.</p><div class="actions"><a class="btn" target="_blank" rel="noopener noreferrer" href="'+REC+'fitwell/class-schedule.php">Class schedule and sign up &rarr;</a><a class="btn ghost" target="_blank" rel="noopener noreferrer" href="'+REC+'fitwell/f45.php">F45 &rarr;</a><a class="btn ghost" target="_blank" rel="noopener noreferrer" href="'+REC+'">University Recreation &rarr;</a></div></div>';
  }else spot.innerHTML="";
  var html=shown.map(function(r){return card(r,sp&&picks.indexOf(r)>-1?"Cardio pick":"")}).join("");
  grid.innerHTML=html||'<div class="empty">Nothing matched "'+esc(q)+'". Try a simpler word like workout, tutoring, stress, food or job.</div>';
  var sres=socialMatches(q);
  statusEl.innerHTML=q?'<b>'+shown.length+'</b> '+(shown.length===1?'resource':'resources')+' for "'+esc(q)+'"'+(sres?'. Also see the <a href="#social">Social section</a>.':''):'<b>'+R.length+'</b> resources across <b>'+CATS.length+'</b> categories. Search above or filter below.';
}
function socialMatches(q){
  var toks=tokens(q);if(!toks.length)return false;
  return S.some(function(s){var w=words(s.n+" "+s.t);return toks.some(function(t){var st=stem(t);return st.length>2&&w.some(function(x){return same(st,x)})})});
}
document.addEventListener("click",function(e){
  var b=e.target.closest(".pill[data-c]");if(b){activeCat=b.getAttribute("data-c");render();return}
  var s=e.target.closest(".pill[data-s]");if(s){qEl.value=s.getAttribute("data-s");activeCat="All";render();document.getElementById("directory").scrollIntoView({behavior:"smooth"})}
});
qEl.addEventListener("input",function(){activeCat="All";render()});
document.getElementById("searchform").addEventListener("submit",function(e){e.preventDefault();document.getElementById("directory").scrollIntoView({behavior:"smooth"})});
clearBtn.addEventListener("click",function(){qEl.value="";activeCat="All";render();qEl.focus()});
var tryEl=document.getElementById("try");
["workout","cardio","I'm stressed","free food","tutoring","find a job","study abroad","cheap textbooks"].forEach(function(w){var b=document.createElement("button");b.type="button";b.className="pill";b.setAttribute("data-s",w);b.textContent=w;tryEl.appendChild(b)});

document.getElementById("helpgrid").innerHTML=R.filter(function(r){return r.help}).map(function(r){return card(r,"")}).join("");
document.getElementById("socialgrid").innerHTML=S.map(function(s){return '<article class="card"><div class="meta"><span class="cat">Follow</span></div><h3>'+esc(s.n)+'</h3><p>'+esc(s.d)+'</p><div class="soc-links">'+s.links.map(function(l){return '<a href="'+esc(l[1])+'" target="_blank" rel="noopener noreferrer">'+esc(l[0])+'</a>'}).join("")+'</div></article>'}).join("");
render();
