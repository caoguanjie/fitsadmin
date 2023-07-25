import{ai as e,bw as a,bx as t,j as s,T as n}from"./index-9d7a3178.js";import{E as o,J as c,l,m as i,O as r,u as m,s as d,a as p,as as u,R as h,_ as f,P as g,a7 as v,S as O,T as _,p as x,L as w,a0 as S,W as I,aC as b,aD as y}from"./vxetable-f32c91e3.js";import{F as E}from"./FitsCard-f7e3b57a.js";import"./echarts-1215139a.js";const k={class:"container"},C=s(o({__name:"BaseExample",setup(s){const n=c({echartsOptions:new a({legend:{data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return async function(){var a;const t=(await(a={},e({url:"/DashBoard/WorkOrderTypeStatisticsChart",method:"get",params:a}))).ReturnData.StatisList.reduce(((e,a)=>(Object.keys(a).forEach((t=>{var s;"GroupInfo"===t&&(null==(s=n.echartsOptions.xAxisNames)||s.push(a[t]||"")),Object.prototype.hasOwnProperty.call(e,t)&&e[t].push(a[t]||0)})),e)),{Closed:[],FailureSolve:[],HangUp:[],InProcess:[],NewState:[],SuccessSolve:[]});n.echartsOptions.data=[t.NewState,t.InProcess,t.HangUp,t.FailureSolve,t.SuccessSolve,t.Closed]}(),(e,a)=>(l(),i("div",k,[r(m(t),{config:n.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-483f5588"]]),N={class:"container"},T=s(o({__name:"ShowLegendExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],s.echartsOptions.data=[[11,132,57,34],[24,57,11,99],[56,24,92,38],[111,28,65,72],[124,55,35,48]]}),500),(e,a)=>(l(),i("div",N,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-58700675"]]),A={class:"container"},B=s(o({__name:"PositionLegendExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,positon:"topRight",data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]}})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],s.echartsOptions.data=[[11,132,57,34],[24,57,11,99],[56,24,92,38],[111,28,65,72],[124,55,35,48]]}),500),(e,a)=>(l(),i("div",A,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-79fdba8c"]]),R={class:"container"},j=s(o({__name:"ShowZoomExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,data:[{name:"新建状态"},{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},isShowZoom:!0})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["客户组超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本","运维组","实施组","维修组","框架组","其他组"],s.echartsOptions.data=[[24,57,11,99,12,123],[11,132,57,34,12,123],[111,28,65,72,12,123],[100,50,44,89,12,123],[124,55,35,48,12,123],[56,24,92,38,12,123]]}),500),(e,a)=>(l(),i("div",R,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-ef58566f"]]),F={class:"container"},P=s(o({__name:"RadiusExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},hasBarRadius:!1})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],s.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,a)=>(l(),i("div",F,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-f6397b87"]]),L={class:"container"},D=s(o({__name:"ColorExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,data:[{name:"处理中",color:"purple"},{name:"挂起",color:"#F56C6C"},{name:"失败解决",color:"#67C23A"},{name:"成功解决",color:[{offset:0,color:"red"},{offset:1,color:"blue"}]},{name:"已关闭",color:[{offset:0,color:"#fff"},{offset:1,color:"#000"}]}]},hasBarRadius:!1})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],s.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,a)=>(l(),i("div",L,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-5097611c"]]),Z={class:"container"},H=s(o({__name:"StackExample",setup(e){const s=c({echartsOptions:new a({legend:{show:!0,data:[{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},hasBarRadius:!1,isStack:!0})});return setTimeout((()=>{s.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组"],s.echartsOptions.data=[[111,28,65,72],[24,57,11,99],[100,50,44,89],[124,55,35,48],[56,24,92,38]]}),500),(e,a)=>(l(),i("div",Z,[r(m(t),{config:s.echartsOptions},null,8,["config"])]))}}),[["__scopeId","data-v-2e41fba8"]]),U={class:"bar-echarts-example"},W={class:"examples"},G={class:"catalogue"},J=(e=>(b("data-v-38a9c51f"),e=e(),y(),e))((()=>x("div",{class:"menu-title"},"此页内容",-1))),V=["id","onClick"],q=o({name:"BarEcharts"}),z=s(o({...q,setup(e){const a=d([{component:C,title:"基础用法",desc:"基础柱状图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data"},{component:T,title:"图例用法",desc:"通过设置legend.show=true显示图例"},{component:B,title:"图例用法",desc:"通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true"},{component:j,title:"缩放组件用法",desc:"通过设置isShowZoom来控制是否显示缩放滑块组件（注：如果内容超出容器大小，则自动显示缩放组件）"},{component:P,title:"柱条圆角用法",desc:"通过设置hasBarRadius来控制柱条是否显示圆角"},{component:D,title:"设置柱条颜色用法",desc:"通过传入legend.data，给每项设置color即可设置柱条颜色，也可以传入渐变色"},{component:H,title:"数据堆叠用法",desc:"通过设置isStack来控制是否开启堆叠模式"}]),t=p([]),s=c({num:0});let o=0;const b={callback:function(e){t.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const y=e=>{if(null!==o)k(o);else if(null===o)for(let a=0;a<t.value.length;a++){let n=document.getElementById("menuItem"+a);t.value[a].pos.top<=e.scrollTop+t.value[0].pos.top&&n&&(s.num=a)}},k=e=>{for(let a=0;a<t.value.length;a++){let t=document.getElementById("menuItem"+a);e!==a&&t&&(t.className="defaultStyle")}setTimeout((()=>{o=null}),100)};return(e,c)=>{const d=n,p=u("outline");return l(),i("div",U,[r(d,{height:"100%",always:"",onScroll:y},{default:h((()=>[f((l(),i("div",W,[(l(!0),i(g,null,v(m(a),((e,a)=>(l(),O(E,{key:a,title:e.title,desc:e.desc,"is-active":a===m(s).num},{default:h((()=>[(l(),O(_(e.component)))])),_:2},1032,["title","desc","is-active"])))),128))])),[[p,b]])])),_:1}),x("div",G,[J,(l(!0),i(g,null,v(m(t),((e,a)=>(l(),i("div",{class:w([{active:m(s).num===a},"defaultStyle"]),key:a,id:"menuItem"+a,onClick:S((t=>function(e,a){o=a,s.num=a,e.scrollIntoView({block:"start",inline:"nearest"}),k(o)}(e.el,a)),["stop"])},I(e.title),11,V)))),128))])])}}}),[["__scopeId","data-v-38a9c51f"]]);export{z as default};
