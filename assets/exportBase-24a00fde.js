import{m as e,O as l,o as a,s as t,Y as o,Z as s,P as i,y as d,p as r,W as u,j as n}from"./index-ca93fc99.js";import{E as m,a as f}from"./el-radio-1c450e57.js";import{b as p}from"./system-d510ffa2.js";import{u as c}from"./FitsTableProHook-084383a6.js";import{E as b,a as v,l as x,m as h,p as g,O as y,R as _,u as V,A as C,V as U,P as j,aj as k}from"./vxetable-dc6e1f3b.js";import"./echarts-e0cca795.js";const w={class:"exportBase"},W={class:"contain"},E={class:"buttonClass"},P={href:"https://vxetable.cn/#/table/advanced/export",target:"_blank",style:{"margin-left":"15px"}},I={class:"tableClass"},T=b({name:"ExploreExcel"}),S=n(b({...T,setup(n){const{user:b}=e(),T=v(),S={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"ExampleRoleList",dataBase:b.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{p(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:a.TableList,page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:z}=c(S,T),L=()=>{T.value.fitsTablePro.exportData({type:R.value,filename:O.value,useStyle:q.value})};let O=v("默认文件名"),R=v("csv"),q=v(!0);const B=[{value:"csv",label:"csv"},{value:"html",label:"html"},{value:"xml",label:"xml"},{value:"txt",label:"txt"}];return(e,n)=>{const p=a,c=t,b=m,v=f,S=o,D=s,A=i,F=d,G=r,H=u;return x(),h("div",w,[g("div",W,[g("div",E,[y(G,{inline:!0,class:"demo-form-inline"},{default:_((()=>[y(c,{label:"导出文件名称："},{default:_((()=>[y(p,{modelValue:V(O),"onUpdate:modelValue":n[0]||(n[0]=e=>C(O)?O.value=e:O=e),placeholder:"请输入文件名"},null,8,["modelValue"])])),_:1}),y(c,{label:"是否根据Table宽度导出："},{default:_((()=>[y(v,{modelValue:V(q),"onUpdate:modelValue":n[1]||(n[1]=e=>C(q)?q.value=e:q=e),class:"ml-4"},{default:_((()=>[y(b,{label:!0,size:"large"},{default:_((()=>[U("是")])),_:1}),y(b,{label:!1,size:"large"},{default:_((()=>[U("否")])),_:1})])),_:1},8,["modelValue"])])),_:1}),y(c,{label:"导出文件格式："},{default:_((()=>[y(D,{modelValue:V(R),"onUpdate:modelValue":n[2]||(n[2]=e=>C(R)?R.value=e:R=e),placeholder:"请选择文件格式"},{default:_((()=>[(x(),h(j,null,k(B,((e,l)=>y(S,{key:l,label:e.label,value:e.value},null,8,["label","value"]))),64))])),_:1},8,["modelValue"])])),_:1}),y(c,{label:""},{default:_((()=>[g("a",P,[y(A,{type:"info"},{default:_((()=>[U("Excel导出相关资料")])),_:1})])])),_:1}),y(c,null,{default:_((()=>[y(F,{style:{"margin-bottom":"10px"},onClick:L,type:"primary"},{default:_((()=>[U("导出Excel")])),_:1})])),_:1})])),_:1})]),g("div",I,[y(V(l),{option:V(z),ref_key:"xGrid",ref:T},{state:_((({slotProps:e})=>[y(H,{modelValue:e.row.Ustate,"onUpdate:modelValue":l=>e.row.Ustate=l,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"])])])])}}}),[["__scopeId","data-v-73611e8e"]]);export{S as default};
