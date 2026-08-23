import React from 'react';

interface TickerProps {
  items: string[];
  speed?: 'normal' | 'fast';
  reverse?: boolean;
  className?: string;
  separator?: string;
}

const Ticker: React.FC<TickerProps> = ({
  items,
  speed = 'normal',
  reverse = false,
  className = '',
  separator = '•',
}) => {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`ticker-track ${reverse ? 'reverse' : ''} ${speed === 'fast' ? 'ticker-track-fast' : ''}`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 pr-4">
            <span>{item}</span>
            {i < doubled.length - 1 && (
              <span className="text-accent">{separator}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
