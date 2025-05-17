
import { CountUp } from "@/components/CountUp";

export const Stats = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="glass rounded-2xl p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary flex items-center">
                <CountUp end={500} duration={2.5} />
                <span className="text-lg ml-1">K+</span>
              </h3>
              <p className="text-muted-foreground">Data Points Analyzed</p>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary flex items-center">
                <CountUp end={92} duration={2} />
                <span className="text-lg ml-1">%</span>
              </h3>
              <p className="text-muted-foreground">Faster Insights</p>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary flex items-center">
                <CountUp end={12} duration={1.5} />
                <span className="text-lg ml-1">K+</span>
              </h3>
              <p className="text-muted-foreground">Business Users</p>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary flex items-center">
                <CountUp end={99} duration={2.5} />
                <span className="text-lg ml-1">%</span>
              </h3>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
