console.log("Hello, World!");

const server = app.listen(8080, () => {
  console.log(`Server started on PORT: 8080 in ${process.env.NODE_ENV}`);
});