function pagePrerendered() {
  return (
    document.prerendering ||
    self.performance?.getEntriesByType?.("navigation")[0]?.activationStart > 0
  );
}

const navigation_performance =
  self.performance?.getEntriesByType?.("navigation")[0];

console.log("Currently prerendering: ", document.prerendering);
(async () => {
  const start = performance.now();
  if (document.prerendering) {
    await new Promise((resolve) => {
      document.addEventListener("prerenderingchange", resolve, { once: true });
    });
    console.log("prerenderingchange");
  }

  const timing = document.createElement("strong");
  const activation_start = Math.round(
    navigation_performance.activationStart || 0
  );
  timing.textContent = `${activation_start}ms to activate`;
  document.body.append(timing);

  // Would be cool to make this more of a report (more performance timings,
  // change color, etc)
  const img = document.createElement("img");
  img.src = `/og?text=${activation_start}ms to activate`;
  document.body.append(img);

  let pre = document.createElement("pre");
  pre.innerHTML = JSON.stringify(navigation_performance, null, 2);
  document.body.append(pre);

  // Todo - set background color and text based on how long it's been
})();
