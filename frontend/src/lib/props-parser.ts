export type Control = { id: string; label: string; type: 'text' | 'boolean' | 'color'; value: any };

export function parsePropsFromSource(tsxCode: string): Control[] {
  const match = tsxCode.match(/function\s+App\s*\(\s*\{([^}]*)\}\s*\)/);
  if (!match) return [];

  const paramsStr = match[1];
  const params = paramsStr.split(',').map(p => p.trim()).filter(Boolean);

  return params.map(param => {
    const id = param.split(/[=:]/)[0].trim();
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    const eqIdx = param.indexOf('=');

    let value: any = '';
    let type: 'text' | 'boolean' | 'color' = 'text';

    if (eqIdx !== -1) {
      const rawDefault = param.slice(eqIdx + 1).trim();
      try {
        const evaluated = Function(`"use strict"; return (${rawDefault})`)();
        value = evaluated;
        if (typeof evaluated === 'boolean') {
          type = 'boolean';
        } else if (typeof evaluated === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(evaluated)) {
          type = 'color';
        }
      } catch {
        value = rawDefault.replace(/^["']|["']$/g, '');
      }
    }

    return { id, label, type, value };
  });
}

export function generateEntryPoint(controls: Control[]): string {
  const propsObj = controls.reduce((acc, c) => ({ ...acc, [c.id]: c.value }), {});
  const propsJson = JSON.stringify(propsObj);

  return `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App {...${propsJson}} />
  </StrictMode>
);`;
}
