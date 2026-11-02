(function(){
  var TYPES=[
    {k:'Hire',cls:'t-hire',kind:'in'},
    {k:'Promotion',cls:'t-prom',kind:'int'},
    {k:'Transfer',cls:'t-trans',kind:'int'},
    {k:'Resignation',cls:'t-res',kind:'out'},
    {k:'Retirement',cls:'t-ret',kind:'out'},
    {k:'End of Contract',cls:'t-eoc',kind:'out'}
  ];
  var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var S={movements:[],meta:{},loaded:{m:false,i:false},year:null,dept:'all',type:'all',q:'',canEdit:false};
  var $=function(id){return document.getElementById(id)};
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function typeInfo(k){for(var i=0;i<TYPES.length;i++)if(TYPES[i].k===k)return TYPES[i];return {k:k,cls:'t-trans',kind:'int'}}
  function parts(d){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||'');return m?{y:+m[1],m:+m[2],d:+m[3]}:null}
  function fmt(d){var p=parts(d);return p?MON[p.m-1]+' '+p.d+', '+p.y:(d||'')}
  function yearOf(m){var p=parts(m.date);return p?p.y:null}

  function setStatus(t,err){var s=$('status');s.textContent=t||'';s.className='status'+(err?' err':'');s.hidden=!t}

  /* ----- derived data ----- */
  function years(){
    var set={};S.movements.forEach(function(m){var y=yearOf(m);if(y)set[y]=1});
    var a=Object.keys(set).map(Number).sort(function(a,b){return b-a});
    return a;
  }
  function depts(){
    var set={};S.movements.forEach(function(m){if(m.department)set[m.department]=1});
    return Object.keys(set).sort();
  }
  function base(){
    return S.movements.filter(function(m){
      if(S.year!=='all'&&yearOf(m)!==S.year)return false;
      if(S.dept!=='all'&&m.department!==S.dept)return false;
      return true;
    });
  }
  function matchQ(m){
    if(!S.q)return true;
    var h=[m.name,m.position,m.department,m.detail,m.type].join(' ').toLowerCase();
    return h.indexOf(S.q.toLowerCase())>-1;
  }
  function sorted(a){
    return a.slice().sort(function(x,y){
      if(x.date!==y.date)return (y.date||'')<(x.date||'')?-1:1;
      return (y.createdAt||0)-(x.createdAt||0);
    });
  }

  /* ----- render ----- */
  function renderHead(){
    var m=S.meta||{};
    var asof=$('asof');
    var bits=[];
    if(typeof m.headcount==='number')bits.push('Headcount <b>'+esc(m.headcount)+'</b>');
    if(m.asOf)bits.push('as of <b>'+esc(fmt(m.asOf))+'</b>');
    asof.innerHTML=bits.join(' ');
    $('sampleBanner').hidden=!m.sample;
    var a=(m.announcement||'').trim();
    $('announce').hidden=!a;
    $('announceText').textContent=a;
  }
  function renderFilters(){
    var ys=years(),ysel=$('fYear'),cur=S.year;
    var opts='<option value="all">All years</option>'+ys.map(function(y){return '<option value="'+y+'">'+y+'</option>'}).join('');
    ysel.innerHTML=opts;
    if(cur===null){cur=ys.length?ys[0]:new Date().getFullYear();S.year=cur}
    ysel.value=cur==='all'?'all':String(cur);
    if(ysel.value!==(cur==='all'?'all':String(cur))){ysel.value='all';S.year='all'}
    var ds=depts(),dsel=$('fDept');
    dsel.innerHTML='<option value="all">All departments</option>'+ds.map(function(d){return '<option value="'+esc(d)+'">'+esc(d)+'</option>'}).join('');
    dsel.value=S.dept;
    if(dsel.value!==S.dept){dsel.value='all';S.dept='all'}
  }
  function renderTiles(){
    var b=base(),h=0,s=0,i=0;
    b.forEach(function(m){var k=typeInfo(m.type).kind;if(k==='in')h++;else if(k==='out')s++;else i++});
    var net=h-s,netTxt=(net>0?'+':'')+net;
    var scope=(S.year==='all'?'All years':S.year)+(S.dept==='all'?'':' · '+S.dept);
    var t=[
      {k:'Hires',v:h,n:scope,c:'var(--c-hire)'},
      {k:'Separations',v:s,n:'Resigned, retired, contract ended',c:'var(--c-res)'},
      {k:'Transfers and promotions',v:i,n:'Internal movements',c:'var(--c-prom)'},
      {k:'Net change',v:netTxt,n:'Hires minus separations',c:'var(--accent)'}
    ];
    $('tiles').innerHTML=t.map(function(x){
      return '<div class="tile" style="--tc:'+x.c+'"><span class="k">'+esc(x.k)+'</span><span class="v">'+esc(x.v)+'</span><span class="n">'+esc(x.n)+'</span></div>';
    }).join('');
  }
  function renderChart(){
    var yr=S.year==='all'?(years()[0]||new Date().getFullYear()):S.year;
    var h=new Array(12).fill(0),s=new Array(12).fill(0);
    S.movements.forEach(function(m){
      var p=parts(m.date);if(!p||p.y!==yr)return;
      if(S.dept!=='all'&&m.department!==S.dept)return;
      var k=typeInfo(m.type).kind;
      if(k==='in')h[p.m-1]++;else if(k==='out')s[p.m-1]++;
    });
    var max=Math.max(1,Math.max.apply(null,h.concat(s)));
    $('chartHint').textContent='Monthly counts for '+yr+(S.dept==='all'?'.':' in '+S.dept+'.');
    $('chart').innerHTML=h.map(function(_,i){
      var hh=h[i]/max*100,ss=s[i]/max*100;
      return '<div class="col"><div class="bars">'+
        '<div class="bar h" style="height:'+hh+'%" title="'+MON[i]+': '+h[i]+' hires">'+(h[i]?'<span>'+h[i]+'</span>':'')+'</div>'+
        '<div class="bar s" style="height:'+ss+'%" title="'+MON[i]+': '+s[i]+' separations">'+(s[i]?'<span>'+s[i]+'</span>':'')+'</div>'+
        '</div></div>';
    }).join('');
    $('months').innerHTML=MON.map(function(m){return '<span>'+m+'</span>'}).join('');
  }
  function renderChips(){
    var b=base().filter(matchQ),counts={};
    b.forEach(function(m){counts[m.type]=(counts[m.type]||0)+1});
    var html='<button class="chip" type="button" data-type="all" aria-pressed="'+(S.type==='all')+'">All<small>'+b.length+'</small></button>';
    TYPES.forEach(function(t){
      html+='<button class="chip" type="button" data-type="'+esc(t.k)+'" aria-pressed="'+(S.type===t.k)+'">'+esc(t.k)+'<small>'+(counts[t.k]||0)+'</small></button>';
    });
    $('chips').innerHTML=html;
  }
  var armed=null,armTimer=null;
  function renderLog(){
    var list=sorted(base().filter(function(m){return (S.type==='all'||m.type===S.type)&&matchQ(m)}));
    $('count').textContent=list.length+(list.length===1?' movement':' movements');
    var log=$('log');
    if(!S.loaded.m){log.innerHTML='<div class="empty">Loading…</div>';return}
    if(!list.length){
      log.innerHTML='<div class="empty">'+(S.movements.length?'No movements match these filters.':'No movements have been posted yet.')+'</div>';
      return;
    }
    var html='<div class="row head" role="row"><div>Effective</div><div>Movement</div><div>Employee</div><div>Position</div><div>Department</div><div>Details</div></div>';
    list.forEach(function(m){
      var t=typeInfo(m.type);
      html+='<div class="row"><div class="date">'+esc(fmt(m.date))+'</div>'+
        '<div class="typ"><span class="pill '+t.cls+'">'+esc(m.type)+'</span></div>'+
        '<div class="name">'+esc(m.name)+'</div>'+
        '<div class="pos">'+esc(m.position||'')+'</div>'+
        '<div class="dep">'+esc(m.department||'')+'</div>'+
        '<div class="det">'+esc(m.detail||'')+
        (S.canEdit?'<div><button class="del" type="button" data-id="'+esc(m.id)+'">'+(armed===m.id?'Confirm delete':'Delete')+'</button></div>':'')+
        '</div></div>';
    });
    log.innerHTML=html;
    var armedBtn=log.querySelector('.del[data-id="'+(armed||'')+'"]');
    if(armedBtn)armedBtn.classList.add('armed');
  }
  function render(){
    renderHead();renderFilters();renderTiles();renderChart();renderChips();renderLog();
    if(S.loaded.m&&S.loaded.i)setStatus('');
  }

  /* ----- events ----- */
  $('fYear').addEventListener('change',function(e){S.year=e.target.value==='all'?'all':+e.target.value;render()});
  $('fDept').addEventListener('change',function(e){S.dept=e.target.value;render()});
  $('fQ').addEventListener('input',function(e){S.q=e.target.value.trim();renderChips();renderLog()});
  $('chips').addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    S.type=b.getAttribute('data-type');renderChips();renderLog();
  });
  /* ----- boot ----- */
  var D=window.MANPOWER_DATA||{meta:{},movements:[]};
  S.meta=D.meta||{};
  S.movements=(D.movements||[]).map(function(m,i){var o=Object.assign({},m);o.id=String(i);o.createdAt=i;return o});
  S.loaded.m=true;S.loaded.i=true;
  render();
})();
