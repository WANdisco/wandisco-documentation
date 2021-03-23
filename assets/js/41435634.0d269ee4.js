(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{173:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=n.a.createContext({}),b=function(e){var t=n.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=b(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},p=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=b(r),p=a,m=u["".concat(i,".").concat(p)]||u[p]||d[p]||o;return r?n.a.createElement(m,c(c({ref:t},s),{},{components:r})):n.a.createElement(m,c({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},98:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return b}));var a=r(3),n=r(7),o=(r(0),r(173)),i={id:"test-cdh-sandbox-livemigrator",title:"Test CDH Sandbox with LiveMigrator",sidebar_label:"LiveMigrator"},c={unversionedId:"quickstarts/testing/test-cdh-sandbox-livemigrator",id:"quickstarts/testing/test-cdh-sandbox-livemigrator",isDocsHomePage:!1,title:"Test CDH Sandbox with LiveMigrator",description:"Follow the steps below to demonstrate the migration of HCFS data from your CDH Sandbox to a target storage.",source:"@site/docs/quickstarts/testing/test-cdh-sandbox-livemigrator.md",slug:"/quickstarts/testing/test-cdh-sandbox-livemigrator",permalink:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-livemigrator",version:"current",sidebar_label:"LiveMigrator",sidebar:"quickstarts",previous:{title:"Test AWS S3",permalink:"/wandisco-documentation/docs/quickstarts/testing/test_s3"},next:{title:"Test CDH Sandbox with LiveData",permalink:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-livedata"}},l=[{value:"Create replication rule",id:"create-replication-rule",children:[]},{value:"Migrate your data",id:"migrate-your-data",children:[]},{value:"Next steps",id:"next-steps",children:[]}],s={toc:l};function b(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Follow the steps below to demonstrate the migration of HCFS data from your CDH Sandbox to a target storage."),Object(o.b)("p",null,"The CDH Sandbox will be the ",Object(o.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/glossary/s#source"},"source")," storage in all instances."),Object(o.b)("h3",{id:"create-replication-rule"},"Create replication rule"),Object(o.b)("p",null,"On the dashboard, create a ",Object(o.b)("strong",{parentName:"p"},"HCFS")," rule with the following parameters:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Rule Name = ",Object(o.b)("inlineCode",{parentName:"li"},"migration")),Object(o.b)("li",{parentName:"ul"},"Path for all storages = ",Object(o.b)("inlineCode",{parentName:"li"},"/retail_demo"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"/retail_demo")," directory on the CDH Sandbox contains sample data."))),Object(o.b)("li",{parentName:"ul"},"Default exclusions"),Object(o.b)("li",{parentName:"ul"},"Preserve HCFS Block Size = ",Object(o.b)("em",{parentName:"li"},"false"))),Object(o.b)("h3",{id:"migrate-your-data"},"Migrate your data"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"On the dashboard, view the ",Object(o.b)("inlineCode",{parentName:"p"},"migration")," rule.")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Start your migration with the following overwrite settings:"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Source Zone = ",Object(o.b)("strong",{parentName:"li"},"sandbox-cdh")),Object(o.b)("li",{parentName:"ul"},"Target Zone = ",Object(o.b)("em",{parentName:"li"},"Choose your target storage")),Object(o.b)("li",{parentName:"ul"},"Overwrite Settings = ",Object(o.b)("strong",{parentName:"li"},"Skip")))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Wait until the migration is complete, and check the contents of your ",Object(o.b)("inlineCode",{parentName:"p"},"/retail_demo")," directory in your target storage."),Object(o.b)("p",{parentName:"li"},"A new directory should exist (",Object(o.b)("inlineCode",{parentName:"p"},"customer_addresses_dim_hive"),") with a ~50MB file inside (",Object(o.b)("inlineCode",{parentName:"p"},"customer_addresses_dim.tsv.gz"),")."))),Object(o.b)("h2",{id:"next-steps"},"Next steps"),Object(o.b)("p",null,"You have now successfully migrated data from your CDH Sandbox to your target storage using LiveMigrator. You can now try live replication by following our ",Object(o.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-livedata"},"LiveData tutorial"),"."))}b.isMDXComponent=!0}}]);