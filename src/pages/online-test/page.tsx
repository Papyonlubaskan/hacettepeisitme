import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView, trackCTAClick } from '@/lib/tracking';
import { PAGE_IMAGES } from '@/lib/pageImages';
import HearingTest from './components/HearingTest';
import TestResults from './components/TestResults';

interface TestResult {
  freq: number;
  heard: boolean;
  dbHL: number;
}

type TestPhase = 'intro' | 'left' | 'right' | 'results';

export default function OnlineHearingTest() {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [leftResults, setLeftResults] = useState<TestResult[]>([]);
  const [rightResults, setRightResults] = useState<TestResult[]>([]);

  const startTest = () => {
    setPhase('left');
  };

  const handleLeftComplete = (results: TestResult[]) => {
    setLeftResults(results);
    setPhase('right');
  };

  const handleRightComplete = (results: TestResult[]) => {
    setRightResults(results);
    setPhase('results');
    trackPageView('İşitme Testi Sonuçları', '/online-isitme-testi');
  };

  const handleReset = () => {
    setPhase('intro');
    setLeftResults([]);
    setRightResults([]);
  };

  return (
    <div className="min-h-screen pt-[72px] animate-fadeInUp">
      {/* Hero */}
      <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PAGE_IMAGES.onlineTest}
            alt="Online İşitme Testi"
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-brand-dark/70" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 rounded-full px-4 py-2 mb-6">
            <i className="ri-headphone-line text-brand-accent" />
            <span className="text-sm text-brand-accent font-semibold">Ücretsiz Online Test</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            İşitme Sağlığınızı
            <br />
            <em className="text-brand-accent">Anında Test Edin</em>
          </h1>

          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            3 dakikada hem sol hem sağ kulağınızı test edin.
            Sonuçları anında görün ve klinik randevunuzu planlayın.
          </p>

          {phase === 'intro' && (
            <button
              onClick={startTest}
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap text-base"
            >
              <i className="ri-play-circle-line text-xl" />
              <span>Teste Başla</span>
            </button>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-brand-cream">
        <div className="w-full px-6 lg:px-12">
          {phase === 'intro' && (
            <div className="max-w-2xl mx-auto">
              {/* How it works */}
              <div className="bg-white rounded-2xl p-8 mb-8">
                <h2 className="font-serif text-xl font-bold text-brand-dark mb-6 text-center">
                  Test Nasıl Çalışır?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: 'ri-volume-up-line',
                      title: 'Farklı Frekanslar Dinleyin',
                      desc: '250 Hz - 8000 Hz arası 6 farklı frekansta saf ton sesler duyacaksınız.',
                    },
                    {
                      icon: 'ri-fingerprint-line',
                      title: 'Tekrarlayın',
                      desc: 'Önce sol kulak, sonra sağ kulak için aynı işlemi tekrarlayın.',
                    },
                    {
                      icon: 'ri-bar-chart-box-line',
                      title: 'Sonuçları Görün',
                      desc: 'Online test sonuçlarınızı anında değerlendirip klinik randevusu alabilirsiniz.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0">
                        <i className={`${item.icon} text-brand-accent`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-brand-dark mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 shrink-0">
                    <i className="ri-lightbulb-line text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-1">Önemli Hatırlatmalar</h3>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-yellow-500 mt-1.5 shrink-0" />
                        Sessiz bir ortamda test yapın
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-yellow-500 mt-1.5 shrink-0" />
                        Kulaklık kullanmanız önerilir
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-yellow-500 mt-1.5 shrink-0" />
                        Ses düzeyini orta seviyede tutun
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-yellow-500 mt-1.5 shrink-0" />
                        Bu test ön değerlendirmedir, kesin sonuç için klinik test gerekir
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Start CTA */}
              <div className="text-center mt-10">
                <button
                  onClick={startTest}
                  className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap text-base"
                >
                  <i className="ri-play-circle-line text-xl" />
                  <span>Teste Şimdi Başla</span>
                </button>
                <p className="text-xs text-gray-400 mt-4">Tahmini süre: 3 dakika</p>
              </div>
            </div>
          )}

          {phase === 'left' && (
            <HearingTest onComplete={handleLeftComplete} ear="left" />
          )}

          {phase === 'right' && (
            <HearingTest onComplete={handleRightComplete} ear="right" />
          )}

          {phase === 'results' && (
            <TestResults
              leftResults={leftResults}
              rightResults={rightResults}
              onReset={handleReset}
            />
          )}
        </div>
      </section>

      {/* Disclaimers */}
      {phase === 'results' && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-400 mb-6">
              Bu online test, tarayıcı üzerinden yapılan basit bir frekans değerlendirmesidir.
              Kesin teşhis ve odyogram için profesyonel odyometri testi gerekir.
            </p>
            <Link
              to="/ucretsiz-isitme-testi"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-[#008f7f] transition-colors"
              onClick={() => trackCTAClick('Klinik Test Bilgisi', 'online_test_footer', '/ucretsiz-isitme-testi')}
            >
              <i className="ri-hospital-line" />
              <span>Klinik Ücretsiz İşitme Testi Hakkında Bilgi Al</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}