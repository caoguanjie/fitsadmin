import{n as e,u as a,c6 as t,c7 as s}from"./index-853584e7.js";import{v as i,a as r,d as l,al as p,f as u,h as v,u as n,J as m,O as o}from"./vxetable-90850a7d.js";import"./echarts-c32f5a2f.js";const h=i({name:"ViteKeepalive1"}),f=i({...h,setup(i){const{microFrontends:{subURL:h}}=e(),{bus:f}=s,c=r(),d=r(!0),k=a(),j=r(`${h}#${k.meta.path}`);return t.info("子应用的地址：",j.value),l((()=>{})),p((()=>{c.value.startApp({name:"vite-vue3-keepalive",url:j}).then((()=>{f.$emit("move",{path:k.meta.path})}))})),(e,a)=>(u(),v("div",null,[n(d)?(u(),m(n(s),{key:0,width:"100%",height:"100%",alive:!0,name:"vite-vue3-keepalive",url:n(j),props:{type:"keepalive"},ref_key:"wujie",ref:c},null,8,["url"])):o("",!0)]))}});export{f as default};