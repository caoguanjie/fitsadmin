import{b as e,i as a,t,c as l,d as o,f as s,e as n,E as i,g as r,h as u,_ as c,j as d,w as p,k as v,l as m,m as g,u as f,a as h,n as y,o as b,p as w,S as _,q as k,r as C,s as x,v as I,x as L,y as S,z as V,A as T,B as M,C as R}from"./index-853584e7.js";import{c as A,H as E,a as B,e as P,u as H,b as K,s as N,d as j,l as U,t as D,k as F,v as O,f as q,h as $,i as Q,J as z,I as W,Q as G,D as J,S as X,F as Y,R as Z,U as ee,O as ae,x as te,L as le,G as oe,aa as se,N as ne,m as ie,B as re,A as ue,C as ce,ad as de,M as pe,n as ve,an as me,ao as ge}from"./vxetable-90850a7d.js";import{u as fe}from"./index-07d685ba.js";import{i as he}from"./index-feecb639.js";import"./echarts-c32f5a2f.js";const ye=e({initialIndex:{type:Number,default:0},height:{type:String,default:""},trigger:{type:String,values:["hover","click"],default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:{type:String,values:["","none","outside"],default:""},arrow:{type:String,values:["always","hover","never"],default:"hover"},type:{type:String,values:["","card"],default:""},loop:{type:Boolean,default:!0},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},pauseOnHover:{type:Boolean,default:!0}}),be={change:(e,t)=>[e,t].every(a)},we=Symbol("carouselContextKey"),_e=(e,a,n)=>{const{children:i,addChild:r,removeChild:u}=fe(A(),"ElCarouselItem"),c=E(),d=B(-1),p=B(null),v=B(!1),m=B(),g=B(0),f=B(!0),h=P((()=>"never"!==e.arrow&&!H(w))),y=P((()=>i.value.some((e=>e.props.label.toString().length>0)))),b=P((()=>"card"===e.type)),w=P((()=>"vertical"===e.direction)),_=P((()=>"auto"!==e.height?{height:e.height}:{height:`${g.value}px`,overflow:"hidden"})),k=t((e=>{S(e)}),300,{trailing:!0}),C=t((a=>{!function(a){"hover"===e.trigger&&a!==d.value&&(d.value=a)}(a)}),300);function x(){p.value&&(clearInterval(p.value),p.value=null)}function I(){e.interval<=0||!e.autoplay||p.value||(p.value=setInterval((()=>L()),e.interval))}const L=()=>{d.value<i.value.length-1?d.value=d.value+1:e.loop&&(d.value=0)};function S(a){if(o(a)){const e=i.value.filter((e=>e.props.name===a));e.length>0&&(a=i.value.indexOf(e[0]))}if(a=Number(a),Number.isNaN(a)||a!==Math.floor(a))return;const t=i.value.length,l=d.value;d.value=a<0?e.loop?t-1:0:a>=t?e.loop?0:t-1:a,l===d.value&&V(l),T()}function V(e){i.value.forEach(((a,t)=>{a.translateItem(t,d.value,e)}))}function T(){x(),e.pauseOnHover||I()}K((()=>d.value),((e,t)=>{V(t),f.value&&(e%=2,t%=2),t>-1&&a("change",e,t)})),K((()=>e.autoplay),(e=>{e?I():x()})),K((()=>e.loop),(()=>{S(d.value)})),K((()=>e.interval),(()=>{T()}));const M=N();return j((()=>{K((()=>i.value),(()=>{i.value.length>0&&S(e.initialIndex)}),{immediate:!0}),M.value=l(m.value,(()=>{V()})),I()})),U((()=>{x(),m.value&&M.value&&M.value.stop()})),D(we,{root:m,isCardType:b,isVertical:w,items:i,loop:e.loop,addItem:r,removeItem:u,setActiveItem:S,setContainerHeight:function(a){"auto"===e.height&&(g.value=a)}}),{root:m,activeIndex:d,arrowDisplay:h,hasLabel:y,hover:v,isCardType:b,items:i,isVertical:w,containerStyle:_,isItemsTwoLength:f,handleButtonEnter:function(e){H(w)||i.value.forEach(((a,t)=>{e===function(e,a){var t,l,o,s;const n=H(i),r=n.length;if(0===r||!e.states.inStage)return!1;const u=a+1,c=a-1,d=r-1,p=n[d].states.active,v=n[0].states.active,m=null==(l=null==(t=n[u])?void 0:t.states)?void 0:l.active,g=null==(s=null==(o=n[c])?void 0:o.states)?void 0:s.active;return a===d&&v||m?"left":!!(0===a&&p||g)&&"right"}(a,t)&&(a.states.hover=!0)}))},handleButtonLeave:function(){H(w)||i.value.forEach((e=>{e.states.hover=!1}))},handleIndicatorClick:function(e){d.value=e},handleMouseEnter:function(){v.value=!0,e.pauseOnHover&&x()},handleMouseLeave:function(){v.value=!1,I()},setActiveItem:S,prev:function(){S(d.value-1)},next:function(){S(d.value+1)},PlaceholderItem:function(){var a;const t=null==(a=c.default)?void 0:a.call(c);if(!t)return null;const l=s(t).filter((e=>F(e)&&"ElCarouselItem"===e.type.name));return 2===(null==l?void 0:l.length)&&e.loop&&!b.value?(f.value=!0,l):(f.value=!1,null)},isTwoLengthShow:e=>!f.value||(d.value<=1?e<=1:e>1),throttledArrowClick:k,throttledIndicatorHover:C}},ke=["onMouseenter","onClick"],Ce={key:0},xe=O({name:"ElCarousel"});var Ie=c(O({...xe,props:ye,emits:be,setup(e,{expose:a,emit:t}){const l=e,{root:o,activeIndex:s,arrowDisplay:c,hasLabel:d,hover:p,isCardType:v,items:m,isVertical:g,containerStyle:f,handleButtonEnter:h,handleButtonLeave:y,handleIndicatorClick:b,handleMouseEnter:w,handleMouseLeave:_,setActiveItem:k,prev:C,next:x,PlaceholderItem:I,isTwoLengthShow:L,throttledArrowClick:S,throttledIndicatorHover:V}=_e(l,t),T=n("carousel"),M=P((()=>{const e=[T.b(),T.m(l.direction)];return H(v)&&e.push(T.m("card")),e})),R=P((()=>{const e=[T.e("indicators"),T.em("indicators",l.direction)];return H(d)&&e.push(T.em("indicators","labels")),"outside"===l.indicatorPosition&&e.push(T.em("indicators","outside")),H(g)&&e.push(T.em("indicators","right")),e}));return a({setActiveItem:k,prev:C,next:x}),(e,a)=>(q(),$("div",{ref_key:"root",ref:o,class:J(H(M)),onMouseenter:a[6]||(a[6]=X(((...e)=>H(w)&&H(w)(...e)),["stop"])),onMouseleave:a[7]||(a[7]=X(((...e)=>H(_)&&H(_)(...e)),["stop"]))},[Q("div",{class:J(H(T).e("container")),style:le(H(f))},[H(c)?(q(),z(ee,{key:0,name:"carousel-arrow-left",persisted:""},{default:W((()=>[G(Q("button",{type:"button",class:J([H(T).e("arrow"),H(T).em("arrow","left")]),onMouseenter:a[0]||(a[0]=e=>H(h)("left")),onMouseleave:a[1]||(a[1]=(...e)=>H(y)&&H(y)(...e)),onClick:a[2]||(a[2]=X((e=>H(S)(H(s)-1)),["stop"]))},[Y(H(i),null,{default:W((()=>[Y(H(r))])),_:1})],34),[[Z,("always"===e.arrow||H(p))&&(l.loop||H(s)>0)]])])),_:1})):ae("v-if",!0),H(c)?(q(),z(ee,{key:1,name:"carousel-arrow-right",persisted:""},{default:W((()=>[G(Q("button",{type:"button",class:J([H(T).e("arrow"),H(T).em("arrow","right")]),onMouseenter:a[3]||(a[3]=e=>H(h)("right")),onMouseleave:a[4]||(a[4]=(...e)=>H(y)&&H(y)(...e)),onClick:a[5]||(a[5]=X((e=>H(S)(H(s)+1)),["stop"]))},[Y(H(i),null,{default:W((()=>[Y(H(u))])),_:1})],34),[[Z,("always"===e.arrow||H(p))&&(l.loop||H(s)<H(m).length-1)]])])),_:1})):ae("v-if",!0),Y(H(I)),te(e.$slots,"default")],6),"none"!==e.indicatorPosition?(q(),$("ul",{key:0,class:J(H(R))},[(q(!0),$(oe,null,se(H(m),((a,t)=>G((q(),$("li",{key:t,class:J([H(T).e("indicator"),H(T).em("indicator",e.direction),H(T).is("active",t===H(s))]),onMouseenter:e=>H(V)(t),onClick:X((e=>H(b)(t)),["stop"])},[Q("button",{class:J(H(T).e("button"))},[H(d)?(q(),$("span",Ce,ne(a.props.label),1)):ae("v-if",!0)],2)],42,ke)),[[Z,H(L)(t)]]))),128))],2)):ae("v-if",!0)],34))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);const Le=e({name:{type:String,default:""},label:{type:[String,Number],default:""}}),Se=(e,a)=>{const t=ie(we),l=A(),o=.83,s=B(),n=B(!1),i=B(0),r=B(1),u=B(!1),c=B(!1),p=B(!1),v=B(!1),{isCardType:m,isVertical:g}=t;const f=(e,a,l)=>{var n;const f=H(m),h=null!=(n=t.items.value.length)?n:Number.NaN,y=e===a;f||d(l)||(v.value=y||e===l),!y&&h>2&&t.loop&&(e=function(e,a,t){const l=t-1,o=t/2;return 0===a&&e===l?-1:a===l&&0===e?t:e<a-1&&a-e>=o?t+1:e>a+1&&e-a>=o?-2:e}(e,a,h));const b=H(g);u.value=y,f?(p.value=Math.round(Math.abs(e-a))<=1,i.value=function(e,a){var l,o;const s=H(g)?(null==(l=t.root.value)?void 0:l.offsetHeight)||0:(null==(o=t.root.value)?void 0:o.offsetWidth)||0;return p.value?s*(1.17*(e-a)+1)/4:e<a?-1.83*s/4:3.83*s/4}(e,a),r.value=H(u)?1:o):i.value=function(e,a,l){const o=t.root.value;return o?((l?o.offsetHeight:o.offsetWidth)||0)*(e-a):0}(e,a,b),c.value=!0,y&&s.value&&t.setContainerHeight(s.value.offsetHeight)};return j((()=>{t.addItem({props:e,states:re({hover:n,translate:i,scale:r,active:u,ready:c,inStage:p,animating:v}),uid:l.uid,translateItem:f})})),ue((()=>{t.removeItem(l.uid)})),{carouselItemRef:s,active:u,animating:v,hover:n,inStage:p,isVertical:g,translate:i,isCardType:m,scale:r,ready:c,handleItemClick:function(){if(t&&H(m)){const e=t.items.value.findIndex((({uid:e})=>e===l.uid));t.setActiveItem(e)}}}},Ve=O({name:"ElCarouselItem"});var Te=c(O({...Ve,props:Le,setup(e){const a=e,t=n("carousel"),{carouselItemRef:l,active:o,animating:s,hover:i,inStage:r,isVertical:u,translate:c,isCardType:d,scale:p,ready:v,handleItemClick:m}=Se(a),g=P((()=>({transform:[`${"translate"+(H(u)?"Y":"X")}(${H(c)}px)`,`scale(${H(p)})`].join(" ")})));return(e,a)=>G((q(),$("div",{ref_key:"carouselItemRef",ref:l,class:J([H(t).e("item"),H(t).is("active",H(o)),H(t).is("in-stage",H(r)),H(t).is("hover",H(i)),H(t).is("animating",H(s)),{[H(t).em("item","card")]:H(d),[H(t).em("item","card-vertical")]:H(d)&&H(u)}]),style:le(H(g)),onClick:a[0]||(a[0]=(...e)=>H(m)&&H(m)(...e))},[H(d)?G((q(),$("div",{key:0,class:J(H(t).e("mask"))},null,2)),[[Z,!H(o)]]):ae("v-if",!0),te(e.$slots,"default")],6)),[[Z,H(v)]])}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);const Me=p(Ie,{CarouselItem:Te}),Re=v(Te),Ae={class:"left-pannel LoginLeftPannel"},Ee={class:"desc"},Be=["src"],Pe=m(O({__name:"LeftPannel",setup(e){const a=re([{label:"fits-vue3-element 是基于 vue3-element-admin 升级的 Vue3 版本后台管理前端解决方案；使用前端主流技术栈 Vue3 + Vite2 + TypeScript + Vue Router + Pinia + Volar + Element Plus 等",imgs:new URL("/fitsadmin/assets/img1-f5f8761b.svg",self.location).href},{label:"实现功能包括不限于动态权限路由、按钮权限控制、主题切换、系统管理基础模块，各种范例展示等等",imgs:new URL("/fitsadmin/assets/img2-8ce48ce7.svg",self.location).href},{label:"fits-vue3-element是丰德科技前端框架组于2022年最新后台管理系统框架，基于该框架开发了资产管理系统、康复管理系统等等",imgs:new URL("/fitsadmin/assets/img3-a144ea19.svg",self.location).href}]);return(e,t)=>{const l=Re,o=Me;return q(),$("div",Ae,[Y(o,{interval:3e3,arrow:"hover",class:"swiper"},{default:W((()=>[(q(!0),$(oe,null,se(a,(e=>(q(),z(l,{class:"swiper",key:e.label},{default:W((()=>[Q("div",Ee,ne(e.label),1),Q("img",{src:e.imgs,alt:""},null,8,Be)])),_:2},1024)))),128))])),_:1})])}}}),[["__scopeId","data-v-7a74030c"]]),He=e=>(me("data-v-5bbe69d9"),e=e(),ge(),e),Ke={class:"form-box LoginMainComponent"},Ne=He((()=>Q("div",{class:"form-title"},"账号登录",-1))),je=["src"],Ue={class:"item-other"},De={class:"left_remember"},Fe={key:0,class:"right_box"},Oe=He((()=>Q("div",{class:"form-title"},"验证码登录",-1))),qe={key:0,class:"item-other"},$e={class:"right_box"},Qe=m(O({__name:"MainLogin",setup(e){const a=f(),t=h(),{user:l}=y(),o=B(w),s=B(k),{time:n,start:i}=(()=>{const e=B(0),{pause:a,resume:t}=g((()=>{e.value--,e.value<=0&&a()}),1e3,{immediate:!1});return{start:a=>{e.value=a,t()},time:e}})(),{system:{coutDownTime:r},login:u}=C,c=P((()=>l.isRememberme)),d=re({redirect:"",curentLoginType:u.accountLogin?"accout":"verifycode",loginForm:{username:l.loginInfo.username,password:l.loginInfo.password,code:"",phone:""},isScanCodeLogin:!0,loginRules:{username:[{required:!0,trigger:"blur",message:"账号不能为空"}],password:[{required:!0,trigger:"blur",validator:function(e,a,t){a.length<6?t(new Error("密码不能少于6位")):t()}}]},loginVerifyRules:{phone:[{trigger:"blur",validator:function(e,a,t){0===a.length?t("手机号不能为空"):a.length<11?t("手机号不能低于11位"):he(a)?t():t("手机号格式不正确")}}],code:[{required:!0,trigger:"blur",message:"验证码不能为空12333"}]},loading:!1,isCoutDown:!1,passwordType:"password",captchaBase64:"",capslockTooltipDisabled:!0,otherQuery:{},clientHeight:document.documentElement.clientHeight,showCopyright:!0}),{loading:p,loginForm:v,curentLoginType:m,loginRules:T,passwordType:M,loginVerifyRules:R,captchaBase64:A}=ce(d);function E(){s.value.validate((async e=>{e?(d.loading=!0,await l.login(d.loginForm),x("electron")?t.push({path:d.redirect||"/",query:d.otherQuery}).then((()=>{window.ipcRenderer.send("openMainWindow")})):t.push({path:d.redirect||"/",query:d.otherQuery}),d.loading=!1):(d.loading=!1,U())}))}function N(e){l.toogleIsRememberMe(e)}function U(){b().then((({ReturnData:e})=>{const{Img:a}=e;d.captchaBase64=a}))}function D(e){d.loginForm={username:"",password:"",code:"",phone:""},d.curentLoginType=e}function F(){"password"===d.passwordType?d.passwordType="":d.passwordType="password",ve((()=>{o.value.focus()}))}return j((()=>{U()})),K(a,(()=>{const e=a.query;e&&(d.redirect=e.redirect,d.otherQuery=function(e){return Object.keys(e).reduce(((a,t)=>("redirect"!==t&&(a[t]=e[t]),a)),{})}(e))}),{immediate:!0}),(e,a)=>{const t=L,l=S,d=V;return q(),$("div",Ke,["accout"===H(m)&&H(u).accountLogin?(q(),z(H(k),{key:0,ref_key:"loginFormRef",ref:s,"label-width":"0",model:H(v),class:"elform",rules:H(T)},{default:W((()=>[Ne,Y(t,{prop:"username"},{default:W((()=>[Y(H(w),{modelValue:H(v).username,"onUpdate:modelValue":a[0]||(a[0]=e=>H(v).username=e),tabindex:"1","auto-complete":"on",placeholder:"请输入账号",class:"logininput",clearable:"",onKeyup:de(E,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Y(t,{prop:"password"},{default:W((()=>[Y(H(w),{type:H(M),ref_key:"passwordRef",ref:o,tabindex:"2","auto-complete":"on",modelValue:H(v).password,"onUpdate:modelValue":a[1]||(a[1]=e=>H(v).password=e),placeholder:"请输入密码",class:"logininput pwd",onKeyup:de(E,["enter"])},null,8,["type","modelValue","onKeyup"]),Q("span",{class:"show-pwd",onClick:F},[Y(H(_),{"icon-class":"password"===H(M)?"eyeclose":"eyeopen"},null,8,["icon-class"])])])),_:1}),Y(t,{prop:"code"},{default:W((()=>[Y(H(w),{modelValue:H(v).code,"onUpdate:modelValue":a[2]||(a[2]=e=>H(v).code=e),tabindex:"3","auto-complete":"on",placeholder:"请输入验证码",onKeyup:de(E,["enter"]),clearable:""},{append:W((()=>[Q("img",{src:H(A),onClick:U,class:"captcha"},null,8,je)])),_:1},8,["modelValue","onKeyup"])])),_:1}),Y(t,{class:"lastline"},{default:W((()=>[Q("div",Ue,[Q("div",De,[Y(l,{modelValue:c.value,"onUpdate:modelValue":a[3]||(a[3]=e=>c.value=e),label:"记住密码",size:"small",onChange:N},null,8,["modelValue"])]),H(u).smsLogin?(q(),$("div",Fe,[Y(d,{type:"primary",text:!0,class:"code-login",onClick:a[4]||(a[4]=e=>D("verifycode"))},{default:W((()=>[pe(" 验证码登录 ")])),_:1})])):ae("",!0)])])),_:1}),Y(t,null,{default:W((()=>[Y(d,{type:"primary",loading:H(p),class:"loginBtn",onClick:E},{default:W((()=>[pe("登录")])),_:1},8,["loading"])])),_:1})])),_:1},8,["model","rules"])):ae("",!0),"verifycode"===H(m)&&H(u).smsLogin?(q(),z(H(k),{key:1,"label-width":"0",ref_key:"loginFormRef",ref:s,model:H(v),rules:H(R),class:"elform"},{default:W((()=>[Oe,Y(t,{prop:"phone"},{default:W((()=>[Y(H(w),{modelValue:H(v).phone,"onUpdate:modelValue":a[5]||(a[5]=e=>H(v).phone=e),type:"text",maxlength:"11",minlength:"11",tabindex:"1","auto-complete":"on",placeholder:"请输入11位手机",class:"logininput",onKeyup:de(E,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Y(t,{prop:"code"},{default:W((()=>[Y(H(w),{modelValue:H(v).code,"onUpdate:modelValue":a[6]||(a[6]=e=>H(v).code=e),maxLength:"6",tabindex:"2","auto-complete":"on",class:"codeinput",placeholder:"请输入验证码",onKeyup:de(E,["enter"])},null,8,["modelValue","onKeyup"]),Y(d,{type:"primary",text:!0,class:"verification",disabled:0!==H(n),onClick:a[7]||(a[7]=e=>{s.value.validateField("phone",(e=>{if(!e)return!1;I.success("验证码已经发送！"),i(r)}))})},{default:W((()=>[pe(ne(0===H(n)?"发送验证码":`${H(n)}秒后重新发送`),1)])),_:1},8,["disabled"])])),_:1}),Y(t,{class:"lastline"},{default:W((()=>[H(u).accountLogin?(q(),$("div",qe,[Q("div",$e,[Y(d,{type:"primary",text:!0,class:"code-login",onClick:a[8]||(a[8]=e=>D("accout"))},{default:W((()=>[pe("账号登录 ")])),_:1})])])):ae("",!0)])),_:1}),Y(t,null,{default:W((()=>[Y(d,{type:"primary",loading:H(p),class:"loginBtn",onClick:E},{default:W((()=>[pe("登录")])),_:1},8,["loading"])])),_:1})])),_:1},8,["model","rules"])):ae("",!0)])}}}),[["__scopeId","data-v-5bbe69d9"]]),ze=e=>(me("data-v-643aa0fe"),e=e(),ge(),e),We={class:"scanCode"},Ge={class:"title"},Je=ze((()=>Q("div",{class:"big"},"APP扫码快捷登录",-1))),Xe={class:"subtitle"},Ye={class:"img"},Ze=ze((()=>Q("img",{src:"/fitsadmin/assets/democode-833c45d8.png",alt:""},null,-1))),ea={class:"mark","element-loading-text":"正在加载中...","element-loading-background":"rgba(0, 0, 0, 0.6)"},aa=m(O({__name:"ScanCode",setup(e){const{project:{title:a}}=C,t=B(!1);return j((()=>{setTimeout((()=>{t.value=!0}),3e3)})),(e,l)=>{const o=T;return q(),$("div",We,[Q("div",Ge,[Je,Q("div",Xe,"使用"+ne(H(a))+"APP扫描二维码安全登陆",1)]),Q("div",Ye,[Ze,G(Q("div",ea,null,512),[[o,t.value]])])])}}}),[["__scopeId","data-v-643aa0fe"]]),ta=e=>(me("data-v-89eb4cb6"),e=e(),ge(),e),la={class:"login-form"},oa={class:"rightLogo"},sa={key:1,class:"scancodelogin rightLogo"},na={key:2,class:"mainLogin"},ia={class:"title-box"},ra={class:"title"},ua={class:"subtitle"},ca={key:0,class:"app-download"},da=ta((()=>Q("div",{class:"appimg"},[Q("img",{src:"/fitsadmin/assets/IOSCode-7f0f5047.png",alt:""}),Q("span",{class:"text"},"扫描下载iOS客户端")],-1))),pa=ta((()=>Q("span",{class:"hr"},null,-1))),va=ta((()=>Q("div",{class:"appimg"},[Q("img",{src:"/fitsadmin/assets/AndroidCode-013fb7a6.png",alt:""}),Q("span",{class:"text"},"扫描下载Android客户端")],-1))),ma=m(O({__name:"LoginWindow",setup(e){const{project:{title:a,subTitle:t},login:l}=C,o=re({redirect:"",curentLoginText:l.accountLogin?"账号登录":"验证码登录",isScanCodeLogin:!0,isCoutDown:!1,otherQuery:{}}),{curentLoginText:s,isScanCodeLogin:n}=ce(o);function i(){o.isScanCodeLogin=!o.isScanCodeLogin}return(e,o)=>{const r=M,u=V,c=R;return q(),$("div",la,[!H(n)&&H(l).appScanCode?(q(),z(r,{key:0,class:"box-item",effect:"accout-login",visible:!0,content:H(s),placement:"left"},{default:W((()=>[Q("div",oa,[Y(H(_),{"icon-class":"accoutlogo",onClick:o[0]||(o[0]=e=>i())})])])),_:1},8,["content"])):ae("",!0),H(n)&&H(l).appScanCode?(q(),$("div",sa,[Y(H(_),{"icon-class":"ewnlogin",onClick:o[1]||(o[1]=e=>i())})])):ae("",!0),H(n)?(q(),$("div",na,[Q("div",ia,[Q("div",ra,ne(H(a)),1),Q("div",ua,ne(H(t)),1)]),Y(Qe,{style:{"-webkit-app-region":"no-drag"}}),H(l).appDownload?(q(),$("div",ca,[Y(c,{placement:"top","hide-after":0,"popper-class":"loginAppdownload",width:180,trigger:"click"},{reference:W((()=>[Y(u,{class:"btn",text:"",bg:""},{default:W((()=>[Y(H(_),{"icon-class":"ios"}),pe("iPhone ")])),_:1})])),default:W((()=>[da])),_:1}),pa,Y(c,{placement:"top","hide-after":0,"popper-class":"loginAppdownload",width:180,trigger:"click"},{reference:W((()=>[Y(u,{class:"btn",text:"",bg:""},{default:W((()=>[Y(H(_),{"icon-class":"android"}),pe("Android ")])),_:1})])),default:W((()=>[va])),_:1})])):ae("",!0)])):(q(),z(aa,{key:3}))])}}}),[["__scopeId","data-v-89eb4cb6"]]),ga=e=>(me("data-v-a3874567"),e=e(),ge(),e),fa={key:0,class:"login-container"},ha=ga((()=>Q("img",{src:"/fitsadmin/assets/fitslogo-b4df1271.png",alt:"",class:"fitslogo"},null,-1))),ya={class:"right-pannel"},ba=ga((()=>Q("div",{class:"login-tips"},"最佳浏览环境：Chrome64及以上，1920*1080显示分辨率",-1))),wa=m(O({__name:"index",setup(e){const a=x("electron");return(e,t)=>H(a)?(q(),z(ma,{key:1,style:{"box-shadow":"none",border:"none","-webkit-app-region":"drag"}})):(q(),$("div",fa,[ha,Y(Pe),Q("div",ya,[Y(ma),ba])]))}}),[["__scopeId","data-v-a3874567"]]);export{wa as default};