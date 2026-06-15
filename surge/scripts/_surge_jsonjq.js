let body = $response.body;

try {
  const data = JSON.parse(body);

  if ($argument === "clear_data") {
    data.data = {};
  } else if ($argument === "remove_taobao_marketing_children") {
    const children = data?.data?.model?.children;
    if (Array.isArray(children)) {
      data.data.model.children = children.filter(
        (item) => !String(item?.name || "").includes("营销")
      );
    }
  }

  body = JSON.stringify(data);
} catch {}

$done({ body });
