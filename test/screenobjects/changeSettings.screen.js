class ChangeSettingsSelectScreen {

    get changeSettingsElement(){
        return $('//android.view.View[contains(@content-desc, "FEATURE!")]');
    }

} 

module.exports = new ChangeSettingsSelectScreen();