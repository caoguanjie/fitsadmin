import{P as e,x as t,T as n,j as i}from"./index-6e0271be.js";import{E as a,a as l,l as o,S as d,R as s,O as r,V as u,u as m,J as c,as as f,m as p,_ as h,p as b,P as g,a7 as _,L as k,a0 as C,W as v,aC as R,aD as y}from"./vxetable-072d8c57.js";import{u as T}from"./FitsTableProHook-e7130634.js";import{F as w}from"./FitsCard-312de60d.js";import"./echarts-1215139a.js";const E=a({__name:"EditModeTable",setup(n){const i=l(),{fitsTablePro:a}=T({columns:[{field:"name",title:"姓名",editRender:{name:"input"}},{field:"phone",title:"电话",editRender:{name:"input"}},{field:"birth",title:"出生日期",editRender:{name:"ElDatePicker"}},{field:"address",title:"地址",width:320,editRender:{name:"input"}}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],editConfig:{trigger:"click",mode:"cell"},toolbarConfig:{slots:{buttons:"myBtn"}}},i);function c(e){a.editConfig.mode=e}return(n,l)=>{const f=t;return o(),d(m(e),{option:m(a),ref_key:"xGrid",ref:i},{myBtn:s((()=>[r(f,{onClick:l[0]||(l[0]=e=>c("cell"))},{default:s((()=>[u(" 切换单元格模式 ")])),_:1}),r(f,{onClick:l[1]||(l[1]=e=>c("row"))},{default:s((()=>[u(" 切换行模式 ")])),_:1})])),_:1},8,["option"])}}}),P=a({__name:"EditTriggerTable",setup(n){const i=l(),{fitsTablePro:a}=T({keepSource:!0,columns:[{field:"name",title:"姓名",editRender:{name:"input"}},{field:"phone",title:"电话",editRender:{name:"input"}},{field:"birth",title:"出生日期",editRender:{name:"ElDatePicker"}},{field:"address",title:"地址",width:320,editRender:{name:"input"}}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],editConfig:{trigger:"click",mode:"row"},toolbarConfig:{slots:{buttons:"myBtn"},tools:{enabled:!1}}},i);function c(e){a.editConfig.trigger=e}return(n,l)=>{const f=t;return o(),d(m(e),{option:m(a),ref_key:"xGrid",ref:i},{myBtn:s((()=>[r(f,{onClick:l[0]||(l[0]=e=>c("click"))},{default:s((()=>[u(" 切换单击触发 ")])),_:1}),r(f,{onClick:l[1]||(l[1]=e=>c("dblclick"))},{default:s((()=>[u(" 切换双击触发 ")])),_:1})])),_:1},8,["option"])}}}),x=a({__name:"ManualEditTable",setup(n){const i=l(),{fitsTablePro:a}=T({keepSource:!0,columns:[{field:"name",title:"姓名",editRender:{name:"input"}},{field:"phone",title:"电话",editRender:{name:"input"}},{field:"birth",title:"出生日期",editRender:{name:"ElDatePicker"}},{field:"address",title:"地址",width:320,editRender:{name:"input"}},{field:"operation",title:"操作",slots:{default:"operation_default"}}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401",operation:"12"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],editConfig:{trigger:"manual",mode:"row"},toolbarConfig:{tools:{enabled:!1}}},i);return(n,l)=>{const c=t;return o(),d(m(e),{option:m(a),ref_key:"xGrid",ref:i},{operation_default:s((({slotProps:{row:e}})=>[r(c,{onClick:t=>function(e){i.value.fitsTablePro.setEditRow(e)}(e)},{default:s((()=>[u(" 编辑 ")])),_:2},1032,["onClick"])])),_:1},8,["option"])}}}),S={class:"edit-table"},I={class:"content"},j={class:"right"},B={class:"menu"},D=(e=>(R("data-v-b6faf9c8"),e=e(),y(),e))((()=>b("div",{class:"menu-title"},"此页内容",-1))),F=["id","onClick"],G=a({name:"EditTable"}),M=i(a({...G,setup(e){const t=l([]),i=c({num:0});let a=0;const d={callback:function(e){t.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const u=e=>{if(null!==a)R(a);else if(null===a)for(let n=0;n<t.value.length;n++){let a=document.getElementById("menuItem"+n);t.value[n].pos.top<=e.scrollTop+t.value[0].pos.top&&a&&(i.num=n)}},R=e=>{for(let n=0;n<t.value.length;n++){let t=document.getElementById("menuItem"+n);e!==n&&t&&(t.className="defaultStyle")}setTimeout((()=>{a=null}),100)};return(e,l)=>{const c=n,y=f("outline");return o(),p("div",S,[r(c,{class:"left",onScroll:u,always:""},{default:s((()=>[h((o(),p("div",I,[r(w,{title:"编辑模式",desc:"给 columns 里的对象配置 editRender 属性设置渲染器名称等，即可开启可编辑功能。"},{default:s((()=>[r(E)])),_:1}),r(w,{title:"点击触发编辑",desc:"通过配置 editConfig.trigger 设置编辑器的触发方式。可以通过单击、双击和手动方式触发。本例演示了切换单击和双击的触发方式，手动触发请移步下一个例子。"},{default:s((()=>[r(P)])),_:1}),r(w,{title:"手动触发编辑",desc:"手动的触发方式需要配置 editConfig.trigger='manual'，且只对 editConfig.mode='row'有效。"},{default:s((()=>[r(x)])),_:1})])),[[y,d]])])),_:1}),b("div",j,[b("div",B,[D,(o(!0),p(g,null,_(m(t),((e,t)=>(o(),p("div",{class:k([{active:m(i).num===t},"defaultStyle"]),key:t,id:"menuItem"+t,onClick:C((n=>function(e,t){a=t,i.num=t,e.scrollIntoView({block:"start",inline:"nearest"}),R(a)}(e.el,t)),["stop"])},v(e.title),11,F)))),128))])])])}}}),[["__scopeId","data-v-b6faf9c8"]]);export{M as default};
