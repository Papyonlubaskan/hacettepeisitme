import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/tracking';
import { SITE_PHONE_WA } from '@/lib/siteContact';

interface TestResult {
  freq: number;
  heard: boolean;
  dbHL: number;
}

interface Props {
  leftResults: TestResult[];
  rightResults: TestResult[];
  onReset: () => void;
}

const freqLabels: Record<number, string> = {
  250: '250',
  500: '500',
  1000: '1k',
  2000: '2k',
  4000: '4k',
  8000: '8k',
};

function classifyHearing(results: TestResult[]) {
  const notHeardCount = results.filter((r) => !r.heard).length;
  if (notHeardCount === 0) return { label: 'Normal İşitme', color: 'green', desc: 'Tüm frekanslarda duyma eşiğiniz normal seviyede görünüyor.' };
  if (notHeardCount <= 2) return { label: 'Hafif Kayıp Olasılığı', color: 'yellow', desc: 'Bazı frekanslarda duyma eşiğiniz düşük olabilir. Detaylı test önerilir.' };
  return { label: 'İşitme Kaybı Riski', color: 'red', desc: 'Birden fazla frekansta duyma eşiğiniz yüksek. Kapsamlı odyometri testi şiddetle önerilir.' };
}

function ResultBadge({ color, label }: { color: string; label: string }) {
  const colors: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${colors[color] || colors.green}`}>
      <i className={`ri-${color === 'green' ? 'checkbox-circle' : color === 'yellow' ? 'alert-line' : 'error-warning'}-line`} />
      {label}
    </span>
  );
}

function EarResultCard({ title, results }: { title: string; results: TestResult[] }) {
  const classification = classifyHearing(results);
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-brand-dark">{title}</h3>
        <ResultBadge color={classification.color} label={classification.label} />
      </div>
      <p className="text-sm text-gray-500 mb-4">{classification.desc}</p>

      {/* Audiogram bar chart */}
      <div className="space-y-3">
        {results.map((r) => (
          <div key={r.freq} className="flex items-center gap-3">
            <span className="w-8 text-xs font-medium text-gray-500 shrink-0 text-right">{freqLabels[r.freq]}</span>
            <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
              <div
                className={`h-full rounded-lg transition-all duration-500 ${
                  r.heard ? 'bg-green-400 w-full' : 'bg-red-400 w-full'
                }`}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {r.heard ? 'Duydum' : 'Duymadım'}
              </span>
            </div>
            <span className="w-10 text-xs text-gray-400 shrink-0">{r.dbHL} dB</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestResults({ leftResults, rightResults, onReset }: Props) {
  const leftClass = classifyHearing(leftResults);
  const rightClass = classifyHearing(rightResults);

  const overallColor = leftClass.color === 'red' || rightClass.color === 'red'
    ? 'red'
    : leftClass.color === 'yellow' || rightClass.color === 'yellow'
      ? 'yellow'
      : 'green';

  const overallLabel = overallColor === 'red'
    ? 'Profesyonel Değerlendirme Gerekli'
    : overallColor === 'yellow'
      ? 'Detaylı Test Önerilir'
      : 'İşitme Düzeyiniz Normal';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-4">
          <i className="ri-bar-chart-box-line text-3xl text-brand-accent" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-3">
          Online İşitme Testi Sonuçları
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Bu test ön değerlendirme amaçlıdır. Kesin sonuç için klinik odyometri testi yapılması gerekir.
        </p>
      </div>

      {/* Overall summary */}
      <div className={`rounded-2xl p-6 mb-8 border ${
        overallColor === 'red'
          ? 'bg-red-50 border-red-100'
          : overallColor === 'yellow'
            ? 'bg-yellow-50 border-yellow-100'
            : 'bg-green-50 border-green-100'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <i className={`ri-${overallColor === 'red' ? 'error-warning' : overallColor === 'yellow' ? 'alert-line' : 'checkbox-circle'}-line text-xl ${
            overallColor === 'red' ? 'text-red-600' : overallColor === 'yellow' ? 'text-yellow-600' : 'text-green-600'
          }`} />
          <h3 className="text-lg font-bold text-brand-dark">{overallLabel}</h3>
        </div>
        <p className="text-sm text-gray-600">
          {overallColor === 'red'
            ? 'Online testinizde birden fazla frekansta duyma kaybı belirtisi saptandı. Randevu alarak klinik ortamda kapsamlı bir değerlendirme yaptırmanız önemle tavsiye edilir.'
            : overallColor === 'yellow'
              ? 'Bazı frekanslarda duyma eşiğiniz sınırda görünüyor. Düzenli kontrol ve detaylı odyometri testi önerilir.'
              : 'Online test sonuçlarınıza göre duyma eşiğiniz normal seviyelerde. Yine de yıllık rutin kontrollerinizi ihmal etmeyin.'}
        </p>
      </div>

      {/* Per ear results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <EarResultCard title="Sol Kulak" results={leftResults} />
        <EarResultCard title="Sağ Kulak" results={rightResults} />
      </div>

      {/* CTA */}
      <div className="bg-brand-dark rounded-2xl p-8 text-center mb-10">
        <h3 className="font-serif text-xl font-bold text-white mb-3">
          Kapsamlı Odyometri Testi İçin Randevu Oluşturun
        </h3>
        <p className="text-sm text-white/70 mb-6 max-w-md mx-auto">
          Odyometri uzmanlarımız tarafından yapılan kapsamlı işitme testi ve danışmanlık tamamen ücretsizdir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/randevu"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
            onClick={() => trackCTAClick('Randevu Oluştur - Test Sonrası', 'online_test_results', '/randevu')}
          >
            <i className="ri-calendar-check-line" />
            <span>Randevu Oluştur</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_PHONE_WA}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-lg" />
            <span>WhatsApp ile Sor</span>
          </a>
        </div>
      </div>

      {/* Retake */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-[#008f7f] transition-colors"
        >
          <i className="ri-restart-line" />
          <span>Testi Tekrar Yap</span>
        </button>
      </div>
    </div>
  );
}