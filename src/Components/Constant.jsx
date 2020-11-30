import Borrowimg from "../Images/Borrow.svg";
import Docsimg from "../Images/Docs.svg";
import Lendimg from "../Images/Lend.svg";
import Mailimg from "../Images/Mail.svg";
import Profileimg from "../Images/Profile.svg";
import Roadmapimg from "../Images/Roadmap.svg";
import Referralimg from "../Images/Referral.svg";
import Stakingimg from "../Images/Staking.svg";
import Votingimg from "../Images/Voting.svg";
import Orcaimg from "../Images/Orca.svg"

import { Window } from './Window/Main.jsx'
import * as  Docs from './Window/Docs.jsx';
import * as  Voting from './Window/Voting.jsx';
import * as  Staking from './Window/Staking.jsx';
import * as  Lend from './Window/Lend.jsx';
import * as  Referral from './Window/Referral.jsx';
import * as  Borrow from './Window/Borrow.jsx';
import * as  Roadmap from './Window/Roadmap.jsx';
import * as  Mail from './Window/Mail.jsx';
import * as  Profile from './Window/Profile.jsx';

import createWindow from "../Functions/createWindow.ts";

export const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi eros, ullamcorper a vestibulum at, fringilla quis neque. Mauris id metus ac tortor dapibus consectetur ac eu lectus. Sed at tortor eu nulla pellentesque egestas. Donec pellentesque at nulla et hendrerit. Curabitur sit amet urna eget elit pharetra varius. Nam viverra enim et libero pellentesque bibendum."

export const images = [
    { object: Docsimg, label: "Docs", id: 1, action: 1 },
    { object: Votingimg, label: "Voting", id: 2, action: 3 },
    { object: Stakingimg, label: "Staking", id: 3, action: 8 },
    { object: Lendimg, label: "Lend", id: 4, action: 9 },
    { object: Referralimg, label: "Referral", id: 5, action: 15 },
    { object: Borrowimg, label: "Borrow", id: 6, action: 16 },
    { object: Roadmapimg, label: "Roadmap", id: 7, action: 23 },
    { object: Mailimg, label: "Mail", id: 8, action: 24 },
    { object: Profileimg, label: "Profile", id: 9, action: 25 },
    { object: Orcaimg, label: "Orca", id: 10, top_label: "Orca", action: function orca() { window.open('http://orcadefi.com/', '_blank') }}
]

export const windowIDs = {
    1: <Window windowZ={40} label="Beluga Project" id={1} widget={<Docs.WindowDocs/>}/>,
    2: <Window windowZ={40} label="Read Me" id={2} widget={<Docs.WindowReadMe/>}/>,
    3: <Window windowZ={40} label="Voting" id={3} widget={<Voting.WindowVoting/>}/>,
    4: <Window windowZ={40} label="Submit Proposal" id={4} widget={<Voting.WindowSubmitProposal/>}/>,
    5: <Window windowZ={40} label="Active Proposals" id={5} widget={<Voting.WindowActiveProposals/>}/>,
    6: <Window windowZ={40} label="Post Proposals" id={6} widget={<Voting.WindowHistoricalProposals/>}/>,
    7: "<Voting.WindowError/>",
    8: <Window windowZ={40} label="Stake Your BBI" id={8} widget={<Staking.WindowStaking/>}/>,
    9: <Window windowZ={40} label="Lend" id={9} widget={<Lend.WindowLend/>}/>,
    10: "<Lend.Window/>",
    11: "<Lend.Window/>",
    12: "<Lend.Window/>",
    13: "<Lend.Window/>",
    14: "<Lend.Window/>",
    15: <Window windowZ={40} label="Referral Program" id={15} widget={<Referral.WindowReferral/>}/>,
    16: <Window windowZ={40} label="Borrow" id={16} widget={<Borrow.WindowBorrow/>}/>,
    17: "<Borrow.Window/>",
    18: "<Borrow.Window/>",
    19: "<Borrow.Window/>",
    20: "<Borrow.Window/>",
    21: "<Borrow.Window/>",
    22: "<Borrow.Window/>",
    23: <Window windowZ={40} label="---" id={23} widget={<Roadmap.WindowRoadmap/>}/>,
    24: <Window windowZ={40} label="Email" id={24} widget={<Mail.WindowMail/>}/>,
    25: <Window windowZ={40} label="Profile" id={25} widget={<Profile.WindowProfile/>}/>,
    26: "<Profile.Window/>",
    27: "<Profile.Window/>",
    28: "<Profile.Window/>",
    29: "<Profile.Window/>",
    30: "<Profile.Window/>",
};
