/**
 * ChroniqAI Lead Capture & Tracking Service
 * Integrates with Google Apps Script endpoint for resource gating.
 */

export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyGjp78Ees6UTTAYwoFoisP3Cynfnzsew51XXTxYpKQTlncDeB_vYmz939ooRStKhRa/exec";

export interface TrackingParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  website: string;
  resource_slug: string;
  hp: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

export interface LeadSubmissionResponse {
  ok: boolean;
  link?: string;
  error?: string;
}

/**
 * Extracts and persists UTM tracking parameters from the URL query string
 * and document referrer into sessionStorage to ensure persistence across navigations.
 */
export function getTrackingParams(): TrackingParams {
  let utm_source = "";
  let utm_medium = "";
  let utm_campaign = "";

  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const qSource = urlParams.get("utm_source");
      const qMedium = urlParams.get("utm_medium");
      const qCampaign = urlParams.get("utm_campaign");

      if (qSource) {
        utm_source = qSource;
        sessionStorage.setItem("chroniq_utm_source", qSource);
      } else {
        utm_source = sessionStorage.getItem("chroniq_utm_source") || "";
      }

      if (qMedium) {
        utm_medium = qMedium;
        sessionStorage.setItem("chroniq_utm_medium", qMedium);
      } else {
        utm_medium = sessionStorage.getItem("chroniq_utm_medium") || "";
      }

      if (qCampaign) {
        utm_campaign = qCampaign;
        sessionStorage.setItem("chroniq_utm_campaign", qCampaign);
      } else {
        utm_campaign = sessionStorage.getItem("chroniq_utm_campaign") || "";
      }
    } catch {
      // Gracefully handle sessionStorage security or quota restrictions
    }
  }

  const referrer = typeof document !== "undefined" ? document.referrer || "" : "";

  return { utm_source, utm_medium, utm_campaign, referrer };
}

/**
 * Checks if the LinkedIn-only top lead gate should be displayed.
 * Only triggers if URL has utm_source=linkedin or gate=1.
 * Persists in sessionStorage so it remains active across reloads and navigations within the session.
 */
export function isLeadGateActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const qMedium = (urlParams.get("utm_medium") || "").toLowerCase().trim();
    const qSource = (urlParams.get("utm_source") || "").toLowerCase().trim();
    const qGate = (urlParams.get("gate") || "").trim();

    // Check if visiting from Google search or other search engines
    const ref = (document.referrer || "").toLowerCase();
    const isSearchReferrer =
      ref.includes("google.") ||
      ref.includes("bing.") ||
      ref.includes("duckduckgo.") ||
      ref.includes("yahoo.");

    // Direct LinkedIn signal in URL params
    if (
      qMedium === "linkedin" ||
      qMedium.includes("linkedin") ||
      qSource === "linkedin" ||
      qSource.includes("linkedin") ||
      qGate === "1"
    ) {
      sessionStorage.setItem("chroniq_lead_gate_active", "1");
      return true;
    }

    // If coming from Google search or explicit non-linkedin source/medium, clear gate session
    if (
      isSearchReferrer ||
      (qSource && !qSource.includes("linkedin")) ||
      (qMedium && !qMedium.includes("linkedin"))
    ) {
      sessionStorage.removeItem("chroniq_lead_gate_active");
      return false;
    }

    return sessionStorage.getItem("chroniq_lead_gate_active") === "1";
  } catch {
    return false;
  }
}

/**
 * Validates email format with a standard RFC compliant regular expression.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates that an input looks like a valid domain or web URL.
 */
export function isValidWebsite(website: string): boolean {
  const trimmed = website.trim();
  if (!trimmed) return false;
  // Remove protocol and trailing paths/slashes if user typed full URL
  const cleaned = trimmed.replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(cleaned);
}

/**
 * Retrieves the unlocked resource link for a given slug from localStorage.
 */
export function getUnlockedResource(slug: string): string | null {
  if (typeof window === "undefined" || !slug) return null;
  try {
    const raw = localStorage.getItem(`chroniq_unlocked_${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.link === "string" && parsed.link.trim().length > 0) {
      return parsed.link.trim();
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

/**
 * Persists an unlocked resource link into localStorage keyed by slug.
 */
export function saveUnlockedResource(slug: string, link: string): void {
  if (typeof window === "undefined" || !slug || !link) return;
  try {
    localStorage.setItem(
      `chroniq_unlocked_${slug}`,
      JSON.stringify({ link: link.trim(), unlockedAt: Date.now() })
    );
  } catch {
    // Ignore storage quota or security errors
  }
}

/**
 * Submits lead data to the Google Apps Script endpoint via fetch.
 * Uses Content-Type: "text/plain;charset=utf-8" to avoid CORS preflight,
 * without using "no-cors" so the response body can be read.
 */
export async function submitLeadCapture(
  params: Omit<LeadSubmissionPayload, "utm_source" | "utm_medium" | "utm_campaign" | "referrer">
): Promise<LeadSubmissionResponse> {
  // Honeypot anti-spam check: if bot filled hp, reject immediately
  if (params.hp && params.hp.trim().length > 0) {
    return { ok: false, error: "Submission rejected." };
  }

  const tracking = getTrackingParams();

  let cleanSlug = "";
  try {
    cleanSlug = decodeURIComponent(params.resource_slug || "").trim();
  } catch {
    cleanSlug = (params.resource_slug || "").trim();
  }

  const body: LeadSubmissionPayload = {
    name: params.name.trim(),
    email: params.email.trim(),
    website: params.website.trim(),
    resource_slug: cleanSlug,
    hp: "",
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    referrer: tracking.referrer,
  };

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Server returned HTTP ${response.status}`);
  }

  const text = await response.text();
  let result: LeadSubmissionResponse;
  try {
    result = JSON.parse(text) as LeadSubmissionResponse;
  } catch {
    throw new Error("Unable to parse server response. Please try again.");
  }

  return result;
}
