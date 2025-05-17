import { useState } from "react";
import { motion } from "framer-motion";

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Manager at Tech Solutions",
    quote: "ProReporter has transformed the way we analyze data. The AI-driven insights are incredibly accurate and have helped us make data-driven decisions faster than ever before.",
    image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "David Lee",
    title: "CEO of Innovate Corp",
    quote: "I was skeptical about AI analytics, but ProReporter exceeded my expectations. It's user-friendly, provides actionable insights, and has significantly improved our business strategy.",
    image: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9aa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    name: "Emily Chen",
    title: "Data Analyst at Global Dynamics",
    quote: "As a data analyst, I appreciate the depth of analysis ProReporter offers. The ability to ask natural language questions and get instant visualizations is a game-changer.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d674c8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const testimonialVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
};

// Export component for lazy loading
export const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gradient">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who have transformed their businesses with ProReporter.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            key={currentTestimonial}
            className="glass p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden"
            variants={testimonialVariants}
          >
            <img
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold mb-1">{testimonials[currentTestimonial].name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{testimonials[currentTestimonial].title}</p>
              <p className="text-lg italic text-gray-300">“{testimonials[currentTestimonial].quote}”</p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full h-10 w-10 glass shadow-glow-primary flex items-center justify-center"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full h-10 w-10 glass shadow-glow-primary flex items-center justify-center"
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default { TestimonialSection };
