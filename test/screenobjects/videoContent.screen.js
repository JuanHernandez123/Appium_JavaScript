class VideoContentScreen{

    get videoSelection(){
        return $('//android.widget.Button//following-sibling::android.view.View');
    } 
    get timeElapsedSelector(){
        return '(//android.view.View[@content-desc])[1]';
    }
    get timeElapsedElement(){
        return $('(//android.view.View[@content-desc])[1]');
    }

    convertMinutesToSeconds(minsSeconds) {
        let timeElapsed, totalSeconds;

        timeElapsed = minsSeconds.split(':',2);
        totalSeconds = (parseInt(timeElapsed[0])*60)+(parseInt(timeElapsed[1]))//convertir el time ElapsedSelector a segundsos
        return totalSeconds
    }
} 

module.exports = new VideoContentScreen();
