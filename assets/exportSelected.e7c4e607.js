import{k as e,n as l,a2 as a,o as t,x as o,Z as s,z as i,p as r,a7 as d}from"./index.0ea97641.js";import{E as n,a as m}from"./el-radio.e9021cb6.js";import{F as f,c as u,l as p,m as c,p as b,U as h,S as v,u as x,i as g,a6 as y,O as _}from"./vxetable.5e2aec1d.js";import{b as k}from"./system.6337f85a.js";import{u as C}from"./FitsTableProHook.bf67f2a4.js";import"./echarts.d8b3161e.js";const U={class:"exportBase"},V={class:"contain"},w={class:"buttonClass"},j={href:"https://vxetable.cn/#/table/advanced/export",target:"_blank",style:{"margin-left":"15px"}},I={class:"tableClass"},P=f({name:"ExploreSelected"});var T=e(f({...P,setup(e){const{user:f}=l(),P=u(),T={keepSource:!1,showOverflow:"tooltip",id:"rolestable",rowConfig:{height:52,isCurrent:!0},storage:{enabled:!0,key:"ExampleRoleList",dataBase:f.userInfo.id},importConfig:{},exportConfig:{},pagerConfig:{enabled:!0},columns:[{field:"Checkbox",type:"checkbox",title:"多选",minWidth:50},{field:"Indexes",title:"序号",type:"seq",minWidth:80},{field:"Uname",title:"角色名称",minWidth:130},{field:"Ucode",title:"角色编码",minWidth:130},{field:"Udescribe",title:"角色描述",minWidth:130},{field:"Sort",title:"排序",minWidth:100},{field:"Ustate",title:"角色状态",slots:{default:"state"},minWidth:100}],toolbarConfig:{buttons:[],tools:{enabled:!1}},proxyConfig:{form:!0,autoLoad:!0,ajax:{query:({form:e})=>new Promise((l=>{k(e,{pageIndex:11,pageSize:23}).then((e=>{const{ReturnData:a}=e;l(a?{result:a.TableList,page:{total:a.ItemCount}}:{result:[],page:{total:0}})}))}))}}},{fitsTablePro:W}=C(T,P),S=()=>{P.value.fitsTablePro.exportData({type:E.value,filename:z.value,useStyle:L.value,data:P.value.fitsTablePro.getCheckboxRecords()})};let z=u("默认文件名"),E=u("csv"),L=u(!0);return(e,l)=>{const f=t,u=o,k=n,C=m,T=s,E=i,R=r,q=d;return p(),c("div",U,[b("div",V,[b("div",w,[h(R,{inline:!0,class:"demo-form-inline"},{default:v((()=>[h(u,{label:"导出文件名称："},{default:v((()=>[h(f,{modelValue:x(z),"onUpdate:modelValue":l[0]||(l[0]=e=>g(z)?z.value=e:z=e),placeholder:"请输入文件名"},null,8,["modelValue"])])),_:1}),h(u,{label:"是否根据Table宽度导出："},{default:v((()=>[h(C,{modelValue:x(L),"onUpdate:modelValue":l[1]||(l[1]=e=>g(L)?L.value=e:L=e),class:"ml-4"},{default:v((()=>[h(k,{label:!0,size:"large"},{default:v((()=>[y("是")])),_:1}),h(k,{label:!1,size:"large"},{default:v((()=>[y("否")])),_:1})])),_:1},8,["modelValue"])])),_:1}),_(' <el-form-item label="导出文件格式：">\r\n                        <el-select v-model="fileType" placeholder="请选择文件格式">\r\n                            <el-option v-for="(item, key) in options" :key="key" :label="item.label"\r\n                                :value="item.value" />\r\n                        </el-select>\r\n                    </el-form-item> '),h(u,{label:""},{default:v((()=>[b("a",j,[h(T,{type:"info"},{default:v((()=>[y("Excel导出相关资料")])),_:1})])])),_:1}),h(u,null,{default:v((()=>[h(E,{style:{"margin-bottom":"10px"},onClick:S,type:"primary"},{default:v((()=>[y("导出选中")])),_:1})])),_:1})])),_:1})]),_(" <fits-list-seach :formItem='formItem' /> "),b("div",I,[h(x(a),{option:x(W),ref_key:"xGrid",ref:P},{state:v((({slotProps:e})=>[h(q,{modelValue:e.row.Ustate,"onUpdate:modelValue":l=>e.row.Ustate=l,style:{"--el-switch-on-color":"#000000","--el-switch-off-color":"#dcdfe6"}},null,8,["modelValue","onUpdate:modelValue"]),_(" {{ slotProps.row.Ustate }} ")])),_:1},8,["option"])])])])}}}),[["__scopeId","data-v-e15155e2"]]);export{T as default};
