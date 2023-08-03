import{H as e,G as l,j as a,T as d}from"./index-422f924c.js";import{E as t,J as i,l as n,S as s,u as o,a as r,m as c,p as b,O as u,P as p,aC as h,aD as m,V as A,as as f,R as _,_ as v,a7 as y,L as x,a0 as g,W as T}from"./vxetable-9ecf1980.js";import{F as w}from"./FitsCard-b825facd.js";import"./echarts-1215139a.js";const C=t({__name:"TreeSelectBasicUse",setup(a){const d=i(new e({select:{clearable:!0},tree:{nodeKey:"id",data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),k=t({__name:"TreeSelectAnyLevel",setup(a){const d=i(new e({select:{clearable:!0},tree:{nodeKey:"id",data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}],checkStrictly:!0}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),S=t({__name:"TreeSelectDisabledSelect",setup(a){const d=i(new e({select:{disabled:!0},tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),B=t({__name:"TreeSelectDisabledOption",setup(a){const d=i(new e({tree:{nodeKey:"id",defaultExpandAll:!1,showCheckbox:!0,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部",disabled:!0}]}]},{id:"21",label:"研发部",disabled:!0,children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),K=t({__name:"TreeSelectFilter",setup(a){const d=i(new e({tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),E=t({__name:"TreeSelectCustomFilter",setup(a){const d=i(new e({tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}],filterNodeMethod:(e,l,a)=>!e||-1===a.label.indexOf(e)}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),I=t({__name:"TreeSelectDefaultValue",setup(a){const d=i(new e({select:{clearable:!0,placeholder:"请选择"},input:{clearable:!0},tree:{nodeKey:"id",defaultExpandAll:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d),modelValue:"9"},null,8,["options"]))}}),N=t({__name:"TreeSelectDraggable",setup(a){const d=i(new e({tree:{nodeKey:"id",defaultExpandAll:!0,draggable:!0,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),V=t({__name:"TreeSelectCustomNode",setup(a){const d=i(new e({tree:{nodeKey:"id",defaultExpandAll:!0,expandOnClickNode:!1,data:[{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}],renderContent:function(e,{node:l,data:a,store:t}){return e("span",{class:"custom-tree-node1"},e("span",null,l.label),e("div",{style:"display: flex"},e("div",{onClick:e=>{e.stopPropagation(),(e=>{let l=1e3;const a={id:l++,label:"testtest",children:[]};e.children||(e.children=[]);e.children.push(a),d.tree.data=[...d.tree.data]})(a)},class:"operation"},"Append "),e("div",{style:"margin-left: 8px",class:"operation",onClick:e=>{e.stopPropagation(),((e,l)=>{const a=e.parent,t=a.data.children||a.data,i=t.findIndex((e=>e.id===l.id));t.splice(i,1),d.tree.data=[...d.tree.data]})(l,a)}},"Delete")))}}}));return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),D=t({__name:"TreeSelectDynamicLoad",setup(a){const d=i(new e({tree:{nodeKey:"id",load:function(e,l){if(0===e.level)return l([{label:"Root1",id:t++},{label:"Root2",id:t++}]);if(e.level>3)return l([]);setTimeout((()=>{let e=[];e=[{id:t,label:"children"+t++},{id:t,label:"children"+t++}],l(e)}),500)},lazy:!0}}));let t=0;return(e,a)=>(n(),s(o(l),{options:o(d)},null,8,["options"]))}}),O=e=>(h("data-v-5665121b"),e=e(),m(),e),j={class:"innerBox"},F=O((()=>b("div",null,[A(" 默认值 "),b("div",{class:"describe"},"通过设置 modelValue 传递一个由节点的key组成的数组，设置多选默认值")],-1))),M={class:"innerBox"},L=O((()=>b("div",null,[A(" 多选项省略，以数字形式展示 "),b("div",{class:"describe"},"通过设置 select.collapseTags = true，折叠多选项内容")],-1))),P={class:"innerBox"},R=O((()=>b("div",null,[A(" 鼠标悬浮文字出现多选项标签 "),b("div",{class:"describe"},"通过设置 select.collapseTags = true 和 select.collapseTagsTooltip = true，鼠标悬浮在数字上时，显示折叠项 ")],-1))),z={class:"innerBox"},G=O((()=>b("div",null,[A(" 点击节点时选中 "),b("div",{class:"describe"},"设置 tree.checkOnClickNode = true ，点击节点时勾选上，默认通过点击复选框才能勾选。")],-1))),H=a(t({__name:"TreeSelectMultiple",setup(a){const d=r(["9","11"]),t=i([{id:"1",label:"总经办",children:[{id:"4",label:"业务部",children:[{id:"9",label:"业务A部"},{id:"11",label:"业务B部"}]}]},{id:"21",label:"研发部",children:[{id:"5",label:"研发1部"},{id:"6",label:"研发2部"}]},{id:"3",label:"财务部",children:[{id:"7",label:"财务1部"},{id:"8",label:"财务2部"}]}]),s=i(new e({select:{multiple:!0},tree:{nodeKey:"id",highlightCurrent:!1,showCheckbox:!0,data:t}})),h=i(new e({select:{multiple:!0,collapseTags:!0},tree:{nodeKey:"id",highlightCurrent:!1,showCheckbox:!0,data:t}})),m=i(new e({select:{multiple:!0,collapseTags:!0,collapseTagsTooltip:!0},tree:{nodeKey:"id",highlightCurrent:!1,showCheckbox:!0,data:t}})),A=i(new e({select:{multiple:!0,collapseTags:!0,collapseTagsTooltip:!0},tree:{nodeKey:"id",showCheckbox:!0,checkOnClickNode:!0,data:t}}));return(e,a)=>(n(),c(p,null,[b("div",j,[F,u(o(l),{options:o(s),modelValue:o(d)},null,8,["options","modelValue"])]),b("div",M,[L,u(o(l),{options:o(h)},null,8,["options"])]),b("div",P,[R,u(o(l),{options:o(m)},null,8,["options"])]),b("div",z,[G,u(o(l),{options:o(A)},null,8,["options"])])],64))}}),[["__scopeId","data-v-5665121b"]]),J={class:"FitsTreeSelectIndex"},U={class:"content"},W={class:"right"},q={class:"menu"},Q=(e=>(h("data-v-9170d67c"),e=e(),m(),e))((()=>b("div",{class:"menu-title"},"此页内容",-1))),X=["id","onClick"],Y=a(t({__name:"index",setup(e){const l=r([]),a=i({num:0});let t=0;const s={callback:function(e){l.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const h=e=>{if(null!==t)m(t);else if(null===t)for(let d=0;d<l.value.length;d++){let t=document.getElementById("menuItem"+d);l.value[d].pos.top<=e.scrollTop+l.value[0].pos.top&&t&&(a.num=d)}},m=e=>{for(let a=0;a<l.value.length;a++){let l=document.getElementById("menuItem"+a);e!==a&&l&&(l.className="defaultStyle")}setTimeout((()=>{t=null}),100)};return(e,i)=>{const r=d,A=f("outline");return n(),c("div",J,[u(r,{class:"left",onScroll:h,always:""},{default:_((()=>[v((n(),c("div",U,[u(w,{title:"基础用法",desc:"基础的树形筛选组件展示。当节点数据超过下拉框的长度时，会通过滚动条的形式进行展示。默认点击叶子节点时，节点会被选中，并且下拉框会收起。"},{default:_((()=>[u(C)])),_:1}),u(w,{title:"选择任意级别",desc:"通过设置 tree.checkStrictly=true ，任何节点都可以被选择，否则只有子节点可被选择。开启后通过点击箭头图标进行展开/收缩。"},{default:_((()=>[u(k)])),_:1}),u(w,{title:"禁用状态",desc:"禁用整个树形筛选组件。设置 select.disabled = true，则整个树形筛选组件不可用。"},{default:_((()=>[u(S)])),_:1}),u(w,{title:"有禁用选项",desc:"设置 tree.showCheckbox 启用节点选择框，并为 tree.data 中的选项设置 disabled = true，即可禁用该选项。"},{default:_((()=>[u(B)])),_:1}),u(w,{title:"过滤节点",desc:"设置 input.show = true 开启内部过滤输入框。 默认情况下，TreeSelect 会找出所有 label 属性包含输入值的选项。"},{default:_((()=>[u(K)])),_:1}),u(w,{title:"自定义过滤方法",desc:"如果希望使用其他的搜索逻辑，可以通过设置 `tree.filterNodeMethod` 来实现。 `filterNodeMethod` 为一个函数，它会在输入值发生变化时调用，参数为当前输入值。此范例演示了 '输入什么就不返回什么' 的功能。"},{default:_((()=>[u(E)])),_:1}),u(w,{title:"默认选中",desc:"通过传递 modelValue 属性可以给下拉树筛选组件传递默认值，该值必须跟 tree.nodeKey 指定的属性值对应。"},{default:_((()=>[u(I)])),_:1}),u(w,{title:"展开所有节点、可拖拽",desc:"通过设置 tree.defaultExpandAll=true 可以默认展开所有节点。通过设置 tree.draggable=true 可以开启树节点拖拽。"},{default:_((()=>[u(N)])),_:1}),u(w,{title:"自定义节点内容",desc:"通过设置 tree.renderContent 渲染函数，该函数返回需要的节点区内容即可。"},{default:_((()=>[u(V)])),_:1}),u(w,{title:"动态加载节点数据",desc:"动态加载数据仅当 tree.lazy=true 时有效。并通过 tree.load 传递一个函数，参数为 node 和 resolve ， node为当前点击的节点，\n                    resolve为数据加载完成的回调。"},{default:_((()=>[u(D)])),_:1}),u(w,{title:"多选节点",desc:"通过配置 tree.showCheckbox=true 和 select.multiple=true 开启树节点的复选框按钮。"},{default:_((()=>[u(H)])),_:1})])),[[A,s]])])),_:1}),b("div",W,[b("div",q,[Q,(n(!0),c(p,null,y(o(l),((e,l)=>(n(),c("div",{class:x([{active:o(a).num===l},"defaultStyle"]),key:l,id:"menuItem"+l,onClick:g((d=>function(e,l){t=l,a.num=l,e.scrollIntoView({block:"start",inline:"nearest"}),m(t)}(e.el,l)),["stop"])},T(e.title),11,X)))),128))])])])}}}),[["__scopeId","data-v-9170d67c"]]);export{Y as default};
