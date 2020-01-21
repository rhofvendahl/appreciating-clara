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
        this.collapsed = true;
        this.color;
    }


    // UPDATE PARSETREE'S VISJS NETWORK
    render() {
        if (this.dep != 'ROOT') {
            this.hidden = this.head.collapsed || this.head.hidden;
        }

        this.visual.nodes.update({
            id: this.id,
            label: this.collapsed ? this.collapsedText : this.text,
            title: tagDescriptions[this.tag],
            color: this.color,
            hidden: this.hidden
        });
        this.visual.edges.update({
            id: this.id,
            from: this.headId,
            to: this.id,
            label: this.dep,
            title: depDescriptions[this.dep],
            arrows: 'to'
        });
    }

    render() {
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.label,
            title: this.pastTense ?
                'When Clara ' + this.actionsText + ', I felt ' + this.feelingsText + ', and my needs for ' + this.needsText + ' was met.' :
                'When Clara ' + this.actionsText + ', I feel ' + this.feelingsText + ', and my needs for ' + this.needsText + ' are met.',
            color: this.color
        });
    }
}
