(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{120:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return l}));var n=r(3),o=r(7),a=(r(0),r(173)),i={id:"databricks_troubleshooting",title:"Troubleshooting Databricks Delta Lake",sidebar_label:"Databricks Delta Lake"},c={unversionedId:"quickstarts/troubleshooting/databricks_troubleshooting",id:"quickstarts/troubleshooting/databricks_troubleshooting",isDocsHomePage:!1,title:"Troubleshooting Databricks Delta Lake",description:"See the Useful information section for additional commands and help.",source:"@site/docs/quickstarts/troubleshooting/databricks_troubleshooting.md",slug:"/quickstarts/troubleshooting/databricks_troubleshooting",permalink:"/wandisco-documentation/docs/quickstarts/troubleshooting/databricks_troubleshooting",version:"current",sidebar_label:"Databricks Delta Lake",sidebar:"quickstarts",previous:{title:"Troubleshooting ADLS Gen2",permalink:"/wandisco-documentation/docs/quickstarts/troubleshooting/adlsg2_troubleshooting"},next:{title:"Logs",permalink:"/wandisco-documentation/docs/quickstarts/troubleshooting/logs"}},s=[{value:"Rebuild",id:"rebuild",children:[]}],u={toc:s};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"See the ",Object(a.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/troubleshooting/useful_info"},"Useful information")," section for additional commands and help."),Object(a.b)("h2",{id:"rebuild"},"Rebuild"),Object(a.b)("p",null,"If you are using Databricks, delete any related databases from your Databricks cluster using your ",Object(a.b)("a",{parentName:"p",href:"https://docs.databricks.com/notebooks/notebooks-use.html#run-notebooks"},"notebook"),"."),Object(a.b)("p",null,"For example, if your use case is ",Object(a.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/installation/hdp_sandbox_lhv_client-adlsg2_lan"},"HDP Sandbox to Azure Databricks with LiveAnalytics"),", delete the ",Object(a.b)("inlineCode",{parentName:"p"},"databricks_demo")," database from your Databricks cluster:"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"DROP DATABASE databricks_demo CASCADE;")))}l.isMDXComponent=!0},173:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),l=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},b=function(e){var t=l(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),b=l(r),p=n,f=b["".concat(i,".").concat(p)]||b[p]||d[p]||a;return r?o.a.createElement(f,c(c({ref:t},u),{},{components:r})):o.a.createElement(f,c({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"}}]);