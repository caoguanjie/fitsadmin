import{m as e,P as a,o as t,r as l,a0 as o,a1 as s,Q as i,x as d,p as r,X as n,j as u}from"./index-dcdeddb6.js";import{b as f}from"./system-2d8a29a4.js";import{u as m}from"./FitsTableProHook-a8ff2af7.js";import{E as p,a as c,l as b,m as x,p as h,O as g,R as v,u as y,A as _,V as C}from"./vxetable-9ecf1980.js";import"./echarts-1215139a.js";const V={class:"exportBase"},U={class:"contain"},k={class:"buttonClass"},w={href:"https://vxetable.cn/#/table/advanced/export",target:"_blank",style:{"margin-left":"15px"}},j={class:"tableClass"},P=p({name:"ExploreSelected"}),W=u(p({...P,setup(u){const{user:p}=e(),P=c(),W={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"ExampleRoleList",dataBase:p.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((a=>{f(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:t}=e;a(t?{result:t.TableList,page:{total:t.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:T}=m(W,P),I=()=>{P.value.fitsTablePro.exportData({type:E.value,filename:S.value,useStyle:R.value,data:P.value.fitsTablePro.getCheckboxRecords()})};let S=c("默认文件名"),E=c("csv"),R=c(!0);return(e,u)=>{const f=t,m=l,p=o,c=s,W=i,E=d,z=r,L=n;return b(),x("div",V,[h("div",U,[h("div",k,[g(z,{inline:!0,class:"demo-form-inline"},{default:v((()=>[g(m,{label:"导出文件名称："},{default:v((()=>[g(f,{modelValue:y(S),"onUpdate:modelValue":u[0]||(u[0]=e=>_(S)?S.value=e:S=e),placeholder:"请输入文件名"},null,8,["modelValue"])])),_:1}),g(m,{label:"是否根据Table宽度导出："},{default:v((()=>[g(c,{modelValue:y(R),"onUpdate:modelValue":u[1]||(u[1]=e=>_(R)?R.value=e:R=e),class:"ml-4"},{default:v((()=>[g(p,{label:!0,size:"large"},{default:v((()=>[C("是")])),_:1}),g(p,{label:!1,size:"large"},{default:v((()=>[C("否")])),_:1})])),_:1},8,["modelValue"])])),_:1}),g(m,{label:""},{default:v((()=>[h("a",w,[g(W,{type:"info"},{default:v((()=>[C("Excel导出相关资料")])),_:1})])])),_:1}),g(m,null,{default:v((()=>[g(E,{style:{"margin-bottom":"10px"},onClick:I,type:"primary"},{default:v((()=>[C("导出选中")])),_:1})])),_:1})])),_:1})]),h("div",j,[g(y(a),{option:y(T),ref_key:"xGrid",ref:P},{state:v((({slotProps:e})=>[g(L,{modelValue:e.row.Ustate,"onUpdate:modelValue":a=>e.row.Ustate=a,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"])])])])}}}),[["__scopeId","data-v-b8d58132"]]);export{W as default};
