import * as React from 'react';
import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DropDown from './Dropdown';
import DropDown from '../Dropdown'



const DropdownTeamMember = () => {
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);

    const teamMembers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alex Johnson' },
        // more team members...
    ];

    const handleTeamMemberChange = (event, value) => {
        setSelectedTeamMember(value);
    };

    const handleSubmit = () => {
        alert(`Selected Team Member: ${selectedTeamMember ? selectedTeamMember.name : 'None'}`);
    };

    return (
        <>
            <div className="app-container" style={{ width: '500px' }}>
                <DropDown
                    id="team-member-autocomplete"
                    options={teamMembers}
                    label="Select team member"
                    value={selectedTeamMember}
                    onChange={handleTeamMemberChange}
                />
            </div>
        </>
    );

}

export default DropdownTeamMember