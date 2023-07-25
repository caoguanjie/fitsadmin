import{aj as e,P as l,q as a,x as t,ak as o,r as u,p as r,Z as d,$ as s,o as n,al as i,j as f,T as v}from"./index-9d7a3178.js";import{E as c,a as m,J as p,d as b,c as y,l as w,m as _,O as g,R as k,V as h,p as V,W as D,S as K,u as P,P as C,a7 as j,aC as F,aD as q,as as U,_ as T,L as x,a0 as R}from"./vxetable-f32c91e3.js";import{u as I}from"./FitsTableProHook-9f0c18e6.js";import{F as S}from"./FitsCard-f7e3b57a.js";import"./echarts-1215139a.js";const Y=e=>(F("data-v-c5204399"),e=e(),q(),e),H=Y((()=>V("i",{class:"vxe-icon-add"},null,-1))),O=Y((()=>V("span",{class:"redStar"},"*",-1))),B=Y((()=>V("i",{class:"vxe-icon-delete"},null,-1))),E={class:"dataBox"},M=f(c({__name:"DynamicTable",setup(f){const v=m(),c=m([]),F=m({}),q=m(),U=m(),T=m(),{fitsTablePro:x}=I({keepSource:!0,columns:[{field:"add",title:"操作",width:80,slots:{default:"addDefault"}},{field:"project",title:"项目",slots:{default:"projectDefault",header:"requiredHeader"}},{field:"batch",title:"批次/迭代",slots:{default:"batchDefault",header:"requiredHeader"}},{field:"type",title:"工时类型",slots:{default:"typeDefault"}},{field:"task",title:"任务内容",slots:{default:"taskDefault",header:"requiredHeader"}},{field:"responsible",title:"责任人",slots:{default:"responsibleDefault",header:"requiredHeader"}},{field:"reviewer",title:"工时审核人",slots:{default:"reviewerDefault"}},{field:"startdate",title:"计划开始",slots:{default:"startdateDefault"}},{field:"enddate",title:"计划完成",slots:{default:"enddateDefault"}},{field:"delete",title:"操作",width:80,slots:{default:"deleteDefault"}}],data:[{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""}],align:"center",toolbarConfig:{slots:{buttons:"buttons"}},rowConfig:{keyField:"rowKey",useKey:!0},columnConfig:{useKey:!0}},T),R=m([{value:"丰德开发框架项目"},{value:"2019年领床路径系统二期产品"},{value:"2019年领床路径系统一期产品"},{value:"开发组"},{value:"2022年特种机电设备检测"},{value:"健康档案系统"},{value:"2021年资产管理系统"},{value:"2023Vue升级"}]),S=(e,l)=>{l(e?R.value.filter((l=>-1!==l.value.toLowerCase().indexOf(e))):R.value)},Y=m([{label:".net core开原框架研究",value:"0"},{label:"Fits Framework",value:"1"},{label:"PC后台管理网站",value:"2"},{label:"混合app-ionic5",value:"3"},{label:"辅助工具",value:"4"},{label:"新PC前端框架研发",value:"5"}]),M=m([{label:"项目管理",value:"0"},{label:"售前支持",value:"1"},{label:"需求分析",value:"2"},{label:"系统设计",value:"3"},{label:"功能开发",value:"4"}]),N=m([{label:"李小白",value:"0"},{label:"王辉",value:"1"},{label:"张冰冰",value:"2"},{label:"李萌萌",value:"3"},{label:"白静",value:"4"}]),$=p({project:[{required:!0,message:"请选择项目",trigger:"change"}],task:[{required:!0,message:"请输入任务内容",trigger:"change"}],batch:[{required:!0,message:"请选择批次",trigger:"change"}],responsible:[{required:!0,message:"请选择责任人",trigger:"change"}],startdate:[{validator:G,type:"date",trigger:"change"}],enddate:[{validator:G,type:"date",trigger:"change"}]});function L(){T.value.fitsTablePro.insertAt({project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},-1),c.value=T.value.fitsTablePro.getTableData().tableData}function A(e,l){q.value=e.rowKey;const a="dateFormRef_"+e.rowKey+l.id;if(U.value=a,void 0===F.value[e.rowKey]?F.value[e.rowKey]={[l.field]:e[l.field]}:F.value[e.rowKey][l.field]=e[l.field],F.value[e.rowKey]&&void 0!==F.value[e.rowKey].startdate&&void 0!==F.value[e.rowKey].enddate){const t=a.split("_"),o="startdate"===l.field?Number(t.slice(-1))+1:Number(t.slice(-1))-1,u=`dateFormRef_${e.rowKey}col_${o}`;v.value.refs[u].validate()}}function G(l,a,t,o,u){if(F.value[q.value]&&a)if(F.value[q.value]&&F.value[q.value].startdate&&F.value[q.value].enddate)if(e(F.value[q.value].startdate).isBefore(F.value[q.value].enddate))t();else{const e="startdate"===l.field?"不得大于结束时间":"不得小于开始时间";t(new Error(e))}else t();else t()}function J(){c.value=T.value.fitsTablePro.getTableData().tableData}function W(){let e=0,l=0,t=0,o=0;for(let a in v.value.refs)-1!==a.indexOf("requiredFormRef_")&&null!==v.value.refs[a]&&l++,-1!==a.indexOf("dateFormRef_")&&null!==v.value.refs[a]&&o++;for(let u in v.value.refs)-1!==u.indexOf("requiredFormRef_")&&null!==v.value.refs[u]&&v.value.refs[u].validate(((l,a)=>{l&&e++})),-1!==u.indexOf("dateFormRef_")&&null!==v.value.refs[u]&&v.value.refs[u].validate(((u,r)=>{u&&(t++,e===l&&t===o&&a({message:"保存成功",type:"success"}))}))}return b((()=>{v.value=y()})),(e,a)=>{const f=t,v=o,m=u,p=r,b=d,y=s,F=n,q=i;return w(),_(C,null,[g(P(l),{option:P(x),ref_key:"xGrid",ref:T},{buttons:k((()=>[g(f,{onClick:J},{default:k((()=>[h(" 获取数据 ")])),_:1}),g(f,{onClick:W},{default:k((()=>[h(" 保存 ")])),_:1})])),addDefault:k((()=>[g(f,{onClick:L},{default:k((()=>[H])),_:1})])),requiredHeader:k((({slotProps:{column:e}})=>[O,V("span",null,D(e.title),1)])),projectDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"project"},{default:k((()=>[g(v,{modelValue:e.project,"onUpdate:modelValue":l=>e.project=l,placeholder:"请输入","fetch-suggestions":S,clearable:""},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),batchDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"batch"},{default:k((()=>[g(y,{modelValue:e.batch,"onUpdate:modelValue":l=>e.batch=l},{default:k((()=>[(w(!0),_(C,null,j(P(Y),(e=>(w(),K(b,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),typeDefault:k((({slotProps:{row:e}})=>[g(m,null,{default:k((()=>[g(y,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l},{default:k((()=>[(w(!0),_(C,null,j(P(M),(e=>(w(),K(b,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),taskDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"task"},{default:k((()=>[g(F,{modelValue:e.task,"onUpdate:modelValue":l=>e.task=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),responsibleDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"responsible"},{default:k((()=>[g(y,{modelValue:e.responsible,"onUpdate:modelValue":l=>e.responsible=l},{default:k((()=>[(w(!0),_(C,null,j(P(N),(e=>(w(),K(b,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),reviewerDefault:k((({slotProps:{row:e}})=>[g(m,null,{default:k((()=>[g(y,{modelValue:e.reviewer,"onUpdate:modelValue":l=>e.reviewer=l},{default:k((()=>[(w(!0),_(C,null,j(P(N),(e=>(w(),K(b,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),startdateDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"dateFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"startdate"},{default:k((()=>[g(q,{modelValue:e.startdate,"onUpdate:modelValue":l=>e.startdate=l,"value-format":"YYYY-MM-DD",onChange:a=>A(e,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),enddateDefault:k((({slotProps:{row:e,column:l}})=>[(w(),K(p,{ref:"dateFormRef_"+e.rowKey+l.id,model:e,rules:P($),key:e.rowKey},{default:k((()=>[g(m,{prop:"enddate"},{default:k((()=>[g(q,{modelValue:e.enddate,"onUpdate:modelValue":l=>e.enddate=l,"value-format":"YYYY-MM-DD",onChange:a=>A(e,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),deleteDefault:k((({slotProps:{row:e}})=>[g(f,{onClick:l=>function(e){T.value.fitsTablePro.remove(e),c.value=T.value.fitsTablePro.getTableData().tableData}(e)},{default:k((()=>[B])),_:2},1032,["onClick"])])),_:1},8,["option"]),V("div",E," 表格数据： "+D(P(c)),1)],64)}}}),[["__scopeId","data-v-c5204399"]]),N={class:"dynamic-table"},$={class:"content"},L={class:"right"},A={class:"menu"},G=(e=>(F("data-v-7fcb825c"),e=e(),q(),e))((()=>V("div",{class:"menu-title"},"此页内容",-1))),J=["id","onClick"],W=c({name:"DynamicTable"}),Z=f(c({...W,setup(e){const l=m([]),a=p({num:0});let t=0;const o={callback:function(e){l.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const u=e=>{if(null!==t)r(t);else if(null===t)for(let t=0;t<l.value.length;t++){let o=document.getElementById("menuItem"+t);l.value[t].pos.top<=e.scrollTop+l.value[0].pos.top&&o&&(a.num=t)}},r=e=>{for(let a=0;a<l.value.length;a++){let l=document.getElementById("menuItem"+a);e!==a&&l&&(l.className="defaultStyle")}setTimeout((()=>{t=null}),100)};return(e,d)=>{const s=v,n=U("outline");return w(),_("div",N,[g(s,{class:"left",onScroll:u,always:""},{default:k((()=>[T((w(),_("div",$,[g(S,{title:"动态表格",desc:"动态表格展示了表单＋表格的结合使用。\n                表格内部的渲染器主要是通过表格插槽实现的。"},{default:k((()=>[g(M)])),_:1})])),[[n,o]])])),_:1}),V("div",L,[V("div",A,[G,(w(!0),_(C,null,j(P(l),((e,l)=>(w(),_("div",{class:x([{active:P(a).num===l},"defaultStyle"]),key:l,id:"menuItem"+l,onClick:R((o=>function(e,l){t=l,a.num=l,e.scrollIntoView({block:"start",inline:"nearest"}),r(t)}(e.el,l)),["stop"])},D(e.title),11,J)))),128))])])])}}}),[["__scopeId","data-v-7fcb825c"]]);export{Z as default};
