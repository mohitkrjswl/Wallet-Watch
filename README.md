# WALLET-WATCH APP

A comprehensive expense management application that allows users to track their income and expenses efficiently. Users can sign up, log in, and manage their financial records using tables and graphical representations for better analysis. The app includes a calendar for selecting time spans to view specific expense records.

## Features

- **User Authentication**: Secure login and signup with JWT tokens.
- **Expense and Income Tracking**: List and manage all your expenses and income.
- **Calendar Integration**: Use the moment library to select time spans for viewing expense records.
- **Data Visualization**: View records in tables using Ant Design and graphical representations for better analysis.
- **Financial Overview**: Track total expenses, income, and overall money flow.

## Tech Stack

- **Frontend**: React, Ant Design
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT tokens


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mohitkrjswl/Wallet-Watch.git
    cd client
    ```
    clone backend repository:
    ```bash
    https://github.com/mohitkrjswl/Wallet-Watch-Backend.git
    ```
    

2. Install dependencies for both client and server:
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `server` directory and add your MongoDB Atlas URI and JWT secret.
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:
    - Open two terminals: one for the backend and one for the frontend.
    ```bash
    # In the server directory
    node server.js

    # In the client directory
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

1. **Sign Up**: Create a new account.
2. **Log In**: Use your credentials to log in.
3. **Add Income and Expenses**: List down your income and expenses.
4. **Track Money Flow**: View your financial records in tables and graphs.
5. **Select Time Span**: Use the calendar to select specific time spans for detailed records.

## Screenshots

### Sign Up Page


![Screenshot 2024-06-13 223618](https://github.com/mohitkrjswl/Wallet-Watch/assets/119107584/7044b622-1cfd-49bb-a405-b8dc897cba1b)


###Login Page



![Screenshot 2024-06-13 223552](https://github.com/mohitkrjswl/Wallet-Watch/assets/119107584/2b6f4cfd-f938-4836-b8fb-3a0af586cd01)

### Dashboard

![Screenshot 2024-05-28 105153](https://github.com/mohitkrjswl/Wallet-Watch/assets/119107584/6480cf8b-fb60-4bb4-bec2-2b75891cbc40)



## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.


---

Thank you for checking out the Expense Management App! Happy tracking!
