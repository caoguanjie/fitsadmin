import{b as e,a1 as l,af as a,ag as t,ah as o,ai as u,aj as s,ak as r,d as n,al as d,am as i,P as f,E as v,an as c,o as p,y as m,_ as b,ao as g,w as y,ap as h,N as w,q as _,x as k,r as V,p as D,X as x,Y as K,j as F}from"./index-30624987.js";import{N as C,i as S,h as $,E as P,Z as j,a as T,e as U,d as q,l as R,S as I,R as A,p as B,L as E,u as H,U as N,O,m as Y,P as M,aj as W,F as L,V as z,W as G,G as J,an as X,a0 as Z,ad as Q,n as ee,f as le,J as ae,c as te,az as oe,aA as ue,am as se,_ as re}from"./vxetable-22d32819.js";import{E as ne}from"./el-date-picker-38c4af63.js";import{u as de}from"./FitsTableProHook-2b21cdbf.js";import{F as ie}from"./FitsCard-4fe7e085.js";import"./echarts-1215139a.js";import"./index-6ab97b79.js";const fe=e({valueKey:{type:String,default:"value"},modelValue:{type:[String,Number],default:""},debounce:{type:Number,default:300},placement:{type:l(String),values:["top","top-start","top-end","bottom","bottom-start","bottom-end"],default:"bottom-start"},fetchSuggestions:{type:l([Function,Array]),default:C},popperClass:{type:String,default:""},triggerOnFocus:{type:Boolean,default:!0},selectWhenUnmatched:{type:Boolean,default:!1},hideLoading:{type:Boolean,default:!1},label:{type:String},teleported:a.teleported,highlightFirstItem:{type:Boolean,default:!1},fitInputWidth:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},name:String}),ve={[t]:e=>S(e),[o]:e=>S(e),[u]:e=>S(e),focus:e=>e instanceof FocusEvent,blur:e=>e instanceof FocusEvent,clear:()=>!0,select:e=>$(e)},ce=["aria-expanded","aria-owns"],pe={key:0},me=["id","aria-selected","onClick"],be="ElAutocomplete",ge=P({name:be,inheritAttrs:!1});const ye=y(b(P({...ge,props:fe,emits:ve,setup(e,{expose:l,emit:a}){const b=e,y=s(),h=j(),w=r(),_=n("autocomplete"),k=T(),V=T(),D=T(),x=T();let K=!1,F=!1;const C=T([]),S=T(-1),$=T(""),P=T(!1),ae=T(!1),te=T(!1),oe=U((()=>_.b(String(Math.floor(1e4*Math.random()))))),ue=U((()=>h.style)),se=U((()=>(C.value.length>0||te.value)&&P.value)),re=U((()=>!b.hideLoading&&te.value)),ne=U((()=>k.value?Array.from(k.value.$el.querySelectorAll("input")):[])),de=async()=>{await ee(),se.value&&($.value=`${k.value.$el.offsetWidth}px`)},ie=()=>{S.value=-1},fe=d((async e=>{if(ae.value)return;const l=e=>{te.value=!1,ae.value||(le(e)?(C.value=e,S.value=b.highlightFirstItem?0:-1):g(be,"autocomplete suggestions must be an array"))};if(te.value=!0,le(b.fetchSuggestions))l(b.fetchSuggestions);else{const a=await b.fetchSuggestions(e,l);le(a)&&l(a)}}),b.debounce),ve=e=>{const l=!!e;if(a(o,e),a(t,e),ae.value=!1,P.value||(P.value=l),!b.triggerOnFocus&&!e)return ae.value=!0,void(C.value=[]);fe(e)},ge=e=>{var l;w.value||("INPUT"!==(null==(l=e.target)?void 0:l.tagName)||ne.value.includes(document.activeElement))&&(P.value=!0)},ye=e=>{a(u,e)},he=e=>{F?F=!1:(P.value=!0,a("focus",e),b.triggerOnFocus&&!K&&fe(String(b.modelValue)))},we=e=>{setTimeout((()=>{var l;(null==(l=D.value)?void 0:l.isFocusInsideContent())?F=!0:(P.value&&De(),a("blur",e))}))},_e=()=>{P.value=!1,a(t,""),a("clear")},ke=async()=>{se.value&&S.value>=0&&S.value<C.value.length?xe(C.value[S.value]):b.selectWhenUnmatched&&(a("select",{value:b.modelValue}),C.value=[],S.value=-1)},Ve=e=>{se.value&&(e.preventDefault(),e.stopPropagation(),De())},De=()=>{P.value=!1},xe=async e=>{a(o,e[b.valueKey]),a(t,e[b.valueKey]),a("select",e),C.value=[],S.value=-1},Ke=e=>{if(!se.value||te.value)return;if(e<0)return void(S.value=-1);e>=C.value.length&&(e=C.value.length-1);const l=V.value.querySelector(`.${_.be("suggestion","wrap")}`),a=l.querySelectorAll(`.${_.be("suggestion","list")} li`)[e],t=l.scrollTop,{offsetTop:o,scrollHeight:u}=a;o+u>t+l.clientHeight&&(l.scrollTop+=u),o<t&&(l.scrollTop-=u),S.value=e,k.value.ref.setAttribute("aria-activedescendant",`${oe.value}-item-${S.value}`)};return i(x,(()=>{se.value&&De()})),q((()=>{k.value.ref.setAttribute("role","textbox"),k.value.ref.setAttribute("aria-autocomplete","list"),k.value.ref.setAttribute("aria-controls","id"),k.value.ref.setAttribute("aria-activedescendant",`${oe.value}-item-${S.value}`),K=k.value.ref.hasAttribute("readonly")})),l({highlightedIndex:S,activated:P,loading:te,inputRef:k,popperRef:D,suggestions:C,handleSelect:xe,handleKeyEnter:ke,focus:()=>{var e;null==(e=k.value)||e.focus()},blur:()=>{var e;null==(e=k.value)||e.blur()},close:De,highlight:Ke}),(e,l)=>(R(),I(H(m),{ref_key:"popperRef",ref:D,visible:H(se),placement:e.placement,"fallback-placements":["bottom-start","top-start"],"popper-class":[H(_).e("popper"),e.popperClass],teleported:e.teleported,"gpu-acceleration":!1,pure:"","manual-mode":"",effect:"light",trigger:"click",transition:`${H(_).namespace.value}-zoom-in-top`,persistent:"",onBeforeShow:de,onHide:ie},{content:A((()=>[B("div",{ref_key:"regionRef",ref:V,class:E([H(_).b("suggestion"),H(_).is("loading",H(re))]),style:N({[e.fitInputWidth?"width":"minWidth"]:$.value,outline:"none"}),role:"region"},[O(H(f),{id:H(oe),tag:"ul","wrap-class":H(_).be("suggestion","wrap"),"view-class":H(_).be("suggestion","list"),role:"listbox"},{default:A((()=>[H(re)?(R(),Y("li",pe,[O(H(v),{class:E(H(_).is("loading"))},{default:A((()=>[O(H(c))])),_:1},8,["class"])])):(R(!0),Y(M,{key:1},W(C.value,((l,a)=>(R(),Y("li",{id:`${H(oe)}-item-${a}`,key:a,class:E({highlighted:S.value===a}),role:"option","aria-selected":S.value===a,onClick:e=>xe(l)},[L(e.$slots,"default",{item:l},(()=>[z(G(l[e.valueKey]),1)]))],10,me)))),128))])),_:3},8,["id","wrap-class","view-class"])],6)])),default:A((()=>[B("div",{ref_key:"listboxRef",ref:x,class:E([H(_).b(),e.$attrs.class]),style:N(H(ue)),role:"combobox","aria-haspopup":"listbox","aria-expanded":H(se),"aria-owns":H(oe)},[O(H(p),J({ref_key:"inputRef",ref:k},H(y),{clearable:e.clearable,disabled:H(w),name:e.name,"model-value":e.modelValue,onInput:ve,onChange:ye,onFocus:he,onBlur:we,onClear:_e,onKeydown:[l[0]||(l[0]=X(Z((e=>Ke(S.value-1)),["prevent"]),["up"])),l[1]||(l[1]=X(Z((e=>Ke(S.value+1)),["prevent"]),["down"])),X(ke,["enter"]),X(De,["tab"]),X(Ve,["esc"])],onMousedown:ge}),Q({_:2},[e.$slots.prepend?{name:"prepend",fn:A((()=>[L(e.$slots,"prepend")]))}:void 0,e.$slots.append?{name:"append",fn:A((()=>[L(e.$slots,"append")]))}:void 0,e.$slots.prefix?{name:"prefix",fn:A((()=>[L(e.$slots,"prefix")]))}:void 0,e.$slots.suffix?{name:"suffix",fn:A((()=>[L(e.$slots,"suffix")]))}:void 0]),1040,["clearable","disabled","name","model-value","onKeydown"])],14,ce)])),_:3},8,["visible","placement","popper-class","teleported","transition"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/autocomplete/src/autocomplete.vue"]])),he=e=>(oe("data-v-c5204399"),e=e(),ue(),e),we=he((()=>B("i",{class:"vxe-icon-add"},null,-1))),_e=he((()=>B("span",{class:"redStar"},"*",-1))),ke=he((()=>B("i",{class:"vxe-icon-delete"},null,-1))),Ve={class:"dataBox"},De=F(P({__name:"DynamicTable",setup(e){const l=T(),a=T([]),t=T({}),o=T(),u=T(),s=T(),{fitsTablePro:r}=de({keepSource:!0,columns:[{field:"add",title:"操作",width:80,slots:{default:"addDefault"}},{field:"project",title:"项目",slots:{default:"projectDefault",header:"requiredHeader"}},{field:"batch",title:"批次/迭代",slots:{default:"batchDefault",header:"requiredHeader"}},{field:"type",title:"工时类型",slots:{default:"typeDefault"}},{field:"task",title:"任务内容",slots:{default:"taskDefault",header:"requiredHeader"}},{field:"responsible",title:"责任人",slots:{default:"responsibleDefault",header:"requiredHeader"}},{field:"reviewer",title:"工时审核人",slots:{default:"reviewerDefault"}},{field:"startdate",title:"计划开始",slots:{default:"startdateDefault"}},{field:"enddate",title:"计划完成",slots:{default:"enddateDefault"}},{field:"delete",title:"操作",width:80,slots:{default:"deleteDefault"}}],data:[{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},{project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""}],align:"center",toolbarConfig:{slots:{buttons:"buttons"}},rowConfig:{keyField:"rowKey",useKey:!0},columnConfig:{useKey:!0}},s),n=T([{value:"丰德开发框架项目"},{value:"2019年领床路径系统二期产品"},{value:"2019年领床路径系统一期产品"},{value:"开发组"},{value:"2022年特种机电设备检测"},{value:"健康档案系统"},{value:"2021年资产管理系统"},{value:"2023Vue升级"}]),d=(e,l)=>{l(e?n.value.filter((l=>-1!==l.value.toLowerCase().indexOf(e))):n.value)},i=T([{label:".net core开原框架研究",value:"0"},{label:"Fits Framework",value:"1"},{label:"PC后台管理网站",value:"2"},{label:"混合app-ionic5",value:"3"},{label:"辅助工具",value:"4"},{label:"新PC前端框架研发",value:"5"}]),f=T([{label:"项目管理",value:"0"},{label:"售前支持",value:"1"},{label:"需求分析",value:"2"},{label:"系统设计",value:"3"},{label:"功能开发",value:"4"}]),v=T([{label:"李小白",value:"0"},{label:"王辉",value:"1"},{label:"张冰冰",value:"2"},{label:"李萌萌",value:"3"},{label:"白静",value:"4"}]),c=ae({project:[{required:!0,message:"请选择项目",trigger:"change"}],task:[{required:!0,message:"请输入任务内容",trigger:"change"}],batch:[{required:!0,message:"请选择批次",trigger:"change"}],responsible:[{required:!0,message:"请选择责任人",trigger:"change"}],startdate:[{validator:g,type:"date",trigger:"change"}],enddate:[{validator:g,type:"date",trigger:"change"}]});function m(){s.value.fitsTablePro.insertAt({project:"",batch:"",type:"",task:"",responsible:"",reviewer:"",startdate:"",enddate:""},-1),a.value=s.value.fitsTablePro.getTableData().tableData}function b(e,a){o.value=e.rowKey;const s="dateFormRef_"+e.rowKey+a.id;if(u.value=s,void 0===t.value[e.rowKey]?t.value[e.rowKey]={[a.field]:e[a.field]}:t.value[e.rowKey][a.field]=e[a.field],t.value[e.rowKey]&&void 0!==t.value[e.rowKey].startdate&&void 0!==t.value[e.rowKey].enddate){const t=s.split("_"),o="startdate"===a.field?Number(t.slice(-1))+1:Number(t.slice(-1))-1,u=`dateFormRef_${e.rowKey}col_${o}`;l.value.refs[u].validate()}}function g(e,l,a,u,s){if(t.value[o.value]&&l)if(t.value[o.value]&&t.value[o.value].startdate&&t.value[o.value].enddate)if(h(t.value[o.value].startdate).isBefore(t.value[o.value].enddate))a();else{const l="startdate"===e.field?"不得大于结束时间":"不得小于开始时间";a(new Error(l))}else a();else a()}function y(){a.value=s.value.fitsTablePro.getTableData().tableData}function F(){let e=0,a=0,t=0,o=0;for(let u in l.value.refs)-1!==u.indexOf("requiredFormRef_")&&null!==l.value.refs[u]&&a++,-1!==u.indexOf("dateFormRef_")&&null!==l.value.refs[u]&&o++;for(let u in l.value.refs)-1!==u.indexOf("requiredFormRef_")&&null!==l.value.refs[u]&&l.value.refs[u].validate(((l,a)=>{l&&e++})),-1!==u.indexOf("dateFormRef_")&&null!==l.value.refs[u]&&l.value.refs[u].validate(((l,u)=>{l&&(t++,e===a&&t===o&&_({message:"保存成功",type:"success"}))}))}return q((()=>{l.value=te()})),(e,l)=>{const t=k,o=ye,u=V,n=D,g=x,h=K,_=p,C=ne;return R(),Y(M,null,[O(H(w),{option:H(r),ref_key:"xGrid",ref:s},{buttons:A((()=>[O(t,{onClick:y},{default:A((()=>[z(" 获取数据 ")])),_:1}),O(t,{onClick:F},{default:A((()=>[z(" 保存 ")])),_:1})])),addDefault:A((()=>[O(t,{onClick:m},{default:A((()=>[we])),_:1})])),requiredHeader:A((({slotProps:{column:e}})=>[_e,B("span",null,G(e.title),1)])),projectDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"project"},{default:A((()=>[O(o,{modelValue:e.project,"onUpdate:modelValue":l=>e.project=l,placeholder:"请输入","fetch-suggestions":d,clearable:""},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),batchDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"batch"},{default:A((()=>[O(h,{modelValue:e.batch,"onUpdate:modelValue":l=>e.batch=l},{default:A((()=>[(R(!0),Y(M,null,W(H(i),(e=>(R(),I(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),typeDefault:A((({slotProps:{row:e}})=>[O(u,null,{default:A((()=>[O(h,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l},{default:A((()=>[(R(!0),Y(M,null,W(H(f),(e=>(R(),I(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),taskDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"task"},{default:A((()=>[O(_,{modelValue:e.task,"onUpdate:modelValue":l=>e.task=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),responsibleDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"requiredFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"responsible"},{default:A((()=>[O(h,{modelValue:e.responsible,"onUpdate:modelValue":l=>e.responsible=l},{default:A((()=>[(R(!0),Y(M,null,W(H(v),(e=>(R(),I(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),reviewerDefault:A((({slotProps:{row:e}})=>[O(u,null,{default:A((()=>[O(h,{modelValue:e.reviewer,"onUpdate:modelValue":l=>e.reviewer=l},{default:A((()=>[(R(!0),Y(M,null,W(H(v),(e=>(R(),I(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),startdateDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"dateFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"startdate"},{default:A((()=>[O(C,{modelValue:e.startdate,"onUpdate:modelValue":l=>e.startdate=l,"value-format":"YYYY-MM-DD",onChange:a=>b(e,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),enddateDefault:A((({slotProps:{row:e,column:l}})=>[(R(),I(n,{ref:"dateFormRef_"+e.rowKey+l.id,model:e,rules:H(c),key:e.rowKey},{default:A((()=>[O(u,{prop:"enddate"},{default:A((()=>[O(C,{modelValue:e.enddate,"onUpdate:modelValue":l=>e.enddate=l,"value-format":"YYYY-MM-DD",onChange:a=>b(e,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)])),_:2},1032,["model","rules"]))])),deleteDefault:A((({slotProps:{row:e}})=>[O(t,{onClick:l=>function(e){s.value.fitsTablePro.remove(e),a.value=s.value.fitsTablePro.getTableData().tableData}(e)},{default:A((()=>[ke])),_:2},1032,["onClick"])])),_:1},8,["option"]),B("div",Ve," 表格数据： "+G(H(a)),1)],64)}}}),[["__scopeId","data-v-c5204399"]]),xe={class:"dynamic-table"},Ke={class:"content"},Fe={class:"right"},Ce={class:"menu"},Se=(e=>(oe("data-v-7fcb825c"),e=e(),ue(),e))((()=>B("div",{class:"menu-title"},"此页内容",-1))),$e=["id","onClick"],Pe=P({name:"DynamicTable"}),je=F(P({...Pe,setup(e){const l=T([]),a=ae({num:0});let t=0;const o={callback:function(e){l.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const u=e=>{if(null!==t)s(t);else if(null===t)for(let t=0;t<l.value.length;t++){let o=document.getElementById("menuItem"+t);l.value[t].pos.top<=e.scrollTop+l.value[0].pos.top&&o&&(a.num=t)}},s=e=>{for(let a=0;a<l.value.length;a++){let l=document.getElementById("menuItem"+a);e!==a&&l&&(l.className="defaultStyle")}setTimeout((()=>{t=null}),100)};return(e,r)=>{const n=f,d=se("outline");return R(),Y("div",xe,[O(n,{class:"left",onScroll:u,always:""},{default:A((()=>[re((R(),Y("div",Ke,[O(ie,{title:"动态表格",desc:"动态表格展示了表单＋表格的结合使用。\n                表格内部的渲染器主要是通过表格插槽实现的。"},{default:A((()=>[O(De)])),_:1})])),[[d,o]])])),_:1}),B("div",Fe,[B("div",Ce,[Se,(R(!0),Y(M,null,W(H(l),((e,l)=>(R(),Y("div",{class:E([{active:H(a).num===l},"defaultStyle"]),key:l,id:"menuItem"+l,onClick:Z((o=>function(e,l){t=l,a.num=l,e.scrollIntoView({block:"start",inline:"nearest"}),s(t)}(e.el,l)),["stop"])},G(e.title),11,$e)))),128))])])])}}}),[["__scopeId","data-v-7fcb825c"]]);export{je as default};
