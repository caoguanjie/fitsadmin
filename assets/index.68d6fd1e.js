import{o as e,a2 as A,a3 as l,a4 as t,a5 as a,a6 as i,l as o,p as s,a7 as r,z as d,A as n,F as c,a8 as p,K as f,a9 as u,aa as g,C as m,ab as v}from"./index.0fe8a92a.js";import{y as R,c as h,ap as C,d as b,o as E,v as I,f as y,h as Q,j as x,M as L,u as B,i as k,K as P,G as w,_ as T,O as U,H as D,a8 as q,J as G,I as F,n as M,al as W,am as S,a2 as j,Q as V,a6 as N}from"./vxetable.dc399d9c.js";import{g as H,a as Y}from"./system.9159c062.js";import{u as Z}from"./FitsTableProHook.f389f9bf.js";import{i as z}from"./index.5738a161.js";import{E as J}from"./index.38ee11c0.js";import"./echarts.d8b3161e.js";const O={class:"relate-user"},K={class:"relate-content"},X={class:"relateLeft"},_={class:"leftTree"},$={class:"search"},ee={class:"tree_list"},Ae={class:"custom-tree-node"},le=["src"],te=["src"],ae={class:"leftTable"},ie={class:"scrollContent"},oe={class:"tableContent"},se={class:"tableBottom"},re={key:0,class:"title"},de={key:1,class:"title"},ne={class:"list"},ce={class:"relateRight"},pe=(e=>(W("data-v-7572a904"),e=e(),S(),e))((()=>x("div",{class:"title"},"分配角色",-1))),fe={class:"relate-bottom"};var ue=o(R({__name:"userList",emits:["closeDialog"],setup(o,{expose:c,emit:p}){const{user:f}=e();let u=h();c(u);let g={img1:new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAACNdJREFUeNrt3WmMXWUZwPHn3NttZrpMR4oNVMpqaJGyVGSTSCtFQShLoFEDwRA1QggSxAUTQjQhAQzIJhWLxEDBMIRV2qYgSwhLJCEsxRaQEKCWoRSmdMNpO3NfP1yREPQDL9xzyp3f78tk5sv7vPfD/Wfec+65EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG2iqHqA96VG760z958wIYrRTw6cc9RREfFE3DV9ekS6Pn6+/fYRxUWxpNhm5uVT89c4efPmiHRc7durVkVKxdAFDz1U1E64bvm8J5+sejjg/6vsDTmlh9LUNGZMxPpJ44684IKI9Kv0x3POiYgdi6M7O6t+YahYisfjiqefjmj8otF/9tlF7cSe5fMefbTqsYAPlB6QlHp7p/f29EQadXXRs2hRFPGT4pyDDqr6hWCb1ZN+PTQUqeiNH51xRlE77pq/v7VgQdVDASUGJKXe3pNPrtcjRi1fscv990fEvrF41qyqXwA+K4rT4zuNRkTjiGLiMccUxQm9y85csqTqqWA4q5W31Oh/rfjcaaeFcJAl3RB/rtUiak+lwfnzU2PxS7tfNXp01VPBcFZiQNJtMefcc6veMJ916bL4w9SpUWxeMPrqE0+sehoYzloekNS4/cxpR0+dGhHfjwv32qvqDdMuar+JB+bNq3oKGM5a/x9IUftdbdEuu1S9UdpMSrOLGXPmfHA3H1C2Eo6waoem28aPr3qjtJkizo4pXV0R6348bvPs2VWPA8NRiddAoCVejynHHlv1EDAcCQifdcfHTXPnppRShCcVQJkEhM+67vjpDjtE3Dtzxnb77Vf1MDCcCAhtorFv4whHWVAmAaFNpMvT1QICZRpR9QDwKXm4NnvmzJReu/nGuY88Eqnj3J4fbt5c9VCQpUg3x7ShoYjiyHhozZpIaU1899lnI2ovF/333FPUJh34rSkvvVT1mAJC20gpImLd3v/Y57DDohjz3IFVDwSfxIqIiNQXkyOiiMF48JRTIhob4sxLLklp9aWLdr/jjkix/9C6s84qap8/Yu6a1avLHtERFm1m7doVK6qeAVpm73RtrRYRp6UrTjopiphcu/yZZ1LqG7moZ9q0socRENrMunUvvxwR0Whs2VL1LNByk2Li5MkR9elpz8WLU+OtW3tvHTu2rMUFhDbTaAwORnwQEhgO0n3xy513jiLN65h33nllrdr6gKTRMyfdPGFCWRuCpv5+R1kMOymGintPPbWs5Up4mOL4c3d6YsqUsjYETe9fC2l+Rh2GhSLeiWLXXVN6c+l9e3d1tXq5Eo6witdHPtf6jcCHbd26cWNExKZNK1dWPQuULI0cHLx94sRWL+MaCG2uv/+FF6qeAdqTgNDm1q5dvrzqGaA9bZMfJGyeWdfrzWer1mof/jt8HFu39vVFRGzc2AzJyJG+nYZtX61Wrzd/Nm/KrdfHjat6po/aBgIyYkQzDGPHNhoREWPGNH+v+e+IT9E779xwQ9UzQK4RI3p6IiI6O5vPnB4//vDDIyLq9Y6O6qaq8E26s7MZjEmThoaavwsHwP8yONjfHxGxfv0DD0REvPHGxRdHRAwMVPl5pwrerLu6muHo7m7+9CVAAB9Po7FpU0TE6tULFkREDAy88kr5U5QYkPePqiZMaIYDgE+qeYLz9ts33RQR0WiU+QzqEgMyfrxwALTC0NCGDRERGzY89lh5q5bwKJNi/uBfRo364OI4AK3x3nvPPFPeaiU8yiSuWDt9u+3K2xLAcLVlS19fRBRbjl63x4iW32VbxqNMDh08rbOz9esA0Dzp2TTtbwubN/62UglHWGn3oRvdmgtQmjS0/5Y/NT+K2Ere2AHIIiAAZBEQALIICABZBASALAICQBYBASCLgACQRUAAyCIgAGQREACyCAgAWQQEgCwlfB9Ix5cmrl+1quqNAvDpKuE/kFHPdnyt+fXvALQPR1gAZBEQALIICABZBASALAICQBYBASCLgACQRUAAyCIgAGQREACyCAgAWQQEgCwCAkAWAQEgi4AAkEVAAMgiIABkERAAsggIAFkEBIAsAgJAFgEBIIuAAJBFQADIIiAAZBEQALIICABZBASALAICQBYBASCLgACQRUAAyCIgAGQREACyCAgAWQQEgCwCAkAWAQEgi4AAkEVAAMgiIABkERAAsggIAFkEBIAsAgJAFgEBIIuAAJBFQADIIiAAZBEQALIICABZBASALAICQBYBASCLgACQRUAAyCIgAGQREACyCAgAWQQEgCwCAkAWAQEgi4AAkEVAAMgiIABkERAAsggIAFkEBIAsAgJAFgEBIIuAAJBFQADIIiAAZBEQALIICABZBASALAICQBYBASCLgACQRUAAyCIgAGQREACylBCQ4ubiwZSq3ijA8JFm17pa/77b+oCk2srxr61f3/J1AGgqOubseHB/f6uXaX1AitrCyRctWxYRURQtXw1gGKvXu7sjIu30hTlHrFzZ6tVKOMKq//agfz78cMSon+34xtBQ69cDGK466ruN7esrakXtywds3drq1VoekKLYpZhVDAxEjG3sv3DJklavBzAc1esRER37zHj10kvLWrO0Q6WU1qY7U3d3xBt33nLX669HbJqy7Pxx48paH6B9TTj96889/3zEF5ddM3LGjKIoiqJoh4vo/1EUE4sTinffjei8cNZRBxwQ0TF/z6tcXAfI0bymPG71oT948cWIcQd/86ADDywrHP+doarNp/Tm0hvf7OqKePfxxzYuXBjx3ppnn5o7N2Lwe+9eWPP5FICPGH3ljl8ZGIjoenWf8668MmK3Ry/b+/zzyw7H+7aZ+6JSIzWu+/3IkVG8eOay6085JVLjmA3XHnJIFOnlLcfvsEOk+Gqxxn1cwDBQFLPSLVu3RqRvjOpbtSrSqOu7Z959d1Hbo/vKQ5curXo8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgm/RvNkwbMS9XLY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTAtMjZUMTQ6MTg6NTErMDg6MDBkylT8AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEwLTI2VDE0OjE4OjUxKzA4OjAwFZfsQAAAAE10RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fM2MxZHozNncwdDcvd2VuamlhbmppYS5zdmdGisguAAAAAElFTkSuQmCC",self.location).href,img2:new URL("/fitsadmin/assets/yingyerenyuan.8e601937.png",self.location).href};const m={keepSource:!0,showOverflow:"tooltip",id:"toolbar_demo_2",rowConfig:{height:40,isCurrent:!0},storage:{enabled:!0,key:"userList",dataBase:f.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},align:"center",columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:50},{field:"name",title:"用户名称",minWidth:80},{field:"account",title:"用户账号",minWidth:80},{field:"mobiTel",title:"手机号码",minWidth:100},{field:"sex",title:"性别",minWidth:50}],toolbarConfig:{slots:{buttons:"buttons"}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e},A)=>new Promise((e=>{H(A,{pageIndex:10,pageSize:20}).then((A=>{const{ReturnData:l}=A;e(l?{result:C.toTreeArray(l.TableList,{clear:!0}),page:{total:l.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:v}=Z(m,u);let R=h(""),W=h(),S=h();const j={children:"children",lable:"label"},V=h();b(R,(e=>{V.value.filter(e)}));const N=(e,A)=>!e||A.name.includes(e),z=e=>{e.children||M((()=>{u.value.fitsTablePro.commitProxy("query")})),J.value=""};let J=h();const ue=()=>{let e=u.value.fitsTablePro.getCheckboxRecords();J.value=e},ge=()=>{let e=u.value.fitsTablePro.getCheckboxRecords();J.value=e};b(W,(e=>{Re.value.filter(e)}));const me=(e,A)=>!e||A.label.includes(e),ve=[],Re=h(),he=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"服务人员",children:[{id:41,label:"服务人员1"},{id:42,label:"服务人员2"}]},{id:5,label:"服务人员",children:[]},{id:6,label:"服务人员"}],Ce=()=>{be.value?he.forEach((e=>{Re.value.setChecked(e,!0,!0)})):Re.value.setCheckedNodes([])};let be=h(!1);const Ee=(e,A,l)=>{let t=0;ve.forEach(((e,A)=>{Re.value.getNode(e).checked?(t++,t==ve.length-1&&(t=0,be.value=!0)):(t=0,be.value=!1)}))},Ie=e=>("children"in e&&e.children.forEach((e=>Ie(e))),ve.push(e.id),e.id),ye=e=>{"cancel"===e?(J.value="",u.value.fitsTablePro.setAllCheckboxRow(!1)):(u.value.fitsTablePro.commitProxy("query"),J.value="",u.value.fitsTablePro.setAllCheckboxRow(!1)),p("closeDialog",!1)},Qe=h("");function xe(e){var A;Qe.value=e,null==(A=u.value)||A.fitsTablePro.commitProxy("query")}function Le(e){Qe.value=e}return E((async()=>{(async()=>{const e=await Y();S.value=e.ReturnData.TableList})(),he.forEach((e=>{Ie(e)}))})),I((()=>{u=null})),(e,o)=>{const c=s,p=A,f=r,m=d,h=n;return y(),Q("div",O,[x("div",K,[x("div",X,[x("div",_,[x("div",$,[L(c,{modelValue:B(R),"onUpdate:modelValue":o[0]||(o[0]=e=>k(R)?R.value=e:R=e),placeholder:"搜索部门","prefix-icon":B(l)},null,8,["modelValue","prefix-icon"])]),x("div",ee,[L(B(t),{data:B(S),"highlight-current":"","node-key":"treeData.id",props:j,"default-expand-all":"",onNodeClick:z,ref_key:"treeRef",ref:V,"filter-node-method":N},{default:P((({node:e,data:A})=>[x("span",Ae,[A.children&&A.children.length>0&&A.pid?(y(),Q("img",{key:0,src:B(g).img1,style:{color:"#FFCA28"}},null,8,le)):w("v-if",!0),A.children?w("v-if",!0):(y(),Q("img",{key:1,class:"people",src:B(g).img2,style:{color:"#ACC6D3"}},null,8,te)),T(" "+U(A.name),1)])])),_:1},8,["data"])])]),x("div",ae,[x("div",ie,[x("div",oe,[L(B(i),{ref_key:"xGrid",ref:u,"max-height":"400",option:B(v),onCheckboxAll:ue,onCheckboxChange:ge},{buttons:P((()=>[L(B(a),{onInputSearch:xe,onInputChange:Le})])),_:1},8,["option"])]),L(f,{height:"140px",class:F("scrollPart")},{default:P((()=>{var e;return[x("div",se,[(null==(e=B(J))?void 0:e.length)?(y(),Q("div",re,"已选用户:"+U(B(J).length)+"人",1)):(y(),Q("div",de,"已选用户:0人")),x("div",ne,[(y(!0),Q(D,null,q(B(J),(e=>(y(),G(p,{key:e,class:"mx-1",closable:"","disable-transitions":!1,onClose:A=>(e=>{J.value.splice(J.value.indexOf(e),1),M((()=>{u.value.fitsTablePro.setCheckboxRow(e,!1)}))})(e)},{default:P((()=>[T(U(e.name),1)])),_:2},1032,["onClose"])))),128))])])]})),_:1})])])]),x("div",ce,[pe,L(c,{modelValue:B(W),"onUpdate:modelValue":o[1]||(o[1]=e=>k(W)?W.value=e:W=e),placeholder:"搜索部门","prefix-icon":B(l)},null,8,["modelValue","prefix-icon"]),L(m,{modelValue:B(be),"onUpdate:modelValue":o[2]||(o[2]=e=>k(be)?be.value=e:be=e),onChange:Ce},{default:P((()=>[T("全选")])),_:1},8,["modelValue"]),L(B(t),{data:he,ref_key:"treeref",ref:Re,"show-checkbox":"","node-key":"id",props:j,onCheckChange:Ee,"filter-node-method":me,"default-expand-all":""},null,512)])]),x("div",fe,[L(h,{class:"relate-button",onClick:o[3]||(o[3]=e=>ye("cancel"))},{default:P((()=>[T("取消")])),_:1}),L(h,{class:"relate-button",type:"primary",onClick:o[4]||(o[4]=e=>ye("submit"))},{default:P((()=>[T("提交")])),_:1})])])}}}),[["__scopeId","data-v-7572a904"]]);const ge=["onClick"],me=["onClick"],ve=(e=>(W("data-v-bd6a426a"),e=e(),S(),e))((()=>x("span",null,"更多",-1))),Re={class:"btn"},he={class:"btn"};var Ce=o(R({__name:"userManage",setup(A,{expose:l}){const{user:t}=e();let a=h();l({xGrid:a});const{setting:o}=e();let s="dialog"===o.formType?2:1,r=h();new URL("data:image/png;base64,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",self.location).href,new URL("/fitsadmin/assets/yingyerenyuan.8e601937.png",self.location).href;let d=h(!0);const R={keepSource:!1,showOverflow:"tooltip",id:"userManageTable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"SystemManageUserList",dataBase:t.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"用户名",itemRender:{name:"input",props:{placeholder:"请输入用户名"}}},{field:"mobiTel",span:3,title:"手机号码",itemRender:{name:"input",props:{placeholder:"请输入手机号"}}},{field:"status",span:3,title:"用户状态",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"在职"},{value:"3",label:"离职"},{value:"4",label:"挂起"},{value:"5",label:"已关闭"}]}},{field:"tap",span:3,title:"用户标签",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"项目私立"}]}},{field:"department",span:3,title:"上级机构",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"检测机构"},{value:"3",label:"供应商"},{value:"4",label:"客户"},{value:"5",label:"运维商"}]}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:50},{field:"name",title:"用户名称",minWidth:80},{field:"account",title:"用户账号",minWidth:80},{field:"mobiTel",title:"手机号码",minWidth:100},{field:"sex",title:"性别",minWidth:50},{field:"department",title:"上级机构",minWidth:80},{field:"tap",title:"用户标签",width:100,align:"center",slots:{default:e=>j("div",{style:"overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;text-align:center"},[j("span",{style:"display:block;background: #ecf5ff;padding: 8px; color: #007dff; border-radius: 2px;padding: 0 2px;border:1px solid #79BBFF;"},e.row.tap)])}},{field:"status",title:"用户状态",slots:{default:"status"},minWidth:80,align:"center"},{field:"comeDate",title:"入职时间",minWidth:100},{field:"Operation",title:"操作",slots:{default:"operate"},fixed:"right",minWidth:150}],toolbarConfig:{buttons:[{code:"AddUser",name:"新建用户",status:"primary",onClick:()=>{alert(1)}},{code:"RelateUser",name:"关联角色"},{code:"EnableUser",name:"启用"},{code:"DisableUser",name:"禁用"},{code:"DeleteUser",name:"批量删除"}],tools:{enabled:!0}},tooltipConfig:{contentMethod:({column:e,row:A})=>{const{field:l}=e;if("department"===l)return A[l]}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((A=>{H(e,{pageIndex:10,pageSize:20}).then((e=>{const{ReturnData:l}=e;A(l?{result:C.toTreeArray(l.TableList,{clear:!0}),page:{total:l.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:b}=Z(R,a),E={async toolbarButtonClick({code:e}){let A=a.value.fitsTablePro.getCheckboxRecords();switch(e){case"AddUser":k.visible=!0,k.dialogProp.title="新增部门";break;case"RelateUser":W.value=!0;break;case"EnableUser":A.length?(Y.visible=!0,Y.dialogText="是否确定启用选中的用户?",Y.key="EnableUser"):J({message:"未选中启用的相关用户",type:"error"});break;case"DisableUser":A.length?(Y.visible=!0,Y.dialogText="是否确定禁用选中的用户?",Y.key="DisableUser"):J({message:"未选中禁用的相关用户",type:"error"});break;case"DeleteUser":A.length?(Y.visible=!0,Y.dialogText="是否确定删除选中的用户?",Y.key="DeleteUser"):J({message:"未选中删除的相关用户",type:"error"})}}},k=V({visible:!1,forms:[{title:"用户信息",iconClass:"user",form:new c({rule:[{type:"input",field:"name",title:"用户名称",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入用户名称"}]},{type:"input",field:"account",title:"用户账号",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入用户账号"}]},{type:"input",field:"mobiTel",title:"手机号码",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入手机号码"},{validator:(e,A)=>z(A),message:"请输入正确的手机号"}]},{type:"input",field:"pwd",title:"初始密码",props:{type:"password",placeholder:"请输入"},effect:{required:"请输入原始密码"}},{type:"input",field:"number",title:"电话",props:{placeholder:"请输入"}},{type:"datePicker",field:"birth",title:"生日",props:{placeholder:"请选择"}},{type:"input",field:"email",title:"邮件",props:{placeholder:"请输入"}},{type:"radio",field:"sex",title:"性别",options:[{value:"男",label:"男"},{value:"女",label:"女"}]},{type:"input",field:"shortNum",title:"短号",props:{placeholder:"请输入"}},{type:"radio",field:"status",title:"状态",options:[{value:0,label:"启用"},{value:1,label:"禁用"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:s})},{title:"组织关系",iconClass:"fits-system",form:new c({rule:[{type:"title",field:"department",title:"所属部门",component:N(p),props:{options:new f({select:{placeholder:"请选择",clearable:!0},input:{placeholder:"部门搜索"},tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}],checkStrictly:!0}})},validate:[{required:!0,message:"请选择",trigger:"change"}]},{type:"datePicker",field:"comeDate",title:"入职日期",props:{placeholder:"请选择"},validate:[{required:!0,type:"string",message:"请选择入职日期"}]},{type:"input",field:"office",title:"办公室",props:{placeholder:"请输入"}},{type:"input",field:"offiTel",title:"办公号码",props:{placeholder:"请输入"}},{type:"datePicker",field:"leaveDate",title:"离职日期",props:{placeholder:"请选择"}},{type:"select",field:"tap",title:"用户标签",props:{filterable:!0,placeholder:"请选择"},options:[{value:"项目私立",label:"项目私立"},{value:"项目私立1",label:"项目私立1"},{value:"项目私立2",label:"项目私立2"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:s})}],dialogProp:{title:"新增用户",width:"60%"},formType:o.formType});let w=h();const q=async e=>{if(!0===d.value){a.value.fitsTablePro.insert(e),k.visible=!1}else{const A=a.value.fitsTablePro;let l=A.reactData.tableData,t=l.findIndex((e=>e.id===w.value.id));l.splice(t,1,e),A.loadData(l),k.visible=!1}M((()=>{a.value.fitsTablePro.commitProxy("query")}))};function G(){k.visible=!1,d.value=!0}let W=h(!1);const S=V({title:"关联角色",width:"85%"}),Y=V({dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}}),O=()=>{Y.visible=!1,a.value.fitsTablePro.setAllCheckboxRow(!1)},K=e=>{W.value=!1};return I((()=>{a.value=null})),(e,A)=>{const l=n,t=m,o=v;return y(),Q(D,null,[L(B(i),{ref_key:"xGrid",ref:a,option:B(b),"grid-events":E},{operate:P((({slotProps:e})=>[x("span",{onClick:A=>{return l=e.row,k.dialogProp.title="编辑用户",k.visible=!0,d.value=!1,M((()=>{r.value.formRef.forEach((e=>{e.fApi.setValue(l)}))})),void(w.value=l);var l}},"编辑",8,ge),x("span",{onClick:A=>(async e=>{Y.dialogText="是否确定删除选中的用户?",Y.visible=!0})(e.row)},"删除",8,me),L(t,{trigger:"hover",placement:"bottom","popper-class":"tag-popover"},{reference:P((()=>[ve])),default:P((()=>[x("div",Re,[L(l,null,{default:P((()=>[T("分配权限")])),_:1})]),x("div",he,[L(l,null,{default:P((()=>[T("重置密码")])),_:1})])])),_:1})])),status:P((({slotProps:e})=>[L(o,{modelValue:e.row.status,"onUpdate:modelValue":A=>e.row.status=A,"active-value":0,"inactive-value":1,style:{"--el-switch-on-color":"#020202","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"]),L(B(u),{option:k,onSubmit:q,onCancel:G,class:"dialogFormExample",ref_key:"formtypeRef",ref:r},null,8,["option"]),L(B(g),{visible:B(W),dialogProp:S,class:"relate",showFooter:!1},{default:P((()=>[L(ue,{onCloseDialog:K})])),_:1},8,["visible","dialogProp"]),L(B(g),{visible:Y.visible,class:F("Users-baseDialog"),dialogProp:Y.props,onCancel:O,onSubmit:A[0]||(A[0]=e=>(e=>{const A=a.value;let l=a.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"EnableUser":l.forEach((e=>{e.status=0})),M((()=>{A.fitsTablePro.commitProxy("query")}));break;case"DisableUser":l.forEach((e=>{e.status=1})),M((()=>{A.fitsTablePro.commitProxy("query")}));break;case"DeleteUser":A.fitsTablePro.remove(l),M((()=>{A.fitsTablePro.commitProxy("query")}))}O()})(Y.key))},{default:P((()=>[T(U(Y.dialogText),1)])),_:1},8,["visible","dialogProp"])],64)}}}),[["__scopeId","data-v-bd6a426a"]]);const be={class:"user-manage"},Ee={class:"left"},Ie={class:"search"},ye={class:"tree_list"},Qe={class:"custom-tree-node"},xe=["src"],Le=["src"],Be={class:"right"},ke=R({name:"User"});var Pe=o(R({...ke,setup(e){let A={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/fitsadmin/assets/yingyerenyuan.8e601937.png",self.location).href},a=h(""),i=h();const o={children:"children",lable:"label"};let d=h();const n=(e,A)=>!e||A.name.includes(e),c=h();b(a,(e=>{c.value.filter(e)}));const p=e=>{e.children||M((()=>{d.value.xGrid.fitsTablePro.commitProxy("query")}))};return E((async()=>{(async()=>{const e=await Y();i.value=e.ReturnData.TableList})()})),(e,f)=>{const u=s,g=r;return y(),Q("div",be,[x("div",Ee,[x("div",Ie,[L(u,{modelValue:B(a),"onUpdate:modelValue":f[0]||(f[0]=e=>k(a)?a.value=e:a=e),placeholder:"搜索部门","prefix-icon":B(l)},null,8,["modelValue","prefix-icon"])]),x("div",ye,[L(g,null,{default:P((()=>[L(B(t),{data:B(i),"highlight-current":"","node-key":"id",props:o,"default-expand-all":"",onNodeClick:p,ref_key:"treeRef",ref:c,"filter-node-method":n},{default:P((({node:e,data:l})=>[x("span",Qe,[l.children&&l.children.length>0&&l.pid?(y(),Q("img",{key:0,src:B(A).img1,style:{color:"#FFCA28"}},null,8,xe)):w("v-if",!0),l.children?w("v-if",!0):(y(),Q("img",{key:1,class:"people",src:B(A).img2,style:{color:"#ACC6D3"}},null,8,Le)),T(" "+U(l.name),1)])])),_:1},8,["data"])])),_:1})])]),x("div",Be,[L(Ce,{ref_key:"user",ref:d},null,512)])])}}}),[["__scopeId","data-v-3aec6d18"]]);export{Pe as default};
