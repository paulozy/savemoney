import { app } from "./app"

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)

  //i need log the app routes
  // console.log(app._router.stack)
})