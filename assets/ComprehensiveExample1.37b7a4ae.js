import{y as e,S as a,f as t,h as s,j as o,F as n,_ as l,M as r,ax as c,an as i,ao as d,W as u,X as v,u as m,N as p,H as f,A as h,i as _,G as b}from"./vxetable.23d9f74f.js";import{_ as g}from"./index.53c6c89d.js";import{n as O,o as k}from"./index.14f8690e.js";import{r as w}from"./refresh.870e9e20.js";import{h as D}from"./moment.9709ab41.js";import"./echarts.d8b3161e.js";const I={class:"header"},x={class:"to-do"},y=(e=>(i("data-v-fc02e8c6"),e=e(),d(),e))((()=>o("div",{class:"title"},"待办事项",-1))),C={class:"list"},j={class:"desc"},R={class:"num"},M=c('<div class="set" data-v-fc02e8c6><div class="title" data-v-fc02e8c6>全局设置</div><div class="time" data-v-fc02e8c6>2022-08-01 —— 2022-08-08</div><div class="update" data-v-fc02e8c6><div class="update-time" data-v-fc02e8c6>更新时间：2021-08-08 15:50</div><div class="updateBtn" data-v-fc02e8c6>更新数据</div></div></div>',1);var V=g(e({__name:"HeaderItem",setup(e){const c=a({toDoList:[{desc:"我的代办",num:1866},{desc:"我的申请",num:1866},{desc:"我的已办",num:1866},{desc:"通知事项",num:1866},{desc:"运维工单",num:1866},{desc:"备件库",num:1866}]});return(e,a)=>(t(),s("div",I,[o("div",x,[y,o("div",C,[(t(!0),s(n,null,l(c.toDoList,((e,a)=>(t(),s("div",{key:a,class:"item"},[o("div",j,r(e.desc),1),o("div",R,r(e.num),1)])))),128))])]),M]))}}),[["__scopeId","data-v-fc02e8c6"]]);const G={class:"header"},T={class:"title"},S=(e=>(i("data-v-0521cf84"),e=e(),d(),e))((()=>o("div",{class:"refresh"},[o("div",null,"刷新")],-1)));var W=g(e({__name:"TitleItem",props:{title:{type:String,required:!0,default:""}},emits:["refreshData"],setup(e,{emit:a}){const n=e,{title:l}=u(n);function c(){a("refreshData")}return(e,a)=>{const n=v("el-icon");return t(),s("div",G,[o("div",T,r(m(l)),1),o("div",{class:"refresh-wrap",onClick:c},[p(n,{color:"#007dff"},{default:f((()=>[p(m(w))])),_:1}),S])])}}}),[["__scopeId","data-v-0521cf84"]]);const A={class:"condition"},N={class:"time"},U={class:"selects"};var H=g(e({__name:"ChartConditionsItem",emits:["refreshData"],setup(e,{emit:r}){const c=a({projectOps:[{value:"工时系统",label:"工时系统"},{value:"个案管理系统",label:"个案管理系统"},{value:"电子病历",label:"电子病历"}],workGroupOps:[{value:"网络组",label:"网络组"},{value:"运维组",label:"运维组"},{value:"客户组",label:"客户组"},{value:"维修组",label:"维修组"},{value:"框架组",label:"框架组"}],shortcuts:[{text:"昨天",value:()=>{const e=new Date;return[D().subtract(1,"days").valueOf(),e]}},{text:"近3个月",value:()=>{const e=new Date;return[D().subtract(90,"days").valueOf(),e]}},{text:"近半年",value:()=>{const e=new Date;return[D().subtract(180,"days").valueOf(),e]}}],time:"today",project:"",workGroup:"",timeRange:""}),{projectOps:i,workGroupOps:d,time:g,project:O,workGroup:k,timeRange:w,shortcuts:I}=u(c);function x(e){e!==g.value&&(g.value=e,r("refreshData"))}function y(){g.value="range",r("refreshData")}return(e,a)=>{const c=v("el-date-picker"),u=v("el-option"),D=v("el-select");return t(),s("div",A,[o("div",N,[o("div",{class:h("today"===m(g)?"item active":"item"),onClick:a[0]||(a[0]=e=>x("today"))},"今天",2),o("div",{class:h("seven"===m(g)?"item active":"item"),onClick:a[1]||(a[1]=e=>x("seven"))},"近7天",2),o("div",{class:h("thirty"===m(g)?"item active":"item"),onClick:a[2]||(a[2]=e=>x("thirty"))},"近30天",2),p(c,{class:h("range"===m(g)?"active":""),modelValue:m(w),"onUpdate:modelValue":a[3]||(a[3]=e=>_(w)?w.value=e:null),type:"daterange","unlink-panels":"","range-separator":"一","start-placeholder":"开始日期","end-placeholder":"结束日期",shortcuts:m(I),onChange:y},null,8,["class","modelValue","shortcuts"])]),o("div",U,[p(D,{modelValue:m(O),"onUpdate:modelValue":a[4]||(a[4]=e=>_(O)?O.value=e:null),placeholder:"所属项目",onChange:a[5]||(a[5]=e=>r("refreshData"))},{default:f((()=>[(t(!0),s(n,null,l(m(i),(e=>(t(),b(u,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),p(D,{modelValue:m(k),"onUpdate:modelValue":a[6]||(a[6]=e=>_(k)?k.value=e:null),placeholder:"选择工作组",onChange:a[7]||(a[7]=e=>r("refreshData"))},{default:f((()=>[(t(!0),s(n,null,l(m(d),(e=>(t(),b(u,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])])}}}),[["__scopeId","data-v-21d54148"]]);const L={class:"work-group-statistics"},Z={class:"chart"};var q=g(e({__name:"SingleWorkGroupItem",setup(e){const n=a({echartsOptions:new O({legend:{show:!0,positon:"topRight",data:[{name:"新建状态",color:[{offset:0,color:"#6bb1ff"},{offset:1,color:"#3979ff"}]}]},isShowZoom:!0})}),{echartsOptions:l}=u(n);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{n.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组","医疗组"],n.echartsOptions.data=[[r(),r(),r(),r(),r(),r()]]}),0)}return c(),(e,a)=>(t(),s("div",L,[p(W,{title:"工作组统计",onRefreshData:c}),p(H,{onRefreshData:c}),o("div",Z,[p(m(k),{config:m(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-81445ea8"]]);const B={class:"line"},E={class:"chart"};var F=g(e({__name:"WorkOrderTrendItem",setup(e){const n=a({echartsOptions:new O({type:"line",legend:{data:[{name:"新建工单"},{name:"成功解决"},{name:"失败解决"}],show:!0,positon:"bottomCenter"},isSmooth:!0})}),{echartsOptions:l}=u(n);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{n.echartsOptions.xAxisNames=["2022-08-01","2022-08-02","2022-08-03","2022-08-04","2022-08-05","2022-08-06","2022-08-07"],n.echartsOptions.data=function(){let e=[];for(let a=0;a<3;a++)e.push([r(),r(),r(),r(),r(),r(),r()]);return e}()}),0)}return c(),(e,a)=>(t(),s("div",B,[p(W,{title:"工单趋势",onRefreshData:c}),p(H,{onRefreshData:c}),o("div",E,[p(m(k),{config:m(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-1a9abdf0"]]);const X={class:"pie"},z={class:"chart"};var J=g(e({__name:"WorkOrderTimeOutItem",setup(e){const n=a({echartsOptions:new O({type:"pie",legend:{show:!0}})}),{echartsOptions:l}=u(n);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{n.echartsOptions.data=[{value:r(),name:"家具家电",color:"rgba(91, 143, 249, 0.85)"},{value:r(),name:"粮油副食",color:"rgba(90, 216, 166, 0.85)"}]}),0)}return c(),(e,a)=>(t(),s("div",X,[p(W,{title:"工单超时",onRefreshData:c}),p(H,{onRefreshData:c}),o("div",z,[p(m(k),{config:m(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-55b38b94"]]);const K={class:"work-order"};var P=g(e({__name:"WorkOrderItem",setup:e=>(e,a)=>(t(),s("div",K,[p(F),p(J)]))}),[["__scopeId","data-v-6cca0e23"]]);const Q={class:"work-group-statistics"},Y={class:"chart"};var $=g(e({__name:"MoreWorkGroupItem",setup(e){const n=a({echartsOptions:new O({legend:{show:!0,positon:"bottomCenter",data:[{name:"新建状态"},{name:"处理中"},{name:"挂起"},{name:"失败解决"},{name:"成功解决"},{name:"已关闭"}]},isShowZoom:!0})}),{echartsOptions:l}=u(n);function r(){return Math.ceil(100*Math.random())}function c(){setTimeout((()=>{n.echartsOptions.xAxisNames=["网络组","运维组","客户组","维修组","框架组"],n.echartsOptions.data=function(){let e=[];for(let a=0;a<6;a++)e.push([r(),r(),r(),r(),r(),r()]);return e}()}),0)}return c(),(e,a)=>(t(),s("div",Q,[p(W,{title:"工作组统计",onRefreshData:c}),p(H,{onRefreshData:c}),o("div",Y,[p(m(k),{config:m(l)},null,8,["config"])])]))}}),[["__scopeId","data-v-6ff2afff"]]);const ee={class:"comprehensive-example"},ae=e({name:"ComprehensiveExample1"});var te=g(e({...ae,setup:e=>(e,a)=>(t(),s("div",ee,[p(V),p($),p(P),p(q)]))}),[["__scopeId","data-v-4f474b89"]]);export{te as default};
