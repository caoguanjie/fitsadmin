import{J as e,b as o,aF as r,n as t}from"./vxetable-f32c91e3.js";import{bp as l,bq as s,br as n,bs as a,bt as i}from"./index-5ebca8e7.js";const u=(u,m)=>{const c={id:u.id??"FitsTable",keepSource:!1,rowConfig:{height:40},exportConfig:{},storage:{enabled:!1,key:"",dataBase:"",dataSheet:"FitsTableComponent"},formConfig:r.isPlainObject(u.formConfig)?{items:[],titleAlign:"right",titleWidth:"100px",titleOverflow:!0}:null,pagerConfig:r.isPlainObject(u.pagerConfig)?{layouts:["Total","Sizes","PrevJump","PrevPage","Number","NextPage","NextJump","FullJump"],pageSizes:[10,15,20,50,100],background:!0}:{enabled:!1},columns:[],toolbarConfig:{zoom:!1,export:!1,custom:!1}},d=r.merge(c,u),f=[],{store:v}=(t=>{const i=e(t.store),{log:u}=a();if(t.enabled){const e=new l({name:t.dataBase??"FitsAdmin",storeName:t.dataSheet??"UserHabits",driverOrder:[s.IndexedDB,s.LocalStorage]});(async()=>{await e.create();const[o,l]=await n(e.get(t.key));if(o)throw new Error(`获取数据失败, 失败原因：${o}`);const s=r.toStringJSON(l)??null;null!==s&&r.merge(i,s)})(),o((()=>i),(async o=>{const[l]=await n(e.set(t.key,r.toJSONString(o)));if(l)throw new Error(`保存数据失败, 失败原因：${l}`);u.success("FitsTable组件数据变化",o)}),{deep:!0})}return{store:i}})({...d.storage,store:{isShowSearchForm:!0,customQueryArray:[],customColumnArray:[]}});!function(){var e;const o={search:{toolRender:{name:"FitsToolbarSearch",events:{click:()=>{v.isShowSearchForm=!v.isShowSearchForm}}}},query:{toolRender:{name:"FitsToolbarSetting",events:{get:()=>v.customQueryArray,setCustomQuerySelected:e=>{var o,t;const l=null==(o=m.value)?void 0:o.fitsTablePro.getProxyInfo();r.merge(null==l?void 0:l.form,e.form),null==(t=m.value)||t.fitsTablePro.commitProxy("query")},setCustomQueryData:e=>{v.customQueryArray=[...e]},changFromItemStatus:e=>{var o,r,t,l;(null==(r=null==(o=m.value)?void 0:o.fitsTablePro.props.formConfig)?void 0:r.items).find((o=>o.field===e.field&&(o.visible=e.visible))),null==(l=m.value)||l.handleFormItemNumber(null==(t=m.value)?void 0:t.$el.clientWidth)}}}},refresh:{toolRender:{name:"FitsToolbarRefresh",events:{click:()=>{var e;null==(e=m.value)||e.fitsTablePro.commitProxy("query")}}}},export:{toolRender:{name:"FitsToolbarExport",events:{click:()=>{var e;null==(e=m.value)||e.fitsTablePro.openExport()}}}},fullscreen:{toolRender:{name:"FitsToolbarFullscreen",props:{isShowSearchForm:v.isShowSearchForm},events:{get:()=>v.isShowSearchForm}}},custom:{toolRender:{name:"FitsToolbarCustomColumn",events:{geCustomColumnData:()=>r.clone(v.customColumnArray,!0),setCustomColumnData:e=>{v.customColumnArray=r.clone(e,!0)}}}}},t=null==(e=d.toolbarConfig)?void 0:e.tools;r.isPlainObject(t)&&(!1!==t.enabled&&(!1!==(null==t?void 0:t.search)&&(null==d?void 0:d.formConfig)&&f.push(o.search),!1!==(null==t?void 0:t.query)&&(null==d?void 0:d.formConfig)&&f.push(o.query),!1!==(null==t?void 0:t.refresh)&&(null==d?void 0:d.proxyConfig)&&f.push(o.refresh),!1!==(null==t?void 0:t.export)&&f.push(o.export),!1!==(null==t?void 0:t.fullscreen)&&f.push(o.fullscreen),!1!==(null==t?void 0:t.custom)&&f.push(o.custom)),d.toolbarConfig.tools=f)}(),function(){var e,o,r;if(null==(e=d.formConfig)?void 0:e.items.length){const e={align:"center",className:"searchBtns",collapseNode:!0,itemRender:{name:"$buttons",children:[{props:{type:"submit",content:"搜索",icon:"vxe-icon-search",status:"primary"}},{props:{type:"reset",content:"重置",icon:"vxe-icon-repeat"}}]}};null==(r=null==(o=d.formConfig)?void 0:o.items)||r.push(e)}}();const p=e(d);o((()=>v.isShowSearchForm),(e=>{t((()=>{var o;m.value.fitsTablePro.$el.querySelector(".vxe-grid--form-wrapper").style.display=e?"block":"none",i.emit("IsShowSearchForm",e),document.body.querySelector(".is--maximize")&&(null==(o=m.value)||o.fitsTablePro.reloadColumn(p.columns))}))}));const h=o((()=>v.customColumnArray),(()=>{t((()=>{var e;null==(e=m.value)||e.fitsTablePro.reloadColumn(v.customColumnArray),h()}))}),{deep:!0});return{fitsTablePro:p}};export{u};
