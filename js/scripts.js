$(document).ready(function() {
    var visual = new Visual();
    var manager = new Manager(visual);
    manager.generate();
    console.log(visual.nodes);
    setTimeout(() => {
        visual.fit();
    }, 2000);
});
