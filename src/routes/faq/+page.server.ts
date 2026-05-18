import { buildMeta } from '$lib/seo';
import { buildFAQSchema, buildBreadcrumbSchema } from '$lib/schema/builders';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const faqs = [
        {
            question: "What is the E-WIN Project?",
            answer: "The Elite Workforce Impact Nigeria (E-WIN) Project is a strategic initiative aimed at architecting the future of the African workforce through AI-driven empowerment and digital upskilling."
        },
        {
            question: "Who is Omale Danjuma Ogale?",
            answer: "Omale Danjuma Ogale is a visionary tech leader, full-stack engineer, and the Founder & CEO of the E-WIN Project. He is dedicated to youth empowerment and nation-building in Nigeria."
        },
        {
            question: "How can I join the I-AM Network?",
            answer: "You can join the Impact Ambassador Model (I-AM) Network by applying through our official portal. We look for dedicated youths ready to lead and build through technology."
        },
        {
            question: "What services does the E-WIN platform provide?",
            answer: "We offer AI consultancy, strategic project management, digital transformation advisory, and high-impact advocacy services for organizations and individuals."
        },
        {
            question: "Is the E-WIN Project an NGO?",
            answer: "E-WIN is a strategic impact organization that operates as a bridge between technology, policy, and workforce development, focusing on scalable economic empowerment."
        },
        {
            question: "How secure is my data on the E-WIN platform?",
            answer: "We utilize enterprise-grade security protocols, including Firebase Authentication and Convex's ACID-compliant backend, to ensure 100% data integrity and privacy."
        },
        {
            question: "What is the role of an Impact Ambassador?",
            answer: "Ambassadors serve as catalysts for digital transformation in their communities, leveraging E-WIN's resources to drive local economic growth and skill acquisition."
        },
        {
            question: "Can I partner with E-WIN as an organization?",
            answer: "Yes, we welcome strategic partnerships with corporate entities, government agencies, and academic institutions to scale our impact across Africa."
        }
    ];

    const seo = buildMeta({
        title: "Frequently Asked Questions",
        description: "Direct answers to common inquiries about the E-WIN Project, our mission, leadership, and the I-AM Network.",
        ogType: "website",
        jsonLd: [
            buildFAQSchema(faqs),
            buildBreadcrumbSchema([
                { name: "Home", item: "/" },
                { name: "FAQ", item: "/faq" }
            ])
        ]
    });

    return {
        seo,
        faqs
    };
};
