import{X as e,q as l,Y as a,Z as s,s as t,o,p as i,y as d,j as r,m as n,L as c,M as A,O as u,$ as m,E as C,Q as b,x as p,V as g,A as f,a0 as R,W as h}from"./index-d9adfae8.js";import{c as v,a as k,b as y,m as x}from"./el-collapse-transition-84584fa8.js";import{E as U,l as w,m as E,p as I,a as V,J as D,b as L,aC as B,S as Q,R as _,O as P,u as T,P as z,aj as q,V as F,X as j,d as S,W,A as G,n as M,az as N,aA as O,_ as H,$ as Y,L as Z}from"./vxetable-cac80a8e.js";import{b as J,a as X}from"./system-22773ace.js";import{u as K}from"./FitsTableProHook-ed71dee9.js";import{E as $,a as ee}from"./el-radio-564df19f.js";import"./echarts-1215139a.js";const le=U({name:"Close"}),ae={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},se=[I("path",{fill:"currentColor",d:"M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"},null,-1)];var te=e(le,[["render",function(e,l,a,s,t,o){return w(),E("svg",ae,se)}]]);const oe=U({name:"UserFilled"}),ie={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},de=[I("path",{fill:"currentColor",d:"M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z"},null,-1)];var re=e(oe,[["render",function(e,l,a,s,t,o){return w(),E("svg",ie,de)}]]);const ne={class:"add-role"},ce={class:"add-content"},Ae={class:"add-bottom"},ue=r(U({__name:"addRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:r}){const n=e,c=V("default"),A=V();let u=D({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),m=D({Cname:"",Cdescribe:""}),C=V();L((()=>n.setData),(()=>{"addClass"==n.keys?m=Object.assign(m,n.setData):"addRole"==n.keys&&(u=Object.assign(u,n.setData))}),{immediate:!0,deep:!0}),L((()=>n.roleClass),(()=>{C.value=B.clone(n.roleClass)}),{immediate:!0,deep:!0});const b=D({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:2,max:10,message:"长度请大于3，小于10",trigger:"blur"}]}),p=e=>{"cancle"!=e?A.value&&A.value.validate((e=>{if(!e)return l({message:"必填项未填写完整！",type:"warning"}),!1;if("addClass"==n.keys){let e=B.clone(m);r("dataChange",e,n.keys)}else if("addRole"==n.keys){let e=B.clone(u);r("dataChange",e,n.keys)}r("closeDialog","addRole")})):r("closeDialog","addRole")};return(e,l)=>{const r=a,g=s,f=t,R=o,h=$,v=ee,k=i,y=d;return w(),E("div",ne,[I("div",ce,["addRole"==n.keys?(w(),Q(k,{key:0,ref_key:"ruleFormRef",ref:A,model:T(u),rules:b,"label-width":"120px",class:"demo-ruleForm",size:c.value,"status-icon":""},{default:_((()=>[P(f,{label:"角色分类",prop:"Ucode"},{default:_((()=>[P(g,{style:{width:"100%"},modelValue:T(u).Ucode,"onUpdate:modelValue":l[0]||(l[0]=e=>T(u).Ucode=e),class:"m-2",placeholder:"请选择"},{default:_((()=>[(w(!0),E(z,null,q(T(C),((e,l)=>(w(),Q(r,{key:l,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),P(f,{label:"角色名称",prop:"Uname"},{default:_((()=>[P(R,{modelValue:T(u).Uname,"onUpdate:modelValue":l[1]||(l[1]=e=>T(u).Uname=e)},null,8,["modelValue"])])),_:1}),P(f,{label:"角色描述",prop:"Udescribe"},{default:_((()=>[P(R,{modelValue:T(u).Udescribe,"onUpdate:modelValue":l[2]||(l[2]=e=>T(u).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),P(f,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:_((()=>[P(v,{modelValue:T(u).Ustate,"onUpdate:modelValue":l[3]||(l[3]=e=>T(u).Ustate=e),class:"ml-4"},{default:_((()=>[P(h,{label:!0,size:"large"},{default:_((()=>[F("启用")])),_:1}),P(h,{label:!1,size:"large"},{default:_((()=>[F("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"addClass"==n.keys?(w(),Q(k,{key:1,ref_key:"ruleFormRef",ref:A,model:T(m),rules:b,"label-width":"120px",class:"demo-classyForm",size:c.value,"status-icon":""},{default:_((()=>[P(f,{label:"角色分类",prop:"Cname"},{default:_((()=>[P(R,{modelValue:T(m).Cname,"onUpdate:modelValue":l[4]||(l[4]=e=>T(m).Cname=e)},null,8,["modelValue"])])),_:1}),P(f,{label:"分类描述",prop:"Cdescribe"},{default:_((()=>[P(R,{modelValue:T(m).Cdescribe,"onUpdate:modelValue":l[5]||(l[5]=e=>T(m).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):j("",!0)]),I("div",Ae,[P(y,{class:"add-button",size:"large",onClick:l[6]||(l[6]=e=>p("cancle"))},{default:_((()=>[F("取消")])),_:1}),P(y,{class:"add-button",type:"primary",size:"large",onClick:l[7]||(l[7]=e=>p("submit"))},{default:_((()=>[F("确定 ")])),_:1})])])}}}),[["__scopeId","data-v-d6addead"]]),me={class:"edit-role"},Ce={class:"edit-content"},be={class:"edit-bottom"},pe=r(U({__name:"editRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:r}){const n=e,c=V("default"),A=V();let u=D({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),m=D({Cname:"",Cdescribe:""});const C=V(),b=D({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:3,max:10,message:"长度请大于3，小于10",trigger:"blur"}]});L((()=>n.setData),(()=>{"editClass"==n.keys?m=Object.assign(m,n.setData):"editRole"==n.keys&&(u=Object.assign(u,n.setData))}),{immediate:!0,deep:!0}),L((()=>n.roleClass),(()=>{C.value=B.clone(n.roleClass)}),{immediate:!0,deep:!0});const p=e=>{"cancle"!=e?A.value&&A.value.validate((e=>{if(!e)return l({message:"必填项未填写完整！",type:"warning"}),!1;if("editClass"==n.keys){let e={Cname:m.Cname,Cdescribe:m.Cdescribe};r("dataChange",e,n.keys)}else n.keys;r("closeDialog","addRole")})):r("closeDialog","addRole")};return(e,l)=>{const r=a,g=s,f=t,R=o,h=$,v=ee,k=i,y=d;return w(),E("div",me,[I("div",Ce,["editRole"==n.keys?(w(),Q(k,{key:0,ref_key:"ruleFormRef",ref:A,model:T(u),rules:b,"label-width":"120px",class:"demo-ruleForm",size:c.value,"status-icon":""},{default:_((()=>[P(f,{label:"角色分类",prop:"Ucode"},{default:_((()=>[P(g,{style:{width:"100%"},modelValue:T(u).Ucode,"onUpdate:modelValue":l[0]||(l[0]=e=>T(u).Ucode=e),class:"m-2",placeholder:"请选择"},{default:_((()=>[(w(!0),E(z,null,q(C.value,((e,l)=>(w(),Q(r,{key:l,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),P(f,{label:"角色名称",prop:"Uname"},{default:_((()=>[P(R,{modelValue:T(u).Uname,"onUpdate:modelValue":l[1]||(l[1]=e=>T(u).Uname=e)},null,8,["modelValue"])])),_:1}),P(f,{label:"角色描述",prop:"Udescribe"},{default:_((()=>[P(R,{modelValue:T(u).Udescribe,"onUpdate:modelValue":l[2]||(l[2]=e=>T(u).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),P(f,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:_((()=>[P(v,{modelValue:T(u).Ustate,"onUpdate:modelValue":l[3]||(l[3]=e=>T(u).Ustate=e),class:"ml-4"},{default:_((()=>[P(h,{label:!0,size:"large"},{default:_((()=>[F("启用")])),_:1}),P(h,{label:!1,size:"large"},{default:_((()=>[F("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"editClass"==n.keys?(w(),Q(k,{key:1,ref_key:"ruleFormRef",ref:A,model:T(m),rules:b,"label-width":"120px",class:"demo-classyForm",size:c.value,"status-icon":""},{default:_((()=>[P(f,{label:"角色分类",prop:"Cname"},{default:_((()=>[P(R,{modelValue:T(m).Cname,"onUpdate:modelValue":l[4]||(l[4]=e=>T(m).Cname=e)},null,8,["modelValue"])])),_:1}),P(f,{label:"分类描述",prop:"Cdescribe"},{default:_((()=>[P(R,{modelValue:T(m).Cdescribe,"onUpdate:modelValue":l[5]||(l[5]=e=>T(m).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):j("",!0)]),I("div",be,[P(y,{class:"edit-button",size:"large",onClick:l[6]||(l[6]=e=>p("cancle"))},{default:_((()=>[F("取消")])),_:1}),P(y,{class:"edit-button",type:"primary",size:"large",onClick:l[7]||(l[7]=e=>p("submit"))},{default:_((()=>[F("确定")])),_:1})])])}}}),[["__scopeId","data-v-e8f02648"]]),ge={class:"relate-role"},fe={class:"relate-content"},Re={class:"relateLeft"},he={class:"leftTree"},ve={class:"search"},ke={class:"contain"},ye={class:"treeItem",style:{display:"flex","align-items":"flex-end"}},xe={key:0,class:"parentItem",style:{"padding-right":"4px"}},Ue={class:"leftTable"},we={class:"scrollContent"},Ee={class:"tableContent"},Ie={class:"tableBottom"},Ve={key:0},De={key:1},Le={class:"tableBottomContent"},Be={class:"relateRight"},Qe=(e=>(N("data-v-e1ec66d4"),e=e(),O(),e))((()=>I("div",{class:"title"},"分配角色",-1))),_e={class:"search"},Pe={class:"contain"},Te={class:"relate-bottom"},ze=r(U({__name:"relateRole",emits:["closeDialog"],setup(e,{emit:l}){let a={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/fitsadmin/assets/yingyerenyuan-8e601937.png",self.location).href};const s={children:"children",label:"label"},{user:t}=n(),i=V(),r=e=>{l("closeDialog","relateRole")},g={keepSource:!0,showOverflow:!1,id:"toolbar_demo_1",height:450,rowConfig:{height:40},storage:{enabled:!0,key:"relateRoleList",dataBase:t.userInfo.id},formConfig:{items:[{field:"keyword",title:"",itemRender:{name:"ElInput",props:{placeholder:"搜索用户"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",width:50},{field:"Indexes",title:"序号",type:"seq",width:100},{field:"Uname",title:"角色名称",minWidth:130,treeNode:!0},{field:"Ucode",title:"角色编码",minWidth:100},{field:"Udescribe",title:"角色描述",minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{J(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:B.toTreeArray(a.TableList,{clear:!0}),page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:f}=K(g,i);S((async()=>{const e=await X();R.value=e.ReturnData.TableList}));const R=V(),h=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"工作人员"},{id:5,label:"开发人员"},{id:6,label:"测试人员"}],v=V(null),k=[];let y=V(!1);const x=V(),U=()=>{y.value?h.forEach((e=>{x.value.setChecked(e,!0,!0)})):x.value.setCheckedNodes([])},D=(e,l,a)=>{let s=0;k.forEach(((e,l)=>{x.value.getNode(e).checked?(s++,s==k.length-1&&(s=0,y.value=!0)):(s=0,y.value=!1)}))},L=()=>{let e=i.value.fitsTablePro.getCheckboxRecords(!0);v.value=[],e.forEach(((e,l)=>{let a={name:e.Uname,data:e};v.value.push(a)}))},Q=()=>{M((()=>{i.value.fitsTablePro.commitProxy("query")}))};return(e,l)=>{const t=o,n=m,g=C,k=b,V=p,B=d;return w(),E("div",ge,[I("div",fe,[I("div",Re,[I("div",he,[I("div",ve,[P(t,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":T(c)},null,8,["prefix-icon"])]),I("div",ke,[P(k,{height:"480px"},{default:_((()=>[P(T(A),{ref_key:"treeRef",ref:x,data:R.value,"default-expand-all":"","node-key":"id","highlight-current":"",props:s,onCheckChange:D},{default:_((e=>[I("div",ye,["children"in e.data?(w(),E("div",xe,[P(g,null,{default:_((()=>[P(n,{style:{width:"100%",height:"100%"},src:T(a).img1},null,8,["src"])])),_:1}),F(" "+W(e.data.name),1)])):(w(),E("div",{key:1,class:"ChildItem",style:{"padding-right":"4px"},onClick:Q},[P(g,null,{default:_((()=>[P(n,{style:{width:"100%",height:"100%"},src:T(a).img2},null,8,["src"])])),_:1}),F(" "+W(e.data.name),1)]))])])),_:1},8,["data"])])),_:1})])]),I("div",Ue,[I("div",we,[I("div",Ee,[P(T(u),{option:T(f),ref_key:"xGrid",ref:i,onCheckboxChange:L,onCheckboxAll:L},null,8,["option"])]),P(k,{height:"150px"},{default:_((()=>[I("div",Ie,[v.value?(w(),E("div",De,"已选用户:"+W(v.value.length)+"人",1)):(w(),E("div",Ve,"已选用户:0人")),I("div",Le,[(w(!0),E(z,null,q(v.value,((e,l)=>(w(),E("div",{class:"contentItem",key:l},[I("span",null,W(e.name),1),P(g,null,{default:_((()=>[P(T(te),{style:{cursor:"pointer"},onClick:e=>(e=>{i.value.fitsTablePro.setCheckboxRow(v.value[e].data,!1),v.value.splice(e,1)})(l)},null,8,["onClick"])])),_:2},1024)])))),128))])])])),_:1})])])]),I("div",Be,[Qe,I("div",_e,[P(t,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":T(c)},null,8,["prefix-icon"])]),I("div",Pe,[P(V,{label:"全选",size:"large",modelValue:T(y),"onUpdate:modelValue":l[0]||(l[0]=e=>G(y)?y.value=e:y=e),onChange:U},null,8,["modelValue"]),P(k,{height:"480px"},{default:_((()=>[P(T(A),{ref_key:"treeRef",ref:x,data:h,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:s,onCheckChange:D},null,512)])),_:1})])])]),I("div",Te,[P(B,{class:"relate-button",onClick:l[1]||(l[1]=e=>r()),size:"large"},{default:_((()=>[F("取消")])),_:1}),P(B,{class:"relate-button",type:"primary",onClick:l[2]||(l[2]=e=>r()),size:"large"},{default:_((()=>[F("提交")])),_:1})])])}}}),[["__scopeId","data-v-e1ec66d4"]]),qe={class:"role-manage"},Fe={class:"role-left"},je={class:"left-classification"},Se={class:"top"},We={div:"",class:"bottom"},Ge={class:"title"},Me={class:"custom-tree-node"},Ne={class:"text"},Oe={class:"textContent"},He={class:"btn"},Ye={class:"btn"},Ze={class:"left-contain"},Je=["onClick"],Xe=["onClick"],Ke=["onClick"],$e={class:"role-right"},el=(e=>(N("data-v-ac7c713b"),e=e(),O(),e))((()=>I("div",{class:"title"},"菜单权限管理列表",-1))),ll={class:"search"},al={class:"contain"},sl=U({name:"Roles"}),tl=r(U({...sl,setup(e){const a={children:"children",label:"label"},{user:s}=n(),t=V(),i=D({operateRole:{visible:!1,key:"",data:{},props:{title:"",width:"40%"}},baseRole:{dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}},relateRole:{dialogText:"关联用户",key:"",visible:!1,props:{title:"关联用户",width:"75%"}}}),r=e=>{l({message:e,type:"warning"})};let m=V(!0);const U=()=>{m.value=!m.value},L={async toolbarButtonClick({code:e}){let l=t.value.fitsTablePro.getCheckboxRecords();switch(e){case"addRole":{i.operateRole.props.title="新增角色",i.operateRole.visible=!0,i.operateRole.key="addRole";let e={Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""};i.operateRole.data=e;break}case"RoleRelation":i.relateRole.visible=!0;break;case"RoleUse":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定启用选中的用户？",i.baseRole.key="RoleUse"):r("请选择至少一个角色！");break;case"Roledisable":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定禁用选中的用户？",i.baseRole.key="Roledisable"):r("请选择至少一个角色！");break;case"RoleyExport":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定导出选中的用户？",i.baseRole.key="RoleyExport"):r("请选择至少一个角色！");break;case"Roleremove":l.length?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除选中的用户？",i.baseRole.key="Roleremove"):r("请选择至少一个角色！")}}},B={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"SystemManageRoleList",dataBase:s.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"角色名称",itemRender:{name:"ElInput",props:{placeholder:"请输入角色名称"}}},{field:"code",span:3,title:"角色编码",itemRender:{name:"ElInput",props:{placeholder:"请输入角色编码"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100},{field:"Operation",title:"操作",width:200,fixed:"right",slots:{default:"operate"},contentRender:{name:"TableOpeate"}}],toolbarConfig:{buttons:[{code:"addRole",name:"新增角色",status:"primary"},{code:"RoleRelation",name:"关联用户"},{code:"RoleUse",name:"启用"},{code:"Roledisable",name:"禁用"},{code:"RoleyExport",name:"导出"},{code:"Roleremove",name:"批量删除"}],tools:{enabled:!0}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{J(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:a.TableList,page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:z}=K(B,t),q=V([{Cname:"后勤",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""}]);let N=V(!1);const O=V(),X=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"服务人员"},{id:5,label:"服务人员"},{id:6,label:"服务人员"}],$=[];S((()=>{M((()=>{})),setTimeout((()=>{}),2e3),X.forEach((e=>{ae(e)}))}));const ee=()=>{N.value?X.forEach((e=>{O.value.setChecked(e,!0,!0)})):O.value.setCheckedNodes([])},le=(e,l,a)=>{let s=0;$.forEach(((e,l)=>{O.value.getNode(e).checked?(s++,s==$.length-1&&(s=0,N.value=!0)):(s=0,N.value=!1)}))},ae=e=>("children"in e&&e.children.forEach((e=>ae(e))),$.push(e.id),e.id),se=e=>{switch(e){case"addRole":i.operateRole.visible=!1;break;case"baseRole":i.baseRole.visible=!1;break;case"relateRole":i.relateRole.visible=!1}},te=(e,l)=>{"addClass"==i.operateRole.key?e.Cname&&(q.value.push(e),e=[]):"addRole"==i.operateRole.key||i.operateRole.key},oe=(e,l)=>{"editRole"==l?(i.operateRole.visible=!0,i.operateRole.props.title="编辑角色",i.operateRole.key="editRole",i.operateRole.data=e):"relaRole"==l?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定关联选中的用户？",i.baseRole.key="relaRole"):"deleteRole"==l&&(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除选中的用户？",i.baseRole.key="deleteRole")},ie=()=>{i.operateRole.props.title="新增角色分类",i.operateRole.visible=!0,i.operateRole.key="addClass";i.operateRole.data={Cname:"",Cdescribe:""}},de=(e,l)=>{"delete"==l?(i.baseRole.visible=!0,i.baseRole.dialogText="是否确定删除？",i.baseRole.key="deleteClass"):"editClass"==l&&(i.operateRole.visible=!0,i.operateRole.props.title="编辑角色分类",i.operateRole.key="editClass",i.operateRole.data=e)},ne=()=>{let e=t.value.fitsTablePro.getCheckboxRecords(!0),l=O.value.getCheckedNodes();e.length?l.length||r("请选择至少一个权限进行分配！"):r("请选择至少一个角色！")},ce=()=>{M((()=>{t.value.fitsTablePro.commitProxy("query")}))};return(e,l)=>{const s=o,r=C,n=d,V=f,D=b,B=R,S=h,M=p;return w(),E("div",qe,[I("div",Fe,[I("div",je,[I("div",Se,[P(s,{class:"searchBox",placeholder:"搜索角色分类","prefix-icon":T(c)},null,8,["prefix-icon"]),P(r,{style:{cursor:"pointer"}},{default:_((()=>[P(T(v),{color:"#007dff",onClick:ie})])),_:1})]),I("div",We,[I("div",Ge,[H(P(r,{onClick:U,color:"#909399",style:{"margin-right":"8px"}},{default:_((()=>[P(T(k))])),_:1},512),[[Y,!T(m)]]),H(P(r,{onClick:U,color:"#909399",style:{"margin-right":"8px"}},{default:_((()=>[P(T(y))])),_:1},512),[[Y,T(m)]]),F(" 角色管理 ")]),P(B,null,{default:_((()=>[H(I("div",null,[P(D,{class:"treeScrollbar"},{default:_((()=>[P(T(A),{data:q.value,"node-key":"id","default-expand-all":"","expand-on-click-node":!1},{default:_((({data:e})=>[I("span",Me,[I("div",Ne,[I("div",{class:"textLeft",onClick:ce},[P(r,null,{default:_((()=>[P(T(re),{color:"#007DFF"})])),_:1}),I("div",Oe,[I("span",null,W(e.Cname),1)])]),P(r,{class:"moreButton"},{default:_((()=>[P(V,{placement:"bottom",title:"",trigger:"click","popper-class":"Role-popover","hide-after":0},{reference:_((()=>[P(T(x),{color:"#999999"})])),default:_((()=>[I("div",He,[P(n,{onClick:l=>de(e,"editClass")},{default:_((()=>[F("编辑 ")])),_:2},1032,["onClick"])]),I("div",Ye,[P(n,{onClick:l=>de(e,"delete")},{default:_((()=>[F(" 删除 ")])),_:2},1032,["onClick"])])])),_:2},1024)])),_:2},1024)])])])),_:1},8,["data"])])),_:1})],512),[[Y,T(m)]])])),_:1})])]),I("div",Ze,[P(T(u),{option:T(z),ref_key:"xGrid",ref:t,"grid-events":L},{operate:_((({slotProps:e})=>[I("span",{class:"FromButton underline",onClick:l=>oe(e.row,"editRole")},"编辑",8,Je),I("span",{class:"FromButton delete",onClick:l=>oe(e.row,"deleteRole")},"删除",8,Xe),I("span",{class:"FromButton",onClick:l=>oe(e.row,"relaRole")},"关联用户",8,Ke)])),state:_((({slotProps:e})=>[P(S,{modelValue:e.row.Ustate,"onUpdate:modelValue":l=>e.row.Ustate=l,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"])])]),I("div",$e,[P(D,{height:"calc(100vh-200px)"},{default:_((()=>[el,I("div",ll,[P(s,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":T(c)},null,8,["prefix-icon"]),P(n,{class:"Savebotton",onClick:ne},{default:_((()=>[F("保存")])),_:1})]),I("div",al,[P(M,{label:"全选",size:"large",modelValue:T(N),"onUpdate:modelValue":l[0]||(l[0]=e=>G(N)?N.value=e:N=e),onChange:ee},null,8,["modelValue"]),P(T(A),{ref_key:"treeRef",ref:O,data:X,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:a,onCheckChange:le},null,512)])])),_:1})]),P(T(g),{class:Z("onfooter"),visible:T(i).operateRole.visible,dialogProp:T(i).operateRole.props,onCancel:l[1]||(l[1]=e=>se("addRole")),showFooter:!1},{default:_((()=>["addRole"==T(i).operateRole.key||"addClass"==T(i).operateRole.key?(w(),Q(ue,{key:0,onDataChange:te,keys:T(i).operateRole.key,setData:T(i).operateRole.data,onCloseDialog:se,roleClass:q.value},null,8,["keys","setData","roleClass"])):j("",!0),"editRole"==T(i).operateRole.key||"editClass"==T(i).operateRole.key?(w(),Q(pe,{key:1,onDataChange:te,keys:T(i).operateRole.key,setData:T(i).operateRole.data,onCloseDialog:se,roleClass:q.value},null,8,["keys","setData","roleClass"])):j("",!0)])),_:1},8,["visible","dialogProp"]),P(T(g),{class:Z("Roles-baseDialog"),visible:T(i).baseRole.visible,dialogProp:T(i).baseRole.props,onCancel:l[2]||(l[2]=e=>se("baseRole")),onSubmit:l[3]||(l[3]=e=>(e=>{let l=t.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"RoleUse":l.forEach(((e,l)=>{e.Ustate=!0}));break;case"RoleRelation":case"RoleyExport":case"Roleremove":case"RoleClassRemove":break;case"Roledisable":l.forEach(((e,l)=>{e.Ustate=!1}));break;case"addClass":case"addRole":case"editClass":case"deleteClass":case"editRole":se("operateRole")}se("baseRole")})(T(i).baseRole.key))},{default:_((()=>[F(W(T(i).baseRole.dialogText),1)])),_:1},8,["visible","dialogProp"]),P(T(g),{class:Z("Roles-relateDialog onfooter"),visible:T(i).relateRole.visible,dialogProp:T(i).relateRole.props,showFooter:!1,onCancel:l[4]||(l[4]=e=>T(i).relateRole.visible=!1)},{default:_((()=>[P(ze,{onCloseDialog:se})])),_:1},8,["visible","dialogProp"])])}}}),[["__scopeId","data-v-ac7c713b"]]);export{tl as default};
