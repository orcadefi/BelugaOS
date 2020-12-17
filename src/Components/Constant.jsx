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

import * as  Docs from './Window/Docs.jsx';
import * as  Voting from './Window/Voting.jsx';
import * as  Staking from './Window/Staking.jsx';
import * as  Lend from './Window/Lend.jsx';
import * as  Referral from './Window/Referral.jsx';
import * as  Borrow from './Window/Borrow.jsx';
import * as  Roadmap from './Window/Roadmap.jsx';
import * as  Mail from './Window/Mail.jsx';
import * as  Profile from './Window/Profile.jsx';

export const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi eros, ullamcorper a vestibulum at, fringilla quis neque. Mauris id metus ac tortor dapibus consectetur ac eu lectus. Sed at tortor eu nulla pellentesque egestas. Donec pellentesque at nulla et hendrerit. Curabitur sit amet urna eget elit pharetra varius. Nam viverra enim et libero pellentesque bibendum."

export const images = [
    { object: Docsimg, label: "Docs", id: 1, action: 1, divName: "-home" },
    { object: Votingimg, label: "Voting", id: 2, action: 3, divName: "-home" },
    { object: Stakingimg, label: "Staking", id: 3, action: 8, divName: "-home" },
    { object: Lendimg, label: "Lend", id: 4, action: 9, divName: "-home" },
    //{ object: Lendimg, label: "Lend", id: 4, action: function unavailable() { }, divName: "-unavailable" },
    //{ object: Referralimg, label: "Referral", id: 5, action: 15, divName: "-home" },
    { object: Referralimg, label: "Referral", id: 5, action: function unavailable() { }, divName: "-unavailable" },
    { object: Borrowimg, label: "Borrow", id: 6, action: 16, divName: "-home" },
    //{ object: Borrowimg, label: "Borrow", id: 6, action: function unavailable() { }, divName: "-unavailable" },
    { object: Roadmapimg, label: "Roadmap", id: 7, action: 23, divName: "-home" },
    //{ object: Mailimg, label: "Mail", id: 8, action: 24, divName: "-home" },
    { object: Mailimg, label: "Mail", id: 8, action: function unavailable() { }, divName: "-unavailable" },
    { object: Profileimg, label: "Profile", id: 9, action: 25, divName: "-home" },
    //{ object: Profileimg, label: "Profile", id: 9, action: function unavailable() { }, divName: "-unavailable" },
    { object: Orcaimg, label: "Orca", id: 10, action: function orca() { window.open('http://orcadefi.com/', '_blank') }, divName: "-home"}
]

export const windowIDs = {
    1: {label: "Orca Project", id: 1, element: <Docs.WindowDocs/>},
    2: {label: "Read Me", id: 2, element: <Docs.WindowReadMe/>},
    3: {label: "Voting", id: 3, element: <Voting.WindowVoting/>},
    4: {label: "Submit Proposal", id: 4, element: <Voting.WindowSubmitProposal/>},
    5: {label: "Active Proposals", id: 5, element: <Voting.WindowActiveProposals/>},
    6: {label: "Post Proposals", id: 6, element: <Voting.WindowHistoricalProposals/>},
    7: "<Voting.WindowError/>",
    8: {label: "Stake Your BBI", id: 8, element: <Staking.WindowStaking/>},
    9: {label: "Lend", id: 9, element: <Lend.WindowLend/>},
    10: {label: "Projects Looking for Funding", id: 10, element: <Lend.WindowLendLooking/>},
    11: {label: "Active Projects", id: 11, element: <Lend.WindowLendActive/>},
    12: {label: "Previous Loans", id: 12, element: <Lend.WindowLendPrevious/>},
    13: { label: "Stats", id: 13, element: <Lend.WindowLendStats /> },
    14: {label:"User Performing Loan", id:14, element:<Lend.WindowLendUserPerforming/>},
    15: {label:"Referral Program", id:15, element:<Referral.WindowReferral/>},
    16: {label:"Borrow", id:16, element:<Borrow.WindowBorrow/>},
    17: "<Borrow.Window/>",
    18: "<Borrow.Window/>",
    19: "<Borrow.Window/>",
    20: "<Borrow.Window/>",
    21: "<Borrow.Window/>",
    22: "<Borrow.Window/>",
    23: {label:"Roadmap", id:23, element:<Roadmap.WindowRoadmap/>},
    24: {label:"Email", id:24, element:<Mail.WindowMail/>},
    25: {label:"Profile", id:25, element:<Profile.WindowProfile/>},
    26: {label:"Messages", id:26, element:<Profile.WindowMessages/>},
    27: {label:"Verified Identity", id:27, element:<Profile.WindowVerifyIdentity/>},
    28: {label:"Borrow History", id:28, element:<Profile.WindowBorrowHistory/>},
    29: {label:"Lend History", id:29, element:<Profile.WindowLendHistory/>},
    30: "<Profile.Window/>"
};
