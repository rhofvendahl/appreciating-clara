class Feeling {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.name;
        this.color;
        this.parentNodeId;
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
