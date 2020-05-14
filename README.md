# Datasapiens Frontend Homework

This project runs own faked server with simple DB setup. All actions are persistent, so be aware of that. By default all requests are finished after 650ms to show loading states

By default db runs on [http://localhost:3001/](http://localhost:3001/)

React App [http://localhost:3000/](http://localhost:3000/)

## Used stack

Redux with RTK, Typescript, [Material-UI](https://material-ui.com/), [Json Server](https://github.com/typicode/json-server) with _home-made_ Auth, [Nivo](https://nivo.rocks/) for graphs, [i18n-react](https://github.com/alexdrel/i18n-react#readme) for translations.

I planned to use [rollbar](http://rollbar.com) for error tracking, but I did not have time for the setup at the end.
Cypress and Jest were included, but not used :( ...

## Functionality

App has Login + Autologin support backed by adjusted JSON Server. BE part verify if user is logged to do actions via FE. FE has simple Route Guard mechanisms.

Users can create budgets, share them (during creation) and delete them. After budget selection, the user is redirected to a category page. Page has an interactive donut graph.
_Choosing_ a category from the _donut graph_ will reflect on a _bar graph_. The donut graph shows sum of entries for given category. The bar graph shows **sums** of Incomes/Expenses for given date _with_ total entry count information per date in a tooltip.

**User** **can** create new Entry(Expense, Income -- determined by their nominal value) and select or create Category.
All selections provide autocomplete for already present data. Category selection is used for its creation if category is not present yet.

## What about errors?

FE part in current state does not reflect errors from BE (time reasons) - but impl via snackbars subscribed to redux should be quite trivial. App Design though differentiate between network errors and App errors separately

## Warnings ??

Yes, U will see a bunch of warnings (end error too!) during compilation. From what I found out they are caused by [Material-UI](https://material-ui.com/)

## How to Log In???

users with passwords:

| User  | Password    |
| ----- | ----------- |
| Matej | abeceda     |
| Tomas | datasapiens |

## Project setup

```
npm install
```

### Run whole project simultaneously

```
npm start
```

### Compiles and run DB server

```
npm run start-be
```

### Compiles and run FE

```
npm run start-fe
```

### To reset DB **don't forget to restart**

```
npm run reset-db
```

or if you are running commands separately just kill BE and type

```
npm run restart-be
```
