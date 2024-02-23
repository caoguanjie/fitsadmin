import{Y as e,q as l,Z as a,$ as s,r as t,o,a0 as i,a1 as d,p as r,x as n,j as c,m as A,M as u,N as m,P as C,a2 as b,E as p,T as g,s as f,W as R,z as h,a3 as v,X as k}from"./index-dcdeddb6.js";import{c as y,a as x,b as U,m as w}from"./el-collapse-transition-bfb10df7.js";import{E,l as I,m as V,p as D,a as L,J as B,b as _,aF as Q,S as P,R as T,O as z,u as q,P as F,a7 as j,V as S,X as W,d as G,W as M,A as N,n as H,aC as O,aD as Y,_ as Z,$ as J,L as X}from"./vxetable-9ecf1980.js";import{b as K,a as $}from"./system-2d8a29a4.js";import{u as ee}from"./FitsTableProHook-a8ff2af7.js";import"./echarts-1215139a.js";const le=E({name:"Close"}),ae={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},se=[D("path",{fill:"currentColor",d:"M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"},null,-1)];var te=e(le,[["render",function(e,l,a,s,t,o){return I(),V("svg",ae,se)}]]);const oe=E({name:"UserFilled"}),ie={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},de=[D("path",{fill:"currentColor",d:"M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z"},null,-1)];var re=e(oe,[["render",function(e,l,a,s,t,o){return I(),V("svg",ie,de)}]]);const ne={class:"add-role"},ce={class:"add-content"},Ae={class:"add-bottom"},ue=c(E({__name:"addRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:c}){const A=e,u=L("default"),m=L();let C=B({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),b=B({Cname:"",Cdescribe:""}),p=L();_((()=>A.setData),(()=>{"addClass"==A.keys?b=Object.assign(b,A.setData):"addRole"==A.keys&&(C=Object.assign(C,A.setData))}),{immediate:!0,deep:!0}),_((()=>A.roleClass),(()=>{p.value=Q.clone(A.roleClass)}),{immediate:!0,deep:!0});const g=B({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:2,max:10,message:"长度请大于3，小于10",trigger:"blur"}]}),f=e=>{"cancle"!=e?m.value&&m.value.validate((e=>{if(!e)return l({message:"必填项未填写完整！",type:"warning"}),!1;if("addClass"==A.keys){let e=Q.clone(b);c("dataChange",e,A.keys)}else if("addRole"==A.keys){let e=Q.clone(C);c("dataChange",e,A.keys)}c("closeDialog","addRole")})):c("closeDialog","addRole")};return(e,l)=>{const c=a,R=s,h=t,v=o,k=i,y=d,x=r,U=n;return I(),V("div",ne,[D("div",ce,["addRole"==A.keys?(I(),P(x,{key:0,ref_key:"ruleFormRef",ref:m,model:q(C),rules:g,"label-width":"120px",class:"demo-ruleForm",size:u.value,"status-icon":""},{default:T((()=>[z(h,{label:"角色分类",prop:"Ucode"},{default:T((()=>[z(R,{style:{width:"100%"},modelValue:q(C).Ucode,"onUpdate:modelValue":l[0]||(l[0]=e=>q(C).Ucode=e),class:"m-2",placeholder:"请选择"},{default:T((()=>[(I(!0),V(F,null,j(q(p),((e,l)=>(I(),P(c,{key:l,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),z(h,{label:"角色名称",prop:"Uname"},{default:T((()=>[z(v,{modelValue:q(C).Uname,"onUpdate:modelValue":l[1]||(l[1]=e=>q(C).Uname=e)},null,8,["modelValue"])])),_:1}),z(h,{label:"角色描述",prop:"Udescribe"},{default:T((()=>[z(v,{modelValue:q(C).Udescribe,"onUpdate:modelValue":l[2]||(l[2]=e=>q(C).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),z(h,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:T((()=>[z(y,{modelValue:q(C).Ustate,"onUpdate:modelValue":l[3]||(l[3]=e=>q(C).Ustate=e),class:"ml-4"},{default:T((()=>[z(k,{label:!0,size:"large"},{default:T((()=>[S("启用")])),_:1}),z(k,{label:!1,size:"large"},{default:T((()=>[S("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"addClass"==A.keys?(I(),P(x,{key:1,ref_key:"ruleFormRef",ref:m,model:q(b),rules:g,"label-width":"120px",class:"demo-classyForm",size:u.value,"status-icon":""},{default:T((()=>[z(h,{label:"角色分类",prop:"Cname"},{default:T((()=>[z(v,{modelValue:q(b).Cname,"onUpdate:modelValue":l[4]||(l[4]=e=>q(b).Cname=e)},null,8,["modelValue"])])),_:1}),z(h,{label:"分类描述",prop:"Cdescribe"},{default:T((()=>[z(v,{modelValue:q(b).Cdescribe,"onUpdate:modelValue":l[5]||(l[5]=e=>q(b).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):W("",!0)]),D("div",Ae,[z(U,{class:"add-button",size:"large",onClick:l[6]||(l[6]=e=>f("cancle"))},{default:T((()=>[S("取消")])),_:1}),z(U,{class:"add-button",type:"primary",size:"large",onClick:l[7]||(l[7]=e=>f("submit"))},{default:T((()=>[S("确定 ")])),_:1})])])}}}),[["__scopeId","data-v-d6addead"]]),me={class:"edit-role"},Ce={class:"edit-content"},be={class:"edit-bottom"},pe=c(E({__name:"editRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:c}){const A=e,u=L("default"),m=L();let C=B({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),b=B({Cname:"",Cdescribe:""});const p=L(),g=B({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:3,max:10,message:"长度请大于3，小于10",trigger:"blur"}]});_((()=>A.setData),(()=>{"editClass"==A.keys?b=Object.assign(b,A.setData):"editRole"==A.keys&&(C=Object.assign(C,A.setData))}),{immediate:!0,deep:!0}),_((()=>A.roleClass),(()=>{p.value=Q.clone(A.roleClass)}),{immediate:!0,deep:!0});const f=e=>{"cancle"!=e?m.value&&m.value.validate((e=>{if(!e)return l({message:"必填项未填写完整！",type:"warning"}),!1;if("editClass"==A.keys){let e={Cname:b.Cname,Cdescribe:b.Cdescribe};c("dataChange",e,A.keys)}else A.keys;c("closeDialog","addRole")})):c("closeDialog","addRole")};return(e,l)=>{const c=a,R=s,h=t,v=o,k=i,y=d,x=r,U=n;return I(),V("div",me,[D("div",Ce,["editRole"==A.keys?(I(),P(x,{key:0,ref_key:"ruleFormRef",ref:m,model:q(C),rules:g,"label-width":"120px",class:"demo-ruleForm",size:u.value,"status-icon":""},{default:T((()=>[z(h,{label:"角色分类",prop:"Ucode"},{default:T((()=>[z(R,{style:{width:"100%"},modelValue:q(C).Ucode,"onUpdate:modelValue":l[0]||(l[0]=e=>q(C).Ucode=e),class:"m-2",placeholder:"请选择"},{default:T((()=>[(I(!0),V(F,null,j(p.value,((e,l)=>(I(),P(c,{key:l,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),z(h,{label:"角色名称",prop:"Uname"},{default:T((()=>[z(v,{modelValue:q(C).Uname,"onUpdate:modelValue":l[1]||(l[1]=e=>q(C).Uname=e)},null,8,["modelValue"])])),_:1}),z(h,{label:"角色描述",prop:"Udescribe"},{default:T((()=>[z(v,{modelValue:q(C).Udescribe,"onUpdate:modelValue":l[2]||(l[2]=e=>q(C).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),z(h,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:T((()=>[z(y,{modelValue:q(C).Ustate,"onUpdate:modelValue":l[3]||(l[3]=e=>q(C).Ustate=e),class:"ml-4"},{default:T((()=>[z(k,{label:!0,size:"large"},{default:T((()=>[S("启用")])),_:1}),z(k,{label:!1,size:"large"},{default:T((()=>[S("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"editClass"==A.keys?(I(),P(x,{key:1,ref_key:"ruleFormRef",ref:m,model:q(b),rules:g,"label-width":"120px",class:"demo-classyForm",size:u.value,"status-icon":""},{default:T((()=>[z(h,{label:"角色分类",prop:"Cname"},{default:T((()=>[z(v,{modelValue:q(b).Cname,"onUpdate:modelValue":l[4]||(l[4]=e=>q(b).Cname=e)},null,8,["modelValue"])])),_:1}),z(h,{label:"分类描述",prop:"Cdescribe"},{default:T((()=>[z(v,{modelValue:q(b).Cdescribe,"onUpdate:modelValue":l[5]||(l[5]=e=>q(b).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):W("",!0)]),D("div",be,[z(U,{class:"edit-button",size:"large",onClick:l[6]||(l[6]=e=>f("cancle"))},{default:T((()=>[S("取消")])),_:1}),z(U,{class:"edit-button",type:"primary",size:"large",onClick:l[7]||(l[7]=e=>f("submit"))},{default:T((()=>[S("确定")])),_:1})])])}}}),[["__scopeId","data-v-e8f02648"]]),ge={class:"relate-role"},fe={class:"relate-content"},Re={class:"relateLeft"},he={class:"leftTree"},ve={class:"search"},ke={class:"contain"},ye={class:"treeItem",style:{display:"flex","align-items":"flex-end"}},xe={key:0,class:"parentItem",style:{"padding-right":"4px"}},Ue={class:"leftTable"},we={class:"scrollContent"},Ee={class:"tableContent"},Ie={class:"tableBottom"},Ve={key:0},De={key:1},Le={class:"tableBottomContent"},Be={class:"relateRight"},_e=(e=>(O("data-v-e1ec66d4"),e=e(),Y(),e))((()=>D("div",{class:"title"},"分配角色",-1))),Qe={class:"search"},Pe={class:"contain"},Te={class:"relate-bottom"},ze=c(E({__name:"relateRole",emits:["closeDialog"],setup(e,{emit:l}){let a={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/fitsadmin/vite-vue3/assets/yingyerenyuan-8e601937.png",self.location).href};const s={children:"children",label:"label"},{user:t}=A(),i=L(),d=e=>{l("closeDialog","relateRole")},r={keepSource:!0,showOverflow:!1,id:"toolbar_demo_1",height:450,rowConfig:{height:40},storage:{enabled:!0,key:"relateRoleList",dataBase:t.userInfo.id},formConfig:{items:[{field:"keyword",title:"",itemRender:{name:"ElInput",props:{placeholder:"搜索用户"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",width:50},{field:"Indexes",title:"序号",type:"seq",width:100},{field:"Uname",title:"角色名称",minWidth:130,treeNode:!0},{field:"Ucode",title:"角色编码",minWidth:100},{field:"Udescribe",title:"角色描述",minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{K(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:Q.toTreeArray(a.TableList,{clear:!0}),page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:c}=ee(r,i);G((async()=>{const e=await $();R.value=e.ReturnData.TableList}));const R=L(),h=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"工作人员"},{id:5,label:"开发人员"},{id:6,label:"测试人员"}],v=L(null),k=[];let y=L(!1);const x=L(),U=()=>{y.value?h.forEach((e=>{x.value.setChecked(e,!0,!0)})):x.value.setCheckedNodes([])},w=(e,l,a)=>{let s=0;k.forEach(((e,l)=>{x.value.getNode(e).checked?(s++,s==k.length-1&&(s=0,y.value=!0)):(s=0,y.value=!1)}))},E=()=>{let e=i.value.fitsTablePro.getCheckboxRecords(!0);v.value=[],e.forEach(((e,l)=>{let a={name:e.Uname,data:e};v.value.push(a)}))},B=()=>{H((()=>{i.value.fitsTablePro.commitProxy("query")}))};return(e,l)=>{const t=o,r=b,A=p,k=g,L=f,_=n;return I(),V("div",ge,[D("div",fe,[D("div",Re,[D("div",he,[D("div",ve,[z(t,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":q(u)},null,8,["prefix-icon"])]),D("div",ke,[z(k,{height:"480px"},{default:T((()=>[z(q(m),{ref_key:"treeRef",ref:x,data:R.value,"default-expand-all":"","node-key":"id","highlight-current":"",props:s,onCheckChange:w},{default:T((e=>[D("div",ye,["children"in e.data?(I(),V("div",xe,[z(A,null,{default:T((()=>[z(r,{style:{width:"100%",height:"100%"},src:q(a).img1},null,8,["src"])])),_:1}),S(" "+M(e.data.name),1)])):(I(),V("div",{key:1,class:"ChildItem",style:{"padding-right":"4px"},onClick:B},[z(A,null,{default:T((()=>[z(r,{style:{width:"100%",height:"100%"},src:q(a).img2},null,8,["src"])])),_:1}),S(" "+M(e.data.name),1)]))])])),_:1},8,["data"])])),_:1})])]),D("div",Ue,[D("div",we,[D("div",Ee,[z(q(C),{option:q(c),ref_key:"xGrid",ref:i,onCheckboxChange:E,onCheckboxAll:E},null,8,["option"])]),z(k,{height:"150px"},{default:T((()=>[D("div",Ie,[v.value?(I(),V("div",De,"已选用户:"+M(v.value.length)+"人",1)):(I(),V("div",Ve,"已选用户:0人")),D("div",Le,[(I(!0),V(F,null,j(v.value,((e,l)=>(I(),V("div",{class:"contentItem",key:l},[D("span",null,M(e.name),1),z(A,null,{default:T((()=>[z(q(te),{style:{cursor:"pointer"},onClick:e=>(e=>{i.value.fitsTablePro.setCheckboxRow(v.value[e].data,!1),v.value.splice(e,1)})(l)},null,8,["onClick"])])),_:2},1024)])))),128))])])])),_:1})])])]),D("div",Be,[_e,D("div",Qe,[z(t,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":q(u)},null,8,["prefix-icon"])]),D("div",Pe,[z(L,{label:"全选",size:"large",modelValue:q(y),"onUpdate:modelValue":l[0]||(l[0]=e=>N(y)?y.value=e:y=e),onChange:U},null,8,["modelValue"]),z(k,{height:"480px"},{default:T((()=>[z(q(m),{ref_key:"treeRef",ref:x,data:h,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:s,onCheckChange:w},null,512)])),_:1})])])]),D("div",Te,[z(_,{class:"relate-button",onClick:l[1]||(l[1]=e=>d()),size:"large"},{default:T((()=>[S("取消")])),_:1}),z(_,{class:"relate-button",type:"primary",onClick:l[2]||(l[2]=e=>d()),size:"large"},{default:T((()=>[S("提交")])),_:1})])])}}}),[["__scopeId","data-v-e1ec66d4"]]),qe={class:"role-manage"},Fe={class:"role-left"},je={class:"left-classification"},Se={class:"top"},We={div:"",class:"bottom"},Ge={class:"title"},Me={class:"custom-tree-node"},Ne={class:"text"},He={class:"textContent"},Oe={class:"btn"},Ye={class:"btn"},Ze={class:"left-contain"},Je=["onClick"],Xe=["onClick"],Ke=["onClick"],$e={class:"role-right"},el=(e=>(O("data-v-ac7c713b"),e=e(),Y(),e))((()=>D("div",{class:"title"},"菜单权限管理列表",-1))),ll={class:"search"},al={class:"contain"},sl=E({name:"Roles"}),tl=c(E({...sl,setup(e){const a={children:"children",label:"label"},{user:s}=A(),t=L(),i=B({operateRole:{visible:!1,key:"",data:{},props:{title:"",width:"40%"}},baseRole:{dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}},relateRole:{dialogText:"关联用户",key:"",visible:!1,props:{title:"关联用户",width:"75%"}}}),d=e=>{l({message:e,type:"warning"})};let r=L(!0);const c=()=>{r.value=!r.value},b={async toolbarButtonClick({code:e}){let l=t.value.fitsTablePro.getCheckboxRecords();switch(e){case"addRole":{i.operateRole.props.title="新增角色",i.operateRole.visible=!0,i.operateRole.key="addRole";let e={Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""};i.operateRole.data=e;break}case"RoleRelation":i.relateRole.visible=!0;break;case"RoleUse":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定启用选中的用户？",i.baseRole.key="RoleUse"):d("请选择至少一个角色！");break;case"Roledisable":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定禁用选中的用户？",i.baseRole.key="Roledisable"):d("请选择至少一个角色！");break;case"RoleyExport":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定导出选中的用户？",i.baseRole.key="RoleyExport"):d("请选择至少一个角色！");break;case"Roleremove":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除选中的用户？",i.baseRole.key="Roleremove"):d("请选择至少一个角色！")}}},E={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"SystemManageRoleList",dataBase:s.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"角色名称",itemRender:{name:"ElInput",props:{placeholder:"请输入角色名称"}}},{field:"code",span:3,title:"角色编码",itemRender:{name:"ElInput",props:{placeholder:"请输入角色编码"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100},{field:"Operation",title:"操作",width:200,fixed:"right",slots:{default:"operate"},contentRender:{name:"TableOpeate"}}],toolbarConfig:{buttons:[{code:"addRole",name:"新增角色",status:"primary"},{code:"RoleRelation",name:"关联用户"},{code:"RoleUse",name:"启用"},{code:"Roledisable",name:"禁用"},{code:"RoleyExport",name:"导出"},{code:"Roleremove",name:"批量删除"}],tools:{enabled:!0}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{K(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:a.TableList,page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:_}=ee(E,t),Q=L([{Cname:"后勤",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""}]);let F=L(!1);const j=L(),O=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"服务人员"},{id:5,label:"服务人员"},{id:6,label:"服务人员"}],Y=[];G((()=>{H((()=>{})),setTimeout((()=>{}),2e3),O.forEach((e=>{ae(e)}))}));const $=()=>{F.value?O.forEach((e=>{j.value.setChecked(e,!0,!0)})):j.value.setCheckedNodes([])},le=(e,l,a)=>{let s=0;Y.forEach(((e,l)=>{j.value.getNode(e).checked?(s++,s==Y.length-1&&(s=0,F.value=!0)):(s=0,F.value=!1)}))},ae=e=>("children"in e&&e.children.forEach((e=>ae(e))),Y.push(e.id),e.id),se=e=>{switch(e){case"addRole":i.operateRole.visible=!1;break;case"baseRole":i.baseRole.visible=!1;break;case"relateRole":i.relateRole.visible=!1}},te=(e,l)=>{"addClass"==i.operateRole.key?e.Cname&&(Q.value.push(e),e=[]):"addRole"==i.operateRole.key||i.operateRole.key},oe=(e,l)=>{"editRole"==l?(i.operateRole.visible=!0,i.operateRole.props.title="编辑角色",i.operateRole.key="editRole",i.operateRole.data=e):"relaRole"==l?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定关联选中的用户？",i.baseRole.key="relaRole"):"deleteRole"==l&&(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除选中的用户？",i.baseRole.key="deleteRole")},ie=()=>{i.operateRole.props.title="新增角色分类",i.operateRole.visible=!0,i.operateRole.key="addClass";i.operateRole.data={Cname:"",Cdescribe:""}},de=(e,l)=>{"delete"==l?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除？",i.baseRole.key="deleteClass"):"editClass"==l&&(i.operateRole.visible=!0,i.operateRole.props.title="编辑角色分类",i.operateRole.key="editClass",i.operateRole.data=e)},ne=()=>{let e=t.value.fitsTablePro.getCheckboxRecords(!0),l=j.value.getCheckedNodes();e.length?l.length||d("请选择至少一个权限进行分配！"):d("请选择至少一个角色！")},ce=()=>{H((()=>{t.value.fitsTablePro.commitProxy("query")}))};return(e,l)=>{const s=o,d=p,A=n,E=h,L=g,B=v,G=k,H=f;return I(),V("div",qe,[D("div",Fe,[D("div",je,[D("div",Se,[z(s,{class:"searchBox",placeholder:"搜索角色分类","prefix-icon":q(u)},null,8,["prefix-icon"]),z(d,{style:{cursor:"pointer"}},{default:T((()=>[z(q(y),{color:"#007dff",onClick:ie})])),_:1})]),D("div",We,[D("div",Ge,[Z(z(d,{onClick:c,color:"#909399",style:{"margin-right":"8px"}},{default:T((()=>[z(q(x))])),_:1},512),[[J,!q(r)]]),Z(z(d,{onClick:c,color:"#909399",style:{"margin-right":"8px"}},{default:T((()=>[z(q(U))])),_:1},512),[[J,q(r)]]),S(" 角色管理 ")]),z(B,null,{default:T((()=>[Z(D("div",null,[z(L,{class:"treeScrollbar"},{default:T((()=>[z(q(m),{data:Q.value,"node-key":"id","default-expand-all":"","expand-on-click-node":!1},{default:T((({data:e})=>[D("span",Me,[D("div",Ne,[D("div",{class:"textLeft",onClick:ce},[z(d,null,{default:T((()=>[z(q(re),{color:"#007DFF"})])),_:1}),D("div",He,[D("span",null,M(e.Cname),1)])]),z(d,{class:"moreButton"},{default:T((()=>[z(E,{placement:"bottom",title:"",trigger:"click","popper-class":"Role-popover","hide-after":0},{reference:T((()=>[z(q(w),{color:"#999999"})])),default:T((()=>[D("div",Oe,[z(A,{onClick:l=>de(e,"editClass")},{default:T((()=>[S("编辑 ")])),_:2},1032,["onClick"])]),D("div",Ye,[z(A,{onClick:l=>de(e,"delete")},{default:T((()=>[S(" 删除 ")])),_:2},1032,["onClick"])])])),_:2},1024)])),_:2},1024)])])])),_:1},8,["data"])])),_:1})],512),[[J,q(r)]])])),_:1})])]),D("div",Ze,[z(q(C),{option:q(_),ref_key:"xGrid",ref:t,"grid-events":b},{operate:T((({slotProps:e})=>[D("span",{class:"FromButton underline",onClick:l=>oe(e.row,"editRole")},"编辑",8,Je),D("span",{class:"FromButton delete",onClick:l=>oe(e.row,"deleteRole")},"删除",8,Xe),D("span",{class:"FromButton",onClick:l=>oe(e.row,"relaRole")},"关联用户",8,Ke)])),state:T((({slotProps:e})=>[z(G,{modelValue:e.row.Ustate,"onUpdate:modelValue":l=>e.row.Ustate=l,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"])])]),D("div",$e,[z(L,{height:"calc(100vh-200px)"},{default:T((()=>[el,D("div",ll,[z(s,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":q(u)},null,8,["prefix-icon"]),z(A,{class:"Savebotton",onClick:ne},{default:T((()=>[S("保存")])),_:1})]),D("div",al,[z(H,{label:"全选",size:"large",modelValue:q(F),"onUpdate:modelValue":l[0]||(l[0]=e=>N(F)?F.value=e:F=e),onChange:$},null,8,["modelValue"]),z(q(m),{ref_key:"treeRef",ref:j,data:O,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:a,onCheckChange:le},null,512)])])),_:1})]),z(q(R),{class:X("onfooter"),visible:q(i).operateRole.visible,dialogProp:q(i).operateRole.props,onCancel:l[1]||(l[1]=e=>se("addRole")),showFooter:!1},{default:T((()=>["addRole"==q(i).operateRole.key||"addClass"==q(i).operateRole.key?(I(),P(ue,{key:0,onDataChange:te,keys:q(i).operateRole.key,setData:q(i).operateRole.data,onCloseDialog:se,roleClass:Q.value},null,8,["keys","setData","roleClass"])):W("",!0),"editRole"==q(i).operateRole.key||"editClass"==q(i).operateRole.key?(I(),P(pe,{key:1,onDataChange:te,keys:q(i).operateRole.key,setData:q(i).operateRole.data,onCloseDialog:se,roleClass:Q.value},null,8,["keys","setData","roleClass"])):W("",!0)])),_:1},8,["visible","dialogProp"]),z(q(R),{class:X("Roles-baseDialog"),visible:q(i).baseRole.visible,dialogProp:q(i).baseRole.props,onCancel:l[2]||(l[2]=e=>se("baseRole")),onSubmit:l[3]||(l[3]=e=>(e=>{let l=t.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"RoleUse":l.forEach(((e,l)=>{e.Ustate=!0}));break;case"RoleRelation":case"RoleyExport":case"Roleremove":case"RoleClassRemove":break;case"Roledisable":l.forEach(((e,l)=>{e.Ustate=!1}));break;case"addClass":case"addRole":case"editClass":case"deleteClass":case"editRole":se("operateRole")}se("baseRole")})(q(i).baseRole.key))},{default:T((()=>[S(M(q(i).baseRole.dialogText),1)])),_:1},8,["visible","dialogProp"]),z(q(R),{class:X("Roles-relateDialog onfooter"),visible:q(i).relateRole.visible,dialogProp:q(i).relateRole.props,showFooter:!1,onCancel:l[4]||(l[4]=e=>q(i).relateRole.visible=!1)},{default:T((()=>[z(ze,{onCloseDialog:se})])),_:1},8,["visible","dialogProp"])])}}}),[["__scopeId","data-v-ac7c713b"]]);export{tl as default};
