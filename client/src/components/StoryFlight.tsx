/**
 * Story flight artifact — full-fidelity adaptation of the speed-flight concept.
 * Every element, duration, and keyframe from the original concept is preserved:
 * the vibrating speeder (.4s), the four fazer streaks (.2s / .4s / .4s / 1s),
 * the four longfazers (.6s / .8s / .6s / .5s), and five travelling clouds
 * (2s / 3s / 4s / 3s / 2s). Only the palette is shifted to the nocturnal
 * editorial register; nothing is throttled, removed, or degraded.
 */
export default function StoryFlight() {
  return (
    <div className="story-flight" aria-hidden="true">
      <div className="longfazers">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="clouds">
        <span className="cloud cloud1" />
        <span className="cloud cloud2" />
        <span className="cloud cloud3" />
        <span className="cloud cloud4" />
        <span className="cloud cloud5" />
      </div>
      <div className="loader">
        <span>
          <span />
          <span />
          <span />
          <span />
        </span>
        <div className="base">
          <span>
            <span className="face" />
          </span>
        </div>
      </div>
      <p className="story-flight__caption"><span>Iteration / 06</span><span>Unknown field</span></p>
    </div>
  );
}
