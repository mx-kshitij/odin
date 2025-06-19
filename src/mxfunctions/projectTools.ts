import { studioPro } from "@mendix/extensions-api";

export async function getModules() {
     const modules = await studioPro.app.model.domainModels.getModules();
     return JSON.stringify(modules);
}

export function getTheme() {
     // to be replaced with actual theme retrieval logic
    const defaultTheme = "light";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        return storedTheme;
    } else {
        localStorage.setItem("theme", defaultTheme);
        return defaultTheme;
    }
}