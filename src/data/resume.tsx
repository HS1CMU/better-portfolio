import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Heath Sun",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Mountain View, CA \nBuilding the next big thing.",
  avatarUrl: "/channels_profile.jpg",
  Stack: [
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Unity",
    "YOLOv11",
    "LLaMA3",
    "LangChain",
    "PostgreSQL",
    "Docker",
    "Quantum Computing",
    "Mixed Reality",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/heathsun/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Heath_Sun",
        icon: Icons.x,

        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/HeathSun",
        icon: Icons.github,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "UKRI Trustworthy Autonomous Systems Hub",
      href: "https://tas.ac.uk",
      badges: [],
      location: "Nottingham, UK",
      title: "Research Engineer · Multimodal AI",
      logoUrl: "/TAS.png",
      start: "Oct 2024",
      end: "Jan 2025",
      description:
        "Worked on an agentic system for speech-guided instance segmentation in MR, enabling egocentric interaction across tasks: locating, segmenting, counting, and reasoning with class alignment. Engineered key components including adversary examinators and HTML auto-generation for result visualization.",
    },
    {
      company: "FateAlgo Ltd",
      href: "#",
      badges: [],
      location: "London, UK/Hybrid",
      title: "Founder/CEO · Generative AI Application",
      logoUrl: "/fatealgo.jpeg",
      start: "Apr 2023",
      end: "Sept 2024",
      description:
        "Led the development of one of the world's first AI-native Tarot reading apps, securing a $60K Li Dak Sum Fellowship and first place in the NAA Start-up Competition. Selected by China's premier angel investor, ZhenFund, as 2023 ZhenResidence Fellow (25 start-ups per year), becoming the youngest ZhenResidence member in its history at age 19. Pivoted (in 2024) to delivering AI agent systems, with clients from China, Japan, and the US West Coast, to drive Gen-AI transformation.",
    },
    {
      company: "Aihuashen Technology × China Mobile",
      href: "https://www.chinamobile.com",
      badges: [],
      location: "Beijing, China",
      title: "AI Product Engineer (Management Trainee Lead)",
      logoUrl: "/china-mobile.png",
      start: "Jun 2024",
      end: "Aug 2024",
      description:
        "Led a six-member team to develop a multi-agent workflow platform demo for China Mobile. Successfully delivered the platform demo with a digital human front-end that helped the company win the bid. Advised the AI biography project for the Islamic world in collaboration with AceGPT (No.1 Arabic LLM) and KAUST.",
    },
    {
      company: "Zhejiang University",
      href: "https://www.zju.edu.cn",
      badges: [],
      location: "Hangzhou, China/Hybrid",
      title: "Co-Researcher · AI4Science (Bioengineering)",
      logoUrl: "/zju.png",
      start: "Oct 2023",
      end: "Mar 2024",
      description:
        "Using simulated annealing to model the spatial heterogeneity of light intensity for composite elastomer micro-needle arrays, enabling the adaptive customization based on the 3D shape of the wound for cell behavior controllers. Completed all programming aspects of the multi-luminescence optogenetic platform for wound-healing.",
    },
    {
      company: "USTC China",
      href: "https://www.ustc.edu.cn",
      badges: [],
      location: "Hefei, China/Hybrid",
      title: "Research Assistant · Functional Quantum Programming",
      logoUrl: "/USTC.png",
      start: "Sep 2022",
      end: "Dec 2022",
      description:
        "Participated in developing Quantric's hardware-decoupled compiler, including superposition state control flows and innovative compile-time quantum error correction algorithm with 20-50% fewer LOC/pm compared to IBM's Qiskit. Contributed to the design of a conversion algorithm between standard quantum circuits and ZX-diagrams.",
    },
  ],
  education: [
    {
      school: "Carnegie Mellon University",
      href: "https://www.cmu.edu/",
      degree: "M.S. Software Management & Computer Engineering",
      logoUrl: "/cmu.png",
      start: "2025",
      end: "Present",
    },
    {
      school: "ZhenFund",
      href: "https://en.zhenfund.com/",
      degree: "Startup Residency Fellow (ZR13)",
      logoUrl: "/ZhenFund.png",
      start: "2023",
      end: "2023",
    },
    {
      school: "University of Nottingham",
      href: "https://www.nottingham.ac.uk/computerscience/",
      degree: "B.S. Computer Science & Artificial Intelligence",
      logoUrl: "/nottingham.jpg",
      start: "2022",
      end: "2025",
    },
    {
      school: "University of Oxford",
      href: "https://www.ox.ac.uk",
      degree: "AI & Machine Learning Program",
      logoUrl: "/oxford.png",
      start: "2022",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Agents that rob the Louvre",
      href: "https://www.anyfend.com/",
      dates: "November 2025",
      active: true,
      description:
        "An army of multimodal agents that simulate robbery and find the best preventive solutions in every scenario.",
      technologies: [
        "AI SDK",
        "Three.js",
        "YOLOv11",
        "Llama 4 Vision",
        "RL",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.anyfend.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Halloween",
          href: "https://x.com/Heath_Sun/status/1984472445005545991",
          icon: <Icons.halloween className="size-3" />,
        },
      ],
      image: "/anyfend.gif",
    },
    {
      title: "One Click to Grade Them All",
      href: "/blog/1CGA",
      dates: "June 2025",
      active: true,
      description:
        "One click to grade them all, One tool-call to find them. A rubric-customizable STEM paper grading agent is the mark of a truly creative TA.",
      technologies: [
        "Next.js",
        "React",
        "Gemini 2.5 Pro",
        "AI SDK",
        "Cloudflare R2",
      ],
      links: [
        {
          type: "Demo",
          href: "https://www.youtube.com/watch?v=1NKYhTdQDvA",
          icon: <Icons.youtube className="size-3" />,
        },
        {
          type: "Details",
          href: "/blog/1CGA",
          icon: <Icons.fileText className="size-3" />,
        },
      ],
      image: "/1CGA-Cover.gif",
    },
    {
      title: "Can AI judge hackathons?",
      href: "https://github.com/HeathSun/a42z-Judge",
      dates: "August 2025",
      active: true,
      description:
        "Agentic AI hackathon judge. Runner-up at AdventureX, China's largest-ever hackathon, selected from over 8,000 applicants.",
      technologies: [
        "Next.js",
        "Pinecone",
        "Dify",
        "Apify",
        "Perplexity",
        "Groq"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/HeathSun/a42z-Judge",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://judge.a42z.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/a42z-judge.gif",
    },
    {
      title: "Mysticism in the Age of AI",
      href: "/blog/mysticism",
      dates: "August 2022",
      active: true,
      description:
        "Quantified tarot systems by measuring the Barnum effect across the Rider-Waite and Thoth decks using modern NLP tooling.",
      technologies: [
        "Python",
        "NLP",
        "Embeddings",
        "t-SNE",
        "Pandas",
      ],
      links: [
        {
          type: "Details",
          href: "/blog/mysticism",
          icon: <Icons.fileText className="size-3" />,
        },
      ],
      image: "/TarotCards.gif",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
    {
      title: "DeveloperWeek Hackathon",
      dates: "February 3rd - 4th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    {
      title: "HackDavis",
      dates: "January 20th - 21st, 2018",
      location: "Davis, California",
      description:
        "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint",
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning",
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet",
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server",
        },
      ],
    },
    {
      title: "ETH Waterloo",
      dates: "October 13th - 15th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet",
        },
      ],
    },
    {
      title: "Hack The North",
      dates: "September 15th - 17th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a virtual reality application allowing users to see themselves in third person.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Streamer Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/htn2017",
        },
        {
          title: "Client Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/RTSPClient",
        },
      ],
    },
    {
      title: "Hack The 6ix",
      dates: "August 26th - 27th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ShareShip/ShareShip",
        },
        {
          title: "Site",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://share-ship.herokuapp.com/",
        },
      ],
    },
    {
      title: "Stupid Hack Toronto",
      dates: "July 23rd, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/nsagirlfriend/nsagirlfriend",
        },
      ],
    },
    {
      title: "Global AI Hackathon - Toronto",
      dates: "June 23rd - 25th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/TinySamosas/",
        },
      ],
    },
    {
      title: "McGill AI for Social Innovation Hackathon",
      dates: "June 17th - 18th, 2017",
      location: "Montreal, Quebec",
      description:
        "Developed realtime facial microexpression analyzer using AI",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
      links: [],
    },
    {
      title: "Open Source Circular Economy Days Hackathon",
      dates: "June 10th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/genecis",
        },
      ],
    },
    {
      title: "Make School's Student App Competition 2017",
      dates: "May 19th - 21st, 2017",
      location: "International",
      description: "Improved PocketDoc and submitted to online competition",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
      win: "Top 10 Finalist | Honourable Mention",
      links: [
        {
          title: "Medium Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
        },
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "HackMining",
      dates: "May 12th - 14th, 2017",
      location: "Toronto, Ontario",
      description: "Developed neural network to optimize a mining process",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
      links: [],
    },
    {
      title: "Waterloo Equithon",
      dates: "May 5th - 7th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "SpaceApps Waterloo",
      dates: "April 28th - 30th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/earthwatch",
        },
      ],
    },
    {
      title: "MHacks 9",
      dates: "March 24th - 26th, 2017",
      location: "Ann Arbor, Michigan",
      description:
        "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/threejs-planes",
        },
      ],
    },
    {
      title: "StartHacks I",
      dates: "March 4th - 5th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
      win: "1st Place Winner",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-ionic",
        },
        {
          title: "Source (Server)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-rails",
        },
      ],
    },
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native",
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails",
        },
      ],
    },
    {
      title: "Terrible Hacks V",
      dates: "November 26th, 2016",
      location: "Waterloo, Ontario",
      description:
        "Developed a mock of Windows 11 with interesting notifications and functionality",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
        },
      ],
    },
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark",
        },
      ],
    },
  ],
} as const;
