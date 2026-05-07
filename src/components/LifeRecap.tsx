import { useRef, useState } from 'react';
import DetailView from './DetailView';
import InkText from './InkText';

import uniDay      from '../assets/UniDay1.jpg';
import nephew      from '../assets/nephew_neice.jpg';
import prom        from '../assets/feelinfreshforprom.jpg';
import monkey      from '../assets/monkeyseemonkeydo.jpg';
import frosh       from '../assets/FROSH!!.jpg';
import mariobaker  from '../assets/mariobaker.jpg';
import couldIModel from '../assets/theywantedtoknowificanmodel.jpg';
import gym         from '../assets/gym.jpg';
import careernight from '../assets/careernight.jpg';
import lilbro      from '../assets/lilbro.jpg';
import lilsis      from '../assets/lilsisgrad.jpg';
import wedding     from '../assets/weddingszn.jpg';
import dontmess    from '../assets/Dontmesswiththesivashankars.jpg';
import lookincute  from '../assets/lookincute.jpg';
import fam         from '../assets/TheFam.jpg';
import cuzzo       from '../assets/cuzzo.jpg';
import whatLooking from '../assets/what_we_lookin_for.jpg';
import concert     from '../assets/concert.jpg';
import formal      from '../assets/formalflick.jpg';
import opencv      from '../assets/opencv_verilog.jpg';
import president   from '../assets/Mr.President.jpg';
import grandpa     from '../assets/grandpa.jpg';
import grandma     from '../assets/grandma.jpg';
import lockedin    from '../assets/lockedin.jpg';

// Secret-gallery photos. Imported separately so they only appear once
// the user has unlocked them via the hold-and-press trigger.
import secret_whereStarted from '../assets/secret/where_it_started.jpg';
import secret_firstphoto   from '../assets/secret/firstphoto.jpg';
import secret_urlockedin   from '../assets/secret/urlockedin.jpg';
import secret_ugotmyheart  from '../assets/secret/ugotmyheart.jpg';
import secret_wetuff       from '../assets/secret/Wetufffff.jpg';
import secret_aanin        from '../assets/secret/aanin.jpg';
import secret_dancefloor   from '../assets/secret/middle_of_the_dance_floor.jpg';
import secret_meinlove     from '../assets/secret/meinlove.jpg';
import secret_urpretty     from '../assets/secret/ur_pretty.jpg';
import secret_welookhot    from '../assets/secret/we_look_hot.jpg';
import secret_hotnonchalant from '../assets/secret/hot_and_nonchalant.jpg';
import secret_pjparty      from '../assets/secret/pjparty.jpg';
import secret_thaipongal   from '../assets/secret/thai_pongal.jpg';
import secret_gotrain      from '../assets/secret/go_train.jpg';
import secret_byrouge      from '../assets/secret/by_the_rouge.jpg';
import secret_hardatwork   from '../assets/secret/you_hard_at_work_and_me_hard.jpg';
import secret_inlove       from '../assets/secret/im_in_love_but_she_dont_know.jpg';

type Photo = { src: string; caption: string };

const publicPhotos: Photo[] = [
  { src: uniDay,      caption: 'Uni Day 1s' },
  { src: nephew,      caption: 'Nephew and Niece' },
  { src: prom,        caption: "Feelin' fresh for prom" },
  { src: monkey,      caption: 'Monkey see, monkey do' },
  { src: frosh,       caption: 'FROSH!!' },
  { src: mariobaker,  caption: 'Mario Baker era' },
  { src: couldIModel, caption: 'Model status' },
  { src: gym,         caption: 'Gym flicks' },
  { src: careernight, caption: 'Career Night' },
  { src: lilbro,      caption: 'Lil bro' },
  { src: lilsis,      caption: 'Lil sis grad' },
  { src: wedding,     caption: 'Wedding szn' },
  { src: dontmess,    caption: 'Sivashankars' },
  { src: lookincute,  caption: "Lookin' cute" },
  { src: fam,         caption: 'The fam' },
  { src: cuzzo,       caption: 'Cuzzo' },
  { src: whatLooking, caption: 'What we lookin for' },
  // The trigger — see SecretTrigger below for the hold-to-unlock mechanic
  { src: lockedin,    caption: '...' },
  { src: concert,     caption: 'First concert' },
  { src: formal,      caption: 'Formal flick' },
  { src: opencv,      caption: 'OpenCV project' },
  { src: president,   caption: 'Mr. President' },
  { src: grandpa,     caption: 'Grandpa' },
  { src: grandma,     caption: 'Grandma' },
];

const secretPhotos: Photo[] = [
  { src: lockedin,            caption: 'thangam · my everything ♡' },
  { src: secret_whereStarted, caption: 'where it started' },
  { src: secret_firstphoto,   caption: 'first photo' },
  { src: secret_urlockedin,   caption: "u're locked in" },
  { src: secret_ugotmyheart,  caption: 'u got my heart' },
  { src: secret_wetuff,       caption: 'we tufffff' },
  { src: secret_aanin,        caption: 'Aanin' },
  { src: secret_dancefloor,   caption: 'middle of the dance floor' },
  { src: secret_meinlove,     caption: 'me in love' },
  { src: secret_urpretty,     caption: "u're pretty" },
  { src: secret_welookhot,    caption: 'we look hot' },
  { src: secret_hotnonchalant,caption: 'hot & nonchalant' },
  { src: secret_pjparty,      caption: 'pj party' },
  { src: secret_thaipongal,   caption: 'thai pongal' },
  { src: secret_gotrain,      caption: 'GO train' },
  { src: secret_byrouge,      caption: 'by the rouge' },
  { src: secret_hardatwork,   caption: 'hard at work' },
  { src: secret_inlove,       caption: "in love but she don't know" },
];

function pseudoRotate(i: number) {
  const r = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5, -3, 1];
  return r[i % r.length];
}

/** A photo tile that requires a 2-second press-and-hold to unlock. */
function SecretTrigger({ onUnlock }: { onUnlock: () => void }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const start = () => {
    if (holding) return;
    setHolding(true);
    const startedAt = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - startedAt) / 2000);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    timerRef.current = window.setTimeout(() => {
      onUnlock();
      cancel();
    }, 2000);
  };

  const cancel = () => {
    setHolding(false);
    setProgress(0);
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  return (
    <figure
      className="parchment-frame scrapbook-tile relative cursor-pointer select-none"
      style={{
        transform: `rotate(${pseudoRotate(17)}deg) scale(${holding ? 0.97 : 1})`,
        transition: 'transform 0.25s ease, box-shadow 0.4s ease',
        boxShadow: holding
          ? '0 0 0 2px rgba(155, 58, 42, 0.6), 0 0 30px rgba(155, 58, 42, 0.45)'
          : undefined,
      }}
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      onTouchCancel={cancel}
    >
      <img
        src={lockedin}
        alt="Hold to unlock"
        loading="lazy"
        className="block w-full h-auto"
        style={{
          filter: holding
            ? 'sepia(0.05) contrast(1.05) brightness(1.05)'
            : 'sepia(0.4) contrast(0.92) brightness(0.85)',
          transition: 'filter 0.4s ease',
        }}
      />

      {/* Locked-in overlay text */}
      <div
        className="absolute inset-3 flex items-center justify-center pointer-events-none"
        style={{
          background: holding
            ? 'rgba(20, 12, 6, 0.15)'
            : 'rgba(20, 12, 6, 0.55)',
          transition: 'background 0.4s ease',
        }}
      >
        <div className="text-center">
          <div
            className="serif italic text-[10px] md:text-xs smallcaps"
            style={{ color: holding ? '#f0d8b0' : 'rgba(245, 234, 208, 0.85)' }}
          >
            {holding ? 'unlocking...' : 'locked'}
          </div>
          <div
            className="serif italic text-[11px] md:text-sm mt-1"
            style={{ color: holding ? '#f0d8b0' : 'rgba(245, 234, 208, 0.65)' }}
          >
            {holding ? 'keep holding' : 'press and hold'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {holding && (
        <div
          className="absolute left-3 right-3 bottom-3 h-[2px] overflow-hidden"
          style={{ background: 'rgba(245, 234, 208, 0.25)' }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c25040, #9b3a2a)',
              transition: 'none',
            }}
          />
        </div>
      )}

      <figcaption className="text-center serif italic text-ink-faded text-xs md:text-sm mt-2 mb-1">
        — ... —
      </figcaption>
    </figure>
  );
}

export default function LifeRecap() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <DetailView id="gallery" chapter="Chapter V" title="Photo Gallery">
      <div className="max-w-4xl mx-auto mb-10 md:mb-16 text-center">
        <InkText className="serif italic text-ink-soft text-base md:text-lg leading-[1.9]">
          {`A scrapbook of moments worth keeping — pinned alongside the rest of the story so the people behind it aren't forgotten.`}
        </InkText>

        <div className="ink-divider serif italic text-ink-faded mt-8 max-w-md mx-auto text-sm">
          <span>twenty twenty-six</span>
        </div>
      </div>

      {!unlocked ? (
        <div className="scrapbook">
          {publicPhotos.map((p, i) =>
            p.src === lockedin ? (
              <SecretTrigger key="trigger" onUnlock={() => setUnlocked(true)} />
            ) : (
              <figure
                key={i}
                className="parchment-frame scrapbook-tile"
                style={{ transform: `rotate(${pseudoRotate(i)}deg)` }}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="block w-full h-auto"
                  style={{ filter: 'sepia(0.18) contrast(1.02)' }}
                />
                <figcaption className="text-center serif italic text-ink-faded text-xs md:text-sm mt-2 mb-1">
                  — {p.caption} —
                </figcaption>
              </figure>
            )
          )}
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div
              className="serif italic text-xs md:text-sm smallcaps mb-1"
              style={{ color: '#9b3a2a', letterSpacing: '0.4em' }}
            >
              access granted
            </div>
            <div className="serif italic text-ink-soft text-sm md:text-base mb-4">
              for one person in particular
            </div>
            <button
              type="button"
              onClick={() => setUnlocked(false)}
              className="back-button"
              style={{ marginTop: '4px' }}
            >
              <span aria-hidden>↩</span>
              <span>seal it back up</span>
            </button>
          </div>
          <div className="scrapbook">
            {secretPhotos.map((p, i) => (
              <figure
                key={i}
                className="parchment-frame scrapbook-tile"
                style={{ transform: `rotate(${pseudoRotate(i)}deg)` }}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="block w-full h-auto"
                  style={{ filter: 'sepia(0.18) contrast(1.02)' }}
                />
                <figcaption className="text-center serif italic text-ink-faded text-xs md:text-sm mt-2 mb-1">
                  — {p.caption} —
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </DetailView>
  );
}
