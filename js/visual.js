class Visual {
    constructor() {
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        var container = $('#visual')[0];
        var data = {nodes: this.nodes, edges: this.edges};
        var options = {};
        this.network = new vis.Network(container, data, options);
    }

    fit() {
        console.log(this.nodes);
        var fitOptions = {
            nodes: this.nodes.getIds()
        };
        this.network.fit(fitOptions);
        console.log('DONE');
    };
}
