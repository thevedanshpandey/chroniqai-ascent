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

        // Prepare SEO Meta Tags to inject into <head>
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
    <script type="application/ld+json">' . json_encode($article_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>
    <script type="application/ld+json">' . json_encode($breadcrumb_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>
';

        // Prepare Semantic Body to inject inside <div id="root">
        $ssr_body = '
    <article class="ssr-article-wrapper" style="max-width: 900px; margin: 40px auto; padding: 20px; font-family: system-ui, sans-serif; color: #e2e8f0; background: #030712;">
      <nav aria-label="Breadcrumbs" style="margin-bottom: 20px; font-size: 13px; color: #94a3b8;">
        <a href="/" style="color: #cbd5e1;">Home</a> &gt; 
        <a href="/resources" style="color: #cbd5e1;">Resources</a> &gt; 
        <span style="color: #38bdf8;">' . htmlspecialchars($title) . '</span>
      </nav>
      <header style="margin-bottom: 30px;">
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
      <main class="ssr-article-content" style="line-height: 1.8; font-size: 16px; color: #cbd5e1;">
        ' . $raw_content . '
      </main>
      <footer style="margin-top: 50px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p><a href="/gravity" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">Discover ChroniqAI Gravity</a> — AI-powered LinkedIn client acquisition for high-ticket B2B founders.</p>
        <p><a href="/resources" style="color: #94a3b8;">&larr; Back to all resources</a></p>
      </footer>
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
