import{m as e,M as A,N as l,O as t,P as a,o as i,Q as o,T as s,s as r,x as d,j as n,F as c,U as p,H as u,V as f,W as g,z as m,X as v}from"./index-5ebca8e7.js";import{g as R,a as h}from"./system-dc328b99.js";import{u as C}from"./FitsTableProHook-1efe4711.js";import{E,a as b,aF as I,b as y,d as Q,I as x,l as L,m as B,p as k,O as P,u as w,A as T,R as U,X as D,V as q,W as G,P as F,a7 as W,S as M,L as S,n as j,aC as V,aD as N,ag as H,J as Y,ao as Z}from"./vxetable-f32c91e3.js";import{i as z}from"./index-feecb639.js";import{E as J}from"./index-fa608d1d.js";import"./echarts-1215139a.js";const O={class:"relate-user"},X={class:"relate-content"},K={class:"relateLeft"},_={class:"leftTree"},$={class:"search"},ee={class:"tree_list"},Ae={class:"custom-tree-node"},le=["src"],te=["src"],ae={class:"leftTable"},ie={class:"scrollContent"},oe={class:"tableContent"},se={class:"tableBottom"},re={key:0,class:"title"},de={key:1,class:"title"},ne={class:"list"},ce={class:"relateRight"},pe=(e=>(V("data-v-cd19c018"),e=e(),N(),e))((()=>k("div",{class:"title"},"分配角色",-1))),ue={class:"relate-bottom"},fe=n(E({__name:"userList",emits:["closeDialog"],setup(n,{expose:c,emit:p}){const{user:u}=e();let f=b();c(f);let g={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/fitsadmin/vite-vue3/assets/yingyerenyuan-8e601937.png",self.location).href};const m={keepSource:!0,showOverflow:"tooltip",id:"toolbar_demo_2",rowConfig:{height:40,isCurrent:!0},storage:{enabled:!0,key:"userList",dataBase:u.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},align:"center",columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:50},{field:"name",title:"用户名称",minWidth:80},{field:"account",title:"用户账号",minWidth:80},{field:"mobiTel",title:"手机号码",minWidth:100},{field:"sex",title:"性别",minWidth:50}],toolbarConfig:{slots:{buttons:"buttons"}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e},A)=>new Promise((e=>{R(A,{pageIndex:10,pageSize:20}).then((A=>{const{ReturnData:l}=A;e(l?{result:I.toTreeArray(l.TableList,{clear:!0}),page:{total:l.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:v}=C(m,f);let E=b(""),V=b(),N=b();const H={children:"children",lable:"label"},Y=b();y(E,(e=>{Y.value.filter(e)}));const Z=(e,A)=>!e||A.name.includes(e),z=e=>{e.children||j((()=>{f.value.fitsTablePro.commitProxy("query")})),J.value=""};let J=b();const fe=()=>{let e=f.value.fitsTablePro.getCheckboxRecords();J.value=e},ge=()=>{let e=f.value.fitsTablePro.getCheckboxRecords();J.value=e};y(V,(e=>{Re.value.filter(e)}));const me=(e,A)=>!e||A.label.includes(e),ve=[],Re=b(),he=[{id:1,label:"销售人员",children:[{id:11,label:"销售人员1"},{id:12,label:"销售人员2"}]},{id:2,label:"销售人员"},{id:3,label:"服务人员",children:[{id:31,label:"服务人员1"},{id:32,label:"服务人员2"}]},{id:4,label:"服务人员",children:[{id:41,label:"服务人员1"},{id:42,label:"服务人员2"}]},{id:5,label:"服务人员",children:[]},{id:6,label:"服务人员"}],Ce=()=>{Ee.value?he.forEach((e=>{Re.value.setChecked(e,!0,!0)})):Re.value.setCheckedNodes([])};let Ee=b(!1);const be=(e,A,l)=>{let t=0;ve.forEach(((e,A)=>{Re.value.getNode(e).checked?(t++,t==ve.length-1&&(t=0,Ee.value=!0)):(t=0,Ee.value=!1)}))},Ie=e=>("children"in e&&e.children.forEach((e=>Ie(e))),ve.push(e.id),e.id),ye=e=>{"cancel"===e?(J.value="",f.value.fitsTablePro.setAllCheckboxRow(!1)):(f.value.fitsTablePro.commitProxy("query"),J.value="",f.value.fitsTablePro.setAllCheckboxRow(!1)),p("closeDialog",!1)},Qe=b("");function xe(e){var A;Qe.value=e,null==(A=f.value)||A.fitsTablePro.commitProxy("query")}function Le(e){Qe.value=e}return Q((async()=>{(async()=>{const e=await h();N.value=e.ReturnData.TableList})(),he.forEach((e=>{Ie(e)}))})),x((()=>{f=null})),(e,n)=>{const c=i,p=o,u=s,m=r,R=d;return L(),B("div",O,[k("div",X,[k("div",K,[k("div",_,[k("div",$,[P(c,{modelValue:w(E),"onUpdate:modelValue":n[0]||(n[0]=e=>T(E)?E.value=e:E=e),placeholder:"搜索部门","prefix-icon":w(A)},null,8,["modelValue","prefix-icon"])]),k("div",ee,[P(w(l),{data:w(N),"highlight-current":"","node-key":"treeData.id",props:H,"default-expand-all":"",onNodeClick:z,ref_key:"treeRef",ref:Y,"filter-node-method":Z},{default:U((({node:e,data:A})=>[k("span",Ae,[A.children&&A.children.length>0&&A.pid?(L(),B("img",{key:0,src:w(g).img1,style:{color:"#FFCA28"}},null,8,le)):D("",!0),A.children?D("",!0):(L(),B("img",{key:1,class:"people",src:w(g).img2,style:{color:"#ACC6D3"}},null,8,te)),q(" "+G(A.name),1)])])),_:1},8,["data"])])]),k("div",ae,[k("div",ie,[k("div",oe,[P(w(a),{ref_key:"xGrid",ref:f,"max-height":"400",option:w(v),onCheckboxAll:fe,onCheckboxChange:ge},{buttons:U((()=>[P(w(t),{onInputSearch:xe,onInputChange:Le})])),_:1},8,["option"])]),P(u,{height:"140px",class:S("scrollPart")},{default:U((()=>{var e;return[k("div",se,[(null==(e=w(J))?void 0:e.length)?(L(),B("div",re,"已选用户:"+G(w(J).length)+"人",1)):(L(),B("div",de,"已选用户:0人")),k("div",ne,[(L(!0),B(F,null,W(w(J),(e=>(L(),M(p,{key:e,class:"mx-1",closable:"","disable-transitions":!1,onClose:A=>(e=>{J.value.splice(J.value.indexOf(e),1),j((()=>{f.value.fitsTablePro.setCheckboxRow(e,!1)}))})(e)},{default:U((()=>[q(G(e.name),1)])),_:2},1032,["onClose"])))),128))])])]})),_:1})])])]),k("div",ce,[pe,P(c,{modelValue:w(V),"onUpdate:modelValue":n[1]||(n[1]=e=>T(V)?V.value=e:V=e),placeholder:"搜索部门","prefix-icon":w(A)},null,8,["modelValue","prefix-icon"]),P(m,{modelValue:w(Ee),"onUpdate:modelValue":n[2]||(n[2]=e=>T(Ee)?Ee.value=e:Ee=e),onChange:Ce},{default:U((()=>[q("全选")])),_:1},8,["modelValue"]),P(w(l),{data:he,ref_key:"treeref",ref:Re,"show-checkbox":"","node-key":"id",props:H,onCheckChange:be,"filter-node-method":me,"default-expand-all":""},null,512)])]),k("div",ue,[P(R,{class:"relate-button",onClick:n[3]||(n[3]=e=>ye("cancel"))},{default:U((()=>[q("取消")])),_:1}),P(R,{class:"relate-button",type:"primary",onClick:n[4]||(n[4]=e=>ye("submit"))},{default:U((()=>[q("提交")])),_:1})])])}}}),[["__scopeId","data-v-cd19c018"]]),ge=["onClick"],me=["onClick"],ve=(e=>(V("data-v-de464085"),e=e(),N(),e))((()=>k("span",null,"更多",-1))),Re={class:"btn"},he={class:"btn"},Ce=n(E({__name:"userManage",setup(A,{expose:l}){const{user:t}=e();let i=b();l({xGrid:i});const{setting:o}=e();let s="dialog"===o.formType?2:1,r=b();new URL("data:image/png;base64,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",self.location).href,new URL("/fitsadmin/vite-vue3/assets/yingyerenyuan-8e601937.png",self.location).href;let n=b(!0);const h={keepSource:!1,showOverflow:"tooltip",id:"userManageTable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"SystemManageUserList",dataBase:t.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"用户名",itemRender:{name:"input",props:{placeholder:"请输入用户名"}}},{field:"mobiTel",span:3,title:"手机号码",itemRender:{name:"input",props:{placeholder:"请输入手机号"}}},{field:"status",span:3,title:"用户状态",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"在职"},{value:"3",label:"离职"},{value:"4",label:"挂起"},{value:"5",label:"已关闭"}]}},{field:"tap",span:3,title:"用户标签",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"项目私立"}]}},{field:"department",span:3,title:"上级机构",itemRender:{name:"ElSelect",props:{collapseTags:!0,collapseTagsTooltip:!0,clearable:!0},options:[{value:"2",label:"检测机构"},{value:"3",label:"供应商"},{value:"4",label:"客户"},{value:"5",label:"运维商"}]}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:50},{field:"name",title:"用户名称",minWidth:80},{field:"account",title:"用户账号",minWidth:80},{field:"mobiTel",title:"手机号码",minWidth:100},{field:"sex",title:"性别",minWidth:50},{field:"department",title:"上级机构",minWidth:80},{field:"tap",title:"用户标签",width:100,align:"center",slots:{default:e=>H("div",{style:"overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;text-align:center"},[H("span",{style:"display:block;background: #ecf5ff;padding: 8px; color: #007dff; border-radius: 2px;padding: 0 2px;border:1px solid #79BBFF;"},e.row.tap)])}},{field:"status",title:"用户状态",slots:{default:"status"},minWidth:80,align:"center"},{field:"comeDate",title:"入职时间",minWidth:100},{field:"Operation",title:"操作",slots:{default:"operate"},fixed:"right",minWidth:150}],toolbarConfig:{buttons:[{code:"AddUser",name:"新建用户",status:"primary",onClick:()=>{alert(1)}},{code:"RelateUser",name:"关联角色"},{code:"EnableUser",name:"启用"},{code:"DisableUser",name:"禁用"},{code:"DeleteUser",name:"批量删除"}],tools:{enabled:!0}},tooltipConfig:{contentMethod:({column:e,row:A})=>{const{field:l}=e;if("department"===l)return A[l]}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((A=>{R(e,{pageIndex:10,pageSize:20}).then((e=>{const{ReturnData:l}=e;A(l?{result:I.toTreeArray(l.TableList,{clear:!0}),page:{total:l.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:E}=C(h,i),y={async toolbarButtonClick({code:e}){let A=i.value.fitsTablePro.getCheckboxRecords();switch(e){case"AddUser":Q.visible=!0,Q.dialogProp.title="新增部门";break;case"RelateUser":M.value=!0;break;case"EnableUser":A.length?(N.visible=!0,N.dialogText="是否确定启用选中的用户?",N.key="EnableUser"):J({message:"未选中启用的相关用户",type:"error"});break;case"DisableUser":A.length?(N.visible=!0,N.dialogText="是否确定禁用选中的用户?",N.key="DisableUser"):J({message:"未选中禁用的相关用户",type:"error"});break;case"DeleteUser":A.length?(N.visible=!0,N.dialogText="是否确定删除选中的用户?",N.key="DeleteUser"):J({message:"未选中删除的相关用户",type:"error"})}}},Q=Y({visible:!1,forms:[{title:"用户信息",iconClass:"user",form:new c({rule:[{type:"input",field:"name",title:"用户名称",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入用户名称"}]},{type:"input",field:"account",title:"用户账号",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入用户账号"}]},{type:"input",field:"mobiTel",title:"手机号码",props:{placeholder:"请输入"},validate:[{required:!0,type:"string",message:"请输入手机号码"},{validator:(e,A)=>z(A),message:"请输入正确的手机号"}]},{type:"input",field:"pwd",title:"初始密码",props:{type:"password",placeholder:"请输入"},effect:{required:"请输入原始密码"}},{type:"input",field:"number",title:"电话",props:{placeholder:"请输入"}},{type:"datePicker",field:"birth",title:"生日",props:{placeholder:"请选择"}},{type:"input",field:"email",title:"邮件",props:{placeholder:"请输入"}},{type:"radio",field:"sex",title:"性别",options:[{value:"男",label:"男"},{value:"女",label:"女"}]},{type:"input",field:"shortNum",title:"短号",props:{placeholder:"请输入"}},{type:"radio",field:"status",title:"状态",options:[{value:0,label:"启用"},{value:1,label:"禁用"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:s})},{title:"组织关系",iconClass:"fits-system",form:new c({rule:[{type:"title",field:"department",title:"所属部门",component:Z(p),props:{options:new u({select:{placeholder:"请选择",clearable:!0},input:{placeholder:"部门搜索"},tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}],checkStrictly:!0}})},validate:[{required:!0,message:"请选择",trigger:"change"}]},{type:"datePicker",field:"comeDate",title:"入职日期",props:{placeholder:"请选择"},validate:[{required:!0,type:"string",message:"请选择入职日期"}]},{type:"input",field:"office",title:"办公室",props:{placeholder:"请输入"}},{type:"input",field:"offiTel",title:"办公号码",props:{placeholder:"请输入"}},{type:"datePicker",field:"leaveDate",title:"离职日期",props:{placeholder:"请选择"}},{type:"select",field:"tap",title:"用户标签",props:{filterable:!0,placeholder:"请选择"},options:[{value:"项目私立",label:"项目私立"},{value:"项目私立1",label:"项目私立1"},{value:"项目私立2",label:"项目私立2"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:s})}],dialogProp:{title:"新增用户",width:"60%"},formType:o.formType});let T=b();const D=async e=>{if(!0===n.value){i.value.fitsTablePro.insert(e),Q.visible=!1}else{const A=i.value.fitsTablePro;let l=A.reactData.tableData,t=l.findIndex((e=>e.id===T.value.id));l.splice(t,1,e),A.loadData(l),Q.visible=!1}j((()=>{i.value.fitsTablePro.commitProxy("query")}))};function W(){Q.visible=!1,n.value=!0}let M=b(!1);const V=Y({title:"关联角色",width:"85%"}),N=Y({dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}}),O=()=>{N.visible=!1,i.value.fitsTablePro.setAllCheckboxRow(!1)},X=e=>{M.value=!1};return x((()=>{i.value=null})),(e,A)=>{const l=d,t=m,o=v;return L(),B(F,null,[P(w(a),{ref_key:"xGrid",ref:i,option:w(E),"grid-events":y},{operate:U((({slotProps:e})=>[k("span",{onClick:A=>{return l=e.row,Q.dialogProp.title="编辑用户",Q.visible=!0,n.value=!1,j((()=>{r.value.formRef.forEach((e=>{e.fApi.setValue(l)}))})),void(T.value=l);var l}},"编辑",8,ge),k("span",{onClick:A=>(async e=>{N.dialogText="是否确定删除选中的用户?",N.visible=!0})(e.row)},"删除",8,me),P(t,{trigger:"hover",placement:"bottom","popper-class":"tag-popover"},{reference:U((()=>[ve])),default:U((()=>[k("div",Re,[P(l,null,{default:U((()=>[q("分配权限")])),_:1})]),k("div",he,[P(l,null,{default:U((()=>[q("重置密码")])),_:1})])])),_:1})])),status:U((({slotProps:e})=>[P(o,{modelValue:e.row.status,"onUpdate:modelValue":A=>e.row.status=A,"active-value":0,"inactive-value":1,style:{"--el-switch-on-color":"#020202","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"]),P(w(f),{option:w(Q),onSubmit:D,onCancel:W,class:"dialogFormExample",ref_key:"formtypeRef",ref:r},null,8,["option"]),P(w(g),{visible:w(M),dialogProp:w(V),class:"relate",showFooter:!1},{default:U((()=>[P(fe,{onCloseDialog:X})])),_:1},8,["visible","dialogProp"]),P(w(g),{visible:w(N).visible,class:S("Users-baseDialog"),dialogProp:w(N).props,onCancel:O,onSubmit:A[0]||(A[0]=e=>(e=>{const A=i.value;let l=i.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"EnableUser":l.forEach((e=>{e.status=0})),j((()=>{A.fitsTablePro.commitProxy("query")}));break;case"DisableUser":l.forEach((e=>{e.status=1})),j((()=>{A.fitsTablePro.commitProxy("query")}));break;case"DeleteUser":A.fitsTablePro.remove(l),j((()=>{A.fitsTablePro.commitProxy("query")}))}O()})(w(N).key))},{default:U((()=>[q(G(w(N).dialogText),1)])),_:1},8,["visible","dialogProp"])],64)}}}),[["__scopeId","data-v-de464085"]]),Ee={class:"user-manage"},be={class:"left"},Ie={class:"search"},ye={class:"tree_list"},Qe={class:"custom-tree-node"},xe=["src"],Le=["src"],Be={class:"right"},ke=E({name:"User"}),Pe=n(E({...ke,setup(e){let t={img1:new URL("data:image/png;base64,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",self.location).href,img2:new URL("/fitsadmin/vite-vue3/assets/yingyerenyuan-8e601937.png",self.location).href},a=b(""),o=b();const r={children:"children",lable:"label"};let d=b();const n=(e,A)=>!e||A.name.includes(e),c=b();y(a,(e=>{c.value.filter(e)}));const p=e=>{e.children||j((()=>{d.value.xGrid.fitsTablePro.commitProxy("query")}))};return Q((async()=>{(async()=>{const e=await h();o.value=e.ReturnData.TableList})()})),(e,u)=>{const f=i,g=s;return L(),B("div",Ee,[k("div",be,[k("div",Ie,[P(f,{modelValue:w(a),"onUpdate:modelValue":u[0]||(u[0]=e=>T(a)?a.value=e:a=e),placeholder:"搜索部门","prefix-icon":w(A)},null,8,["modelValue","prefix-icon"])]),k("div",ye,[P(g,null,{default:U((()=>[P(w(l),{data:w(o),"highlight-current":"","node-key":"id",props:r,"default-expand-all":"",onNodeClick:p,ref_key:"treeRef",ref:c,"filter-node-method":n},{default:U((({node:e,data:A})=>[k("span",Qe,[A.children&&A.children.length>0&&A.pid?(L(),B("img",{key:0,src:w(t).img1,style:{color:"#FFCA28"}},null,8,xe)):D("",!0),A.children?D("",!0):(L(),B("img",{key:1,class:"people",src:w(t).img2,style:{color:"#ACC6D3"}},null,8,Le)),q(" "+G(A.name),1)])])),_:1},8,["data"])])),_:1})])]),k("div",Be,[P(Ce,{ref_key:"user",ref:d},null,512)])])}}}),[["__scopeId","data-v-a1c06187"]]);export{Pe as default};
