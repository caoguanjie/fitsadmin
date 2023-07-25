import{af as e,H as a,G as l,ag as t,ah as o,q as s,r as i,o as d,x as r,a0 as n,a1 as p,p as u,j as c,m,P as y,W as b,X as f}from"./index-9d7a3178.js";import{E as g,J as h,a as k,b as C,aF as T,l as _,m as w,p as v,O as V,R as x,u as I,G as U,S as D,V as P,X as S,L as j,d as z,n as W,W as L}from"./vxetable-f32c91e3.js";import{d as E}from"./system-e84bab67.js";import{u as F}from"./FitsTableProHook-9f0c18e6.js";import"./echarts-1215139a.js";const q={class:"add-role"},R={class:"add-content"},A={style:{display:"flex",width:"100%","justify-content":"space-between"}},M={key:1,style:{display:"flex","justify-content":"flex-start"}},N={key:3,style:{display:"flex","justify-content":"space-between",width:"100%"}},O={class:"add-bottom"},B=c(g({__name:"addMenu",props:{keys:String,setData:Object,requireData:Array},emits:["dataChange","closeDialog"],setup(c,{emit:m}){const y=c,b=h(new e({select:{clearable:!0}})),f=h(new a({select:{clearable:!0},tree:{nodeKey:"Id",data:[],checkStrictly:!0}})),g=k("default"),z=k();let W=h({Title:"",Icon:"",Type:"",Sort:"",ComponentPath:"",IsUrL:!1,IsCache:!1,State:!1,CreateTime:"",Address:"",ComponentName:""});C((()=>y.setData),(()=>{W=Object.assign(W,y.setData)}),{immediate:!0,deep:!0}),C((()=>y.requireData),(()=>{f.tree.data=Object.assign(f.tree.data,y.requireData),T.eachTree(f.tree.data,(e=>{e.label=e.Title}),{children:"children"})}),{immediate:!0,deep:!0});const L=h({Title:[{required:!0,message:"请输入菜单标题",trigger:"blur"}],Type:[{required:!0,message:"请选择菜单类型",trigger:"blur"},{min:3,max:10,message:"长度请大于3，小于10",trigger:"blur"}]}),E=e=>{"cancle"!=e?z.value&&z.value.validate((e=>{if(!e)return s({message:"必填项未填写完整！",type:"warning"}),!1;if("edit"==y.keys){let e=T.clone(W);m("dataChange",e,y.keys),m("closeDialog","operate")}else if("add"==y.keys){let e=T.clone(W);m("dataChange",e,y.keys),m("closeDialog","operate")}})):m("closeDialog","operate")};return(e,a)=>{const s=i,c=d,m=r,y=n,h=p,k=u;return _(),w("div",q,[v("div",R,[V(k,{ref_key:"ruleFormRef",ref:z,model:I(W),rules:L,"label-width":"120px",class:"demo-ruleForm",size:g.value,"status-icon":""},{default:x((()=>[V(s,{label:"上级目录",prop:"CreateTime"},{default:x((()=>[V(I(l),U({options:f},I(W).CreateTime),null,16,["options"])])),_:1}),V(s,{label:"菜单类型",prop:"Type"},{default:x((()=>[V(c,{style:{display:"none"}}),"mulu"!=I(W).Type?(_(),D(m,{key:0,class:"add-button",onClick:a[0]||(a[0]=e=>I(W).Type="mulu")},{default:x((()=>[P("目录")])),_:1})):S("",!0),"mulu"==I(W).Type?(_(),D(m,{key:1,class:"add-button",onClick:a[1]||(a[1]=e=>I(W).Type="mulu"),type:"primary",plain:""},{default:x((()=>[P("目录")])),_:1})):S("",!0),"caidan"!=I(W).Type?(_(),D(m,{key:2,class:"add-button",onClick:a[2]||(a[2]=e=>I(W).Type="caidan")},{default:x((()=>[P("菜单 ")])),_:1})):S("",!0),"caidan"==I(W).Type?(_(),D(m,{key:3,class:"add-button",onClick:a[3]||(a[3]=e=>I(W).Type="caidan"),type:"primary",plain:""},{default:x((()=>[P("菜单")])),_:1})):S("",!0),"anniu"!=I(W).Type?(_(),D(m,{key:4,class:"add-button",onClick:a[4]||(a[4]=e=>I(W).Type="anniu")},{default:x((()=>[P("按钮")])),_:1})):S("",!0),"anniu"==I(W).Type?(_(),D(m,{key:5,class:"add-button",onClick:a[5]||(a[5]=e=>I(W).Type="anniu"),type:"primary",plain:""},{default:x((()=>[P("按钮")])),_:1})):S("",!0),"shuju"!=I(W).Type?(_(),D(m,{key:6,class:"add-button",onClick:a[6]||(a[6]=e=>I(W).Type="shuju")},{default:x((()=>[P("数据")])),_:1})):S("",!0),"shuju"==I(W).Type?(_(),D(m,{key:7,class:"add-button",onClick:a[7]||(a[7]=e=>I(W).Type="shuju"),type:"primary",plain:""},{default:x((()=>[P("数据")])),_:1})):S("",!0)])),_:1}),V(s,{label:"菜单图标"},{default:x((()=>[v("div",A,[V(I(t),{options:b,class:j("addMenuClass")},null,8,["options"]),V(I(o),{url:"http://192.168.32.108:3000/mock/78/api/uploadPDF",type:["images"],ClassName:"uploadClass"},{mybutton:x((()=>[V(m,{class:"add-button",type:"primary",plain:""},{default:x((()=>[P("开始上传")])),_:1})])),_:1})])])),_:1}),"anniu"!=I(W).Type?(_(),D(s,{key:0,label:"菜单标题",prop:"Title"},{default:x((()=>[V(c,{modelValue:I(W).Title,"onUpdate:modelValue":a[8]||(a[8]=e=>I(W).Title=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1})):S("",!0),"anniu"!=I(W).Type?(_(),w("div",M,[V(s,{label:"菜单状态",prop:"State",style:{display:"flex","align-items":"center"}},{default:x((()=>[V(h,{modelValue:I(W).State,"onUpdate:modelValue":a[9]||(a[9]=e=>I(W).State=e),class:"ml-4"},{default:x((()=>[V(y,{label:!0,size:"large"},{default:x((()=>[P("启用")])),_:1}),V(y,{label:!1,size:"large"},{default:x((()=>[P("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1}),V(s,{label:"外链菜单",prop:"IsUrL",style:{display:"flex","align-items":"center"}},{default:x((()=>[V(h,{modelValue:I(W).IsUrL,"onUpdate:modelValue":a[10]||(a[10]=e=>I(W).IsUrL=e),class:"ml-4"},{default:x((()=>[V(y,{label:!0,size:"large"},{default:x((()=>[P("是")])),_:1}),V(y,{label:!1,size:"large"},{default:x((()=>[P("否")])),_:1})])),_:1},8,["modelValue"])])),_:1})])):S("",!0),"anniu"==I(W).Type?(_(),D(s,{key:2,label:"按钮名称",prop:"Title"},{default:x((()=>[V(c,{modelValue:I(W).Title,"onUpdate:modelValue":a[11]||(a[11]=e=>I(W).Title=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1})):S("",!0),"caidan"==I(W).Type?(_(),w("div",N,[V(s,{label:"组件名称",prop:"ComponentName",style:{display:"flex","align-items":"center"}},{default:x((()=>[V(c,{modelValue:I(W).ComponentName,"onUpdate:modelValue":a[12]||(a[12]=e=>I(W).ComponentName=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),V(s,{label:"组件路径",prop:"Address",style:{display:"flex","align-items":"center"}},{default:x((()=>[V(c,{modelValue:I(W).Address,"onUpdate:modelValue":a[13]||(a[13]=e=>I(W).Address=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1})])):S("",!0),"anniu"!=I(W).Type?(_(),D(s,{key:4,label:"路由地址",prop:"ComponentPath"},{default:x((()=>[V(c,{modelValue:I(W).ComponentPath,"onUpdate:modelValue":a[14]||(a[14]=e=>I(W).ComponentPath=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1})):S("",!0),V(s,{label:"菜单排序",prop:"Sort"},{default:x((()=>[V(c,{modelValue:I(W).Sort,"onUpdate:modelValue":a[15]||(a[15]=e=>I(W).Sort=e),rows:"5",resize:"none",placeholder:"请输入"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","size"])]),v("div",O,[V(m,{class:"add-button",size:"large",onClick:a[16]||(a[16]=e=>E("cancle"))},{default:x((()=>[P("取消")])),_:1}),V(m,{class:"add-button",type:"primary",size:"large",onClick:a[17]||(a[17]=e=>E("submit"))},{default:x((()=>[P("确定 ")])),_:1})])])}}}),[["__scopeId","data-v-edc778df"]]),G={class:"menu-manage"},H=["onClick"],X=["onClick"],J=g({name:"Menu"}),K=c(g({...J,setup(e){const{user:a}=m(),l=k(),t={keepSource:!0,showOverflow:!1,id:"toolbar_demo_1",rowConfig:{height:52},storage:{enabled:!0,key:"SystemManageMenuList",dataBase:a.userInfo.id},formConfig:{items:[{field:"keyword",title:"模糊搜索",itemRender:{name:"ElInput",props:{placeholder:"请输入菜单关键字、权限标识、路径"}}}]},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Title",title:"菜单标题",minWidth:130,treeNode:!0},{field:"Icon",title:"图标",minWidth:100},{field:"Type",title:"组件标识",minWidth:100},{field:"ComponentPath",title:"组件路径",minWidth:100},{field:"IsUrL",title:"外链",minWidth:100,slots:{default:"isUrL"}},{field:"IsCache",title:"缓存",minWidth:100,slots:{default:"isCache"}},{field:"State",title:"菜单状态",slots:{default:"state"},minWidth:100},{field:"Sort",title:"排序",minWidth:80},{field:"CreateTime",title:"创建日期",minWidth:130},{field:"Operation",title:"操作",minWidth:150,slots:{default:"operate"},fixed:"right"}],toolbarConfig:{buttons:[{code:"myadd",name:"新增",status:"primary",onClick:()=>{alert(1)}},{code:"mySave",name:"启用"},{code:"mydisable",name:"禁用"},{code:"myExport",name:"导出"},{code:"mydelete",name:"批量删除"}],tools:{enabled:!0}},treeConfig:{transform:!0,rowField:"Id",parentField:"PId"},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((a=>{E(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:l}=e;l?(o.value=l.TableList,a({result:T.toTreeArray(l.TableList,{clear:!0}),page:{total:l.ItemCount}})):a({result:[],page:{total:0}})}))}))}}};let o=k("");const{fitsTablePro:i}=F(t,l),d={async toolbarButtonClick({code:e}){if(l.value.fitsTablePro.getCheckboxRecords().length||"myadd"==e)switch(e){case"myadd":{n.operate.visible=!0,n.operate.key="add";let e={Title:"",Icon:"",Type:"",Sort:"",ComponentPath:"",IsUrL:!1,IsCache:!1,State:!1,CreateTime:""};n.operate.data=e;break}case"mySave":n.base.visible=!0,n.base.dialogText="是否启用所选菜单？";break;case"mydisable":n.base.visible=!0,n.base.dialogText="是否禁用所选菜单？";break;case"myExport":n.base.visible=!0,n.base.dialogText="是否导出所选菜单？";break;case"mydelete":n.base.visible=!0,n.base.dialogText="是否删除所选菜单？"}else r()}},r=()=>{s({message:"请选择至少一个角色！",type:"warning"})},n=h({base:{dialogText:"",key:"",visible:!1,props:{title:"",width:"30%"}},operate:{dialogText:"",key:"",visible:!1,data:{},props:{title:"",width:"50%"}}}),p=e=>{switch(e){case"operate":n.operate.visible=!1;break;case"base":n.base.visible=!1}};z((()=>{W((()=>{})),setTimeout((()=>{}),2e3)}));const u=(e,a)=>{"edit"==n.operate.key||n.operate.key},c=(e,a)=>{"edit"==a?(n.operate.visible=!0,n.operate.props.title="编辑菜单",n.operate.key="editRole",n.operate.data=e):"delete"==a&&(n.base.visible=!0,n.base.dialogText="是否确定关联选中的用户？",n.base.key="relaRole")};return(e,a)=>{const t=f;return _(),w("div",G,[V(I(y),{option:I(i),ref_key:"xGrid",ref:l,"grid-events":d},{operate:x((({slotProps:e})=>[v("span",{class:"FromButton underline",onClick:a=>c(e.row,"edit")},"编辑",8,H),v("span",{class:"FromButton delete",onClick:a=>c(e.row,"delete")},"删除",8,X)])),isUrl:x((({slotProps:e})=>[V(t,{modelValue:e.row.IsUrl,"onUpdate:modelValue":a=>e.row.IsUrl=a,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),isCache:x((({slotProps:e})=>[V(t,{modelValue:e.row.IsCache,"onUpdate:modelValue":a=>e.row.IsCache=a,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),state:x((({slotProps:e})=>[V(t,{modelValue:e.row.IsEnabled,"onUpdate:modelValue":a=>e.row.IsEnabled=a,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["option"]),V(I(b),{class:j("Menu-baseDialog"),visible:I(n).base.visible,dialogProp:I(n).base.props,onCancel:a[0]||(a[0]=e=>p("base")),onSubmit:a[1]||(a[1]=e=>(e=>{let a=l.value.fitsTablePro.getCheckboxRecords(!0);switch(e){case"Dictable":a.forEach(((e,a)=>{e.IsEnabled=!0}));break;case"Dictunable":a.forEach(((e,a)=>{e.IsEnabled=!1}))}p("base")})(I(n).base.key))},{default:x((()=>[P(L(I(n).base.dialogText),1)])),_:1},8,["visible","dialogProp"]),V(I(b),{class:j("onfooter"),visible:I(n).operate.visible,"dialogData.relateRole.visible":"false",dialogProp:I(n).operate.props,showFooter:!1,onCancel:a[2]||(a[2]=e=>p("operate"))},{default:x((()=>[V(B,{onDataChange:u,onCloseDialog:p,keys:I(n).operate.key,setData:I(n).operate.data,requireData:I(o)},null,8,["keys","setData","requireData"])])),_:1},8,["visible","dialogProp"])])}}}),[["__scopeId","data-v-d8723456"]]);export{K as default};
