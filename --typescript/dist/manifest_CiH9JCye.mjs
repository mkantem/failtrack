import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, f as decodeKey } from './chunks/astro/server_CAgZhzEv.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/","adapterName":"","routes":[{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/browse/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/browse","isIndex":false,"type":"page","pattern":"^\\/en\\/browse\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"browse","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/browse.astro","pathname":"/en/browse","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/submit/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/submit","isIndex":false,"type":"page","pattern":"^\\/en\\/submit\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/submit.astro","pathname":"/en/submit","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/thankyou/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/thankyou","isIndex":false,"type":"page","pattern":"^\\/en\\/thankyou\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"thankyou","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/thankyou.astro","pathname":"/en/thankyou","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/merci/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fr/merci","isIndex":false,"type":"page","pattern":"^\\/fr\\/merci\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}],[{"content":"merci","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fr/merci.astro","pathname":"/fr/merci","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/parcourir/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fr/parcourir","isIndex":false,"type":"page","pattern":"^\\/fr\\/parcourir\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}],[{"content":"parcourir","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fr/parcourir.astro","pathname":"/fr/parcourir","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/soumettre/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fr/soumettre","isIndex":false,"type":"page","pattern":"^\\/fr\\/soumettre\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}],[{"content":"soumettre","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fr/soumettre.astro","pathname":"/fr/soumettre","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fr","isIndex":true,"type":"page","pattern":"^\\/fr\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fr/index.astro","pathname":"/fr","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/en/browse@_@astro":"pages/en/browse.astro.mjs","\u0000@astro-page:src/pages/en/submit@_@astro":"pages/en/submit.astro.mjs","\u0000@astro-page:src/pages/en/thankyou@_@astro":"pages/en/thankyou.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/fr/merci@_@astro":"pages/fr/merci.astro.mjs","\u0000@astro-page:src/pages/fr/parcourir@_@astro":"pages/fr/parcourir.astro.mjs","\u0000@astro-page:src/pages/fr/soumettre@_@astro":"pages/fr/soumettre.astro.mjs","\u0000@astro-page:src/pages/fr/index@_@astro":"pages/fr.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_CiH9JCye.mjs","C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/locales/en.json":"chunks/en_CK7tc_AC.mjs","C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/locales/fr.json":"chunks/fr_BcOP4tQ4.mjs","C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/components/LanguageSwitcher":"_astro/LanguageSwitcher.Ct9k-cW3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/browse/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/submit/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/thankyou/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/en/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/merci/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/parcourir/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/soumettre/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/fr/index.html","/file:///C:/Users/ISH/Documents/GitHub/failtrack/--typescript/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"Sbg/2K/uYY2DQakDu92OiJz27RU/2ksa65N42nnAg+M=","experimentalEnvGetSecretEnabled":false});

export { manifest };
