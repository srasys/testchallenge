# Lavu: ReactNative Tech Interview Challenge

In this challenge you will build a basic React Native application that lets a customer view the menu at a restaurant.
The application will resemble a Kiosk where patrons can walk up to the device and place their orders.
For this challenge, only the menu needs to be displayed.

## Project Overview

This project includes a `server` directory. This holds a simple express server with some routes.
Consume the routes in the ReactNative application in order to get the menu data.

## Initial Setup

### Server

1. navigate to server directory
2. Run `npm install`
3. Run `npm start`

### App

1. From project root
2. Run `npm install`
3. Run `react-native run-ios --simulator="iPad Air"`

## General Guidelines

The goal of this challenge is to complete the requirements below while maintaining good code organization and using idiomatic React patterns. We don't expect perfect code, but we do want to see _some_ consideration for a quality React application.

We don't want you to spend too much time on this -- **we expect you to be able to complete the requirements in 4-6 hours**. Overall we're looking for a jumping off point to have a conversation about your thinking and approach rather than a production-ready application.

- Reference the [`KioskMenu`](./KioskMenu.jpg) Image for a general idea on the UI we expect. The design is up to you, but the UI on the PDF is _roughly_ the layout we're looking for.
- The UI should look presentable, but we don't expect you to be a designer. Prefer a well-working application over design.
- Use any external packages you think would be helpful.
- Tests are not required, but allowed.

## Requirements

Make sure the application is run from a tablet / iPad. The included instructions above will run the application on an iPad Air. Constraints have already been placed to load the application in landscape only.

1. At the top of the page display a navigation bar containing the Menu Groups. These should be displayed horizontally and allow horizontal scroll. The content for this menu should be fetched from the API (see below for API data).

2. Below the Menu Group, display another horizontal list of its corresponding Categories. This list will change depending on the Menu Group selected.

3. Below the navigation bar show a grid of all the elements within the currently selected Category. The cards should be in a 2-column layout.

4. Each group and category in the top menu should be clickable, and when clicked the tiles should reflect the items that belong to the selected category. The selected category in the navigation bar should be styled in some way to indicate that it is the active filter.

## API Data

Run the included API server as described above. During development you can hit this server from your React Native application by making requests to `/api/..` (ex: `fetch('/api/menu')`).

There is more data in the returned JSON than is necessary to complete this exercise.

Below is the API route (s):

#### `Menu`

- `GET /api/menu`

## Images

When showing images please use the website [`placeholder.com`](https://placeholder.com/) to generate an image. Add the item's name in the center of the image.

Here is an example URL:

`https://via.placeholder.com/300.png?text=Burrito`
