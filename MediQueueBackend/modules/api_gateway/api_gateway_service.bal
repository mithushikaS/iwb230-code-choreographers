import ballerina/http;

service /gateway on new http:Listener(8080) {
    resource function get welcome() returns string {
        return "Welcome to MediQueue API Gateway!";
    }
}
