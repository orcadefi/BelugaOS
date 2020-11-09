import React from 'react';
import "../Casscade style-sheet/Components.css"

import Borrowimg from "../Images/Borrow.svg"
import Docsimg from "../Images/Docs.svg"
import Lendimg from "../Images/Lend.svg"
import Mailimg from "../Images/Mail.svg"
import Profileimg from "../Images/Profile.svg"
import Roadmapimg from "../Images/Roadmap.svg"
import Referralimg from "../Images/Referral.svg"
import Stakingimg from "../Images/Staking.svg"
import Votingimg from "../Images/Voting.svg"

export let images = [
    { object: Docsimg, label: "Docs", id:1 },
    { object: Votingimg, label: "Voting", id:2 },
    { object: Stakingimg, label: "Staking", id:3 },
    { object: Lendimg, label: "Lend", id:4 },
    { object: Referralimg, label: "Referral", id:5 },
    { object: Borrowimg, label: "Borrow", id:6 },
    { object: Roadmapimg, label: "Roadmap", id:7 },
    { object: Mailimg, label: "Mail", id:8 },
    { object: Profileimg, label: "Profile", id:9 }
]

export default class Window extends React.Component {
    render() {
        return (
            <div class="window-div">
                Hola
            </div>
        );
    }
}
