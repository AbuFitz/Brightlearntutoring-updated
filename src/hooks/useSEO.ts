import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
}

const SITE_URL = "https://www.brightlearntutoring.co.uk";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-route document title, meta description, canonical URL, robots
 * directive and Open Graph tags. index.html only ships defaults for "/",
 * so every other route needs this to avoid duplicate-meta SEO penalties.
 */
export function useSEO({ title, description, path, noindex, ogTitle, ogDescription }: SEOOptions) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const prevTitle = document.title;

    document.title = title;
    setMetaByName("description", description);
    setLink("canonical", canonical);
    setLink("alternate", canonical, "en-GB");
    setLink("alternate", canonical, "x-default");

    setMetaByName(
      "robots",
      noindex
        ? "noindex, follow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    setMetaByProperty("og:url", canonical);
    setMetaByProperty("og:title", ogTitle ?? title);
    setMetaByProperty("og:description", ogDescription ?? description);
    setMetaByName("twitter:title", ogTitle ?? title);
    setMetaByName("twitter:description", ogDescription ?? description);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path, noindex, ogTitle, ogDescription]);
}
