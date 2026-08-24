export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  status: string;
  description: string;
  overview: string[];
  problem: string;
  solution: string;
  architecture: { step: string; title: string; desc: string }[];
  keyFeatures: { title: string; description: string; tag: string }[];
  metrics: { value: string; label: string; detail: string }[];
  techCategories: { category: string; skills: string[] }[];
  tech: string[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  bg: string;
  accentColor: string;
  githubUrl: string;
  liveUrl?: string;
  previewImage?: string;
  previewStyle?: 'cover' | 'contain';
}

export const projectsData: ProjectItem[] = [
  {
    id: 'loop',
    number: '01',
    name: 'PROJECT LOOP',
    tagline: 'MULTI-TENANT AI CUSTOMER FEEDBACK INTELLIGENCE PLATFORM',
    category: 'Enterprise AI, NLP & Full-Stack Platform',
    year: '2026',
    role: 'Lead AI & Full-Stack Software Engineer',
    duration: 'Zidio Development · Team 5',
    status: 'Shipped · Developed at Zidio Development',
    description:
      'An enterprise-grade Voice-of-Customer (VoC) analytics platform engineered to aggregate multi-channel customer signals, perform real-time sentiment scoring, cluster emerging themes with NLP, and power interactive AI copilot queries with grounded vector search.',
    overview: [
      'Project LOOP is an enterprise-grade multi-tenant AI customer feedback analytics platform developed during an engineering tenure at Zidio Development (Team 5).',
      'The platform aggregates customer signals across App Store reviews, Zendesk support tickets, Intercom conversations, and NPS surveys, transforming unstructured customer feedback into actionable sentiment scores, NLP theme clusters, and executive AI summary narratives.'
    ],
    problem:
      'Enterprise product teams struggle with fragmented customer feedback scattered across siloed support and review channels, leading to delayed issue identification, manual triage bottlenecks, and lack of unified grounded AI query search.',
    solution:
      'Architected a multi-tenant platform in Next.js 14 with PostgreSQL (Neon Serverless) and Prisma ORM. Integrated a multi-AI provider engine (Claude Sonnet 4.6, GPT-4o, Gemini 2.0 Flash) with automated failover, strict tenant isolation by workspaceId, and vector embeddings for grounded AI copilot retrieval.',
    architecture: [
      { step: '01', title: 'Multi-Channel Ingestion', desc: 'Bulk CSV parsing with auto-mapping, manual entries, and live API webhook feeds with strict Zod validation' },
      { step: '02', title: 'Multi-AI Provider Engine', desc: 'Unified abstraction over Claude Sonnet 4.6, GPT-4o, and Gemini 2.0 Flash with automatic rate-limit failover' },
      { step: '03', title: 'NLP Sentiment & Clustering', desc: 'Granular sentiment scoring (-1.0 to +1.0), feature area attribution, and dynamic theme assignment' },
      { step: '04', title: 'Grounded Vector Retrieval', desc: 'Voyage AI / HuggingFace embedding models with cosine similarity matching for conversational RAG queries' },
      { step: '05', title: 'Multi-Tenant RBAC Isolation', desc: 'PostgreSQL / Prisma ORM with strict workspaceId tenant isolation and BCrypt RBAC permissions (Admin, Analyst, Viewer)' }
    ],
    keyFeatures: [
      {
        title: 'Multi-Tenant Architecture & RBAC',
        description: 'Strict database tenant isolation scoped by workspaceId with granular permissions for Admins, Analysts, and Viewers.',
        tag: 'SECURITY / RBAC'
      },
      {
        title: 'Unified Multi-AI Provider Engine',
        description: 'Multi-model abstraction orchestrating Claude Sonnet 4.6, GPT-4o, and Gemini 2.0 Flash with automatic failover.',
        tag: 'LLM / GENAI'
      },
      {
        title: 'NLP Sentiment & Theme Clustering',
        description: 'Continuous NLP sentiment scoring (-1.0 to +1.0), automated feature area classification, and evidence-backed rationale.',
        tag: 'NLP ANALYTICS'
      },
      {
        title: 'Grounded AI Copilot with RAG',
        description: 'Conversational copilot grounded directly in workspace customer feedback records with source citation chips.',
        tag: 'VECTOR SEARCH'
      },
      {
        title: 'Real-Time Executive Analytics',
        description: 'Live AI executive narrative synthesis, cubic-bezier flow trajectories, and custom 360° annular themes donut visualizers.',
        tag: 'DASHBOARDS'
      }
    ],
    metrics: [
      { value: '<1.8s', label: 'AI Classification', detail: 'Multi-provider LLM failover' },
      { value: '100%', label: 'Tenant Scoped', detail: 'Strict workspaceId data isolation' },
      { value: '3 Engines', label: 'Unified Multi-AI', detail: 'Claude Sonnet, GPT-4o, Gemini 2.0' },
      { value: '360°', label: 'Annular Visualizer', detail: 'Custom SVG geometry dashboards' }
    ],
    techCategories: [
      { category: 'AI & LLM Architecture', skills: ['Claude Sonnet 4.6', 'OpenAI GPT-4o', 'Google Gemini 2.0 Flash', 'Vector Embeddings', 'NLP Sentiment'] },
      { category: 'Frontend & Framework', skills: ['Next.js 14 (App Router)', 'TypeScript', 'Tailwind CSS', 'Server Actions', 'Zod'] },
      { category: 'Database & Auth', skills: ['PostgreSQL (Neon Serverless)', 'Prisma ORM', 'NextAuth.js (Auth.js)', 'BCrypt', 'RBAC Isolation'] },
      { category: 'Visualization & DevOps', skills: ['Custom SVG Geometry', 'Recharts', 'Git', 'Vercel', 'Zidio Development'] }
    ],
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Claude Sonnet', 'GPT-4o', 'Gemini 2.0', 'NextAuth'],
    codeSnippet: {
      filename: 'ai_multi_provider_engine.ts',
      language: 'typescript',
      code: `// Multi-AI Provider Orchestration Engine with Fallback Failover
export async function classifyFeedbackWithFallback(content: string, workspaceId: string): Promise<ClassificationResult> {
  const providers = ['claude-sonnet-4-6', 'gpt-4o-mini', 'gemini-2.0-flash'];
  
  for (const model of providers) {
    try {
      const response = await dispatchAIInference({
        model,
        prompt: buildSentimentPrompt(content),
        temperature: 0.1,
      });
      
      // Strict Zod schema validation
      const parsed = ClassificationSchema.parse(response);
      return { ...parsed, modelUsed: model, success: true };
    } catch (err) {
      console.warn(\`Provider \${model} failed, switching to next fallback...\`);
    }
  }
  throw new Error("All AI inference providers exhausted");
}`
    },
    bg: '#F8FAFC',
    accentColor: '#E8432D',
    githubUrl: 'https://github.com/Dhruv6019/Project-LOOP-T5',
    liveUrl: 'https://github.com/Dhruv6019/Project-LOOP-T5',
    previewImage: '/images/loop-logo.png',
    previewStyle: 'contain'
  },
  {
    id: 'carvo',
    number: '02',
    name: 'CARVO',
    tagline: '3D AUTOMOTIVE CUSTOMIZATION & COMMERCE PLATFORM',
    category: 'Full-Stack & 3D WebGL / Automotive E-Commerce',
    year: 'Sep 2025 – Apr 2026',
    role: 'Lead Full-Stack & 3D Web Developer',
    duration: 'Sep 2025 – Apr 2026',
    status: 'Associated with LJIET (L J Institute of Engineering & Technology)',
    previewImage: '/images/carvo-logo.png',
    previewStyle: 'contain',
    description:
      'A full-stack automotive platform combining a real-time 3D customization tool with a 10,000+ parts marketplace, service booking system, and 5 specialized RBAC dashboards.',
    overview: [
      'Carvo is an end-to-end full-stack automotive platform developed in association with L J Institute of Engineering and Technology (LJIET), seamlessly uniting interactive 3D WebGL vehicle customization with a massive parts marketplace and mechanic service booking ecosystem.',
      'Designed to handle everything from vehicle design to doorstep delivery, the platform incorporates Role-Based Access Control (RBAC) across 5 specialized stakeholder dashboards (Customers, Sellers, Service Providers, Delivery Agents, and Super Admins).'
    ],
    problem:
      'Car enthusiasts and aftermarket businesses suffered from disconnected experiences between 3D visualizers, multi-vendor parts catalogs, and physical mechanic installation bookings, lacking real-time order tracking, OTP verification, and multi-role operations.',
    solution:
      'Architected a unified full-stack platform using React, TypeScript, Tailwind CSS, Three.js, Node.js, Express, and MySQL (TypeORM). Incorporated real-time PBR shader customizers, automated PDF invoicing, secure UPI payments, and OTP-based doorstep delivery verification.',
    architecture: [
      { step: '01', title: '3D WebGL Customizer', desc: 'Three.js PBR shader engine for real-time body paint, texture swatches, rim sizing, and custom livery adjustments' },
      { step: '02', title: 'Multi-Vendor Marketplace', desc: '10,000+ automotive parts catalog with inventory indexing, search, filtering, and instant UPI payment processing' },
      { step: '03', title: 'Garage Service Booking', desc: 'Real-time scheduling system for certified mechanics for custom installations and routine repairs' },
      { step: '04', title: '5 Specialized RBAC Dashboards', desc: 'Role-Based Access Control interfaces tailored for Customers, Sellers, Providers, Delivery Agents, and Admins' },
      { step: '05', title: 'Smart Automation Pipeline', desc: 'Automated PDF invoice generation, OTP delivery verification handshake, and live socket order tracking' }
    ],
    keyFeatures: [
      {
        title: '3D Customizer',
        description: 'Visualize car modifications in real time using Three.js with dynamic PBR shaders and material swatches.',
        tag: 'THREE.JS'
      },
      {
        title: '10,000+ Parts Marketplace',
        description: 'Shop comprehensive automotive parts catalogs with secure UPI payments and real-time inventory.',
        tag: 'COMMERCE'
      },
      {
        title: 'Service Booking System',
        description: 'Book expert mechanics for on-demand parts installations, routine servicing, and performance tuning.',
        tag: 'SERVICES'
      },
      {
        title: '5 Specialized RBAC Dashboards',
        description: 'Tailored role-based portals for Customers, Sellers, Service Providers, Delivery Agents, and Admins.',
        tag: 'SECURITY / RBAC'
      },
      {
        title: 'Smart Automation & Delivery OTP',
        description: 'Automated PDF Invoices, OTP-based delivery handshake, and real-time order tracking.',
        tag: 'AUTOMATION'
      }
    ],
    metrics: [
      { value: '10,000+', label: 'Marketplace Parts', detail: 'Indexed in MySQL catalog' },
      { value: '5 Portals', label: 'RBAC Dashboards', detail: 'Customer, Seller, Provider, Delivery, Admin' },
      { value: '60 FPS', label: 'Three.js Customizer', detail: 'Real-time PBR shader engine' },
      { value: '100%', label: 'OTP Verified', detail: 'Doorstep delivery confirmation' }
    ],
    techCategories: [
      { category: 'Frontend & 3D', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'WebGL', 'PBR Shaders'] },
      { category: 'Backend & API', skills: ['Node.js', 'Express', 'MySQL', 'TypeORM', 'REST APIs', 'RBAC Auth'] },
      { category: 'Commerce & Automation', skills: ['UPI Payments', 'Automated PDF Invoices', 'OTP Verification', 'WebSockets'] },
      { category: 'Architecture & Tools', skills: ['Git', 'Vite', 'Docker', 'Postman', 'LJIET Project'] }
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Node.js', 'Express', 'MySQL', 'TypeORM'],
    codeSnippet: {
      filename: 'threejs_pbr_configurator.ts',
      language: 'typescript',
      code: `// Three.js PBR Automotive Customizer Engine with TypeORM Order Integration
export const applyCarvoMaterial = (mesh: THREE.Mesh, config: CarCustomizerConfig) => {
  mesh.material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.hexColor),
    metalness: config.finish === 'metallic' ? 0.90 : 0.20,
    roughness: config.finish === 'matte' ? 0.85 : 0.12,
    clearcoat: config.finish === 'metallic' ? 1.0 : 0.0,
    clearcoatRoughness: 0.04,
    reflectivity: 0.92,
    envMapIntensity: 1.4,
  });
};

// RBAC Middleware verification for 5 Dashboards
export const verifyRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access Denied: Insufficient RBAC Permissions' });
    }
    next();
  };
};`
    },
    bg: '#FEFDF8',
    accentColor: '#3B82F6',
    githubUrl: 'https://github.com/dhruvteli',
    liveUrl: 'https://www.linkedin.com/in/dhruvteli6019/'
  },
  {
    id: 'petsphere',
    number: '03',
    name: 'PETSPHERE',
    tagline: 'ALL-IN-ONE PET CARE & COMMERCE ECOSYSTEM',
    category: 'Full-Stack Platform & Rapid Application Development',
    year: 'Feb 2026',
    role: 'Lead Full-Stack Architect & Developer',
    duration: '5-Day Rapid Sprint',
    status: 'Shipped · Rapid 5-Day Full-Stack Sprint',
    description:
      'A comprehensive full-stack pet care ecosystem connecting owners, sellers, veterinarians, trainers, and delivery agents through a glassmorphic interface with 5 multi-role dashboards, AI pet matchmaking, and automated logistics.',
    overview: [
      'PetSphere is a massive full-stack pet care ecosystem engineered and shipped from scratch in an intensive 5-day rapid application development (RAD) sprint.',
      'The platform serves as a unified one-stop hub uniting pet adoption, e-commerce marketplace, veterinary/trainer appointment bookings, AI-driven pet matchmaking, automated PDF invoicing, UPI payments, real-time sales analytics, and OTP-verified logistics across 5 distinct role-based dashboards.'
    ],
    problem:
      'Pet owners and service providers navigated fragmented apps for adoption, pet supplies, veterinary appointments, and wellness tracking, lacking verified delivery logistics and unified communication between buyers, sellers, and clinics.',
    solution:
      'Architected a high-velocity full-stack platform using React 19 (Vite), TypeScript, Node.js, Express, and MySQL. Integrated glassmorphic UI components with Framer Motion and Ant Design, Role-Based Access Control (RBAC) across 5 dashboards, automated PDF invoicing, and live OTP verification.',
    architecture: [
      { step: '01', title: 'Multi-Role RBAC Hub', desc: 'Dedicated role portals with granular permissions for Buyers, Sellers, Doctors, Trainers, and Delivery Agents' },
      { step: '02', title: 'Commerce & Adoption Engine', desc: 'Full-scale pet adoption directory and product marketplace with multi-facet category filtering' },
      { step: '03', title: 'Clinical Booking & AI Match', desc: 'Real-time appointment scheduler for vets and trainers coupled with AI pet compatibility matching' },
      { step: '04', title: 'Financials & Automated PDF', desc: 'Seamless UPI payment gateway integration paired with automated server-side PDF invoice generation' },
      { step: '05', title: 'Logistics & Secure OTP', desc: 'Real-time order state machine with live socket delivery tracking and doorstep OTP handshake' }
    ],
    keyFeatures: [
      {
        title: '5 Multi-Role Dashboards',
        description: 'Custom experiences and workflows for Buyers, Sellers, Doctors, Trainers, and Delivery Agents.',
        tag: 'SECURITY / RBAC'
      },
      {
        title: 'Complete Marketplace & Adoption',
        description: 'Full-scale pet adoption and product e-commerce catalog with advanced multi-attribute filtering.',
        tag: 'COMMERCE'
      },
      {
        title: 'Service Booking & Scheduling',
        description: 'Integrated appointment management for certified veterinarians and professional pet trainers.',
        tag: 'APPOINTMENTS'
      },
      {
        title: 'AI Matchmaking & Wellness Tracker',
        description: 'AI-driven pet-to-owner compatibility matchmaking and personalized wellness goal tracking.',
        tag: 'AI / WELLNESS'
      },
      {
        title: 'Automated PDF Invoices & UPI',
        description: 'Automated PDF invoice generation upon order placement with instant UPI payment integration.',
        tag: 'FINTECH'
      },
      {
        title: 'Secure Logistics & Delivery OTP',
        description: 'Live order tracking timeline with OTP-based doorstep delivery verification.',
        tag: 'LOGISTICS'
      }
    ],
    metrics: [
      { value: '5 Days', label: 'Sprint Velocity', detail: 'Shipped full-stack from scratch' },
      { value: '5 Portals', label: 'RBAC Dashboards', detail: 'Buyer, Seller, Doctor, Trainer, Delivery' },
      { value: '100%', label: 'OTP Verified', detail: 'Secure delivery handshake' },
      { value: '<65ms', label: 'MySQL API Latency', detail: 'Optimized normalized queries' }
    ],
    techCategories: [
      { category: 'Frontend & UI', skills: ['React 19 (Vite)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Ant Design'] },
      { category: 'Backend & APIs', skills: ['Node.js', 'Express', 'MySQL', 'RESTful API', 'RBAC Middleware'] },
      { category: 'Fintech & Security', skills: ['UPI Payments', 'Automated PDF Invoices', 'OTP Verification', 'JWT Auth'] },
      { category: 'Architecture & Analytics', skills: ['Rapid Application Development (RAD)', 'Recharts', 'Git', 'Vercel'] }
    ],
    tech: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Framer Motion', 'Ant Design', 'UPI'],
    codeSnippet: {
      filename: 'delivery_otp_service.ts',
      language: 'typescript',
      code: `// PetSphere Delivery OTP Verification & Invoice Generator
export async function completeDeliveryWithOTP(orderId: string, inputOtp: string, agentId: string): Promise<DeliveryResult> {
  const order = await db.orders.findOne({ where: { id: orderId, deliveryAgentId: agentId } });
  
  if (!order || order.status !== 'OUT_FOR_DELIVERY') {
    throw new Error('Order not eligible for delivery completion');
  }

  const isValid = await bcrypt.compare(inputOtp, order.deliveryOtpHash);
  if (!isValid) {
    throw new Error('Invalid OTP: Doorstep verification failed');
  }

  // Update status & generate automated signed PDF invoice
  await db.orders.update({ id: orderId }, { status: 'DELIVERED', deliveredAt: new Date() });
  const invoiceUrl = await generatePdfInvoice(order);
  
  return { success: true, orderId, invoiceUrl, status: 'DELIVERED' };
}`
    },
    bg: '#F2EFE6',
    accentColor: '#10B981',
    githubUrl: 'https://github.com/Dhruv6019/petsphere',
    liveUrl: 'https://github.com/Dhruv6019/petsphere',
    previewImage: '/images/petsphere-logo.png',
    previewStyle: 'contain'
  },
  {
    id: 'brickbybrick',
    number: '04',
    name: 'BRICKBYBRICK',
    tagline: 'DARK-THEMED MODERN REAL ESTATE MANAGEMENT & PROPERTY LISTING PLATFORM',
    category: 'Full-Stack Platform & Real Estate Tech',
    year: 'Jun 2024 – Feb 2025',
    role: 'Full-Stack Developer & UI/UX Designer',
    duration: 'Jun 2024 – Feb 2025',
    status: 'Shipped · Associated with L J Institute of Engineering and Technology (LJIET)',
    description:
      'A full-stack dark-themed real estate platform built to simplify property management and listings — featuring multi-role access for users, developers, and admins, with an architectural UI/UX design system crafted entirely in custom CSS.',
    overview: [
      'BrickByBrick is a dark-themed, modern real estate management and property listing platform developed in association with L J Institute of Engineering and Technology (LJIET).',
      'The platform was designed to make property management feel as professional and well-built as the homes it showcases — from searching listings to scheduling site visits, every step in the user journey was designed to be intuitive and fast.'
    ],
    problem:
      'Real estate platforms suffer from cluttered, outdated UIs and disconnected workflows between property searchers, developers, and administrators, leading to poor experience when browsing listings and scheduling property visits.',
    solution:
      'Built a full-stack PHP/MySQL platform with a custom CSS design system inspired by architectural aesthetics. Implemented multi-role access control (Users, Developers, Admins), intuitive property listing flows, and a seamless visit scheduling journey from search to confirmation.',
    architecture: [
      { step: '01', title: 'Custom CSS Design System', desc: 'Hand-crafted architectural dark-theme design system keeping all UI consistent, modern, and premium' },
      { step: '02', title: 'Property Listing Engine', desc: 'Full CRUD property management with image uploads, filters, and search for buyers and developers' },
      { step: '03', title: 'Multi-Role Access Control', desc: 'Separate dashboards and permissions for Users, Property Developers, and Admins' },
      { step: '04', title: 'Visit Scheduling Flow', desc: 'Intuitive user journey from property discovery to booking a site visit, optimized for speed' },
      { step: '05', title: 'Admin Management Panel', desc: 'Full admin oversight of listings, users, developers, and visit appointments' }
    ],
    keyFeatures: [
      {
        title: 'Architectural Dark UI/UX',
        description: 'A custom CSS design system crafted to feel as modern and premium as the properties it showcases.',
        tag: 'UI/UX DESIGN'
      },
      {
        title: 'Multi-Role Access Control',
        description: 'Distinct experiences and dashboards tailored for Users, Property Developers, and Administrators.',
        tag: 'RBAC'
      },
      {
        title: 'Property Listing & Management',
        description: 'Full-featured property CRUD with image support, category filters, and advanced search.',
        tag: 'REAL ESTATE'
      },
      {
        title: 'Visit Scheduling System',
        description: 'End-to-end flow from property search to scheduling a site visit — intuitive and fast.',
        tag: 'UX FLOW'
      },
      {
        title: 'PHP/MySQL Backend',
        description: 'Robust server-side logic handling role-based operations, property data, and appointment management.',
        tag: 'BACKEND'
      }
    ],
    metrics: [
      { value: '3 Roles', label: 'Access Control', detail: 'User, Developer, Admin dashboards' },
      { value: '100%', label: 'Custom CSS', detail: 'Hand-crafted design system' },
      { value: '8 Mo', label: 'Timeline', detail: 'Jun 2024 – Feb 2025' },
      { value: 'LJIET', label: 'Association', detail: 'L J Institute of Engineering & Technology' }
    ],
    techCategories: [
      { category: 'Frontend & Design', skills: ['HTML5', 'CSS3 (Custom Design System)', 'JavaScript', 'Dark Theme UI', 'Responsive Design'] },
      { category: 'Backend & Database', skills: ['PHP', 'MySQL', 'Server-side Scripting', 'CRUD Operations', 'Session Management'] },
      { category: 'Architecture & UX', skills: ['Multi-Role RBAC', 'Visit Scheduling Flow', 'Property Listing Engine', 'Admin Panel'] },
      { category: 'Tools & Association', skills: ['Git', 'GitHub', 'LJIET Academic Project', 'Full-Stack Development'] }
    ],
    tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    codeSnippet: {
      filename: 'property_listing.php',
      language: 'php',
      code: `<?php
// BrickByBrick – Multi-Role Property Listing Handler
session_start();
require_once 'db.php';

function getPropertiesByRole(PDO $db, string $role, int $userId): array {
    if ($role === 'admin') {
        $stmt = $db->query("SELECT * FROM properties ORDER BY created_at DESC");
    } elseif ($role === 'developer') {
        $stmt = $db->prepare("SELECT * FROM properties WHERE developer_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
    } else {
        // Public user — show only approved listings
        $stmt = $db->query("SELECT * FROM properties WHERE status = 'approved' ORDER BY created_at DESC");
    }
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Schedule a property visit
function scheduleVisit(PDO $db, int $propertyId, int $userId, string $visitDate): bool {
    $stmt = $db->prepare(
        "INSERT INTO visits (property_id, user_id, visit_date, status) VALUES (?, ?, ?, 'pending')"
    );
    return $stmt->execute([$propertyId, $userId, $visitDate]);
}
?>`
    },
    bg: 'linear-gradient(135deg, #0a0804 0%, #1a1208 50%, #120e06 100%)',
    accentColor: '#F59E0B',
    githubUrl: 'https://github.com/Dhruv6019/BrickByBrick',
    liveUrl: 'https://github.com/Dhruv6019/BrickByBrick'
  },
  {
    id: 'fixora',
    number: '05',
    name: 'FIXORA',
    tagline: 'FULL-STACK HOME SERVICES MARKETPLACE & CROSS-PLATFORM MANAGEMENT PLATFORM',
    category: 'Full-Stack SaaS & Cross-Platform Mobile',
    year: 'Feb 2026',
    role: 'Lead Full-Stack & Mobile Engineer',
    duration: 'Feb 2026 · Rapid Sprint',
    status: 'Shipped · Web, Android & iOS via Capacitor',
    description:
      'A high-end, full-stack home services marketplace connecting homeowners with professional service providers — featuring real-time booking, interactive technician map tracking, Row Level Security (RLS), and a cross-platform experience across Web, Android, and iOS.',
    overview: [
      'Fixora is a premium, mobile-first home services marketplace and management platform built with a modern serverless architecture on Supabase — providing homeowners a seamless experience from booking a service to tracking a technician in real time.',
      'The platform supports cross-platform deployment across Web, Android, and iOS using Capacitor, and leverages Supabase Row Level Security (RLS) for robust, granular access control across all user roles — homeowners, service providers, and admins.'
    ],
    problem:
      'Home services apps suffer from fragmented booking flows, no real-time technician visibility, and poor cross-platform experiences — leaving homeowners anxious about when providers will arrive and admins blind to operational health.',
    solution:
      'Architected a serverless full-stack platform with React, TypeScript, Tailwind CSS, ShadcnUI, and Supabase (PostgreSQL + RLS + Realtime). Integrated Capacitor for native iOS and Android packaging, and an interactive map for live technician tracking during active bookings.',
    architecture: [
      { step: '01', title: 'Serverless Backend (Supabase)', desc: 'PostgreSQL with Row Level Security (RLS) policies ensuring strict per-user data isolation across all roles' },
      { step: '02', title: 'Real-Time Booking Engine', desc: 'Supabase Realtime subscriptions powering live service booking status, provider assignment, and notifications' },
      { step: '03', title: 'Interactive Technician Map', desc: 'Live map tracking showing technician location during active service calls with ETA updates' },
      { step: '04', title: 'Cross-Platform via Capacitor', desc: 'Single React codebase compiled to native Android and iOS apps with Capacitor, plus responsive PWA for web' },
      { step: '05', title: 'Admin Operations Dashboard', desc: 'Comprehensive admin panel for managing providers, bookings, service categories, and business analytics' }
    ],
    keyFeatures: [
      {
        title: 'Real-Time Service Booking',
        description: 'Live booking engine with instant provider assignment, status updates, and Supabase Realtime notifications.',
        tag: 'REAL-TIME'
      },
      {
        title: 'Interactive Technician Tracking',
        description: 'Map-based live technician tracking with ETA updates during active home service calls.',
        tag: 'MAPS'
      },
      {
        title: 'Supabase RLS Security',
        description: 'Row Level Security policies enforcing strict per-user data isolation across homeowners, providers, and admins.',
        tag: 'SECURITY / RLS'
      },
      {
        title: 'Cross-Platform (Web + Android + iOS)',
        description: 'Single React codebase deployed as a responsive web app and native Android/iOS apps via Capacitor.',
        tag: 'CROSS-PLATFORM'
      },
      {
        title: 'Admin Operations Dashboard',
        description: 'Full business management panel covering provider onboarding, bookings, categories, and analytics.',
        tag: 'ADMIN'
      },
      {
        title: 'Modern UI with ShadcnUI',
        description: 'Premium, mobile-first interface built with TailwindCSS and ShadcnUI component library for a polished UX.',
        tag: 'UI/UX'
      }
    ],
    metrics: [
      { value: '3 Platforms', label: 'Cross-Platform', detail: 'Web, Android & iOS via Capacitor' },
      { value: 'RLS', label: 'Row Level Security', detail: 'Supabase per-user data isolation' },
      { value: 'Real-Time', label: 'Live Tracking', detail: 'Technician map + booking updates' },
      { value: 'SaaS', label: 'Architecture', detail: 'Serverless Supabase + PostgreSQL' }
    ],
    techCategories: [
      { category: 'Frontend & UI', skills: ['React', 'TypeScript', 'Tailwind CSS', 'ShadcnUI', 'Mobile-First Design'] },
      { category: 'Backend & Database', skills: ['Supabase', 'PostgreSQL', 'Row Level Security (RLS)', 'Supabase Realtime', 'Supabase Auth'] },
      { category: 'Mobile & Cross-Platform', skills: ['Capacitor', 'Android', 'iOS', 'PWA', 'Responsive Design'] },
      { category: 'Architecture & Tools', skills: ['Serverless Architecture', 'Interactive Maps', 'Git', 'GitHub', 'Vite'] }
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'Capacitor', 'TailwindCSS', 'ShadcnUI', 'PostgreSQL'],
    codeSnippet: {
      filename: 'booking_realtime.ts',
      language: 'typescript',
      code: `// Fixora — Real-Time Booking Engine with Supabase RLS + Realtime
import { supabase } from '@/lib/supabase';

export async function createBooking(booking: BookingPayload): Promise<Booking> {
  // RLS ensures only the authenticated homeowner can insert their own bookings
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      homeowner_id: booking.userId,
      service_id: booking.serviceId,
      scheduled_at: booking.scheduledAt,
      address: booking.address,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw new Error(\`Booking failed: \${error.message}\`);
  return data;
}

// Live subscription to track technician status updates
export function subscribeToBooking(bookingId: string, onUpdate: (b: Booking) => void) {
  return supabase
    .channel(\`booking:\${bookingId}\`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'bookings',
      filter: \`id=eq.\${bookingId}\`,
    }, (payload) => onUpdate(payload.new as Booking))
    .subscribe();
}`
    },
    bg: 'linear-gradient(135deg, #06040f 0%, #0d0820 50%, #110b2e 100%)',
    accentColor: '#6366F1',
    githubUrl: 'https://github.com/Dhruv6019/home-sweet-home-services',
    liveUrl: 'https://github.com/Dhruv6019/home-sweet-home-services'
  },
  {
    id: 'votely',
    number: '06',
    name: 'VOTELY',
    tagline: 'INTERACTIVE POLLING PLATFORM',
    category: 'Real-Time Systems & Data Visualisation',
    year: '2024',
    role: 'Full-Stack Developer & Frontend Engineer',
    duration: '4 Weeks',
    status: 'Shipped',
    description:
      'A real-time interactive polling platform with live result visualizations, shareable poll links, and an analytics dashboard. Built for engagement and clarity.',
    overview: [
      'Votely is a high-concurrency real-time voting application designed for conferences, creator streams, and classroom consensus polling.',
      'Participants can vote with single-tap friction, while presenter displays reflect instant SVG/Canvas chart updates as responses stream in with zero page refreshes.'
    ],
    problem:
      'Standard polling tools lag under simultaneous crowd submission bursts and suffer from fraudulent vote flooding through simple script bots.',
    solution:
      'Developed a WebSocket-driven event synchronization engine with IP-based rate limiting, fingerprint deduplication, and Chart.js dynamic visual interpolation.',
    architecture: [
      { step: '01', title: 'Poll Generation', desc: 'Customizable single/multi-choice polls with QR code & short-link sharing' },
      { step: '02', title: 'Vote Ingestion', desc: 'High-throughput Node.js microservice handling atomic submission bursts' },
      { step: '03', title: 'Anti-Fraud Guard', desc: 'Client fingerprinting + Redis sliding window rate limits preventing duplicate entries' },
      { step: '04', title: 'Broadcast Engine', desc: 'Real-time WebSocket event fanout to all active client dashboards' },
      { step: '05', title: 'Visual Analytics', desc: 'Interactive charts rendering dynamic percentages and distribution trends' }
    ],
    keyFeatures: [
      {
        title: 'Zero-Latency Live Charts',
        description: 'Instant visual bar, donut, and distribution updates without manual polling or browser reload.',
        tag: 'REAL-TIME'
      },
      {
        title: 'One-Click QR Joining',
        description: 'Auto-generated high-contrast QR codes allowing mobile participants to enter polls in <2 seconds.',
        tag: 'UX'
      },
      {
        title: 'Smart Anti-Fraud System',
        description: 'Multi-layer bot detection combining IP throttling, session hash verification, and cookie cookies.',
        tag: 'SECURITY'
      },
      {
        title: 'Historical CSV Export',
        description: 'Comprehensive demographic data exports with timestamped submission logs and breakdown analysis.',
        tag: 'DATA'
      }
    ],
    metrics: [
      { value: '<15ms', label: 'Broadcast Latency', detail: 'WebSocket message fanout' },
      { value: '1,000+', label: 'Concurrent Voters', detail: 'Stress-tested capacity' },
      { value: '99.9%', label: 'Vote Integrity', detail: 'Zero duplicate entries' },
      { value: '0 Refreshes', label: 'Client Experience', detail: 'Pure event-driven UI' }
    ],
    techCategories: [
      { category: 'Frontend', skills: ['React', 'JavaScript (ES6+)', 'Chart.js', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend & Real-Time', skills: ['Node.js', 'Express', 'Socket.IO / WebSockets', 'PHP'] },
      { category: 'Database & Cache', skills: ['MySQL', 'Redis Cache', 'JSON Web Tokens'] },
      { category: 'Deployment', skills: ['Vercel', 'Render', 'Git'] }
    ],
    tech: ['React', 'Node.js', 'MySQL', 'Chart.js', 'PHP', 'WebSockets'],
    codeSnippet: {
      filename: 'socketServer.js',
      language: 'javascript',
      code: `io.on('connection', (socket) => {
  socket.on('submit_vote', async ({ pollId, optionId, voterToken }) => {
    const isAllowed = await rateLimiter.consume(socket.handshake.address);
    if (!isAllowed) return socket.emit('error', 'Rate limit exceeded');
    
    const updatedResults = await pollService.castVote(pollId, optionId, voterToken);
    io.to(pollId).emit('results_updated', updatedResults);
  });
});`
    },
    bg: 'linear-gradient(135deg, #060f0a 0%, #0a1a10 50%, #0d2015 100%)',
    accentColor: '#10B981',
    githubUrl: 'https://github.com/dhruvteli',
    liveUrl: 'https://github.com/dhruvteli'
  },
  {
    id: 'metacal',
    number: '07',
    name: 'METACAL',
    tagline: 'AI HEALTH & CALORIE APPLICATION',
    category: 'AI / Machine Learning & Mobile Health',
    year: '2024',
    role: 'ML Engineer & Backend Developer',
    duration: '6 Weeks',
    status: 'Prototype Shipped',
    description:
      'An AI-powered calorie tracking app that uses image recognition to identify food items and estimate nutritional content. Combines ML inference with a clean React interface.',
    overview: [
      'METAcal reimagines nutritional logging by replacing tedious manual search forms with single-snapshot computer vision recognition and automated macronutrient estimation.',
      'Users photograph their meal plate, and the model classifies multi-item dishes, predicts portion sizes using reference geometry, and cross-references standard USDA food composition databases in seconds.'
    ],
    problem:
      'Over 70% of fitness app users abandon daily calorie tracking within two weeks because manual searching and weigh-scale recording is overly cumbersome.',
    solution:
      'Trained a custom image classification model on Food-101 and tailored Indian cuisine datasets, deployed via FastAPI with asynchronous image pre-processing and instant caloric calculation.',
    architecture: [
      { step: '01', title: 'Image Capture', desc: 'Mobile-optimized camera stream with automatic edge framing & glare reduction' },
      { step: '02', title: 'Inference Head', desc: 'Convolutional neural network performing multi-label dish segmentation' },
      { step: '03', title: 'Portion Estimator', desc: 'Volumetric depth approximation estimating net weight and serving size' },
      { step: '04', title: 'Nutrition Matcher', desc: 'PostgreSQL database lookup querying proteins, fats, carbs, and micronutrients' },
      { step: '05', title: 'Daily Goal Tracker', desc: 'Dynamic calorie burn ledger calculating remaining daily macronutrient allowance' }
    ],
    keyFeatures: [
      {
        title: 'Multi-Item Dish Detection',
        description: 'Simultaneous detection of multiple food items on a single plate with bounding confidence scores.',
        tag: 'AI/ML'
      },
      {
        title: 'Macro & Micronutrient Audit',
        description: 'Instant breakdown of protein, carbohydrates, healthy fats, fiber, and sodium contents.',
        tag: 'NUTRITION'
      },
      {
        title: 'Smart Daily Calorie Ledger',
        description: 'Predictive daily calorie curve forecasting weekly weight trend based on logged consumption.',
        tag: 'ANALYTICS'
      },
      {
        title: 'Offline Inference Caching',
        description: 'Client-side fallback caching frequent food items for instant logging even with poor internet.',
        tag: 'MOBILE'
      }
    ],
    metrics: [
      { value: '92.6%', label: 'Classification Accuracy', detail: 'Top-3 candidate predictions' },
      { value: '<1.4s', label: 'End-to-End Scan', detail: 'From photo to full macro report' },
      { value: '1,500+', label: 'Dishes Indexed', detail: 'Including Indian & global cuisine' },
      { value: '75%', label: 'Faster Logging', detail: 'Vs traditional search apps' }
    ],
    techCategories: [
      { category: 'AI & Machine Learning', skills: ['Python', 'TensorFlow', 'PyTorch', 'CNNs', 'Transfer Learning', 'Pillow'] },
      { category: 'Backend & APIs', skills: ['FastAPI', 'Uvicorn', 'Pydantic', 'AsyncIO', 'RESTful API'] },
      { category: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide React'] },
      { category: 'Database & Infra', skills: ['PostgreSQL', 'Docker', 'AWS S3', 'Git'] }
    ],
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Machine Learning'],
    codeSnippet: {
      filename: 'classifier_service.py',
      language: 'python',
      code: `@router.post("/analyze-meal")
async def analyze_meal(file: UploadFile = File(...), db: Session = Depends(get_db)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Run quantized transfer learning model
    predictions = food_classifier.predict(image, top_k=3)
    primary_dish = predictions[0]
    
    macros = db.query(NutritionalRecord).filter_by(dish_code=primary_dish.label).first()
    return {
        "dish": primary_dish.name,
        "confidence": float(primary_dish.confidence),
        "calories": macros.calculate_calories(portion_weight_g=250),
        "macros": {"protein": macros.protein_g, "carbs": macros.carbs_g, "fat": macros.fat_g}
    }`
    },
    bg: 'linear-gradient(135deg, #0c0812 0%, #16102a 50%, #1a1235 100%)',
    accentColor: '#A855F7',
    githubUrl: 'https://github.com/dhruvteli',
    liveUrl: 'https://github.com/dhruvteli'
  }
];
