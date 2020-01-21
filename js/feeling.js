class Feeling {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.name;
        this.color;
        this.parentNode;
    }

    render() {
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.name,
            title: this.name,
            color: this.color
        });
    }
}
