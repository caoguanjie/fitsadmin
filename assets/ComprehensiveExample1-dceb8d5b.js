import{v as e,B as a,f as t,h as s,i as l,G as o,aa as n,N as r,u as i,az as c,an as d,ao as u,C as v,F as m,I as p,D as h,p as f,J as _}from"./vxetable-90850a7d.js";import{l as b,E as g,am as O,a0 as w,a1 as k,bQ as D,bR as I}from"./index-2b8f59d9.js";import{r as x}from"./refresh-30efbf61.js";import{E as y}from"./el-date-picker-3db28835.js";import"./echarts-c32f5a2f.js";import"./index-2a794201.js";const C={class:"header"},R={class:"to-do"},j=(e=>(d("data-v-5b945432"),e=e(),u(),e))((()=>l("div",{class:"title"},"待办事项",-1))),M={class:"list"},V={class:"desc"},G={class:"num"},T=c('<div class="set" data-v-5b945432><div class="title" data-v-5b945432>全局设置</div><div class="time" data-v-5b945432>2022-08-01 —— 2022-08-08</div><div class="update" data-v-5b945432><div class="update-time" data-v-5b945432>更新时间：2021-08-08 15:50</div><div class="updateBtn" data-v-5b945432>更新数据</div></div></div>',1),W=b(e({__name:"HeaderItem",setup(e){const c=a({toDoList:[{desc:"我的代办",num:1866},{desc:"我的申请",num:1866},{desc:"我的已办",num:1866},{desc:"通知事项",num:1866},{desc:"运维工单",num:1866},{desc:"备件库",num:1866}]});return(e,a)=>(t(),s("div",C,[l("div",R,[j,l("div",M,[(t(!0),s(o,null,n(i(c).toDoList,((e,a)=>(t(),s("div",{key:a,class:"item"},[l("div",V,r(e.desc),1),l("div",G,r(e.num),1)])))),128))])]),T]))}}),[["__scopeId","data-v-5b945432"]]),N={class:"header"},S={class:"title"},A=(e=>(d("data-v-0cd5d486"),e=e(),u(),e))((()=>l("div",{class:"refresh"},[l("div",null,"刷新")],-1))),E=b(e({__name:"TitleItem",props:{title:{default:""}},emits:["refreshData"],setup(e,{emit:a}){const o=a,n=e,{title:c}=v(n);function d(){o("refreshData")}return(e,a)=>{const o=g;return t(),s("div",N,[l("div",S,r(i(c)),1),l("div",{class:"refresh-wrap",onClick:d},[m(o,{color:"#007dff"},{default:p((()=>[m(i(x))])),_:1}),A])])}}}),[["__scopeId","data-v-0cd5d486"]]),U={class:"condition"},z={class:"time"},B={class:"selects"},L=b(e({__name:"ChartConditionsItem",emits:["refreshData"],setup(e,{emit:r}){const c=r,d=a({projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const e=new Date;return[O().subtract(1,"days").valueOf(),e]}},{text:"近3个月",value:()=>{const e=new Date;return[O().subtract(90,"days").valueOf(),e]}},{text:"近半年",value:()=>{const e=new Date;return[O().subtract(180,"days").valueOf(),e]}}],time:"today",project:"",workGroup:"",timeRange:""}),{projectOps:u,workGroupOps:b,time:g,project:D,workGroup:I,timeRange:x,shortcuts:C}=v(d);function R(e){e!==g.value&&(g.value=e,c("refreshData"))}function j(){g.value="range",c("refreshData")}return(e,a)=>{const r=y,d=w,v=k;return t(),s("div",U,[l("div",z,[l("div",{class:h("today"===i(g)?"item active":"item"),onClick:a[0]||(a[0]=e=>R("today"))},"今天",2),l("div",{class:h("seven"===i(g)?"item active":"item"),onClick:a[1]||(a[1]=e=>R("seven"))},"近7天",2),l("div",{class:h("thirty"===i(g)?"item active":"item"),onClick:a[2]||(a[2]=e=>R("thirty"))},"近30天",2),m(r,{class:h("range"===i(g)?"active":""),modelValue:i(x),"onUpdate:modelValue":a[3]||(a[3]=e=>f(x)?x.value=e:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:i(C),onChange:j},null,8,["class","modelValue","shortcuts"])]),l("div",B,[m(v,{modelValue:i(D),"onUpdate:modelValue":a[4]||(a[4]=e=>f(D)?D.value=e:null),placeholder:"所属项目",onChange:a[5]||(a[5]=e=>c("refreshData"))},{default:p((()=>[(t(!0),s(o,null,n(i(u),(e=>(t(),_(d,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),m(v,{modelValue:i(I),"onUpdate:modelValue":a[6]||(a[6]=e=>f(I)?I.value=e:null),placeholder:"选择工作组",onChange:a[7]||(a[7]=e=>c("refreshData"))},{default:p((()=>[(t(!0),s(o,null,n(i(b),(e=>(t(),_(d,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])])}}}),[["__scopeId","data-v-a24e2e69"]]),Z={class:"work-group-statistics"},F={class:"chart"},H=b(e({__name:"SingleWorkGroupItem",setup(e){const o=a({echartsOptions:new D({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:[{offset:0,color:"#6bb1ff"},{offset:1,color:"#3979ff"}]}]},isShowZoom:!0})}),{echartsOptions:n}=v(o);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{o.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","医疗组"],o.echartsOptions.data=[[r(),r(),r(),r(),r(),r()]]}),0)}return c(),(e,a)=>(t(),s("div",Z,[m(E,{title:"工作组统计",onRefreshData:c}),m(L,{onRefreshData:c}),l("div",F,[m(i(I),{config:i(n)},null,8,["config"])])]))}}),[["__scopeId","data-v-537f958a"]]),J={class:"line"},Q={class:"chart"},q=b(e({__name:"WorkOrderTrendItem",setup(e){const o=a({echartsOptions:new D({type:"line",legend:{data:[{name:"新建工单"},{name:"成功解决"},{name:"失败解决"}],show:!0,positon:"bottomCenter"},isSmooth:!0})}),{echartsOptions:n}=v(o);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{o.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],o.echartsOptions.data=function(){let e=[];for(let a=0;a<3;a++)e.push([r(),r(),r(),r(),r(),r(),r()]);return e}()}),0)}return c(),(e,a)=>(t(),s("div",J,[m(E,{title:"工单趋势",onRefreshData:c}),m(L,{onRefreshData:c}),l("div",Q,[m(i(I),{config:i(n)},null,8,["config"])])]))}}),[["__scopeId","data-v-749a8826"]]),K={class:"pie"},P={class:"chart"},X=b(e({__name:"WorkOrderTimeOutItem",setup(e){const o=a({echartsOptions:new D({type:"pie",legend:{show:!0}})}),{echartsOptions:n}=v(o);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{o.echartsOptions.data=[{value:r(),name:"家具家电",color:"rgba(91, 143, 249, 0.85)"},{value:r(),name:"粮油副食",color:"rgba(90, 216, 166, 0.85)"}]}),0)}return c(),(e,a)=>(t(),s("div",K,[m(E,{title:"工单超时",onRefreshData:c}),m(L,{onRefreshData:c}),l("div",P,[m(i(I),{config:i(n)},null,8,["config"])])]))}}),[["__scopeId","data-v-2c6cc003"]]),Y={class:"work-order"},$=b(e({__name:"WorkOrderItem",setup:e=>(e,a)=>(t(),s("div",Y,[m(q),m(X)]))}),[["__scopeId","data-v-5238d34e"]]),ee={class:"work-group-statistics"},ae={class:"chart"},te=b(e({__name:"MoreWorkGroupItem",setup(e){const o=a({echartsOptions:new D({legend:{show:!0,positon:"bottomCenter",data:[{name:"新建状态"},{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},isShowZoom:!0})}),{echartsOptions:n}=v(o);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{o.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组"],o.echartsOptions.data=function(){let e=[];for(let a=0;a<6;a++)e.push([r(),r(),r(),r(),r(),r()]);return e}()}),0)}return c(),(e,a)=>(t(),s("div",ee,[m(E,{title:"工作组统计",onRefreshData:c}),m(L,{onRefreshData:c}),l("div",ae,[m(i(I),{config:i(n)},null,8,["config"])])]))}}),[["__scopeId","data-v-06b17644"]]),se={class:"comprehensive-example"},le=e({name:"ComprehensiveExample1"}),oe=b(e({...le,setup:e=>(e,a)=>(t(),s("div",se,[m(W),m(te),m($),m(H)]))}),[["__scopeId","data-v-e84e2315"]]);export{oe as default};
