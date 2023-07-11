import{O as e,y as t,o as a,j as s,N as l,Q as n}from"./index-ca93fc99.js";import{E as o,a as d,l as i,S as r,R as p,O as m,V as h,u,A as f,az as b,aA as c,p as _,W as v,J as x,am as y,m as T,_ as w,P as C,aj as k,L as g,a0 as I}from"./vxetable-dc6e1f3b.js";import{u as P}from"./FitsTableProHook-084383a6.js";import{E as j,a as S}from"./index-0d57b9e9.js";import{F}from"./FitsCard-03b05720.js";import"./echarts-e0cca795.js";const G=o({__name:"CustomContentTable",setup(a){const s=d(),{fitsTablePro:l}=P({columns:[{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"},{field:"address",title:"地址",width:320},{field:"operation",title:"操作",slots:{default:"operation_default"}}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}]},s);return(a,n)=>{const o=t;return i(),r(u(e),{option:u(l),ref_key:"xGrid",ref:s},{operation_default:p((()=>[m(o,{size:"small",type:"primary"},{default:p((()=>[h(" 编辑 ")])),_:1}),m(o,{size:"small",type:"danger"},{default:p((()=>[h(" 删除 ")])),_:1})])),_:1},8,["option"])}}}),E=(e=>(b("data-v-7708d4d0"),e=e(),c(),e))((()=>_("span",{class:"vxe-icon-chart-bar-y"},null,-1))),V=s(o({__name:"CustomHeaderTable",setup(s){const l=d(""),n=d(),{fitsTablePro:o}=P({columns:[{field:"name",title:"姓名",slots:{header:"name_header"}},{field:"phone",title:"电话"},{field:"birth",title:"出生日期",slots:{header:"birth_header"},headerClassName:"birthHeader"},{field:"address",title:"地址",width:320},{field:"operation",title:"操作",slots:{header:"operation_header"}}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}]},n);return(s,d)=>{const b=t,c=a;return i(),r(u(e),{option:u(o),ref_key:"xGrid",ref:n},{name_header:p((({name:e,row:t})=>[h(" 姓名 "),m(b,{size:"small",type:"primary"},{default:p((()=>[h(" 按钮 ")])),_:1})])),birth_header:p((({name:e,row:t})=>[h(" 出生日期 "),E])),operation_header:p((({name:e,row:t})=>[m(c,{placeholder:"自定义",modelValue:u(l),"onUpdate:modelValue":d[0]||(d[0]=e=>f(l)?l.value=e:null)},null,8,["modelValue"])])),_:1},8,["option"])}}}),[["__scopeId","data-v-7708d4d0"]]),z=s(o({__name:"ExpandRowTable",setup(t){const a=d(),{fitsTablePro:s}=P({columns:[{field:"expand",type:"expand",slots:{content:"expand"}},{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"},{field:"address",title:"地址",width:320}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],expandConfig:{}},a);return(t,l)=>(i(),r(u(e),{option:u(s),class:"expandRowTable",ref_key:"xGrid",ref:a},{expand:p((({slotProps:{row:e}})=>[m(u(j),{title:"User Info"},{default:p((()=>[m(u(S),{label:"姓名"},{default:p((()=>[h(v(e.name),1)])),_:2},1024),m(u(S),{label:"电话"},{default:p((()=>[h(v(e.phone),1)])),_:2},1024),m(u(S),{label:"出生日期"},{default:p((()=>[h(v(e.birth),1)])),_:2},1024),m(u(S),{label:"地址"},{default:p((()=>[h(v(e.address),1)])),_:2},1024)])),_:2},1024)])),_:1},8,["option"]))}}),[["__scopeId","data-v-7147e803"]]),N=o({__name:"CustomButtonsTable",setup(t){const a=d(),{fitsTablePro:s}=P({columns:[{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"},{field:"address",title:"地址",width:320}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],toolbarConfig:{slots:{buttons:"buttons"}}},a);return(t,n)=>(i(),r(u(e),{option:u(s),ref_key:"xGrid",ref:a},{buttons:p((()=>[m(u(l))])),_:1},8,["option"]))}}),R=s(o({__name:"MasterSlaveTable",setup(t){const a=d(),s=d(),{fitsTablePro:l}=P({columns:[{field:"expand",type:"expand",slots:{content:"expand"}},{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"},{field:"address",title:"地址",width:300}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08",address:"广东省广州市天河区五山路东城小区5号楼401"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18",address:"广东省广州市天河区五山路东城小区5号楼403"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05",address:"广东省广州市天河区五山路东城小区5号楼404 "},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13",address:"广东省广州市海珠区五山路幸福小区6号楼101 "},{name:"张兴",phone:"18924584265",birth:"1954-03-25",address:"广东省广州市海珠区五山路幸福小区7号楼102 "}],toolbarConfig:{tools:{}},expandConfig:{}},a),{fitsTablePro:n}=P({columns:[{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"}],data:[{name:"王五",phone:"13224452121",birth:"1999-10-08"},{name:"李晓明",phone:"13754456492",birth:"2015-05-18"},{name:"王大陆",phone:"13324459856",birth:"2000-01-05"},{name:"李萌萌",phone:"18712458736",birth:"1879-12-13"},{name:"张兴",phone:"18924584265",birth:"1954-03-25"}]},s);return(t,o)=>(i(),r(u(e),{option:u(l),class:"expandRowTable",ref_key:"xGrid",ref:a},{expand:p((()=>[m(u(e),{option:u(n),class:"slaveTable",ref_key:"slaveGrid",ref:s},null,8,["option"])])),_:1},8,["option"]))}}),[["__scopeId","data-v-a6c7efe8"]]),B={class:"slot-table"},H={class:"content"},A={class:"right"},O={class:"menu"},U=(e=>(b("data-v-3f450b3c"),e=e(),c(),e))((()=>_("div",{class:"menu-title"},"此页内容",-1))),J=["id","onClick"],L=o({name:"SlotTable"}),M=s(o({...L,setup(e){const t=d([]),a=x({num:0});let s=0;const l={callback:function(e){t.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const o=e=>{if(null!==s)r(s);else if(null===s)for(let s=0;s<t.value.length;s++){let l=document.getElementById("menuItem"+s);t.value[s].pos.top<=e.scrollTop+t.value[0].pos.top&&l&&(a.num=s)}},r=e=>{for(let a=0;a<t.value.length;a++){let t=document.getElementById("menuItem"+a);e!==a&&t&&(t.className="defaultStyle")}setTimeout((()=>{s=null}),100)};return(e,d)=>{const h=n,f=y("outline");return i(),T("div",B,[m(h,{class:"left",onScroll:o,always:""},{default:p((()=>[w((i(),T("div",H,[m(F,{title:"自定义列模板",desc:"通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为default，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义列模板。"},{default:p((()=>[m(G)])),_:1}),m(F,{title:"自定义表头",desc:"通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为header，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义表头模板。本例还演示了给columns中的对象设置headerClassName表头类名。"},{default:p((()=>[m(V)])),_:1}),m(F,{title:"展开行",desc:"给 columns 里的对象配置 type=expand 开启展开行，并通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为content，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义列模板。"},{default:p((()=>[m(z)])),_:1}),m(F,{title:"自定义按钮区域",desc:"通过配置 toolbarConfig.slots 属性可以使用插槽。该属性是一个对象，其中键为 buttons，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义工具栏左侧的按钮区域。"},{default:p((()=>[m(N)])),_:1}),m(F,{title:"主从表",desc:"主从表也是通过展开行来实现的，可以看上面展开行表格的例子，只需要在插槽内再使用一次表格组件就完成了。 "},{default:p((()=>[m(R)])),_:1})])),[[f,l]])])),_:1}),_("div",A,[_("div",O,[U,(i(!0),T(C,null,k(u(t),((e,t)=>(i(),T("div",{class:g([{active:u(a).num===t},"defaultStyle"]),key:t,id:"menuItem"+t,onClick:I((l=>function(e,t){s=t,a.num=t,e.scrollIntoView({block:"start",inline:"nearest"}),r(s)}(e.el,t)),["stop"])},v(e.title),11,J)))),128))])])])}}}),[["__scopeId","data-v-3f450b3c"]]);export{M as default};