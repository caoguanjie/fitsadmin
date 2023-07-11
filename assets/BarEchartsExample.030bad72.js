import{ac as e,l as a,bm as t,bn as s,a7 as n}from"./index.0fe8a92a.js";import{y as o,Q as c,f as l,h as i,M as r,u as d,s as m,c as p,aa as u,K as h,E as f,H as v,a8 as g,J as O,L as _,j as x,I as w,N as S,O as I,al as b,am as y}from"./vxetable.dc399d9c.js";import{F as E}from"./FitsCard.c6c4341d.js";import"./echarts.d8b3161e.js";const N={class:"container"};var k=a(o({__name:"BaseExample",setup(a){const n=c({echartsOptions:new t({legend:{data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return async function(){var a;const t=(await(a={},e({url:"/DashBoard/WorkOrderTypeStatisticsChart",method:"get",params:a}))).ReturnData.StatisList.reduce(((e,a)=>(Object.keys(a).forEach((t=>{var s;"GroupInfo"===t&&(null==(s=n.echartsOptions.xAxisNames)||s.push(a[t]||"")),Object.prototype.hasOwnProperty.call(e,t)&&e[t].push(a[t]||0)})),e)),{Closed:[],FailureSolve:[],HangUp:[],InProcess:[],NewState:[],SuccessSolve:[]});n.echartsOptions.data=[t.NewState,t.InProcess,t.HangUp,t.FailureSolve,t.SuccessSolve,t.Closed]}(),(e,a)=>(l(),i("div",N,[r(d(s),{config:n.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-6dad6e2f"]]);const C={class:"container"};var A=a(o({__name:"ShowLegendExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],a.echartsOptions.data=[[11,132,57,34],[24,57,11,99],[56,24,92,38],[111,28,65,72],[124,55,35,48]]}),500),(e,t)=>(l(),i("div",C,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-271dab76"]]);const B={class:"container"};var T=a(o({__name:"PositionLegendExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,positon:"topRight",data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],a.echartsOptions.data=[[11,132,57,34],[24,57,11,99],[56,24,92,38],[111,28,65,72],[124,55,35,48]]}),500),(e,t)=>(l(),i("div",B,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-646f3bca"]]);const j={class:"container"};var R=a(o({__name:"ShowZoomExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,data:[{name:"新建状态"},{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},isShowZoom:!0})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["客户组超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本","运维组","实施组","维修组","框架组","其他组"],a.echartsOptions.data=[[24,57,11,99,12,123],[11,132,57,34,12,123],[111,28,65,72,12,123],[100,50,44,89,12,123],[124,55,35,48,12,123],[56,24,92,38,12,123]]}),500),(e,t)=>(l(),i("div",j,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-5ed7d030"]]);const F={class:"container"};var L=a(o({__name:"RadiusExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},hasBarRadius:!1})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],a.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,t)=>(l(),i("div",F,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-3501de4e"]]);const P={class:"container"};var H=a(o({__name:"ColorExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,data:[{name:"处理中",color:"purple"},{name:"挂起",color:"#F56C6C"},{name:"失败解决",color:"#67C23A"},{name:"成功解决",color:[{offset:0,color:"red"},{offset:1,color:"blue"}]},{name:"已关闭",color:[{offset:0,color:"#fff"},{offset:1,color:"#000"}]}]},hasBarRadius:!1})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],a.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,t)=>(l(),i("div",P,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-db084ebe"]]);const Z={class:"container"};var D=a(o({__name:"StackExample",setup(e){const a=c({echartsOptions:new t({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},hasBarRadius:!1,isStack:!0})});return setTimeout((()=>{a.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],a.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,t)=>(l(),i("div",Z,[r(d(s),{config:a.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-545b4c5c"]]);const U={class:"bar-echarts-example"},G={class:"examples"},J={class:"catalogue"},K=(e=>(b("data-v-da001bde"),e=e(),y(),e))((()=>x("div",{class:"menu-title"},"此页内容",-1))),M=["id","onClick"],Q=o({name:"BarEcharts"});var V=a(o({...Q,setup(e){const a=m([{component:k,title:"基础用法",desc:"基础柱状图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data"},{component:A,title:"图例用法",desc:"通过设置legend.show=true显示图例"},{component:T,title:"图例用法",desc:"通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true"},{component:R,title:"缩放组件用法",desc:"通过设置isShowZoom来控制是否显示缩放滑块组件（注：如果内容超出容器大小，则自动显示缩放组件）"},{component:L,title:"柱条圆角用法",desc:"通过设置hasBarRadius来控制柱条是否显示圆角"},{component:H,title:"设置柱条颜色用法",desc:"通过传入legend.data，给每项设置color即可设置柱条颜色，也可以传入渐变色"},{component:D,title:"数据堆叠用法",desc:"通过设置isStack来控制是否开启堆叠模式"}]),t=p([]),s=c({num:0});let o=0;const b={callback:function(e){t.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const y=e=>{if(null!==o)N(o);else if(null===o)for(let a=0;a<t.value.length;a++){let n=document.getElementById("menuItem"+a);t.value[a].pos.top<=e.scrollTop+t.value[0].pos.top&&n&&(s.num=a)}},N=e=>{for(let a=0;a<t.value.length;a++){let t=document.getElementById("menuItem"+a);e!==a&&t&&(t.className="defaultStyle")}setTimeout((()=>{o=null}),100)};return(e,c)=>{const m=n,p=u("outline");return l(),i("div",U,[r(m,{height:"100%",always:"",onScroll:y},{default:h((()=>[f((l(),i("div",G,[(l(!0),i(v,null,g(d(a),((e,a)=>(l(),O(E,{key:a,title:e.title,desc:e.desc,"is-active":a===s.num},{default:h((()=>[(l(),O(_(e.component)))])),_:2},1032,["title","desc","is-active"])))),128))])),[[p,b]])])),_:1}),x("div",J,[K,(l(!0),i(v,null,g(t.value,((e,a)=>(l(),i("div",{class:w([{active:s.num===a},"defaultStyle"]),key:a,id:"menuItem"+a,onClick:S((t=>function(e,a){o=a,s.num=a,e.scrollIntoView({block:"start",inline:"nearest"}),N(o)}(e.el,a)),["stop"])},I(e.title),11,M)))),128))])])}}}),[["__scopeId","data-v-da001bde"]]);export{V as default};
