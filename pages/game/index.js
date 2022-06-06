import { useEffect, useState } from "react"
import styles from "../../styles/game.module.css"
export default function Controls(){
    const [points, setPoints] = useState(0)
    const Matrix = new Array(10).fill(new Array(10).fill(""))
    const [board, setBoard] = useState(Matrix)
    const [player, setPlayer] = useState({l: 0, c:0})
    const [clicking, setClicking] = useState(false)
    const [apple,setApple] = useState([])

    function createRandomApple(board){
        return Math.floor(Math.random()*board.length)
    }

    function RecreateArray(board, currPlay, applePos){
        setBoard((previousMatriz) => {
            if(applePos[0]=== currPlay.l && applePos[1] === currPlay.c){setApple([]), setPoints(prev => prev +1)}
            return previousMatriz.map((l, line) => l.map((e, col) => {
                return line === currPlay.l && col === currPlay.c ? "Here" : ""
            }))
        }) 
    }
    function RecreateArrayApple(board, currPlay, applePos){
        setBoard((previousMatriz) => {
            return previousMatriz.map((l, line) => l.map((e, col) => {
                return line === applePos[0] && col === applePos[1] ? "apple" : e
            }))
        }) 
    }
    

    useEffect(()=>{
        if(!board.some(e => e.some(ele => ele === "apple"))){
            setApple([createRandomApple(board), createRandomApple(board)])
        }
        RecreateArray(board, player, apple)
        RecreateArrayApple(board, player, apple)
        

    },[player])

    useEffect((e)=>{
        const movingOnBy = (e) =>{
            if(!clicking){
                if(e.key === "ArrowRight" || e.key === "d" ){
                    if(player.l < board.length-1){
                        setPlayer(prev => ({...prev, l: prev.l + 1}))
                    }
                }
                if(e.key === "ArrowLeft" || e.key === "a" ){
                    if(player.l > 0){
                        setPlayer(prev => ({...prev, l: prev.l -1}))
                    }
                }
                if(e.key === "ArrowUp" || e.key === "w" ){
                    if(player.c > 0){
                        setPlayer(prev => ({...prev, c: prev.c -1}))
                    }
                }
                if(e.key === "ArrowDown" || e.key === "s" ){
                    if(player.c < board.length-1){
                        setPlayer(prev => ({...prev, c: prev.c +1}))
                    }
                }
            }
            setClicking(true)
            
        }
        const noMore = () =>{
            setClicking(false)
        }


        document.addEventListener("keydown", movingOnBy)
        document.addEventListener("keyup", noMore)
        
        return  () => {
            document.removeEventListener("keydown", movingOnBy)
            document.removeEventListener("keyup", noMore)
        }
        
    }, [clicking])


    return (<div className={styles.container}>
        <div><h1>{points}</h1></div>
        {board.map((e,i )=> {
            return (<div key={i} >
                {e.map((e,id) =>{
                    if(e === "Here"){return <div key={id} className={styles.player}/>}
                    else if(e === "apple"){return <div key={id} className={styles.apple}/>}
                    else{
                        return(<div key={id} className={styles.box}>
                    </div>)
                    }
                    
                })}
            </div>)
        })}
    </div>)
}