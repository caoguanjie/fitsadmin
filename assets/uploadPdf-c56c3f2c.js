import{aa as e,r as a,a6 as t}from"./index-b6db054e.js";import{v as l,f as s,h as o,F as n,u as d,a as p,I as u,i}from"./vxetable-1644ac3d.js";import{F as r}from"./FitsCard-f3bf9865.js";import"./echarts-c32f5a2f.js";const m={class:"upload-example"},c=l({__name:"baseUpload",setup(t){const l={url:`${a}/mock/78/api/uploadPDF`};return(a,t)=>(s(),o("div",m,[n(d(e),{url:l.url,data:{state:1,state2:2}},null,8,["url"])]))}}),f={class:"upload-example"},x=l({__name:"typeUpload",setup(a){const t=["images","video","audio","pdf","docx","excel","ppt","apk","zip","txt","exe"];return(a,l)=>(s(),o("div",f,[n(d(e),{type:t,limit:100})]))}}),v={class:"upload-example"},_=i("div",null,"这是顶部插槽",-1),O=i("div",null,"这是文字插槽",-1),h=i("div",null,"这是图标底部的插槽",-1),U=i("div",null,"这是底部插槽",-1),b=l({__name:"slotUpload",setup(a){let l=p(new URL("/fitsadmin/assets/pdf-e6ef6a81.png",self.location).href);return(a,p)=>{const i=t;return s(),o("div",v,[n(d(e),null,{uploadTemplate:u((()=>[_])),text:u((()=>[O])),"icon-unUpload":u((()=>[n(i,{style:{width:"100%",height:"100%"},src:d(l)},null,8,["src"])])),bottomText:u((()=>[h])),uploadBottom:u((()=>[U])),_:1})])}}}),g={class:"upload-example"},F=l({__name:"emitUpload",setup(a){const t=e=>{},l=e=>{},p=e=>{},u=e=>{},i=e=>{},r=e=>{},m=e=>{},c=e=>{},f=()=>{},x=()=>{};return(a,v)=>(s(),o("div",g,[n(d(e),{showfile:!0,onOnSuccess:u,onOnError:i,onOnProgress:p,onOnChange:t,onOnRemove:r,onOnPreview:m,onOnbeforeUpload:l,onOnExceed:c,onOnCancel:f,onOnSubmit:x})]))}}),j={class:"upload-example"},w=l({name:"UploadPDF"}),y=l({...w,setup:e=>(e,a)=>(s(),o("div",j,[n(r,{title:"基础用法",desc:"上传组件的基础用法，配置上传地址，可以通过拖动和点击上传"},{default:u((()=>[n(c)])),_:1}),n(r,{title:"上传不同格式文件",desc:"通过配置type，修改上传框允许上传的文件类型，中间图标需要通过插槽配置"},{default:u((()=>[n(x)])),_:1}),n(r,{title:"组件插槽",desc:"设置了多个插槽，可以自定义修改插槽各个样式"},{default:u((()=>[n(b)])),_:1}),n(r,{title:"组件方法",desc:"预留了多个方法，满足条件时触发,通过控制台查看回调触发情况"},{default:u((()=>[n(F)])),_:1})]))});export{y as default};
