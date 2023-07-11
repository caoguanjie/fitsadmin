import{b as e,a2 as a,bm as t,ap as l,d as s,c as o,_ as n,bn as r,bo as i,bp as u,E as c,e as d,f as b,bq as v,a8 as p,br as m,bs as f,ah as h,g as y,i as g,bt as x,w as $,h as w}from"./index-ca93fc99.js";import{E as C,c as P,z as k,a as N,b as T,n as S,l as B,m as E,L as R,u as A,U as F,e as _,d as L,M as K,O as j,D as q,F as z,i as M,Q as V,J as O,I as U,_ as X,$ as D,X as H}from"./vxetable-dc6e1f3b.js";import{u as I}from"./index-499c0942.js";const J=Symbol("tabsRootContextKey"),Q=e({tabs:{type:a(Array),default:()=>t([])}}),W="ElTabBar",Y=C({name:W});var G=n(C({...Y,props:Q,setup(e,{expose:a}){const t=e,n=P(),i=k(J);i||l(W,"<el-tabs><el-tab-bar /></el-tabs>");const u=s("tabs"),c=N(),d=N(),b=()=>d.value=(()=>{let e=0,a=0;const l=["top","bottom"].includes(i.props.tabPosition)?"width":"height",s="width"===l?"x":"y",o="x"===s?"left":"top";return t.tabs.every((s=>{var i,u;const c=null==(u=null==(i=n.parent)?void 0:i.refs)?void 0:u[`tab-${s.uid}`];if(!c)return!1;if(!s.active)return!0;e=c[`offset${r(o)}`],a=c[`client${r(l)}`];const d=window.getComputedStyle(c);return"width"===l&&(t.tabs.length>1&&(a-=Number.parseFloat(d.paddingLeft)+Number.parseFloat(d.paddingRight)),e+=Number.parseFloat(d.paddingLeft)),!1})),{[l]:`${a}px`,transform:`translate${r(s)}(${e}px)`}})();return T((()=>t.tabs),(async()=>{await S(),b()}),{immediate:!0}),o(c,(()=>b())),a({ref:c,update:b}),(e,a)=>(B(),E("div",{ref_key:"barRef",ref:c,class:R([A(u).e("active-bar"),A(u).is(A(i).props.tabPosition)]),style:F(d.value)},null,6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const Z=e({panes:{type:a(Array),default:()=>t([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),ee="ElTabNav",ae=C({name:ee,props:Z,emits:{tabClick:(e,a,t)=>t instanceof Event,tabRemove:(e,a)=>a instanceof Event},setup(e,{expose:a,emit:t}){const n=P(),m=k(J);m||l(ee,"<el-tabs><tab-nav /></el-tabs>");const f=s("tabs"),h=i(),y=u(),g=N(),x=N(),$=N(),w=N(),C=N(!1),B=N(0),E=N(!1),R=N(!0),A=_((()=>["top","bottom"].includes(m.props.tabPosition)?"width":"height")),F=_((()=>({transform:`translate${"width"===A.value?"X":"Y"}(-${B.value}px)`}))),q=()=>{if(!g.value)return;const e=g.value[`offset${r(A.value)}`],a=B.value;if(!a)return;const t=a>e?a-e:0;B.value=t},z=()=>{if(!g.value||!x.value)return;const e=x.value[`offset${r(A.value)}`],a=g.value[`offset${r(A.value)}`],t=B.value;if(e-t<=a)return;const l=e-t>2*a?t+a:e-a;B.value=l},M=async()=>{const e=x.value;if(!(C.value&&$.value&&g.value&&e))return;await S();const a=$.value.querySelector(".is-active");if(!a)return;const t=g.value,l=["top","bottom"].includes(m.props.tabPosition),s=a.getBoundingClientRect(),o=t.getBoundingClientRect(),n=l?e.offsetWidth-o.width:e.offsetHeight-o.height,r=B.value;let i=r;l?(s.left<o.left&&(i=r-(o.left-s.left)),s.right>o.right&&(i=r+s.right-o.right)):(s.top<o.top&&(i=r-(o.top-s.top)),s.bottom>o.bottom&&(i=r+(s.bottom-o.bottom))),i=Math.max(i,0),B.value=Math.min(i,n)},V=()=>{var a;if(!x.value||!g.value)return;e.stretch&&(null==(a=w.value)||a.update());const t=x.value[`offset${r(A.value)}`],l=g.value[`offset${r(A.value)}`],s=B.value;l<t?(C.value=C.value||{},C.value.prev=s,C.value.next=s+l<t,t-s<l&&(B.value=t-l)):(C.value=!1,s>0&&(B.value=0))},O=e=>{const a=e.code,{up:t,down:l,left:s,right:o}=p;if(![t,l,s,o].includes(a))return;const n=Array.from(e.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),r=n.indexOf(e.target);let i;i=a===s||a===t?0===r?n.length-1:r-1:r<n.length-1?r+1:0,n[i].focus({preventScroll:!0}),n[i].click(),U()},U=()=>{R.value&&(E.value=!0)},X=()=>E.value=!1;return T(h,(e=>{"hidden"===e?R.value=!1:"visible"===e&&setTimeout((()=>R.value=!0),50)})),T(y,(e=>{e?setTimeout((()=>R.value=!0),50):R.value=!1})),o($,V),L((()=>setTimeout((()=>M()),0))),K((()=>V())),a({scrollToActiveTab:M,removeFocus:X}),T((()=>e.panes),(()=>n.update()),{flush:"post",deep:!0}),()=>{const a=C.value?[j("span",{class:[f.e("nav-prev"),f.is("disabled",!C.value.prev)],onClick:q},[j(c,null,{default:()=>[j(d,null,null)]})]),j("span",{class:[f.e("nav-next"),f.is("disabled",!C.value.next)],onClick:z},[j(c,null,{default:()=>[j(b,null,null)]})])]:null,l=e.panes.map(((a,l)=>{var s,o,n,r;const i=a.uid,u=a.props.disabled,d=null!=(o=null!=(s=a.props.name)?s:a.index)?o:`${l}`,b=!u&&(a.isClosable||e.editable);a.index=`${l}`;const h=b?j(c,{class:"is-icon-close",onClick:e=>t("tabRemove",a,e)},{default:()=>[j(v,null,null)]}):null,y=(null==(r=(n=a.slots).label)?void 0:r.call(n))||a.props.label,g=!u&&a.active?0:-1;return j("div",{ref:`tab-${i}`,class:[f.e("item"),f.is(m.props.tabPosition),f.is("active",a.active),f.is("disabled",u),f.is("closable",b),f.is("focus",E.value)],id:`tab-${d}`,key:`tab-${i}`,"aria-controls":`pane-${d}`,role:"tab","aria-selected":a.active,tabindex:g,onFocus:()=>U(),onBlur:()=>X(),onClick:e=>{X(),t("tabClick",a,d,e)},onKeydown:e=>{!b||e.code!==p.delete&&e.code!==p.backspace||t("tabRemove",a,e)}},[y,h])}));return j("div",{ref:$,class:[f.e("nav-wrap"),f.is("scrollable",!!C.value),f.is(m.props.tabPosition)]},[a,j("div",{class:f.e("nav-scroll"),ref:g},[j("div",{class:[f.e("nav"),f.is(m.props.tabPosition),f.is("stretch",e.stretch&&["top","bottom"].includes(m.props.tabPosition))],ref:x,style:F.value,role:"tablist",onKeydown:O},[e.type?null:j(G,{ref:w,tabs:[...e.panes]},null),l])])])}}}),te=e({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:a(Function),default:()=>!0},stretch:Boolean}),le=e=>M(e)||g(e);var se=C({name:"ElTabs",props:te,emits:{[h]:e=>le(e),tabClick:(e,a)=>a instanceof Event,tabChange:e=>le(e),edit:(e,a)=>["remove","add"].includes(a),tabRemove:e=>le(e),tabAdd:()=>!0},setup(e,{emit:a,slots:t,expose:l}){var o,n;const r=s("tabs"),{children:i,addChild:u,removeChild:d}=I(P(),"ElTabPane"),b=N(),v=N(null!=(n=null!=(o=e.modelValue)?o:e.activeName)?n:"0"),g=async t=>{var l,s,o;if(v.value!==t&&!y(t))try{!1!==await(null==(l=e.beforeLeave)?void 0:l.call(e,t,v.value))&&((e=>{v.value=e,a(h,e),a("tabChange",e)})(t),null==(o=null==(s=b.value)?void 0:s.removeFocus)||o.call(s))}catch(n){}},x=(e,t,l)=>{e.props.disabled||(g(t),a("tabClick",e,l))},$=(e,t)=>{e.props.disabled||y(e.props.name)||(t.stopPropagation(),a("edit",e.props.name,"remove"),a("tabRemove",e.props.name))},w=()=>{a("edit",void 0,"add"),a("tabAdd")};return m({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},_((()=>!!e.activeName))),T((()=>e.activeName),(e=>g(e))),T((()=>e.modelValue),(e=>g(e))),T(v,(async()=>{var e;await S(),null==(e=b.value)||e.scrollToActiveTab()})),q(J,{props:e,currentName:v,registerPane:u,unregisterPane:d}),l({currentName:v}),()=>{const a=e.editable||e.addable?j("span",{class:r.e("new-tab"),tabindex:"0",onClick:w,onKeydown:e=>{e.code===p.enter&&w()}},[j(c,{class:r.is("icon-plus")},{default:()=>[j(f,null,null)]})]):null,l=j("div",{class:[r.e("header"),r.is(e.tabPosition)]},[a,j(ae,{ref:b,currentName:v.value,editable:e.editable,type:e.type,panes:i.value,stretch:e.stretch,onTabClick:x,onTabRemove:$},null)]),s=j("div",{class:r.e("content")},[z(t,"default")]);return j("div",{class:[r.b(),r.m(e.tabPosition),{[r.m("card")]:"card"===e.type,[r.m("border-card")]:"border-card"===e.type}]},[..."bottom"!==e.tabPosition?[l,s]:[s,l]])}}});const oe=e({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),ne=["id","aria-hidden","aria-labelledby"],re="ElTabPane",ie=C({name:re});var ue=n(C({...ie,props:oe,setup(e){const a=e,t=P(),o=V(),n=k(J);n||l(re,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const r=s("tab-pane"),i=N(),u=_((()=>a.closable||n.props.closable)),c=x((()=>{var e;return n.currentName.value===(null!=(e=a.name)?e:i.value)})),d=N(c.value),b=_((()=>{var e;return null!=(e=a.name)?e:i.value})),v=x((()=>!a.lazy||d.value||c.value));T(c,(e=>{e&&(d.value=!0)}));const p=O({uid:t.uid,slots:o,props:a,paneName:b,active:c,index:i,isClosable:u});return L((()=>{n.registerPane(p)})),U((()=>{n.unregisterPane(p.uid)})),(e,a)=>A(v)?X((B(),E("div",{key:0,id:`pane-${A(b)}`,class:R(A(r).b()),role:"tabpanel","aria-hidden":!A(c),"aria-labelledby":`tab-${A(b)}`},[z(e.$slots,"default")],10,ne)),[[D,A(c)]]):H("v-if",!0)}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const ce=$(se,{TabPane:ue}),de=w(ue);export{de as E,ce as a};
