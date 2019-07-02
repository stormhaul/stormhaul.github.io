let cellFactory = require('./cell.js');

module.exports = function(m,n)
{
    let grid = {
        rows: []
    };

    for (let i = 0; i < m; i++) {
        grid.rows.push([]);

        for (let j = 0; j < n; j++) {
            grid.rows[i].push(cellFactory(i, j));
        }
    }

    return grid;
};