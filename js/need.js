class Need {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.shortName;
        this.longName;
        this.category;
        this.color;
    }

    render() {
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.shortName,
            title: '(' + this.category + ') ' + this.longName,
            color: this.color
        });
    }
}
