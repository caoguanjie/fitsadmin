import{b as e,d as t,_ as s,w as a,a1 as u,bg as l,i as r}from"./index-30624987.js";import{E as p,e as n,D as o,l as c,S as f,R as d,F as m,L as g,u as i,U as b,T as y,z as h,h as $}from"./vxetable-22d32819.js";const j=Symbol("rowContextKey"),v=e({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:["start","center","end","space-around","space-between","space-evenly"],default:"start"},align:{type:String,values:["top","middle","bottom"],default:"top"}}),x=p({name:"ElRow"});const N=a(s(p({...x,props:v,setup(e){const s=e,a=t("row"),u=n((()=>s.gutter));o(j,{gutter:u});const l=n((()=>{const e={};return s.gutter?(e.marginRight=e.marginLeft=`-${s.gutter/2}px`,e):e})),r=n((()=>[a.b(),a.is(`justify-${s.justify}`,"start"!==s.justify),a.is(`align-${s.align}`,"top"!==s.align)]));return(e,t)=>(c(),f(y(e.tag),{class:g(i(r)),style:b(i(l))},{default:d((()=>[m(e.$slots,"default")])),_:3},8,["class","style"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]])),w=e({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:u([Number,Object]),default:()=>l({})},sm:{type:u([Number,Object]),default:()=>l({})},md:{type:u([Number,Object]),default:()=>l({})},lg:{type:u([Number,Object]),default:()=>l({})},xl:{type:u([Number,Object]),default:()=>l({})}}),E=p({name:"ElCol"});const _=a(s(p({...E,props:w,setup(e){const s=e,{gutter:a}=h(j,{gutter:n((()=>0))}),u=t("col"),l=n((()=>{const e={};return a.value&&(e.paddingLeft=e.paddingRight=a.value/2+"px"),e})),p=n((()=>{const e=[];["span","offset","pull","push"].forEach((t=>{const a=s[t];r(a)&&("span"===t?e.push(u.b(`${s[t]}`)):a>0&&e.push(u.b(`${t}-${s[t]}`)))}));return["xs","sm","md","lg","xl"].forEach((t=>{r(s[t])?e.push(u.b(`${t}-${s[t]}`)):$(s[t])&&Object.entries(s[t]).forEach((([s,a])=>{e.push("span"!==s?u.b(`${t}-${s}-${a}`):u.b(`${t}-${a}`))}))})),a.value&&e.push(u.is("guttered")),[u.b(),e]}));return(e,t)=>(c(),f(y(e.tag),{class:g(i(p)),style:b(i(l))},{default:d((()=>[m(e.$slots,"default")])),_:3},8,["class","style"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]));export{_ as E,N as a};
