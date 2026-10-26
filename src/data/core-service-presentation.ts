export type StartingPath = { label: string; title: string; text: string; steps: string[] };
type Milestone = { label: string; title: string; text: string };
type Presentation = {
  description: string;
  processTitle: string;
  processDescription: string;
  processNote: string;
  paths: StartingPath[];
  milestones: Milestone[];
  summaries: Record<string, string>;
};

export const coreServicePresentation: Record<string, Presentation> = {
  gmb: {
    description: "Profile research, useful updates and clear reporting from your in-house ISR team. Built for the services you offer and the places you genuinely work.",
    processTitle: "Research first. Then regular attention.",
    processDescription: "A clear start, ongoing management, and a review you can follow.",
    processNote: "Early movement may appear around week three. Meaningful business results can take three months or longer, depending on your starting point and market.",
    paths: [],
    milestones: [],
    summaries: {
      "service-area": "Your profile should reflect where you travel, which jobs you take, and how each location operates. Explore the business types to see the difference.",
      "profile-activity": "Real work gives your profile something useful to say. You supply photos and business changes; ISR prepares updates and maintains the agreed schedule.",
      "reviews-and-recovery": "Some concerns need a customer conversation. Others need documentation and a platform report. We help identify the appropriate next step.",
    },
  },
  answering: {
    description: "Human-led answering, appointment support and organized follow-up. Your callers get help based on your business instructions, with mixed human and AI support outside the weekday human coverage window.",
    processTitle: "Learn your business. Prepare the next conversation.",
    processDescription: "We agree the answers, connect the workflow, and review how it works with you.",
    processNote: "Human coverage is Monday–Friday, 9 AM–5 PM Houston / Central Time. Coverage outside those hours combines humans and AI according to your agreed scope.",
    paths: [
      { label: "I'm missing incoming calls", title: "Start with how calls reach your business.", text: "We review your current number, call demand and common requests, then agree forwarding or a suitable VoIP setup. Your business information sets the answering instructions.", steps: ["Review call demand", "Agree coverage & routing", "Prepare business answers"] },
      { label: "I need help booking appointments", title: "Make each booking fit your availability.", text: "Tell us what can be booked, how long it takes, where you travel and when your team is available. We schedule within your approved rules and refer exceptions to you.", steps: ["Define appointment types", "Connect agreed calendar access", "Book within your rules"] },
      { label: "I already have a CRM", title: "Keep your team informed in the right place.", text: "We assess the access and update workflow for your existing CRM. If you need a client workspace, ISR HQ can show the agreed call activity, actions and next responsibilities.", steps: ["Assess system access", "Agree required call details", "Confirm the handoff"] },
    ],
    milestones: [
      { label: "Business preparation", title: "Agree the call rules", text: "Services, approved answers, schedules and escalation contacts become the instructions for your answering workflow." },
      { label: "Signed arrangement", title: "Train & test the workflow", text: "The paid-service pilot adds a week before the next recurring payment. Separate one-week trials are also available under a signed agreement." },
      { label: "Daily + weekly review", title: "Keep the handoff useful", text: "Review handled enquiries, appointments, follow-up and unanswered questions in your agreed CRM or ISR HQ workflow." },
    ],
    summaries: {
      coverage: "Know who answers and when. Explore the weekday human window and the mixed human/AI arrangement for other hours.",
      "booking-rules": "A booking needs more than an open time slot. Your appointment types, service areas, availability and approval rules shape the next step.",
      pilot: "The pilot and standalone trial are different arrangements. See how each works and what your signed agreement needs to cover.",
      "call-information": "Useful call records show the request, the action and the next person responsible. Explore what your team needs to pick up the conversation.",
    },
  },
  seo: {
    description: "Website SEO built around the services you sell and the areas you cover. Our in-house team connects technical fixes, useful content and clear reporting through ISR HQ.",
    processTitle: "Understand the site. Work on the right priorities.",
    processDescription: "Research and implementation stay connected, with visible work and regular review.",
    processNote: "Timing depends on your website, competition, access and the work involved. Resolved technical issues and relevant search activity are reviewed separately from qualified enquiries.",
    paths: [
      { label: "I have a website already", title: "Assess the website before recommending a rebuild.", text: "We review your pages, technical condition, access and search data. The plan identifies which changes can be made and whether any larger development belongs in a separate scope.", steps: ["Review the existing site", "Establish a baseline", "Prioritize useful changes"] },
      { label: "Traffic brings the wrong enquiries", title: "Match the pages to the work you actually want.", text: "We look at the searches and pages attracting visitors, then compare them with your services, coverage and lead feedback. More traffic is only useful when it fits the business.", steps: ["Review queries & pages", "Define suitable enquiries", "Improve service information"] },
      { label: "I serve several areas", title: "Plan around genuine coverage.", text: "Tell us where your team works and whether the services differ by location. We assess which pages would help customers, rather than repeating the same content under different city names.", steps: ["Confirm real service areas", "Find useful page roles", "Scope content & tracking"] },
    ],
    milestones: [
      { label: "Audit & baseline", title: "Find the limiting issues", text: "Review technical health, existing content, search performance and the services that matter commercially." },
      { label: "Agreed implementation", title: "Fix, clarify & connect", text: "Our team carries out the technical and content work included in your plan, with approvals and access made explicit." },
      { label: "Reporting & priorities", title: "Review what changed", text: "ISR HQ updates and agreed reports distinguish completed work, measured activity and the next priorities." },
    ],
    summaries: {
      "technical-and-content": "A page needs to be accessible and useful. Explore how technical fixes and clearer service information solve different problems.",
      "services-and-locations": "The right enquiry depends on both the job and the location. See how your actual services guide page planning.",
      "content-that-helps": "Good service content helps someone make a decision. Explore the connection between a customer question, a useful answer and a clear next step.",
    },
  },
  ppc: {
    description: "Google Ads planned around your actual jobs, service areas and budget. We connect relevant campaigns with useful landing pages and reporting that explains enquiry quality.",
    processTitle: "Plan the offer. Prepare the journey. Review the response.",
    processDescription: "Know what you are advertising, where people land and how enquiries will be assessed.",
    processNote: "Access, approvals, page work and platform reviews affect launch timing. Campaign activity is not a promise of a particular number of leads, bookings or sales.",
    paths: [
      { label: "I'm starting with Google Ads", title: "Set the priorities before spending.", text: "We discuss your services, coverage, capacity and budget, then assess the account, destination pages and measurement needed for the campaign scope.", steps: ["Define services & locations", "Agree budget & scope", "Prepare pages & tracking"] },
      { label: "I'm already running ads", title: "Review the existing account and enquiry journey.", text: "With appropriate access, we assess campaign history, targeting, tracking and landing pages. Your feedback helps distinguish suitable enquiries from activity that does not fit the business.", steps: ["Review account history", "Check measurement coverage", "Prioritize improvements"] },
      { label: "Clicks aren't becoming customers", title: "Find where the journey is breaking down.", text: "We review search relevance, the destination page and the contact action, then use your lead feedback to understand what happened after the click. Bookings and sales need reliable business records.", steps: ["Check search & service fit", "Review the landing page", "Assess enquiry outcomes"] },
    ],
    milestones: [
      { label: "Offer & budget", title: "Define the jobs to target", text: "Agree services, coverage, offers, capacity and the budget responsibilities before preparing the campaign." },
      { label: "Preparation & checks", title: "Connect the ad to the page", text: "Prepare the scoped ads, destination and tracking, then check the contact journey and launch dependencies." },
      { label: "Ongoing review", title: "Follow the enquiry further", text: "Review spending and tracked actions alongside your feedback about qualified leads, bookings and customers." },
    ],
    summaries: {
      "targeting-real-services": "Useful targeting starts with what you sell, where you travel and the jobs you can accept. Explore which requests belong in the campaign.",
      "budget-and-landing-pages": "Media spend, management and page work pay for different things. Explore the scope behind each cost before comparing proposals.",
      "lead-quality": "A click, enquiry, qualified lead and booked job are different stages. See what evidence is needed to move from one to the next.",
    },
  },
};
