import moment from "moment-timezone";

function convertTimeSlot(time, type) {
    let timeInUTC = moment.tz(time, ["hh:mm A", "HH:mm"], 'UTC');
    if (type === "24h") {
        let time24 = timeInUTC.format("HH:mm");
        return time24;
    } else {
        let time12 = timeInUTC.format("hh:mm A");
        return time12;
    }
}


export default convertTimeSlot;
