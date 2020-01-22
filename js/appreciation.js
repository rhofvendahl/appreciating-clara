class Appreciation {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.label;
        this.actionsText;
        this.feelingsText;
        this.feelings = [];
        this.needsText;
        this.needs = [];
        this.togetherText;
        this.pastTense;
        this.selected;
        this.color;
        this.parentNodeId;
    }

    static importData(dataArrays) {
        this.dataArrays = dataArrays;
    }

    // static data = $('#data')[0].innerText;
    // static dataArrays = $.csv.toArrays(this.data).slice(1);

    static appreciations = [];

    static generate(visual) {
        var centerNodeId = visual.nodes.length;
        visual.nodes.update({
            id: centerNodeId,
            label: 'APPRECIATIONS\n( click them! )',
            color: 'lightblue'
        });

        for (var array of this.dataArrays) {
            var appreciation = new Appreciation(
                visual,
                this.appreciations.length,
                visual.nodes.length
            );
            appreciation.timestamp = array[0];
            appreciation.label = array[1];
            appreciation.actionsText = array[2];
            appreciation.feelingsText = array[3];
            appreciation.feelings = []
            var feelingStrings = array[4].split(', ');
            for (var feelingString of feelingStrings) {
                appreciation.feelings.push(Feeling.getFeelingFromName(feelingString));
            }
            appreciation.needsText = (array[5] == '') ? '[404 ERROO0R NOT FOUND ERROR]' : array[5];
            appreciation.needs = []
            for (var i = 0; i < Need.needs.length; i++) {
                if (array[i + 6] == 'Met') {
                    appreciation.needs.push(Need.needs[i]);
                }
            }
            appreciation.togetherText = array[39];
            appreciation.pastTense = (array[40] == 'Past (I felt)');
            appreciation.selected = false;
            appreciation.color = 'lightblue';
            appreciation.parentNodeId = centerNodeId;

            this.appreciations.push(appreciation);
            appreciation.render();
        }

    }

    static allTuckedAway() {
        return this.appreciations.every((appreciation) => !appreciation.selected);
    }

    render() {
        var frankenstein =  this.pastTense ?
            'When Clara ' + this.actionsText + ', I felt ' + this.feelingsText + ', and my needs for ' + this.needsText + ' was met.' :
            'When Clara ' + this.actionsText + ', I feel ' + this.feelingsText + ', and my needs for ' + this.needsText + ' are met.';
            var frankenstein = frankenstein.replace(/((?:[^ ]* ){17}[^ ]*) /g, '$1\n');
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.selected ? frankenstein : this.label,
            title: frankenstein,
            color: this.color
        });

        this.visual.edges.update({
            id: this.nodeId + '-' + this.parentNodeId,
            from: this.nodeId,
            to: this.parentNodeId,
            color: {color: 'blue'}
        });
    }

    showEdges() {
        // console.log('showing edges')
        for (var feeling of this.feelings) {
            this.visual.edges.update({
                id: this.nodeId + '-' + feeling.nodeId,
                from: this.nodeId,
                to: feeling.nodeId,
                color: {color: 'black'}
            });
        }
        for (var need of this.needs) {
            this.visual.edges.update({
                id: this.nodeId + '-' + need.nodeId,
                from: this.nodeId,
                to: need.nodeId,
                color: {color: 'black'}
            });
        }

    }

    hideEdges() {
        var edgesToRemove = [];
        for (var feeling of this.feelings) {
            edgesToRemove.push(this.nodeId + '-' + feeling.nodeId);
        }
        for (var need of this.needs) {
            edgesToRemove.push(this.nodeId + '-' + need.nodeId);
        }
        // console.log('trying to remove', edgesToRemove)
        this.visual.edges.remove(edgesToRemove);
    }

    toggle() {
        // console.log('toggling!', this.nodeId);
        if (this.selected) {
            // console.log('hiding');
            this.hideEdges();
            this.selected = false;
            this.render();
        } else {
            // console.log('showing');
            this.showEdges();
            this.selected = true;
            this.render();
        }
    }

}
