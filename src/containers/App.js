import React, { useEffect, useState } from 'react';
import Brand from '../components/brand/Brand';
import SearchBox from '../components/searchbox/SearchBox';
import Scrollable from '../components/scrollable/Scrollable';
import Loader from '../components/loader/Loader';
import CardGrid from '../components/cardGrid/CardGrid';
import ContactInfo from '../components/contactInfo/ContactInfo';

const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const fetchUsers = async () => {
            try{
                const response = await fetch('https://dummyjson.com/users', { signal });
                const result = await response.json();
                const sortedUsers = result.users.sort((a,b) => 
                    (a.firstName < b.firstName) ? -1 : 
                    (a.firstName > b.firstName) ? 1 : 0
                );
                setRobots(sortedUsers.map(user => {
                    const { 
                        id, 
                        firstName, 
                        maidenName, 
                        lastName, 
                        gender,
                        age,
                        email 
                    } = user;
                    return {
                        id: id,
                        name: 
                        `${firstName} ${maidenName} ${lastName}`,
                        age: age,
                        gender: gender,
                        email: email
                    }
                }))
            } catch (err) {
                console.log(`Oops ${err}`);
            }
        }

        fetchUsers();

        return () => {
            controller.abort();
        }
    })

    const onSearchChange = (inputEvent) => {
        setSearchField(inputEvent.target.value);
    }

    const filteredRobots = robots.filter(
        robot => robot.name.toLowerCase().includes(
            searchField.toLowerCase()
        )
    );

    return (
        <>
            <header>
                <Brand />
                <SearchBox searchChange={onSearchChange} />
            </header>
            <main>
                {
                    robots.length > 0 ?
                    <Scrollable>
                        <CardGrid robots={filteredRobots} />
                    </Scrollable> : 
                    <Loader />
                }
            </main>
            <footer>
                <ContactInfo />
            </footer>
        </>
    )
}

export default App