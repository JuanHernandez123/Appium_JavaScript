class MoreMenuSelectOptionScreen {

    get moreButton(){
        return $('//android.view.View[contains(@content-desc,"MORE")]');
    }

    get mediaCenterItem(){
        return $('~Media Center');
    }

}

module.exports = new MoreMenuSelectOptionScreen();