const streaks = Array.from({ length: 6 }, (_, index) => index);

export default function StoryFlight() {
  return (
    <div className="story-flight" aria-hidden="true">
      <div className="story-flight__grid" />
      <div className="story-flight__streaks">
        {streaks.map((streak) => <span key={streak} />)}
      </div>
      <div className="story-flight__craft">
        <span className="story-flight__cockpit" />
        <span className="story-flight__body" />
        <span className="story-flight__fin" />
        <span className="story-flight__trail story-flight__trail--one" />
        <span className="story-flight__trail story-flight__trail--two" />
      </div>
      <div className="story-flight__caption"><span>Iteration / 06</span><span>Unknown field</span></div>
    </div>
  );
}
