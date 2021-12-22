function NotifyUser(Location, Status) { //figure out notifications
    const d = new Date()
    var datetime = d.toLocaleString('en-GB')
    const locations = [
        'main room', //Room 31
        'photo room', //Room 32
        'library', //Library
        'woodshop', //Room 33
        'signout', //Signing out
        ]
    var location
    if(!Location) {
        var place = 'null'
    } else if(locations.includes(location)) {
        var place = String(location)
    } else {
        var place = 'null'
      }
    //Notify User of Sucsessful Signin
    switch(string(data.notifmethod.toLowerCase())) {
        case 'vibration': //simple buzz
            function notifyVibrate() {
                if (Platform.OS === "android") {
                    Vibration.vibrate(500)
                } else if(Platform.OS === "ios") {
                    state = true
                    Vibration.vibrate([150,150,150],state)
                    setTimeout(function(){ Vibration.cancel(); }, 1600);
                }
            }
            notifyVibrate()
        break;
        case 'notification': // You signed in at the _ at _
            function notifyPush(where, why) {
            }
            notifyPush()
            //if(status == 'in') {
            //console.log("You signed in on "+datetime+" at "+place)
            //} else if(status == 'out') {
            //    console.log("You signed out on "+datetime)
            //}
        break;
        default: 
            notifyVibrate()
            notifyPush()

    }
}
function talonSignIn(NFCDATA) {
    if(!sn) {
        const sn = new Map() //creates new map
    }
    if(!NFCDATA) {
        Alert.alert(
            'No NFC Data Found',
            'This is most likely a development error',
        )
        return
    }
    
    if(sn.has("entried")) { //if map run alert
        Alert.alert(
        'Your Signin has been registered',
        'Please wait one minute before sending another',)
    } else { //if no limit set limit 
        sn.set("entried") //setting limit
        setTimeout(() => { sn.delete("entried") }, 60000); //clear limit after 1 min
        //rest of code:
            //Send Location, Time, Name, and Status to backend
            //Notify User NotifyUser()

    }
    // Send to data table >> google spreadsheet
    // Take in NFC Data >> Parse out Location and status
}