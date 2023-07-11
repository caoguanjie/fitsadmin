import{F as e,B as a,R as s,q as t,C as r,j as o}from"./index-ca93fc99.js";import{d as i}from"./index-feecb639.js";import{E as d,a as p,J as l,l as n,m,O as u,u as w,az as f,aA as c,p as g}from"./vxetable-dc6e1f3b.js";import"./echarts-e0cca795.js";const v={class:"edit-password"},y=(e=>(f("data-v-a12a692a"),e=e(),c(),e))((()=>g("div",{class:"title"},"修改密码",-1))),P=o(d({__name:"EditPassword",setup(o){const d=p(null),f=l(new e({rule:[{type:"input",field:"oldPwd",title:"原密码",props:{placeholder:"请输入原密码",type:"password",showPassword:!0},validate:[{required:!0,type:"string",message:"请输入原密码"}]},{type:"input",field:"newPwd",title:"新密码",props:{placeholder:"请输入新密码",type:"password",maxlength:20,showPassword:!0},validate:[{required:!0,type:"string",message:"请输入新密码"},{validator:(e,a,s)=>i(a),message:"新密码长度10位以上，包含数字、字母、符号"}]},{type:"input",field:"againPwd",title:"确认新密码",props:{placeholder:"再次确认新密码",type:"password",showPassword:!0},validate:[{required:!0,type:"string",message:"请再次输入新密码"},{validator:(e,a,s)=>a===d.value.fApi.getValue("newPwd"),message:"密码不一致"}]}],option:{form:{labelPosition:"top"},submitBtn:{innerText:"保存内容"},resetBtn:{innerText:"重置"},onSubmit:e=>{!async function(){const e=d.value.fApi.formData(),{Message:r,RetCode:o}=await a(e);o===s.SUCCESS&&t.success(r)}()}}}));return(e,a)=>(n(),m("div",v,[y,u(w(r),{form:f,ref_key:"FormRef",ref:d},null,8,["form"])]))}}),[["__scopeId","data-v-a12a692a"]]);export{P as default};
