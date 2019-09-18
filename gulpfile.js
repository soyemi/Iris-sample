const gulp = require('gulp');

const child_procss = require('child_process');
const fs = require('fs');

gulp.task('build', () => {
    build();
    copyCSS();
    copyHtml();
});

gulp.task('watch', async () => {
    gulp.watch(['./src/**/*.ts'], build);
    gulp.watch('./src/index.html', copyHtml);
    gulp.watch('./src/style.css', copyCSS);
})

function build() {
    child_procss.exec('rollup -c ./rollup.config.js', (err, stdout, stderr) => {
    });
    return gulp.src('./src/main.ts');

}

function copyHtml() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}

function copyCSS() {
    return gulp.src('./src/style.css')
        .pipe(gulp.dest('./dist'));
}