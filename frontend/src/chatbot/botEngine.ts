import { BotReply, QuickReply } from "./types";

interface Intent {
  id: string;
  keywords: string[];
  reply: BotReply;
}

function chip(label: string): QuickReply {
  return { id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label };
}

export const MAIN_MENU_CHIPS: QuickReply[] = [
  chip("Our Services"),
  chip("Courses & Training"),
  chip("How do I register?"),
  chip("I'm a student"),
  chip("I'm interested in a service"),
  chip("Talk to a real person"),
];

const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    reply: {
      text: "Hey there! I'm the DroneTV assistant. I can tell you about our services, courses, or connect you with our team. What would you like to know?",
      quickReplies: MAIN_MENU_CHIPS,
    },
  },
  {
    id: "services",
    keywords: [
      "service",
      "services",
      "what do you offer",
      "offer",
      "aerial survey",
      "mapping",
      "spray",
      "spraying",
      "videograph",
      "inspection",
    ],
    reply: {
      text: "DroneTV offers: aerial survey & mapping, agricultural drone spraying, drone videography & photography, industrial/infrastructure inspection, and custom drone solutions for businesses. Want to enquire about one of these?",
      quickReplies: [
        chip("I'm interested in a service"),
        chip("Courses & Training"),
        chip("Talk to a real person"),
      ],
    },
  },
  {
    id: "courses",
    keywords: [
      "course",
      "courses",
      "training",
      "class",
      "classes",
      "learn",
      "certification",
      "workshop",
      "dgca",
    ],
    reply: {
      text: "Our training programs include: Drone Pilot Training with DGCA certification prep, a hands-on Drone Assembly Workshop, an Advanced Drone Maintenance course, and an Aerial Cinematography program. Which one interests you?",
      quickReplies: [chip("I'm a student"), chip("How do I register?"), chip("Our Services")],
    },
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "reach you",
      "phone number",
      "email address",
      "address",
      "call you",
      "get in touch",
      "where are you located",
    ],
    reply: {
      text: "You can reach us at support@dronetv.example or +91 90000 00000, or just leave your details below and our team will get back to you.",
      quickReplies: [chip("Leave my details"), chip("Talk to a real person")],
    },
  },
  {
    id: "register",
    keywords: [
      "register",
      "registration",
      "sign up",
      "signup",
      "enroll",
      "enrol",
      "how do i join",
      "admission",
      "how do i register",
    ],
    reply: {
      text: "Registering is simple: share your name, contact details, and what you're interested in through our enquiry form, and our team will reach out within 24-48 hours to guide you through the next steps.",
      quickReplies: [chip("Leave my details"), chip("Courses & Training")],
    },
  },
  {
    id: "service_interest",
    keywords: [
      "interested in a service",
      "interested in service",
      "need a service",
      "book a service",
      "want a service",
      "hire a drone",
      "leave my details",
    ],
    reply: {
      text: "Great! Please share a few details below and our services team will get in touch with you shortly.",
      formType: "service",
      formDefaults: { userType: "Customer" },
    },
  },
  {
    id: "student",
    keywords: ["i'm a student", "im a student", "i am a student", "student here", "as a student"],
    reply: {
      text: "Welcome! As a student, you can join our Drone Pilot Training, DGCA certification prep, or hands-on workshops. Want me to pass your details to our admissions team?",
      quickReplies: [chip("Yes, enquire about a course"), chip("See all courses")],
    },
  },
  {
    id: "course_interest",
    keywords: ["enquire about a course", "join a course", "sign me up for a course"],
    reply: {
      text: "Awesome! Fill in your details below and our admissions team will reach out with the schedule and fees.",
      formType: "course",
      formDefaults: { userType: "Student" },
    },
  },
  {
    id: "human",
    keywords: [
      "speak with someone",
      "talk to someone",
      "talk to a human",
      "talk to a real person",
      "real person",
      "speak to agent",
      "customer care",
      "representative",
      "speak to a person",
    ],
    reply: {
      text: "Sure thing! The fastest way to reach our team is to leave your details below - someone will call or email you shortly.",
      formType: "general",
      formDefaults: { userType: "Other", interest: "Speak with the team" },
    },
  },
  {
    id: "thanks",
    keywords: ["thank you", "thanks", "thank u", "appreciate it"],
    reply: {
      text: "You're welcome! Is there anything else I can help you with?",
      quickReplies: MAIN_MENU_CHIPS,
    },
  },
];

const FALLBACK_REPLY: BotReply = {
  text: "I'm not totally sure I understood that. Here are a few things I can help with:",
  quickReplies: MAIN_MENU_CHIPS,
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(text: string, keyword: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
  return pattern.test(text);
}

export function getBotReply(userText: string): BotReply {
  const normalized = userText.trim().toLowerCase();

  if (!normalized) {
    return FALLBACK_REPLY;
  }

  let bestMatch: { reply: BotReply; keywordLength: number } | null = null;

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (
        matchesKeyword(normalized, keyword) &&
        (!bestMatch || keyword.length > bestMatch.keywordLength)
      ) {
        bestMatch = { reply: intent.reply, keywordLength: keyword.length };
      }
    }
  }

  return bestMatch ? bestMatch.reply : FALLBACK_REPLY;
}
