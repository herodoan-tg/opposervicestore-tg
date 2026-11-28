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
          model:itemCode||product,
          type:mgText(mgGet(row,headers,['Danh mục','Category','Type','Nhóm hàng'])),
          points:mgNum(mgGet(row,headers,['Total KPI','Điểm','Points']))
        });
      }
    }
    else{for(const row of rows){const order=mgOrderValue(row,headers,'GCSM');if(!order)continue;const date=mgDateValue(mgGet(row,headers,['Sales time','Created on','Ngày tạo','Ngày bán'])),creator=mgText(mgGet(row,headers,['Created by','Người tạo','Seller'])).split('（')[0].split('(')[0].trim();a.push({order_no:mgText(order),shop:mgText(mgGet(row,headers,['Name of service center','Service center'])),status:mgText(mgGet(row,headers,['Order status','Status'])),creator,time:date,date:date.slice(0,10),payment:mgText(mgGet(row,headers,['Payment method']))||'Khác',paid_amount:mgNum(mgGet(row,headers,['Paid amount (receivable after deduction)','Paid amount','Receivable'])),retail_price:mgNum(mgGet(row,headers,['Retail price','Price'])),product:mgText(mgGet(row,headers,['Sales Product Name','Product name'])),qty:mgNum(mgGet(row,headers,['Quantity','Qty'])),model:mgText(mgGet(row,headers,['Marketing model','Model'])),type:mgText(mgGet(row,headers,['Type','Product type']))||'Phụ kiện / Khác',points:mgNum(mgGet(row,headers,['Điểm','Points']))});}}
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
    const center=mgFiltered('CENTER').filter(r=>String(r.export_type||'').toLowerCase().includes('bán')&&String(r.status||'').toLowerCase().includes('hiệu lực'));
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
