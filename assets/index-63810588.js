import{n as e,F as t,X as a,K as l,U as i,Y as o,Z as r,$ as s,a0 as n,l as d}from"./index-b6db054e.js";import{v as p,a as m,at as c,d as b,n as f,B as u,ad as g,f as h,h as v,F as y,I as D,i as P,u as k,M as x,N as T,D as C}from"./vxetable-1644ac3d.js";import{c as w}from"./system-f299a2f0.js";import{u as I}from"./FitsTableProHook-a8ee8569.js";import"./echarts-c32f5a2f.js";const R={class:"department-manage"},q=["onClick"],S=["onClick"],W=p({name:"Department"}),j=d(p({...W,setup(d){const{user:p}=e(),W=m(),j={keepSource:!0,id:"department-part",rowConfig:{height:52,isHover:!0,useKey:!0},storage:{enabled:!0,key:"SystemManageDepartmentList",dataBase:p.userInfo.id},formConfig:{items:[{field:"name",span:3,title:"部门名称",itemRender:{name:"$input",props:{placeholder:"请输入部门名称"}}},{field:"code",span:3,title:"部门编码",itemRender:{name:"$input",props:{placeholder:"请输入部门编码"}}},{field:"status",span:3,title:"部门状态",itemRender:{name:"$select",options:[{value:"0",label:"启用"},{value:"1",label:"停用"}],props:{placeholder:"请选择状态"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:60},{field:"Title",title:"部门名称",minWidth:210,treeNode:!0},{field:"code",title:"部门编码",minWidth:150,align:"center"},{field:"Sort",title:"排序",minWidth:150,align:"center"},{field:"remark",title:"备注",minWidth:120},{field:"status",title:"部门状态",minWidth:120,slots:{default:"status"},align:"center"},{field:"CreateTime",title:"创建时间",minWidth:180,align:"center"},{field:"Operation",title:"操作",minWidth:150,slots:{default:"operate"},fixed:"right"}],showOverflow:"tooltip",toolbarConfig:{buttons:[{code:"add",name:"新增部门",status:"primary"},{code:"enable",name:"启用"},{code:"disable",name:"禁用"},{code:"export",name:"导出"},{code:"Depdelete",name:"批量删除"}],tools:{enabled:!0}},treeConfig:{transform:!0,rowField:"id",parentField:"PId"},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((t=>{w(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;t(a?{result:c.toTreeArray(a.TableList,{clear:!0}),page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}},tooltipConfig:{contentMethod:({column:e,row:t})=>{const{field:a}=e;if("remark"===a)return t[a]}}},F={async toolbarButtonClick({code:e}){let t=W.value.fitsTablePro.getCheckboxRecords();switch(e){case"add":A.visible=!0,A.dialogProp.title="新增部门";break;case"enable":t.length?(V.baseDepartment.visible=!0,V.baseDepartment.dialogText="是否确定启用选中的部门?",V.baseDepartment.key="Departmentenable"):s({message:"未选中启动的相关部门",type:"error"});break;case"disable":t.length?(V.baseDepartment.visible=!0,V.baseDepartment.dialogText="是否确定禁用选中的部门?",V.baseDepartment.key="Departmentdisable"):s({message:"未选中禁用的相关部门",type:"error"});break;case"export":break;case"Depdelete":t.length?(V.baseDepartment.visible=!0,V.baseDepartment.dialogText="是否确定删除选中的部门?",V.baseDepartment.key="Departmentremove"):s({message:"未选中删除的相关部门",type:"error"})}}};let _=m();const{fitsTablePro:B}=I(j,W);b((()=>{f((()=>{})),setTimeout((()=>{}),2e3)}));const V=u({addDepartment:{visible:!1,props:{title:"新增部门",width:"40%"},info:{}},baseDepartment:{dialogText:"",key:"",visible:!1,props:{title:"提示",width:"30%"}}}),E=e=>{switch(e){case"addDepartment":V.addDepartment.visible=!1;break;case"baseDepartment":V.baseDepartment.visible=!1,W.value.fitsTablePro.setAllCheckboxRow(!1)}};let $=m();const A=u({visible:!1,forms:[{form:new t({rule:[{type:"title",field:"PId",title:"上级部门",component:g(a),props:{options:new l({select:{placeholder:"请选择",clearable:!0},input:{placeholder:"部门搜索"},tree:{nodeKey:"id",data:[{id:"150000198607018427",label:"广州华侨医院",children:[{id:"15000019860701848",PId:"150000198607018427",label:"医院医技",children:[{id:"15000019860701842",PId:"15000019860701848",label:"医院医技01"},{id:"15000019860701846",PId:"15000019860701848",label:"医院医技02"}]}]},{id:"150000198607018400",label:"广州第一人民医院",children:[{id:"16000019860701848",PId:"150000198607018400",label:"医院医技",children:[{id:"15100019860701842",PId:"16000019860701848",label:"医院医技01"},{id:"15120019860701842",PId:"16000019860701848",label:"医院医技02"}]}]},{id:"150100198607018400",label:"广州南方医科附属第三医院",children:[{id:"16000019860701748",PId:"150100198607018400",label:"医院医技",children:[{id:"15100019860721842",PId:"16000019860701748",label:"医院医技01"},{id:"15100019860751842",PId:"16000019860701748",label:"医院医技02"}]}]}],checkStrictly:!0}})},validate:[{required:!0,message:"请选择",trigger:"change"}]},{type:"input",field:"Title",title:"部门名称",props:{placeholder:"请输入"},effect:{required:"请输入部门名称"}},{type:"input",field:"code",title:"部门编号",props:{placeholder:"请输入"},effect:{required:"请输入部门编号"}},{type:"input",field:"remark",title:"部门描述",props:{placeholder:"请输入"}},{type:"input",field:"Sort",title:"排序",props:{placeholder:"请输入"}},{type:"radio",field:"status",title:"状态",options:[{value:!0,label:"启用"},{value:!1,label:"禁用"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:1})}],dialogProp:{title:"",width:"35%"},formType:"dialog"});function K(e){if(A.dialogProp.title="新增部门")A.visible=!1;else if(A.dialogProp.title="修改部门"){let t=W.value.fitsTablePro.reactData.tableData.find((e=>e.id==$.value.id));Object.assign(t,e),W.value.fitsTablePro.commitProxy("query"),A.visible=!1}}return(e,t)=>{const a=n;return h(),v("div",R,[y(k(i),{option:k(B),ref_key:"xGrid",ref:W,"grid-events":F},{operate:D((({slotProps:e})=>[P("span",{onClick:t=>{return a=e.row,$.value=a,A.visible=!0,A.dialogProp.title="修改部门","null"===a.PId&&(a.PId=a.id),void f((()=>{_.value.formRef.forEach((e=>{e.fApi.setValue(a)}))}));var a}},"编辑",8,q),P("span",{onClick:t=>(async e=>{V.baseDepartment.visible=!0,V.baseDepartment.dialogText="是否确定删除选中的部门?"})(e.row)},"删除",8,S)])),status:D((({slotProps:e})=>[y(a,{modelValue:e.row.status,"onUpdate:modelValue":t=>e.row.status=t,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"]),y(k(o),{option:k(A),onSubmit:K,onCancel:t[0]||(t[0]=e=>k(A).visible=!1),class:"dialogFormExample",ref_key:"formtypeRef",ref:_},null,8,["option"]),y(k(r),{class:C(["baseDepartment","Department-baseDialog"]),visible:k(V).baseDepartment.visible,dialogProp:k(V).baseDepartment.props,onSubmit:t[1]||(t[1]=e=>(e=>{const t=W.value;let a=W.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"Departmentenable":a.forEach(((e,t)=>{e.status=!0})),f((()=>{t.fitsTablePro.commitProxy("query")}));break;case"Departmentdisable":a.forEach(((e,t)=>{e.status=!1})),f((()=>{t.fitsTablePro.commitProxy("query")}));break;case"Departmentremove":t.fitsTablePro.remove(a),f((()=>{t.fitsTablePro.commitProxy("query")}))}E("baseDepartment")})(k(V).baseDepartment.key)),onCancel:t[2]||(t[2]=e=>E("baseDepartment"))},{default:D((()=>[x(T(k(V).baseDepartment.dialogText),1)])),_:1},8,["visible","dialogProp"])])}}}),[["__scopeId","data-v-86622d49"]]);export{j as default};
