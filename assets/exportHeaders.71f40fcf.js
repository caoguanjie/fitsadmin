import{y as e,c as t,ar as l,X as o,f as a,h as i,j as s,N as r,H as d,L as n,K as f,u as m}from"./vxetable.23d9f74f.js";import{d as c}from"./system.cd36e9a4.js";import{_ as p,c as u,B as h}from"./index.53c6c89d.js";import{u as b}from"./FitsTableProHook.179d0deb.js";const x={class:"exportBase"},g={class:"contain"},C={class:"buttonClass"},y={href:"https://vxetable.cn/#/table/advanced/export",target:"_blank",style:{"margin-left":"15px"}},v={class:"tableClass"},w=e({name:"ExploreMultistageTableHead"});var I=p(e({...w,setup(e){const{user:p}=u(),w=t(),I={keepSource:!1,showOverflow:"tooltip",id:"selectedExport",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"selectedExportList",dataBase:p.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Title",title:"菜单标题",minWidth:130,treeNode:!0},{title:"其他信息",children:[{field:"Icon",title:"图标",minWidth:100},{field:"Type",title:"组件标识",minWidth:100},{field:"Sort",title:"排序",minWidth:80}]},{field:"ComponentPath",title:"组件路径",minWidth:100},{field:"IsUrL",title:"外链",minWidth:100,slots:{default:"isUrL"}},{field:"IsCache",title:"缓存",minWidth:100,slots:{default:"isCache"}},{field:"State",title:"菜单状态",slots:{default:"state"},minWidth:100},{field:"CreateTime",title:"创建日期",minWidth:130}],toolbarConfig:{buttons:[],tools:{enabled:!1}},treeConfig:{transform:!0,rowField:"Id",parentField:"PId"},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((t=>{c(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:o}=e;t(o?{result:l.toTreeArray(o.TableList,{clear:!0}),page:{total:o.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:_}=b(I,w),W=()=>{w.value.fitsTablePro.openExport()};return t("默认文件名"),t("csv"),t(!0),(e,t)=>{const l=o("el-tag"),c=o("el-form-item"),p=o("el-button"),u=o("el-form"),b=o("el-switch");return a(),i("div",x,[s("div",g,[s("div",C,[r(u,{inline:!0,class:"demo-form-inline"},{default:d((()=>[r(c,{label:""},{default:d((()=>[s("a",y,[r(l,{type:"info"},{default:d((()=>[n("Excel导出相关资料")])),_:1})])])),_:1}),r(c,null,{default:d((()=>[r(p,{style:{"margin-bottom":"10px"},onClick:W,type:"primary"},{default:d((()=>[n("导出Excel")])),_:1})])),_:1})])),_:1})]),f(" <fits-list-seach :formItem='formItem' /> "),s("div",v,[r(m(h),{option:m(_),ref_key:"xGrid",ref:w},{state:d((({slotProps:e})=>[r(b,{modelValue:e.row.Ustate,"onUpdate:modelValue":t=>e.row.Ustate=t,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"]),f(" {{ slotProps.row.Ustate }} ")])),_:1},8,["option"])])])])}}}),[["__scopeId","data-v-cc3d437c"]]);export{I as default};
