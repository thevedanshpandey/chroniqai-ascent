const assetPath = (filename: string): string => encodeURI(`/assets/${filename}`);

export const SITE_URL = "https://chroniqai.com";

export const BRAND_ASSETS = {
  // Primary website slot logos
  navbarLogo: assetPath("CHRONIQAI Website navbar logo..png"),
  heroLogo: assetPath("ChroniqAI Website hero logo..png"),
  footerLogo: assetPath("ChroniqAI Website footer logo..png"),
  revenueInfraLogo: assetPath("CHRONIQAI Revenue Infrastructure Logo.png"),
  masterLogoSvg: assetPath("chroniqai_master_logo.svg"),
  transparentPngLogo: assetPath("ChroniqAI Transparent PNG logo.png"),
  primaryDarkLogo: assetPath("CHRONIQAI- Primary dark logo (white + blue on black).png"),
  primaryLightLogo: assetPath("ChroniqAI Light background logo (black + blue on white)..png"),
  darkWebsiteLogo: assetPath("ChroniqAI Dark website logo..png"),
  lightWebsiteLogo: assetPath("ChroniqAI Light website logo..png"),
  whitePhotoOverlayLogo: assetPath("CHRONIQAI White photo-overlay logo (transparent background)..png"),
  pureWhiteLogo: assetPath("CHRONIQAI Pure white monochrome logo..png"),
  pureBlackLogo: assetPath("ChroniqAI Pure black monochrome logo..png"),
  blueMonochromeLogo: assetPath("ChroniqAI Blue monochrome logo..png"),
  logoOnBlack: assetPath("CHRONIQAI Logo on Black.png"),

  // Symbols & Icons
  standaloneSymbolSvg: assetPath("chroniqai_standalone_symbol.svg"),
  standaloneSymbolPng: assetPath("Chroniqai Standalone symbol.png"),
  faviconSvg: assetPath("chroniqai_favicon.svg"),
  websiteFavicon: assetPath("ChroniqAI Website favicon.png"),
  favicon32: assetPath("ChroniqAI Favicon 32px..png"),
  favicon16: assetPath("ChroniqAI Favicon 16px..png"),
  appIcon64: assetPath("ChroniqAI App icon 64px.png"),

  // Interactive & Animated
  dashboardAppLogo: assetPath("ChroniqAI Dashboard application logo.gif"),
  brandLoader: assetPath("ChroniqAI Loading animation brand loader.gif"),

  // Watermarks, Patterns & Backgrounds
  darkWatermark: assetPath("CHRONIQAI Dark Watermark.png"),
  triangularPattern: assetPath("ChroniqAI Brand pattern triangular motif..png"),
  mountainHorizonBg: assetPath("ChroniqAI Mountain Horizon Branding.png"),
  nightOfficeBg: assetPath("ChronicAI Night Office Branding-2.png"),
  overEarthNightBg: assetPath("ChronicAI Over Earth at Night-1.png"),

  // Social & Meta Covers
  linkedinCoverInfra: assetPath("CHRONIQAI_ AI Revenue Infrastructure Linkedin Cover.png"),
  linkedinCoverVed: assetPath("ChroniqAI Ved Linkedin Cover.png"),
  linkedinCompanyProfile: assetPath("ChroniqAI LinkedIn company profile picture..png"),
  instaLogo: assetPath("ChroniqAI insta logo.png"),
} as const;

export const BRAND_ASSET_URLS = {
  ogCover: `${SITE_URL}${BRAND_ASSETS.linkedinCoverInfra}`,
  organizationLogo: `${SITE_URL}${BRAND_ASSETS.transparentPngLogo}`,
  publisherLogo: `${SITE_URL}${BRAND_ASSETS.appIcon64}`,
  logoOnBlack: `${SITE_URL}${BRAND_ASSETS.logoOnBlack}`,
} as const;
