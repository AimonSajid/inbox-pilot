import {
  DEFAULT_WELCOME_MESSAGE,
  type WidgetEmbedConfig,
} from "@inbox-pilot/types";

const ROOT_ID = "inbox-pilot-widget";

function readConfig(): WidgetEmbedConfig {
  const script =
    document.currentScript ?? document.querySelector("script[data-key]");
  const publicKey =
    script instanceof HTMLScriptElement && script.dataset.key
      ? script.dataset.key
      : "pk_demo";

  return {
    publicKey,
    welcomeMessage: DEFAULT_WELCOME_MESSAGE,
  };
}

function mount(config: WidgetEmbedConfig) {
  if (document.getElementById(ROOT_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    #${ROOT_ID} { position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; font-family: "Avenir Next", "Segoe UI", sans-serif; }
    #${ROOT_ID} .panel { display: none; width: min(320px, calc(100vw - 40px)); margin-bottom: 12px; padding: 16px; border-radius: 16px; background: #fffdf8; color: #17211e; box-shadow: 0 16px 40px rgba(23, 33, 30, 0.16); }
    #${ROOT_ID}.open .panel { display: block; }
    #${ROOT_ID} .panel p { margin: 8px 0 0; }
    #${ROOT_ID} .key { color: #5c675f; font-size: 12px; }
    #${ROOT_ID} .launcher { border: 0; border-radius: 999px; padding: 12px 16px; background: #1d5c4a; color: #f7f3ea; font: inherit; font-weight: 600; cursor: pointer; }
  `;

  const root = document.createElement("div");
  root.id = ROOT_ID;

  const panel = document.createElement("div");
  panel.className = "panel";
  panel.innerHTML = `<strong>InboxPilot</strong><p></p><p class="key"></p>`;
  const message = panel.querySelector("p");
  const key = panel.querySelector(".key");
  if (message) {
    message.textContent = config.welcomeMessage;
  }
  if (key) {
    key.textContent = config.publicKey;
  }

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.type = "button";
  launcher.textContent = "Chat";
  launcher.setAttribute("aria-expanded", "false");
  launcher.addEventListener("click", () => {
    const open = root.classList.toggle("open");
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
  });

  root.append(panel, launcher);
  document.head.append(style);
  document.body.append(root);
}

const config = readConfig();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => mount(config), { once: true });
} else {
  mount(config);
}
