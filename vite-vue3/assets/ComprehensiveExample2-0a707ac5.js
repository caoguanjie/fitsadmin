import{bw as a,aj as e,E as t,Z as l,$ as s,al as o,j as d,bx as n}from"./index-dcdeddb6.js";import{E as r,J as u,K as c,l as i,m as v,p,W as m,u as h,O as f,R as b,F as g,P as O,a7 as w,S as _,A as k,aC as x,aD as V,aM as D}from"./vxetable-9ecf1980.js";import{r as y}from"./refresh-8871e0a1.js";import"./echarts-1215139a.js";const R={class:"header"},j={class:"left"},G={class:"title"},I=(a=>(x("data-v-6ad5ff9e"),a=a(),V(),a))((()=>p("div",{class:"refresh"},[p("div",null,"刷新")],-1))),M={class:"right"},C=d(r({__name:"TitleItem",props:{title:{default:""}},emits:["refreshData"],setup(d,{emit:n}){const r=d,x=u({echartsOptions:new a({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:"rgba(91, 143, 249, 0.85)"},{name:"处理中",color:"rgba(90, 216, 166, 0.85)"},{name:"挂起",color:"#7484a1"},{name:"失败解决",color:"#f6c638"},{name:"成功解决",color:"#ea7d64"},{name:"已关闭",color:"#82cfee"}]},isShowZoom:!0,isStack:!0,hasBarRadius:!1}),projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}],project:"",workGroup:"",timeRange:""}),{projectOps:V,workGroupOps:D,project:C,workGroup:S,timeRange:T,shortcuts:U}=c(x),{title:A}=c(r);return(a,e)=>{const d=t,r=l,u=s,c=o;return i(),v("div",R,[p("div",j,[p("div",G,m(h(A)),1),p("div",{class:"refresh-wrap",onClick:e[0]||(e[0]=a=>n("refreshData"))},[f(d,{color:"#007dff"},{default:b((()=>[f(h(y))])),_:1}),I])]),p("div",M,[g(a.$slots,"default",{},(()=>[f(u,{modelValue:h(C),"onUpdate:modelValue":e[1]||(e[1]=a=>k(C)?C.value=a:null),placeholder:"所属项目",onChange:e[2]||(e[2]=a=>n("refreshData"))},{default:b((()=>[(i(!0),v(O,null,w(h(V),(a=>(i(),_(r,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(u,{modelValue:h(S),"onUpdate:modelValue":e[3]||(e[3]=a=>k(S)?S.value=a:null),placeholder:"选择工作组",onChange:e[4]||(e[4]=a=>n("refreshData"))},{default:b((()=>[(i(!0),v(O,null,w(h(D),(a=>(i(),_(r,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(c,{modelValue:h(T),"onUpdate:modelValue":e[5]||(e[5]=a=>k(T)?T.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(U),onChange:e[6]||(e[6]=a=>n("refreshData"))},null,8,["modelValue","shortcuts"])]),!0)])])}}}),[["__scopeId","data-v-6ad5ff9e"]]),S={class:"work-group-statistics"},T={class:"chart"},U=d(r({__name:"MoreWorkGroupItem",setup(e){const t=u({echartsOptions:new a({legend:{show:!0,positon:"topLeft",data:[{name:"新建状态",color:"#00dba2"},{name:"处理中",color:"#3979ff"}]},isShowZoom:!0,hasBarRadius:!1})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","其他组"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<2;e++)a.push([s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",S,[f(C,{title:"工作组统计",onRefreshData:o}),p("div",T,[f(h(n),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-643bce41"]]),A={class:"work-group-statistics"},W={class:"chart"},N=d(r({__name:"SingleWorkGroupItem",setup(e){const t=u({echartsOptions:new a({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:"rgba(91, 143, 249, 0.85)"},{name:"处理中",color:"rgba(90, 216, 166, 0.85)"},{name:"挂起",color:"#7484a1"},{name:"失败解决",color:"#f6c638"},{name:"成功解决",color:"#ea7d64"},{name:"已关闭",color:"#82cfee"}]},isShowZoom:!0,isStack:!0,hasBarRadius:!1})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","其他组"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<7;e++)a.push([s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",A,[f(C,{title:"工作组统计",onRefreshData:o}),p("div",W,[f(h(n),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-85e958fe"]]),Z={class:"trend"},B={class:"chart"},E=d(r({__name:"WorkOrderTrendItem",setup(e){const t=u({echartsOptions:new a({type:"line",legend:{show:!0,positon:"topLeft",data:[{name:"新建状态",color:"#397aff"},{name:"失败解决",color:"#a17bf4"},{name:"成功解决",color:"#f4961a"}]},isShowArea:!0})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<3;e++)a.push([s(),s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",Z,[f(C,{title:"工单趋势",onRefreshData:o}),p("div",B,[f(h(n),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-326721d2"]]),L={class:"timeout"},$={class:"selects"},F={class:"chart"},H=d(r({__name:"WorkOrderTimeOutItem",setup(t){const d=u({echartsOptions:new a({type:"pie",isHasGap:!0,legend:{show:!0}}),projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}],project:"",workGroup:"",timeRange:""}),{echartsOptions:r,projectOps:m,workGroupOps:g,project:x,workGroup:V,timeRange:D,shortcuts:y}=c(d);function R(){return Math.ceil(100*Math.random())}function j(){setTimeout((()=>{d.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],d.echartsOptions.data=[{value:R(),name:"处理中"},{value:R(),name:"成功处理"},{value:R(),name:"失败处理"},{value:R(),name:"新建状态"}]}),0)}return j(),(a,e)=>{const t=o,d=l,u=s;return i(),v("div",L,[f(C,{title:"工单超时",onRefreshData:j},{default:b((()=>[f(t,{modelValue:h(D),"onUpdate:modelValue":e[0]||(e[0]=a=>k(D)?D.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(y),onChange:j},null,8,["modelValue","shortcuts"])])),_:1}),p("div",$,[f(u,{modelValue:h(x),"onUpdate:modelValue":e[1]||(e[1]=a=>k(x)?x.value=a:null),placeholder:"所属项目",onChange:j},{default:b((()=>[(i(!0),v(O,null,w(h(m),(a=>(i(),_(d,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(u,{modelValue:h(V),"onUpdate:modelValue":e[2]||(e[2]=a=>k(V)?V.value=a:null),placeholder:"选择工作组",onChange:j},{default:b((()=>[(i(!0),v(O,null,w(h(g),(a=>(i(),_(d,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),p("div",F,[f(h(n),{config:h(r)},null,8,["config"])])])}}}),[["__scopeId","data-v-9b4fd0b1"]]),J=a=>(x("data-v-c7603d89"),a=a(),V(),a),K={class:"comprehensive-example"},P={class:"top"},q={class:"right"},z={class:"set"},Q=J((()=>p("div",{class:"set-title"},"全局设置",-1))),X=J((()=>p("div",{class:"update"},[p("span",null,"更新时间：2021-12-14 15:50"),p("span",null,"更新数据")],-1))),Y=D('<div class="to-do" data-v-c7603d89><div class="to-do-title" data-v-c7603d89>待办事项</div><div class="list" data-v-c7603d89><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div></div></div><div class="to-do" data-v-c7603d89><div class="to-do-title" data-v-c7603d89>待办事项</div><div class="list" data-v-c7603d89><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div></div></div>',2),aa={class:"middle"},ea=r({name:"ComprehensiveExample2"}),ta=d(r({...ea,setup(a){const t=u({timeRange:"",shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}]}),{timeRange:l,shortcuts:s}=c(t);return(a,e)=>{const t=o;return i(),v("div",K,[p("div",P,[f(N),p("div",q,[p("div",z,[Q,f(t,{modelValue:h(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(s)},null,8,["modelValue","shortcuts"]),X]),Y])]),p("div",aa,[f(E),f(H)]),f(U)])}}}),[["__scopeId","data-v-c7603d89"]]);export{ta as default};
