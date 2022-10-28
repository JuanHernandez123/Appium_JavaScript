const vision = require('@google-cloud/vision');
const {join} = require('path');

/**
 * Gets the title and page information for the given image of the application technical document.
 * 
 * TODO: Improve the way the data is extracted from the resulting OCR
 * @param path Path to the image file to which the data will be obtained through the Google Vision OCR.
 * @returns 
 */
 module.exports = getImageData = async (path) => {
    try {
        const client = new vision.ImageAnnotatorClient({
            keyFilename: join(process.cwd(), './google-services.json')
        });
        const [result] = await client.textDetection(path);
        const fullText = result['fullTextAnnotation'].text.split('\n');
        const title = fullText[1];
        const pageInfo = fullText[fullText.length - 3];
        const extractPageInfoRx = /Page (?<currentPage>\d+) of (?<pageCount>\d+)/;
        const {currentPage, pageCount} = extractPageInfoRx.exec(pageInfo).groups;
        return {
            isError: false,
            errorMessage: undefined,
            data: {
                title,
                pageCount,
                currentPage
            }
        }
    } catch (error) {
        return {
            isError: true,
            errorMessage: error.detail || error.message || 'Error while trying to perform OCR on the provided image.',
            data: undefined
        }
    }
}
