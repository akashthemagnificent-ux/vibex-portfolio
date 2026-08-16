type BoxLoaderProps = {
  label?: string;
};

/**
 * A four-cube CSS loader adapted from the supplied component.
 * It remains dependency-free and inherits the surrounding Vibex color system.
 */
export default function BoxLoader({ label = "Loading proof" }: BoxLoaderProps) {
  return (
    <div className="box-loader" role="status" aria-live="polite" aria-label={label}>
      <div className="box-loader__boxes" aria-hidden="true">
        {[1, 2, 3, 4].map((box) => (
          <div className={`box-loader__box box-loader__box--${box}`} key={box}>
            <span className="box-loader__face box-loader__face--front" />
            <span className="box-loader__face box-loader__face--right" />
            <span className="box-loader__face box-loader__face--top" />
            <span className="box-loader__face box-loader__face--back" />
          </div>
        ))}
      </div>
      <span className="box-loader__label">{label}</span>
    </div>
  );
}
