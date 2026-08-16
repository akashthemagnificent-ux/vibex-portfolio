/**
 * VIBEX / Audio direction: the self-interview begins only after an intentional user gesture,
 * then plays authored narration and quiet procedural transition sound without a visible toggle.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { audioScenes, type AudioScene } from "@/lib/ash";

export function useCinematicAudio() {
  const [started, setStarted] = useState(false);
  const activeAudio = useRef<HTMLAudioElement | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const lastScene = useRef<AudioScene | null>(null);

  const transition = useCallback((brightness = 1) => {
    const context = audioContext.current;
    if (!context) return;
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(170 * brightness, now);
    osc.frequency.exponentialRampToValueAtTime(820 * brightness, now + 0.34);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(620, now);
    filter.frequency.exponentialRampToValueAtTime(3400, now + 0.28);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
    osc.connect(filter).connect(gain).connect(context.destination);
    osc.start(now);
    osc.stop(now + 0.56);
  }, []);

  const playScene = useCallback(
    async (scene: AudioScene) => {
      if (!started || lastScene.current === scene) return;
      lastScene.current = scene;
      activeAudio.current?.pause();
      const audio = new Audio(audioScenes[scene]);
      audio.volume = 0.96;
      activeAudio.current = audio;
      transition(scene === "vision" ? 0.7 : 1);
      try {
        await audio.play();
      } catch {
        // Browsers may refuse playback after their activation window; visual storytelling remains intact.
      }
    },
    [started, transition],
  );

  const begin = useCallback(async () => {
    if (!audioContext.current) audioContext.current = new AudioContext();
    await audioContext.current.resume();
    setStarted(true);
    lastScene.current = null;
    transition(0.75);
    const audio = new Audio(audioScenes.signal);
    audio.volume = 0.96;
    activeAudio.current = audio;
    lastScene.current = "signal";
    try {
      await audio.play();
    } catch {
      // An intentional start gesture makes this available in current browsers.
    }
  }, [transition]);

  useEffect(
    () => () => {
      activeAudio.current?.pause();
      audioContext.current?.close();
    },
    [],
  );

  return { begin, playScene, started };
}
