import { IComponent, studioPro } from "@mendix/extensions-api";

class Main implements IComponent {
    async loaded() {
        // Add a menu item to the Extensions menu
        await studioPro.ui.extensionsMenu.add({
            menuId: "odin.main",
            caption: "Odin",
            subMenus: [
                { menuId: "odin.NewChat", caption: "Chat" },
            ],
        });

        const paneHandle = await studioPro.ui.panes.register(
            {
                title: "Odin",
                initialPosition: "right",
            },
            {
                componentName: "extension/odin",
                uiEntrypoint: "dockablepane",
            });

        // Open a tab when the menu item is clicked
        studioPro.ui.extensionsMenu.addEventListener(
            "menuItemActivated",
            (args) => {
                if (args.menuId === "odin.NewChat") {
                    studioPro.ui.panes.open(paneHandle)
                }
            }
        );
    }
}

export const component: IComponent = new Main();
