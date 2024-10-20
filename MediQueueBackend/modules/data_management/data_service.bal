import ballerina/http;
import ballerina/log;

type User record {
    string id;
    string name;
    string email;
    string role; // Patient, Doctor, Admin
};

type Appointment record {
    string appointmentId;
    string userId;
    string doctorId;
    string date;
    string time;
    string status; // Scheduled, Completed, Canceled
};

type Doctor record {
    string doctorId;
    string name;
    string specialty;
};

map<User> users = {};
map<Appointment> appointments = {};
map<Doctor> doctors = {};

service /data on new http:Listener(8083) {

    // Create a new user (POST /data/users)
    resource function post users(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        User newUser = check payload.cloneWithType(User);
        users[newUser.id] = newUser;

        json responseMessage = { message: "User created successfully" };
        check caller->respond(responseMessage);
    }

    // Get a user by ID (GET /data/users/{id})
    resource function get users(http:Caller caller, string id) returns error? {
        User? user = users[id];

        if (user is ()) {
            json responseMessage = { message: "User not found" };
            check caller->respond(responseMessage);
        } else {
            check caller->respond(user);
        }
    }

    // Update user information (PUT /data/users/{id})
    resource function put users(http:Caller caller, http:Request req, string id) returns error? {
        json payload = check req.getJsonPayload();
        User updatedUser = check payload.cloneWithType(User);

        if (users.hasKey(id)) {
            users[id] = updatedUser;
            json responseMessage = { message: "User updated successfully" };
            check caller->respond(responseMessage);
        } else {
            json responseMessage = { message: "User not found" };
            check caller->respond(responseMessage);
        }
    }

    // Delete a user (DELETE /data/users/{id})
    resource function delete users(http:Caller caller, string id) returns error? {
        if (users.hasKey(id)) {
            users.remove(id);
            json responseMessage = { message: "User deleted successfully" };
            check caller->respond(responseMessage);
        } else {
            json responseMessage = { message: "User not found" };
            check caller->respond(responseMessage);
        }
    }

    // Create a new appointment (POST /data/appointments)
    resource function post appointments(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        Appointment newAppointment = check payload.cloneWithType(Appointment);
        appointments[newAppointment.appointmentId] = newAppointment;

        json responseMessage = { message: "Appointment created successfully" };
        check caller->respond(responseMessage);
    }

    // Get an appointment by ID (GET /data/appointments/{appointmentId})
    resource function get appointments(http:Caller caller, string appointmentId) returns error? {
        Appointment? appointment = appointments[appointmentId];

        if (appointment is ()) {
            json responseMessage = { message: "Appointment not found" };
            check caller->respond(responseMessage);
        } else {
            check caller->respond(appointment);
        }
    }

    // Update appointment (PUT /data/appointments/{appointmentId})
    resource function put appointments(http:Caller caller, http:Request req, string appointmentId) returns error? {
        json payload = check req.getJsonPayload();
        Appointment updatedAppointment = check payload.cloneWithType(Appointment);

        if (appointments.hasKey(appointmentId)) {
            appointments[appointmentId] = updatedAppointment;
            json responseMessage = { message: "Appointment updated successfully" };
            check caller->respond(responseMessage);
        } else {
            json responseMessage = { message: "Appointment not found" };
            check caller->respond(responseMessage);
        }
    }

    // Delete an appointment (DELETE /data/appointments/{appointmentId})
    resource function delete appointments(http:Caller caller, string appointmentId) returns error? {
        if (appointments.hasKey(appointmentId)) {
            appointments.remove(appointmentId);
            json responseMessage = { message: "Appointment deleted successfully" };
            check caller->respond(responseMessage);
        } else {
            json responseMessage = { message: "Appointment not found" };
            check caller->respond(responseMessage);
        }
    }
}

