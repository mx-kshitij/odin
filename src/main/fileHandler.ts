import { studioPro } from "@mendix/extensions-api";

export const saveFile = async (fileName: string, fileContent: string) => {
    try {
        await studioPro.app.files.putFile(fileName, fileContent);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const loadFile = async (fileName: string) => {
    return await studioPro.app.files.getFile(fileName);
};

export const deleteFile = async (fileName: string) => {
    try {
        await studioPro.app.files.deleteFile("HelloWorld.txt");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
