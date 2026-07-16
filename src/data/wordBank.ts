export const WORD_BANK = {
  companies: ['GOOGLE', 'APPLE', 'MICROSOFT', 'OPENAI', 'GITHUB', 'NETFLIX', 'NVIDIA', 'ADOBE'],
  languages: ['PYTHON', 'JAVA', 'RUST', 'SWIFT', 'KOTLIN', 'GO', 'RUBY', 'SQL'],
  devops: ['DOCKER', 'LINUX', 'GIT', 'JENKINS', 'TERRAFORM', 'KUBERNETES', 'NGINX', 'UBUNTU'],
  ai: ['PROMPT', 'AGENT', 'TOKEN', 'VECTOR', 'NEURAL', 'TENSOR', 'DATASET', 'CHATBOT'],
  general: ['BROWSER', 'COOKIE', 'SERVER', 'CACHE', 'ROUTER', 'BINARY', 'DATABASE', 'INTERNET'],
} as const;

export type CategoryKey = keyof typeof WORD_BANK;

export const CATEGORIES: { key: CategoryKey; name: string; island: string }[] = [
  { key: 'companies', name: 'Tech Companies', island: "Merchant's Bay" },
  { key: 'languages', name: 'Programming Languages', island: "Coder's Cay" },
  { key: 'devops', name: 'DevOps & Cloud', island: 'Stormy Seas' },
  { key: 'ai', name: 'AI', island: 'Machine Isle' },
  { key: 'general', name: 'General Tech', island: 'Treasure Cove' },
];

/** Short text hints/definitions for each word in the bank. */
export const WORD_HINTS: Record<string, string> = {
  // Companies
  GOOGLE: 'Search engine giant named after a very large number',
  APPLE: 'Cupertino company known for the iPhone',
  MICROSOFT: 'Windows OS creator founded by Bill Gates',
  OPENAI: 'Company behind ChatGPT and GPT models',
  GITHUB: 'Platform where developers host and collaborate on code',
  NETFLIX: 'Streaming service that started by mailing DVDs',
  NVIDIA: 'GPU maker powering gaming and AI workloads',
  ADOBE: 'Creator of Photoshop and the PDF format',

  // Languages
  PYTHON: 'Named after a comedy troupe, loved for data science',
  JAVA: 'Write once, run anywhere — named after coffee from an island',
  RUST: 'Memory-safe systems language from Mozilla',
  SWIFT: 'Modern Apple language replacing Objective-C',
  KOTLIN: 'JetBrains language and Android\'s preferred choice',
  GO: 'Language from Google built for concurrency',
  RUBY: 'Precious gem language famous for its Rails framework',
  SQL: 'The language you use to query relational databases',

  // DevOps
  DOCKER: 'Pack your app in containers shaped like shipping boxes',
  LINUX: 'Open-source OS kernel created by Linus Torvalds',
  GIT: 'Distributed version control that tracks your code history',
  JENKINS: 'Open-source automation server for CI/CD pipelines',
  TERRAFORM: 'Infrastructure as code tool by HashiCorp',
  KUBERNETES: 'Container orchestrator whose name means "helmsman"',
  NGINX: 'High-performance web server and reverse proxy',
  UBUNTU: 'Popular Linux distro — its name means "humanity"',

  // AI
  PROMPT: 'The input text you give to a language model',
  AGENT: 'An AI that can take actions autonomously',
  TOKEN: 'The smallest unit an LLM processes text in',
  VECTOR: 'A numerical list representing meaning in embedding space',
  NEURAL: 'Type of network inspired by the human brain',
  TENSOR: 'Multi-dimensional array at the heart of deep learning',
  DATASET: 'A structured collection of data used to train models',
  CHATBOT: 'An AI you converse with in natural language',

  // General
  BROWSER: 'Software you use to surf the web',
  COOKIE: 'Small data file websites store on your machine',
  SERVER: 'A computer that serves requests from other machines',
  CACHE: 'Fast temporary storage to avoid repeated lookups',
  ROUTER: 'Device that directs network traffic between networks',
  BINARY: 'Number system with only 0s and 1s',
  DATABASE: 'Organized storage system for structured data',
  INTERNET: 'Global network connecting billions of devices',
};
