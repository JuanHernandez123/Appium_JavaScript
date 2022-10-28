class ChooseRegionSelectScreen {

    get regionAmericasOption(){
        return $('~Americas');
    }

    get unitedStatesLocation(){
        return $('~United States');
    }

    get selectRegionButton(){
        return $('~SELECT REGION');
    }

} 

module.exports = new ChooseRegionSelectScreen();