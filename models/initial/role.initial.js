const Role = require('../role')

module.exports = function Initial() {
  // Use promises instead of callbacks
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        // Use create() instead of save()
        Role.create({ name: 'user' })
          .then(() => {
            console.log("added 'user' to roles collection")
          })
          .catch((err) => {
            console.error('error', err)
          })
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
