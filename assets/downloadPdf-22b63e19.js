import{o as e}from"./downloadPdf-d16567c7.js";import{z as t,U as a,bp as o}from"./index-b6db054e.js";import{u as s}from"./FitsTableProHook-a8ee8569.js";import{v as i,a as d,f as l,h as p,F as f,I as r,u as n,M as m}from"./vxetable-1644ac3d.js";import"./echarts-c32f5a2f.js";const u={class:"previewpdf-example"},c=i({name:"DownloadPDF"}),h=i({...c,setup(i){const c={data:{},type:"pdf",fileName:"PDF模板"};let h;const y=()=>{h&&clearTimeout(h),h=setTimeout((()=>{o({method:"get",url:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",responseType:"blob",headers:{"Content-Type":"application/json"}}).then((t=>{c.data=t.data,e(c)})).catch((e=>{}))}),500)},g=d(),{fitsTablePro:x}=s({columns:[{field:"name",title:"文件名"},{field:"suffix",title:"文件后缀"},{field:"type",title:"文件MIME类型"},{field:"address",title:"文件路径"},{field:"size",title:"文件大小"},{field:"operation",title:"操作",slots:{default:"operation_default"},width:300}],data:[{name:"pdf模板",suffix:"PDF",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"}]},g);return(e,o)=>(l(),p("div",u,[f(n(a),{option:n(x),ref_key:"xGrid",ref:g},{operation_default:r((()=>[f(n(t),{size:"small",type:"primary",onClick:y},{default:r((()=>[m(" 下载pdf ")])),_:1})])),_:1},8,["option"])]))}});export{h as default};
