import React from 'react'

export const TableMap = ({ data, delets, name }) => {
    return (
        <tbody>
            <tr><td>English</td>
                <td>Armenian</td>
                <td>Russian</td>
                <td>Delete</td>

            </tr>
            {data.length > 0 ? data.map((e, i) => {
                return <tr key={name + i}>
                    <td>{e.value.en}</td>
                    <td>{e.value.hy}</td>
                    <td>{e.value.ru}</td>
                    <td><button className='button px-4 py-2' onClick={() => delets(e._id, name)} > Delete </button></td>
                </tr>
            }) : <tr><td colSpan={4}>Empty</td></tr>}
        </tbody>
    )
}
