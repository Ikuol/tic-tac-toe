import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const TicTaeToe = () => {

    const [turn , setTurn]= useState('X');
    const [cells , setCells]= useState(Array(9).fill(''));
    const [winner , setWinner]= useState();
    //const [cursor , setCursor]= useState();

    const checkWinner = (squares) => {
            let combos = {
                across: [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                ],
                down: [
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                ],
                diagnol: [
                    [0, 4, 8],
                    [2, 4, 6],
                ],
            };

            for (let combo in combos){
                combos[combo].forEach((pattern) => {
                    //console.log(pattern);
                    if( squares[pattern[0]] === '' || squares[pattern[1]] === '' || squares[pattern[2]] === '' ){
                            //nothing
                    } else if(squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]){
                        setWinner(squares[pattern[0]])
                    
                        
                        document.querySelector('.tab').style.cursor="not-allowed";
                    
                    }
                });

            };
            chCursor();
    }

    const chCursor = () => {
        
        if(winner){
            console.log('hello');
        }
}

    const handleClick = (num,e) => {
        if (winner){
            return;
        }
        if (cells[num] !== ''){
            MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Already clicked!',
                background:'#123',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        let  squares= [...cells];

            if(turn === 'X'){
                squares[num] ='X';
                setTurn('O');
            }else{
                squares[num] ='O';
                setTurn('X');
            }
            checkWinner(squares);
            chCursor();
            setCells(squares);
    }

    const handleReset = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    const Cell = ({ num }) => {
        return <td className="row" onClick={(e) => handleClick(num,e)}> {cells[num]} </td>;
    }


  return (
    <div className='App'>
        <h1>Tic Tae Toe</h1>
        Turn = { turn }
        <table className='tab'>
            
            <tbody className='tbod'>
                <tr>
                    <Cell num = {0}/>
                    <Cell num = {1}/>
                    <Cell num = {2}/>
                </tr>
                <tr>
                    <Cell num = {3}/>
                    <Cell num = {4}/>
                    <Cell num = {5}/>
                </tr>
                <tr>
                    <Cell num = {6}/>
                    <Cell num = {7}/>
                    <Cell num = {8}/>
                </tr>
            </tbody>
        </table>
        {winner && (
            <>
                <p>{ winner } is the winner.</p>
                <button onClick={ () => handleReset()}>Play Again</button>
            </>
        )}
    </div>
  )
}

export default TicTaeToe
