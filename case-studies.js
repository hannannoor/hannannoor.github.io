// Curated from original coursework reports; see docs/walkthrough-sources.json.
const studies={
  "findr-cloud": {
    "gallery": [
      {
        "src": "assets/walkthroughs/findr-cloud-04.webp",
        "title": "Search one shared lost-and-found board",
        "caption": "Students can browse item photographs and filter reports by status and category. Bringing the reports into one board makes them easier to search than scattered class chats.",
        "width": 1800,
        "height": 891,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/findr-cloud-06.webp",
        "title": "See where an item was reported",
        "caption": "The campus map places reports in their physical context. Selecting a pin gives students another way to narrow the search.",
        "width": 1800,
        "height": 896,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/findr-cloud-18.webp",
        "title": "Use image analysis as a starting point",
        "caption": "The report shows a custom AWS Rekognition label alongside pretrained labels. Suggested categories support the reporting workflow; the user still reviews the item details.",
        "width": 772,
        "height": 427,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/findr-cloud-09.webp",
        "title": "Check a claim before arranging collection",
        "caption": "The ownership flow asks about private distinguishing details. This separates information visible on the listing from details a claimant needs to provide.",
        "width": 546,
        "height": 486,
        "portrait": false
      }
    ],
    "details": [
      "Built a campus reporting interface connected to seven AWS Lambda functions and API-based workflows.",
      "Combined image analysis, filtered item browsing and a campus map to help students find possible matches.",
      "Added private ownership questions, claim checks and messaging to support the handover."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/findr-cloud/blob/main/docs/reports-and-presentations/ctai-findr-project-report.docx"
      }
    ]
  },
  "churnguard": {
    "demo": "https://hannan-noor-repo-urnb4gmsdju7kjo5dz585d.streamlit.app/",
    "demoLabel": "Try ChurnGuard live",
    "gallery": [
      {
        "src": "assets/walkthroughs/churnguard-05.webp",
        "title": "From customer details to a risk estimate",
        "caption": "Changing the customer inputs updates the churn score. The dashboard also shows revenue at risk and the customer’s position relative to the dataset’s churn rate.",
        "width": 1135,
        "height": 934,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/churnguard-04.webp",
        "title": "Explain the score and explore scenarios",
        "caption": "The interface separates factors that raise and lower the model score, then compares possible retention scenarios. These are modelled associations, not evidence that changing a contract will cause a customer to stay.",
        "width": 1171,
        "height": 853,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/churnguard-06.webp",
        "title": "Compare a different customer profile",
        "caption": "A second saved app view demonstrates how the score and suggested levers change with the customer profile. Screenshots document the submitted version; the live app may take a moment to wake up.",
        "width": 1717,
        "height": 1536,
        "portrait": false
      }
    ],
    "details": [
      "Prepared the telco dataset and engineered features including tenure bands, service counts and average spend.",
      "Compared a baseline and candidate classifiers, tuned models and selected Logistic Regression for the final application.",
      "Connected individual predictions, coefficient-based explanations and retention scenarios in Streamlit."
    ],
    "note": "Coursework analysis and a publicly hosted Streamlit app. Retention scenarios show model associations, not proven causal effects.",
    "relatedLinks": [
      {
        "name": "View the project presentation",
        "url": "https://github.com/hannannoor/churnguard/blob/main/docs/reports-and-presentations/mldp-churnguard-pitch.pptx"
      }
    ]
  },
  "findr-mobile": {
    "gallery": [
      {
        "src": "assets/walkthroughs/findr-mobile-30.webp",
        "title": "Sign in before accessing reports",
        "caption": "The Flutter application uses Firebase Authentication. The coursework includes email/password access and external sign-in providers, with validation and account management.",
        "width": 396,
        "height": 870,
        "portrait": true
      },
      {
        "src": "assets/walkthroughs/findr-mobile-31.webp",
        "title": "Review a report before publishing",
        "caption": "A staged form collects item details, location and photographs. The final review brings those fields together before a report is written to Cloud Firestore.",
        "width": 404,
        "height": 860,
        "portrait": true
      },
      {
        "src": "assets/walkthroughs/findr-mobile-36.webp",
        "title": "Explore possible matches",
        "caption": "The AI search flow turns a description of a missing item into a list of possible matches. Students can inspect the report rather than relying on a category alone.",
        "width": 423,
        "height": 860,
        "portrait": true
      },
      {
        "src": "assets/walkthroughs/findr-mobile-39.webp",
        "title": "Keep the search grounded on campus",
        "caption": "Map pins connect item reports to campus locations. This complements the searchable board and the report details.",
        "width": 422,
        "height": 861,
        "portrait": true
      }
    ],
    "relatedLinks": [
      {
        "name": "View the project presentation",
        "url": "https://github.com/hannannoor/findr-mobile/blob/main/docs/reports-and-presentations/mbap-findr-final-presentation.pptx"
      }
    ]
  },
  "supplyr": {
    "gallery": [
      {
        "src": "assets/supplyr-slide-3.svg",
        "title": "Connect the whole reordering process",
        "caption": "The original presentation maps the handoffs from checking stock to preparing purchase orders. UiPath coordinates database, Python and document steps in one workflow."
      },
      {
        "src": "assets/walkthroughs/supplyr-rpa-10.webp",
        "title": "Validate the database before processing",
        "caption": "Pre-flight queries check that required tables and columns exist. A structural problem can then be caught before the robot starts producing documents.",
        "width": 510,
        "height": 487,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/supplyr-rpa-07.webp",
        "title": "Check the generated purchase order",
        "caption": "The document workflow verifies that template placeholders have been replaced. Unresolved placeholders raise an error instead of silently producing an incomplete order.",
        "width": 472,
        "height": 395,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/supplyr-rpa-08.webp",
        "title": "Export a document for the supplier",
        "caption": "The robot reads back the generated purchase-order text and exports the finished document as a PDF. The workflow also includes a Word-file fallback.",
        "width": 795,
        "height": 369,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/supplyr-rpa-13.webp",
        "title": "Record unattended executions",
        "caption": "UiPath job history provides evidence of completed runs. These records make it possible to inspect execution status alongside the generated outputs.",
        "width": 1388,
        "height": 290,
        "portrait": false
      }
    ],
    "relatedLinks": [
      {
        "name": "View the project presentation",
        "url": "https://github.com/hannannoor/supplyr-rpa/blob/main/docs/reports-and-presentations/rpa-supplyr-project-report-revision-5.pptx"
      }
    ]
  },
  "animal-adoption": {
    "gallery": [
      {
        "src": "assets/walkthroughs/animal-adoption-02.webp",
        "title": "Browse animals and narrow the list",
        "caption": "The public listing view combines animal photographs, adoption status and basic details. Species and status filters let visitors focus on relevant listings.",
        "width": 1670,
        "height": 803,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/animal-adoption-10.webp",
        "title": "Inspect an individual animal",
        "caption": "The detail view presents the selected animal’s age, species and other attributes alongside its photographs. This gives visitors more information before they apply.",
        "width": 1435,
        "height": 743,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/animal-adoption-07.webp",
        "title": "Submit an adoption application",
        "caption": "The application form collects contact details and the visitor’s reason for adopting. This screenshot shows the empty form rather than submitted personal information.",
        "width": 937,
        "height": 815,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/animal-adoption-01.webp",
        "title": "Manage listings from the admin view",
        "caption": "The management screen provides edit and delete controls with the current listing status. It connects the interface to the application’s Express routes and relational data.",
        "width": 1148,
        "height": 777,
        "portrait": false
      }
    ],
    "brief": "A full-stack coursework application for browsing animals, submitting adoption applications and managing listings. The report documents both the public journey and the administration screens.",
    "details": [
      "Created a public animal catalogue with filters, detail pages and an adoption application form.",
      "Implemented administration screens for adding, updating and removing animal listings.",
      "Connected the JavaScript frontend to an Express API and MySQL schema."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/animal-adoption/blob/main/docs/adev-dbav-project-2-report.docx"
      }
    ]
  },
  "restaurant-website": {
    "gallery": [
      {
        "src": "assets/walkthroughs/restaurant-website-02.webp",
        "title": "Introduce ByteBite",
        "caption": "The homepage establishes the restaurant concept and a clear route into the menu. These screens are from the submitted static website.",
        "width": 1800,
        "height": 930,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-website-03.webp",
        "title": "Browse the menu",
        "caption": "Food cards show photographs and prices alongside cuisine filters. The page demonstrates the visual ordering flow in HTML and CSS.",
        "width": 1800,
        "height": 930,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-website-04.webp",
        "title": "Show the order-status concept",
        "caption": "The status screen presents an order summary and estimated wait. This is a frontend coursework interface, not evidence of a live ordering service.",
        "width": 1737,
        "height": 901,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-website-16.webp",
        "title": "Design the relational structure",
        "caption": "The ERD links users, stalls, menu items, orders and order details. It shows how the proposed data model supports the screens.",
        "width": 866,
        "height": 703,
        "portrait": false
      }
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/restaurant-website/blob/main/docs/adev-dbav-project-1-report.docx"
      }
    ]
  },
  "transport-fare-calculator": {
    "gallery": [
      {
        "src": "assets/walkthroughs/transport-fare-calculator-05.webp",
        "title": "Plan the decisions before coding",
        "caption": "The flowchart lays out station selection and fare calculation branches. It acts as a bridge between the assignment’s rules and the notebook implementation.",
        "width": 1256,
        "height": 817,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/transport-fare-calculator-02.webp",
        "title": "Check a sample fare calculation",
        "caption": "A student-fare example in the report records a selected trip, distance and calculated fare. It is coursework evidence rather than a current public transport fare quote.",
        "width": 1659,
        "height": 269,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/transport-fare-calculator-06.webp",
        "title": "Summarise a multi-trip journey",
        "caption": "The saved output brings distances, estimated times and transport modes into one trip summary. This demonstrates the project’s journey-planning extension.",
        "width": 885,
        "height": 143,
        "portrait": false
      }
    ],
    "details": [
      "Designed the station-selection and fare-calculation flow before implementing it in Python notebooks.",
      "Extended the program with a discount structure and interconnected-line handling.",
      "Documented additional carbon-emission comparison and trip-summary features."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/transport-fare-calculator/blob/main/docs/comt-project-2-completed-report.docx"
      }
    ]
  },
  "campus-navigation": {
    "gallery": [
      {
        "src": "assets/walkthroughs/campus-navigation-05.webp",
        "title": "Compare routes on the campus map",
        "caption": "The annotated map brings the candidate routes and key destinations into a single view. It supports the report’s explanation of how a route was chosen.",
        "width": 1517,
        "height": 728,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/campus-navigation-06.webp",
        "title": "Turn route choices into decision logic",
        "caption": "The navigation flowchart records the route-selection process. This project focuses on algorithm design and justification rather than a deployed navigation app.",
        "width": 1379,
        "height": 1072,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/campus-navigation-03.webp",
        "title": "Ground the route in the actual campus",
        "caption": "A site photograph records a physical landmark used in the coursework. The report pairs location observations with the map and flowchart.",
        "width": 1600,
        "height": 900,
        "portrait": false
      }
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/campus-navigation/blob/main/docs/submissions/comt-comt-ay2526-project-1.docx"
      }
    ]
  },
  "restaurant-data-analytics": {
    "gallery": [
      {
        "src": "assets/walkthroughs/restaurant-data-analytics-07.webp",
        "title": "Connect preparation, clustering and prediction",
        "caption": "The KNIME workflow shows the sequence of data preparation, transformation and modelling nodes. Keeping the steps connected makes the analysis process inspectable.",
        "width": 1340,
        "height": 655,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-data-analytics-28.webp",
        "title": "Check missing values after preparation",
        "caption": "The statistics view records zero missing values for the selected columns after cleaning. It provides a check on the prepared data before modelling.",
        "width": 744,
        "height": 691,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-data-analytics-49.webp",
        "title": "Explore the customer clusters in Power BI",
        "caption": "The dashboard combines age bands, spending and behavioural measures for a selected cluster. It translates the KNIME clustering output into an interactive summary.",
        "width": 1317,
        "height": 734,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/restaurant-data-analytics-02.webp",
        "title": "Evaluate predictions with error metrics",
        "caption": "The saved evaluation table includes R², absolute error and squared-error measures. These describe the submitted model evaluation rather than real-world restaurant impact.",
        "width": 471,
        "height": 339,
        "portrait": false
      }
    ],
    "brief": "A restaurant-data coursework analysis connecting KNIME preparation, customer clustering and regression with Power BI dashboards. The report traces the work from data checks through visual interpretation.",
    "details": [
      "Prepared restaurant data using missing-value checks, transformations and normalisation in KNIME.",
      "Explored customer clusters and summarised their characteristics in Power BI.",
      "Built and evaluated regression predictions using saved error metrics and residual views."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/restaurant-data-analytics/blob/main/docs/dava-da-assignment-report.docx"
      }
    ]
  },
  "network-design": {
    "gallery": [
      {
        "src": "assets/walkthroughs/network-design-03.webp",
        "title": "Connect the office and warehouse",
        "caption": "The Packet Tracer topology separates the main office and warehouse while showing how their routers, switches and end devices connect.",
        "width": 1338,
        "height": 758,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/network-design-17.webp",
        "title": "Verify automatic address assignment",
        "caption": "A client reports a successful DHCP request. This checks that the configured network can assign an address and gateway to an endpoint.",
        "width": 703,
        "height": 294,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/network-design-15.webp",
        "title": "Test the internal web service",
        "caption": "The simulated browser loads the internal site by name. This is a practical check that the coursework’s DNS and web-service configuration work together.",
        "width": 699,
        "height": 261,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/network-design-19.webp",
        "title": "Check another web destination",
        "caption": "A client browser loads the Cisco Packet Tracer page in the simulated environment. The report uses application-level checks alongside configuration evidence.",
        "width": 704,
        "height": 350,
        "portrait": false
      }
    ],
    "details": [
      "Designed a simulated main-office and warehouse network in Cisco Packet Tracer.",
      "Configured client addressing and network services, including DHCP, DNS and web access.",
      "Documented the topology, configuration choices and connectivity checks in the report."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/network-design/blob/main/docs/nect-network-report.docx"
      }
    ]
  },
  "windows-security-lab": {
    "gallery": [
      {
        "src": "assets/walkthroughs/windows-security-lab-02.webp",
        "title": "Test a restricted file",
        "caption": "A denied attempt to open the file provides evidence that the permission restriction is taking effect. The screenshot shows the observed outcome rather than only a settings page.",
        "width": 759,
        "height": 427,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/windows-security-lab-20.webp",
        "title": "Load the local test service",
        "caption": "The IIS welcome page loads at the virtual-machine lab’s loopback address. This records a running local test service alongside the report’s configuration evidence.",
        "width": 1800,
        "height": 936,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/windows-security-lab-19.webp",
        "title": "Configure the web-service bindings",
        "caption": "IIS bindings show HTTP and HTTPS endpoints in the virtual-machine lab. This forms part of the report’s secure network services setup.",
        "width": 644,
        "height": 381,
        "portrait": false
      },
      {
        "src": "assets/walkthroughs/windows-security-lab-24.webp",
        "title": "Compare a benchmark check before and after",
        "caption": "The report places account-policy results side by side to show remediation evidence. This is a coursework check, not a claim that the entire operating system meets every CIS requirement.",
        "width": 1465,
        "height": 349,
        "portrait": false
      }
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/windows-security-lab/blob/main/docs/cyfun-project-report.docx"
      }
    ]
  },
  "cloud-services-case-study": {
    "gallery": [
      {
        "src": "assets/cloud-migration-diagram.webp",
        "title": "Recommend a staged migration",
        "caption": "The report’s diagram proposes moving from on-premises infrastructure to IaaS while retaining a possible later move to CaaS or PaaS. It communicates a recommendation rather than an implemented migration.",
        "width": 1315,
        "height": 825,
        "portrait": false
      }
    ],
    "details": [
      "Compared cloud service models in terms of operational responsibility, migration effort and vendor dependence.",
      "Recommended IaaS as an initial step for the case study’s existing systems.",
      "Documented the trade-offs and a possible longer-term move towards managed platforms."
    ],
    "relatedLinks": [
      {
        "name": "Read the project report",
        "url": "https://github.com/hannannoor/cloud-services-case-study/blob/main/docs/cloud-services-group-report.docx"
      }
    ]
  },
  "skip": {
    "gallery": [
      {
        "src": "assets/skip-gameplay.webp",
        "title": "Choices inside the story",
        "caption": "A scene from SKIP’s branching narrative. Character interactions and the escape mechanic explore how short-term decisions can affect relationships and responsibilities.",
        "width": 1500,
        "height": 844,
        "portrait": false
      },
      {
        "src": "assets/skip-building.webp",
        "title": "Build a complete game as a team",
        "caption": "Working with two teammates at the Anti-Drug Game Jam associated with SCOGA. The team combined story, interface and browser-game development.",
        "width": 1280,
        "height": 1600,
        "portrait": false
      },
      {
        "src": "assets/skip-team.webp",
        "title": "Publish the finished game",
        "caption": "The team completed and published SKIP on itch.io after the jam. We did not qualify for the finals; visitors can play the released game using the link below.",
        "width": 900,
        "height": 1600,
        "portrait": false
      }
    ]
  },
  "dsag-queues": {
    "gallery": [
      {
        "src": "assets/dsag-queue-layout.webp",
        "title": "Model the queue and seating arrangement",
        "caption": "The original notebook’s layout diagram makes the simulated environment visible. It supports the accompanying queue logic and written analysis.",
        "width": 1304,
        "height": 730,
        "portrait": false
      }
    ]
  },
  "food-ordering-system": {
    "gallery": [
      {
        "src": "assets/food-ordering-menu-output.webp",
        "title": "Run the ordering menu",
        "caption": "This is saved output from the original Python notebook. The program uses a console-style menu rather than a graphical web interface.",
        "width": 1080,
        "height": 614,
        "portrait": false
      }
    ]
  }
};
export function enrichCaseStudies(projects,events){
 for(const project of projects){
  const study=studies[project.id];if(!study)continue;
  const links=[...(project.relatedLinks||[]),...(study.relatedLinks||[])];
  Object.assign(project,study,{relatedLinks:links});
 }
 events.find(e=>e.id==='iitsc').name='IIT Studies Club';

 const club=events.find(e=>e.id==='tabletop');
 club.details.push('Club activities include tabletop role-playing, regular game sessions and beginner-friendly learn-to-play sessions.');
 club.gallery.push(
  {src:'assets/walkthroughs/tabletop-halloween-recap-2026.webp',title:'A first Halloween together',caption:'The club’s first Halloween event brought costumes and tabletop play together on 29 October 2026.',width:1440,height:1440,source:{name:'Photo: @tp_tabletopwizards · Halloween recap',url:'https://www.instagram.com/tp_tabletopwizards/p/DfSA_8royVS/'}},
  {src:'assets/walkthroughs/tabletop-mtg-session-2026-1.webp',title:'Learn a new game together',caption:'Members at the Magic: The Gathering learn-to-play and regular session on 19 November 2026.',width:1440,height:1439,source:{name:'Photo: @tp_tabletopwizards · 19 November session',url:'https://www.instagram.com/tp_tabletopwizards/p/Df8p4jeo6bV/'}},
  {src:'assets/walkthroughs/tabletop-mtg-session-2026-2.webp',title:'Make space for regular play',caption:'Another view from the same session. Regular meetups give members a place to learn, play and connect.',width:1440,height:1439,source:{name:'Photo: @tp_tabletopwizards · 19 November session',url:'https://www.instagram.com/tp_tabletopwizards/p/Df8p4jeo6bV/'}}
 );
 club.links=[{name:'Visit Tabletop Wizards on Instagram',url:'https://www.instagram.com/tp_tabletopwizards/'}];
 const mkc=events.find(e=>e.id==='mens-kaki-club');
 mkc.story=[
  {title:'Start by listening',body:'Our team explored how Active Ageing Centre programmes could feel more welcoming to men aged 55 and above. Interviews and fieldwork pointed towards active, social experiences and a stronger sense of belonging.'},
  {title:'Design for friendship and purpose',body:'Men’s Kaki Club combined the idea of a regular recreational group with opportunities to contribute to the community. The wider proposal included activities such as nature walks, workshops and strength and conditioning; these were proposed directions rather than a claim that every activity was delivered.'},
  {title:'Put an activity into practice',body:'I helped organise a coach-led fitness and conditioning session with Precious Active Ageing Centre, working with teammates and community partners on the arrangements. The pilot gave us something practical to build on, alongside the team’s wider programme concept.'},
  {title:'Recognise the team effort',body:'Our project won first place at Leaders of Tomorrow Hackathon 2026. Working across courses and backgrounds taught me to connect an idea with the people, partners and event planning needed to carry it out.'}
 ];
 mkc.gallery.push(
  {src:'assets/walkthroughs/mkc-problem.webp',title:'The challenge we worked on',caption:'The problem statement from our original team presentation: make programmes more appealing and welcoming to older men, with meaningful social connections.',width:1600,height:900},
  {src:'assets/walkthroughs/mkc-concept.webp',title:'The wider club concept',caption:'The presentation connects shared activities with identity and purpose. This slide describes the proposed programme; the coach-led fitness session was the activity I helped organise.',width:1600,height:900}
 );
 mkc.links=[{name:'My hackathon reflection on LinkedIn',url:'https://www.linkedin.com/feed/update/urn:li:activity:7514309382550065152/'}];
}
