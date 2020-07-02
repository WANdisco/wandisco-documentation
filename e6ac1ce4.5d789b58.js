(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{236:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(2),i=n(9),o=(n(0),n(251)),a={id:"d",title:"D",sidebar_label:"D"},c={id:"glossary/d",isDocsHomePage:!1,title:"D",description:"Data Transfer Object (DTO)",source:"@site/../docs/glossary/d.md",permalink:"/wandisco-documentation/docs/glossary/d",sidebar_label:"D",sidebar:"Glossary",previous:{title:"C",permalink:"/wandisco-documentation/docs/glossary/c"},next:{title:"E",permalink:"/wandisco-documentation/docs/glossary/e"}},s=[{value:"Data Transfer Object (DTO)",id:"data-transfer-object-dto",children:[]},{value:"DConE",id:"dcone",children:[]},{value:"Deterministic State Machine (DSM)",id:"deterministic-state-machine-dsm",children:[]},{value:"Distinguished Name (DN)",id:"distinguished-name-dn",children:[]},{value:"Distinguished Node",id:"distinguished-node",children:[]}],d={rightToc:s};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"data-transfer-object-dto"},"Data Transfer Object (DTO)"),Object(o.b)("p",null,"An object which transfers data between software application subsystems."),Object(o.b)("h2",{id:"dcone"},"DConE"),Object(o.b)("p",null,"WANdisco\u2019s Distributed Coordinated Engine, the software engine underlying replication.\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.wandisco.com/resource-library/white-papers/scm/the-distribution-coordination"}),"Read the Whitepaper on our DConE technology"),"."),Object(o.b)("h2",{id:"deterministic-state-machine-dsm"},"Deterministic State Machine (DSM)"),Object(o.b)("p",null,"An object whose principle job is obtaining agreements on the ordering of proposals as part of the DConE engine. Each DSM will have a group of nodes assigned to it, compromising of at least two Zones. Each node can have one or more of the Paxos roles (Proposer, Acceptor, Learner)."),Object(o.b)("h2",{id:"distinguished-name-dn"},"Distinguished Name (DN)"),Object(o.b)("p",null,"Used for unique identification in LDAP."),Object(o.b)("h2",{id:"distinguished-node"},"Distinguished Node"),Object(o.b)("p",null,"The distinguished node is used in situations where there is an even number of nodes, a configuration that introduces the risk of a tied vote. The Distinguished Node\u2019s bigger vote ensures that it is not possible for a vote to become tied (also known as a Tiebreaker)."))}u.isMDXComponent=!0},251:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=i.a.createContext({}),u=function(e){var t=i.a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=u(e.components);return i.a.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),l=u(n),b=r,f=l["".concat(a,".").concat(b)]||l[b]||p[b]||o;return n?i.a.createElement(f,c(c({ref:t},d),{},{components:n})):i.a.createElement(f,c({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var d=2;d<o;d++)a[d]=n[d];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);