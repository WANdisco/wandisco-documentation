(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{150:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(3),r=a(7),i=(a(0),a(173)),o={id:"cdh_sandbox-s3",title:"Cloudera (CDH) Sandbox to AWS S3",sidebar_label:"CDH Sandbox to AWS S3"},c={unversionedId:"quickstarts/installation/cdh_sandbox-s3",id:"quickstarts/installation/cdh_sandbox-s3",isDocsHomePage:!1,title:"Cloudera (CDH) Sandbox to AWS S3",description:"Use this quickstart to configure LiveData Plane to replicate from a non-kerberized Cloudera (CDH) Sandbox to an AWS S3 bucket.",source:"@site/docs/quickstarts/installation/cdh_sandbox-s3.md",slug:"/quickstarts/installation/cdh_sandbox-s3",permalink:"/wandisco-documentation/docs/quickstarts/installation/cdh_sandbox-s3",version:"current",sidebar_label:"CDH Sandbox to AWS S3",sidebar:"quickstarts",previous:{title:"Cloudera (CDH) Sandbox to Azure Databricks with LiveAnalytics",permalink:"/wandisco-documentation/docs/quickstarts/installation/cdh_sandbox_lhv_client-adlsg2_lan"},next:{title:"Hortonworks (HDP) Sandbox to ADLS Gen2",permalink:"/wandisco-documentation/docs/quickstarts/installation/hdp_sandbox_adlsg2"}},l=[{value:"Prerequisites",id:"prerequisites",children:[{value:"Info you will require",id:"info-you-will-require",children:[]}]},{value:"Installation",id:"installation",children:[{value:"Setup LiveData Plane",id:"setup-livedata-plane",children:[]}]},{value:"Configuration",id:"configuration",children:[{value:"Check CDH services are started",id:"check-cdh-services-are-started",children:[]},{value:"Configure the S3 storage",id:"configure-the-s3-storage",children:[]}]},{value:"Next steps",id:"next-steps",children:[{value:"Migration",id:"migration",children:[]},{value:"Replication",id:"replication",children:[]}]},{value:"Troubleshooting",id:"troubleshooting",children:[]}],s={toc:l};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Use this quickstart to configure LiveData Plane to replicate from a non-kerberized Cloudera (CDH) Sandbox to an AWS S3 bucket."),Object(i.b)("p",null,"What this guide will cover:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Installing LiveData Plane and a CDH Sandbox using the ",Object(i.b)("a",{parentName:"li",href:"https://docs.docker.com/compose/"},"docker-compose")," tool."),Object(i.b)("li",{parentName:"ul"},"Integrating LiveData Plane with AWS S3.")),Object(i.b)("p",null,"If you would like to try something different with the CDH Sandbox, see:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/wandisco-documentation/docs/quickstarts/installation/cdh_sandbox-adlsg2"},"CDH Sandbox to ADLS Gen2"))),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"For more information about to create a suitable VM with all services installed, see our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/preparation/aws_vm_creation"},"AWS VM creation")," guide. See our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/preparation/vm_prep"},"VM Preparation")," guide for how to install the services only.|"))),Object(i.b)("p",null,"To complete this install, you will need:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"AWS S3 bucket."),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Only ",Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html"},"regions that support Signature Version 2")," are currently supported."))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Linux Virtual Machine (e.g. AWS EC2 instance)."),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Minimum size recommendation = ",Object(i.b)("strong",{parentName:"li"},"8 vcpus, 32 GiB memory")," (e.g. ",Object(i.b)("a",{parentName:"li",href:"https://aws.amazon.com/ec2/instance-types/"},"m5.2xlarge"),")."),Object(i.b)("li",{parentName:"ul"},"A minimum of 24GB available storage for the ",Object(i.b)("inlineCode",{parentName:"li"},"/var/lib/docker")," directory."))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"The following packages must be installed on the VM:"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"},"Git")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.docker.com/install/"},"Docker")," (v19.03.5 or higher)"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.docker.com/compose/install/#install-compose"},"Docker Compose for Linux")," (v1.25.0 or higher)")))),Object(i.b)("h3",{id:"info-you-will-require"},"Info you will require"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"AWS S3 details:"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html"},"Bucket name")," (Example: ",Object(i.b)("inlineCode",{parentName:"li"},"fusion-bucket"),")"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints"},"Bucket region")," (Example: ",Object(i.b)("inlineCode",{parentName:"li"},"eu-west-1"),")"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey"},"Access key")," (Example: ",Object(i.b)("inlineCode",{parentName:"li"},"AOIPUFY7ETYAHBCYT765"),")"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys"},"Secret key")," (Example: ",Object(i.b)("inlineCode",{parentName:"li"},"TY76eI3no3cdaWghr5tBkzPOP090bcD9c0lqpoL5"),")")))),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"These instructions have been tested on Ubuntu LTS.")),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("p",null,"Log in to your VM prior to starting these steps."),Object(i.b)("h3",{id:"setup-livedata-plane"},"Setup LiveData Plane"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Clone the LiveData Plane docker repository:"),Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"git clone https://github.com/WANdisco/cdh-s3.git"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Change to the repository directory:"),Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"cd cdh-s3"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Create and start your containers:"),Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"docker-compose up -d")),Object(i.b)("p",{parentName:"li"},"Docker will now download all required images and create the containers."))),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("h3",{id:"check-cdh-services-are-started"},"Check CDH services are started"),Object(i.b)("p",null,"The CDH Sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Log in to Cloudera via a web browser."),Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"http://<dockerhost_IP_address>:7180")),Object(i.b)("p",{parentName:"li"},"Username: ",Object(i.b)("inlineCode",{parentName:"p"},"admin"),"\nPassword: ",Object(i.b)("inlineCode",{parentName:"p"},"admin"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Select the ",Object(i.b)("strong",{parentName:"p"},"HDFS")," service.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Wait until all the HDFS components are showing as ",Object(i.b)("strong",{parentName:"p"},"Started"),"."))),Object(i.b)("h3",{id:"configure-the-s3-storage"},"Configure the S3 storage"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Log in to the UI via a web browser."),Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"http://<dockerhost_IP_address>:8081")),Object(i.b)("p",{parentName:"li"},"Enter your email address and choose a password you will remember.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Click on the ",Object(i.b)("strong",{parentName:"p"},"Settings")," cog for the ",Object(i.b)("strong",{parentName:"p"},"s3")," storage, and fill in the details for your AWS S3 bucket. See the ",Object(i.b)("a",{parentName:"p",href:"#info-you-will-require"},"Info you will require")," section for reference.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Click ",Object(i.b)("strong",{parentName:"p"},"Apply Configuration")," and wait for this to complete."))),Object(i.b)("h2",{id:"next-steps"},"Next steps"),Object(i.b)("h3",{id:"migration"},"Migration"),Object(i.b)("p",null,"Follow our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-livemigrator"},"CDH Sandbox LiveMigrator testing guide")," to perform a sample data migration."),Object(i.b)("h3",{id:"replication"},"Replication"),Object(i.b)("p",null,"Follow our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/testing/test-cdh-sandbox-livedata"},"CDH Sandbox LiveData testing guide")," to perform live replication of data."),Object(i.b)("h2",{id:"troubleshooting"},"Troubleshooting"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"See our ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/troubleshooting/general_troubleshooting"},"Troubleshooting")," guide for help.")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"See the ",Object(i.b)("a",{parentName:"p",href:"/wandisco-documentation/docs/quickstarts/operation/cdh_sandbox_fusion_stop_start"},"shutdown and start up")," guide for when you wish to safely shutdown or start back up the environment."))))}b.isMDXComponent=!0},173:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(a),u=n,m=p["".concat(o,".").concat(u)]||p[u]||d[u]||i;return a?r.a.createElement(m,c(c({ref:t},s),{},{components:a})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var s=2;s<i;s++)o[s]=a[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);