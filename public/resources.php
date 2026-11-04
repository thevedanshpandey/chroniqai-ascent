<?php
/**
 * ChroniqAI - High-Performance Headless WordPress Server-Side Pre-Renderer for cPanel
 * 
 * Provides server-rendered semantic HTML and dynamic SEO meta tags (Rank Math / Yoast)
 * for Googlebot, GPTBot, ClaudeBot, PerplexityBot, and search engines without JavaScript.
 */

// Domain & WP Headless Endpoint Configuration
define('WP_API_ENDPOINT', 'https://cms.chroniqai.com/wp-json/wp/v2');
define('SITE_URL', 'https://chroniqai.com');
define('CACHE_DIR', sys_get_temp_dir() . '/chroniq_wp_cache');
define('CACHE_TTL', 600); // 10 minutes cache

// Ensure cache directory exists
if (!is_dir(CACHE_DIR)) {
    @mkdir(CACHE_DIR, 0755, true);
}

// Helper: HTTP GET with cURL, stream_context fallback, timeout, and caching
function fetch_wp_data($url) {
    $cache_file = CACHE_DIR . '/' . md5($url) . '.json';
    if (file_exists($cache_file) && (time() - filemtime($cache_file) < CACHE_TTL)) {
        $content = @file_get_contents($cache_file);
        if ($content) {
            $decoded = json_decode($content, true);
            if ($decoded !== null) {
                return $decoded;
            }
        }
    }

    $response = null;

    // Method 1: cURL (Preferred)
    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 6);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'User-Agent: ChroniqAI-SSREngine/1.0 (+https://chroniqai.com)'
        ]);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $exec = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code === 200 && $exec) {
            $response = $exec;
        }
    }

    // Method 2: stream context fallback
    if (!$response && ini_get('allow_url_fopen')) {
        $opts = [
            'http' => [
                'method' => 'GET',
                'timeout' => 5,
                'header' => "Accept: application/json\r\nUser-Agent: ChroniqAI-SSREngine/1.0 (+https://chroniqai.com)\r\n"
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ];
        $context = stream_context_create($opts);
        $stream_exec = @file_get_contents($url, false, $context);
        if ($stream_exec) {
            $response = $stream_exec;
        }
    }

    if ($response) {
        @file_put_contents($cache_file, $response);
        return json_decode($response, true);
    }
    return null;
}

// Helper: Clean plain text
function clean_text($str) {
    if (!$str) return '';
    return trim(strip_tags(html_entity_decode($str, ENT_QUOTES | ENT_HTML5, 'UTF-8')));
}

// Parse request route
$request_uri = $_SERVER['REQUEST_URI'] ?? '/resources';
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');
$parts = explode('/', $path);

$is_index = (count($parts) === 1 && $parts[0] === 'resources');
$slug = (count($parts) >= 2 && $parts[0] === 'resources') ? preg_replace('/[^a-zA-Z0-9_-]/', '', $parts[1]) : '';

// Read base index.html
$index_html_path = __DIR__ . '/index.html';
if (!file_exists($index_html_path)) {
    // If running in development or non-build directory, locate index.html
    $index_html_path = dirname(__DIR__) . '/index.html';
}
$template_html = file_exists($index_html_path) ? file_get_contents($index_html_path) : '<html><head></head><body><div id="root"></div></body></html>';

// -------------------------------------------------------------
// CASE 1: Individual Resource Post (/resources/[slug])
// -------------------------------------------------------------
if ($slug) {
    $api_url = WP_API_ENDPOINT . '/posts?slug=' . urlencode($slug) . '&_embed=1';
    $post_data = fetch_wp_data($api_url);

    if (is_array($post_data) && !empty($post_data)) {
        $post = $post_data[0];

        $title = clean_text($post['title']['rendered'] ?? 'Resource Guide');
        $raw_content = $post['content']['rendered'] ?? '';
        $raw_excerpt = clean_text($post['excerpt']['rendered'] ?? '');
        $date = substr($post['date'] ?? '2026-07-20', 0, 10);
        $modified = substr($post['modified'] ?? $date, 0, 10);
        $page_url = SITE_URL . '/resources/' . $slug;

        // Image
        $image = $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';

        // Rank Math / Yoast SEO Fields
        $meta_title = clean_text($post['yoast_head_json']['title'] ?? $post['rank_math_title'] ?? ($title . ' — ChroniqAI Resources'));
        $meta_desc = clean_text($post['yoast_head_json']['description'] ?? $post['rank_math_description'] ?? ($raw_excerpt ?: substr(strip_tags($raw_content), 0, 160)));

        // TL;DR
        $tldr = clean_text($post['acf']['tldr'] ?? $post['meta']['tldr'] ?? $raw_excerpt);
        if (!$tldr) {
            $tldr = $meta_desc;
        }

        // Calculate read time
        $word_count = str_word_count(strip_tags($raw_content));
        $read_time = max(1, ceil($word_count / 200)) . ' min read';

        // JSON-LD Schemas
        $article_schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $page_url
            ],
            'headline' => $title,
            'description' => $meta_desc,
            'image' => [$image],
            'datePublished' => $date . 'T08:00:00+00:00',
            'dateModified' => $modified . 'T08:00:00+00:00',
            'author' => [
                '@type' => 'Person',
                'name' => 'Ved',
                'jobTitle' => 'Founder of ChroniqAI',
                'url' => 'https://www.linkedin.com/in/vedanshpandey/'
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'ChroniqAI',
                'url' => SITE_URL,
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => SITE_URL . '/favicon.ico'
                ]
            ]
        ];

        $breadcrumb_schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => SITE_URL],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Resources', 'item' => SITE_URL . '/resources'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $page_url]
            ]
        ];

        // Normalize internal <h1> to <h2> for single H1 SEO compliance
        $raw_content = preg_replace('/<h1([^>]*)>(.*?)<\/h1>/i', '<h2$1>$2</h2>', $raw_content);

        // Prepare SEO Meta Tags and typography CSS to inject into <head>
        $seo_meta = '
    <title>' . htmlspecialchars($meta_title) . '</title>
    <meta name="description" content="' . htmlspecialchars($meta_desc) . '" />
    <link rel="canonical" href="' . htmlspecialchars($page_url) . '" />
    <meta property="og:title" content="' . htmlspecialchars($meta_title) . '" />
    <meta property="og:description" content="' . htmlspecialchars($meta_desc) . '" />
    <meta property="og:url" content="' . htmlspecialchars($page_url) . '" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="' . htmlspecialchars($image) . '" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="' . htmlspecialchars($meta_title) . '" />
    <meta name="twitter:description" content="' . htmlspecialchars($meta_desc) . '" />
    <meta name="twitter:image" content="' . htmlspecialchars($image) . '" />
    <style>
      .blog-article-content { font-family: system-ui, -apple-system, sans-serif; color: #cbd5e1; font-size: 17px; line-height: 1.85; }
      .blog-article-content h1, .blog-article-content h2 { font-size: 2rem; font-weight: 700; color: #ffffff; margin-top: 2.75rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 0.5rem; line-height: 1.3; }
      .blog-article-content h3 { font-size: 1.5rem; font-weight: 600; color: #f8fafc; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.35; }
      .blog-article-content h4 { font-size: 1.2rem; font-weight: 600; color: #38bdf8; margin-top: 1.5rem; margin-bottom: 0.5rem; }
      .blog-article-content h5 { font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 1.25rem; margin-bottom: 0.5rem; }
      .blog-article-content p { font-size: 17px; line-height: 1.85; color: #cbd5e1; margin-bottom: 1.5rem; margin-top: 0; }
      .blog-article-content strong, .blog-article-content b { color: #ffffff; font-weight: 600; }
      .blog-article-content ul { list-style-type: disc; padding-left: 24px; margin: 20px 0; }
      .blog-article-content ol { list-style-type: decimal; padding-left: 24px; margin: 20px 0; }
      .blog-article-content li { margin-bottom: 10px; line-height: 1.7; color: #cbd5e1; }
      .blog-article-content blockquote { border-left: 3px solid #38bdf8; background: rgba(30, 41, 59, 0.5); padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #f1f5f9; }
      .blog-article-content a { color: #38bdf8; text-decoration: underline; }
      .blog-article-content code { background: rgba(30, 41, 59, 0.8); color: #38bdf8; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
      .blog-article-content pre { background: #0b1120; border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; overflow-x: auto; color: #e2e8f0; }
      .blog-article-content table { width: 100%; border-collapse: collapse; margin: 24px 0; border: 1px solid rgba(255,255,255,0.1); }
      .blog-article-content th { background: rgba(30, 41, 59, 0.8); color: #fff; padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); }
      .blog-article-content td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #cbd5e1; }
      .blog-article-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 20px auto; display: block; border: 1px solid rgba(255,255,255,0.1); }
    </style>
    <script type="application/ld+json">' . json_encode($article_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>
    <script type="application/ld+json">' . json_encode($breadcrumb_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>
';

        // Helper to generate SSR Lead-Capture Box
        $generate_cta_box = function($box_variant, $box_title, $box_slug) {
            $is_top = ($box_variant === 'top');
            $is_mid = ($box_variant === 'mid');
            $variant_badge = $is_top ? 'Free resource' : ($is_mid ? 'Mid-Article Resource' : 'Executive System Guide');
            $box_heading = $is_top ? htmlspecialchars($box_title) : ('Get the free ' . htmlspecialchars($box_title));
            $box_value = ($is_top || $is_mid)
                ? 'Download the complete framework, trigger checklists, and daily outreach safety caps formatted for your team.'
                : 'Access the full resource instantly. Then let ChroniqAI Gravity deploy the verified infrastructure, warmup routines, and high-ticket pipeline for you.';
            $form_id = 'lead_form_' . $box_variant . '_' . preg_replace('/[^a-zA-Z0-9]/', '', $box_slug);
            return '
            <aside class="lead-capture-box" data-variant="' . $box_variant . '" style="margin: ' . ($is_top ? '20px 0 40px 0' : '40px 0') . '; border-radius: 16px; border: 1px solid rgba(226, 232, 240, 0.25); background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85)); padding: 30px; color: #f8fafc;">
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 24px; align-items: flex-start;">
                <div style="max-width: 500px;">
                  <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; font-family: monospace; color: #38bdf8; margin-bottom: 12px;">' . $variant_badge . '</span>
                  <h3 style="font-size: 1.5rem; margin: 0 0 10px 0; color: #ffffff; line-height: 1.3;">' . $box_heading . '</h3>
                  <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">' . $box_value . '</p>
                  <div style="font-size: 12px; font-family: monospace;">
                    <a href="/gravity" style="color: #38bdf8; text-decoration: underline; margin-right: 15px;">Explore Gravity System &rarr;</a>
                    <a href="/score-calculator" style="color: #94a3b8; text-decoration: none;">Book Strategy Call</a>
                  </div>
                </div>

                <div class="lead-action-col" style="width: 100%; max-width: 360px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px;">
                  <form id="' . $form_id . '" onsubmit="handleLeadSubmit(event, \'' . htmlspecialchars($box_slug) . '\', \'' . $form_id . '\', \'' . $box_variant . '\')" style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="position: absolute; opacity: 0; z-index: -1; pointer-events: none; height: 0; width: 0; overflow: hidden;">
                      <label>Do not fill this</label>
                      <input type="text" name="hp" tabindex="-1" autocomplete="off" />
                    </div>
                    <div>
                      <label style="display: block; font-size: 11px; font-family: monospace; color: #94a3b8; margin-bottom: 4px;">Your Name *</label>
                      <input type="text" name="name" required placeholder="e.g. Alex Vance" style="width: 100%; padding: 8px 12px; font-size: 13px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(15,23,42,0.8); color: #fff; box-sizing: border-box;" />
                    </div>
                    <div>
                      <label style="display: block; font-size: 11px; font-family: monospace; color: #94a3b8; margin-bottom: 4px;">Work Email *</label>
                      <input type="email" name="email" required placeholder="alex@company.com" style="width: 100%; padding: 8px 12px; font-size: 13px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(15,23,42,0.8); color: #fff; box-sizing: border-box;" />
                    </div>
                    <div>
                      <label style="display: block; font-size: 11px; font-family: monospace; color: #94a3b8; margin-bottom: 4px;">Company Website *</label>
                      <input type="text" name="website" required placeholder="company.com" style="width: 100%; padding: 8px 12px; font-size: 13px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(15,23,42,0.8); color: #fff; box-sizing: border-box;" />
                    </div>
                    <button type="submit" style="width: 100%; padding: 10px; background: #f8fafc; color: #020617; border: none; border-radius: 6px; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; cursor: pointer; margin-top: 4px;">
                      Get Free Resource
                    </button>
                    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 4px 0 0 0; line-height: 1.4;">
                      We\'ll send you the resource and occasionally email you about client acquisition. Unsubscribe anytime.
                    </p>
                    <div class="form-status" style="display: none; font-size: 12px; text-align: center; margin-top: 8px;"></div>
                  </form>
                </div>
              </div>
            </aside>';
        };

        // Check for LinkedIn-only top lead gate
        $utm_medium = strtolower(trim($_GET['utm_medium'] ?? ''));
        $utm_source = strtolower(trim($_GET['utm_source'] ?? ''));
        $gate_param = trim($_GET['gate'] ?? '');
        $referrer = strtolower(trim($_SERVER['HTTP_REFERER'] ?? ''));
        $is_search_engine = (strpos($referrer, 'google.') !== false || strpos($referrer, 'bing.') !== false || strpos($referrer, 'duckduckgo.') !== false);

        $is_linkedin_gate = (!$is_search_engine && ($utm_medium === 'linkedin' || strpos($utm_medium, 'linkedin') !== false || $utm_source === 'linkedin' || $gate_param === '1'));

        $top_cta_html = $is_linkedin_gate ? $generate_cta_box('top', $title, $slug) : '';

        // Prepare Semantic Body to inject inside <div id="root">
        $ssr_body = '
    <article class="ssr-article-wrapper" style="max-width: 900px; margin: 40px auto; padding: 20px; font-family: system-ui, sans-serif; color: #e2e8f0; background: #030712;">
      <nav aria-label="Breadcrumbs" style="margin-bottom: 20px; font-size: 13px; color: #94a3b8;">
        <a href="/" style="color: #cbd5e1;">Home</a> &gt; 
        <a href="/resources" style="color: #cbd5e1;">Resources</a> &gt; 
        <span style="color: #38bdf8;">' . htmlspecialchars($title) . '</span>
      </nav>

      ' . ($is_linkedin_gate ? '<div id="ssr-top-gate" style="display: block;">' . $top_cta_html . '</div>' : '') . '

      <header id="article-header" style="' . ($is_linkedin_gate ? 'display: none;' : 'display: block;') . '; margin-bottom: 30px;">
        <h1 style="font-size: 2.5rem; line-height: 1.2; color: #ffffff; margin-bottom: 15px;">' . htmlspecialchars($title) . '</h1>
        <div style="font-size: 14px; color: #94a3b8; margin-bottom: 20px;">
          By <strong>Ved, Founder of ChroniqAI</strong> | Published: ' . htmlspecialchars($date) . ' | Read Time: ' . htmlspecialchars($read_time) . '
        </div>
        ' . ($image ? '<div style="margin-bottom: 25px;"><img src="' . htmlspecialchars($image) . '" alt="' . htmlspecialchars($title) . '" style="width: 100%; border-radius: 12px; max-height: 480px; object-fit: cover;" /></div>' : '') . '
        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; margin-top: 0;">Executive Summary (TL;DR)</h2>
          <p style="margin-bottom: 0; font-size: 16px; line-height: 1.6; color: #f8fafc;">' . htmlspecialchars($tldr) . '</p>
        </div>
      </header>

      <main id="article-content" class="ssr-article-content blog-article-content" style="' . ($is_linkedin_gate ? 'display: none;' : 'display: block;') . '">
        ' . $raw_content . '
      </main>
      <footer style="margin-top: 50px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p><a href="/gravity" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">Discover ChroniqAI Gravity</a> — AI-powered LinkedIn client acquisition for high-ticket B2B founders.</p>
        <p><a href="/resources" style="color: #94a3b8;">&larr; Back to all resources</a></p>
      </footer>
      <script>
      (function() {
        try {
          var sp = new URLSearchParams(window.location.search);
          var qm = (sp.get("utm_medium") || "").toLowerCase().trim();
          var qs = (sp.get("utm_source") || "").toLowerCase().trim();
          var qg = (sp.get("gate") || "").trim();
          if (qm === "linkedin" || qm.indexOf("linkedin") !== -1 || qs === "linkedin" || qg === "1") {
            sessionStorage.setItem("chroniq_lead_gate_active", "1");
          }
          var isGateActive = (sessionStorage.getItem("chroniq_lead_gate_active") === "1");
          var decodedSlug = decodeURIComponent(' . json_encode($slug) . ' || "");
          var unlockedRaw = localStorage.getItem("chroniq_unlocked_" + decodedSlug);
          var isUnlocked = false;

          if (unlockedRaw) {
            try {
              var parsed = JSON.parse(unlockedRaw);
              if (parsed && parsed.link) {
                isUnlocked = true;
                document.querySelectorAll(".lead-capture-box").forEach(function(box) {
                  var actionCol = box.querySelector(".lead-action-col");
                  if (actionCol) {
                    actionCol.innerHTML = \'<div style="text-align: center; padding: 15px;"><div style="color: #4ade80; font-size: 14px; margin-bottom: 8px; font-weight: bold;">&check; Thanks, here\\\'s your resource</div><a href="\' + parsed.link + \'" target="_blank" style="display: block; width: 100%; padding: 10px; background: #10b981; color: #020617; border-radius: 6px; font-weight: bold; font-size: 12px; font-family: monospace; text-transform: uppercase; text-decoration: none; margin-bottom: 8px; box-sizing: border-box;">Open Resource &rarr;</a></div>\';
                  }
                });
              }
            } catch(e) {}
          }

          if (isGateActive) {
            var topGate = document.getElementById("ssr-top-gate");
            var artHeader = document.getElementById("article-header");
            var artContent = document.getElementById("article-content");
            if (topGate) topGate.style.display = "block";
            if (!isUnlocked) {
              if (artHeader) artHeader.style.display = "none";
              if (artContent) artContent.style.display = "none";
            } else {
              if (artHeader) artHeader.style.display = "block";
              if (artContent) artContent.style.display = "block";
            }
          }
        } catch(e) {}
      })();

      function handleLeadSubmit(e, rawSlug, formId, variant) {
        e.preventDefault();
        var form = document.getElementById(formId);
        var hp = form.querySelector(\'input[name="hp"]\').value;
        if (hp && hp.trim().length > 0) return;
        var name = form.querySelector(\'input[name="name"]\').value.trim();
        var email = form.querySelector(\'input[name="email"]\').value.trim();
        var website = form.querySelector(\'input[name="website"]\').value.trim();
        var status = form.querySelector(\'.form-status\');
        var btn = form.querySelector(\'button[type="submit"]\');
        btn.disabled = true;
        btn.innerText = "Unlocking Resource...";
        var decodedSlug = "";
        try {
          decodedSlug = decodeURIComponent(rawSlug || "");
        } catch(err) {
          decodedSlug = rawSlug || "";
        }
        var payload = {
          name: name,
          email: email,
          website: website,
          resource_slug: decodedSlug,
          hp: "",
          utm_source: sessionStorage.getItem("chroniq_utm_source") || "",
          utm_medium: sessionStorage.getItem("chroniq_utm_medium") || "",
          utm_campaign: sessionStorage.getItem("chroniq_utm_campaign") || "",
          referrer: document.referrer || ""
        };
        fetch("https://script.google.com/macros/s/AKfycbyGjp78Ees6UTTAYwoFoisP3Cynfnzsew51XXTxYpKQTlncDeB_vYmz939ooRStKhRa/exec", {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        }).then(function(r) { return r.json(); })
          .then(function(data) {
            if (data.ok && data.link) {
              try {
                localStorage.setItem("chroniq_unlocked_" + decodedSlug, JSON.stringify({ link: data.link, unlockedAt: Date.now() }));
              } catch(e) {}
              status.style.display = "block";
              status.style.color = "#4ade80";
              var successHtml = \'Resource unlocked! <a href="\' + data.link + \'" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: bold; margin-right: 12px;">Open Resource &rarr;</a>\';
              if (variant === "top") {
                successHtml += \' <a href="#article-content" onclick="document.getElementById(\\\'article-content\\\').scrollIntoView({behavior:\\\'smooth\\\'}); return false;" style="color: #cbd5e1; font-size: 11px; text-decoration: underline;">Continue to article &darr;</a>\';
              }
              status.innerHTML = successHtml;
              btn.innerText = "Access Granted";
            } else {
              status.style.display = "block";
              status.style.color = "#f87171";
              status.innerText = data.error || "Submission failed. Please retry.";
              btn.disabled = false;
              btn.innerText = "Get Free Resource";
            }
          }).catch(function() {
            status.style.display = "block";
            status.style.color = "#f87171";
            status.innerText = "Network error. Please try again.";
            btn.disabled = false;
            btn.innerText = "Get Free Resource";
          });
      }
      </script>
    </article>
';

        // Inject into index.html
        $rendered = preg_replace('/<title>.*?<\/title>/i', '', $template_html);
        $rendered = str_replace('</head>', $seo_meta . '</head>', $rendered);
        $rendered = str_replace('<div id="root"></div>', '<div id="root">' . $ssr_body . '</div>', $rendered);

        header('Content-Type: text/html; charset=UTF-8');
        header('X-Powered-By: ChroniqAI Headless SSR');
        echo $rendered;
        exit;
    }
}

// -------------------------------------------------------------
// CASE 2: Resources Index Page (/resources)
// -------------------------------------------------------------
$api_url = WP_API_ENDPOINT . '/posts?_embed=1&per_page=20';
$posts_data = fetch_wp_data($api_url);

$seo_title = 'Resources & Playbooks — ChroniqAI Gravity';
$seo_desc = 'Explore in-depth playbooks, benchmark studies, account safety guides, and frameworks for high-ticket B2B LinkedIn client acquisition.';
$canonical = SITE_URL . '/resources';

$index_meta = '
    <title>' . htmlspecialchars($seo_title) . '</title>
    <meta name="description" content="' . htmlspecialchars($seo_desc) . '" />
    <link rel="canonical" href="' . htmlspecialchars($canonical) . '" />
    <meta property="og:title" content="' . htmlspecialchars($seo_title) . '" />
    <meta property="og:description" content="' . htmlspecialchars($seo_desc) . '" />
    <meta property="og:url" content="' . htmlspecialchars($canonical) . '" />
    <meta property="og:type" content="website" />
';

$ssr_list = '
    <div style="max-width: 1000px; margin: 40px auto; padding: 20px; font-family: system-ui, sans-serif; color: #e2e8f0; background: #030712;">
      <h1 style="font-size: 2.8rem; color: #fff; margin-bottom: 10px;">ChroniqAI Resources</h1>
      <p style="font-size: 1.1rem; color: #94a3b8; margin-bottom: 40px;">Tactical playbooks, benchmark studies, and frameworks for high-ticket B2B LinkedIn client acquisition.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
';

if (is_array($posts_data) && !empty($posts_data)) {
    foreach ($posts_data as $p) {
        $p_title = clean_text($p['title']['rendered'] ?? 'Resource Guide');
        $p_slug = htmlspecialchars($p['slug'] ?? '');
        $p_excerpt = clean_text($p['excerpt']['rendered'] ?? '');
        $p_date = substr($p['date'] ?? '', 0, 10);
        $ssr_list .= '
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; background: rgba(15,23,42,0.6);">
          <h2 style="font-size: 1.25rem; margin-top: 0;"><a href="/resources/' . $p_slug . '" style="color: #f8fafc; text-decoration: none;">' . htmlspecialchars($p_title) . '</a></h2>
          <p style="font-size: 14px; color: #94a3b8; line-height: 1.5;">' . htmlspecialchars($p_excerpt) . '</p>
          <div style="margin-top: 15px; font-size: 12px; color: #38bdf8;">' . htmlspecialchars($p_date) . ' &bull; <a href="/resources/' . $p_slug . '" style="color: #38bdf8;">Read Guide &rarr;</a></div>
        </div>';
    }
} else {
    // Built-in static catalog if WP offline
    $ssr_list .= '
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; background: rgba(15,23,42,0.6);">
          <h2 style="font-size: 1.25rem; margin-top: 0;"><a href="/resources/ai-automation-b2b-lead-generation" style="color: #f8fafc; text-decoration: none;">How AI Automation Is Transforming B2B Lead Generation</a></h2>
          <p style="font-size: 14px; color: #94a3b8;">Discover how AI automation enables hyper-personalized outbound workflows, intent signal tracking, and scalable executive client acquisition.</p>
          <a href="/resources/ai-automation-b2b-lead-generation" style="color: #38bdf8; font-size: 12px;">Read Guide &rarr;</a>
        </div>
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; background: rgba(15,23,42,0.6);">
          <h2 style="font-size: 1.25rem; margin-top: 0;"><a href="/resources/b2b-linkedin-client-acquisition-guide-2026" style="color: #f8fafc; text-decoration: none;">The 2026 Guide to B2B LinkedIn Client Acquisition for High-Ticket Founders</a></h2>
          <p style="font-size: 14px; color: #94a3b8;">Learn how B2B founders generate qualified high-ticket meetings on LinkedIn in 2026 without pitch-slapping.</p>
          <a href="/resources/b2b-linkedin-client-acquisition-guide-2026" style="color: #38bdf8; font-size: 12px;">Read Guide &rarr;</a>
        </div>
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; background: rgba(15,23,42,0.6);">
          <h2 style="font-size: 1.25rem; margin-top: 0;"><a href="/resources/b2b-linkedin-account-safety-limits-2026" style="color: #f8fafc; text-decoration: none;">LinkedIn Account Safety &amp; Daily Action Limits: The 2026 Founder Guide</a></h2>
          <p style="font-size: 14px; color: #94a3b8;">The definitive guide to LinkedIn daily safety caps, browser fingerprinting, and residential proxies.</p>
          <a href="/resources/b2b-linkedin-account-safety-limits-2026" style="color: #38bdf8; font-size: 12px;">Read Guide &rarr;</a>
        </div>
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; background: rgba(15,23,42,0.6);">
          <h2 style="font-size: 1.25rem; margin-top: 0;"><a href="/resources/executive-buyer-intent-signals-playbook" style="color: #f8fafc; text-decoration: none;">Buyer Intent Signals &amp; Account Triggers: Reach Prospects at the Perfect Moment</a></h2>
          <p style="font-size: 14px; color: #94a3b8;">Stop guessing who wants your product. Learn how to monitor hiring spikes, technology migrations, and funding rounds.</p>
          <a href="/resources/executive-buyer-intent-signals-playbook" style="color: #38bdf8; font-size: 12px;">Read Guide &rarr;</a>
        </div>
    ';
}

$ssr_list .= '
      </div>
    </div>
';

$rendered = preg_replace('/<title>.*?<\/title>/i', '', $template_html);
$rendered = str_replace('</head>', $index_meta . '</head>', $rendered);
$rendered = str_replace('<div id="root"></div>', '<div id="root">' . $ssr_list . '</div>', $rendered);

header('Content-Type: text/html; charset=UTF-8');
header('X-Powered-By: ChroniqAI Headless SSR');
echo $rendered;
exit;
