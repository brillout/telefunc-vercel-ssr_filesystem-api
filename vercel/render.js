import { createPageRenderer } from "vite-plugin-ssr";
import { telefunc, telefuncConfig } from "telefunc";
import { text } from "micro";
// `importBuild.js` enables Vercel to bundle our serverless functions, see https://vite-plugin-ssr.com/vercel and https://vite-plugin-ssr.com/importBuild.js
import "../dist/server/importBuild.js";

telefuncConfig.debug = true;

const renderPage = createPageRenderer({ isProduction: true });

export default async function handler(req, res) {
  const { url } = req;

  console.log("Request to url:", url);

  if (url === "/_telefunc") {
    const rawBody = await text(req);
    const httpResponse = await telefunc({
      url,
      method: req.method,
      body: rawBody,
    });
    const { body, statusCode, contentType } = httpResponse;
    res.statusCode = statusCode;
    res.setHeader("content-type", contentType);
    res.end(body);
    return;
  }

  const pageContextInit = { url };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;

  if (!httpResponse) {
    res.statusCode = 200;
    res.end("not found: " + url);
  } else {
    const { body, statusCode, contentType } = httpResponse;

    res.statusCode = statusCode;
    res.setHeader("content-type", contentType);
    res.end(body);
  }
}
