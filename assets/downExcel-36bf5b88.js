import{o as e}from"./downloadPdf-d16567c7.js";import{ai as a,x as s,P as t}from"./index-0c87cbf6.js";import{u as i}from"./FitsTableProHook-3ab5698c.js";import{E as d,a as p,l,m as o,O as f,R as c,u as n,V as u}from"./vxetable-072d8c57.js";import"./echarts-1215139a.js";const r={class:"previewpdf-example"},m=d({name:"DownloadExcel"}),x=d({...m,setup(d){const m={data:{},type:"xls",fileName:"Excel模板"};let x;const g=()=>{x&&clearTimeout(x),x=setTimeout((()=>{a({url:"downloadExcel",method:"get"}).then((a=>{m.data=a.ReturnData,e(m)})).catch((e=>{}))}),500)},h=p(),{fitsTablePro:v}=i({columns:[{field:"name",title:"文件名"},{field:"suffix",title:"文件后缀"},{field:"type",title:"文件MIME类型"},{field:"address",title:"文件路径"},{field:"size",title:"文件大小"},{field:"operation",title:"操作",slots:{default:"operation_default"},width:300}],data:[{name:"excel模板1",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板2",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板3",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板4",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板5",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板6",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板7",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"},{name:"excel模板8",suffix:"csv",type:"application/pdf",address:"http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf",size:"558.13KB"}]},h);return(e,a)=>(l(),o("div",r,[f(n(t),{option:n(v),ref_key:"xGrid",ref:h},{operation_default:c((()=>[f(n(s),{size:"small",type:"primary",onClick:g},{default:c((()=>[u(" 下载excel ")])),_:1})])),_:1},8,["option"])]))}});export{x as default};