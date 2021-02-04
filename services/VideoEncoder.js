const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const fs = require('fs');
const {
    createDir
} = require("../utility/Storage");
const uniqid = require("uniqid");

const EventEmitter = require('events');


const sizes = [
    [480, 700],
    // [720, 2500],
    // [1080, 4000],
];
const fallback = [480, 400];



class VideoEncoder extends EventEmitter {

    constructor(input = null, targetdir = null) {
        super();
        this.input = input;
        this.targetdir = targetdir ? targetdir : path.join("upload_path", uniqid());
        this.name = uniqid();
        this.setFfmpeg();
    }
    setInput(input) {
        this.input = input;
        return this;
    }
    setTargetdir(targetdir) {
        createDir(targetdir);
        this.targetdir = targetdir;
        return this;
    }
    setName(name) {
        this.name;
        this.dash_path = path.join(this.targetdir, `${name}.mpd`);
        this.fallback_path = path.join(this.targetdir, `${name}.mp4`);
        this.gif_path = path.join(this.targetdir, `${name}.gif`);
        return this;
    }
    setFfmpeg() {
        if (os.platform() == 'win32') {
            let binarypath = path.resolve('c:/ffmpeg/bin/');
            let FfmpegPath = path.join(binarypath, 'ffmpeg.exe');
            try {
                let FfmpegPathInfo = fs.statSync(FfmpegPath);
            } catch (err) {
                throw err;
            }
            ffmpeg.setFfmpegPath(FfmpegPath);
            ffmpeg.setFfprobePath(path.join(binarypath, 'ffprobe.exe'));
        }
    }
    init() {
        this.proc = ffmpeg({
            source: this.input,
            cwd: this.targetdir
        });
        this.proc
            .output(this.dash_path)
            .format('dash')
            .videoCodec('libx264')
            .audioCodec('aac')
            .audioChannels(2)
            .audioFrequency(44100)
            .outputOptions([
                '-preset veryfast',
                '-keyint_min 60',
                '-g 60',
                '-sc_threshold 0',
                '-profile:v main',
                '-use_template 1',
                '-use_timeline 1',
                '-b_strategy 0',
                '-bf 1',
                '-map 0:a',
                '-b:a 128k',
            ]);


        for (let size of sizes) {
            let index = sizes.indexOf(size);

            this.proc
                .outputOptions([
                    `-filter_complex [0]format=pix_fmts=yuv420p[temp${index}];[temp${index}]scale=-2:${size[0]}[A${index}]`,
                    `-map [A${index}]:v`,
                    `-b:v:${index} ${size[1]}k`,
                ]);
        }



        // Fallback version
        this.proc
            .output(this.fallback_path)
            .format('mp4')
            .videoCodec('libx264')
            .videoBitrate(fallback[1])
            .size(`?x${fallback[0]}`)
            .audioCodec('aac')
            .audioChannels(2)
            .audioFrequency(44100)
            .audioBitrate(128)
            .outputOptions([
                '-preset veryfast',
                '-movflags +faststart',
                '-keyint_min 60',
                '-refs 5',
                '-g 60',
                '-pix_fmt yuv420p',
                '-sc_threshold 0',
                '-profile:v main',
            ]);
        this.proc
            .output(this.gif_path)
            .format("gif")
            .size('854x?')
            .inputOptions([
                '-ss 10',
            ])
            .outputOptions(['-t 5'])
            .noAudio()


        this.proc
            .on('start', (commandLine)=>{
                this.emit("start", commandLine);
            })
            .on('progress', (progress)=>{
                this.emit("progress", progress);
            })
            .on('end', () => {
                this.emit("end", {
                    dash_path: this.dash_path,
                    fallback_path: this.fallback_path,
                    gif_path: this.gif_path
                });
            })
            .on('error', function (err) {
                this.emit("error", err)
            });
        return this;
    }
    execute() {
        this.proc.run();

    }
}



// version 1

function videoEncoder({
    input,
    targetdir
}, job, done) {

    const sizes = [
        [360, 350],
        [480, 700],
        [720, 2500],
        [1080, 4000],
    ];
    const fallback = [480, 400];
    let name = path.basename(input, path.extname(input));
    createDir(targetdir);

    // ffmpeg init
    let proc = ffmpeg({
        source: input,
        cwd: targetdir
    });

    let dash_path = path.join(targetdir, `${name}.mpd`);
    let fallback_path = path.join(targetdir, `${name}.mp4`);
    let gif_path = path.join(targetdir, `${name}.gif`);

    proc
        .output(dash_path)
        .format('dash')
        .videoCodec('libx264')
        .audioCodec('aac')
        .audioChannels(2)
        .audioFrequency(44100)
        .outputOptions([
            '-preset veryfast',
            '-keyint_min 60',
            '-g 60',
            '-sc_threshold 0',
            '-profile:v main',
            '-use_template 1',
            '-use_timeline 1',
            '-b_strategy 0',
            '-bf 1',
            '-map 0:a',
            '-b:a 128k',
        ]);


    for (let size of sizes) {
        let index = sizes.indexOf(size);

        proc
            .outputOptions([
                `-filter_complex [0]format=pix_fmts=yuv420p[temp${index}];[temp${index}]scale=-2:${size[0]}[A${index}]`,
                `-map [A${index}]:v`,
                `-b:v:${index} ${size[1]}k`,
            ]);
    }
    // Fallback version
    proc
        .output(fallback_path)
        .format('mp4')
        .videoCodec('libx264')
        .videoBitrate(fallback[1])
        .size(`?x${fallback[0]}`)
        .audioCodec('aac')
        .audioChannels(2)
        .audioFrequency(44100)
        .audioBitrate(128)
        .outputOptions([
            '-preset veryfast',
            '-movflags +faststart',
            '-keyint_min 60',
            '-refs 5',
            '-g 60',
            '-pix_fmt yuv420p',
            '-sc_threshold 0',
            '-profile:v main',
        ]);

    // gif for preview
    proc
        .output(gif_path)
        .format("gif")
        .size('480x?')
        .inputOptions([
            '-ss 10',
        ])
        .outputOptions(['-t 5'])
        .noAudio()
    proc.on('start', function (commandLine) {

        fs.appendFileSync("dash.txt", commandLine);
    });

    proc.on('progress', function (progress) {
            process.stdout.write("processing " + Math.round(progress.percent) + "%\r");
            job.progress(Math.round(progress.percent));
        })
        .on('end', function () {
            done({
                dash_path,
                fallback_path
            });
        })
        .on('error', function (err) {
            console.log('error', err);
        });
    return proc.run();

}




module.exports = VideoEncoder;