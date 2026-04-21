import { Friend, Testimonial } from "./types";

export const REAGAN_DETAILS = {
  name: "Reagan Smith",
  whatsapp: "254111992490",
  instagram: "https://www.instagram.com/reagan_smith_254?igsh=YzljYTk1ODg3Zg==",
  photo: "https://i.ibb.co/FkzJTFfn/7c0f91c24aca.jpg",
  born: "11th June",
  location: "Bombolulu, Mombasa, Kenya",
  school: "Vihiga High School",
  level: "Form 4",
  skills: [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "Python", level: 85 },
    { name: "Problem Solving", level: 92 },
    { name: "Creative Thinking", level: 98 },
  ]
};

export const FRIENDS: Friend[] = [
  {
    name: "Duvey",
    photo: "https://i.ibb.co/PGRJg7Nr/9f871f651f8a.jpg",
    instagram: "https://www.instagram.com/ivyol_a?igsh=YzljYTk1ODg3Zg==",
    whatsapp: "254752260632",
    quote: "The one who always shows up, full of energy and realness."
  },
  {
    name: "Mitch",
    photo: "https://i.ibb.co/zHx3c2ZG/a5fe6ae71924.jpg",
    instagram: "https://www.instagram.com/moonwa254?igsh=YzljYTk1ODg3Zg==",
    whatsapp: "254726242303",
    quote: "The vibrant spirit who brings color to every conversation."
  },
  {
    name: "Kayaan",
    photo: "https://i.ibb.co/jkMDmThz/926442463559.jpg",
    instagram: "https://www.instagram.com/_pvtlifeof._kxyxxn?igsh=YzljYTk1ODg3Zg==",
    whatsapp: "254719288855",
    quote: "The quiet but fierce soul whose presence speaks volumes."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Mr. Omondi", relation: "Teacher", quote: "Reagan is one of the most focused and determined young men I've ever met. A true future tech leader.", avatar: "👨‍🏫" },
  { name: "Classmate", relation: "Vihiga High", quote: "Reagan never gives up. Even when it's hard, he keeps going. Pure inspiration.", avatar: "🎓" },
  { name: "Veek", relation: "Brother", quote: "He's always ready to help others with tech stuff. Generous and brilliant.", avatar: "👦" },
  { name: "Online Mentor", relation: "Tech", quote: "Reagan's dedication to coding at his age is honestly admirable. Watch this guy rise.", avatar: "💻" },
  { name: "Friend", relation: "Mombasa", quote: "One of the most God-fearing and humble guys I know. He's going places.", avatar: "🙏" },
  { name: "Kayaan", relation: "Friend", quote: "Reagan is low-key a genius. The things he knows about software at Form 4 are insane.", avatar: "💜" },
  { name: "Duvey", relation: "Friend", quote: "He's the kind of person who makes you want to be better. Real ones only.", avatar: "✨" },
  { name: "Anonymous", relation: "Mitch's Friend", quote: "Mitch told me about Reagan and honestly, his story is so motivating.", avatar: "⭐" },
  { name: "School Senior", relation: "Vihiga High", quote: "If you know Reagan, you know someone who will be a big deal someday.", avatar: "🚀" },
  { name: "Mombasa Community Member", relation: "Local", quote: "Bombolulu produced a legend. We're proud of you, Reagan.", avatar: "🇰🇪" }
];

export const DREAMS = [
  { icon: "🖥️", text: "Become a world-class Software Engineer" },
  { icon: "🌍", text: "Build tech solutions for Africa" },
  { icon: "🎓", text: "Pursue a Computer Science degree" },
  { icon: "💡", text: "Launch his own tech startup" },
  { icon: "🤝", text: "Mentor the next generation of young Kenyan coders" },
  { icon: "💻", text: "Master multiple programming languages" }
];
