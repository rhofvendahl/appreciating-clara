class Appreciation {
    constructor(visual, id) {
        this.visual = visual;
        this.id = id;
    }

    this.title
    this.actions_text
    this.feelings_text
    this.feelings = []
    this.needs_text
    this.needs = []
    this.together_text
    this.past_tense
    this.collapsed = true;

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
}
