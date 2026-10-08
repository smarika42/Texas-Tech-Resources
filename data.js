/* ---------- Concept map: each concept lists words people actually type ---------- */
var CONCEPTS = {
  fitness:"workout work out exercise exercising gym fitness train training lift lifting weights weight strength muscle sweat active athletic wellness health body fit swole",
  cardio:"cardio aerobic hiit kickboxing kickbox boxing treadmill running run jog cycling cycle spin endurance heart burn calories f45 intense hard conditioning",
  mindbody:"yoga pilates barre stretch flexibility core abs relax massage mobility reformer",
  swim:"swim swimming pool aquatic water lap laps lifeguard",
  outdoors:"outdoor outdoors hiking hike camping climbing climb trip adventure kayak canoe rental gear",
  sports:"sport sports intramural intramurals league team club compete competition game play pickup basketball soccer volleyball flag football",
  mental:"stress stressed stressful anxiety anxious depressed depression sad lonely loneliness overwhelmed panic therapy therapist counseling counselor mental feelings cope coping burnout mood talk worried worry sleep",
  crisis:"emergency crisis suicide suicidal danger unsafe assault abuse harassment harassed police urgent hurt safety stalking violence",
  medical:"doctor sick ill clinic medical nurse vaccine flu injury pharmacy checkup physician health insurance",
  recovery:"addiction sober sobriety alcohol drinking drugs substance recovery quit",
  academic:"tutor tutoring study studying homework grades class course exam test math chemistry subject learn learning supplemental",
  writing:"write writing paper essay thesis draft citation grammar proofread",
  library:"library book books research article journal borrow reserve textbook free textbook oer database",
  career:"job jobs career resume cv internship interview employment hire hiring work on campus part-time fair professional",
  money:"money budget broke debt loan loans pay bill bills tuition scholarship financial aid afford cost coaching saving credit",
  food:"food hungry eat eating meal meals dining groceries pantry snack lunch dinner breakfast order restaurant",
  housing:"housing dorm dorms residence hall roommate room living apartment live",
  legal:"lawyer legal lease contract ticket court attorney rights landlord",
  transport:"ride rides bus transport transportation parking car walk home safe late night shuttle",
  abroad:"abroad study abroad travel exchange country passport",
  international:"international visa immigration foreign esl orientation isss",
  tech:"3d print printer printing vr virtual reality animation scan scanner laptop equipment checkout camera tech technology makerspace maker",
  media:"podcast record recording studio music audio mic video",
  clubs:"club clubs organization organizations org join friends involved involvement community meet people events greek fraternity sorority social",
  fun:"fun entertainment movie movies film game day gameday football basketball tickets spirit things to do bored photos pictures",
  volunteer:"volunteer volunteering service give back community service catering",
  disability:"disability disabilities accommodation accommodations accessible accessibility adhd learning disability",
  conduct:"conduct discipline hearing violation title ix discrimination misconduct complaint report",
  news:"news announcements updates campus now events info"
};
var CONCEPT_LABEL = {fitness:"fitness",cardio:"cardio",mindbody:"yoga & pilates",swim:"swimming",outdoors:"outdoors",sports:"sports",mental:"mental health",crisis:"safety & crisis",medical:"medical",recovery:"recovery",academic:"tutoring & study",writing:"writing",library:"library",career:"careers",money:"money",food:"food",housing:"housing",legal:"legal",transport:"getting around",abroad:"study abroad",international:"international",tech:"tech & making",media:"media",clubs:"clubs",fun:"fun",volunteer:"volunteering",disability:"accessibility",conduct:"campus policy",news:"campus news"};
/* Related concepts: searching one pulls in weaker matches from the other */
var RELATED = {cardio:["fitness"],mindbody:["fitness"],swim:["fitness"],sports:["fitness"],outdoors:["fitness"],crisis:["mental"],mental:["medical"],recovery:["mental"],career:["money"],writing:["academic"],library:["academic"]};

/* ---------- Resources ---------- */
var REC = "https://www.depts.ttu.edu/recreation/";
var R = [
/* Fitness & Rec */
{n:"University Recreation",cat:"Fitness & Rec",d:"The Rec is your home for working out on campus. It runs the gym spaces, group fitness, personal training, intramurals, sport clubs, outdoor trips and the pool. Start here for hours, memberships and everything below.",u:REC,c:["fitness","cardio","sports"],t:"rec center gym membership hours weight room cardio equipment",cta:"Visit the Rec website"},
{n:"Free & Paid Group Fitness Classes",cat:"Fitness & Rec",d:"The Rec offers free and paid group fitness classes, including Pilates, Barre, Yoga and Kickboxing, taught by certified instructors and open to beginners. Classes marked \"Red Classes\" require a paid membership.",u:REC+"fitwell/class-schedule.php",c:["fitness","cardio","mindbody"],t:"group fitness schedule calendar classes free",cta:"See the class schedule and sign up",pick:1},
{n:"Cardio Kickboxing",cat:"Fitness & Rec",d:"Kickboxing is part of the Rec's group fitness lineup and is one of the best cardio workouts you can do on campus. It is offered weekly, so open the live class calendar to see this week's day and time.",u:REC+"fitwell/class-schedule.php",c:["cardio","fitness"],t:"kickboxing cardio boxing punch burn calories hiit class",cta:"Find this week's kickboxing class",pick:1},
{n:"F45 Texas Tech",cat:"Fitness & Rec",d:"High-intensity, team-style workouts in the university's own F45 studio. Sessions mix cardio and strength circuits, so you sweat hard and a coach keeps you moving. Check the page for pricing and booking.",u:REC+"fitwell/f45.php",c:["cardio","fitness"],t:"f45 hiit circuit interval studio high intensity",cta:"Learn more or sign up for F45",pick:1},
{n:"Fitness & Wellness",cat:"Fitness & Rec",d:"The hub for everything fitness at the Rec: classes, training, massage and wellness programs, all in one landing page.",u:REC+"UREC_DEPT_LANDING_PAGES/FITWELL_LANDING.php",c:["fitness","cardio","mindbody"],t:"fitwell wellness programs workout",cta:"Browse Fitness & Wellness"},
{n:"Reformer Pilates",cat:"Fitness & Rec",d:"Small-group Pilates on reformer machines. Good for core strength, posture and low-impact conditioning.",u:REC+"fitwell/pilates.php",c:["mindbody","fitness"],t:"reformer pilates core strength low impact",cta:"Learn more about Reformer Pilates"},
{n:"Personal Training",cat:"Fitness & Rec",d:"Certified trainers build a custom exercise plan around your goals, whether that is losing weight, building muscle or training for cardio endurance.",u:REC+"fitwell/personaltraining.php",c:["fitness","cardio"],t:"trainer coach plan goals lifting weight loss",cta:"Book personal training"},
{n:"Massage Therapy & Spa",cat:"Fitness & Rec",d:"Professional massage for tension, stress and sore muscles. Appointments are booked by phone at 806.742.3351.",u:REC+"fitwell/massagetherapy.php",c:["mindbody","mental"],t:"massage relax sore muscles spa recovery",cta:"See massage options"},
{n:"Fitness on Demand",cat:"Fitness & Rec",d:"Request a fitness class, chair massages or a wellness speaker for your office, residence hall, Greek house or classroom.",u:REC+"fitwell/fitness-on-demand.php",c:["fitness","clubs"],t:"request class group event hall greek",cta:"Request a session"},
{n:"Fitness Certification Courses",cat:"Fitness & Rec",d:"Earn a fitness credential through the Raider Fitness Institute. Courses run throughout the year.",u:REC+"fitwell/raiderfitnessinstitute.php",c:["fitness","career"],t:"certification personal trainer instructor course institute",cta:"View certification courses"},
{n:"Intramural Sports",cat:"Fitness & Rec",d:"Sign up solo or with a team for casual leagues and tournaments. A good way to stay active and meet people.",u:REC+"intramurals/imregistration.php",c:["sports","fitness","clubs"],t:"intramurals league flag football basketball volleyball soccer team",cta:"Register for intramurals"},
{n:"Sport Clubs",cat:"Fitness & Rec",d:"Competitive club teams that travel and compete against other universities, from beginner-friendly to serious.",u:REC+"UREC_DEPT_LANDING_PAGES/SPORT_SPC_LANDING.php",c:["sports","clubs","fitness"],t:"club team compete travel tournament",cta:"Explore sport clubs"},
{n:"Aquatics",cat:"Fitness & Rec",d:"Swimming and pool programs at the Rec, including lap swimming and aquatic activities.",u:REC+"UREC_DEPT_LANDING_PAGES/AQ_LANDING.php",c:["swim","fitness","cardio"],t:"pool swim laps lifeguard water",cta:"Visit Aquatics"},
{n:"Outdoor Pursuits",cat:"Fitness & Rec",d:"Guided trips, gear rentals and a climbing wall for getting off campus and into the outdoors.",u:REC+"UREC_DEPT_LANDING_PAGES/OPC_LANDING.php",c:["outdoors","fitness"],t:"hiking camping climbing rental gear trips adventure",cta:"Explore Outdoor Pursuits"},
{n:"Summer Youth Programs",cat:"Fitness & Rec",d:"Camps and activities for kids run through University Recreation each summer. Useful if you are a parent or work with youth.",u:REC+"UREC_DEPT_LANDING_PAGES/SYP_Landing.php",c:["sports","volunteer"],t:"camp kids children summer youth",cta:"See summer programs"},

/* Mental Health */
{n:"MindSpa",cat:"Mental Health",d:"A self-help space from the Student Counseling Center with tools to relax and reset between classes.",u:"https://www.depts.ttu.edu/scc/self-help-resources/mindspa/",c:["mental"],t:"relax self help calm meditation break",cta:"Visit MindSpa"},
{n:"Individual Counseling",cat:"Mental Health",d:"Brief one-on-one counseling with a licensed counselor for stress, anxiety, relationships and anything else on your mind.",u:"https://www.depts.ttu.edu/scc/treatment-services/brief-individual-counseling/index.php",c:["mental"],t:"therapy counselor appointment talk scc",cta:"Learn about counseling and schedule"},
{n:"Group Therapy",cat:"Mental Health",d:"Counselor-led groups where you work through shared challenges alongside other students.",u:"https://www.depts.ttu.edu/scc/treatment-services/group-therapy/",c:["mental"],t:"group support therapy peers",cta:"See group options"},
{n:"Couple, Marriage & Family Therapy",cat:"Mental Health",d:"Therapy for couples, families and relationship concerns, provided through the Human Sciences clinic.",u:"https://www.depts.ttu.edu/hs/mft/",c:["mental"],t:"couples marriage family relationship therapy",cta:"Learn about MFT services"},
{n:"Therapy Assistance Online (TAO)",cat:"Mental Health",d:"Free online lessons and exercises for stress, anxiety, mood and more, available any time on your own schedule.",u:"https://www.depts.ttu.edu/scc/tao/index.php",c:["mental"],t:"online self help cbt anxiety depression free app",cta:"Start with TAO"},
{n:"Manage Your Mood",cat:"Mental Health",d:"A skills workshop that teaches practical ways to handle stress, anxiety and low mood.",u:"https://www.depts.ttu.edu/scc/treatment-services/manage-your-mood/index.php",c:["mental"],t:"workshop skills mood anxiety stress",cta:"Join Manage Your Mood"},
{n:"Student Mental Health Community",cat:"Mental Health",d:"A RISE community for students who care about mental health, with events and peer connection.",u:"https://www.depts.ttu.edu/rise/smhc.php",c:["mental","clubs"],t:"peer community awareness events",cta:"Join the community"},
{n:"Mentor Tech",cat:"Mental Health",d:"Get matched with a mentor who can help you settle in, find your footing and connect to campus.",u:"https://www.depts.ttu.edu/studentengagement/mentortech/MentorTech.php",c:["mental","clubs","academic"],t:"mentor mentoring guidance new student transition",cta:"Find a mentor"},
{n:"TTU CARE Team",cat:"Mental Health",d:"Worried about yourself or another student? The CARE Team connects you with support, and you can submit a report.",u:"https://www.depts.ttu.edu/studenthealth/includes/MyTeamCare/",c:["mental","crisis"],t:"care report concern worried friend behavior",cta:"Make a CARE report"},

/* Physical Health */
{n:"Student Wellness Center",cat:"Physical Health",d:"Campus health care, wellness education and prevention in one place.",u:"https://www.depts.ttu.edu/studenthealth/",c:["medical","fitness","mental"],t:"health clinic student health services doctor sick",cta:"Visit the Wellness Center"},
{n:"TTU Physicians",cat:"Physical Health",d:"Texas Tech's physician practice for medical care beyond the campus clinic.",u:"https://www.texastechphysicians.com/",c:["medical"],t:"doctor appointment specialist clinic",cta:"Find a physician"},

/* Academics */
{n:"Tutoring & The Learning Center",cat:"Academics",d:"Free tutoring and study support for many courses, plus workshops on study skills.",u:"http://depts.ttu.edu/provost/aiss/learning-center/",c:["academic"],t:"tutor help math chemistry study skills free",cta:"Get a tutor"},
{n:"Supplemental Instruction (SI) Sessions",cat:"Academics",d:"Regular peer-led study sessions for tough courses, led by students who already earned a strong grade.",u:"https://www.depts.ttu.edu/provost/aiss/supplemental-instruction/",c:["academic"],t:"si study group peer exam review",cta:"Find an SI session"},
{n:"University Writing Center",cat:"Academics",d:"Free feedback from trained consultants on any paper, from brainstorming to final draft.",u:"https://www.depts.ttu.edu/provost/uwc/",c:["writing","academic"],t:"essay paper thesis proofread citations feedback",cta:"Book a writing consultation"},
{n:"University Career Center",cat:"Academics",d:"Resume reviews, mock interviews, career fairs and job search help for every major.",u:"https://www.depts.ttu.edu/careercenter/",c:["career"],t:"resume interview internship job fair handshake",cta:"Visit the Career Center"},
{n:"University Libraries",cat:"Academics",d:"Study spaces, research help, books, databases and equipment checkout.",u:"https://www.depts.ttu.edu/library/",c:["library","academic","tech"],t:"study room quiet books research librarian",cta:"Visit the Library"},
{n:"Course Reserves",cat:"Academics",d:"Borrow required textbooks and course materials from the library for short loans, so you can skip buying them.",u:"https://www.depts.ttu.edu/library/coursereserve/",c:["library","money"],t:"textbook borrow free course materials",cta:"Search course reserves"},
{n:"Open Educational Resources (OER)",cat:"Academics",d:"Free and low-cost course materials that can replace expensive textbooks.",u:"https://www.depts.ttu.edu/library/oer/index.php",c:["library","money"],t:"free textbook open cheap",cta:"Browse OER"},
{n:"Library Courses",cat:"Academics",d:"Short classes on research skills, citations and finding sources.",u:"https://www.depts.ttu.edu/library/research-support/courses/index.php",c:["library","academic","writing"],t:"research skills citations sources instruction",cta:"See library courses"},

/* Wellness & Support */
{n:"Student Disability Services",cat:"Wellness & Support",d:"Academic accommodations and support for students with documented disabilities.",u:"https://www.depts.ttu.edu/sds/",c:["disability","academic"],t:"accommodations adhd extra time accessibility",cta:"Request accommodations"},
{n:"Risk Intervention & Safety Education (RISE)",cat:"Wellness & Support",d:"Education and support around alcohol, drugs, mental health and staying safe.",u:"https://www.depts.ttu.edu/rise/",c:["mental","recovery","crisis"],t:"prevention safety alcohol drugs wellness education",cta:"Explore RISE"},
{n:"Center for Students in Addiction Recovery",cat:"Wellness & Support",d:"A supportive community for students in or seeking recovery from addiction.",u:"https://www.depts.ttu.edu/hs/csa/",c:["recovery"],t:"sober sobriety substance alcohol drugs recovery support",cta:"Visit the recovery center"},
{n:"Raider Restart",cat:"Wellness & Support",d:"Support for students who want to restart after a hard semester or a break in their studies.",u:"https://www.depts.ttu.edu/rise/RaiderRestart.php",c:["recovery","mental","academic"],t:"restart return comeback fresh start",cta:"Learn about Raider Restart"},
{n:"Dean of Students",cat:"Wellness & Support",d:"Help navigating campus problems, from family emergencies to a bad semester.",u:"https://www.depts.ttu.edu/dos/",c:["mental","conduct"],t:"dean support absence emergency navigate",cta:"Contact the Dean of Students"},
{n:"Campus Access & Engagement",cat:"Wellness & Support",d:"Programs that connect students to campus life and the supports they need to feel at home.",u:"https://www.depts.ttu.edu/access-engagement/",c:["clubs","disability"],t:"access engagement belonging inclusion",cta:"Visit Access & Engagement"},
{n:"Texas Tech Now",cat:"Wellness & Support",d:"The official hub for campus news, alerts and updates.",u:"https://www.ttu.edu/now/",c:["news"],t:"alerts updates announcements weather closure",cta:"Check Texas Tech Now"},

/* Emergency & Safety */
{n:"Texas Tech Police Department",cat:"Emergency & Safety",d:"Campus police, 24 hours a day. Call 911 for emergencies. Also see safety escorts and reporting options.",u:"https://www.depts.ttu.edu/ttpd/",c:["crisis","transport"],t:"police safety escort emergency report theft",cta:"Visit TTPD",help:1},
{n:"Crisis Intervention Services",cat:"Emergency & Safety",d:"Immediate mental health support when you or a friend is in crisis.",u:"https://www.depts.ttu.edu/scc/crisis-intervention-services/",c:["crisis","mental"],t:"suicide crisis hotline urgent counselor emergency",cta:"Get crisis support",help:1},
{n:"Title IX & Student Civil Rights",cat:"Emergency & Safety",d:"Report or get help with sexual misconduct, harassment, stalking or discrimination.",u:"https://www.depts.ttu.edu/titleix/",c:["crisis","conduct"],t:"title ix assault harassment discrimination report stalking",cta:"Learn about reporting and support",help:1},
{n:"Raider Relief Advocacy & Resource Center",cat:"Emergency & Safety",d:"Help with emergencies like food, housing or crisis, and connections to the right services.",u:"https://www.depts.ttu.edu/raiderrelief/",c:["crisis","food","money"],t:"emergency assistance advocacy basic needs",cta:"Ask Raider Relief for help",help:1},
{n:"Office of Student Conduct",cat:"Emergency & Safety",d:"Explains the student code of conduct and what happens if a conduct concern is raised.",u:"https://www.depts.ttu.edu/studentconduct/",c:["conduct"],t:"code of conduct discipline hearing violation",cta:"Read about Student Conduct"},

/* Food */
{n:"Red Raiders Food Pantry",cat:"Food",d:"Free groceries for students who need them. No long process, just stop by.",u:"https://www.depts.ttu.edu/raiderrelief/foodpantry.php",c:["food","money","crisis"],t:"free food pantry groceries hungry",cta:"Find pantry hours and location",help:1},
{n:"Dining Hall Hours",cat:"Food",d:"Open hours for every dining hall and eatery on campus.",u:"https://www.depts.ttu.edu/hospitality/dining_hours.php",c:["food"],t:"dining hall menu meal plan hours eat",cta:"Check dining hours"},
{n:"Mobile Ordering (Transact)",cat:"Food",d:"Order from campus restaurants on your phone and skip the line.",u:"https://www.depts.ttu.edu/hospitality/Transact.php",c:["food","tech"],t:"mobile order app pickup skip line",cta:"Set up mobile ordering"},

/* Money */
{n:"Red to Black Peer Financial Coaching",cat:"Money",d:"Free one-on-one coaching with a trained peer on budgeting, debt and saving.",u:"https://www.depts.ttu.edu/r2b/",c:["money"],t:"budget debt credit saving coaching free",cta:"Book a coaching session"},
{n:"Student Business Services",cat:"Money",d:"Pay your bill, set up payment plans and manage your student account.",u:"https://www.depts.ttu.edu/studentbusinessservices/",c:["money"],t:"tuition bill payment plan refund account",cta:"Manage your account"},
{n:"Financial Aid & Scholarships",cat:"Money",d:"Apply for FAFSA, scholarships and grants, and check your aid status.",u:"https://www.depts.ttu.edu/financialaid/",c:["money"],t:"fafsa scholarship grant loans aid",cta:"Explore aid and scholarships"},

/* Legal */
{n:"Student Legal Services",cat:"Legal",d:"Free legal advice for students on leases, tickets, contracts and more.",u:"https://www.depts.ttu.edu/sls/",c:["legal"],t:"lawyer attorney lease landlord ticket free advice",cta:"Talk to Student Legal Services"},

/* Getting around */
{n:"Raider Ride",cat:"Getting Around",d:"Free on-demand rides around campus, handy for late nights or bad weather.",u:"https://www.depts.ttu.edu/parking/InformationFor/MobilitySolutions/RaiderRide.php",c:["transport"],t:"free ride shuttle late night safe walk",cta:"Learn how to request a ride"},
{n:"Study Abroad",cat:"Getting Around",d:"Study in another country for a semester, a summer or a short program.",u:"https://www.depts.ttu.edu/international/studyabroad/",c:["abroad"],t:"travel overseas exchange programs scholarships",cta:"Explore study abroad"},

/* Tech & Maker */
{n:"Makerspace",cat:"Tech & Maker",d:"Hands-on space with 3D printers and tools for building prototypes and projects.",u:"https://www.depts.ttu.edu/library/make/index.php",c:["tech"],t:"3d printing build prototype tools laser",cta:"Visit the Makerspace"},
{n:"3D Animation Lab",cat:"Tech & Maker",d:"Workstations and software for 3D modeling and animation work.",u:"https://www.depts.ttu.edu/library/3d-animation-lab/index.php",c:["tech","media"],t:"3d animation modeling software computers",cta:"See lab details"},
{n:"VR Lab",cat:"Tech & Maker",d:"Try virtual reality headsets for class projects or for fun.",u:"https://www.depts.ttu.edu/library/vrlab/index.php",c:["tech"],t:"virtual reality headset",cta:"Book the VR Lab"},
{n:"Anatomy Models",cat:"Tech & Maker",d:"Borrow anatomical models for studying.",u:"https://www.depts.ttu.edu/library/access-services/anatomy-models.php",c:["tech","academic"],t:"anatomy models biology nursing study borrow",cta:"See available models"},
{n:"Podcast Studio",cat:"Tech & Maker",d:"A sound-treated studio for recording podcasts and interviews.",u:"https://www.depts.ttu.edu/library/podcast-studio/index.php",c:["media","tech"],t:"podcast record interview microphone audio",cta:"Reserve the Podcast Studio"},
{n:"Crossroads Recording Studio",cat:"Tech & Maker",d:"A professional-style studio for recording music and audio.",u:"https://www.depts.ttu.edu/library/crossroadsrecordingstudio/index.php",c:["media","tech"],t:"music recording band audio studio",cta:"Reserve Crossroads"},
{n:"Print & Scan",cat:"Tech & Maker",d:"Printers and scanners in the library for papers, posters and documents.",u:"https://www.depts.ttu.edu/library/technology/spc.php",c:["tech","library"],t:"print scan copy poster paper",cta:"Find print and scan locations"},
{n:"Equipment Checkout",cat:"Tech & Maker",d:"Borrow laptops, cameras, chargers and other gear from the library.",u:"https://www.depts.ttu.edu/library/access-services/equipment.php",c:["tech","library"],t:"laptop camera charger borrow loan",cta:"See what you can borrow"},
{n:"Research Park",cat:"Tech & Maker",d:"Texas Tech's research park, where students and companies work on new ideas and technology.",u:"https://www.depts.ttu.edu/research/research-park/",c:["tech","career"],t:"research startup innovation companies",cta:"Explore the Research Park"},

/* Fun */
{n:"Student Union Movies",cat:"Fun",d:"Watch movies on campus through Student Union and Activities.",u:"https://www.depts.ttu.edu/sub/Activities/movies/index.php",c:["fun"],t:"movies film showing free cinema",cta:"See the movie schedule"},
{n:"Student Photos on Flickr",cat:"Fun",d:"Photo albums from student events around campus.",u:"https://www.flickr.com/photos/ttustudents/albums/72177720320222445/",c:["fun"],t:"photos pictures albums events",cta:"Browse the photos"},
{n:"Gameday 2025",cat:"Fun",d:"Everything for a Red Raider football gameday.",u:"https://texastech.com/feature/gameday-2025",c:["fun","sports"],t:"football game day tailgate stadium tickets",cta:"Plan your gameday"},
{n:"Men's Basketball",cat:"Fun",d:"Schedules, rosters and tickets for Red Raider basketball.",u:"https://texastech.com/sports/mens-basketball",c:["fun","sports"],t:"basketball schedule tickets games",cta:"See the schedule"},

/* Clubs & Orgs */
{n:"Engage (Raiderlink)",cat:"Clubs & Orgs",d:"Your front door to student life: organizations, events and campus involvement in one login.",u:"https://ttu.campuslabs.com/engage/",c:["clubs","fun"],t:"involvement join organizations events campuslabs",cta:"Open Engage"},
{n:"Student Organizations Directory",cat:"Clubs & Orgs",d:"Search hundreds of student organizations by interest, then see each one's contact and social links.",u:"https://ttu.campuslabs.com/engage/organizations",c:["clubs"],t:"clubs join greek academic cultural interest",cta:"Find an organization"},
{n:"Campus Events",cat:"Clubs & Orgs",d:"A live calendar of events happening on campus this week.",u:"https://ttu.campuslabs.com/engage/events",c:["clubs","fun"],t:"events calendar this week things to do",cta:"See upcoming events"},

/* Volunteering */
{n:"Hospitality Services Catering Volunteering",cat:"Volunteering",d:"Work and volunteer opportunities through campus catering and events.",u:"https://www.depts.ttu.edu/hospitality/catering.php",c:["volunteer","career","food"],t:"catering events volunteer serve",cta:"Learn about catering opportunities"},
{n:"PPHC Volunteering",cat:"Volunteering",d:"Volunteer opportunities listed through the PPHC programs page.",u:"https://www.depts.ttu.edu/pphc/programs/Volunteering.php",c:["volunteer"],t:"volunteer service community hours",cta:"Find volunteer opportunities"},

/* Jobs */
{n:"Work at Texas Tech",cat:"Jobs",d:"Browse job openings across the university.",u:"https://www.depts.ttu.edu/hr/workattexastech/",c:["career","money"],t:"jobs hiring employment human resources part time",cta:"Search jobs"},
{n:"Hospitality Services Jobs",cat:"Jobs",d:"Jobs in campus dining and catering.",u:"https://www.depts.ttu.edu/hospitality/jobs.php",c:["career","food","money"],t:"dining jobs cook cashier catering",cta:"Apply with Hospitality"},
{n:"Work for Housing",cat:"Jobs",d:"Jobs in residence halls, including resident assistants and front desk roles.",u:"https://www.depts.ttu.edu/housing/workforhousing.php",c:["career","housing","money"],t:"ra resident assistant front desk dorm job",cta:"See housing jobs"},
{n:"Student Union Jobs",cat:"Jobs",d:"Work at the Student Union and help run campus events and activities.",u:"https://www.depts.ttu.edu/sub/jobs.php",c:["career","money"],t:"student union job events part time",cta:"Apply at the Student Union"},
{n:"University Recreation Jobs",cat:"Jobs",d:"Work at the Rec as a lifeguard, front desk worker, trainer or instructor.",u:"https://www.depts.ttu.edu/recreation/facilities/employment.php",c:["career","fitness","money"],t:"rec job lifeguard instructor front desk gym",cta:"Apply at the Rec"},
{n:"Strategic Research Hiring",cat:"Jobs",d:"Research positions for students who want lab and project experience.",u:"https://www.depts.ttu.edu/research/strategicresearch/hiring/",c:["career","tech"],t:"research assistant lab hiring",cta:"See research openings"},

/* International */
{n:"International Affairs",cat:"International Students",d:"Visa help, immigration advising and support for international students and scholars.",u:"https://www.depts.ttu.edu/international/",c:["international"],t:"visa immigration isss i-20 international office",cta:"Visit International Affairs"},
{n:"International Orientation",cat:"International Students",d:"Orientation to help new international students arrive prepared.",u:"http://depts.ttu.edu/international/isss/studentlife/InternationalOrientation/index.php",c:["international"],t:"orientation new arrive welcome",cta:"See orientation info"},
{n:"International Staff Directory",cat:"International Students",d:"Find the right advisor for international students and scholars.",u:"https://www.depts.ttu.edu/international/StaffDirectory/#Internationalstudentsandscholars",c:["international"],t:"contact advisor staff email",cta:"Find a contact"},
{n:"Global Guides",cat:"International Students",d:"Guides for living and studying in Lubbock as an international student.",u:"https://www.depts.ttu.edu/international/isss/studentlife/global-guides/index.php",c:["international","clubs"],t:"guide living lubbock culture",cta:"Read the Global Guides"},

/* Housing */
{n:"Housing & Residence Life",cat:"Housing",d:"On-campus housing, roommates, hall life and move-in information.",u:"https://www.depts.ttu.edu/housing/",c:["housing"],t:"dorm residence hall roommate apply room",cta:"Visit Housing"}
];

/* Social section (also searchable) */
var S = [
{n:"Texas Tech University",d:"The main university accounts for news, athletics highlights and campus life.",links:[["Instagram","https://www.instagram.com/texastech/"],["X","http://www.x.com/texastech/"],["Facebook","https://www.facebook.com/TexasTechUniversity/"],["YouTube","http://www.youtube.com/user/texastech/"],["LinkedIn","http://www.linkedin.com/companies/texas-tech-university"]],t:"instagram social media follow official"},
{n:"University Recreation",d:"Follow the Rec for class updates and events. The Rec's own page lists its current social links, and you can call 806.742.3351 or email recreation@ttu.edu.",links:[["Rec website","https://www.depts.ttu.edu/recreation/"],["Rec contact","https://www.depts.ttu.edu/urec/contact.php"]],t:"rec instagram fitness classes follow social"},
{n:"University Libraries",d:"Library news, hours and events. Use the Follow Us links on the library site.",links:[["Library website","https://www.depts.ttu.edu/library/"]],t:"library instagram follow social"},
{n:"Student Organizations",d:"Every organization lists its own Instagram, email or group chat on its page. Search by interest and follow the ones you like.",links:[["Organizations","https://ttu.campuslabs.com/engage/organizations"],["Events","https://ttu.campuslabs.com/engage/events"]],t:"clubs orgs instagram groupme discord follow"},
{n:"Red Raider Athletics",d:"Scores, schedules and tickets for every Red Raider team.",links:[["texastech.com","https://texastech.com/"],["Gameday","https://texastech.com/feature/gameday-2025"]],t:"athletics sports tickets scores football basketball follow"},
{n:"Texas Tech Now",d:"Campus news and stories from Texas Tech.",links:[["Texas Tech Now","https://today.ttu.edu/"],["Campus alerts","https://www.ttu.edu/now/"]],t:"news stories updates follow"}
];

/* ---------- Search engine ---------- */
var STOP = {the:1,a:1,an:1,to:1,for:1,of:1,and:1,i:1,im:1,me:1,my:1,want:1,need:1,how:1,do:1,can:1,where:1,is:1,in:1,on:1,with:1,find:1,get:1,some:1,am:1,at:1,it:1,be:1};
function stem(w){w=w.toLowerCase().replace(/[^a-z0-9]/g,"");return w.length>4?w.replace(/(ing|ed|es|s)$/,""):w}
function tokens(s){return s.toLowerCase().replace(/i'm/g,"i am").split(/[^a-z0-9\-]+/).filter(function(x){return x&&!STOP[x]})}
var CSTEM={};
Object.keys(CONCEPTS).forEach(function(k){CSTEM[k]=CONCEPTS[k].split(/\s+/).map(stem).filter(Boolean)});
function same(a,b){return a===b||(Math.min(a.length,b.length)>=5&&(a.indexOf(b)===0||b.indexOf(a)===0))}
function queryConcepts(toks){
  var out={};
  var phrase=toks.join(" ");
  Object.keys(CONCEPTS).forEach(function(k){
    var hit=false;
    toks.forEach(function(t){var s=stem(t);if(s.length<3)return;CSTEM[k].forEach(function(w){if(same(s,w))hit=true})});
    if(CONCEPTS[k].indexOf(phrase)>-1&&phrase.length>3)hit=true;
    if(hit){out[k]=Math.max(out[k]||0,4);(RELATED[k]||[]).forEach(function(r){out[r]=Math.max(out[r]||0,2)})}
  });
  return out;
}
function words(s){return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(stem)}
R.forEach(function(r){r._name=words(r.n);r._tags=words(r.t||"");r._desc=words(r.d)});
function search(q){
  var toks=tokens(q);if(!toks.length)return {list:R.slice(),qc:{}};
  var qc=queryConcepts(toks),res=[];
  R.forEach(function(r){
    var s=0,why=[];
    r.c.forEach(function(c){if(qc[c]){s+=qc[c];if(qc[c]===4)why.push(c)}else if(qc[c]===undefined){}});
    toks.forEach(function(t){var st=stem(t);if(st.length<2)return;
      if(r._name.some(function(w){return same(st,w)}))s+=3;
      else if(r._tags.some(function(w){return same(st,w)}))s+=2;
      else if(r._desc.some(function(w){return same(st,w)}))s+=1;
    });
    if(qc.cardio&&r.c.indexOf("cardio")>-1)s+=3;
    if(s>0)res.push({r:r,s:s,why:why});
  });
  res.sort(function(a,b){return b.s-a.s});
  return {list:res.map(function(x){x.r._why=x.why;return x.r}),qc:qc};
}
