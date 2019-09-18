import('iris-gl').then(async iris=>{
    var t = await import('./sample');
    t.default(new iris.GameObject());
});

