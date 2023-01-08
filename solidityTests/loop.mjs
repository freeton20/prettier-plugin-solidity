const glob = require("glob")
const path = require("path")

glob(path.resolve(__dirname, "./**/*.?(t)sol"), {
    cwd: path.resolve(__dirname, "./"),
    realpath: true
}, async (er, files) => {
    for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        await $`npx prettier --write ${files[i]} --plugin ${plugin}`
    }
})
