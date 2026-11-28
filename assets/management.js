/* OPPO dashboard data management: independent source uploads, monthly targets and daily reports */
const MG_TARGET_KEY='oppo_shop_dashboard_targets_v1';
const MG_BASE_KEY='oppo_shop_dashboard_base_targets_v1';
let mgTargets={};
let mgBaseTargets={};
let mgBaseFile='';
const mgFmt=n=>new Intl.NumberFormat('vi-VN',{maximumFractionDigits:1}).format(Number(n)||0);
const mgMoney=n=>new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(Number(n)||0);
const mgPct=n=>(Number(n||0)*100).toFixed(1)+'%';
const mgEsc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mgNorm=v=>String(v||'').normalize('NFD').replace(/[Đđ]/g,'d').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function mgResolveStaff(v){const raw=String(v||'').trim();if(!raw)return'Chưa xác định';const a=[...(currentData.productivity||[]).map(x=>x.name),...(currentData.kpiReport||[]).map(x=>x.full_name||x.name)];return a.find(x=>mgNorm(x)===mgNorm(raw))||raw.replace(/（[^）]*）|\([^)]*\)/g,'').trim();}
function mgFiltered(src){const a=src==='CENTER'?currentData.centerRecords:currentData.gcsmRecords,from=document.getElementById('dashFrom').value,to=document.getElementById('dashTo').value,staff=document.getElementById('dashStaff').value;return a.filter(r=>{const d=String(r.date||r.time||'').slice(0,10);if((from||to)&&!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;if(from&&d<from)return false;if(to&&d>to)return false;if(staff!=='ALL'){const n=src==='CENTER'?mgResolveStaff(r.kpi_staff||r.creator):mgResolveStaff(r.creator);if(mgNorm(n)!==mgNorm(staff))return false;}return true;});}
function mgPersist(){try{localStorage.setItem('oppo_shop_dashboard_latest_data_v1',JSON.stringify(currentData));if(typeof updateStorageBadge==='function')updateStorageBadge(true);return true;}catch(e){return false;}}
function mgApplyTargets(){
  try{mgTargets=JSON.parse(localStorage.getItem(MG_TARGET_KEY)||'{}');}catch(e){mgTargets={};}
  const file=currentData.meta?.fileName||'default';
  if(!Object.keys(mgBaseTargets).length||file!==mgBaseFile){
    let saved=null;try{saved=JSON.parse(localStorage.getItem(MG_BASE_KEY)||'null');}catch(e){}
    if(saved&&saved.file===file&&saved.values)mgBaseTargets={...saved.values};
    else {
      const defaults=window.DEFAULT_SHOP_DATA;
      const source=(defaults&&defaults.meta&&defaults.meta.fileName===file&&Array.isArray(defaults.categories))?defaults.categories:currentData.categories;
      mgBaseTargets={};source.forEach(c=>mgBaseTargets[c.key]=Number(c.target)||0);
      try{localStorage.setItem(MG_BASE_KEY,JSON.stringify({file,values:mgBaseTargets}));}catch(e){}
    }
    mgBaseFile=file;
  }
  currentData.categories.forEach(c=>{if(mgBaseTargets[c.key]!==undefined)c.target=mgBaseTargets[c.key];});
  const m=document.getElementById('mgTargetMonth')?.value||new Date().toISOString().slice(0,7),o=mgTargets[m];
  if(o)currentData.categories.forEach(c=>{if(o[c.key]!==undefined)c.target=Number(o[c.key])||0;});
}
function mgTargetEditor(){const e=document.getElementById('mgTargetEditor');if(!e)return;e.innerHTML=currentData.categories.map(c=>'<label class="flex items-center justify-between gap-3 text-sm"><span>'+mgEsc(c.name)+'</span><input type="number" min="0" step="0.1" data-mg-target="'+mgEsc(c.key)+'" value="'+Number(c.target||0)+'" class="w-32 border rounded-lg px-2 py-1.5 text-right"></label>').join('');}
function mgPopulateStaff(){const e=document.getElementById('dashStaff'),old=e.value,m=new Map();[...currentData.centerRecords.map(r=>mgResolveStaff(r.kpi_staff||r.creator)),...currentData.gcsmRecords.map(r=>mgResolveStaff(r.creator)),...currentData.productivity.map(p=>p.name)].filter(Boolean).forEach(n=>m.set(mgNorm(n),n));e.innerHTML='<option value="ALL">Tất cả nhân viên</option>'+[...m.values()].sort((a,b)=>a.localeCompare(b,'vi')).map(n=>'<option value="'+mgEsc(n)+'">'+mgEsc(n)+'</option>').join('');if([...e.options].some(o=>o.value===old))e.value=old;}
function mgRenderProducts(){const m=new Map(),add=(r,s)=>{const n=s==='CENTER'?(r.model||r.product):(r.product||r.model);if(!n)return;const x=m.get(n)||{name:n,type:r.type||r.category||'Khác',qty:0,rev:0,points:0};x.qty+=Number(r.qty)||0;x.rev+=s==='CENTER'?Number(r.receivable||r.retail_revenue)||0:Number(r.retail_price)||0;x.points+=Number(r.points)||0;m.set(n,x);};mgFiltered('CENTER').filter(mgIsCenterSales).forEach(r=>add(r,'CENTER'));mgFiltered('GCSM').forEach(r=>add(r,'GCSM'));const a=[...m.values()].sort((x,y)=>y.points-x.points||y.rev-x.rev);document.getElementById('mgProductBody').innerHTML=a.map(x=>'<tr><td class="p-2 font-semibold">'+mgEsc(x.name)+'</td><td class="p-2">'+mgEsc(x.type)+'</td><td class="p-2 text-right">'+mgFmt(x.qty)+'</td><td class="p-2 text-right">'+mgMoney(x.rev)+'</td><td class="p-2 text-right font-bold text-emerald-700">'+mgFmt(x.points)+'</td></tr>').join('')||'<tr><td colspan="5" class="p-4 text-center">Không có dữ liệu</td></tr>';}
function mgRenderStaff(){const m=new Map(),add=(n,s,p,v)=>{n=mgResolveStaff(n);const k=mgNorm(n),x=m.get(k)||{name:n,c:0,g:0,p:0,v:0};x[s]+=Number(p)||0;x.p+=Number(p)||0;x.v+=Number(v)||0;m.set(k,x);};mgFiltered('CENTER').filter(mgIsCenterSales).forEach(r=>add(r.kpi_staff||r.creator,'c',r.points,r.receivable||r.retail_revenue));mgFiltered('GCSM').forEach(r=>add(r.creator,'g',r.points,r.retail_price));const a=[...m.values()].sort((x,y)=>y.p-x.p),t=a.reduce((s,x)=>s+x.p,0);document.getElementById('mgStaffBody').innerHTML=a.map(x=>'<tr><td class="p-2 font-semibold">'+mgEsc(x.name)+'</td><td class="p-2 text-right">'+mgFmt(x.c)+'</td><td class="p-2 text-right">'+mgFmt(x.g)+'</td><td class="p-2 text-right font-bold text-emerald-700">'+mgFmt(x.p)+'</td><td class="p-2 text-right">'+mgMoney(x.v)+'</td><td class="p-2 text-right">'+mgPct(t?x.p/t:0)+'</td></tr>').join('')||'<tr><td colspan="6" class="p-4 text-center">Không có dữ liệu</td></tr>';}
function mgRenderService(){const t=currentData.tatKpi||{},k=currentData.klDl||{},a=[['TAT-KS',mgPct(t.tat_ks)],['TAT-GCSM',mgPct(t.tat_gcsm)],['Tỷ lệ khách lẻ',mgPct(k.pct_khach_le)],['Tỷ lệ miếng dán',mgPct(k.ty_le_md)]];document.getElementById('mgServiceCards').innerHTML=a.map(x=>'<div class="bg-white rounded-xl border p-4"><div class="text-xs text-slate-500">'+x[0]+'</div><div class="text-2xl font-extrabold text-emerald-700 mt-1">'+x[1]+'</div></div>').join('');const staff=(currentData.productivity||[]).slice().sort((a,b)=>(b.volume||0)-(a.volume||0));document.getElementById('mgServiceStaff').innerHTML=staff.map(p=>'<tr><td class="p-2 font-semibold">'+mgEsc(p.name)+'</td><td class="p-2 text-right">'+mgFmt(p.volume)+'</td><td class="p-2 text-right">'+mgFmt(p.sua_chua)+'</td><td class="p-2 text-right">'+mgFmt(p.dich_vu_cong_them)+'</td><td class="p-2 text-right">'+mgFmt(p.so_thuong)+'</td></tr>').join('')||'<tr><td colspan="5" class="p-4 text-center text-slate-500">Chưa có dữ liệu năng suất.</td></tr>';}
function mgRenderAlerts(){const a=[];currentData.categories.filter(c=>c.key!=='TOTAL'&&c.target>0&&c.actual<c.target).forEach(c=>a.push([c.name+' còn thiếu '+mgFmt(c.target-c.actual),'Hoàn thành '+mgPct(c.actual/c.target),c.actual/c.target<.8]));if(!currentData.centerRecords.length)a.push(['Chưa có dữ liệu Center SO','Upload dữ liệu Center SO để theo dõi bán hàng.',true]);if(!currentData.gcsmRecords.length)a.push(['Chưa có dữ liệu GCSM SO','Upload dữ liệu GCSM SO để theo dõi dịch vụ.',true]);if(!a.length)a.push(['Các nhóm KPI đang đạt kế hoạch','Tiếp tục theo dõi tiến độ.',false]);document.getElementById('mgAlerts').innerHTML=a.map(x=>'<div class="rounded-xl border p-3 '+(x[2]?'border-amber-200 bg-amber-50':'border-emerald-200 bg-emerald-50')+'"><div class="font-semibold text-sm">'+mgEsc(x[0])+'</div><div class="text-xs mt-1">'+mgEsc(x[1])+'</div></div>').join('');}
function mgRenderOverviewInsights(){
  const root=document.getElementById('mgOverviewInsights');if(!root||!currentData)return;
  const esc=mgEsc,items=[];
  const month=document.getElementById('mgTargetMonth')?.value||new Date().toISOString().slice(0,7);
  const [yy,mm]=month.split('-').map(Number),daysInMonth=new Date(yy,mm,0).getDate();
  const now=new Date(),isCurrent=now.getFullYear()===yy&&(now.getMonth()+1)===mm;
  const elapsed=isCurrent?Math.min(now.getDate(),daysInMonth):((new Date(yy,mm,0)<new Date(now.getFullYear(),now.getMonth(),1))?daysInMonth:0);
  const remaining=Math.max(0,daysInMonth-elapsed);
  const total=currentData.categories.find(c=>c.key==='TOTAL');
  if(total&&Number(total.target)>0){
    const gap=Math.max(0,Number(total.target)-Number(total.actual));
    const rate=Number(total.actual)/Number(total.target);
    const needed=remaining>0?gap/remaining:gap;
    const pace=elapsed>0?Number(total.actual)/elapsed:0;
    items.push({level:rate>=1?'good':rate<.8?'high':'warn',title:rate>=1?'Đã hoàn thành Target tổng điểm':('Tiến độ tổng điểm đạt '+mgPct(rate)),body:rate>=1?'Tiếp tục duy trì nhịp bán và tập trung giữ chất lượng doanh thu.':'Còn thiếu '+mgFmt(gap)+' điểm. '+(remaining>0?'Cần đạt trung bình '+mgFmt(needed)+' điểm/ngày trong '+remaining+' ngày còn lại.':'Đã hết thời gian tháng; cần rà soát kết quả và kế hoạch bù.'),action:rate>=1?'Duy trì hiệu suất, ưu tiên nhóm hàng có biên độ đóng góp tốt.':(pace>=needed&&elapsed>0?'Tốc độ hiện tại đang đáp ứng nhịp cần thiết; duy trì và kiểm tra hằng ngày.':'Ưu tiên chiến dịch bán theo ngày, giao chỉ tiêu điểm còn thiếu cho từng ca và theo dõi cuối ngày.')});
  }
  const behind=currentData.categories.filter(c=>c.key!=='TOTAL'&&Number(c.target)>0&&Number(c.actual)<Number(c.target)).sort((a,b)=>(Number(a.actual)/Number(a.target))-(Number(b.actual)/Number(b.target)));
  if(behind.length){
    const c=behind[0],gap=Number(c.target)-Number(c.actual),pct=Number(c.actual)/Number(c.target),perDay=remaining>0?gap/remaining:gap;
    items.push({level:pct<.8?'high':'warn',title:'Ưu tiên kéo nhóm '+c.name,body:'Đạt '+mgPct(pct)+', còn thiếu '+mgFmt(gap)+' điểm'+(remaining>0?' (cần '+mgFmt(perDay)+' điểm/ngày).':'.'),action:'Tập trung tư vấn đúng nhu cầu ở nhóm '+c.name+', đặt mục tiêu theo ca/ngày và rà soát đơn phát sinh để không bỏ sót điểm.'});
  } else if(!behind.length) items.push({level:'good',title:'Các nhóm hàng đều đạt Target',body:'Không ghi nhận nhóm hàng nào đang dưới chỉ tiêu.',action:'Duy trì độ phủ sản phẩm, tiếp tục bán kèm phụ kiện và gói dịch vụ phù hợp.'});
  const center=mgFiltered('CENTER').filter(mgIsCenterSales),gcsm=mgFiltered('GCSM');
  const staffMap=new Map();
  const add=(name,points)=>{const resolved=mgResolveStaff(name),key=mgNorm(resolved);if(!key)return;const x=staffMap.get(key)||{name:resolved,points:0,orders:0};x.points+=Number(points)||0;x.orders++;staffMap.set(key,x);};
  center.forEach(r=>add(r.kpi_staff||r.creator,r.points));gcsm.forEach(r=>add(r.creator,r.points));
  const staff=[...staffMap.values()].sort((a,b)=>b.points-a.points),top=staff[0],totalStaffPoints=staff.reduce((s,x)=>s+x.points,0);
  if(top&&staff.length>1){
    const share=totalStaffPoints?top.points/totalStaffPoints:0;
    items.push({level:'info',title:'Đóng góp nhân sự & phân bổ bán hàng',body:'Nhân sự dẫn đầu: '+top.name+' với '+mgFmt(top.points)+' điểm ('+mgPct(share)+' tổng điểm giao dịch trong bộ lọc). Có '+staff.length+' nhân sự phát sinh giao dịch.',action:'Chia sẻ cách tư vấn/chốt đơn hiệu quả của nhân sự dẫn đầu; cân bằng cơ hội bán hàng và hỗ trợ nhân sự có ít giao dịch hơn.'});
  } else if(!staff.length) {
    items.push({level:'warn',title:'Chưa có giao dịch để đánh giá nhân sự',body:'Không tìm thấy giao dịch phù hợp với bộ lọc hiện tại.',action:'Kiểm tra khoảng ngày, nhân viên đang lọc và dữ liệu Center SO / GCSM SO đã upload.'});
  }
  const products=new Map();
  [...center.map(r=>({...r,_src:'CENTER'})),...gcsm.map(r=>({...r,_src:'GCSM'}))].forEach(r=>{const name=r.model||r.product;if(!name)return;const x=products.get(name)||{name,points:0,qty:0};x.points+=Number(r.points)||0;x.qty+=Number(r.qty)||0;products.set(name,x);});
  const best=[...products.values()].sort((a,b)=>b.points-a.points)[0];
  if(best)items.push({level:'info',title:'Sản phẩm đang đóng góp tốt',body:best.name+' dẫn đầu với '+mgFmt(best.points)+' điểm, '+mgFmt(best.qty)+' sản phẩm theo bộ lọc.',action:'Kiểm tra tồn kho và duy trì tư vấn sản phẩm/model bán tốt; kết hợp bán kèm nhóm hàng đang hụt Target.'});
  const styles={high:'border-rose-200 bg-rose-50',warn:'border-amber-200 bg-amber-50',good:'border-emerald-200 bg-emerald-50',info:'border-sky-200 bg-sky-50'};
  const labels={high:'Cần ưu tiên',warn:'Cần theo dõi',good:'Tích cực',info:'Gợi ý quản lý'};
  root.innerHTML=items.map(x=>'<article class="rounded-xl border p-4 '+styles[x.level]+'"><div class="flex items-center justify-between gap-2"><h4 class="font-bold text-sm text-slate-900">'+esc(x.title)+'</h4><span class="shrink-0 text-[10px] font-bold uppercase">'+labels[x.level]+'</span></div><p class="text-xs text-slate-700 mt-2">'+esc(x.body)+'</p><p class="text-xs font-semibold text-slate-800 mt-2">Đề xuất: '+esc(x.action)+'</p></article>').join('');
}
function mgRenderAll(){if(!currentData)return;mgApplyTargets();mgPopulateStaff();mgRenderProducts();mgRenderStaff();mgRenderService();mgRenderAlerts();mgTargetEditor();}
function mgWithFilteredRecords(fn){const c=currentData.centerRecords,g=currentData.gcsmRecords;try{currentData.centerRecords=mgFiltered('CENTER');currentData.gcsmRecords=mgFiltered('GCSM');fn();}finally{currentData.centerRecords=c;currentData.gcsmRecords=g;}}
function mgRefreshFilteredViews(){if(typeof window.renderCharts==='function')window.renderCharts();if(typeof window.renderTopProducts==='function')window.renderTopProducts();if(typeof window.renderTransactionsTable==='function')window.renderTransactionsTable();}
function mgDate(v){if(v instanceof Date){const d=new Date(v.getTime()-v.getTimezoneOffset()*60000);return d.toISOString().slice(0,16).replace('T',' ');}return String(v||'').slice(0,19);}
function mgNum(v){const n=typeof v==='number'?v:parseFloat(String(v??0).replace(/,/g,''));return Number.isFinite(n)?n:0;}
function mgText(v){return v==null?'':String(v).trim();}
function mgHeaderKey(v){return String(v??'').normalize('NFD').replace(/[Đđ]/g,'d').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function mgFindHeader(sheet,src){
  const grid=XLSX.utils.sheet_to_json(sheet,{header:1,defval:null,blankrows:false});
  const sets=src==='CENTER'?[['don hang chi tiet','don hang tong','order details'],['ngay xuat ban','ngay ban','sales date'],['nguoi len don','created by','seller']]:[['sales order no','sales order number','so ban hang'],['created by','nguoi tao','seller'],['sales product name','product name','ten san pham']];
  let best=null,bestScore=0;
  for(let i=0;i<Math.min(grid.length,25);i++){const headers=(grid[i]||[]).map(mgHeaderKey);const score=sets.reduce((n,aliases)=>n+(headers.some(h=>aliases.some(a=>h===a||h.includes(a)))?1:0),0);if(score>bestScore){bestScore=score;best={row:i,headers:grid[i]||[]};}if(score===sets.length)return best;}
  return bestScore>=2?best:null;
}
const MG_RULE_ROWS=[["Find N6",9,"PHONE"],["Find X9 Ultra",9,"PHONE"],["Find X9s 12GB+256GB",7,"PHONE"],["Find X9s 12GB+512GB",7,"PHONE"],["Find X9 16GB+512GB",7,"PHONE"],["Find X9 12+256",8,"PHONE"],["Reno16 Pro 5G 12GB+256GB",7,"PHONE"],["Reno16 5G 8GB+256GB",5,"PHONE"],["Reno16 F 5G 8GB+256GB",5,"PHONE"],["Reno16 F 5G 8GB+128GB",6,"PHONE"],["Reno15 F 5G 12GB+256GB",5,"PHONE"],["Reno15 Pro 5G 12GB+256GB",8,"PHONE"],["Reno15 5G 12GB+256GB",8,"PHONE"],["Reno15 5G 8GB+256GB",8,"PHONE"],["A7 Pro 5G 8GB+256GB",6,"PHONE"],["A7 Pro 5G 8GB+128GB",6,"PHONE"],["A7 Pro 5G 6GB+256GB",6,"PHONE"],["A6 Pro 5G 12GB+256GB",3,"PHONE"],["A6 Pro 5G 8GB+256GB",3,"PHONE"],["A6 8GB+128GB",3,"PHONE"],["A6 Pro 8GB+256GB",3,"PHONE"],["A6t Pro 8GB+128GB",3,"PHONE"],["A6 Pro 8GB+128GB",2,"PHONE"],["A6x 6GB+256GB",2,"PHONE"],["A6x 4GB+128GB",2,"PHONE"],["A6x 4GB+64GB",2,"PHONE"],["A6c 4GB+128GB",2,"PHONE"],["A6c 4GB+64GB",2,"PHONE"],["A5i 4GB+64GB",2,"PHONE"],["A6t 6GB+256GB",2,"PHONE"],["A6t 4GB+128GB",2,"PHONE"],["A6t 4GB+64GB",2,"PHONE"],["Enco Buds 2",2,"TAI NGHE"],["Enco Buds 2 Pro",2,"TAI NGHE"],["Enco Buds3 Pro",2,"TAI NGHE"],["Enco Buds3",2,"TAI NGHE"],["Enco Air 3",2,"TAI NGHE"],["Enco Air 2 Pro",2,"TAI NGHE"],["Enco Air 4",3,"TAI NGHE"],["Enco Air 4 Pro",3,"TAI NGHE"],["Enco Air5",3,"TAI NGHE"],["Enco Air5s",3,"TAI NGHE"],["Enco Air 5 Pro",3,"TAI NGHE"],["Enco X3S",5,"TAI NGHE"],["Enco Clip2",5,"TAI NGHE"],["Pad Neo 6GB",2,"PAD"],["Pad Neo 8GB",2,"PAD"],["Pad SE Wifi (4-128)",4,"PAD"],["Pad SE Wifi (4-128) Mate",4,"PAD"],["Pad SE LTE (4-128)",4,"PAD"],["Pad SE LTE (8-256) Mate",4,"PAD"],["Pad 3",7,"PAD"],["Pad 5",8,"PAD"],["OPPO Watch X2",8,"WATCH"],["OPPO Watch X2 Mini",8,"WATCH"],["OPPO Watch S (OWWE262)",8,"WATCH"],["OPPO Watch X3",9,"WATCH"],["OPPO Bubble",8,null],["Miếng dán có phí",1,null],["Sạc dự phòng",2,null],["Ốp Lưng",3,"ỐP LƯNG"],["Oppo Care",4,null],["Ống kính Tele OPPO Hasselblad Earth Explorer Kit",5,null],["Find X10 Pro Max 16GB+512GB",9,"Phone"],["Find X10 Pro Max in Titanium Grey Hasselblad Teleconverter Kit",5,null]];
const MG_RULE_MAP=new Map(MG_RULE_ROWS.map(([model,points,type])=>[mgHeaderKey(model),{model,points,type}]));
function mgCenterRuleModel(product){
  const p=String(product??'').trim(),n=p.toLowerCase();
  if(!p||n.includes('túi giấy'))return '';
  if(n.includes('ốp lưng'))return 'Ốp Lưng';
  if(n.includes('sạc dự phòng'))return 'Sạc dự phòng';
  if(n.includes('cường lực'))return 'Miếng dán có phí';
  return p;
}
function mgRuleFor(model){return MG_RULE_MAP.get(mgHeaderKey(model))||null;}
function mgIsCenterSales(r){const type=String(r.export_type||'').trim().toLowerCase(),status=String(r.status||'').trim().toLowerCase();return (!type||type.includes('bán'))&&(!status||status.includes('hiệu lực'));}
function mgGet(row,headers,aliases){const normalized=headers.map(mgHeaderKey);for(const alias of aliases){const a=mgHeaderKey(alias),i=normalized.findIndex(h=>h===a||h.includes(a));if(i>=0){const key=headers[i];if(row[key]!==undefined&&row[key]!==null&&String(row[key]).trim()!=='')return row[key];}}return null;}
function mgOrderValue(row,headers,src){
  // CENTER source uses two levels: "Đơn hàng tổng" (parent order)
  // and "Đơn hàng chi tiết" (line/detail order). Prefer the detail ID,
  // then fall back to the parent ID when the detail cell is empty.
  const aliases=src==='CENTER'
    ? ['Đơn hàng chi tiết','Đơn hàng tổng','Mã đơn hàng','Mã đơn','Số đơn hàng','Số đơn','Mã giao dịch','Mã đơn bán hàng','Order No','Order number','Order ID','Order Code','Order details','Sales order']
    : ['Sales order No.','Sales order number','Sales order No','SO number','Order ID','Order Code','Mã đơn hàng','Mã đơn','Số đơn hàng','Mã giao dịch'];
  const normalized=new Map();
  for(const h of headers){
    const key=mgHeaderKey(h);
    if(key && row[h]!==undefined && row[h]!==null && String(row[h]).trim()!=='') normalized.set(key,row[h]);
  }
  // Exact normalized header lookup avoids relying on partial matches when
  // the exported Excel headers contain extra spaces or punctuation.
  for(const alias of aliases){
    const value=normalized.get(mgHeaderKey(alias));
    if(value!==undefined && String(value).trim()!=='') return value;
  }
  // Last-resort compatible header match for other CENTER/GCSM export versions.
  const candidates=headers.map(h=>({header:h,key:mgHeaderKey(h)})).filter(x=>
    !x.key.includes('ngay') &&
    (x.key.includes('don') || x.key.includes('order') || x.key.includes('giao dich')) &&
    (x.key.includes('ma') || x.key.includes('so') || x.key.includes('order'))
  );
  for(const x of candidates){
    const value=row[x.header];
    if(value!==undefined && value!==null && String(value).trim()!=='') return value;
  }
  return null;
}
function mgDateValue(v){if(v instanceof Date)return mgDate(v);if(typeof v==='number'&&v>20000&&v<80000){const d=XLSX.SSF.parse_date_code(v);if(d)return String(d.y)+'-'+String(d.m).padStart(2,'0')+'-'+String(d.d).padStart(2,'0')+' '+String(d.H||0).padStart(2,'0')+':'+String(d.M||0).padStart(2,'0');}const s=String(v??'').trim();if(!s)return '';const m=s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})(.*)$/);if(m)return m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0')+(m[4]?' '+m[4].trim():'');return s.slice(0,19);}
function mgUpload(file,src){
  if(!file)return;const status=document.getElementById(src==='CENTER'?'mgCenterStatus':'mgGcsmStatus');if(status)status.textContent='Đang đọc file '+file.name+'…';
  const rd=new FileReader();rd.onerror=()=>{const msg='Không đọc được file. Hãy thử lưu lại file dưới dạng .xlsx.';if(status)status.textContent=msg;if(typeof showToast==='function')showToast(msg,'error');};
  rd.onload=e=>{try{
    const wb=XLSX.read(new Uint8Array(e.target.result),{type:'array',cellDates:true}),token=src==='CENTER'?'center':'gcsm';
    let candidates=wb.SheetNames.filter(n=>mgHeaderKey(n).includes(token));candidates=[...candidates,...wb.SheetNames.filter(n=>!candidates.includes(n))];
    let sheetName=null,header=null;for(const n of candidates){const h=mgFindHeader(wb.Sheets[n],src);if(h){sheetName=n;header=h;break;}}
    if(!sheetName)throw Error('Không nhận diện được hàng tiêu đề. Kiểm tra file có sheet '+(src==='CENTER'?'Center SO':'GCSM SO')+' và các cột mã đơn/ngày/nhân viên/sản phẩm.');
    const headers=header.headers.map(v=>String(v??'').trim()),rawRows=XLSX.utils.sheet_to_json(wb.Sheets[sheetName],{header:1,range:header.row+1,defval:null,blankrows:false,cellDates:true}),rows=rawRows.map(cells=>{const row={};headers.forEach((h,i)=>{if(h)row[h]=cells[i]??null;});return row;}),a=[];
    if(src==='CENTER'){
      for(const row of rows){
        const order=mgOrderValue(row,headers,'CENTER');
        if(!order)continue;
        const product=mgText(mgGet(row,headers,['Tên sản phẩm','Product name']));
        const itemCode=mgText(mgGet(row,headers,['Mã hàng','Mã hàng theo màu','Product code']));
        // This export has one order-summary row followed by item-detail rows.
        // Keep item rows only to prevent duplicate order-level revenue.
        if(!product&&!itemCode)continue;
        const date=mgDateValue(mgGet(row,headers,['Ngày xuất bán','Ngày bán','Sales date','Ngày']));
        const creator=mgText(mgGet(row,headers,['Người lên đơn','Created by','Người bán']));
        const kpi=mgText(mgGet(row,headers,['Name KPI 1','KPI staff','Nhân viên KPI']));
        const ruleModel=mgCenterRuleModel(product),rule=mgRuleFor(ruleModel);
        a.push({
          order_no:mgText(mgGet(row,headers,['Đơn hàng tổng','Order No','Order number']))||mgText(order),
          shop:mgText(mgGet(row,headers,['Tên Brandshop','Brandshop'])),
          date:date.slice(0,10),time:date,
          category:mgText(mgGet(row,headers,['Danh mục','Category'])),product,
          qty:mgNum(mgGet(row,headers,['Số lượng','Quantity'])),
          retail_revenue:mgNum(mgGet(row,headers,['Doanh thu bán lẻ','Retail revenue'])),
          receivable:mgNum(mgGet(row,headers,['Phải thu khách hàng','Receivable'])),
          creator,kpi_staff:kpi||creator,
          export_type:mgText(mgGet(row,headers,['Loại xuất','Export type'])),
          status:mgText(mgGet(row,headers,['Trạng thái','Status'])),
          model:ruleModel||product,
          type:rule?.type||mgText(mgGet(row,headers,['Danh mục','Category','Type','Nhóm hàng'])),
          points:rule?Number(rule.points)||0:mgNum(mgGet(row,headers,['Điểm','Points']))
        });
      }
    }
    else{for(const row of rows){const order=mgOrderValue(row,headers,'GCSM');if(!order)continue;const date=mgDateValue(mgGet(row,headers,['Sales time','Created on','Ngày tạo','Ngày bán'])),creator=mgText(mgGet(row,headers,['Created by','Người tạo','Seller'])).split('（')[0].split('(')[0].trim(),product=mgText(mgGet(row,headers,['Sales Product Name','Product name'])),rawType=mgText(mgGet(row,headers,['Type','Product type'])),model=mgText(mgGet(row,headers,['Marketing model','Model']))||product,rule=mgRuleFor(rawType)||mgRuleFor(model)||mgRuleFor(product);a.push({order_no:mgText(order),shop:mgText(mgGet(row,headers,['Name of service center','Service center'])),status:mgText(mgGet(row,headers,['Order status','Status'])),creator,time:date,date:date.slice(0,10),payment:mgText(mgGet(row,headers,['Payment method']))||'Khác',paid_amount:mgNum(mgGet(row,headers,['Paid amount (receivable after deduction)','Paid amount','Receivable'])),retail_price:mgNum(mgGet(row,headers,['Retail price','Price'])),product,qty:mgNum(mgGet(row,headers,['Quantity','Qty'])),model,type:rule?.type||rawType||'Phụ kiện / Khác',points:rule?Number(rule.points)||0:mgNum(mgGet(row,headers,['Điểm','Points']))});}}
    if(!a.length)throw Error('Đã tìm thấy sheet "'+sheetName+'" nhưng không đọc được mã đơn. Các cột tiêu đề: '+headers.filter(Boolean).slice(0,40).join(' | ')+'. Kiểm tra cột mã đơn hoặc gửi ảnh hàng tiêu đề để bổ sung nhận diện.');
    const key=src==='CENTER'?'centerRecords':'gcsmRecords',old=currentData[key],metaKey=src==='CENTER'?'centerFileName':'gcsmFileName',oldMeta=currentData.meta[metaKey],oldUpdated=currentData.meta.uploadedAt;currentData[key]=a;currentData.meta[metaKey]=file.name;currentData.meta.uploadedAt='Cập nhật '+new Date().toLocaleString('vi-VN');
    if(!mgPersist()){currentData[key]=old;if(oldMeta===undefined)delete currentData.meta[metaKey];else currentData.meta[metaKey]=oldMeta;currentData.meta.uploadedAt=oldUpdated;throw Error('Không đủ dung lượng lưu trên trình duyệt.');}
    if(status)status.textContent='Đã nạp '+a.length+' dòng từ sheet "'+sheetName+'" • '+file.name;
    try{if(typeof renderAll==='function')renderAll();mgRenderAll();mgRefreshFilteredViews();const latest=[...currentData.centerRecords,...currentData.gcsmRecords].map(r=>String(r.date||r.time||'').slice(0,10)).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)).sort();if(latest.length)document.getElementById('mgDailyDate').value=latest[latest.length-1];}catch(renderErr){console.error('Lỗi render sau upload',renderErr);if(status)status.textContent+=' (Đã lưu; tải lại trang để cập nhật giao diện)';}
    if(typeof showToast==='function')showToast('Đã cập nhật '+(src==='CENTER'?'Center SO':'GCSM SO')+' ('+a.length+' dòng).');
  }catch(err){console.error('Upload '+src+' thất bại:',err);if(status)status.textContent='Upload thất bại: '+err.message;if(typeof showToast==='function')showToast('Lỗi upload '+src+': '+err.message,'error');else alert(err.message);}};
  rd.readAsArrayBuffer(file);
}
function mgSaveTargets(){const m=document.getElementById('mgTargetMonth').value||new Date().toISOString().slice(0,7),o={};document.querySelectorAll('[data-mg-target]').forEach(i=>o[i.dataset.mgTarget]=Math.max(0,Number(i.value)||0));mgTargets[m]=o;try{localStorage.setItem(MG_TARGET_KEY,JSON.stringify(mgTargets));}catch(e){if(typeof showToast==='function')showToast('Không lưu được Target: bộ nhớ trình duyệt đã đầy.','error');return;}mgApplyTargets();mgPersist();if(typeof renderAll==='function')renderAll();mgRenderAll();if(typeof showToast==='function')showToast('Đã lưu Target tháng '+m+'.');}
function mgResetTargets(){const m=document.getElementById('mgTargetMonth').value||new Date().toISOString().slice(0,7);delete mgTargets[m];try{localStorage.setItem(MG_TARGET_KEY,JSON.stringify(mgTargets));}catch(e){if(typeof showToast==='function')showToast('Không thể cập nhật Target.','error');return;}mgApplyTargets();mgPersist();if(typeof renderAll==='function')renderAll();mgRenderAll();if(typeof showToast==='function')showToast('Đã khôi phục Target gốc cho tháng '+m+'.');}
function mgExportDailyReport(){
  const date=document.getElementById('mgDailyDate').value;
  if(!date){if(typeof showToast==='function')showToast('Vui lòng chọn ngày cần xuất báo cáo.','error');return;}
  const center=currentData.centerRecords.filter(r=>String(r.date||r.time||'').slice(0,10)===date);
  const gcsm=currentData.gcsmRecords.filter(r=>String(r.date||r.time||'').slice(0,10)===date);
  if(!center.length&&!gcsm.length){if(typeof showToast==='function')showToast('Không có giao dịch nào trong ngày '+date+'.','error');return;}
  const centerRows=center.map(r=>({Nguon:'Center SO',Ngay:r.date||String(r.time||'').slice(0,10),Thoi_gian:r.time||'',Ma_don:r.order_no||'',San_pham:r.product||r.model||'',Nhom_hang:r.type||r.category||'',Nhan_vien:mgResolveStaff(r.kpi_staff||r.creator),So_luong:Number(r.qty)||0,Doanh_thu:Number(r.receivable||r.retail_revenue)||0,Diem:Number(r.points)||0,Loai_xuat:r.export_type||'',Trang_thai:r.status||''}));
  const gcsmRows=gcsm.map(r=>({Nguon:'GCSM SO',Ngay:r.date||String(r.time||'').slice(0,10),Thoi_gian:r.time||'',Ma_don:r.order_no||'',San_pham:r.product||r.model||'',Nhom_hang:r.type||'',Nhan_vien:mgResolveStaff(r.creator),So_luong:Number(r.qty)||0,Doanh_thu:Number(r.retail_price)||0,Diem:Number(r.points)||0,Trang_thai:r.status||''}));
  const staffMap=new Map();
  [...centerRows,...gcsmRows].forEach(r=>{const k=mgNorm(r.Nhan_vien),x=staffMap.get(k)||{Nhan_vien:r.Nhan_vien,Center_SO_Diem:0,GCSM_SO_Diem:0,Tong_diem:0,Tong_doanh_thu:0,So_luong:0,So_giao_dich:0};if(r.Nguon==='Center SO')x.Center_SO_Diem+=r.Diem;else x.GCSM_SO_Diem+=r.Diem;x.Tong_diem+=r.Diem;x.Tong_doanh_thu+=r.Doanh_thu;x.So_luong+=r.So_luong;x.So_giao_dich++;staffMap.set(k,x);});
  const sum=(rows,key)=>rows.reduce((s,r)=>s+(Number(r[key])||0),0);
  const summary=[{Ngay:date,Nguon:'Center SO',So_giao_dich:centerRows.length,So_luong:sum(centerRows,'So_luong'),Doanh_thu:sum(centerRows,'Doanh_thu'),Tong_diem:sum(centerRows,'Diem')},{Ngay:date,Nguon:'GCSM SO',So_giao_dich:gcsmRows.length,So_luong:sum(gcsmRows,'So_luong'),Doanh_thu:sum(gcsmRows,'Doanh_thu'),Tong_diem:sum(gcsmRows,'Diem')},{Ngay:date,Nguon:'TỔNG CỘNG',So_giao_dich:centerRows.length+gcsmRows.length,So_luong:sum(centerRows,'So_luong')+sum(gcsmRows,'So_luong'),Doanh_thu:sum(centerRows,'Doanh_thu')+sum(gcsmRows,'Doanh_thu'),Tong_diem:sum(centerRows,'Diem')+sum(gcsmRows,'Diem')}];
  const wb=XLSX.utils.book_new();
  const add=(name,rows)=>XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),name);
  add('Tong quan',summary);add('Center SO',centerRows);add('GCSM SO',gcsmRows);add('Nhan vien',[...staffMap.values()].sort((a,b)=>b.Tong_diem-a.Tong_diem));
  XLSX.writeFile(wb,'OPPO_Bao_Cao_Hang_Ngay_'+date+'.xlsx');
  if(typeof showToast==='function')showToast('Đã xuất báo cáo ngày '+date+'.');
}
function mgExportExcel(){
  try{
    if(!currentData)throw Error('Chưa có dữ liệu dashboard.');
    const d=currentData,cats=Array.isArray(d.categories)?d.categories:[],total=cats.find(x=>x.key==='TOTAL')||{actual:0,target:0};
    const center=mgFiltered('CENTER').filter(mgIsCenterSales);
    const gcsm=mgFiltered('GCSM'),sum=(a,k)=>a.reduce((v,r)=>v+(Number(r[k])||0),0);
    const centerRevenue=center.reduce((v,r)=>v+(Number(r.receivable)||Number(r.retail_revenue)||0),0),gcsmRevenue=sum(gcsm,'retail_price');
    const allProductivity=Array.isArray(d.productivity)?d.productivity:[],kpi=Array.isArray(d.kpiReport)?d.kpiReport:[],staffFilter=document.getElementById('dashStaff').value;const productivity=staffFilter==='ALL'?allProductivity:allProductivity.filter(x=>mgNorm(x.name)===mgNorm(staffFilter));
    const tat=d.tatKpi||{},kl=d.klDl||{},pct=v=>(Number(v||0)*100).toFixed(1)+'%';
    const from=document.getElementById('dashFrom').value,to=document.getElementById('dashTo').value,staff=document.getElementById('dashStaff').value;
    const range=from||to?(from||'đầu kỳ')+' → '+(to||'hiện tại'):'Toàn bộ thời gian trong dữ liệu';
    const lines=[
      '📊 BÁO CÁO TỔNG QUAN KPI – OPPO EXPERIENCE & SERVICE STORE TIỀN GIANG',
      '📅 Thời điểm xuất: '+new Date().toLocaleString('vi-VN'),
      '🗓️ Phạm vi giao dịch: '+range,
      '👤 Nhân viên lọc: '+(staff==='ALL'?'Tất cả nhân viên':staff),
      '📁 File KPI: '+(d.meta?.fileName||'Dashboard hiện tại'),
      '📁 File Center SO: '+(d.meta?.centerFileName||'Nguồn dữ liệu hiện tại'),
      '📁 File GCSM SO: '+(d.meta?.gcsmFileName||'Nguồn dữ liệu hiện tại'),'',
      '🎯 1. TỔNG QUAN ĐIỂM & TARGET',
      '• Tổng điểm: '+mgFmt(total.actual)+' / '+mgFmt(total.target)+' điểm'+(Number(total.target)>0?' – đạt '+pct(total.actual/total.target):''),
      ...cats.filter(x=>x.key!=='TOTAL').map(x=>'• '+x.name+': '+mgFmt(x.actual)+' / '+mgFmt(x.target)+' điểm'+(Number(x.target)>0?' – đạt '+pct(x.actual/x.target):'')),
      '',
      '💰 2. DOANH THU & GIAO DỊCH (theo bộ lọc)',
      '• Doanh thu ghi nhận: '+mgMoney(centerRevenue+gcsmRevenue),
      '• Center SO: '+center.length+' giao dịch bán hiệu lực | '+mgMoney(centerRevenue),
      '• GCSM SO: '+gcsm.length+' giao dịch | '+mgMoney(gcsmRevenue),
      '• A7 Pro: '+mgFmt(d.a7ProCount||0)+' máy (theo KPI tổng quan)',
      '',
      '📋 3. CÁC CHỈ TIÊU KPI TRÊN TỔNG QUAN'
    ];
    if(kpi.length)lines.push(...kpi.map(x=>'• '+(x.name||x.full_name||'Chỉ tiêu')+': lũy kế '+mgFmt(x.accumulated)+' / '+mgFmt(x.target)+(Number(x.target)>0?' ('+pct(x.accumulated/x.target)+')':' (chưa thiết lập target)')+' – '+(x.status||'Chưa có trạng thái')));
    else lines.push('• Chưa có bảng chỉ tiêu KPI trong dữ liệu.');
    lines.push('','🛠️ 4. NĂNG SUẤT SERVICE');
    if(productivity.length)lines.push(...productivity.map(x=>'• '+x.name+': Volume '+mgFmt(x.volume)+' | Sửa chữa '+mgFmt(x.sua_chua)+' | DV cộng thêm '+mgFmt(x.dich_vu_cong_them)+' | SO thường '+mgFmt(x.so_thuong)));
    else lines.push('• Chưa có dữ liệu năng suất Service.');
    lines.push('• Tổng Service Volume: '+mgFmt(productivity.reduce((v,x)=>v+(Number(x.volume)||0),0)),
      '','📌 5. CHỈ SỐ VẬN HÀNH',
      '• TAT-KS: '+pct(tat.tat_ks),
      '• TAT-GCSM: '+pct(tat.tat_gcsm),
      '• Tỷ lệ khách lẻ: '+pct(kl.pct_khach_le),
      '• Tỷ lệ miếng dán: '+pct(kl.ty_le_md),
      '• KL: '+mgFmt(kl.khach_le)+' | DL/KA: '+mgFmt(kl.dl_ka),
      '','Lưu ý: Điểm/Target, chỉ tiêu KPI tổng quan và các tỷ lệ vận hành là số liệu tổng quan từ file KPI; bộ lọc áp dụng cho giao dịch và danh sách năng suất nhân viên.','Nguồn: Trang Tổng quan KPI và giao dịch Center SO / GCSM SO theo bộ lọc hiện tại.');
    const report=lines.join('\n'),notify=msg=>{if(typeof showToast==='function')showToast(msg);else alert(msg);};
    const fallback=()=>{
      const wrap=document.createElement('div');wrap.id='mgCopyFallback';wrap.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:20px';
      const panel=document.createElement('div');panel.style.cssText='width:min(900px,100%);height:min(80vh,700px);background:white;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;color:#111';
      const title=document.createElement('strong');title.textContent='Báo cáo đã tạo — nhấn Ctrl+C để sao chép';
      const box=document.createElement('textarea');box.value=report;box.readOnly=true;box.style.cssText='flex:1;width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;resize:none';
      const close=document.createElement('button');close.textContent='Đóng';close.style.cssText='align-self:flex-end;background:#0f172a;color:white;padding:8px 18px;border-radius:8px';
      close.addEventListener('click',()=>wrap.remove());wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove();});wrap.addEventListener('keydown',e=>{if(e.key==='Escape')wrap.remove();});
      panel.append(title,box,close);wrap.append(panel);document.body.append(wrap);box.focus();box.select();
      try{document.execCommand('copy');}catch(e){}
    };
    if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function')navigator.clipboard.writeText(report).then(()=>notify('Đã copy báo cáo tổng quan KPI. Bro có thể dán trực tiếp vào Zalo.')).catch(fallback);else fallback();
  }catch(err){console.error('Xuất báo cáo tổng quan KPI thất bại:',err);alert('Không thể tạo báo cáo KPI: '+(err&&err.message?err.message:String(err)));}
}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('mgTargetMonth').value=new Date().toISOString().slice(0,7);const latestDates=[...(currentData.centerRecords||[]),...(currentData.gcsmRecords||[])].map(r=>String(r.date||r.time||'').slice(0,10)).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)).sort();document.getElementById('mgDailyDate').value=latestDates[latestDates.length-1]||new Date().toISOString().slice(0,10);const base=window.renderAll,baseCharts=window.renderCharts,baseProducts=window.renderTopProducts,baseTransactions=window.renderTransactionsTable;if(typeof baseCharts==='function')window.renderCharts=function(){mgWithFilteredRecords(baseCharts);};if(typeof baseProducts==='function')window.renderTopProducts=function(){mgWithFilteredRecords(baseProducts);};if(typeof baseTransactions==='function')window.renderTransactionsTable=function(){mgWithFilteredRecords(baseTransactions);};if(typeof base==='function')window.renderAll=function(){mgApplyTargets();base();mgRenderAll();};['dashFrom','dashTo','dashStaff'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{mgRenderAll();mgRefreshFilteredViews();}));document.getElementById('dashClearFilters').addEventListener('click',()=>{['dashFrom','dashTo'].forEach(id=>document.getElementById(id).value='');document.getElementById('dashStaff').value='ALL';mgRenderAll();mgRefreshFilteredViews();});document.getElementById('mgCenterFile').addEventListener('change',e=>{if(e.target.files[0])mgUpload(e.target.files[0],'CENTER');e.target.value='';});document.getElementById('mgGcsmFile').addEventListener('change',e=>{if(e.target.files[0])mgUpload(e.target.files[0],'GCSM');e.target.value='';});document.getElementById('mgTargetMonth').addEventListener('change',()=>{mgApplyTargets();mgTargetEditor();if(typeof renderAll==='function')renderAll();});document.getElementById('mgSaveTargets').addEventListener('click',mgSaveTargets);document.getElementById('mgResetTargets').addEventListener('click',mgResetTargets);document.getElementById('mgExportExcel').addEventListener('click',mgExportExcel);document.getElementById('mgExportDaily').addEventListener('click',mgExportDailyReport);mgRenderAll();});
