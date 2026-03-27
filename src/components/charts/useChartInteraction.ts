import { useEffect, useMemo, useState } from 'react';

export function useChartInteraction(length: number) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    if (hoveredIndex !== null || length <= 1) return;
    const timer = window.setInterval(() => {
      setAutoIndex((current) => (current + 1) % length);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [hoveredIndex, length]);

  useEffect(() => {
    setAutoIndex(0);
    setHoveredIndex(null);
  }, [length]);

  const activeIndex = useMemo(() => {
    if (length <= 0) return -1;
    return hoveredIndex ?? Math.min(autoIndex, length - 1);
  }, [autoIndex, hoveredIndex, length]);

  return {
    activeIndex,
    isHovering: hoveredIndex !== null,
    setHoveredIndex,
  };
}
