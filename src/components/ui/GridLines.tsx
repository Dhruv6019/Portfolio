import React from 'react';

const GridLines: React.FC = () => {
  return (
    <div className="grid-overlay" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="grid-col-line" />
      ))}
    </div>
  );
};

export default GridLines;
