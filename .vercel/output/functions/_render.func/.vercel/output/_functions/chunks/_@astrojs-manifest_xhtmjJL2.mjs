import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_D3GDgl8T.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.PrNNHRNB.js"}],"styles":[{"type":"external","src":"/_astro/doctorRicardo.CU8AuniB.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-ext-400-normal.CIpeJEZw.woff2) format(\"woff2\"),url(/_astro/poppins-latin-ext-400-normal.Ce_uWq1Z.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-400-normal.cpxAROuN.woff2) format(\"woff2\"),url(/_astro/poppins-latin-400-normal.BOb3E3N0.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-ext-wght-normal.CE3EbjzZ.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-wght-normal.x48QYbAL.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-ext-wght-normal.pNDv5Qab.woff2) format(\"woff2-variations\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-wght-normal.B1lUOBKV.woff2) format(\"woff2-variations\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-vietnamese-wght-normal.CxflIBSm.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-ext-wght-normal.C5hsmzEi.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-wght-normal.CbfoEWwi.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}body{font-family:Poppins,sans-serif}\n.cont[data-astro-cid-342gpq4s]{width:100%;height:100%;background-color:#fff;background-image:radial-gradient(rgba(12,12,12,.171) 2px,transparent 0);background-size:30px 30px;background-position:-5px -5px}\n"}],"routeData":{"route":"/doctorricardo","isIndex":false,"type":"page","pattern":"^\\/doctorRicardo\\/?$","segments":[[{"content":"doctorRicardo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/doctorRicardo.astro","pathname":"/doctorRicardo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.PrNNHRNB.js"}],"styles":[{"type":"external","src":"/_astro/doctorRicardo.CU8AuniB.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-ext-400-normal.CIpeJEZw.woff2) format(\"woff2\"),url(/_astro/poppins-latin-ext-400-normal.Ce_uWq1Z.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-400-normal.cpxAROuN.woff2) format(\"woff2\"),url(/_astro/poppins-latin-400-normal.BOb3E3N0.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-ext-wght-normal.CE3EbjzZ.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-wght-normal.x48QYbAL.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-ext-wght-normal.pNDv5Qab.woff2) format(\"woff2-variations\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-wght-normal.B1lUOBKV.woff2) format(\"woff2-variations\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-vietnamese-wght-normal.CxflIBSm.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-ext-wght-normal.C5hsmzEi.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-wght-normal.CbfoEWwi.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}body{font-family:Poppins,sans-serif}\n.cont[data-astro-cid-jymykuwp]{width:100%;height:100%;background-color:#fff;background-image:radial-gradient(rgba(12,12,12,.171) 2px,transparent 0);background-size:30px 30px;background-position:-5px -5px}\n"}],"routeData":{"route":"/en/doctorricardo","isIndex":false,"type":"page","pattern":"^\\/en\\/doctorRicardo\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"doctorRicardo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/doctorRicardo.astro","pathname":"/en/doctorRicardo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DIW5ZIgJ.js"}],"styles":[{"type":"external","src":"/_astro/doctorRicardo.CU8AuniB.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-ext-400-normal.CIpeJEZw.woff2) format(\"woff2\"),url(/_astro/poppins-latin-ext-400-normal.Ce_uWq1Z.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-400-normal.cpxAROuN.woff2) format(\"woff2\"),url(/_astro/poppins-latin-400-normal.BOb3E3N0.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-ext-wght-normal.CE3EbjzZ.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-wght-normal.x48QYbAL.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-ext-wght-normal.pNDv5Qab.woff2) format(\"woff2-variations\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-wght-normal.B1lUOBKV.woff2) format(\"woff2-variations\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-vietnamese-wght-normal.CxflIBSm.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-ext-wght-normal.C5hsmzEi.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-wght-normal.CbfoEWwi.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}body{font-family:Poppins,sans-serif}\n.bg_home[data-astro-cid-shwxrd6l]{background-image:linear-gradient(#000000bd,#00000080),url(/home_bg.webp);background-color:#000}\n"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DIW5ZIgJ.js"}],"styles":[{"type":"external","src":"/_astro/doctorRicardo.CU8AuniB.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-ext-400-normal.CIpeJEZw.woff2) format(\"woff2\"),url(/_astro/poppins-latin-ext-400-normal.Ce_uWq1Z.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/poppins-latin-400-normal.cpxAROuN.woff2) format(\"woff2\"),url(/_astro/poppins-latin-400-normal.BOb3E3N0.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-ext-wght-normal.CE3EbjzZ.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-cyrillic-wght-normal.x48QYbAL.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-ext-wght-normal.pNDv5Qab.woff2) format(\"woff2-variations\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-greek-wght-normal.B1lUOBKV.woff2) format(\"woff2-variations\");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-vietnamese-wght-normal.CxflIBSm.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-ext-wght-normal.C5hsmzEi.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter Tight Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-tight-latin-wght-normal.CbfoEWwi.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}body{font-family:Poppins,sans-serif}\n.bg_home[data-astro-cid-shwxrd6l]{background-image:linear-gradient(#000000bd,#00000080),url(/home_bg.webp);background-color:#000}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/MichI/workspace/clients/mediBiologica/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/MichI/workspace/clients/mediBiologica/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/MichI/workspace/clients/mediBiologica/src/pages/doctorRicardo.astro",{"propagation":"none","containsHead":true}],["C:/Users/MichI/workspace/clients/mediBiologica/src/pages/en/doctorRicardo.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/doctorRicardo@_@astro":"pages/doctorricardo.astro.mjs","\u0000@astro-page:src/pages/en/doctorRicardo@_@astro":"pages/en/doctorricardo.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/MichI/workspace/clients/mediBiologica/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/MichI/workspace/clients/mediBiologica/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_Cuoxl7jf.mjs","/src/pages/doctorRicardo.astro":"chunks/doctorRicardo_D4Twg-W2.mjs","/src/pages/en/doctorRicardo.astro":"chunks/doctorRicardo_Cpkkzrqo.mjs","/src/pages/en/index.astro":"chunks/index_CVp_qqGQ.mjs","/src/pages/index.astro":"chunks/index_DjAju2lH.mjs","\u0000@astrojs-manifest":"manifest_Bf7NAOdt.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.PrNNHRNB.js","/astro/hoisted.js?q=0":"_astro/hoisted.DIW5ZIgJ.js","@/components/NavBar":"_astro/NavBar.DYq_X1wQ.js","@astrojs/react/client.js":"_astro/client.BIGLHmRd.js","@/components/NavBar.jsx":"_astro/NavBar.2-1pgeZR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/poppins-latin-400-normal.cpxAROuN.woff2","/_astro/poppins-latin-ext-400-normal.CIpeJEZw.woff2","/_astro/inter-tight-latin-wght-normal.CbfoEWwi.woff2","/_astro/inter-tight-cyrillic-wght-normal.x48QYbAL.woff2","/_astro/inter-tight-greek-ext-wght-normal.pNDv5Qab.woff2","/_astro/inter-tight-cyrillic-ext-wght-normal.CE3EbjzZ.woff2","/_astro/inter-tight-greek-wght-normal.B1lUOBKV.woff2","/_astro/inter-tight-latin-ext-wght-normal.C5hsmzEi.woff2","/_astro/inter-tight-vietnamese-wght-normal.CxflIBSm.woff2","/_astro/poppins-latin-400-normal.BOb3E3N0.woff","/_astro/poppins-latin-ext-400-normal.Ce_uWq1Z.woff","/_astro/doctorRicardo.CU8AuniB.css","/biologicalTreatment.svg","/chelation.svg","/chelation.webp","/cross.svg","/cross2.svg","/cross3.svg","/cross_terapy.svg","/derma.svg","/doctor.webp","/dots.svg","/DrDueñas.svg","/EUA_flag.svg","/favicon.svg","/gloves.webp","/gout.svg","/home_bg.webp","/iconOzono.svg","/logo_icon.svg","/logo_medicaBio.svg","/Mexico_flag.svg","/single_cross.svg","/_astro/client.BIGLHmRd.js","/_astro/hoisted.DIW5ZIgJ.js","/_astro/hoisted.PrNNHRNB.js","/_astro/index.DhYZZe0J.js","/_astro/NavBar.2-1pgeZR.js","/_astro/NavBar.DYq_X1wQ.js","/_astro/ViewTransitions.astro_astro_type_script_index_0_lang.BlVByLkr.js"],"i18n":{"strategy":"pathname-prefix-other-locales","locales":["es","en"],"defaultLocale":"es","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
