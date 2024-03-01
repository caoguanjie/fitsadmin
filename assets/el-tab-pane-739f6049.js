import{b as e,a8 as a,aC as t,al as l,e as s,c as o,_ as n,aD as r,aE as i,aF as u,E as d,g as c,h as v,aG as p,aH as b,aI as m,aJ as f,ab as h,j as y,d as g,i as x,aK as $,w,k as C}from"./index-853584e7.js";import{v as k,c as P,m as N,a as T,b as B,n as S,f as E,h as R,D as A,u as F,L as _,e as K,d as L,E as j,F as H,t as I,x as V,H as q,B as z,A as D,Q as M,R as O,O as G}from"./vxetable-90850a7d.js";import{u as J}from"./index-07d685ba.js";const Q=Symbol("tabsRootContextKey"),U=e({tabs:{type:a(Array),default:()=>t([])}}),W="ElTabBar",X=k({name:W});var Y=n(k({...X,props:U,setup(e,{expose:a}){const t=e,n=P(),i=N(Q);i||l(W,"<el-tabs><el-tab-bar /></el-tabs>");const u=s("tabs"),d=T(),c=T(),v=()=>c.value=(()=>{let e=0,a=0;const l=["top","bottom"].includes(i.props.tabPosition)?"width":"height",s="width"===l?"x":"y",o="x"===s?"left":"top";return t.tabs.every((s=>{var i,u;const d=null==(u=null==(i=n.parent)?void 0:i.refs)?void 0:u[`tab-${s.uid}`];if(!d)return!1;if(!s.active)return!0;e=d[`offset${r(o)}`],a=d[`client${r(l)}`];const c=window.getComputedStyle(d);return"width"===l&&(t.tabs.length>1&&(a-=Number.parseFloat(c.paddingLeft)+Number.parseFloat(c.paddingRight)),e+=Number.parseFloat(c.paddingLeft)),!1})),{[l]:`${a}px`,transform:`translate${r(s)}(${e}px)`}})();return B((()=>t.tabs),(async()=>{await S(),v()}),{immediate:!0}),o(d,(()=>v())),a({ref:d,update:v}),(e,a)=>(E(),R("div",{ref_key:"barRef",ref:d,class:A([F(u).e("active-bar"),F(u).is(F(i).props.tabPosition)]),style:_(c.value)},null,6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const Z=e({panes:{type:a(Array),default:()=>t([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),ee="ElTabNav",ae=k({name:ee,props:Z,emits:{tabClick:(e,a,t)=>t instanceof Event,tabRemove:(e,a)=>a instanceof Event},setup(e,{expose:a,emit:t}){const n=P(),m=N(Q);m||l(ee,"<el-tabs><tab-nav /></el-tabs>");const f=s("tabs"),h=i(),y=u(),g=T(),x=T(),$=T(),w=T(),C=T(!1),k=T(0),E=T(!1),R=T(!0),A=K((()=>["top","bottom"].includes(m.props.tabPosition)?"width":"height")),F=K((()=>({transform:`translate${"width"===A.value?"X":"Y"}(-${k.value}px)`}))),_=()=>{if(!g.value)return;const e=g.value[`offset${r(A.value)}`],a=k.value;if(!a)return;const t=a>e?a-e:0;k.value=t},I=()=>{if(!g.value||!x.value)return;const e=x.value[`offset${r(A.value)}`],a=g.value[`offset${r(A.value)}`],t=k.value;if(e-t<=a)return;const l=e-t>2*a?t+a:e-a;k.value=l},V=async()=>{const e=x.value;if(!(C.value&&$.value&&g.value&&e))return;await S();const a=$.value.querySelector(".is-active");if(!a)return;const t=g.value,l=["top","bottom"].includes(m.props.tabPosition),s=a.getBoundingClientRect(),o=t.getBoundingClientRect(),n=l?e.offsetWidth-o.width:e.offsetHeight-o.height,r=k.value;let i=r;l?(s.left<o.left&&(i=r-(o.left-s.left)),s.right>o.right&&(i=r+s.right-o.right)):(s.top<o.top&&(i=r-(o.top-s.top)),s.bottom>o.bottom&&(i=r+(s.bottom-o.bottom))),i=Math.max(i,0),k.value=Math.min(i,n)},q=()=>{var a;if(!x.value||!g.value)return;e.stretch&&(null==(a=w.value)||a.update());const t=x.value[`offset${r(A.value)}`],l=g.value[`offset${r(A.value)}`],s=k.value;l<t?(C.value=C.value||{},C.value.prev=s,C.value.next=s+l<t,t-s<l&&(k.value=t-l)):(C.value=!1,s>0&&(k.value=0))},z=e=>{const a=e.code,{up:t,down:l,left:s,right:o}=b;if(![t,l,s,o].includes(a))return;const n=Array.from(e.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),r=n.indexOf(e.target);let i;i=a===s||a===t?0===r?n.length-1:r-1:r<n.length-1?r+1:0,n[i].focus({preventScroll:!0}),n[i].click(),D()},D=()=>{R.value&&(E.value=!0)},M=()=>E.value=!1;return B(h,(e=>{"hidden"===e?R.value=!1:"visible"===e&&setTimeout((()=>R.value=!0),50)})),B(y,(e=>{e?setTimeout((()=>R.value=!0),50):R.value=!1})),o($,q),L((()=>setTimeout((()=>V()),0))),j((()=>q())),a({scrollToActiveTab:V,removeFocus:M}),B((()=>e.panes),(()=>n.update()),{flush:"post",deep:!0}),()=>{const a=C.value?[H("span",{class:[f.e("nav-prev"),f.is("disabled",!C.value.prev)],onClick:_},[H(d,null,{default:()=>[H(c,null,null)]})]),H("span",{class:[f.e("nav-next"),f.is("disabled",!C.value.next)],onClick:I},[H(d,null,{default:()=>[H(v,null,null)]})])]:null,l=e.panes.map(((a,l)=>{var s,o,n,r;const i=a.uid,u=a.props.disabled,c=null!=(o=null!=(s=a.props.name)?s:a.index)?o:`${l}`,v=!u&&(a.isClosable||e.editable);a.index=`${l}`;const h=v?H(d,{class:"is-icon-close",onClick:e=>t("tabRemove",a,e)},{default:()=>[H(p,null,null)]}):null,y=(null==(r=(n=a.slots).label)?void 0:r.call(n))||a.props.label,g=!u&&a.active?0:-1;return H("div",{ref:`tab-${i}`,class:[f.e("item"),f.is(m.props.tabPosition),f.is("active",a.active),f.is("disabled",u),f.is("closable",v),f.is("focus",E.value)],id:`tab-${c}`,key:`tab-${i}`,"aria-controls":`pane-${c}`,role:"tab","aria-selected":a.active,tabindex:g,onFocus:()=>D(),onBlur:()=>M(),onClick:e=>{M(),t("tabClick",a,c,e)},onKeydown:e=>{!v||e.code!==b.delete&&e.code!==b.backspace||t("tabRemove",a,e)}},[y,h])}));return H("div",{ref:$,class:[f.e("nav-wrap"),f.is("scrollable",!!C.value),f.is(m.props.tabPosition)]},[a,H("div",{class:f.e("nav-scroll"),ref:g},[H("div",{class:[f.e("nav"),f.is(m.props.tabPosition),f.is("stretch",e.stretch&&["top","bottom"].includes(m.props.tabPosition))],ref:x,style:F.value,role:"tablist",onKeydown:z},[e.type?null:H(Y,{ref:w,tabs:[...e.panes]},null),l])])])}}}),te=e({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:a(Function),default:()=>!0},stretch:Boolean}),le=e=>g(e)||x(e),se=k({name:"ElTabs",props:te,emits:{[h]:e=>le(e),tabClick:(e,a)=>a instanceof Event,tabChange:e=>le(e),edit:(e,a)=>["remove","add"].includes(a),tabRemove:e=>le(e),tabAdd:()=>!0},setup(e,{emit:a,slots:t,expose:l}){var o,n;const r=s("tabs"),{children:i,addChild:u,removeChild:c}=J(P(),"ElTabPane"),v=T(),p=T(null!=(n=null!=(o=e.modelValue)?o:e.activeName)?n:"0"),g=async(t,l=!1)=>{var s,o,n;if(p.value!==t&&!y(t))try{!1!==await(null==(s=e.beforeLeave)?void 0:s.call(e,t,p.value))&&(p.value=t,l&&(a(h,t),a("tabChange",t)),null==(n=null==(o=v.value)?void 0:o.removeFocus)||n.call(o))}catch(r){}},x=(e,t,l)=>{e.props.disabled||(g(t,!0),a("tabClick",e,l))},$=(e,t)=>{e.props.disabled||y(e.props.name)||(t.stopPropagation(),a("edit",e.props.name,"remove"),a("tabRemove",e.props.name))},w=()=>{a("edit",void 0,"add"),a("tabAdd")};return m({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},K((()=>!!e.activeName))),B((()=>e.activeName),(e=>g(e))),B((()=>e.modelValue),(e=>g(e))),B(p,(async()=>{var e;await S(),null==(e=v.value)||e.scrollToActiveTab()})),I(Q,{props:e,currentName:p,registerPane:u,unregisterPane:c}),l({currentName:p}),()=>{const a=t.addIcon,l=e.editable||e.addable?H("span",{class:r.e("new-tab"),tabindex:"0",onClick:w,onKeydown:e=>{e.code===b.enter&&w()}},[a?V(t,"addIcon"):H(d,{class:r.is("icon-plus")},{default:()=>[H(f,null,null)]})]):null,s=H("div",{class:[r.e("header"),r.is(e.tabPosition)]},[l,H(ae,{ref:v,currentName:p.value,editable:e.editable,type:e.type,panes:i.value,stretch:e.stretch,onTabClick:x,onTabRemove:$},null)]),o=H("div",{class:r.e("content")},[V(t,"default")]);return H("div",{class:[r.b(),r.m(e.tabPosition),{[r.m("card")]:"card"===e.type,[r.m("border-card")]:"border-card"===e.type}]},[..."bottom"!==e.tabPosition?[s,o]:[o,s]])}}}),oe=e({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),ne=["id","aria-hidden","aria-labelledby"],re="ElTabPane",ie=k({name:re});var ue=n(k({...ie,props:oe,setup(e){const a=e,t=P(),o=q(),n=N(Q);n||l(re,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const r=s("tab-pane"),i=T(),u=K((()=>a.closable||n.props.closable)),d=$((()=>{var e;return n.currentName.value===(null!=(e=a.name)?e:i.value)})),c=T(d.value),v=K((()=>{var e;return null!=(e=a.name)?e:i.value})),p=$((()=>!a.lazy||c.value||d.value));B(d,(e=>{e&&(c.value=!0)}));const b=z({uid:t.uid,slots:o,props:a,paneName:v,active:d,index:i,isClosable:u});return L((()=>{n.registerPane(b)})),D((()=>{n.unregisterPane(b.uid)})),(e,a)=>F(p)?M((E(),R("div",{key:0,id:`pane-${F(v)}`,class:A(F(r).b()),role:"tabpanel","aria-hidden":!F(d),"aria-labelledby":`tab-${F(v)}`},[V(e.$slots,"default")],10,ne)),[[O,F(d)]]):G("v-if",!0)}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const de=w(se,{TabPane:ue}),ce=C(ue);export{ce as E,de as a};