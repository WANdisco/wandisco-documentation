(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{173:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return d}));var r=n(0),c=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var p=c.a.createContext({}),u=function(e){var t=c.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return c.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},m=c.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=u(n),m=r,d=l["".concat(a,".").concat(m)]||l[m]||b[m]||o;return n?c.a.createElement(d,i(i({ref:t},p),{},{components:n})):c.a.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var p=2;p<o;p++)a[p]=n[p];return c.a.createElement.apply(null,a)}return c.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(3),c=n(7),o=(n(0),n(173)),a={id:"consistency-check",title:"Run a Consistency Check",sidebar_label:"Consistency Check"},i={unversionedId:"quickstarts/operation/consistency-check",id:"quickstarts/operation/consistency-check",isDocsHomePage:!1,title:"Run a Consistency Check",description:"Once you have created a replication rule, run a consistency check to compare the contents between all zones.",source:"@site/docs/quickstarts/operation/consistency-check.md",slug:"/quickstarts/operation/consistency-check",permalink:"/wandisco-documentation/docs/quickstarts/operation/consistency-check",version:"current",sidebar_label:"Consistency Check",sidebar:"quickstarts",previous:{title:"How to Create a Rule",permalink:"/wandisco-documentation/docs/quickstarts/operation/create-rule"},next:{title:"Start a Migration",permalink:"/wandisco-documentation/docs/quickstarts/operation/migration"}},s=[],p={toc:s};function u(e){var t=e.components,n=Object(c.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Once you have ",Object(o.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/operation/create-rule"},"created a replication rule"),", run a consistency check to compare the contents between all zones."),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"On the ",Object(o.b)("strong",{parentName:"p"},"Rules")," table, click to ",Object(o.b)("strong",{parentName:"p"},"View rule"),".")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"On the rule page, ",Object(o.b)("strong",{parentName:"p"},"start consistency check")," and wait for the ",Object(o.b)("strong",{parentName:"p"},"Consistency status")," to update. The more objects contained within the path, the longer it will take to complete the check."),Object(o.b)("p",{parentName:"li"},"The ",Object(o.b)("strong",{parentName:"p"},"Consistency Status")," will determine the next steps:"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Consistent")," - no further action is required."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Inconsistent")," - consider ",Object(o.b)("a",{parentName:"li",href:"/wandisco-documentation/docs/quickstarts/operation/migration"},"starting a migration"),".")))))}u.isMDXComponent=!0}}]);