import PF from 'pathfinding'
import performance from 'performance-now'

export function createMatrixGrid(grid, numberOfColumns, numberOfRows) {
    const onlyWallArr = grid.filter((value, index) => {
        return value.type === "wall"
    })
    let matrix = []
    for (let y = 0; y < numberOfRows; y++) {
        let row = []
        for (let x = 0; x < numberOfColumns; x++) {
            let isInside = false
            for (let i = 0; i < onlyWallArr.length; i++) {
                if (onlyWallArr[i].x === x && onlyWallArr[i].y === y) {
                    row.push(1)
                    isInside = true
                }
            }
            if (!isInside) {
                row.push(0)
            }
        }
        matrix.push(row)
    }
    return new PF.Grid(matrix)
}

export function getPath(startPoint, endPoint, matrixGrid, finder, algo) {
    const start = performance()
    const path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, matrixGrid)
    const end = performance()
    console.log(`Algo: ${algo}`)
    console.log("Czas (ms): " + (end - start).toFixed(3))
    console.log(Number((end - start).toFixed(3)) / 1000 * 300)
    console.log("Liczba operacji: " + (Number((end - start).toFixed(6))))

    path.splice(path.length - 1, 1)
    path.splice(0, 1)
    return path
}