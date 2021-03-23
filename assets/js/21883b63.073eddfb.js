(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{173:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return h}));var o=t(0),r=t.n(o);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=r.a.createContext({}),p=function(e){var n=r.a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=p(e.components);return r.a.createElement(d.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},b=r.a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),l=p(t),b=o,h=l["".concat(i,".").concat(b)]||l[b]||u[b]||a;return t?r.a.createElement(h,s(s({ref:n},d),{},{components:t})):r.a.createElement(h,s({ref:n},d))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=b;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var d=2;d<a;d++)i[d]=t[d];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},86:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return p}));var o=t(3),r=t(7),a=(t(0),t(173)),i={id:"cdh_sandbox_fusion_stop_start",title:"Shut down or start up CDH Sandbox and LiveData Plane",sidebar_label:"Stop/Start CDH Sandbox & LiveData Plane"},s={unversionedId:"quickstarts/operation/cdh_sandbox_fusion_stop_start",id:"quickstarts/operation/cdh_sandbox_fusion_stop_start",isDocsHomePage:!1,title:"Shut down or start up CDH Sandbox and LiveData Plane",description:"Shutting down",source:"@site/docs/quickstarts/operation/cdh_sandbox_fusion_stop_start.md",slug:"/quickstarts/operation/cdh_sandbox_fusion_stop_start",permalink:"/wandisco-documentation/docs/quickstarts/operation/cdh_sandbox_fusion_stop_start",version:"current",sidebar_label:"Stop/Start CDH Sandbox & LiveData Plane",sidebar:"quickstarts",previous:{title:"Advanced Settings",permalink:"/wandisco-documentation/docs/quickstarts/operation/advanced-settings"},next:{title:"Shut down or start up HDP Sandbox and LiveData Plane",permalink:"/wandisco-documentation/docs/quickstarts/operation/hdp_sandbox_fusion_stop_start"}},c=[{value:"Shutting down",id:"shutting-down",children:[{value:"Stop CDH Sandbox services",id:"stop-cdh-sandbox-services",children:[]},{value:"Stop all containers",id:"stop-all-containers",children:[]},{value:"Shutdown the Docker host",id:"shutdown-the-docker-host",children:[]}]},{value:"Starting up",id:"starting-up",children:[{value:"Start all containers",id:"start-all-containers",children:[]}]}],d={toc:c};function p(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"shutting-down"},"Shutting down"),Object(a.b)("p",null,"The steps should be carried out prior to shutting down the Docker host itself."),Object(a.b)("h3",{id:"stop-cdh-sandbox-services"},"Stop CDH Sandbox services"),Object(a.b)("p",null,"Log in to the Cloudera UI, and stop all services."),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"http://<dockerhost_IP_address>:7180")),Object(a.b)("p",null,"Username: ",Object(a.b)("inlineCode",{parentName:"p"},"admin"),"\nPassword: ",Object(a.b)("inlineCode",{parentName:"p"},"admin")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Cloudera UI -> cdh-516 options (drop-down list) -> Stop -> Confirm Stop")),Object(a.b)("p",null,"Wait until all services have stopped before continuing."),Object(a.b)("h3",{id:"stop-all-containers"},"Stop all containers"),Object(a.b)("p",null,"In the ",Object(a.b)("inlineCode",{parentName:"p"},"fusion-docker-compose")," directory on the Docker host, stop all containers by using:"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"docker-compose stop")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Example output")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-text"},"Stopping fusion-oneui-server               ... done\nStopping fusion-server-adls2               ... done\nStopping induction                         ... done\nStopping fusion-ihc-server-adls2           ... done\nStopping fusion-server-sandbox-cdh         ... done\nStopping sshd-sandbox-cdh                  ... done\nStopping fusion-ihc-server-sandbox-cdh     ... done\nStopping fusion-nn-proxy-sandbox-cdh       ... done\nStopping fusion-livehive-proxy-sandbox-cdh ... done\nStopping fusion-ui-server-adls2            ... done\nStopping fusion-ui-server-sandbox-cdh      ... done\nStopping sandbox-cdh                       ... done\nStopping debug                             ... done\n")),Object(a.b)("h3",{id:"shutdown-the-docker-host"},"Shutdown the Docker host"),Object(a.b)("p",null,"You can now safely shut down the Docker host."),Object(a.b)("h2",{id:"starting-up"},"Starting up"),Object(a.b)("p",null,"Ensure the Docker host is started and that the docker containers have been created previously (using ",Object(a.b)("inlineCode",{parentName:"p"},"docker-compose up -d"),")."),Object(a.b)("h3",{id:"start-all-containers"},"Start all containers"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"In the ",Object(a.b)("inlineCode",{parentName:"p"},"fusion-docker-compose")," directory on the Docker host, verify that the containers are stopped."),Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"docker-compose ps")),Object(a.b)("p",{parentName:"li"},"All containers should have an ",Object(a.b)("inlineCode",{parentName:"p"},"Exit")," state.")),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Start all containers."),Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"docker-compose start")),Object(a.b)("p",{parentName:"li"},Object(a.b)("em",{parentName:"p"},"Example output")),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",{parentName:"pre",className:"language-text"},"Starting fusion-oneui-server               ... done\nStarting fusion-server-adls2               ... done\nStarting induction                         ... done\nStarting fusion-ihc-server-adls2           ... done\nStarting fusion-server-sandbox-cdh         ... done\nStarting sshd-sandbox-cdh                  ... done\nStarting fusion-ihc-server-sandbox-cdh     ... done\nStarting fusion-nn-proxy-sandbox-cdh       ... done\nStarting fusion-livehive-proxy-sandbox-cdh ... done\nStarting fusion-ui-server-adls2            ... done\nStarting fusion-ui-server-sandbox-cdh      ... done\nStarting sandbox-cdh                       ... done\nStarting debug                             ... done\n")))),Object(a.b)("p",null,"The CDH sandbox services will automatically start once the container is running. This can take 5-10 minutes."))}p.isMDXComponent=!0}}]);