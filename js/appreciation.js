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
        this.parentNode;
        // console.log(this.nodeId);
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
        var frankenstein =  this.pastTense ?
            '<p>When Clara ' + this.actionsText + ', I felt ' + this.feelingsText + ', and my needs for ' + this.needsText + ' was met.</p>' :
            '<p>When Clara ' + this.actionsText + ', I feel ' + this.feelingsText + ', and my needs for ' + this.needsText + ' are met.</p>';
            var frankenstein = frankenstein.replace(/((?:[^ ]* ){17}[^ ]*) /g, '$1</p><p>');
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.label,
            title: frankenstein,
            color: this.color
        });
    }

    showEdges() {
        console.log('showing edges')
        for (var feeling of this.feelings) {
            console.log('feeling', feeling)
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
        console.log('trying to remove', edgesToRemove)
        this.visual.edges.remove(edgesToRemove);
    }

    toggle() {
        console.log('toggling!');
        if (this.selected) {
            console.log('hiding');
            this.hideEdges();
            this.selected = false;
            this.render();
        } else {
            console.log('showing');
            this.showEdges();
            this.selected = true;
            this.render();
        }
        // console.log(this.visual.edges);
    }
}
