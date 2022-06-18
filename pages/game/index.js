import { useEffect, useState } from "react"
import styles from "../../styles/game.module.css"
export default function Controls() {
    let intId
    function createRandomApple(length) {
        return Math.floor(Math.random() * length)
    }
    const [points, setPoints] = useState(0)
    const Matrix = new Array(10).fill(new Array(10).fill(""))
    const [board, setBoard] = useState(Matrix)
    const [playerNew, setPlayerNew] = useState([{ l: 0, c: 0 }])
    const [clicking, setClicking] = useState(false)
    const [apple, setApple] = useState([createRandomApple(board.length), createRandomApple(board[0].length)])



    function RecreateArray() {
        setBoard((previousMatriz) => {
            return previousMatriz.map((l, line) => l.map((e, col) => {
                for (const element of playerNew) {
                    if (line === element.l && col === element.c) return "Here"
                }
                return ""
            }))
        })
    }
    function RecreateArrayApple(applePos) {
        setBoard((previousMatriz) => {
            return previousMatriz.map((l, line) => l.map((e, col) => {
                return line === applePos[0] && col === applePos[1] ? "apple" : e
            }))
        })
    }

    //Check If The player head is on top of the Apple
    useEffect(() => {
        if (playerNew[0].l === apple[0] && playerNew[0].c === apple[1]) {
            setApple([createRandomApple(board.length), createRandomApple(board[0].length)])
            setPoints(prev => prev + 1)
            setPlayerNew(prev => [...prev, { l: prev[prev.length - 1].l, c: prev[prev.length - 1].c }])
        } else {
            for (const element of playerNew) {
                if (element.l === apple[0] && element.c === apple[1]) {
                    setApple([createRandomApple(board.length), createRandomApple(board[0].length)])
                }
            }
        }


        RecreateArray(board, playerNew, apple)
        RecreateArrayApple(apple)


    }, [playerNew, apple])

    function test() {
        intId = setInterval(() => console.log("test"), 1000)
    }
    function remove() {
        clearInterval(intId)
    }

    //Calculate the movement of the Snake
    useEffect((e) => {
        const movingOnBy = (e) => {
            if (!clicking) {
                if (e.key === "ArrowRight" || e.key === "d") {
                    if (playerNew[0].l < board.length - 1) {
                        setPlayerNew(prev => prev.reduce((acc, e, i) => {
                            if (i === 0) { return acc.concat({ ...e, l: e.l + 1 }) }
                            else { return acc.concat(prev[i - 1]) }
                        }, []))
                    }
                }
                if (e.key === "ArrowLeft" || e.key === "a") {
                    if (playerNew[0].l > 0) {
                        setPlayerNew(prev => prev.reduce((acc, e, i) => {
                            if (i === 0) { return acc.concat({ ...e, l: e.l - 1 }) }
                            else { return acc.concat(prev[i - 1]) }
                        }, []))
                    }
                }
                if (e.key === "ArrowUp" || e.key === "w") {
                    if (playerNew[0].c > 0) {
                        setPlayerNew(prev => prev.reduce((acc, e, i) => {
                            if (i === 0) { return acc.concat({ ...e, c: e.c - 1 }) }
                            else { return acc.concat(prev[i - 1]) }
                        }, []))
                    }
                }
                if (e.key === "ArrowDown" || e.key === "s") {
                    if (playerNew[0].c < board.length - 1) {
                        setPlayerNew(prev => prev.reduce((acc, e, i) => {
                            if (i === 0) { return acc.concat({ ...e, c: e.c + 1 }) }
                            else { return acc.concat(prev[i - 1]) }
                        }, []))
                    }
                }
            }
            setClicking(true)

        }
        const noMore = () => {
            setClicking(false)
        }


        document.addEventListener("keydown", movingOnBy)
        document.addEventListener("keyup", noMore)

        return () => {
            document.removeEventListener("keydown", movingOnBy)
            document.removeEventListener("keyup", noMore)
        }

    }, [clicking, playerNew, board.length])


    return (<div className={styles.container}>
        <div><h1>{points}</h1>
            <button onClick={() => test()}>Test</button>
            <button onClick={() => remove()}>Remove</button>
        </div>
        {board.map((ele, i) => {
            return (<div key={i} >
                {ele.map((e, id) => {
                    if (e === "Here") { return <div key={id} className={styles.player} /> }
                    else if (e === "apple") { return <div key={id} className={styles.apple} /> }
                    else if (i === 0 && id === 0) { return <div key={id} style={{ backgroundImage: "url(Pixels/TopLeftBorder.png)" }} className={styles.box} /> }
                    else if (i === 0 && id === ele.length - 1) { return <div key={id} style={{ backgroundImage: "url(Pixels/BottomLeftBorder.png)" }} className={styles.box} /> }
                    else if (i === board.length - 1 && id === 0) { return <div key={id} style={{ backgroundImage: "url(Pixels/TopRightBorder.png)" }} className={styles.box} /> }
                    else if (i === board.length - 1 && id === ele.length - 1) { return <div key={id} style={{ backgroundImage: "url(Pixels/BottomRightBorder.png)" }} className={styles.box} /> }
                    else if (i === 0) { return <div key={id} style={{ backgroundImage: "url(Pixels/LeftBorder.png)" }} className={styles.box} /> }
                    else if (i === board.length - 1) { return <div key={id} style={{ backgroundImage: "url(Pixels/RightBorder.png)" }} className={styles.box} /> }
                    else if (id === ele.length - 1) { return <div key={id} style={{ backgroundImage: "url(Pixels/BottomBorder.png)" }} className={styles.box} /> }
                    else if (id === 0) { return <div key={id} style={{ backgroundImage: "url(Pixels/TopBorder.png)" }} className={styles.box} /> }
                    else {
                        return (<div key={id} className={styles.box}>
                        </div>)
                    }

                })}
            </div>)
        })}
    </div>)
}