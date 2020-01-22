class Visual {
    constructor(container) {
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        var container = container;
        var data = {nodes: this.nodes, edges: this.edges};
        var options = {
            physics: {
                timestep: .5
            }
        };
        this.network = new vis.Network(container, data, options);

        var self = this;
        this.network.on('click', function(properties) {
            if (properties.nodes.length > 0) {
                var nodeId = properties.nodes[0];
                for (var appreciation of Appreciation.appreciations) {
                    if (appreciation.nodeId == nodeId) {
                        appreciation.toggle();
                        break
                    }
                }
            }
        });
    }

    center() {
        this.network.moveTo({
            position: {
                x: 0,
                y: 0
            },
            scale: 1,
            animation: {
                duration:3000,
                easingFunction: 'easeInOutQuart'
            }
        });
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
