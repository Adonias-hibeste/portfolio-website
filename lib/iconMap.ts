import {
    Smartphone,
    Code,
    Database,
    Globe,
    Server,
    Layout,
    Activity,
    CreditCard,
    MessageSquare,
    Zap,
    Cloud,
    Lock,
    Cpu,
    Layers,
    Package,
    Terminal,
    GitBranch,
    FileCode,
    Palette,
    Boxes,
    Workflow,
    Binary,
    Braces,
    Bug,
    Flame,
    Sparkles,
    Rocket,
    type LucideIcon,
} from "lucide-react";

// Import technology icons from react-icons
import {
    SiFlutter,
    SiReact,
    SiSwift,
    SiKotlin,
    SiJavascript,
    SiTypescript,
    SiPython,
    SiDart,
    SiFirebase,
    SiNodedotjs,
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiDocker,
    SiKubernetes,
    SiAmazon,
    SiGooglecloud,
    SiGit,
    SiGithub,
    SiGitlab,
    SiFigma,
    SiAndroid,
    SiApple,
    SiLinux,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiGraphql,
    SiRedux,
    SiExpress,
    SiNestjs,
    SiDjango,
    SiFastapi,
    SiFlask,
    SiRuby,
    SiGo,
    SiRust,
    SiCplusplus,
    SiC,
    SiPhp,
} from "react-icons/si";

import { FaReact, FaNodeJs, FaApple, FaAndroid } from "react-icons/fa";

// Type for all icons (Lucide + React Icons)
type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

// Combine Lucide icons with technology icons
export const iconMap: Record<string, IconComponent> = {
    // Lucide icons (generic)
    Smartphone,
    Code,
    Database,
    Globe,
    Server,
    Layout,
    Activity,
    CreditCard,
    MessageSquare,
    Zap,
    Cloud,
    Lock,
    Cpu,
    Layers,
    Package,
    Terminal,
    GitBranch,
    FileCode,
    Palette,
    Boxes,
    Workflow,
    Binary,
    Braces,
    Bug,
    Flame,
    Sparkles,
    Rocket,

    // Mobile Development
    Flutter: SiFlutter,
    "React Native": FaReact,
    Swift: SiSwift,
    Kotlin: SiKotlin,
    Dart: SiDart,
    iOS: SiApple,
    Android: SiAndroid,

    // Web Development
    React: SiReact,
    "Next.js": SiNextdotjs,
    "Vue.js": SiVuedotjs,
    Angular: SiAngular,
    Svelte: SiSvelte,
    TailwindCSS: SiTailwindcss,

    // Programming Languages
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Python: SiPython,
    "C++": SiCplusplus,
    C: SiC,
    Go: SiGo,
    Rust: SiRust,
    Ruby: SiRuby,
    PHP: SiPhp,

    // Backend & APIs
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    NestJS: SiNestjs,
    Django: SiDjango,
    FastAPI: SiFastapi,
    Flask: SiFlask,
    GraphQL: SiGraphql,

    // Databases
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    Redis: SiRedis,

    // Cloud & DevOps
    Firebase: SiFirebase,
    AWS: SiAmazon,
    "Google Cloud": SiGooglecloud,
    Docker: SiDocker,
    Kubernetes: SiKubernetes,

    // Version Control & Tools
    Git: SiGit,
    GitHub: SiGithub,
    GitLab: SiGitlab,
    Figma: SiFigma,
    Redux: SiRedux,

    // Operating Systems
    Apple: FaApple,
    "Android OS": FaAndroid,
    Linux: SiLinux,
};

export const getIconComponent = (iconName: string): IconComponent | null => {
    return iconMap[iconName] || null;
};

export const iconNames = Object.keys(iconMap).sort();
