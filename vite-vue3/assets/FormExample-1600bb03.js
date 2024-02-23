import{b as e,a4 as l,d as t,E as i,_ as a,w as o,F as r,bz as s,M as p,aj as n,bA as d,bB as c,B as u,V as f,q as m,x as b,as as y,U as v,H as h,bC as g,af as w,bD as x,m as k,ag as _,G as P,j as F}from"./index-dcdeddb6.js";import{E as S,e as q,l as D,m as C,S as E,R as B,T as A,u as N,X as T,L as J,F as M,J as R,ao as j,a as L,O,V as I,P as U,b as V,p as z}from"./vxetable-9ecf1980.js";import{d as $,i as K,b as G,c as H,a as W}from"./index-feecb639.js";import{F as X}from"./FitsCard-00b5f70c.js";import"./echarts-1215139a.js";const Q=e({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:l}}),Y={click:e=>e instanceof MouseEvent},Z=["href"],ee=S({name:"ElLink"});const le=o(a(S({...ee,props:Q,emits:Y,setup(e,{emit:l}){const a=e,o=t("link"),r=q((()=>[o.b(),o.m(a.type),o.is("disabled",a.disabled),o.is("underline",a.underline&&!a.disabled)]));function s(e){a.disabled||l("click",e)}return(e,l)=>(D(),C("a",{class:J(N(r)),href:e.disabled||!e.href?void 0:e.href,onClick:s},[e.icon?(D(),E(N(i),{key:0},{default:B((()=>[(D(),E(A(e.icon)))])),_:1})):T("v-if",!0),e.$slots.default?(D(),C("span",{key:1,class:J(N(o).e("inner"))},[M(e.$slots,"default")],2)):T("v-if",!0),e.$slots.icon?M(e.$slots,"icon",{key:2}):T("v-if",!0)],10,Z))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]])),te=S({__name:"BaseFormExample",setup(e){const l=R(new r({rule:[{type:"title",component:j(s),field:"divider",value:"输入控件",style:"background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"},{type:"input",title:"输入框",field:"input",props:{prefixIcon:j(p)}},{type:"input",title:"多行文本",field:"textarea",props:{type:"textarea",placeholder:"请输入商品名称",rows:5,autosize:{minRows:2,maxRows:5}}},{type:"title",component:j(s),field:"divider",value:"选择控件",style:"background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"},{type:"select",title:"下拉选择",field:"select1",props:{clearable:!0},options:[{value:"104",label:"生态蔬菜",disabled:!1},{value:"105",label:"新鲜水果",disabled:!0},{value:"106",label:"蛋糕甜点",disabled:!1}]},{type:"select",title:"筛选、创建条目",field:"select2",props:{filterable:!0,allowCreate:!0,multiple:!0},options:[{value:"104",label:"生态蔬菜",disabled:!1},{value:"105",label:"新鲜水果",disabled:!1},{value:"106",label:"蛋糕甜点",disabled:!1}]},{type:"radio",title:"单选",field:"radio1",options:[{value:"104",label:"生态蔬菜",disabled:!1},{value:"105",label:"新鲜水果",disabled:!0},{value:"106",label:"蛋糕甜点",disabled:!1},{value:"107",label:"生态蔬菜",disabled:!1},{value:"108",label:"农产鸡蛋",disabled:!1}]},{type:"radio",title:"单选按钮组",field:"radio2",props:{type:"button"},options:[{value:"104",label:"生态蔬菜",disabled:!1},{value:"105",label:"新鲜水果",disabled:!1},{value:"106",label:"蛋糕甜点",disabled:!1}]},{type:"title",component:j(s),field:"divider",value:"开关控件",style:"background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"},{type:"switch",title:"开关",field:"switch1",col:{span:4}},{type:"switch",title:"开关",field:"switch2",style:{"--el-switch-on-color":"#000","-el-switch-on-color":"pink"},props:{size:"large",inlinePrompt:!0,activeText:"开",inactiveText:"关"},col:{span:4},on:{change:e=>{}}},{type:"title",component:j(s),field:"divider",value:"日期、时间控件",style:"background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"},{type:"DatePicker",title:"日期选择",field:"DatePicker1"},{type:"DatePicker",title:"带快捷选项",field:"DatePicker2",props:{shortcuts:[{text:"今日",value:n().format()},{text:"昨日",value:()=>n().subtract(1,"day").format()},{text:"一周前",value:()=>n().subtract(7,"day").format()}]}},{type:"DatePicker",title:"日期范围",field:"DatePicker3",props:{type:"daterange",rangeSeparator:"至",startPlaceholder:"开始日期",endPlaceholder:"结束日期",unlinkPanels:!0}},{type:"DatePicker",title:"月范围",field:"DatePicker4",props:{type:"monthrange",rangeSeparator:"至",startPlaceholder:"开始月份",endPlaceholder:"结束月份",unlinkPanels:!0}},{type:"DatePicker",title:"日期时间选择",field:"DatePicker4",props:{type:"datetimerange"}},{type:"TimePicker",field:"time",title:"时间"},{type:"title",component:j(s),field:"divider",value:"复选框控件",style:"background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"},{type:"checkbox",title:"多选",field:"checkbox1",options:[{value:"104",label:"生态蔬菜",disabled:!1},{value:"105",label:"新鲜水果",disabled:!0},{value:"106",label:"蛋糕甜点",disabled:!1}]},{type:"checkboxAll",component:j(d),title:"全选组件",field:"checkbox2",props:{options:new c({option:[{label:"生态蔬菜1"},{label:"新鲜水果1"},{label:"蛋糕甜点1"}]})}}],option:{form:{labelPosition:"right",labelWidth:"120px"},onSubmit:e=>{alert(JSON.stringify(e))}}}));return(e,t)=>(D(),E(N(u),{form:N(l)},null,8,["form"]))}}),ie=S({__name:"InlineFormExample",setup(e){const l=R(new r({rule:[{type:"input",title:"输入框",field:"input"},{type:"select",title:"下拉选择",field:"select",options:[{value:"104",label:"生态蔬菜"},{value:"105",label:"新鲜水果"},{value:"106",label:"蛋糕甜点"}]},{type:"DatePicker",title:"日期选择",field:"DatePicker1"},{type:"input",title:"多行文本",field:"textarea",props:{type:"textarea",placeholder:"请输入商品名称",rows:5,autosize:{minRows:2,maxRows:5}}}],option:{form:{labelPosition:"right",inline:!0},onSubmit:e=>{alert(JSON.stringify(e))}},col:2}));return(e,t)=>(D(),E(N(u),{form:N(l)},null,8,["form"]))}}),ae=S({__name:"ValidateFormExample",setup(e){const l=R(new r({rule:[{type:"input",title:"姓名",field:"input",effect:{required:!0}},{type:"select",title:"性别",field:"select",options:[{value:"0",label:"男"},{value:"1",label:"女"}],effect:{required:!0}},{type:"radio",title:"出行方式",field:"travelMode",options:[{value:"104",label:"步行"},{value:"105",label:"地铁"}],validate:[{required:!0,message:"请选择你的出行方式",trigger:"change"}]},{type:"DatePicker",title:"出生日期",field:"birthday",validate:[{required:!0,message:"请选择出生日期",trigger:"change"}]}],option:{form:{labelPosition:"right"},onSubmit:e=>{alert(JSON.stringify(e))}}}));return(e,t)=>(D(),E(N(u),{form:N(l)},null,8,["form"]))}}),oe=S({__name:"CustomValidateFormExample",setup(e){const l=L(null),t=R(new r({rule:[{type:"input",field:"oldPwd",title:"原密码",props:{placeholder:"请输入原密码",type:"password",showPassword:!0},validate:[{required:!0,type:"string",message:"请输入原密码"}]},{type:"input",field:"newPwd",title:"新密码",props:{placeholder:"请输入新密码",type:"password",maxlength:20,showPassword:!0},validate:[{required:!0,type:"string",message:"请输入新密码"},{validator:(e,l,t)=>$(l),message:"新密码长度10位以上，包含数字、字母、符号"}]},{type:"input",field:"againPwd",title:"确认密码",props:{placeholder:"再次确认新密码",type:"password",showPassword:!0},validate:[{required:!0,type:"string",message:"请再次输入新密码"},{validator:(e,t,i)=>t===l.value.fApi.getValue("newPwd"),message:"密码不一致"}]}],option:{form:{labelPosition:"right"},onSubmit:e=>{alert(JSON.stringify(e))}}}));return(e,i)=>(D(),E(N(u),{form:N(t),ref_key:"FormRef",ref:l},null,8,["form"]))}}),re=S({__name:"DynamicFormExample",setup(e){let l=0;const t=R(new r({rule:[{type:"input",field:"UserName",title:"用户名称",props:{placeholder:"请输入用户名称"},validate:[{required:!0,message:"请输入用户名称"}]},{type:"input",title:"文本",field:"input2",props:{placeholder:"请输入商品名称"}}],option:{form:{labelPosition:"right",inline:!0}},col:2})),i=R({visible:!1,forms:[{form:new r({rule:[{type:"input",field:"fieldName",title:"规则字段",props:{placeholder:"请输入规则字段"},validate:[{required:!0,message:"请输入规则字段"}]}],option:{form:{labelPosition:"right"},submitBtn:!1,resetBtn:!1}})}],dialogProp:{title:"删除字段",width:"30%"}}),a=L();function o(){return l++,{type:"input",title:"追加规则"+l,field:"appendInput"+l,value:"追加规则"+l}}function s(){a.value.fApi.prepend(o())}function p(){a.value.fApi.append(o())}function n(){a.value.fApi.rule.splice(0,1)}function d(){i.visible=!0}function c(e){e.fieldName&&(void 0===a.value.fApi.removeField(e.fieldName)?m.error("找不到该规则"):(a.value.fApi.removeField(e.fieldName),m.success("删除成功"),i.visible=!1))}return(e,l)=>{const o=b,r=y;return D(),C(U,null,[O(r,{style:{margin:"20px 30px"}},{default:B((()=>[O(o,{onClick:s},{default:B((()=>[I(" 在头部追加规则 ")])),_:1}),O(o,{onClick:p},{default:B((()=>[I(" 在尾部追加规则 ")])),_:1}),O(o,{onClick:n},{default:B((()=>[I(" 删除第一条规则 ")])),_:1}),O(o,{onClick:d},{default:B((()=>[I(" 删除指定规则 ")])),_:1})])),_:1}),O(N(u),{form:N(t),ref_key:"dynamicRef",ref:a},null,8,["form"]),O(N(f),{option:N(i),onSubmit:c,onCancel:l[0]||(l[0]=e=>N(i).visible=!1)},null,8,["option"])],64)}}}),se=S({__name:"CustomFormExample",setup(e){const l=[{id:"1",label:"Level 1",children:[{id:"4",label:"Level 1-1"}]},{id:"21",label:"Level 2",children:[{id:"5",label:"Level 2-1"}]},{id:"3",label:"Level 3"}],t=R(new r({rule:[{type:"title",component:j(v),field:"treeSearch",title:"下拉选择树(单选)",props:{options:new h({select:{placeholder:"请选择组织机构",clearable:!0},input:{placeholder:"部门搜索"},tree:{nodeKey:"id",defaultExpandAll:!1,data:l}})},effect:{required:!0}},{field:"treeSearchMultiple",title:"下拉选择树(多选)",type:"title",component:j(v),props:{options:new h({select:{placeholder:"请选择组织机构",multiple:!0,clearable:!0},input:{placeholder:"部门搜索"},tree:{showCheckbox:!0,nodeKey:"id",defaultExpandAll:!1,data:l}})},effect:{required:!0}},{field:"iconSelect",title:"图标选择(单选)",type:"title",component:j(g),props:{options:new w({select:{placeholder:"请选择图标",clearable:!0},input:{placeholder:"图标搜索"}})},validate:[{required:!0,message:"请选择图标",trigger:"change"}]},{field:"iconSelectMultiple",title:"图标选择(多选)",type:"title",component:j(g),value:["edit","client"],props:{options:new w({select:{placeholder:"请选择图标",multiple:!0,clearable:!0},input:{placeholder:"图标搜索"}})},validate:[{type:"array",required:!0,message:"请选择图标",trigger:"change"}]},{type:"title",component:j(x),title:"多选(全选)",field:"checkbox2",props:{options:new c({option:[{label:"生态蔬菜"},{label:"新鲜水果"},{label:"蛋糕甜点"}]})},effect:{required:!0}}],option:{onSubmit:e=>{alert(JSON.stringify(e))}}}));return(e,l)=>(D(),E(N(u),{form:N(t)},null,8,["form"]))}}),pe=S({__name:"SlotFormExample",setup(e){const l=R(new r({rule:[{type:"button",field:"slotButton",title:"使用按钮的插槽",props:{type:"primary"},children:[{type:"div",slot:"icon",component:j(p)},"按钮名称"]},{type:"input",field:"slotInput",title:"使用输入框的插槽",children:[{type:"div",component:j(p),class:"el-icon",slot:"prefix"},{type:"span",slot:"suffix",children:["suffix"]}]},{type:"select",field:"slotSelect",title:"使用下拉框的插槽",options:[{value:"104",label:"生态蔬菜"},{value:"105",label:"新鲜水果"}],children:[{type:"span",children:["我是select的默认插槽"]},{type:"svg",slot:"empty",component:j(p)},{type:"svg",slot:"prefix",component:j(p)}]}],option:{submitBtn:!1,resetBtn:!1}}));return(e,t)=>(D(),E(N(u),{form:N(l)},null,8,["form"]))}}),ne=S({__name:"DialogFormExample",setup(e){const{setting:l}=k(),t=L();let i="dialog"===l.formType?2:1;const a=R({visible:!1,forms:[{title:"用户信息",iconClass:"user",form:new r({rule:[{type:"title",field:"iconSelect",title:"图标选择",component:j(_),props:{options:new w({select:{class:"mySelect",placeholder:"请选择图标",multiple:!0},input:{element:{placeholder:"图标搜索"}}})},validate:[{required:!0,message:"请选择图标",trigger:"change"}]},{type:"input",field:"UserName",title:"用户名称",props:{placeholder:"请输入用户名称"},validate:[{required:!0,type:"string",message:"请输入用户名称"}]},{type:"input",field:"UserAccount",title:"用户账号",props:{placeholder:"请输入用户账号"},validate:[{required:!0,type:"string",message:"请输入用户账号"}]},{type:"input",field:"phone",title:"手机号码",props:{placeholder:"请输入手机号码"},validate:[{required:!0,type:"string",message:"请输入手机号码"},{validator:(e,l)=>K(l),message:"请输入正确的手机号"}]},{type:"input",field:"oldPwd",title:"初始密码",props:{type:"password",placeholder:"请输入原始密码"},validate:[{required:!0,type:"string",message:"请输入原始密码"}]},{type:"input",field:"telephone",title:"电话",props:{placeholder:"请输入电话"},validate:[{validator:(e,l)=>!l||K(l),message:"请输入正确的电话"}]},{type:"datePicker",field:"birthday",title:"生日",props:{placeholder:"请选择日期"}},{type:"input",field:"email",title:"电子邮件",props:{placeholder:"请输入电子邮箱"},validate:[{validator:(e,l)=>!l||G(l),message:"请输入正确的电子邮件"}]},{type:"radio",field:"sex",title:"性别",options:[{value:"1",label:"男"},{value:"2",label:"女"},{label:"未知",value:"0"}]},{type:"input",field:"shortNum",title:"短号",props:{placeholder:"请输入短号"},validate:[{validator:(e,l)=>!l||H(l),message:"请输入正确的短号"}]},{type:"radio",field:"status",title:"状态",options:[{value:"1",label:"启用"},{value:"2",label:"禁用"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:i})},{title:"组织关系",iconClass:"fits-system",form:new r({rule:[{type:"title",field:"Department11",title:"所属部门",component:j(P),props:{options:new h({select:{placeholder:"请选择组织机构",clearable:!0},input:{placeholder:"部门搜索"},tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}})},validate:[{required:!0,message:"请选择",trigger:"change"}]},{type:"datePicker",field:"onJobDate",title:"入职日期",props:{placeholder:"请选择入职日期"},validate:[{required:!0,type:"string",message:"请选择入职日期"}]},{type:"input",field:"office",title:"办公室",props:{placeholder:"请输入办公室"}},{type:"input",field:"officenumber",title:"办公号码",props:{placeholder:"请输入办公号码"},validate:[{validator:(e,l)=>!l||(W(l)||K(l)),message:"请输入正确的手机号或固话"}]},{type:"datePicker",field:"offJobDate",title:"离职日期",props:{placeholder:"请选择离职日期"}},{type:"select",field:"UserTag",title:"用户标签",props:{filterable:!0,placeholder:"请选择用户标签"},options:[{value:"1",label:"选项1"},{value:"2",label:"选项2"}]}],option:{form:{labelPosition:"right",inline:!0},submitBtn:!1,resetBtn:!1},col:i})}],dialogProp:{title:"新增用户",width:"50%"},formType:l.formType});function o(e){alert(JSON.stringify(e))}return V((()=>l.formType),(e=>{i="dialog"===e?2:1,a.formType=e,a.forms.map((e=>e.form.col=i))})),(e,l)=>{const i=b;return D(),C(U,null,[O(i,{onClick:l[0]||(l[0]=e=>N(a).visible=!0)},{default:B((()=>[I(" 打开表单弹窗 ")])),_:1}),O(N(f),{option:N(a),onSubmit:o,onCancel:l[1]||(l[1]=e=>N(a).visible=!1),class:"dialogFormExample",ref_key:"formtypeRef",ref:t},null,8,["option"])],64)}}}),de={class:"form-example"},ce=F(S({__name:"FormExample",setup:e=>(e,l)=>{const t=le;return D(),C("div",de,[O(X,{title:"普通表单",desc:"普通表单展示。数据类型为FitsFormCreateModel。需要传入rule：表单数据。为了展示提交表单的效果，传入了option.onSubmit，以提示框的形式展示表单数据。"},{default:B((()=>[O(te)])),_:1}),O(X,{title:"行内表单",desc:"行内表单展示。通过设置option.form.inline=true开启行内表单，并通过传入col设置显示多少列"},{default:B((()=>[O(ie)])),_:1}),O(X,{title:"表单必填校验",desc:"本案例展示了最基础的表单必填校验，给需要验证的表单项传入 effect.required=true 即可开启必填校验，并使用默认的错误提示信息。如果想自定义错误信息，需要传入一个字符串而不是'true'。"},{default:B((()=>[O(ae)])),_:1}),O(X,{title:"自定义校验规则",desc:"本例通过设置表单项的 validate 属性，展示了如何使用自定义验证规则来完成密码的二次验证。"},{default:B((()=>[O(oe)])),_:1}),O(X,{title:"动态增删表单项"},{desc:B((()=>[z("span",null,[I("动态表单展示。通过获取表单组件实例，获得暴露出来的接口方法，调用相关的方法实现动态删减表单项。关于api方法调用请参照 "),O(t,{type:"primary",target:"_blank",href:"http://www.form-create.com/v3/instance.html"},{default:B((()=>[I(" form-create全局api")])),_:1})])])),default:B((()=>[O(re)])),_:1}),O(X,{title:"自定义组件",desc:"自定义表单组件展示。自定义的组件需要进行全局注册，注册后可以通过type传入注册时的组件名调用该组件。"},{default:B((()=>[O(se)])),_:1}),O(X,{title:"组件插槽"},{desc:B((()=>[z("span",null,[I("通过传入rule，给需要插槽的项传入children数组。该数组由对象或者字符串组成。 如果使用组件的默认插槽，则不需要指定slot属性，表单会将children中的配置项遍历渲染。 如果使用组件的指定插槽，则需要通过slot传入插槽名称，指明使用哪个插槽。 "),O(t,{type:"primary",target:"_blank",href:"http://www.form-create.com/v3/guide/slot.html"},{default:B((()=>[I(" form-create官网:设置组件插槽")])),_:1})])])),default:B((()=>[O(pe)])),_:1}),O(X,{title:"弹窗表单",desc:"调用表单弹窗需要使用 FitsFormDialog 组件，传递的数据类型为 FitsFormDialogModel。必填项为 visible 和 forms，visible 控制弹窗是否显示，forms 由一个或多个子表单组成，类型为 FitsFormModuleModel 数组。fits框架的表单有两种展现形式，一种是dialog对话框式，另一种是drawer抽屉式。"},{default:B((()=>[O(ne)])),_:1})])}}),[["__scopeId","data-v-349c3b17"]]);export{ce as default};
