import React from 'react'
import faker from 'faker'


export const Donantes = () => {
    const data = new Array(10000).fill().map((value, index) => ({ id: index, title: faker.lorem.words(5), body: faker.lorem.sentences(4) }))
    return (
        <div className='donantes'>
            {data.map(((item) => (
                <div key={item.id} className="post">
                    <h3>{item.title} - {item.id}</h3>
                    <p>{item.body}</p>
                </div>
            )))}

        </div>
    )
}
