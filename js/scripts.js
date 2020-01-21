$(document).ready(function() {
    var visual = new Visual();
    var manager = new Manager(visual);
    manager.generate();


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
    setTimeout(() => {
        do {
            prevAppreciation = manager.appreciations[Math.floor(Math.random() * manager.appreciations.length)];
        } while (prevAppreciation.selected);
        if (prevApplication.selected) {
            prevAppreciation.toggle()
        }
    }, 3000);

    setTimeout(() => {
        setInterval(() => {
            visual.network.moveTo({
                position: {
                    x: 0,
                    y: 0
                },
                scale: 1,
                animation: {
                    duration:3000,
                    easingFunction: 'easeInOutQuart'
                }
            })
        }, 7000);

        setInterval(() => {
            var appreciation;
            do {
                appreciation = manager.appreciations[Math.floor(Math.random() * manager.appreciations.length)];
            } while (appreciation.selected);

            if (prevAppreciation.selected) {
                prevAppreciation.toggle()
            }
            appreciation.toggle();
            prevAppreciation = appreciation;
        }, 7000);
    }, 10000);
});
