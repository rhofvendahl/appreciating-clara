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
    var appreciation;
    setTimeout(() => {
        console.log('Timeout!');
        do {
            appreciation = manager.appreciations[Math.floor(Math.random() * manager.appreciations.length)];
        } while (appreciation.selected);
        appreciation.toggle();
        prevAppreciation = appreciation;

        setInterval(() => {
            do {
                appreciation = manager.appreciations[Math.floor(Math.random() * manager.appreciations.length)];
            } while (appreciation.selected);
            appreciation.toggle();

            if (prevAppreciation.selected) {
                prevAppreciation.toggle()
            }
            prevAppreciation = appreciation;
        }, 7000);

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
    }, 3000);

});
