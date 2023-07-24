import{by as e,x as t,as as l,j as a}from"./index-0c87cbf6.js";import{E as i,a as o,l as d,S as u,u as r,A as s,m as n,O as m,R as p,V as g,P as c}from"./vxetable-072d8c57.js";import{F as b}from"./FitsCard-15f45ad5.js";import"./echarts-1215139a.js";const f=i({__name:"baseEditor",setup(t){let l=o("<p>正文</p><br/><p>内容</p>");return(t,a)=>(d(),u(r(e),{modelValue:r(l),"onUpdate:modelValue":a[0]||(a[0]=e=>s(l)?l.value=e:l=e)},null,8,["modelValue"]))}}),_=i({__name:"excludeEditor",setup(t){let l=o("");const a=["underline","italic","group-more-style","color","bgColor","|","fontSize","fontFamily","lineHeight","|","bulletedList","numberedList","todo","group-justify","group-indent","|","emotion","insertLink","group-image","group-video","insertTable","codeBlock","divider","|","undo","redo","|","fullScreen"];return(t,i)=>(d(),u(r(e),{modelValue:r(l),"onUpdate:modelValue":i[0]||(i[0]=e=>s(l)?l.value=e:l=e),excludeKeys:a},null,8,["modelValue"]))}}),y=i({__name:"resetEditor",setup(t){let l=o(""),a=["bold","|","underline","|","italic","|","through","code","sub","sup","clearStyle","color","bgColor","fontSize","fontFamily","indent","delIndent","justifyLeft","justifyRight","justifyCenter","justifyJustify","lineHeight","insertImage","deleteImage","editImage","viewImageLink","imageWidth30","imageWidth50","imageWidth100","divider","emotion","insertLink","editLink","unLink","viewLink","codeBlock","blockquote","headerSelect","header1","header2","header3","header4","header5","todo","redo","undo","fullScreen","enter","bulletedList","numberedList","insertTable","deleteTable","insertTableRow","deleteTableRow","insertTableCol","deleteTableCol","tableHeader","tableFullWidth","insertVideo","uploadVideo","editVideoSize","uploadImage","codeSelectLang"];return(t,i)=>(d(),u(r(e),{modelValue:r(l),"onUpdate:modelValue":i[0]||(i[0]=e=>s(l)?l.value=e:l=e),toolbarKeys:r(a)},null,8,["modelValue","toolbarKeys"]))}}),h=a(i({__name:"isreadEditor",setup(a){let i=o("<p>内容</p></br><p><img src='https://caoguanjie.github.io/fitsadmin/images/20220810082733.png'></img></p><p><img src='https://caoguanjie.github.io/fitsadmin/images/20220913043740.png'></img></p>"),u=o(!0);return(a,o)=>{const b=t,f=l;return d(),n(c,null,[m(f,{class:"button-group"},{default:p((()=>[m(b,{type:"primary",onClick:o[0]||(o[0]=e=>s(u)?u.value=!1:u=!1)},{default:p((()=>[g(" 只读")])),_:1}),m(b,{type:"primary",onClick:o[1]||(o[1]=e=>s(u)?u.value=!0:u=!0)},{default:p((()=>[g("编辑")])),_:1})])),_:1}),m(r(e),{modelValue:r(i),"onUpdate:modelValue":o[2]||(o[2]=e=>s(i)?i.value=e:i=e),isEditer:r(u)},null,8,["modelValue","isEditer"])],64)}}}),[["__scopeId","data-v-835134b7"]]),V=i({__name:"uploadEditor",setup(t){let l=o("");const a=(e,t)=>{setTimeout((()=>{t({url:"https://caoguanjie.github.io/fitsadmin/images/logo.png",alt:"yyy",href:"zzz"})}),1e3)},i=(e,t)=>{setTimeout((()=>{t({url:"https://caoguanjie.github.io/fitsadmin/images/logo.png",poster:"xxx.png"})}),1e3)};return(t,o)=>(d(),u(r(e),{onUploadImg:a,onUploadVideo:i,modelValue:r(l),"onUpdate:modelValue":o[0]||(o[0]=e=>s(l)?l.value=e:l=e)},null,8,["modelValue"]))}}),v=i({__name:"noscrollEditor",setup(t){let l=o("<p>正文</p><br/><p>内容</p>");return(t,a)=>(d(),u(r(e),{modelValue:r(l),"onUpdate:modelValue":a[0]||(a[0]=e=>s(l)?l.value=e:l=e),isScroll:!0,EditorClass:"fitsediter"},null,8,["modelValue"]))}}),E=a(i({__name:"isPreviewEditor",setup(a){let i=o("<p>内容</p></br><img src='https://caoguanjie.github.io/fitsadmin/images/logo.png'></img>"),u=o(!0);return(a,o)=>{const b=t,f=l;return d(),n(c,null,[m(f,{class:"button-group"},{default:p((()=>[m(b,{type:"primary",onClick:o[0]||(o[0]=e=>s(u)?u.value=!1:u=!1)},{default:p((()=>[g(" 只读")])),_:1}),m(b,{type:"primary",onClick:o[1]||(o[1]=e=>s(u)?u.value=!0:u=!0)},{default:p((()=>[g("编辑")])),_:1})])),_:1}),m(r(e),{modelValue:r(i),"onUpdate:modelValue":o[2]||(o[2]=e=>s(i)?i.value=e:i=e),isEditer:r(u),isPreview:!1},null,8,["modelValue","isEditer"])],64)}}}),[["__scopeId","data-v-9ede5f79"]]),j=a(i({__name:"istoolbarEditor",setup(a){let i=o("<p>内容</p></br><img src='https://caoguanjie.github.io/fitsadmin/images/20220810082733.png'></img>"),u=o(!0);return(a,o)=>{const b=t,f=l;return d(),n(c,null,[m(f,{class:"button-group"},{default:p((()=>[m(b,{type:"primary",onClick:o[0]||(o[0]=e=>s(u)?u.value=!1:u=!1)},{default:p((()=>[g(" 只读")])),_:1}),m(b,{type:"primary",onClick:o[1]||(o[1]=e=>s(u)?u.value=!0:u=!0)},{default:p((()=>[g("编辑")])),_:1})])),_:1}),m(r(e),{isToolbar:!0,modelValue:r(i),"onUpdate:modelValue":o[2]||(o[2]=e=>s(i)?i.value=e:i=e),isEditer:r(u)},null,8,["modelValue","isEditer"])],64)}}}),[["__scopeId","data-v-3e2d7183"]]),k={class:"editor-example"},C=i({__name:"index",setup:e=>(e,t)=>(d(),n("div",k,[m(b,{title:"基础用法",desc:"富文本编辑器基础用法。给编辑器绑定String类型数据,,在编辑器内输入的内容都将以HTML保存。"},{default:p((()=>[m(f)])),_:1}),m(b,{title:"配置上传图片",desc:"使用到图片上传时必须配置上传地址"},{default:p((()=>[m(V)])),_:1}),m(b,{title:"切换状态",desc:"传入isEditer<boolean>切换编辑器只读、编辑状态"},{default:p((()=>[m(h)])),_:1}),m(b,{title:"不隐藏工具栏",desc:"传入isToolbar<boolean>只读状态下不隐藏工具栏"},{default:p((()=>[m(j)])),_:1}),m(b,{title:"禁用图片预览",desc:"传入isPreview<boolean>值为false禁用图片预览,默认开启图片预览"},{default:p((()=>[m(E)])),_:1}),m(b,{title:"配置工具栏",desc:"删除默认工具栏某些配置,传入数组excludeKeys<array>,将需要删除的工具栏配置项从工具栏移除。"},{default:p((()=>[m(_)])),_:1}),m(b,{title:"重写工具栏",desc:"重新定义工具栏配置,传入toolbarKeys<array>,自定义工具栏配置。"},{default:p((()=>[m(y)])),_:1}),m(b,{title:"滚动条编辑器",desc:"固定编辑器高度，通过配置isScroll和自定义类名以及改写编辑器高度，当超出编辑器高度时则产生滚动条"},{default:p((()=>[m(v)])),_:1})]))});export{C as default};