import ballerina/http;
import ballerina/log;

type Patient record {
    string id;
    string name;
    string appointmentTime;
    string doctorName;
};

type ErrorMessage record {
    string message;
};

// In-memory queue for patients (declared at the service level)
map<Patient[]> doctorQueues = {};

service /queue on new http:Listener(8081) {

    // Add patient to a queue (POST /queue/add)
    resource function post add(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        Patient newPatient = check payload.cloneWithType(Patient);

        // Add patient to the respective doctor's queue
        Patient[] doctorQueue = doctorQueues[newPatient.doctorName] ?: [];
        doctorQueue.push(newPatient);
        doctorQueues[newPatient.doctorName] = doctorQueue;

        // Send success response
        json responseMessage = {message: "Patient added to the queue"};
        check caller->respond(responseMessage);
    }

    // Get queue for a doctor (GET /queue/{doctorName})
    resource function get queue(http:Caller caller, http:Request req, string doctorName) returns error? {
        Patient[] doctorQueue = doctorQueues[doctorName] ?: [];
        
        if (doctorQueue.length() == 0) {
            ErrorMessage errorMessage = {message: "No patients in the queue for the doctor"};
            check caller->respond(errorMessage, status = 404);
        } else {
            // Send the queue as response
            check caller->respond(doctorQueue);
        }
    }

    // Remove the next patient from the queue (DELETE /queue/next/{doctorName})
    resource function delete next(http:Caller caller, http:Request req, string doctorName) returns error? {
        Patient[] doctorQueue = doctorQueues[doctorName] ?: [];

        if (doctorQueue.length() > 0) {
            // Remove the first patient from the queue
            Patient removedPatient = doctorQueue.remove(0);
            doctorQueues[doctorName] = doctorQueue;

            // Respond with details of the removed patient
            check caller->respond(removedPatient);
        } else {
            // Send error response if the queue is empty
            ErrorMessage errorMessage = {message: "No patients in the queue to remove"};
            check caller->respond(errorMessage, status = 404);
        }
    }

    // Get total queue count for a doctor (GET /queue/count/{doctorName})
    resource function get count(http:Caller caller, http:Request req, string doctorName) returns error? {
        Patient[] doctorQueue = doctorQueues[doctorName] ?: [];
        int queueCount = doctorQueue.length();
        
        json responseMessage = {message: "Total patients in queue", count: queueCount};
        check caller->respond(responseMessage);
    }
}


