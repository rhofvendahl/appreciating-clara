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
            ['Peace', 'Peace', 'Spiritual Communion'],
            []
        ]
        // this.appreciationObjects = $.csv.toObjects(this.appreciationData);
        this.appreciationArrays = $.csv.toArrays(this.appreciationData).shift();
        console.log(this.appreciationArrays);


        this.feelings = []
        this.needs = []
        this.appreciations = [];
    }

    generateFeelings() {
        for (var string of this.feelingArray) {
            var feeling = new Feeling(
                this.visual,
                this.feelings.length,
                this.visual.nodes.length
            );
            feeling.name = string;
            feeling.color = 'yellow'

            this.feelings += feeling;
            feeling.render();
            console.log(feeling)
        }
    }

    findFeeling(feelingString) {
        for (var feeling of this.feelings) {
            if (feeling.name == feelingString) {
                return feeling;
            }
        }
    }

    generateNeeds() {
        for (var array of this.needArrays) {
            var need = new Need(
                this.visual,
                this.needs.length,
                this.visual.nodes.length
            );
            need.shortName = array[0];
            need.longName = array[1];
            need.category = array[3];
            need.color = 'red';

            this.needs += need;
            need.render()
        }
    }

    generateAppreciations() {
        for (var array of this.appreciationArrays) {
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
                appreciation.feelings += this.findFeeling(feelingString);
            }
            appreciation.needsText = array[5];
            appreciation.needs = []
            for (var i; i < this.needs.length; i++) {
                if (array[i + 6] == 'Met') {
                    appreciation.needs += this.needs[i];
                }
            }
            appreciation.togetherText = array[39];
            appreciation.pastTense = (array[40] == 'Past (I felt)');
            appreciation.collapsed = true;
            appreciation.color = 'blue';

            this.appreciations += appreciation;
            appreciation.render();
        }
    }

    generate() {
        this.generateFeelings();
        this.generateNeeds();
        this.generateAppreciations();
    }
}
