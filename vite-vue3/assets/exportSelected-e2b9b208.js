import{m as e,N as a,o as t,r as l,O as o,x as s,p as i,V as d,j as r}from"./index-30624987.js";import{E as n,a as u}from"./el-radio-bd33f103.js";import{b as m}from"./system-6949dcb1.js";import{u as f}from"./FitsTableProHook-2b21cdbf.js";import{E as p,a as c,l as b,m as x,p as h,O as g,R as v,u as y,A as _,V as C}from"./vxetable-22d32819.js";import"./echarts-1215139a.js";const V={class:"exportBase"},U={class:"contain"},k={class:"buttonClass"},j={href:"https://vxetable.cn/#/table/advanced/export",target:"_blank",style:{"margin-left":"15px"}},w={class:"tableClass"},W=p({name:"ExploreSelected"}),P=r(p({...W,setup(r){const{user:p}=e(),W=c(),P={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"ExampleRoleList",dataBase:p.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((a=>{m(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:t}=e;a(t?{result:t.TableList,page:{total:t.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:T}=f(P,W),E=()=>{W.value.fitsTablePro.exportData({type:S.value,filename:I.value,useStyle:R.value,data:W.value.fitsTablePro.getCheckboxRecords()})};let I=c("默认文件名"),S=c("csv"),R=c(!0);return(e,r)=>{const m=t,f=l,p=n,c=u,P=o,S=s,z=i,L=d;return b(),x("div",V,[h("div",U,[h("div",k,[g(z,{inline:!0,class:"demo-form-inline"},{default:v((()=>[g(f,{label:"导出文件名称："},{default:v((()=>[g(m,{modelValue:y(I),"onUpdate:modelValue":r[0]||(r[0]=e=>_(I)?I.value=e:I=e),placeholder:"请输入文件名"},null,8,["modelValue"])])),_:1}),g(f,{label:"是否根据Table宽度导出："},{default:v((()=>[g(c,{modelValue:y(R),"onUpdate:modelValue":r[1]||(r[1]=e=>_(R)?R.value=e:R=e),class:"ml-4"},{default:v((()=>[g(p,{label:!0,size:"large"},{default:v((()=>[C("是")])),_:1}),g(p,{label:!1,size:"large"},{default:v((()=>[C("否")])),_:1})])),_:1},8,["modelValue"])])),_:1}),g(f,{label:""},{default:v((()=>[h("a",j,[g(P,{type:"info"},{default:v((()=>[C("Excel导出相关资料")])),_:1})])])),_:1}),g(f,null,{default:v((()=>[g(S,{style:{"margin-bottom":"10px"},onClick:E,type:"primary"},{default:v((()=>[C("导出选中")])),_:1})])),_:1})])),_:1})]),h("div",w,[g(y(a),{option:y(T),ref_key:"xGrid",ref:W},{state:v((({slotProps:e})=>[g(L,{modelValue:e.row.Ustate,"onUpdate:modelValue":a=>e.row.Ustate=a,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"])])])])}}}),[["__scopeId","data-v-b8d58132"]]);export{P as default};
