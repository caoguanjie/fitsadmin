import{bq as a,ac as e,E as t,a2 as l,a3 as s,ae as o,l as n,br as d}from"./index-b6db054e.js";import{v as r,B as u,C as c,f as i,h as v,i as p,N as m,u as h,F as f,I as b,x as g,G as O,_ as w,J as _,p as k,ap as x,aq as V,az as y}from"./vxetable-1644ac3d.js";import{r as D}from"./refresh-91cbde75.js";import"./echarts-c32f5a2f.js";const R={class:"header"},j={class:"left"},G={class:"title"},I=(a=>(x("data-v-6ad5ff9e"),a=a(),V(),a))((()=>p("div",{class:"refresh"},[p("div",null,"刷新")],-1))),C={class:"right"},M=n(r({__name:"TitleItem",props:{title:{default:""}},emits:["refreshData"],setup(n,{emit:d}){const r=d,x=n,V=u({echartsOptions:new a({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:"rgba(91, 143, 249, 0.85)"},{name:"处理中",color:"rgba(90, 216, 166, 0.85)"},{name:"挂起",color:"#7484a1"},{name:"失败解决",color:"#f6c638"},{name:"成功解决",color:"#ea7d64"},{name:"已关闭",color:"#82cfee"}]},isShowZoom:!0,isStack:!0,hasBarRadius:!1}),projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}],project:"",workGroup:"",timeRange:""}),{projectOps:y,workGroupOps:M,project:S,workGroup:T,timeRange:U,shortcuts:A}=c(V),{title:N}=c(x);return(a,e)=>{const n=t,d=l,u=s,c=o;return i(),v("div",R,[p("div",j,[p("div",G,m(h(N)),1),p("div",{class:"refresh-wrap",onClick:e[0]||(e[0]=a=>r("refreshData"))},[f(n,{color:"#007dff"},{default:b((()=>[f(h(D))])),_:1}),I])]),p("div",C,[g(a.$slots,"default",{},(()=>[f(u,{modelValue:h(S),"onUpdate:modelValue":e[1]||(e[1]=a=>k(S)?S.value=a:null),placeholder:"所属项目",onChange:e[2]||(e[2]=a=>r("refreshData"))},{default:b((()=>[(i(!0),v(O,null,w(h(y),(a=>(i(),_(d,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(u,{modelValue:h(T),"onUpdate:modelValue":e[3]||(e[3]=a=>k(T)?T.value=a:null),placeholder:"选择工作组",onChange:e[4]||(e[4]=a=>r("refreshData"))},{default:b((()=>[(i(!0),v(O,null,w(h(M),(a=>(i(),_(d,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(c,{modelValue:h(U),"onUpdate:modelValue":e[5]||(e[5]=a=>k(U)?U.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(A),onChange:e[6]||(e[6]=a=>r("refreshData"))},null,8,["modelValue","shortcuts"])]),!0)])])}}}),[["__scopeId","data-v-6ad5ff9e"]]),S={class:"work-group-statistics"},T={class:"chart"},U=n(r({__name:"MoreWorkGroupItem",setup(e){const t=u({echartsOptions:new a({legend:{show:!0,positon:"topLeft",data:[{name:"新建状态",color:"#00dba2"},{name:"处理中",color:"#3979ff"}]},isShowZoom:!0,hasBarRadius:!1})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","其他组"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<2;e++)a.push([s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",S,[f(M,{title:"工作组统计",onRefreshData:o}),p("div",T,[f(h(d),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-643bce41"]]),A={class:"work-group-statistics"},N={class:"chart"},B=n(r({__name:"SingleWorkGroupItem",setup(e){const t=u({echartsOptions:new a({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:"rgba(91, 143, 249, 0.85)"},{name:"处理中",color:"rgba(90, 216, 166, 0.85)"},{name:"挂起",color:"#7484a1"},{name:"失败解决",color:"#f6c638"},{name:"成功解决",color:"#ea7d64"},{name:"已关闭",color:"#82cfee"}]},isShowZoom:!0,isStack:!0,hasBarRadius:!1})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","其他组"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<7;e++)a.push([s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",A,[f(M,{title:"工作组统计",onRefreshData:o}),p("div",N,[f(h(d),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-85e958fe"]]),W={class:"trend"},Z={class:"chart"},q=n(r({__name:"WorkOrderTrendItem",setup(e){const t=u({echartsOptions:new a({type:"line",legend:{show:!0,positon:"topLeft",data:[{name:"新建状态",color:"#397aff"},{name:"失败解决",color:"#a17bf4"},{name:"成功解决",color:"#f4961a"}]},isShowArea:!0})}),{echartsOptions:l}=c(t);function s(){return Math.ceil(100*Math.random())}function o(){setTimeout((()=>{t.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],t.echartsOptions.data=function(){let a=[];for(let e=0;e<3;e++)a.push([s(),s(),s(),s(),s(),s(),s()]);return a}()}),0)}return o(),(a,e)=>(i(),v("div",W,[f(M,{title:"工单趋势",onRefreshData:o}),p("div",Z,[f(h(d),{config:h(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-326721d2"]]),E={class:"timeout"},L={class:"selects"},z={class:"chart"},F=n(r({__name:"WorkOrderTimeOutItem",setup(t){const n=u({echartsOptions:new a({type:"pie",isHasGap:!0,legend:{show:!0}}),projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}],project:"",workGroup:"",timeRange:""}),{echartsOptions:r,projectOps:m,workGroupOps:g,project:x,workGroup:V,timeRange:y,shortcuts:D}=c(n);function R(){return Math.ceil(100*Math.random())}function j(){setTimeout((()=>{n.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],n.echartsOptions.data=[{value:R(),name:"处理中"},{value:R(),name:"成功处理"},{value:R(),name:"失败处理"},{value:R(),name:"新建状态"}]}),0)}return j(),(a,e)=>{const t=o,n=l,u=s;return i(),v("div",E,[f(M,{title:"工单超时",onRefreshData:j},{default:b((()=>[f(t,{modelValue:h(y),"onUpdate:modelValue":e[0]||(e[0]=a=>k(y)?y.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(D),onChange:j},null,8,["modelValue","shortcuts"])])),_:1}),p("div",L,[f(u,{modelValue:h(x),"onUpdate:modelValue":e[1]||(e[1]=a=>k(x)?x.value=a:null),placeholder:"所属项目",onChange:j},{default:b((()=>[(i(!0),v(O,null,w(h(m),(a=>(i(),_(n,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),f(u,{modelValue:h(V),"onUpdate:modelValue":e[2]||(e[2]=a=>k(V)?V.value=a:null),placeholder:"选择工作组",onChange:j},{default:b((()=>[(i(!0),v(O,null,w(h(g),(a=>(i(),_(n,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),p("div",z,[f(h(d),{config:h(r)},null,8,["config"])])])}}}),[["__scopeId","data-v-9b4fd0b1"]]),H=a=>(x("data-v-c7603d89"),a=a(),V(),a),J={class:"comprehensive-example"},$={class:"top"},K={class:"right"},P={class:"set"},Q=H((()=>p("div",{class:"set-title"},"全局设置",-1))),X=H((()=>p("div",{class:"update"},[p("span",null,"更新时间：2021-12-14 15:50"),p("span",null,"更新数据")],-1))),Y=y('<div class="to-do" data-v-c7603d89><div class="to-do-title" data-v-c7603d89>待办事项</div><div class="list" data-v-c7603d89><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div></div></div><div class="to-do" data-v-c7603d89><div class="to-do-title" data-v-c7603d89>待办事项</div><div class="list" data-v-c7603d89><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div><div class="item" data-v-c7603d89><div class="name" data-v-c7603d89>我的待办</div><div class="num" data-v-c7603d89>1866</div></div></div></div>',2),aa={class:"middle"},ea=r({name:"ComprehensiveExample2"}),ta=n(r({...ea,setup(a){const t=u({timeRange:"",shortcuts:[{text:"昨天",value:()=>{const a=new Date;return[e().subtract(1,"days").valueOf(),a]}},{text:"近3个月",value:()=>{const a=new Date;return[e().subtract(90,"days").valueOf(),a]}},{text:"近半年",value:()=>{const a=new Date;return[e().subtract(180,"days").valueOf(),a]}}]}),{timeRange:l,shortcuts:s}=c(t);return(a,e)=>{const t=o;return i(),v("div",J,[p("div",$,[f(B),p("div",K,[p("div",P,[Q,f(t,{modelValue:h(l),"onUpdate:modelValue":e[0]||(e[0]=a=>k(l)?l.value=a:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:h(s)},null,8,["modelValue","shortcuts"]),X]),Y])]),p("div",aa,[f(q),f(F)]),f(U)])}}}),[["__scopeId","data-v-c7603d89"]]);export{ta as default};
