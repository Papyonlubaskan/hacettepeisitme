import { useState, useCallback, useRef, useEffect } from 'react';
import { audioEngine } from './AudioEngine';

interface TestResult {
  freq: number;
  heard: boolean;
  dbHL: number;
}

const FREQUENCIES = [
  { freq: 250, dbHL: 40 },
  { freq: 500, dbHL: 30 },
  { freq: 1000, dbHL: 25 },
  { freq: 2000, dbHL: 25 },
  { freq: 4000, dbHL: 30 },
  { freq: 8000, dbHL: 40 },
];

const freqLabels: Record<number, string> = {
  250: '250 Hz',
  500: '500 Hz',
  1000: '1 kHz',
  2000: '2 kHz',
  4000: '4 kHz',
  8000: '8 kHz',
};

const earLabels: Record<string, string> = {
  left: 'Sol Kulak',
  right: 'Sağ Kulak',
};

interface Props {
  onComplete: (results: TestResult[], ear: string) => void;
  ear: string;
}

export default function HearingTest({ onComplete, ear }: Props) {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = FREQUENCIES[step];

  const playCurrent = useCallback(() => {
    if (!current) return;
    setIsPlaying(true);
    setAnswered(false);
    setCountdown(3);

    audioEngine.playTone(current.freq, current.dbHL, 1200);

    // Countdown animation
    let c = 3;
    const interval = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(interval);
      }
    }, 400);

    timeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      clearInterval(interval);
      setCountdown(0);
    }, 1200 + 200);
  }, [current]);

  const handleAnswer = useCallback(
    (heard: boolean) => {
      if (!current || answered) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      audioEngine.stop();
      setIsPlaying(false);
      setAnswered(true);
      setCountdown(0);

      const newResult: TestResult = {
        freq: current.freq,
        heard,
        dbHL: current.dbHL,
      };

      const updated = [...results, newResult];
      setResults(updated);

      if (step + 1 < FREQUENCIES.length) {
        setStep(step + 1);
        setAnswered(false);
      } else {
        onComplete(updated, ear);
      }
    },
    [current, answered, results, step, onComplete, ear]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      audioEngine.stop();
    };
  }, []);

  useEffect(() => {
    setAnswered(false);
  }, [step]);

  const progress = ((step) / FREQUENCIES.length) * 100;

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{earLabels[ear]}</span>
          <span>
            Adım {step + 1} / {FREQUENCIES.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tone Card */}
      <div className="bg-white rounded-2xl p-8 md:p-10 text-center mb-8">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 rounded-full px-4 py-2 text-sm font-semibold text-brand-accent">
            <i className="ri-volume-up-line" />
            {freqLabels[current.freq]}
          </span>
        </div>

        {isPlaying && (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-2 h-8 rounded-full transition-all duration-200 ${
                    countdown > 0 && i <= 4 - countdown + 1
                      ? 'bg-brand-accent scale-110'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">Ses oynatılıyor...</p>
          </div>
        )}

        <button
          onClick={playCurrent}
          disabled={isPlaying}
          className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all ${
            isPlaying
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-brand-accent text-white hover:bg-[#008f7f] hover:scale-105'
          }`}
        >
          {isPlaying ? (
            <>
              <i className="ri-volume-up-line animate-pulse" />
              <span>Ses Çalınıyor</span>
            </>
          ) : (
            <>
              <i className="ri-play-circle-line text-xl" />
              <span>Sesi Çal</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-400 mt-4">
          Ses bittikten sonra duyup duymadığınızı belirtin.
        </p>
      </div>

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer(true)}
          disabled={!answered && isPlaying}
          className={`flex flex-col items-center gap-2 py-6 rounded-2xl font-semibold text-base transition-all border-2 ${
            !answered && isPlaying
              ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
              : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300'
          }`}
        >
          <i className="ri-check-double-line text-2xl" />
          <span>Duydum</span>
        </button>

        <button
          onClick={() => handleAnswer(false)}
          disabled={!answered && isPlaying}
          className={`flex flex-col items-center gap-2 py-6 rounded-2xl font-semibold text-base transition-all border-2 ${
            !answered && isPlaying
              ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
              : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300'
          }`}
        >
          <i className="ri-close-circle-line text-2xl" />
          <span>Duymadım</span>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Not: Testi sessiz bir ortamda, kulaklık ile yapmanız önerilir.
      </p>
    </div>
  );
}