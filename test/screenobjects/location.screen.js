class LocationSelectScreen {

    get whileUsingTheAppOption(){
        return $('id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');
    }

} 

module.exports = new LocationSelectScreen();