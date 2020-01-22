class Feeling {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.name;
        this.color;
        this.parentNodeId;
    }

    static feelings = [];

    static feelingStrings = [
        'Amazed',
        'Confident',
        'Energetic',
        'Glad',
        'Inspired',
        'Joyous',
        'Optimistic',
        'Relieved',
        'Surprised',
        'Touched',
        'Comfortable',
        'Eager',
        'Fulfilled',
        'Hopeful',
        'Intrigued',
        'Moved',
        'Proud',
        'Stimulated',
        'Thankful',
        'Trustful'
    ];

    static generate(visual) {
        var centerNodeId = visual.nodes.length;
        visual.nodes.update({
            id: centerNodeId,
            label: 'FEELINGS',
            color: 'lightyellow'
        });

        for (var string of this.feelingStrings) {
            var feeling = new Feeling(
                visual,
                this.feelings.length,
                visual.nodes.length
            );
            feeling.name = string;
            feeling.color = 'lightyellow'
            feeling.parentNodeId = centerNodeId;

            this.feelings.push(feeling);
            feeling.render();
        }
    }

    static getFeelingFromName(feelingString) {
        for (var feeling of this.feelings) {
            // terrible hack because I forgot to capitalize "surprised" in survey
            if (feeling.name.toLowerCase() == feelingString.toLowerCase()) {
                return feeling;
            }
        }
    }

    render() {
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.name,
            title: this.name,
            color: this.color
        });

        this.visual.edges.update({
            id: this.nodeId + '-' + this.parentNodeId,
            from: this.nodeId,
            to: this.parentNodeId,
            color: {color: 'orange'}
        });
    }
}
