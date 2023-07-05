import{y as e,f as l,h as a,j as o,c as t,S as s,d as i,ar as d,X as r,K as n,G as c,H as A,N as m,u,F as b,_ as C,L as p,o as f,M as g,i as R,n as h,an as v,ao as k,I as y,O as x,A as U}from"./vxetable.23d9f74f.js";import{b as w,a as I}from"./system.cd36e9a4.js";import{h as E,_ as V,f as D,c as B,n as L,B as _}from"./index.53c6c89d.js";import{s as Q,d as P,i as T}from"./index.14f8690e.js";import{u as z}from"./FitsTableProHook.1f485441.js";import{u as F}from"./FitsTableProHook.179d0deb.js";import{c as q,a as j,b as S,m as G}from"./more-filled.d1f585c1.js";import"./echarts.d8b3161e.js";import"./moment.9709ab41.js";const W=e({name:"Close"}),M={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},N=[o("path",{fill:"currentColor",d:"M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"},null,-1)];var H=E(W,[["render",function(e,o,t,s,i,d){return l(),a("svg",M,N)}]]);const O=e({name:"UserFilled"}),Y={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},Z=[o("path",{fill:"currentColor",d:"M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"},null,-1)];var J=E(O,[["render",function(e,o,t,s,i,d){return l(),a("svg",Y,Z)}]]);const K={class:"add-role"},X={class:"add-content"},$={class:"add-bottom"};var ee=V(e({__name:"addRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:f}){const g=e,R=t("default"),h=t();let v=s({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),k=s({Cname:"",Cdescribe:""}),y=t();i((()=>g.setData),(()=>{"addClass"==g.keys?k=Object.assign(k,g.setData):"addRole"==g.keys&&(v=Object.assign(v,g.setData))}),{immediate:!0,deep:!0}),i((()=>g.roleClass),(()=>{y.value=d.clone(g.roleClass)}),{immediate:!0,deep:!0});const x=s({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:2,max:10,message:"长度请大于3，小于10",trigger:"blur"}]}),U=e=>{"cancle"!=e?h.value&&h.value.validate((e=>{if(!e)return D({message:"必填项未填写完整！",type:"warning"}),!1;if("addClass"==g.keys){let e=d.clone(k);f("dataChange",e,g.keys)}else if("addRole"==g.keys){let e=d.clone(v);f("dataChange",e,g.keys)}f("closeDialog","addRole")})):f("closeDialog","addRole")};return(e,t)=>{const s=r("el-option"),i=r("el-select"),d=r("el-form-item"),f=r("el-input"),w=r("el-radio"),I=r("el-radio-group"),E=r("el-form"),V=r("el-button");return l(),a("div",K,[o("div",X,[n(" 新增角色内容 "),"addRole"==g.keys?(l(),c(E,{key:0,ref_key:"ruleFormRef",ref:h,model:u(v),rules:x,"label-width":"120px",class:"demo-ruleForm",size:R.value,"status-icon":""},{default:A((()=>[m(d,{label:"角色分类",prop:"Ucode"},{default:A((()=>[m(i,{style:{width:"100%"},modelValue:u(v).Ucode,"onUpdate:modelValue":t[0]||(t[0]=e=>u(v).Ucode=e),class:"m-2",placeholder:"请选择"},{default:A((()=>[(l(!0),a(b,null,C(u(y),((e,a)=>(l(),c(s,{key:a,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(d,{label:"角色名称",prop:"Uname"},{default:A((()=>[m(f,{modelValue:u(v).Uname,"onUpdate:modelValue":t[1]||(t[1]=e=>u(v).Uname=e)},null,8,["modelValue"])])),_:1}),m(d,{label:"角色描述",prop:"Udescribe"},{default:A((()=>[m(f,{modelValue:u(v).Udescribe,"onUpdate:modelValue":t[2]||(t[2]=e=>u(v).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),m(d,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:A((()=>[m(I,{modelValue:u(v).Ustate,"onUpdate:modelValue":t[3]||(t[3]=e=>u(v).Ustate=e),class:"ml-4"},{default:A((()=>[m(w,{label:!0,size:"large"},{default:A((()=>[p("启用")])),_:1}),m(w,{label:!1,size:"large"},{default:A((()=>[p("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"addClass"==g.keys?(l(),a(b,{key:1},[n(" 新增分类内容 "),m(E,{ref_key:"ruleFormRef",ref:h,model:u(k),rules:x,"label-width":"120px",class:"demo-classyForm",size:R.value,"status-icon":""},{default:A((()=>[m(d,{label:"角色分类",prop:"Cname"},{default:A((()=>[m(f,{modelValue:u(k).Cname,"onUpdate:modelValue":t[4]||(t[4]=e=>u(k).Cname=e)},null,8,["modelValue"])])),_:1}),m(d,{label:"分类描述",prop:"Cdescribe"},{default:A((()=>[m(f,{modelValue:u(k).Cdescribe,"onUpdate:modelValue":t[5]||(t[5]=e=>u(k).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])],2112)):n("v-if",!0)]),o("div",$,[m(V,{class:"add-button",size:"large",onClick:t[6]||(t[6]=e=>U("cancle"))},{default:A((()=>[p("取消")])),_:1}),m(V,{class:"add-button",type:"primary",size:"large",onClick:t[7]||(t[7]=e=>U("submit"))},{default:A((()=>[p("确定 ")])),_:1})])])}}}),[["__scopeId","data-v-6e8de86f"]]);const le={class:"edit-role"},ae={class:"edit-content"},oe={class:"edit-bottom"};var te=V(e({__name:"editRole",props:{keys:String,setData:Object,roleClass:Array},emits:["dataChange","closeDialog"],setup(e,{emit:f}){const g=e,R=t("default"),h=t();let v=s({Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""}),k=s({Cname:"",Cdescribe:""});const y=t(),x=s({Uname:[{required:!0,message:"请输入角色名称",trigger:"blur"}],Cname:[{required:!0,message:"请输入分类名称",trigger:"blur"}],Ucode:[{required:!0,message:"请输入角色编码",trigger:"blur"},{min:3,max:10,message:"长度请大于3，小于10",trigger:"blur"}]});i((()=>g.setData),(()=>{"editClass"==g.keys?k=Object.assign(k,g.setData):"editRole"==g.keys&&(v=Object.assign(v,g.setData))}),{immediate:!0,deep:!0}),i((()=>g.roleClass),(()=>{y.value=d.clone(g.roleClass)}),{immediate:!0,deep:!0});const U=e=>{"cancle"!=e?h.value&&h.value.validate((e=>{if(!e)return D({message:"必填项未填写完整！",type:"warning"}),!1;if("editClass"==g.keys){let e={Cname:k.Cname,Cdescribe:k.Cdescribe};f("dataChange",e,g.keys)}else"editRole"==g.keys&&console.log("角色修改");f("closeDialog","addRole")})):f("closeDialog","addRole")};return(e,t)=>{const s=r("el-option"),i=r("el-select"),d=r("el-form-item"),f=r("el-input"),w=r("el-radio"),I=r("el-radio-group"),E=r("el-form"),V=r("el-button");return l(),a("div",le,[o("div",ae,[n(" 编辑角色内容 "),"editRole"==g.keys?(l(),c(E,{key:0,ref_key:"ruleFormRef",ref:h,model:u(v),rules:x,"label-width":"120px",class:"demo-ruleForm",size:R.value,"status-icon":""},{default:A((()=>[m(d,{label:"角色分类",prop:"Ucode"},{default:A((()=>[m(i,{style:{width:"100%"},modelValue:u(v).Ucode,"onUpdate:modelValue":t[0]||(t[0]=e=>u(v).Ucode=e),class:"m-2",placeholder:"请选择"},{default:A((()=>[(l(!0),a(b,null,C(u(y),((e,a)=>(l(),c(s,{key:a,label:e.Cname,value:e.Cname},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(d,{label:"角色名称",prop:"Uname"},{default:A((()=>[m(f,{modelValue:u(v).Uname,"onUpdate:modelValue":t[1]||(t[1]=e=>u(v).Uname=e)},null,8,["modelValue"])])),_:1}),m(d,{label:"角色描述",prop:"Udescribe"},{default:A((()=>[m(f,{modelValue:u(v).Udescribe,"onUpdate:modelValue":t[2]||(t[2]=e=>u(v).Udescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1}),m(d,{label:"状态",prop:"Ustate",style:{display:"flex","align-items":"center"}},{default:A((()=>[m(I,{modelValue:u(v).Ustate,"onUpdate:modelValue":t[3]||(t[3]=e=>u(v).Ustate=e),class:"ml-4"},{default:A((()=>[m(w,{label:!0,size:"large"},{default:A((()=>[p("启用")])),_:1}),m(w,{label:!1,size:"large"},{default:A((()=>[p("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])):"editClass"==g.keys?(l(),a(b,{key:1},[n(" 角色管理编辑内容 "),m(E,{ref_key:"ruleFormRef",ref:h,model:u(k),rules:x,"label-width":"120px",class:"demo-classyForm",size:R.value,"status-icon":""},{default:A((()=>[m(d,{label:"角色分类",prop:"Cname"},{default:A((()=>[m(f,{modelValue:u(k).Cname,"onUpdate:modelValue":t[4]||(t[4]=e=>u(k).Cname=e)},null,8,["modelValue"])])),_:1}),m(d,{label:"分类描述",prop:"Cdescribe"},{default:A((()=>[m(f,{modelValue:u(k).Cdescribe,"onUpdate:modelValue":t[5]||(t[5]=e=>u(k).Cdescribe=e),rows:"5",resize:"none",type:"textarea"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])],2112)):n("v-if",!0)]),o("div",oe,[m(V,{class:"edit-button",size:"large",onClick:t[6]||(t[6]=e=>U("cancle"))},{default:A((()=>[p("取消")])),_:1}),m(V,{class:"edit-button",type:"primary",size:"large",onClick:t[7]||(t[7]=e=>U("submit"))},{default:A((()=>[p("确定")])),_:1})])])}}}),[["__scopeId","data-v-3cf6e0d0"]]);const se={class:"relate-role"},ie={class:"relate-content"},de={class:"relateLeft"},re={class:"leftTree"},ne={class:"search"},ce={class:"contain"},Ae={class:"treeItem",style:{display:"flex","align-items":"flex-end"}},me={key:0,class:"parentItem",style:{"padding-right":"4px"}},ue={class:"leftTable"},be={class:"scrollContent"},Ce={class:"tableContent"},pe={class:"tableBottom"},fe={key:0},ge={key:1},Re={class:"tableBottomContent"},he={class:"relateRight"},ve=(e=>(v("data-v-d11b4c32"),e=e(),k(),e))((()=>o("div",{class:"title"},"分配角色",-1))),ke={class:"search"},ye={class:"contain"},xe={class:"relate-bottom"};var Ue=V(e({__name:"relateRole",emits:["closeDialog"],setup(e,{emit:s}){let i={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/assets/yingyerenyuan.8e601937.png",self.location).href};const n={children:"children",label:"label"},{user:c}=B(),v=t(),k=e=>{"cancle"==e?console.log("cancle"):console.log("submit"),s("closeDialog","relateRole")},y={keepSource:!0,showOverflow:!1,id:"toolbar_demo_1",height:450,rowConfig:{height:40},storage:{enabled:!0,key:"relateRoleList",dataBase:c.userInfo.id},formConfig:{items:[{field:"keyword",title:"",itemRender:{name:"ElInput",props:{placeholder:"搜索用户"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",width:50},{field:"Indexes",title:"序号",type:"seq",width:100},{field:"Uname",title:"角色名称",minWidth:130,treeNode:!0},{field:"Ucode",title:"角色编码",minWidth:100},{field:"Udescribe",title:"角色描述",minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{w(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:d.toTreeArray(a.TableList,{clear:!0}),page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:x}=F(y,v);f((async()=>{const e=await I();U.value=e.ReturnData.TableList}));const U=t(),E=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"工作人员"},{id:5,label:"开发人员"},{id:6,label:"测试人员"}],V=t(null),D=[];let P=t(!1);const T=t(),z=()=>{P.value?E.forEach((e=>{T.value.setChecked(e,!0,!0)})):T.value.setCheckedNodes([])},q=(e,l,a)=>{let o=0;D.forEach(((e,l)=>{T.value.getNode(e).checked?(o++,o==D.length-1&&(o=0,P.value=!0)):(o=0,P.value=!1)}))},j=()=>{let e=v.value.fitsTablePro.getCheckboxRecords(!0);V.value=[],e.forEach(((e,l)=>{let a={name:e.Uname,data:e};V.value.push(a)}))},S=()=>{h((()=>{v.value.fitsTablePro.commitProxy("query")}))};return(e,t)=>{const s=r("el-input"),d=r("el-image"),c=r("el-icon"),f=r("el-scrollbar"),h=r("el-checkbox"),y=r("el-button");return l(),a("div",se,[o("div",ie,[o("div",de,[o("div",re,[o("div",ne,[m(s,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":u(Q)},null,8,["prefix-icon"])]),o("div",ce,[m(f,{height:"480px"},{default:A((()=>[m(u(L),{ref_key:"treeRef",ref:T,data:U.value,"default-expand-all":"","node-key":"id","highlight-current":"",props:n,onCheckChange:q},{default:A((e=>[o("div",Ae,["children"in e.data?(l(),a("div",me,[m(c,null,{default:A((()=>[m(d,{style:{width:"100%",height:"100%"},src:u(i).img1},null,8,["src"])])),_:1}),p(" "+g(e.data.name),1)])):(l(),a("div",{key:1,class:"ChildItem",style:{"padding-right":"4px"},onClick:S},[m(c,null,{default:A((()=>[m(d,{style:{width:"100%",height:"100%"},src:u(i).img2},null,8,["src"])])),_:1}),p(" "+g(e.data.name),1)]))])])),_:1},8,["data"])])),_:1})])]),o("div",ue,[o("div",be,[o("div",Ce,[m(u(_),{option:u(x),ref_key:"xGrid",ref:v,onCheckboxChange:j,onCheckboxAll:j},null,8,["option"])]),m(f,{height:"150px"},{default:A((()=>[o("div",pe,[u(V)?(l(),a("div",ge,"已选用户:"+g(u(V).length)+"人",1)):(l(),a("div",fe,"已选用户:0人")),o("div",Re,[(l(!0),a(b,null,C(u(V),((e,t)=>(l(),a("div",{class:"contentItem",key:t},[o("span",null,g(e.name),1),m(c,null,{default:A((()=>[m(u(H),{style:{cursor:"pointer"},onClick:e=>(e=>{v.value.fitsTablePro.setCheckboxRow(V.value[e].data,!1),V.value.splice(e,1)})(t)},null,8,["onClick"])])),_:2},1024)])))),128))])])])),_:1})])])]),o("div",he,[ve,o("div",ke,[m(s,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":u(Q)},null,8,["prefix-icon"])]),o("div",ye,[m(h,{label:"全选",size:"large",modelValue:u(P),"onUpdate:modelValue":t[0]||(t[0]=e=>R(P)?P.value=e:P=e),onChange:z},null,8,["modelValue"]),m(f,{height:"480px"},{default:A((()=>[m(u(L),{ref_key:"treeRef",ref:T,data:E,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:n,onCheckChange:q},null,512)])),_:1})])])]),o("div",xe,[m(y,{class:"relate-button",onClick:t[1]||(t[1]=e=>k("cancle")),size:"large"},{default:A((()=>[p("取消")])),_:1}),m(y,{class:"relate-button",type:"primary",onClick:t[2]||(t[2]=e=>k("submit")),size:"large"},{default:A((()=>[p("提交")])),_:1})])])}}}),[["__scopeId","data-v-d11b4c32"]]);const we={class:"role-manage"},Ie={class:"role-left"},Ee={class:"left-classification"},Ve={class:"top"},De={div:"",class:"bottom"},Be={class:"title"},Le={class:"custom-tree-node"},_e={class:"text"},Qe={class:"textContent"},Pe={class:"btn"},Te={class:"btn"},ze={class:"left-contain"},Fe=["onClick"],qe=["onClick"],je=["onClick"],Se={class:"role-right"},Ge=(e=>(v("data-v-0766ff0a"),e=e(),k(),e))((()=>o("div",{class:"title"},"菜单权限管理列表",-1))),We={class:"search"},Me={class:"contain"},Ne=e({name:"Roles"});var He=V(e({...Ne,setup(e){const i={children:"children",label:"label"},{user:d}=B(),b=t(),C=s({operateRole:{visible:!1,key:"",data:{},props:{title:"",width:"40%"}},baseRole:{dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}},relateRole:{dialogText:"关联用户",key:"",visible:!1,props:{title:"关联用户",width:"75%"}}}),v=e=>{D({message:e,type:"warning"})};let k=t(!0);const I=()=>{k.value=!k.value},E={async toolbarButtonClick({code:e}){let l=b.value.fitsTablePro.getCheckboxRecords();switch(e){case"addRole":{C.operateRole.props.title="新增角色",C.operateRole.visible=!0,C.operateRole.key="addRole";let e={Uname:"",Ucode:"",Udescribe:"",Sort:"",Ustate:!1,Roledisable:""};C.operateRole.data=e;break}case"RoleRelation":C.relateRole.visible=!0;break;case"RoleUse":l.length?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定启用选中的用户？",C.baseRole.key="RoleUse"):v("请选择至少一个角色！");break;case"Roledisable":l.length?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定禁用选中的用户？",C.baseRole.key="Roledisable"):v("请选择至少一个角色！");break;case"RoleyExport":l.length?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定导出选中的用户？",C.baseRole.key="RoleyExport"):v("请选择至少一个角色！");break;case"Roleremove":l.length?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定删除选中的用户？",C.baseRole.key="Roleremove"):v("请选择至少一个角色！")}}},V={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"SystemManageRoleList",dataBase:d.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"角色名称",itemRender:{name:"ElInput",props:{placeholder:"请输入角色名称"}}},{field:"code",span:3,title:"角色编码",itemRender:{name:"ElInput",props:{placeholder:"请输入角色编码"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100},{field:"Operation",title:"操作",width:200,fixed:"right",slots:{default:"operate"},contentRender:{name:"TableOpeate"}}],toolbarConfig:{buttons:[{code:"addRole",name:"新增角色",status:"primary"},{code:"RoleRelation",name:"关联用户"},{code:"RoleUse",name:"启用"},{code:"Roledisable",name:"禁用"},{code:"RoleyExport",name:"导出"},{code:"Roleremove",name:"批量删除"}],tools:{enabled:!0}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{w(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:a.TableList,page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:_}=z(V,b),F=t([{Cname:"后勤",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""},{Cname:"财务",Cdescribe:""},{Cname:"产品中心",Cdescribe:""},{Cname:"前端",Cdescribe:""},{Cname:"设计",Cdescribe:""},{Cname:"维护中心",Cdescribe:""},{Cname:"测试",Cdescribe:""},{Cname:"运维",Cdescribe:""},{Cname:"需求",Cdescribe:""},{Cname:"售后",Cdescribe:""},{Cname:"维护",Cdescribe:""},{Cname:"管理",Cdescribe:""}]);let W=t(!1);const M=t(),N=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"服务人员"},{id:5,label:"服务人员"},{id:6,label:"服务人员"}],H=[];f((()=>{h((()=>{})),setTimeout((()=>{}),2e3),N.forEach((e=>{Z(e)}))}));const O=()=>{W.value?N.forEach((e=>{M.value.setChecked(e,!0,!0)})):M.value.setCheckedNodes([])},Y=(e,l,a)=>{let o=0;H.forEach(((e,l)=>{M.value.getNode(e).checked?(o++,o==H.length-1&&(o=0,W.value=!0)):(o=0,W.value=!1)}))},Z=e=>("children"in e&&e.children.forEach((e=>Z(e))),H.push(e.id),e.id),K=e=>{switch(e){case"addRole":C.operateRole.visible=!1;break;case"baseRole":C.baseRole.visible=!1;break;case"relateRole":C.relateRole.visible=!1}},X=(e,l)=>{"addClass"==C.operateRole.key?e.Cname&&(F.value.push(e),e=[]):"addRole"==C.operateRole.key?console.log("增加角色",e):"editClass"==C.operateRole.key&&console.log("修改分类",e)},$=(e,l)=>{"editRole"==l?(C.operateRole.visible=!0,C.operateRole.props.title="编辑角色",C.operateRole.key="editRole",C.operateRole.data=e):"relaRole"==l?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定关联选中的用户？",C.baseRole.key="relaRole"):"deleteRole"==l&&(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定删除选中的用户？",C.baseRole.key="deleteRole")},le=()=>{C.operateRole.props.title="新增角色分类",C.operateRole.visible=!0,C.operateRole.key="addClass";C.operateRole.data={Cname:"",Cdescribe:""}},ae=(e,l)=>{"delete"==l?(C.baseRole.visible=!0,C.baseRole.dialogText="是否确定删除？",C.baseRole.key="deleteClass"):"editClass"==l&&(C.operateRole.visible=!0,C.operateRole.props.title="编辑角色分类",C.operateRole.key="editClass",C.operateRole.data=e)},oe=()=>{let e=b.value.fitsTablePro.getCheckboxRecords(!0),l=M.value.getCheckedNodes();e.length?l.length?console.log("权限分配成功,分配角色：",e,",分配权限：",l):v("请选择至少一个权限进行分配！"):v("请选择至少一个角色！")},se=()=>{h((()=>{b.value.fitsTablePro.commitProxy("query")}))};return(e,t)=>{const s=r("el-input"),d=r("el-icon"),f=r("el-button"),h=r("el-popover"),v=r("el-scrollbar"),w=r("el-collapse-transition"),V=r("el-switch"),D=r("el-checkbox");return l(),a("div",we,[o("div",Ie,[o("div",Ee,[o("div",Ve,[m(s,{class:"searchBox",placeholder:"搜索角色分类","prefix-icon":u(Q)},null,8,["prefix-icon"]),m(d,{style:{cursor:"pointer"}},{default:A((()=>[m(u(q),{color:"#007dff",onClick:le})])),_:1})]),o("div",De,[o("div",Be,[y(m(d,{onClick:I,color:"#909399",style:{"margin-right":"8px"}},{default:A((()=>[m(u(j))])),_:1},512),[[x,!u(k)]]),y(m(d,{onClick:I,color:"#909399",style:{"margin-right":"8px"}},{default:A((()=>[m(u(S))])),_:1},512),[[x,u(k)]]),p(" 角色管理 ")]),m(w,null,{default:A((()=>[y(o("div",null,[m(v,{class:"treeScrollbar"},{default:A((()=>[m(u(L),{data:F.value,"node-key":"id","default-expand-all":"","expand-on-click-node":!1},{default:A((({data:e})=>[o("span",Le,[o("div",_e,[o("div",{class:"textLeft",onClick:se},[m(d,null,{default:A((()=>[m(u(J),{color:"#007DFF"})])),_:1}),o("div",Qe,[o("span",null,g(e.Cname),1)])]),m(d,{class:"moreButton"},{default:A((()=>[m(h,{placement:"bottom",title:"",trigger:"click","popper-class":"Role-popover","hide-after":0},{reference:A((()=>[m(u(G),{color:"#999999"})])),default:A((()=>[o("div",Pe,[m(f,{onClick:l=>ae(e,"editClass")},{default:A((()=>[p("编辑 ")])),_:2},1032,["onClick"])]),o("div",Te,[m(f,{onClick:l=>ae(e,"delete")},{default:A((()=>[p(" 删除 ")])),_:2},1032,["onClick"])])])),_:2},1024)])),_:2},1024)])])])),_:1},8,["data"])])),_:1})],512),[[x,u(k)]])])),_:1})])]),o("div",ze,[n(" <fits-list-seach :formItem='formItem' /> "),m(u(P),{option:u(_),ref_key:"xGrid",ref:b,"grid-events":E},{operate:A((({slotProps:e})=>[n(' <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents"\r\n                            @checkbox-all="onCheckAll" @checkbox-change="onCheckOne">\r\n                            <template #operate> '),o("span",{class:"FromButton underline",onClick:l=>$(e.row,"editRole")},"编辑",8,Fe),o("span",{class:"FromButton delete",onClick:l=>$(e.row,"deleteRole")},"删除",8,qe),o("span",{class:"FromButton",onClick:l=>$(e.row,"relaRole")},"关联用户",8,je),n(' <el-button type="warning">Warning</el-button>\r\n                            <el-button type="danger">Danger</el-button> ')])),state:A((({slotProps:e})=>[m(V,{modelValue:e.row.Ustate,"onUpdate:modelValue":l=>e.row.Ustate=l,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"]),n(" {{ slotProps.row.Ustate }} ")])),_:1},8,["option"])])]),o("div",Se,[m(v,{height:"calc(100vh-200px)"},{default:A((()=>[Ge,o("div",We,[m(s,{class:"searchBox",placeholder:"关键词搜索","prefix-icon":u(Q)},null,8,["prefix-icon"]),m(f,{class:"Savebotton",onClick:oe},{default:A((()=>[p("保存")])),_:1})]),o("div",Me,[m(D,{label:"全选",size:"large",modelValue:u(W),"onUpdate:modelValue":t[0]||(t[0]=e=>R(W)?W.value=e:W=e),onChange:O},null,8,["modelValue"]),m(u(L),{ref_key:"treeRef",ref:M,data:N,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:i,onCheckChange:Y},null,512)])])),_:1})]),n(" 数据弹窗（新增角色、角色分类、编辑角色分类） "),m(u(T),{class:U("onfooter"),visible:C.operateRole.visible,dialogProp:C.operateRole.props,onCancel:t[1]||(t[1]=e=>K("addRole")),showFooter:!1},{default:A((()=>["addRole"==C.operateRole.key||"addClass"==C.operateRole.key?(l(),c(ee,{key:0,onDataChange:X,keys:C.operateRole.key,setData:C.operateRole.data,onCloseDialog:K,roleClass:F.value},null,8,["keys","setData","roleClass"])):n("v-if",!0),"editRole"==C.operateRole.key||"editClass"==C.operateRole.key?(l(),c(te,{key:1,onDataChange:X,keys:C.operateRole.key,setData:C.operateRole.data,onCloseDialog:K,roleClass:F.value},null,8,["keys","setData","roleClass"])):n("v-if",!0)])),_:1},8,["visible","dialogProp"]),n(" 工具栏操作确认弹窗（关联、启用、禁用、导出、删除） "),m(u(T),{class:U("Roles-baseDialog"),visible:C.baseRole.visible,dialogProp:C.baseRole.props,onCancel:t[2]||(t[2]=e=>K("baseRole")),onSubmit:t[3]||(t[3]=e=>(e=>{let l=b.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"RoleUse":l.forEach(((e,l)=>{e.Ustate=!0}));break;case"RoleRelation":console.log("关联");break;case"Roledisable":l.forEach(((e,l)=>{e.Ustate=!1}));break;case"RoleyExport":console.log("导出");break;case"Roleremove":console.log("删除");break;case"addClass":case"addRole":case"editClass":case"deleteClass":case"editRole":K("operateRole")}K("baseRole")})(C.baseRole.key))},{default:A((()=>[p(g(C.baseRole.dialogText),1)])),_:1},8,["visible","dialogProp"]),n(" 关联用户弹窗 "),m(u(T),{class:U("Roles-relateDialog onfooter"),visible:C.relateRole.visible,dialogProp:C.relateRole.props,showFooter:!1,onCancel:t[4]||(t[4]=e=>C.relateRole.visible=!1)},{default:A((()=>[m(Ue,{onCloseDialog:K})])),_:1},8,["visible","dialogProp"])])}}}),[["__scopeId","data-v-0766ff0a"]]);export{He as default};
