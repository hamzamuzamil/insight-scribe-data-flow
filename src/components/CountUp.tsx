
import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
}

export const CountUp = ({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
}: CountUpProps) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const frameRef = useRef(0);
  const startTimeRef = useRef(0);
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTimeRef.current) / (duration * 1000), 1);
      
      if (progress < 1) {
        const value = start + (end - start) * easeOutQuart(progress);
        countRef.current = value;
        setCount(value);
        frameRef.current = requestAnimationFrame(step);
      } else {
        countRef.current = end;
        setCount(end);
      }
    };
    
    frameRef.current = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [start, end, duration]);

  // Ease out function
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  return <>{count.toFixed(decimals)}</>;
};
