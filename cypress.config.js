const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: "https://www.indiedb.com/",
    env: {
      invalidEmail: 'test@gmail.com',
      email: 'qtesting000c@gmail.com',
      password: 'valid11Password',
      username: 'RandomUser',
      NODE_OPTIONS: "--unhandled-rejections=strict"
    },
    chromeWebSecurity: false
  }
})
