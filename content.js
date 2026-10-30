import {sphericalPosition} from './motion.js';
const featured = [
  {id:'findr-cloud',number:'01',name:'Findr Cloud',category:'cloud',type:'Cloud + AI',year:'2026',tagline:'Lost things. Found connections.',description:'A campus lost-and-found platform that brings image analysis, item matching and ownership verification into one place.',stack:['AWS','Python','JavaScript'],skills:['aws','python','javascript'],image:'assets/findr-cloud.webp',imageAlt:'Findr Cloud campus lost-and-found interface',repo:'https://github.com/hannannoor/findr-cloud',demo:'https://youtu.be/hrbYugO_jg8',brief:'Losing something on campus should not mean searching through scattered chats and noticeboards. Findr explores how cloud services and image analysis can make the search more useful.',details:['Implemented seven AWS Lambda functions alongside a web frontend for authenticated lost-and-found reports.','Added private image access, multilingual listings, a campus map and ownership verification.','Documented the architecture and produced a narrated demonstration.'],note:'Coursework project. The original cloud deployment is archived; the source and recorded demonstration are available.',role:'Cloud application development',kind:'Coursework'},
  {id:'churnguard',number:'02',name:'ChurnGuard',category:'ai',type:'Machine learning',year:'2026',tagline:'Turn customer data into a clearer next step.',description:'Telecom churn analysis and an interactive app for customer scoring, prediction explanations and retention scenarios.',stack:['Python','scikit-learn','Streamlit'],skills:['python','ml'],image:'assets/churnguard.webp',imageAlt:'ChurnGuard customer scoring dashboard from the project documentation',repo:'https://github.com/hannannoor/churnguard',brief:'A prediction is more useful when someone can understand it. ChurnGuard connects a CRISP-DM analysis workflow with an interface for exploring individual customer scores.',details:['Prepared a telco dataset, engineered features and compared machine learning models in a notebook.','Built a Streamlit interface for customer-level scoring and coefficient-based explanations.','Added retention scenarios to explore modelled associations.'],note:'Coursework project. Retention scenarios show model associations, not proven causal effects. No production deployment or business-impact claim is made.',role:'Machine learning and application development',kind:'Coursework'},
  {id:'findr-mobile',number:'03',name:'Findr Mobile',category:'apps',type:'Mobile development',year:'2026',tagline:'A lost-and-found, in your pocket.',description:'A Flutter companion with item reports, claims, chat, maps and AI matching, built around the way students use their phones.',stack:['Flutter','Dart','Firebase'],skills:['flutter','firebase'],image:'assets/findr-mobile.webp',imageAlt:'Findr mobile app screens showing the campus lost-and-found experience',repo:'https://github.com/hannannoor/findr-mobile',demo:'https://youtu.be/EPEnVfJLQjo',brief:'The mobile version of Findr brings reporting, claiming and communicating into a single student-facing experience.',details:['Implemented Firebase authentication, reports and claims, chat, maps, notifications and biometric unlock.','Used Flutter, Dart and Riverpod for the app structure and state management.','Integrated AI matching and demonstrated NETS QR rewards using a sandbox environment.'],note:'Coursework project. NETS integration is a sandbox demonstration, not a production payment or escrow service. A compatible device build and service configuration are required.',role:'Mobile application development',kind:'Coursework'},
  {id:'supplyr',number:'04',name:'Supplyr',category:'automation',type:'Process automation',year:'2026',tagline:'Less repetition. More room to think.',description:'An inventory and supplier-reordering workflow connecting stock data, reorder calculations and purchase-order documents.',stack:['UiPath','Python','MySQL'],skills:['python','sql','uipath'],image:'assets/supplyr.svg',imageAlt:'Illustration of the Supplyr stock-check to purchase-order automation workflow',repo:'https://github.com/hannannoor/supplyr-rpa',demo:'https://youtu.be/GeLmaBBpvoU',brief:'Routine inventory work often crosses spreadsheets, databases and documents. Supplyr explores how those handoffs can become a connected, traceable workflow.',details:['Combined a UiPath workflow with a Python reorder calculator and SQL setup.','Created purchase-order documents with Word, PDF and Excel sample outputs.','Included an audit trail and documented the workflow with a demonstration.'],note:'Coursework project. The workflow requires Windows, Office, database and service configuration. The public copy uses placeholder credentials.',role:'Workflow and automation development',kind:'Coursework'},
  {id:'skip',number:'05',name:'SKIP',category:'creative',type:'Narrative game',year:'19 Sep 2026',tagline:'You can skip a moment. Not its consequences.',description:'A published narrative browser game about drug-related choices and their consequences, built with two teammates for the SCOGA Anti-Drug Game Jam 2026.',stack:['JavaScript','HTML / CSS','Browser audio'],skills:['javascript','web'],image:'assets/skip.webp',imageAlt:'SKIP narrative game title screen',repo:'https://github.com/hannannoor/skip',demo:'https://hannannoor.itch.io/skip',demoLabel:'Play the game',brief:'What happens when temporary escape becomes the only response to pressure? SKIP tells that story through a student’s changing relationships, responsibilities and environment.',details:['Developed with two teammates for the Anti-Drug Game Jam associated with SCOGA on 19 September 2026.','Used interactive storytelling, character relationships and an escape mechanic to explore decisions and their consequences.','The available game build includes procedural audio, volume controls and reduced-motion support.'],note:'Completed and publicly published on itch.io. The team did not qualify for the finals.',role:'Game development · team project',kind:'Game jam'}
];

const additionalProjects=[
  {
    "id": "animal-adoption",
    "repo": "https://github.com/hannannoor/animal-adoption",
    "name": "Animal Adoption",
    "category": "apps",
    "type": "Web application",
    "tagline": "Give adoption information a place to live.",
    "description": "An animal-adoption coursework application with a web frontend, Express API and relational database.",
    "stack": [
      "Node.js",
      "Express",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "skills": [
      "nodejs",
      "sql",
      "javascript",
      "web"
    ],
    "brief": "An application project connecting an animal-adoption interface with server routes and a database.",
    "details": [
      "Created the frontend and server submission.",
      "Included a MySQL schema, seed data and dependency lockfile.",
      "Documented API implementation and the completed project report."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Web and database application development",
    "kind": "Coursework",
    "number": "06",
    "image": "assets/animal-adoption.svg",
    "imageAlt": "Project study for Animal Adoption",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "restaurant-website",
    "repo": "https://github.com/hannannoor/restaurant-website",
    "name": "Restaurant Website and Database Design",
    "category": "apps",
    "type": "Web + database design",
    "tagline": "From restaurant requirements to a working interface.",
    "description": "A static restaurant website supported by a website proposal and relational database design.",
    "stack": [
      "HTML",
      "CSS",
      "Relational database design",
      "ERD",
      "Normalisation"
    ],
    "skills": [
      "web"
    ],
    "brief": "A restaurant web design project connecting interview findings, page design and database modelling.",
    "details": [
      "Built a multi-page static HTML and CSS frontend with image and GIF assets.",
      "Documented interview findings, an ERD and normalisation.",
      "Recorded design justification and a completed learning journal."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Frontend and database design",
    "kind": "Coursework",
    "number": "07",
    "image": "assets/restaurant-website.svg",
    "imageAlt": "Project study for Restaurant Website and Database Design",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "food-ordering-system",
    "repo": "https://github.com/hannannoor/food-ordering-system",
    "name": "Food Ordering System",
    "category": "apps",
    "type": "Python notebook program",
    "tagline": "Build an order, track the details.",
    "description": "A notebook-based ordering program with cart management, order history and loyalty features.",
    "stack": [
      "Python",
      "Jupyter"
    ],
    "skills": [
      "python"
    ],
    "brief": "An interactive menu program for practising ordering flows and program logic.",
    "details": [
      "Implemented menu browsing, order updates and checkout.",
      "Included order history and promotion handling.",
      "Added loyalty points earning and redemption."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Python application development",
    "kind": "Coursework",
    "number": "08",
    "image": "assets/food-ordering-system.svg",
    "imageAlt": "Project study for Food Ordering System",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "transport-fare-calculator",
    "repo": "https://github.com/hannannoor/transport-fare-calculator",
    "name": "Transport Fare Calculator",
    "category": "apps",
    "type": "Python notebook program",
    "tagline": "Follow the route, work out the fare.",
    "description": "Interactive fare calculations with route and trip-planning extensions.",
    "stack": [
      "Python",
      "Jupyter",
      "Computational thinking",
      "Flowcharts"
    ],
    "skills": [
      "python",
      "algorithms"
    ],
    "brief": "A fare-calculation assignment documented through notebooks, requirements and an editable flowchart.",
    "details": [
      "Included the submitted Task 2 notebook and enhanced Task 3 version.",
      "Documented feature requirements, explanations and justification.",
      "Created an editable transport-fare flowchart."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Python programming and computational thinking",
    "kind": "Coursework",
    "number": "09",
    "image": "assets/transport-fare-calculator.svg",
    "imageAlt": "Project study for Transport Fare Calculator",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "dsag-queues",
    "repo": "https://github.com/hannannoor/dsag-queues",
    "name": "Queue Simulations and Cafe Assignment",
    "category": "systems",
    "type": "Data structures",
    "tagline": "See how a queue changes the flow.",
    "description": "Queue simulations and written data-structure analysis with editable layouts.",
    "stack": [
      "Python",
      "Jupyter",
      "Data structures",
      "Queue simulation"
    ],
    "skills": [
      "python",
      "algorithms"
    ],
    "brief": "A notebook-based exploration of queues supported by saved outputs, explanations and layout diagrams.",
    "details": [
      "Completed a notebook containing instructions, answers and saved outputs.",
      "Included an HTML export for viewing without Jupyter.",
      "Created editable Subway and queue-layout diagrams."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Data structures and algorithm analysis",
    "kind": "Coursework",
    "number": "10",
    "image": "assets/dsag-queues.svg",
    "imageAlt": "Project study for Queue Simulations and Cafe Assignment",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "campus-navigation",
    "repo": "https://github.com/hannannoor/campus-navigation",
    "name": "Campus Navigation Design",
    "category": "systems",
    "type": "Algorithm design",
    "tagline": "Make a route easy to follow.",
    "description": "Campus route selection, navigation flowcharts and evidence-based route justification.",
    "stack": [
      "Flowcharts",
      "Route analysis",
      "Documentation"
    ],
    "skills": [
      "algorithms"
    ],
    "brief": "A computational thinking design assignment for selecting and explaining campus navigation routes.",
    "details": [
      "Produced a completed route-selection report and campus map.",
      "Created an editable navigation flowchart.",
      "Documented route justification against the supplied project specification."
    ],
    "note": "An algorithm design and report project, rather than an executable navigation application.",
    "role": "Computational thinking and route design",
    "kind": "Coursework",
    "number": "11",
    "image": "assets/campus-navigation.svg",
    "imageAlt": "Project study for Campus Navigation Design",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "listing-hub",
    "repo": "https://github.com/hannannoor/listing-hub",
    "name": "Listing Hub",
    "category": "automation",
    "type": "Data pipeline + search",
    "tagline": "Collect once. Search with context.",
    "description": "A listing collection and search pipeline with local storage, exports and an optional dashboard.",
    "stack": [
      "Python",
      "SQLite",
      "CLI",
      "HTML",
      "Data normalisation",
      "Automated testing"
    ],
    "skills": [
      "python",
      "sql",
      "web"
    ],
    "brief": "A local pipeline for normalising listings, storing them without duplicates and searching the resulting data.",
    "details": [
      "Implemented a G2G source adapter and deduplicated SQLite storage.",
      "Added search, price and attribute filters, and CSV and JSON exports.",
      "Included offline tests for decoding, storage and the query/API layer."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Python data-pipeline development",
    "kind": "Personal project",
    "year": "2026",
    "number": "12",
    "image": "assets/listing-hub.svg",
    "imageAlt": "Project study for Listing Hub",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "restaurant-data-analytics",
    "repo": "https://github.com/hannannoor/restaurant-data-analytics",
    "name": "Restaurant Customer Analytics",
    "category": "ai",
    "type": "Data analytics",
    "tagline": "Turn customer records into a clearer picture.",
    "description": "Restaurant customer-data preparation, modelling and dashboard analysis.",
    "stack": [
      "KNIME",
      "Power BI",
      "Data preparation",
      "Regression",
      "Data visualisation"
    ],
    "skills": [
      "analytics"
    ],
    "brief": "An analytics project connecting data preparation workflows with restaurant customer analysis and dashboards.",
    "details": [
      "Prepared matching restaurant input and output datasets.",
      "Created an editable KNIME workflow and two Power BI dashboards.",
      "Documented regression and dashboard findings in the completed report."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Data preparation, analysis and dashboard design",
    "kind": "Coursework",
    "year": "2025",
    "number": "13",
    "image": "assets/restaurant-data-analytics.svg",
    "imageAlt": "Project study for Restaurant Customer Analytics",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "network-design",
    "repo": "https://github.com/hannannoor/network-design",
    "name": "Office and Warehouse Network Design",
    "category": "systems",
    "type": "Network simulation",
    "tagline": "Connect the office and the warehouse.",
    "description": "A configured company network simulation with documented connectivity tests.",
    "stack": [
      "Cisco Packet Tracer",
      "DHCP",
      "DNS",
      "IP networking"
    ],
    "skills": [
      "networks"
    ],
    "brief": "A network design assignment supported by a configured simulation, topology report and connectivity evidence.",
    "details": [
      "Created an individually named Packet Tracer activity.",
      "Documented the office and warehouse network.",
      "Included connectivity-test evidence and the original project brief."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Network configuration and documentation",
    "kind": "Coursework",
    "number": "14",
    "image": "assets/network-design.svg",
    "imageAlt": "Project study for Office and Warehouse Network Design",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "cloud-services-case-study",
    "repo": "https://github.com/hannannoor/cloud-services-case-study",
    "name": "Cloud Services Case Study",
    "category": "cloud",
    "type": "Cloud research",
    "tagline": "Choose cloud services with the tradeoffs in view.",
    "description": "A group research report on cloud service models and infrastructure modernisation for a logistics case study.",
    "stack": [
      "Cloud service models",
      "IaaS",
      "Operations analysis",
      "Vendor lock-in analysis",
      "Technical research"
    ],
    "skills": [
      "aws"
    ],
    "brief": "A group case study comparing service models and assessing how cloud infrastructure could fit existing systems.",
    "details": [
      "Compared IaaS, CaaS, PaaS, FaaS and SaaS in a logistics case study.",
      "Hannan's named section researched operations and vendor lock-in risk.",
      "Contributed applicability, advantages, limitations and justification with references."
    ],
    "note": "A cloud services research and architecture case study.",
    "role": "Research contribution: operations and vendor lock-in",
    "kind": "Group coursework",
    "number": "15",
    "image": "assets/cloud-services-case-study.svg",
    "imageAlt": "Project study for Cloud Services Case Study",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  },
  {
    "id": "windows-security-lab",
    "repo": "https://github.com/hannannoor/windows-security-lab",
    "name": "Windows Security and Network Services",
    "category": "systems",
    "type": "Security lab",
    "tagline": "Configure, test and document the evidence.",
    "description": "A Windows virtual-machine security report covering secure network services and CIS Benchmark remediation.",
    "stack": [
      "Windows",
      "VirtualBox",
      "IIS",
      "FTPS",
      "HTTPS",
      "CIS Benchmarks",
      "Firewall configuration",
      "Audit logging"
    ],
    "skills": [
      "security"
    ],
    "brief": "A security evidence portfolio documenting Windows configuration and secure services in a virtual-machine lab.",
    "details": [
      "Documented users and groups, encryption, firewall behaviour and audit logging.",
      "Configured and tested IIS FTPS and HTTPS with certificates and VirtualBox networking.",
      "Recorded ten CIS Benchmark remediations with before-and-after evidence."
    ],
    "note": "Source and supporting project documentation are available on GitHub.",
    "role": "Windows security configuration and lab documentation",
    "kind": "Coursework",
    "year": "2025",
    "number": "16",
    "image": "assets/windows-security-lab.svg",
    "imageAlt": "Project study for Windows Security and Network Services",
    "imageLabel": "PROJECT STUDY",
    "featured": false
  }
];
export const events=[
  {
    "id": "mens-kaki-club",
    "name": "Men’s Kaki Club",
    "type": "event",
    "tagline": "1st place · Leaders of Tomorrow Hackathon 2026",
    "description": "A team community initiative encouraging senior men aged 55+ to connect, build friendships and stay active.",
    "year": "2026",
    "role": "Team member and event organiser",
    "details": [
      "Won first place at Leaders of Tomorrow Hackathon 2026 with Men’s Kaki Club.",
      "Worked with Precious Active Ageing Centre to organise a fitness and conditioning session guided by a coach.",
      "Collaborated across courses to understand participation barriers and create an activity built around senior men’s needs."
    ],
    "video": "assets/mens-kaki-club-event.mp4",
    "image": "assets/mens-kaki-club-poster.jpg"
  },
  {
    "id": "tpla",
    "name": "Temasek LEAD Ambassadors",
    "type": "event",
    "tagline": "Subcommittee Member · Hike Co-Organiser",
    "description": "Currently co-organising an upcoming group hike with Temasek LEAD Ambassadors, contributing to event planning, activity coordination and organisational arrangements.",
    "details": [
      "Current subcommittee member of Temasek LEAD Ambassadors.",
      "Co-organising an upcoming group hike.",
      "Contribute to event planning, activity coordination and organisational arrangements."
    ]
  },
  {
    "id": "sylp",
    "name": "Singapore Young Leaders Programme",
    "type": "event",
    "tagline": "SYLP · NYC Leaders Course",
    "description": "Participating in leadership development through SYLP, including the National Youth Council Leaders Course.",
    "details": [
      "Participant in Singapore Young Leaders Programme.",
      "Attending the NYC Leaders Course as part of the leadership programme."
    ]
  },
  {
    "id": "poly-forum",
    "name": "Polytechnic Forum 2026",
    "type": "event",
    "tagline": "Participant · 2026",
    "description": "Explored social and national issues affecting Singapore, exchanging perspectives with fellow polytechnic students.",
    "details": [
      "Participated in Polytechnic Forum 2026.",
      "Discussed social and national issues affecting Singapore with fellow polytechnic students.",
      "Took part in collaborative activities encouraging critical thinking and discussion of community challenges."
    ],
    "year": "2026"
  },
  {
    "id": "iitsc",
    "name": "IIT Students’ Council",
    "type": "event",
    "tagline": "Active member · IITSC involvement",
    "description": "Sustained involvement in IITSC activities, team bonding and subcommittee engagement across two academic years.",
    "details": [
      "Participated in IITSC Sub-Committee Engagement, Chill Night and Team Bonding Camp in 2025.",
      "Participated in IITSC Sub-comm Welcome Day and Camp Wildcard in 2026."
    ]
  },
  {
    "id": "nyaa",
    "name": "NYAA Gold",
    "type": "event",
    "tagline": "Current participant",
    "description": "Currently working towards the National Youth Achievement Award Gold level.",
    "details": [
      "Current NYAA Gold participant.",
      "Participation is ongoing; the Gold award is not presented as completed."
    ]
  },
  {
    "id": "tabletop",
    "name": "Tabletop Wizards",
    "type": "event",
    "tagline": "Founding Member & Head of Logistics",
    "description": "Co-founded Tabletop Wizards, now an officially recognised CCA at Temasek Polytechnic. I coordinate logistics and support club activities and events.",
    "details": [
      "Co-founded the Tabletop Wizards CCA at Temasek Polytechnic.",
      "Currently serving as Head of Logistics.",
      "Help organise club activities, coordinate logistics and support events."
    ]
  },
  {
    "id": "orientation",
    "name": "IIT Freshmen Orientation 2026",
    "type": "event",
    "year": "2026",
    "tagline": "Orientation Leader · Three-Day Programme",
    "description": "Guided an assigned class throughout the full three-day freshman orientation, helping new students take part, connect and settle into polytechnic life.",
    "details": [
      "Responsible for an assigned class throughout the three-day programme.",
      "Guided freshmen through activities and facilitated group participation.",
      "Worked alongside other Orientation Leaders to help freshmen adjust to polytechnic life."
    ]
  },
  {
    "id": "infocomm-robotics",
    "name": "Infocomm & Robotics CCA",
    "type": "event",
    "tagline": "Vice-Chairman · Secondary School",
    "description": "Supported CCA activities and member engagement as Vice-Chairman of my secondary school’s Infocomm and Robotics CCA.",
    "details": [
      "Held the student leadership position of Vice-Chairman.",
      "Supported CCA activities and member engagement."
    ]
  }
];
export const certificates=[
  {
    "id": "cert-ai",
    "name": "AI Literacy",
    "issuer": "IBM SkillsBuild",
    "date": "29 October 2026",
    "image": "assets/cert-ai.webp",
    "link": "https://www.credly.com/badges/697516e9-e8fb-4fae-81ad-8c8513025f52/linked_in_profile",
    "skills": [
      "ml"
    ],
    "description": "Foundational AI, generative AI and responsible AI concepts."
  },
  {
    "id": "cert-knime",
    "name": "Basic Proficiency in KNIME Analytics Platform",
    "issuer": "KNIME",
    "date": "14 August 2025",
    "image": "assets/cert-knime.webp",
    "link": "https://www.credly.com/badges/59d9ba93-a0f7-4a20-9559-ae16bef2435b/linked_in_profile",
    "skills": [
      "analytics"
    ],
    "description": "Data access, preparation, transformation, visualisation and reporting in KNIME."
  },
  {
    "id": "cert-nets",
    "name": "NETS QR Payment Gateway Integration",
    "issuer": "Temasek Polytechnic / NETS",
    "date": "28 August 2026",
    "image": "assets/cert-nets.webp",
    "link": "https://www.linkedin.com/in/hannan-noor-875648361/details/certifications/",
    "skills": [
      "flutter"
    ],
    "description": "Certificate of Achievement for sandbox QR payment gateway integration."
  },
  {
    "id": "cert-windows",
    "name": "Windows 11 Security",
    "issuer": "LinkedIn Learning",
    "date": "July 2025",
    "link": "https://www.linkedin.com/learning/certificates/3a5aee95cf48514ca9c718c6e54c502b84986f814da4ea57002b9be8c7b2c095/",
    "skills": [
      "security"
    ],
    "description": "Windows security fundamentals. View the credential through LinkedIn Learning."
  }
];
const skillDefinitions=[["python", "Python"], ["ml", "Machine learning"], ["aws", "AWS"], ["javascript", "JavaScript"], ["flutter", "Flutter"], ["firebase", "Firebase"], ["sql", "SQL"], ["uipath", "UiPath"], ["web", "HTML + CSS"], ["nodejs", "Node.js + Express"], ["analytics", "KNIME + Power BI"], ["algorithms", "Algorithms"], ["networks", "Networking"], ["security", "Security"], ["cloud", "Cloud concepts"]];

export const projects=[...featured.map(p=>({...p,featured:true})),...additionalProjects];
projects.find(p=>p.id==='cloud-services-case-study').skills=['cloud'];
projects.find(p=>p.id==='churnguard').relatedRepos=[{name:'Deployment repository',url:'https://github.com/hannannoor/hannan-noor-repo'}];
projects.find(p=>p.id==='skip').relatedLinks=[{name:'About the game jam',url:'https://scoga-anti-drug-jam-2026.ai.studio/'}];
export const collections=[{name:'School projects collection',url:'https://github.com/hannannoor/school-projects'}];
// Real screenshots and documentation figures, selected from the project submissions.
const projectVisuals={
 'listing-hub':['listing-hub-live.webp','Actual Listing Hub dashboard running against the existing project database','PROJECT SCREENSHOT'],
 'animal-adoption':['animal-adoption-listings.webp','Animal Adoption listing interface from the completed report','PROJECT SCREENSHOT'],
 'restaurant-website':['restaurant-menu.webp','ByteBite menu interface from the project report','PROJECT SCREENSHOT'],
 'food-ordering-system':['food-ordering-menu-output.webp','Actual view_menu() console output from the original notebook','PROGRAM OUTPUT'],
 'transport-fare-calculator':['transport-flowchart.webp','Transport fare decision flowchart from the project report','PROJECT DIAGRAM'],
 'dsag-queues':['dsag-queue-layout.webp','Queue and seating layout from the original simulation notebook','PROJECT DIAGRAM'],
 'campus-navigation':['campus-route.webp','Annotated campus navigation route from the coursework report','PROJECT MAP'],
 'restaurant-data-analytics':['restaurant-analytics-dashboard.webp','Power BI customer cluster dashboard from the analysis report','PROJECT DASHBOARD'],
 'network-design':['network-topology.webp','Packet Tracer main office and warehouse network topology','PROJECT DIAGRAM'],
 'cloud-services-case-study':['cloud-migration-diagram.webp','Cloud migration recommendation diagram from the group report','REPORT DIAGRAM'],
 'windows-security-lab':['windows-permission-test.webp','Windows permission denied test from the security lab report','LAB SCREENSHOT'],
 'supplyr':['supplyr-validation.webp','Supplyr UiPath database pre-flight validation workflow','WORKFLOW SCREENSHOT']
};
for(const p of projects){if(projectVisuals[p.id]){const [image,alt,label]=projectVisuals[p.id];Object.assign(p,{image:'assets/'+image,imageAlt:alt,imageLabel:label});}}
projects.find(p=>p.id==='restaurant-website').gallery=[{src:'assets/restaurant-home.webp',caption:'ByteBite homepage from the submitted project.'}];
projects.find(p=>p.id==='restaurant-data-analytics').gallery=[{src:'assets/restaurant-analytics-workflow.webp',caption:'The KNIME data preparation and modelling workflow.'}];
projects.find(p=>p.id==='supplyr').gallery=[{src:'assets/supplyr-runs.webp',caption:'Successful unattended job runs in UiPath.'}];
projects.find(p=>p.id==='skip').gallery=[{src:'assets/skip-building.webp',caption:'Building SKIP at Anti-Drug Jam 2026.'},{src:'assets/skip-team.webp',caption:'The game-jam team. Participation award.'}];
Object.assign(events.find(e=>e.id==='mens-kaki-club'),{image:'assets/mkc-stage.webp',imageAlt:'Men’s Kaki Club team at the Leaders of Tomorrow 2026 award ceremony',gallery:[{src:'assets/mkc-stage.webp',caption:'Leaders of Tomorrow Hackathon 2026 — first place.'},{src:'assets/mkc-team.webp',caption:'Our team with Precious Active Ageing Centre.'},{src:'assets/mkc-award.webp',caption:'Celebrating the team’s award.'}]});
Object.assign(events.find(e=>e.id==='tabletop'),{image:'assets/tabletop-wizards.webp',imageAlt:'Tabletop Wizards 2026 Heart Comm poster',gallery:[{src:'assets/tabletop-wizards.webp',caption:'Tabletop Wizards — meet the Heart Comm.'}]});
Object.assign(events.find(e=>e.id==='poly-forum'),{image:'assets/polyforum-team.webp',imageAlt:'Students collaborating on the Polytechnic Forum group poster',gallery:[{src:'assets/polyforum-team.webp',caption:'Collaborating on our vision for a sustainable future.'},{src:'assets/polyforum-poster.webp',caption:'Our group’s visioning poster at Polytechnic Forum 2026.'}]});

Object.assign(projects.find(p=>p.id==='findr-cloud'),{networkImage:'assets/findr-cloud-browse.webp',gallery:[{src:'assets/findr-cloud-browse.webp',caption:'Browse reported items in Findr Cloud.'},{src:'assets/findr-cloud-map.webp',caption:'The campus map, with reported items.'}]});
Object.assign(projects.find(p=>p.id==='findr-mobile'),{networkImage:'assets/findr-mobile-map.webp',gallery:[{src:'assets/findr-mobile-home.webp',caption:'The Flutter app home screen.'},{src:'assets/findr-mobile-map.webp',caption:'Reported items on the campus map.'}]});
projects.find(p=>p.id==='skip').networkImage='assets/skip-gameplay.webp';
projects.find(p=>p.id==='skip').gallery.unshift({src:'assets/skip-gameplay.webp',caption:'A moment from SKIP’s branching story.'});
Object.assign(projects.find(p=>p.id==='supplyr'),{image:'assets/supplyr-slide-1.svg',imageAlt:'Supplyr presentation cover — automated stock detection and supplier reordering robot',imageLabel:'PRESENTATION COVER',networkImage:'assets/supplyr-orb-slide.svg',gallery:[{src:'assets/supplyr-slide-3.svg',caption:'The end-to-end process from the original Supplyr presentation.'},{src:'assets/supplyr-validation.webp',caption:'The implemented database pre-flight validation workflow.'},{src:'assets/supplyr-runs.webp',caption:'Successful unattended job runs in UiPath.'}]});

// Activity photographs supplied and labelled by Hannan, 30 October 2026.
const activityPhotos={
 iitsc:{file:'iitsc-group.webp',alt:'IITSC group gathered in the auditorium',caption:'IIT Students’ Council — the auditorium group.'},
 orientation:{file:'fmo-leaders.webp',alt:'Four IIT Freshmen Orientation leaders cheering in blue Team Temasek shirts',caption:'FMO 2026 — supporting freshmen as Orientation Leaders.'},
 sylp:{file:'sylp-group.webp',alt:'SYLP group beneath the illuminated globe at the NYC Leaders Course',caption:'SYLP — learning together through the NYC Leaders Course.'},
 tpla:{file:'tpla-group.webp',alt:'Temasek LEAD Ambassadors seated together for a group photograph',caption:'Temasek LEAD Ambassadors — our group together.'}
};
for(const [id,photo] of Object.entries(activityPhotos)){
 Object.assign(events.find(e=>e.id===id),{image:'assets/'+photo.file,imageAlt:photo.alt,imageWidth:1600,imageHeight:1200,gallery:[{src:'assets/'+photo.file,caption:photo.caption}]});
}
Object.assign(events.find(e=>e.id==='tabletop'),{imageWidth:858,imageHeight:720,imageCropHeight:720});
Object.assign(events.find(e=>e.id==='poly-forum'),{imageWidth:1200,imageHeight:1600});

// NYAA hiking photographs and Outdoor Living context supplied by Hannan.
Object.assign(events.find(e=>e.id==='nyaa'),{
 image:'assets/nyaa-hike.webp',imageAlt:'Hannan on a hike logged toward NYAA Outdoor Living hours',imageWidth:1600,imageHeight:1200,
 description:'Currently working towards NYAA Gold, including hikes logged toward the Outdoor Living component.',
 details:['Current NYAA Gold participant.','Logged this hike toward my Outdoor Living hours.'],
 gallery:[{src:'assets/nyaa-hike.webp',caption:'On a hike I logged toward my NYAA Outdoor Living hours.'},{src:'assets/nyaa-trail.webp',caption:'Exploring the trail during the hike.'}]
});

export const nodes=[
 {id:'hannan',label:'Hannan Noor',type:'core',position:[0,0,0],description:'Applied AI student, developer and curious person. Explore the projects, people and ideas that connect my work.'},
 ...skillDefinitions.map(([id,label],i)=>({id,label,type:'skill',position:sphericalPosition(i,skillDefinitions.length,2.55),description:`Explore projects connected to ${label}.`})),
 ...projects.map((p,i)=>({id:p.id,label:p.name,type:'project',position:sphericalPosition(i,projects.length,5.05),description:p.description})),
 ...events.map((e,i)=>({id:e.id,label:e.name,type:'event',position:[Math.cos(i/events.length*Math.PI*2+.3)*3.8,Math.sin(i/events.length*Math.PI*2+.3)*3.8,-3.5],description:e.description})),
 ...certificates.map((c,i)=>({id:c.id,label:c.name,type:'certificate',position:[Math.cos(i/4*Math.PI*2+.5)*3.9,Math.sin(i/4*Math.PI*2+.5)*3.9,3.1],description:c.description}))
];
export const edges=[...skillDefinitions.map(([id])=>['hannan',id]),...projects.flatMap(p=>p.skills.map(skill=>[p.id,skill])),...events.map(e=>['hannan',e.id]),...certificates.flatMap(c=>c.skills.map(s=>[c.id,s]))];
export function relatedNodes(id){const set=new Set([id]);for(const[a,b]of edges){if(a===id)set.add(b);if(b===id)set.add(a);}return set;}
export function shortestPath(start,end){if(!nodes.some(n=>n.id===start)||!nodes.some(n=>n.id===end))return [];const q=[[start]],seen=new Set([start]);while(q.length){const path=q.shift(),tail=path.at(-1);if(tail===end)return path;for(const id of relatedNodes(tail))if(!seen.has(id)){seen.add(id);q.push([...path,id]);}}return [];}
