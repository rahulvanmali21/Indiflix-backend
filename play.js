const ffmpeg = require("fluent-ffmpeg");


ffmpeg()
.input("../1.mp4")
.output("output.gif")
.format("gif")
.size('720x?')
.inputOptions([
    '-ss 20',
])
.outputOptions(['-t 5'])
.noAudio()
.on("start",function (cmd) {
    console.log(cmd);
})
.on("progress",function (progress) {
    process.stdout.write("processing " + Math.round(progress.percent) + "%\r");
})
.run();