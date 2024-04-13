export const FileParser = (file) => {
    return new Promise((resolve, reject) => {
        if (!(file instanceof Blob)) {
            reject(new Error("Input is not a Blob"));
            return;
        }

        let fileReader = new FileReader();

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };

        fileReader.readAsDataURL(file);
    });
};