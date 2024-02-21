import{af as e,ag as l,e as t,ah as s,b as a,ai as n,_ as r,aj as i,ak as o,f as c,w as p,k as u}from"./index-b6db054e.js";import{v as d,m,Q as y,a6 as b,u as v,f as h,h as f,i as g,G as S,_ as k,J as w,F as x,H as N,t as $,e as D,D as E,x as _,M as j,N as A,O as z}from"./vxetable-1644ac3d.js";const C=Symbol("elDescriptions");var I=d({name:"ElDescriptionsCell",props:{cell:{type:Object},tag:{type:String,default:"td"},type:{type:String}},setup:()=>({descriptions:m(C,{})}),render(){var a,n,r,i,o,c,p;const u=e(this.cell),d=((null==(a=this.cell)?void 0:a.dirs)||[]).map((e=>{const{dir:l,arg:t,modifiers:s,value:a}=e;return[l,a,t,s]})),{border:m,direction:v}=this.descriptions,h="vertical"===v,f=(null==(i=null==(r=null==(n=this.cell)?void 0:n.children)?void 0:r.label)?void 0:i.call(r))||u.label,g=null==(p=null==(c=null==(o=this.cell)?void 0:o.children)?void 0:c.default)?void 0:p.call(c),S=u.span,k=u.align?`is-${u.align}`:"",w=u.labelAlign?`is-${u.labelAlign}`:k,x=u.className,N=u.labelClassName,$={width:l(u.width),minWidth:l(u.minWidth)},D=t("descriptions");switch(this.type){case"label":return y(b(this.tag,{style:$,class:[D.e("cell"),D.e("label"),D.is("bordered-label",m),D.is("vertical-label",h),w,N],colSpan:h?S:1},f),d);case"content":return y(b(this.tag,{style:$,class:[D.e("cell"),D.e("content"),D.is("bordered-content",m),D.is("vertical-content",h),k,x],colSpan:h?S:2*S-1},g),d);default:return y(b("td",{style:$,class:[D.e("cell"),k],colSpan:S},[s(f)?void 0:b("span",{class:[D.e("label"),N]},f),b("span",{class:[D.e("content"),x]},g)]),d)}}});const W=a({row:{type:n(Array),default:()=>[]}}),O={key:1},B=d({name:"ElDescriptionsRow"});var F=r(d({...B,props:W,setup(e){const l=m(C,{});return(e,t)=>"vertical"===v(l).direction?(h(),f(S,{key:0},[g("tr",null,[(h(!0),f(S,null,k(e.row,((e,l)=>(h(),w(v(I),{key:`tr1-${l}`,cell:e,tag:"th",type:"label"},null,8,["cell"])))),128))]),g("tr",null,[(h(!0),f(S,null,k(e.row,((e,l)=>(h(),w(v(I),{key:`tr2-${l}`,cell:e,tag:"td",type:"content"},null,8,["cell"])))),128))])],64)):(h(),f("tr",O,[(h(!0),f(S,null,k(e.row,((e,t)=>(h(),f(S,{key:`tr3-${t}`},[v(l).border?(h(),f(S,{key:0},[x(v(I),{cell:e,tag:"td",type:"label"},null,8,["cell"]),x(v(I),{cell:e,tag:"td",type:"content"},null,8,["cell"])],64)):(h(),w(v(I),{key:1,cell:e,tag:"td",type:"both"},null,8,["cell"]))],64)))),128))]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/descriptions-row.vue"]]);const G=a({border:{type:Boolean,default:!1},column:{type:Number,default:3},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},size:i,title:{type:String,default:""},extra:{type:String,default:""}}),H=d({name:"ElDescriptions"});var J=r(d({...H,props:G,setup(e){const l=e,s=t("descriptions"),a=o(),n=N();$(C,l);const r=D((()=>[s.b(),s.m(a.value)])),i=(e,l,t,s=!1)=>(e.props||(e.props={}),l>t&&(e.props.span=t),s&&(e.props.span=l),e),p=()=>{if(!n.default)return[];const e=c(n.default()).filter((e=>{var l;return"ElDescriptionsItem"===(null==(l=null==e?void 0:e.type)?void 0:l.name)})),t=[];let s=[],a=l.column,r=0;return e.forEach(((n,o)=>{var c;const p=(null==(c=n.props)?void 0:c.span)||1;if(o<e.length-1&&(r+=p>a?a:p),o===e.length-1){const e=l.column-r%l.column;return s.push(i(n,e,a,!0)),void t.push(s)}p<a?(a-=p,s.push(n)):(s.push(i(n,p,a)),t.push(s),a=l.column,s=[])})),t};return(e,l)=>(h(),f("div",{class:E(v(r))},[e.title||e.extra||e.$slots.title||e.$slots.extra?(h(),f("div",{key:0,class:E(v(s).e("header"))},[g("div",{class:E(v(s).e("title"))},[_(e.$slots,"title",{},(()=>[j(A(e.title),1)]))],2),g("div",{class:E(v(s).e("extra"))},[_(e.$slots,"extra",{},(()=>[j(A(e.extra),1)]))],2)],2)):z("v-if",!0),g("div",{class:E(v(s).e("body"))},[g("table",{class:E([v(s).e("table"),v(s).is("bordered",e.border)])},[g("tbody",null,[(h(!0),f(S,null,k(p(),((e,l)=>(h(),w(F,{key:l,row:e},null,8,["row"])))),128))])],2)],2)],2))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/description.vue"]]);const M=d({name:"ElDescriptionsItem",props:a({label:{type:String,default:""},span:{type:Number,default:1},width:{type:[String,Number],default:""},minWidth:{type:[String,Number],default:""},align:{type:String,default:"left"},labelAlign:{type:String,default:""},className:{type:String,default:""},labelClassName:{type:String,default:""}})}),Q=p(J,{DescriptionsItem:M}),R=u(M);export{R as E,Q as a};
