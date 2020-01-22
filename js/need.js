class Need {
    constructor(visual, id, nodeId) {
        this.visual = visual;
        this.id = id;
        this.nodeId = nodeId;
        this.shortName;
        this.longName;
        this.category;
        this.color;
        this.parentNodeId;
    }

    static needs = [];

    static dataArrays = [
        ['Purpose', 'Choosing dreams/goals/values', 'Autonomy'],
        ['Actualization', 'Choosing pans for fulfilling one\'s dreams, goals, values', 'Autonomy'],
        ['Accomplishment', 'Celebrate the creation of life and dreams fulfilled', 'Celebration'],
        ['Mourning', 'Celebrate losses: loved ones, dreams, etc.', 'Celebration'],
        ['Authenticity', 'Authenticity', 'Integrity'],
        ['Meaning', 'Meaning', 'Integrity'],
        ['Creativity', 'Creativity', 'Integrity'],
        ['Self-worth', 'Self-worth', 'Integrity'],
        ['Acceptance', 'Acceptance', 'Interdependence'],
        ['Closeness', 'Closeness', 'Interdependence'],
        ['Consideration', 'Consideration', 'Interdependence'],
        ['Enrichment', 'Contribute to the enrichment of life', 'Interdependence'],
        ['Emotional Safety', 'Emotional Safety', 'Interdependence'],
        ['Appreciation', 'Appreciation', 'Interdependence'],
        ['Communication', 'Communication', 'Interdependence'],
        ['Empathy', 'Empathy', 'Interdependence'],
        ['Air', 'Air', 'Physical Nurturance'],
        ['Movement, exercise', 'Movement, exercise', 'Physical Nurturance'],
        ['Protection', 'Protection from life-threatening forms of life: viruses, bacteria, insects, predatory animals', 'Physical Nurturance'],
        ['Rest', 'Rest', 'Physical Nurturance'],
        ['Shelter', 'Shelter', 'Physical Nurturance'],
        ['Food', 'Food', 'Physical Nurturance'],
        ['Sex', 'Sexual expression', 'Physical Nurturance'],
        ['Touch', 'Touch', 'Physical Nurturance'],
        ['Water', 'Water', 'Physical Nurturance'],
        ['Fun', 'Fun', 'Play'],
        ['Laughter', 'Laughter', 'Play'],
        ['Beauty', 'Beauty', 'Spiritual Communion'],
        ['Harmony', 'Harmony', 'Spiritual Communion'],
        ['Inspiration', 'Inspiration', 'Spiritual Communion'],
        ['Order', 'Order', 'Spiritual Communion'],
        ['Peace', 'Peace', 'Spiritual Communion']
    ];

    static categoryStrings = [
        'Autonomy',
        'Celebration',
        'Integrity',
        'Interdependence',
        'Physical Nurturance',
        'Play',
        'Spiritual Communion'
    ];

    static generate(visual) {
        var centerNodeId = visual.nodes.length;
        visual.nodes.update({
            id: centerNodeId,
            label: 'NEEDS',
            color: 'pink'
        });

        var categoryNodeIds = {};
        for (var category of this.categoryStrings) {
            categoryNodeIds[category] = visual.nodes.length;
            var id = categoryNodeIds[category];
            visual.nodes.update({
                id: id,
                label: category,
                color: 'pink'
            })

            visual.edges.update({
                id: id + '-' + centerNodeId,
                from: id,
                to: centerNodeId,
                color: {color: 'red'}
            });
        }


        for (var array of this.dataArrays) {
            var need = new Need(
                visual,
                this.needs.length,
                visual.nodes.length
            );
            need.shortName = array[0];
            need.longName = array[1];
            need.category = array[2];
            need.color = 'pink';
            need.parentNodeId = categoryNodeIds[need.category];

            this.needs.push(need);
            need.render()
        }
    }

    render() {
        this.visual.nodes.update({
            id: this.nodeId,
            label: this.shortName,
            title: '(' + this.category + ') ' + this.longName,
            color: this.color
        });

        this.visual.edges.update({
            id: this.nodeId + '-' + this.parentNodeId,
            from: this.nodeId,
            to: this.parentNodeId,
            color: {color: 'red'}
        });
    }
}
