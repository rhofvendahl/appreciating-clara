$(document).ready(function() {
    var container = $('#visual')[0];
    var visual = new Visual(container);
    Feeling.generate(visual);
    Need.generate(visual);

    var data = $('#data')[0].innerText;
    var dataArrays = $.csv.toArrays(data).slice(1);
    Appreciation.importData(dataArrays);
    Appreciation.generate(visual);

    // var toggleLog = []
    // setInterval(() => {
    //     var appreciation;
    //     do {
    //         appreciation = manager.appreciations[Math.floor(Math.random() * manager.appreciations.length)];
    //     } while (toggleLog.includes(appreciation));
    //
    //     if (toggleLog.length < 3) {
    //     } else {
    //         toggleLog[0].toggle();
    //         toggleLog.shift();
    //     }
    //     appreciation.toggle();
    //     toggleLog.push(appreciation);
    // }, 5000);

    var prevAppreciation;
    var appreciation;
    setTimeout(() => {
        do {
            appreciation = Appreciation.appreciations[Math.floor(Math.random() * Appreciation.appreciations.length)];
        } while (appreciation.selected);
        if (Appreciation.allTuckedAway()) appreciation.toggle();
        prevAppreciation = appreciation;

        setInterval(() => {
            do {
                appreciation = Appreciation.appreciations[Math.floor(Math.random() * Appreciation.appreciations.length)];
            } while (appreciation.selected);
            if (prevAppreciation.selected) {
                prevAppreciation.toggle()
            }
            if (Appreciation.allTuckedAway()) appreciation.toggle();

            prevAppreciation = appreciation;
        }, 10000);

        setInterval(() => {
            visual.center();
        }, 10000);
    }, 3000);

});
