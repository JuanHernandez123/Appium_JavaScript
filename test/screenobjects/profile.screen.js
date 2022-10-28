class ProfileSelectScreen {

    get architectOption(){
        return $('~Architect');
    }

    get startUsingAppOption(){
        return $('~START USING THE APP');
    }

} 

module.exports = new ProfileSelectScreen();