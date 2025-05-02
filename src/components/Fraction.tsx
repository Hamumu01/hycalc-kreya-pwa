
import React from 'react';

interface FractionProps {
  numerator: string | number;
  denominator: string | number;
}

const Fraction: React.FC<FractionProps> = ({ numerator, denominator }) => {
  return (
    <div className="fraction">
      <div className="fraction-numerator">{numerator}</div>
      <div className="fraction-denominator">{denominator}</div>
    </div>
  );
};

export default Fraction;
