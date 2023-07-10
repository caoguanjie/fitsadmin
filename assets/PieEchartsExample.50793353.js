import{k as e,be as a,bf as t,a3 as s}from"./index.0ea97641.js";import{F as n,Z as l,l as o,m as c,U as i,u as r,s as u,c as d,ak as m,S as p,L as v,P as h,ah as f,R as g,T as _,p as E,Q as b,V as y,W as O,ax as w,ay as x}from"./vxetable.5e2aec1d.js";import{F as I}from"./FitsCard.c1d99023.js";import"./echarts.d8b3161e.js";const S={class:"container"};var k=e(n({__name:"BaseExample",setup(e){const s=l({echartsOptions:new a({type:"pie"})});return setTimeout((()=>{s.echartsOptions.data=[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]}),500),(e,a)=>(o(),c("div",S,[i(r(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-4b9b22d6"]]);const A={class:"container"};var T=e(n({__name:"ShowLegendExample",setup(e){const s=l({echartsOptions:new a({type:"pie",legend:{show:!0}})});return setTimeout((()=>{s.echartsOptions.data=[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]}),500),(e,a)=>(o(),c("div",A,[i(r(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-f9b5f246"]]);const V={class:"container"};var U=e(n({__name:"GapExample",setup(e){const s=l({echartsOptions:new a({type:"pie",isHasGap:!0,legend:{show:!0}})});return setTimeout((()=>{s.echartsOptions.data=[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]}),500),(e,a)=>(o(),c("div",V,[i(r(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-7e465647"]]);const j={class:"container"};var C=e(n({__name:"ColorExample",setup(e){const s=l({echartsOptions:new a({type:"pie",isHasGap:!0,legend:{show:!0}})});return setTimeout((()=>{s.echartsOptions.data=[{value:1048,name:"Search Engine",color:"red"},{value:735,name:"Direct",color:"#000"},{value:580,name:"Email",color:"rgba(123, 234, 99, 0.5)"},{value:484,name:"Union Ads",color:[{offset:0,color:"blue"},{offset:1,color:"red"}]},{value:300,name:"Video Ads"}]}),500),(e,a)=>(o(),c("div",j,[i(r(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-7244b8da"]]);const D={class:"pie-echarts-example"},G={class:"examples"},B={class:"catalogue"},F=(e=>(w("data-v-0ec51b4a"),e=e(),x(),e))((()=>E("div",{class:"menu-title"},"此页内容",-1))),H=["id","onClick"],L=n({name:"PieEcharts"});var P=e(n({...L,setup(e){const a=u([{component:k,title:"基础用法",desc:"基础饼图展示，传入data数据即可"},{component:T,title:"图例用法",desc:"通过设置legend.show=true显示图例，无需传data，以及位置固定为左侧居中"},{component:U,title:"空隙用法",desc:"通过设置isHasGap=true表示项目之间都空隙，并且会有圆角"},{component:C,title:"颜色用法",desc:"在传入data数据中，给每项数据设置color属性，如果不传则使用默认颜色"}]),t=d([]),n=l({num:0});let w=0;const x={callback:function(e){t.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const S=e=>{if(null!==w)A(w);else if(null===w)for(let a=0;a<t.value.length;a++){let s=document.getElementById("menuItem"+a);t.value[a].pos.top<=e.scrollTop+t.value[0].pos.top&&s&&(n.num=a)}},A=e=>{for(let a=0;a<t.value.length;a++){let t=document.getElementById("menuItem"+a);e!==a&&t&&(t.className="defaultStyle")}setTimeout((()=>{w=null}),100)};return(e,l)=>{const u=s,d=m("outline");return o(),c("div",D,[i(u,{height:"100%",always:"",onScroll:S},{default:p((()=>[v((o(),c("div",G,[(o(!0),c(h,null,f(r(a),((e,a)=>(o(),g(I,{key:a,title:e.title,desc:e.desc,"is-active":a===n.num},{default:p((()=>[(o(),g(_(e.component)))])),_:2},1032,["title","desc","is-active"])))),128))])),[[d,x]])])),_:1}),E("div",B,[F,(o(!0),c(h,null,f(t.value,((e,a)=>(o(),c("div",{class:b([{active:n.num===a},"defaultStyle"]),key:a,id:"menuItem"+a,onClick:y((t=>function(e,a){w=a,n.num=a,e.scrollIntoView({block:"start",inline:"nearest"}),A(w)}(e.el,a)),["stop"])},O(e.title),11,H)))),128))])])}}}),[["__scopeId","data-v-0ec51b4a"]]);export{P as default};
