var e=Object.defineProperty,a=(a,t,o)=>(((a,t,o)=>{t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o})(a,"symbol"!=typeof t?t+"":t,o),o);import{ay as t,j as o,Q as s}from"./index-8d49cad8.js";import{E as n,J as u,K as r,a as i,l,m,O as c,u as p,R as d,p as g,W as f,am as x,_ as I,P as C,aj as G,L as D,a0 as N,az as h,aA as L}from"./vxetable-1fe7c1fd.js";import{F as b}from"./FitsCard-c67d2c2a.js";import"./echarts-1215139a.js";class v{constructor({headers:e,ajax:t,groupConditions:o,expandGroupsNum:s,requestGroupNums:n}){a(this,"headers"),a(this,"ajax"),a(this,"groupConditions"),a(this,"expandGroupsNum"),a(this,"requestGroupNums"),this.headers=e??[],this.ajax=t,this.groupConditions=o??{conditions:[]},this.expandGroupsNum=s??3,this.requestGroupNums=n??4}}const A={class:"base-group-table"},E=n({name:"QualityControl"}),S=o(n({...E,setup(e){const a=u({config:new v({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{"All"===s&&(""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"20",DataSource:{ItemCount:1,GroupList:[{age:"20",sex:"女",name:"李四"}]}},{ID:"3",NAME:"60",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四22"}]}}],r=3),a({result:{GroupTable:n,ItemCount:r,TableList:u}}))}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]}})}),{config:o}=r(a),s=i();return(e,a)=>(l(),m("div",A,[c(p(t),{ref_key:"table",ref:s,config:p(o)},null,8,["config"])]))}}),[["__scopeId","data-v-d82ff865"]]),y={class:"base-group-table"},M=n({name:"QualityControl"}),T=o(n({...M,setup(e){const a=u({config:new v({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{if("All"===s)""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"10",DataSource:{ItemCount:1,GroupList:[]}},{ID:"3",NAME:"20",DataSource:{ItemCount:1,GroupList:[]}},{ID:"4",NAME:"30",DataSource:{ItemCount:1,GroupList:[]}},{ID:"5",NAME:"40",DataSource:{ItemCount:1,GroupList:[]}}],r=5),a({result:{GroupTable:n,ItemCount:r,TableList:u}});else if("Fragment"===s){(e.GroupValue.split(",")||[]).forEach(((e,a)=>{n.push({ID:e,NAME:"",DataSource:{ItemCount:0,GroupList:[{age:a+1+"0",sex:"男",name:"张三12"+a}]}})})),setTimeout((()=>{a({result:{GroupTable:n,ItemCount:r,TableList:u}})}),3e3)}}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]},expandGroupsNum:1})}),{config:o}=r(a),s=i();return(e,a)=>(l(),m("div",y,[c(p(t),{ref_key:"table",ref:s,config:p(o)},null,8,["config"])]))}}),[["__scopeId","data-v-9ccf3a9e"]]),_={class:"base-group-table"},k=n({name:"QualityControl"}),j=o(n({...k,setup(e){const a=u({config:new v({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{if("All"===s)""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"10",DataSource:{ItemCount:1,GroupList:[]}},{ID:"3",NAME:"20",DataSource:{ItemCount:1,GroupList:[]}},{ID:"4",NAME:"30",DataSource:{ItemCount:1,GroupList:[]}},{ID:"5",NAME:"40",DataSource:{ItemCount:1,GroupList:[]}}],r=5),a({result:{GroupTable:n,ItemCount:r,TableList:u}});else if("Fragment"===s){(e.GroupValue.split(",")||[]).forEach(((e,a)=>{n.push({ID:e,NAME:"",DataSource:{ItemCount:0,GroupList:[{age:a+1+"0",sex:"男",name:"张三12"+a}]}})})),setTimeout((()=>{a({result:{GroupTable:n,ItemCount:r,TableList:u}})}),3e3)}}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]},expandGroupsNum:1,requestGroupNums:2})}),{config:o}=r(a),s=i();return(e,a)=>(l(),m("div",_,[c(p(t),{ref_key:"table",ref:s,config:p(o)},null,8,["config"])]))}}),[["__scopeId","data-v-17b76a45"]]),w={class:"base-group-table"},q=n({name:"QualityControl"}),P=o(n({...q,setup(e){const a=u({config:new v({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{"All"===s&&(""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"20",DataSource:{ItemCount:1,GroupList:[{age:"20",sex:"女",name:"李四"}]}},{ID:"3",NAME:"60",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四22"}]}}],r=3),a({result:{GroupTable:n,ItemCount:r,TableList:u}}))}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]}})}),{config:o}=r(a),s=i();return(e,a)=>(l(),m("div",w,[c(p(t),{ref_key:"table",ref:s,config:p(o)},{age:d((e=>[g("div",null,f(e.row.age)+"岁",1)])),_:1},8,["config"])]))}}),[["__scopeId","data-v-863668fd"]]),Q={class:"group-table-example"},F={class:"content"},V={class:"right"},B={class:"menu"},O=(e=>(h("data-v-7ea857c4"),e=e(),L(),e))((()=>g("div",{class:"menu-title"},"此页内容",-1))),z=["id","onClick"],J=n({name:"GroupTable"}),K=o(n({...J,setup(e){const a=i([]),t=u({num:0});let o=0;const n={callback:function(e){a.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const r=e=>{if(null!==o)h(o);else if(null===o)for(let o=0;o<a.value.length;o++){let s=document.getElementById("menuItem"+o);a.value[o].pos.top<=e.scrollTop+a.value[0].pos.top&&s&&(t.num=o)}},h=e=>{for(let t=0;t<a.value.length;t++){let a=document.getElementById("menuItem"+t);e!==t&&a&&(a.className="defaultStyle")}setTimeout((()=>{o=null}),100)};return(e,u)=>{const i=s,L=x("outline");return l(),m("div",Q,[c(i,{class:"left",onScroll:r,always:""},{default:d((()=>[I((l(),m("div",F,[c(b,{title:"基础分组表格",desc:"传入headers属性声明列配置。然后传入ajax.query属性，通过promise的形式返回组件表格的数据，传入result属性中即可。groupConditions属性（分组条件）可传可不传，defaultChecked属性表示默认选中哪个分组。"},{default:d((()=>[c(S)])),_:1}),c(b,{title:"插槽分组表格",desc:"可通过插槽去重写表格单元格的内容（插槽名是字段名），另外还提供了额外的插槽：query表格查询条件插槽、noData暂无数据插槽、right组头右侧插槽、groupName组名插槽、expand展开行插槽。"},{default:d((()=>[c(P)])),_:1}),c(b,{title:"默认展开分组表格",desc:"通过设置expandGroupsNum属性表示默认展开多少个分组，默认展开的分组第一次请求时会返回表格数据，其余分组表格的数据通过分段请求返回（会在组头开启loading图标）。但expandGroupsNum属性的值必须大于1（后端规定的）。"},{default:d((()=>[c(T)])),_:1}),c(b,{title:"分段请求分组表格",desc:"如果当前页的分组表格个数大于默认展开分组表格的个数，剩余的分组表格会开启分段请求（会在组头开启loading图标）。可以通过requestGroupNums属性设置多少个表格为一组去分段请求。"},{default:d((()=>[c(j)])),_:1})])),[[L,n]])])),_:1}),g("div",V,[g("div",B,[O,(l(!0),m(C,null,G(p(a),((e,a)=>(l(),m("div",{class:D([{active:p(t).num===a},"defaultStyle"]),key:a,id:"menuItem"+a,onClick:N((s=>function(e,a){o=a,t.num=a,e.scrollIntoView({block:"start",inline:"nearest"}),h(o)}(e.el,a)),["stop"])},f(e.title),11,z)))),128))])])])}}}),[["__scopeId","data-v-7ea857c4"]]);export{K as default};