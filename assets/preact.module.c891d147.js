var e,n,t,_,l,o,r={},i=[],u=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,n){for(var t in n)e[t]=n[t];return e}function c(e){var n=e.parentNode;n&&n.removeChild(e)}function f(n,t,_){var l,o,r,i={};for(r in t)"key"==r?l=t[r]:"ref"==r?o=t[r]:i[r]=t[r];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):_),"function"==typeof n&&null!=n.defaultProps)for(r in n.defaultProps)void 0===i[r]&&(i[r]=n.defaultProps[r]);return p(n,i,l,o,null)}function p(e,_,l,o,r){var i={type:e,props:_,key:l,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++t:r};return null==r&&null!=n.vnode&&n.vnode(i),i}function a(){return{current:null}}function d(e){return e.children}function h(e,n){this.props=e,this.context=n}function v(e,n){if(null==n)return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?v(e):null}function y(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return y(e)}}function m(e){(!e.__d&&(e.__d=!0)&&_.push(e)&&!g.__r++||l!==n.debounceRendering)&&((l=n.debounceRendering)||setTimeout)(g)}function g(){for(var e;g.__r=_.length;)e=_.sort((function(e,n){return e.__v.__b-n.__v.__b})),_=[],e.some((function(e){var n,t,_,l,o,r;e.__d&&(o=(l=(n=e).__v).__e,(r=n.__P)&&(t=[],(_=s({},l)).__v=l.__v+1,D(r,l,_,n.__n,void 0!==r.ownerSVGElement,null!=l.__h?[o]:null,t,null==o?v(l):o,l.__h),E(t,l),l.__e!=o&&y(l)))}))}function k(e,n,t,_,l,o,u,s,c,f){var a,h,y,m,g,k,x,S=_&&_.__k||i,w=S.length;for(t.__k=[],a=0;a<n.length;a++)if(null!=(m=t.__k[a]=null==(m=n[a])||"boolean"==typeof m?null:"string"==typeof m||"number"==typeof m||"bigint"==typeof m?p(null,m,null,null,m):Array.isArray(m)?p(d,{children:m},null,null,null):m.__b>0?p(m.type,m.props,m.key,m.ref?m.ref:null,m.__v):m)){if(m.__=t,m.__b=t.__b+1,null===(y=S[a])||y&&m.key==y.key&&m.type===y.type)S[a]=void 0;else for(h=0;h<w;h++){if((y=S[h])&&m.key==y.key&&m.type===y.type){S[h]=void 0;break}y=null}D(e,m,y=y||r,l,o,u,s,c,f),g=m.__e,(h=m.ref)&&y.ref!=h&&(x||(x=[]),y.ref&&x.push(y.ref,null,m),x.push(h,m.__c||g,m)),null!=g?(null==k&&(k=g),"function"==typeof m.type&&m.__k===y.__k?m.__d=c=b(m,c,e):c=C(e,m,y,S,g,c),"function"==typeof t.type&&(t.__d=c)):c&&y.__e==c&&c.parentNode!=e&&(c=v(y))}for(t.__e=k,a=w;a--;)null!=S[a]&&A(S[a],S[a]);if(x)for(a=0;a<x.length;a++)T(x[a],x[++a],x[++a])}function b(e,n,t){for(var _,l=e.__k,o=0;l&&o<l.length;o++)(_=l[o])&&(_.__=e,n="function"==typeof _.type?b(_,n,t):C(t,_,_,l,_.__e,n));return n}function x(e,n){return n=n||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){x(e,n)})):n.push(e)),n}function C(e,n,t,_,l,o){var r,i,u;if(void 0!==n.__d)r=n.__d,n.__d=void 0;else if(null==t||l!=o||null==l.parentNode)e:if(null==o||o.parentNode!==e)e.appendChild(l),r=null;else{for(i=o,u=0;(i=i.nextSibling)&&u<_.length;u+=2)if(i==l)break e;e.insertBefore(l,o),r=o}return void 0!==r?r:l.nextSibling}function S(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||u.test(n)?t:t+"px"}function w(e,n,t,_,l){var o;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof _&&(e.style.cssText=_=""),_)for(n in _)t&&n in t||S(e.style,n,"");if(t)for(n in t)_&&t[n]===_[n]||S(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])o=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+o]=t,t?_||e.addEventListener(n,o?U:P,o):e.removeEventListener(n,o?U:P,o);else if("dangerouslySetInnerHTML"!==n){if(l)n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(r){}"function"==typeof t||(null==t||!1===t&&-1==n.indexOf("-")?e.removeAttribute(n):e.setAttribute(n,t))}}function P(e){this.l[e.type+!1](n.event?n.event(e):e)}function U(e){this.l[e.type+!0](n.event?n.event(e):e)}function D(t,_,l,o,i,u,f,p,a){var y,m,g,b,x,C,S,P,U,D,E,T,A,W,L,M=_.type;if(void 0!==_.constructor)return null;null!=l.__h&&(a=l.__h,p=_.__e=l.__e,_.__h=null,u=[p]),(y=n.__b)&&y(_);try{e:if("function"==typeof M){if(P=_.props,U=(y=M.contextType)&&o[y.__c],D=y?U?U.props.value:y.__:o,l.__c?S=(m=_.__c=l.__c).__=m.__E:("prototype"in M&&M.prototype.render?_.__c=m=new M(P,D):(_.__c=m=new h(P,D),m.constructor=M,m.render=N),U&&U.sub(m),m.props=P,m.state||(m.state={}),m.context=D,m.__n=o,g=m.__d=!0,m.__h=[],m._sb=[]),null==m.__s&&(m.__s=m.state),null!=M.getDerivedStateFromProps&&(m.__s==m.state&&(m.__s=s({},m.__s)),s(m.__s,M.getDerivedStateFromProps(P,m.__s))),b=m.props,x=m.state,g)null==M.getDerivedStateFromProps&&null!=m.componentWillMount&&m.componentWillMount(),null!=m.componentDidMount&&m.__h.push(m.componentDidMount);else{if(null==M.getDerivedStateFromProps&&P!==b&&null!=m.componentWillReceiveProps&&m.componentWillReceiveProps(P,D),!m.__e&&null!=m.shouldComponentUpdate&&!1===m.shouldComponentUpdate(P,m.__s,D)||_.__v===l.__v){for(m.props=P,m.state=m.__s,_.__v!==l.__v&&(m.__d=!1),m.__v=_,_.__e=l.__e,_.__k=l.__k,_.__k.forEach((function(e){e&&(e.__=_)})),E=0;E<m._sb.length;E++)m.__h.push(m._sb[E]);m._sb=[],m.__h.length&&f.push(m);break e}null!=m.componentWillUpdate&&m.componentWillUpdate(P,m.__s,D),null!=m.componentDidUpdate&&m.__h.push((function(){m.componentDidUpdate(b,x,C)}))}if(m.context=D,m.props=P,m.__v=_,m.__P=t,T=n.__r,A=0,"prototype"in M&&M.prototype.render){for(m.state=m.__s,m.__d=!1,T&&T(_),y=m.render(m.props,m.state,m.context),W=0;W<m._sb.length;W++)m.__h.push(m._sb[W]);m._sb=[]}else do{m.__d=!1,T&&T(_),y=m.render(m.props,m.state,m.context),m.state=m.__s}while(m.__d&&++A<25);m.state=m.__s,null!=m.getChildContext&&(o=s(s({},o),m.getChildContext())),g||null==m.getSnapshotBeforeUpdate||(C=m.getSnapshotBeforeUpdate(b,x)),L=null!=y&&y.type===d&&null==y.key?y.props.children:y,k(t,Array.isArray(L)?L:[L],_,l,o,i,u,f,p,a),m.base=_.__e,_.__h=null,m.__h.length&&f.push(m),S&&(m.__E=m.__=null),m.__e=!1}else null==u&&_.__v===l.__v?(_.__k=l.__k,_.__e=l.__e):_.__e=function(n,t,_,l,o,i,u,s){var f,p,a,d=_.props,h=t.props,y=t.type,m=0;if("svg"===y&&(o=!0),null!=i)for(;m<i.length;m++)if((f=i[m])&&"setAttribute"in f==!!y&&(y?f.localName===y:3===f.nodeType)){n=f,i[m]=null;break}if(null==n){if(null===y)return document.createTextNode(h);n=o?document.createElementNS("http://www.w3.org/2000/svg",y):document.createElement(y,h.is&&h),i=null,s=!1}if(null===y)d===h||s&&n.data===h||(n.data=h);else{if(i=i&&e.call(n.childNodes),p=(d=_.props||r).dangerouslySetInnerHTML,a=h.dangerouslySetInnerHTML,!s){if(null!=i)for(d={},m=0;m<n.attributes.length;m++)d[n.attributes[m].name]=n.attributes[m].value;(a||p)&&(a&&(p&&a.__html==p.__html||a.__html===n.innerHTML)||(n.innerHTML=a&&a.__html||""))}if(function(e,n,t,_,l){var o;for(o in t)"children"===o||"key"===o||o in n||w(e,o,null,t[o],_);for(o in n)l&&"function"!=typeof n[o]||"children"===o||"key"===o||"value"===o||"checked"===o||t[o]===n[o]||w(e,o,n[o],t[o],_)}(n,h,d,o,s),a)t.__k=[];else if(m=t.props.children,k(n,Array.isArray(m)?m:[m],t,_,l,o&&"foreignObject"!==y,i,u,i?i[0]:_.__k&&v(_,0),s),null!=i)for(m=i.length;m--;)null!=i[m]&&c(i[m]);s||("value"in h&&void 0!==(m=h.value)&&(m!==n.value||"progress"===y&&!m||"option"===y&&m!==d.value)&&w(n,"value",m,d.value,!1),"checked"in h&&void 0!==(m=h.checked)&&m!==n.checked&&w(n,"checked",m,d.checked,!1))}return n}(l.__e,_,l,o,i,u,f,a);(y=n.diffed)&&y(_)}catch(F){_.__v=null,(a||null!=u)&&(_.__e=p,_.__h=!!a,u[u.indexOf(p)]=null),n.__e(F,_,l)}}function E(e,t){n.__c&&n.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(_){n.__e(_,t.__v)}}))}function T(e,t,_){try{"function"==typeof e?e(t):e.current=t}catch(l){n.__e(l,_)}}function A(e,t,_){var l,o;if(n.unmount&&n.unmount(e),(l=e.ref)&&(l.current&&l.current!==e.__e||T(l,null,t)),null!=(l=e.__c)){if(l.componentWillUnmount)try{l.componentWillUnmount()}catch(r){n.__e(r,t)}l.base=l.__P=null,e.__c=void 0}if(l=e.__k)for(o=0;o<l.length;o++)l[o]&&A(l[o],t,_||"function"!=typeof e.type);_||null==e.__e||c(e.__e),e.__=e.__e=e.__d=void 0}function N(e,n,t){return this.constructor(e,t)}function W(t,_,l){var o,i,u;n.__&&n.__(t,_),i=(o="function"==typeof l)?null:l&&l.__k||_.__k,u=[],D(_,t=(!o&&l||_).__k=f(d,null,[t]),i||r,r,void 0!==_.ownerSVGElement,!o&&l?[l]:i?null:_.firstChild?e.call(_.childNodes):null,u,!o&&l?l:i?i.__e:_.firstChild,o),E(u,t)}function L(e,n){var t={__c:n="__cC"+o++,__:e,Consumer:function(e,n){return e.children(n)},Provider:function(e){var t,_;return this.getChildContext||(t=[],(_={})[n]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&t.some(m)},this.sub=function(e){t.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){t.splice(t.indexOf(e),1),n&&n.call(e)}}),e.children}};return t.Provider.__=t.Consumer.contextType=t}e=i.slice,n={__e:function(e,n,t,_){for(var l,o,r;n=n.__;)if((l=n.__c)&&!l.__)try{if((o=l.constructor)&&null!=o.getDerivedStateFromError&&(l.setState(o.getDerivedStateFromError(e)),r=l.__d),null!=l.componentDidCatch&&(l.componentDidCatch(e,_||{}),r=l.__d),r)return l.__E=l}catch(i){e=i}throw e}},t=0,h.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},t),this.props)),e&&s(t,e),null!=e&&this.__v&&(n&&this._sb.push(n),m(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},h.prototype.render=d,_=[],g.__r=0,o=0;export{L as B,W as P,h as d,f as h,n as l,d as p,x,a as y};
