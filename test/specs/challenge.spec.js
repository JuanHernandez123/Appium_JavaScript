const ProfileSelectScreen = require('../screenobjects/profile.screen');
const MoreMenuSelectOptionScreen = require('../screenobjects/moremenu.screen');
const MediaCenterScreen = require('../screenobjects/mediacenter.screen');
const LocationSelectScreen = require('../screenobjects/location.screen');
const AllCategoriesSelectScreen = require('../screenobjects/allCategories.screen');
const WelcomeSelectScreen = require('../screenobjects/welcome.screen');
const ChooseRegionSelectScreen = require('../screenobjects/chooseRegion.screen');
const ChangeSettingsSelectScreen = require('../screenobjects/changeSettings.screen');
const VideoContentScreen = require('../screenobjects/videoContent.screen');

const assert = require("assert");

const getImageData = require('../../utils/getImageData');
const Utilities = require('../../utils/utilities');

describe('z-qa hackathon challenges', () => {
    beforeEach(async () => {
        await WelcomeSelectScreen.nextButton.click();
        await ChooseRegionSelectScreen.regionAmericasOption.click();
        await ChooseRegionSelectScreen.unitedStatesLocation.click();
        await ChooseRegionSelectScreen.selectRegionButton.click();
        await ProfileSelectScreen.architectOption.click();
        await ProfileSelectScreen.startUsingAppOption.click();
        await LocationSelectScreen.whileUsingTheAppOption.click()
        await ChangeSettingsSelectScreen.changeSettingsElement.waitForDisplayed();
        driver.back();
    });

    afterEach(async()=>{
        await driver.reset();
    });

    it('should contain correct title in pdf image - challenge 1', async () => {
        await AllCategoriesSelectScreen.technicalInformationOption.click();

        //Random Navigation
        attempt = 0;
        while(! await $('//android.view.View[@content-desc="SORT BY: A - Z"]').isDisplayed() && attempt < 10){
            let collectionElements = $$('(//android.view.View[@index=0 and @content-desc[not(.="")] and @clickable="true"])');
            let randomIndex = Math.floor(Math.random() * (await collectionElements.length));
            await $(`(//android.view.View[@index=0 and @content-desc[not(.="")] and @clickable="true"])[${randomIndex === 0 ? 1 : randomIndex}]`).click();
            attempt++;
            await driver.pause(3000);
        }

        //Clean Text
        let collectionDocuments = await $$('//android.widget.ImageView');
        let randomIndex = Math.floor(Math.random() * (await collectionDocuments.length));
        console.log("randomIndex::", randomIndex);
        await driver.pause(2000);
        let fileName = await $(`(//android.widget.ImageView)[${randomIndex === 0 ? 1 : randomIndex}]`).getAttribute('content-desc'); 
        console.log(`FileName: ${fileName}`) ;
        let fileNameText = fileName.split("Product:");
        let cleanImageName = fileNameText[0].trim();
        let imageInfoTittle = cleanImageName.split("TIS");
        imageInfoTittle = imageInfoTittle[1].trim();
        
        //Open image documentation
        await $(`(//android.widget.ImageView)[${randomIndex === 0 ? 1 : randomIndex}]`).click();
        let imageTittle = await $(`//android.view.View[contains(@content-desc,'${imageInfoTittle}')]`).getAttribute('content-desc');
        expect(fileName).toContain(imageTittle);
        
        const screenshotPath = './test/images/screenshot.png'
        await $('android.widget.ImageView').saveScreenshot(screenshotPath);
        const image = await getImageData(screenshotPath);
        //TODO: Improve this validation. This is mostly a POC. The idenfitied title from OCR should be cleaned up in a better way.
        const lcFileName = fileName.toLowerCase();
        const cleanDocumentTitle = image.data.title.replace(/[^a-zA-Z0-9 ]/,'');
        const lcDocumentTitle = cleanDocumentTitle.toLowerCase();

        console.log('**OCR PART**');
        console.log(`Title: ${cleanDocumentTitle}`);
        console.log(`Current Page: ${image.data.currentPage}`);
        console.log(`Page Count: ${image.data.pageCount}`);
        
        assert(lcFileName.includes(lcDocumentTitle), 'Document title doesnt match with Listed Title');

    });
  
    it('Video is being played - challenge 2 -', async () => {
        await MoreMenuSelectOptionScreen.moreButton.click();
        await MoreMenuSelectOptionScreen.mediaCenterItem.click(); 
        await MediaCenterScreen.mediaCenterWidgetScrollView.waitForDisplayed();

        const mediaCenterCollectionSections = MediaCenterScreen.mediaCenterWidgetImageViews;
        
        await mediaCenterCollectionSections[Utilities.randomOption(await mediaCenterCollectionSections.length)].click();
        await MediaCenterScreen.mediaCenterWidgetScrollView.waitForDisplayed();

        const mediaSelectedSection = MediaCenterScreen.mediaCenterWidgetImageViews;
        
        await mediaSelectedSection[Utilities.randomOption(await mediaSelectedSection.length)].click();
        
        const mediaPlay = MediaCenterScreen.aMediaCenterWidgetImageView;
        await mediaPlay.click();  
        await driver.pause(20000);
        
        let previewTimeElapsed = 0, timeElapsedString = '';
        for(let count = 3; count>0; count--){ 

            await VideoContentScreen.videoSelection.click();

            await (VideoContentScreen.timeElapsedElement).waitForDisplayed({timeout: 10000});
            timeElapsedString = await (VideoContentScreen.timeElapsedElement).getAttribute('content-desc');
           
            const newTimeElapsed = VideoContentScreen.convertMinutesToSeconds(timeElapsedString);

            expect(newTimeElapsed).toBeGreaterThan(previewTimeElapsed)
            previewTimeElapsed = newTimeElapsed;
            
            console.log(`***** The video has been reproduced by: * ${previewTimeElapsed} * seconds`);
            await driver.pause(5000);
        } 
       
    });
});