class Manager {
    constructor(visual) {
        this.visual = visual
        this.appreciationData = $('#data')[0].innerText;

        this.feelingArray = [
            'Amazed',
            'Confident',
            'Energetic',
            'Glad',
            'Inspired',
            'Joyous',
            'Optimistic',
            'Relieved',
            'Surprised',
            'Touched',
            'Comfortable',
            'Eager',
            'Fulfilled',
            'Hopeful',
            'Intrigued',
            'Moved',
            'Proud',
            'Stimulated',
            'Thankful',
            'Trustful'
        ];
        this.needArrays = [
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
            ['Acceptance', 'Acceptance', 'Interdependence'],
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
        ]

        this.needCategoryArray = [
            'Autonomy',
            'Celebration',
            'Integrity',
            'Interdependence',
            'Physical Nurturance',
            'Play',
            'Spiritual Communion'
        ]

        // this.appreciationObjects = $.csv.toObjects(this.appreciationData);
        this.appreciationArrays = $.csv.toArrays(this.appreciationData);
        this.appreciationArrays.shift();
        console.log(this.appreciationArrays);


        this.feelings = []
        this.needs = []
        this.appreciations = [];

        var self = this;
        this.visual.network.on('click', function(properties) {
            if (properties.nodes.length > 0) {
                var nodeId = properties.nodes[0];
                // console.log(nodeId, self.feelings.length, self.needs.length, self.appreciations.length);
                for (var appreciation of self.appreciations) {
                    // console.log(appreciation.nodeId);
                    if (appreciation.nodeId == nodeId) {
                        // console.log('booya');
                        appreciation.toggle();
                        break
                    }
                }
                // console.log('ah well');
            }
        });
    }

    generateFeelings() {
        var centerNodeId = this.visual.nodes.length;
        this.visual.nodes.update({
            id: centerNodeId,
            label: 'FEELINGS',
            color: 'lightyellow'
        });

        for (var string of this.feelingArray) {
            var feeling = new Feeling(
                this.visual,
                this.feelings.length,
                this.visual.nodes.length
            );
            feeling.name = string;
            feeling.color = 'lightyellow'
            feeling.parentNodeId = centerNodeId;

            this.feelings.push(feeling);
            // console.log(feeling);
            feeling.render();
        }
    }

    getFeelingFromName(feelingString) {
        for (var feeling of this.feelings) {
            if (feeling.name == feelingString) {
                return feeling;
            }
        }
    }

    generateNeeds() {
        var centerNodeId = this.visual.nodes.length;
        this.visual.nodes.update({
            id: centerNodeId,
            label: 'NEEDS',
            color: 'pink'
        });

        var categoryNodeIds = {};
        for (var category of this.needCategoryArray) {
            categoryNodeIds[category] = this.visual.nodes.length;
            var id = categoryNodeIds[category];
            this.visual.nodes.update({
                id: id,
                label: category,
                color: 'pink'
            })

            this.visual.edges.update({
                id: id + '-' + centerNodeId,
                from: id,
                to: centerNodeId,
                color: {color: 'red'}
            });
        }


        for (var array of this.needArrays) {
            var need = new Need(
                this.visual,
                this.needs.length,
                this.visual.nodes.length
            );
            need.shortName = array[0];
            need.longName = array[1];
            need.category = array[2];
            need.color = 'pink';
            need.parentNodeId = categoryNodeIds[need.category];

            this.needs.push(need);
            // console.log(need);
            need.render()
        }
    }

    generateAppreciations() {
        var centerNodeId = this.visual.nodes.length;
        this.visual.nodes.update({
            id: centerNodeId,
            label: 'APPRECIATIONS\n(click them!)',
            color: 'lightblue'
        });

        for (var array of this.appreciationArrays) {
            // console.log('generating appreciation', this.appreciations[0], this.appreciations.length);
            var appreciation = new Appreciation(
                this.visual,
                this.appreciations.length,
                this.visual.nodes.length
            );
            appreciation.timestamp = array[0];
            appreciation.label = array[1];
            appreciation.actionsText = array[2];
            appreciation.feelingsText = array[3];
            appreciation.feelings = []
            var feelingStrings = array[4].split(', ');
            for (var feelingString of feelingStrings) {
                appreciation.feelings.push(this.getFeelingFromName(feelingString));
            }
            appreciation.needsText = array[5];
            appreciation.needs = []
            for (var i = 0; i < this.needs.length; i++) {
                if (array[i + 6] == 'Met') {
                    appreciation.needs.push(this.needs[i]);
                }
            }
            appreciation.togetherText = array[39];
            appreciation.pastTense = (array[40] == 'Past (I felt)');
            appreciation.selected = false;
            appreciation.color = 'lightblue';
            appreciation.parentNodeId = centerNodeId;

            this.appreciations.push(appreciation);
            // console.log(appreciation)
            appreciation.render();
            // console.log('generating appreciation', this.appreciations.length);
        }

        console.log('appreciations', this.appreciations.length);
    }

    generate() {
        this.generateFeelings();
        this.generateNeeds();
        this.generateAppreciations();
    }
}
