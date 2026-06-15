const args = Object.fromEntries(
  ($argument || "")
    .split("&")
    .filter(Boolean)
    .map((item) => {
      const index = item.indexOf("=");
      if (index === -1) return [decodeURIComponent(item), ""];
      return [
        decodeURIComponent(item.slice(0, index)),
        decodeURIComponent(item.slice(index + 1)),
      ];
    })
);

const source = typeof $response !== "undefined" ? $response.body : $request.body;
const search = args.search || "";
const replace = args.replace || "";
const useRegex = args.regex !== "0";

if (typeof source !== "string" || !search) {
  $done({});
} else {
  let body = source;
  try {
    body = useRegex
      ? body.replace(new RegExp(search, "g"), replace)
      : body.split(search).join(replace);
  } catch {
    body = body.split(search).join(replace);
  }

  if (typeof $response !== "undefined") {
    $done({ body });
  } else {
    $done({ body });
  }
}
