import{ah as e,a2 as a}from"./index-5ebca8e7.js";import{E as t,l,m as s,O as o,u as n,a as d,R as p,p as u}from"./vxetable-f32c91e3.js";import{F as i}from"./FitsCard-62c53653.js";import"./echarts-1215139a.js";const r={class:"upload-example"},m=t({__name:"baseUpload",setup(a){const t="http://192.168.32.108:3000/mock/78/api/uploadPDF";return(a,d)=>(l(),s("div",r,[o(n(e),{url:t,data:{state:1,state2:2}},null,8,["url"])]))}}),c={class:"upload-example"},f=t({__name:"typeUpload",setup(a){const t=["images","video","audio","pdf","docx","excel","ppt","apk","zip","txt","exe"];return(a,d)=>(l(),s("div",c,[o(n(e),{type:t,limit:100})]))}}),v={class:"upload-example"},x=u("div",null,"这是顶部插槽",-1),_=u("div",null,"这是文字插槽",-1),O=u("div",null,"这是图标底部的插槽",-1),h=u("div",null,"这是底部插槽",-1),U=t({__name:"slotUpload",setup(t){let u=d(new URL("/fitsadmin/vite-vue3/assets/pdf-e6ef6a81.png",self.location).href);return(t,d)=>{const i=a;return l(),s("div",v,[o(n(e),null,{uploadTemplate:p((()=>[x])),text:p((()=>[_])),"icon-unUpload":p((()=>[o(i,{style:{width:"100%",height:"100%"},src:n(u)},null,8,["src"])])),bottomText:p((()=>[O])),uploadBottom:p((()=>[h])),_:1})])}}}),b={class:"upload-example"},g=t({__name:"emitUpload",setup(a){const t=e=>{},d=e=>{},p=e=>{},u=e=>{},i=e=>{},r=e=>{},m=e=>{},c=e=>{},f=()=>{},v=()=>{};return(a,x)=>(l(),s("div",b,[o(n(e),{showfile:!0,onOnSuccess:u,onOnError:i,onOnProgress:p,onOnChange:t,onOnRemove:r,onOnPreview:m,onOnbeforeUpload:d,onOnExceed:c,onOnCancel:f,onOnSubmit:v})]))}}),j={class:"upload-example"},w=t({name:"UploadPDF"}),y=t({...w,setup:e=>(e,a)=>(l(),s("div",j,[o(i,{title:"基础用法",desc:"上传组件的基础用法，配置上传地址，可以通过拖动和点击上传"},{default:p((()=>[o(m)])),_:1}),o(i,{title:"上传不同格式文件",desc:"通过配置type，修改上传框允许上传的文件类型，中间图标需要通过插槽配置"},{default:p((()=>[o(f)])),_:1}),o(i,{title:"组件插槽",desc:"设置了多个插槽，可以自定义修改插槽各个样式"},{default:p((()=>[o(U)])),_:1}),o(i,{title:"组件方法",desc:"预留了多个方法，满足条件时触发,通过控制台查看回调触发情况"},{default:p((()=>[o(g)])),_:1})]))});export{y as default};
