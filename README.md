# Selectable Table

## My Implementation

Built using

- [ReactJs](https://reactjs.org/): UI Framework
- [Vite](https://vitejs.dev/re): Build tool
- [TailwindCSS](https://tailwindcss.com/v): CSS Framework

## How to run

- Clone the repo
- Run `npm install`
- Run `npm run dev`
- Open `http://localhost:5173` in your browser

## My implementation

- I have created a `SelectableTable` component in which I pass data as a prop. This component is responsible for rendering the table and handling the selection of rows.
- Pagination and Filtering is also being handled within the component itself. Both are universal and can be used with any data.
- The actions like edit, and delete are handled withing the colums data that has to be passed to the `SelectableTable` component. This way the component is more generic and can be used with any data.
