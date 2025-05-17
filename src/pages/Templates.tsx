
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templates = [
  {
    title: "Marketing Funnel Analysis",
    description: "Track conversion rates, CAC, and ROI across your marketing channels.",
    category: "Marketing",
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Sales Trend Analysis",
    description: "Understand sales patterns, forecast future performance, and identify opportunities.",
    category: "Sales",
    previewUrl: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "SaaS Metrics Dashboard",
    description: "Track MRR, churn, LTV, CAC and other key SaaS performance metrics.",
    category: "Business",
    previewUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "E-commerce Revenue Analysis",
    description: "Deep dive into product performance, customer behavior, and revenue drivers.",
    category: "E-commerce",
    previewUrl: "https://images.unsplash.com/photo-1553969546-6f7388a7e07c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Social Media Performance",
    description: "Track engagement metrics, follower growth, and content performance across platforms.",
    category: "Marketing",
    previewUrl: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Customer Satisfaction Survey",
    description: "Analyze feedback, identify trends, and segment responses by demographic.",
    category: "Customer Service",
    previewUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop",
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Analytics Templates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with pre-built templates designed for specific business needs.
              Just upload your data and get instant insights.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Button variant="outline" className="bg-primary/10">All</Button>
            <Button variant="outline">Marketing</Button>
            <Button variant="outline">Sales</Button>
            <Button variant="outline">Business</Button>
            <Button variant="outline">E-commerce</Button>
            <Button variant="outline">Customer Service</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, i) => (
              <Card key={i} className="glass overflow-hidden hover-lift">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={template.previewUrl} 
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <CardContent className="p-5">
                  <span className="inline-block text-xs font-medium bg-primary/20 text-primary rounded-full px-2 py-1 mb-2">
                    {template.category}
                  </span>
                  <h3 className="text-xl font-medium mb-2">{template.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                  <Button className="w-full">Use This Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
