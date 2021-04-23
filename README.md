# Interview Scheduler

-This project is a single-page React application that creates scheduled appointments with options to edit and cancel existing appointments.

## Features

-Scheduler will help you stay organized and help your clients schedule their days based off of available schedule spots.
-Creating an appointment is easy, pick a slot, type in the Student's name, pick the interviewer and press the green Save button.
-Once an appointment has been created you can then Edit or Delete it if there was a mistake or needs to be rescheduled.
-The amount of slots available per day is displayed on the sidebar and updates as new appointments are made and slots are filled.

## Getting Started!

-Fork this repository, then clone your fork of this repository.

-Install dependencies with `npm install`

-Follow the instructions in [scheduler-api](https://github.com/brackish888/scheduler-api/blob/master/README.md)

## Dependencies

- "axios": "^0.21.1"
- "@testing-library/jest-dom": "^4.0.0"
- "@testing-library/react": "^8.0.7"
- "@testing-library/react-hooks": "^5.1.1"
- "react-test-renderer": "^17.0.2"
- "react-scripts": "3.0.0"
- "node-sass": "^4.14.0"

If any of these are missing you can install them with `npm install <package> --save`

# Final result

["Initial page start on Monday"](https://github.com/brackish888/scheduler/blob/master/docs/Opening-page.png?raw=true)
["Create or Edit an appointment"](https://github.com/brackish888/scheduler/blob/master/docs/Create-Edit.png?raw=true)
["Resulting in a new appointment!"](https://github.com/brackish888/scheduler/blob/master/docs/NewAppointment.png?raw=true)
["Or Delete it"](https://github.com/brackish888/scheduler/blob/master/docs/DeleteAppointment.png?raw=true)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
