$(document).ready(function() {
    var visual = new Visual();
    var manager = new Manager(visual);
    manager.generate();
    setTimeout(() => {
        visual.fit();
    }, 5000);
});
