/**
 * Orbiting Monolith style: compact catalog labeling that keeps the layout
 * precise and editorial while letting the visual material carry the drama.
 */
type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

export default function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <div className={`section-label ${className}`}>
      <span>{index}</span>
      <i />
      <span>{label}</span>
    </div>
  );
}
