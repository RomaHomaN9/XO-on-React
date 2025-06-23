import React, { use, useState } from "react";
import "./xo.css";

function Xo() {
	const [x_or_o, useX_or_o] = useState("X");

	const [map, useMap] = useState(Array(9).fill(null));

	const Reset_game = () => {
		document.getElementById("xScore").textContent = "0";
		document.getElementById("oScore").textContent = "0";
	};

	const CheckWinner = (newMap) => {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let combination of winningCombinations) {
			const [a, b, c] = combination;
			if (newMap[a] && newMap[a] === newMap[b] && newMap[a] === newMap[c]) {
				if (newMap[a] === "X") {
					document.getElementById("xScore").textContent = Number(document.getElementById("xScore").textContent) + 1;
				} else {
					document.getElementById("oScore").textContent = Number(document.getElementById("oScore").textContent) + 1;
				}
				for (let i = 0; i < 9; i++) {
					document.getElementById(`td${i}`).textContent = null;
					newMap[i] = null;
				}
				return;
			}
		}
		for (let i = 0; i < 9; i++) if (newMap[i] == null) return;
		for (let i = 0; i < 9; i++) {
			document.getElementById(`td${i}`).textContent = null;
			map[i] = null;
		}
	};

	const XO_click = (cellIndex) => {
		const newMap = [...map];
		let currentPlayer = x_or_o;
		if (newMap[cellIndex] == null) {
			newMap[cellIndex] = x_or_o;
			currentPlayer = x_or_o === "X" ? "O" : "X";
		}

		document.getElementById("who_is_go").textContent = `Ходе: ${currentPlayer}`;
		document.getElementById(`td${cellIndex}`).textContent = newMap[cellIndex];

		useMap(newMap);
		console.log(newMap);
		useX_or_o(currentPlayer);
		CheckWinner(newMap);
	};

	return (
		<div>
			<h1>Xo Game</h1>
			<table className="xo-table" border={1}>
				<tbody>
					<tr className="xo-row">
						<td id="td0" className="xo-cell" onClick={() => XO_click(0)}></td>
						<td id="td1" className="xo-cell" onClick={() => XO_click(1)}></td>
						<td id="td2" className="xo-cell" onClick={() => XO_click(2)}></td>
					</tr>
					<tr className="xo-row">
						<td id="td3" className="xo-cell" onClick={() => XO_click(3)}></td>
						<td id="td4" className="xo-cell" onClick={() => XO_click(4)}></td>
						<td id="td5" className="xo-cell" onClick={() => XO_click(5)}></td>
					</tr>
					<tr className="xo-row">
						<td id="td6" className="xo-cell" onClick={() => XO_click(6)}></td>
						<td id="td7" className="xo-cell" onClick={() => XO_click(7)}></td>
						<td id="td8" className="xo-cell" onClick={() => XO_click(8)}></td>
					</tr>
				</tbody>
			</table>
			<h2 id="who_is_go">Ходе: X</h2>
			<h2>
				X: <span id="xScore">0</span>
			</h2>
			<h2>
				O: <span id="oScore">0</span>
			</h2>
			<button onClick={Reset_game} className="reset_button">
				Оновити рахунок
			</button>
		</div>
	);
}
export default Xo;
