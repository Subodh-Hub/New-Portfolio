import { FaJava } from "react-icons/fa";
import { LuStore } from "react-icons/lu";
import {
  SiExpress,
  SiFigma,
  SiGithub,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiSass,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const skillsCommand = [
  { title: "JavaScript", Icon: SiJavascript, level: 85, color: "#f7df1e" },
  { title: "TypeScript", Icon: SiTypescript, level: 85, color: "#3178c6" },
  { title: "Java", Icon: FaJava, level: 65, color: "#ed8b00" },
  { title: "Next.js", Icon: SiNextdotjs, level: 85, color: "#ffffff" },
  { title: "NestJS", Icon: SiNestjs, level: 75, color: "#e0234e" },
  { title: "Express", Icon: SiExpress, level: 80, color: "#ffffff" },
  { title: "Node.js", Icon: SiNodedotjs, level: 80, color: "#5fa04e" },
  { title: "React", Icon: SiReact, level: 85, color: "#61dafb" },
  { title: "Tailwind CSS", Icon: SiTailwindcss, level: 85, color: "#06b6d4" },
  { title: "Figma", Icon: SiFigma, level: 75, color: "#f24e1e" },
  { title: "SCSS", Icon: SiSass, level: 80, color: "#cc6699" },
  { title: "shadcn/ui", Icon: SiShadcnui, level: 80, color: "#ffffff" },
  { title: "GitHub", Icon: SiGithub, level: 85, color: "#ffffff" },
  { title: "Zustand", Icon: LuStore, level: 75, color: "#d2ff00" },
  { title: "Postman", Icon: SiPostman, level: 80, color: "#ff6c37" },
  { title: "MySQL", Icon: SiMysql, level: 75, color: "#4479a1" },
] as const;

export const services = [
  {
    title: "Full-stack Development",
    description: "Scalable web applications built from interface to database with modern JavaScript and TypeScript.",
    tags: ["Next.js", "Node.js", "MySQL"],
  },
  {
    title: "Frontend Development",
    description: "Responsive, accessible interfaces with polished interactions and strong attention to visual detail.",
    tags: ["React", "Tailwind CSS", "SCSS"],
  },
  {
    title: "Backend & APIs",
    description: "Reliable APIs, authentication, data modeling, and server-side architecture designed to scale.",
    tags: ["NestJS", "Express", "Postman"],
  },
  {
    title: "Design to Code",
    description: "Accurate production builds from Figma designs, with reusable components and smooth motion.",
    tags: ["Figma", "shadcn/ui", "React"],
  },
] as const;

export const experiences = [
  {
    role: "Frontend Intern",
    company: "Digihub Pvt. Ltd.",
    urls: ["https://dghub.io/"],
  },
  {
    role: "Frontend Developer",
    company: "Webstudio Nepal",
    urls: ["https://webstudionepal.com/"],
  },
  {
    role: "Full Stack Developer",
    company: "Himalayan Safety Solution Nepal",
    urls: ["https://himalayansafety.com.np/"],
  },
  {
    role: "Coding Instructor & Full Stack Developer",
    company: "KidNCode Nepal",
    urls: ["https://kidncodenepal.com/", "https://kidncode.com/"],
  },
] as const;

export const projects = [
  {
    title: "Hotel Crown Ridi Website",
    url: "https://hotel-crown-ridi.netlify.app/",
    image: "/images/project/hotecrown.png",
  },
  {
    title: "ShipClub Website",
    url: "https://shipclub.netlify.app/",
    image: "/images/project/shipclub.png",
  },
  {
    title: "EV Scooter Company Website",
    url: "https://evscooter.netlify.app/",
    image: "/images/project/ev_scooter.png",
  },
  {
    title: "Blogging Application",
    url: "https://github.com/Subodh-Hub/Blog-Application-Intern-Digihub-",
    image: "/images/project/blog.png",
  },
  {
    title: "Kid4AI",
    url: "http://kid4.ai/",
    image: "/images/project/kid4ai.png",
  },
] as const;
