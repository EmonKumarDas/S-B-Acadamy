import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Smart Attendance Tracking`,
      description: `Automated attendance system that saves hours of manual work while ensuring accurate records.`,
      icon: <i className="las la-user-check"></i>,
    },
    {
      heading: `Streamlined Fee Management`,
      description: `Hassle-free fee collection with automated reminders and real-time payment tracking.`,
      icon: <i className="las la-money-bill-wave"></i>,
    },
    {
      heading: `Comprehensive Student Records`,
      description: `All student information in one place - from academic performance to attendance history.`,
      icon: <i className="las la-user-graduate"></i>,
    },
    {
      heading: `Parent Communication Hub`,
      description: `Keep parents informed with automated updates about their child's progress and school events.`,
      icon: <i className="las la-comments"></i>,
    },
    {
      heading: `Teacher Dashboard`,
      description: `Everything teachers need - class schedules, student records, and grading tools in one interface.`,
      icon: <i className="las la-chalkboard-teacher"></i>,
    },
    {
      heading: `Data-Driven Insights`,
      description: `Make informed decisions with detailed analytics on student performance and school operations.`,
      icon: <i className="las la-chart-line"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Thompson`,
      designation: `School Principal`,
      content: `We've reduced our administrative workload by 60% since implementing this system. Our teachers can now focus more on teaching and less on paperwork.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `IT Administrator`,
      content: `The seamless integration and user-friendly interface made the transition incredibly smooth. Support team is exceptional.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `Head Teacher`,
      content: `Parent communication has improved dramatically. We're seeing much better engagement in student progress meetings.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small schools getting started with digital management`,
      monthly: 99,
      yearly: 990,
      features: [
        `Up to 500 students`,
        `Basic attendance tracking`,
        `Simple fee management`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing schools needing advanced features`,
      monthly: 199,
      yearly: 1990,
      features: [
        `Up to 2000 students`,
        `Advanced analytics`,
        `Parent portal`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solution for large educational institutions`,
      monthly: 399,
      yearly: 3990,
      features: [
        `Unlimited students`,
        `Custom integrations`,
        `Dedicated support`,
        `Advanced security`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How long does it take to implement the system?`,
      answer: `Most schools are up and running within 2-3 weeks, including staff training and data migration.`,
    },
    {
      question: `Is my school data secure?`,
      answer: `Yes, we use bank-level encryption and comply with all educational data protection regulations.`,
    },
    {
      question: `Can parents access the system?`,
      answer: `Yes, parents get their own login to track their child's progress, attendance, and fees.`,
    },
    {
      question: `Do you provide training?`,
      answer: `Yes, we provide comprehensive training for all staff members and ongoing support.`,
    },
  ]

  const steps = [
    {
      heading: `Schedule a Demo`,
      description: `See how our platform can transform your school's administration.`,
    },
    {
      heading: `Customize Setup`,
      description: `We'll configure the system to match your school's specific needs.`,
    },
    {
      heading: `Data Migration`,
      description: `We'll securely transfer your existing records to the new system.`,
    },
    {
      heading: `Start Saving Time`,
      description: `Watch your administrative efficiency improve from day one.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in paperwork and manual data entry`,
    },
    {
      emoji: `😤`,
      title: `Missing important updates and deadlines`,
    },
    {
      emoji: `😩`,
      title: `Struggling with parent communication`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your School Administration from Chaos to Clarity`}
        subtitle={`Join over 1000 schools who've reduced administrative work by 60% while improving parent satisfaction by 45%`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/BIkltJ-sbacadamy-AUnI`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy schools`}
          />
        }
      />
      <LandingSocialProof
        title={`Trusted By Leading Educational Institutions`}
      />
      <LandingPainPoints
        title={`Schools waste 48% of administrative time on paperwork - Is this affecting your teaching quality?`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to Efficient School Management`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Run Your School Efficiently`}
        subtitle={`Powerful tools that save time and improve communication`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Hundreds of Schools Already Saving Time and Money`}
        subtitle={`See how other educational institutions have transformed their administration`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your School's Future`}
        subtitle={`Choose the plan that fits your school's size and needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Digital School Management`}
        subtitle={`Everything you need to know about getting started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your School Administration?`}
        subtitle={`Join over 1000 schools already saving 60% of their administrative time`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
