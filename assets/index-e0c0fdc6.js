import{Q as e,U as t,l}from"./index-2b8f59d9.js";import{v as a,B as s,a as o,d as n,f as i,J as c,u as r,ac as u,h as d,F as m,I as f,i as p,G as h,aa as v,an as g,ao as b,Q as y,D as I,S,N as k}from"./vxetable-90850a7d.js";import{u as x}from"./FitsTableProHook-c0d1a0dd.js";import{F as _}from"./FitsCard-f9fd0b1a.js";import"./echarts-c32f5a2f.js";const j=a({__name:"VirtualScrollTable",setup(t){const l=s([]),a={height:500,columns:[{field:"name",title:"姓名"},{field:"phone",title:"电话"},{field:"birth",title:"出生日期"},{field:"address",title:"地址",width:320}],data:l,scrollY:{gt:20}},u=o(),{fitsTablePro:d}=x(a,u);return n((()=>{!function(){for(let e=0;e<1e4;e++)l.push({name:"李晓明"+e,phone:"18924584265",birth:"1954-03-25",address:`广东省广州市海珠区五山路幸福小区7号楼${e}房`})}()})),(t,l)=>(i(),c(r(e),{option:r(d),ref_key:"xGrid",ref:u},null,8,["option"]))}}),T={class:"virtual-table"},F={class:"content"},w={class:"right"},B={class:"menu"},C=(e=>(g("data-v-cdaf12ce"),e=e(),b(),e))((()=>p("div",{class:"menu-title"},"此页内容",-1))),V=["id","onClick"],E=a({name:"VirtualScroll"}),G=l(a({...E,setup(e){const l=o([]),a=s({num:0});let n=0;const c={callback:function(e){l.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const g=e=>{if(null!==n)b(n);else if(null===n)for(let t=0;t<l.value.length;t++){let s=document.getElementById("menuItem"+t);l.value[t].pos.top<=e.scrollTop+l.value[0].pos.top&&s&&(a.num=t)}},b=e=>{for(let t=0;t<l.value.length;t++){let l=document.getElementById("menuItem"+t);e!==t&&l&&(l.className="defaultStyle")}setTimeout((()=>{n=null}),100)};return(e,s)=>{const o=t,x=u("outline");return i(),d("div",T,[m(o,{class:"left",onScroll:g,always:""},{default:f((()=>[y((i(),d("div",F,[m(_,{title:"虚拟滚动",desc:"默认情况下，如果设置了 height、maxHeight，则会根据触发规则自动启用虚拟渲染（触发规则由 scroll-x.gt | scroll-y.gt 设置）。虚拟滚动启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来。\n                    注意：根据官网配置显示，一旦启用虚拟滚动就无法使用展开行、树结构等特殊功能。"},{default:f((()=>[m(j)])),_:1})])),[[x,c]])])),_:1}),p("div",w,[p("div",B,[C,(i(!0),d(h,null,v(r(l),((e,t)=>(i(),d("div",{class:I([{active:r(a).num===t},"defaultStyle"]),key:t,id:"menuItem"+t,onClick:S((l=>function(e,t){n=t,a.num=t,e.scrollIntoView({block:"start",inline:"nearest"}),b(n)}(e.el,t)),["stop"])},k(e.title),11,V)))),128))])])])}}}),[["__scopeId","data-v-cdaf12ce"]]);export{G as default};
