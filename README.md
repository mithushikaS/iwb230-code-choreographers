# MediQueue App

MediQueue is a mobile app designed to streamline the process of booking doctor appointments, managing medical records, and viewing prescriptions in real time. The app allows users to check their queue status, view appointment details, and manage their health records efficiently.

## Features

- Book doctor appointments
- View real-time queue status
- Access medical records
- View prescriptions
- Edit user profile
- Secure authentication (via email, Google, or Facebook)

## Technologies Used

- **React Native** for the front-end mobile app development
- **Firebase** for user authentication and Firestore database
- **Ballerina** for the backend API Gateway and services
- **MySQL** for storing doctor, appointment, and medical record data

## Requirements

- Node.js (version 14 or higher)
- Expo CLI
- Firebase account with Firestore set up for user authentication
- Ballerina installed for backend services
- MySQL for the database

## Installation

Step 1: Clone the Repository

Clone the MediQueue app from GitHub:

git clone https://github.com/mithushikaS/mithushikaS-iwb230-code-choreographers.git
cd mediQueue
Step 2: Install Dependencies
Ensure you have npm and Expo CLI installed. Then run the following command to install the necessary dependencies:

npm install
Step 3: Run the Application
You can start the app by running the following command:

npx expo start
Step 4: Run Ballerina Backend
Ensure that Ballerina is running on your backend services:

cd MediQueueBackend
bal run
