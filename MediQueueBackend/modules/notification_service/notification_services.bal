import ballerina/http;
import ballerina/log;

type Notification record {
    string recipientId;
    string message;
    string status;
    string timeStamp;
};

// In-memory notification storage (this could later be connected to a DB or messaging service)
map<Notification[]> notifications = {};

service /notifications on new http:Listener(8082) {

    // Send a notification (POST /notifications/send)
    resource function post send(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        Notification newNotification = check payload.cloneWithType(Notification);

        // Retrieve existing notifications or initialize with an empty array
        Notification[] userNotifications = notifications.get(newNotification.recipientId, []);

        userNotifications.push(newNotification);
        notifications[newNotification.recipientId] = userNotifications;

        json responseMessage = { message: "Notification sent successfully" };
        check caller->respond(responseMessage);
    }

    // Retrieve notifications by recipient ID (GET /notifications/{recipientId})
    resource function get getNotifications(http:Caller caller, string recipientId) returns error? {
        Notification[] userNotifications = notifications.get(recipientId, []);

        if (userNotifications.length() == 0) {
            json responseMessage = { message: "No notifications found" };
            check caller->respond(responseMessage, status = 404); // Correctly using status for error response
        } else {
            check caller->respond(userNotifications); // No status means success
        }
    }
}


