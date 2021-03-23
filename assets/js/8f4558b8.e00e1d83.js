(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{127:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return b}));var a=r(3),n=r(7),i=(r(0),r(173)),o={id:"test-hdp-sandbox-livemigrator",title:"Test HDP Sandbox with LiveMigrator",sidebar_label:"LiveMigrator"},l={unversionedId:"quickstarts/testing/test-hdp-sandbox-livemigrator",id:"quickstarts/testing/test-hdp-sandbox-livemigrator",isDocsHomePage:!1,title:"Test HDP Sandbox with LiveMigrator",description:"Follow the steps below to demonstrate the migration of HCFS data from your HDP Sandbox to a target storage.",source:"@site/docs/quickstarts/testing/test-hdp-sandbox-livemigrator.md",slug:"/quickstarts/testing/test-hdp-sandbox-livemigrator",permalink:"/wandisco-documentation/docs/quickstarts/testing/test-hdp-sandbox-livemigrator",version:"current",sidebar_label:"LiveMigrator",sidebar:"quickstarts",previous:{title:"Test CDH Sandbox with LiveAnalytics",permalink:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-liveanalytics"},next:{title:"Test HDP Sandbox with LiveData",permalink:"/wandisco-documentation/docs/quickstarts/testing/test-hdp-sandbox-livedata"}},c=[{value:"Create replication rule",id:"create-replication-rule",children:[]},{value:"Migrate your data",id:"migrate-your-data",children:[]},{value:"Next steps",id:"next-steps",children:[]}],s={toc:c};function b(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Follow the steps below to demonstrate the migration of HCFS data from your HDP Sandbox to a target storage."),Object(i.b)("p",null,"The HDP Sandbox will be the ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/glossary/s#source"},"source")," storage in all instances."),Object(i.b)("h3",{id:"create-replication-rule"},"Create replication rule"),Object(i.b)("p",null,"On the dashboard, create a ",Object(i.b)("strong",{parentName:"p"},"HCFS")," rule with the following parameters:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Rule Name = ",Object(i.b)("inlineCode",{parentName:"li"},"migration")),Object(i.b)("li",{parentName:"ul"},"Path for all storages = ",Object(i.b)("inlineCode",{parentName:"li"},"/retail_demo"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"The ",Object(i.b)("inlineCode",{parentName:"li"},"/retail_demo")," directory on the HDP Sandbox contains sample data."))),Object(i.b)("li",{parentName:"ul"},"Default exclusions"),Object(i.b)("li",{parentName:"ul"},"Preserve HCFS Block Size = ",Object(i.b)("em",{parentName:"li"},"false"))),Object(i.b)("h3",{id:"migrate-your-data"},"Migrate your data"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"On the dashboard, view the ",Object(i.b)("inlineCode",{parentName:"p"},"migration")," rule.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Start your migration with the following overwrite settings:"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Source Zone = ",Object(i.b)("strong",{parentName:"li"},"sandbox-hdp")),Object(i.b)("li",{parentName:"ul"},"Target Zone = ",Object(i.b)("em",{parentName:"li"},"Choose your target storage")),Object(i.b)("li",{parentName:"ul"},"Overwrite Settings = ",Object(i.b)("strong",{parentName:"li"},"Skip")))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Wait until the migration is complete, and check the contents of your ",Object(i.b)("inlineCode",{parentName:"p"},"/retail_demo")," directory in your target storage."),Object(i.b)("p",{parentName:"li"},"A new directory should exist (",Object(i.b)("inlineCode",{parentName:"p"},"customer_addresses_dim_hive"),") with a ~50MB file inside (",Object(i.b)("inlineCode",{parentName:"p"},"customer_addresses_dim.tsv.gz"),")."))),Object(i.b)("h2",{id:"next-steps"},"Next steps"),Object(i.b)("p",null,"You have now successfully migrated data from your HDP Sandbox to your target storage using LiveMigrator. You can now try live replication by following our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/testing/test-hdp-sandbox-livedata"},"LiveData tutorial"),"."))}b.isMDXComponent=!0},173:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=n.a.createContext({}),b=function(e){var t=n.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=b(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=b(r),d=a,m=u["".concat(o,".").concat(d)]||u[d]||p[d]||i;return r?n.a.createElement(m,l(l({ref:t},s),{},{components:r})):n.a.createElement(m,l({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);