export interface HomeFlowSlide {
  src: string;
  srcSet?: string;
  alt: string;
}

const HERO_WIDTHS = [480, 828, 1280] as const;

function heroSrcSet(base: string): string {
  return [
    ...HERO_WIDTHS.map((w) => `/local-images/home-flow/${base}-${w}.webp ${w}w`),
    `/local-images/home-flow/${base}.webp 1920w`,
  ].join(', ');
}

// React img'de src'yi srcset'ten önce yazdığı için src mobil varyant olmalı (aksi halde tam boy da indirilir)
function slide(base: string, alt: string): HomeFlowSlide {
  return { src: `/local-images/home-flow/${base}-828.webp`, srcSet: heroSrcSet(base), alt };
}

/** Ana sayfa hero ve footer — Google İşletme fotoğrafları (maps.app.goo.gl) */
export const HOME_FLOW_SLIDES: HomeFlowSlide[] = [
  slide('flow-reception', 'Hacettepe İşitme Cihazları Samsun — merkez iç mekan'),
  slide('flow-exterior', 'Hacettepe İşitme Cihazları Samsun — dış cephe ve konum'),
  slide('flow-consultation', 'Hacettepe İşitme Cihazları Samsun — merkez görünümü'),
  slide('flow-interior-2', 'Hacettepe İşitme Cihazları Samsun — iç mekan'),
];

/** Sunucu tarafı LCP preload ile aynı olmalı (server/seo-inject.js) */
export const HERO_LCP_SRCSET = heroSrcSet('flow-reception');
