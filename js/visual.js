class Visual {
    constructor() {
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        var container = $('#visual')[0];
        var data = {nodes: this.nodes, edges: this.edges};
        var options = {};
        this.network = new vis.Network(container, data, options);

        this.feelings = []
        this.needs = []
        this.appreciations = [];

        this.dataManager = new DataManager();
    }


}
