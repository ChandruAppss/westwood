interface LogoProps {
  className?: string;
  dark?: boolean; // kept for API compat, ignored — site is always dark
}

export default function WestwoodLogo({ className = '' }: LogoProps) {
  const taglineColor = '#ffffff';
  const lineColor    = 'rgba(113,184,95,0.45)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 160"
      aria-label="Westwood Restaurant"
      className={className}
      style={{ display: 'block' }}
    >
      <text
        x="250" y="112"
        fontFamily="Pacifico, 'Brush Script MT', cursive"
        fontSize="108"
        fill="#71b85f"
        textAnchor="middle"
        letterSpacing="-1"
      >
        Westwood
      </text>
      <line x1="30"  y1="132" x2="125" y2="132" stroke={lineColor} strokeWidth="0.8" />
      <line x1="375" y1="132" x2="470" y2="132" stroke={lineColor} strokeWidth="0.8" />
      <text
        x="250" y="152"
        fontFamily="'Oswald', Arial, sans-serif"
        fontSize="16"
        fontWeight="300"
        fill={taglineColor}
        textAnchor="middle"
        letterSpacing="5"
      >
        BREAKFAST · LUNCH · DINNER
      </text>
    </svg>
  );
}
