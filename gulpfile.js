const gulp = require('gulp');
const child_process = require('child_process');
const fs = require('fs');

const browsersync = require('browser-sync');


gulp.task('build',()=>{
    //mergeShader();
    build();

    copyLibs();
});

gulp.task('watch',()=>{
    //mergeShader();
    build();
    copyLibs();

    gulp.watch('./samples/**/*.ts',null,()=>{
        build();
    });

    gulp.watch('./node_modules/rendering-engine/dist/renderer.js',null,copyLibs);

    // gulp.watch('./res/shaders/**/*.glsl',null,()=>{
    //     mergeShader();
    // });
    browsersync.init({
        server: {
            baseDir: './docs',
            index: "index.html",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        port: 6646,
        files: ['docs/*.js', 'docs/*.html']
    })
})

var onBuild =false;

function build(){
    if(onBuild == true) return;
    onBuild = true;
    console.log('[Compile Script]');
    child_process.exec('rollup -c rollup.config.ts',(error,stdout,stderr)=>{
        if(stdout != null && stdout != '') console.log(stdout);
        if(stderr != null && stderr != '') console.log(stderr);

        onBuild = false;
    });
}

gulp.task('shader',mergeShader)

function copyLibs(){
    fs.copyFileSync('./node_modules/rendering-engine/dist/renderer.js','./docs/renderer.js');
}

function mergeShader(){
    console.log('[Compile Shader]');
    let basepath = './res/shaders/';
    let files =  fs.readdirSync(basepath);
    let sources = {};
    files.forEach(f=>{
        let sta =fs.statSync(basepath + f);
        if(sta.isFile && f.endsWith('.glsl')){
            let fname = f.substr(0,f.length - 5);
            fname = fname.replace('.','_');

            let src =  fs.readFileSync(basepath + f).toString();
            src= src.replace('\n',"\\n");
            sources[fname] =src;
        }
    })
    let includepath = basepath +'includes/';
    let fileIncludes = fs.readdirSync(includepath);
    let includes = {};
    fileIncludes.forEach(f=>{
        let sta = fs.statSync(includepath + f);
        if(sta.isFile && f.endsWith('.inc.glsl')){
            let fname = f.substr(0,f.length - '.inc.glsl'.length);

            fname = fname.toUpperCase();

            let src = fs.readFileSync(includepath + f).toString();
            includes[fname] = src;
        }
    })

    let shadergen = 'export class ShaderGen{ \n';
    for(k in includes){
        shadergen += `\tpublic static readonly ${k}:string = \`${includes[k]}\`;\n`;
    }
    for(k in sources){
        shadergen += `\tpublic static readonly ${k}:string = \`${sources[k]}\`;\n`;
    }
    shadergen += '}'
    fs.writeFileSync('src/shaderfx/ShaderGenerated.ts',shadergen);
}
