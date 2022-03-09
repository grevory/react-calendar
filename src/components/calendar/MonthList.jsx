import React from "react";

export const MonthList = ({ data, setMonth }) => {
    let months = [];
    months = data.map(month => (
        <td
            key={month}
            className="calendar-month"
            onClick={() => setMonth(month)}
        >
            <span>{month}</span>
        </td>
    ));

    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
        if (i % 3 !== 0 || i === 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
    });

    rows.push(cells);
    let monthlist = rows.map((d, i) => {
        return <tr key={`tr-${i}`}>{d}</tr>;
    });

    return (
        <table className="calendar-month">
            <thead>
                <tr>
                    <th colSpan="4">Select a Month</th>
                </tr>
            </thead>
            <tbody>{monthlist}</tbody>
        </table>
    );
};