import{am as e,an as l,d as t,ao as s,b as a,_ as n,ap as r,aq as i,ar as o,w as c,h as p}from"./index-5ebca8e7.js";import{E as u,z as d,ag as y,u as m,l as b,m as v,p as h,P as g,a7 as f,S,O as w,Q as k,D as x,e as $,L as D,F as E,V as N,W as _,X as z}from"./vxetable-f32c91e3.js";const A=Symbol("elDescriptions");var W=u({name:"ElDescriptionsCell",props:{cell:{type:Object},tag:{type:String},type:{type:String}},setup:()=>({descriptions:d(A,{})}),render(){var a,n,r,i,o,c;const p=e(this.cell),{border:u,direction:d}=this.descriptions,m="vertical"===d,b=(null==(r=null==(n=null==(a=this.cell)?void 0:a.children)?void 0:n.label)?void 0:r.call(n))||p.label,v=null==(c=null==(o=null==(i=this.cell)?void 0:i.children)?void 0:o.default)?void 0:c.call(o),h=p.span,g=p.align?`is-${p.align}`:"",f=p.labelAlign?`is-${p.labelAlign}`:g,S=p.className,w=p.labelClassName,k={width:l(p.width),minWidth:l(p.minWidth)},x=t("descriptions");switch(this.type){case"label":return y(this.tag,{style:k,class:[x.e("cell"),x.e("label"),x.is("bordered-label",u),x.is("vertical-label",m),f,w],colSpan:m?h:1},b);case"content":return y(this.tag,{style:k,class:[x.e("cell"),x.e("content"),x.is("bordered-content",u),x.is("vertical-content",m),g,S],colSpan:m?h:2*h-1},v);default:return y("td",{style:k,class:[x.e("cell"),g],colSpan:h},[s(b)?void 0:y("span",{class:[x.e("label"),w]},b),y("span",{class:[x.e("content"),S]},v)])}}});const j=a({row:{type:Array,default:()=>[]}}),C={key:1},I=u({name:"ElDescriptionsRow"});var O=n(u({...I,props:j,setup(e){const l=d(A,{});return(e,t)=>"vertical"===m(l).direction?(b(),v(g,{key:0},[h("tr",null,[(b(!0),v(g,null,f(e.row,((e,l)=>(b(),S(m(W),{key:`tr1-${l}`,cell:e,tag:"th",type:"label"},null,8,["cell"])))),128))]),h("tr",null,[(b(!0),v(g,null,f(e.row,((e,l)=>(b(),S(m(W),{key:`tr2-${l}`,cell:e,tag:"td",type:"content"},null,8,["cell"])))),128))])],64)):(b(),v("tr",C,[(b(!0),v(g,null,f(e.row,((e,t)=>(b(),v(g,{key:`tr3-${t}`},[m(l).border?(b(),v(g,{key:0},[w(m(W),{cell:e,tag:"td",type:"label"},null,8,["cell"]),w(m(W),{cell:e,tag:"td",type:"content"},null,8,["cell"])],64)):(b(),S(m(W),{key:1,cell:e,tag:"td",type:"both"},null,8,["cell"]))],64)))),128))]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/descriptions-row.vue"]]);const q=a({border:{type:Boolean,default:!1},column:{type:Number,default:3},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},size:r,title:{type:String,default:""},extra:{type:String,default:""}}),B=u({name:"ElDescriptions"});var F=n(u({...B,props:q,setup(e){const l=e,s=t("descriptions"),a=i(),n=k();x(A,l);const r=$((()=>[s.b(),s.m(a.value)])),c=(e,l,t,s=!1)=>(e.props||(e.props={}),l>t&&(e.props.span=t),s&&(e.props.span=l),e),p=()=>{var e;const t=o(null==(e=n.default)?void 0:e.call(n)).filter((e=>{var l;return"ElDescriptionsItem"===(null==(l=null==e?void 0:e.type)?void 0:l.name)})),s=[];let a=[],r=l.column,i=0;return t.forEach(((e,n)=>{var o;const p=(null==(o=e.props)?void 0:o.span)||1;if(n<t.length-1&&(i+=p>r?r:p),n===t.length-1){const t=l.column-i%l.column;return a.push(c(e,t,r,!0)),void s.push(a)}p<r?(r-=p,a.push(e)):(a.push(c(e,p,r)),s.push(a),r=l.column,a=[])})),s};return(e,l)=>(b(),v("div",{class:D(m(r))},[e.title||e.extra||e.$slots.title||e.$slots.extra?(b(),v("div",{key:0,class:D(m(s).e("header"))},[h("div",{class:D(m(s).e("title"))},[E(e.$slots,"title",{},(()=>[N(_(e.title),1)]))],2),h("div",{class:D(m(s).e("extra"))},[E(e.$slots,"extra",{},(()=>[N(_(e.extra),1)]))],2)],2)):z("v-if",!0),h("div",{class:D(m(s).e("body"))},[h("table",{class:D([m(s).e("table"),m(s).is("bordered",e.border)])},[h("tbody",null,[(b(!0),v(g,null,f(p(),((e,l)=>(b(),S(O,{key:l,row:e},null,8,["row"])))),128))])],2)],2)],2))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/description.vue"]]),L=u({name:"ElDescriptionsItem",props:{label:{type:String,default:""},span:{type:Number,default:1},width:{type:[String,Number],default:""},minWidth:{type:[String,Number],default:""},align:{type:String,default:"left"},labelAlign:{type:String,default:""},className:{type:String,default:""},labelClassName:{type:String,default:""}}});const P=c(F,{DescriptionsItem:L}),Q=p(L);export{P as E,Q as a};
