import{m as e,u as a,bL as t,bM as s}from"./index-68eff4a3.js";import{E as i,a as r,d as l,aA as p,l as u,m,u as v,S as n,X as o}from"./vxetable-f32c91e3.js";import"./echarts-1215139a.js";const h=i({name:"ViteKeepalive1"}),d=i({...h,setup(i){const{microFrontends:{subURL:h}}=e(),{bus:d}=s,f=r(),b=r(!0),k=a(),c=r(`${h}#${k.meta.path}`);return t.info("子应用的地址：",c.value),l((()=>{})),p((()=>{f.value.startApp({name:"vite-vue3-keepalive",url:c}).then((()=>{d.$emit("move",{path:k.meta.path})}))})),(e,a)=>(u(),m("div",null,[v(b)?(u(),n(v(s),{key:0,width:"100%",height:"100%",alive:!0,name:"vite-vue3-keepalive",url:v(c),props:{type:"keepalive"},ref_key:"wujie",ref:f},null,8,["url"])):o("",!0)]))}});export{d as default};
