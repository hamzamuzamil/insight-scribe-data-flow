
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    text: "ProReporter has transformed how we analyze our marketing data. We're finding insights in minutes that used to take days.",
    author: "Sarah Johnson",
    title: "Marketing Director, TechGrowth"
  },
  {
    text: "The ability to chat with our data has been revolutionary. Our team is making better decisions based on actual insights, not just hunches.",
    author: "Alex Rodriguez",
    title: "Founder, DataDriven"
  },
  {
    text: "I was blown away by how quickly ProReporter understood our complex ecommerce data and helped us spot seasonal trends we'd missed for years.",
    author: "Jessica Chen",
    title: "Analytics Lead, ShopWise"
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gradient">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from data analysts, founders, and marketers who've transformed their approach to data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass border-white/10">
              <CardContent className="p-8 flex flex-col">
                <div className="mb-4 text-primary">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                    <path d="M13.5 18H9C9 12.477 13.477 8 19 8V12C15.686 12 13 14.686 13 18V18.75C13 19.9926 14.0074 21 15.25 21H17.25C18.4926 21 19.5 19.9926 19.5 18.75V15.75C19.5 14.5074 18.4926 13.5 17.25 13.5H15.25H15C15 10.7909 16.7909 9 19 9V8C13.4772 8 9 12.4772 9 18H13.5ZM13.5 18V21M33 18H28.5C28.5 12.477 32.977 8 38.5 8V12C35.186 12 32.5 14.686 32.5 18V18.75C32.5 19.9926 33.5074 21 34.75 21H36.75C37.9926 21 39 19.9926 39 18.75V15.75C39 14.5074 37.9926 13.5 36.75 13.5H34.75H34.5C34.5 10.7909 36.2909 9 38.5 9V8C32.9772 8 28.5 12.4772 28.5 18H33ZM33 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <p className="mb-6 text-foreground/90 italic">{testimonial.text}</p>
                
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
