import React from "react";
import moment from "moment";

export const YearTable = ({ year, setYear, getDates }) => {
    const nextTen = moment().set("years", year).add(12, "year").format("Y");
    const tenYear = getDates(year, nextTen);

    const months = tenYear.map(data => (
        <td
            key={data}
            className="calendar-month"
            onClick={() => setYear(data)}
        >
            <span>{data}</span>
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
    const yearList = rows.map((d, i) => {
        return <tr key={`tr-${i}`}>{d}</tr>;
    });

    return (
        <table className="calendar-month">
            <thead>
                <tr>
                    <th colSpan="4">Select a Year</th>
                </tr>
            </thead>
            <tbody>{yearList}</tbody>
        </table>
    );
};
