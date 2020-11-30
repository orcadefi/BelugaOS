import React from 'react';
import Icon from '../Icon.jsx';

import GitHubimg from "../../Images/Docs/GitHub.svg";
import ReadMeimg from "../../Images/Docs/ReadMe.svg";

export class WindowDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
        this.githubFunction = this.githubFunction.bind(this);
    }

    static getLabel = () => {
        return "Beluga Project"
    }

    static getID = () => {
        return 1;
    }

    githubFunction() {
        window.open('https://github.com/orcadefi/BelugaOS', '_blank');
    }

    render() {
        let DocsData = [
            { object: GitHubimg, label: "Github", id: 11, func: this.githubFunction },
            { object: ReadMeimg, label: "Read Me", id: 12 }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(2, 100px)" }}>
                {DocsData.map((data) =>
                    <Icon divName="-window" function={data.func} key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id} top_label={data.label} />
                )}
            </div>
        )
    }
}

export class WindowReadMe extends React.Component {
    render() {
        return (
            <div className="window">
                <label className="text heading1"> Read Me</label>
                <br />
                <p className="text heading2" style={{ textAlign: "justify", textJustify: "inter-word" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mauris ullamcorper, convallis sapien ut, eleifend elit. Vestibulum dignissim elementum leo in tincidunt. Suspendisse viverra cursus feugiat. Sed sagittis pretium ipsum. Ut commodo porta purus sit amet lobortis. Ut euismod, mauris in rutrum fringilla, enim sem molestie mauris, iaculis rhoncus quam nibh id ex. Sed auctor est nisi, sed condimentum ligula aliquam at. </p>
            </div>
        )
    }
}