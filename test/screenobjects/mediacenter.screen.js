class MediaCenterScreen{

    get mediaCenterWidgetScrollView(){
        return $('.android.widget.ScrollView');
    }

    get mediaCenterWidgetImageViews(){
        return $$('.android.widget.ImageView');
    }

    get aMediaCenterWidgetImageView(){
        return $('.android.widget.ImageView');
    }
 
} 

module.exports = new MediaCenterScreen();
